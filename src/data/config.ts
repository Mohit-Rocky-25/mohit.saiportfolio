/**
 * Personal Portfolio Configuration & Content Registry
 * Y. Mohit Sai — Workshop Aesthetic
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
      note: 'Focus on algorithms, low-level concurrency, compiler design, and operating systems.',
    },
    {
      period: 'Completed',
      institution: 'Narayana Junior College, Kurnool',
      degree: '12th Grade / Intermediate',
      discipline: 'MPC (Mathematics, Physics, Chemistry)',
      note: 'Strong mathematical foundation, calculus, and analytical problem-solving aptitude.',
    },
  ],

  passions: {
    competitiveProgramming: {
      title: 'Competitive Programming',
      statement: 'I approach algorithms as the high-stakes discipline of deterministic optimality.',
      prose: 'Writing code under clock pressure demands mathematical rigor: proving tight asymptotic bounds between O(1) and O(N log N), exploiting spatial cache locality, and designing invariants that never yield under adversarial edge cases.',
    },
    highFrequencyTrading: {
      title: 'High-Frequency Trading',
      statement: 'Fascinated by market microstructure and microsecond deterministic execution.',
      prose: 'Drawn to sub-microsecond low-latency engineering: reconstructing Level 2/3 order books, architecting lock-free ring buffers, removing dynamic allocations from the hot path, and minimizing tail latency jitter.',
    },
  },

  projects: [
    {
      id: 'repopilot',
      number: '01',
      title: 'RepoPilot',
      tagline: 'Codebase intelligence, AST symbol extraction, and grounded citations.',
      brief: 'An independent codebase intelligence platform that maps unfamiliar repositories with in-memory AST symbol trees, ranked code search on local compute, and commit-SHA tied citations that eliminate LLM hallucinations.',
      sceneBackground: '#0B1220', // ink-navy
      accentColor: '#38BDF8',
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
      sceneBackground: '#1B2A1F', // moss
      accentColor: '#4ADE80',
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
      sceneBackground: '#3A1F18', // warm clay
      accentColor: '#FB923C',
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
    clusters: [
      {
        category: 'Languages',
        skills: [
          { name: 'TypeScript', projects: ['repopilot', 'hireflow', 'unilang'] },
          { name: 'Python', projects: ['repopilot'] },
          { name: 'C++', projects: [] },
          { name: 'Go', projects: ['repopilot'] },
          { name: 'Java', projects: [] },
          { name: 'JavaScript', projects: ['hireflow', 'unilang'] },
          { name: 'SQL', projects: [] },
        ],
      },
      {
        category: 'Frontend & UI',
        skills: [
          { name: 'React 19', projects: ['hireflow', 'unilang'] },
          { name: 'Next.js 14', projects: ['repopilot', 'unilang'] },
          { name: 'Vite', projects: ['hireflow'] },
          { name: 'Tailwind CSS', projects: ['repopilot', 'hireflow', 'unilang'] },
          { name: 'Zustand', projects: ['hireflow'] },
          { name: 'Web Audio API', projects: ['unilang'] },
        ],
      },
      {
        category: 'Systems & Architecture',
        skills: [
          { name: 'AST Symbol Parsers', projects: ['repopilot'] },
          { name: 'In-Memory Stream Parsing', projects: ['hireflow'] },
          { name: 'Deterministic Sandboxing', projects: ['repopilot'] },
          { name: 'Order Book Microstructure', projects: [] },
          { name: 'Data Structures & Algorithms', projects: [] },
        ],
      },
      {
        category: 'Tooling & Testing',
        skills: [
          { name: 'Vitest (1,074+ Tests)', projects: ['repopilot', 'hireflow'] },
          { name: 'Docker', projects: ['repopilot'] },
          { name: 'Git & GitHub CLI', projects: ['repopilot', 'hireflow', 'unilang'] },
          { name: 'Zod Runtime Validation', projects: ['hireflow'] },
          { name: 'Linux', projects: ['repopilot'] },
        ],
      },
    ],
  },
}
