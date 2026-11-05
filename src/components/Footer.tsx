import { useState, useRef } from 'react'
import { motion } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

export function Footer() {
  const emailRef = useRef<HTMLAnchorElement>(null)
  const [magneticOffset, setMagneticOffset] = useState({ x: 0, y: 0 })

  const handleMouseMove = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!emailRef.current) return
    const rect = emailRef.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2
    const distanceX = (e.clientX - centerX) * 0.18
    const distanceY = (e.clientY - centerY) * 0.18
    setMagneticOffset({ x: distanceX, y: distanceY })
  }

  const handleMouseLeave = () => {
    setMagneticOffset({ x: 0, y: 0 })
  }

  return (
    <footer id="contact" className="pt-24 sm:pt-36 pb-12 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-16 border-b border-[#1C1915]/10 pb-6">
        <div className="flex items-center gap-3 font-mono text-xs text-[#8A4B2A] uppercase tracking-widest">
          <span>05</span>
          <span>/</span>
          <span>Contact</span>
        </div>
        <p className="font-mono text-xs text-[#6F675B] mt-2 sm:mt-0">
          DISCUSSIONS & COLLABORATIONS
        </p>
      </div>

      {/* Main Closing Section */}
      <div className="py-8 sm:py-16">
        <h2 className="font-serif text-[clamp(3.5rem,10vw,10.5rem)] font-normal text-[#1C1915] leading-[0.9] tracking-tight mb-10 select-none">
          <span className="not-italic">Let’s </span>
          <span className="italic text-[#8A4B2A]">talk.</span>
        </h2>

        {/* Large Underlined Email Link with Magnetic Hover Effect */}
        <div className="overflow-hidden mb-16 inline-block">
          <motion.a
            ref={emailRef}
            href={`mailto:${PORTFOLIO_CONFIG.contact.email}`}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            animate={{ x: magneticOffset.x, y: magneticOffset.y }}
            transition={{ type: 'spring', stiffness: 240, damping: 20 }}
            className="editorial-link font-serif text-2xl sm:text-4xl lg:text-5xl font-normal text-[#1C1915] hover:text-[#8A4B2A]"
          >
            {PORTFOLIO_CONFIG.contact.email}
          </motion.a>
        </div>

        {/* GitHub & LinkedIn plain text links */}
        <div className="flex items-center gap-8 sm:gap-12 font-mono text-xs sm:text-sm text-[#6F675B] mb-24">
          <a
            href={PORTFOLIO_CONFIG.contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link hover:text-[#8A4B2A]"
          >
            GitHub ({PORTFOLIO_CONFIG.contact.githubUsername}) ↗
          </a>
          <a
            href={PORTFOLIO_CONFIG.contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="editorial-link hover:text-[#8A4B2A]"
          >
            LinkedIn ↗
          </a>
        </div>

        {/* Tiny Footer */}
        <div className="border-t border-[#1C1915]/14 pt-8 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-xs font-mono text-[#6F675B]">
          <p>© {PORTFOLIO_CONFIG.profile.currentYear} {PORTFOLIO_CONFIG.profile.fullName}.</p>
          <p>B.Tech CSE Core · VIT-AP University</p>
        </div>
      </div>
    </footer>
  )
}
