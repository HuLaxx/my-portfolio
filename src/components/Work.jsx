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
        className="group relative block w-full p-8 md:p-10 rounded-3xl border border-[var(--border)] bg-[var(--card)]/30 backdrop-blur-sm overflow-hidden transition-all duration-500 hover:border-[var(--accent)] hover:translate-y-[-4px] hover:shadow-2xl hover:bg-[var(--card-hover-tint)]"
      >
        {/* Unified Glassy gradient hover overlay */}
        <div
          className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 backdrop-blur-sm z-0"
          style={{ background: 'var(--hover-overlay)' }}
        />

        {/* Existing Image Overlay Override (if poster exists) - keeping it but adjusting z-index */}
        {poster && (
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500 z-0 bg-center bg-cover" style={{ backgroundImage: `url(${poster})` }} />
        )}

        <div className="relative z-10 grid grid-cols-1 items-start gap-6 md:grid-cols-12">
          <div className="col-span-2 font-mono text-sm font-semibold uppercase tracking-[0.22em] text-[var(--foreground)] opacity-80 group-hover:text-[var(--accent-dark)] transition-colors">
            {project.year}
          </div>

          <div className="col-span-7 space-y-3">
            <h3 className="display-heading text-3xl font-semibold tracking-tight text-[var(--foreground)] md:text-5xl group-hover:text-[var(--accent-dark)] transition-colors">
              {project.client}
            </h3>
            {summary && (
              <p className="text-[var(--foreground)] opacity-90 font-medium max-w-xl group-hover:text-[var(--foreground)] transition-colors">
                {summary}
              </p>
            )}
          </div>

          <div className="col-span-3 flex flex-col items-start gap-3 md:items-end">
            <span className="font-mono text-sm font-semibold uppercase tracking-[0.2em] text-[var(--foreground)] opacity-80 text-right">
              {role}
            </span>

            {/* GitHub-style Language Bar */}
            {project.languages && (
              <div className="w-full max-w-[200px] mb-2 opacity-80 group-hover:opacity-100 transition-opacity">
                <div className="flex h-1.5 w-full overflow-hidden rounded-full bg-[var(--card)] mb-1">
                  {Object.entries(project.languages).map(([lang, pct], i) => (
                    <div
                      key={lang}
                      style={{ width: `${pct}%`, backgroundColor: ['#3178c6', '#f1e05a', '#e34c26', '#563d7c'][i % 4] }}
                      className="h-full"
                    />
                  ))}
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs font-semibold text-[var(--foreground)] opacity-80 font-mono justify-end">
                  {Object.entries(project.languages).map(([lang, pct], i) => (
                    <div key={lang} className="flex items-center gap-1.5">
                      <div className="w-2 h-2 rounded-full" style={{ backgroundColor: ['#3178c6', '#f1e05a', '#e34c26', '#563d7c'][i % 4] }} />
                      <span>{lang} {pct}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {project.slug && (
              <span className="inline-flex items-center gap-2 text-sm font-bold text-[var(--accent)] opacity-0 -translate-x-4 transition-all duration-500 group-hover:opacity-100 group-hover:translate-x-0 mt-2 group-hover:text-[var(--accent-dark)] transition-colors">
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
  <section id="work" className="relative z-10 px-0 md:px-20 py-12 md:py-14">
    <div className="mx-auto w-[98%] md:w-full md:max-w-6xl">
      <div className="p-4 md:p-12 space-y-12">


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
    </div>
  </section>
);
