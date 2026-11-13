export const fallbackProjects = [
  {
    year: "2026",
    client: "Sentinance",
    role: "All Roles",
    slug: "sentinance",
    summary:
      "Market-intelligence research combining exchange-data adapters, LangGraph investigation paths and optional LSTM forecasting with documented provider fallbacks.",
    live: "https://sentinance.hulax.vercel.app",
    github: "https://github.com/HuLaxx/Sentinance",
    languages: {
      "Next.js": 40,
      Python: 35,
      TypeScript: 25,
    },
  },
  {
    year: "2026",
    client: "GraphGuard",
    role: "All Roles",
    slug: "graphguard",
    summary:
      "Fraud-investigation prototype exploring Neo4j relationships, XGBoost/SHAP explanations and a GraphQL interface, with clearly labeled sample cases.",
    live: "https://graphguard.hulax.vercel.app",
    github: "https://github.com/HuLaxx/GraphGuard",
    languages: {
      Python: 50,
      "Next.js": 30,
      GraphQL: 20,
    },
  },
  {
    year: "2026",
    client: "FleetFlow",
    role: "All Roles",
    slug: "fleetflow",
    summary:
      "Logistics control-room prototype: OR-Tools route proposals, operational event modules and a map interface that includes sample fleet geometry.",
    live: "https://fleetflow.hulax.vercel.app",
    github: "https://github.com/HuLaxx/FleetFlow",
    languages: {
      "Next.js": 50,
      Python: 30,
      SQL: 20,
    },
  },
  {
    year: "2026",
    client: "Shiftify",
    role: "Full Stack / Product Design",
    slug: "shiftify",
    summary:
      "A music-library portability experiment: import and normalize playlists, review track metadata, export CSV reports, and explore YouTube Music account transfers with explicit credential boundaries.",
    live: "https://shiftify.hulax.uk/",
    github: "https://github.com/HuLaxx/Shiftify",
    languages: {
      TypeScript: 80,
      "Next.js": 15,
      SQL: 5,
    },
  },
];

