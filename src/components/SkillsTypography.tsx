import { useState, useEffect, useRef, useCallback } from 'react'
import { motion } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

// All skills indexed for the 3D Sphere & 3D Ribbons
const ALL_SKILLS_3D = [
  { name: 'C++', category: 'Languages', context: 'Competitive Programming & High-Performance Systems' },
  { name: 'Python', category: 'Languages', context: 'Automation, AST Analysis & Local Machine Scripting' },
  { name: 'TypeScript', category: 'Languages', context: 'Strictly Typed Enterprise Web Systems & Tooling' },
  { name: 'React', category: 'Frontend', context: 'Modular Reactive UI & Production Component Architecture' },
  { name: 'Next.js', category: 'Full-Stack', context: 'Server-Side Rendering, Static Site Generation & Edge Runtime' },
  { name: 'Node.js', category: 'Backend', context: 'RESTful API Services & Microservice Middleware' },
  { name: 'Go', category: 'Systems', context: 'High-Concurrency Backend Utilities & Fast Indexers' },
  { name: 'Java', category: 'Languages', context: 'Object-Oriented Architecture & Algorithmic Foundations' },
  { name: 'SQL', category: 'Databases', context: 'Relational Schemas, Indexing & Structured Data Querying' },
  { name: 'Docker', category: 'DevOps', context: 'Containerization, Isolation & Reproducible Environments' },
  { name: 'Git & GitHub', category: 'DevOps', context: 'Version Control, Branching Models & Collaborative Workflows' },
  { name: 'Linux / Bash', category: 'Systems', context: 'Unix Kernel Shell Scripting, Memory & CLI Administration' },
  { name: 'Web Audio API', category: 'Frontend', context: 'Real-Time In-Browser Frequency Synthesis & Audio Graphs' },
  { name: 'Zustand', category: 'Frontend', context: 'Lightweight Predictable Client State Management' },
  { name: 'Zod', category: 'Validation', context: 'Runtime Schema Validation & End-to-End Type Safety' },
  { name: 'Vitest', category: 'Testing', context: 'Automated Test Suites, Test-Driven Development & Regressions' },
  { name: 'Algorithms', category: 'Core CS', context: 'Graph Theory, Dynamic Programming & Complexity Proofs' },
  { name: 'Data Structures', category: 'Core CS', context: 'Trees, Heaps, Hash Tables & Lock-Free Buffers' },
  { name: 'Tailwind CSS', category: 'Frontend', context: 'Modern Design Systems, Responsive Layouts & Tokens' },
  { name: 'Vite', category: 'Tooling', context: 'Next-Generation Bundling Pipelines & Fast HMR' },
  { name: 'Vercel', category: 'DevOps', context: 'Serverless Edge Deployments & CI/CD Pipelines' },
]

// Interactive 3D Tilt Card with dynamic light glare
function TiltCard({
  children,
  className = '',
}: {
  children: React.ReactNode
  className?: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const [rotate, setRotate] = useState({ x: 0, y: 0 })
  const [glare, setGlare] = useState({ x: 50, y: 50, opacity: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = ((y - centerY) / centerY) * -10
    const rotateY = ((x - centerX) / centerX) * 10

    setRotate({ x: rotateX, y: rotateY })
    setGlare({
      x: (x / rect.width) * 100,
      y: (y / rect.height) * 100,
      opacity: 0.12,
    })
  }

  const handleMouseLeave = () => {
    setRotate({ x: 0, y: 0 })
    setGlare((prev) => ({ ...prev, opacity: 0 }))
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: `perspective(900px) rotateX(${rotate.x}deg) rotateY(${rotate.y}deg) translateZ(0)`,
        transition: 'transform 0.15s ease-out',
      }}
      className={`relative rounded-2xl bg-[#0C0C0E] border border-white/15 p-6 shadow-xl overflow-hidden group select-none transition-colors duration-200 hover:border-white/40 ${className}`}
    >
      {/* Dynamic Specular Light Glare */}
      <div
        className="absolute inset-0 pointer-events-none transition-opacity duration-300"
        style={{
          background: `radial-gradient(circle at ${glare.x}% ${glare.y}%, rgba(255,255,255,${glare.opacity}), transparent 65%)`,
        }}
      />
      {children}
    </div>
  )
}

