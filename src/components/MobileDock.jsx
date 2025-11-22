'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSeason } from './SeasonContext';

export const MobileDock = () => {
  const pathname = usePathname();
  const { season } = useSeason();
  const isLight = season === "summer";

  const roles = [
    { label: "Data Scientist", href: "/role/data-scientist" },
    { label: "Data Engineer", href: "/role/data-engineer" },
    { label: "AI/ML Engineer", href: "/role/ai-ml-engineer" },
  ];

  return (
    <div className={`nav-shell fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex w-auto items-center justify-center rounded-full px-8 py-4 ${isLight ? "text-[var(--foreground)]" : "text-white"}`}>
      <nav className="flex items-center gap-8" role="navigation" aria-label="Secondary">
        {roles.map((role, index) => (
          <div key={role.href} className="flex items-center">
            <Link
              href={role.href}
              className={`group relative text-xs font-bold tracking-[0.2em] uppercase transition-all duration-300 ${pathname === role.href
                ? 'text-[var(--accent)]'
                : isLight ? 'text-gray-700 hover:text-black' : 'text-gray-300 hover:text-white'
                }`}
              aria-current={pathname === role.href ? 'page' : undefined}
            >
              <span className="relative z-10 transition-all duration-300 group-hover:text-shadow-neon">
                {role.label}
              </span>
              <span className={`absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-all duration-500 ${pathname === role.href ? 'w-full' : 'w-0 group-hover:w-full'
                }`} />
            </Link>
            {index < roles.length - 1 && (
              <div className="w-px h-4 bg-[var(--border)] ml-8" />
            )}
          </div>
        ))}
      </nav>
    </div>
  );
};