export const fallbackResume = {
  label: "DATA ENGINEER | AI/ML ENGINEERING",
  title: "RAHUL KHANKE",
  summary:
    "Data Engineer working across Python, SQL, data pipelines and AI/ML systems. My background combines software engineering at Accenture, a data engineering and ML internship at Cognizant, and an MSc in Data Science from the University of Glasgow.",
  neuralSummary:
    "Explore my work on event-driven data pipelines, ML-enabled APIs and AI-assisted applications, alongside my research in Bayesian change-point detection. Project case studies explain implemented features, optional integrations and demo data.",
  studies: [
    {
      slug: "msc-data-science",
      institution: "University of Glasgow",
      degree: "MSc in Data Science",
      year: "2025",
      dissertation: "BCPD (Bayesian Change Point Detection) using ML for indexes and crypto time series.",
      dissertationDetail: "Investigated Bayesian methods for identifying structural breaks and market regimes in financial time series, using Python, probabilistic modelling and statistical analysis.",
      skills: ["Bayesian Statistics", "Time Series Analysis", "Deep Learning", "Big Data Analytics", "Information Retrieval", "Text Mining"],
      tools: ["Python", "PyTorch", "PyMC3", "Hadoop/Spark", "MongoDB", "Linux"],
      modules: [
        "Data Science and Systems",
        "Deep Learning",
        "Machine Learning & AI for DS",
        "Big Data",
        "Text as Data",
        "Web Science",
        "Information Retrieval", // specialist course mentioned in search
        "Research Professional Skills",
        "Cyber Security Fundamentals",
        "Internet Technology",
        "Programming Systems",
      ],
      image: "/generated/edu-univ.png",
    },
    {
      slug: "be-computer-science",
      institution: "G.H. Raisoni College of Engineering",
      degree: "B.E in Computer Science",
      year: "2022",
      dissertation: "Xchange: Online Book Rental & Exchange Platform",
      dissertationDetail: "Designed a student-focused application for discovering, renting and exchanging physical books, exploring marketplace workflows, database design and application development.",
      skills: ["Full Stack Development", "Database Design", "API Integration", "UI/UX Design"],
      tools: ["Application Development", "Database Design", "Marketplace Workflows"],
      modules: ["Data Structures", "Algorithms", "DBMS", "Operating Systems"],
      image: "/generated/edu-univ.png",
    },
  ],
  experience: [
    {
      company: "Accenture",
      slug: "accenture",
      role: "Custom Software Engineering Associate",
      period: "Oct 2022 - Sept 2024",
      description: "Contributed to enterprise software integrations and claims-analytics workflows spanning Python/SQL data processing, predictive model outputs and existing business systems.",
      image: "/generated/exp-corp.png",
      stack: ["Java", "Spring Boot", "React", "Kafka", "AWS", "Docker", "Kubernetes", "Airflow", "Python", "SQL"],
      stats: [
        { label: "Data", value: "Python / SQL" },
        { label: "Applications", value: "Java / Spring Boot" },
        { label: "Focus", value: "Integration" }
      ],
      highlights: [
        "Contributed to claims-analytics workflows combining data processing, feature engineering and predictive model outputs.",
        "Designed ETL/data pipelines with Python, SQL, and Airflow, improving data availability and reliability.",
        "Built feature engineering and model evaluation workflows to improve model quality and business usability.",
        "Worked with container and delivery practices involving Docker, Kubernetes and CI/CD.",
        "Supported integration of analytical services with existing business systems.",
        "Collaborated with cross‑functional teams to align data architecture and production requirements."
      ]
    },
    {
      company: "Cognizant",
      slug: "cognizant",
      role: "Intern",
      period: "Jan 2022 - Apr 2022",
      description: "Contributed to Python, SQL and Spark data preparation, sentiment-analysis exercises and analytics reporting.",
      image: "/generated/exp-corp.png",
      stack: ["Python", "SQL", "Spark", "Tableau", "Power BI", "Docker", "Kubernetes", "Java"],
      stats: [
        { label: "Data", value: "Python / SQL / Spark" },
        { label: "Analytics", value: "Text / Reporting" },
        { label: "Role", value: "Internship" }
      ],
      highlights: [
        "Contributed to Python, SQL and Spark processing workflows to clean and prepare data for analysis.",
        "Built ML modules for sentiment analysis and topic modeling on customer reviews and social data.",
        "Contributed to DevOps/MLOps workflows using Docker + Kubernetes for containerized services.",
        "Developed Tableau/Power BI dashboards to visualize KPIs and support stakeholder decisions.",
        "Assisted with data cleaning/validation and documentation to support analytics reporting."
      ]
    },
  ],
  knowledgeBase: `
    RESUME DATA FOR RAHUL KHANKE:
    - Focus: Data engineering with AI/ML and software engineering experience.
    - Core work: Python/SQL data processing, enterprise integration and engineering projects involving streaming, ML and AI-assisted applications.
    - Projects: Sentinance (market-data and AI research), GraphGuard (graph-informed fraud investigation), FleetFlow (routing and logistics data), Shiftify (music-library import/review/reporting).
    - Project status: Portfolio projects contain implemented modules, optional integrations and demo/sample data. They are not evidence of commercial employment or verified production scale.
    - Education: MSc Data Science, University of Glasgow (2025); B.E. Computer Science, G.H. Raisoni College of Engineering (2022).
    - Dissertations: Bayesian Change Point Detection in Financial Time Series; Xchange - Online Book Rental and Exchange Platform.
    - Listed employment:
      1. Accenture - Custom Software Engineering Associate, Oct 2022 - Sep 2024.
      2. Cognizant - Intern (data engineering and machine learning), Jan 2022 - Apr 2022.
    - Only describe employment entries supplied here. Do not infer additional employers, completed future dates or years of commercial experience from project activity.
    - Location: Glasgow, UK.
    - Contact: rahulkhanke786@gmail.com
  `,
};

export const fallbackStackComparisons = [
  {
    id: "current",
    title: "Current Build Stack",
    caption:
      "What powers this repo: Next.js 15 App Router, React 19 with the React Compiler, Tailwind 4, Three.js background system, Vercel AI SDK (Gemini), Sanity-ready CMS layer, and Vercel Analytics/SI.",
    highlights: [
      "Edge runtime enforced for zero-middleware deployments on Vercel/Cloudflare.",
      "Server Actions stream AI answers via Gemini 2.5 Flash using the Vercel AI SDK.",
      "CMS abstraction ready for Sanity with typed Zod guards + fallback content.",
      "Observability via @vercel/analytics & @vercel/speed-insights.",
    ],
  },
  {
    id: "market",
    title: "Market-Trending Studio Stack",
    caption:
      "Studios layer this core with content federations and ML ops. Outline provided to show the next upgrade path.",
    highlights: [
      "Next.js 15 + Turbopack dev server, React Compiler, partial pre-rendering, image/CDN edge caching.",
      "Composable content graph (Sanity/Contentful + Notion + DAM) unified via typed GraphQL or GROQ.",
      "LangChain orchestration on serverless GPUs with vector stores (Pinecone/Neon) and evaluation dashboards.",
      "Golden signals via Vercel Observability, PostHog, and Edge Config-driven feature flags.",
    ],
  },
  {
    id: "baseline",
    title: "Standard Baseline Stack",
    caption:
      "Conventional agencies still rely on this mix--useful for stakeholder comparisons.",
    highlights: [
      "React 18 SPA (CRA/Vite) hydrated entirely on the client.",
      "SASS or CSS Modules for styling, manual animation libraries per route.",
      "Single-region Node/Express APIs without caching or streaming.",
      "Ad-hoc GA tracking, no AI copilots, and design content hard-coded.",
    ],
  },
];

