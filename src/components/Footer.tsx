import React, { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

interface FooterProps {
  dogEnabled: boolean
  onToggleDog: () => void
}

export function Footer({ dogEnabled, onToggleDog }: FooterProps) {
  const emailRef = useRef<HTMLAnchorElement>(null)
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!emailRef.current) return
    const rect = emailRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = (e.clientX - centerX) * 0.16
    const distanceY = (e.clientY - centerY) * 0.16
    setMagneticOffset({ x: distanceX, y: distanceY })
  }

  const handleMouseLeave = () => {
    setMagneticOffset({ x: 0, y: 0 })
    window.dispatchEvent(
      new CustomEvent('dog-react', { detail: { action: 'idle-sit' } })
    )
  }

  const handleEmailHover = () => {
    window.dispatchEvent(
      new CustomEvent('dog-react', { detail: { action: 'sleep' } })
    )
  }

  return (
    <footer id="contact" className="pt-20 sm:pt-28 pb-12 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline border-b border-[#1F1A14]/14 pb-6 mb-12">
        <div className="flex items-center gap-3 font-text text-[13px] text-[#B4441F]">
          <span className="font-mono text-xs">06</span>
          <span>/</span>
          <span>Contact</span>
        </div>
        <p className="font-text text-[13px] text-[#6B6254] mt-2 sm:mt-0">
          Direct line and code repositories
        </p>
      </div>

      {/* Main Closing Section */}
      <div className="space-y-8">
        <h3 className="font-display text-[clamp(1.75rem,3.5vw,3rem)] font-bold text-[#1F1A14] tracking-tight">
          Let’s talk.
        </h3>

        {/* Magnetic Email Link */}
        <div className="inline-block">
          <motion.a
            ref={emailRef}
            href={`mailto:${PORTFOLIO_CONFIG.contact.email}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onMouseEnter={handleEmailHover}
            animate={{ x: magneticOffset.x, y: magneticOffset.y }}
            transition={{ type: 'spring', stiffness: 220, damping: 20 }}
            className="terracotta-link font-display text-2xl sm:text-3xl text-[#1F1A14] hover:text-[#B4441F]"
          >
            {PORTFOLIO_CONFIG.contact.email}
          </motion.a>
        </div>

        {/* GitHub & LinkedIn plain text links */}
        <div className="flex items-center gap-8 font-text text-sm text-[#5E6B3A]">
          <a
            href={PORTFOLIO_CONFIG.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="terracotta-link hover:text-[#B4441F]"
          >
            GitHub ({PORTFOLIO_CONFIG.contact.githubUsername}) ↗
          </a>
          <a
            href={PORTFOLIO_CONFIG.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="terracotta-link hover:text-[#B4441F]"
          >
            LinkedIn ↗
          </a>
        </div>

        {/* Tiny Footer Line with "Call the dog" Toggle */}
        <div className="pt-12 border-t border-[#1F1A14]/14 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-text text-[#6B6254]">
          <p>© {PORTFOLIO_CONFIG.profile.currentYear} {PORTFOLIO_CONFIG.profile.name}. B.Tech CSE Core, VIT-AP.</p>

          <button
            onClick={onToggleDog}
            className="flex items-center gap-2 hover:text-[#B4441F] transition-colors focus:outline-none"
          >
            <span
              className="w-2 h-2 rounded-full"
              style={{ backgroundColor: dogEnabled ? '#5E6B3A' : '#B4441F' }}
            />
            <span>{dogEnabled ? 'Call the dog: Active' : 'Call the dog: Resting'}</span>
          </button>
        </div>
      </div>
    </footer>
  )
}
