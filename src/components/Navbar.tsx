import { PORTFOLIO_CONFIG } from '../data/config'

export function Navbar() {
  return (
    <nav
      style={{
        backgroundColor: 'var(--scene-bg)',
        color: 'var(--nav-ink)',
        borderColor: 'var(--nav-border)',
      }}
      className="fixed top-0 left-0 right-0 z-40 h-[72px] transition-colors duration-300 border-b"
    >
      <div className="max-w-[1440px] mx-auto px-6 sm:px-10 lg:px-16 h-full flex items-center justify-between">
        {/* Left: "YMS" with the dog's ears peeking over the Y */}
        <a
          href="#"
          style={{ color: 'var(--nav-ink)' }}
          className="group relative inline-flex items-center text-2xl font-display font-black tracking-tight transition-colors"
        >
          {/* Dog's little ears peeking over the Y */}
          <span className="absolute -top-2 left-0.5 w-3 h-2 pointer-events-none opacity-80 group-hover:opacity-100 transition-opacity">
            <svg viewBox="0 0 12 8" fill="none" className="w-full h-full">
              <path d="M1 8 C 1 2, 4 1, 5 7" stroke="#F6F0E3" strokeWidth="1.2" fill="#2B211A" />
              <path d="M7 7 C 8 1, 11 2, 11 8" stroke="#F6F0E3" strokeWidth="1.2" fill="#2B211A" />
            </svg>
          </span>
          <span>YMS</span>
        </a>

        {/* Right Nav Links */}
        <div style={{ color: 'var(--nav-ink)' }} className="flex items-center gap-6 sm:gap-8 text-sm font-text">
          <div className="hidden md:flex items-center gap-6 font-bold">
            <a href="#about" className="hover:opacity-75 transition-opacity">
              About
            </a>
            <a href="#work" className="hover:opacity-75 transition-opacity">
              Work
            </a>
            <a href="#interests" className="hover:opacity-75 transition-opacity">
              Interests
            </a>
            <a href="#skills" className="hover:opacity-75 transition-opacity">
              Skills
            </a>
            <a href="#contact" className="hover:opacity-75 transition-opacity">
              Contact
            </a>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono font-bold opacity-85">
            <a
              href={`mailto:${PORTFOLIO_CONFIG.contact.email}`}
              className="hover:opacity-100 underline underline-offset-2 transition-opacity"
            >
              Email
            </a>
            <a
              href={PORTFOLIO_CONFIG.contact.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 underline underline-offset-2 transition-opacity"
            >
              GitHub
            </a>
            <a
              href={PORTFOLIO_CONFIG.contact.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 underline underline-offset-2 transition-opacity"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </div>
    </nav>
  )
}
