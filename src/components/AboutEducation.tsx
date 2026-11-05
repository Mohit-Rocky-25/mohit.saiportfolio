import { PORTFOLIO_CONFIG } from '../data/config'

export function AboutEducation() {
  return (
    <section id="about" className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#ECE6D6]/12 pb-6 mb-16">
        <div className="flex items-center gap-3 font-mono text-xs text-[#FF5A2C] uppercase tracking-widest">
          <span>03</span>
          <span>/</span>
          <span>About & Education</span>
        </div>
        <p className="font-mono text-xs text-[#9DB59A] mt-2 sm:mt-0">
          ACADEMIC TIMELINE & PHILOSOPHY
        </p>
      </div>

      {/* Asymmetric Two-Column Typographic Layout (No boxes!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left: Short Statement */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#ECE6D6] leading-[1.08] tracking-tight">
            Grounded in runtime determinism and invariant proofs.
          </h3>
          <p className="font-text text-base text-[#ECE6D6]/70 font-light leading-relaxed">
            I study computer science by taking systems apart: analyzing compiler ASTs, measuring CPU cache behavior, and building client-side tools that preserve total privacy.
          </p>
        </div>

        {/* Right: Vertical Timeline with Line */}
        <div className="lg:col-span-7 relative pl-8 border-l border-[#ECE6D6]/14 space-y-12">
          {PORTFOLIO_CONFIG.education.map((item, idx) => (
            <div key={idx} className="relative space-y-2">
              {/* Timeline marker node */}
              <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-[#0E1411] border-2 border-[#FF5A2C]" />

              <div className="flex justify-between items-baseline font-mono text-xs">
                <span className="text-[#FF5A2C] font-semibold">{item.period}</span>
                <span className="text-[#9DB59A]">{item.discipline}</span>
              </div>

              <h4 className="font-display text-xl sm:text-2xl font-bold text-[#ECE6D6]">
                {item.institution}
              </h4>

              <p className="font-text text-sm font-medium text-[#ECE6D6]/90">
                {item.degree}
              </p>

              <p className="font-text text-sm text-[#ECE6D6]/60 font-light leading-relaxed">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
