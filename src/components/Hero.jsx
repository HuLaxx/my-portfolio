import { RevealOnScroll } from "./RevealOnScroll";

export const Hero = ({ resume }) => {
  return (
    <section id="hero" className="relative min-h-[85vh] flex flex-col justify-center overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-16 pt-28 md:pt-40 relative z-10">
        <div className="px-6 py-8 md:px-12 md:py-14">
          <RevealOnScroll delay={100}>
            <div className="flex items-center gap-4 mb-6">
              <div className="h-[3px] w-14 bg-[var(--accent)]"></div>
              <p className="font-display text-xl md:text-2xl font-black italic uppercase tracking-[0.1em] text-[var(--accent)]">
                About Me
              </p>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={200}>
            <div className="mb-6 font-semibold leading-[1.1] tracking-tight text-[var(--foreground)]">
              <h1 className="text-5xl md:text-8xl lg:text-9xl mb-2 flex flex-col gap-2">
                <span className="inline-block transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_35px_var(--accent)] hover:brightness-125 origin-left w-fit py-2">
                  I am Rahul
                </span>
                <span className="inline-block text-stroke opacity-100 text-[var(--foreground)]/10 transition-all duration-300 hover:scale-105 hover:text-[var(--accent)] hover:drop-shadow-[0_0_25px_var(--accent)] hover:text-stroke-0 origin-left w-fit py-2">
                  Khanke
                </span>
              </h1>
            </div>
          </RevealOnScroll>

          <RevealOnScroll delay={300}>
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
              <p className="max-w-xl text-lg leading-relaxed text-[var(--foreground)] md:text-2xl font-medium border-l-2 border-[var(--border)] pl-6">
                {resume.summary}
              </p>
              <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-[var(--accent-soft)] to-transparent"></div>
            </div>
          </RevealOnScroll>
        </div>
      </div>

      {/* Scroll indicator */}
      <RevealOnScroll delay={400}>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce z-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">Scroll</p>
          <div className="h-12 w-6 rounded-full border-2 border-[var(--border)] flex items-start justify-center p-1.5">
            <div className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse"></div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
