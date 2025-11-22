import { RevealOnScroll } from "./RevealOnScroll";

export const Education = ({ resume }) => {
    return (
        <section id="education" className="relative z-10 px-6 py-24 md:px-20 border-t border-white/5">
            <div className="mx-auto max-w-6xl">
                <RevealOnScroll>
                    <div className="mb-16">
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500 mb-4">
                            Academic Background
                        </p>
                        <h2 className="display-heading text-4xl font-semibold tracking-tight text-white md:text-7xl">
                            Education
                        </h2>
                    </div>
                </RevealOnScroll>

                <RevealOnScroll delay={200}>
                    <div className="space-y-12">
                        {resume.studies.map((study, index) => (
                            <div key={index} className="relative pl-8 border-l border-white/10">
                                <div className="absolute -left-[5px] top-0 w-[9px] h-[9px] rounded-full bg-[var(--accent)]" />
                                <div className="flex flex-col md:flex-row md:items-baseline justify-between mb-2">
                                    <h4 className="text-xl font-bold text-white">{study.degree}</h4>
                                    <span className="font-mono text-sm text-[var(--accent)]">{study.year}</span>
                                </div>
                                <p className="text-gray-400 mb-4">{study.institution}</p>

                                {study.dissertation && (
                                    <div className="mb-4">
                                        <p className="text-sm font-semibold text-gray-300 mb-1">Dissertation:</p>
                                        <p className="text-sm text-gray-500 italic">"{study.dissertation}"</p>
                                    </div>
                                )}

                                {study.modules && (
                                    <div>
                                        <p className="text-sm font-semibold text-gray-300 mb-2">Key Modules:</p>
                                        <div className="flex flex-wrap gap-2">
                                            {study.modules.map((mod, i) => (
                                                <span key={i} className="text-xs px-2 py-1 rounded bg-white/5 text-gray-400 border border-white/5">
                                                    {mod}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>
            </div>
        </section>
    );
};
