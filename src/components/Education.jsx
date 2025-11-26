import { RevealOnScroll } from "./RevealOnScroll";

export const Education = ({ resume }) => {
    return (
        <section id="education" className="relative z-10 px-6 py-24 md:px-20">
            <div className="mx-auto max-w-6xl">
                <div className="p-8 md:p-12">
                    <RevealOnScroll>
                        <div className="mb-12">
                            <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-4">
                                Academic Background
                            </p>
                            <h2 className="display-heading text-4xl font-semibold tracking-tight text-white md:text-7xl">
                                Education
                            </h2>
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 gap-8">
                        {resume.studies.map((study, index) => (
                            <RevealOnScroll key={index} delay={index * 100}>
                                <div className="nav-shell group relative h-full p-8 rounded-2xl transition-all duration-500 hover:shadow-[0_0_40px_-10px_var(--accent)]">
                                    <div className="relative z-10 flex flex-col h-full justify-between">
                                        <div>
                                            <div className="flex items-start justify-between mb-4">
                                                <h4 className="text-2xl font-bold text-white/95 group-hover:text-[var(--accent)] transition-colors drop-shadow-sm">{study.degree}</h4>
                                                <span className="font-mono text-xs px-3 py-1 rounded-full border border-white/20 bg-white/10 text-[var(--accent)] shadow-sm">
                                                    {study.year}
                                                </span>
                                            </div>
                                            <p className="text-lg text-white/80 mb-6 font-medium drop-shadow-sm">{study.institution}</p>

                                            {study.dissertation && (
                                                <div className="mb-6 p-4 rounded-xl bg-black/30 border border-white/10 shadow-inner">
                                                    <p className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-2">Dissertation</p>
                                                    <p className="text-sm text-white/75 italic leading-relaxed">"{study.dissertation}"</p>
                                                </div>
                                            )}
                                        </div>

                                        {study.modules && (
                                            <div className="mt-4">
                                                <div className="flex flex-wrap gap-2">
                                                    {study.modules.map((mod, i) => (
                                                        <span key={i} className="text-[10px] uppercase tracking-wider px-2 py-1 rounded border border-white/15 bg-white/8 text-white/70 group-hover:border-white/25 group-hover:bg-white/12 transition-colors shadow-sm">
                                                            {mod}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
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
