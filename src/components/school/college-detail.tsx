'use client'

import { useTrackDuration, useTrackEvent } from '@/hooks/use-analytics'
import { GraduationCap, DollarSign, Briefcase, ChevronDown, ChevronUp } from 'lucide-react'
import { useState } from 'react'

interface CollegeDetailProps {
  college: {
    id: string
    slug: string
    name: string
    description: string
    totalStudents: number
    majors: Array<{
      id: string
      name: string
      degreeType: string
      description: string
      pathways: Array<{
        id: string
        year: number
        title: string
        courses: string[]
        description: string
      }>
      careerOutcomes: Array<{
        id: string
        title: string
        medianSalary: number
        growthRate: number
        description: string
      }>
    }>
  }
  schoolId: string
  colorPrimary: string
}

export function CollegeDetail({ college, schoolId, colorPrimary }: CollegeDetailProps) {
  useTrackDuration(`college:${college.slug}`, schoolId)

  const trackEvent = useTrackEvent()
  const [expandedMajors, setExpandedMajors] = useState<Set<string>>(new Set())

  function toggleMajor(majorId: string, majorName: string) {
    setExpandedMajors((prev) => {
      const next = new Set(prev)
      if (next.has(majorId)) {
        next.delete(majorId)
      } else {
        next.add(majorId)
        trackEvent(`college:${college.slug}`, 'major_expand', schoolId, { major: majorName })
      }
      return next
    })
  }

  return (
    <div className="space-y-8 animate-in-up">
      {/* College overview */}
      <div>
        <h2 className="text-display text-3xl text-foreground">{college.name}</h2>
        <p className="mt-3 text-muted-foreground leading-relaxed">{college.description}</p>
        <div className="mt-3 flex items-center gap-4">
          <span className="text-scoreboard text-2xl font-bold" style={{ color: colorPrimary }}>
            {college.totalStudents.toLocaleString()}
          </span>
          <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
            students &middot; {college.majors.length} major{college.majors.length !== 1 ? 's' : ''}
          </span>
        </div>
      </div>

      <div className="section-divider" />

      {/* Majors */}
      <div className="space-y-3">
        {college.majors.map((major) => {
          const isExpanded = expandedMajors.has(major.id)
          return (
            <div key={major.id} className="glass-panel overflow-hidden rounded-xl">
              <button
                onClick={() => toggleMajor(major.id, major.name)}
                className="w-full text-left px-5 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <GraduationCap className="h-5 w-5 shrink-0" style={{ color: colorPrimary }} />
                  <div>
                    <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                      {major.name}
                    </h3>
                    <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      {major.degreeType}
                    </span>
                  </div>
                </div>
                {isExpanded ? (
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                ) : (
                  <ChevronDown className="h-4 w-4 text-muted-foreground" />
                )}
              </button>

              {isExpanded && (
                <div className="px-5 pb-5 space-y-5 border-t border-white/[0.04] pt-4">
                  <p className="text-sm text-muted-foreground">{major.description}</p>

                  {/* Degree Pathways — vertical timeline */}
                  {major.pathways.length > 0 && (
                    <div>
                      <h4 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-3">
                        Degree Pathway
                      </h4>
                      <div className="relative ml-3 border-l border-white/[0.08] pl-6 space-y-4">
                        {major.pathways.map((pathway) => (
                          <div key={pathway.id} className="relative">
                            {/* Timeline dot */}
                            <div
                              className="absolute -left-[27px] top-1 h-3 w-3 rounded-full border-2"
                              style={{
                                borderColor: colorPrimary,
                                backgroundColor: 'var(--background)',
                              }}
                            />
                            <span
                              className="text-scoreboard text-xs font-bold"
                              style={{ color: colorPrimary }}
                            >
                              Year {pathway.year}
                            </span>
                            <p className="font-display text-sm font-medium uppercase tracking-wide text-foreground mt-0.5">
                              {pathway.title}
                            </p>
                            <p className="mt-1 text-xs text-muted-foreground">
                              {pathway.description}
                            </p>
                            <div className="mt-2 flex flex-wrap gap-1">
                              {pathway.courses.map((course) => (
                                <span
                                  key={course}
                                  className="rounded-sm bg-white/[0.04] px-1.5 py-0.5 text-[10px] text-muted-foreground"
                                >
                                  {course}
                                </span>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Career Outcomes */}
                  {major.careerOutcomes.length > 0 && (
                    <div>
                      <h4 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-3">
                        Career Outcomes
                      </h4>
                      <div className="space-y-2">
                        {major.careerOutcomes.map((outcome) => (
                          <div
                            key={outcome.id}
                            className="flex items-center gap-4 rounded-lg bg-white/[0.02] p-3"
                          >
                            <Briefcase
                              className="h-4 w-4 shrink-0"
                              style={{ color: colorPrimary }}
                            />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-medium text-foreground">{outcome.title}</p>
                              <p className="text-xs text-muted-foreground truncate">{outcome.description}</p>
                            </div>
                            <div className="text-right shrink-0">
                              <p className="flex items-center gap-0.5 text-scoreboard text-sm font-bold text-foreground">
                                <DollarSign className="h-3 w-3" />
                                {outcome.medianSalary.toLocaleString()}
                              </p>
                              <p className="text-[10px] text-emerald">
                                +{(outcome.growthRate * 100).toFixed(0)}% growth
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
