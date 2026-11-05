import { useEffect, useState } from 'react'
import { motion, useSpring } from 'framer-motion'

interface CursorProps {
  cursorText?: string | null
  activeProjectPreview?: string | null
}

export function Cursor({ cursorText }: CursorProps) {
  const [visible, setVisible] = useState(false)
  const [isTouch, setIsTouch] = useState(false)

  // Smooth spring physics for slight lag
  const mouseX = useSpring(0, { damping: 28, stiffness: 320 })
  const mouseY = useSpring(0, { damping: 28, stiffness: 320 })

  useEffect(() => {
    // Detect touch-only devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouch(true)
      return
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
      if (!visible) setVisible(true)
    }

    const handleMouseLeave = () => setVisible(false)

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseleave', handleMouseLeave)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseleave', handleMouseLeave)
    }
  }, [mouseX, mouseY, visible])

  if (isTouch || !visible) return null

  const isViewMode = Boolean(cursorText)

  return (
    <motion.div
      style={{
        x: mouseX,
        y: mouseY,
        translateX: '-50%',
        translateY: '-50%',
      }}
      className="fixed top-0 left-0 pointer-events-none z-[99] flex items-center justify-center transition-opacity duration-300"
    >
      {isViewMode ? (
        <motion.div
          initial={{ scale: 0, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="w-16 h-16 rounded-full bg-[#1C1915] text-[#EFE8DC] font-mono text-[11px] uppercase tracking-widest flex items-center justify-center shadow-lg"
        >
          {cursorText}
        </motion.div>
      ) : (
        <motion.div
          className="w-2.5 h-2.5 rounded-full bg-[#1C1915]/70"
          animate={{ scale: 1 }}
          transition={{ duration: 0.15 }}
        />
      )}
    </motion.div>
  )
}
