'use client'

import { useState } from 'react'
import {
  BookOpen,
  GraduationCap,
  ChevronDown,
  ChevronUp,
  DollarSign,
  Briefcase,
  TrendingUp,
  Users,
  Award,
} from 'lucide-react'

interface AcademicsTabProps {
  academics: {
    enrollment: number
    admissionRate: number
    satAvg: number
    actAvg: number
    tuitionInState: number
    tuitionOutOfState: number
    graduationRate: number
    medianEarnings: number
    retentionRate: number
    studentToFacultyRatio: number | null
    averageClassSize: number | null
    ranking: number | null
    athleteGraduationRate: number | null
  } | null
  colleges: Array<{
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
  }>
  schoolSlug: string
  colorPrimary: string
  isPublic?: boolean
}

export function AcademicsTab({
  academics,
  colleges,
  schoolSlug,
  colorPrimary,
  isPublic = false,
}: AcademicsTabProps) {
  const [expandedColleges, setExpandedColleges] = useState<Set<string>>(new Set())
  const [expandedMajors, setExpandedMajors] = useState<Set<string>>(new Set())
  const [majorView, setMajorView] = useState<Record<string, 'pathway' | 'careers'>>({})

  function toggleCollege(id: string) {
    setExpandedColleges((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function toggleMajor(id: string) {
    setExpandedMajors((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  function getMajorView(id: string) {
    return majorView[id] ?? 'pathway'
  }

  function setMajorViewTab(id: string, view: 'pathway' | 'careers') {
    setMajorView((prev) => ({ ...prev, [id]: view }))
  }

  const stats = academics
    ? [
        ...(academics.ranking ? [{ label: 'US News Rank', value: `#${academics.ranking}` }] : []),
        { label: 'SAT Avg', value: academics.satAvg.toString() },
        { label: 'ACT Avg', value: academics.actAvg.toString() },
        { label: 'In-State', value: `$${academics.tuitionInState.toLocaleString()}` },
        { label: 'Out-of-State', value: `$${academics.tuitionOutOfState.toLocaleString()}` },
        { label: 'Retention', value: `${(academics.retentionRate * 100).toFixed(0)}%` },
        ...(academics.studentToFacultyRatio
          ? [{ label: 'Student:Faculty', value: `${academics.studentToFacultyRatio}:1` }]
          : []),
        ...(academics.athleteGraduationRate
          ? [
              {
                label: 'Athlete Grad Rate',
                value: `${(academics.athleteGraduationRate * 100).toFixed(0)}%`,
              },
            ]
          : []),
      ]
    : []

  const totalMajors = colleges.reduce((sum, c) => sum + c.majors.length, 0)

  return (
    <div className="space-y-10 animate-in-up">
      {/* Stat strip */}
      {stats.length > 0 && (
        <div className="stat-strip flex-wrap gap-y-6 rounded-xl border border-border bg-card/50 py-6 px-4">
          {stats.map((stat) => (
            <div key={stat.label} className="min-w-[100px] py-1">
              <p className="text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
                {stat.label}
              </p>
              <p
                className="mt-1 text-scoreboard text-2xl font-bold"
                style={{ color: colorPrimary }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
      )}

      {/* Athlete Academic Support callout */}
      {academics?.athleteGraduationRate && (
        <div
          className="rounded-xl border p-5"
          style={{
            borderColor: colorPrimary + '30',
            backgroundColor: colorPrimary + '08',
          }}
        >
          <div className="flex items-start gap-3">
            <Award className="mt-0.5 h-5 w-5 shrink-0" style={{ color: colorPrimary }} />
            <div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                Athlete Academic Support
              </h3>
              <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                Student-athletes have access to dedicated academic advisors, mandatory study hall,
                priority registration, and tutoring services. The{' '}
                <span className="text-foreground font-medium">
                  {(academics.athleteGraduationRate * 100).toFixed(0)}% athlete graduation rate
                </span>{' '}
                {academics.athleteGraduationRate >= academics.graduationRate
                  ? 'exceeds'
                  : 'reflects the commitment of'}{' '}
                the general student body rate of{' '}
                {(academics.graduationRate * 100).toFixed(0)}%.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* College directory heading */}
      <div>
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-display text-sm tracking-[0.15em] text-muted-foreground">
            Colleges & Programs
          </h3>
          <span className="text-xs text-muted-foreground/60">
            {colleges.length} colleges &middot; {totalMajors} majors
          </span>
        </div>

        {/* College cards */}
        <div className="space-y-3">
          {colleges.map((college) => {
            const isExpanded = expandedColleges.has(college.id)
            return (
              <div
                key={college.id}
                className="glass-panel overflow-hidden rounded-xl transition-all duration-300"
              >
                {/* College header — clickable */}
                <button
                  onClick={() => toggleCollege(college.id)}
                  className="w-full text-left px-5 py-4 flex items-start justify-between hover:bg-white/[0.03] transition-colors"
                >
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg"
                      style={{ backgroundColor: colorPrimary + '15' }}
                    >
                      <BookOpen className="h-4 w-4" style={{ color: colorPrimary }} />
                    </div>
                    <div className="min-w-0">
                      <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                        {college.name}
                      </h4>
                      <div className="mt-1 flex items-center gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3" />
                          {college.totalStudents.toLocaleString()} students
                        </span>
                        <span>{college.majors.length} majors</span>
                      </div>
                      {!isExpanded && (
                        <p className="mt-1.5 text-xs text-muted-foreground/70 line-clamp-1">
                          {college.description}
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="ml-3 mt-1 shrink-0">
                    {isExpanded ? (
                      <ChevronUp className="h-4 w-4 text-muted-foreground" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    )}
                  </div>
                </button>

                {/* Expanded college content */}
                {isExpanded && (
                  <div className="border-t border-white/[0.04] px-5 pb-5 pt-4 space-y-4 animate-in-fade">
                    <p className="text-sm text-muted-foreground leading-relaxed">
                      {college.description}
                    </p>

                    {/* Majors list */}
                    <div className="space-y-2">
                      {college.majors.map((major) => {
                        const isMajorExpanded = expandedMajors.has(major.id)
                        const view = getMajorView(major.id)

                        return (
                          <div
                            key={major.id}
                            className="rounded-lg border border-white/[0.06] overflow-hidden"
                          >
                            {/* Major header */}
                            <button
                              onClick={() => toggleMajor(major.id)}
                              className="w-full text-left px-4 py-3 flex items-center justify-between hover:bg-white/[0.02] transition-colors"
                            >
                              <div className="flex items-center gap-2.5">
                                <GraduationCap
                                  className="h-4 w-4 shrink-0"
                                  style={{ color: colorPrimary }}
                                />
                                <div>
                                  <span className="text-sm font-medium text-foreground">
                                    {major.name}
                                  </span>
                                  <span
                                    className="ml-2 inline-flex rounded-sm px-1.5 py-0.5 text-[10px] uppercase tracking-wider font-medium"
                                    style={{
                                      backgroundColor: colorPrimary + '15',
                                      color: colorPrimary,
                                    }}
                                  >
                                    {major.degreeType}
                                  </span>
                                </div>
                              </div>
                              {isMajorExpanded ? (
                                <ChevronUp className="h-3.5 w-3.5 text-muted-foreground" />
                              ) : (
                                <ChevronDown className="h-3.5 w-3.5 text-muted-foreground" />
                              )}
                            </button>

                            {/* Expanded major content */}
                            {isMajorExpanded && (
                              <div className="border-t border-white/[0.04] px-4 pb-4 pt-3 space-y-4 animate-in-fade">
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                  {major.description}
                                </p>

                                {/* View toggle: Pathway / Careers */}
                                <div className="flex gap-1 rounded-lg bg-white/[0.03] p-1">
                                  <button
                                    onClick={() => setMajorViewTab(major.id, 'pathway')}
                                    className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                                      view === 'pathway'
                                        ? 'bg-white/[0.08] text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                  >
                                    4-Year Pathway
                                  </button>
                                  <button
                                    onClick={() => setMajorViewTab(major.id, 'careers')}
                                    className={`flex-1 rounded-md px-3 py-1.5 text-xs font-medium uppercase tracking-wider transition-colors ${
                                      view === 'careers'
                                        ? 'bg-white/[0.08] text-foreground'
                                        : 'text-muted-foreground hover:text-foreground'
                                    }`}
                                  >
                                    Career Outcomes
                                  </button>
                                </div>

                                {/* Pathway view */}
                                {view === 'pathway' && major.pathways.length > 0 && (
                                  <div className="relative ml-3 border-l border-border pl-5 space-y-4">
                                    {major.pathways.map((pathway) => (
                                      <div key={pathway.id} className="relative">
                                        {/* Timeline dot */}
                                        <div
                                          className="absolute -left-[1.45rem] top-1 h-2.5 w-2.5 rounded-full border-2"
                                          style={{
                                            borderColor: colorPrimary,
                                            backgroundColor: 'var(--background)',
                                          }}
                                        />
                                        <div className="flex items-baseline gap-2">
                                          <span
                                            className="text-scoreboard text-xs font-bold"
                                            style={{ color: colorPrimary }}
                                          >
                                            Year {pathway.year}
                                          </span>
                                          <span className="font-display text-xs font-medium uppercase tracking-wide text-foreground">
                                            {pathway.title}
                                          </span>
                                        </div>
                                        <p className="mt-1 text-xs text-muted-foreground leading-relaxed">
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
                                )}

                                {/* Careers view */}
                                {view === 'careers' && major.careerOutcomes.length > 0 && (
                                  <div className="space-y-2">
                                    {major.careerOutcomes.map((outcome) => (
                                      <div
                                        key={outcome.id}
                                        className="rounded-lg bg-white/[0.02] border border-white/[0.04] p-3"
                                      >
                                        <div className="flex items-start justify-between gap-3">
                                          <div className="flex items-start gap-2.5 min-w-0">
                                            <Briefcase
                                              className="mt-0.5 h-4 w-4 shrink-0"
                                              style={{ color: colorPrimary }}
                                            />
                                            <div className="min-w-0">
                                              <p className="text-sm font-medium text-foreground">
                                                {outcome.title}
                                              </p>
                                              <p className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                                                {outcome.description}
                                              </p>
                                            </div>
                                          </div>
                                          <div className="text-right shrink-0">
                                            <p className="flex items-center gap-0.5 text-scoreboard text-sm font-bold text-foreground">
                                              <DollarSign className="h-3 w-3" />
                                              {outcome.medianSalary.toLocaleString()}
                                            </p>
                                            <p className="flex items-center gap-0.5 text-[10px] text-emerald mt-0.5">
                                              <TrendingUp className="h-2.5 w-2.5" />+
                                              {(outcome.growthRate * 100).toFixed(0)}% growth
                                            </p>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
