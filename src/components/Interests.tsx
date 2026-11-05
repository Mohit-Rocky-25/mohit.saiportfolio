import { useEffect, useState } from 'react'
import { PORTFOLIO_CONFIG } from '../data/config'

export function Interests() {
  const { competitiveProgramming, highFrequencyTrading } = PORTFOLIO_CONFIG.passions

  // Subtle simulated tick feed numbers (11px, muted, single thin line, no panel)
  const [ticks, setTicks] = useState([
    { sym: 'NIFTY', bid: '24,310.50', ask: '24,310.75', delta: '+0.15%' },
    { sym: 'ORDER_L3', lat: '380ns', depth: '4,200', jitter: '< 12ns' },
    { sym: 'BANKNIFTY', bid: '52,140.00', ask: '52,140.20', delta: '+0.08%' },
    { sym: 'MATCH_ENG', status: 'DETERMINISTIC', q: 'LOCK_FREE_RING' },
  ])

  useEffect(() => {
    const timer = setInterval(() => {
      setTicks((prev) => [
        ...prev.slice(1),
        {
          sym: 'TICK_' + Math.floor(1000 + Math.random() * 9000),
          lat: `${Math.floor(340 + Math.random() * 70)}ns`,
          depth: `${Math.floor(2000 + Math.random() * 5000)}`,
          jitter: `< ${Math.floor(8 + Math.random() * 6)}ns`,
        },
      ])
    }, 2400)
    return () => clearInterval(timer)
  }, [])

  return (
    <section id="interests" className="py-20 sm:py-28 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-12 border-b border-[#1C1915]/10 pb-6">
        <div className="flex items-center gap-3 font-mono text-xs text-[#8A4B2A] uppercase tracking-widest">
          <span>03</span>
          <span>/</span>
          <span>Interests</span>
        </div>
        <p className="font-mono text-xs text-[#6F675B] mt-2 sm:mt-0">
          ALGORITHMS & LOW-LATENCY SYSTEMS
        </p>
      </div>

      {/* Two Stacked Beats (Not boxes!) */}
      <div className="space-y-12 max-w-4xl">
        {/* Beat 1: Competitive Programming */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-[#6F675B] uppercase tracking-wider block">
            01 — Algorithmic Problem Solving
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1915] leading-tight">
            The discipline of <span className="italic text-[#8A4B2A]">optimal solutions</span> under tight asymptotic constraints.
          </h3>
          <p className="font-sans text-base sm:text-lg text-[#6F675B] font-light leading-relaxed max-w-2xl">
            {competitiveProgramming.prose}
          </p>
        </div>

        {/* Hairline Divider between beats */}
        <div className="w-full h-[1px] bg-[#1C1915]/14" />

        {/* Beat 2: High-Frequency Trading */}
        <div className="space-y-4">
          <span className="font-mono text-xs text-[#6F675B] uppercase tracking-wider block">
            02 — Market Microstructure
          </span>
          <h3 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal text-[#1C1915] leading-tight">
            A fascination with <span className="italic text-[#8A4B2A]">microsecond execution</span> and low-latency order matching.
          </h3>
          <p className="font-sans text-base sm:text-lg text-[#6F675B] font-light leading-relaxed max-w-2xl">
            {highFrequencyTrading.prose}
          </p>
        </div>
      </div>

      {/* Delicate Typographic Ticker: Single thin line, 11px, muted, NO panel */}
      <div className="mt-14 pt-4 border-t border-[#1C1915]/10 overflow-hidden text-[11px] font-mono text-[#6F675B] select-none flex items-center gap-8">
        <span className="text-[#8A4B2A] shrink-0 uppercase tracking-widest text-[10px]">
          TICKER STREAM
        </span>
        <div className="flex items-center gap-8 whitespace-nowrap overflow-x-hidden opacity-75">
          {ticks.map((t, idx) => (
            <span key={idx} className="flex items-center gap-2">
              <span className="text-[#1C1915] font-semibold">{t.sym}</span>
              {t.bid && <span>BID {t.bid}</span>}
              {t.ask && <span>ASK {t.ask}</span>}
              {t.lat && <span className="text-[#8A4B2A]">LATENCY {t.lat}</span>}
              {t.jitter && <span>JITTER {t.jitter}</span>}
              {t.status && <span>CORE {t.status}</span>}
              <span className="text-[#1C1915]/20">/</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
