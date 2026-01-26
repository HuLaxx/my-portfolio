import { getPortfolioContent } from "@/lib/cms/content-service";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import Link from "next/link";
import { notFound } from "next/navigation";

export const runtime = "edge";

export default async function RolePage({ params }) {
    const { slug } = await params;
    const content = await getPortfolioContent();
    const role = content.roles?.[slug];

    if (!role) {
        return notFound();
    }

    // Filter projects related to this role
    const relatedProjects = content.projects.filter(p => role.projects.includes(p.slug));

    return (
        <div className="relative min-h-screen w-full overflow-hidden text-[var(--foreground)]">
            <Navbar />

            <main className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-12 pt-32 pb-24">
                {/* Hero Section */}
                <RevealOnScroll>
                    <div className="mb-24">
                        <Link href="/" className="group inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-[var(--muted)] hover:text-[var(--foreground)] mb-12 transition-all duration-300">
                            <span className="p-2 rounded-full border border-[var(--border)] bg-[var(--card)] group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors duration-300">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-black transition-colors duration-300">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </span>
                            Back to Home
                        </Link>
                        <h1 className="display-heading text-6xl md:text-9xl font-bold text-[var(--foreground)] mb-8 tracking-tighter">
                            {role.title}
                        </h1>
                        <p className="text-xl md:text-2xl text-[var(--muted)] max-w-3xl leading-relaxed border-l-2 border-[var(--accent)] pl-6">
                            {role.description}
                        </p>
                    </div>
                </RevealOnScroll>

                {/* Stats Grid */}
                <RevealOnScroll delay={100}>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
                        {role.stats.map((stat, index) => (
                            <div key={index} className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] backdrop-blur-sm hover:border-[var(--accent)] transition-all duration-500 group">
                                <p className="text-4xl md:text-5xl font-bold text-[var(--foreground)] mb-2 group-hover:scale-110 transition-transform origin-left">
                                    {stat.value}
                                </p>
                                <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                                    {stat.label}
                                </p>
                            </div>
                        ))}
                    </div>
                </RevealOnScroll>

                {/* Skills & Projects Split */}
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
                    {/* Skills Sidebar */}
                    <div className="lg:col-span-4">
                        <RevealOnScroll delay={200}>
                            <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--muted)] mb-8">
                                Core Competencies
                            </h3>
                            <div className="flex flex-wrap gap-3">
                                {role.skills.map((skill, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 rounded-full border border-[var(--border)] text-sm text-[var(--foreground)] bg-[var(--card)]/50 hover:bg-[var(--accent)]/10 hover:border-[var(--accent)] transition-all duration-300 cursor-default"
                                    >
                                        {skill}
                                    </span>
                                ))}
                            </div>
                        </RevealOnScroll>
                    </div>

                    {/* Projects List */}
                    <div className="lg:col-span-8">
                        <RevealOnScroll delay={300}>
                            <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--muted)] mb-8">
                                Selected Work
                            </h3>
                            <div className="space-y-8">
                                {relatedProjects.map((project, index) => (
                                    <Link
                                        href={`/case/${project.slug}`}
                                        key={index}
                                        className="group relative block p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-500"
                                    >
                                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                                            <h4 className="text-3xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                                                {project.client}
                                            </h4>
                                            <span className="font-mono text-xs text-[var(--muted)]">{project.year}</span>
                                        </div>
                                        <p className="text-[var(--muted)] mb-6 max-w-xl">
                                            {project.summary}
                                        </p>

                                        {/* GitHub-style Language Bar */}
                                        {project.languages && (
                                            <div className="mb-6">
                                                <div className="flex h-2 w-full overflow-hidden rounded-full bg-[var(--card)] mb-2">
                                                    {Object.entries(project.languages).map(([lang, pct], i) => (
                                                        <div
                                                            key={lang}
                                                            style={{ width: `${pct}%`, backgroundColor: ['#3178c6', '#f1e05a', '#e34c26', '#563d7c'][i % 4] }}
                                                            className="h-full"
                                                        />
                                                    ))}
                                                </div>
                                                <div className="flex gap-4 text-xs text-[var(--muted)] font-mono">
                                                    {Object.entries(project.languages).map(([lang, pct], i) => (
                                                        <div key={lang} className="flex items-center gap-1.5">
                                                            <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#3178c6', '#f1e05a', '#e34c26', '#563d7c'][i % 4] }} />
                                                            <span>{lang} {pct}%</span>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}

                                        <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-[var(--card)] via-[var(--card)]/90 to-transparent opacity-80 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-500 ease-out flex-col justify-center items-end pr-8 pointer-events-none">
                                            <div className="flex flex-col items-end gap-3 text-right">
                                                <span className="p-3 rounded-full border border-[var(--accent)] bg-[var(--accent)]/10 text-[var(--accent)] group-hover:bg-[var(--accent)] group-hover:text-black transition-all duration-500 shadow-[0_0_15px_rgba(0,0,0,0.2)]">
                                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                                        <path d="M5 12h14M12 5l7 7-7 7" />
                                                    </svg>
                                                </span>
                                                <div>
                                                    <span className="font-bold text-sm uppercase tracking-wider text-[var(--foreground)] block mb-1">
                                                        View Case Study
                                                    </span>
                                                    <span className="text-xs font-mono text-[var(--muted)] block">
                                                        Deep Dive & Metrics
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        </RevealOnScroll>
                    </div>
                </div>
            </main>
            <Footer />
        </div>
    );
}
