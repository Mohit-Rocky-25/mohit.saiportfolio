import React, { useState, useEffect } from 'react'
import { soundFX } from '../utils/audio'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import { Mail, Check, Copy, Volume2, VolumeX, Menu, X, ArrowUpRight } from 'lucide-react'

interface NavbarProps {
  onCopyEmail: () => void
  copied: boolean
}

export const Navbar: React.FC<NavbarProps> = ({ onCopyEmail, copied }) => {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [soundActive, setSoundActive] = useState(soundFX.isEnabled())

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const toggleSound = () => {
    const newState = soundFX.toggle()
    setSoundActive(newState)
  }

  const navLinks = [
    { label: 'Projects', href: '#projects' },
    { label: 'Education', href: '#education' },
    { label: 'CP & HFT Systems', href: '#passions' },
    { label: 'Tech Stack', href: '#skills' },
    { label: 'Contact', href: '#contact' },
  ]

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#08080a]/85 backdrop-blur-md border-b border-white/10 py-3 shadow-2xl shadow-black/60'
          : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo / Monogram */}
          <a
            href="#"
            onClick={() => soundFX.click(700)}
            className="group flex items-center gap-3 focus:outline-none"
          >
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-800 to-zinc-950 border border-white/15 flex items-center justify-center font-display font-extrabold text-sm text-zinc-100 shadow-inner group-hover:border-white/30 transition-colors">
              MS
            </div>
            <div className="flex flex-col">
              <span className="font-display font-bold tracking-tight text-zinc-100 text-sm group-hover:text-white transition-colors">
                {PORTFOLIO_DATA.profile.name}
              </span>
              <span className="font-mono text-[11px] text-zinc-400">
                CSE Core · VIT-AP
              </span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1 bg-zinc-900/60 p-1.5 rounded-full border border-white/10 backdrop-blur-lg">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => soundFX.click(650)}
                className="px-3.5 py-1.5 text-xs font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Top Contact & Action Cluster */}
          <div className="hidden lg:flex items-center gap-2.5">
            {/* Email Direct Copy Button */}
            <button
              onClick={() => {
                soundFX.success()
                onCopyEmail()
              }}
              title="Copy Email to Clipboard"
              className="group flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-mono bg-zinc-900/80 hover:bg-zinc-800/90 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all shadow-sm active:scale-95"
            >
              <Mail className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white transition-colors" />
              <span className="truncate max-w-[170px]">{PORTFOLIO_DATA.profile.email}</span>
              {copied ? (
                <Check className="w-3.5 h-3.5 text-emerald-400 transition-all scale-110" />
              ) : (
                <Copy className="w-3.5 h-3.5 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
              )}
            </button>

            {/* LinkedIn Link */}
            <a
              href={PORTFOLIO_DATA.profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.click(750)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-zinc-900/80 hover:bg-zinc-800/90 border border-white/10 hover:border-white/20 text-zinc-300 hover:text-white transition-all"
            >
              <span>LinkedIn</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-500" />
            </a>

            {/* GitHub Link */}
            <a
              href={PORTFOLIO_DATA.profile.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.click(750)}
              className="flex items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium bg-white text-zinc-950 hover:bg-zinc-200 border border-white/20 transition-all font-mono font-semibold"
            >
              <span>GitHub</span>
              <ArrowUpRight className="w-3 h-3 text-zinc-700" />
            </a>

            {/* Sound Toggle */}
            <button
              onClick={toggleSound}
              title={soundActive ? 'Mute sound effects' : 'Unmute sound effects'}
              className="p-2 rounded-lg bg-zinc-900/80 hover:bg-zinc-800/90 border border-white/10 text-zinc-400 hover:text-zinc-200 transition-all"
            >
              {soundActive ? <Volume2 className="w-3.5 h-3.5 text-zinc-300" /> : <VolumeX className="w-3.5 h-3.5 text-zinc-500" />}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={() => {
                soundFX.click()
                setMobileMenuOpen(!mobileMenuOpen)
              }}
              className="p-2 rounded-xl bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 p-4 rounded-2xl bg-zinc-900/95 border border-white/10 backdrop-blur-xl flex flex-col gap-3 shadow-2xl animate-in fade-in slide-in-from-top-2">
            <div className="flex flex-col gap-1">
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={() => {
                    soundFX.click()
                    setMobileMenuOpen(false)
                  }}
                  className="px-3 py-2 text-sm font-medium text-zinc-300 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                >
                  {link.label}
                </a>
              ))}
            </div>

            <div className="pt-3 border-t border-white/10 flex flex-col gap-2">
              <button
                onClick={() => {
                  soundFX.success()
                  onCopyEmail()
                }}
                className="flex items-center justify-between px-3 py-2 rounded-lg bg-zinc-800/70 text-xs font-mono text-zinc-200 border border-white/5"
              >
                <span className="truncate">{PORTFOLIO_DATA.profile.email}</span>
                {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4 text-zinc-400" />}
              </button>

              <div className="grid grid-cols-2 gap-2">
                <a
                  href={PORTFOLIO_DATA.profile.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white text-zinc-950 font-mono text-xs font-semibold"
                >
                  GitHub
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
                <a
                  href={PORTFOLIO_DATA.profile.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1.5 py-2 rounded-lg bg-zinc-800 text-zinc-200 border border-white/10 font-medium text-xs"
                >
                  LinkedIn
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
