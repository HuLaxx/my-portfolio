'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useSeason } from './SeasonContext';

export const MobileDock = () => {
  const [activeSection, setActiveSection] = useState('');
  const { season } = useSeason();
  const isLight = season === "summer";

  useEffect(() => {
    const handleScroll = () => {
      // Simple scroll spy
      const sections = ['hero', 'work', 'stack', 'contact'];
      const current = sections.find(section => {
        const el = document.getElementById(section);
        if (el) {
          const rect = el.getBoundingClientRect();
          return rect.top >= 0 && rect.top <= 300;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`nav-shell fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex w-auto items-center justify-center rounded-full px-8 py-4 ${isLight ? "text-[var(--foreground)]" : "text-white"}`}>
      <nav className="flex items-center gap-8" role="navigation" aria-label="Secondary">
        <Link
          href="#hero"
          className={`group relative text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${activeSection === 'hero'
              ? 'text-[var(--accent)]'
              : isLight ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'
            }`}
          aria-current={activeSection === 'hero' ? 'page' : undefined}
        >
          <span className="relative z-10 transition-all duration-300 group-hover:text-shadow-neon">
            JOB ROLE 1
          </span>
          <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-all duration-500 ${activeSection === 'hero' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
        </Link>

        <div className="w-px h-4 bg-[var(--border)]" />

        <Link
          href="#work"
          className={`group relative text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${activeSection === 'work'
              ? 'text-[var(--accent)]'
              : isLight ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'
            }`}
          aria-current={activeSection === 'work' ? 'page' : undefined}
        >
          <span className="relative z-10 transition-all duration-300 group-hover:text-shadow-neon">
            JOB ROLE 2
          </span>
          <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-all duration-500 ${activeSection === 'work' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
        </Link>

        <div className="w-px h-4 bg-[var(--border)]" />

        <Link
          href="#stack"
          className={`group relative text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${activeSection === 'stack'
              ? 'text-[var(--accent)]'
              : isLight ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'
            }`}
          aria-current={activeSection === 'stack' ? 'page' : undefined}
        >
          <span className="relative z-10 transition-all duration-300 group-hover:text-shadow-neon">
            JOB ROLE 3
          </span>
          <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-all duration-500 ${activeSection === 'stack' ? 'w-full' : 'w-0 group-hover:w-full'
            }`} />
        </Link>
      </nav>
    </div>
  );
};
