import { RevealOnScroll } from "./RevealOnScroll";

export const About = ({ resume }) => {
    return (
        <section id="about" className="relative z-10 px-6 pb-24 md:px-20">
            {/* Visual Connector from Hero */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1px] h-24 bg-gradient-to-b from-transparent via-[var(--accent)] to-transparent opacity-50" />

            <div className="mx-auto max-w-6xl pt-24">
                <RevealOnScroll>
                    <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
                        <div>
                            <div className="flex items-center gap-4 mb-4">
                                <div className="h-[3px] w-14 bg-[var(--accent)]"></div>
                                <p className="font-mono text-sm font-black italic uppercase tracking-[0.3em] text-[var(--foreground)] opacity-80">
                                    Profile
                                </p>
                            </div>
                            <h2 className="display-heading text-4xl font-semibold tracking-tight text-[var(--foreground)] md:text-7xl">
                                About Me
                            </h2>
                        </div>
                    </div>
                </RevealOnScroll>

                <div className="grid grid-cols-1 gap-16">
                    <RevealOnScroll delay={100}>
                        <div className="relative pl-8 border-l border-[var(--border)]">
                            <div className="absolute -left-[1px] top-0 h-full w-[2px] bg-gradient-to-b from-[var(--accent)] to-transparent opacity-30" />
                            <h3 className="text-2xl font-bold text-[var(--foreground)] mb-6">Bio</h3>
                            <p className="text-lg text-[var(--foreground)] font-medium leading-relaxed">
                                {resume.summary}
                            </p>
                            <p className="mt-4 text-[var(--foreground)] font-medium opacity-90">
                                {resume.neuralSummary}
                            </p>
                        </div>
                    </RevealOnScroll>
                </div>
            </div>
        </section>
    );
};
