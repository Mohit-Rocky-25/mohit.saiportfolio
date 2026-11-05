import React, { useState } from 'react'
import { soundFX } from '../utils/audio'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import { Cpu, Search, CheckCircle, Code, Layers, Wrench } from 'lucide-react'

export const SkillsMatrix: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('All')

  const categories = PORTFOLIO_DATA.skills.categories

  const categoryIcons: Record<string, React.ReactNode> = {
    'Languages': <Code className="w-4 h-4 text-blue-400" />,
    'Frontend & Client-Side Systems': <Layers className="w-4 h-4 text-emerald-400" />,
    'Systems, Architecture & Theory': <Cpu className="w-4 h-4 text-amber-400" />,
    'Tooling, Testing & Infrastructure': <Wrench className="w-4 h-4 text-purple-400" />,
  }

  const allCategoryNames = ['All', ...categories.map((c) => c.name)]

  // Filter skills based on search and category
  const filteredCategories = categories
    .map((cat) => {
      const filteredSkills = cat.skills.filter((skill) => {
        const matchesSearch =
          skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          skill.note.toLowerCase().includes(searchQuery.toLowerCase())
        return matchesSearch
      })
      return { ...cat, skills: filteredSkills }
    })
    .filter((cat) => {
      if (selectedCategory !== 'All' && cat.name !== selectedCategory) return false
      return cat.skills.length > 0
    })

  return (
    <section id="skills" className="py-20 md:py-28 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-2">
              <Cpu className="w-4 h-4 text-purple-400" />
              <span>Extracted Engineering Capabilities</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Tech Stack & Skill System
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-xl">
              Distilled from production repositories (RepoPilot, HireFlow v3, UniLang) and low-latency systems research.
            </p>
          </div>

          {/* Real-time Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="w-4 h-4 text-zinc-500 absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Filter skills, tools, or concepts..."
              className="w-full pl-9 pr-3 py-2 rounded-xl bg-zinc-900 border border-white/10 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-white/30 transition-all font-mono"
            />
          </div>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 mb-8">
          {allCategoryNames.map((name) => (
            <button
              key={name}
              onClick={() => {
                soundFX.click(700)
                setSelectedCategory(name)
              }}
              className={`px-3.5 py-1.5 rounded-lg text-xs font-mono transition-all ${
                selectedCategory === name
                  ? 'bg-white text-zinc-950 font-bold shadow'
                  : 'bg-zinc-900 text-zinc-400 hover:text-white border border-white/5'
              }`}
            >
              {name}
            </button>
          ))}
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredCategories.map((category) => (
            <div
              key={category.name}
              className="p-6 rounded-2xl bg-zinc-900/40 border border-white/10 backdrop-blur-sm flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-2 mb-2 font-display text-lg font-bold text-white">
                  {categoryIcons[category.name] || <CheckCircle className="w-4 h-4 text-blue-400" />}
                  <span>{category.name}</span>
                </div>
                <p className="text-zinc-400 text-xs mb-5 font-normal">
                  {category.description}
                </p>

                {/* Skill List */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {category.skills.map((skill) => (
                    <div
                      key={skill.name}
                      className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 hover:border-white/15 transition-all group"
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-mono text-xs font-semibold text-white group-hover:text-zinc-100">
                          {skill.name}
                        </span>
                        <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-zinc-800 text-zinc-300">
                          {skill.level}
                        </span>
                      </div>
                      <p className="text-[11px] text-zinc-400 font-mono leading-tight">
                        {skill.note}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
