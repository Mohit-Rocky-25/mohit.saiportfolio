import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PORTFOLIO_CONFIG } from '../data/config'

interface PreloaderProps {
  onComplete: () => void
}

export function Preloader({ onComplete }: PreloaderProps) {
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    // Quick, restrained editorial preloader (1.2s total)
    const timer = setTimeout(() => {
      setVisible(false)
      onComplete()
    }, 1300)

    return () => clearTimeout(timer)
  }, [onComplete])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          initial={{ opacity: 1 }}
          exit={{
            clipPath: 'polygon(0 0, 100% 0, 100% 0%, 0 0%)',
            transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] }
          }}
          className="fixed inset-0 z-[100] bg-[#EFE8DC] flex flex-col justify-between p-8 md:p-14 select-none"
        >
          {/* Top rail */}
          <div className="flex justify-between items-center text-xs font-mono tracking-widest text-[#6F675B] uppercase">
            <span>{PORTFOLIO_CONFIG.profile.monogram}</span>
            <span>{PORTFOLIO_CONFIG.profile.currentYear}</span>
          </div>

          {/* Center typography */}
          <div className="max-w-2xl">
            <div className="overflow-hidden mb-4">
              <motion.h1
                initial={{ y: '110%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                className="font-serif text-4xl sm:text-6xl md:text-7xl font-normal text-[#1C1915] tracking-tight"
              >
                <span className="not-italic">{PORTFOLIO_CONFIG.profile.nameFirst}</span>{' '}
                <span className="italic">{PORTFOLIO_CONFIG.profile.nameLast}</span>
              </motion.h1>
            </div>

            {/* Hairline progress reveal */}
            <div className="w-full h-[1px] bg-[#1C1915]/10 relative overflow-hidden">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
                className="absolute inset-0 bg-[#1C1915] origin-left"
              />
            </div>
          </div>

          {/* Bottom rail */}
          <div className="flex justify-between items-center text-xs font-mono text-[#6F675B]">
            <span>CSE CORE · VIT-AP</span>
            <span>INDEX 2026</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
