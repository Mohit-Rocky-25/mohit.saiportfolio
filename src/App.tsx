import { useEffect, useState } from 'react'
import Lenis from 'lenis'
import { Preloader } from './components/Preloader'
import { DogCursor } from './components/DogCursor'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { SelectedWork } from './components/SelectedWork'
import { AboutEducation } from './components/AboutEducation'
import { Interests } from './components/Interests'
import { SkillsTypography } from './components/SkillsTypography'
import { Footer } from './components/Footer'

export function App() {
  const [preloaderFinished, setPreloaderFinished] = useState(false)
  const [dogEnabled, setDogEnabled] = useState(true)

  // Initialize Lenis smooth scroll
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    let rafId: number
    function raf(time: number) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return (
    <div className="min-h-screen bg-[#0E1411] text-[#ECE6D6] relative selection:bg-[#FF5A2C] selection:text-[#0E1411]">
      {/* Short preloader */}
      <Preloader onComplete={() => setPreloaderFinished(true)} />

      {/* The Dog Cursor Signature */}
      <DogCursor enabled={dogEnabled} />

      {/* Fixed Minimal Header */}
      <Navbar />

      {/* Main Content */}
      <main
        className={`transition-opacity duration-700 ${
          preloaderFinished ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <Hero />
        <SelectedWork />
        <AboutEducation />
        <Interests />
        <SkillsTypography />
      </main>

      {/* Footer & Dog Toggle */}
      <Footer
        dogEnabled={dogEnabled}
        onToggleDog={() => setDogEnabled(!dogEnabled)}
      />
    </div>
  )
}

export default App
