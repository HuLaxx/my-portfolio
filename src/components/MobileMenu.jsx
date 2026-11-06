'use client';

import Link from "next/link";
import { useEffect } from "react";
import {
    ArrowUpRight,
    BrainCircuit,
    BriefcaseBusiness,
    ChevronRight,
    Code2,
    Compass,
    Database,
    FlaskConical,
    FolderKanban,
    Github,
    GraduationCap,
    Linkedin,
    Mail,
    PanelsTopLeft,
    Sparkles,
    X,
} from "lucide-react";
import { MobileThemePicker } from "./MobileThemePicker";

const sections = [
    { href: "/#roles", label: "Explore", caption: "What I do", Icon: Compass },
    { href: "/#experience", label: "Experience", caption: "My journey", Icon: BriefcaseBusiness },
    { href: "/#projects", label: "Projects", caption: "Selected work", Icon: FolderKanban },
    { href: "/#education", label: "Education", caption: "My studies", Icon: GraduationCap },
];

const roles = [
    { label: "Data Scientist", href: "/role/data-scientist", Icon: FlaskConical },
    { label: "Data Engineer", href: "/role/data-engineer", Icon: Database },
    { label: "AI/ML Engineer", href: "/role/ai-ml-engineer", Icon: BrainCircuit },
    { label: "Software Engineer", href: "/role/software-engineer", Icon: Code2 },
    { label: "Full Stack Developer", href: "/role/full-stack-developer", Icon: PanelsTopLeft },
];

const contacts = [
    { label: "Email", href: "mailto:rahulkhanke786@gmail.com", Icon: Mail },
    { label: "LinkedIn", href: "https://linkedin.com/in/rahul-khanke-853717218", Icon: Linkedin },
    { label: "GitHub", href: "https://github.com/HuLaxx", Icon: Github },
];

