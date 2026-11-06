"use server";

import { createStreamableValue } from "ai/rsc";

import { getKnowledgeBase } from "@/lib/cms/content-service";

const systemPrompt = `
You are the Neural Interface for Rahul Khanke's portfolio.
Answer questions about Rahul's background, technical skills, experiments and projects using the supplied portfolio knowledge base.
Be concise, warm and accurate. Distinguish a planned integration from a tested feature; do not invent benchmarks, project results or employment details.
If the source lacks a requested fact, say the information is not available rather than guessing.
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
      "I couldn't find a grounded answer to that exact question in the portfolio material.",
      "You can ask about Rahul's Next.js and Three.js work, AI integrations, project case studies or data-science background."
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
