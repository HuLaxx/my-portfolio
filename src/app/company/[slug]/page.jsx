import Link from "next/link";
import { notFound } from "next/navigation";
import { getCompany, getPortfolioContent } from "@/lib/cms/content-service";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";

export async function generateStaticParams() {
    const { resume } = await getPortfolioContent();
    return resume.experience
        ?.filter((job) => job.slug)
        .map((job) => ({ slug: job.slug })) || [];
}

export async function generateMetadata({ params }) {
    const { slug } = await params;
    const company = await getCompany(slug);
    if (!company) return {};
    return {
        title: `${company.company} - Experience`,
        description: company.description,
    };
}

export default async function CompanyPage({ params }) {
    const { slug } = await params;
    const company = await getCompany(slug);

    if (!company) return notFound();

    return (
        <div className="relative min-h-screen w-full overflow-hidden text-[var(--foreground)]">
            <Navbar />

            <main className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-12 pt-32 pb-24">

                {/* Hero Section */}
                <RevealOnScroll>
                    <div className="mb-24">
                        <Link href="/#experience" className="group inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-[var(--muted)] hover:text-[var(--foreground)] mb-12 transition-all duration-300">
                            <span className="p-2 rounded-full border border-[var(--border)] bg-[var(--card)] group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors duration-300">
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-black transition-colors duration-300">
                                    <path d="M19 12H5M12 19l-7-7 7-7" />
                                </svg>
                            </span>
                            Back to Experience
                        </Link>

                        <div className="flex flex-col gap-4">
                            <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                                {company.period}
                            </span>
                            <h1 className="display-heading text-6xl md:text-9xl font-bold text-[var(--foreground)] tracking-tighter">
                                {company.company}
                            </h1>
                            <h2 className="text-2xl md:text-4xl font-medium text-[var(--muted)] mt-2">
                                {company.role}
                            </h2>
                        </div>

                        <p className="text-xl md:text-2xl text-[var(--foreground)] opacity-80 max-w-3xl leading-relaxed mt-12 border-l-2 border-[var(--accent)] pl-6">
                            {company.description}
                        </p>
                    </div>
                </RevealOnScroll>

                {/* Impact Stats Grid */}
                {company.stats && (
                    <RevealOnScroll delay={100}>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-32">
                            {company.stats.map((stat, index) => (
                                <div key={index} className="p-8 rounded-3xl bg-[var(--card)] border border-[var(--border)] backdrop-blur-sm hover:border-[var(--accent)] transition-all duration-500 group">
                                    <p className="text-4xl md:text-6xl font-bold text-[var(--foreground)] mb-2 group-hover:scale-105 transition-transform origin-left">
                                        {stat.value}
                                    </p>
                                    <p className="font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                                        {stat.label}
                                    </p>
                                </div>
                            ))}
                        </div>
                    </RevealOnScroll>
                )}

                {/* Tech Stack Visualization */}
                {company.stack && (
                    <RevealOnScroll delay={200}>
                        <div className="mb-32">
                            <h3 className="font-mono text-sm uppercase tracking-[0.2em] text-[var(--muted)] mb-12 flex items-center gap-4">
                                <div className="h-[1px] w-12 bg-[var(--muted)]"></div>
                                Technologies & Tools Used
                            </h3>
                            <div className="flex flex-wrap gap-4">
                                {company.stack.map((tech, index) => (
                                    <div
                                        key={index}
                                        className="group relative overflow-hidden px-8 py-6 rounded-2xl bg-[var(--card)] border border-[var(--border)] hover:border-[var(--accent)] transition-all duration-500"
                                    >
                                        <span className="relative z-10 text-lg md:text-xl font-bold text-[var(--foreground)] group-hover:text-[var(--accent)] transition-colors">
                                            {tech}
                                        </span>
                                        <div className="absolute inset-0 bg-[var(--accent)]/5 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                                    </div>
                                ))}
                            </div>
                        </div>
                    </RevealOnScroll>
                )}

            </main>
            <Footer />
            <MobileDock />
        </div>
    );
}
