import Link from "next/link";
import { notFound } from "next/navigation";

import { getCaseStudy, getPortfolioContent } from "@/lib/cms/content-service";
import { RevealOnScroll } from "@/components/RevealOnScroll";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { MobileDock } from "@/components/MobileDock";

export async function generateStaticParams() {
  const { caseStudies } = await getPortfolioContent();
  return caseStudies
    .filter((study) => study.slug)
    .map((study) => ({ slug: study.slug }));
}

export async function generateMetadata({ params }) {
  const study = await getCaseStudy(params.slug);
  if (!study) return {};
  return {
    title: `${study.client} - ${study.title}`,
    description: study.summary,
  };
}

export default async function CasePage({ params }) {
  const study = await getCaseStudy(params.slug);
  if (!study) return notFound();

  const heroPoster = study.media?.poster;
  const heroVideo = study.media?.video;

  return (
    <div className="relative min-h-screen overflow-hidden text-[var(--foreground)]">
      <div className="absolute inset-0">
        {heroPoster && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${heroPoster})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-[var(--background)] via-[var(--background)]/80 to-[var(--background)]" />
      </div>

      <Navbar />

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24 md:px-10">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 text-sm font-bold tracking-[0.2em] uppercase text-[var(--foreground)] opacity-80 hover:opacity-100 transition-all duration-300"
          >
            <span className="p-2 rounded-full border border-[var(--border)] bg-[var(--card)] group-hover:bg-[var(--accent)] group-hover:border-[var(--accent)] transition-colors duration-300">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="group-hover:text-black transition-colors duration-300">
                <path d="M19 12H5M12 19l-7-7 7-7" />
              </svg>
            </span>
            Back
          </Link>
          <span className="font-mono text-sm font-semibold uppercase tracking-[0.3em] text-[var(--foreground)] opacity-80">
            {study.year}
          </span>
        </div>

        <div className="grid gap-10 md:grid-cols-5 md:items-end">
          <RevealOnScroll className="md:col-span-3">
            <p className="font-mono text-sm font-semibold uppercase tracking-[0.34em] text-[var(--foreground)] opacity-80 mb-4">
              {study.client}
            </p>
            <h1 className="display-heading text-4xl md:text-6xl font-bold leading-[1.05] text-[var(--foreground)]">
              {study.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg font-medium text-[var(--foreground)] opacity-90">
              {study.summary}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={100} className="md:col-span-2 md:justify-self-end">
            <div className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6 backdrop-blur-xl">
              <p className="font-mono text-sm font-semibold uppercase tracking-[0.25em] text-[var(--foreground)] opacity-80 mb-4">
                Role
              </p>
              <div className="space-y-2 text-sm text-[var(--foreground)]">
                {(study.role || []).map((item) => (
                  <div key={item} className="rounded-full bg-[var(--card)] px-3 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {heroVideo && (
          <RevealOnScroll>
            <div className="mt-14 overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] p-1 backdrop-blur-xl">
              <video
                className="h-full w-full rounded-3xl object-cover"
                src={heroVideo}
                poster={heroPoster}
                controls
                muted
                playsInline
              />
            </div>
          </RevealOnScroll>
        )}

        <div className="mt-16 grid gap-10 rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 backdrop-blur-xl md:grid-cols-2">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-3">
              Challenge
            </p>
            <p className="text-[var(--muted)] leading-relaxed">{study.scenario?.challenge}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-3">
              Solution
            </p>
            <p className="text-[var(--muted)] leading-relaxed">{study.scenario?.solution}</p>
          </RevealOnScroll>
        </div>

        {!!study.metrics?.length && (
          <RevealOnScroll className="mt-14">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {study.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-6"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)]">
                    {metric.label}
                  </p>
                  <p className="display-heading text-3xl font-semibold text-[var(--foreground)] mt-3">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {!!study.process?.length && (
          <RevealOnScroll className="mt-14">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-[var(--muted)] mb-6">
                Behind the build
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                {study.process.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-[var(--border)] bg-[var(--card)] p-5"
                  >
                    <p className="text-sm font-semibold text-[var(--foreground)]">{item.title}</p>
                    <p className="mt-3 text-sm text-[var(--muted)] leading-relaxed">
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        )}

        {!!study.testimonial && (
          <RevealOnScroll className="mt-14">
            <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)] p-8 text-left">
              <p className="text-lg text-[var(--foreground)] leading-relaxed">
                "{study.testimonial.quote}"
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-[var(--muted)]">
                {study.testimonial.author}
              </p>
            </div>
          </RevealOnScroll>
        )}
      </div>
      <Footer />
      <MobileDock />
    </div>
  );
}
