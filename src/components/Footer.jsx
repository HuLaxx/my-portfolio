import { RevealOnScroll } from "./RevealOnScroll";

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      id="contact"
      className="glass-panel-strong mt-32 border-t border-white/10 relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-4xl bg-[var(--accent-soft)] blur-[120px] pointer-events-none" />

      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 py-32 md:grid-cols-2 md:px-20 relative z-10">
        <RevealOnScroll>
          <h3 className="mb-12 text-6xl font-bold leading-[0.9] tracking-tighter text-white md:text-8xl lg:text-9xl">
            Let&apos;s build <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-[var(--accent)] to-white/60">your next launch</span> <br />
            together.
          </h3>
          <a
            href="mailto:hello@alexander.dev"
            className="group relative inline-flex items-center gap-4 overflow-hidden rounded-full bg-[var(--accent)] px-8 py-4 text-lg font-bold tracking-widest text-black transition-all duration-500 hover:bg-white hover:text-black hover:shadow-[0_0_40px_rgba(217,178,111,0.35)]"
          >
            <span className="relative z-10">Book a build sprint</span>
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/50 to-transparent transition-transform duration-700 group-hover:animate-shimmer" />
          </a>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <div className="flex h-full flex-col justify-between md:items-end">
            <div className="mb-10 flex flex-col gap-6 text-right">
              <a
                href="https://x.com/alexander"
                className="text-sm font-bold tracking-[0.2em] text-gray-500 transition-all duration-300 hover:text-white hover:text-shadow-neon"
              >
                X / Twitter
              </a>
              <a
                href="https://www.linkedin.com/in/alexander"
                className="text-sm font-bold tracking-[0.2em] text-gray-500 transition-all duration-300 hover:text-white hover:text-shadow-neon"
              >
                LinkedIn
              </a>
              <a
                href="https://github.com/alexander"
                className="text-sm font-bold tracking-[0.2em] text-gray-500 transition-all duration-300 hover:text-white hover:text-shadow-neon"
              >
                GitHub
              </a>
              <a
                href="https://www.instagram.com/alexander"
                className="text-sm font-bold tracking-[0.2em] text-gray-500 transition-all duration-300 hover:text-white hover:text-shadow-neon"
              >
                Instagram
              </a>
            </div>
            <div className="text-right">
              <p className="font-mono text-xs tracking-widest text-gray-600 mb-2">
                LONDON, UK | AVAILABLE REMOTE
              </p>
              <p className="font-mono text-xs text-gray-700">
                &copy; {currentYear} ALEXANDER DESIGN.
              </p>
              <p className="mt-2 font-mono text-xs text-gray-600">
                WhatsApp / Signal: +44 7700 000000
              </p>
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </footer>
  );
};
