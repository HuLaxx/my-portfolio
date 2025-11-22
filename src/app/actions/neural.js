"use server";

import { createStreamableValue } from "ai/rsc";

import { getKnowledgeBase } from "@/lib/cms/content-service";

const systemPrompt = `
You are the Neural Interface of Alexander's portfolio.
Respond like a high-tech terminal: terse, confident, grounded in the knowledge base.
Use ">" bullets for key facts. If the exact answer isn't present, respond with the nearest relevant skills or experience from the knowledge base—do not say "data not found".
`;

async function fetchGeminiResponse(query, knowledgeBase, apiKey) {
  const endpoint =
    "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

  const contents = [
    {
      role: "user",
      parts: [{ text: `${systemPrompt}\n\nKNOWLEDGE BASE:\n${knowledgeBase}` }],
    },
    { role: "user", parts: [{ text: `QUESTION: ${query}` }] },
  ];

  const response = await fetch(`${endpoint}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ contents }),
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(
      `Gemini API ${response.status}: ${errorBody || response.statusText}`
    );
  }

  const data = await response.json();
  const candidates = data.candidates ?? [];
  const segments = candidates
    .flatMap((candidate) => candidate.content?.parts ?? [])
    .map((part) => part.text?.trim())
    .filter(Boolean);

  if (!segments.length) {
    return [
      "> I couldn’t find that exact detail, but here’s what’s in-scope:",
      "> Core stacks: Next.js/React, Vue 3 + Vite (for lighter apps), Three.js/WebGL, Tailwind, Vercel AI SDK (Gemini Flash), LangChain, Sanity CMS.",
      "> Strengths: immersive UI, shader + performance tuning, AI copilots, design systems, edge deployments.",
      "> Ask for a project, stack choice, or performance metric to go deeper."
    ].join("\n");
  }

  return segments.join("\n\n");
}

export async function runNeuralSearch(previousState, formData) {
  const query = formData.get("query")?.toString().trim();
  if (!query) {
    return { status: "IDLE", response: undefined, error: null };
  }

  const apiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!apiKey) {
    console.error("❌ Missing GOOGLE_GENERATIVE_AI_API_KEY in environment variables.");
    return {
      status: "ERROR",
      response: undefined,
      error: "Configuration Error: AI service is not properly authenticated. Please check server logs.",
    };
  }

  const knowledgeBase = await getKnowledgeBase();
  const stream = createStreamableValue("");

  (async () => {
    try {
      const answer = await fetchGeminiResponse(query, knowledgeBase, apiKey);
      stream.update(answer);
    } catch (error) {
      const fallback =
        error instanceof Error
          ? `SYSTEM ERROR // ${error.message}`
          : "SYSTEM ERROR // Unknown failure.";
      stream.update(fallback);
      console.error("Neural search failed:", error);
    } finally {
      stream.done();
    }
  })();

  return {
    status: "STREAMING",
    response: stream.value,
    error: null,
  };
}