export const fallbackCaseStudies = [
  {
    slug: "sentinance",
    client: "Sentinance",
    title: "Real-Time Crypto Market Intelligence",
    year: "2026",
    summary:
      "A market-data intelligence experiment with exchange connectors, FastAPI WebSocket routes, optional LSTM forecasting and LangGraph-assisted research paths.",
    scenario: {
      challenge:
        "Traders struggle with fragmented data sources and lack verifiable, AI-driven insights for volatile crypto markets.",
      solution:
        "Developed FastAPI and WebSocket market-data modules and explored Kafka, LSTM forecasting and LangGraph agent orchestration. Provider connections, trained models and some retrieval functions depend on configuration or fallbacks.",
    },
    role: [
      "Data Engineering",
      "AI/ML Engineering",
      "Full Stack Development",
      "System Architecture"
    ],
    metrics: [
      { label: "Data", value: "API / WebSocket" },
      { label: "Agent", value: "LangGraph Paths" },
      { label: "Forecast", value: "LSTM (Optional)" },
    ],
    languages: {
      "Next.js": 40,
      Python: 40,
      TypeScript: 20,
    },
    process: [
      {
        title: "Streaming Pipeline",
        detail:
          "Built multi-exchange adapter modules and FastAPI WebSocket interfaces. Availability and throughput depend on working providers and local services and have not been re-benchmarked.",
      },
      {
        title: "Agentic AI System",
        detail:
          "Explored LangGraph orchestration and Gemini/Groq integrations with provider-dependent and mocked fallback paths; production autonomous behaviour remains unverified.",
      },
      {
        title: "Predictive Modeling",
        detail:
          "Created optional PyTorch LSTM prediction pathways and supporting model/research modules. An independently validated deployed model and forecast accuracy are not established here.",
      },
    ],
    media: {
      poster: "/projects/sentinance-signal-atlas.svg",
      showPoster: true,
      alt: "Original Sentinance market observatory artwork, conceptual and not a live market-data screenshot",
      caption: "Original animated project artwork — not live financial data or a performance report.",
      video: "",
    },
    links: {
      live: "https://sentinance.hulax.vercel.app",
      github: "https://github.com/HuLaxx/Sentinance",
    },
    tech: [
      "Next.js 16",
      "FastAPI",
      "LangGraph",
      "Kafka",
      "TimescaleDB",
      "Redis",
      "Qdrant",
      "PyTorch",
      "Docker",
    ],
  },
  {
    slug: "graphguard",
    client: "GraphGuard",
    title: "Network Fraud Detection Platform",
    year: "2026",
    summary:
      "A graph-informed fraud-investigation project combining Neo4j relationship modeling, XGBoost scoring, SHAP explanations and a case-review interface with some demo fixtures.",
    scenario: {
      challenge:
        "Traditional fraud rules miss complex network patterns like circular transactions and mule accounts used in money laundering.",
      solution:
        "Implemented graph, model and investigation modules based on Neo4j, XGBoost, SHAP and GraphQL. The local stack needs configuration and the case UI includes sample records, so integration status should be verified separately.",
    },
    role: [
      "Data Engineering",
      "ML Engineering",
      "Backend API",
      "Frontend Visualization"
    ],
    metrics: [
      { label: "Graph", value: "Neo4j + Cypher" },
      { label: "API", value: "GraphQL + FastAPI" },
      { label: "ML", value: "XGBoost + SHAP" },
    ],
    languages: {
      Python: 50,
      "Next.js": 30,
      GraphQL: 20,
    },
    process: [
      {
        title: "Graph Data Engineering",
        detail:
          "Developed graph modeling and stream-ingestion modules using Neo4j and Kafka-oriented sources. Complete low-latency integration remains to be validated.",
      },
      {
        title: "Explainable ML",
        detail:
          "Explored XGBoost scoring and SHAP explanations with graph-engineered features. Explanations describe model contributions, not causal proof of fraud.",
      },
      {
        title: "Investigator Interface",
        detail:
          "Built a Next.js investigation interface with graph visualization and GraphQL-backed source modules; mock cases demonstrate the intended review experience.",
      },
    ],
    media: {
      poster: "/projects/graphguard-evidence-graph.svg",
      showPoster: true,
      alt: "Original illustrative GraphGuard casefile artwork showing fictional graph relationships around a transaction",
      caption: "Animated forensic concept — fictional entities, not real cases or measured fraud outcomes.",
      video: "",
    },
    links: {
      live: "https://graphguard.hulax.vercel.app",
      github: "https://github.com/HuLaxx/GraphGuard",
    },
    tech: [
      "Next.js 16",
      "FastAPI",
      "GraphQL",
      "Neo4j",
      "Kafka",
      "XGBoost",
      "D3.js",
      "Docker",
    ],
  },
  {
    slug: "fleetflow",
    client: "FleetFlow",
    title: "Real-Time Delivery Optimization",
    year: "2026",
    summary:
      "A dispatch-optimization project exploring constrained OR-Tools route proposals, event modules and a visual fleet map that also contains sample route geometry.",
    scenario: {
      challenge:
        "Last-mile delivery efficiency collapses when static routes meet real-world chaos (traffic, cancellations, new high-priority orders).",
      solution:
        "Built an OR-Tools route solver and FastAPI endpoint returning candidate route plans, with event-streaming source modules and Next.js/tRPC/WebSocket interfaces. Automatic live re-dispatch is not yet independently verified.",
    },
    role: [
      "Full Stack Development",
      "Data Engineering",
      "Optimization (OR)",
      "DevOps"
    ],
    metrics: [
      { label: "Frontend", value: "React 19 + TW4" },
      { label: "Optimization", value: "Google OR-Tools" },
      { label: "Telemetry", value: "WebSocket Modules" },
    ],
    languages: {
      "Next.js": 50,
      Python: 30,
      SQL: 20,
    },
    process: [
      {
        title: "Modern Frontend Architecture",
        detail:
          "Built a Next.js 16 and React 19 dashboard integrating deck.gl/MapLibre-style map layers, sample stops and a WebSocket hook for vehicle locations.",
      },
      {
        title: "Optimization Engine",
        detail:
          "Implemented an OR-Tools VRP solver and FastAPI optimization endpoint to propose stop sequences under capacity and time-window constraints; it does not automatically persist approved dispatches.",
      },
      {
        title: "Event-Driven Backbone",
        detail:
          "Added Kafka event and GPS consumer modules plus WebSocket interfaces. End-to-end event delivery, reliability and replay still require recorded validation.",
      },
    ],
    media: {
      poster: "/projects/fleetflow-dispatch-atlas.svg",
      showPoster: true,
      alt: "Original schematic FleetFlow city-grid artwork with illustrative delivery routes and a dispatch depot",
      caption: "Animated dispatch illustration — not live GPS, actual routing results or measured efficiency.",
      video: "",
    },
    links: {
      live: "https://fleetflow.hulax.vercel.app",
      github: "https://github.com/HuLaxx/FleetFlow",
    },
    tech: [
      "Next.js 16",
      "React 19",
      "Tailwind 4",
      "tRPC",
      "WebSocket",
      "OR-Tools",
      "Kafka",
      "PostGIS",
      "TimescaleDB",
    ],
  },
  {
    slug: "shiftify",
    client: "Shiftify",
    title: "The Music Passport",
    year: "2026",
    summary:
      "An expressive music-library project exploring portable tracklists, review workflows and account-to-account operations, with a deliberate focus on understanding where data and credentials travel.",
    scenario: {
      challenge:
        "A music collection is easy to build but difficult to move or audit. Different exports can have inconsistent artist/title fields, while authenticated account transfers introduce sensitive security and trust boundaries.",
      solution:
        "Developed a Next.js experience with server-side CSV, JSON and text importing, track normalization, a review queue and a CSV report. A separate advanced YouTube Music adapter explores account actions through a server API using user-provided session cookies; it requires a trusted environment and further security review.",
    },
    role: [
      "Full Stack Development",
      "Product Design",
      "Data Normalization",
      "API Engineering",
    ],
    metrics: [
      { label: "Imports", value: "CSV / JSON / Text" },
      { label: "Workflow", value: "Import → Review" },
      { label: "Report", value: "CSV Download" },
    ],
    languages: {
      TypeScript: 80,
      "Next.js": 15,
      SQL: 5,
    },
    process: [
      {
        title: "Side A — The tracklist",
        detail:
          "Built parsing and normalization flows that recognize track/artist fields and present questionable records for review. Imported collections are processed by an API and stored in server-side SQLite, not only inside the browser.",
      },
      {
        title: "Side B — The transfer adapter",
        detail:
          "Explored YouTube Music source/destination playlist operations via server-side requests. Session cookies cross into the API, so this route is not marketed as browser-only or security-audited.",
      },
      {
        title: "The product experience",
        detail:
          "Designed an editorial, music-led interface with review tools, library concepts and optional Supabase-based party-room experiments. Public deployment and full account-transfer behaviour still need verification.",
      },
    ],
    media: {
      poster: "/projects/shiftify-music-passport.svg",
      showPoster: true,
      alt: "Original Shiftify Music Passport artwork with animated vinyl record, library cards and music portability motif",
      caption: "Original conceptual visual — no real account data or audio playback.",
      video: "",
    },
    links: {
      live: "https://shiftify.hulax.uk/",
      github: "https://github.com/HuLaxx/Shiftify",
    },
    tech: [
      "Next.js 16",
      "React 19",
      "TypeScript",
      "Tailwind CSS 4",
      "SQLite",
      "CSV / JSON",
      "Supabase (optional)",
    ],
  },
];

