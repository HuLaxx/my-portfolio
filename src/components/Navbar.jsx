'use client';

import Link from "next/link";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./ThemeToggle";
import { MobileMenu } from "./MobileMenu";
import { useSeason } from "./SeasonContext";

const navLinks = [
  { href: "#hero", label: "INDEX" },
  { href: "#work", label: "WORK" },
  { href: "#stack", label: "STACK" },
  { href: "#contact", label: "CONTACT" },
];

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
        className="nav-shell fixed top-4 left-1/2 z-50 flex w-[98%] max-w-6.5xl -translate-x-1/2 items-center justify-between rounded-full px-8 py-5 md:px-12 text-white mix-blend-difference"
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
                    : "text-gray-300 hover:text-white"
                    }`}
                  aria-current={activeSection === link.href ? "page" : undefined}
                >
                  {link.label}
                  <span className={`absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-transform duration-500 group-hover:scale-x-100 ${activeSection === link.href ? "scale-x-100" : ""}`} />
                </Link>
              </li>
            ))}
          </ul>

          <div className="pl-8 border-l border-white/10">
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-white mix-blend-difference"
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
      <span className="font-display text-2xl font-bold tracking-tighter mix-blend-difference">
        RAHUL
      </span>
      <span className="text-[9px] font-medium tracking-[0.4em] opacity-80 group-hover:tracking-[0.5em] transition-all duration-500 mix-blend-difference">
        VISHWAKARMA
      </span>
    </div>
  </Link>
);
