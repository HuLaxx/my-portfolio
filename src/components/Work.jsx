'use client';

import { useRouter } from "next/navigation";
import { RevealOnScroll } from "./RevealOnScroll";
import { Watermark } from "./Watermark";
import { AppWindow, Database, Smartphone, Globe, Layout, Code, Monitor, Github } from "lucide-react";

export const Projects = ({ projects, caseStudies = [] }) => {
  const router = useRouter();

  const getProjectWatermark = (role) => {
    const r = role?.toLowerCase() || "";
    if (r.includes("mobile") || r.includes("app") || r.includes("ios")) return { type: "neon", icon: Smartphone };
    if (r.includes("backend") || r.includes("api") || r.includes("infrastructure")) return { type: "wireframe", icon: Database };
    if (r.includes("web") || r.includes("frontend") || r.includes("full stack")) return { type: "classic", icon: Layout };
    if (r.includes("ai") || r.includes("ml") || r.includes("data")) return { type: "neon", icon: Code };
    return { type: "engraved", icon: Monitor };
  };

  return (
    <section id="projects" className="relative z-10 py-10 md:py-12">
      <div className="mx-auto w-[98%] md:w-full md:max-w-6xl px-4 sm:px-6 md:px-12">
        <div className="p-4 sm:p-8 md:p-12">
          <RevealOnScroll>
            <div className="mb-12 flex items-end justify-between">
              <div>
                <div className="flex items-center gap-3 sm:gap-4 mb-4">
                  <div className="h-[2px] sm:h-[3px] w-10 sm:w-14 bg-[var(--accent)]"></div>
                  <p className="font-display text-base sm:text-xl md:text-2xl font-black italic uppercase tracking-[0.1em] text-[var(--foreground)]">
                    Portfolio
                  </p>
                </div>
                <h2 className="display-heading text-3xl sm:text-4xl md:text-5xl lg:text-7xl font-semibold tracking-tight text-[var(--foreground)]">
                  Projects
                </h2>
              </div>
              <div className="hidden md:block h-[1px] w-32 bg-gradient-to-r from-[var(--accent)] to-transparent opacity-30 mb-4" />
            </div>
          </RevealOnScroll>

          <div className="flex flex-col gap-6">
            {projects?.map((project, index) => {
              const { type, icon } = getProjectWatermark(project.role);

              const CardContent = () => (
                <div
                  className={`group relative h-full min-h-[240px] sm:min-h-[280px] md:min-h-[320px] p-5 sm:p-8 md:p-10 rounded-2xl sm:rounded-3xl border border-[var(--border)] bg-[var(--card)]/30 backdrop-blur-sm overflow-hidden transition-all duration-700 hover:shadow-2xl hover:translate-y-[-4px] hover:bg-[var(--card-hover-tint)] hover:border-[var(--accent)] flex flex-col justify-between ${project.slug ? "cursor-pointer" : ""}`}
                  onClick={() => {
                    if (project.slug) {
                      router.push(`/case/${project.slug}`);
                    }
                  }}
                  onKeyDown={(event) => {
                    if (!project.slug) return;
                    if (event.key === "Enter" || event.key === " ") {
                      event.preventDefault();
                      router.push(`/case/${project.slug}`);
                    }
                  }}
                  role={project.slug ? "link" : undefined}
                  tabIndex={project.slug ? 0 : undefined}
                  aria-label={project.slug ? `View ${project.client} case study` : undefined}
                >

                  {/* Hover Gradient Overlay */}
                  <div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 z-0"
                    style={{ background: 'var(--hover-overlay)' }}
                  />

                  {/* Bottom Accent Bar (only if clickable) */}
                  {project.slug && (
                    <div className="absolute bottom-0 left-0 right-0 z-20 overflow-hidden rounded-b-3xl">
                      <div className="h-1 bg-[var(--accent)] opacity-30 group-hover:opacity-100 transition-all duration-500" />
                    </div>
                  )}

                  {/* Watermark Background */}
                  <Watermark type={type} icon={icon} />

                  <div className="relative z-20 flex flex-col gap-6 h-full">
                    <div className="flex flex-col gap-1 sm:gap-2">
                      <span className="font-mono text-sm sm:text-base font-bold uppercase tracking-[0.22em] text-[var(--accent-dark)] opacity-80 group-hover:text-[var(--text-hover)] transition-colors duration-500">
                        {project.year}
                      </span>
                      <h3 className="display-heading text-2xl sm:text-3xl md:text-4xl font-semibold tracking-tight text-[var(--foreground)] group-hover:text-[var(--text-hover)] transition-colors duration-500">
                        {project.client}
                      </h3>
                    </div>

                    <p className="text-[var(--foreground)] opacity-90 leading-relaxed text-base sm:text-lg font-medium group-hover:text-[var(--text-hover)] transition-colors duration-500 max-w-2xl">
                      {project.summary}
                    </p>

                    {/* Skills removed as requested */}

                    {(project.live || project.github) && (
                      <div className="mt-auto flex flex-wrap items-center gap-4 sm:gap-6 pointer-events-auto">
                        {project.live && (
                          <a
                            href={project.live}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="group/link flex items-center gap-2 text-xs font-bold tracking-[0.1em] text-[var(--foreground)] transition-colors duration-300"
                          >
                            <span className="p-2 rounded-full border border-[var(--border)] bg-[var(--card)]/50 group-hover/link:bg-[var(--accent-dark)] group-hover/link:text-white group-hover/link:scale-110 group-hover/link:shadow-[0_0_25px_var(--accent-dark)] transition-all duration-300 relative overflow-hidden flex items-center justify-center">
                              <Globe className="h-3.5 w-3.5 relative z-10 block" />
                            </span>
                            <span className="transition-all duration-300 group-hover/link:text-[var(--accent-dark)] group-hover/link:scale-105 origin-left overflow-visible">
                              Live Demo
                            </span>
                          </a>
                        )}
                        {project.github && (
                          <a
                            href={project.github}
                            target="_blank"
                            rel="noreferrer"
                            onClick={(event) => event.stopPropagation()}
                            className="group/link flex items-center gap-2 text-xs font-bold tracking-[0.1em] text-[var(--foreground)] transition-colors duration-300"
                          >
                            <span className="p-2 rounded-full border border-[var(--border)] bg-[var(--card)]/50 group-hover/link:bg-[var(--accent-dark)] group-hover/link:text-white group-hover/link:scale-110 group-hover/link:shadow-[0_0_25px_var(--accent-dark)] transition-all duration-300 relative overflow-hidden flex items-center justify-center">
                              <Github className="h-3.5 w-3.5 relative z-10 block" />
                            </span>
                            <span className="transition-all duration-300 group-hover/link:text-[var(--accent-dark)] group-hover/link:scale-105 origin-left overflow-visible">
                              GitHub
                            </span>
                          </a>
                        )}
                      </div>
                    )}
                  </div>

                  {/* Right-Side Hover Expansion - Slide-in Drawer */}
                  {project.slug && (
                    <div className="hidden md:flex absolute right-0 top-0 bottom-0 w-1/3 h-full bg-gradient-to-l from-[var(--card)] via-[var(--card)]/90 to-transparent opacity-80 group-hover:opacity-100 group-hover:-translate-x-2 transition-all duration-500 ease-out flex-col justify-center items-end pr-8 md:pr-12 pointer-events-none z-20">
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
                  )}
                </div>
              );

              return (
                <RevealOnScroll key={index} delay={index * 100}>
                  <CardContent />
                </RevealOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
