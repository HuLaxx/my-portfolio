"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll } from "./RevealOnScroll";
import { useSeason } from "./SeasonContext";

export const Hero = ({ resume }) => {
  // "Normal Dark Blend" for all themes as requested
  const maskGradient = 'radial-gradient(ellipse at center, black 40%, transparent 90%)';

  return (
    <section id="hero" className="relative min-h-[95vh] flex flex-col justify-center overflow-hidden border-0 outline-none">

      {/* Background Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--secondary)]/10 blur-[140px] pointer-events-none mix-blend-screen" />

      {/* Increased width to max-w-[95%] */}
      <div className="mx-auto w-full max-w-[95%] px-4 md:px-8 pt-24 md:pt-28 relative z-10">

        {/* Main Content Row */}
        <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-12 min-h-[85vh]">

          {/* Left Side (Text) - 60% */}
          <motion.div
            className="w-full md:w-[60%] flex flex-col justify-start gap-3 sm:gap-5 py-6 px-4 sm:px-8 md:pl-32 md:pr-4"
          >
            {/* Top Group: Label + Name */}
            <div className="flex flex-col gap-1">
              <RevealOnScroll delay={100}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-[2px] sm:h-[3px] w-10 sm:w-14 bg-[var(--accent)]"></div>
                  <p className="font-display text-base sm:text-xl md:text-2xl font-black italic uppercase tracking-[0.1em] text-[var(--accent)]">
                    About Me
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <div className="font-semibold leading-[1.1] tracking-tight text-[var(--foreground)]">
                  <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-9xl mb-0 flex flex-col gap-0">
                    {/* Forced single line */}
                    <span className="inline-block whitespace-nowrap transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_35px_var(--accent)] hover:brightness-125 origin-left w-fit py-1">
                      I am Rahul
                    </span>
                    <span className="inline-block text-stroke opacity-100 text-[var(--foreground)]/10 transition-all duration-300 hover:scale-105 hover:text-[var(--accent)] hover:drop-shadow-[0_0_25px_var(--accent)] hover:text-stroke-0 origin-left w-fit py-1">
                      Khanke
                    </span>
                  </h1>
                </div>
              </RevealOnScroll>
            </div>

            {/* Bottom Group: Summary */}
            <RevealOnScroll delay={300}>
              <div className="flex flex-col gap-4">
                <p className="max-w-full sm:max-w-lg md:max-w-xl text-base sm:text-lg md:text-xl lg:text-2xl leading-relaxed text-[var(--foreground)] font-medium">
                  {resume.summary}
                </p>
              </div>
            </RevealOnScroll>
          </motion.div>

          {/* Right Side (Image) - 40% */}
          <motion.div
            className="hidden md:flex w-full md:w-[40%] items-end justify-end relative translate-x-[10%]"
          >
            <div className="relative w-full h-[86vh] flex items-end justify-end">
              <img
                src="/me.png"
                alt="Rahul Khanke"
                className="w-full h-full object-contain scale-[1.0] origin-bottom-right"
                style={{
                  maskImage: maskGradient,
                  WebkitMaskImage: maskGradient
                }}
              />
              {/* Backing Glow */}
              <div className="absolute inset-0 bg-[var(--accent)]/5 blur-[80px] rounded-full -z-10" />
            </div>
          </motion.div>

        </div>
      </div>

      {/* Scroll indicator */}
      <RevealOnScroll delay={400}>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce z-20">
          <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-[var(--muted)]">Scroll</p>
          <div className="h-12 w-6 rounded-full border-2 border-[var(--border)] flex items-start justify-center p-1.5">
            <div className="h-2 w-2 rounded-full bg-[var(--accent)] animate-pulse"></div>
          </div>
        </div>
      </RevealOnScroll>
    </section>
  );
};
