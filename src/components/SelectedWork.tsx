import { useState, useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PORTFOLIO_CONFIG } from '../data/config'

gsap.registerPlugin(ScrollTrigger)

export function SelectedWork() {
  const projects = PORTFOLIO_CONFIG.projects
  const [activeSceneIndex, setActiveSceneIndex] = useState(0)

  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pinContainerRef = useRef<HTMLDivElement>(null)

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

  // Update dynamic CSS variables when scene changes
  const updateSceneTheme = (index: number) => {
    setActiveSceneIndex(index)
    const scene = projects[index]
    if (scene) {
      document.documentElement.style.setProperty('--scene-bg', scene.sceneBackground)
      if (scene.id === 'unilang') {
        document.documentElement.style.setProperty('--paw', 'rgba(31, 26, 20, 0.35)')
      } else {
        document.documentElement.style.setProperty('--paw', 'rgba(180, 68, 31, 0.5)')
      }
    }
  }

  // ScrollTrigger Horizontal Pinned Track Setup
  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    if (isMobile) {
      // Mobile uses vertical stacked flow
      return
    }

    const pinContainer = pinContainerRef.current
    const track = trackRef.current
    if (!pinContainer || !track) return

    const totalScenes = projects.length

    const trigger = ScrollTrigger.create({
      trigger: pinContainer,
      pin: true,
      start: 'top top+=72px',
      end: `+=${totalScenes * 1000}`,
      pinSpacing: true,
      anticipatePin: 1,
      invalidateOnRefresh: true,
      onEnter: () => {
        updateSceneTheme(0)
      },
      onEnterBack: () => {
        updateSceneTheme(totalScenes - 1)
      },
      onUpdate: (self) => {
        const progress = self.progress
        const newIndex = Math.min(
          totalScenes - 1,
          Math.round(progress * (totalScenes - 1))
        )
        updateSceneTheme(newIndex)

        // Translate track
        gsap.set(track, {
          xPercent: -progress * ((totalScenes - 1) / totalScenes) * 100,
        })
      },
      onLeave: () => {
        document.documentElement.style.setProperty('--scene-bg', '#EAE2D1')
        document.documentElement.style.setProperty('--paw', 'rgba(180, 68, 31, 0.5)')
      },
      onLeaveBack: () => {
        document.documentElement.style.setProperty('--scene-bg', '#EAE2D1')
        document.documentElement.style.setProperty('--paw', 'rgba(180, 68, 31, 0.5)')
      },
    })

    return () => {
      trigger.kill()
      document.documentElement.style.setProperty('--scene-bg', '#EAE2D1')
    }
  }, [projects.length])

  // Direct manual jump to scene
  const goToScene = (index: number) => {
    updateSceneTheme(index)
    const pinContainer = pinContainerRef.current
    if (pinContainer) {
      const isMobile = window.innerWidth < 1024
      if (isMobile) {
        const sceneEl = document.getElementById(`scene-${projects[index].id}`)
        sceneEl?.scrollIntoView({ behavior: 'smooth' })
      } else {
        const st = ScrollTrigger.getAll().find((t) => t.trigger === pinContainer)
        if (st) {
          const targetProgress = index / (projects.length - 1)
          const targetScroll = st.start + Math.max(5, targetProgress * (st.end - st.start))
          const lenis = (window as unknown as { lenis?: { scrollTo: (target: number, opts?: { immediate?: boolean }) => void } }).lenis
          if (lenis) {
            lenis.scrollTo(targetScroll, { immediate: false })
          } else {
            window.scrollTo({ top: targetScroll, behavior: 'smooth' })
          }
          updateSceneTheme(index)
        }
      }
    }
  }

  // Expose goToScene globally for programmatic navigation / testing
  useEffect(() => {
    ;(window as unknown as { __goToScene: (idx: number) => void; ScrollTrigger: typeof ScrollTrigger }).__goToScene = goToScene
    ;(window as unknown as { ScrollTrigger: typeof ScrollTrigger }).ScrollTrigger = ScrollTrigger
  }, [projects.length])

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') {
        const next = (activeSceneIndex + 1) % projects.length
        goToScene(next)
      } else if (e.key === 'ArrowLeft') {
        const prev = (activeSceneIndex - 1 + projects.length) % projects.length
        goToScene(prev)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [activeSceneIndex, projects.length])

  return (
    <div id="work" ref={sectionRef} className="relative w-full">
      {/* 1. NON-PINNED INTRO BLOCK (About 40vh tall) */}
      <div className="min-h-[40vh] flex flex-col justify-center px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full pt-20 pb-12">
        <div className="flex items-center gap-3 font-text text-sm text-[#B4441F] font-bold mb-3">
          <span className="font-mono text-xs">02</span>
          <span>/</span>
          <span>Selected work</span>
        </div>
        <h2 className="font-display text-[clamp(2.4rem,5vw,4.2rem)] font-extrabold text-[#1F1A14] tracking-tight leading-[1.05]">
          Three things I've built.
        </h2>
        <p className="font-text text-base sm:text-lg text-[#6B6254] mt-3 font-medium">
          Drag, scroll or use the arrow keys to explore each system.
        </p>
      </div>

      {/* 2. PINNED SCENE TRACK (overflow: clip, scenes sit off to the right, never visible before pin) */}
      <div
        ref={pinContainerRef}
        className="w-full h-[calc(100svh-var(--nav-h))] overflow-clip relative select-none"
      >
        {/* Track holding all 3 scenes */}
        <div
          ref={trackRef}
          className="flex lg:w-[300vw] h-full flex-col lg:flex-row will-change-transform"
        >
          {/* ===================== SCENE 01: REPOPILOT ===================== */}
          <div
            id="scene-repopilot"
            style={{ backgroundColor: projects[0].sceneBackground }}
            className="w-full lg:w-[100vw] h-[calc(100svh-var(--nav-h))] px-6 sm:px-10 lg:px-16 flex flex-col justify-between pt-[calc(var(--nav-h)+16px)] lg:pt-4 pb-16 lg:pb-10 relative overflow-hidden"
          >
            {/* Scene Header */}
            <div className="max-w-[1440px] mx-auto w-full flex justify-between items-baseline border-b border-[#1F1A14]/14 pb-2 sm:pb-3">
              <div className="flex items-center gap-3 font-text text-sm text-[#B4441F] font-bold">
                <span className="font-mono text-xs">01</span>
                <span>•</span>
                <span>Flagship Platform</span>
                <span className="text-[#1F1A14]/30">|</span>
                <span className="text-[#5E6B3A] font-semibold">2024</span>
              </div>
              <div className="font-text text-xs text-[#6B6254]">
                AST Symbol Extraction & Citation Verification
              </div>
            </div>

            {/* Scene Content (Vertically centered, fits 100svh - nav-h with NO clipping) */}
            <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center py-1 sm:py-2">
              {/* Left Column: Context, Stack, Decisions */}
              <div className="lg:col-span-6 space-y-2.5 sm:space-y-3">
                <h3 className="font-display text-[clamp(2.2rem,3.8vw,3.8rem)] font-extrabold text-[#1F1A14] leading-[0.95] tracking-tight">
                  RepoPilot
                </h3>

                <p className="font-text text-sm sm:text-base text-[#1F1A14]/90 font-medium leading-relaxed max-w-xl">
                  {projects[0].brief}
                </p>

                {/* Built with as running text, slashes, NO chips */}
                <div className="pt-2 border-t border-[#1F1A14]/14">
                  <span className="font-text text-xs font-bold text-[#5E6B3A] uppercase tracking-wider block mb-0.5">
                    Built with
                  </span>
                  <p className="font-text text-xs sm:text-sm font-semibold text-[#1F1A14] leading-relaxed">
                    {projects[0].builtWith.join('  /  ')}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="pt-2 border-t border-[#1F1A14]/14">
                  <span className="font-text text-xs font-bold text-[#5E6B3A] uppercase tracking-wider block mb-1">
                    Key decisions
                  </span>
                  <ul className="space-y-1 font-text text-xs sm:text-sm text-[#1F1A14]/90 font-medium">
                    {projects[0].keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-2">
                        <span className="font-mono text-xs text-[#B4441F] font-bold">0{idx + 1}.</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plain Links */}
                <div className="pt-2 flex items-center gap-6 font-text text-sm font-bold">
                  <a
                    href={projects[0].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terracotta-link"
                  >
                    Source on GitHub →
                  </a>
                  {projects[0].liveUrl && (
                    <a
                      href={projects[0].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terracotta-link text-[#B4441F]"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Working Demo (NO BOXES, NO PANELS!) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between font-text text-xs text-[#6B6254] border-b border-[#1F1A14]/14 pb-2">
                  <span className="text-[#B4441F] font-bold">Interactive AST Symbol Tree</span>
                  <span>Click symbol to inspect citation</span>
                </div>

                {/* Plain text rows with terracotta dot for active state (No boxes!) */}
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
                        className="w-full py-2.5 flex items-center justify-between text-left group transition-colors"
                      >
                        <div className="flex items-center gap-2.5">
                          <span
                            className={`w-2.5 h-2.5 rounded-full transition-transform ${
                              isSelected ? 'bg-[#B4441F] scale-125' : 'bg-[#1F1A14]/20 group-hover:bg-[#B4441F]/60'
                            }`}
                          />
                          <span
                            className={`font-text text-sm transition-colors ${
                              isSelected ? 'text-[#B4441F] font-bold' : 'text-[#1F1A14] font-medium group-hover:text-[#B4441F]'
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
                  <div className="pt-3 border-t border-[#1F1A14]/14 space-y-1.5 font-text text-sm">
                    <div className="flex items-center justify-between text-[#B4441F] text-xs font-bold">
                      <span>Verified citation</span>
                      <span className="font-mono">Commit: {selectedNode.commit}</span>
                    </div>
                    <div className="font-mono text-xs text-[#1F1A14] font-bold">
                      {selectedNode.file}:{selectedNode.line}
                    </div>
                    <p className="text-xs text-[#6B6254] font-medium leading-relaxed">
                      {selectedNode.purpose} Every citation is tied to an immutable commit SHA.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Pinned Bottom Progress Bar */}
            <div className="max-w-[1440px] mx-auto w-full pt-3 border-t border-[#1F1A14]/14 flex items-center justify-between font-text text-xs">
              <div className="flex items-center gap-6">
                {projects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => goToScene(idx)}
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
              <div className="text-[#6B6254] font-medium hidden sm:block">
                01 / 03 — RepoPilot
              </div>
            </div>
          </div>

          {/* ===================== SCENE 02: HIREFLOW ===================== */}
          <div
            id="scene-hireflow"
            style={{ backgroundColor: projects[1].sceneBackground }}
            className="w-full lg:w-[100vw] h-[calc(100svh-var(--nav-h))] px-6 sm:px-10 lg:px-16 flex flex-col justify-between pt-[calc(var(--nav-h)+16px)] lg:pt-4 pb-16 lg:pb-10 relative overflow-hidden"
          >
            {/* Scene Header */}
            <div className="max-w-[1440px] mx-auto w-full flex justify-between items-baseline border-b border-[#1F1A14]/14 pb-2 sm:pb-3">
              <div className="flex items-center gap-3 font-text text-sm text-[#5E6B3A] font-bold">
                <span className="font-mono text-xs">02</span>
                <span>•</span>
                <span>Client-Side Systems</span>
                <span className="text-[#1F1A14]/30">|</span>
                <span className="text-[#B4441F] font-semibold">2024</span>
              </div>
              <div className="font-text text-xs text-[#6B6254]">
                In-Browser PDF/DOCX Parsing & Deterministic Diagnostics
              </div>
            </div>

            {/* Scene Content */}
            <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center py-1 sm:py-2">
              {/* Left Column: Context, Stack, Decisions */}
              <div className="lg:col-span-6 space-y-2.5 sm:space-y-3">
                <h3 className="font-display text-[clamp(2.2rem,3.8vw,3.8rem)] font-extrabold text-[#1F1A14] leading-[0.95] tracking-tight">
                  HireFlow
                </h3>

                <p className="font-text text-sm sm:text-base text-[#1F1A14]/90 font-medium leading-relaxed max-w-xl">
                  {projects[1].brief}
                </p>

                {/* Built with */}
                <div className="pt-2 border-t border-[#1F1A14]/14">
                  <span className="font-text text-xs font-bold text-[#5E6B3A] uppercase tracking-wider block mb-0.5">
                    Built with
                  </span>
                  <p className="font-text text-xs sm:text-sm font-semibold text-[#1F1A14] leading-relaxed">
                    {projects[1].builtWith.join('  /  ')}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="pt-2 border-t border-[#1F1A14]/14">
                  <span className="font-text text-xs font-bold text-[#5E6B3A] uppercase tracking-wider block mb-1">
                    Key decisions
                  </span>
                  <ul className="space-y-1 font-text text-xs sm:text-sm text-[#1F1A14]/90 font-medium">
                    {projects[1].keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-2">
                        <span className="font-mono text-xs text-[#B4441F] font-bold">0{idx + 1}.</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plain Links */}
                <div className="pt-2 flex items-center gap-6 font-text text-sm font-bold">
                  <a
                    href={projects[1].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terracotta-link"
                  >
                    Source on GitHub →
                  </a>
                </div>
              </div>

              {/* Right Column: Working Demo (NO BOXES, NO PANELS!) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between font-text text-xs text-[#6B6254] border-b border-[#1F1A14]/14 pb-2">
                  <span className="text-[#5E6B3A] font-bold">Client-Side Resume Parser</span>
                  <span>Static sample evaluation</span>
                </div>

                {/* Plain Text Trigger Area */}
                <div className="py-3 border-b border-[#1F1A14]/14 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-text text-sm font-bold text-[#1F1A14]">
                      candidate_systems_resume.pdf
                    </div>
                    <div className="text-xs text-[#6B6254] font-medium">
                      Evaluated directly in browser memory without server upload
                    </div>
                  </div>
                  <button
                    onClick={handleParseSample}
                    className="self-start sm:self-auto px-4 py-2 border border-[#1F1A14]/20 hover:border-[#B4441F] text-[#1F1A14] hover:text-[#B4441F] font-text text-xs font-bold transition-colors"
                  >
                    {parsingStep > 0 && parsingStep < 3 ? 'Parsing binary stream...' : 'Run sample diagnostic'}
                  </button>
                </div>

                {/* Parse Results */}
                {resumeParsed && (
                  <div className="space-y-3 pt-1 animate-in fade-in">
                    <div className="flex items-baseline justify-between border-b border-[#1F1A14]/10 pb-2">
                      <span className="text-sm font-text font-bold text-[#1F1A14]">JD Evidence Match Ratio</span>
                      <strong className="text-[#5E6B3A] text-lg font-display font-extrabold">86% match</strong>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-xs font-text text-[#6B6254] font-bold">Extracted sections:</div>
                      <div className="text-sm text-[#1F1A14] font-medium">
                        Hard Skills, Systems Invariants, Vitest Suites, Education
                      </div>
                    </div>

                    <div className="space-y-0.5">
                      <div className="text-xs font-text text-[#B4441F] font-bold">Missing requirements:</div>
                      <div className="text-sm text-[#B4441F] font-semibold">
                        Distributed Cache, Kernel Bypass (eBPF)
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Pinned Bottom Progress Bar */}
            <div className="max-w-[1440px] mx-auto w-full pt-3 border-t border-[#1F1A14]/14 flex items-center justify-between font-text text-xs">
              <div className="flex items-center gap-6">
                {projects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => goToScene(idx)}
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
              <div className="text-[#6B6254] font-medium hidden sm:block">
                02 / 03 — HireFlow
              </div>
            </div>
          </div>

          {/* ===================== SCENE 03: UNILANG ===================== */}
          <div
            id="scene-unilang"
            style={{ backgroundColor: projects[2].sceneBackground }}
            className="w-full lg:w-[100vw] h-[calc(100svh-var(--nav-h))] px-6 sm:px-10 lg:px-16 flex flex-col justify-between pt-[calc(var(--nav-h)+16px)] lg:pt-4 pb-16 lg:pb-10 relative overflow-hidden"
          >
            {/* Scene Header */}
            <div className="max-w-[1440px] mx-auto w-full flex justify-between items-baseline border-b border-[#1F1A14]/14 pb-2 sm:pb-3">
              <div className="flex items-center gap-3 font-text text-sm text-[#B4441F] font-bold">
                <span className="font-mono text-xs">03</span>
                <span>•</span>
                <span>Acoustic Linguistics</span>
                <span className="text-[#1F1A14]/30">|</span>
                <span className="text-[#5E6B3A] font-semibold">2024</span>
              </div>
              <div className="font-text text-xs text-[#6B6254]">
                Web Audio Pronunciation Feedback & Spaced Repetition
              </div>
            </div>

            {/* Scene Content */}
            <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-12 items-center py-1 sm:py-2">
              {/* Left Column: Context, Stack, Decisions */}
              <div className="lg:col-span-6 space-y-2.5 sm:space-y-3">
                <h3 className="font-display text-[clamp(2.2rem,3.8vw,3.8rem)] font-extrabold text-[#1F1A14] leading-[0.95] tracking-tight">
                  UniLang
                </h3>

                <p className="font-text text-sm sm:text-base text-[#1F1A14]/90 font-medium leading-relaxed max-w-xl">
                  {projects[2].brief}
                </p>

                {/* Built with */}
                <div className="pt-2 border-t border-[#1F1A14]/14">
                  <span className="font-text text-xs font-bold text-[#5E6B3A] uppercase tracking-wider block mb-0.5">
                    Built with
                  </span>
                  <p className="font-text text-xs sm:text-sm font-semibold text-[#1F1A14] leading-relaxed">
                    {projects[2].builtWith.join('  /  ')}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="pt-2 border-t border-[#1F1A14]/14">
                  <span className="font-text text-xs font-bold text-[#5E6B3A] uppercase tracking-wider block mb-1">
                    Key decisions
                  </span>
                  <ul className="space-y-1 font-text text-xs sm:text-sm text-[#1F1A14]/90 font-medium">
                    {projects[2].keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-2">
                        <span className="font-mono text-xs text-[#B4441F] font-bold">0{idx + 1}.</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plain Links */}
                <div className="pt-3 flex items-center gap-6 font-text text-sm font-bold">
                  <a
                    href={projects[2].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="terracotta-link"
                  >
                    Source on GitHub →
                  </a>
                  {projects[2].liveUrl && (
                    <a
                      href={projects[2].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="terracotta-link text-[#B4441F]"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Working Demo (NO BOXES, NO PANELS!) */}
              <div className="lg:col-span-6 space-y-4">
                <div className="flex items-center justify-between font-text text-xs text-[#6B6254] border-b border-[#1F1A14]/14 pb-2">
                  <span className="text-[#B4441F] font-bold">Acoustic Pronunciation & Spaced Recall</span>
                  <span>Web Audio API</span>
                </div>

                {/* Word Display directly on scene background */}
                <div className="py-4 border-b border-[#1F1A14]/14 space-y-2">
                  <div className="font-text text-xs text-[#5E6B3A] font-bold">Portuguese cultural concept</div>
                  <div className="font-serif text-3xl sm:text-4xl italic font-bold text-[#1F1A14]">Saudade</div>
                  <p className="font-text text-sm text-[#1F1A14]/90 font-medium max-w-md">
                    A state of nostalgic longing for an absent presence, person, or time.
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={playSynthesizedTone}
                      className="inline-flex items-center gap-2 px-4 py-2 border border-[#B4441F] text-[#B4441F] hover:bg-[#B4441F] hover:text-[#EAE2D1] font-text text-xs font-bold transition-colors"
                    >
                      <span>Hear pronunciation</span>
                      <span className={audioPlaying ? 'animate-spin' : ''}>♪</span>
                    </button>
                  </div>
                </div>

                {/* Spaced Repetition Rescheduler */}
                <div className="flex items-center justify-between pt-2 font-text text-xs text-[#6B6254]">
                  <span className="font-medium">Next interval: <strong className="text-[#1F1A14] font-mono">{cardInterval}</strong></span>
                  <div className="flex items-center gap-3 font-bold">
                    <button
                      onClick={() => handleSpacedRepetition(true)}
                      className="hover:text-[#B4441F] underline transition-colors"
                    >
                      Again
                    </button>
                    <button
                      onClick={() => handleSpacedRepetition(false)}
                      className="text-[#1F1A14] underline hover:text-[#5E6B3A] transition-colors"
                    >
                      Got it
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Pinned Bottom Progress Bar */}
            <div className="max-w-[1440px] mx-auto w-full pt-3 border-t border-[#1F1A14]/14 flex items-center justify-between font-text text-xs">
              <div className="flex items-center gap-6">
                {projects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => goToScene(idx)}
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
              <div className="text-[#6B6254] font-medium hidden sm:block">
                03 / 03 — UniLang
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
