import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 1400)
    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
          }}
          className="fixed inset-0 z-[100] bg-[#0E1411] flex flex-col justify-between p-8 md:p-14 select-none"
        >
          {/* Top rail */}
          <div className="flex justify-between items-center text-xs font-mono tracking-widest text-[#9DB59A] uppercase">
            <span>YMS WORKSHOP</span>
            <span>{PORTFOLIO_CONFIG.profile.currentYear}</span>
          </div>

          {/* Center: Dog trotting across thin line while name fades in */}
          <div className="max-w-2xl w-full mx-auto space-y-6">
            <motion.h2
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              className="font-display text-3xl sm:text-4xl font-bold text-[#ECE6D6] tracking-tight text-center"
            >
              {PORTFOLIO_CONFIG.profile.name}
            </motion.h2>

            {/* Line with animated dog */}
            <div className="relative w-full h-[1px] bg-[#ECE6D6]/15">
              <motion.div
                initial={{ left: '0%' }}
                animate={{ left: '95%' }}
                transition={{ duration: 1.25, ease: 'linear' }}
                className="absolute -top-6 -translate-x-1/2"
              >
                {/* Pixel Dog Icon */}
                <svg width="24" height="20" viewBox="0 0 20 17" style={{ imageRendering: 'pixelated' }}>
                  <rect x="5" y="7" width="9" height="6" fill="#ECE6D6" rx="1" />
                  <rect x="7" y="8" width="3" height="3" fill="#8A7E6C" />
                  <rect x="11" y="4" width="6" height="5" fill="#ECE6D6" rx="1" />
                  <rect x="17" y="6" width="1.5" height="1.5" fill="#1C1915" />
                  <rect x="11" y="7.5" width="2" height="1" fill="#FF5A2C" />
                  <rect x="6" y="12" width="2" height="3" fill="#ECE6D6" />
                  <rect x="12" y="12" width="2" height="3" fill="#ECE6D6" />
                  <path d="M 5 8 Q 2 5 3 3" stroke="#ECE6D6" strokeWidth="1.5" fill="none" />
                </svg>
              </motion.div>
            </div>
          </div>

          {/* Bottom rail */}
          <div className="flex justify-between items-center text-xs font-mono text-[#ECE6D6]/40">
            <span>CSE CORE · VIT-AP</span>
            <span>INITIALIZING...</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
