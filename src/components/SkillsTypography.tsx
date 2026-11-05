import { PORTFOLIO_CONFIG } from '../data/config'

export function SkillsTypography() {
  const { marqueeLine1, marqueeLine2, index } = PORTFOLIO_CONFIG.skills

  return (
    <section id="skills" className="py-24 sm:py-36 overflow-hidden">
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 mb-16">
        {/* Section Rail Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#1C1915]/10 pb-6">
          <div className="flex items-center gap-3 font-mono text-xs text-[#8A4B2A] uppercase tracking-widest">
            <span>04</span>
            <span>/</span>
            <span>Skills & Tech Stack</span>
          </div>
          <p className="font-mono text-xs text-[#6F675B] mt-2 sm:mt-0">
            PROVEN IN PRODUCTION REPOSITORIES
          </p>
        </div>
      </div>

      {/* Two Oversized Horizontally Scrolling Marquee Lines (Opposite directions) */}
      <div className="space-y-4 mb-20 select-none pointer-events-none opacity-85">
        {/* Line 1: Leftward scroll */}
        <div className="flex whitespace-nowrap overflow-hidden border-t border-b border-[#1C1915]/10 py-3 sm:py-5">
          <div className="animate-marquee flex gap-8 items-baseline font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1C1915] font-normal tracking-tight">
            {[...marqueeLine1, ...marqueeLine1].map((skill, i) => (
              <span key={i} className="flex items-baseline gap-8">
                <span className={i % 2 === 1 ? 'italic text-[#8A4B2A]' : 'not-italic'}>
                  {skill}
                </span>
                <span className="font-mono text-xs text-[#1C1915]/20">/</span>
              </span>
            ))}
          </div>
        </div>

        {/* Line 2: Rightward scroll */}
        <div className="flex whitespace-nowrap overflow-hidden border-b border-[#1C1915]/10 py-3 sm:py-5">
          <div className="animate-marquee-reverse flex gap-8 items-baseline font-serif text-3xl sm:text-5xl lg:text-6xl text-[#1C1915] font-normal tracking-tight">
            {[...marqueeLine2, ...marqueeLine2].map((tool, i) => (
              <span key={i} className="flex items-baseline gap-8">
                <span className={i % 2 === 0 ? 'italic text-[#1C1915]' : 'not-italic text-[#8A4B2A]'}>
                  {tool}
                </span>
                <span className="font-mono text-xs text-[#1C1915]/20">/</span>
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Quiet 4-Column Text Index (No progress bars, no proficiency labels!) */}
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          {index.map((group) => (
            <div key={group.category} className="border-t border-[#1C1915]/14 pt-6">
              <h4 className="font-mono text-xs text-[#8A4B2A] uppercase tracking-wider mb-5">
                {group.category}
              </h4>
              <ul className="space-y-2.5 font-sans text-sm sm:text-[15px] text-[#1C1915] font-light leading-relaxed">
                {group.terms.map((term) => (
                  <li key={term} className="text-[#1C1915]/90 hover:text-[#8A4B2A] transition-colors">
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
