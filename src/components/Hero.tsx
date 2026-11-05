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
    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12
    const y = ((e.clientY - rect.top) / rect.height - 0.5) * 12
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
    <section className="relative min-h-[94vh] flex flex-col justify-between pt-28 sm:pt-36 pb-6 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Main Split Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center my-auto">
        {/* Mobile: Photo appears above text on mobile (70% width, centered) */}
        <div className="lg:hidden flex justify-center mb-2">
          <div className="relative w-[70%] max-w-[280px] aspect-[340/420]">
            {/* Terracotta offset arch outline */}
            <div
              className="absolute inset-0 translate-x-2 translate-y-2 rounded-t-[140px] border border-[#B4441F]/60 pointer-events-none"
              aria-hidden="true"
            />
            {/* Real Photograph with object-position: 50% 25% */}
            <picture>
              <source srcSet="/images/mohit.webp" type="image/webp" />
              <img
                src="/images/mohit.jpg"
                alt="Portrait of Y. Mohit Sai"
                width="340"
                height="420"
                className="w-full h-full object-cover object-[50%_25%] rounded-t-[140px] shadow-lg relative z-10"
              />
            </picture>
          </div>
        </div>

        {/* Left: Intro Brief & Modest Name */}
        <div className="lg:col-span-7 space-y-6">
          <div className="font-text text-[13px] text-[#5E6B3A] flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#B4441F] animate-pulse" />
            <span>{PORTFOLIO_CONFIG.profile.heroLabel}</span>
          </div>

          {/* Name: Modest and confident, clamp max 4.5rem, letter drop-in with slight rotate-settle */}
          <h1 className="font-display text-[clamp(2.25rem,5.5vw,4.5rem)] font-bold tracking-tight text-[#1F1A14] leading-[1.05] flex flex-wrap">
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
                className={`inline-block bricolage-shift ${char === ' ' ? 'w-[0.3em]' : ''}`}
              >
                {char}
              </motion.span>
            ))}
          </h1>

          <p className="font-text text-base sm:text-lg text-[#B4441F] font-medium">
            {PORTFOLIO_CONFIG.profile.roleTagline}
          </p>

          <p className="font-text text-base sm:text-lg text-[#1F1A14]/80 font-normal leading-relaxed max-w-xl">
            {PORTFOLIO_CONFIG.profile.brief}
          </p>

          {/* Two Plain Text Links */}
          <div className="pt-4 flex items-center gap-8 text-sm font-text">
            <a href="#work" className="terracotta-link font-medium">
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

        {/* Right: Arched Photo on Desktop */}
        <div className="hidden lg:flex lg:col-span-5 justify-end">
          <div
            ref={photoContainerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={() => setMouseParallax({ x: 0, y: 0 })}
            onMouseEnter={() => handlePhotoHover(true)}
            className="relative w-[340px] h-[420px] select-none"
          >
            {/* Thin terracotta arch outline offset 10px behind image */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.9, delay: 0.3 }}
              className="absolute inset-0 translate-x-[10px] translate-y-[10px] rounded-t-[170px] border border-[#B4441F] pointer-events-none"
              aria-hidden="true"
            />

            {/* Real Arched Photo with object-position: 50% 25% */}
            <motion.div
              initial={{ clipPath: 'inset(100% 0 0 0 round 170px 170px 0 0)', scale: 1.08 }}
              animate={{ clipPath: 'inset(0% 0 0 0 round 170px 170px 0 0)', scale: 1 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{
                transform: `translate3d(${mouseParallax.x}px, ${mouseParallax.y}px, 0)`,
              }}
              className="w-full h-full rounded-t-[170px] overflow-hidden shadow-xl relative z-10 transition-transform duration-200 ease-out"
            >
              <picture>
                <source srcSet="/images/mohit.webp" type="image/webp" />
                <img
                  src="/images/mohit.jpg"
                  alt="Portrait of Y. Mohit Sai"
                  width="340"
                  height="420"
                  className="w-full h-full object-cover object-[50%_25%]"
                />
              </picture>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Bottom Slim Full-Width Simulated Order Book Ticker */}
      <div className="w-full pt-6 pb-2 border-t border-[#1F1A14]/14 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs font-text text-[#6B6254]">
        <div className="flex items-center gap-3">
          <span className="text-[#B4441F] font-semibold">
            Simulated order book
          </span>
          <span>•</span>
          <span>NSE_NIFTY_FUT</span>
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
            SPREAD: <strong className="text-[#5E6B3A]">{spreadData.spread.toFixed(2)}</strong>
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
