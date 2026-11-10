'use client';

import { motion } from "framer-motion";
import { useSeason } from "./SeasonContext";

export const Footer = () => {
  const currentYear = new Date().getFullYear();
  // "Normal Dark Blend" for all themes
  const maskGradient = 'radial-gradient(ellipse at center, black 40%, transparent 90%)';

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    {
      label: "LINKEDIN",
      href: "https://linkedin.com/in/rahul-khanke-853717218",
      path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    },
    {
      label: "GITHUB",
      href: "https://github.com/HuLaxx",
      path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    },
    {
      label: "EMAIL",
      href: "mailto:rahulkhanke786@gmail.com",
      path: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    }
  ];

  return (
    <footer id="footer" className="relative z-40 mt-12 px-2 pb-2 w-full">
      {/* 
         - Width: 99.5%
         - Min-h: 22vh
         - pt-6 (Symmetrical Top Space)
         - Glass effect + border
      */}
      <div className="nav-shell relative overflow-hidden mx-auto w-[99.5%] rounded-[2rem] px-4 pt-8 sm:pt-10 pb-12 md:px-8 md:pb-16 2xl:pt-2 flex flex-col min-h-[12vh] backdrop-blur-sm border border-[var(--border)]/20" style={{ background: 'var(--footer-bg)' }}>

        {/* Background Orbs (Subtle) */}
        <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-[var(--accent)]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] rounded-full bg-[var(--accent)]/5 blur-[140px] pointer-events-none" />

        {/* Flex container: Added pb-4 for Bottom Space (above border) */}
        {/* Pulled up (-mt-1) per user request */}
        <div className="grid grid-cols-[minmax(0,1.15fr)_minmax(0,0.85fr)] sm:grid-cols-[minmax(0,1.3fr)_minmax(0,0.7fr)] md:grid-cols-[minmax(0,7fr)_minmax(0,3fr)] items-end justify-between flex-1 w-full gap-x-2 gap-y-4 sm:gap-x-4 md:gap-x-6 2xl:flex 2xl:flex-row 2xl:gap-12 relative z-10 pb-4 mt-0 2xl:-mt-1">

          {/* Left: Text Content - 70% (Widened) - Justify Center (Symmetry) */}
          <div className="contents md:flex md:min-w-0 md:w-full md:flex-col md:justify-center md:h-full md:pl-8 xl:pl-14 2xl:w-[70%] 2xl:pl-20 md:translate-y-0 2xl:-translate-y-9">
            <h2 className="col-start-1 row-start-1 min-w-0 self-center px-1 sm:px-3 md:px-0 text-[clamp(1.5rem,7.4vw,4rem)] md:text-[clamp(3.5rem,8vw,7.5rem)] 2xl:text-[10vw] leading-[0.95] font-bold tracking-tighter text-[var(--foreground)] opacity-90 text-left mb-6 sm:mb-10">
              LET&apos;S <br />
              CONNECT
            </h2>

            <div className="col-span-2 row-start-2 grid grid-cols-3 gap-x-2 gap-y-3 sm:flex sm:flex-wrap sm:gap-x-4 sm:gap-y-3 md:gap-x-4 md:gap-y-4 xl:gap-x-6 2xl:gap-10 px-1 sm:px-3 md:px-0">
              {socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label === "EMAIL" ? undefined : "_blank"}
                  rel={link.label === "EMAIL" ? undefined : "noopener noreferrer"}
                  className="group min-w-0 flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-1 sm:gap-2 2xl:gap-3 text-[10px] sm:text-xs md:text-sm lg:text-base xl:text-lg 2xl:text-2xl font-bold tracking-[0.03em] sm:tracking-[0.06em] 2xl:tracking-[0.1em] text-[var(--foreground)] transition-colors duration-300"
                >
                  <span className="p-1.5 sm:p-2 2xl:p-3 shrink-0 rounded-full border border-[var(--border)] bg-[var(--card)]/50 group-hover:bg-[var(--accent-dark)] group-hover:text-white group-hover:scale-110 group-hover:shadow-[0_0_25px_var(--accent-dark)] transition-all duration-300 relative overflow-hidden flex items-center justify-center">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" className="w-3.5 h-3.5 sm:w-4 sm:h-4 xl:w-5 xl:h-5 2xl:w-6 2xl:h-6 relative z-10 block">
                      <path d={link.path} />
                    </svg>
                  </span>
                  <span className="max-w-full whitespace-nowrap transition-all duration-300 group-hover:text-[var(--accent-dark)] group-hover:scale-105 group-hover:drop-shadow-[0_0_12px_var(--accent-soft)] origin-left">
                    {link.label}
                  </span>
                </a>
              ))}
            </div>
          </div>

          {/* Right: Me Image - 30% (Reduced to fit text) */}
          <div className="flex col-start-2 row-start-1 min-w-0 w-full 2xl:w-[30%] justify-end items-end relative -mb-2">
            <div className="relative w-full h-[clamp(9rem,40vw,17rem)] md:h-full md:min-h-[12rem] 2xl:min-h-0 flex items-end justify-end">
              <img
                src="/me-footer.png"
                alt="Let's Connect"
                className="w-auto h-full max-h-full max-w-full object-contain scale-[1] origin-bottom-right md:-translate-y-[0.7rem] 2xl:-translate-x-6"
                style={{
                  maskImage: maskGradient,
                  WebkitMaskImage: maskGradient
                }}
              />
            </div>
          </div>

        </div>

        {/* Full width border below both Text and Image */}
        {/* Divider Line */}
        <div className="w-full h-[1px] bg-[var(--border)]/30 z-10 relative 2xl:-mt-5"></div>

        {/* Bottom Section: Clean & Minimal (Transparent) */}
        <div className="relative w-full overflow-hidden rounded-b-[2rem]">

          {/* Content Layer */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 px-6 sm:px-10 md:px-10 2xl:px-20 py-6 text-[10px] sm:text-xs font-medium uppercase tracking-[0.15em] text-[var(--muted)] relative z-10">

            {/* Left: Copyright */}
            <div className="flex items-center gap-2 opacity-80">
              <span>© {currentYear} Rahul Khanke.</span>
              <span className="hidden sm:inline">All Rights Reserved.</span>
            </div>

            {/* Right: Back to Top */}
            <button
              onClick={scrollToTop}
              className="group flex items-center gap-2 text-[var(--foreground)] hover:text-[var(--accent)] transition-colors self-start md:self-auto"
            >
              Back to Top
              <span className="transition-transform duration-300 group-hover:-translate-y-1 text-[var(--accent)]">↑</span>
            </button>

          </div>

        </div>

      </div>
    </footer>
  );
};
