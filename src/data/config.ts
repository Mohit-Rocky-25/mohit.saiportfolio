/**
 * Portfolio Configuration & Content Registry
 * Editorial Design System — Y. Mohit Sai
 * 
 * PLACEHOLDERS: Fill in [MY_EMAIL] and [MY_LINKEDIN_URL] when ready.
 */

export interface ProjectData {
  id: string
  number: string
  title: string
  subtitle: string
  descriptor: string
  year: string
  isPrimary: boolean
  brief: string[]
  builtWith: string[]
  keyDecisions: string[]
  githubUrl: string
  liveUrl?: string
  accentDetail: string
  compositionStyle: 'left-anchored' | 'split-monumental' | 'editorial-dense'
}

export const PORTFOLIO_CONFIG = {
  // Contact & Social Placeholders (Easily editable here)
  contact: {
    email: '[MY_EMAIL]', // TODO: Replace with your actual email
    linkedin: '[MY_LINKEDIN_URL]', // TODO: Replace with your LinkedIn profile URL
    github: 'https://github.com/Mohit-Rocky-25',
    githubUsername: 'Mohit-Rocky-25',
  },

  profile: {
    nameFirst: 'Y. Mohit',
    nameLast: 'Sai',
    fullName: 'Y. Mohit Sai',
    monogram: 'YMS',
    heroWelcome: 'Welcome to my portfolio',
    roleTagline: 'Computer Science student at VIT-AP, CSE Core.',
    currentYear: '2026',
    metaDescription: 'Portfolio of Y. Mohit Sai. Computer Science undergraduate at VIT-AP University. Systems, algorithms, and low-latency architecture.',
  },

  education: [
    {
      period: '2023 — Present',
      institution: 'VIT-AP University',
      degree: 'B.Tech in Computer Science and Engineering',
      discipline: 'CSE Core',
      note: 'Foundations in design and analysis of algorithms, operating systems, compiler theory, and computer architecture.',
    },
    {
      period: 'Completed',
      institution: 'Narayana Junior College, Kurnool',
      degree: '12th Grade / Intermediate',
      discipline: 'MPC (Mathematics, Physics, Chemistry)',
      note: 'Senior secondary curriculum with intensive focus on analytical mathematics, calculus, and mechanics.',
    },
  ],

  passions: {
    competitiveProgramming: {
      headline: 'The discipline of deterministic problem solving under strict wall-clock bounds.',
      prose: 'I practice competitive programming for the rigor of asymptotic optimization: proving bounds between O(1) and O(N log N), exploiting spatial cache locality, and structuring invariants that never fail against adversarial edge cases.',
      keywords: ['Algorithmic Rigor', 'Asymptotic Complexity', 'Invariants', 'Cache Locality'],
    },
    highFrequencyTrading: {
      headline: 'The pursuit of sub-microsecond determinism in financial market microstructure.',
      prose: 'Fascinated by high-frequency trading infrastructure: reconstructing Level 2/3 order books, architecting lock-free ring buffers, eliminating memory allocations on the critical path, and minimizing tail jitter under extreme market throughput.',
      keywords: ['Order Book Dynamics', 'Sub-Microsecond Latency', 'Lock-Free Queues', 'Zero-Allocation'],
    },
  },

  projects: [
    {
      id: 'repopilot',
      number: '01',
      title: 'RepoPilot',
      subtitle: 'Codebase Intelligence & Grounded AST Debugging Platform',
      descriptor: 'Open-source AST code navigation, 3D architecture maps, and commit-SHA verified citations.',
      year: '2024',
      isPrimary: true,
      compositionStyle: 'split-monumental',
      accentDetail: '308 Vitest suites · Zero cloud API lock-in',
      brief: [
        'RepoPilot is an independent, open-source codebase intelligence platform engineered to eliminate cognitive friction when onboarding to complex repositories.',
        'File navigation, AST symbol extraction, and ranked code search execute entirely on local compute without mandatory cloud API dependencies.',
        'Every code citation and jump coordinate is pinned deterministically to an immutable commit SHA, file path, and line coordinate to eliminate LLM hallucinations.',
        'Supports private local coding models through Ollama alongside in-memory diff validation tested against reproducible regression suites.'
      ],
      builtWith: [
        'TypeScript Strict',
        'Next.js 14',
        'Python',
        'Go',
        'AST Parsers',
        'Vitest (308 Tests)',
        'Docker',
        'Tailwind CSS',
        'Ollama Local LLM'
      ],
      keyDecisions: [
        'Deterministic local symbol extraction and ranked search run on local compute without mandatory cloud API keys.',
        'Every citation and symbol jump is mathematically anchored to an immutable commit SHA, path, and line number.',
        'Untrusted code is defended via in-memory unified diffs validated against 308 automated regression tests.'
      ],
      githubUrl: 'https://github.com/Mohit-Rocky-25/RepoPilot',
      liveUrl: 'https://repo-pilot-eta.vercel.app',
    },
    {
      id: 'hireflow',
      number: '02',
      title: 'HireFlow',
      subtitle: 'Privacy-First Client-Side Career & Resume Intelligence Platform',
      descriptor: '100% in-browser PDF/DOCX binary stream parsing, deterministic ATS roaster, and JD gap optimizer.',
      year: '2024',
      isPrimary: true,
      compositionStyle: 'left-anchored',
      accentDetail: '766 Vitest tests in 110 files · Zero data exfiltration',
      brief: [
        'HireFlow is a client-side career intelligence platform engineered for early-career software developers with complete data privacy.',
        'Text extraction and analysis occur 100% in browser memory via pdfjs-dist and pure-vector pdf-lib synthesizers, ensuring resume data never touches a remote server.',
        'Features an ATS Resume Roaster with verbatim span citations, side-by-side job description divergence analysis, and a Truth Gate invariant fact ledger.',
        'Implements a greedy set-cover algorithm to generate minimal engineering build briefs that bridge verified candidate skill gaps.'
      ],
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
        'Vitest (766 Tests)'
      ],
      keyDecisions: [
        'Zero backend telemetry or cloud database: all binary parsing and evaluation execute strictly in browser memory.',
        'Truth Gate invariants mathematically prevent the editor from fabricating unearned credentials or inflating verbs.',
        'A greedy set-cover optimizer computes minimum-cardinality project brief bundles to resolve multi-JD requirements.'
      ],
      githubUrl: 'https://github.com/Mohit-Rocky-25/hireflow',
      liveUrl: undefined, // Client-side open-source repo
    },
    {
      id: 'unilang',
      number: '03',
      title: 'UniLang',
      subtitle: 'Contextual Language Learning & Multilingual Cultural Bridge',
      descriptor: 'Conversational scenarios, acoustic pronunciation feedback via Web Audio API, and spaced repetition.',
      year: '2024',
      isPrimary: false,
      compositionStyle: 'editorial-dense',
      accentDetail: 'Web Audio API · Spaced-repetition recall model',
      brief: [
        'UniLang approaches language acquisition by coupling structured linguistic lessons directly with cultural context and acoustic feedback.',
        'Replaces rote flashcard drills with realistic conversational scenarios, contextual dialect translation, and audio pronunciation synthesis.',
        'Incorporates a spaced-repetition retention scheduler that dynamically optimizes recall intervals based on measured learner response patterns.'
      ],
      builtWith: [
        'React',
        'Next.js',
        'JavaScript',
        'TypeScript',
        'Tailwind CSS',
        'Web Audio API',
        'REST Adapters'
      ],
      keyDecisions: [
        'Prioritizes cultural and dialect nuance over literal dictionary lookups through contextual phrase engines.',
        'Uses browser-native Web Audio API for real-time acoustic feedback and pronunciation cadence analysis.',
        'Implements an adaptive spaced-repetition algorithm to maximize long-term vocabulary retention.'
      ],
      githubUrl: 'https://github.com/Mohit-Rocky-25/UNILANG',
      liveUrl: 'https://unilang-three.vercel.app',
    },
  ] as ProjectData[],

  skills: {
    marqueeLine1: [
      'TypeScript',
      'Python',
      'C++',
      'Go',
      'Java',
      'Next.js',
      'React 19',
      'Vite',
      'Tailwind CSS',
      'AST Parsers',
    ],
    marqueeLine2: [
      'Vitest (1,000+ Tests)',
      'Docker',
      'Zustand',
      'Zod',
      'Web Audio API',
      'In-Memory PDF Parsing',
      'Low-Latency Concepts',
      'Git CLI',
      'Linux',
    ],
    index: [
      {
        category: 'Languages',
        terms: ['TypeScript (Strict)', 'Python', 'C++', 'Go', 'Java', 'JavaScript (ESNext)', 'SQL', 'HTML5 / CSS3'],
      },
      {
        category: 'Frontend & UI',
        terms: ['React 19', 'Next.js 14', 'Vite', 'Tailwind CSS', 'Zustand', 'Web Audio API', 'Framer Motion'],
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
