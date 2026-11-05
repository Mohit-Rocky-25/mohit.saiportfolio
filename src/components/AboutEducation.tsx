import { PORTFOLIO_CONFIG } from '../data/config'

export function AboutEducation() {
  return (
    <section id="about" className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-16 border-b border-[#1C1915]/10 pb-6">
        <div className="flex items-center gap-3 font-mono text-xs text-[#8A4B2A] uppercase tracking-widest">
          <span>02</span>
          <span>/</span>
          <span>About & Education</span>
        </div>
        <p className="font-mono text-xs text-[#6F675B] mt-2 sm:mt-0">
          ACADEMIC FOUNDATION & PHILOSOPHY
        </p>
      </div>

      {/* Two-Column Editorial Layout (No boxes!) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-start">
        {/* Left Column: Big Italic Pull-Quote */}
        <div className="lg:col-span-6 lg:sticky lg:top-28">
          <blockquote className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal italic leading-[1.18] text-[#1C1915] tracking-tight">
            “Approaching computer science through mathematical invariants, deterministic logic, and software that remains provably reliable under extreme boundary constraints.”
          </blockquote>
          <p className="font-sans text-sm text-[#6F675B] mt-6 font-light">
            Undergraduate software engineer based at VIT-AP University.
          </p>
        </div>

        {/* Right Column: Clean Timeline Set as Typography with Hairlines */}
        <div className="lg:col-span-6 space-y-12">
          <div className="space-y-10">
            {PORTFOLIO_CONFIG.education.map((item, idx) => (
              <div
                key={idx}
                className="border-t border-[#1C1915]/14 pt-8"
              >
                <div className="flex justify-between items-baseline mb-3 font-mono text-xs text-[#6F675B]">
                  <span>{item.period}</span>
                  <span className="text-[#8A4B2A]">{item.discipline}</span>
                </div>

                <h3 className="font-serif text-2xl sm:text-3xl font-normal text-[#1C1915] mb-1">
                  {item.institution}
                </h3>

                <p className="font-sans text-sm sm:text-base text-[#1C1915]/90 font-medium mb-3">
                  {item.degree}
                </p>

                <p className="font-sans text-sm text-[#6F675B] font-light leading-relaxed">
                  {item.note}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
