import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { Preloader } from './components/Preloader'
import { Cursor } from './components/Cursor'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SelectedWork } from './components/SelectedWork'
import { AboutEducation } from './components/AboutEducation'
import { Interests } from './components/Interests'
import { SkillsTypography } from './components/SkillsTypography'
import { Footer } from './components/Footer'

export function App() {
  const [cursorText, setCursorText] = useState<string | null>(null)
  const [preloaderFinished, setPreloaderFinished] = useState(false)

  // Initialize Lenis smooth inertial scrolling
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let animationFrameId: number

    function raf(time: number) {
      lenis.raf(time)
      animationFrameId = requestAnimationFrame(raf)
    }

    animationFrameId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(animationFrameId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#EFE8DC] text-[#1C1915] relative selection:bg-[#8A4B2A] selection:text-[#EFE8DC]">
      {/* Editorial Preloader */}
      <Preloader onComplete={() => setPreloaderFinished(true)} />

      {/* Floating Precision Cursor */}
      <Cursor cursorText={cursorText} />

      {/* Fixed Minimal Header */}
      <Navbar />

      {/* Editorial Body Spread */}
      <main className={`transition-opacity duration-700 ${preloaderFinished ? 'opacity-100' : 'opacity-0'}`}>
        <Hero />
        <SelectedWork onCursorChange={setCursorText} />
        <AboutEducation />
        <Interests />
        <SkillsTypography />
      </main>

      {/* Contact & Footer */}
      <Footer />
    </div>
  )
}

export default App
