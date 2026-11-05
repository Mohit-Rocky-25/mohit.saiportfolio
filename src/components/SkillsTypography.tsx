import { useState } from 'react'
import { PORTFOLIO_CONFIG } from '../data/config'

export function SkillsTypography() {
  const { marqueeLine1, marqueeLine2, index } = PORTFOLIO_CONFIG.skills
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
    <section id="skills" className="py-24 sm:py-36 overflow-hidden max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="px-6 sm:px-10 lg:px-16 mb-12">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#1F1A14]/14 pb-6">
          <div className="flex items-center gap-3 font-text text-[13px] text-[#B4441F]">
            <span className="font-mono text-xs">05</span>
            <span>/</span>
            <span>Skills and systems</span>
          </div>
          <p className="font-text text-[13px] text-[#6B6254] mt-2 sm:mt-0">
            Hover a project to trace its stack, or drag a term onto the dog
          </p>
        </div>

        {/* 3 Small Project Filter Selectors sitting above the slider */}
        <div className="flex items-center gap-6 mt-8 font-text text-sm">
          <span className="text-xs text-[#6B6254] font-medium">Trace project:</span>
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
                className={`transition-colors py-0.5 border-b ${
                  isActive
                    ? 'border-[#B4441F] text-[#B4441F] font-semibold'
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
      <div className="space-y-4 mb-20 select-none">
        {/* Row 1: Leftward scroll */}
        <div className="flex whitespace-nowrap overflow-hidden border-t border-b border-[#1F1A14]/14 py-4 sm:py-6">
          <div className="animate-marquee-left flex gap-10 items-baseline font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#1F1A14]">
            {[...marqueeLine1, ...marqueeLine1].map((item, i) => {
              const highlighted = isTermHighlighted(item.project)
              const isTerracotta = i % 2 === 0
              return (
                <span
                  key={i}
                  className={`flex items-baseline gap-10 transition-opacity duration-300 ${
                    highlighted ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <span
                    className={`${item.italic ? 'italic font-light' : 'not-italic font-bold'} ${
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
        <div className="flex whitespace-nowrap overflow-hidden border-b border-[#1F1A14]/14 py-4 sm:py-6">
          <div className="animate-marquee-right flex gap-10 items-baseline font-display text-4xl sm:text-6xl lg:text-7xl tracking-tight text-[#1F1A14]">
            {[...marqueeLine2, ...marqueeLine2].map((item, i) => {
              const highlighted = isTermHighlighted(item.project)
              const isOlive = i % 2 === 0
              return (
                <span
                  key={i}
                  className={`flex items-baseline gap-10 transition-opacity duration-300 ${
                    highlighted ? 'opacity-100' : 'opacity-30'
                  }`}
                >
                  <span
                    className={`${item.italic ? 'italic font-light' : 'not-italic font-bold'} ${
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

      {/* Quiet 4-Column Plain-Text Index (No cards, no boxes!) */}
      <div className="px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">
          {index.map((col) => (
            <div key={col.category} className="space-y-4">
              <h4 className="font-text text-sm font-semibold text-[#5E6B3A] border-b border-[#1F1A14]/14 pb-2.5">
                {col.category}
              </h4>
              <ul className="space-y-2.5 font-text text-sm text-[#1F1A14]/85">
                {col.terms.map((term) => (
                  <li
                    key={term}
                    draggable
                    onDragStart={(e) => handleDragStart(e, term)}
                    onDragEnd={handleDragEnd}
                    onMouseEnter={() => {
                      setHoveredSkill(term)
                      window.dispatchEvent(
                        new CustomEvent('dog-react', { detail: { action: 'perk' } })
                      )
                    }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`cursor-grab active:cursor-grabbing transition-colors ${
                      hoveredSkill === term ? 'text-[#B4441F] font-medium' : 'hover:text-[#B4441F]'
                    }`}
                  >
                    {term}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