export const MobileMenu = ({ isOpen, onClose }) => {
    // MenuProvider owns body-scroll locking, so this drawer doesn't apply a second lock.

    useEffect(() => {
        if (!isOpen) return undefined;
        const handleEscape = (event) => {
            if (event.key === "Escape") onClose();
        };
        document.addEventListener("keydown", handleEscape);
        return () => document.removeEventListener("keydown", handleEscape);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <>
            <div
                className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm xl:hidden"
                onClick={onClose}
                aria-hidden="true"
            />

            <div
                className="fixed right-0 top-0 z-50 flex h-[100dvh] w-[min(90vw,23rem)] max-w-full flex-col overflow-y-auto overscroll-contain rounded-l-3xl border-l border-[var(--border)]/25 bg-[var(--panel)]/95 text-[var(--foreground)] shadow-2xl backdrop-blur-xl xl:hidden"
                role="dialog"
                aria-modal="true"
                aria-label="Portfolio navigation"
            >
                <div className="sticky top-0 z-30 flex shrink-0 items-center justify-between border-b border-[var(--border)]/15 bg-[var(--panel)]/95 px-3 py-2.5 backdrop-blur-xl sm:px-5 sm:py-3">
                    <div>
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--muted)]">
                            Portfolio
                        </p>
                        <p className="text-base font-bold leading-tight">Explore the site</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-[var(--border)]/25 bg-[var(--card)] text-[var(--foreground)] transition-colors hover:bg-[var(--accent)]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                        aria-label="Close menu"
                    >
                        <X className="h-5 w-5" aria-hidden="true" />
                    </button>
                </div>

                <nav aria-label="Page sections" className="px-3 pb-2.5 pt-2.5 sm:px-5">
                    <p className="mb-1 font-mono text-[9px] font-bold uppercase tracking-[0.2em] text-[var(--muted)]">
                        Discover
                    </p>
                    <div className="grid grid-cols-2 gap-1.5">
                        {sections.map(({ href, label, caption, Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={onClose}
                                className="group relative flex min-h-[58px] min-w-0 flex-col justify-between overflow-hidden rounded-lg border border-[var(--border)]/20 bg-[var(--accent)]/10 px-2.5 py-2 transition-all duration-300 hover:-translate-y-0.5 hover:border-[var(--accent)] hover:bg-[var(--accent)]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                            >
                                <span className="flex items-center justify-between gap-1">
                                    <Icon className="h-4 w-4 shrink-0 text-[var(--accent-dark)]" aria-hidden="true" />
                                    <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
                                </span>
                                <span className="min-w-0">
                                    <span className="block break-words text-xs font-bold leading-tight">{label}</span>
                                    <span className="block text-[9px] leading-tight text-[var(--muted)]">{caption}</span>
                                </span>
                            </Link>
                        ))}
                    </div>
                </nav>

                <MobileThemePicker />

                <section className="border-t border-[var(--border)]/15 px-3 pb-2.5 pt-2.5 sm:px-5" aria-labelledby="mobile-roles-heading">
                    <div className="mb-2 flex items-center gap-2">
                        <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--accent)]/10 text-[var(--accent-dark)]">
                            <Sparkles className="h-4 w-4" aria-hidden="true" />
                        </span>
                        <div>
                            <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Explore my work</p>
                            <h3 id="mobile-roles-heading" className="text-sm font-bold leading-tight">Professional roles</h3>
                        </div>
                    </div>
                    <div className="grid grid-cols-2 gap-1.5">
                        {roles.map(({ href, label, Icon }) => (
                            <Link
                                key={href}
                                href={href}
                                onClick={onClose}
                                className="group flex min-h-[42px] min-w-0 items-center gap-1.5 rounded-lg border border-[var(--border)]/20 bg-[var(--card)]/60 px-2 py-1.5 transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/10 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                            >
                                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-[var(--accent)]/15 text-[var(--accent-dark)]">
                                    <Icon className="h-4 w-4" aria-hidden="true" />
                                </span>
                                <span className="min-w-0 flex-1 break-words text-[10px] font-semibold leading-tight sm:text-xs">{label}</span>
                                <ChevronRight className="hidden h-4 w-4 shrink-0 text-[var(--muted)] transition-transform group-hover:translate-x-1 sm:block" aria-hidden="true" />
                            </Link>
                        ))}
                    </div>
                </section>

                <section className="border-t border-[var(--border)]/15 px-3 pb-3 pt-2.5 sm:px-5" aria-labelledby="mobile-contact-heading">
                    <div className="mb-1.5">
                        <p className="font-mono text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--muted)]">Let's connect</p>
                        <h3 id="mobile-contact-heading" className="text-sm font-bold">Get in touch</h3>
                    </div>
                    <div className="grid grid-cols-3 gap-1.5">
                        {contacts.map(({ label, href, Icon }) => (
                            <a
                                key={label}
                                href={href}
                                target={href.startsWith("mailto:") ? undefined : "_blank"}
                                rel={href.startsWith("mailto:") ? undefined : "noopener noreferrer"}
                                onClick={onClose}
                                className="group flex min-h-[42px] min-w-0 flex-row items-center justify-center gap-1 rounded-lg border border-[var(--border)]/20 bg-[var(--accent)]/10 px-1 py-1.5 text-center transition-all hover:border-[var(--accent)] hover:bg-[var(--accent)]/20 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]"
                            >
                                <Icon className="h-3.5 w-3.5 shrink-0 text-[var(--accent-dark)]" aria-hidden="true" />
                                <span className="text-[9px] font-bold">{label}</span>
                            </a>
                        ))}
                    </div>
                    <Link
                        href="/#footer"
                        onClick={onClose}
                        className="mt-2 flex items-center justify-between rounded-lg border border-[var(--border)]/20 px-2.5 py-1.5 text-[10px] font-semibold transition-colors hover:border-[var(--accent)] hover:bg-[var(--accent)]/10"
                    >
                        View the Let's Connect section
                        <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden="true" />
                    </Link>
                </section>
            </div>
        </>
    );
};
