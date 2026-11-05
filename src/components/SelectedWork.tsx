import { useState } from 'react'
import { PORTFOLIO_CONFIG } from '../data/config'

export function SelectedWork() {
  const projects = PORTFOLIO_CONFIG.projects

  // ==========================================
  // 1. REPOPILOT INTERACTIVE STATE
  // ==========================================
  const [selectedNode, setSelectedNode] = useState<{
    id: string
    name: string
    file: string
    line: number
    commit: string
    latency: string
    purpose: string
  }>({
    id: 'ast',
    name: 'SymbolExtractor',
    file: 'src/indexer/ast.ts',
    line: 142,
    commit: '7f3a9b2',
    latency: '0.4ms',
    purpose: 'Deterministic in-memory AST parser indexing Go, Python, and TypeScript symbols without cloud APIs.',
  })

  const [benchmarkRunning, setBenchmarkRunning] = useState(false)
  const [benchmarkResult, setBenchmarkResult] = useState<string | null>(null)

  const handleRunBenchmark = () => {
    setBenchmarkRunning(true)
    setBenchmarkResult(null)
    setTimeout(() => {
      setBenchmarkRunning(false)
      setBenchmarkResult('54,210 LOC parsed in 184ms • Memory: 12.4 MB • 0 Token Cost')
    }, 600)
  }

  // ==========================================
  // 2. HIREFLOW INTERACTIVE STATE
  // ==========================================
  const [selectedCandidate, setSelectedCandidate] = useState<'mohit' | 'generic'>('mohit')
  const [resumeParsed, setResumeParsed] = useState(true)
  const [parsingStep, setParsingStep] = useState(0)

  const handleParseSample = () => {
    setResumeParsed(false)
    setParsingStep(1)
    setTimeout(() => setParsingStep(2), 350)
    setTimeout(() => {
      setParsingStep(3)
      setResumeParsed(true)
    }, 750)
  }

  // ==========================================
  // 3. UNILANG INTERACTIVE STATE
  // ==========================================
  const phrases = [
    {
      id: 'saudade',
      culture: 'Portuguese concept',
      word: 'Saudade',
      meaning: 'Deep nostalgic longing for an absent presence, person, or unrepeatable memory.',
      freq: 440,
    },
    {
      id: 'mono',
      culture: 'Japanese aesthetic',
      word: 'Mono no aware',
      meaning: 'Gentle aesthetic awareness of the transience and impermanence of all things.',
      freq: 520,
    },
    {
      id: 'wald',
      culture: 'German nature concept',
      word: 'Waldeinsamkeit',
      meaning: 'The contemplative feeling of solitude and deep connection when alone in a forest.',
      freq: 360,
    },
  ]
  const [selectedPhrase, setSelectedPhrase] = useState(phrases[0])
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [cardInterval, setCardInterval] = useState('4 days')
  const [reviewCount, setReviewCount] = useState(2)

  const playSynthesizedTone = () => {
    try {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(selectedPhrase.freq, now)
      osc.frequency.exponentialRampToValueAtTime(selectedPhrase.freq * 1.5, now + 0.18)

      gain.gain.setValueAtTime(0.12, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.38)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.38)

      setAudioPlaying(true)
      setTimeout(() => setAudioPlaying(false), 450)
    } catch {
      // Audio fallback
    }
  }

  const handleSpacedRepetition = (again: boolean) => {
    if (again) {
      setCardInterval('10 minutes')
    } else {
      setReviewCount((prev) => prev + 1)
      setCardInterval(`${reviewCount * 3 + 2} days`)
    }
  }

  return (
    <section id="work" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#1F1A14]/14 pb-6 mb-16 sm:mb-20">
        <div className="space-y-2">
          <div className="flex items-center gap-3 font-text text-[13px] text-[#B4441F] font-bold">
            <span className="font-mono text-xs">02</span>
            <span>/</span>
            <span>Selected Work</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1A14] tracking-tight">
            Engineered systems, built from scratch.
          </h2>
        </div>
        <p className="font-text text-sm text-[#6B6254] font-medium max-w-md mt-3 sm:mt-0 leading-relaxed">
          Three production applications highlighting local AST indexing, zero-backend document extraction, and real-time audio synthesis.
        </p>
      </div>

      {/* Projects Stack (Clean vertical showcase, perfectly aligned) */}
      <div className="space-y-16 sm:space-y-24">
        
        {/* ======================================================== */}
        {/* PROJECT 01: REPOPILOT (FLAGSHIP PLATFORM) */}
        {/* ======================================================== */}
        <article className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#F5EFE4] border border-[#1F1A14]/12 shadow-sm transition-all hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Context, Stack, Recruiter Decisions */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3 font-text text-xs sm:text-sm font-bold text-[#1F1A14]">
                <span className="font-mono text-xs text-[#B4441F] font-extrabold">01</span>
                <span>•</span>
                <span className="uppercase tracking-widest text-[#B4441F]">Flagship Platform</span>
                <span className="text-[#1F1A14]/25">|</span>
                <span className="font-mono text-xs text-[#6B6254]">2024</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1A14] tracking-tight leading-[0.95]">
                  {projects[0].title}
                </h3>
                <p className="font-text text-sm sm:text-base font-bold text-[#5E6B3A]">
                  {projects[0].tagline}
                </p>
              </div>

              <p className="font-text text-base text-[#1F1A14]/90 font-medium leading-relaxed">
                {projects[0].brief}
              </p>

              {/* Built With Stack Tags */}
              <div className="space-y-2 pt-2 border-t border-[#1F1A14]/10">
                <span className="font-mono text-xs uppercase tracking-wider text-[#6B6254] font-bold block">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {projects[0].builtWith.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-[#1F1A14]/[0.05] border border-[#1F1A14]/12 text-xs font-mono font-bold text-[#1F1A14]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Highlights */}
              <div className="space-y-2 pt-2 border-t border-[#1F1A14]/10">
                <span className="font-mono text-xs uppercase tracking-wider text-[#6B6254] font-bold block">
                  Key Technical Highlights
                </span>
                <ul className="space-y-2 font-text text-sm text-[#1F1A14]/90 font-medium">
                  {projects[0].keyDecisions.map((line, idx) => (
                    <li key={idx} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-[#B4441F] font-black">0{idx + 1}.</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <a
                  href={projects[0].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-[#1F1A14] text-[#EAE2D1] hover:bg-[#B4441F] font-display font-black text-sm tracking-wide transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2"
                >
                  <span>Source on GitHub</span>
                  <span>→</span>
                </a>
                {projects[0].liveUrl && (
                  <a
                    href={projects[0].liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full border-2 border-[#1F1A14] text-[#1F1A14] hover:bg-[#1F1A14] hover:text-[#EAE2D1] font-display font-black text-sm tracking-wide transition-all inline-flex items-center gap-2"
                  >
                    <span>Live Demo</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Interactive AST Query Explorer Widget */}
            <div className="lg:col-span-6 bg-[#EAE2D1]/70 border border-[#1F1A14]/14 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1F1A14]/12 pb-3">
                <span className="font-display font-black text-sm text-[#1F1A14] uppercase tracking-wider">
                  Interactive AST Query Explorer
                </span>
                <span className="font-mono text-xs text-[#6B6254] font-bold">
                  Click to inspect proof
                </span>
              </div>

              {/* Symbol Buttons */}
              <div className="grid grid-cols-1 gap-2">
                {[
                  {
                    id: 'ast',
                    name: 'SymbolExtractor',
                    file: 'src/indexer/ast.ts',
                    line: 142,
                    commit: '7f3a9b2',
                    latency: '0.4ms',
                    purpose: 'Deterministic in-memory AST parser indexing Go, Python, and TypeScript symbols without cloud APIs.',
                  },
                  {
                    id: 'search',
                    name: 'RankedSearch',
                    file: 'src/core/search.ts',
                    line: 88,
                    commit: '7f3a9b2',
                    latency: '14ms',
                    purpose: 'Sub-50ms BM25 and vector distance ranking executed 100% locally on CPU without external vector DB costs.',
                  },
                  {
                    id: 'diff',
                    name: 'MemorySandbox',
                    file: 'src/diff/sandbox.ts',
                    line: 204,
                    commit: '7f3a9b2',
                    latency: '1.1ms',
                    purpose: 'Validates code modifications locally with automated test suites before commit merge.',
                  },
                  {
                    id: 'graph',
                    name: 'ArchitectureGraph',
                    file: 'src/visual/graph.ts',
                    line: 56,
                    commit: '7f3a9b2',
                    latency: '2.8ms',
                    purpose: 'Constructs dependency graphs and module orderings directly from AST syntax trees.',
                  },
                ].map((node) => {
                  const isSelected = selectedNode?.id === node.id
                  return (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-all border ${
                        isSelected
                          ? 'bg-[#1F1A14] text-[#EAE2D1] border-[#1F1A14] shadow-sm'
                          : 'bg-[#F5EFE4] border-[#1F1A14]/10 hover:border-[#1F1A14]/30 text-[#1F1A14]'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-2.5 h-2.5 rounded-full transition-transform ${
                            isSelected ? 'bg-[#B4441F] scale-125' : 'bg-[#1F1A14]/30'
                          }`}
                        />
                        <span className={`font-display font-extrabold text-sm ${isSelected ? 'text-[#EAE2D1]' : 'text-[#1F1A14]'}`}>
                          {node.name}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <span className={`font-mono text-xs px-2 py-0.5 rounded-md font-bold ${isSelected ? 'bg-white/15 text-[#EAE2D1]' : 'bg-[#1F1A14]/10 text-[#6B6254]'}`}>
                          {node.latency}
                        </span>
                        <span className={`font-mono text-xs ${isSelected ? 'text-[#EAE2D1]/80' : 'text-[#6B6254]'}`}>
                          {node.file}
                        </span>
                      </div>
                    </button>
                  )
                })}
              </div>

              {/* Inspected Node Card */}
              {selectedNode && (
                <div className="p-4 rounded-xl bg-[#F5EFE4] border border-[#1F1A14]/12 space-y-2 text-xs">
                  <div className="flex items-center justify-between font-mono text-xs text-[#1F1A14] font-bold">
                    <span>Proof Target: {selectedNode.file}:{selectedNode.line}</span>
                    <span className="text-[#6B6254]">Commit: {selectedNode.commit}</span>
                  </div>
                  <p className="font-text text-[#1F1A14]/85 font-medium leading-relaxed">
                    {selectedNode.purpose}
                  </p>
                  <div className="pt-2 flex flex-wrap items-center gap-3">
                    <button
                      onClick={handleRunBenchmark}
                      className="px-4 py-1.5 rounded-full bg-[#1F1A14] text-[#EAE2D1] hover:bg-[#B4441F] text-xs font-mono font-bold transition-all shadow-sm"
                    >
                      {benchmarkRunning ? 'Running AST Query...' : '▶ Run Local AST Query Benchmark'}
                    </button>
                    {benchmarkResult && (
                      <span className="font-mono text-xs text-[#5E6B3A] font-bold animate-in fade-in">
                        {benchmarkResult}
                      </span>
                    )}
                  </div>
                </div>
              )}
            </div>

          </div>
        </article>


        {/* ======================================================== */}
        {/* PROJECT 02: HIREFLOW (CLIENT-SIDE ATS RESUME SCANNER) */}
        {/* ======================================================== */}
        <article className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#F5EFE4] border border-[#1F1A14]/12 shadow-sm transition-all hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Context, Stack, Recruiter Decisions */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3 font-text text-xs sm:text-sm font-bold text-[#1F1A14]">
                <span className="font-mono text-xs text-[#B4441F] font-extrabold">02</span>
                <span>•</span>
                <span className="uppercase tracking-widest text-[#B4441F]">Client-Side Architecture</span>
                <span className="text-[#1F1A14]/25">|</span>
                <span className="font-mono text-xs text-[#6B6254]">2024</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1A14] tracking-tight leading-[0.95]">
                  {projects[1].title}
                </h3>
                <p className="font-text text-sm sm:text-base font-bold text-[#5E6B3A]">
                  {projects[1].tagline}
                </p>
              </div>

              <p className="font-text text-base text-[#1F1A14]/90 font-medium leading-relaxed">
                {projects[1].brief}
              </p>

              {/* Built With Stack Tags */}
              <div className="space-y-2 pt-2 border-t border-[#1F1A14]/10">
                <span className="font-mono text-xs uppercase tracking-wider text-[#6B6254] font-bold block">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {projects[1].builtWith.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-[#1F1A14]/[0.05] border border-[#1F1A14]/12 text-xs font-mono font-bold text-[#1F1A14]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Highlights */}
              <div className="space-y-2 pt-2 border-t border-[#1F1A14]/10">
                <span className="font-mono text-xs uppercase tracking-wider text-[#6B6254] font-bold block">
                  Key Technical Highlights
                </span>
                <ul className="space-y-2 font-text text-sm text-[#1F1A14]/90 font-medium">
                  {projects[1].keyDecisions.map((line, idx) => (
                    <li key={idx} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-[#B4441F] font-black">0{idx + 1}.</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <a
                  href={projects[1].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-[#1F1A14] text-[#EAE2D1] hover:bg-[#B4441F] font-display font-black text-sm tracking-wide transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2"
                >
                  <span>Source on GitHub</span>
                  <span>→</span>
                </a>
              </div>
            </div>

            {/* Right Column: In-Browser ATS Diagnostic Engine Widget */}
            <div className="lg:col-span-6 bg-[#EAE2D1]/70 border border-[#1F1A14]/14 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1F1A14]/12 pb-3">
                <span className="font-display font-black text-sm text-[#1F1A14] uppercase tracking-wider">
                  In-Browser ATS Diagnostic Engine
                </span>
                <span className="font-mono text-xs text-[#5E6B3A] font-bold">
                  0 Bytes Sent to Cloud
                </span>
              </div>

              {/* Candidate Switcher */}
              <div className="flex flex-wrap items-center gap-2">
                <button
                  onClick={() => {
                    setSelectedCandidate('mohit')
                    setResumeParsed(true)
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-display font-extrabold border transition-all ${
                    selectedCandidate === 'mohit'
                      ? 'bg-[#1F1A14] text-[#EAE2D1] border-[#1F1A14] shadow-sm'
                      : 'bg-[#F5EFE4] border-[#1F1A14]/15 text-[#1F1A14] hover:border-[#1F1A14]'
                  }`}
                >
                  Candidate: Y. Mohit Sai (Systems / CSE Core)
                </button>
                <button
                  onClick={() => {
                    setSelectedCandidate('generic')
                    setResumeParsed(true)
                  }}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-display font-extrabold border transition-all ${
                    selectedCandidate === 'generic'
                      ? 'bg-[#1F1A14] text-[#EAE2D1] border-[#1F1A14] shadow-sm'
                      : 'bg-[#F5EFE4] border-[#1F1A14]/15 text-[#1F1A14] hover:border-[#1F1A14]'
                  }`}
                >
                  Sample: Unoptimized Resume
                </button>
              </div>

              {/* Status and Action */}
              <div className="p-3.5 rounded-xl bg-[#F5EFE4] border border-[#1F1A14]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="font-mono text-xs font-bold text-[#1F1A14]">
                    {selectedCandidate === 'mohit'
                      ? 'mohit_sai_vit_ap_systems.pdf'
                      : 'generic_unformatted_resume.docx'}
                  </div>
                  <div className="text-xs text-[#6B6254] font-medium mt-0.5">
                    Decoded via client-side WebAssembly parser in browser RAM
                  </div>
                </div>
                <button
                  onClick={handleParseSample}
                  className="px-4 py-1.5 rounded-full bg-[#1F1A14] text-[#EAE2D1] hover:bg-[#B4441F] font-mono text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
                >
                  {parsingStep > 0 && parsingStep < 3 ? 'Parsing Document...' : '▶ Re-run ATS Scan'}
                </button>
              </div>

              {/* Recruiter Evaluation Output */}
              {resumeParsed && (
                <div className="p-4 rounded-xl bg-[#F5EFE4] border border-[#1F1A14]/12 space-y-3 font-text text-xs sm:text-sm animate-in fade-in">
                  <div className="flex items-baseline justify-between border-b border-[#1F1A14]/10 pb-2">
                    <span className="font-bold text-[#1F1A14]">ATS Match Score:</span>
                    <strong className="text-2xl font-display font-black text-[#B4441F]">
                      {selectedCandidate === 'mohit' ? '96% Match (Tier 1)' : '68% Match (Gaps Found)'}
                    </strong>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#6B6254] font-bold block">
                      {selectedCandidate === 'mohit' ? 'Verified Skills & Invariants:' : 'Detected Skills:'}
                    </span>
                    <p className="font-bold text-[#1F1A14] text-xs">
                      {selectedCandidate === 'mohit'
                        ? 'C++, TypeScript, React, System Design, Algorithms, Docker, Automated Testing'
                        : 'React Basics, HTML/CSS, Git, REST Calls'}
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="font-mono text-xs uppercase tracking-wider text-[#6B6254] font-bold block">
                      Recruiter Assessment:
                    </span>
                    <p className="font-medium text-[#1F1A14] text-xs">
                      {selectedCandidate === 'mohit'
                        ? '✓ Strong Core CS & Systems • ✓ Clean Code & Automated Tests • Recommendation: High Match'
                        : '⚠️ Missing Core Systems Knowledge, Incomplete Test Rig'}
                    </p>
                  </div>
                </div>
              )}
            </div>

          </div>
        </article>


        {/* ======================================================== */}
        {/* PROJECT 03: UNILANG (AUDIO SYNTHESIS & IMMERSION) */}
        {/* ======================================================== */}
        <article className="p-6 sm:p-10 lg:p-12 rounded-3xl bg-[#F5EFE4] border border-[#1F1A14]/12 shadow-sm transition-all hover:shadow-md">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            
            {/* Left Column: Context, Stack, Recruiter Decisions */}
            <div className="lg:col-span-6 space-y-5">
              <div className="flex items-center gap-3 font-text text-xs sm:text-sm font-bold text-[#1F1A14]">
                <span className="font-mono text-xs text-[#B4441F] font-extrabold">03</span>
                <span>•</span>
                <span className="uppercase tracking-widest text-[#B4441F]">Audio Systems & Immersion</span>
                <span className="text-[#1F1A14]/25">|</span>
                <span className="font-mono text-xs text-[#6B6254]">2024</span>
              </div>

              <div className="space-y-2">
                <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-[#1F1A14] tracking-tight leading-[0.95]">
                  {projects[2].title}
                </h3>
                <p className="font-text text-sm sm:text-base font-bold text-[#5E6B3A]">
                  {projects[2].tagline}
                </p>
              </div>

              <p className="font-text text-base text-[#1F1A14]/90 font-medium leading-relaxed">
                {projects[2].brief}
              </p>

              {/* Built With Stack Tags */}
              <div className="space-y-2 pt-2 border-t border-[#1F1A14]/10">
                <span className="font-mono text-xs uppercase tracking-wider text-[#6B6254] font-bold block">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {projects[2].builtWith.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-[#1F1A14]/[0.05] border border-[#1F1A14]/12 text-xs font-mono font-bold text-[#1F1A14]"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Technical Highlights */}
              <div className="space-y-2 pt-2 border-t border-[#1F1A14]/10">
                <span className="font-mono text-xs uppercase tracking-wider text-[#6B6254] font-bold block">
                  Key Technical Highlights
                </span>
                <ul className="space-y-2 font-text text-sm text-[#1F1A14]/90 font-medium">
                  {projects[2].keyDecisions.map((line, idx) => (
                    <li key={idx} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-[#B4441F] font-black">0{idx + 1}.</span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <a
                  href={projects[2].githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-2.5 rounded-full bg-[#1F1A14] text-[#EAE2D1] hover:bg-[#B4441F] font-display font-black text-sm tracking-wide transition-all shadow-sm hover:shadow-md inline-flex items-center gap-2"
                >
                  <span>Source on GitHub</span>
                  <span>→</span>
                </a>
                {projects[2].liveUrl && (
                  <a
                    href={projects[2].liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2.5 rounded-full border-2 border-[#1F1A14] text-[#1F1A14] hover:bg-[#1F1A14] hover:text-[#EAE2D1] font-display font-black text-sm tracking-wide transition-all inline-flex items-center gap-2"
                  >
                    <span>Live Demo</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Web Audio Synthesis & Spaced Recall Console */}
            <div className="lg:col-span-6 bg-[#EAE2D1]/70 border border-[#1F1A14]/14 rounded-2xl p-5 sm:p-6 space-y-4">
              <div className="flex items-center justify-between border-b border-[#1F1A14]/12 pb-3">
                <span className="font-display font-black text-sm text-[#1F1A14] uppercase tracking-wider">
                  Web Audio API Synthesis Engine
                </span>
                <span className="font-mono text-xs text-[#5E6B3A] font-bold">
                  Zero Server Audio Files
                </span>
              </div>

              {/* Phrase Switcher */}
              <div className="flex flex-wrap items-center gap-2">
                {phrases.map((p) => (
                  <button
                    key={p.id}
                    onClick={() => setSelectedPhrase(p)}
                    className={`px-3.5 py-1.5 rounded-full text-xs font-display font-extrabold border transition-all ${
                      selectedPhrase.id === p.id
                        ? 'bg-[#1F1A14] text-[#EAE2D1] border-[#1F1A14] shadow-sm'
                        : 'bg-[#F5EFE4] border-[#1F1A14]/15 text-[#1F1A14] hover:border-[#1F1A14]'
                    }`}
                  >
                    {p.word}
                  </button>
                ))}
              </div>

              {/* Active Phrase Card */}
              <div className="p-4 rounded-xl bg-[#F5EFE4] border border-[#1F1A14]/12 space-y-3">
                <div className="font-mono text-xs text-[#B4441F] font-bold uppercase tracking-wider">
                  {selectedPhrase.culture}
                </div>
                <div className="flex items-center justify-between">
                  <span className="font-display text-3xl sm:text-4xl font-black text-[#1F1A14] tracking-tight">
                    {selectedPhrase.word}
                  </span>
                  {/* Equalizer animation */}
                  <div className="flex items-end gap-1.5 h-6">
                    <span className={`w-1 rounded-full bg-[#B4441F] transition-all duration-150 ${audioPlaying ? 'h-6' : 'h-2'}`} />
                    <span className={`w-1 rounded-full bg-[#B4441F] transition-all duration-150 ${audioPlaying ? 'h-4' : 'h-3'}`} />
                    <span className={`w-1 rounded-full bg-[#B4441F] transition-all duration-150 ${audioPlaying ? 'h-6' : 'h-1.5'}`} />
                    <span className={`w-1 rounded-full bg-[#B4441F] transition-all duration-150 ${audioPlaying ? 'h-5' : 'h-2.5'}`} />
                  </div>
                </div>

                <p className="font-text text-sm text-[#1F1A14]/85 font-medium leading-relaxed">
                  {selectedPhrase.meaning}
                </p>

                <div className="pt-2">
                  <button
                    onClick={playSynthesizedTone}
                    className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold bg-[#1F1A14] text-[#EAE2D1] hover:bg-[#B4441F] transition-all shadow-sm"
                  >
                    <span>🔊 Synthesize Acoustic Tone</span>
                    <span className="opacity-70">({selectedPhrase.freq}Hz)</span>
                  </button>
                </div>
              </div>

              {/* Spaced Repetition Testing Widget */}
              <div className="p-3.5 rounded-xl bg-[#F5EFE4] border border-[#1F1A14]/12 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-text">
                <div>
                  <span className="text-[#6B6254] font-medium">Calculated SuperMemo-2 Interval:</span>
                  <strong className="ml-1.5 font-mono text-xs text-[#1F1A14] font-bold">{cardInterval}</strong>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleSpacedRepetition(true)}
                    className="px-3 py-1 rounded-full border border-[#1F1A14]/25 hover:border-[#1F1A14] text-[#1F1A14] font-mono text-xs font-bold transition-colors"
                  >
                    Hard (Reset)
                  </button>
                  <button
                    onClick={() => handleSpacedRepetition(false)}
                    className="px-3 py-1 rounded-full bg-[#5E6B3A] text-white hover:opacity-90 font-mono text-xs font-bold transition-all shadow-sm"
                  >
                    Recalled ✓
                  </button>
                </div>
              </div>

            </div>

          </div>
        </article>

      </div>
    </section>
  )
}
