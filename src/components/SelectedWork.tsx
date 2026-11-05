import { useState } from 'react'
import { PORTFOLIO_CONFIG } from '../data/config'
import type { ProjectData } from '../data/config'
import { ProjectSpreadOverlay } from './ProjectSpreadOverlay'

interface SelectedWorkProps {
  onCursorChange: (text: string | null) => void
}

export function SelectedWork({ onCursorChange }: SelectedWorkProps) {
  const projects = PORTFOLIO_CONFIG.projects
  const [hoveredProjectId, setHoveredProjectId] = useState<string | null>(null)
  const [activeSpreadProject, setActiveSpreadProject] = useState<ProjectData | null>(null)

  return (
    <section id="work" className="py-24 sm:py-36 px-6 sm:px-10 lg:px-16 max-w-[1440px] mx-auto w-full relative">
      {/* Section Rail Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-baseline mb-16 border-b border-[#1C1915]/10 pb-6">
        <div className="flex items-center gap-3 font-mono text-xs text-[#8A4B2A] uppercase tracking-widest">
          <span>01</span>
          <span>/</span>
          <span>Selected Work</span>
        </div>
        <p className="font-mono text-xs text-[#6F675B] mt-2 sm:mt-0">
          INDEX OF SYSTEMS & PLATFORMS
        </p>
      </div>

      {/* Index List (Not cards!) */}
      <div className="divide-y divide-[#1C1915]/14 border-t border-b border-[#1C1915]/14">
        {projects.map((proj) => {
          const isHovered = hoveredProjectId === proj.id
          const isOtherHovered = hoveredProjectId !== null && !isHovered

          return (
            <div
              key={proj.id}
              onMouseEnter={() => {
                setHoveredProjectId(proj.id)
                onCursorChange('View')
              }}
              onMouseLeave={() => {
                setHoveredProjectId(null)
                onCursorChange(null)
              }}
              className={`group transition-opacity duration-500 py-10 sm:py-16 cursor-pointer ${
                isOtherHovered ? 'opacity-25' : 'opacity-100'
              }`}
            >
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline">
                {/* Number & Year Column */}
                <div className="md:col-span-2 flex md:flex-col justify-between md:justify-start gap-1 font-mono text-xs text-[#6F675B]">
                  <span className="text-[#1C1915] font-semibold">{proj.number}</span>
                  <span>{proj.year}</span>
                </div>

                {/* Main Title & Descriptor Column */}
                <div
                  onClick={() => setActiveSpreadProject(proj)}
                  className="md:col-span-8 transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:translate-x-6"
                >
                  <h3
                    className={`font-serif tracking-tight text-[#1C1915] transition-colors group-hover:text-[#8A4B2A] ${
                      proj.isPrimary
                        ? 'text-[clamp(2.6rem,7vw,6.5rem)] leading-[0.92] font-normal'
                        : 'text-[clamp(2rem,4.5vw,3.8rem)] leading-[1] font-light text-[#1C1915]/80'
                    }`}
                  >
                    {proj.id === 'repopilot' ? (
                      <>
                        <span className="not-italic">Repo</span>
                        <span className="italic">Pilot</span>
                      </>
                    ) : proj.id === 'hireflow' ? (
                      <>
                        <span className="italic">Hire</span>Flow
                      </>
                    ) : (
                      <>
                        Uni<span className="italic">Lang</span>
                      </>
                    )}
                  </h3>

                  <p className="font-sans text-sm sm:text-base text-[#6F675B] mt-3 font-light max-w-xl">
                    {proj.descriptor}
                  </p>
                </div>

                {/* Right Action Column */}
                <div className="md:col-span-2 flex items-center justify-between md:justify-end gap-6 text-sm">
                  {/* Direct GitHub Link (works without opening the spread) */}
                  <a
                    href={proj.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    className="editorial-link font-mono text-xs text-[#6F675B] hover:text-[#8A4B2A]"
                    title={`Open ${proj.title} on GitHub`}
                  >
                    GitHub ↗
                  </a>

                  {/* Open Spread Indicator Arrow */}
                  <button
                    onClick={() => setActiveSpreadProject(proj)}
                    className="font-serif text-2xl sm:text-3xl text-[#1C1915] group-hover:text-[#8A4B2A] group-hover:translate-x-2 transition-all"
                    aria-label={`Open editorial spread for ${proj.title}`}
                  >
                    →
                  </button>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Full-Screen Editorial Spread Overlay */}
      <ProjectSpreadOverlay
        project={activeSpreadProject}
        projects={projects}
        onClose={() => setActiveSpreadProject(null)}
        onNavigate={(nextProj) => setActiveSpreadProject(nextProj)}
      />
    </section>
  )
}
