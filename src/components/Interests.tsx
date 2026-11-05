import { useState } from 'react'
import { motion } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

export function Interests() {
  const { competitiveProgramming, highFrequencyTrading } = PORTFOLIO_CONFIG.passions
  const [hoveredSide, setHoveredSide] = useState<'cp' | 'hft' | null>(null)

  return (
    <section id="interests" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#ECE6D6]/12 pb-6 mb-16">
        <div className="flex items-center gap-3 font-mono text-xs text-[#FF5A2C] uppercase tracking-widest">
          <span>04</span>
          <span>/</span>
          <span>Dual Passions</span>
        </div>
        <p className="font-mono text-xs text-[#9DB59A] mt-2 sm:mt-0">
          SUB-MICROSECOND LATENCY & ALGORITHMIC PROOF
        </p>
      </div>

      {/* Two Side-By-Side Bold Statements (Under one viewport, NO panels!) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Competitive Programming */}
        <div
          onMouseEnter={() => setHoveredSide('cp')}
          onMouseLeave={() => setHoveredSide(null)}
          className="space-y-6 group"
        >
          <div className="flex items-center justify-between font-mono text-xs text-[#9DB59A]">
            <span>01 / ALGORITHMIC RIGOR</span>
            <span className="text-[#FF5A2C]">O(1) → O(N log N)</span>
          </div>

          <h3 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#ECE6D6] leading-[1.08] tracking-tight group-hover:text-[#FF5A2C] transition-colors">
            {competitiveProgramming.statement}
          </h3>

          <p className="font-text text-base text-[#ECE6D6]/70 font-light leading-relaxed">
            {competitiveProgramming.prose}
          </p>

          {/* Big-O Curve Visual that redraws on hover */}
          <div className="pt-4 flex items-center gap-4">
            <svg viewBox="0 0 160 50" className="w-40 h-14 overflow-visible stroke-[#ECE6D6]/40 group-hover:stroke-[#FF5A2C] transition-colors">
              {/* Axis */}
              <line x1="0" y1="45" x2="160" y2="45" strokeWidth="1" strokeDasharray="2 2" />
              {/* O(log N) curve */}
              <path d="M 0 45 Q 40 25, 160 18" fill="none" strokeWidth="1.5" stroke="#9DB59A" />
              {/* O(N log N) curve */}
              <motion.path
                d="M 0 45 Q 60 40, 160 5"
                fill="none"
                strokeWidth="2"
                initial={{ pathLength: 0.8 }}
                animate={{ pathLength: hoveredSide === 'cp' ? 1 : 0.8 }}
                transition={{ duration: 0.6 }}
              />
            </svg>
            <span className="font-mono text-[11px] text-[#ECE6D6]/50">
              Big-O Growth Bound
            </span>
          </div>
        </div>

        {/* Right: High-Frequency Trading */}
        <div
          onMouseEnter={() => setHoveredSide('hft')}
          onMouseLeave={() => setHoveredSide(null)}
          className="space-y-6 group"
        >
          <div className="flex items-center justify-between font-mono text-xs text-[#9DB59A]">
            <span>02 / MARKET MICROSTRUCTURE</span>
            <span className="text-[#FF5A2C]">&lt; 380ns Execution</span>
          </div>

          <h3 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#ECE6D6] leading-[1.08] tracking-tight group-hover:text-[#FF5A2C] transition-colors">
            {highFrequencyTrading.statement}
          </h3>

          <p className="font-text text-base text-[#ECE6D6]/70 font-light leading-relaxed">
            {highFrequencyTrading.prose}
          </p>

          {/* Latency line chart visual that animates on hover */}
          <div className="pt-4 flex items-center gap-4">
            <svg viewBox="0 0 160 50" className="w-40 h-14 overflow-visible stroke-[#ECE6D6]/40 group-hover:stroke-[#FF5A2C] transition-colors">
              {/* Baseline */}
              <line x1="0" y1="45" x2="160" y2="45" strokeWidth="1" strokeDasharray="2 2" />
              {/* Jitter line */}
              <motion.path
                d="M 0 35 L 25 32 L 50 36 L 75 14 L 100 34 L 125 31 L 160 33"
                fill="none"
                strokeWidth="1.8"
                initial={{ pathLength: 0.85 }}
                animate={{ pathLength: hoveredSide === 'hft' ? 1 : 0.85 }}
                transition={{ duration: 0.6 }}
              />
            </svg>
            <span className="font-mono text-[11px] text-[#ECE6D6]/50">
              Deterministic Nanosecond Jitter
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
