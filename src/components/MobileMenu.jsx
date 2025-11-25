'use client';

import Link from "next/link";
import { useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
    { href: "#roles", label: "EXPLORE" },
    { href: "#experience", label: "EXPERIENCE" },
    { href: "#education", label: "EDUCATION" },
    { href: "#contact", label: "CONTACT" },
];

const SocialIcon = ({ href, label, path }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center justify-center h-10 w-10 rounded-full border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300"
        aria-label={label}
    >
        <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
            <path d={path} />
        </svg>
    </a>
);

export const MobileMenu = ({ isOpen, onClose }) => {
    // Prevent body scroll when menu is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => {
            document.body.style.overflow = '';
        };
    }, [isOpen]);

    // Close on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };
        document.addEventListener('keydown', handleEscape);
        return () => document.removeEventListener('keydown', handleEscape);
    }, [isOpen, onClose]);

    const roles = [
        { label: "Data Scientist", href: "/role/data-scientist" },
        { label: "Data Engineer", href: "/role/data-engineer" },
        { label: "AI/ML Engineer", href: "/role/ai-ml-engineer" },
    ];

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Menu Panel */}
            <div
                className="fixed top-0 right-0 h-full w-[60%] sm:w-[45%] md:w-[40%] max-w-md bg-[var(--panel)]/80 backdrop-blur-xl border-l border-[var(--border)] rounded-l-3xl z-50 lg:hidden transform transition-transform duration-300 ease-out flex flex-col shadow-2xl"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)]/50 hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300 z-50 backdrop-blur-md"
                    aria-label="Close menu"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-2 px-6 pt-28 pb-6">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className="group relative block w-fit py-2 text-base font-semibold tracking-widest text-white transition-all duration-300 hover:text-[var(--accent)]"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <span className="relative z-10">{link.label}</span>
                            <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                        </Link>
                    ))}
                </nav>

                {/* Roles Links */}
                <div className="px-6 pb-6 flex flex-col gap-3 border-t border-white/10 pt-6">
                    <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-gray-500 mb-1">Roles</p>
                    {roles.map((role) => (
                        <Link
                            key={role.href}
                            href={role.href}
                            onClick={onClose}
                            className="group relative block w-fit text-base font-medium text-gray-300 hover:text-[var(--accent)] transition-colors duration-300"
                        >
                            <span className="relative z-10">{role.label}</span>
                            <span className="absolute inset-x-0 -bottom-1 h-px scale-x-0 bg-gradient-to-r from-transparent via-[var(--accent)] to-transparent transition-transform duration-500 group-hover:scale-x-100" />
                        </Link>
                    ))}
                </div>

                {/* Social Icons */}
                <div className="px-6 pb-6 flex gap-4 justify-center mt-auto">
                    <SocialIcon href="https://linkedin.com" label="LinkedIn" path="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                    <SocialIcon href="https://github.com" label="GitHub" path="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    <SocialIcon href="https://kaggle.com" label="Kaggle" path="M18.825 23.859c-.022.092-.117.141-.281.141h-3.139c-.187 0-.351-.082-.492-.248l-5.178-6.589-1.448 1.373v5.128c0 .246-.128.369-.386.369h-3.084c-.258 0-.386-.123-.386-.369v-23.31c0-.246.128-.369.386-.369h3.084c.258 0 .386.123.386.369v14.557l6.549-6.846c.14-.153.304-.229.492-.229h3.314c.152 0 .24.047.264.141.023.082-.012.176-.105.281l-5.688 5.688 6.021 9.242c.094.141.117.258.07.352z" />
                </div>

                {/* Theme Toggle */}
                <div className="px-6 py-6 border-t border-white/10 flex justify-center">
                    <div className="scale-[0.85] origin-center">
                        <ThemeToggle />
                    </div>
                </div>
            </div>
        </>
    );
};
