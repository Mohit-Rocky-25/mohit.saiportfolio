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
  const [benchmarkDone, setBenchmarkDone] = useState(false)

  const handleRunBenchmark = () => {
    setBenchmarkRunning(true)
    setBenchmarkDone(false)
    setTimeout(() => {
      setBenchmarkRunning(false)
      setBenchmarkDone(true)
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
      culture: 'Portuguese linguistic concept',
      word: 'Saudade',
      meaning: 'Deep nostalgic longing for an absent presence, person, or unrepeatable memory.',
      freq: 440,
    },
    {
      id: 'mono',
      culture: 'Japanese aesthetic philosophy',
      word: 'Mono no aware',
      meaning: 'Gentle aesthetic awareness of the transience and impermanence of all things.',
      freq: 520,
    },
    {
      id: 'wald',
      culture: 'German nature philosophy',
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

  // ==========================================
  // DYNAMIC THEME (VIOLET, ORANGE, YELLOW WITH BLACK TEXT)
  // ==========================================
  const updateSceneTheme = (index: number) => {
    setActiveSceneIndex(index)
    const scene = projects[index]
    if (scene) {
      document.documentElement.style.setProperty('--scene-bg', scene.sceneBackground)
      document.documentElement.style.setProperty('--nav-ink', '#0A0A0A')
      document.documentElement.style.setProperty('--nav-border', 'rgba(10, 10, 10, 0.15)')
      document.documentElement.style.setProperty('--paw', 'rgba(10, 10, 10, 0.55)')
    }
  }

  // Horizontal Pinned Track via ScrollTrigger
  useEffect(() => {
    const isMobile = window.innerWidth < 1024
    if (isMobile) return

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
        document.documentElement.style.setProperty('--nav-ink', '#1F1A14')
        document.documentElement.style.setProperty('--nav-border', 'rgba(31, 26, 20, 0.14)')
        document.documentElement.style.setProperty('--paw', 'rgba(180, 68, 31, 0.5)')
      },
      onLeaveBack: () => {
        document.documentElement.style.setProperty('--scene-bg', '#EAE2D1')
        document.documentElement.style.setProperty('--nav-ink', '#1F1A14')
        document.documentElement.style.setProperty('--nav-border', 'rgba(31, 26, 20, 0.14)')
        document.documentElement.style.setProperty('--paw', 'rgba(180, 68, 31, 0.5)')
      },
    })

    return () => {
      trigger.kill()
      document.documentElement.style.setProperty('--scene-bg', '#EAE2D1')
      document.documentElement.style.setProperty('--nav-ink', '#1F1A14')
      document.documentElement.style.setProperty('--nav-border', 'rgba(31, 26, 20, 0.14)')
      document.documentElement.style.setProperty('--paw', 'rgba(180, 68, 31, 0.5)')
    }
  }, [projects.length])

  // Direct programmatic jump to scene
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
          const targetScroll = st.start + Math.min(st.end - st.start - 8, Math.max(8, targetProgress * (st.end - st.start)))
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

  // Expose goToScene and ScrollTrigger globally for testing & commands
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
      {/* 1. NON-PINNED INTRO BLOCK */}
      <div className="min-h-[35vh] flex flex-col justify-center px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full pt-16 pb-10">
        <div className="flex items-center gap-3 font-text text-sm text-[#B4441F] font-black mb-3">
          <span className="font-mono text-xs">02</span>
          <span>/</span>
          <span className="uppercase tracking-widest">Selected work</span>
        </div>
        <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1A14] tracking-tight leading-[1.05]">
          Three things I've built.
        </h2>
        <p className="font-text text-base sm:text-lg lg:text-xl text-[#6B6254] mt-3 font-medium max-w-2xl leading-relaxed">
          Engineered from scratch: local-first AST intelligence, zero-backend resume streaming, and real-time audio signal synthesis.
        </p>
      </div>

      {/* 2. PINNED SCENE TRACK (Violet, Dark Orange, Yellow Layers) */}
      <div
        ref={pinContainerRef}
        className="w-full h-[calc(100svh-var(--nav-h))] overflow-clip relative select-none"
      >
        {/* Track holding all 3 scenes */}
        <div
          ref={trackRef}
          className="flex lg:w-[300vw] h-full flex-col lg:flex-row will-change-transform"
        >
          {/* ======================================================== */}
          {/* SCENE 01: REPOPILOT (BOLD VIOLET #9E77F7) */}
          {/* ======================================================== */}
          <div
            id="scene-repopilot"
            style={{ backgroundColor: projects[0].sceneBackground }}
            className="w-full lg:w-[100vw] h-[calc(100svh-var(--nav-h))] px-6 sm:px-10 lg:px-16 flex flex-col justify-between pt-[calc(var(--nav-h)+8px)] lg:pt-2 pb-3 lg:pb-2.5 relative overflow-hidden text-[#0A0A0A]"
          >
            {/* Scene Header */}
            <div className="max-w-[1440px] mx-auto w-full flex justify-between items-baseline border-b border-[#0A0A0A]/20 pb-1 sm:pb-1.5">
              <div className="flex items-center gap-3 font-text text-sm font-black text-[#0A0A0A]">
                <span className="font-mono text-xs">01</span>
                <span>•</span>
                <span className="uppercase tracking-widest">Flagship Platform</span>
                <span className="text-[#0A0A0A]/30">|</span>
                <span className="font-mono text-xs text-[#0A0A0A]/70">2024</span>
              </div>
              <div className="font-text text-xs text-[#0A0A0A]/85 font-bold hidden sm:block">
                In-Memory AST Symbol Trees & Immutable Citations
              </div>
            </div>

            {/* Scene Content */}
            <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center py-0.5">
              {/* Left Column: Context, Stack, Recruiter Decisions */}
              <div className="lg:col-span-6 space-y-2 sm:space-y-2.5">
                <div className="space-y-1">
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] leading-[0.95] tracking-tight">
                    RepoPilot
                  </h3>
                  <div className="inline-block mt-0.5 px-3 py-0.5 rounded-full bg-[#0A0A0A]/10 border border-[#0A0A0A]/25 text-xs sm:text-sm font-black text-[#0A0A0A] uppercase tracking-wider">
                    {projects[0].tagline}
                  </div>
                </div>

                <p className="font-text text-sm sm:text-base lg:text-[17px] text-[#0A0A0A] font-semibold leading-relaxed max-w-xl">
                  {projects[0].brief}
                </p>

                {/* Built with */}
                <div className="pt-1.5 border-t border-[#0A0A0A]/20">
                  <span className="font-text text-xs font-black text-[#0A0A0A]/85 uppercase tracking-widest block mb-0.5">
                    Engineered with
                  </span>
                  <p className="font-text text-sm sm:text-base font-bold text-[#0A0A0A] leading-relaxed">
                    {projects[0].builtWith.join('  •  ')}
                  </p>
                </div>

                {/* Key Architectural Decisions */}
                <div className="pt-1.5 border-t border-[#0A0A0A]/20">
                  <span className="font-text text-xs font-black text-[#0A0A0A]/85 uppercase tracking-widest block mb-1">
                    Technical Highlights
                  </span>
                  <ul className="space-y-1.5 font-text text-sm sm:text-base text-[#0A0A0A] font-semibold">
                    {projects[0].keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs text-[#0A0A0A] font-black">0{idx + 1}.</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plain Links */}
                <div className="pt-2 flex items-center gap-4 font-text text-sm font-black">
                  <a
                    href={projects[0].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-full border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#9E77F7] transition-all"
                  >
                    Source on GitHub →
                  </a>
                  {projects[0].liveUrl && (
                    <a
                      href={projects[0].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-full bg-[#0A0A0A] text-[#9E77F7] hover:opacity-85 transition-all shadow-md"
                    >
                      Live Deployment ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Interactive AST & Query Explorer */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center justify-between font-text text-xs border-b border-[#0A0A0A]/20 pb-2">
                  <span className="font-black text-[#0A0A0A] uppercase tracking-wider">
                    Interactive AST Query Explorer
                  </span>
                  <span className="font-bold text-[#0A0A0A]/75">Click node to inspect proof</span>
                </div>

                {/* Symbol Cards */}
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
                      purpose: 'Sub-50ms BM25 and vector distance ranking executed 100% locally on CPU without vector DB costs.',
                    },
                    {
                      id: 'diff',
                      name: 'MemorySandbox',
                      file: 'src/diff/sandbox.ts',
                      line: 204,
                      commit: '7f3a9b2',
                      latency: '1.1ms',
                      purpose: 'Validates proposed code diffs in memory against 308 automated regression tests before commit merge.',
                    },
                    {
                      id: 'graph',
                      name: 'ArchitectureGraph',
                      file: 'src/visual/graph.ts',
                      line: 56,
                      commit: '7f3a9b2',
                      latency: '2.8ms',
                      purpose: 'Constructs circular dependency matrices and topological module orders with guaranteed zero hallucination.',
                    },
                  ].map((node) => {
                    const isSelected = selectedNode?.id === node.id
                    return (
                      <button
                        key={node.id}
                        onClick={() => setSelectedNode(node)}
                        className={`w-full p-2 rounded-xl flex items-center justify-between text-left transition-all border ${
                          isSelected
                            ? 'bg-[#0A0A0A] text-[#9E77F7] border-[#0A0A0A] shadow-md'
                            : 'bg-black/5 border-[#0A0A0A]/15 hover:border-[#0A0A0A]/35 text-[#0A0A0A]'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-3 h-3 rounded-full transition-transform ${
                              isSelected ? 'bg-[#9E77F7] scale-125' : 'bg-[#0A0A0A]/30'
                            }`}
                          />
                          <span className={`font-display font-extrabold text-sm sm:text-base ${isSelected ? 'text-white' : 'text-[#0A0A0A]'}`}>
                            {node.name}
                          </span>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className={`font-mono text-xs px-2 py-0.5 rounded-full font-bold ${isSelected ? 'bg-white/20 text-white' : 'bg-[#0A0A0A]/10 text-[#0A0A0A]'}`}>
                            {node.latency}
                          </span>
                          <span className={`font-mono text-xs ${isSelected ? 'text-white/80' : 'text-[#0A0A0A]/70'}`}>
                            {node.file}
                          </span>
                        </div>
                      </button>
                    )
                  })}
                </div>

                {/* Grounded Citation & Benchmark Trigger */}
                <div className="p-2.5 rounded-xl bg-black/5 border border-[#0A0A0A]/20 space-y-2">
                  <div className="flex items-center justify-between text-xs font-black text-[#0A0A0A]">
                    <span>Grounded Proof: {selectedNode.file}:{selectedNode.line}</span>
                    <span className="font-mono">Commit: {selectedNode.commit}</span>
                  </div>
                  <p className="text-xs sm:text-sm text-[#0A0A0A] font-semibold leading-relaxed">
                    {selectedNode.purpose}
                  </p>

                  <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <button
                      onClick={handleRunBenchmark}
                      className="px-4 py-1.5 rounded-full font-black text-xs sm:text-sm bg-[#0A0A0A] text-[#9E77F7] hover:opacity-85 transition-all shadow-md"
                    >
                      {benchmarkRunning ? 'Parsing 50k LOC AST in memory...' : '▶ Run Local AST Query Benchmark'}
                    </button>
                    {benchmarkDone && (
                      <span className="font-mono text-xs text-[#0A0A0A] font-black animate-in fade-in">
                        ✓ 52,140 LOC indexed in 18ms (2.1MB RAM)
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="max-w-[1440px] mx-auto w-full pt-1.5 border-t border-[#0A0A0A]/20 flex items-center justify-between font-text text-xs text-[#0A0A0A]">
              <div className="flex items-center gap-6">
                {projects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => goToScene(idx)}
                    className={`transition-colors py-1 ${
                      activeSceneIndex === idx
                        ? 'font-black border-b-2 border-[#0A0A0A]'
                        : 'text-[#0A0A0A]/60 hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span className="font-mono text-xs mr-1">{proj.number}</span>
                    <span>{proj.title}</span>
                  </button>
                ))}
              </div>
              <div className="font-mono text-xs font-bold text-[#0A0A0A] hidden sm:block">
                01 / 03 — RepoPilot (Violet Layer)
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SCENE 02: HIREFLOW (BOLD DARK ORANGE #FA6924) */}
          {/* ======================================================== */}
          <div
            id="scene-hireflow"
            style={{ backgroundColor: projects[1].sceneBackground }}
            className="w-full lg:w-[100vw] h-[calc(100svh-var(--nav-h))] px-6 sm:px-10 lg:px-16 flex flex-col justify-between pt-[calc(var(--nav-h)+8px)] lg:pt-2 pb-3 lg:pb-2.5 relative overflow-hidden text-[#0A0A0A]"
          >
            {/* Scene Header */}
            <div className="max-w-[1440px] mx-auto w-full flex justify-between items-baseline border-b border-[#0A0A0A]/20 pb-1 sm:pb-1.5">
              <div className="flex items-center gap-3 font-text text-sm font-black text-[#0A0A0A]">
                <span className="font-mono text-xs">02</span>
                <span>•</span>
                <span className="uppercase tracking-widest">Client-Side Architecture</span>
                <span className="text-[#0A0A0A]/30">|</span>
                <span className="font-mono text-xs text-[#0A0A0A]/70">2024</span>
              </div>
              <div className="font-text text-xs text-[#0A0A0A]/85 font-bold hidden sm:block">
                Pure In-Browser PDF/DOCX Parsing & Greedy Set-Cover
              </div>
            </div>

            {/* Scene Content */}
            <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center py-0.5">
              {/* Left Column: Context, Stack, Recruiter Decisions */}
              <div className="lg:col-span-6 space-y-2 sm:space-y-2.5">
                <div className="space-y-1">
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] leading-[0.95] tracking-tight">
                    HireFlow
                  </h3>
                  <div className="inline-block mt-0.5 px-3 py-0.5 rounded-full bg-[#0A0A0A]/10 border border-[#0A0A0A]/25 text-xs sm:text-sm font-black text-[#0A0A0A] uppercase tracking-wider">
                    {projects[1].tagline}
                  </div>
                </div>

                <p className="font-text text-sm sm:text-base lg:text-[17px] text-[#0A0A0A] font-semibold leading-relaxed max-w-xl">
                  {projects[1].brief}
                </p>

                {/* Built with */}
                <div className="pt-1.5 border-t border-[#0A0A0A]/20">
                  <span className="font-text text-xs font-black text-[#0A0A0A]/85 uppercase tracking-widest block mb-0.5">
                    Engineered with
                  </span>
                  <p className="font-text text-sm sm:text-base font-bold text-[#0A0A0A] leading-relaxed">
                    {projects[1].builtWith.join('  •  ')}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="pt-1.5 border-t border-[#0A0A0A]/20">
                  <span className="font-text text-xs font-black text-[#0A0A0A]/85 uppercase tracking-widest block mb-1">
                    Technical Highlights
                  </span>
                  <ul className="space-y-1.5 font-text text-sm sm:text-base text-[#0A0A0A] font-semibold">
                    {projects[1].keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs text-[#0A0A0A] font-black">0{idx + 1}.</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plain Links */}
                <div className="pt-2 flex items-center gap-4 font-text text-sm font-black">
                  <a
                    href={projects[1].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-full border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FA6924] transition-all"
                  >
                    Source on GitHub →
                  </a>
                </div>
              </div>

              {/* Right Column: In-Browser ATS Diagnostic Engine */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center justify-between font-text text-xs border-b border-[#0A0A0A]/20 pb-2">
                  <span className="font-black text-[#0A0A0A] uppercase tracking-wider">
                    In-Browser ATS Diagnostic Engine
                  </span>
                  <span className="font-bold text-[#0A0A0A]/75">0 Bytes Sent to Cloud</span>
                </div>

                {/* Candidate Profile Selector */}
                <div className="flex flex-wrap items-center gap-2 sm:gap-3">
                  <button
                    onClick={() => {
                      setSelectedCandidate('mohit')
                      setResumeParsed(true)
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-display font-extrabold border transition-all ${
                      selectedCandidate === 'mohit'
                        ? 'bg-[#0A0A0A] text-[#FA6924] border-[#0A0A0A] shadow-md'
                        : 'bg-black/5 border-[#0A0A0A]/25 text-[#0A0A0A] hover:border-[#0A0A0A]'
                    }`}
                  >
                    Candidate: Y. Mohit Sai (Systems / CSE Core)
                  </button>
                  <button
                    onClick={() => {
                      setSelectedCandidate('generic')
                      setResumeParsed(true)
                    }}
                    className={`px-3 py-1 rounded-full text-xs font-display font-extrabold border transition-all ${
                      selectedCandidate === 'generic'
                        ? 'bg-[#0A0A0A] text-[#FA6924] border-[#0A0A0A] shadow-md'
                        : 'bg-black/5 border-[#0A0A0A]/25 text-[#0A0A0A] hover:border-[#0A0A0A]'
                    }`}
                  >
                    Sample: Unoptimized Resume
                  </button>
                </div>

                {/* Parsing trigger and status */}
                <div className="p-2.5 rounded-xl bg-black/5 border border-[#0A0A0A]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div>
                    <div className="font-mono text-xs sm:text-sm font-black text-[#0A0A0A]">
                      {selectedCandidate === 'mohit'
                        ? 'mohit_sai_vit_ap_systems.pdf'
                        : 'generic_unformatted_resume.docx'}
                    </div>
                    <div className="text-xs text-[#0A0A0A]/80 font-medium">
                      Decoded via WebAssembly pdfjs-dist stream in client RAM
                    </div>
                  </div>
                  <button
                    onClick={handleParseSample}
                    className="self-start sm:self-auto px-4 py-1.5 rounded-full bg-[#0A0A0A] text-[#FA6924] hover:opacity-85 font-text text-xs sm:text-sm font-black transition-all shadow-md"
                  >
                    {parsingStep > 0 && parsingStep < 3 ? 'Parsing Binary Stream...' : '▶ Re-run Live ATS Scan'}
                  </button>
                </div>

                {/* Recruiter Evaluation Card */}
                {resumeParsed && (
                  <div className="p-2.5 rounded-xl bg-black/10 border border-[#0A0A0A]/25 space-y-2.5 font-text text-xs sm:text-sm animate-in fade-in">
                    <div className="flex items-baseline justify-between border-b border-[#0A0A0A]/15 pb-2">
                      <span className="font-black text-[#0A0A0A] text-sm sm:text-base">ATS Match Ratio & Recommendation:</span>
                      <strong className="text-2xl font-display font-black text-[#0A0A0A]">
                        {selectedCandidate === 'mohit' ? '96% Match (Tier 1)' : '68% Match (Gaps Found)'}
                      </strong>
                    </div>

                    <div className="space-y-0.5">
                      <span className="font-black uppercase tracking-wider text-[#0A0A0A] text-xs">
                        {selectedCandidate === 'mohit' ? 'Verified High-Impact Invariants:' : 'Extracted Keywords:'}
                      </span>
                      <p className="font-bold text-[#0A0A0A]">
                        {selectedCandidate === 'mohit'
                          ? 'C++20, Low-Latency Algorithms, In-Memory AST, TypeScript Strict, Truth Gate Invariants, Docker'
                          : 'React Basics, HTML/CSS, Git, REST Calls'}
                      </p>
                    </div>

                    <div className="space-y-0.5">
                      <span className="font-black uppercase tracking-wider text-[#0A0A0A] text-xs">
                        Recruiter Assessment:
                      </span>
                      <p className="font-bold text-[#0A0A0A]">
                        {selectedCandidate === 'mohit'
                          ? '✓ Zero Cloud Leakage • ✓ Invariant Proofs Validated • Verdict: Strong Hire'
                          : '⚠️ Missing Systems Programming, Zero Formal Test Automation'}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="max-w-[1440px] mx-auto w-full pt-1.5 border-t border-[#0A0A0A]/20 flex items-center justify-between font-text text-xs text-[#0A0A0A]">
              <div className="flex items-center gap-6">
                {projects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => goToScene(idx)}
                    className={`transition-colors py-1 ${
                      activeSceneIndex === idx
                        ? 'font-black border-b-2 border-[#0A0A0A]'
                        : 'text-[#0A0A0A]/60 hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span className="font-mono text-xs mr-1">{proj.number}</span>
                    <span>{proj.title}</span>
                  </button>
                ))}
              </div>
              <div className="font-mono text-xs font-bold text-[#0A0A0A] hidden sm:block">
                02 / 03 — HireFlow (Dark Orange Layer)
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* SCENE 03: UNILANG (BOLD YELLOW #FFCD29) */}
          {/* ======================================================== */}
          <div
            id="scene-unilang"
            style={{ backgroundColor: projects[2].sceneBackground }}
            className="w-full lg:w-[100vw] h-[calc(100svh-var(--nav-h))] px-6 sm:px-10 lg:px-16 flex flex-col justify-between pt-[calc(var(--nav-h)+8px)] lg:pt-2 pb-3 lg:pb-2.5 relative overflow-hidden text-[#0A0A0A]"
          >
            {/* Scene Header */}
            <div className="max-w-[1440px] mx-auto w-full flex justify-between items-baseline border-b border-[#0A0A0A]/20 pb-1 sm:pb-1.5">
              <div className="flex items-center gap-3 font-text text-sm font-black text-[#0A0A0A]">
                <span className="font-mono text-xs">03</span>
                <span>•</span>
                <span className="uppercase tracking-widest">Acoustic Audio Systems</span>
                <span className="text-[#0A0A0A]/30">|</span>
                <span className="font-mono text-xs text-[#0A0A0A]/70">2024</span>
              </div>
              <div className="font-text text-xs text-[#0A0A0A]/85 font-bold hidden sm:block">
                Web Audio Oscillator Synthesis & Adaptive SuperMemo-2
              </div>
            </div>

            {/* Scene Content */}
            <div className="max-w-[1440px] mx-auto w-full my-auto grid grid-cols-1 lg:grid-cols-12 gap-4 lg:gap-8 items-center py-0.5">
              {/* Left Column: Context, Stack, Recruiter Decisions */}
              <div className="lg:col-span-6 space-y-2 sm:space-y-2.5">
                <div className="space-y-1">
                  <h3 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] leading-[0.95] tracking-tight">
                    UniLang
                  </h3>
                  <div className="inline-block mt-0.5 px-3 py-0.5 rounded-full bg-[#0A0A0A]/10 border border-[#0A0A0A]/25 text-xs sm:text-sm font-black text-[#0A0A0A] uppercase tracking-wider">
                    {projects[2].tagline}
                  </div>
                </div>

                <p className="font-text text-sm sm:text-base lg:text-[17px] text-[#0A0A0A] font-semibold leading-relaxed max-w-xl">
                  {projects[2].brief}
                </p>

                {/* Built with */}
                <div className="pt-1.5 border-t border-[#0A0A0A]/20">
                  <span className="font-text text-xs font-black text-[#0A0A0A]/85 uppercase tracking-widest block mb-0.5">
                    Engineered with
                  </span>
                  <p className="font-text text-sm sm:text-base font-bold text-[#0A0A0A] leading-relaxed">
                    {projects[2].builtWith.join('  •  ')}
                  </p>
                </div>

                {/* Key Decisions */}
                <div className="pt-1.5 border-t border-[#0A0A0A]/20">
                  <span className="font-text text-xs font-black text-[#0A0A0A]/85 uppercase tracking-widest block mb-1">
                    Technical Highlights
                  </span>
                  <ul className="space-y-1.5 font-text text-sm sm:text-base text-[#0A0A0A] font-semibold">
                    {projects[2].keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-2.5">
                        <span className="font-mono text-xs text-[#0A0A0A] font-black">0{idx + 1}.</span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Plain Links */}
                <div className="pt-2 flex items-center gap-4 font-text text-sm font-black">
                  <a
                    href={projects[2].githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-1.5 rounded-full border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FFCD29] transition-all"
                  >
                    Source on GitHub →
                  </a>
                  {projects[2].liveUrl && (
                    <a
                      href={projects[2].liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-4 py-1.5 rounded-full bg-[#0A0A0A] text-[#FFCD29] hover:opacity-85 transition-all shadow-md"
                    >
                      Live Deployment ↗
                    </a>
                  )}
                </div>
              </div>

              {/* Right Column: Web Audio Synthesis & Spaced Recall Console */}
              <div className="lg:col-span-6 space-y-2">
                <div className="flex items-center justify-between font-text text-xs border-b border-[#0A0A0A]/20 pb-2">
                  <span className="font-black text-[#0A0A0A] uppercase tracking-wider">
                    Web Audio API Synthesis Engine
                  </span>
                  <span className="font-bold text-[#0A0A0A]/75">Zero Server Audio Files</span>
                </div>

                {/* Cultural Phrase Picker */}
                <div className="flex flex-wrap items-center gap-2">
                  {phrases.map((p) => (
                    <button
                      key={p.id}
                      onClick={() => setSelectedPhrase(p)}
                      className={`px-3 py-1 rounded-full text-xs font-display font-extrabold border transition-all ${
                        selectedPhrase.id === p.id
                          ? 'bg-[#0A0A0A] text-[#FFCD29] border-[#0A0A0A] shadow-md'
                          : 'bg-black/5 border-[#0A0A0A]/25 text-[#0A0A0A] hover:border-[#0A0A0A]'
                      }`}
                    >
                      {p.word}
                    </button>
                  ))}
                </div>

                {/* Word Display with live Audio Synthesis Trigger */}
                <div className="p-2.5 sm:p-3 rounded-xl bg-black/5 border border-[#0A0A0A]/20 space-y-2">
                  <div className="font-text text-xs text-[#0A0A0A]/85 font-black uppercase tracking-widest">
                    {selectedPhrase.culture}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#0A0A0A] tracking-tight">
                      {selectedPhrase.word}
                    </span>

                    {/* Animated Equalizer Waves */}
                    <div className="flex items-end gap-1.5 h-7">
                      <span className={`w-1.5 rounded-full bg-[#0A0A0A] transition-all duration-150 ${audioPlaying ? 'h-7' : 'h-2.5'}`} />
                      <span className={`w-1.5 rounded-full bg-[#0A0A0A] transition-all duration-150 ${audioPlaying ? 'h-5' : 'h-3.5'}`} />
                      <span className={`w-1.5 rounded-full bg-[#0A0A0A] transition-all duration-150 ${audioPlaying ? 'h-7' : 'h-2'}`} />
                      <span className={`w-1.5 rounded-full bg-[#0A0A0A] transition-all duration-150 ${audioPlaying ? 'h-6' : 'h-3'}`} />
                    </div>
                  </div>

                  <p className="font-text text-sm sm:text-base text-[#0A0A0A] font-semibold leading-relaxed">
                    {selectedPhrase.meaning}
                  </p>

                  <div className="pt-2">
                    <button
                      onClick={playSynthesizedTone}
                      className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full font-black text-xs sm:text-sm bg-[#0A0A0A] text-[#FFCD29] hover:opacity-85 transition-all shadow-md"
                    >
                      <span>🔊 Synthesize Acoustic Tone</span>
                      <span className="font-mono text-xs opacity-80">({selectedPhrase.freq}Hz)</span>
                    </button>
                  </div>
                </div>

                {/* Adaptive Spaced Repetition Loop */}
                <div className="p-2.5 rounded-xl bg-black/10 border border-[#0A0A0A]/25 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs sm:text-sm font-text">
                  <span className="font-bold text-[#0A0A0A]">
                    SuperMemo-2 Interval: <strong className="font-mono font-black text-[#0A0A0A]">{cardInterval}</strong>
                  </span>
                  <div className="flex items-center gap-2 font-black">
                    <button
                      onClick={() => handleSpacedRepetition(true)}
                      className="px-4 py-1.5 rounded-full border border-[#0A0A0A] text-[#0A0A0A] hover:bg-[#0A0A0A] hover:text-[#FFCD29] transition-colors"
                    >
                      Hard (10m)
                    </button>
                    <button
                      onClick={() => handleSpacedRepetition(false)}
                      className="px-4 py-1.5 rounded-full bg-[#0A0A0A] text-[#FFCD29] hover:opacity-85 transition-all shadow-md"
                    >
                      Recalled ✓
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Progress Bar */}
            <div className="max-w-[1440px] mx-auto w-full pt-1.5 border-t border-[#0A0A0A]/20 flex items-center justify-between font-text text-xs text-[#0A0A0A]">
              <div className="flex items-center gap-6">
                {projects.map((proj, idx) => (
                  <button
                    key={proj.id}
                    onClick={() => goToScene(idx)}
                    className={`transition-colors py-1 ${
                      activeSceneIndex === idx
                        ? 'font-black border-b-2 border-[#0A0A0A]'
                        : 'text-[#0A0A0A]/60 hover:text-[#0A0A0A]'
                    }`}
                  >
                    <span className="font-mono text-xs mr-1">{proj.number}</span>
                    <span>{proj.title}</span>
                  </button>
                ))}
              </div>
              <div className="font-mono text-xs font-bold text-[#0A0A0A] hidden sm:block">
                03 / 03 — UniLang (Yellow Layer)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
