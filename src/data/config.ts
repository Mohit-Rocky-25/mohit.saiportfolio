/**
 * Personal Portfolio Configuration & Content Registry
 * Y. Mohit Sai — Light Linen & Terracotta Palette
 */

export interface ProjectScene {
  id: string
  number: string
  title: string
  tagline: string
  brief: string
  sceneBackground: string
  accentColor: string
  isPrimary: boolean
  builtWith: string[]
  keyDecisions: string[]
  githubUrl: string
  liveUrl?: string
}

export const PORTFOLIO_CONFIG = {
  // Placeholders to be filled by user
  contact: {
    email: '[MY_EMAIL]', // TODO: Fill in your email
    linkedin: '[MY_LINKEDIN_URL]', // TODO: Fill in your LinkedIn URL
    github: 'https://github.com/Mohit-Rocky-25',
    githubUsername: 'Mohit-Rocky-25',
  },

  profile: {
    name: 'Y. Mohit Sai',
    first: 'Y. Mohit',
    last: 'Sai',
    heroLabel: 'Welcome to my portfolio',
    roleTagline: 'CSE Core student at VIT-AP',
    brief: "I'm an undergraduate computer science student who loves algorithmic problem solving, low-latency systems, and building software that is provably reliable.",
    currentYear: '2026',
  },

  education: [
    {
      period: '2023 — Present',
      institution: 'VIT-AP University',
      degree: 'B.Tech in Computer Science and Engineering',
      discipline: 'CSE Core',
      note: 'Foundations in design and analysis of algorithms, low-level concurrency, compiler theory, and operating systems.',
    },
    {
      period: 'Completed',
      institution: 'Narayana Junior College, Kurnool',
      degree: '12th Grade / Intermediate',
      discipline: 'MPC (Mathematics, Physics, Chemistry)',
      note: 'Senior secondary coursework in higher mathematics, analytical geometry, calculus, and physics.',
    },
  ],

  passions: {
    competitiveProgramming: {
      title: 'Competitive Programming',
      statement: 'The discipline of deterministic problem solving under strict wall-clock bounds.',
      prose: 'Writing code under clock pressure demands mathematical rigor: proving tight asymptotic bounds between O(1) and O(N log N), exploiting spatial cache locality, and structuring invariants that never fail against adversarial edge cases.',
    },
    highFrequencyTrading: {
      title: 'High-Frequency Trading',
      statement: 'Fascinated by market microstructure and microsecond deterministic execution.',
      prose: 'Drawn to sub-microsecond low-latency engineering: reconstructing Level 2/3 order books, architecting lock-free ring buffers, removing dynamic memory allocations from the hot path, and minimizing tail latency jitter.',
    },
  },

  projects: [
    {
      id: 'repopilot',
      number: '01',
      title: 'RepoPilot',
      tagline: 'Local-First Codebase Intelligence & AST Symbol Mapping',
      brief: 'Engineers lose 70% of onboarding time understanding unfamiliar codebases. RepoPilot generates deterministic in-memory AST symbol trees and ranked semantic code search running 100% locally on device—slashing architecture discovery from days to seconds with zero cloud token costs and zero hallucinated citations.',
      sceneBackground: '#120726', // Full Dark Violet
      accentColor: '#C084FC', // Electric Lilac
      isPrimary: true,
      builtWith: [
        'Next.js 14',
        'TypeScript Strict',
        'Python',
        'Go',
        'AST Parsers',
        'Vitest (308 Tests)',
        'Docker',
        'Tailwind CSS',
        'Ollama Local LLM',
      ],
      keyDecisions: [
        'Sub-second AST indexing: parses 50,000+ LOC in <1.2s locally with zero cloud API keys or data leakage.',
        'Immutable Git citation locks: every architectural claim links mathematically to a verified Git commit SHA, file path, and line number.',
        'Production test rig: 308 automated regression tests run in-memory against defensive sandbox AST diffs.',
      ],
      githubUrl: 'https://github.com/Mohit-Rocky-25/RepoPilot',
      liveUrl: 'https://repo-pilot-eta.vercel.app',
    },
    {
      id: 'hireflow',
      number: '02',
      title: 'HireFlow',
      tagline: '100% Client-Side ATS Resume Parser & Algorithmic Job Optimizer',
      brief: 'Over 75% of qualified engineering resumes get auto-rejected by broken enterprise ATS scanners. HireFlow parses complex PDF/DOCX binary streams entirely in client browser memory with $0 server cost, providing real-time ATS match scoring, keyword gap diagnostics, and greedy set-cover project recommendations.',
      sceneBackground: '#1F0A03', // Full Dark Orange / Ember
      accentColor: '#FF6B35', // Fiery Orange
      isPrimary: true,
      builtWith: [
        'React 19',
        'TypeScript Strict',
        'Vite',
        'Tailwind CSS',
        'Zustand',
        'Zod Schemas',
        'pdfjs-dist',
        'pdf-lib',
        'mammoth',
        'Vitest (766 Tests)',
      ],
      keyDecisions: [
        'Zero backend footprint: 100% client-side WebAssembly text extraction via pdfjs-dist & mammoth, eliminating server operating costs.',
        'Truth Gate invariants: mathematical checks prevent the resume builder from hallucinating unearned candidate qualifications.',
        'Algorithmic job match: greedy set-cover algorithm computes minimal project builds needed to satisfy multiple job descriptions.',
      ],
      githubUrl: 'https://github.com/Mohit-Rocky-25/hireflow',
      liveUrl: undefined,
    },
    {
      id: 'unilang',
      number: '03',
      title: 'UniLang',
      tagline: 'Real-Time Acoustic Audio Synthesis & Adaptive Spaced Repetition',
      brief: 'Traditional language apps rely on passive flashcards that fail real-world conversational speed. UniLang couples interactive spoken immersion scenarios with real-time browser frequency synthesis via the Web Audio API and an adaptive spaced-repetition engine calibrated to microsecond vocal recall latency.',
      sceneBackground: '#1A1302', // Full Dark Yellow / Gold
      accentColor: '#FACC15', // Radiant Cyber Gold
      isPrimary: false,
      builtWith: [
        'React',
        'Next.js',
        'JavaScript',
        'TypeScript',
        'Tailwind CSS',
        'Web Audio API',
        'REST Adapters',
      ],
      keyDecisions: [
        'In-browser audio synthesis: zero-dependency acoustic tone generation built directly on the native Web Audio API.',
        'Latency-adaptive review curve: modified SuperMemo-2 algorithm dynamically calculates review intervals from user response times.',
        'Contextual nuance engine: dynamic scenario adapters prioritize natural colloquial speech patterns over literal dictionary translations.',
      ],
      githubUrl: 'https://github.com/Mohit-Rocky-25/UNILANG',
      liveUrl: 'https://unilang-three.vercel.app',
    },
  ] as ProjectScene[],

  skills: {
    marqueeLine1: [
      { text: 'TypeScript', italic: false, project: 'repopilot' },
      { text: 'Python', italic: true, project: 'repopilot' },
      { text: 'C++', italic: false, project: 'all' },
      { text: 'Go', italic: true, project: 'repopilot' },
      { text: 'Java', italic: false, project: 'all' },
      { text: 'Next.js 14', italic: true, project: 'repopilot' },
      { text: 'React 19', italic: false, project: 'hireflow' },
      { text: 'Vite', italic: true, project: 'hireflow' },
      { text: 'Tailwind CSS', italic: false, project: 'repopilot' },
      { text: 'AST Parsers', italic: true, project: 'repopilot' },
    ],
    marqueeLine2: [
      { text: 'Vitest (1,074+ Tests)', italic: false, project: 'hireflow' },
      { text: 'Docker', italic: true, project: 'repopilot' },
      { text: 'Zustand', italic: false, project: 'hireflow' },
      { text: 'Zod Schemas', italic: true, project: 'hireflow' },
      { text: 'Framer Motion', italic: false, project: 'hireflow' },
      { text: 'Web Audio API', italic: true, project: 'unilang' },
      { text: 'In-Memory PDF Parsing', italic: false, project: 'hireflow' },
      { text: 'Git CLI', italic: true, project: 'repopilot' },
      { text: 'Linux', italic: false, project: 'repopilot' },
      { text: 'Vercel', italic: true, project: 'repopilot' },
    ],
    index: [
      {
        category: 'Languages',
        terms: ['TypeScript (Strict)', 'Python', 'C++', 'Go', 'Java', 'JavaScript (ESNext)', 'SQL', 'HTML5 / CSS3'],
      },
      {
        category: 'Frontend & UI',
        terms: ['React 19', 'Next.js 14', 'Vite', 'Tailwind CSS', 'Zustand', 'Framer Motion', 'Web Audio API'],
      },
      {
        category: 'Systems & Architecture',
        terms: ['Data Structures & Algorithms', 'AST Symbol Extraction', 'In-Memory Stream Parsing', 'Deterministic Sandboxing', 'Order Book Mechanics', 'Truth Gate Invariants'],
      },
      {
        category: 'Tooling & Testing',
        terms: ['Vitest (Automated Test Suites)', 'Docker', 'Git & GitHub CLI', 'Zod Runtime Schemas', 'Linux Shell', 'Vercel Deployment'],
      },
    ],
  },
}
