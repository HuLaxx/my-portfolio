"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { RevealOnScroll } from "./RevealOnScroll";
import { useSeason } from "./SeasonContext";

export const Hero = ({ resume }) => {
  // "Normal Dark Blend" for all themes as requested
  const maskGradient = 'radial-gradient(ellipse at center, black 40%, transparent 90%)';

  return (
    <section id="hero" className="relative min-h-0 md:min-h-[95vh] flex flex-col justify-center overflow-hidden border-0 outline-none">

      {/* Background Gradient Orbs */}
      <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-[var(--accent)]/10 blur-[120px] pointer-events-none mix-blend-screen" />
      <div className="absolute bottom-[-20%] right-[-10%] w-[500px] h-[500px] rounded-full bg-[var(--secondary)]/10 blur-[140px] pointer-events-none mix-blend-screen" />

      {/* Increased width to max-w-[95%] */}
      <div className="mx-auto w-full max-w-[95%] px-4 md:px-6 xl:px-8 pt-24 md:pt-28 relative z-10">

        {/* Main Content Row */}
        <div className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)] items-start gap-x-2 gap-y-4 sm:gap-x-4 md:flex md:flex-row md:items-stretch md:justify-between md:gap-6 xl:gap-12 md:min-h-[85vh]">

          {/* Left Side (Text) - 60% */}
          <motion.div
            className="contents md:flex md:w-[60%] lg:w-[55%] md:min-w-0 md:flex-col md:justify-start md:gap-5 md:py-6 md:px-4 md:pl-6 lg:pl-8 xl:pl-28 2xl:pl-32 md:pr-4 md:relative md:z-10"
          >
            {/* Top Group: Label + Name */}
            <div className="col-start-1 row-start-1 min-w-0 flex flex-col justify-center md:justify-start gap-1 px-1 sm:px-3 md:px-0 relative z-10">
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
                  <h1 className="text-[clamp(1.45rem,7.2vw,3.65rem)] md:text-[clamp(2rem,4vw,3.75rem)] xl:text-[clamp(3.5rem,5.4vw,6rem)] 2xl:text-9xl mb-0 flex flex-col gap-0">
                    {/* On compact screens, four deliberate lines fill the left column alongside the portrait. */}
                    <span className="flex flex-col gap-0 leading-[1.08] md:hidden">
                      <span>I</span>
                      <span>am</span>
                      <span>Rahul</span>
                      <span className="text-stroke text-[var(--foreground)]/10" style={{ WebkitTextStrokeWidth: "1.3px" }}>Khanke</span>
                    </span>
                    {/* Keep the original two-line desktop treatment untouched. */}
                    <span className="hidden md:inline-block whitespace-nowrap transition-all duration-300 hover:scale-105 hover:drop-shadow-[0_0_35px_var(--accent)] hover:brightness-125 origin-left w-fit py-1">
                      I am Rahul
                    </span>
                    <span className="hidden md:inline-block text-stroke opacity-100 text-[var(--foreground)]/10 transition-all duration-300 hover:scale-105 hover:text-[var(--accent)] hover:drop-shadow-[0_0_25px_var(--accent)] hover:text-stroke-0 origin-left w-fit py-1">
                      Khanke
                    </span>
                  </h1>
                </div>
              </RevealOnScroll>
            </div>

            {/* Bottom Group: Summary */}
            <RevealOnScroll delay={300} className="col-span-2 row-start-2 min-w-0 px-2 sm:px-3 md:px-0 relative z-10">
              <div className="flex flex-col gap-4">
                <p className="max-w-full sm:max-w-lg md:max-w-xl lg:max-w-2xl text-sm sm:text-base md:text-lg xl:text-2xl leading-relaxed text-[var(--foreground)] font-medium opacity-100">
                  {resume.summary}
                </p>
              </div>
            </RevealOnScroll>
          </motion.div>

          {/* Right Side (Image) - 40% */}
          <motion.div
            className="flex col-start-2 row-start-1 min-w-0 w-full items-end justify-end relative md:col-auto md:row-auto md:w-[40%] lg:w-[45%] md:translate-x-0 2xl:translate-x-[10%] z-5"
          >
            <div className="relative w-full h-[clamp(11rem,48vw,20rem)] sm:h-[min(48vh,26rem)] md:h-[min(72vh,44rem)] 2xl:h-[86vh] flex items-end justify-end">
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
