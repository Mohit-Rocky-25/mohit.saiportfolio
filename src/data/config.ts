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
      tagline: 'Codebase intelligence, AST symbol extraction, and grounded citations.',
      brief: 'An independent codebase intelligence platform that maps unfamiliar repositories with in-memory AST symbol trees, ranked code search on local compute, and citations tied to immutable commit SHAs.',
      sceneBackground: '#D3DBDF', // misty blue-grey
      accentColor: '#B4441F',
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
        'Deterministic AST symbol indexing runs locally without requiring cloud API keys.',
        'Every code citation is tied to an immutable commit SHA, file path, and line number.',
        'Defensive sandboxing checks proposed diffs in memory against 308 automated regression tests.',
      ],
      githubUrl: 'https://github.com/Mohit-Rocky-25/RepoPilot',
      liveUrl: 'https://repo-pilot-eta.vercel.app',
    },
    {
      id: 'hireflow',
      number: '02',
      title: 'HireFlow',
      tagline: 'Client-side career intelligence with pure in-browser PDF/DOCX stream parsing.',
      brief: 'A privacy-first career toolkit for early-career developers. Text extraction and resume evaluations run 100% in browser memory via pdfjs-dist and pdf-lib, featuring an ATS Resume Roaster and greedy set-cover project brief recommendations.',
      sceneBackground: '#D5DBC4', // soft sage
      accentColor: '#5E6B3A',
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
        'Zero remote telemetry: candidate resumes never leave client browser memory.',
        'Truth Gate invariants mathematically prevent the editor from inventing unearned skills.',
        'Greedy set-cover algorithm solves multi-JD requirements by computing minimal project build briefs.',
      ],
      githubUrl: 'https://github.com/Mohit-Rocky-25/hireflow',
      liveUrl: undefined,
    },
    {
      id: 'unilang',
      number: '03',
      title: 'UniLang',
      tagline: 'Contextual language learning with Web Audio acoustics and spaced repetition.',
      brief: 'An immersive language learning platform coupling structured conversational scenarios with real-time acoustic pronunciation feedback via the Web Audio API and dynamic spaced-repetition intervals.',
      sceneBackground: '#E6CDBF', // rose clay
      accentColor: '#B4441F',
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
        'Preserves dialect nuances with contextual phrase engines instead of literal dictionary translations.',
        'Integrated Web Audio API synthesis for real-time acoustic pronunciation and listening comprehension.',
        'Adaptive spaced-repetition algorithm schedules review intervals based on measured recall latency.',
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
