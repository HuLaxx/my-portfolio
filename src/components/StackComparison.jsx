'use client';

import { RevealOnScroll } from './RevealOnScroll';
import clsx from 'clsx';

export const StackComparison = ({ stackComparisons }) => {
  return (
    <section id="stack" className="px-6 md:px-20 py-20 relative z-10">
      <div className="max-w-6xl mx-auto">
        <RevealOnScroll>
          <h2 className="display-heading text-4xl md:text-6xl font-semibold tracking-tight mb-16">
            Stack evolution
          </h2>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stackComparisons.map((stack, i) => (
            <RevealOnScroll key={stack.id} delay={i * 100}>
              <div className={clsx(
                "p-8 rounded-2xl border h-full transition-all duration-500 backdrop-blur-xl",
                stack.id === 'current'
                  ? "bg-[var(--card)] border-[var(--accent)]/50 shadow-[0_0_30px_rgba(217,178,111,0.28)]"
                  : "bg-[var(--panel)] border-[var(--border)] hover:border-white/30"
              )}>
                <div className="flex items-center justify-between mb-6">
                  <h3 className={clsx(
                    "font-mono text-sm tracking-widest uppercase",
                    stack.id === 'current' ? "text-[var(--accent)]" : "text-gray-500"
                  )}>
                    {stack.title}
                  </h3>
                  {stack.id === 'current' && (
                    <div className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  )}
                </div>

                <p className="text-gray-300 text-sm mb-8 leading-relaxed min-h-[80px]">
                  {stack.caption}
                </p>

                <ul className="space-y-4">
                  {stack.highlights.map((item, j) => (
                    <li key={j} className="flex items-start gap-3 text-sm text-gray-300">
                      <span className="mt-1 h-2 w-2 rounded-full bg-[var(--accent)]/60" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
};
