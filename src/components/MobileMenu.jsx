'use client';

import Link from "next/link";
import { useEffect } from "react";
import { ThemeToggle } from "./ThemeToggle";

const navLinks = [
    { href: "#hero", label: "INDEX" },
    { href: "#work", label: "WORK" },
    { href: "#stack", label: "STACK" },
    { href: "#contact", label: "CONTACT" },
];

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

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Menu Panel */}
            <div
                className="fixed top-0 right-0 h-full w-[85%] max-w-sm bg-[var(--panel)] border-l border-[var(--border)] z-50 md:hidden transform transition-transform duration-300 ease-out"
                role="dialog"
                aria-modal="true"
                aria-label="Mobile navigation"
            >
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-6 right-6 h-10 w-10 flex items-center justify-center rounded-full border border-[var(--border)] bg-[var(--card)] hover:bg-[var(--accent)] hover:border-[var(--accent)] transition-all duration-300"
                    aria-label="Close menu"
                >
                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15 5L5 15M5 5L15 15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </button>

                {/* Navigation Links */}
                <nav className="flex flex-col gap-1 px-8 pt-24 pb-12">
                    {navLinks.map((link, index) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            onClick={onClose}
                            className="group relative block py-5 text-3xl font-semibold tracking-tight text-white transition-all duration-300 hover:translate-x-2 border-b border-white/5"
                            style={{ animationDelay: `${index * 50}ms` }}
                        >
                            <span className="relative z-10">{link.label}</span>
                            <span className="absolute left-0 bottom-0 h-0.5 w-0 bg-[var(--accent)] transition-all duration-300 group-hover:w-full" />
                        </Link>
                    ))}
                </nav>

                {/* Theme Toggle */}
                <div className="px-8 py-6 border-t border-white/10">
                    <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">Theme</p>
                    <ThemeToggle />
                </div>

                {/* Footer info */}
                <div className="absolute bottom-8 left-8 right-8">
                    <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-gray-600">
                        Available for projects
                    </p>
                </div>
            </div>
        </>
    );
};
