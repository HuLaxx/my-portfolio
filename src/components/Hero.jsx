"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll } from "./RevealOnScroll";
import { useSeason } from "./SeasonContext";

export const Hero = ({ resume }) => {
  // "Normal Dark Blend" for all themes as requested
  const maskGradient = 'radial-gradient(ellipse at center, black 40%, transparent 90%)';

  return (
    <section id="hero" className="relative min-h-0 2xl:min-h-[95vh] flex flex-col justify-center overflow-hidden border-0 outline-none">

      {/* Background Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--secondary)]/10 blur-[140px] pointer-events-none mix-blend-screen" />

      {/* Increased width to max-w-[95%] */}
      <div className="mx-auto w-full max-w-[95%] px-4 md:px-6 xl:px-8 pt-24 md:pt-28 relative z-10">

        {/* Main Content Row */}
        <div className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-x-2 gap-y-6 sm:gap-x-4 md:gap-x-6 xl:gap-x-8 2xl:flex 2xl:flex-row 2xl:items-stretch 2xl:justify-between 2xl:gap-12 2xl:min-h-[85vh]">

          {/* Left Side (Text) - 60% */}
          <motion.div
            className="contents 2xl:flex 2xl:w-[55%] 2xl:min-w-0 2xl:flex-col 2xl:justify-start 2xl:gap-5 2xl:py-6 2xl:px-4 2xl:pl-32 2xl:pr-4 2xl:relative 2xl:z-10"
          >
            {/* Top Group: Label + Name */}
            <div className="col-start-1 row-start-1 min-w-0 flex flex-col justify-center 2xl:justify-start gap-1 px-1 sm:px-3 2xl:px-0 relative z-10">
              <RevealOnScroll delay={100}>
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="h-[2px] sm:h-[3px] w-10 sm:w-14 bg-[var(--accent)]"></div>
                  <p className="font-display text-xs sm:text-xl md:text-2xl font-black italic uppercase tracking-[0.1em] text-[var(--accent)]">
                    About Me
                  </p>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={200}>
                <div className="font-semibold leading-[1.1] tracking-tight text-[var(--foreground)]">
                  <h1 className="text-[clamp(1.45rem,7vw,6.5rem)] 2xl:text-9xl mb-0 flex flex-col gap-0">
                    {/* The staggered, right-aligned lines follow the portrait's edge on compact screens. */}
                    <span className="flex w-full min-w-0 flex-col items-end gap-0 leading-[1.06] text-right 2xl:hidden">
                      <span className="mr-[12%]">I</span>
                      <span className="mr-[7%]">am</span>
                      <span className="mr-[2%]">Rahul</span>
                      <span className="text-stroke text-[var(--foreground)]/10" style={{ WebkitTextStrokeWidth: "1.3px" }}>Khanke</span>
                    </span>
                    {/* Keep the original two-line heading on wide desktop screens. */}
                    <span className="hidden 2xl:inline-block whitespace-nowrap transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_35px_var(--accent)] hover:brightness-125 origin-left w-fit py-1">
                      I am Rahul
                    </span>
                    <span className="hidden 2xl:inline-block text-stroke opacity-100 text-[var(--foreground)]/10 transition-all duration-300 hover:scale-105 hover:text-[var(--accent)] hover:drop-shadow-[0_0_25px_var(--accent)] hover:text-stroke-0 origin-left w-fit py-1">
                      Khanke
                    </span>
                  </h1>
                </div>
              </RevealOnScroll>
            </div>

            {/* Bottom Group: Summary */}
            <RevealOnScroll delay={300} className="col-span-2 row-start-2 min-w-0 px-2 sm:px-3 2xl:px-0 relative z-10">
              <div className="flex flex-col gap-4">
                <p className="max-w-full 2xl:max-w-2xl text-base sm:text-lg md:text-xl xl:text-2xl leading-relaxed text-[var(--foreground)] font-medium opacity-100">
                  {resume.summary}
                </p>
              </div>
            </RevealOnScroll>
          </motion.div>

          {/* Right Side (Image) - 40% */}
          <motion.div
            className="flex col-start-2 row-start-1 min-w-0 w-full items-end justify-end relative 2xl:col-auto 2xl:row-auto 2xl:w-[45%] 2xl:translate-x-[10%] z-5"
          >
            <div className="relative w-full h-[clamp(11rem,48vw,20rem)] sm:h-[min(48vh,26rem)] md:h-[min(64vh,42rem)] 2xl:h-[86vh] flex items-end justify-end">
              <img
                src="/me.png"
                alt="Rahul Khanke"
                className="w-full h-full max-w-full max-h-full object-contain scale-[1.0] origin-bottom-right"
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
    </section>
  );
};
