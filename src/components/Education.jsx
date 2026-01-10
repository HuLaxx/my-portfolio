import { RevealOnScroll } from "./RevealOnScroll";

export const Education = ({ resume }) => {
    return (
        <section id="education" className="relative z-10 py-10 md:py-12">
            <div className="mx-auto w-[98%] md:w-full md:max-w-6xl px-6 md:px-12">
                <div className="p-8 md:p-12">
                    <RevealOnScroll>
                        <div className="mb-12">
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-[3px] w-14 bg-[var(--accent)]"></div>
                                <p className="font-display text-xl md:text-2xl font-black italic uppercase tracking-[0.1em] text-[var(--foreground)]">
                                    Academic Background
                                </p>
                            </div>
                            <h2 className="display-heading text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-7xl">
                                Education
                            </h2>
                        </div>
                    </RevealOnScroll>

                    <div className="flex flex-col gap-6">
                        {resume.studies.map((study, index) => (
                            <RevealOnScroll key={index} delay={index * 100}>
                                <div className="group relative block w-full">
                                    {/* Unified Card Style - Exact match to Work.jsx */}
                                    <div className="group relative h-full min-h-[320px] p-8 rounded-3xl transition-all duration-700 hover:shadow-2xl overflow-hidden bg-[var(--card)]/30 backdrop-blur-sm border border-[var(--border)] hover:bg-[var(--card-hover-tint)] hover:border-[var(--accent)] hover:translate-y-[-4px]">

                                        {/* Hover Gradient Overlay - Fade in/out */}
                                        <div
                                            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
                                            style={{ background: 'var(--hover-overlay)' }}
                                        />

                                        <div className="relative z-10 flex flex-col justify-between h-full gap-6">

                                            {/* Top Row: Year & Institution */}
                                            <div className="flex justify-between items-start">
                                                <div className="flex flex-col gap-2">
                                                    <span className="font-mono text-sm font-bold uppercase tracking-[0.22em] text-[var(--accent-dark)] opacity-80 group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                        {study.year}
                                                    </span>
                                                    <h3 className="display-heading text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-4xl group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                        {study.degree}
                                                    </h3>
                                                </div>
                                                <div className="text-right">
                                                    <span className="font-mono text-xs font-semibold uppercase tracking-wider text-[var(--foreground)] opacity-60 group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                        {study.institution}
                                                    </span>
                                                </div>
                                            </div>

                                            {/* Bottom Row: Dissertation & Modules */}
                                            <div className="space-y-4">
                                                <div>
                                                    <span className="text-xs font-bold uppercase tracking-wider text-[var(--accent)] mb-2 block group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                        Dissertation
                                                    </span>
                                                    <p className="text-[var(--foreground)] opacity-90 text-sm leading-relaxed group-hover:text-[var(--text-hover)] transition-colors duration-500">
                                                        {study.dissertation}
                                                    </p>
                                                </div>

                                                <div className="flex flex-wrap gap-2">
                                                    {study.modules.map((module, i) => (
                                                        <span key={i} className="px-2 py-1 rounded border border-[var(--border)] bg-[var(--card)]/50 text-[10px] font-mono uppercase tracking-wider text-[var(--foreground)] opacity-70 group-hover:border-[var(--accent)] group-hover:text-[var(--text-hover)] transition-all duration-500">
                                                            {module}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>

                                            {/* Decorative Icon or Element */}
                                            <div className="absolute -bottom-4 -right-4 text-[var(--accent)] opacity-5 transform rotate-[-15deg] scale-150 pointer-events-none group-hover:opacity-10 transition-all duration-700">
                                                <svg width="120" height="120" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 3L1 9L12 15L21 10.09V17H23V9M5 13.18V17.18L12 21L19 17.18V13.18L12 17L5 13.18Z" />
                                                </svg>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
