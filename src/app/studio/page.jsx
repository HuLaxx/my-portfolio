import Image from "next/image";
import Link from "next/link";
import styles from "./studio.module.css";

export const metadata = {
  title: "HuLaX Studio | The Making Of",
  description:
    "An annotated field journal explaining the design, content, 3D interface, AI chat, and engineering decisions behind Rahul Khanke's portfolio.",
};

const studies = [
  {
    n: "01",
    topic: "THE STAGE",
    title: "An interface with depth",
    kicker: "INTERACTION / PERFORMANCE",
    narrative:
      "The starting point is an editorial canvas. Framer Motion adds transitions and scroll reveals; Three.js provides a separate visual layer. Themes and cursor behaviour live in components, not in the content model.",
    principle: "Motion should orient the visitor, never replace the information.",
    links: [
      { label: "Three.js background", url: "https://github.com/HuLaxx/my-portfolio/blob/master/src/components/ThreeBackground.jsx" },
      { label: "Motion and reveal", url: "https://github.com/HuLaxx/my-portfolio/blob/master/src/components/RevealOnScroll.jsx" },
    ],
    accent: "#d6ed9c",
  },
  {
    n: "02",
    topic: "THE EDITORIAL ENGINE",
    title: "Stories before components",
    kicker: "CONTENT / FALLBACKS",
    narrative:
      "Projects, roles and case studies have a curated data layer. An optional Sanity connection can supply published project and resume content; checked-in fallback content keeps the portfolio understandable without a CMS.",
    principle: "A visitor should still have something useful to read when a service is unavailable.",
    links: [
      { label: "Content service", url: "https://github.com/HuLaxx/my-portfolio/blob/master/src/lib/cms/content-service.js" },
      { label: "Case studies", url: "https://github.com/HuLaxx/my-portfolio/blob/master/src/app/case/%5Bslug%5D/page.jsx" },
    ],
    accent: "#e3c5f2",
  },
  {
    n: "03",
    topic: "THE VOICE",
    title: "AI with an honest boundary",
    kicker: "CHAT / API INTEGRATION",
    narrative:
      "The chat route can answer portfolio questions from a curated knowledge base. It attempts a configured Groq model first and a Gemini fallback when available. This is model-assisted Q&A, not proof of a vector-search RAG pipeline.",
    principle: "A friendly answer matters less if the system cannot explain what it knows.",
    links: [
      { label: "Chat API", url: "https://github.com/HuLaxx/my-portfolio/blob/master/src/app/api/chat/route.js" },
      { label: "Knowledge source", url: "https://github.com/HuLaxx/my-portfolio/blob/master/src/data/fallbackContent.js" },
    ],
    accent: "#f7b2a7",
  },
  {
    n: "04",
    topic: "THE FEEDBACK LOOP",
    title: "Measure, then iterate",
    kicker: "PUBLIC SIGNALS / OBSERVABILITY",
    narrative:
      "The constellation page fetches public repository metadata when available. The site includes Vercel Analytics and Speed Insights components. Those hooks are useful instrumentation—not a claim that performance scores or conversions have been measured here.",
    principle: "Instrument the experience, verify what works, then refine the design.",
    links: [
      { label: "Constellation source", url: "https://github.com/HuLaxx/my-portfolio/blob/master/src/app/constellation/page.jsx" },
      { label: "Global integration", url: "https://github.com/HuLaxx/my-portfolio/blob/master/src/app/layout.js" },
    ],
    accent: "#afc9ed",
  },
];

const worlds = [
  {
    id: "01",
    name: "Sentinance",
    concept: "A market observatory",
    theme: "Signal Atlas",
    summary: "Streaming market information, model experiments and AI-assisted research.",
    href: "/case/sentinance",
    repo: "https://github.com/HuLaxx/Sentinance",
    color: "#7de6df",
  },
  {
    id: "02",
    name: "GraphGuard",
    concept: "An investigation dossier",
    theme: "Evidence Graph",
    summary: "Relationships, model scores and explanations assembled into a reviewable case.",
    href: "/case/graphguard",
    repo: "https://github.com/HuLaxx/GraphGuard",
    color: "#f4b49a",
  },
  {
    id: "03",
    name: "FleetFlow",
    concept: "A dispatch atlas",
    theme: "Operations Map",
    summary: "Orders, constraints, vehicle routing and operational event pathways.",
    href: "/case/fleetflow",
    repo: "https://github.com/HuLaxx/FleetFlow",
    color: "#c7ec9d",
  },
  {
    id: "04",
    name: "Shiftify",
    concept: "A music passport",
    theme: "Record Sleeve",
    summary: "Music portability, track review and clear user-data boundaries.",
    href: "/case/shiftify",
    repo: "https://github.com/HuLaxx/Shiftify",
    color: "#d9b0f1",
  },
];

