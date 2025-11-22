import Link from "next/link";
import { RevealOnScroll } from "./RevealOnScroll";

const ProjectRow = ({ project, index, caseStudy }) => {
  const Wrapper = project.slug ? Link : "div";
  const wrapperProps = project.slug
    ? { href: `/case/${project.slug}` }
    : { role: "presentation" };

  const poster = caseStudy?.media?.poster || caseStudy?.media?.cover;
  const summary = project.summary || caseStudy?.summary;
  const role = project.role || caseStudy?.role?.[0] || "Lead build";

  return (
    <RevealOnScroll delay={index * 100}>
      <Wrapper
        {...wrapperProps}
        className="group relative block overflow-hidden rounded-3xl border border-[var(--border)] bg-[var(--card)] px-6 py-10 transition-all duration-700 hover:-translate-y-1 hover:border-[var(--accent)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.35)] md:px-10"
      >
        {poster && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden">
            <div
              className="absolute inset-2 rounded-2xl bg-cover bg-center opacity-0 transition-all duration-700 group-hover:opacity-100 group-hover:scale-[1.02]"
              style={{ backgroundImage: `linear-gradient(120deg, rgba(11,13,16,0.72), rgba(11,13,16,0.25)), url(${poster})` }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[var(--background)]/80 via-[var(--background)]/40 to-transparent opacity-0 transition-all duration-700 group-hover:opacity-100" />
          </div>
        )}

        <div className="relative z-10 grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          <div className="col-span-2 font-mono text-xs uppercase tracking-[0.22em] text-gray-500">
            {project.year}
          </div>

          <div className="col-span-7 space-y-3">
            <h3 className="display-heading text-3xl font-semibold tracking-tight text-white md:text-5xl">
              {project.client}
            </h3>
            {summary && (
              <p className="max-w-2xl text-sm text-gray-200 md:text-base">
                {summary}
              </p>
            )}
          </div>

          <div className="col-span-3 flex flex-col items-start gap-3 md:items-end">
            <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-gray-400">
              {role}
            </span>
            {project.slug && (
              <span className="inline-flex items-center gap-2 text-sm font-semibold text-white/80 transition-all duration-500 group-hover:text-white">
                View case
                <span aria-hidden className="transition-all duration-500 group-hover:translate-x-1">
                  -&gt;
                </span>
              </span>
            )}
          </div>
        </div>
      </Wrapper>
    </RevealOnScroll>
  );
};

export const Work = ({ projects, caseStudies = [] }) => (
  <section id="work" className="relative z-10 px-6 py-32 md:px-20">
    <div className="mx-auto max-w-6xl">
      <RevealOnScroll>
        <div className="mb-16 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.3em] text-gray-500">
              Selected collaborations
            </p>
            <h2 className="display-heading text-4xl font-semibold tracking-tight text-white md:text-7xl">
              Work built for<br className="hidden md:block" /> leading teams
            </h2>
          </div>
          <span className="font-mono text-[11px] uppercase tracking-[0.28em] text-gray-500 md:text-right">
            Edge-first builds, cinematic polish
          </span>
        </div>
      </RevealOnScroll>

      <div className="flex flex-col gap-6">
        {projects.map((project, index) => {
          const caseStudy = caseStudies.find(
            (study) => study.slug === project.slug
          );
          return (
            <ProjectRow
              project={project}
              caseStudy={caseStudy}
              index={index}
              key={`${project.client}-${project.year}`}
            />
          );
        })}
      </div>
    </div>
  </section>
);
