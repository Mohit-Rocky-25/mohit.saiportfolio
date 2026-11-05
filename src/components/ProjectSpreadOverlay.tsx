import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { ProjectData } from '../data/config'

interface ProjectSpreadOverlayProps {
  project: ProjectData | null
  projects: ProjectData[]
  onClose: () => void
  onNavigate: (nextProject: ProjectData) => void
}

export function ProjectSpreadOverlay({
  project,
  projects,
  onClose,
  onNavigate,
}: ProjectSpreadOverlayProps) {
  useEffect(() => {
    if (!project) return

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose()
      } else if (e.key === 'ArrowRight') {
        const currentIndex = projects.findIndex((p) => p.id === project.id)
        const nextIndex = (currentIndex + 1) % projects.length
        onNavigate(projects[nextIndex])
      } else if (e.key === 'ArrowLeft') {
        const currentIndex = projects.findIndex((p) => p.id === project.id)
        const prevIndex = (currentIndex - 1 + projects.length) % projects.length
        onNavigate(projects[prevIndex])
      }
    }

    // Lock body scroll while overlay is open
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [project, projects, onClose, onNavigate])

  if (!project) return null

  const easeEditorial = [0.16, 1, 0.3, 1] as const

  return (
    <AnimatePresence>
      <motion.div
        key={project.id}
        initial={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
        animate={{ clipPath: 'polygon(0 0, 100% 0, 100% 100%, 0 100%)' }}
        exit={{ clipPath: 'polygon(0 100%, 100% 100%, 100% 100%, 0 100%)' }}
        transition={{ duration: 0.75, ease: easeEditorial }}
        className="fixed inset-0 z-50 bg-[#EFE8DC] text-[#1C1915] overflow-y-auto selection:bg-[#8A4B2A] selection:text-[#EFE8DC]"
      >
        {/* Top Control Bar */}
        <div className="sticky top-0 z-10 bg-[#EFE8DC]/95 backdrop-blur-sm border-b border-[#1C1915]/10 px-6 sm:px-12 py-5 flex items-center justify-between text-xs font-mono text-[#6F675B]">
          <div className="flex items-center gap-4">
            <span className="text-[#1C1915] font-semibold">{project.number}</span>
            <span>/</span>
            <span>03</span>
            <span className="hidden sm:inline text-[#1C1915]/30">|</span>
            <span className="hidden sm:inline">{project.accentDetail}</span>
          </div>

          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-4 text-[11px] text-[#6F675B]">
              <span>Use [← / →] to navigate</span>
            </div>

            <button
              onClick={onClose}
              className="text-[#1C1915] hover:text-[#8A4B2A] font-mono text-xs uppercase tracking-wider flex items-center gap-1.5 transition-colors focus:outline-none"
            >
              <span>Close</span>
              <span className="text-base leading-none">×</span>
            </button>
          </div>
        </div>

        {/* BESPOKE COMPOSITION 1: RepoPilot (Split-Monumental) */}
        {project.compositionStyle === 'split-monumental' && (
          <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-12 md:py-20 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left Monumental Title */}
            <div className="lg:col-span-6 lg:sticky lg:top-28">
              <span className="font-mono text-xs text-[#8A4B2A] uppercase tracking-widest block mb-4">
                Primary Architecture / {project.year}
              </span>
              <h2 className="font-serif text-5xl sm:text-7xl lg:text-8xl font-normal tracking-tight text-[#1C1915] leading-[0.92] mb-6">
                <span className="not-italic">Repo</span>
                <span className="italic">Pilot</span>
              </h2>
              <p className="font-sans text-lg sm:text-xl text-[#6F675B] font-light max-w-md leading-snug mb-10">
                {project.subtitle}
              </p>

              {/* Direct Links */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 pt-6 border-t border-[#1C1915]/10 text-sm">
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="editorial-link font-medium"
                >
                  View on GitHub →
                </a>
                {project.liveUrl && (
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link font-medium text-[#8A4B2A]"
                  >
                    Live site ↗
                  </a>
                )}
              </div>
            </div>

            {/* Right Editorial Spread */}
            <div className="lg:col-span-6 space-y-12">
              {/* Brief Section */}
              <div>
                <h3 className="font-mono text-xs text-[#6F675B] uppercase tracking-wider mb-4">
                  01 / System Overview
                </h3>
                <div className="space-y-4 font-sans text-base sm:text-lg text-[#1C1915] leading-relaxed font-light">
                  {project.brief.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>
              </div>

              {/* Built With: Running text separated by slashes, NOT chips! */}
              <div className="pt-8 border-t border-[#1C1915]/10">
                <h3 className="font-mono text-xs text-[#6F675B] uppercase tracking-wider mb-3">
                  02 / Built With
                </h3>
                <p className="font-mono text-xs sm:text-sm text-[#1C1915] leading-relaxed">
                  {project.builtWith.join('  /  ')}
                </p>
              </div>

              {/* Key Decisions: 3 short lines */}
              <div className="pt-8 border-t border-[#1C1915]/10">
                <h3 className="font-mono text-xs text-[#6F675B] uppercase tracking-wider mb-4">
                  03 / Key Decisions
                </h3>
                <ul className="space-y-3 font-sans text-sm sm:text-base text-[#1C1915] font-normal">
                  {project.keyDecisions.map((line, idx) => (
                    <li key={idx} className="flex items-baseline gap-3">
                      <span className="font-mono text-xs text-[#8A4B2A]">
                        0{idx + 1}.
                      </span>
                      <span className="text-[#1C1915]/90">{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* BESPOKE COMPOSITION 2: HireFlow (Left-Anchored Header with Column Split) */}
        {project.compositionStyle === 'left-anchored' && (
          <div className="max-w-[1440px] mx-auto px-6 sm:px-12 py-12 md:py-20">
            {/* Top Wide Banner Title */}
            <div className="border-b border-[#1C1915]/10 pb-10 mb-12">
              <div className="flex justify-between items-baseline mb-3">
                <span className="font-mono text-xs text-[#8A4B2A] uppercase tracking-widest">
                  Privacy-First Systems / {project.year}
                </span>
                <span className="font-mono text-xs text-[#6F675B]">
                  Client-Side Memory Execution
                </span>
              </div>
              <h2 className="font-serif text-5xl sm:text-7xl lg:text-9xl font-normal tracking-tight text-[#1C1915] leading-[0.9]">
                <span className="italic">Hire</span>Flow
              </h2>
              <p className="font-sans text-lg sm:text-2xl text-[#6F675B] font-light max-w-2xl mt-4">
                {project.subtitle}
              </p>
            </div>

            {/* Two Balanced Columns */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
              {/* Left Column: Brief & Direct Links */}
              <div className="lg:col-span-7 space-y-6">
                <h3 className="font-mono text-xs text-[#6F675B] uppercase tracking-wider">
                  01 / Engineering Purpose
                </h3>
                <div className="space-y-4 font-sans text-base sm:text-lg text-[#1C1915] leading-relaxed font-light">
                  {project.brief.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                </div>

                <div className="pt-8 flex items-center gap-8 text-sm">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link font-medium"
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>

              {/* Right Column: Key Decisions & Tech Stack */}
              <div className="lg:col-span-5 space-y-10 lg:border-l lg:border-[#1C1915]/10 lg:pl-12">
                <div>
                  <h3 className="font-mono text-xs text-[#6F675B] uppercase tracking-wider mb-4">
                    02 / Invariant Proofs
                  </h3>
                  <ul className="space-y-4 font-sans text-sm text-[#1C1915]">
                    {project.keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-[#8A4B2A]">
                          0{idx + 1}.
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="pt-6 border-t border-[#1C1915]/10">
                  <h3 className="font-mono text-xs text-[#6F675B] uppercase tracking-wider mb-3">
                    03 / Built With
                  </h3>
                  <p className="font-mono text-xs sm:text-sm text-[#1C1915] leading-relaxed">
                    {project.builtWith.join('  /  ')}
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* BESPOKE COMPOSITION 3: UniLang (Editorial-Dense) */}
        {project.compositionStyle === 'editorial-dense' && (
          <div className="max-w-[1200px] mx-auto px-6 sm:px-12 py-12 md:py-20">
            <div className="max-w-3xl mb-12">
              <span className="font-mono text-xs text-[#8A4B2A] uppercase tracking-widest block mb-3">
                Linguistic Systems / {project.year}
              </span>
              <h2 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal text-[#1C1915] leading-tight mb-4">
                Uni<span className="italic">Lang</span>
              </h2>
              <p className="font-sans text-base sm:text-xl text-[#6F675B] font-light">
                {project.subtitle}
              </p>
            </div>

            <div className="border-t border-[#1C1915]/10 pt-10 grid grid-cols-1 md:grid-cols-12 gap-10">
              <div className="md:col-span-8 space-y-4 font-sans text-base text-[#1C1915] leading-relaxed font-light">
                <h3 className="font-mono text-xs text-[#6F675B] uppercase tracking-wider mb-2">
                  01 / Contextual Linguistics
                </h3>
                {project.brief.map((paragraph, i) => (
                  <p key={i}>{paragraph}</p>
                ))}

                <div className="pt-6">
                  <h3 className="font-mono text-xs text-[#6F675B] uppercase tracking-wider mb-3">
                    02 / Key Decisions
                  </h3>
                  <ul className="space-y-3 font-sans text-sm text-[#1C1915]">
                    {project.keyDecisions.map((line, idx) => (
                      <li key={idx} className="flex items-baseline gap-3">
                        <span className="font-mono text-xs text-[#8A4B2A]">
                          0{idx + 1}.
                        </span>
                        <span>{line}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="md:col-span-4 space-y-8 md:border-l md:border-[#1C1915]/10 md:pl-8">
                <div>
                  <h3 className="font-mono text-xs text-[#6F675B] uppercase tracking-wider mb-3">
                    Tech Stack
                  </h3>
                  <p className="font-mono text-xs text-[#1C1915] leading-relaxed">
                    {project.builtWith.join('  /  ')}
                  </p>
                </div>

                <div className="pt-6 border-t border-[#1C1915]/10 flex flex-col gap-3 text-sm">
                  <a
                    href={project.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="editorial-link font-medium"
                  >
                    View on GitHub →
                  </a>
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="editorial-link font-medium text-[#8A4B2A]"
                    >
                      Live site ↗
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </motion.div>
    </AnimatePresence>
  )
}
