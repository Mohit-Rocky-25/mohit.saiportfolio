import React from 'react'
import { soundFX } from '../utils/audio'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import { ArrowUp, Mail, Check, Copy } from 'lucide-react'
import { GithubIcon, LinkedinIcon } from './Icons'

interface FooterProps {
  onCopyEmail: () => void
  copied: boolean
}

export const Footer: React.FC<FooterProps> = ({ onCopyEmail, copied }) => {
  const scrollToTop = () => {
    soundFX.click(800)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <footer id="contact" className="border-t border-white/10 py-16 bg-zinc-950 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8 mb-12">
          {/* Identity & Closing */}
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="w-8 h-8 rounded-lg bg-zinc-900 border border-white/15 flex items-center justify-center font-display font-bold text-xs text-white">
                MS
              </div>
              <h4 className="font-display font-bold text-lg text-white">
                {PORTFOLIO_DATA.profile.name}
              </h4>
            </div>
            <p className="text-zinc-400 text-xs sm:text-sm max-w-md font-normal">
              Computer Science Undergraduate at <strong className="text-zinc-200">VIT-AP</strong> (CSE Core). Focused on competitive programming, low-latency architectures, and deterministic software engineering.
            </p>
          </div>

          {/* Social Links & Back to Top */}
          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={() => {
                soundFX.success()
                onCopyEmail()
              }}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-300 hover:text-white border border-white/10 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>{copied ? 'Email Copied!' : PORTFOLIO_DATA.profile.email}</span>
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5 text-zinc-500" />}
            </button>

            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.click(750)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
              title="GitHub Profile"
            >
              <GithubIcon className="w-4 h-4" />
            </a>

            <a
              href={PORTFOLIO_DATA.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.click(750)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white border border-white/10 transition-colors"
              title="LinkedIn Profile"
            >
              <LinkedinIcon className="w-4 h-4" />
            </a>

            <button
              onClick={scrollToTop}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-xs font-mono text-zinc-400 hover:text-white border border-white/10 transition-colors"
            >
              <span>Back to Top</span>
              <ArrowUp className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Bottom Credits & Design Principles */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between text-xs text-zinc-500 font-mono gap-4">
          <p>
            © {new Date().getFullYear()} Y. Mohit Sai. Crafted with zero boilerplate, strict TypeScript, and Vite.
          </p>
          <div className="flex items-center gap-4 text-[11px]">
            <span>Deterministic</span>
            <span>•</span>
            <span>Zero Slop</span>
            <span>•</span>
            <span>VIT-AP CSE Core</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
