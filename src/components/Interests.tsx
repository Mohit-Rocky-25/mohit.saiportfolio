import { useState } from 'react'
import { motion } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

export function Interests() {
  const { problemSolving, productCraft } = PORTFOLIO_CONFIG.passions
  const [hoveredSide, setHoveredSide] = useState<'problemSolving' | 'productCraft' | null>(null)

  return (
    <section id="interests" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#1F1A14]/14 pb-6 mb-16">
        <div className="flex items-center gap-3 font-text text-[13px] text-[#B4441F]">
          <span className="font-mono text-xs font-extrabold">04</span>
          <span>/</span>
          <span className="font-bold">Engineering approach & mindset</span>
        </div>
        <p className="font-text text-[13px] text-[#6B6254] mt-2 sm:mt-0">
          Problem-solving philosophy, execution velocity, and product ownership
        </p>
      </div>

      {/* Two Side-By-Side Bold Statements */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">
        {/* Left: Problem Solving & Adaptability */}
        <div
          onMouseEnter={() => setHoveredSide('problemSolving')}
          onMouseLeave={() => setHoveredSide(null)}
          className="space-y-6 group flex flex-col justify-between"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between font-text text-xs text-[#5E6B3A]">
              <span className="font-bold uppercase tracking-wider">{problemSolving.tag}</span>
              <span className="font-mono text-[#B4441F] font-bold bg-[#B4441F]/10 px-2 py-0.5 rounded border border-[#B4441F]/20">
                {problemSolving.badge}
              </span>
            </div>

            <h3 className="font-display text-[clamp(2rem,3.4vw,3.1rem)] font-black text-[#1F1A14] leading-[1.08] tracking-tight group-hover:text-[#B4441F] transition-colors">
              {problemSolving.statement}
            </h3>

            <p className="font-text text-base sm:text-lg text-[#1F1A14]/85 font-medium leading-relaxed">
              {problemSolving.prose}
            </p>

            {/* Recruiter-Focused Key Strengths Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {problemSolving.highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F1A14]/[0.04] border border-[#1F1A14]/12 text-xs font-mono font-semibold text-[#1F1A14]/80 group-hover:border-[#B4441F]/30 group-hover:bg-[#B4441F]/5 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5E6B3A] group-hover:bg-[#B4441F] transition-colors" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Ascending Momentum & Clarity Graphic */}
          <div className="pt-4 flex items-center gap-4 border-t border-[#1F1A14]/10">
            <svg
              viewBox="0 0 180 50"
              className="w-44 h-12 overflow-visible stroke-[#1F1A14]/30 group-hover:stroke-[#B4441F] transition-colors"
            >
              <line x1="0" y1="45" x2="180" y2="45" strokeWidth="1" strokeDasharray="2 2" />
              <line x1="0" y1="25" x2="180" y2="25" strokeWidth="1" strokeDasharray="2 2" strokeOpacity="0.3" />
              <motion.path
                d="M 0 45 C 50 45, 90 35, 130 18 C 150 10, 165 6, 180 5"
                fill="none"
                strokeWidth="2.2"
                stroke={hoveredSide === 'problemSolving' ? '#B4441F' : '#5E6B3A'}
                initial={{ pathLength: 0.85 }}
                animate={{ pathLength: hoveredSide === 'problemSolving' ? 1 : 0.85 }}
                transition={{ duration: 0.6 }}
              />
              <circle cx="0" cy="45" r="2.5" fill="#5E6B3A" />
              <circle cx="90" cy="35" r="2.5" fill="#5E6B3A" />
              <circle
                cx="180"
                cy="5"
                r="3.5"
                fill={hoveredSide === 'problemSolving' ? '#B4441F' : '#5E6B3A'}
              />
            </svg>
            <span className="font-text text-xs text-[#6B6254] font-medium">
              Execution momentum & clarity
            </span>
          </div>
        </div>

        {/* Right: Product Craft & Ownership */}
        <div
          onMouseEnter={() => setHoveredSide('productCraft')}
          onMouseLeave={() => setHoveredSide(null)}
          className="space-y-6 group flex flex-col justify-between"
        >
          <div className="space-y-5">
            <div className="flex items-center justify-between font-text text-xs text-[#5E6B3A]">
              <span className="font-bold uppercase tracking-wider">{productCraft.tag}</span>
              <span className="font-mono text-[#B4441F] font-bold bg-[#B4441F]/10 px-2 py-0.5 rounded border border-[#B4441F]/20">
                {productCraft.badge}
              </span>
            </div>

            <h3 className="font-display text-[clamp(2rem,3.4vw,3.1rem)] font-black text-[#1F1A14] leading-[1.08] tracking-tight group-hover:text-[#B4441F] transition-colors">
              {productCraft.statement}
            </h3>

            <p className="font-text text-base sm:text-lg text-[#1F1A14]/85 font-medium leading-relaxed">
              {productCraft.prose}
            </p>

            {/* Recruiter-Focused Key Strengths Badges */}
            <div className="flex flex-wrap gap-2 pt-2">
              {productCraft.highlights.map((item) => (
                <span
                  key={item}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#1F1A14]/[0.04] border border-[#1F1A14]/12 text-xs font-mono font-semibold text-[#1F1A14]/80 group-hover:border-[#B4441F]/30 group-hover:bg-[#B4441F]/5 transition-colors"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#5E6B3A] group-hover:bg-[#B4441F] transition-colors" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          {/* Precision Harmonic Wave & Polish Graphic */}
          <div className="pt-4 flex items-center gap-4 border-t border-[#1F1A14]/10">
            <svg
              viewBox="0 0 180 50"
              className="w-44 h-12 overflow-visible stroke-[#1F1A14]/30 group-hover:stroke-[#B4441F] transition-colors"
            >
              <line x1="0" y1="25" x2="180" y2="25" strokeWidth="1" strokeDasharray="2 2" />
              <motion.path
                d="M 0 25 Q 22.5 10, 45 25 T 90 25 T 135 25 T 180 25"
                fill="none"
                strokeWidth="2.2"
                stroke={hoveredSide === 'productCraft' ? '#B4441F' : '#5E6B3A'}
                initial={{ pathLength: 0.85 }}
                animate={{ pathLength: hoveredSide === 'productCraft' ? 1 : 0.85 }}
                transition={{ duration: 0.6 }}
              />
              <circle
                cx="180"
                cy="25"
                r="3.5"
                fill={hoveredSide === 'productCraft' ? '#B4441F' : '#5E6B3A'}
              />
            </svg>
            <span className="font-text text-xs text-[#6B6254] font-medium">
              Frictionless UX & polish
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}
