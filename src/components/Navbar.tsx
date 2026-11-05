import { useState, useEffect } from 'react'
import { PORTFOLIO_CONFIG } from '../data/config'

export function Navbar() {
  const [hidden, setHidden] = useState(false)
  const [lastScrollY, setLastScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      if (currentScrollY > 120 && currentScrollY > lastScrollY) {
        setHidden(true) // Scrolling down
      } else {
        setHidden(false) // Scrolling up or at top
      }
      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-40 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] bg-[#EFE8DC]/90 backdrop-blur-sm border-b border-[#1C1915]/10 ${
        hidden ? '-translate-y-full' : 'translate-y-0'
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 py-6 flex items-center justify-between">
        {/* Left Monogram */}
        <a
          href="#"
          className="font-serif text-2xl tracking-tight text-[#1C1915] hover:text-[#8A4B2A] transition-colors"
        >
          {PORTFOLIO_CONFIG.profile.monogram}
        </a>

        {/* Right Navigation & Links */}
        <div className="flex items-center gap-6 sm:gap-10 text-[14px] sm:text-[15px] text-[#1C1915]">
          <div className="hidden md:flex items-center gap-8">
            <a href="#work" className="editorial-link">
              Work
            </a>
            <a href="#about" className="editorial-link">
              About
            </a>
            <a href="#contact" className="editorial-link">
              Contact
            </a>
          </div>

          <div className="h-3 w-[1px] bg-[#1C1915]/20 hidden md:block" />

          {/* External text links */}
          <div className="flex items-center gap-5 sm:gap-7 text-xs sm:text-sm font-mono tracking-tight text-[#6F675B]">
            <a
              href={`mailto:${PORTFOLIO_CONFIG.contact.email}`}
              className="editorial-link hover:text-[#8A4B2A]"
            >
              Email
            </a>
            <a
              href={PORTFOLIO_CONFIG.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link hover:text-[#8A4B2A]"
            >
              GitHub
            </a>
            <a
              href={PORTFOLIO_CONFIG.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="editorial-link hover:text-[#8A4B2A]"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
