const groups = [
  {
    name: "Data engineering",
    items: ["Python", "SQL", "Data pipelines", "ETL / ELT", "Apache Airflow", "Apache Kafka", "PostgreSQL", "Data modelling"],
  },
  {
    name: "ML and MLOps",
    items: ["scikit-learn", "XGBoost", "PyTorch", "MLflow", "SHAP", "Feature engineering", "Time series", "Bayesian statistics"],
  },
  {
    name: "Backend and applied AI",
    items: ["Java", "FastAPI", "REST APIs", "GraphQL", "LangGraph", "RAG", "Neo4j", "Docker", "CI/CD"],
  },
];

export const Skills = () => (
  <section id="skills" aria-labelledby="skills-heading" className="relative z-10 py-10 md:py-12">
    <div className="mx-auto w-[98%] md:w-full md:max-w-6xl px-4 sm:px-6 xl:px-12">
      <div className="rounded-3xl border border-[var(--border)] bg-[var(--card)]/30 p-6 sm:p-10">
        <p className="mb-3 font-mono text-xs font-semibold uppercase tracking-[0.25em] text-[var(--accent)]">Engineering toolkit</p>
        <h2 id="skills-heading" className="mb-5 display-heading text-3xl sm:text-4xl font-semibold text-[var(--foreground)]">Core skills</h2>
        <p className="mb-8 max-w-3xl text-sm sm:text-base leading-relaxed text-[var(--muted)]">Professional experience and independent project tools are shown together; individual case studies distinguish deployed, local-only and experimental integrations.</p>
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">
          {groups.map((group) => (
            <div key={group.name} className="rounded-2xl border border-[var(--border)] bg-[var(--background)]/30 p-5">
              <h3 className="mb-4 text-lg font-semibold text-[var(--foreground)]">{group.name}</h3>
              <ul className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <li key={item} className="rounded-full border border-[var(--border)] px-3 py-1.5 text-xs text-[var(--foreground)]">{item}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  </section>
);
