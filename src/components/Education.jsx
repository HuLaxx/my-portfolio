import Link from "next/link";
import { RevealOnScroll } from "./RevealOnScroll";

export const Education = ({ resume }) => {
    return (
        <section id="education" className="relative z-10 py-10 md:py-12">
            <div className="mx-auto w-[98%] md:w-full md:max-w-6xl px-4 sm:px-6 md:px-12">
                <div className="p-4 sm:p-8 md:p-12">
                    <RevealOnScroll>
                        <div className="mb-12">
                            <div className="flex items-center gap-3 sm:gap-4 mb-4">
                                <div className="h-[2px] sm:h-[3px] w-10 sm:w-14 bg-[var(--accent)]"></div>
                                <p className="font-display text-base sm:text-xl md:text-2xl font-black italic uppercase tracking-[0.1em] text-[var(--foreground)]">
                                    Academic Background
                                </p>
                            </div>
                            <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-[var(--foreground)]">
                                Education
                            </h2>
                        </div>
                    </RevealOnScroll>

                    <div className="flex flex-col gap-6">
                        {resume.studies.map((study, index) => {
                            const moduleHighlights = study.modules?.slice(0, 4) ?? [];
                            const remainingModules = Math.max(
                                0,
                                (study.modules?.length ?? 0) - moduleHighlights.length
                            );

                            const CardContent = (
                                <div className={`relative h-full min-h-[260px] sm:min-h-[300px] md:min-h-[320px] p-5 sm:p-8 rounded-2xl sm:rounded-3xl transition-all duration-700 hover:shadow-2xl overflow-hidden bg-[var(--card)]/30 backdrop-blur-sm border border-[var(--border)] hover:bg-[var(--card-hover-tint)] hover:border-[var(--accent)] hover:translate-y-[-4px] ${study.slug ? "cursor-pointer" : ""}`}>

                                    {/* Hover Gradient Overlay - Fade in/out */}
                                    <div
                                        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
                                        style={{ background: 'var(--hover-overlay)' }}
                                    />

                                    <div className="relative z-10 flex flex-col justify-between h-full gap-6">

                                        {/* Top Row: Year & Institution */}
                                        <div className="flex flex-col gap-1 sm:gap-2">
                                            <span className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-[var(--accent-dark)] opacity-80 group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                {study.year}
                                            </span>
                                            <h3 className="display-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                {study.degree}
                                            </h3>
                                            <span className="font-mono text-sm sm:text-base font-bold uppercase tracking-wider text-[var(--foreground)] opacity-70 group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                {study.institution}
                                            </span>
                                        </div>

                                        {/* Bottom Row: Dissertation & Highlights */}
                                        <div className="space-y-4">
                                            <div>
                                                <span className="text-sm font-bold uppercase tracking-wider text-[var(--accent)] mb-2 block group-hover:text-[var(--text-hover)] transition-colors duration-500 flex items-center gap-2">
                                                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></span>
                                                    Dissertation Project
                                                </span>
                                                <p className="text-[var(--foreground)] font-medium text-lg leading-relaxed group-hover:text-[var(--text-hover)] transition-colors duration-500 max-w-[80%] sm:max-w-[65%]">
                                                    {study.dissertation}
                                                </p>
                                            </div>

                                            <div>
                                                <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-2 block group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                    Course Highlights
                                                </span>
                                                <div className="flex flex-wrap gap-2">
                                                    {moduleHighlights.map((module, i) => (
                                                        <span key={i} className="px-2 py-1 rounded border border-[var(--border)] bg-[var(--card)]/50 text-[10px] font-mono uppercase tracking-wider text-[var(--foreground)] opacity-70 group-hover:border-[var(--accent)] group-hover:text-[var(--text-hover)] transition-all duration-500">
                                                            {module}
                                                        </span>
                                                    ))}
                                                    {remainingModules > 0 && (
                                                        <span className="px-2 py-1 rounded border border-[var(--border)] bg-[var(--card)]/50 text-[10px] font-mono uppercase tracking-wider text-[var(--muted)] opacity-70 group-hover:border-[var(--accent)] group-hover:text-[var(--text-hover)] transition-all duration-500">
                                                            +{remainingModules} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>

                                        {/* Decorative Icon or Element */}
                                        <div className="absolute -bottom-4 -right-4 text-[var(--accent)] opacity-5 transform rotate-[-15deg] scale-150 pointer-events-none group-hover:opacity-10 transition-all duration-700">
                                            <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                                            </svg>
                                        </div>
                                    </div>

                                    {/* Right-Side Hover Expansion - Slide-in Drawer */}
                                    {study.slug && (
                                        <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-[var(--card)] via-[var(--card)]/90 to-transparent opacity-80 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-500 ease-out flex-col justify-center items-end pr-8 md:pr-12 pointer-events-none z-20">
                                            <div className="flex flex-col items-end gap-3 text-right">
                                                <span className="p-3 rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                                <div>
                                                    <span className="font-bold text-sm uppercase tracking-wider text-[var(--foreground)] block mb-1">
                                                        View Degree
                                                    </span>
                                                    <span className="text-xs font-mono text-[var(--muted)] block">
                                                        Modules & Dissertation
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            );

                            return (
                                <RevealOnScroll key={index} delay={index * 100}>
                                    {study.slug ? (
                                        <Link href={`/education/${study.slug}`} className="group relative block w-full">
                                            {CardContent}
                                        </Link>
                                    ) : (
                                        <div className="group relative block w-full">
                                            {CardContent}
                                        </div>
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
