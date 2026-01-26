import Link from "next/link";
import { notFound } from "next/navigation";

import { getPortfolioContent } from "@/lib/cms/content-service";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export async function generateStaticParams() {
  const { resume } = await getPortfolioContent();
  return (
    resume.studies?.filter((study) => study.slug).map((study) => ({ slug: study.slug })) || []
  );
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const { resume } = await getPortfolioContent();
  const study = resume.studies?.find((item) => item.slug === slug);
  if (!study) return {};
  return {
    title: `${study.degree} - ${study.institution}`,
    description: study.dissertation,
  };
}

export default async function EducationPage({ params }) {
  const { slug } = await params;
  const { resume } = await getPortfolioContent();
  const study = resume.studies?.find((item) => item.slug === slug);

  if (!study) return notFound();

  const modules = study.modules ?? [];

  return (
    <div className="relative min-h-screen w-full overflow-hidden text-[var(--foreground)]">
      <Navbar />

      <main className="relative z-10 mx-auto w-full max-w-7xl px-4 md:px-12 pt-32 pb-24">
        <RevealOnScroll>
          <div className="mb-24">
            <Link
              href="/#education"
              className="group inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-[var(--muted)] hover:text-[var(--foreground)] mb-12 transition-all duration-300"
            >
              <span className="p-2 rounded-full border border-[var(--border)] bg-[var(--card)] group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors duration-300">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="group-hover:text-black transition-colors duration-300"
                >
                  <path d="M19 12H5M12 19l-7-7 7-7" />
                </svg>
              </span>
              Back to Education
            </Link>

            <div className="flex flex-col gap-4">
              <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[var(--accent)]">
                {study.year}
              </span>
              <h1 className="display-heading text-6xl md:text-9xl font-bold text-[var(--foreground)] tracking-tighter">
                {study.degree}
              </h1>
              <h2 className="text-2xl md:text-4xl font-medium text-[var(--muted)] mt-2">
                {study.institution}
              </h2>
            </div>
          </div>
        </RevealOnScroll>

        <div className="flex flex-col gap-12">
          {/* Dissertation Section - Priority 1 */}
          <RevealOnScroll delay={100}>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 md:p-10 backdrop-blur-xl relative overflow-hidden">
              <div className="absolute top-0 right-0 p-32 bg-[var(--accent)]/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <p className="font-mono text-sm uppercase tracking-[0.25em] text-[var(--accent)] mb-6 flex items-center gap-3">
                <span className="h-[1px] w-8 bg-[var(--accent)]"></span>
                Dissertation Focus
              </p>
              <h3 className="text-2xl md:text-3xl font-bold text-[var(--foreground)] mb-6 leading-tight">
                {study.dissertation}
              </h3>
              <p className="text-lg md:text-xl text-[var(--muted)] leading-relaxed max-w-4xl">
                {study.dissertationDetail || study.dissertation}
              </p>
            </div>
          </RevealOnScroll>

          {/* Modules Section */}
          <RevealOnScroll delay={200}>
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)]/50 p-8">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-8">
                Key Modules
              </p>
              <div className="flex flex-wrap gap-3">
                {modules.map((module) => (
                  <span
                    key={module}
                    className="rounded-lg border border-[var(--border)] bg-[var(--background)] px-4 py-2 text-xs md:text-sm font-medium text-[var(--foreground)] hover:border-[var(--accent)] transition-colors"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </div>
          </RevealOnScroll>

          {/* Skills & Tools Section - (New) */}
          {(study.skills || study.tools) && (
            <RevealOnScroll delay={300}>
              <div className="grid md:grid-cols-2 gap-8">
                {study.skills && (
                  <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)]/50 p-8">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-6">
                      Skills
                    </p>
                    <ul className="grid gap-3">
                      {study.skills.map((skill) => (
                        <li key={skill} className="flex items-center gap-3 text-sm md:text-base text-[var(--foreground)]">
                          <div className="h-1.5 w-1.5 rounded-full bg-[var(--accent)]"></div>
                          {skill}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {study.tools && (
                  <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)]/50 p-8">
                    <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-6">
                      Tools & Tech
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {study.tools.map((tool) => (
                        <span key={tool} className="rounded-full bg-[var(--accent)]/10 text-[var(--accent)] border border-[var(--accent)]/20 px-3 py-1 text-xs font-bold tracking-wider uppercase">
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </RevealOnScroll>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
