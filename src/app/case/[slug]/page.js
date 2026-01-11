import { getCaseStudy } from "@/lib/cms/content-service";
import { notFound } from "next/navigation";
import { Footer } from "@/components/Footer";

export default async function CaseStudyPage({ params }) {
    const { slug } = await params;
    const project = await getCaseStudy(slug);

    console.log("[DEBUG] CaseStudyPage Slug:", slug);
    console.log("[DEBUG] Project Found:", project);

    if (!project) {
        return (
            <div className="min-h-screen pt-32 px-12 text-center text-white z-50 relative">
                <h1 className="text-4xl font-bold text-red-500">Project Not Found</h1>
                <p className="text-xl mt-4">Slug received: {slug}</p>
                <p className="text-sm mt-2 text-gray-400">Please check if the slug matches the fallback content.</p>
            </div>
        );
    }

    return (
        <div className="relative min-h-screen w-full overflow-hidden text-[var(--foreground)] bg-[var(--background)]">
            {/* Navbar handled by RootLayout */}

            <main className="relative z-10 mx-auto w-full max-w-5xl px-4 md:px-12 pt-32 pb-20 flex flex-col gap-12">
                {/* Header Section */}
                <section className="space-y-6">
                    <div className="flex flex-col gap-2">
                        <span className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.2em] text-[var(--accent)]">
                            {project.client}
                        </span>
                        <h1 className="display-heading text-4xl sm:text-5xl md:text-7xl font-bold tracking-tight text-[var(--foreground)] leading-[1.1]">
                            {project.title}
                        </h1>
                    </div>

                    <p className="text-lg sm:text-xl md:text-2xl text-[var(--muted)] max-w-3xl leading-relaxed">
                        {project.summary}
                    </p>

                    {/* Metrics Grid */}
                    {project.metrics && (
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 pt-8 border-t border-[var(--border)]/30">
                            {project.metrics.map((metric, i) => (
                                <div key={i} className="flex flex-col gap-1">
                                    <span className="text-3xl sm:text-4xl font-bold text-[var(--foreground)]">{metric.value}</span>
                                    <span className="text-xs sm:text-sm font-mono uppercase tracking-wider text-[var(--muted)]">{metric.label}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </section>

                {/* Hero Media */}
                {project.media?.poster && (
                    <div className="relative w-full aspect-video rounded-3xl overflow-hidden border border-[var(--border)]/30 shadow-2xl">
                        <img
                            src={project.media.poster}
                            alt={project.title}
                            className="w-full h-full object-cover"
                        />
                    </div>
                )}

                {/* Content Columns */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-24">
                    {/* Sidebar: Role, Year, Tech */}
                    <div className="md:col-span-1 space-y-8">
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)] mb-4 border-b border-[var(--border)]/30 pb-2">Role</h3>
                            <ul className="space-y-2">
                                {Array.isArray(project.role) ? project.role.map((r, i) => (
                                    <li key={i} className="text-[var(--muted)] text-sm">{r}</li>
                                )) : <li className="text-[var(--muted)] text-sm">{project.role}</li>}
                            </ul>
                        </div>
                        <div>
                            <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)] mb-4 border-b border-[var(--border)]/30 pb-2">Year</h3>
                            <p className="text-[var(--muted)] text-sm">{project.year}</p>
                        </div>
                        {project.tech && (
                            <div>
                                <h3 className="text-sm font-bold uppercase tracking-widest text-[var(--foreground)] mb-4 border-b border-[var(--border)]/30 pb-2">Tech Stack</h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t, i) => (
                                        <span key={i} className="px-2 py-1 rounded-full border border-[var(--border)] bg-[var(--card)]/50 text-xs font-mono text-[var(--muted)]">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Main Content: Challenge & Solution */}
                    <div className="md:col-span-2 space-y-12">
                        {project.scenario && (
                            <div className="space-y-8">
                                <div className="prose prose-invert prose-lg max-w-none">
                                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">The Challenge</h3>
                                    <p className="text-[var(--muted)] leading-relaxed">{project.scenario.challenge}</p>
                                </div>
                                <div className="prose prose-invert prose-lg max-w-none">
                                    <h3 className="text-2xl font-bold text-[var(--foreground)] mb-4">The Solution</h3>
                                    <p className="text-[var(--muted)] leading-relaxed">{project.scenario.solution}</p>
                                </div>
                            </div>
                        )}

                        {/* Process / Approach */}
                        {project.process && (
                            <div className="space-y-6">
                                <h3 className="text-2xl font-bold text-[var(--foreground)]">Process</h3>
                                <div className="grid gap-6">
                                    {project.process.map((step, i) => (
                                        <div key={i} className="p-6 rounded-2xl bg-[var(--card)]/20 border border-[var(--border)]/30">
                                            <h4 className="font-bold text-[var(--foreground)] mb-2">{step.title}</h4>
                                            <p className="text-sm text-[var(--muted)]">{step.detail}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Testimonial */}
                        {project.testimonial && (
                            <blockquote className="p-8 rounded-3xl bg-[var(--accent)]/5 border border-[var(--accent)]/20 relative overflow-hidden">
                                <p className="relative z-10 text-xl md:text-2xl font-medium italic text-[var(--foreground)] mb-6">
                                    "{project.testimonial.quote}"
                                </p>
                                <footer className="relative z-10 text-sm font-bold tracking-wider uppercase text-[var(--accent)]">
                                    — {project.testimonial.author}
                                </footer>
                            </blockquote>
                        )}
                    </div>
                </div>

            </main>
            <Footer />
        </div>
    );
}
