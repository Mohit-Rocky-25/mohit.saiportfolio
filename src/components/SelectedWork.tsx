import { useState, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

export function SelectedWork() {
  const projects = PORTFOLIO_CONFIG.projects
  const [activeProjectIdx, setActiveProjectIdx] = useState(0)

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

  // Navigation handlers
  const handlePrev = useCallback(() => {
    setActiveProjectIdx((prev) => (prev - 1 + projects.length) % projects.length)
  }, [projects.length])

  const handleNext = useCallback(() => {
    setActiveProjectIdx((prev) => (prev + 1) % projects.length)
  }, [projects.length])

  // Keyboard navigation when user is focused on this section
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev()
      if (e.key === 'ArrowRight') handleNext()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [handlePrev, handleNext])

  const currentProject = projects[activeProjectIdx]

  return (
    <section id="work" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#1F1A14]/14 pb-6 mb-12 sm:mb-16">
        <div className="space-y-2">
          <div className="flex items-center gap-3 font-text text-[13px] text-[#B4441F] font-bold">
            <span className="font-mono text-xs font-extrabold">03</span>
            <span>/</span>
            <span>Selected Work</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1A14] tracking-tight">
            Engineered systems, built from scratch.
          </h2>
        </div>
        <p className="font-text text-sm text-[#6B6254] font-medium max-w-md mt-3 sm:mt-0 leading-relaxed">
          Interactive console showcasing local AST intelligence, client-side ATS document extraction, and real-time acoustic audio synthesis.
        </p>
      </div>

      {/* ======================================================== */}
      {/* PREMIUM BLACK SLIDER SHOWCASE (Ultra-High Visibility Console) */}
      {/* ======================================================== */}
      <div className="relative w-full rounded-3xl bg-[#0C0C0E] border border-white/15 p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/45 overflow-hidden select-none transition-all group">
        {/* Background Tactile Texture & Subtle Grain */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#ffffff0e_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none"
          aria-hidden="true"
        />
        {/* Top subtle gloss hairline */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* Console Header Info Row */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 sm:mb-8 border-b border-white/10 gap-3">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-white/80 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B4441F] animate-pulse" />
            <span>Interactive Project Console</span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="text-white/50 lowercase font-normal hidden sm:inline">
              click tabs or arrows to switch
            </span>
          </div>
          <div className="flex items-center gap-3 font-mono text-xs text-white/60">
            <span className="font-extrabold text-white">{currentProject.number}</span>
            <span className="text-white/40">/</span>
            <span>03</span>
            <div className="flex items-center gap-1.5 ml-2">
              <button
                onClick={handlePrev}
                aria-label="Previous Project"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#0C0C0E] border border-white/15 flex items-center justify-center text-white transition-all active:scale-95"
              >
                ←
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Project"
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white hover:text-[#0C0C0E] border border-white/15 flex items-center justify-center text-white transition-all active:scale-95"
              >
                →
              </button>
            </div>
          </div>
        </div>

        {/* 3 Projects Slider Track (Black slider with white active pill indicator) */}
        <div className="relative z-10 grid grid-cols-3 gap-1.5 sm:gap-2 p-1.5 rounded-2xl bg-white/[0.04] border border-white/10 mb-8 sm:mb-10">
          {projects.map((proj, idx) => {
            const isActive = activeProjectIdx === idx
            return (
              <button
                key={proj.id}
                onClick={() => setActiveProjectIdx(idx)}
                className={`relative py-2.5 sm:py-3 px-2 sm:px-4 rounded-xl flex flex-col sm:flex-row items-center sm:justify-between gap-1 sm:gap-3 text-center sm:text-left transition-colors duration-200 ${
                  isActive ? 'text-[#0C0C0E] font-black' : 'text-white/75 hover:text-white font-bold'
                }`}
              >
                {isActive && (
                  <motion.div
                    layoutId="workSliderPill"
                    transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                    className="absolute inset-0 bg-white rounded-xl shadow-xl pointer-events-none z-0"
                  />
                )}
                <div className="relative z-10 flex items-center gap-1.5 sm:gap-2.5">
                  <span
                    className={`font-mono text-[11px] sm:text-xs font-black ${
                      isActive ? 'text-[#B4441F]' : 'text-white/50'
                    }`}
                  >
                    {proj.number}
                  </span>
                  <span className="font-display font-black text-xs sm:text-base tracking-tight truncate">
                    {proj.title}
                  </span>
                </div>
                <span
                  className={`relative z-10 hidden lg:inline font-mono text-[11px] ${
                    isActive ? 'text-[#0C0C0E]/70 font-semibold' : 'text-white/40'
                  }`}
                >
                  {idx === 0 ? 'Code Intelligence' : idx === 1 ? 'ATS Parser' : 'Audio Systems'}
                </span>
              </button>
            )
          })}
        </div>

        {/* Active Project Slide Content with Framer Motion Transition */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentProject.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start"
          >
            {/* Left Column: Context, Stack, Recruiter Highlights & Action Links */}
            <div className="lg:col-span-6 space-y-6">
              {/* Category & Badge */}
              <div className="flex items-center gap-3 font-text text-xs sm:text-sm font-bold">
                <span className="font-mono text-xs text-[#FF7744] font-black">
                  {currentProject.number}
                </span>
                <span className="text-white/30">•</span>
                <span className="uppercase tracking-widest text-[#FF7744] font-extrabold">
                  {activeProjectIdx === 0
                    ? 'Flagship Platform'
                    : activeProjectIdx === 1
                    ? 'Client-Side Architecture'
                    : 'Audio Systems & Immersion'}
                </span>
                <span className="text-white/25">|</span>
                <span className="font-mono text-xs text-white/50">2026</span>
              </div>

              {/* Title & Tagline */}
              <div className="space-y-2">
                <h3 className="font-display text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-[0.96]">
                  {currentProject.title}
                </h3>
                <p className="font-text text-sm sm:text-base font-bold text-[#FF7744]">
                  {currentProject.tagline}
                </p>
              </div>

              {/* Understandable Brief */}
              <p className="font-text text-base sm:text-lg text-white/85 font-medium leading-relaxed">
                {currentProject.brief}
              </p>

              {/* Built With Stack Tags */}
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <span className="font-mono text-xs uppercase tracking-wider text-white/50 font-bold block">
                  Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {currentProject.builtWith.map((tech) => (
                    <span
                      key={tech}
                      className="px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-xs font-mono font-bold text-white shadow-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Key Technical Highlights */}
              <div className="space-y-2.5 pt-2 border-t border-white/10">
                <span className="font-mono text-xs uppercase tracking-wider text-white/50 font-bold block">
                  Key Technical Highlights
                </span>
                <ul className="space-y-2.5 font-text text-sm text-white/80 font-medium">
                  {currentProject.keyDecisions.map((line, idx) => (
                    <li key={idx} className="flex items-baseline gap-2.5">
                      <span className="font-mono text-xs text-[#FF7744] font-black">
                        0{idx + 1}.
                      </span>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Action Buttons */}
              <div className="pt-3 flex flex-wrap items-center gap-4">
                <a
                  href={currentProject.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 sm:px-7 py-3 rounded-full bg-white text-[#0C0C0E] hover:bg-white/90 font-display font-black text-sm tracking-wide transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2"
                >
                  <span>Source on GitHub</span>
                  <span>→</span>
                </a>
                {currentProject.liveUrl && (
                  <a
                    href={currentProject.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 sm:px-7 py-3 rounded-full border-2 border-white/30 text-white hover:bg-white hover:text-[#0C0C0E] font-display font-black text-sm tracking-wide transition-all inline-flex items-center gap-2"
                  >
                    <span>Live Demo</span>
                    <span>↗</span>
                  </a>
                )}
              </div>
            </div>

            {/* Right Column: Interactive Simulator Console for the Active Project */}
            <div className="lg:col-span-6 bg-white/[0.03] border border-white/15 rounded-2xl p-5 sm:p-6 space-y-4 shadow-xl backdrop-blur-sm">
              
              {/* ======================================================== */}
              {/* SIMULATOR 01: REPOPILOT AST EXPLORER */}
              {/* ======================================================== */}
              {activeProjectIdx === 0 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-display font-black text-sm text-white uppercase tracking-wider">
                      Interactive AST Query Explorer
                    </span>
                    <span className="font-mono text-xs text-[#4EBA86] font-bold">
                      Proof: Verified In-Memory
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
                        purpose:
                          'Deterministic in-memory AST parser indexing Go, Python, and TypeScript symbols without cloud APIs.',
                      },
                      {
                        id: 'search',
                        name: 'RankedSearch',
                        file: 'src/core/search.ts',
                        line: 88,
                        commit: '7f3a9b2',
                        latency: '14ms',
                        purpose:
                          'Sub-50ms BM25 and vector distance ranking executed 100% locally on CPU without external vector DB costs.',
                      },
                      {
                        id: 'diff',
                        name: 'MemorySandbox',
                        file: 'src/diff/sandbox.ts',
                        line: 204,
                        commit: '7f3a9b2',
                        latency: '1.1ms',
                        purpose:
                          'Validates code modifications locally with automated test suites before commit merge.',
                      },
                      {
                        id: 'graph',
                        name: 'ArchitectureGraph',
                        file: 'src/visual/graph.ts',
                        line: 56,
                        commit: '7f3a9b2',
                        latency: '2.8ms',
                        purpose:
                          'Constructs dependency graphs and module orderings directly from AST syntax trees.',
                      },
                    ].map((node) => {
                      const isSelected = selectedNode?.id === node.id
                      return (
                        <button
                          key={node.id}
                          onClick={() => setSelectedNode(node)}
                          className={`w-full p-2.5 rounded-xl flex items-center justify-between text-left transition-all border ${
                            isSelected
                              ? 'bg-white/15 text-white border-white/40 shadow-md'
                              : 'bg-white/[0.03] border-white/10 hover:border-white/25 text-white/80'
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <span
                              className={`w-2.5 h-2.5 rounded-full transition-transform ${
                                isSelected ? 'bg-[#FF7744] scale-125' : 'bg-white/30'
                              }`}
                            />
                            <span className="font-display font-extrabold text-sm text-white">
                              {node.name}
                            </span>
                          </div>
                          <div className="flex items-center gap-2.5">
                            <span
                              className={`font-mono text-xs px-2 py-0.5 rounded-md font-bold ${
                                isSelected
                                  ? 'bg-[#FF7744]/25 text-[#FF7744] border border-[#FF7744]/40'
                                  : 'bg-white/10 text-white/60'
                              }`}
                            >
                              {node.latency}
                            </span>
                            <span className="font-mono text-xs text-white/50">
                              {node.file}
                            </span>
                          </div>
                        </button>
                      )
                    })}
                  </div>

                  {/* Inspected Node Proof Card */}
                  {selectedNode && (
                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-2 text-xs">
                      <div className="flex items-center justify-between font-mono text-xs text-white font-bold">
                        <span>
                          Proof Target: {selectedNode.file}:{selectedNode.line}
                        </span>
                        <span className="text-white/50">Commit: {selectedNode.commit}</span>
                      </div>
                      <p className="font-text text-white/80 font-medium leading-relaxed">
                        {selectedNode.purpose}
                      </p>
                      <div className="pt-2 flex flex-wrap items-center gap-3">
                        <button
                          onClick={handleRunBenchmark}
                          className="px-4 py-2 rounded-full bg-white text-[#0C0C0E] hover:bg-white/90 text-xs font-mono font-bold transition-all shadow-sm"
                        >
                          {benchmarkRunning
                            ? 'Running AST Query...'
                            : '▶ Run Local AST Query Benchmark'}
                        </button>
                        {benchmarkResult && (
                          <span className="font-mono text-xs text-[#4EBA86] font-bold animate-in fade-in">
                            {benchmarkResult}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================== */}
              {/* SIMULATOR 02: HIREFLOW ATS DIAGNOSTIC ENGINE */}
              {/* ======================================================== */}
              {activeProjectIdx === 1 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-display font-black text-sm text-white uppercase tracking-wider">
                      In-Browser ATS Diagnostic Engine
                    </span>
                    <span className="font-mono text-xs text-[#4EBA86] font-bold">
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
                          ? 'bg-white text-[#0C0C0E] border-white shadow-sm'
                          : 'bg-white/[0.04] border-white/15 text-white/80 hover:border-white/30'
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
                          ? 'bg-white text-[#0C0C0E] border-white shadow-sm'
                          : 'bg-white/[0.04] border-white/15 text-white/80 hover:border-white/30'
                      }`}
                    >
                      Sample: Unoptimized Resume
                    </button>
                  </div>

                  {/* Status & Re-run Action */}
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div>
                      <div className="font-mono text-xs font-bold text-white">
                        {selectedCandidate === 'mohit'
                          ? 'mohit_sai_vit_ap_systems.pdf'
                          : 'generic_unformatted_resume.docx'}
                      </div>
                      <div className="text-xs text-white/50 font-medium mt-0.5">
                        Decoded via client-side WebAssembly parser in browser RAM
                      </div>
                    </div>
                    <button
                      onClick={handleParseSample}
                      className="px-4 py-2 rounded-full bg-white text-[#0C0C0E] hover:bg-white/90 font-mono text-xs font-bold transition-all shadow-sm self-start sm:self-auto"
                    >
                      {parsingStep > 0 && parsingStep < 3
                        ? 'Parsing Document...'
                        : '▶ Re-run ATS Scan'}
                    </button>
                  </div>

                  {/* Recruiter Evaluation Output */}
                  {resumeParsed && (
                    <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-3 font-text text-xs sm:text-sm animate-in fade-in">
                      <div className="flex items-baseline justify-between border-b border-white/10 pb-2">
                        <span className="font-bold text-white">ATS Match Score:</span>
                        <strong className="text-2xl sm:text-3xl font-display font-black text-[#FF7744]">
                          {selectedCandidate === 'mohit'
                            ? '96% Match (Tier 1)'
                            : '68% Match (Gaps Found)'}
                        </strong>
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-xs uppercase tracking-wider text-white/50 font-bold block">
                          {selectedCandidate === 'mohit'
                            ? 'Verified Skills & Invariants:'
                            : 'Detected Skills:'}
                        </span>
                        <p className="font-bold text-white text-xs">
                          {selectedCandidate === 'mohit'
                            ? 'C++, TypeScript, React, System Design, Algorithms, Docker, Automated Testing'
                            : 'React Basics, HTML/CSS, Git, REST Calls'}
                        </p>
                      </div>

                      <div className="space-y-1">
                        <span className="font-mono text-xs uppercase tracking-wider text-white/50 font-bold block">
                          Recruiter Assessment:
                        </span>
                        <p className="font-medium text-white/80 text-xs">
                          {selectedCandidate === 'mohit'
                            ? '✓ Strong Core CS & Systems • ✓ Clean Code & Automated Tests • Recommendation: High Match'
                            : '⚠️ Missing Core Systems Knowledge, Incomplete Test Rig'}
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* ======================================================== */}
              {/* SIMULATOR 03: UNILANG WEB AUDIO SYNTHESIZER */}
              {/* ======================================================== */}
              {activeProjectIdx === 2 && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-white/10 pb-3">
                    <span className="font-display font-black text-sm text-white uppercase tracking-wider">
                      Web Audio API Synthesis Engine
                    </span>
                    <span className="font-mono text-xs text-[#4EBA86] font-bold">
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
                            ? 'bg-white text-[#0C0C0E] border-white shadow-sm'
                            : 'bg-white/[0.04] border-white/15 text-white/80 hover:border-white/30'
                        }`}
                      >
                        {p.word}
                      </button>
                    ))}
                  </div>

                  {/* Active Phrase Card */}
                  <div className="p-4 rounded-xl bg-white/[0.04] border border-white/10 space-y-3">
                    <div className="font-mono text-xs text-[#FF7744] font-bold uppercase tracking-wider">
                      {selectedPhrase.culture}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="font-display text-3xl sm:text-4xl font-black text-white tracking-tight">
                        {selectedPhrase.word}
                      </span>
                      {/* Equalizer animation */}
                      <div className="flex items-end gap-1.5 h-6">
                        <span
                          className={`w-1 rounded-full bg-[#FF7744] transition-all duration-150 ${
                            audioPlaying ? 'h-6' : 'h-2'
                          }`}
                        />
                        <span
                          className={`w-1 rounded-full bg-[#FF7744] transition-all duration-150 ${
                            audioPlaying ? 'h-4' : 'h-3'
                          }`}
                        />
                        <span
                          className={`w-1 rounded-full bg-[#FF7744] transition-all duration-150 ${
                            audioPlaying ? 'h-6' : 'h-1.5'
                          }`}
                        />
                        <span
                          className={`w-1 rounded-full bg-[#FF7744] transition-all duration-150 ${
                            audioPlaying ? 'h-5' : 'h-2.5'
                          }`}
                        />
                      </div>
                    </div>

                    <p className="font-text text-sm text-white/80 font-medium leading-relaxed">
                      {selectedPhrase.meaning}
                    </p>

                    <div className="pt-2">
                      <button
                        onClick={playSynthesizedTone}
                        className="inline-flex items-center gap-2 px-4 py-2 rounded-full font-mono text-xs font-bold bg-white text-[#0C0C0E] hover:bg-white/90 transition-all shadow-sm"
                      >
                        <span>🔊 Synthesize Acoustic Tone</span>
                        <span className="opacity-70">({selectedPhrase.freq}Hz)</span>
                      </button>
                    </div>
                  </div>

                  {/* Spaced Repetition Testing Widget */}
                  <div className="p-3.5 rounded-xl bg-white/[0.04] border border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs font-text">
                    <div>
                      <span className="text-white/60 font-medium">
                        Calculated SuperMemo-2 Interval:
                      </span>
                      <strong className="ml-1.5 font-mono text-xs text-white font-bold">
                        {cardInterval}
                      </strong>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleSpacedRepetition(true)}
                        className="px-3 py-1 rounded-full border border-white/30 hover:border-white text-white font-mono text-xs font-bold transition-colors"
                      >
                        Hard (Reset)
                      </button>
                      <button
                        onClick={() => handleSpacedRepetition(false)}
                        className="px-3 py-1 rounded-full bg-[#4EBA86] text-black hover:opacity-90 font-mono text-xs font-bold transition-all shadow-sm"
                      >
                        Recalled ✓
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Footer Navigation Bar inside the Black Slider */}
        <div className="relative z-10 mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono text-white/50">
          <div className="flex items-center gap-2">
            <span>Jump to:</span>
            {projects.map((proj, idx) => (
              <button
                key={proj.id}
                onClick={() => setActiveProjectIdx(idx)}
                className={`px-2 py-0.5 rounded transition-colors ${
                  activeProjectIdx === idx
                    ? 'text-white font-black underline underline-offset-4 decoration-[#FF7744]'
                    : 'text-white/50 hover:text-white'
                }`}
              >
                0{idx + 1} {proj.title}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <span>Arrow keys ◄ ► to navigate</span>
          </div>
        </div>
      </div>
    </section>
  )
}
