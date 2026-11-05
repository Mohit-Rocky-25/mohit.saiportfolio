import { useState } from 'react'
import { PORTFOLIO_CONFIG } from '../data/config'

export function SkillsTypography() {
  const { marqueeLine1, marqueeLine2, categories } = PORTFOLIO_CONFIG.skills
  const [activeProjectHighlight, setActiveProjectHighlight] = useState<string | null>(null)
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, skillName: string) => {
    e.dataTransfer.setData('text/plain', skillName)
  }

  const handleDragEnd = () => {
    window.dispatchEvent(
      new CustomEvent('dog-react', { detail: { action: 'sniff-hop' } })
    )
  }

  const isTermHighlighted = (termProject: string) => {
    if (!activeProjectHighlight) return true
    return termProject === activeProjectHighlight || termProject === 'all'
  }

  return (
    <section id="skills" className="py-20 sm:py-32 overflow-hidden max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="px-6 sm:px-10 lg:px-16 mb-10">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#1F1A14]/14 pb-5">
          <div className="flex items-center gap-3 font-text text-[13px] text-[#B4441F]">
            <span className="font-mono text-xs">05</span>
            <span>/</span>
            <span className="font-bold">Skills and Engineering Stack</span>
          </div>
          <p className="font-text text-xs sm:text-[13px] text-[#6B6254] mt-2 sm:mt-0 font-medium">
            Hover a project to trace its stack, or drag a skill onto the dog
          </p>
        </div>

        {/* 3 Small Project Filter Selectors sitting above the slider */}
        <div className="flex items-center gap-6 mt-6 font-text text-sm">
          <span className="text-xs text-[#6B6254] font-bold">Filter by project:</span>
          {[
            { id: 'repopilot', name: 'RepoPilot' },
            { id: 'hireflow', name: 'HireFlow' },
            { id: 'unilang', name: 'UniLang' },
          ].map((p) => {
            const isActive = activeProjectHighlight === p.id
            return (
              <button
                key={p.id}
                onMouseEnter={() => setActiveProjectHighlight(p.id)}
                onMouseLeave={() => setActiveProjectHighlight(null)}
                onClick={() =>
                  setActiveProjectHighlight(isActive ? null : p.id)
                }
                className={`transition-colors py-0.5 border-b font-medium text-xs sm:text-sm ${
                  isActive
                    ? 'border-[#B4441F] text-[#B4441F] font-bold'
                    : 'border-transparent text-[#6B6254] hover:text-[#1F1A14]'
                }`}
              >
                {p.name}
              </button>
            )
          })}
        </div>
      </div>

      {/* Two Oversized Moving Marquee Rows (Opposite directions, pauses on hover) */}
      <div className="space-y-3 mb-16 select-none">
        {/* Row 1: Leftward scroll */}
        <div className="flex whitespace-nowrap overflow-hidden border-t border-b border-[#1F1A14]/14 py-4 sm:py-5">
          <div className="animate-marquee-left flex gap-10 items-baseline font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#1F1A14]">
            {[...marqueeLine1, ...marqueeLine1].map((item, i) => {
              const highlighted = isTermHighlighted(item.project)
              const isTerracotta = i % 2 === 0
              return (
                <span
                  key={i}
                  className={`flex items-baseline gap-10 transition-opacity duration-300 ${
                    highlighted ? 'opacity-100' : 'opacity-25'
                  }`}
                >
                  <span
                    className={`${item.italic ? 'italic font-medium' : 'not-italic font-black'} ${
                      isTerracotta ? 'text-[#B4441F]' : 'text-[#5E6B3A]'
                    }`}
                  >
                    {item.text}
                  </span>
                  <span className="font-mono text-sm text-[#1F1A14]/20">/</span>
                </span>
              )
            })}
          </div>
        </div>

        {/* Row 2: Rightward scroll */}
        <div className="flex whitespace-nowrap overflow-hidden border-b border-[#1F1A14]/14 py-4 sm:py-5">
          <div className="animate-marquee-right flex gap-10 items-baseline font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#1F1A14]">
            {[...marqueeLine2, ...marqueeLine2].map((item, i) => {
              const highlighted = isTermHighlighted(item.project)
              const isOlive = i % 2 === 0
              return (
                <span
                  key={i}
                  className={`flex items-baseline gap-10 transition-opacity duration-300 ${
                    highlighted ? 'opacity-100' : 'opacity-25'
                  }`}
                >
                  <span
                    className={`${item.italic ? 'italic font-medium' : 'not-italic font-black'} ${
                      isOlive ? 'text-[#5E6B3A]' : 'text-[#B4441F]'
                    }`}
                  >
                    {item.text}
                  </span>
                  <span className="font-mono text-sm text-[#1F1A14]/20">/</span>
                </span>
              )
            })}
          </div>
        </div>
      </div>

      {/* Professional 4-Column Index with Context & Application */}
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-10">
          {categories.map((col) => (
            <div key={col.category} className="space-y-4">
              <div className="border-b border-[#1F1A14]/14 pb-3">
                <h4 className="font-display font-black text-base sm:text-lg text-[#1F1A14] tracking-tight">
                  {col.category}
                </h4>
                <p className="font-text text-xs text-[#6B6254] mt-1 font-medium leading-relaxed">
                  {col.description}
                </p>
              </div>

              <ul className="space-y-3 font-text text-sm">
                {col.items.map((item) => {
                  const isHovered = hoveredSkill === item.name
                  return (
                    <li
                      key={item.name}
                      draggable
                      onDragStart={(e) => handleDragStart(e, item.name)}
                      onDragEnd={handleDragEnd}
                      onMouseEnter={() => {
                        setHoveredSkill(item.name)
                        window.dispatchEvent(
                          new CustomEvent('dog-react', { detail: { action: 'perk' } })
                        )
                      }}
                      onMouseLeave={() => setHoveredSkill(null)}
                      className="group cursor-grab active:cursor-grabbing transition-colors"
                    >
                      <div className="flex items-baseline justify-between gap-2">
                        <span
                          className={`font-bold transition-colors ${
                            isHovered ? 'text-[#B4441F]' : 'text-[#1F1A14]'
                          }`}
                        >
                          {item.name}
                        </span>
                      </div>
                      <p className="text-xs text-[#6B6254] group-hover:text-[#1F1A14]/90 transition-colors mt-0.5 font-medium leading-snug">
                        {item.context}
                      </p>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
