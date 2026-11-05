import { motion } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

export function Hero() {
  const easeOutEditorial = [0.16, 1, 0.3, 1] as const

  return (
    <section className="min-h-[92vh] flex flex-col justify-between pt-36 pb-12 sm:pb-16 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full relative">
      {/* Top Small Line */}
      <div className="overflow-hidden pt-4">
        <motion.p
          initial={{ y: '100%', opacity: 0 }}
          animate={{ y: '0%', opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.2, ease: easeOutEditorial }}
          className="font-mono text-xs sm:text-sm text-[#6F675B] tracking-wider uppercase"
        >
          {PORTFOLIO_CONFIG.profile.heroWelcome}
        </motion.p>
      </div>

      {/* Massive Headline */}
      <div className="my-auto py-12">
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: '0%' }}
            transition={{ duration: 1.1, delay: 0.35, ease: easeOutEditorial }}
            className="font-serif text-[clamp(3.8rem,13vw,14rem)] leading-[0.88] tracking-[-0.04em] text-[#1C1915] select-none"
          >
            <span className="not-italic font-normal mr-[0.25em]">
              {PORTFOLIO_CONFIG.profile.nameFirst}
            </span>
            <span className="italic font-normal text-[#1C1915]">
              {PORTFOLIO_CONFIG.profile.nameLast}
            </span>
          </motion.h1>
        </div>

        {/* Beneath it, one line */}
        <div className="overflow-hidden mt-8 sm:mt-12">
          <motion.p
            initial={{ y: '100%', opacity: 0 }}
            animate={{ y: '0%', opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.6, ease: easeOutEditorial }}
            className="font-sans text-lg sm:text-2xl text-[#6F675B] font-light max-w-2xl tracking-tight leading-relaxed"
          >
            {PORTFOLIO_CONFIG.profile.roleTagline}
          </motion.p>
        </div>
      </div>

      {/* Bottom Thin Scroll Cue */}
      <div className="overflow-hidden pt-6 flex justify-between items-end border-t border-[#1C1915]/10 text-xs font-mono text-[#6F675B]">
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.8 }}
        >
          INDEX / 01 — 05
        </motion.span>

        <motion.div
          initial={{ opacity: 0, y: -6 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex items-center gap-2"
        >
          <span>SCROLL DOWN</span>
          <span className="inline-block text-[#8A4B2A]">↓</span>
        </motion.div>
      </div>
    </section>
  )
}
