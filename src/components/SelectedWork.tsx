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
    purpose: string
  }>({
    id: 'ast',
    name: 'SymbolExtractor',
    file: 'src/indexer/ast.ts',
    line: 142,
    commit: '7f3a9b2',
    purpose: 'Extracts deterministic in-memory AST symbol graphs across languages.',
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
  const [cardInterval, setCardInterval] = useState('1 day')
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
      setCardInterval('10 minutes')
    } else {
      setReviewCount((prev) => prev + 1)
      setCardInterval(`${reviewCount * 3 + 1} days`)
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
      className="relative min-h-screen transition-colors duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] py-20 px-6 sm:px-10 lg:px-16 flex flex-col justify-between text-[#1F1A14]"
    >
      {/* Top Header Rail */}
      <div className="max-w-[1440px] mx-auto w-full flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#1F1A14]/14 pb-6 mb-12">
        <div className="flex items-center gap-3 font-text text-[13px] text-[#B4441F]">
          <span className="font-mono text-xs">02</span>
          <span>/</span>
          <span>Selected work</span>
          <span className="text-[#1F1A14]/25">|</span>
          <span className="text-[#6B6254]">Project {activeProject.number} of 03</span>
        </div>

        <div className="font-text text-[13px] text-[#6B6254] mt-2 sm:mt-0">
          Drag, scroll or use the arrow keys
        </div>
      </div>

      {/* Main Scene Body (NO BOXES, NO PANELS!) */}
      <div className="max-w-[1440px] mx-auto w-full my-auto py-6">
        <AnimatePresence mode="wait">
          {/* SCENE 01: RepoPilot */}
          {activeProject.id === 'repopilot' && (
            <motion.div
              key="repopilot"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              {/* Left Column: Context & Decisions */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2 font-mono text-xs text-[#5E6B3A]">
                  <span>01</span>
                  <span>•</span>
                  <span>2024</span>
                </div>

                <h2 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-bold text-[#1F1A14] leading-[0.95] tracking-tight">
                  RepoPilot
                </h2>

                <p className="font-text text-base sm:text-lg text-[#1F1A14]/85 font-normal leading-relaxed">
                  {activeProject.brief}
                </p>

                {/* Built with as running text, slashes, NO chips */}
                <div className="pt-4 border-t border-[#1F1A14]/14">
                  <span className="font-text text-[13px] text-[#6B6254] block mb-2 font-medium">
                    Built with
                  </span>
                  <p className="font-text text-sm text-[#1F1A14] leading-relaxed">
                    {activeProject.builtWith.join('  /  ')}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="pt-4 border-t border-[#1F1A14]/14">
                  <span className="font-text text-[13px] text-[#6B6254] block mb-3 font-medium">
                    Key decisions
                  </span>
                  <ul className="space-y-2.5 font-text text-sm text-[#1F1A14]/85">
                    {activeProject.keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs text-[#B4441F]">0{idx + 1}.</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plain Links */}
                <div className="pt-6 flex items-center gap-6 font-text text-sm">
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terracotta-link font-medium"
                  >
                    Source on GitHub →
                  </a>
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terracotta-link text-[#B4441F]"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Working Mini-Demo (NO BOXES, NO PANELS!) */}
              <div className="lg:col-span-6 space-y-6 pt-2">
                <div className="flex items-center justify-between font-text text-[13px] text-[#6B6254] border-b border-[#1F1A14]/14 pb-3">
                  <span className="text-[#B4441F] font-medium">AST symbol dependency graph</span>
                  <span>Select a symbol to inspect citation</span>
                </div>

                {/* Plain Text Rows with terracotta dot for active state (No boxes!) */}
                <div className="divide-y divide-[#1F1A14]/10 border-b border-[#1F1A14]/14">
                  {[
                    { id: 'ast', name: 'SymbolExtractor', file: 'src/indexer/ast.ts', line: 142, commit: '7f3a9b2', purpose: 'Extracts deterministic in-memory AST symbol graphs across languages.' },
                    { id: 'search', name: 'RankedSearch', file: 'src/core/search.ts', line: 88, commit: '7f3a9b2', purpose: 'Scores repository terms locally using token distance metrics.' },
                    { id: 'diff', name: 'MemorySandbox', file: 'src/diff/sandbox.ts', line: 204, commit: '7f3a9b2', purpose: 'Validates proposed code changes against pinned commit line ranges.' },
                    { id: 'graph', name: 'ArchitectureGraph', file: 'src/visual/graph.ts', line: 56, commit: '7f3a9b2', purpose: 'Maps component dependency edges without cloud API latency.' },
                  ].map((node) => {
                    const isSelected = selectedNode?.id === node.id
                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className="w-full py-3.5 flex items-center justify-between text-left group transition-colors"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-2 h-2 rounded-full transition-transform ${
                              isSelected ? 'bg-[#B4441F] scale-125' : 'bg-[#1F1A14]/20 group-hover:bg-[#B4441F]/60'
                            }`}
                          />
                          <span
                            className={`font-text text-sm transition-colors ${
                              isSelected ? 'text-[#B4441F] font-semibold' : 'text-[#1F1A14] group-hover:text-[#B4441F]'
                            }`}
                          >
                            {node.name}
                          </span>
                        </div>
                        <span className="font-mono text-xs text-[#6B6254] group-hover:underline">
                          {node.file}
                        </span>
                      </button>
                    )
                  })}
                </div>

                {/* Grounded Citation Display (Directly on background, separated by hairlines) */}
                {selectedNode && (
                  <div className="pt-4 border-t border-[#1F1A14]/14 space-y-2 font-text text-sm">
                    <div className="flex items-center justify-between text-[#B4441F] text-xs font-medium">
                      <span>Verified citation</span>
                      <span className="font-mono">Commit: {selectedNode.commit}</span>
                    </div>
                    <div className="font-mono text-xs text-[#1F1A14] font-semibold">
                      {selectedNode.file}:{selectedNode.line}
                    </div>
                    <p className="text-xs text-[#6B6254] leading-relaxed">
                      {selectedNode.purpose} Every citation is tied to an immutable commit SHA.
                    </p>
                  </div>
                )}
              </div>
            </motion.div>
          )}

          {/* SCENE 02: HireFlow */}
          {activeProject.id === 'hireflow' && (
            <motion.div
              key="hireflow"
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              {/* Left Column: Context & Invariants */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2 font-mono text-xs text-[#5E6B3A]">
                  <span>02</span>
                  <span>•</span>
                  <span>2024</span>
                </div>

                <h2 className="font-display text-[clamp(2.5rem,5.5vw,5rem)] font-bold text-[#1F1A14] leading-[0.95] tracking-tight">
                  HireFlow
                </h2>

                <p className="font-text text-base sm:text-lg text-[#1F1A14]/85 font-normal leading-relaxed">
                  {activeProject.brief}
                </p>

                {/* Built with as running text, slashes, NO chips */}
                <div className="pt-4 border-t border-[#1F1A14]/14">
                  <span className="font-text text-[13px] text-[#6B6254] block mb-2 font-medium">
                    Built with
                  </span>
                  <p className="font-text text-sm text-[#1F1A14] leading-relaxed">
                    {activeProject.builtWith.join('  /  ')}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="pt-4 border-t border-[#1F1A14]/14">
                  <span className="font-text text-[13px] text-[#6B6254] block mb-3 font-medium">
                    Key decisions
                  </span>
                  <ul className="space-y-2.5 font-text text-sm text-[#1F1A14]/85">
                    {activeProject.keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs text-[#B4441F]">0{idx + 1}.</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plain Links */}
                <div className="pt-6 flex items-center gap-6 font-text text-sm">
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terracotta-link font-medium"
                  >
                    Source on GitHub →
                  </a>
                </div>
              </div>

              {/* Right Column: Working Mini-Demo (NO BOXES, NO PANELS!) */}
              <div className="lg:col-span-6 space-y-6 pt-2">
                <div className="flex items-center justify-between font-text text-[13px] text-[#6B6254] border-b border-[#1F1A14]/14 pb-3">
                  <span className="text-[#5E6B3A] font-medium">Client-side resume parser</span>
                  <span>Static sample evaluation</span>
                </div>

                {/* Plain Text Trigger Area (No boxes!) */}
                <div className="py-4 border-b border-[#1F1A14]/14 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                  <div>
                    <div className="font-text text-sm font-semibold text-[#1F1A14]">
                      candidate_systems_resume.pdf
                    </div>
                    <div className="text-xs text-[#6B6254] mt-0.5">
                      Evaluated directly in browser memory without server upload
                    </div>
                  </div>
                  <button
                    onClick={handleParseSample}
                    className="self-start sm:self-auto px-4 py-2 border border-[#1F1A14]/20 hover:border-[#B4441F] text-[#1F1A14] hover:text-[#B4441F] font-text text-xs transition-colors"
                  >
                    {parsingStep > 0 && parsingStep < 3 ? 'Parsing stream...' : 'Run sample diagnostic'}
                  </button>
                </div>

                {/* Parse Results directly on scene background */}
                {resumeParsed && (
                  <div className="space-y-5 pt-2 animate-in fade-in">
                    <div className="flex items-baseline justify-between border-b border-[#1F1A14]/10 pb-3">
                      <span className="text-sm font-text text-[#1F1A14]">Job description evidence ratio</span>
                      <strong className="text-[#5E6B3A] text-lg font-display">86% match</strong>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-text text-[#6B6254] font-medium">Extracted sections:</div>
                      <div className="text-sm text-[#1F1A14]">
                        Hard Skills, Systems Invariants, Vitest Suites, Education
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs font-text text-[#B4441F] font-medium">Missing requirements:</div>
                      <div className="text-sm text-[#B4441F]">
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
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -14 }}
              transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start"
            >
              {/* Left Column: Context (Quieter, smaller weight) */}
              <div className="lg:col-span-6 space-y-6">
                <div className="flex items-center gap-2 font-mono text-xs text-[#5E6B3A]">
                  <span>03</span>
                  <span>•</span>
                  <span>2024</span>
                </div>

                <h2 className="font-display text-[clamp(2.2rem,4.5vw,4.2rem)] font-bold text-[#1F1A14] leading-[0.95] tracking-tight">
                  UniLang
                </h2>

                <p className="font-text text-sm sm:text-base text-[#1F1A14]/80 font-normal leading-relaxed">
                  {activeProject.brief}
                </p>

                {/* Built with */}
                <div className="pt-4 border-t border-[#1F1A14]/14">
                  <span className="font-text text-[13px] text-[#6B6254] block mb-2 font-medium">
                    Built with
                  </span>
                  <p className="font-text text-sm text-[#1F1A14] leading-relaxed">
                    {activeProject.builtWith.join('  /  ')}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="pt-4 border-t border-[#1F1A14]/14">
                  <span className="font-text text-[13px] text-[#6B6254] block mb-3 font-medium">
                    Key decisions
                  </span>
                  <ul className="space-y-2.5 font-text text-sm text-[#1F1A14]/85">
                    {activeProject.keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs text-[#B4441F]">0{idx + 1}.</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plain Links */}
                <div className="pt-6 flex items-center gap-6 font-text text-sm">
                  <a
                    href={activeProject.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terracotta-link font-medium"
                  >
                    Source on GitHub →
                  </a>
                  {activeProject.liveUrl && (
                    <a
                      href={activeProject.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terracotta-link text-[#B4441F]"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Working Mini-Demo (NO BOXES, NO PANELS!) */}
              <div className="lg:col-span-6 space-y-6 pt-2">
                <div className="flex items-center justify-between font-text text-[13px] text-[#6B6254] border-b border-[#1F1A14]/14 pb-3">
                  <span className="text-[#B4441F] font-medium">Acoustic pronunciation & spaced recall</span>
                  <span>Web Audio API</span>
                </div>

                {/* Word Display directly on background */}
                <div className="py-6 border-b border-[#1F1A14]/14 space-y-3">
                  <div className="font-text text-xs text-[#5E6B3A] font-medium">Portuguese cultural concept</div>
                  <div className="font-serif text-3xl sm:text-4xl italic text-[#1F1A14]">Saudade</div>
                  <p className="font-text text-sm text-[#1F1A14]/80 max-w-md">
                    A state of nostalgic longing for an absent presence, person, or time.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={playSynthesizedTone}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-[#B4441F] text-[#B4441F] hover:bg-[#B4441F] hover:text-[#EAE2D1] font-text text-xs transition-colors"
                    >
                      <span>Hear pronunciation</span>
                      <span className={audioPlaying ? 'animate-spin' : ''}>♪</span>
                    </button>
                  </div>
                </div>

                {/* Spaced Repetition Rescheduler */}
                <div className="flex items-center justify-between pt-2 font-text text-xs text-[#6B6254]">
                  <span>Next interval: <strong className="text-[#1F1A14] font-mono">{cardInterval}</strong></span>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => handleSpacedRepetition(true)}
                      className="hover:text-[#B4441F] underline transition-colors"
                    >
                      Again
                    </button>
                    <button
                      onClick={() => handleSpacedRepetition(false)}
                      className="text-[#1F1A14] font-semibold underline hover:text-[#5E6B3A] transition-colors"
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
      <div className="max-w-[1440px] mx-auto w-full pt-8 border-t border-[#1F1A14]/14 flex items-center justify-between font-text text-xs">
        <div className="flex items-center gap-6">
          {projects.map((proj, idx) => (
            <button
              key={proj.id}
              onClick={() => setActiveSceneIndex(idx)}
              className={`transition-colors py-1 ${
                activeSceneIndex === idx
                  ? 'text-[#B4441F] font-bold border-b-2 border-[#B4441F]'
                  : 'text-[#6B6254] hover:text-[#1F1A14]'
              }`}
            >
              <span className="font-mono text-xs mr-1">{proj.number}</span>
              <span>{proj.title}</span>
            </button>
          ))}
        </div>

        <div className="text-[#6B6254] hidden sm:block">
          Select or use arrow keys
        </div>
      </div>
    </section>
  )
}
