import { useState, useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

export function Hero() {
  const [mouseParallax, setMouseParallax] = useState({ x: 0, y: 0 })
  const photoContainerRef = useRef<HTMLDivElement>(null)

  // Simulated Order Book Ticker states
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
    // Clamped 6px max parallax
    const x = Math.max(-6, Math.min(6, ((e.clientX - rect.left) / rect.width - 0.5) * 12))
    const y = Math.max(-6, Math.min(6, ((e.clientY - rect.top) / rect.height - 0.5) * 12))
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
    <section className="relative min-h-[calc(100svh-var(--nav-h))] flex flex-col justify-between pt-8 sm:pt-12 pb-6 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Main Split Grid (Vertically centered) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center my-auto pb-12">
        {/* Mobile: Photo appears above text on mobile (70% width, centered) */}
        <div className="lg:hidden flex justify-center mb-6">
          <div className="relative w-[70%] max-w-[300px] aspect-[4/5]">
            {/* Offset Terracotta Arch Outline */}
            <div
              className="absolute inset-0 translate-x-[10px] translate-y-[10px] rounded-t-[999px] border border-[#B4441F] pointer-events-none z-0"
              aria-hidden="true"
            />
            {/* Arch Mask Container */}
            <div className="relative z-10 w-full h-full rounded-t-[999px] overflow-hidden shadow-lg bg-[#EAE2D1]">
              <picture>
                <source srcSet="/images/mohit.webp" type="image/webp" />
                <img
                  src="/images/mohit.jpg"
                  alt="Portrait of Y. Mohit Sai"
                  className="absolute inset-0 w-full h-full object-cover object-[50%_22%] scale-[1.06]"
                />
              </picture>
            </div>
          </div>
        </div>

        {/* Left: Intro Brief & Name */}
        <div className="lg:col-span-7 space-y-6">
          <div className="font-text text-sm text-[#5E6B3A] font-semibold flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#B4441F] animate-pulse" />
            <span>{PORTFOLIO_CONFIG.profile.heroLabel}</span>
          </div>

          {/* Name: Modest and confident, bold & round Outfit font */}
          <h1 className="font-display text-[clamp(2.75rem,6vw,5rem)] font-black tracking-tight text-[#1F1A14] leading-[1.02] flex flex-wrap">
            {nameLetters.map((char, index) => (
              <motion.span
                key={index}
                initial={{ y: -30, opacity: 0, rotate: index % 2 === 0 ? -3 : 3 }}
                animate={{ y: 0, opacity: 1, rotate: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.15 + index * 0.035,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className={`inline-block ${char === ' ' ? 'w-[0.3em]' : ''}`}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <p className="font-text text-lg sm:text-xl text-[#B4441F] font-bold tracking-tight">
            {PORTFOLIO_CONFIG.profile.roleTagline}
          </p>

          <p className="font-text text-base sm:text-lg text-[#1F1A14]/90 font-medium leading-relaxed max-w-xl">
            {PORTFOLIO_CONFIG.profile.brief}
          </p>

          {/* Two Plain Text Links */}
          <div className="pt-4 flex items-center gap-8 text-base font-text font-bold">
            <a href="#work" className="terracotta-link">
              See my work →
            </a>
            <a
              href={`mailto:${PORTFOLIO_CONFIG.contact.email}`}
              className="terracotta-link text-[#5E6B3A] hover:text-[#B4441F]"
            >
              Email me ↗
            </a>
          </div>
        </div>

        {/* Right: Arched Photo on Desktop (Vertically Centered against text block) */}
        <div className="hidden lg:flex lg:col-span-5 justify-end">
          <div
            ref={photoContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMouseParallax({ x: 0, y: 0 })}
            onMouseEnter={() => handlePhotoHover(true)}
            className="relative w-[clamp(260px,26vw,380px)] aspect-[4/5] select-none"
          >
            {/* Thin terracotta arch outline offset 10px right and 10px down, drawn behind (z-0), never clipped */}
            <div
              className="absolute inset-0 translate-x-[10px] translate-y-[10px] rounded-t-[999px] border border-[#B4441F] pointer-events-none z-0"
              aria-hidden="true"
            />

            {/* Arch photo container: rounded-t-[999px], overflow hidden, z-10 */}
            <div className="relative z-10 w-full h-full rounded-t-[999px] overflow-hidden shadow-xl bg-[#EAE2D1]">
              <motion.div
                initial={{ clipPath: 'inset(100% 0 0 0 round 999px 999px 0 0)', scale: 1.08 }}
                animate={{ clipPath: 'inset(0% 0 0 0 round 999px 999px 0 0)', scale: 1 }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="w-full h-full relative"
              >
                <picture>
                  <source srcSet="/images/mohit.webp" type="image/webp" />
                  <img
                    src="/images/mohit.jpg"
                    alt="Portrait of Y. Mohit Sai"
                    style={{
                      transform: `scale(1.06) translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
                    }}
                    className="absolute inset-0 w-full h-full object-cover object-[50%_22%] transition-transform duration-150 ease-out"
                  />
                </picture>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Slim Full-Width Simulated Order Book Ticker (At least 48px space above) */}
      <div className="w-full pt-6 pb-2 border-t border-[#1F1A14]/14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-text text-[#6B6254]">
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
