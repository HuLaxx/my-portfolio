'use client';

export const Footer = () => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const socials = [
    { label: "LINKEDIN", href: "https://linkedin.com" },
    { label: "GITHUB", href: "https://github.com" },
    { label: "TWITTER", href: "https://twitter.com" },
    { label: "KAGGLE", href: "https://kaggle.com" }
  ];

  return (
    <footer className="relative z-40 mt-20 px-2 pb-6 w-full">
      <div className="nav-shell mx-auto w-[98%] rounded-[2rem] px-6 py-12 md:px-16 md:py-20 flex flex-col justify-between min-h-[50vh]">

        {/* Top: Massive Headline */}
        <div className="flex-1 flex items-center">
          <h2 className="text-[13vw] leading-[0.8] font-bold tracking-tighter text-[var(--foreground)] opacity-90">
            LET&apos;S WORK <br />
            <span className="text-[var(--muted)]">TOGETHER</span>
          </h2>
        </div>

        {/* Bottom: Minimalist Row */}
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between border-t border-[var(--border)] pt-8 mt-12">

          {/* Left: Identity */}
          <div className="flex flex-col gap-1">
            <span className="text-sm font-bold tracking-widest text-[var(--foreground)]">RAHUL KHANKE</span>
            <span className="text-xs text-[var(--muted)]">&copy; {currentYear}</span>
          </div>

          {/* Center: Socials */}
          <div className="flex flex-wrap gap-6 md:gap-8">
            {socials.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs font-bold tracking-[0.2em] text-[var(--muted)] transition-colors hover:text-[var(--accent)]"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-8">
            <a
              href="mailto:hello@rahul.dev"
              className="text-xs font-bold tracking-[0.2em] text-[var(--foreground)] transition-colors hover:text-[var(--accent)]"
            >
              HELLO@RAHUL.DEV
            </a>
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
    </footer>
  );
};
