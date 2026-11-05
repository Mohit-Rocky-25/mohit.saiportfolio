import { useState } from 'react'
import { motion } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

export function Interests() {
  const { competitiveProgramming, highFrequencyTrading } = PORTFOLIO_CONFIG.passions
  const [hoveredSide, setHoveredSide] = useState<'cp' | 'hft' | null>(null)

  return (
    <section id="interests" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#1F1A14]/14 pb-6 mb-16">
        <div className="flex items-center gap-3 font-text text-[13px] text-[#B4441F]">
          <span className="font-mono text-xs">04</span>
          <span>/</span>
          <span>Core interests</span>
        </div>
        <p className="font-text text-[13px] text-[#6B6254] mt-2 sm:mt-0">
          Algorithmic proof and low-latency systems
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
          <div className="flex items-center justify-between font-text text-xs text-[#5E6B3A]">
            <span className="font-medium">01 / Algorithmic problem solving</span>
            <span className="font-mono text-[#B4441F]">O(1) → O(N log N)</span>
          </div>

          <h3 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#1F1A14] leading-[1.08] tracking-tight group-hover:text-[#B4441F] transition-colors">
            {competitiveProgramming.statement}
          </h3>

          <p className="font-text text-base text-[#1F1A14]/80 font-normal leading-relaxed">
            {competitiveProgramming.prose}
          </p>

          {/* Big-O Curve Visual that redraws on hover */}
          <div className="pt-4 flex items-center gap-4">
            <svg viewBox="0 0 160 50" className="w-40 h-14 overflow-visible stroke-[#1F1A14]/30 group-hover:stroke-[#B4441F] transition-colors">
              {/* Axis */}
              <line x1="0" y1="45" x2="160" y2="45" strokeWidth="1" strokeDasharray="2 2" />
              {/* O(log N) curve */}
              <path d="M 0 45 Q 40 25, 160 18" fill="none" strokeWidth="1.5" stroke="#5E6B3A" />
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
            <span className="font-text text-xs text-[#6B6254]">
              Big-O growth rate
            </span>
          </div>
        </div>

        {/* Right: High-Frequency Trading */}
        <div
          onMouseEnter={() => setHoveredSide('hft')}
          onMouseLeave={() => setHoveredSide(null)}
          className="space-y-6 group"
        >
          <div className="flex items-center justify-between font-text text-xs text-[#5E6B3A]">
            <span className="font-medium">02 / Market microstructure</span>
            <span className="font-mono text-[#B4441F]">&lt; 380ns execution</span>
          </div>

          <h3 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#1F1A14] leading-[1.08] tracking-tight group-hover:text-[#B4441F] transition-colors">
            {highFrequencyTrading.statement}
          </h3>

          <p className="font-text text-base text-[#1F1A14]/80 font-normal leading-relaxed">
            {highFrequencyTrading.prose}
          </p>

          {/* Latency line chart visual that animates on hover */}
          <div className="pt-4 flex items-center gap-4">
            <svg viewBox="0 0 160 50" className="w-40 h-14 overflow-visible stroke-[#1F1A14]/30 group-hover:stroke-[#B4441F] transition-colors">
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
            <span className="font-text text-xs text-[#6B6254]">
              Deterministic nanosecond jitter
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
