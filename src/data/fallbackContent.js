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
  label: "DATA ENGINEERING · AI/ML · BACKEND",
  title: "RAHUL KHANKE",
  summary:
    "Software engineer with experience in enterprise application delivery and hands-on data engineering for a small financial-sector business. At SHARP INVESCO REVOLUTIONS, I supported internal financial operations through data engineering and some applied AI/ML work, with substantial individual ownership. My MSc in Data Science and independent projects extend this foundation into backend systems, applied machine learning and data-intensive software.",
  neuralSummary:
    "I enjoy translating business needs into practical software. Explore my Bayesian change-point research, graph-based fraud investigation prototype, market-data experiments and route-optimisation project.",
  studies: [
    {
      slug: "msc-data-science",
      institution: "University of Glasgow",
      degree: "MSc in Data Science",
      year: "2025",
      dissertation: "BCPD (Bayesian Change Point Detection) using ML for indexes and crypto time series.",
      dissertationDetail: "Investigated Bayesian methods for identifying structural changes in financial time series. Explored market-regime interpretation, methodological assumptions and sensitivity to modelling choices. Quantitative outperformance is not claimed without reproducible evidence.",
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
      dissertation: "Xchange: Online Library Book Rental & Payment Platform",
      dissertationDetail: "Developed Xchange as a student-focused book-rental and exchange software project. The original CV identifies it as a final-year project; its exact academic title and deployed integrations require confirmation.",
      skills: ["Full Stack Development", "Database Design", "API Integration", "UI/UX Design"],
      tools: ["Android/Java", "Firebase", "Stripe API", "XML"],
      modules: ["Data Structures", "Algorithms", "DBMS", "Operating Systems"],
      image: "/generated/edu-univ.png",
    },
  ],
  experience: [
    {
      company: "SHARP INVESCO REVOLUTIONS",
      slug: "sharp-invesco-revolutions",
      role: "Data Engineer",
      period: "9 Dec 2024 – 6 Nov 2026",
      location: "Nagpur, India · Remote from Glasgow, UK",
      description: "Worked across data engineering and selected applied AI/ML responsibilities for a small part of the company's own financial operations. In a lean team, I took substantial hands-on ownership of the technical work and its ongoing evolution, rather than delivering technology services to external clients.",
      image: "/generated/exp-tech.png",
      // No employer-specific tool list or performance statistics until supported by work evidence.
      stack: [],
      focusAreas: [
        "Internal financial operations",
        "Data engineering",
        "Applied AI/ML",
        "Individual end-to-end ownership"
      ],
      highlightsTitle: "Scope & Contributions",
      highlights: [
        "Supported financial-operation data needs inside the business, not customer-facing consulting engagements.",
        "Worked hands-on across Data Engineering responsibilities and some AI/ML-related work as the company's internal needs developed.",
        "Took substantial individual ownership in a very small organisation with limited specialised engineering resources.",
        "Developed practical engineering capability through independent learning and implementation while supporting the business's changing requirements.",
        "Collaborated remotely from Glasgow with the India-based business; the exact systems, tools, models and measured business results still require employer-backed detail."
      ]
    },
    {
      company: "Accenture",
      slug: "accenture",
      role: "Custom Software Engineering Associate",
      period: "Oct 2022 - Sep 2024",
      description: "Worked on enterprise application and data/analytics integration. The existing CV reports Java, Python, SQL, ETL and ML-related work; exact production scope and numerical results require corroboration.",
      image: "/generated/exp-corp.png",
      stack: ["Java", "Python", "SQL", "Software Integration"],
      stats: [],
      highlights: [
        "Contributed to software integration and analytics workflows involving Python, SQL and enterprise applications, as described in the original CV.",
        "The original CV reports work involving ETL, data validation, model workflows and Java/Spring Boot integration; the specific depth and technologies require confirmation.",
        "Removed unverified percentage improvements, data-scale and global-user claims pending supporting evidence."
      ]
    },
    {
      company: "Cognizant",
      slug: "cognizant",
      role: "Data Engineering & ML Intern (role scope to confirm)",
      period: "Jan 2022 - Apr 2022",
      description: "Supported data preparation, exploratory ML and reporting tasks during an internship, based on candidate-provided CV information.",
      image: "/generated/exp-corp.png",
      stack: ["Python", "SQL", "Data Preparation", "Exploratory ML"],
      stats: [],
      highlights: [
        "The existing CV reports Python/SQL data processing, exploratory sentiment analysis, data cleaning and reporting.",
        "Specific Spark, BI and deployment responsibilities should be checked against internship records."
      ]
    },
  ],
  knowledgeBase: `
    PUBLIC-PORTFOLIO PROFILE FOR RAHUL KHANKE:
    - Positioning: Software engineering with focus on data engineering, AI/ML projects and backend systems.
    - Employment: Accenture Custom Software Engineering Associate (Oct 2022-Sep 2024); Cognizant internship (Jan-Apr 2022).
    - Candidate-reported experience pending validation: SHARP INVESCO REVOLUTIONS, 9 December 2024 to 6 November 2026, Nagpur, India, performed remotely from Glasgow, UK. Proposed role label: Data Engineer (official employer designation pending confirmation). Small business / internal financial-operations scope, not external client delivery. Hands-on data engineering and some applied AI/ML work; substantial individual ownership and independent learning/implementation in a resource-limited environment. Do not equate broad ownership with an official senior title. Exact systems, tools, tasks, model deployment, employment type, hours and measurable outcomes remain unverified.
    - Independent projects: Sentinance (market-data and AI research prototype), GraphGuard (fraud investigation prototype), FleetFlow (dispatch and optimisation prototype), Shiftify (music-library portability).
    - Education: MSc Data Science, University of Glasgow, 2025; BE Computer Science, G.H. Raisoni College, 2022.
    - MSc dissertation: Bayesian Change Point Detection for Financial Time Series.
    - Undergraduate final-year project: Xchange online book-rental and exchange platform.
    - Never invent employer-specific data pipelines, model accuracy, scale, revenue or headcount. Distinguish project code from production systems.
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
  "data-engineer": {
    title: "Data Engineer",
    description: "Supporting practical data engineering for internal financial operations, with Python and SQL workflows and independent projects exploring orchestration, streaming and graph data.",
    skills: ["Python", "SQL", "Pandas", "Data Preparation", "Data Quality", "Airflow", "Kafka", "dbt", "PostgreSQL", "TimescaleDB", "Neo4j", "Redis", "Docker"],
    projects: ["sentinance", "graphguard", "fleetflow"],
    stats: [
      { label: "Pipelines", value: "Python + SQL" },
      { label: "Streaming", value: "Kafka Modules" },
      { label: "Data Stores", value: "SQL + Neo4j" },
    ]
  },
  "ai-ml-engineer": {
    title: "AI/ML Engineer",
    description: "Exploring predictive modelling, time-series research, graph ML, explainability and agentic AI through research and independent engineering projects. Production readiness is assessed separately.",
    skills: ["Python", "scikit-learn", "PyTorch", "XGBoost", "Time-Series Forecasting", "LSTM / Prophet (research)", "Bayesian Change Point Detection", "Graph ML (GAT exploration)", "SHAP / LIME", "Model Evaluation", "LangGraph", "RAG", "Qdrant", "FastAPI", "MLflow"],
    projects: ["sentinance", "graphguard", "fleetflow"],
    stats: [
      { label: "Forecasting", value: "LSTM / Prophet" },
      { label: "Graph ML", value: "GAT / XGBoost" },
      { label: "Agents", value: "LangGraph + RAG" },
    ]
  },
  "software-engineer": {
    title: "Software Engineer",
    description: "Designing and building backend and full-stack software, integrating data-intensive services and exploring route optimisation in independent projects.",
    skills: ["Python", "SQL", "Next.js 16", "TypeScript", "React 19", "Tailwind 4", "FastAPI", "PostgreSQL", "Redis", "tRPC", "GraphQL", "WebSockets", "Framer Motion", "D3.js", "OR-Tools", "Docker"],
    projects: ["sentinance", "graphguard", "fleetflow", "shiftify"],
    stats: [
      { label: "Frontend", value: "Next.js + React" },
      { label: "Realtime", value: "WebSockets" },
      { label: "Optimization", value: "OR-Tools" },
    ]
  },

};
