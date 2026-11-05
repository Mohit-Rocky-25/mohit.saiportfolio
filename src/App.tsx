import { useState } from 'react'
import confetti from 'canvas-confetti'
import { PORTFOLIO_DATA } from './data/portfolioData'
import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { ProjectsShowcase } from './components/ProjectsShowcase'
import { EducationSection } from './components/EducationSection'
import { DualPassionsSection } from './components/DualPassionsSection'
import { SkillsMatrix } from './components/SkillsMatrix'
import { Footer } from './components/Footer'
import { Check } from 'lucide-react'

export function App() {
  const [copied, setCopied] = useState(false)

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(PORTFOLIO_DATA.profile.email)
    setCopied(true)

    // Trigger subtle celebratory confetti
    try {
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { y: 0.15 },
        colors: ['#3b82f6', '#10b981', '#f59e0b', '#ffffff'],
        disableForReducedMotion: true,
      })
    } catch {
      // Confetti fallback
    }

    setTimeout(() => {
      setCopied(false)
    }, 2800)
  }

  return (
    <div className="min-h-screen bg-[#08080a] text-zinc-100 flex flex-col relative selection:bg-white/20 selection:text-white">
      {/* Background Subtle Grid Texture */}
      <div className="fixed inset-0 bg-grid-pattern pointer-events-none opacity-40 -z-20" />

      {/* Global Toast Notification */}
      {copied && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-zinc-900/95 border border-emerald-500/30 text-white shadow-2xl backdrop-blur-xl animate-in fade-in slide-in-from-bottom-3 font-mono text-xs">
          <div className="p-1 rounded-full bg-emerald-500/20 text-emerald-400">
            <Check className="w-3.5 h-3.5" />
          </div>
          <div className="flex flex-col">
            <span className="font-semibold text-emerald-300">Email Copied to Clipboard</span>
            <span className="text-zinc-400 text-[11px]">{PORTFOLIO_DATA.profile.email}</span>
          </div>
        </div>
      )}

      {/* Navigation */}
      <Navbar onCopyEmail={handleCopyEmail} copied={copied} />

      {/* Main Content Area */}
      <main className="flex-1">
        <Hero onCopyEmail={handleCopyEmail} copied={copied} />
        <ProjectsShowcase />
        <EducationSection />
        <DualPassionsSection />
        <SkillsMatrix />
      </main>

      {/* Footer */}
      <Footer onCopyEmail={handleCopyEmail} copied={copied} />
    </div>
  )
}

export default App
