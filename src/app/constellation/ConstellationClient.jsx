"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./constellation.module.css";

const PROJECTS = [
  {
    id: "sentinance",
    number: "01",
    name: "Sentinance",
    headline: "From market noise to intelligence",
    summary:
      "Market analysis that connects streaming financial data, forecasting models and LangGraph AI agents in one research-oriented system.",
    contribution:
      "Connects live-data pipelines to model-driven analysis and AI-assisted interpretation.",
    abilities: ["Streaming data", "Agentic AI", "Forecasting"],
    tech: ["Python", "LangGraph", "FastAPI", "PyTorch", "Kafka"],
    focuses: ["ai", "data"],
    x: 19,
    y: 24,
    hue: "#67e8f9",
    caseStudy: "/case/sentinance",
    repository: "https://github.com/HuLaxx/Sentinance",
    demo: "https://sentinance.vercel.app",
  },
  {
    id: "graphguard",
    number: "02",
    name: "GraphGuard",
    headline: "Make hidden risk explainable",
    summary:
      "A graph-first fraud investigation platform combining Neo4j relationship analysis, XGBoost risk models and SHAP explanations.",
    contribution:
      "Connects complex relationships to interpretable machine-learning decisions.",
    abilities: ["Graph analytics", "Explainable ML", "GraphQL"],
    tech: ["Neo4j", "XGBoost", "SHAP", "GraphQL", "Python"],
    focuses: ["ai", "data"],
    x: 81,
    y: 24,
    hue: "#b69aff",
    caseStudy: "/case/graphguard",
    repository: "https://github.com/HuLaxx/GraphGuard",
    demo: "https://graph-guard-frontend.vercel.app",
  },
  {
    id: "fleetflow",
    number: "03",
    name: "FleetFlow",
    headline: "Turn events into better routes",
    summary:
      "A reactive logistics architecture exploring vehicle-route optimization, geospatial data and event-driven fleet coordination.",
    contribution:
      "Connects operational events to constrained optimization and clear interfaces.",
    abilities: ["Optimization", "Event streaming", "Geospatial data"],
    tech: ["OR-Tools", "Kafka", "PostGIS", "Next.js", "Python"],
    focuses: ["data", "product"],
    x: 19,
    y: 77,
    hue: "#6fe1c5",
    caseStudy: "/case/fleetflow",
    repository: "https://github.com/HuLaxx/FleetFlow",
    demo: "https://fleet-flow-rho.vercel.app",
  },
  {
    id: "shiftify",
    number: "04",
    name: "Shiftify",
    headline: "Give people control of their music data",
    summary:
      "A privacy-first YouTube Music export tool with a browser-based workflow, accessible controls and a refined interface.",
    contribution:
      "Connects practical utility, privacy and thoughtful frontend product design.",
    abilities: ["User experience", "Privacy", "Full-stack web"],
    tech: ["TypeScript", "Next.js", "Tailwind CSS"],
    focuses: ["product"],
    x: 81,
    y: 77,
    hue: "#ffc18f",
    caseStudy: null,
    repository: "https://github.com/HuLaxx/Shiftify",
    demo: "https://shiftifymusic.vercel.app",
  },
];

const FILTERS = [
  { id: "all", label: "All systems" },
  { id: "ai", label: "AI & ML" },
  { id: "data", label: "Data engineering" },
  { id: "product", label: "Digital products" },
];

