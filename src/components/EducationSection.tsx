import React from 'react'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import { GraduationCap, School, MapPin, Calendar, CheckCircle2, BookOpen } from 'lucide-react'

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="py-20 md:py-28 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-2">
              <GraduationCap className="w-4 h-4 text-blue-400" />
              <span>Academic Background</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Education & Academic Roots
            </h2>
          </div>
          <p className="text-zinc-400 text-sm max-w-md">
            Formal foundation in computer science engineering and analytical mathematics.
          </p>
        </div>

        {/* Education Bento / Timeline Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {PORTFOLIO_DATA.education.map((item, index) => {
            const isCollege = index === 0
            return (
              <div
                key={item.institution}
                className="group relative p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-all duration-300 backdrop-blur-sm flex flex-col justify-between"
              >
                {/* Accent glow on hover */}
                <div
                  className={`absolute top-0 right-0 w-32 h-32 rounded-full blur-3xl opacity-0 group-hover:opacity-15 transition-opacity pointer-events-none ${
                    isCollege ? 'bg-blue-500' : 'bg-emerald-500'
                  }`}
                />

                <div>
                  {/* Top Badge Strip */}
                  <div className="flex items-center justify-between mb-5">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-medium ${
                        isCollege
                          ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20'
                          : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                      }`}
                    >
                      {isCollege ? (
                        <GraduationCap className="w-3.5 h-3.5" />
                      ) : (
                        <School className="w-3.5 h-3.5" />
                      )}
                      {item.status}
                    </span>

                    <span className="flex items-center gap-1.5 text-xs font-mono text-zinc-400">
                      <Calendar className="w-3.5 h-3.5" />
                      {item.period}
                    </span>
                  </div>

                  {/* Institution & Degree */}
                  <h3 className="font-display text-xl sm:text-2xl font-bold text-white mb-1 group-hover:text-zinc-100 transition-colors">
                    {item.institution}
                  </h3>

                  <div className="flex items-center gap-2 text-zinc-300 font-medium text-sm sm:text-base mb-3">
                    <BookOpen className="w-4 h-4 text-zinc-400 shrink-0" />
                    <span>{item.field}</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-xs text-zinc-400 font-mono mb-6">
                    <MapPin className="w-3.5 h-3.5 text-zinc-500 shrink-0" />
                    <span>{item.location}</span>
                  </div>

                  {/* Details Bullet Points */}
                  <ul className="space-y-2.5 mb-6 text-sm text-zinc-400">
                    {item.details.map((detail, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 leading-relaxed">
                        <CheckCircle2 className="w-4 h-4 text-zinc-500 shrink-0 mt-0.5 group-hover:text-zinc-300 transition-colors" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tags Strip */}
                <div className="pt-4 border-t border-white/5 flex flex-wrap gap-1.5">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 rounded-md bg-zinc-800/60 text-zinc-300 font-mono text-[11px] border border-white/5"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
