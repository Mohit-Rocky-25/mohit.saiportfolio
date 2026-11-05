import { useState, useEffect } from 'react'
import { PORTFOLIO_CONFIG } from '../data/config'

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 100 && currentScrollY > lastScrollY) {
        setHidden(true)
      } else {
        setHidden(false)
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#EAE2D1]/90 backdrop-blur-md border-b border-[#1F1A14]/14 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-5 flex items-center justify-between">
        {/* Left: "YMS" with the dog's ears peeking over the Y */}
        <a
          href="#"
          className="group relative inline-flex items-center text-xl font-display font-extrabold tracking-tight text-[#1F1A14] hover:text-[#B4441F] transition-colors"
        >
          {/* Dog's little ears peeking over the Y */}
          <span className="absolute -top-2 left-0.5 w-3 h-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 12 8" fill="none" className="w-full h-full">
              <path d="M1 8 C 1 2, 4 1, 5 7" stroke="#1F1A14" strokeWidth="1.2" fill="#A39B8B" />
              <path d="M7 7 C 8 1, 11 2, 11 8" stroke="#1F1A14" strokeWidth="1.2" fill="#A39B8B" />
            </svg>
          </span>
          <span className="bricolage-shift">YMS</span>
        </a>

        {/* Right Nav Links */}
        <div className="flex items-center gap-6 sm:gap-8 text-sm font-text text-[#1F1A14]">
          <div className="hidden md:flex items-center gap-6">
            <a href="#work" className="terracotta-link">
              Work
            </a>
            <a href="#about" className="terracotta-link">
              About
            </a>
            <a href="#interests" className="terracotta-link">
              Interests
            </a>
            <a href="#skills" className="terracotta-link">
              Skills
            </a>
            <a href="#contact" className="terracotta-link">
              Contact
            </a>
          </div>

          <span className="text-[#1F1A14]/20 hidden md:inline">|</span>

          <div className="flex items-center gap-5 text-sm text-[#5E6B3A]">
            <a
              href={`mailto:${PORTFOLIO_CONFIG.contact.email}`}
              className="terracotta-link hover:text-[#B4441F]"
            >
              Email
            </a>
            <a
              href={PORTFOLIO_CONFIG.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="terracotta-link hover:text-[#B4441F]"
            >
              GitHub
            </a>
            <a
              href={PORTFOLIO_CONFIG.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="terracotta-link hover:text-[#B4441F]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
