import { RevealOnScroll } from "./RevealOnScroll";

export const Experience = ({ experience }) => {
    return (
        <section id="experience" className="relative z-10 px-6 py-24 md:px-20">
            <div className="mx-auto max-w-6xl">
                <div className="p-8 md:p-12">
                    <RevealOnScroll>
                        <div className="mb-12 flex items-end justify-between">
                            <div>
                                <p className="font-mono text-xs uppercase tracking-[0.3em] text-white/50 mb-2">
                                    Career
                                </p>
                                <h2 className="display-heading text-4xl font-semibold tracking-tight text-white md:text-7xl">
                                    Experience
                                </h2>
                            </div>
                            <div className="hidden md:block h-[1px] w-32 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30 mb-4" />
                        </div>
                    </RevealOnScroll>

                    <div className="grid grid-cols-1 gap-6">
                        {experience?.map((job, index) => (
                            <RevealOnScroll key={index} delay={index * 100}>
                                <div className="nav-shell group h-full overflow-hidden rounded-2xl transition-all duration-500 hover:shadow-[0_0_40px_-10px_var(--accent)]">
                                    <div className="p-8 grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                                        {/* Company & Period */}
                                        <div className="md:col-span-4 flex flex-col justify-between h-full">
                                            <div>
                                                <h3 className="text-2xl font-bold text-white mb-2 group-hover:text-[var(--accent)] transition-colors">{job.company}</h3>
                                                <span className="inline-flex items-center rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-medium text-white/60">
                                                    {job.period}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Role & Description */}
                                        <div className="md:col-span-8">
                                            <h4 className="text-xl font-medium text-white/90 mb-4">{job.role}</h4>
                                            <p className="text-white/70 leading-relaxed text-base">
                                                {job.description}
                                            </p>
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
