import { RevealOnScroll } from "./RevealOnScroll";

export const About = ({ resume }) => {
    return (
        <section id="about" className="relative z-10 px-6 py-24 md:px-20 border-t border-white/5">
            <div className="mx-auto max-w-6xl">
                <RevealOnScroll>
                    <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
                                Profile
                            </p>
                            <h2 className="display-heading text-4xl font-semibold tracking-tight text-white md:text-7xl">
                                About Me
                            </h2>
                        </div>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 gap-16">
                    <RevealOnScroll delay={100}>
                        <div>
                            <h3 className="text-2xl font-semibold text-white mb-6">Bio</h3>
                            <p className="text-lg text-gray-300 leading-relaxed">
                                {resume.summary}
                            </p>
                            <p className="mt-4 text-gray-400">
                                {resume.neuralSummary}
                            </p>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};
