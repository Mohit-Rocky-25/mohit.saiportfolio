import React from 'react'
import { soundFX } from '../utils/audio'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import { ArrowDown, Mail, Check, Copy, Sparkles } from 'lucide-react'
import { GithubIcon } from './Icons'

interface HeroProps {
  onCopyEmail: () => void
  copied: boolean
}

export const Hero: React.FC<HeroProps> = ({ onCopyEmail, copied }) => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-blue-600/10 via-emerald-500/10 to-purple-600/10 blur-[130px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 right-10 w-72 h-72 bg-blue-500/5 blur-[100px] rounded-full pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-start max-w-4xl">
          {/* Status Pill Badge */}
          <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-zinc-900/90 border border-white/10 backdrop-blur-md mb-8 shadow-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-mono text-xs text-zinc-300 tracking-tight">
              {PORTFOLIO_DATA.profile.statusBadge}
            </span>
            <span className="text-zinc-600">•</span>
            <span className="font-mono text-xs text-zinc-400">VIT-AP University</span>
          </div>

          {/* Main Title & Welcome */}
          <div className="space-y-4 mb-6">
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5 text-zinc-400" />
              <span>Digital Portfolio & Systems Lab</span>
            </div>

            <h1 className="font-display text-4xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-white leading-[1.08]">
              Hi, I'm{' '}
              <span className="bg-gradient-to-r from-white via-zinc-200 to-zinc-400 bg-clip-text text-transparent underline decoration-white/20 underline-offset-8">
                {PORTFOLIO_DATA.profile.name}
              </span>
              .
            </h1>

            <p className="font-display text-xl sm:text-2xl text-zinc-300 font-medium">
              Student at <span className="text-white font-semibold">VIT-AP</span> · Branch:{' '}
              <span className="text-white font-semibold">CSE Core</span>
            </p>
          </div>

          {/* Welcome Prose */}
          <p className="text-base sm:text-lg text-zinc-400 max-w-2xl leading-relaxed mb-8 font-normal">
            Welcome to my space. I am an undergraduate computer science engineer obsessed with{' '}
            <span className="text-zinc-200 font-medium">algorithmic problem solving</span>,{' '}
            <span className="text-zinc-200 font-medium">high-frequency systems architecture</span>, and building{' '}
            <span className="text-zinc-200 font-medium">deterministic client-side platforms</span> with verifiable test coverage.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-wrap items-center gap-3.5 mb-14">
            <a
              href="#projects"
              onClick={() => soundFX.click(700)}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 active:scale-95 transition-all shadow-lg shadow-white/10"
            >
              <span>Explore Projects</span>
              <ArrowDown className="w-4 h-4" />
            </a>

            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.click(650)}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white font-medium text-sm active:scale-95 transition-all"
            >
              <GithubIcon className="w-4 h-4" />
              <span>GitHub / {PORTFOLIO_DATA.profile.githubUsername}</span>
            </a>

            <button
              onClick={() => {
                soundFX.success()
                onCopyEmail()
              }}
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-zinc-900/80 hover:bg-zinc-800 border border-white/10 hover:border-white/20 text-zinc-200 hover:text-white font-medium text-sm active:scale-95 transition-all"
            >
              <Mail className="w-4 h-4 text-zinc-400" />
              <span>{copied ? 'Email Copied!' : 'Copy Email'}</span>
              {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
            </button>
          </div>

          {/* Live Engineering Metrics Grid */}
          <div className="w-full grid grid-cols-2 sm:grid-cols-4 gap-3 pt-6 border-t border-white/10">
            {PORTFOLIO_DATA.profile.stats.map((stat, i) => (
              <div
                key={i}
                className="p-3.5 rounded-xl bg-zinc-900/40 border border-white/5 hover:border-white/10 transition-colors"
              >
                <div className="font-mono text-xl sm:text-2xl font-bold text-white tracking-tight">
                  {stat.value}
                </div>
                <div className="text-xs text-zinc-400 mt-1 font-mono">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