export const fallbackRoles = {
  "data-scientist": {
    title: "Data Scientist",
    description: "Exploring time-series forecasting, graph-informed risk scoring and constrained optimization through research and engineering projects.",
    skills: ["Python", "Pandas", "PyTorch", "LSTM/Prophet", "XGBoost", "Graph ML", "SHAP/LIME", "OR-Tools"],
    projects: ["sentinance", "graphguard", "fleetflow"],
    stats: [
      { label: "Forecasting", value: "LSTM + Prophet" },
      { label: "Graph ML", value: "GAT + XGBoost" },
      { label: "Optimization", value: "OR-Tools" },
    ]
  },
  "data-engineer": {
    title: "Data Engineer",
    description: "Building resilient streaming (Kafka) and batch (Airflow/dbt) pipelines, persisting data to specialized stores like TimescaleDB and Neo4j.",
    skills: ["Kafka", "Airflow", "dbt", "PostgreSQL", "TimescaleDB", "Neo4j", "Redis", "Docker"],
    projects: ["sentinance", "graphguard", "fleetflow"],
    stats: [
      { label: "Streaming", value: "Kafka backbone" },
      { label: "Pipelines", value: "Airflow + dbt" },
      { label: "Stores", value: "Postgres + Neo4j" },
    ]
  },
  "ai-ml-engineer": {
    title: "AI/ML Engineer",
    description: "Building AI/ML application prototypes with LangGraph orchestration, retrieval and FastAPI model interfaces, with optional providers and deployment requirements documented.",
    skills: ["LangGraph", "RAG", "Qdrant", "FastAPI", "LLMs (Gemini/Groq)", "MLflow", "Model Serving", "Vector Search"],
    projects: ["sentinance", "graphguard", "fleetflow"],
    stats: [
      { label: "Agents", value: "LangGraph Multi-Agent" },
      { label: "Models", value: "GenAI + Predictive" },
      { label: "Serving", value: "FastAPI Interfaces" },
    ]
  },
  "software-engineer": {
    title: "Software Engineer",
    description: "Delivering robust full-stack applications and owning the complete feature lifecycle—from database schema design to responsive, animated frontend UIs and real-time WebSocket layers.",
    skills: ["Next.js 16", "TypeScript", "React 19", "Tailwind 4", "FastAPI", "PostgreSQL", "Redis", "tRPC", "GraphQL", "Framer Motion", "D3.js", "Docker"],
    projects: ["sentinance", "graphguard", "fleetflow", "shiftify"],
    stats: [
      { label: "Frontend", value: "Next.js 16 + React 19" },
      { label: "Realtime", value: "WebSockets + Streaming" },
      { label: "Visuals", value: "D3.js + Deck.gl" },
    ]
  },

};
