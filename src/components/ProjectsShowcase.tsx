import React, { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { soundFX } from '../utils/audio'
import { PORTFOLIO_DATA } from '../data/portfolioData'
import type { Project } from '../data/portfolioData'
import { ProjectModal } from './ProjectModal'
import { GithubIcon } from './Icons'
import {
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  CheckCircle2,
  Sliders,
  Grid3X3,
  BookOpen
} from 'lucide-react'

export const ProjectsShowcase: React.FC = () => {
  const projects = PORTFOLIO_DATA.projects
  const [currentIndex, setCurrentIndex] = useState(0)
  const [direction, setDirection] = useState(0)
  const [viewMode, setViewMode] = useState<'slider' | 'grid'>('slider')
  const [selectedModalProject, setSelectedModalProject] = useState<Project | null>(null)

  const currentProject = projects[currentIndex]

  const nextSlide = () => {
    soundFX.click(750)
    setDirection(1)
    setCurrentIndex((prev) => (prev + 1) % projects.length)
  }

  const prevSlide = () => {
    soundFX.click(650)
    setDirection(-1)
    setCurrentIndex((prev) => (prev - 1 + projects.length) % projects.length)
  }

  const goToSlide = (index: number) => {
    soundFX.click(700)
    setDirection(index > currentIndex ? 1 : -1)
    setCurrentIndex(index)
  }

  // Keyboard navigation for slider
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (selectedModalProject) return
      if (e.key === 'ArrowRight') nextSlide()
      if (e.key === 'ArrowLeft') prevSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [currentIndex, selectedModalProject])

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.35,
        ease: 'easeOut' as const,
      },
    },
    exit: (dir: number) => ({
      zIndex: 0,
      x: dir < 0 ? 80 : -80,
      opacity: 0,
      scale: 0.96,
      transition: {
        duration: 0.25,
        ease: 'easeIn' as const,
      },
    }),
  }

  return (
    <section id="projects" className="py-20 md:py-28 border-t border-white/5 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <div className="flex items-center gap-2 text-zinc-400 font-mono text-xs uppercase tracking-wider mb-2">
              <Sparkles className="w-4 h-4 text-blue-400" />
              <span>Flagship Engineering Work</span>
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold tracking-tight text-white">
              Engineered Software & Systems
            </h2>
            <p className="text-zinc-400 text-sm mt-1 max-w-xl">
              Explore primary open-source systems: RepoPilot, HireFlow v3, and UniLang. Click through to inspect source code and architecture briefs.
            </p>
          </div>

          {/* View Toggle Mode */}
          <div className="inline-flex items-center p-1 rounded-xl bg-zinc-900 border border-white/10 self-start md:self-auto">
            <button
              onClick={() => {
                soundFX.click()
                setViewMode('slider')
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'slider'
                  ? 'bg-white text-zinc-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Sliders className="w-3.5 h-3.5" />
              <span>Motion Deck</span>
            </button>
            <button
              onClick={() => {
                soundFX.click()
                setViewMode('grid')
              }}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-mono transition-all ${
                viewMode === 'grid'
                  ? 'bg-white text-zinc-950 font-bold shadow'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Grid3X3 className="w-3.5 h-3.5" />
              <span>Grid View</span>
            </button>
          </div>
        </div>

        {/* 1. MOTION SLIDER VIEW */}
        {viewMode === 'slider' && (
          <div className="relative">
            {/* Slider Deck Container */}
            <div className="relative min-h-[520px] rounded-3xl bg-zinc-900/50 border border-white/10 p-6 sm:p-10 backdrop-blur-md overflow-hidden flex flex-col justify-between">
              {/* Dynamic ambient background glow matching project color */}
              <div
                className="absolute -top-24 -right-24 w-96 h-96 rounded-full blur-[120px] opacity-20 pointer-events-none transition-all duration-700"
                style={{ backgroundColor: currentProject.accentColor }}
              />

              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentProject.id}
                  custom={direction}
                  variants={slideVariants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  className="flex flex-col justify-between h-full"
                >
                  <div>
                    {/* Top Meta Bar */}
                    <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
                      <div className="flex items-center gap-2">
                        <span
                          className="px-3 py-1 rounded-full text-xs font-mono font-medium"
                          style={{
                            backgroundColor: `${currentProject.accentColor}18`,
                            color: currentProject.accentColor,
                            border: `1px solid ${currentProject.accentColor}35`,
                          }}
                        >
                          {currentProject.category}
                        </span>

                        {currentProject.isFlagship && (
                          <span className="px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-300 border border-amber-500/25 text-xs font-mono">
                            ★ Primary Flagship
                          </span>
                        )}
                      </div>

                      <div className="font-mono text-xs text-zinc-500">
                        Project {currentIndex + 1} of {projects.length}
                      </div>
                    </div>

                    {/* Title & Subtitle */}
                    <div className="space-y-2 mb-4">
                      <h3 className="font-display text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
                        {currentProject.title}
                      </h3>
                      <p className="text-zinc-300 font-medium text-base sm:text-lg">
                        {currentProject.subtitle}
                      </p>
                    </div>

                    {/* Project Brief */}
                    <p className="text-zinc-400 text-sm sm:text-base leading-relaxed max-w-3xl mb-8">
                      {currentProject.brief}
                    </p>

                    {/* Architecture Highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                      {currentProject.architectureHighlights.map((hl, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-2.5 p-3 rounded-xl bg-zinc-950/40 border border-white/5 text-xs sm:text-sm text-zinc-300"
                        >
                          <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{hl}</span>
                        </div>
                      ))}
                    </div>

                    {/* Metrics Banner */}
                    <div className="grid grid-cols-3 gap-3 mb-8 font-mono">
                      {currentProject.metrics.map((m, i) => (
                        <div
                          key={i}
                          className="p-3 rounded-xl bg-zinc-950/60 border border-white/5 text-center sm:text-left"
                        >
                          <div className="text-[11px] text-zinc-500">{m.label}</div>
                          <div className="text-sm sm:text-base font-bold text-white mt-0.5">
                            {m.value}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Tech Stack Pills */}
                    <div className="mb-8">
                      <div className="text-xs font-mono text-zinc-500 uppercase tracking-wider mb-2">
                        Extracted Tech Stack
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {currentProject.techStack.map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-md bg-zinc-800/80 text-zinc-200 text-xs font-mono border border-white/5"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Action Bar (Direct Links & Quick Peek) */}
                  <div className="flex flex-wrap items-center justify-between gap-4 pt-6 border-t border-white/10">
                    <div className="flex flex-wrap items-center gap-3">
                      {/* Direct GitHub Link */}
                      <a
                        href={currentProject.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => soundFX.click(800)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-zinc-950 hover:bg-zinc-200 font-mono text-xs font-bold transition-all shadow-md active:scale-95"
                      >
                        <GithubIcon className="w-4 h-4" />
                        <span>GitHub Repository</span>
                        <ExternalLink className="w-3.5 h-3.5 text-zinc-600" />
                      </a>

                      {/* Live Demo URL if present */}
                      {currentProject.liveUrl && (
                        <a
                          href={currentProject.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => soundFX.click(800)}
                          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 hover:text-white font-medium text-xs border border-white/10 transition-all active:scale-95"
                        >
                          <span>Live Deployment</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {/* In-depth Architecture Brief Button */}
                      <button
                        onClick={() => {
                          soundFX.click(750)
                          setSelectedModalProject(currentProject)
                        }}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 text-zinc-300 hover:text-white font-mono text-xs border border-white/10 transition-colors"
                      >
                        <BookOpen className="w-3.5 h-3.5 text-zinc-400" />
                        <span>Architecture Brief</span>
                      </button>
                    </div>

                    {/* Prev / Next Slider Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={prevSlide}
                        aria-label="Previous Project"
                        className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-white/10 transition-all active:scale-95"
                      >
                        <ChevronLeft className="w-5 h-5" />
                      </button>
                      <button
                        onClick={nextSlide}
                        aria-label="Next Project"
                        className="p-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white border border-white/10 transition-all active:scale-95"
                      >
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>

            {/* Slide Indicators Strip */}
            <div className="flex items-center justify-center gap-2 mt-6">
              {projects.map((proj, idx) => (
                <button
                  key={proj.id}
                  onClick={() => goToSlide(idx)}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    currentIndex === idx
                      ? 'w-10 bg-white'
                      : 'w-2 bg-zinc-700 hover:bg-zinc-500'
                  }`}
                  aria-label={`Slide to project ${proj.title}`}
                />
              ))}
            </div>
          </div>
        )}

        {/* 2. EDITORIAL GRID VIEW */}
        {viewMode === 'grid' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {projects.map((proj, idx) => (
              <div
                key={proj.id}
                className="group p-6 rounded-2xl bg-zinc-900/40 border border-white/10 hover:border-white/20 transition-all duration-300 flex flex-col justify-between backdrop-blur-sm"
              >
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium"
                      style={{
                        backgroundColor: `${proj.accentColor}15`,
                        color: proj.accentColor,
                        border: `1px solid ${proj.accentColor}30`,
                      }}
                    >
                      {proj.category}
                    </span>
                    <span className="font-mono text-xs text-zinc-500">
                      0{idx + 1}
                    </span>
                  </div>

                  <h3 className="font-display text-2xl font-bold text-white mb-2 group-hover:text-zinc-100">
                    {proj.title}
                  </h3>
                  <p className="text-zinc-400 text-xs sm:text-sm mb-4 line-clamp-3">
                    {proj.brief}
                  </p>

                  <div className="flex flex-wrap gap-1 mb-6">
                    {proj.techStack.slice(0, 5).map((t) => (
                      <span
                        key={t}
                        className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-300 font-mono text-[11px]"
                      >
                        {t}
                      </span>
                    ))}
                    {proj.techStack.length > 5 && (
                      <span className="px-2 py-0.5 rounded bg-zinc-800 text-zinc-400 font-mono text-[11px]">
                        +{proj.techStack.length - 5}
                      </span>
                    )}
                  </div>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between gap-2">
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => soundFX.click(800)}
                    className="flex-1 inline-flex items-center justify-center gap-1.5 py-2 rounded-lg bg-white text-zinc-950 font-mono text-xs font-semibold hover:bg-zinc-200 transition-colors"
                  >
                    <GithubIcon className="w-3.5 h-3.5" />
                    <span>GitHub</span>
                    <ExternalLink className="w-3 h-3 text-zinc-600" />
                  </a>

                  <button
                    onClick={() => {
                      soundFX.click(750)
                      setSelectedModalProject(proj)
                    }}
                    className="p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-300 hover:text-white transition-colors"
                    title="Quick Brief"
                  >
                    <BookOpen className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Project Modal Preview */}
      <ProjectModal
        project={selectedModalProject}
        onClose={() => setSelectedModalProject(null)}
      />
    </section>
  )
}
