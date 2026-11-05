import { useState } from 'react'
import { PORTFOLIO_CONFIG } from '../data/config'

export function SkillsTypography() {
  const { clusters } = PORTFOLIO_CONFIG.skills
  const [selectedProjectFilter, setSelectedProjectFilter] = useState<string>('all')
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null)

  const handleDragStart = (e: React.DragEvent, skillName: string) => {
    e.dataTransfer.setData('text/plain', skillName)
  }

  const handleDragEnd = () => {
    window.dispatchEvent(
      new CustomEvent('dog-react', { detail: { action: 'sniff-hop' } })
    )
  }

  return (
    <section id="skills" className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#ECE6D6]/12 pb-6 mb-12">
        <div className="flex items-center gap-3 font-mono text-xs text-[#FF5A2C] uppercase tracking-widest">
          <span>05</span>
          <span>/</span>
          <span>Skills Constellation</span>
        </div>
        <p className="font-mono text-xs text-[#9DB59A] mt-2 sm:mt-0">
          HOVER TO MAP · DRAG TERM ONTO DOG
        </p>
      </div>

      {/* Project Filter Selector */}
      <div className="flex flex-wrap items-center gap-4 sm:gap-6 mb-12 font-mono text-xs">
        <span className="text-[#ECE6D6]/40 uppercase tracking-widest text-[11px]">Filter by System:</span>
        {[
          { id: 'all', label: 'All Capabilities' },
          { id: 'repopilot', label: 'RepoPilot' },
          { id: 'hireflow', label: 'HireFlow' },
          { id: 'unilang', label: 'UniLang' },
        ].map((filter) => (
          <button
            key={filter.id}
            onClick={() => setSelectedProjectFilter(filter.id)}
            className={`transition-colors py-1 ${
              selectedProjectFilter === filter.id
                ? 'text-[#FF5A2C] font-semibold border-b border-[#FF5A2C]'
                : 'text-[#ECE6D6]/60 hover:text-[#ECE6D6]'
            }`}
          >
            {filter.label}
          </button>
        ))}
      </div>

      {/* Interactive Constellation Clusters (Plain text, NOT chips!) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-14">
        {clusters.map((cluster) => (
          <div key={cluster.category} className="space-y-4">
            <h4 className="font-mono text-xs text-[#9DB59A] uppercase tracking-wider border-b border-[#ECE6D6]/10 pb-2">
              {cluster.category}
            </h4>

            <ul className="space-y-2.5">
              {cluster.skills.map((skill) => {
                const isMatch =
                  selectedProjectFilter === 'all' ||
                  skill.projects.includes(selectedProjectFilter)
                const isHovered = hoveredSkill === skill.name

                return (
                  <li
                    key={skill.name}
                    draggable
                    onDragStart={(e) => handleDragStart(e, skill.name)}
                    onDragEnd={handleDragEnd}
                    onMouseEnter={() => {
                      setHoveredSkill(skill.name)
                      window.dispatchEvent(
                        new CustomEvent('dog-react', { detail: { action: 'perk' } })
                      )
                    }}
                    onMouseLeave={() => setHoveredSkill(null)}
                    className={`font-text text-base cursor-grab active:cursor-grabbing transition-all select-none ${
                      !isMatch
                        ? 'opacity-25'
                        : isHovered
                        ? 'text-[#FF5A2C] translate-x-1 font-semibold'
                        : 'text-[#ECE6D6]/85 hover:text-[#ECE6D6]'
                    }`}
                  >
                    <span>{skill.name}</span>
                    {skill.projects.length > 0 && isHovered && (
                      <span className="font-mono text-[10px] text-[#9DB59A] block mt-0.5">
                        Used in: {skill.projects.join(', ')}
                      </span>
                    )}
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </div>
    </section>
  )
}