export default function ConstellationClient({ signals = {} }) {
  const [activeId, setActiveId] = useState("sentinance");
  const [focus, setFocus] = useState("all");

  const active = PROJECTS.find((project) => project.id === activeId) || PROJECTS[0];
  const inFocus = (project) => focus === "all" || project.focuses.includes(focus);
  const signal = signals[active.id] || null;

  function chooseFocus(nextFocus) {
    setFocus(nextFocus);
    const valid = PROJECTS.filter(
      (project) => nextFocus === "all" || project.focuses.includes(nextFocus)
    );
    if (!valid.some((project) => project.id === activeId)) {
      setActiveId(valid[0].id);
    }
  }

  return (
    <main className={styles.page} id="project-constellation">
      <div className={styles.backgroundGlow} aria-hidden="true" />
      <div className={styles.shell}>
        <nav className={styles.topbar} aria-label="Constellation navigation">
          <Link href="/" className={styles.back}>← PORTFOLIO</Link>
          <span className={styles.topCenter}>HULAX LABS / FIELD NOTES 002</span>
          <a href="https://github.com/HuLaxx" target="_blank" rel="noreferrer" className={styles.back}>
            GITHUB ↗
          </a>
        </nav>

        <header className={styles.intro}>
          <span className={styles.eyebrow}><span className={styles.lamp} /> THE ENGINEERING UNIVERSE</span>
          <h1>NOT JUST PROJECTS.<br /><em>A CONSTELLATION</em> OF IDEAS.</h1>
          <p>
            Four builds, four different problems, one shared obsession: turning raw information
            into useful, trustworthy experiences. Follow the connections to see what each
            project contributes.
          </p>
        </header>

        <section className={styles.mapSection} aria-label="Explore four connected engineering projects">
          <div className={styles.filterRow} aria-label="Highlight a discipline">
            <span className={styles.filterLabel}>TRACE THE SIGNAL</span>
            <div className={styles.filterActions}>
              {FILTERS.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => chooseFocus(item.id)}
                  className={styles.filterButton + (focus === item.id ? " " + styles.filterActive : "")}
                  aria-pressed={focus === item.id}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div className={styles.stage}>
            <div className={styles.sky} aria-label="Project constellation">
              <svg className={styles.connectionLayer} viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
                <defs>
                  <linearGradient id="constellationLine" x1="0" y1="0" x2="1" y2="1">
                    <stop stopColor="#61eadb" />
                    <stop offset=".55" stopColor="#8897ff" />
                    <stop offset="1" stopColor="#f7b88c" />
                  </linearGradient>
                </defs>
                <g className={styles.connections} fill="none" stroke="url(#constellationLine)" strokeWidth="1.5">
                  <path d="M 500 310 Q 330 260 190 149" />
                  <path d="M 500 310 Q 670 260 810 149" />
                  <path d="M 500 310 Q 325 405 190 477" />
                  <path d="M 500 310 Q 670 405 810 477" />
                  <path d="M 190 149 Q 500 70 810 149" opacity=".2" />
                  <path d="M 190 477 Q 500 560 810 477" opacity=".2" />
                </g>
                <circle cx="500" cy="310" r="98" stroke="#64ebd8" strokeOpacity=".19" fill="none" strokeDasharray="3 13" />
                <circle cx="500" cy="310" r="130" stroke="#92aaff" strokeOpacity=".09" fill="none" />
              </svg>

              <div className={styles.core} aria-hidden="true">
                <span className={styles.coreRing} />
                <span className={styles.coreKicker}>SHARED CORE</span>
                <strong>HULAX</strong>
                <span className={styles.coreFoot}>ENGINEERING</span>
              </div>

              {PROJECTS.map((project) => (
                <button
                  type="button"
                  key={project.id}
                  className={[
                    styles.projectNode,
                    active.id === project.id ? styles.projectNodeActive : "",
                    !inFocus(project) ? styles.projectNodeDim : "",
                  ].filter(Boolean).join(" ")}
                  style={{
                    "--node-color": project.hue,
                    left: String(project.x) + "%",
                    top: String(project.y) + "%",
                  }}
                  onClick={() => { setActiveId(project.id); if (!inFocus(project)) setFocus("all"); }}
                  aria-pressed={active.id === project.id}
                  aria-label={"Explore " + project.name + " — " + project.headline}
                >
                  <span className={styles.nodeOrb}><span className={styles.nodeSpark} /></span>
                  <span className={styles.nodeBody}>
                    <span className={styles.nodeNumber}>PROJECT / {project.number}</span>
                    <strong>{project.name}</strong>
                    <span className={styles.nodeSub}>{project.headline}</span>
                  </span>
                </button>
              ))}

              <span className={styles.skyLabel}>PROJECTS AS SIGNALS, NOT DECORATION</span>
            </div>

            <aside className={styles.detail} aria-live="polite" style={{ "--detail-color": active.hue }}>
              <div className={styles.detailTop}>
                <span>FOCUS / {active.number} OF 04</span>
                <span className={styles.detailDot} />
              </div>
              <span className={styles.detailIndex}>{active.number}</span>
              <h2>{active.name}</h2>
              <p className={styles.detailHeadline}>{active.headline}</p>
              <p className={styles.detailDescription}>{active.summary}</p>
              <div className={styles.divider} />
              <h3>WHY THIS STAR MATTERS</h3>
              <p className={styles.contribution}>{active.contribution}</p>
              <div className={styles.tagRow}>
                {active.abilities.map((ability) => <span key={ability}>{ability}</span>)}
              </div>
              <div className={styles.divider} />
              <h3>ENGINEERING MATERIALS</h3>
              <div className={styles.techRow}>
                {active.tech.map((tech) => <span key={tech}>{tech}</span>)}
              </div>
              <div className={styles.repoSignal}>
                <span>GITHUB REPOSITORY</span>
                <strong>{signal?.language || "Public project"} · {signal?.pushedAt ? "Last push " + signal.pushedAt : "Date unavailable"}</strong>
              </div>
              <div className={styles.detailLinks}>
                {active.caseStudy && <Link href={active.caseStudy} className={styles.primaryLink}>READ CASE STUDY ↗</Link>}
                <a href={active.repository} target="_blank" rel="noopener noreferrer" className={styles.secondaryLink}>SOURCE CODE ↗</a>
                <a href={active.demo} target="_blank" rel="noopener noreferrer" className={styles.secondaryLink}>PROJECT SITE ↗</a>
              </div>
            </aside>
          </div>
        </section>

        <section className={styles.philosophy}>
          <div>
            <span className={styles.eyebrow}>THE CONNECTIONS</span>
            <h2>From signals<br />to systems.</h2>
          </div>
          <div className={styles.philosophyText}>
            <p>
              <b>Data</b> creates a signal. <b>AI</b> reveals a pattern.
              <b> Engineering</b> makes it reliable. <b>Design</b> makes it useful.
              That is the thread connecting these projects.
            </p>
            <p className={styles.disclaimer}>
              Connections represent shared capabilities and design principles, not direct
              software dependencies. Repository language and last-push dates come from
              GitHub public metadata, cached for up to an hour.
            </p>
          </div>
        </section>

        <footer className={styles.footer}>
          <span>© RAHUL KHANKE · THE WORK IS THE STORY.</span>
          <a href="mailto:rahulkhanke786@gmail.com">LET&apos;S BUILD TOGETHER ↗</a>
        </footer>
      </div>
    </main>
  );
}
