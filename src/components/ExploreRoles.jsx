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
    },
    {
        id: "data-engineer",
        title: "Data Engineer",
        description: "Architecting robust data pipelines and scalable infrastructure to ensure data reliability, availability, and performance.",
        href: "/role/data-engineer",
        gradient: "from-emerald-400 to-teal-300",
    },
    {
        id: "ai-ml-engineer",
        title: "AI/ML Engineer",
        description: "Building and deploying state-of-the-art artificial intelligence models to solve real-world problems and automate intelligent decision-making.",
        href: "/role/ai-ml-engineer",
        gradient: "from-purple-400 to-pink-300",
    },
];

export const ExploreRoles = () => {
    return (
        <section id="roles" className="relative py-32 flex flex-col justify-center overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 md:px-12 relative z-10 w-full">

                <RevealOnScroll>
                    <div className="flex items-center gap-4 mb-12">
                        <div className="h-[2px] w-12 bg-[var(--accent)]"></div>
                        <h2 className="font-mono text-sm tracking-[0.32em] uppercase text-[var(--accent)]">
                            Explore My Roles
                        </h2>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
                    {roles.map((role, index) => (
                        <RevealOnScroll key={role.id} delay={index * 100}>
                            <Link href={role.href} className="group relative block h-full">
                                <div className="relative h-full p-8 rounded-3xl border border-white/10 bg-[var(--card)]/30 backdrop-blur-sm overflow-hidden transition-all duration-500 group-hover:border-white/20 group-hover:translate-y-[-4px] group-hover:shadow-2xl">

                                    {/* Hover Gradient Background */}
                                    <div className={`absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 bg-gradient-to-br ${role.gradient}`} />

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col h-full">
                                        <h3 className="text-2xl md:text-3xl font-bold mb-4 text-[var(--foreground)] group-hover:text-white transition-colors">
                                            {role.title}
                                        </h3>

                                        <p className="text-sm md:text-base leading-relaxed text-[var(--muted)] group-hover:text-white/80 mb-8 flex-grow">
                                            {role.description}
                                        </p>

                                        <div className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-[var(--accent)] group-hover:text-white transition-colors">
                                            <span>View Projects</span>
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="transform transition-transform duration-300 group-hover:translate-x-1">
                                                <path d="M5 12H19M19 12L12 5M19 12L12 19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </RevealOnScroll>
                    ))}
                </div>

            </div>
        </section>
    );
};
