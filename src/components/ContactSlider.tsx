import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

export function ContactSlider() {
  const [activeTab, setActiveTab] = useState(0)
  const [isHovered, setIsHovered] = useState(false)
  const [copied, setCopied] = useState(false)

  const channels = [
    {
      id: 'linkedin',
      order: '01',
      name: 'LinkedIn',
      label: 'Y. Mohit Sai',
      href: PORTFOLIO_CONFIG.contact.linkedin,
      actionText: 'Connect on LinkedIn',
      isEmail: false,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.28 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.75M6.46 10.9v8.37H9.2V10.9H6.46M7.83 6.45a1.6 1.6 0 0 0-1.6 1.6 1.6 1.6 0 0 0 1.6 1.6 1.6 1.6 0 0 0 1.6-1.6c0-.89-.72-1.6-1.6-1.6Z" />
        </svg>
      ),
    },
    {
      id: 'github',
      order: '02',
      name: 'GitHub',
      label: `@${PORTFOLIO_CONFIG.contact.githubUsername}`,
      href: PORTFOLIO_CONFIG.contact.github,
      actionText: 'Explore Repositories',
      isEmail: false,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0 0 22 12.017C22 6.484 17.522 2 12 2Z" />
        </svg>
      ),
    },
    {
      id: 'email',
      order: '03',
      name: 'Email',
      label: PORTFOLIO_CONFIG.contact.email,
      href: `mailto:${PORTFOLIO_CONFIG.contact.email}`,
      actionText: 'Copy or Send Email',
      isEmail: true,
      icon: (
        <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
          <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2Zm0 4-8 5-8-5V6l8 5 8-5v2Z" />
        </svg>
      ),
    },
  ]

  // Smooth auto-cycling slider when idle
  useEffect(() => {
    if (isHovered) return
    const timer = setInterval(() => {
      setActiveTab((prev) => (prev + 1) % channels.length)
    }, 4000)
    return () => clearInterval(timer)
  }, [isHovered, channels.length])

  const handleEmailClick = (e: React.MouseEvent) => {
    if (channels[activeTab].isEmail) {
      e.preventDefault()
      navigator.clipboard.writeText(PORTFOLIO_CONFIG.contact.email)
      setCopied(true)
      setTimeout(() => setCopied(false), 2400)
      window.location.href = `mailto:${PORTFOLIO_CONFIG.contact.email}`
    }
  }

  const current = channels[activeTab]

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative w-full max-w-2xl rounded-2xl bg-[#0C0C0E] border border-white/15 p-3 sm:p-4 shadow-2xl shadow-black/35 overflow-hidden select-none transition-all group"
    >
      {/* Background Tactile Texture & Subtle Grain */}
      <div
        className="absolute inset-0 bg-[radial-gradient(#ffffff0e_1px,transparent_1px)] [background-size:10px_10px] pointer-events-none"
        aria-hidden="true"
      />
      {/* Top subtle gloss hairline */}
      <div
        className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent pointer-events-none"
        aria-hidden="true"
      />

      {/* Header Info Row inside the slider */}
      <div className="relative z-10 flex items-center justify-between pb-2 mb-2.5 border-b border-white/10 text-xs">
        <div className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-white/70 font-extrabold">
          <span className="w-2 h-2 rounded-full bg-[#B4441F] animate-pulse" />
          <span>Contact me on</span>
        </div>
        <div className="flex items-center gap-2 font-mono text-[11px] text-white/45">
          <span className="font-bold text-white/70">{current.order}</span>
          <span>/</span>
          <span>03</span>
          <span className="hidden sm:inline text-white/30">• Click to open</span>
        </div>
      </div>

      {/* 3 Channels Slider Track (LinkedIn -> GitHub -> Email) */}
      <div className="relative z-10 grid grid-cols-3 gap-1 sm:gap-2 p-1 rounded-xl bg-white/[0.04] border border-white/10">
        {channels.map((chan, idx) => {
          const isActive = activeTab === idx
          return (
            <button
              key={chan.id}
              onClick={() => setActiveTab(idx)}
              onMouseEnter={() => setActiveTab(idx)}
              className={`relative py-2 sm:py-2.5 px-2 rounded-lg flex items-center justify-center gap-2 text-xs sm:text-sm transition-colors duration-200 ${
                isActive ? 'text-[#0C0C0E] font-black' : 'text-white/75 hover:text-white font-bold'
              }`}
            >
              {/* White Premium Slider Pill Indicator */}
              {isActive && (
                <motion.div
                  layoutId="contactSliderPill"
                  transition={{ type: 'spring', stiffness: 450, damping: 35 }}
                  className="absolute inset-0 bg-white rounded-lg shadow-lg pointer-events-none z-0"
                />
              )}

              <span className="relative z-10 flex items-center gap-1.5 sm:gap-2">
                <span className={isActive ? 'text-[#0C0C0E]' : 'text-white/80'}>{chan.icon}</span>
                <span className="tracking-tight">{chan.name}</span>
              </span>
            </button>
          )
        })}
      </div>

      {/* Active Channel Details & Direct Action Bar */}
      <div className="relative z-10 mt-3 pt-2.5 border-t border-white/10 flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 text-xs">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 font-mono"
          >
            <span className="text-white/50 text-[11px] font-medium">Handle:</span>
            <span className="text-white font-bold text-xs truncate max-w-[220px] sm:max-w-none">
              {current.label}
            </span>
          </motion.div>
        </AnimatePresence>

        <div className="flex items-center gap-2">
          {current.isEmail ? (
            <button
              onClick={handleEmailClick}
              className="px-3.5 py-1.5 rounded-full bg-white text-[#0C0C0E] hover:bg-white/90 text-xs font-mono font-black transition-all shadow-md inline-flex items-center gap-1.5"
            >
              <span>{copied ? '✓ Copied to clipboard!' : '✉ Send Email'}</span>
              <span>↗</span>
            </button>
          ) : (
            <a
              href={current.href}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full bg-white text-[#0C0C0E] hover:bg-white/90 text-xs font-mono font-black transition-all shadow-md inline-flex items-center gap-1.5"
            >
              <span>{current.actionText}</span>
              <span>↗</span>
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
