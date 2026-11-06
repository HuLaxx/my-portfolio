"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll } from "./RevealOnScroll";
import { useSeason } from "./SeasonContext";

export const Hero = ({ resume }) => {
  // "Normal Dark Blend" for all themes as requested
  const maskGradient = 'radial-gradient(ellipse at center, black 40%, transparent 90%)';

  return (
    <section id="hero" className="relative min-h-0 lg:min-h-[95vh] flex flex-col justify-center overflow-hidden border-0 outline-none">

      {/* Background Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--secondary)]/10 blur-[140px] pointer-events-none mix-blend-screen" />

      {/* Increased width to max-w-[95%] */}
      <div className="mx-auto w-full max-w-[95%] px-4 md:px-6 xl:px-8 pt-24 sm:pt-28 lg:pt-28 relative z-10">

        {/* Main Content Row */}
        <div className="grid grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] items-center gap-x-2 gap-y-8 sm:gap-x-4 sm:gap-y-10 md:gap-x-6 md:gap-y-12 lg:flex lg:flex-row lg:items-stretch lg:justify-between lg:gap-6 xl:gap-8 2xl:gap-12 lg:min-h-[85vh]">

          {/* Left Side (Text) - 60% */}
          <motion.div
            className="contents lg:flex lg:w-[60%] xl:w-[55%] lg:min-w-0 lg:flex-col lg:justify-start lg:gap-5 lg:py-6 lg:px-4 lg:pl-8 xl:pl-16 2xl:pl-32 lg:pr-4 lg:relative lg:z-10"
          >
            {/* Top Group: Label + Name */}
            <div className="col-start-1 row-start-1 min-w-0 flex flex-col justify-center lg:justify-start gap-8 sm:gap-10 md:gap-12 lg:gap-3 xl:gap-4 2xl:gap-1 px-1 sm:px-3 lg:px-0 py-1 sm:py-2 md:py-3 lg:py-0 relative z-10">
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
                  <h1 className="text-[clamp(1.9rem,10vw,6.8rem)] lg:text-[clamp(3.5rem,6.2vw,6rem)] xl:text-[clamp(4.2rem,6vw,6.5rem)] 2xl:text-9xl mb-0 flex flex-col gap-0">
                    {/* On phones and tablets, the staggered three-line name fits beside the portrait. */}
                    <span className="flex w-full min-w-0 flex-col items-end gap-0 leading-[1.08] text-right lg:hidden">
                      <span className="mr-[10%] whitespace-nowrap">I am</span>
                      <span className="mr-[4%] whitespace-nowrap">Rahul</span>
                      <span className="text-stroke whitespace-nowrap text-[var(--foreground)]/10" style={{ WebkitTextStrokeWidth: "1.3px" }}>Khanke</span>
                    </span>
                    {/* Restore the original two-line composition at laptop and desktop widths. */}
                    <span className="hidden lg:inline-block whitespace-nowrap transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_35px_var(--accent)] hover:brightness-125 origin-left w-fit py-1">
                      I am Rahul
                    </span>
                    <span className="hidden lg:inline-block text-stroke opacity-100 text-[var(--foreground)]/10 transition-all duration-300 hover:scale-105 hover:text-[var(--accent)] hover:drop-shadow-[0_0_25px_var(--accent)] hover:text-stroke-0 origin-left w-fit py-1">
                      Khanke
                    </span>
                  </h1>
                </div>
              </RevealOnScroll>
            </div>

            {/* Bottom Group: Summary */}
            <RevealOnScroll delay={300} className="col-span-2 row-start-2 min-w-0 px-2 sm:px-3 lg:px-0 relative z-10">
              <div className="flex flex-col gap-4">
                <p className="max-w-full lg:max-w-2xl text-base sm:text-lg md:text-xl lg:text-[clamp(1rem,1.65vw,1.5rem)] 2xl:text-2xl leading-relaxed text-[var(--foreground)] font-medium opacity-100">
                  {resume.summary}
                </p>
              </div>
            </RevealOnScroll>
          </motion.div>

          {/* Right Side (Image) - 40% */}
          <motion.div
            className="flex col-start-2 row-start-1 min-w-0 w-full items-end justify-end relative pt-7 sm:pt-9 md:pt-12 lg:pt-0 lg:col-auto lg:row-auto lg:w-[40%] xl:w-[45%] 2xl:translate-x-[10%] z-5"
          >
            <div className="relative w-full h-[clamp(12rem,52vw,22rem)] sm:h-[min(50vh,25rem)] md:h-[min(50vh,26rem)] lg:h-[min(82vh,55rem)] 2xl:h-[86vh] flex items-end justify-end">
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
