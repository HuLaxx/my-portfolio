'use client';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    {
      label: "LINKEDIN",
      href: "https://linkedin.com",
      path: "M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
    },
    {
      label: "GITHUB",
      href: "https://github.com",
      path: "M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
    },
    {
      label: "KAGGLE",
      href: "https://kaggle.com",
      path: "M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.373v5.128c0 .246-.128.369-.386.369h-3.084c-.258 0-.386-.123-.386-.369v-23.31c0-.246.128-.369.386-.369h3.084c.258 0 .386.123.386.369v14.557l6.549-6.846c.14-.153.304-.229.492-.229h3.314c.152 0 .24.047.264.141.023.082-.012.176-.105.281l-5.688 5.688 6.021 9.242c.094.141.117.258.07.352z"
    },
    {
      label: "EMAIL",
      href: "mailto:hello@rahul.dev",
      path: "M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"
    }
  ];

  return (
    <footer id="footer" className="relative z-40 mt-20 px-2 pb-6 w-full">
      {/* Reduced min-height to ~35vh (another 30% reduction) */}
      <div className="nav-shell relative overflow-hidden mx-auto w-[98%] rounded-[2rem] px-6 py-12 md:px-16 md:py-20 flex flex-col min-h-[35vh]">

        {/* Decorative 'Me' Images - High Opacity, No Blend, Corner Positioned */}
        <div className="absolute top-4 right-4 w-[200px] h-[200px] md:w-[350px] md:h-[350px] opacity-90 pointer-events-none z-0">
          <img src="/me.png" alt="" className="w-full h-full object-contain" />
        </div>
        {/* Left Side Image - me2.png */}
        <div className="absolute top-4 left-4 w-[200px] h-[200px] md:w-[300px] md:h-[300px] opacity-90 pointer-events-none z-0">
          <img src="/me2.png" alt="" className="w-full h-full object-contain" />
        </div>

        {/* Top Part: "Let's Work Together" (~60% of space) */}
        <div className="flex-[1.5] flex items-center justify-center border-b border-[var(--border)]/30 pb-8 relative z-10 text-center">
          <h2 className="text-[14vw] leading-[0.8] font-bold tracking-tighter text-[var(--foreground)] opacity-90">
            LET&apos;S WORK <br />
            <span className="text-[var(--muted)]">TOGETHER</span>
          </h2>
        </div>

        {/* Bottom Part: Socials/Info (~35% of space) */}
        <div className="flex-1 flex flex-col justify-end pt-12 relative z-10">
          <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">

            {/* Left: Identity */}
            <div className="flex flex-col gap-1">
              <span className="text-sm font-bold tracking-widest text-[var(--foreground)]">RAHUL KHANKE</span>
              <span className="text-xs text-[var(--muted)]">&copy; {currentYear}</span>
            </div>

            {/* Center: Socials (Icons + Text) */}
            <div className="flex flex-wrap gap-6 md:gap-10">
              {socials.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target={link.label === "EMAIL" ? undefined : "_blank"}
                  rel={link.label === "EMAIL" ? undefined : "noopener noreferrer"}
                  className="group flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[var(--muted)] transition-all duration-300 hover:text-[var(--foreground)] hover:scale-110 hover:drop-shadow-[0_0_8px_rgba(255,255,255,0.5)]"
                >
                  <svg
                    width="16"
                    height="16"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    className="opacity-70 group-hover:opacity-100 transition-opacity"
                  >
                    <path d={link.path} />
                  </svg>
                  {link.label}
                </a>
              ))}
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-8">
              {/* Removed standalone Email link as it's now in socials */}
              <button
                onClick={scrollToTop}
                className="group flex items-center gap-2 text-xs font-bold tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--foreground)]"
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
