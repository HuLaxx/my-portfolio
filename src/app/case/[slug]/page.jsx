import Link from "next/link";
import { notFound } from "next/navigation";

import { getCaseStudy, getPortfolioContent } from "@/lib/cms/content-service";
import { RevealOnScroll } from "@/components/RevealOnScroll";

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
    <div className="relative min-h-screen overflow-hidden bg-black text-[var(--foreground)]">
      <div className="absolute inset-0">
        {heroPoster && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-60"
            style={{ backgroundImage: `url(${heroPoster})` }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-black/80 to-black" />
      </div>

      <div className="relative z-10 mx-auto max-w-6xl px-6 py-16 md:py-24 md:px-10">
        <div className="mb-10 flex items-center justify-between">
          <Link
            href="/"
            className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400 transition-colors duration-300 hover:text-white"
          >
            {"<- Back"}
          </Link>
          <span className="font-mono text-xs uppercase tracking-[0.3em] text-gray-400">
            {study.year}
          </span>
        </div>

        <div className="grid gap-10 md:grid-cols-5 md:items-end">
          <RevealOnScroll className="md:col-span-3">
            <p className="font-mono text-xs uppercase tracking-[0.34em] text-gray-400 mb-4">
              {study.client}
            </p>
            <h1 className="display-heading text-4xl md:text-6xl font-semibold leading-[1.05] text-white">
              {study.title}
            </h1>
            <p className="mt-6 max-w-2xl text-lg text-gray-300">
              {study.summary}
            </p>
          </RevealOnScroll>

          <RevealOnScroll delay={100} className="md:col-span-2 md:justify-self-end">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400 mb-4">
                Role
              </p>
              <div className="space-y-2 text-sm text-white">
                {(study.role || []).map((item) => (
                  <div key={item} className="rounded-full bg-white/5 px-3 py-2">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </RevealOnScroll>
        </div>

        {heroVideo && (
          <RevealOnScroll>
            <div className="mt-14 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-1 backdrop-blur-xl">
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

        <div className="mt-16 grid gap-10 rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:grid-cols-2">
          <RevealOnScroll>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">
              Challenge
            </p>
            <p className="text-gray-300 leading-relaxed">{study.scenario?.challenge}</p>
          </RevealOnScroll>
          <RevealOnScroll delay={100}>
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400 mb-3">
              Solution
            </p>
            <p className="text-gray-300 leading-relaxed">{study.scenario?.solution}</p>
          </RevealOnScroll>
        </div>

        {!!study.metrics?.length && (
          <RevealOnScroll className="mt-14">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {study.metrics.map((metric) => (
                <div
                  key={metric.label}
                  className="rounded-2xl border border-white/10 bg-black/40 p-6"
                >
                  <p className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400">
                    {metric.label}
                  </p>
                  <p className="display-heading text-3xl font-semibold text-white mt-3">
                    {metric.value}
                  </p>
                </div>
              ))}
            </div>
          </RevealOnScroll>
        )}

        {!!study.process?.length && (
          <RevealOnScroll className="mt-14">
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6">
              <p className="font-mono text-xs uppercase tracking-[0.25em] text-gray-400 mb-6">
                Behind the build
              </p>
              <div className="grid gap-6 md:grid-cols-3">
                {study.process.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/5 bg-black/30 p-5"
                  >
                    <p className="text-sm font-semibold text-white">{item.title}</p>
                    <p className="mt-3 text-sm text-gray-300 leading-relaxed">
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
            <div className="rounded-3xl border border-white/10 bg-white/5 p-8 text-left">
              <p className="text-lg text-white leading-relaxed">
                "{study.testimonial.quote}"
              </p>
              <p className="mt-4 font-mono text-xs uppercase tracking-[0.2em] text-gray-400">
                {study.testimonial.author}
              </p>
            </div>
          </RevealOnScroll>
        )}
      </div>
    </div>
  );
}
