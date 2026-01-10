'use client';

import Link from "next/link";
import { RevealOnScroll } from "./RevealOnScroll";

const roles = [
    {
        id: "data-scientist",
        title: "Data Scientist",
        description: "Uncovering hidden patterns and deriving actionable insights from complex datasets using advanced statistical methods and machine learning.",
        href: "/role/data-scientist",
        gradient: "from-blue-400 to-cyan-300",
        index: "01",
        image: "/generated/role-ds.png"
    },
    {
        id: "data-engineer",
        title: "Data Engineer",
        description: "Architecting robust data pipelines and scalable infrastructure to ensure data reliability, availability, and performance.",
        href: "/role/data-engineer",
        gradient: "from-emerald-400 to-teal-300",
        index: "02",
        image: "/generated/role-de.png"
    },
    {
        id: "ai-ml-engineer",
        title: "AI/ML Engineer",
        description: "Building and deploying state-of-the-art artificial intelligence models to solve real-world problems and automate intelligent decision-making.",
        href: "/role/ai-ml-engineer",
        gradient: "from-purple-400 to-pink-300",
        index: "03",
        image: "/generated/role-ai.png"
    },
];

export const ExploreRoles = () => {
    return (
        <section id="roles" className="relative py-12 md:py-16 flex flex-col justify-center overflow-hidden">
            <div className="mx-auto w-[98%] md:w-full md:max-w-6xl px-6 md:px-12 relative z-10">
                <div className="px-2 py-10 md:px-12 md:py-14">
                    <RevealOnScroll>
                        <div className="mb-12">
                            <div className="flex items-center gap-3 sm:gap-4 mb-4">
                                <div className="h-[2px] sm:h-[3px] w-10 sm:w-14 bg-[var(--accent)]"></div>
                                <p className="font-display text-base sm:text-xl md:text-2xl font-black italic uppercase tracking-[0.1em] text-[var(--foreground)]">
                                    What I Do
                                </p>
                            </div>
                            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-[var(--foreground)]">
                                Explore My Roles
                            </h2>
                        </div>
                    </RevealOnScroll>

                    <div className="flex flex-col gap-6">
                        {roles.map((role, index) => (
                            <RevealOnScroll key={role.id} delay={index * 100}>
                                <Link href={role.href} className="group relative block w-full">
                                    {/* Unified Card Style (from ExploreRoles original) */}
                                    <div className="relative w-full p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--card)]/30 backdrop-blur-sm overflow-hidden transition-all duration-700 hover:bg-[var(--card-hover-tint)] hover:border-[var(--accent)] hover:translate-y-[-4px] hover:shadow-2xl">

                                        {/* Glassy gradient hover overlay - Fade in/out */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
                                            style={{ background: 'var(--hover-overlay)' }}
                                        />

                                        {/* Bottom Accent Bar - Always visible, expands on hover */}
                                        <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden rounded-b-3xl">
                                            <div className="h-1 bg-[var(--accent)] opacity-30 group-hover:opacity-100 transition-all duration-500" />
                                        </div>

                                        <div className="relative z-10 grid grid-cols-1 items-start gap-4 md:grid-cols-2">
                                            <div className="col-span-2 font-mono text-base sm:text-xl font-bold uppercase tracking-[0.22em] text-[var(--accent-dark)] opacity-80 group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                {role.index}
                                            </div>
                                            <div className="col-span-2 mt-3 sm:mt-4 space-y-2">
                                                <h3 className="display-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                    {role.title}
                                                </h3>
                                                <p className="text-[var(--foreground)] opacity-90 leading-relaxed text-sm sm:text-base md:text-lg font-medium max-w-md group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                    {role.description}
                                                </p>
                                            </div>

                                            {/* Decorative Icon - Network/Globe */}
                                            <div className="absolute -bottom-4 -right-4 text-[var(--accent)] opacity-5 transform rotate-[-15deg] scale-150 pointer-events-none group-hover:opacity-10 transition-all duration-700">
                                                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM11 19.93C7.05 19.44 4 16.08 4 12C4 11.38 4.08 10.79 4.21 10.21L9 15V16C9 17.1 9.9 18 11 18V19.93ZM17.9 17.39C17.64 16.8 16.9 16 16 16H15V13C15 12.45 14.55 12 14 12H8V10H10C10.55 10 11 9.55 11 9V7H13C14.1 7 15 6.1 15 5V4.59C17.93 5.78 20 8.65 20 12C20 14.08 19.2 15.97 17.9 17.39Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>

            </div>
        </section >
    );
};
