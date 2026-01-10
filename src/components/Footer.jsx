'use client';

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
      label: "KAGGLE",
      href: "https://kaggle.com",
      path: "M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.373v5.128c0 .246-.128.369-.386.369h-3.084c-.258 0-.386-.123-.386-.369v-23.31c0-.246.128-.369.386-.369h3.084c.258 0 .386.123.386.369v14.557l6.549-6.846c.14-.153.304-.229.492-.229h3.314c.152 0 .24.047.264.141.023.082-.012.176-.105.281l-5.688 5.688 6.021 9.242c.094.141.117.258.07.352z"
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
      <div className="nav-shell relative overflow-hidden mx-auto w-[99.5%] rounded-[2rem] px-4 pt-2 pb-12 md:px-8 md:pt-2 md:pb-16 flex flex-col min-h-[12vh] backdrop-blur-sm border border-[var(--border)]/20" style={{ background: 'var(--footer-bg)' }}>

        {/* Background Orbs (Subtle) */}
        <div className="absolute top-[-50%] left-[-20%] w-[500px] h-[500px] rounded-full bg-[var(--accent)]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[-50%] right-[-20%] w-[600px] h-[600px] rounded-full bg-[var(--accent)]/5 blur-[140px] pointer-events-none" />

        {/* Flex container: Added pb-4 for Bottom Space (above border) */}
        {/* Pulled up (-mt-1) per user request */}
        <div className="flex flex-col md:flex-row items-end justify-between flex-1 w-full gap-8 md:gap-12 relative z-10 pb-4 -mt-1">

          {/* Left: Text Content - 70% (Widened) - Justify Center (Symmetry) */}
          <div className="w-full md:w-[70%] flex flex-col justify-center h-full pl-6 sm:pl-10 md:pl-20 -translate-y-4 sm:-translate-y-9">
            <h2 className="text-[11vw] sm:text-[14vw] md:text-[10vw] leading-[0.95] font-bold tracking-tighter text-[var(--foreground)] opacity-90 text-left mb-6 sm:mb-10">
              LET&apos;S <br />
              CONNECT
            </h2>

            <div className="flex flex-wrap gap-6 sm:gap-10">
              {socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label === "EMAIL" ? undefined : "_blank"}
                  rel={link.label === "EMAIL" ? undefined : "noopener noreferrer"}
                  className="group flex items-center gap-2 text-lg sm:text-2xl font-bold tracking-[0.1em] text-[var(--foreground)] transition-colors duration-300 hover:text-[var(--accent-dark)]"
                >
                  <span className="p-2 rounded-full border border-[var(--border)] bg-[var(--card)]/50 group-hover:bg-[var(--accent-dark)] group-hover:text-white transition-colors duration-300">
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4 sm:w-5 sm:h-5">
                      <path d={link.path} />
                    </svg>
                  </span>
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Right: Me Image - 30% (Reduced to fit text) */}
          <div className="hidden md:flex w-full md:w-[30%] justify-end items-end relative -mb-2">
            <div className="relative w-full h-full flex items-end justify-end">
              <img
                src="/me2.png"
                alt="Let's Connect"
                className="w-auto h-full max-h-full object-contain scale-[1] origin-bottom-right -translate-y-[0.7rem] -translate-x-6"
                style={{
                  maskImage: maskGradient,
                  WebkitMaskImage: maskGradient
                }}
              />
            </div>
          </div>

        </div>

        {/* Full width border below both Text and Image */}
        {/* Pulled up (-mt-5) per user request */}
        <div className="w-full h-[1px] bg-[var(--border)]/30 mb-8 z-10 relative -mt-5"></div>

        {/* Bottom Part: Socials/Info */}
        <div className="flex-1 shrink-0 flex flex-col justify-end relative z-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between px-6 sm:px-10 md:px-20">

            {/* Left: Identity */}
            <div className="flex flex-col gap-1">
              <span className="text-base sm:text-xl font-black tracking-widest text-[var(--foreground)]">RAHUL KHANKE</span>
              <span className="text-xs sm:text-sm font-bold text-[var(--muted)]">&copy; {currentYear}</span>
            </div>



            {/* Right: Actions */}
            <div className="flex items-center gap-8">
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-base font-bold tracking-[0.2em] text-[var(--foreground)] transition-colors hover:opacity-80"
              >
                TOP
                <span className="transition-transform duration-300 group-hover:-translate-y-1">↑</span>
              </button>
            </div>

          </div>
        </div>

      </div>
    </footer>
  );
};