export function SkillsTypography() {
  const { categories } = PORTFOLIO_CONFIG.skills
  const [viewMode, setViewMode] = useState<'sphere' | 'ribbons'>('sphere')
  const [hoveredSkill, setHoveredSkill] = useState<{
    name: string
    category: string
    context: string
  } | null>(null)

  // ========================================================
  // 3D SPHERE SIMULATION ENGINE
  // ========================================================
  const sphereContainerRef = useRef<HTMLDivElement>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const isDraggingRef = useRef(false)
  const isPausedRef = useRef(false)
  const lastMousePosRef = useRef({ x: 0, y: 0 })
  const velocityRef = useRef({ x: 0.003, y: 0.004 })
  const rotRef = useRef({ x: 0, y: 0 })

  // Initialize spherical Fibonacci distribution
  const pointsRef = useRef<
    { x: number; y: number; z: number; origX: number; origY: number; origZ: number }[]
  >([])

  const updateRadius = useCallback(() => {
    if (!sphereContainerRef.current) return 180
    const w = sphereContainerRef.current.clientWidth
    return w < 640 ? 135 : w < 1024 ? 170 : 210
  }, [])

  useEffect(() => {
    const N = ALL_SKILLS_3D.length
    const radius = updateRadius()

    pointsRef.current = ALL_SKILLS_3D.map((_, i) => {
      const phi = Math.acos(-1 + (2 * i + 1) / N)
      const theta = Math.sqrt(N * Math.PI) * i
      const x = radius * Math.cos(theta) * Math.sin(phi)
      const y = radius * Math.sin(theta) * Math.sin(phi)
      const z = radius * Math.cos(phi)
      return { x, y, z, origX: x, origY: y, origZ: z }
    })
  }, [updateRadius])

  // 60FPS 3D Render Loop
  useEffect(() => {
    if (viewMode !== 'sphere') return
    let animId: number

    const render = () => {
      if (!isPausedRef.current && !isDraggingRef.current) {
        // Natural continuous 3D rotation
        rotRef.current.x += velocityRef.current.x
        rotRef.current.y += velocityRef.current.y
      }

      const cosY = Math.cos(velocityRef.current.y)
      const sinY = Math.sin(velocityRef.current.y)
      const cosX = Math.cos(velocityRef.current.x)
      const sinX = Math.sin(velocityRef.current.x)

      const cameraDist = 420
      const radius = updateRadius()

      pointsRef.current.forEach((p, idx) => {
        if (!isPausedRef.current) {
          // 1. Rotate around Y
          const x1 = p.x * cosY + p.z * sinY
          const z1 = -p.x * sinY + p.z * cosY

          // 2. Rotate around X
          const y2 = p.y * cosX - z1 * sinX
          const z2 = p.y * sinX + z1 * cosX

          p.x = x1
          p.y = y2
          p.z = z2
        }

        // Perspective Projection
        const scale = Math.max(0.65, Math.min(1.3, cameraDist / (cameraDist - p.z)))
        const alpha = Math.max(0.25, Math.min(1, ((p.z + radius) / (2 * radius)) * 0.75 + 0.25))
        const zIndex = Math.round(p.z + 500)

        const el = itemRefs.current[idx]
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0px) scale(${scale})`
          el.style.opacity = `${alpha}`
          el.style.zIndex = `${zIndex}`
        }
      })

      // Inertial damping if dragged
      if (!isDraggingRef.current) {
        velocityRef.current.x *= 0.96
        velocityRef.current.y *= 0.96
        if (Math.abs(velocityRef.current.x) < 0.002) velocityRef.current.x = 0.002
        if (Math.abs(velocityRef.current.y) < 0.003) velocityRef.current.y = 0.003
      }

      animId = requestAnimationFrame(render)
    }

    animId = requestAnimationFrame(render)
    return () => cancelAnimationFrame(animId)
  }, [viewMode, updateRadius])

  // Mouse & Touch Drag Interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true
    lastMousePosRef.current = { x: e.clientX, y: e.clientY }
  }

  const handlePointerMove = (e: React.PointerEvent) => {
    if (isDraggingRef.current) {
      const deltaX = e.clientX - lastMousePosRef.current.x
      const deltaY = e.clientY - lastMousePosRef.current.y
      velocityRef.current.y = deltaX * 0.006
      velocityRef.current.x = -deltaY * 0.006
      lastMousePosRef.current = { x: e.clientX, y: e.clientY }
    } else if (sphereContainerRef.current) {
      const rect = sphereContainerRef.current.getBoundingClientRect()
      const relX = (e.clientX - rect.left) / rect.width - 0.5
      const relY = (e.clientY - rect.top) / rect.height - 0.5
      velocityRef.current.y = relX * 0.008
      velocityRef.current.x = -relY * 0.008
    }
  }

  const handlePointerUp = () => {
    isDraggingRef.current = false
  }

  // Split skills for 3D Ribbons
  const ribbonRow1 = ALL_SKILLS_3D.slice(0, 7)
  const ribbonRow2 = ALL_SKILLS_3D.slice(7, 14)
  const ribbonRow3 = ALL_SKILLS_3D.slice(14, 21)

  return (
    <section id="skills" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#1F1A14]/14 pb-6 mb-12 sm:mb-16">
        <div className="space-y-2">
          <div className="flex items-center gap-3 font-text text-[13px] text-[#B4441F] font-bold">
            <span className="font-mono text-xs font-extrabold">05</span>
            <span>/</span>
            <span>Skills and Engineering Stack</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl lg:text-5xl font-black text-[#1F1A14] tracking-tight">
            Interactive 3D Skill Architecture.
          </h2>
        </div>
        <p className="font-text text-sm text-[#6B6254] font-medium max-w-md mt-3 sm:mt-0 leading-relaxed">
          Monochromatic 3D animations showcasing languages, full-stack frameworks, distributed systems, and core computer science foundations.
        </p>
      </div>

      {/* ======================================================== */}
      {/* 3D ARENA CONSOLE (Pure Black & White Monochromatic Stage) */}
      {/* ======================================================== */}
      <div className="relative w-full rounded-3xl bg-[#0C0C0E] border border-white/15 p-6 sm:p-10 lg:p-12 shadow-2xl shadow-black/50 overflow-hidden select-none transition-all group mb-16">
        {/* Background Dot Matrix Texture */}
        <div
          className="absolute inset-0 bg-[radial-gradient(#ffffff0e_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none"
          aria-hidden="true"
        />
        {/* Top subtle gloss hairline */}
        <div
          className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
          aria-hidden="true"
        />

        {/* 3D Console Header & View Mode Switcher */}
        <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-6 border-b border-white/10 gap-4">
          <div className="flex items-center gap-2.5 font-mono text-xs uppercase tracking-wider text-white/80 font-bold">
            <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
            <span>3D Interactive Engine</span>
            <span className="text-white/30 hidden sm:inline">•</span>
            <span className="text-white/50 lowercase font-normal hidden sm:inline">
              drag or hover to inspect depth
            </span>
          </div>

          {/* 3D Mode Selector Slider (Black & White Capsule) */}
          <div className="flex items-center gap-1.5 p-1 rounded-xl bg-white/[0.04] border border-white/10">
            <button
              onClick={() => setViewMode('sphere')}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                viewMode === 'sphere' ? 'text-[#0C0C0E] font-black' : 'text-white/70 hover:text-white'
              }`}
            >
              {viewMode === 'sphere' && (
                <motion.div
                  layoutId="skillsViewPill"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  className="absolute inset-0 bg-white rounded-lg shadow-md pointer-events-none z-0"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>⬡</span>
                <span>3D Orbit Sphere</span>
              </span>
            </button>

            <button
              onClick={() => setViewMode('ribbons')}
              className={`relative px-3.5 py-1.5 rounded-lg text-xs font-mono font-bold transition-colors ${
                viewMode === 'ribbons' ? 'text-[#0C0C0E] font-black' : 'text-white/70 hover:text-white'
              }`}
            >
              {viewMode === 'ribbons' && (
                <motion.div
                  layoutId="skillsViewPill"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  className="absolute inset-0 bg-white rounded-lg shadow-md pointer-events-none z-0"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <span>☵</span>
                <span>3D Perspective Ribbons</span>
              </span>
            </button>
          </div>
        </div>

        {/* ======================================================== */}
        {/* MODE A: 3D ORBIT SPHERE (Rotatable Fibonacci Globe) */}
        {/* ======================================================== */}
        {viewMode === 'sphere' && (
          <div
            ref={sphereContainerRef}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="relative w-full h-[400px] sm:h-[480px] flex items-center justify-center cursor-grab active:cursor-grabbing overflow-hidden touch-none"
          >
            {/* Soft Ambient Depth Glow behind the sphere */}
            <div
              className="absolute w-72 h-72 sm:w-96 sm:h-96 rounded-full bg-white/[0.03] blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {/* Orbit Items */}
            {ALL_SKILLS_3D.map((skill, idx) => {
              const isHovered = hoveredSkill?.name === skill.name
              return (
                <div
                  key={skill.name}
                  ref={(el) => {
                    itemRefs.current[idx] = el
                  }}
                  onMouseEnter={() => {
                    isPausedRef.current = true
                    setHoveredSkill(skill)
                  }}
                  onMouseLeave={() => {
                    isPausedRef.current = false
                    setHoveredSkill(null)
                  }}
                  className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-colors duration-150 select-none"
                  style={{ willChange: 'transform, opacity' }}
                >
                  <div
                    className={`px-3.5 sm:px-4 py-1.5 rounded-full flex items-center gap-2 border font-mono text-xs sm:text-sm font-bold shadow-lg transition-all duration-200 ${
                      isHovered
                        ? 'bg-white text-[#0C0C0E] border-white scale-125 shadow-[0_0_25px_rgba(255,255,255,0.7)]'
                        : 'bg-[#141418]/90 text-white border-white/20 hover:border-white/50 hover:bg-white hover:text-[#0C0C0E]'
                    }`}
                  >
                    <span
                      className={`w-1.5 h-1.5 rounded-full transition-colors ${
                        isHovered ? 'bg-[#0C0C0E]' : 'bg-white/70'
                      }`}
                    />
                    <span>{skill.name}</span>
                  </div>
                </div>
              )
            })}
          </div>
        )}

        {/* ======================================================== */}
        {/* MODE B: 3D PERSPECTIVE RIBBONS (Tilted Conveyor Rows) */}
        {/* ======================================================== */}
        {viewMode === 'ribbons' && (
          <div className="relative overflow-hidden py-10 sm:py-14 [perspective:1200px]">
            {/* Left and Right Vignette Fade Masks */}
            <div className="absolute inset-y-0 left-0 w-24 sm:w-44 bg-gradient-to-r from-[#0C0C0E] to-transparent z-20 pointer-events-none" />
            <div className="absolute inset-y-0 right-0 w-24 sm:w-44 bg-gradient-to-l from-[#0C0C0E] to-transparent z-20 pointer-events-none" />

            {/* Tilted 3D Isometric Plane */}
            <div className="space-y-4 sm:space-y-6 [transform-style:preserve-3d] [transform:rotateX(14deg)_rotateY(-6deg)_rotateZ(-1deg)]">
              {/* Row 1: Flowing Leftward */}
              <div className="flex gap-4 animate-marquee-left whitespace-nowrap">
                {ribbonRow1.concat(ribbonRow1).map((s, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredSkill(s)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="px-5 py-3 rounded-2xl bg-[#141418] border border-white/15 text-white flex items-center gap-3 transition-all duration-200 hover:[transform:translateZ(28px)_scale(1.08)] hover:bg-white hover:text-[#0C0C0E] hover:border-white shadow-xl cursor-pointer group"
                  >
                    <span className="font-mono text-xs font-bold text-white/40 group-hover:text-[#0C0C0E]/50">
                      0{idx + 1}
                    </span>
                    <span className="font-display font-black text-lg tracking-tight">
                      {s.name}
                    </span>
                    <span className="text-xs font-mono text-white/50 group-hover:text-[#0C0C0E]/60 border-l border-white/15 group-hover:border-black/20 pl-2">
                      {s.category}
                    </span>
                  </div>
                ))}
              </div>

              {/* Row 2: Flowing Rightward */}
              <div className="flex gap-4 animate-marquee-right whitespace-nowrap">
                {ribbonRow2.concat(ribbonRow2).map((s, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredSkill(s)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="px-5 py-3 rounded-2xl bg-[#18181E] border border-white/15 text-white flex items-center gap-3 transition-all duration-200 hover:[transform:translateZ(28px)_scale(1.08)] hover:bg-white hover:text-[#0C0C0E] hover:border-white shadow-xl cursor-pointer group"
                  >
                    <span className="font-mono text-xs font-bold text-white/40 group-hover:text-[#0C0C0E]/50">
                      0{idx + 8}
                    </span>
                    <span className="font-display font-black text-lg tracking-tight">
                      {s.name}
                    </span>
                    <span className="text-xs font-mono text-white/50 group-hover:text-[#0C0C0E]/60 border-l border-white/15 group-hover:border-black/20 pl-2">
                      {s.category}
                    </span>
                  </div>
                ))}
              </div>

              {/* Row 3: Flowing Leftward */}
              <div className="flex gap-4 animate-marquee-left whitespace-nowrap">
                {ribbonRow3.concat(ribbonRow3).map((s, idx) => (
                  <div
                    key={idx}
                    onMouseEnter={() => setHoveredSkill(s)}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="px-5 py-3 rounded-2xl bg-[#121216] border border-white/15 text-white flex items-center gap-3 transition-all duration-200 hover:[transform:translateZ(28px)_scale(1.08)] hover:bg-white hover:text-[#0C0C0E] hover:border-white shadow-xl cursor-pointer group"
                  >
                    <span className="font-mono text-xs font-bold text-white/40 group-hover:text-[#0C0C0E]/50">
                      0{idx + 15}
                    </span>
                    <span className="font-display font-black text-lg tracking-tight">
                      {s.name}
                    </span>
                    <span className="text-xs font-mono text-white/50 group-hover:text-[#0C0C0E]/60 border-l border-white/15 group-hover:border-black/20 pl-2">
                      {s.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* 3D Console Bottom HUD / Active Skill Inspector Bar */}
        <div className="relative z-10 pt-4 mt-2 border-t border-white/10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-mono">
          <div className="flex items-center gap-2">
            <span className="text-white/40">Status:</span>
            <span className="text-white font-bold">
              {hoveredSkill ? (
                <span className="inline-flex items-center gap-2 text-white">
                  <span className="text-white underline underline-offset-4 decoration-white/60">
                    {hoveredSkill.name}
                  </span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/80">{hoveredSkill.category}</span>
                  <span className="text-white/40">•</span>
                  <span className="text-white/60 hidden md:inline">{hoveredSkill.context}</span>
                </span>
              ) : (
                <span className="text-white/60">
                  {viewMode === 'sphere'
                    ? 'Drag with mouse or touch to rotate 3D sphere'
                    : 'Hover any ribbon pill to lift in 3D'}
                </span>
              )}
            </span>
          </div>

          <div className="flex items-center gap-3 text-white/40">
            <span>20+ Monitored Skills</span>
            <span>•</span>
            <span className="text-white/70">60FPS WebGL/CSS3D</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3D TILT CATEGORY MATRIX (4-Column Monochromatic Deck) */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {categories.map((col, colIdx) => (
          <TiltCard key={col.category}>
            {/* Card Category Header */}
            <div className="border-b border-white/10 pb-4 mb-4">
              <div className="flex items-center justify-between font-mono text-xs text-white/40 mb-1">
                <span>0{colIdx + 1}</span>
                <span className="uppercase tracking-wider">Indexed</span>
              </div>
              <h4 className="font-display font-black text-lg text-white tracking-tight">
                {col.category}
              </h4>
              <p className="font-text text-xs text-white/50 mt-1 font-medium leading-relaxed">
                {col.description}
              </p>
            </div>

            {/* Category Skill Items */}
            <ul className="space-y-3 font-text text-sm">
              {col.items.map((item) => {
                const isHovered = hoveredSkill?.name === item.name
                return (
                  <li
                    key={item.name}
                    onMouseEnter={() =>
                      setHoveredSkill({
                        name: item.name,
                        category: col.category,
                        context: item.context,
                      })
                    }
                    onMouseLeave={() => setHoveredSkill(null)}
                    className="group/item cursor-pointer transition-all duration-150 p-1.5 -mx-1.5 rounded-lg hover:bg-white/[0.06]"
                  >
                    <div className="flex items-baseline justify-between gap-2">
                      <span
                        className={`font-bold transition-colors ${
                          isHovered ? 'text-white' : 'text-white/90 group-hover/item:text-white'
                        }`}
                      >
                        {item.name}
                      </span>
                      <span className="w-1.5 h-1.5 rounded-full bg-white/20 group-hover/item:bg-white transition-colors" />
                    </div>
                    <p className="text-xs text-white/50 group-hover/item:text-white/80 transition-colors mt-0.5 font-medium leading-snug">
                      {item.context}
                    </p>
                  </li>
                )
              })}
            </ul>
          </TiltCard>
        ))}
      </div>
    </section>
  )
}
