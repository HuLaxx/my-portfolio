'use client';

import { useActionState, useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";
import { useStreamableValue } from "ai/rsc";

import { runNeuralSearch } from "@/app/actions/neural";
import { RevealOnScroll } from "./RevealOnScroll";

const initialState = { status: "IDLE", response: undefined, error: null };
const defaultPrompts = [
  "How did you keep 60fps on the Vogue runway?",
  "What stack do you ship for immersive work?",
  "How do AI copilots fit into launch timelines?",
];

export const NeuralSearch = ({
  promptHint,
  variant = "standalone",
  wrapInReveal = true,
  className = "",
  examplePrompts,
}) => {
  const inputRef = useRef(null);
  const timeoutRef = useRef([]);
  const [query, setQuery] = useState("");
  const [logs, setLogs] = useState([]);
  const [status, setStatus] = useState("IDLE");
  const [copied, setCopied] = useState(false);

  const [state, formAction, isPending] = useActionState(
    runNeuralSearch,
    initialState
  );
  const streamableResponse =
    state.response && typeof state.response === "object"
      ? state.response
      : undefined;
  const [streamedResponse, , streamPending] =
    useStreamableValue(streamableResponse);

  useEffect(
    () => () => timeoutRef.current.forEach((timer) => clearTimeout(timer)),
    []
  );

  useEffect(() => {
    if (state.error) {
      setStatus("ERROR");
      setLogs((prev) => [...prev, `> ERROR: ${state.error}`]);
    }
  }, [state.error]);

  useEffect(() => {
    if (state?.status === "STREAMING" && streamPending) {
      setStatus("STREAMING");
    }
  }, [state?.status, streamPending]);

  useEffect(() => {
    if (!streamPending && streamedResponse) {
      setStatus("COMPLETE");
    }
  }, [streamPending, streamedResponse]);

  const scheduleLogs = () => {
    timeoutRef.current.forEach((timer) => clearTimeout(timer));
    timeoutRef.current = [
      setTimeout(
        () => setLogs((prev) => [...prev, "> HANDSHAKE INITIATED..."]),
        120
      ),
      setTimeout(
        () => setLogs((prev) => [...prev, "> CONNECTING TO KNOWLEDGE GRAPH..."]),
        600
      ),
      setTimeout(
        () =>
          setLogs((prev) => [
            ...prev,
            "> VECTOR STORE ONLINE. GENERATING RESPONSE...",
          ]),
        1100
      ),
    ];
  };

  const handleAction = async (formData) => {
    const value = formData.get("query")?.toString().trim();
    if (!value) return;

    setStatus("SCANNING");
    setLogs([]);
    scheduleLogs();
    formData.set("query", value);
    await formAction(formData);
  };

  const handleCopy = async () => {
    if (!streamedResponse) return;
    await navigator.clipboard.writeText(streamedResponse);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  const isButtonDisabled =
    !query.trim() || isPending || status === "SCANNING" || status === "STREAMING";

  const hint = useMemo(
    () => promptHint ?? "Ask the knowledge graph (e.g., 'How do you scope work?')",
    [promptHint]
  );

  const prompts = examplePrompts ?? defaultPrompts;

  const shellClasses = clsx(
    "rounded-3xl border transition-all duration-500 backdrop-blur-2xl",
    variant === "standalone"
      ? "glass-panel shadow-2xl border-[var(--border)]"
      : "bg-[var(--panel)] border-[var(--border)] shadow-[0_20px_60px_rgba(0,0,0,0.35)]"
  );

  const showHeader = variant === "standalone";
  const showSuccess = status === "COMPLETE" && streamedResponse;

  const consoleContent = (
    <div
      id="ai-console"
      className={clsx(
        "w-full",
        variant === "standalone" ? "mx-auto max-w-4xl scroll-mt-28" : ""
      )}
    >
      {showHeader && (
        <div className="mb-4 flex items-center gap-3 opacity-80">
          <div className="mr-1 h-2 w-2 animate-pulse rounded-full bg-[var(--console-accent)]"></div>
          <span className="font-mono text-xs tracking-[0.3em] uppercase text-gray-300">
            Neural Interface v2.3
          </span>
          <span className="rounded-full border border-[var(--border)] px-2 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-gray-400">
            Gemini Flash
          </span>
        </div>
      )}
      <div className={shellClasses}>
        <form action={handleAction} className="flex flex-col gap-4 p-6 md:flex-row md:items-center">
          <span className="text-lg font-mono text-gray-500">&Sigma;ZO</span>
          <input
            ref={inputRef}
            type="text"
            name="query"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder={hint}
            className="flex-1 border-none bg-transparent font-mono text-base text-white placeholder-gray-600 outline-none md:text-lg"
            autoComplete="off"
            disabled={isPending}
          />
          <div className="flex items-center gap-3">
            <button
              type="submit"
              disabled={isButtonDisabled}
              className={`rounded-full px-5 py-2 font-mono text-[11px] uppercase tracking-[0.3em] transition-all duration-300 ${
                isButtonDisabled
                  ? "cursor-not-allowed bg-white/5 text-gray-500"
                  : "bg-white text-black hover:bg-gray-200"
              }`}
            >
              Execute
            </button>
          </div>
        </form>

        {!!prompts.length && (
          <div className="flex flex-wrap gap-2 px-6 pb-4 text-[11px] font-mono uppercase tracking-[0.2em] text-gray-500">
            {prompts.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setQuery(item)}
                className="rounded-full border border-white/10 px-3 py-1 transition-colors duration-300 hover:border-[var(--accent)] hover:text-white"
              >
                {item}
              </button>
            ))}
          </div>
        )}

        {(status !== "IDLE" || streamedResponse) && (
          <div
            className="relative border-t border-[var(--border)] bg-[var(--panel)] p-6 font-mono text-sm transition-all duration-500 rounded-b-3xl"
            role="status"
            aria-live="polite"
          >
            {status === "SCANNING" && <div className="scan-line"></div>}
            <div className="mb-4 flex flex-wrap items-center gap-3">
              {showSuccess && (
                <span className="inline-flex items-center gap-2 rounded-full bg-[var(--accent-soft)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/90">
                  <span className="h-2 w-2 rounded-full bg-[var(--console-accent)]" />
                  Answer ready
                </span>
              )}
              {streamedResponse && (
                <button
                  type="button"
                  onClick={handleCopy}
                  className="rounded-full border border-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/80 transition-colors duration-300 hover:border-[var(--accent)] hover:text-white"
                >
                  {copied ? "Copied" : "Copy response"}
                </button>
              )}
            </div>
            <div className="mb-6 space-y-2 text-xs text-gray-500">
              {logs.map((log, index) => (
                <div key={`${log}-${index}`} className="opacity-80">
                  {log}
                </div>
              ))}
            </div>
            {streamedResponse && (
              <div className="leading-relaxed text-gray-100">
                <span className="mr-3 text-xs font-bold tracking-[0.3em] uppercase text-[var(--console-accent)]">
                  Response //
                </span>
                <span className="typing-effect whitespace-pre-wrap">
                  {streamedResponse}
                </span>
                <span className="cursor-blink ml-1 text-[var(--console-accent)]">_</span>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );

  if (!wrapInReveal) {
    return (
      <div
        className={clsx(
          "relative z-20 w-full",
          variant === "standalone" && "px-6 pb-20 md:px-20",
          className
        )}
      >
        {consoleContent}
      </div>
    );
  }

  return (
    <RevealOnScroll
      className={clsx(
        "relative z-20 w-full",
        variant === "standalone" && "px-6 pb-20 md:px-20",
        className
      )}
    >
      {consoleContent}
    </RevealOnScroll>
  );
};
