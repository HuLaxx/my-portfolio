import { RevealOnScroll } from "./RevealOnScroll";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="relative z-40 mt-20 border-t border-[var(--border)] pb-28 pt-12 backdrop-blur-2xl transition-colors duration-500"
      style={{ background: 'var(--footer-bg)' }}
    >
      {/* Gradient overlay for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 to-black/30 pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-[var(--accent-soft)] blur-[120px] pointer-events-none opacity-20" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 px-6 pt-12 pb-20 md:grid-cols-2 md:px-20 relative z-10">
        <RevealOnScroll>
          <h3 className="mb-8 text-4xl font-bold leading-[0.9] tracking-tighter text-[var(--foreground)] md:text-6xl">
            Let&apos;s <span className="text-[var(--accent)]">connect</span>.
          </h3>
          <div className="flex flex-col gap-4">
            <a
              href="mailto:hello@rahul.dev"
              className="group flex items-center gap-3 text-lg text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <span className="text-[var(--accent)]">✉</span> hello@rahul.dev
            </a>
            <a
              href="tel:+1234567890"
              className="group flex items-center gap-3 text-lg text-[var(--muted)] hover:text-[var(--foreground)] transition-colors"
            >
              <span className="text-[var(--accent)]">📞</span> +1 (234) 567-890
            </a>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="flex h-full flex-col justify-between md:items-end">
            <div className="mb-6 flex flex-col gap-4 text-right">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold tracking-[0.2em] text-[var(--muted)] transition-all duration-300 hover:text-[var(--foreground)] hover:text-shadow-neon"
              >
                LINKEDIN
              </a>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold tracking-[0.2em] text-[var(--muted)] transition-all duration-300 hover:text-[var(--foreground)] hover:text-shadow-neon"
              >
                GITHUB
              </a>
              <a
                href="https://kaggle.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-bold tracking-[0.2em] text-[var(--muted)] transition-all duration-300 hover:text-[var(--foreground)] hover:text-shadow-neon"
              >
                KAGGLE
              </a>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs text-[var(--muted)]">
                &copy; {currentYear} RAHUL VISHWAKARMA.
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </footer>
  );
};
