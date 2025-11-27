import { RevealOnScroll } from "./RevealOnScroll";
import { NeuralSearch } from "./NeuralSearch";

export const RagShowcase = ({ resume }) => {
  const summaryText =
    resume.neuralSummary ||
    "A grounded concierge: Gemini Flash + your knowledge base for fast, contextual answers.";

  return (
    <section className="relative z-10 px-6 pb-24 md:px-20">
      <div className="rag-highlight" />
      <div className="mx-auto flex max-w-6xl flex-col items-start gap-10 rounded-[32px] border border-[var(--border)] bg-[var(--panel)]/70 p-8 md:p-12 backdrop-blur-2xl shadow-[0_20px_60px_rgba(0,0,0,0.35)] relative overflow-hidden">
        <RevealOnScroll>
          <div className="space-y-4">
            <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-gray-500">
              Neural Concierge
            </p>
            <h2 className="display-heading text-3xl font-semibold md:text-5xl">
              Ask me anything—quietly.
            </h2>
            <p className="max-w-3xl text-base text-gray-300 md:text-lg">
              {summaryText}
            </p>
            <div className="flex flex-wrap gap-3 text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500">
              <span className="rounded-full border border-[var(--border)] px-3 py-1">
                Gemini Flash
              </span>
              <span className="rounded-full border border-[var(--border)] px-3 py-1">
                Edge runtime
              </span>
              <span className="rounded-full border border-[var(--border)] px-3 py-1">
                Portfolio KB
              </span>
            </div>
          </div>
        </RevealOnScroll>

        <RevealOnScroll>
          <div className="w-full">
            <NeuralSearch
              variant="embedded"
              promptHint="Ask about a project or stack choice…"
              className="shadow-2xl"
              examplePrompts={[
                "What makes your WebGL stack different?",
                "How do you blend AI copilots into delivery?",
                "Show me a case with performance metrics.",
              ]}
            />
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
};
