import React from 'react'
import type { Project } from '../data/portfolioData'
import { soundFX } from '../utils/audio'
import { X, ExternalLink, CheckCircle, Cpu, Layers } from 'lucide-react'
import { GithubIcon } from './Icons'

interface ProjectModalProps {
  project: Project | null
  onClose: () => void
}

export const ProjectModal: React.FC<ProjectModalProps> = ({ project, onClose }) => {
  if (!project) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-y-auto bg-black/80 backdrop-blur-md animate-in fade-in duration-200">
      <div
        className="relative w-full max-w-2xl rounded-2xl bg-zinc-900 border border-white/15 p-6 sm:p-8 shadow-2xl text-left overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Accent Gradient Bar */}
        <div
          className="absolute top-0 left-0 right-0 h-1.5"
          style={{ backgroundColor: project.accentColor }}
        />

        {/* Close Button */}
        <button
          onClick={() => {
            soundFX.click()
            onClose()
          }}
          className="absolute top-5 right-5 p-2 rounded-lg bg-zinc-800 hover:bg-zinc-700 text-zinc-400 hover:text-white transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="mb-6 pr-10">
          <div className="flex items-center gap-2 mb-2">
            <span
              className="px-2.5 py-0.5 rounded-full text-xs font-mono font-medium"
              style={{
                backgroundColor: `${project.accentColor}15`,
                color: project.accentColor,
                border: `1px solid ${project.accentColor}30`,
              }}
            >
              {project.category}
            </span>
            {project.isFlagship && (
              <span className="px-2 py-0.5 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 text-[11px] font-mono">
                Flagship Project
              </span>
            )}
          </div>

          <h3 className="font-display text-2xl sm:text-3xl font-bold text-white">
            {project.title}
          </h3>
          <p className="text-zinc-400 text-sm mt-1">{project.subtitle}</p>
        </div>

        {/* Deep Description */}
        <div className="mb-6 space-y-4">
          <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
            {project.description}
          </p>

          {/* Metrics Pill Grid */}
          <div className="grid grid-cols-3 gap-2.5 py-3 border-y border-white/10 font-mono">
            {project.metrics.map((m, i) => (
              <div key={i} className="p-2.5 rounded-lg bg-zinc-950/60 border border-white/5">
                <div className="text-[11px] text-zinc-400">{m.label}</div>
                <div className="text-sm font-bold text-white mt-0.5">{m.value}</div>
              </div>
            ))}
          </div>

          {/* Architecture Highlights */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-3">
              <Layers className="w-4 h-4 text-zinc-300" />
              <span>Architectural Invariants & Capabilities</span>
            </h4>
            <ul className="space-y-2">
              {project.architectureHighlights.map((highlight, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-zinc-300">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span>{highlight}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Complete Tech Stack */}
          <div>
            <h4 className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-zinc-400 mb-2.5">
              <Cpu className="w-4 h-4 text-zinc-300" />
              <span>Extracted Tech Stack & Libraries</span>
            </h4>
            <div className="flex flex-wrap gap-1.5">
              {project.techStack.map((tech) => (
                <span
                  key={tech}
                  className="px-2.5 py-1 rounded-md bg-zinc-800 text-zinc-200 text-xs font-mono border border-white/5"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Direct Action URLs */}
        <div className="flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
          <a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => soundFX.click(800)}
            className="flex-1 inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-white text-zinc-950 font-medium text-sm hover:bg-zinc-200 transition-colors font-mono"
          >
            <GithubIcon className="w-4 h-4" />
            <span>View Source on GitHub</span>
          </a>

          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => soundFX.click(800)}
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-white font-medium text-sm border border-white/10 transition-colors"
            >
              <span>Launch Live App</span>
              <ExternalLink className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
