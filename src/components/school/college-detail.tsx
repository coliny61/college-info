'use client'

import { useTrackDuration, useTrackEvent } from '@/hooks/use-analytics'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
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
    <div className="space-y-6 animate-in-up">
      {/* College overview */}
      <div>
        <p className="text-muted-foreground">{college.description}</p>
        <p className="mt-2 text-sm text-muted-foreground">
          <span className="text-scoreboard font-bold" style={{ color: colorPrimary }}>
            {college.totalStudents.toLocaleString()}
          </span>{' '}
          students &middot; {college.majors.length} major{college.majors.length !== 1 ? 's' : ''}
        </p>
      </div>

      {/* Majors */}
      {college.majors.map((major, idx) => {
        const isExpanded = expandedMajors.has(major.id)
        return (
          <Card key={major.id} className={`animate-in-up delay-${idx + 1}`}>
            <button
              onClick={() => toggleMajor(major.id, major.name)}
              className="w-full text-left px-6 py-4 flex items-center justify-between hover:bg-muted/30 transition-colors rounded-t-lg"
            >
              <div className="flex items-center gap-3">
                <GraduationCap className="h-5 w-5 shrink-0" style={{ color: colorPrimary }} />
                <div>
                  <h3 className="font-semibold text-foreground">{major.name}</h3>
                  <span className="text-xs text-muted-foreground">{major.degreeType}</span>
                </div>
              </div>
              {isExpanded ? (
                <ChevronUp className="h-4 w-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-4 w-4 text-muted-foreground" />
              )}
            </button>

            {isExpanded && (
              <CardContent className="pt-0 space-y-4">
                <p className="text-sm text-muted-foreground">{major.description}</p>

                {/* Degree Pathways */}
                {major.pathways.length > 0 && (
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Degree Pathway</h4>
                    <div className="space-y-2">
                      {major.pathways.map((pathway) => (
                        <div
                          key={pathway.id}
                          className="rounded-lg border border-border bg-muted/30 p-3"
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className="rounded-full px-2 py-0.5 text-xs font-medium"
                              style={{
                                backgroundColor: colorPrimary + '1A',
                                color: colorPrimary,
                              }}
                            >
                              Year {pathway.year}
                            </span>
                            <span className="text-sm font-medium text-foreground">
                              {pathway.title}
                            </span>
                          </div>
                          <p className="mt-1 text-xs text-muted-foreground">
                            {pathway.description}
                          </p>
                          <div className="mt-2 flex flex-wrap gap-1">
                            {pathway.courses.map((course) => (
                              <span
                                key={course}
                                className="rounded bg-background px-1.5 py-0.5 text-xs text-muted-foreground"
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
                  <div className="space-y-2">
                    <h4 className="text-sm font-medium text-foreground">Career Outcomes</h4>
                    {major.careerOutcomes.map((outcome) => (
                      <div
                        key={outcome.id}
                        className="flex items-center gap-4 rounded-lg border border-border p-3"
                      >
                        <Briefcase
                          className="h-4 w-4 shrink-0"
                          style={{ color: colorPrimary }}
                        />
                        <div className="flex-1">
                          <p className="text-sm font-medium text-foreground">{outcome.title}</p>
                          <p className="text-xs text-muted-foreground">{outcome.description}</p>
                        </div>
                        <div className="text-right">
                          <p className="flex items-center gap-1 text-sm font-bold text-foreground">
                            <DollarSign className="h-3 w-3" />
                            <span className="text-scoreboard">
                              {outcome.medianSalary.toLocaleString()}
                            </span>
                          </p>
                          <p className="text-xs text-emerald">
                            +{(outcome.growthRate * 100).toFixed(0)}% growth
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                <Separator />
              </CardContent>
            )}
          </Card>
        )
      })}
    </div>
  )
}
