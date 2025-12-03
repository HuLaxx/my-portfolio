'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { useSeason } from "./SeasonContext";
import { useMenu } from "./MenuContext";
import { AnimatePresence, motion } from "framer-motion";

const navLinks = [
  { href: "#roles", label: "EXPLORE" },
  { href: "#experience", label: "EXPERIENCE" },
  { href: "#education", label: "EDUCATION" },
  { href: "#footer", label: "CONTACT" },
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
  const { isMenuOpen, openMenu, closeMenu } = useMenu();

  // Track active section based on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // If at the very top (Hero section), clear active section
      if (scrollPosition < 100) {
        setActiveSection(null);
        return;
      }

      const sections = navLinks.map(link => link.href.replace('#', ''));
      const offset = 100;

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId);
        if (element) {
          const { offsetTop, offsetHeight } = element;
          if (scrollPosition + offset >= offsetTop && scrollPosition + offset < offsetTop + offsetHeight) {
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
        <div className="hidden lg:flex lg:flex-1 items-center justify-end gap-6">
          {/* Center block: nav links */}
          <div className="flex">
            <ul
              className="grid grid-cols-2 gap-x-8 gap-y-1 xl:flex xl:gap-5"
              role="menubar"
            >
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
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
          </div>

          {/* Right block: socials + theme toggle */}
          <div className="pl-6 border-l border-white/10 flex items-center gap-4">
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
          className="lg:hidden p-2 text-[var(--foreground)]"
          onClick={openMenu}
          aria-label="Menu"
        >
          <span className="block w-6 h-0.5 bg-current mb-1.5"></span>
          <span className="block w-6 h-0.5 bg-current"></span>
        </button>
      </nav>

      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        navLinks={navLinks}
        activeSection={activeSection}
      />
    </>
  );
};

const SignatureLogo = () => {
  const [langIndex, setLangIndex] = useState(0);

  const languages = [
    { first: "RAHUL", last: "KHANKE", lang: "en" },
    { first: "Ραχούλ", last: "Χάνκε", lang: "el" },
    { first: "Рахул", last: "Ханке", lang: "ru" },
    { first: "राहुल", last: "खनके", lang: "hi" },
    { first: "راہول", last: "کھانکے", lang: "ur" },
    { first: "拉胡尔", last: "坎克", lang: "zh" },
    { first: "ラフル", last: "カンケ", lang: "ja" },
    { first: "라훌", last: "칸케", lang: "ko" },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % languages.length);
    }, 5000); // Slower interval (5s)

    return () => clearInterval(interval);
  }, []);

  return (
    <Link
      href="/"
      className="group relative z-50 flex items-center"
      aria-label="Home"
    >
      <div className="relative h-8 w-48 overflow-hidden">
        <AnimatePresence mode="popLayout">
          <motion.div
            key={languages[langIndex].lang}
            initial={{ x: -15, opacity: 0, filter: "blur(4px)" }}
            animate={{ x: 0, opacity: 1, filter: "blur(0px)" }}
            exit={{ x: 15, opacity: 0, filter: "blur(4px)" }}
            transition={{ duration: 2.0, ease: [0.16, 1, 0.3, 1] }}
            className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-3 whitespace-nowrap"
            style={{
              fontFamily: ['en', 'ja', 'ko', 'zh'].includes(languages[langIndex].lang)
                ? 'var(--font-display), system-ui'
                : 'system-ui, -apple-system, "Segoe UI", Arial, sans-serif'
            }}
          >
            <span className="text-xl font-bold tracking-tighter text-[var(--foreground)]">
              {languages[langIndex].first}
            </span>
            <span className="text-xl font-bold tracking-tighter text-[var(--foreground)]">
              {languages[langIndex].last}
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
    </Link>
  );
};
