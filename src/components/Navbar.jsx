'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { useSeason } from "./SeasonContext";

const navLinks = [
  { label: "ABOUT", href: "#about" },
  { label: "EDUCATION", href: "#education" },
  { label: "EXPERIENCE", href: "#experience" },
  { label: "WORK", href: "#work" },
  { label: "CONTACT", href: "#contact" },
];

const SocialIcon = ({ href, path, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="text-[var(--muted)] hover:text-[var(--accent)] transition-colors duration-300"
    aria-label={label}
  >
    <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d={path} />
    </svg>
  </a>
);

export const Navbar = () => {
  const { season } = useSeason();
  const isLight = season === "summer";
  const [activeSection, setActiveSection] = useState("#hero");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.replace('#', ''));
      const scrollPosition = window.scrollY + 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(`#${sectionId}`);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <nav
        className="nav-shell fixed top-4 left-1/2 z-50 flex w-[98%] max-w-6.5xl -translate-x-1/2 items-center justify-between rounded-full px-8 py-5 md:px-12 text-[var(--foreground)]"
        aria-label="Primary"
      >
        <SignatureLogo />

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-12 md:flex">
          <ul className="flex gap-8" role="menubar">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  scroll={false}
                  className={`group relative block px-2 py-1 text-[11px] font-semibold tracking-[0.3em] uppercase transition-all duration-500 ${activeSection === link.href
                    ? "text-[var(--accent)]"
                    : "text-[var(--muted)] hover:text-[var(--foreground)]"
                    }`}
                  aria-current={activeSection === link.href ? "page" : undefined}
                >
                  {link.label}
                  <span className={`absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-transform duration-500 group-hover:scale-x-100 ${activeSection === link.href ? "scale-x-100" : ""}`} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="pl-8 border-l border-white/10 flex items-center gap-6">
            <SocialIcon
              href="https://linkedin.com"
              label="LinkedIn"
              path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"
            />
            <SocialIcon
              href="https://github.com"
              label="GitHub"
              path="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
            />
            <SocialIcon
              href="https://kaggle.com"
              label="Kaggle"
              path="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.373v5.128c0 .246-.128.369-.386.369h-3.084c-.258 0-.386-.123-.386-.369v-23.31c0-.246.128-.369.386-.369h3.084c.258 0 .386.123.386.369v14.557l6.549-6.846c.14-.153.304-.229.492-.229h3.314c.152 0 .24.047.264.141.023.082-.012.176-.105.281l-5.688 5.688 6.021 9.242c.094.141.117.258.07.352z"
            />
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-[var(--foreground)]"
          onClick={() => setMobileMenuOpen(true)}
          aria-label="Menu"
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
      </nav>

      <MobileMenu
        isOpen={mobileMenuOpen}
        onClose={() => setMobileMenuOpen(false)}
        navLinks={navLinks}
        activeSection={activeSection}
      />
    </>
  );
};

const SignatureLogo = () => (
  <Link href="/" className="group relative z-50" aria-label="Home">
    <div className="flex flex-col leading-none">
      <span className="font-display text-2xl font-bold tracking-tighter text-[var(--foreground)]">
        RAHUL
      </span>
      <span className="text-[9px] font-medium tracking-[0.4em] opacity-80 group-hover:tracking-[0.5em] transition-all duration-500 text-[var(--muted)]">
        VISHWAKARMA
      </span>
    </div>
  </Link>
);
