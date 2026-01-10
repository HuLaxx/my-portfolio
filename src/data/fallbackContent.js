export const fallbackProjects = [
  {
    year: "2025",
    client: "Vogue Scandinavia",
    role: "Data Scientist",
    slug: "vogue-scandinavia",
  },
  {
    year: "2024",
    client: "SpaceX / Starship",
    role: "Data Engineer",
    slug: "spacex-starship",
  },
  {
    year: "2024",
    client: "Nike Lab",
    role: "AI/ML Engineer",
    slug: "nike-lab",
  },
];

export const fallbackResume = {
  label: "DATA SCIENTIST & AI ENGINEER",
  title: "RAHUL KHANKE",
  summary:
    "Data Scientist and AI Engineer with expertise in building robust data pipelines, training state-of-the-art ML models, and deploying scalable AI solutions. Proven track record at Accenture and Company A.",
  neuralSummary:
    "Ask about my MSc in Data Science from Glasgow, my time at Accenture, or my work with RAG and LLMs.",
  studies: [
    {
      institution: "University of Glasgow",
      degree: "MSc in Data Science",
      year: "2025",
      dissertation: "Advanced Data Science & AI Systems",
      modules: ["Machine Learning", "Big Data", "Deep Learning", "Information Retrieval"],
      image: "/generated/edu-univ.png",
    },
    {
      institution: "G.H. Raisoni College of Engineering",
      degree: "B.E in Computer Science",
      year: "2022",
      dissertation: "Computer Science Fundamentals",
      modules: ["Data Structures", "Algorithms", "DBMS", "Operating Systems"],
      image: "/generated/edu-univ.png",
    },
  ],
  experience: [
    {
      company: "Company A",
      slug: "company-a",
      role: "AI & Data Solution Engineer",
      period: "Sep 2024 - Dec 2025",
      description: "Engineering advanced AI and data solutions, focusing on scalable architecture and ML integration.",
      image: "/generated/exp-tech.png",
      stack: ["Python", "AWS", "LLMs", "RAG", "Data Pipelines"],
      stats: [
        { label: "Projects", value: "Multiple" },
        { label: "Impact", value: "High" },
        { label: "Team", value: "Engineering" }
      ]
    },
    {
      company: "Accenture",
      slug: "accenture",
      role: "Software Engineer",
      period: "Oct 2022 - Sept 2024",
      description: "Developed and maintained full-stack applications, optimizing performance and ensuring code quality.",
      image: "/generated/exp-corp.png",
      stack: ["Java", "Spring Boot", "React", "Cloud", "SQL"],
      stats: [
        { label: "Tenure", value: "2 Years" },
        { label: "Role", value: "Full Stack" },
        { label: "Global", value: "Client Delivery" }
      ]
    },
    {
      company: "Cognizant",
      slug: "cognizant",
      role: "Intern",
      period: "Jan 2022 - Apr 2022",
      description: "Gained hands-on experience in software development life cycle and enterprise technologies.",
      image: "/generated/exp-corp.png",
      stack: ["Java", "SQL", "Testing"],
      stats: [
        { label: "Duration", value: "4 Months" },
        { label: "Focus", value: "Training" }
      ]
    },
    {
      company: "Company A (Intern)",
      slug: "company-a-intern",
      role: "Data Engineering Intern",
      period: "Aug 2020 - Dec 2021",
      description: "Assisted in building data pipelines and processing large datasets.",
      image: "/generated/exp-tech.png",
      stack: ["Python", "SQL", "ETL"],
      stats: [
        { label: "Duration", value: "1.5 Years" },
        { label: "Focus", value: "Data Eng" }
      ]
    },
  ],
  knowledgeBase: `
    RESUME DATA FOR RAHUL KHANKE:
    - Role: Data Scientist, AI Engineer.
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
    slug: "vogue-scandinavia",
    client: "Vogue Scandinavia",
    title: "Immersive runway for Vogue Scandinavia",
    year: "2025",
    summary:
      "A bespoke WebGL runway where editors scrub across time, reveal look layers, and trigger AI commentary on every scene.",
    scenario: {
      challenge:
        "Vogue wanted a motion-native experience with a 3D runway, but the art direction had to run at 60fps on iPad Pros and degrade gracefully on mobile.",
      solution:
        "Built a streaming Three.js runway with GPU-instanced garments, AI-powered metadata overlays, and headless CMS orchestrating looks, audio, and motion cues.",
    },
    role: [
      "Creative lead for digital runway",
      "Shader + Three.js engineering",
      "RAG-powered editorial copilot",
    ],
    metrics: [
      { label: "Avg FPS on iPad Pro", value: "60fps" },
      { label: "Time to render lookbook", value: "3.5s" },
      { label: "Engagement lift", value: "+42%" },
    ],
    languages: {
      "JavaScript": 45,
      "GLSL": 30,
      "Python": 25
    },
    process: [
      {
        title: "Narrative prototyping",
        detail:
          "Pen-and-paper storyboards + Figmotion prototypes to align with Vogue creative directors.",
      },
      {
        title: "Shader + performance pass",
        detail:
          "Authored triplanar materials, LOD rules, and mesh batching for 30% lighter GPU load.",
      },
      {
        title: "AI editorial copilot",
        detail:
          "Hooked Sanity structured data and Gemini RAG to surface context and styling notes as you scrub.",
      },
    ],
    testimonial: {
      quote:
        "Alexander translated couture art direction into an interactive piece that feels like magic. The AI runway script saved our editors hours each show.",
      author: "Rebecka Winther - Digital Director, Vogue Scandinavia",
    },
    media: {
      video:
        "https://storage.googleapis.com/portfolio-assets/vogue-runway-teaser.mp4",
      poster:
        "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=1600&q=80",
    },
    tech: [
      "Next.js 15",
      "Three.js",
      "LangChain",
      "Sanity",
      "Vercel Edge",
      "Partytown",
    ],
  },
  {
    slug: "spacex-starship",
    client: "SpaceX",
    title: "Starship launch room simulator",
    year: "2024",
    summary:
      "Browser-based mission control with real telemetry, GPU smoke sims, and AI-guided mission status for VIP guests.",
    scenario: {
      challenge:
        "Build an at-home launch control that mirrors the real instrumentation without exposing secure endpoints.",
      solution:
        "Generated synthetic telemetry using Onnx runtime, piped it through Vercel Edge, and built a neural HUD so guests could interrogate the mission.",
    },
    role: [
      "Lead creative dev",
      "WebGL Fx + physics integration",
      "Mission copilot prompt engineering",
    ],
    metrics: [
      { label: "Concurrent VIP viewers", value: "120K" },
      { label: "Latency to HUD", value: "280ms" },
      { label: "AI Q&A accuracy", value: "92%" },
    ],
    languages: {
      "Python": 50,
      "C++": 30,
      "JavaScript": 20
    },
    process: [
      {
        title: "Telemetry sandbox",
        detail:
          "Converted SpaceX sample data to vector embeddings to simulate real-time mission calls without live endpoints.",
      },
      {
        title: "HUD fabrication",
        detail:
          "Built a GLSL-based glass cockpit with volumetric plumes and orbit trails, tuned for Chrome/Edge/Stage displays.",
      },
      {
        title: "VIP neural briefings",
        detail:
          "Gemini + LangChain pipeline to answer 'What just happened?' with grounded mission context + audio cues.",
      },
    ],
    testimonial: {
      quote:
        "The launch companion felt like a private SpaceX console. Guests finally understood the critical milestones as they happened.",
      author: "R. Schaefer - Experiential Lead, SpaceX",
    },
    media: {
      video:
        "https://storage.googleapis.com/portfolio-assets/spacex-hud.mp4",
      poster:
        "https://images.unsplash.com/photo-1446776653964-20c1d3a81b06?auto=format&fit=crop&w=1600&q=80",
    },
    tech: ["Next.js 15", "WebGL", "Onnx Runtime", "Vercel Edge", "LangChain"],
  },
  {
    slug: "nike-lab",
    client: "Nike Lab",
    title: "Nike Lab kinetic commerce",
    year: "2024",
    summary:
      "A motion-reactive commerce stack that merges product stories, sensor inputs, and AI stylists.",
    scenario: {
      challenge:
        "Nike Lab wanted kinetic product drops that respond to gesture and voice, without tanking conversion.",
      solution:
        "Built an RSC-powered storefront with WebGL loops, real-time pose detection, and AI styling suggestions anchored in inventory.",
    },
    role: [
      "Experience tech lead",
      "Motion system + shader author",
      "AI stylist workflow",
    ],
    metrics: [
      { label: "Conversion lift", value: "+18%" },
      { label: "Largest contentful paint", value: "1.4s" },
      { label: "Pose-to-product delay", value: "320ms" },
    ],
    languages: {
      "Python": 40,
      "TypeScript": 40,
      "GLSL": 20
    },
    process: [
      {
        title: "Gesture + pose prototyping",
        detail:
          "Hooked mediapipe + custom smoothing to map motion to camera rails and product cards.",
      },
      {
        title: "Composable drops",
        detail:
          "Sanity + Next server components powering campaign-specific scenes without redeploys.",
      },
      {
        title: "Stylist copilot",
        detail:
          "Gemini 2.5 Flash referencing Nike knowledge graph to answer 'How do I style this?' inside the checkout flow.",
      },
    ],
    testimonial: {
      quote:
        "It feels like walking into an R&D lab made for you. Every drop is fast, alive, and fully shoppable.",
      author: "Sofia Ramirez - Creative Director, Nike Lab",
    },
    media: {
      video:
        "https://storage.googleapis.com/portfolio-assets/nike-lab-motion.mp4",
      poster:
        "https://images.unsplash.com/photo-1529333166437-7750a6dd5a70?auto=format&fit=crop&w=1600&q=80",
    },
    tech: ["Next.js 15", "React Server Components", "Three.js", "Sanity", "LangChain"],
  },
];

export const fallbackRoles = {
  "data-scientist": {
    title: "Data Scientist",
    description: "Uncovering hidden patterns in complex datasets to drive strategic decision-making.",
    skills: ["Python", "Pandas", "Scikit-learn", "TensorFlow", "SQL", "Data Visualization", "Statistical Analysis"],
    projects: ["vogue-scandinavia", "nike-lab"], // Linking to existing projects for now
    stats: [
      { label: "Models Deployed", value: "50+" },
      { label: "Data Processed", value: "10PB+" },
      { label: "Accuracy Lift", value: "35%" },
    ]
  },
  "data-engineer": {
    title: "Data Engineer",
    description: "Architecting scalable data pipelines and infrastructure for real-time analytics.",
    skills: ["Apache Spark", "Kafka", "AWS Glue", "Airflow", "Docker", "Kubernetes", "Snowflake"],
    projects: ["spacex-starship"],
    stats: [
      { label: "Pipelines Built", value: "100+" },
      { label: "Uptime", value: "99.99%" },
      { label: "Latency Reduced", value: "400ms" },
    ]
  },
  "ai-ml-engineer": {
    title: "AI/ML Engineer",
    description: "Building and deploying state-of-the-art machine learning models for production environments.",
    skills: ["PyTorch", "Hugging Face", "LLMs", "RAG", "MLOps", "FastAPI", "Computer Vision"],
    projects: ["nike-lab", "spacex-starship"],
    stats: [
      { label: "LLMs Fine-tuned", value: "15+" },
      { label: "Inference Speed", value: "<50ms" },
      { label: "Users Served", value: "1M+" },
    ]
  }
};