export default function StudioPage() {
  return (
    <main className={styles.studio}>
      <div className={styles.container}>
        <div className={styles.navline}>
          <Link href="/" className={styles.back}>← RETURN TO PORTFOLIO</Link>
          <span>HULAX / FIELD JOURNAL 005</span>
          <a href="https://github.com/HuLaxx/my-portfolio" target="_blank" rel="noreferrer">
            SOURCE CODE ↗
          </a>
        </div>

        <section className={styles.hero} aria-labelledby="studio-title">
          <div className={styles.issueLine}>
            <span className={styles.dot} /> AN OPEN STUDIO NOTEBOOK
          </div>
          <h1 id="studio-title">An experience has a <em>backstory.</em></h1>
          <p className={styles.lede}>
            The public portfolio is the finished frame. This is the annotated
            cutting room: what creates the feeling, where the data comes from,
            what the code actually does, and what still needs work.
          </p>
          <figure className={styles.poster}>
            <Image
              src="/studio/studio-contact-sheet.svg"
              width={1200}
              height={485}
              unoptimized
              priority
              alt="Original HuLaX Studio contact sheet illustrating typography, motion, content systems and AI responses"
            />
            <figcaption>PLATE 01 / Four design studies, illustrated—not application screenshots.</figcaption>
          </figure>
        </section>

        <section className={styles.manifesto} aria-label="Studio principles">
          <div className={styles.manifestoNumber}>H / 005</div>
          <div>
            <h2>Build the thing.<br />Then show the thinking.</h2>
            <p>
              Each project has its own visual language because each problem asks
              a different question. The portfolio connects those worlds, but it
              should also reveal the trade-offs, implementation paths and human
              reasoning behind the work.
            </p>
            <Link href="/constellation" className={styles.textLink}>EXPLORE THE PROJECT CONSTELLATION ↗</Link>
          </div>
        </section>

        <section className={styles.architecture} aria-labelledby="system-title">
          <div className={styles.sectionTop}>
            <div>
              <p className={styles.eyebrow}>PLATE 02 / THE EXPLODED VIEW</p>
              <h2 id="system-title">An interface is a system.</h2>
            </div>
            <span className={styles.annotation}>CODE LAYERS, NOT A LIVE-STATUS DASHBOARD</span>
          </div>
          <figure className={styles.blueprint}>
            <Image
              src="/studio/exploded-system.svg"
              width={1200}
              height={486}
              unoptimized
              alt="Exploded view of four portfolio source layers: Next.js and Three.js presentation, optional content CMS and fallbacks, configured AI models and GitHub/Vercel signals"
            />
            <figcaption>Source-backed conceptual diagram. External APIs, CMS and AI models require configuration and availability.</figcaption>
          </figure>
        </section>

        <section className={styles.notes} aria-labelledby="notes-title">
          <div className={styles.sectionTop}>
            <div>
              <p className={styles.eyebrow}>THE RESEARCH NOTES</p>
              <h2 id="notes-title">Four decisions that shape the site.</h2>
            </div>
            <span className={styles.annotation}>FOLLOW THE REAL CODE</span>
          </div>
          <div className={styles.noteGrid}>
            {studies.map((note) => (
              <article key={note.n} className={styles.note} style={{ "--ink": note.accent }}>
                <div className={styles.noteHeader}>
                  <span>{note.n} / {note.topic}</span>
                  <span className={styles.noteMark} aria-hidden="true">✳</span>
                </div>
                <p className={styles.noteKicker}>{note.kicker}</p>
                <h3>{note.title}</h3>
                <p className={styles.noteDescription}>{note.narrative}</p>
                <blockquote>{note.principle}</blockquote>
                <div className={styles.noteLinks}>
                  {note.links.map((link) => (
                    <a key={link.url} href={link.url} target="_blank" rel="noreferrer">{link.label} ↗</a>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.worlds} aria-labelledby="world-title">
          <div className={styles.sectionTop}>
            <div>
              <p className={styles.eyebrow}>THE PROJECT ARCHIVE</p>
              <h2 id="world-title">Four worlds. Four visual dialects.</h2>
            </div>
            <Link className={styles.textLink} href="/constellation">OPEN THE FULL MAP ↗</Link>
          </div>
          <div className={styles.worldGrid}>
            {worlds.map((project) => (
              <article key={project.id} className={styles.world} style={{ "--world-color": project.color }}>
                <div className={styles.worldHeading}>
                  <span>EXHIBIT {project.id}</span>
                  <span className={styles.worldDot} aria-hidden="true" />
                </div>
                <p className={styles.worldConcept}>{project.concept}</p>
                <h3>{project.name}</h3>
                <p>{project.summary}</p>
                <div className={styles.worldFooter}>
                  <Link href={project.href}>CASE STUDY ↗</Link>
                  <a href={project.repo} target="_blank" rel="noreferrer">GITHUB ↗</a>
                </div>
                <span className={styles.worldStamp}>{project.theme}</span>
              </article>
            ))}
          </div>
        </section>

        <section className={styles.coda} aria-labelledby="coda-title">
          <p className={styles.eyebrow}>NOT A FINISHED EXPERIMENT</p>
          <h2 id="coda-title">The work is allowed to evolve.</h2>
          <p>
            The code includes real pages, visual systems and integrations. It also
            includes configurable services, feature experiments, and claims that
            need independent testing. Those boundaries are part of the story—not
            something to hide behind animation.
          </p>
          <div className={styles.codaLinks}>
            <Link href="/">BACK TO THE PORTFOLIO ↗</Link>
            <a href="https://github.com/HuLaxx/my-portfolio" target="_blank" rel="noreferrer">REVIEW THE SOURCE ↗</a>
          </div>
        </section>
        <footer className={styles.foot}>
          <span>RAHUL KHANKE / HULAX STUDIO</span>
          <span>THE MAKING OF / OPEN FIELD NOTES / 2026</span>
        </footer>
      </div>
    </main>
  );
}
