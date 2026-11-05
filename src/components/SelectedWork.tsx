import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

export function SelectedWork() {
  const [activeSceneIndex, setActiveSceneIndex] = useState(0)
  const projects = PORTFOLIO_CONFIG.projects
  const activeProject = projects[activeSceneIndex]

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        setActiveSceneIndex((prev) => (prev + 1) % projects.length)
      } else if (e.key === 'ArrowLeft') {
        setActiveSceneIndex((prev) => (prev - 1 + projects.length) % projects.length)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [projects.length])

  // RepoPilot interactive demo state
  const [selectedNode, setSelectedNode] = useState<{
    id: string
    name: string
    file: string
    line: number
    commit: string
  } | null>({
    id: 'ast',
    name: 'SymbolExtractor',
    file: 'src/indexer/ast.ts',
    line: 142,
    commit: '7f3a9b2',
  })

  // HireFlow interactive demo state
  const [resumeParsed, setResumeParsed] = useState(false)
  const [parsingStep, setParsingStep] = useState(0)

  const handleParseSample = () => {
    setResumeParsed(false)
    setParsingStep(1)
    setTimeout(() => setParsingStep(2), 450)
    setTimeout(() => {
      setParsingStep(3)
      setResumeParsed(true)
    }, 900)
  }

  // UniLang Web Audio demo state
  const [audioPlaying, setAudioPlaying] = useState(false)
  const [cardInterval, setCardInterval] = useState('1d')
  const [reviewCount, setReviewCount] = useState(1)

  const playSynthesizedTone = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext
      if (!AudioCtx) return
      const ctx = new AudioCtx()
      const now = ctx.currentTime

      const osc = ctx.createOscillator()
      const gain = ctx.createGain()
      osc.type = 'triangle'
      osc.frequency.setValueAtTime(320, now)
      osc.frequency.exponentialRampToValueAtTime(540, now + 0.18)

      gain.gain.setValueAtTime(0.08, now)
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.35)

      osc.connect(gain)
      gain.connect(ctx.destination)
      osc.start(now)
      osc.stop(now + 0.35)

      setAudioPlaying(true)
      setTimeout(() => setAudioPlaying(false), 500)
    } catch {
      // Audio fallback
    }
  }

  const handleSpacedRepetition = (again: boolean) => {
    if (again) {
      setCardInterval('10m')
    } else {
      setReviewCount((prev) => prev + 1)
      setCardInterval(`${reviewCount * 3 + 1}d`)
    }
  }

  return (
    <section
      id="work"
      style={{ backgroundColor: activeProject.sceneBackground }}
      onMouseEnter={() => {
        window.dispatchEvent(
          new CustomEvent('dog-react', { detail: { action: 'idle-sit' } })
        )
      }}
      className="relative min-h-screen transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] py-20 px-6 sm:px-10 lg:px-16 flex flex-col justify-between"
    >
      {/* Top Header Rail */}
      <div className="max-w-[1440px] mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#ECE6D6]/12 pb-6 mb-12">
        <div className="flex items-center gap-3 font-mono text-xs text-[#FF5A2C] uppercase tracking-widest">
          <span>02</span>
          <span>/</span>
          <span>Selected Work</span>
          <span className="text-[#ECE6D6]/30">|</span>
          <span className="text-[#ECE6D6]/60">SCENE {activeProject.number} OF 03</span>
        </div>

        <div className="font-mono text-xs text-[#ECE6D6]/50 mt-2 sm:mt-0">
          USE [← / →] OR CLICK NUMBERS BELOW
        </div>
      </div>

      {/* Main Scene Body */}
      <div className="max-w-[1440px] mx-auto w-full my-auto py-6">
        <AnimatePresence mode="wait">
          {/* SCENE 01: RepoPilot */}
          {activeProject.id === 'repopilot' && (
            <motion.div
              key="repopilot"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              {/* Left Column: Context & Decisions */}
              <div className="lg:col-span-6 space-y-6">
                <span className="font-mono text-xs text-[#38BDF8] uppercase tracking-wider block">
                  01 — Flagship Platform / 2024
                </span>

                <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold text-[#ECE6D6] leading-[0.95] tracking-tight">
                  RepoPilot
                </h2>

                <p className="font-text text-base sm:text-lg text-[#ECE6D6]/80 font-light leading-relaxed">
                  {activeProject.brief}
                </p>

                {/* Built with as running text, slashes, NO chips */}
                <div className="pt-4 border-t border-[#ECE6D6]/12">
                  <span className="font-mono text-xs text-[#ECE6D6]/50 uppercase tracking-widest block mb-2">
                    Built With
                  </span>
                  <p className="font-mono text-xs sm:text-sm text-[#ECE6D6]/90 leading-relaxed">
                    {activeProject.builtWith.join('  /  ')}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="pt-4 border-t border-[#ECE6D6]/12">
                  <span className="font-mono text-xs text-[#ECE6D6]/50 uppercase tracking-widest block mb-3">
                    Key Decisions
                  </span>
                  <ul className="space-y-2.5 font-text text-sm text-[#ECE6D6]/80">
                    {activeProject.keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs text-[#FF5A2C]">0{idx + 1}.</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plain Links */}
                <div className="pt-6 flex items-center gap-6 font-mono text-xs tracking-tight">
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vermilion-link"
                  >
                    Source on GitHub →
                  </a>
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vermilion-link text-[#38BDF8]"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Working Mini-Demo (File & Symbol Dependency Tree) */}
              <div className="lg:col-span-6 bg-[#0E1411]/80 border border-[#ECE6D6]/12 p-6 sm:p-8 rounded-xl relative select-none">
                <div className="flex items-center justify-between font-mono text-xs text-[#ECE6D6]/50 mb-6 border-b border-[#ECE6D6]/10 pb-3">
                  <span className="text-[#38BDF8]">AST Symbol Dependency Graph</span>
                  <span>Click symbol to inspect citation</span>
                </div>

                {/* Interactive Symbol Nodes */}
                <div className="grid grid-cols-2 gap-3 mb-6">
                  {[
                    { id: 'ast', name: 'SymbolExtractor', file: 'src/indexer/ast.ts', line: 142, commit: '7f3a9b2' },
                    { id: 'search', name: 'RankedSearch', file: 'src/core/search.ts', line: 88, commit: '7f3a9b2' },
                    { id: 'diff', name: 'MemorySandbox', file: 'src/diff/sandbox.ts', line: 204, commit: '7f3a9b2' },
                    { id: 'graph', name: '3DArchitecture', file: 'src/visual/graph.ts', line: 56, commit: '7f3a9b2' },
                  ].map((node) => (
                    <button
                      key={node.id}
                      onClick={() => setSelectedNode(node)}
                      className={`p-3 text-left font-mono text-xs border transition-all ${
                        selectedNode?.id === node.id
                          ? 'border-[#38BDF8] bg-[#38BDF8]/10 text-[#ECE6D6]'
                          : 'border-[#ECE6D6]/10 bg-[#0E1411]/50 text-[#ECE6D6]/70 hover:border-[#ECE6D6]/30'
                      }`}
                    >
                      <div className="text-[10px] text-[#38BDF8]">fn()</div>
                      <div className="font-semibold mt-1">{node.name}</div>
                    </button>
                  ))}
                </div>

                {/* Grounded Citation Popover */}
                {selectedNode && (
                  <div className="p-4 rounded-lg bg-[#0B1220] border border-[#38BDF8]/40 font-mono text-xs space-y-2 animate-in fade-in">
                    <div className="flex items-center justify-between text-[#38BDF8] text-[11px]">
                      <span>VERIFIED CITATION</span>
                      <span>IMMUTABLE SHA</span>
                    </div>
                    <div className="text-[#ECE6D6] text-sm font-semibold">
                      {selectedNode.file}:{selectedNode.line}
                    </div>
                    <div className="text-[#ECE6D6]/60 text-[11px] flex justify-between">
                      <span>Commit: {selectedNode.commit}</span>
                      <span className="text-[#4ADE80]">Zero LLM Hallucination</span>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* SCENE 02: HireFlow */}
          {activeProject.id === 'hireflow' && (
            <motion.div
              key="hireflow"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              {/* Left Column: Context & Invariants */}
              <div className="lg:col-span-6 space-y-6">
                <span className="font-mono text-xs text-[#4ADE80] uppercase tracking-wider block">
                  02 — Privacy-First Systems / 2024
                </span>

                <h2 className="font-display text-[clamp(2.5rem,6vw,5.5rem)] font-bold text-[#ECE6D6] leading-[0.95] tracking-tight">
                  HireFlow
                </h2>

                <p className="font-text text-base sm:text-lg text-[#ECE6D6]/80 font-light leading-relaxed">
                  {activeProject.brief}
                </p>

                {/* Built with as running text, slashes, NO chips */}
                <div className="pt-4 border-t border-[#ECE6D6]/12">
                  <span className="font-mono text-xs text-[#ECE6D6]/50 uppercase tracking-widest block mb-2">
                    Built With
                  </span>
                  <p className="font-mono text-xs sm:text-sm text-[#ECE6D6]/90 leading-relaxed">
                    {activeProject.builtWith.join('  /  ')}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="pt-4 border-t border-[#ECE6D6]/12">
                  <span className="font-mono text-xs text-[#ECE6D6]/50 uppercase tracking-widest block mb-3">
                    Key Decisions
                  </span>
                  <ul className="space-y-2.5 font-text text-sm text-[#ECE6D6]/80">
                    {activeProject.keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs text-[#4ADE80]">0{idx + 1}.</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plain Links */}
                <div className="pt-6 flex items-center gap-6 font-mono text-xs tracking-tight">
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vermilion-link"
                  >
                    Source on GitHub →
                  </a>
                </div>
              </div>

              {/* Right Column: Working Mini-Demo (Client-Side ATS Parser & Drop Zone) */}
              <div className="lg:col-span-6 bg-[#0E1411]/80 border border-[#ECE6D6]/12 p-6 sm:p-8 rounded-xl relative">
                <div className="flex items-center justify-between font-mono text-xs text-[#ECE6D6]/50 mb-6 border-b border-[#ECE6D6]/10 pb-3">
                  <span className="text-[#4ADE80]">100% In-Browser ATS Diagnostic</span>
                  <span>Static Client-Side Sample</span>
                </div>

                {/* Drop Zone Box */}
                <div className="p-6 border border-dashed border-[#ECE6D6]/20 rounded-lg text-center mb-6">
                  <p className="font-mono text-xs text-[#ECE6D6]/70 mb-3">
                    Sample Resume: <span className="text-[#ECE6D6] font-semibold">candidate_systems_resume.pdf</span>
                  </p>
                  <button
                    onClick={handleParseSample}
                    className="px-4 py-2 rounded bg-[#1B2A1F] border border-[#4ADE80]/40 text-[#ECE6D6] font-mono text-xs hover:bg-[#4ADE80]/20 transition-colors"
                  >
                    {parsingStep > 0 && parsingStep < 3 ? 'Parsing binary stream...' : 'Run Client-Side Parsing'}
                  </button>
                </div>

                {/* Parse Results */}
                {resumeParsed && (
                  <div className="space-y-4 font-mono text-xs animate-in fade-in">
                    <div className="flex items-center justify-between p-3 rounded bg-[#1B2A1F]/60 border border-[#4ADE80]/30">
                      <span>Job Description Match Confidence</span>
                      <strong className="text-[#4ADE80] text-sm">86% MATCH</strong>
                    </div>

                    <div>
                      <div className="text-[11px] text-[#ECE6D6]/60 mb-1.5">VERBATIM EXTRACTED SECTIONS:</div>
                      <div className="text-[#ECE6D6] leading-relaxed">
                        Hard Skills, Fresher Readiness, Systems Invariants, Vitest Suites
                      </div>
                    </div>

                    <div>
                      <div className="text-[11px] text-[#FF5A2C] mb-1.5">IDENTIFIED RECRUITER SKILL GAPS:</div>
                      <div className="text-[#FF5A2C] font-semibold">
                        Distributed Cache, Kernel Bypass (eBPF)
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* SCENE 03: UniLang */}
          {activeProject.id === 'unilang' && (
            <motion.div
              key="unilang"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -18 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              {/* Left Column: Context (Quieter, smaller weight) */}
              <div className="lg:col-span-6 space-y-6">
                <span className="font-mono text-xs text-[#FB923C] uppercase tracking-wider block">
                  03 — Linguistic Acoustics / 2024
                </span>

                <h2 className="font-display text-[clamp(2.2rem,5vw,4.5rem)] font-bold text-[#ECE6D6] leading-[0.95] tracking-tight">
                  UniLang
                </h2>

                <p className="font-text text-sm sm:text-base text-[#ECE6D6]/70 font-light leading-relaxed">
                  {activeProject.brief}
                </p>

                {/* Built with */}
                <div className="pt-4 border-t border-[#ECE6D6]/12">
                  <span className="font-mono text-xs text-[#ECE6D6]/50 uppercase tracking-widest block mb-2">
                    Built With
                  </span>
                  <p className="font-mono text-xs sm:text-sm text-[#ECE6D6]/90 leading-relaxed">
                    {activeProject.builtWith.join('  /  ')}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="pt-4 border-t border-[#ECE6D6]/12">
                  <span className="font-mono text-xs text-[#ECE6D6]/50 uppercase tracking-widest block mb-3">
                    Key Decisions
                  </span>
                  <ul className="space-y-2.5 font-text text-sm text-[#ECE6D6]/80">
                    {activeProject.keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs text-[#FB923C]">0{idx + 1}.</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plain Links */}
                <div className="pt-6 flex items-center gap-6 font-mono text-xs tracking-tight">
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="vermilion-link"
                  >
                    Source on GitHub →
                  </a>
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="vermilion-link text-[#FB923C]"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Working Mini-Demo (Spaced-Repetition & Web Audio Acoustic Synthesizer) */}
              <div className="lg:col-span-6 bg-[#0E1411]/80 border border-[#ECE6D6]/12 p-6 sm:p-8 rounded-xl relative">
                <div className="flex items-center justify-between font-mono text-xs text-[#ECE6D6]/50 mb-6 border-b border-[#ECE6D6]/10 pb-3">
                  <span className="text-[#FB923C]">Acoustic Pronunciation & Spaced Recall</span>
                  <span>Web Audio API</span>
                </div>

                {/* Word Card */}
                <div className="p-8 border border-[#ECE6D6]/14 rounded-lg bg-[#3A1F18]/40 text-center mb-6">
                  <div className="font-mono text-xs text-[#FB923C] mb-2">PORTUGUESE CONCEPT</div>
                  <div className="font-serif text-3xl sm:text-4xl italic text-[#ECE6D6] mb-2">Saudade</div>
                  <div className="font-text text-sm text-[#ECE6D6]/70 mb-6">
                    A profound state of nostalgic longing for an absent thing or person.
                  </div>

                  <div className="flex items-center justify-center gap-4">
                    <button
                      onClick={playSynthesizedTone}
                      className="px-4 py-2 rounded bg-[#FB923C] text-[#0E1411] font-mono text-xs font-bold hover:bg-[#FB923C]/90 transition-all flex items-center gap-2"
                    >
                      <span>Hear Pronunciation</span>
                      <span className={audioPlaying ? 'animate-spin' : ''}>♪</span>
                    </button>
                  </div>
                </div>

                {/* Spaced Repetition Rescheduler */}
                <div className="flex items-center justify-between pt-4 border-t border-[#ECE6D6]/10 font-mono text-xs text-[#ECE6D6]/70">
                  <span>Current Interval: <strong className="text-[#FB923C]">{cardInterval}</strong></span>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleSpacedRepetition(true)}
                      className="px-3 py-1 rounded border border-[#ECE6D6]/20 hover:border-[#FF5A2C] transition-colors"
                    >
                      Again
                    </button>
                    <button
                      onClick={() => handleSpacedRepetition(false)}
                      className="px-3 py-1 rounded bg-[#ECE6D6]/10 border border-[#ECE6D6]/30 text-[#ECE6D6] hover:bg-[#ECE6D6]/20 transition-colors"
                    >
                      Got it
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Bottom Scene Indicators & Progress */}
      <div className="max-w-[1440px] mx-auto w-full pt-8 border-t border-[#ECE6D6]/12 flex items-center justify-between font-mono text-xs">
        <div className="flex items-center gap-6">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setActiveSceneIndex(idx)}
              className={`transition-colors py-1 ${
                activeSceneIndex === idx
                  ? 'text-[#FF5A2C] font-bold border-b-2 border-[#FF5A2C]'
                  : 'text-[#ECE6D6]/40 hover:text-[#ECE6D6]'
              }`}
            >
              {proj.number} {proj.title}
            </button>
          ))}
        </div>

        <div className="text-[#ECE6D6]/40 hidden sm:block">
          HOLD 60FPS · NATIVE HARDWARE ACCELERATION
        </div>
      </div>
    </section>
  )
}
