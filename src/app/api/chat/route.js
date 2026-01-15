import { getKnowledgeBase } from "@/lib/cms/content-service";

export const runtime = "edge";

const systemPrompt = `
You are the Neural Interface of Rahul Khanke's portfolio.
Respond concisely and helpfully about Rahul's skills, experience, projects, and background.
Use short paragraphs. Be conversational but informative.
If you don't know something specific, say so honestly.
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
        body: JSON.stringify({
            contents,
            // Disable tools/function calling which may cause issues with Gemini 3
            toolConfig: {
                functionCallingConfig: {
                    mode: "NONE"
                }
            }
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Gemini API ${response.status}: ${errorBody || response.statusText}`);
    }

    const data = await response.json();
    const candidates = data.candidates ?? [];
    const segments = candidates
        .flatMap((candidate) => candidate.content?.parts ?? [])
        .map((part) => part.text?.trim())
        .filter(Boolean);

    if (!segments.length) {
        return "I couldn't find specific information about that. Try asking about skills, experience, or projects.";
    }

    return segments.join("\n\n");
}

async function fetchGroqResponse(query, knowledgeBase, apiKey) {
    const endpoint = "https://api.groq.com/openai/v1/chat/completions";

    const response = await fetch(endpoint, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({
            model: "openai/gpt-oss-120b", // Using GPT OSS 120B as requested for Jarvis
            messages: [
                {
                    role: "system",
                    content: `${systemPrompt}\n\nKNOWLEDGE BASE:\n${knowledgeBase}`,
                },
                { role: "user", content: query },
            ],
            temperature: 0.7,
            max_tokens: 1024,
        }),
    });

    if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Groq API ${response.status}: ${errorBody || response.statusText}`);
    }

    const data = await response.json();
    return data.choices?.[0]?.message?.content || "I couldn't generate a response.";
}

export async function POST(request) {
    try {
        const { query } = await request.json();

        if (!query || typeof query !== "string") {
            return Response.json({ error: "Query is required" }, { status: 400 });
        }

        const groqKey = process.env.GROQ_API_KEY;
        const geminiKey = process.env.GOOGLE_GENERATIVE_AI_API_KEY;

        if (!groqKey) {
            console.error("Missing GROQ_API_KEY");
            return Response.json({ error: "AI service not configured" }, { status: 500 });
        }

        const knowledgeBase = await getKnowledgeBase();

        try {
            // 1. Try Groq (Jarvis/GPT-120B) First
            const answer = await fetchGroqResponse(query.trim(), knowledgeBase, groqKey);
            return Response.json({ response: answer });
        } catch (groqError) {
            console.warn("Groq API failed, attempting Gemini fallback:", groqError.message);

            // 2. Fallback to Gemini if Groq fails
            if (geminiKey) {
                try {
                    const fallbackAnswer = await fetchGeminiResponse(query.trim(), knowledgeBase, geminiKey);
                    return Response.json({ response: fallbackAnswer, source: "fallback" });
                } catch (geminiError) {
                    console.error("Gemini Fallback failed:", geminiError.message);
                    throw groqError;
                }
            } else {
                throw groqError;
            }
        }
    } catch (error) {
        console.error("Chat API error:", error);
        return Response.json(
            { error: error.message || "Something went wrong" },
            { status: 500 }
        );
    }
}
