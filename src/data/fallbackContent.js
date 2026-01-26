export const fallbackProjects = [
  {
    year: "2026",
    client: "Sentinance",
    role: "All Roles",
    slug: "sentinance",
    summary:
      "Real-time crypto market intelligence with LangGraph AI agents, LSTM forecasting, and live multi-exchange streaming.",
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
      "Fraud detection platform blending Neo4j graph analytics, explainable XGBoost ML models, and a GraphQL API.",
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
      "Real-time delivery optimization using OR-Tools, React 19 + Tailwind 4, and reactive Kafka event streaming.",
    live: "https://fleetflow.hulax.vercel.app",
    github: "https://github.com/HuLaxx/FleetFlow",
    languages: {
      "Next.js": 50,
      Python: 30,
      SQL: 20,
    },
  },
];

export const fallbackResume = {
  label: "DATA SCIENTIST & AI ENGINEER",
  title: "RAHUL KHANKE",
  summary:
    "Data Scientist & AI Engineer building high-performance systems where data meets scale. I architect resilient streaming pipelines, train predictive ML models, and deploy autonomous AI agents—backed by a robust full-stack engineering foundation.",
  neuralSummary:
    "Ask about my dissertation on Bayesian Change Point Detection, my work with LangGraph agents and RAG systems, or my experience building real-time event-driven architectures.",
  studies: [
    {
      slug: "msc-data-science",
      institution: "University of Glasgow",
      degree: "MSc in Data Science",
      year: "2025",
      dissertation: "BCPD (Bayesian Change Point Detection) using ML for indexes and crypto time series.",
      dissertationDetail: "Investigated Bayesian methods for detecting structural breaks in high-volatility financial time series. Developed a custom probabilistic model in Python (PyMC3/NumPy) to identify market regime changes in real-time, outperforming traditional sliding-window variance metrics by 35%. Validated on 5 years of crypto and S&P 500 index data.",
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
      dissertationDetail: "Built a localized full-stack marketplace for students to rent and exchange textbooks. Integrated Stripe for secure deposits and a real-time inventory system using Firebase Realtime Database to prevent double-booking.",
      skills: ["Full Stack Development", "Database Design", "API Integration", "UI/UX Design"],
      tools: ["Android/Java", "Firebase", "Stripe API", "XML"],
      modules: ["Data Structures", "Algorithms", "DBMS", "Operating Systems"],
      image: "/generated/edu-univ.png",
    },
  ],
  experience: [
    // {
    //   company: "Enterprise AI Consultancy",
    //   slug: "enterprise-ai",
    //   role: "AI & Data Solution Engineer",
    //   period: "Sep 2024 - Dec 2025",
    //   description: "Engineering advanced AI and data solutions, focusing on scalable architecture, RAG systems, and ML integration for enterprise clients.",
    //   image: "/generated/exp-tech.png",
    //   stack: ["Python", "AWS", "LLMs", "RAG", "Data Pipelines"],
    //   stats: [
    //     { label: "Projects", value: "Multiple" },
    //     { label: "Impact", value: "High" },
    //     { label: "Team", value: "Engineering" }
    //   ]
    // },
    {
      company: "Accenture",
      slug: "accenture",
      role: "Custom Software Engineering Associate",
      period: "Oct 2022 - Sept 2024",
      description: "Engineered scalable end-to-end ML systems and data pipelines, integrating AI solutions with legacy architecture. Built predictive models for claims analytics and automated production workflows.",
      image: "/generated/exp-corp.png",
      stack: ["Java", "Spring Boot", "React", "Kafka", "AWS", "Docker", "Kubernetes", "Airflow", "Python", "SQL"],
      stats: [
        { label: "Data Scale", value: "TB+" },
        { label: "Accuracy", value: "+30%" },
        { label: "Users", value: "Global" }
      ],
      highlights: [
        "Built end‑to‑end ML models for claims analytics, improving accuracy by 30% and reducing processing time by 50%.",
        "Designed ETL/data pipelines with Python, SQL, and Airflow, improving data availability and reliability.",
        "Built feature engineering and model evaluation workflows to improve model quality and business usability.",
        "Deployed containerized ML services with Docker + Kubernetes, and set up CI/CD for production delivery.",
        "Integrated AI solutions with legacy systems to deliver real‑time insights for underwriters and product teams.",
        "Collaborated with cross‑functional teams to align data architecture and production requirements."
      ]
    },
    {
      company: "Cognizant",
      slug: "cognizant",
      role: "Intern",
      period: "Jan 2022 - Apr 2022",
      description: "Developed fundamental data engineering and ML solutions, focusing on real-time analytics pipelines, sentiment analysis models, and production-grade visualizations.",
      image: "/generated/exp-corp.png",
      stack: ["Python", "SQL", "Spark", "Tableau", "Power BI", "Docker", "Kubernetes", "Java"],
      stats: [
        { label: "Pipelines", value: "Real-time" },
        { label: "ML Ops", value: "Docker/K8s" },
        { label: "Focus", value: "DE & ML" }
      ],
      highlights: [
        "Engineered ETL pipelines using Python, SQL, and Apache Spark to integrate multi‑source data for real‑time analytics.",
        "Built ML modules for sentiment analysis and topic modeling on customer reviews and social data.",
        "Contributed to DevOps/MLOps workflows using Docker + Kubernetes for containerized services.",
        "Developed Tableau/Power BI dashboards to visualize KPIs and support stakeholder decisions.",
        "Assisted with data cleaning/validation and documentation to support analytics reporting."
      ]
    },
    // {
    //   company: "Company A (Intern)",
    //   slug: "company-a-intern",
    //   role: "Data Engineering Intern",
    //   period: "Aug 2020 - Dec 2021",
    //   description: "Assisted in building data pipelines and processing large datasets.",
    //   image: "/generated/exp-tech.png",
    //   stack: ["Python", "SQL", "ETL"],
    //   stats: [
    //     { label: "Duration", value: "1.5 Years" },
    //     { label: "Focus", value: "Data Eng" }
    //   ]
    // },
  ],
  knowledgeBase: `
    RESUME DATA FOR RAHUL KHANKE:
    - Role: Data Scientist, AI Engineer.
    - Projects: Sentinance (real-time crypto intelligence), GraphGuard (graph ML fraud detection), FleetFlow (delivery optimization).
    - Education: MSc Data Science (University of Glasgow), B.E Computer Science (G.H. Raisoni).
    - Experience: 
      1. Company A (AI & Data Solution Engineer)
      2. Accenture (Software Engineer)
      3. Cognizant (Intern)
    - Location: Glasgow, UK.
    - Contact: +44 07584251036, rahulkhanke786@gmail.com
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
      "A real-time crypto analytics platform featuring live multi-exchange WebSocket streaming, LSTM-powered price forecasting, and an autonomous LangGraph agent for market analysis.",
    scenario: {
      challenge:
        "Traders struggle with fragmented data sources and lack verifiable, AI-driven insights for volatile crypto markets.",
      solution:
        "Built a streaming architecture using Kafka and WebSocket for sub-second updates, integrated LSTM models for 24h price prediction, and deployed a multi-agent RAG system (LangGraph + Qdrant) to answer market queries with citation-backed reasoning.",
    },
    role: [
      "Data Engineering",
      "AI/ML Engineering",
      "Full Stack Development",
      "System Architecture"
    ],
    metrics: [
      { label: "Assets", value: "10+ Live Streams" },
      { label: "Latency", value: "<100ms Inference" },
      { label: "Coverage", value: "96% Test Coverage" },
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
          "Engineered a high-throughput pipeline using `aiokafka` and FastAPI WebSockets to aggregate and broadcast real-time price feeds from Binance, Coinbase, and Kraken.",
      },
      {
        title: "Agentic AI System",
        detail:
          "Developed a multi-agent system with LangGraph and Gemini/Groq, enabling autonomous research and structured market analysis with fallback resilience.",
      },
      {
        title: "Predictive Modeling",
        detail:
          "Trained and deployed PyTorch LSTM models for time-series forecasting, served via FastAPI with comprehensive backtesting and MLflow tracking.",
      },
    ],
    media: {
      poster: "/projects/sentinance-poster.png", // Placeholder - improved path
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
      "A fraud detection system combining graph analytics (Neo4j), explainable ML (XGBoost + SHAP), and a GraphQL API to uncover hidden transaction rings and money laundering patterns.",
    scenario: {
      challenge:
        "Traditional fraud rules miss complex network patterns like circular transactions and mule accounts used in money laundering.",
      solution:
        "Implemented a graph-first approach using Neo4j to detect cycles and community structures, paired with an XGBoost classifier and SHAP explainability to provide transparent risk scores to investigators via a GraphQL dashboard.",
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
          "Designed a Neo4j graph schema to model Users, Accounts, and Transactions, ingestion streams from Kafka to surface 2nd and 3rd-degree connections in real-time.",
      },
      {
        title: "Explainable ML",
        detail:
          "Trained XGBoost models on graph-engineered features (PageRank, Community ID) and integrated SHAP values to explain valid reasons behind every fraud flag.",
      },
      {
        title: "Investigator Interface",
        detail:
          "Built a Next.js + D3.js dashboard consuming a Strawberry GraphQL API, creating an interactive visual exploration tool for compliance teams.",
      },
    ],
    media: {
      poster: "/projects/graphguard-poster.png", // Placeholder - improved path
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
      "A next-gen logistics platform leveraging React 19, Tailwind 4, and OR-Tools to provide real-time reactive route optimization and live fleet tracking.",
    scenario: {
      challenge:
        "Last-mile delivery efficiency collapses when static routes meet real-world chaos (traffic, cancellations, new high-priority orders).",
      solution:
        "Architected a reactive optimization engine using Google OR-Tools and Kafka to re-calculate routes on the fly, pushing updates instantly to a Next.js dashboard via WebSockets and tRPC.",
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
      { label: "Updates", value: "Real-time Socket.IO" },
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
          "Built a cutting-edge UI using Next.js 16 (App Router), React 19, and Tailwind 4, integrated with Deck.gl for high-performance map visualizations of fleet movements.",
      },
      {
        title: "Optimization Engine",
        detail:
          "Implemented the Vehicle Routing Problem (VRP) solver using Google OR-Tools in Python, exposed via FastAPI to dynamically re-assign stops based on capacity and time windows.",
      },
      {
        title: "Event-Driven Backbone",
        detail:
          "Orchestrated order ingestion and GPS telemetry streams using Confluent Kafka, ensuring data integrity and allowing for replayability of delivery scenarios.",
      },
    ],
    media: {
      poster: "/projects/fleetflow-poster.png", // Placeholder - improved path
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
      "Socket.IO",
      "OR-Tools",
      "Kafka",
      "PostGIS",
      "TimescaleDB",
    ],
  },
];

export const fallbackRoles = {
  "data-scientist": {
    title: "Data Scientist",
    description: "Designing LSTM forecasting models, graph neural networks (GAT), and predictive optimization systems for high-stakes domains.",
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
    description: "Deploying production-grade AI systems, from LangGraph multi-agent RAG pipelines to scalable model serving APIs.",
    skills: ["LangGraph", "RAG", "Qdrant", "FastAPI", "LLMs (Gemini/Groq)", "MLflow", "Model Serving", "Vector Search"],
    projects: ["sentinance", "graphguard", "fleetflow"],
    stats: [
      { label: "Agents", value: "LangGraph Multi-Agent" },
      { label: "Models", value: "GenAI + Predictive" },
      { label: "Serving", value: "FastAPI Production" },
    ]
  },
  "software-engineer": {
    title: "Software Engineer",
    description: "Delivering robust full-stack applications and owning the complete feature lifecycle—from database schema design to responsive, animated frontend UIs and real-time WebSocket layers.",
    skills: ["Next.js 16", "TypeScript", "React 19", "Tailwind 4", "FastAPI", "PostgreSQL", "Redis", "tRPC", "GraphQL", "Framer Motion", "D3.js", "Docker"],
    projects: ["sentinance", "graphguard", "fleetflow"],
    stats: [
      { label: "Frontend", value: "Next.js 16 + React 19" },
      { label: "Realtime", value: "WebSockets + Streaming" },
      { label: "Visuals", value: "D3.js + Deck.gl" },
    ]
  },

};
