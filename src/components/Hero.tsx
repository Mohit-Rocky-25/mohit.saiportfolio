import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

export function Hero() {
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 })
  const photoContainerRef = useRef<HTMLDivElement>(null)

  // Simulated Order Book Ticker states (reflecting interest in low-latency HFT)
  const [spreadData, setSpreadData] = useState({
    bid: 24310.25,
    ask: 24310.30,
    spread: 0.05,
    depth: 3840,
    latency: '340ns',
  })

  useEffect(() => {
    const interval = setInterval(() => {
      const delta = (Math.random() - 0.49) * 0.12
      setSpreadData((prev) => {
        const newBid = +(prev.bid + delta).toFixed(2)
        const newAsk = +(newBid + 0.05).toFixed(2)
        return {
          bid: newBid,
          ask: newAsk,
          spread: 0.05,
          depth: Math.floor(3000 + Math.random() * 2000),
          latency: `${Math.floor(320 + Math.random() * 50)}ns`,
        }
      })
    }, 600)
    return () => clearInterval(interval)
  }, [])

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!photoContainerRef.current) return
    const rect = photoContainerRef.current.getBoundingClientRect()
    // Clamped 8px max parallax
    const x = Math.max(-8, Math.min(8, ((e.clientX - rect.left) / rect.width - 0.5) * 16))
    const y = Math.max(-8, Math.min(8, ((e.clientY - rect.top) / rect.height - 0.5) * 16))
    setMouseParallax({ x, y })
  }

  const handlePhotoHover = (isHovered: boolean) => {
    window.dispatchEvent(
      new CustomEvent('dog-react', {
        detail: { action: isHovered ? 'perk' : 'idle-sit' },
      })
    )
  }

  const nameLetters = PORTFOLIO_CONFIG.profile.name.split('')

  return (
    <section className="relative min-h-[calc(100svh-var(--nav-h))] flex flex-col justify-between pt-4 sm:pt-8 lg:pt-10 pb-6 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Main Split Grid (Balanced, centered, high-impact alignment) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center my-auto py-6 sm:py-8">
        
        {/* Mobile: Square Photo appears above on small screens */}
        <div className="lg:hidden flex justify-center mb-4">
          <div className="relative w-full max-w-[280px] sm:max-w-[340px] aspect-square">
            {/* Offset Terracotta Background Frame */}
            <div
              className="absolute inset-0 translate-x-2.5 translate-y-2.5 rounded-3xl border-2 border-[#B4441F] bg-[#B4441F]/10 pointer-events-none z-0"
              aria-hidden="true"
            />
            {/* Square Photo Container */}
            <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-xl border-2 border-[#1F1A14] bg-[#EAE2D1]">
              <picture>
                <source srcSet="/images/mohit.webp" type="image/webp" />
                <img
                  src="/images/mohit.jpg"
                  alt="Portrait of Y. Mohit Sai"
                  className="w-full h-full object-cover object-[50%_20%]"
                />
              </picture>

              {/* Understandable Tag Badge */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 bg-[#EAE2D1]/95 backdrop-blur-sm border border-[#1F1A14]/20 p-2 rounded-xl flex items-center justify-between text-xs font-text">
                <span className="font-display font-black text-[#1F1A14]">Y. Mohit Sai</span>
                <span className="font-mono text-[11px] text-[#B4441F] font-bold">CSE Core • VIT-AP</span>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column: Big, Bold, Highlighted Identity & Bio */}
        <div className="lg:col-span-7 space-y-5 sm:space-y-6">
          {/* Prominent Kicker Badge */}
          <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#1F1A14]/[0.05] border border-[#1F1A14]/15 shadow-sm">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#B4441F] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#B4441F]"></span>
            </span>
            <span className="font-mono text-xs uppercase tracking-wider font-extrabold text-[#1F1A14]">
              {PORTFOLIO_CONFIG.profile.heroLabel}
            </span>
          </div>

          {/* Big, Bold, Commanding Name */}
          <div className="space-y-2">
            <h1 className="font-display text-5xl sm:text-6xl md:text-7xl lg:text-[5.25rem] xl:text-[5.75rem] font-black tracking-tight text-[#1F1A14] leading-[0.92] flex flex-wrap">
              {nameLetters.map((char, index) => (
                <motion.span
                  key={index}
                  initial={{ y: -24, opacity: 0, rotate: index % 2 === 0 ? -2 : 2 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  transition={{
                    duration: 0.55,
                    delay: 0.12 + index * 0.03,
                    ease: [0.16, 1, 0.3, 1],
                  }}
                  className={`inline-block ${char === ' ' ? 'w-[0.25em]' : ''}`}
                >
                  {char}
                </motion.span>
              ))}
            </h1>

            {/* Clear, Highlighted Role & Academic Credential */}
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 pt-1">
              <span className="font-display text-xl sm:text-2xl lg:text-3xl font-extrabold text-[#B4441F] tracking-tight">
                {PORTFOLIO_CONFIG.profile.roleTagline}
              </span>
              <span className="hidden sm:inline-block text-[#1F1A14]/30 font-bold">•</span>
              <span className="font-mono text-xs sm:text-sm font-bold text-[#5E6B3A] bg-[#5E6B3A]/10 px-2.5 py-0.5 rounded-md border border-[#5E6B3A]/20">
                2023 — Present
              </span>
            </div>
          </div>

          {/* Understandable Brief with Strong Engineering Angle */}
          <p className="font-text text-base sm:text-lg lg:text-xl text-[#1F1A14]/90 font-medium leading-relaxed max-w-2xl">
            {PORTFOLIO_CONFIG.profile.brief}
          </p>

          {/* Quick Highlight Points (Education + Interests immediately visible) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1 border-t border-[#1F1A14]/15">
            <div className="p-2.5 rounded-xl bg-[#1F1A14]/[0.03] border border-[#1F1A14]/10">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[#6B6254] font-bold">
                Domain Interest
              </span>
              <span className="font-display font-black text-xs sm:text-sm text-[#1F1A14]">
                Low-Latency Systems & HFT
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#1F1A14]/[0.03] border border-[#1F1A14]/10">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[#6B6254] font-bold">
                Discipline
              </span>
              <span className="font-display font-black text-xs sm:text-sm text-[#B4441F]">
                Competitive Programming
              </span>
            </div>

            <div className="p-2.5 rounded-xl bg-[#1F1A14]/[0.03] border border-[#1F1A14]/10">
              <span className="block font-mono text-[10px] uppercase tracking-wider text-[#6B6254] font-bold">
                12th Foundation
              </span>
              <span className="font-display font-black text-xs sm:text-sm text-[#5E6B3A]">
                Narayana Jr College, Kurnool
              </span>
            </div>
          </div>

          {/* Attractive, Clear Action Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-4">
            <a
              href="#work"
              className="px-6 sm:px-7 py-3 rounded-full bg-[#1F1A14] text-[#EAE2D1] hover:bg-[#B4441F] font-display font-black text-sm sm:text-base tracking-wide transition-all shadow-md hover:shadow-xl hover:-translate-y-0.5 inline-flex items-center gap-2.5"
            >
              <span>Explore Selected Work</span>
              <span className="text-[#EAE2D1]/80">↓</span>
            </a>

            <a
              href={`mailto:${PORTFOLIO_CONFIG.contact.email}`}
              className="px-6 sm:px-7 py-3 rounded-full border-2 border-[#1F1A14] text-[#1F1A14] hover:bg-[#1F1A14] hover:text-[#EAE2D1] font-display font-black text-sm sm:text-base tracking-wide transition-all inline-flex items-center gap-2"
            >
              <span>Email me</span>
              <span>↗</span>
            </a>

            <div className="flex items-center gap-4 pl-2 font-mono text-xs font-bold text-[#6B6254]">
              <a
                href={PORTFOLIO_CONFIG.contact.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1F1A14] underline underline-offset-4 transition-colors"
              >
                GitHub
              </a>
              <span>/</span>
              <a
                href={PORTFOLIO_CONFIG.contact.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#1F1A14] underline underline-offset-4 transition-colors"
              >
                LinkedIn
              </a>
            </div>
          </div>
        </div>

        {/* Right Column: Square Dimensions Photo (Clean, Presentable, High-End Frame) */}
        <div className="hidden lg:flex lg:col-span-5 justify-end items-center">
          <div
            ref={photoContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMouseParallax({ x: 0, y: 0 })}
            onMouseEnter={() => handlePhotoHover(true)}
            className="relative w-full max-w-[380px] xl:max-w-[430px] aspect-square select-none group"
          >
            {/* Offset Terracotta Frame behind photo */}
            <div
              className="absolute inset-0 translate-x-3.5 translate-y-3.5 rounded-3xl border-2 border-[#B4441F] bg-[#B4441F]/10 pointer-events-none z-0 transition-transform duration-300 group-hover:translate-x-4 group-hover:translate-y-4"
              aria-hidden="true"
            />

            {/* Square Photo Frame */}
            <div className="relative z-10 w-full h-full rounded-3xl overflow-hidden shadow-2xl border-2 border-[#1F1A14] bg-[#EAE2D1]">
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                <picture>
                  <source srcSet="/images/mohit.webp" type="image/webp" />
                  <img
                    src="/images/mohit.jpg"
                    alt="Portrait of Y. Mohit Sai"
                    style={{
                      transform: `scale(1.05) translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-[50%_18%] transition-transform duration-150 ease-out"
                  />
                </picture>

                {/* Top Badge: Kurnool -> Amaravati */}
                <div className="absolute top-3.5 right-3.5 bg-[#1F1A14]/85 backdrop-blur-md text-[#EAE2D1] px-3 py-1 rounded-full text-xs font-mono font-bold flex items-center gap-1.5 shadow-md">
                  <span className="w-2 h-2 rounded-full bg-[#9DB59A] animate-pulse" />
                  <span>VIT-AP University</span>
                </div>

                {/* Presentable Anchored Info Banner */}
                <div className="absolute bottom-3 left-3 right-3 bg-[#EAE2D1]/95 backdrop-blur-md border border-[#1F1A14]/20 p-3 rounded-2xl shadow-lg flex items-center justify-between">
                  <div>
                    <div className="font-display font-black text-sm text-[#1F1A14] leading-tight">
                      Y. Mohit Sai
                    </div>
                    <div className="font-mono text-xs text-[#6B6254] font-bold">
                      CSE Core • Kurnool / Amaravati
                    </div>
                  </div>
                  <div className="w-8 h-8 rounded-xl bg-[#B4441F] text-[#EAE2D1] flex items-center justify-center font-display font-black text-xs shadow-sm">
                    VIT
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Slim Full-Width Simulated Order Book Ticker */}
      <div className="w-full pt-4 pb-2 border-t border-[#1F1A14]/14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-text text-[#6B6254]">
        <div className="flex items-center gap-3">
          <span className="text-[#B4441F] font-bold">
            Simulated order book
          </span>
          <span>•</span>
          <span className="font-medium">NSE_NIFTY_FUT</span>
        </div>

        <div className="flex flex-wrap items-center gap-5 sm:gap-8 font-mono text-xs">
          <span
            onMouseEnter={() =>
              window.dispatchEvent(
                new CustomEvent('dog-react', { detail: { action: 'perk' } })
              )
            }
            className="hover:text-[#B4441F] transition-colors cursor-pointer"
          >
            BID: <strong className="text-[#1F1A14]">{spreadData.bid.toFixed(2)}</strong>
          </span>
          <span
            onMouseEnter={() =>
              window.dispatchEvent(
                new CustomEvent('dog-react', { detail: { action: 'perk' } })
              )
            }
            className="hover:text-[#B4441F] transition-colors cursor-pointer"
          >
            ASK: <strong className="text-[#1F1A14]">{spreadData.ask.toFixed(2)}</strong>
          </span>
          <span>
            SPREAD: <strong className="text-[#5E6B3A] font-bold">{spreadData.spread.toFixed(2)}</strong>
          </span>
          <span className="hidden md:inline">
            DEPTH: <strong className="text-[#1F1A14]">{spreadData.depth}</strong>
          </span>
          <span className="text-[#B4441F]">
            LATENCY: <strong>{spreadData.latency}</strong>
          </span>
        </div>
      </div>
    </section>
  )
}
