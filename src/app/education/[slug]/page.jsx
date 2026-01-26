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

        <RevealOnScroll delay={100}>
          <div className="grid gap-10 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 backdrop-blur-xl md:grid-cols-2">
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-4">
                Dissertation
              </p>
              <p className="text-[var(--muted)] leading-relaxed">{study.dissertation}</p>
            </div>
            <div>
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-4">
                Course Modules
              </p>
              <div className="flex flex-wrap gap-2">
                {modules.map((module) => (
                  <span
                    key={module}
                    className="rounded-full border border-[var(--border)] px-3 py-1 text-[10px] font-mono uppercase tracking-[0.2em] text-[var(--muted)]"
                  >
                    {module}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </RevealOnScroll>
      </main>
      <Footer />
    </div>
  );
}
