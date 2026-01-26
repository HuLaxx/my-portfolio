'use client';

import Link from "next/link";
import { RevealOnScroll } from "./RevealOnScroll";
import { Watermark } from "./Watermark";
import { BrainCircuit, Server, Terminal, Code2, Sprout, Briefcase, Activity } from "lucide-react";

export const Experience = ({ experience }) => {

    const getRoleWatermark = (title) => {
        const t = title.toLowerCase();
        if (t.includes('ai') || t.includes('machine learning')) return { type: 'neon', icon: BrainCircuit };
        if (t.includes('data scientist')) return { type: 'wireframe', icon: Activity };
        if (t.includes('data engineer')) return { type: 'wireframe', icon: Server };
        if (t.includes('intern')) return { type: 'soft', icon: Sprout };
        if (t.includes('frontend') || t.includes('web')) return { type: 'classic', icon: Code2 };
        return { type: 'engraved', icon: Briefcase };
    };

    return (
        <section id="experience" className="relative z-10 py-10 md:py-12">
            <div className="mx-auto w-[98%] md:w-full md:max-w-6xl px-4 sm:px-6 md:px-12">
                <div className="p-4 sm:p-8 md:p-12">
                    <RevealOnScroll>
                        <div className="mb-12 flex items-end justify-between">
                            <div>
                                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                                    <div className="h-[2px] sm:h-[3px] w-10 sm:w-14 bg-[var(--accent)]"></div>
                                    <p className="font-display text-base sm:text-xl md:text-2xl font-black italic uppercase tracking-[0.1em] text-[var(--foreground)]">
                                        Career
                                    </p>
                                </div>
                                <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-[var(--foreground)]">
                                    Experience
                                </h2>
                            </div>
                            <div className="hidden md:block h-[1px] w-32 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30 mb-4" />
                        </div>
                    </RevealOnScroll>

                    <div className="flex flex-col gap-6">
                        {experience?.map((job, index) => {
                            const { type, icon } = getRoleWatermark(job.role);

                            const CardContent = () => (
                                <div className="group relative h-full min-h-[240px] sm:min-h-[280px] md:min-h-[320px] p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--card)]/30 backdrop-blur-sm overflow-hidden transition-all duration-700 hover:shadow-2xl hover:translate-y-[-4px] hover:bg-[var(--card-hover-tint)] hover:border-[var(--accent)] flex flex-col justify-between">

                                    {/* Hover Gradient Overlay */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
                                        style={{ background: 'var(--hover-overlay)' }}
                                    />

                                    {/* Bottom Accent Bar (only if clickable) */}
                                    {job.slug && (
                                        <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden rounded-b-3xl">
                                            <div className="h-1 bg-[var(--accent)] opacity-30 group-hover:opacity-100 transition-all duration-500" />
                                        </div>
                                    )}

                                    {/* Keyword-based Watermark */}
                                    <Watermark type={type} icon={icon} />

                                    <div className="relative z-10 flex flex-col gap-6 h-full">
                                        <div className="flex flex-col gap-1 sm:gap-2">
                                            <span className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-[var(--accent-dark)] opacity-80 group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                {job.period}
                                            </span>
                                            <h3 className="display-heading text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                {job.role}
                                            </h3>
                                            <span className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-[var(--foreground)] opacity-70 group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                {job.company}
                                            </span>
                                        </div>

                                        <p className="max-w-2xl text-[var(--foreground)] opacity-90 leading-relaxed text-base sm:text-lg font-medium group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                            {job.description}
                                        </p>

                                    </div>

                                    {/* Right-Side Hover Expansion - Only if clickable, hidden on mobile */}
                                    {job.slug && (
                                        <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-[var(--card)] via-[var(--card)]/90 to-transparent opacity-80 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-500 ease-out flex-col justify-center items-end pr-8 md:pr-12 pointer-events-none z-20">
                                            <div className="flex flex-col items-end gap-3 text-right">
                                                <span className="p-3 rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                                <div>
                                                    <span className="font-bold text-sm uppercase tracking-wider text-[var(--foreground)] block mb-1">
                                                        View Details
                                                    </span>
                                                    <span className="text-xs font-mono text-[var(--muted)] block">
                                                        Tech Stack & Impact
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );

                            return (
                                <RevealOnScroll key={index} delay={index * 100}>
                                    {job.slug ? (
                                        <Link href={`/company/${job.slug}`} className="block h-full">
                                            <CardContent />
                                        </Link>
                                    ) : (
                                        <CardContent />
                                    )}
                                </RevealOnScroll>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
