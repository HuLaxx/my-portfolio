'use client';

'use client';

import Link from "next/link";
import { RevealOnScroll } from "./RevealOnScroll";
import { Watermark } from "./Watermark";
import { Activity, Server, BrainCircuit, Terminal } from "lucide-react";

const roles = [
    {
        id: "data-scientist",
        title: "Data Scientist",
        description: "Uncovering hidden patterns and deriving actionable insights from complex datasets using advanced statistical methods and machine learning.",
        href: "/role/data-scientist",
        gradient: "from-blue-400 to-cyan-300",
        index: "01",
        image: "/generated/role-ds.png",
        icon: Activity,
        watermarkType: "wireframe"
    },
    {
        id: "data-engineer",
        title: "Data Engineer",
        description: "Architecting robust data pipelines and scalable infrastructure to ensure data reliability, availability, and performance.",
        href: "/role/data-engineer",
        gradient: "from-emerald-400 to-teal-300",
        index: "02",
        image: "/generated/role-de.png",
        icon: Server,
        watermarkType: "wireframe"
    },
    {
        id: "ai-ml-engineer",
        title: "AI/ML Engineer",
        description: "Building and deploying state-of-the-art artificial intelligence models to solve real-world problems and automate intelligent decision-making.",
        href: "/role/ai-ml-engineer",
        gradient: "from-purple-400 to-pink-300",
        index: "03",
        image: "/generated/role-ai.png",
        icon: BrainCircuit,
        watermarkType: "neon"
    },
    {
        id: "software-engineer",
        title: "Software Engineer",
        description: "Engineered robust full-stack systems, spanning scalable backend architectures, interactive frontends, and cloud-native integration.",
        href: "/role/software-engineer",
        gradient: "from-orange-400 to-amber-300",
        index: "04",
        image: "/generated/role-se.png",
        icon: Terminal,
        watermarkType: "engraved"
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

                                        {/* Slide-in Drawer (Right Side - Matches Experience/Projects) */}
                                        <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/2 h-full bg-gradient-to-l from-[var(--card)] via-[var(--card)]/90 to-transparent translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out flex-col justify-center items-end pr-8 md:pr-12 pointer-events-none z-20">
                                            <div className="flex flex-col items-end gap-3 text-right">
                                                <span className="p-3 rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                                <div>
                                                    <span className="font-bold text-sm uppercase tracking-wider text-[var(--foreground)] block mb-1">
                                                        Explore Role
                                                    </span>
                                                    <span className="text-xs font-mono text-[var(--muted)] block">
                                                        Deep Dive & Skills
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="relative z-10 grid grid-cols-1 items-start gap-4 md:grid-cols-2">
                                            <div className="col-span-2 font-mono text-xl sm:text-2xl font-bold uppercase tracking-[0.22em] text-[var(--accent-dark)] opacity-80 group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                {role.index}
                                            </div>
                                            <div className="col-span-2 mt-3 sm:mt-4 space-y-2">
                                                <h3 className="display-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                    {role.title}
                                                </h3>
                                                <p className="text-[var(--foreground)] opacity-90 leading-relaxed text-base sm:text-lg md:text-xl font-medium max-w-2xl group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                    {role.description}
                                                </p>
                                            </div>

                                            {/* Decorative Watermark - Dynamic */}
                                            <Watermark type={role.watermarkType} icon={role.icon} />
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
