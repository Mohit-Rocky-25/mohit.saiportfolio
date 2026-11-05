import React, { useState, useEffect } from 'react'
import { soundFX } from '../utils/audio'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import { Code2, Zap, Activity, Clock, Terminal } from 'lucide-react'

export const DualPassionsSection: React.FC = () => {
  const { competitiveCoding, highFrequencyTrading } = PORTFOLIO_DATA.passions

  // Interactive CP complexity demo
  const [selectedComplexity, setSelectedComplexity] = useState<string>('O(N log N)')

  // Interactive HFT simulated tick state
  const [bidPrice, setBidPrice] = useState(18420.25)
  const [askPrice, setAskPrice] = useState(18420.30)
  const [latencyNs, setLatencyNs] = useState(412)
  const [tickCount, setTickCount] = useState(14820)

  useEffect(() => {
    const interval = setInterval(() => {
      // Simulate live sub-microsecond price ticks
      const delta = (Math.random() - 0.49) * 0.15
      setBidPrice((prev) => +(prev + delta).toFixed(2))
      setAskPrice((prev) => +(prev + delta + 0.05).toFixed(2))
      setLatencyNs(Math.floor(380 + Math.random() * 60))
      setTickCount((prev) => prev + 1)
    }, 1200)

    return () => clearInterval(interval)
  }, [])

  const complexityData: Record<string, { ops: string; rating: string; desc: string }> = {
    'O(1)': { ops: '1 op (~0.3 ns)', rating: 'Optimal', desc: 'Direct hash / array index access with zero growth.' },
    'O(log N)': { ops: '20 ops (~6 ns)', rating: 'Blazing', desc: 'Binary search & balanced tree branch navigation.' },
    'O(N)': { ops: '1,000,000 ops (~0.3 ms)', rating: 'Linear', desc: 'Single-pass traversal over continuous memory.' },
    'O(N log N)': { ops: '20,000,000 ops (~6.2 ms)', rating: 'Golden Standard', desc: 'Optimal sorting (MergeSort / QuickSort) & Segment Trees.' },
  }

  return (
    <section id="passions" className="py-20 md:py-24 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="mb-10">
          <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-2">
            <Activity className="w-4 h-4 text-amber-400" />
            <span>Dual Core Passions</span>
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
            Algorithms & High-Frequency Systems
          </h2>
          <p className="text-zinc-400 text-sm mt-1 max-w-xl">
            Where mathematical problem solving meets microsecond deterministic execution.
          </p>
        </div>

        {/* Dual Bento Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* 1. Competitive Coding Card */}
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-amber-500/30 transition-all backdrop-blur-sm flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-xs font-mono">
                  <Code2 className="w-3.5 h-3.5" />
                  <span>{competitiveCoding.tag}</span>
                </div>
                <span className="font-mono text-xs text-zinc-400">Time & Space Bounds</span>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-3">
                {competitiveCoding.title}
              </h3>

              {/* 2-3 lines of passion as requested */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 font-normal">
                {competitiveCoding.summary}
              </p>

              {/* Topics Pill Cloud */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {competitiveCoding.topics.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 font-mono text-xs border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Interactive Asymptotic Complexity Explorer */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-2.5">
                <span className="flex items-center gap-1.5">
                  <Terminal className="w-3.5 h-3.5 text-amber-400" />
                  <span>Complexity Benchmark (N = 10⁶)</span>
                </span>
                <span className="text-amber-400 font-semibold">{complexityData[selectedComplexity].rating}</span>
              </div>

              {/* Complexity Selector Tabs */}
              <div className="grid grid-cols-4 gap-1.5 mb-3">
                {Object.keys(complexityData).map((comp) => (
                  <button
                    key={comp}
                    onClick={() => {
                      soundFX.click(750)
                      setSelectedComplexity(comp)
                    }}
                    className={`py-1.5 px-2 rounded-lg text-xs font-mono transition-all text-center ${
                      selectedComplexity === comp
                        ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold'
                        : 'bg-zinc-900 text-zinc-400 hover:text-zinc-200 border border-transparent'
                    }`}
                  >
                    {comp}
                  </button>
                ))}
              </div>

              <div className="flex items-center justify-between font-mono text-xs text-zinc-300 pt-2 border-t border-white/5">
                <span className="text-zinc-400">Operations:</span>
                <span className="text-white font-semibold">{complexityData[selectedComplexity].ops}</span>
              </div>
              <p className="text-[11px] text-zinc-400 font-mono mt-1">
                {complexityData[selectedComplexity].desc}
              </p>
            </div>
          </div>

          {/* 2. High Frequency Trading Card (Presentable, Compact) */}
          <div className="p-6 sm:p-8 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-emerald-500/30 transition-all backdrop-blur-sm flex flex-col justify-between">
            <div>
              {/* Header */}
              <div className="flex items-center justify-between mb-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 text-xs font-mono">
                  <Zap className="w-3.5 h-3.5" />
                  <span>{highFrequencyTrading.tag}</span>
                </div>
                <div className="flex items-center gap-1.5 font-mono text-xs text-emerald-400">
                  <span className="inline-block w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span>{latencyNs} ns tick</span>
                </div>
              </div>

              <h3 className="font-display text-2xl font-bold text-white mb-3">
                {highFrequencyTrading.title}
              </h3>

              {/* Presentable concise prose */}
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed mb-6 font-normal">
                {highFrequencyTrading.summary}
              </p>

              {/* Topics Pill Cloud */}
              <div className="flex flex-wrap gap-1.5 mb-6">
                {highFrequencyTrading.topics.map((t) => (
                  <span
                    key={t}
                    className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-300 font-mono text-xs border border-white/5"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Compact Live Simulated Order-Book Visualizer */}
            <div className="p-4 rounded-xl bg-zinc-950/80 border border-white/10">
              <div className="flex items-center justify-between text-xs font-mono text-zinc-400 mb-3">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>L2 Order Book Simulator (INR/USDT)</span>
                </span>
                <span className="text-zinc-500">Tick #{tickCount}</span>
              </div>

              {/* Bid / Ask Spread Display */}
              <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                {/* Bid side */}
                <div className="p-2.5 rounded-lg bg-emerald-950/30 border border-emerald-500/20 flex flex-col">
                  <div className="flex justify-between text-[11px] text-emerald-400/80 mb-1">
                    <span>BEST BID</span>
                    <span>QTY</span>
                  </div>
                  <div className="flex justify-between font-bold text-emerald-300 text-sm">
                    <span>{bidPrice}</span>
                    <span className="text-xs text-zinc-400 font-normal">1,450</span>
                  </div>
                </div>

                {/* Ask side */}
                <div className="p-2.5 rounded-lg bg-rose-950/30 border border-rose-500/20 flex flex-col">
                  <div className="flex justify-between text-[11px] text-rose-400/80 mb-1">
                    <span>BEST ASK</span>
                    <span>QTY</span>
                  </div>
                  <div className="flex justify-between font-bold text-rose-300 text-sm">
                    <span>{askPrice}</span>
                    <span className="text-xs text-zinc-400 font-normal">2,100</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] font-mono text-zinc-400 mt-2.5 pt-2 border-t border-white/5">
                <span>Spread: <strong className="text-white">0.05</strong> (tight)</span>
                <span className="text-emerald-400 font-medium">Deterministic Match Core</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
