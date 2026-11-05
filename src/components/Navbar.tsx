import { PORTFOLIO_CONFIG } from '../data/config'

export function Navbar() {
  return (
    <nav
      style={{ backgroundColor: 'var(--scene-bg)' }}
      className="fixed top-0 left-0 right-0 z-40 h-[72px] transition-colors duration-300 border-b border-[#1F1A14]/14"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-full flex items-center justify-between">
        {/* Left: "YMS" with the dog's ears peeking over the Y */}
        <a
          href="#"
          className="group relative inline-flex items-center text-xl font-display font-extrabold tracking-tight text-[#1F1A14] hover:text-[#B4441F] transition-colors"
        >
          {/* Dog's little ears peeking over the Y */}
          <span className="absolute -top-2 left-0.5 w-3 h-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 12 8" fill="none" className="w-full h-full">
              <path d="M1 8 C 1 2, 4 1, 5 7" stroke="#F6F0E3" strokeWidth="1.2" fill="#2B211A" />
              <path d="M7 7 C 8 1, 11 2, 11 8" stroke="#F6F0E3" strokeWidth="1.2" fill="#2B211A" />
            </svg>
          </span>
          <span className="bricolage-shift">YMS</span>
        </a>

        {/* Right Nav Links */}
        <div className="flex items-center gap-6 sm:gap-8 text-sm font-text text-[#1F1A14]">
          <div className="hidden md:flex items-center gap-6 font-medium">
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

          <div className="flex items-center gap-5 text-sm font-medium text-[#5E6B3A]">
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
