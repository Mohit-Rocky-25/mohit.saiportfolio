/**
 * Personal Portfolio Configuration & Content Registry
 * Y. Mohit Sai — Light Linen & Terracotta Palette
 */

export interface PassionPillar {
  title: string
  tag: string
  badge: string
  statement: string
  prose: string
  highlights: string[]
  metric: string
}

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

export interface SkillItem {
  name: string
  context: string
}

export interface SkillCategory {
  category: string
  description: string
  items: SkillItem[]
}

export const PORTFOLIO_CONFIG = {
  // Placeholders to be filled by user
  contact: {
    email: 'yadavmohit12243@gmail.com',
    linkedin: 'https://www.linkedin.com/in/mohit-sai-57255b373/',
    github: 'https://github.com/Mohit-Rocky-25',
    githubUsername: 'Mohit-Rocky-25',
  },

  profile: {
    name: 'Y. Mohit Sai',
    first: 'Y. Mohit',
    last: 'Sai',
    heroLabel: 'Welcome to my portfolio',
    roleTagline: 'CSE Core student at VIT-AP',
    brief: "Undergraduate computer science student passionate about building clean, high-performance software. Focused on first-principles problem solving, modern full-stack systems, and crafting responsive user experiences.",
    currentYear: '2026',
  },

  education: [
    {
      period: '2025 — Present',
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
    problemSolving: {
      title: 'Problem Solving & Mindset',
      tag: '01 / Problem solving & adaptability',
      badge: 'First principles',
      statement: 'First-principles thinking with a relentless bias for action.',
      prose:
        'I approach engineering by breaking down root problems before writing code. Rather than relying on fragile workarounds or over-engineering solutions, I prioritize clean logic, solid computer science foundations, and rapid execution. Whether tackling complex algorithmic challenges, designing state architectures, or diving into an unfamiliar tech stack, I learn fast and build systems that work reliably under edge cases.',
      highlights: [
        'Root-cause clarity',
        'Rapid stack adoption',
        'Edge-case resilience',
      ],
      metric: 'Problem breakdown → High execution velocity',
    },
    productCraft: {
      title: 'Product Craft & Ownership',
      tag: '02 / Product craft & ownership',
      badge: 'High ownership',
      statement: 'Product craftsmanship with complete end-to-end ownership.',
      prose:
        'Great engineering doesn’t end with code that compiles—it’s about delivering tools that feel instantaneous, intuitive, and genuinely useful to real people. I take full ownership from initial concept to deployment: obsessing over snappy responsiveness, thoughtful interaction design, and clean, maintainable architecture. I build with a high standard of craft, zero unnecessary bloat, and a genuine care for the end-user experience.',
      highlights: [
        'End-to-end delivery',
        'Sub-second responsiveness',
        'Clean, maintainable code',
      ],
      metric: 'Frictionless UX · Zero-bloat performance',
    },
    // Backwards-compatible aliases
    get competitiveProgramming(): PassionPillar {
      return this.problemSolving
    },
    get highFrequencyTrading(): PassionPillar {
      return this.productCraft
    },
  },

  projects: [
    {
      id: 'repopilot',
      number: '01',
      title: 'RepoPilot',
      tagline: 'Local-First Codebase Intelligence & AST Symbol Mapping',
      brief: 'Engineers lose significant onboarding time understanding unfamiliar codebases. RepoPilot generates deterministic in-memory AST symbol trees and ranked code search running 100% locally on device—slashing architecture discovery from days to seconds with zero cloud token costs and zero hallucinated citations.',
      sceneBackground: '#9E77F7', // Bold Violet
      accentColor: '#0A0A0A',
      isPrimary: true,
      builtWith: [
        'Next.js',
        'TypeScript',
        'Python',
        'Go',
        'Tailwind CSS',
        'Docker',
        'Vitest',
      ],
      keyDecisions: [
        'Sub-second AST indexing: parses codebases locally with zero external API dependencies or data leakage.',
        'Deterministic citation tracking: every architectural component links directly to verified source files, line numbers, and commits.',
        'Automated regression testing: comprehensive unit test suite verifies symbol extraction and file traversal workflows.',
      ],
      githubUrl: 'https://github.com/Mohit-Rocky-25/RepoPilot',
      liveUrl: 'https://repo-pilot-eta.vercel.app',
    },
    {
      id: 'hireflow',
      number: '02',
      title: 'HireFlow',
      tagline: '100% Client-Side ATS Resume Parser & Algorithmic Job Optimizer',
      brief: 'Many qualified engineering resumes get filtered by automated ATS scanners. HireFlow parses complex document streams entirely in browser memory with zero server cost, providing real-time ATS scoring, keyword gap diagnostics, and algorithmic project recommendations.',
      sceneBackground: '#FA6924', // Bold Dark Orange
      accentColor: '#0A0A0A',
      isPrimary: true,
      builtWith: [
        'React',
        'TypeScript',
        'Vite',
        'Tailwind CSS',
        'Zustand',
        'Zod',
        'Vitest',
      ],
      keyDecisions: [
        'Client-side stream extraction: 100% in-browser document parsing using WebAssembly without server uploads.',
        'Strict schema validation: robust Zod schemas guarantee clean data extraction and prevent malformed candidate profiles.',
        'Algorithmic match engine: greedy set-cover algorithm computes minimal project builds needed to satisfy job descriptions.',
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
      sceneBackground: '#FFCD29', // Bold Yellow
      accentColor: '#0A0A0A',
      isPrimary: false,
      builtWith: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Tailwind CSS',
        'Web Audio API',
      ],
      keyDecisions: [
        'In-browser audio synthesis: zero-dependency acoustic tone generation built directly on the native Web Audio API.',
        'Latency-adaptive review curve: modified SuperMemo-2 algorithm dynamically calculates review intervals from user response times.',
        'Contextual scenario engine: dynamic immersion adapters prioritize natural colloquial speech patterns over literal dictionary translations.',
      ],
      githubUrl: 'https://github.com/Mohit-Rocky-25/UNILANG',
      liveUrl: 'https://unilang-three.vercel.app',
    },
  ] as ProjectScene[],

  skills: {
    marqueeLine1: [
      { text: 'C++', italic: false, project: 'all' },
      { text: 'Python', italic: true, project: 'repopilot' },
      { text: 'TypeScript', italic: false, project: 'repopilot' },
      { text: 'React', italic: true, project: 'hireflow' },
      { text: 'Next.js', italic: false, project: 'repopilot' },
      { text: 'Node.js', italic: true, project: 'all' },
      { text: 'Go', italic: false, project: 'repopilot' },
      { text: 'Java', italic: true, project: 'all' },
      { text: 'Tailwind CSS', italic: false, project: 'repopilot' },
      { text: 'Data Structures', italic: true, project: 'all' },
    ],
    marqueeLine2: [
      { text: 'Docker', italic: false, project: 'repopilot' },
      { text: 'Git & GitHub', italic: true, project: 'repopilot' },
      { text: 'Linux', italic: false, project: 'repopilot' },
      { text: 'SQL', italic: true, project: 'all' },
      { text: 'Vite', italic: false, project: 'hireflow' },
      { text: 'Web Audio API', italic: true, project: 'unilang' },
      { text: 'Zustand', italic: false, project: 'hireflow' },
      { text: 'Zod Validation', italic: true, project: 'hireflow' },
      { text: 'Automated Testing', italic: false, project: 'hireflow' },
      { text: 'Vercel', italic: true, project: 'repopilot' },
    ],
    categories: [
      {
        category: 'Languages',
        description: 'Core programming languages for algorithms, systems, and application logic.',
        items: [
          { name: 'C++', context: 'Competitive programming & algorithms' },
          { name: 'Python', context: 'Scripting, automation & data processing' },
          { name: 'TypeScript', context: 'Strongly-typed web platforms & tooling' },
          { name: 'JavaScript', context: 'Modern web standards & asynchronous APIs' },
          { name: 'Go', context: 'Concurrent backend utilities & systems' },
          { name: 'Java', context: 'Object-oriented architecture & algorithms' },
          { name: 'SQL', context: 'Relational database schema & querying' },
        ],
      },
      {
        category: 'Frontend & Full Stack',
        description: 'Modern architectures for fast, reactive, and reliable user interfaces.',
        items: [
          { name: 'React', context: 'Modular components & reactive UI' },
          { name: 'Next.js', context: 'Full-stack SSR/SSG web platforms' },
          { name: 'Node.js', context: 'Backend runtimes & RESTful API endpoints' },
          { name: 'Tailwind CSS', context: 'Clean, responsive design systems' },
          { name: 'Vite', context: 'Fast bundling & modern build pipelines' },
          { name: 'Zustand', context: 'Lightweight client state management' },
          { name: 'Web Audio API', context: 'Real-time in-browser audio synthesis' },
        ],
      },
      {
        category: 'Systems & Core CS',
        description: 'Foundational computer science principles and algorithmic problem solving.',
        items: [
          { name: 'Data Structures & Algorithms', context: 'Algorithmic optimization & complexity analysis' },
          { name: 'Competitive Programming', context: 'Strict time-bounded problem solving' },
          { name: 'Low-Latency Systems', context: 'Cache-conscious memory & execution efficiency' },
          { name: 'AST & Code Analysis', context: 'Syntax parsing & static symbol extraction' },
          { name: 'Client-Side Parsing', context: 'Zero-backend document stream processing' },
        ],
      },
      {
        category: 'Developer Tools & DevOps',
        description: 'Reliable tooling, containerization, and testing suites for production code.',
        items: [
          { name: 'Git & GitHub', context: 'Version control & collaborative PR workflows' },
          { name: 'Docker', context: 'Containerization & reproducible environments' },
          { name: 'Linux / Bash', context: 'Unix command-line & shell scripting' },
          { name: 'Vitest', context: 'Automated unit & integration test suites' },
          { name: 'Zod', context: 'Runtime data validation & schema safety' },
          { name: 'Vercel', context: 'Cloud deployments & CI/CD workflows' },
        ],
      },
    ] as SkillCategory[],
  },
}
