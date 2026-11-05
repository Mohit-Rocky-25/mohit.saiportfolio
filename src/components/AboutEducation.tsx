import { PORTFOLIO_CONFIG } from '../data/config'

export function AboutEducation() {
  return (
    <section id="about" className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#1F1A14]/14 pb-6 mb-16">
        <div className="flex items-center gap-3 font-text text-[13px] text-[#B4441F]">
          <span className="font-mono text-xs">03</span>
          <span>/</span>
          <span>About and education</span>
        </div>
        <p className="font-text text-[13px] text-[#6B6254] mt-2 sm:mt-0">
          Academic timeline and engineering principles
        </p>
      </div>

      {/* Asymmetric Two-Column Typographic Layout (No boxes!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left: Short Statement */}
        <div className="lg:col-span-5 space-y-4">
          <h3 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#1F1A14] leading-[1.08] tracking-tight">
            Grounded in runtime determinism and invariant proofs.
          </h3>
          <p className="font-text text-base text-[#1F1A14]/80 font-normal leading-relaxed">
            I study computer science by analyzing how systems behave at their boundaries: examining compiler ASTs, profiling memory layout, and building client-side tools that prioritize verified citations.
          </p>
        </div>

        {/* Right: Vertical Timeline with Line */}
        <div className="lg:col-span-7 relative pl-8 border-l border-[#1F1A14]/14 space-y-12">
          {PORTFOLIO_CONFIG.education.map((item, idx) => (
            <div key={idx} className="relative space-y-2">
              {/* Timeline marker node */}
              <div className="absolute -left-[37px] top-1.5 w-3 h-3 rounded-full bg-[#EAE2D1] border-2 border-[#B4441F]" />

              <div className="flex justify-between items-baseline">
                <span className="font-mono text-xs text-[#B4441F] font-semibold">{item.period}</span>
                <span className="font-text text-xs text-[#5E6B3A] font-medium">{item.discipline}</span>
              </div>

              <h4 className="font-display text-xl sm:text-2xl font-bold text-[#1F1A14]">
                {item.institution}
              </h4>

              <p className="font-text text-sm font-medium text-[#1F1A14]/90">
                {item.degree}
              </p>

              <p className="font-text text-sm text-[#6B6254] font-normal leading-relaxed">
                {item.note}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
