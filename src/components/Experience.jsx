import { RevealOnScroll } from "./RevealOnScroll";

export const Experience = ({ experience }) => {
    return (
        <section id="experience" className="relative z-10 px-6 py-24 md:px-20 border-t border-white/5 bg-white/5">
            <div className="mx-auto max-w-6xl">
                <RevealOnScroll>
                    <div className="mb-16">
                        <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
                            Career
                        </p>
                        <h2 className="display-heading text-4xl font-semibold tracking-tight text-white md:text-7xl">
                            Experience
                        </h2>
                    </div>
                </RevealOnScroll>

                <div className="space-y-12">
                    {experience?.map((job, index) => (
                        <RevealOnScroll key={index} delay={index * 100}>
                            <div className="group relative grid grid-cols-1 md:grid-cols-12 gap-6 p-8 rounded-3xl border border-white/5 bg-[var(--card)] hover:border-[var(--accent)] transition-all duration-500">
                                <div className="col-span-1 md:col-span-3">
                                    <p className="font-mono text-xs uppercase tracking-wider text-[var(--accent)] mb-2">
                                        {job.period}
                                    </p>
                                    <h3 className="text-xl font-bold text-white">{job.company}</h3>
                                </div>
                                <div className="col-span-1 md:col-span-9">
                                    <h4 className="text-lg font-medium text-gray-200 mb-3">{job.role}</h4>
                                    <p className="text-gray-400 leading-relaxed">
                                        {job.description}
                                    </p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
};
