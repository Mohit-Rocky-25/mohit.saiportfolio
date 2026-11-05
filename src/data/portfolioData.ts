export interface Project {
  id: string
  title: string
  subtitle: string
  category: string
  brief: string
  description: string
  architectureHighlights: string[]
  techStack: string[]
  primaryLanguages: string[]
  metrics: { label: string; value: string }[]
  githubUrl: string
  liveUrl?: string
  isFlagship: boolean
  accentColor: string
}

export interface EducationItem {
  institution: string
  location: string
  degree: string
  field: string
  period: string
  status: string
  details: string[]
  tags: string[]
}

export const PORTFOLIO_DATA = {
  profile: {
    name: "Y. Mohit Sai",
    shortName: "Mohit Sai",
    title: "Computer Science Undergraduate",
    tagline: "CSE Core at VIT-AP · Algorithmic & Low-Latency Systems Enthusiast",
    welcome: "Welcome to my engineering canvas. I design high-performance, deterministic software at the convergence of low-latency systems, algorithmic problem solving, and modern client-side architectures.",
    email: "yadavmohit12243@gmail.com",
    github: "https://github.com/Mohit-Rocky-25",
    githubUsername: "Mohit-Rocky-25",
    linkedin: "https://www.linkedin.com/in/mohit-sai",
    statusBadge: "Available for High-Impact Roles & Research",
    location: "VIT-AP, Andhra Pradesh, India",
    stats: [
      { label: "Automated Tests Written", value: "1,074+" },
      { label: "Production Platforms", value: "3" },
      { label: "Client-Side Execution", value: "100%" },
      { label: "Focus", value: "Low Latency & Algo" },
    ]
  },

  education: [
    {
      institution: "VIT-AP University",
      location: "Amaravati, Andhra Pradesh",
      degree: "Bachelor of Technology (B.Tech)",
      field: "Computer Science and Engineering (CSE Core)",
      period: "2023 — Present",
      status: "Undergraduate",
      details: [
        "Specializing in CSE Core with deep dive into Design and Analysis of Algorithms, Data Structures, Operating Systems, Database Management Systems, and Computer Architecture.",
        "Engineering end-to-end deterministic web and systems applications with rigorous test-driven validation and modern TypeScript / Python / C++ ecosystems.",
        "Active member of algorithmic problem-solving communities and student developer networks."
      ],
      tags: ["CSE Core", "Data Structures", "Operating Systems", "Algorithmic Complexity", "Computer Architecture"]
    },
    {
      institution: "Narayana Junior College",
      location: "Kurnool, Andhra Pradesh",
      degree: "Higher Secondary Education (12th Grade / Intermediate)",
      field: "MPC (Mathematics, Physics, Chemistry)",
      period: "Completed",
      status: "Alumnus",
      details: [
        "Completed rigorous senior secondary coursework with intense emphasis on advanced Mathematics, Calculus, Analytical Geometry, and Physical Sciences.",
        "Cultivated foundational mathematical intuition, logic formulation, and systematic competitive exam problem solving."
      ],
      tags: ["Senior Secondary", "Higher Mathematics", "Analytical Foundations", "Kurnool"]
    }
  ] as EducationItem[],

  passions: {
    competitiveCoding: {
      title: "Competitive Programming",
      tag: "Algorithmic Precision",
      highlight: "Optimal Time & Space Complexity",
      summary: "I approach competitive coding not as rote syntax, but as the high-stakes craft of deterministic problem solving. Competing against tight wall-clock limits enforces mathematical rigor, optimal asymptotic complexity ($O(1)$ to $O(N \\log N)$), spatial cache consciousness, and bulletproof invariant checks under boundary test-cases.",
      topics: ["Graph Theory", "Dynamic Programming", "Segment Trees & Fenwick", "Disjoint Set Union", "Bit Manipulation", "Amortized Analysis"]
    },
    highFrequencyTrading: {
      title: "High-Frequency Trading & Systems",
      tag: "Sub-Microsecond Latency",
      highlight: "Market Microstructure & Determinism",
      summary: "Fascinated by the intersection of financial market microstructure, high-throughput execution engines, and extreme low-latency engineering where microseconds distinguish edge from noise. Drawn to lock-free concurrency, kernel bypass concepts, cache-friendly memory layouts, Level 2/3 order book reconstruction, and the pursuit of minimal tail jitter.",
      topics: ["Order Book Mechanics", "Lock-Free Ring Buffers", "Sub-Microsecond Latency", "Zero-Allocation Memory", "L2/L3 Tick Feeds", "Deterministic Matching"]
    }
  },

  projects: [
    {
      id: "repopilot",
      title: "RepoPilot",
      subtitle: "Open-Source Repository Intelligence & AST Debugging Platform",
      category: "Developer Tooling & Code Intelligence",
      isFlagship: true,
      accentColor: "#3b82f6",
      brief: "Deterministic codebase intelligence platform featuring in-memory AST symbol extraction, ranked code search, 3D architectural dependency mapping, and grounded commit citation verification with zero hallucinated files.",
      description: "RepoPilot solves the cognitive friction of navigating massive, unfamiliar codebases. Built with an evidence-first architecture: navigation, AST symbol extraction, and ranked code search run entirely on local compute without requiring mandatory cloud AI APIs. Every citation is pinned to an immutable commit SHA, exact file path, and line coordinate. Features optional private open-weights coding models via Ollama and memory-diff sandboxing.",
      architectureHighlights: [
        "In-Memory AST Symbol Parsing: Deterministic symbol graph extraction across multiple languages.",
        "Zero-Hosted API Model: Fully operational offline on local compute with verified line citations.",
        "3D Architecture Dependency Visualizer: Interactive visual graph of repository scaffolding.",
        "Defensive Sandboxing: In-memory diff generation with reproducible regression test targets."
      ],
      techStack: [
        "TypeScript Strict",
        "Next.js 14",
        "Python",
        "Go",
        "AST Parsers",
        "Vitest",
        "Docker",
        "Tailwind CSS",
        "Ollama Local LLM"
      ],
      primaryLanguages: ["TypeScript", "Python", "Go"],
      metrics: [
        { label: "Vitest Tests", value: "308 Passed" },
        { label: "Core Execution", value: "Deterministic" },
        { label: "Citation Model", value: "Commit-SHA Tied" }
      ],
      githubUrl: "https://github.com/Mohit-Rocky-25/RepoPilot",
      liveUrl: "https://repo-pilot-eta.vercel.app"
    },
    {
      id: "hireflow",
      title: "HireFlow v3",
      subtitle: "Privacy-First Client-Side Career & Resume Intelligence Platform",
      category: "Systems & In-Browser Intelligence",
      isFlagship: true,
      accentColor: "#10b981",
      brief: "High-performance client-side career toolkit with pure in-browser PDF/DOCX binary stream parsing, deterministic ATS scoring, side-by-side JD divergence analysis, and a greedy set-cover project recommendation engine.",
      description: "A privacy-first career toolkit engineered with 100% client-side execution. Resumes, credentials, and personal data never leave the user's browser. Features an ATS Resume Roaster with verbatim span citations ($L0$ listed through $L3$ measured outcome), multi-job description divergence comparator, truth-gate invariant resume fact ledger, and a greedy set-cover bundle generator to bridge technical skill gaps.",
      architectureHighlights: [
        "100% Pure Client-Side Execution: All text parsing and scoring runs in browser memory (pdfjs-dist & pdf-lib).",
        "Zero Remote Data Exfiltration: Guarantees candidate data privacy with zero server telemetry.",
        "Truth Gate Invariants: Non-destructive ledger that mathematically prevents hallucinating unearned skills.",
        "Greedy Set-Cover Optimizer: Generates minimal project briefs to cover maximum target job description gaps."
      ],
      techStack: [
        "React 19",
        "TypeScript Strict",
        "Vite",
        "Tailwind CSS",
        "Zustand",
        "Zod",
        "pdfjs-dist",
        "pdf-lib",
        "mammoth",
        "Vitest"
      ],
      primaryLanguages: ["TypeScript", "Python", "JavaScript"],
      metrics: [
        { label: "Automated Tests", value: "766 Passed (110 files)" },
        { label: "Client Privacy", value: "100% In-Browser" },
        { label: "Framework", value: "React 19 + Vite" }
      ],
      githubUrl: "https://github.com/Mohit-Rocky-25/hireflow"
    },
    {
      id: "unilang",
      title: "UniLang",
      subtitle: "Contextual Language Learning & Multilingual Cultural Bridge",
      category: "AI & Multilingual Systems",
      isFlagship: false,
      accentColor: "#8b5cf6",
      brief: "Interactive language platform blending structured lessons, acoustic pronunciation guides, contextual translation adapters, spaced-repetition vocabulary recall, and deep cultural explorer modules.",
      description: "UniLang moves beyond mechanical flashcard memorization by immersing learners in conversational situations and cultural context. Built with responsive web architecture, Web Audio API synthesis for pronunciation clarity, spaced-repetition algorithms for persistent recall, and contextual translation alternatives that preserve idiom nuance.",
      architectureHighlights: [
        "Contextual Phrase Engine: Translates and contextualizes dialect idioms beyond literal dictionary matches.",
        "Web Audio Synthesis: Real-time acoustic pronunciation playback and listening comprehension feedback.",
        "Spaced-Repetition System: Optimizes long-term vocabulary retention based on spaced recall intervals.",
        "Cultural Explorer Module: Curated cultural nuances, etiquette notes, and contextual usage tips."
      ],
      techStack: [
        "React",
        "Next.js",
        "JavaScript / TypeScript",
        "Tailwind CSS",
        "Web Audio API",
        "RESTful APIs"
      ],
      primaryLanguages: ["JavaScript", "TypeScript", "HTML5/CSS3"],
      metrics: [
        { label: "Architecture", value: "Full-Stack Web" },
        { label: "Audio Feedback", value: "Web Audio API" },
        { label: "Retention Model", value: "Spaced Repetition" }
      ],
      githubUrl: "https://github.com/Mohit-Rocky-25/UNILANG",
      liveUrl: "https://unilang-three.vercel.app"
    }
  ] as Project[],

  skills: {
    categories: [
      {
        name: "Languages",
        description: "Core programming languages utilized in systems, algorithms, and applications",
        skills: [
          { name: "TypeScript", level: "Advanced", note: "Strict Mode, Generics, AST tooling" },
          { name: "Python", level: "Proficient", note: "Systems automation, AST scripts, data logic" },
          { name: "C++", level: "Competitive", note: "STL, Cache Locality, Algorithmic Problem Solving" },
          { name: "Go", level: "Intermediate", note: "Concurrency, Goroutines, Low-overhead services" },
          { name: "Java", level: "Core", note: "OOP, Concurrency fundamentals, Collections" },
          { name: "JavaScript (ESNext)", level: "Advanced", note: "Async/Await, Web APIs, Event Loop" },
          { name: "SQL", level: "Intermediate", note: "Relational modeling, indexing, query optimization" },
          { name: "HTML5 / CSS3", level: "Proficient", note: "Semantic layout, modern CSS, animations" }
        ]
      },
      {
        name: "Frontend & Client-Side Systems",
        description: "Modern frameworks and high-performance browser-native technologies",
        skills: [
          { name: "React 19", level: "Advanced", note: "Hooks, Concurrent features, State patterns" },
          { name: "Next.js 14", level: "Advanced", note: "App Router, SSR, Edge rendering" },
          { name: "Vite", level: "Advanced", note: "Lightning builds, HMR, Rollup bundling" },
          { name: "Tailwind CSS", level: "Advanced", note: "Custom tokens, responsive design, dark mode" },
          { name: "Zustand", level: "Advanced", note: "Lightweight reactive client-side state" },
          { name: "Framer Motion", level: "Proficient", note: "Layout animations, gesture physics" },
          { name: "Web Audio API", level: "Intermediate", note: "In-browser sound synthesis & acoustic feedback" }
        ]
      },
      {
        name: "Systems, Architecture & Theory",
        description: "Low-latency principles, algorithmic theory, and deterministic execution",
        skills: [
          { name: "Data Structures & Algorithms", level: "Core Focus", note: "Asymptotic optimality, Graph & Tree traversal" },
          { name: "AST Symbol Extraction", level: "Practitioner", note: "In-memory syntax tree indexing & code analysis" },
          { name: "Deterministic Sandboxing", level: "Practitioner", note: "Zero-API local compute, memory diff validation" },
          { name: "Market Microstructure Basics", level: "Research Interest", note: "Order books, L2/L3 feeds, matching engines" },
          { name: "Client-Side In-Memory Engines", level: "Practitioner", note: "pdfjs-dist, pdf-lib, zero-telemetry workflows" },
          { name: "Truth Gate Invariants", level: "Practitioner", note: "Non-destructive ledger schemas & Zod validation" }
        ]
      },
      {
        name: "Tooling, Testing & Infrastructure",
        description: "Rigorous test automation, containerization, and developer environments",
        skills: [
          { name: "Vitest", level: "Advanced", note: "1,074+ tests written across projects, zero flakiness" },
          { name: "Docker", level: "Intermediate", note: "Containerized environments & reproducible builds" },
          { name: "Git & GitHub CLI", level: "Advanced", note: "Branch workflows, commit SHAs, gh CLI automation" },
          { name: "Zod Schema Validation", level: "Advanced", note: "Type-safe runtime schema parsing & invariants" },
          { name: "GitHub Actions / CI", level: "Intermediate", note: "Automated linting, test pipelines, build verification" },
          { name: "Vercel & Static Hosting", level: "Proficient", note: "Continuous deployment and edge routing" }
        ]
      }
    ]
  }
}
