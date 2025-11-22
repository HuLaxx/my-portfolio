import { RevealOnScroll } from "./RevealOnScroll";

export const Hero = ({ resume }) => {
  const title = (resume.title || "DIGITAL CRAFTSMAN").split(" ");
  const firstWord = title[0] || "DIGITAL";
  const secondWord = title[1] || "CRAFTSMAN";
  const label = resume.label || "Creative Developer & Designer";

  return (
    <section id="hero" className="relative min-h-[90vh] flex flex-col justify-center overflow-hidden">
      <div className="mx-auto max-w-6xl px-6 md:px-20 pt-32 relative z-10">
        <RevealOnScroll delay={100}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-[2px] w-12 bg-[var(--accent)]/60"></div>
            <p className="font-mono text-xs tracking-[0.32em] uppercase text-gray-300">
              {label}
            </p>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={200}>
          <h1 className="display-heading mb-10 text-6xl font-semibold leading-[0.88] tracking-tight text-[var(--foreground)] md:text-9xl lg:text-[10rem]">
            RAHUL <br />
            <span className="text-stroke opacity-90">KHANKE</span>
          </h1>
        </RevealOnScroll>

        <RevealOnScroll delay={300}>
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center">
            <p className="max-w-xl text-lg leading-relaxed text-gray-300 md:text-2xl font-light border-l-2 border-white/10 pl-6">
              {resume.summary}
            </p>
            <div className="hidden md:block h-[1px] flex-1 bg-gradient-to-r from-[var(--accent-soft)] to-transparent"></div>
          </div>
        </RevealOnScroll>
      </div>

      {/* Scroll indicator */}
      <RevealOnScroll delay={400}>
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-500">Scroll</p>
          <div className="h-12 w-6 rounded-full border-2 border-white/20 flex items-start justify-center p-1.5">
            <div className="h-2 w-2 rounded-full bg-white/40 animate-pulse"></div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
