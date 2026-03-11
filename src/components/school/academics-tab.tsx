import Link from 'next/link'
import { BookOpen, GraduationCap, ArrowRight } from 'lucide-react'

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
  const stats = academics
    ? [
        ...(academics.ranking ? [{ label: 'US News Rank', value: `#${academics.ranking}` }] : []),
        { label: 'SAT Avg', value: academics.satAvg.toString() },
        { label: 'ACT Avg', value: academics.actAvg.toString() },
        { label: 'In-State', value: `$${academics.tuitionInState.toLocaleString()}` },
        { label: 'Out-of-State', value: `$${academics.tuitionOutOfState.toLocaleString()}` },
        { label: 'Retention', value: `${(academics.retentionRate * 100).toFixed(0)}%` },
        ...(academics.studentToFacultyRatio ? [{ label: 'Student:Faculty', value: `${academics.studentToFacultyRatio}:1` }] : []),
        ...(academics.athleteGraduationRate ? [{ label: 'Athlete Grad Rate', value: `${(academics.athleteGraduationRate * 100).toFixed(0)}%` }] : []),
      ]
    : []

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

      {/* College directory */}
      <div>
        <h3 className="text-display text-sm tracking-[0.15em] text-muted-foreground mb-6">
          Colleges & Departments
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {colleges.map((college) => (
            <Link
              key={college.id}
              href={isPublic ? `/schools/${schoolSlug}` : `/recruit/school/${schoolSlug}/college/${college.slug}`}
              className="group"
            >
              <div className="relative glass-panel overflow-hidden rounded-xl p-5 transition-all duration-300 hover:bg-white/[0.05] hover:-translate-y-0.5 hover:shadow-lg hover:shadow-black/10">
                {/* Left accent bar */}
                <div
                  className="absolute left-0 top-0 h-full w-1 transition-all duration-300 group-hover:w-1.5"
                  style={{ backgroundColor: colorPrimary }}
                />

                <div className="flex items-start justify-between pl-3">
                  <div className="flex items-start gap-3">
                    <BookOpen
                      className="mt-0.5 h-5 w-5 shrink-0"
                      style={{ color: colorPrimary }}
                    />
                    <div>
                      <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground transition-colors group-hover:text-emerald">
                        {college.name}
                      </h4>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {college.totalStudents.toLocaleString()} students
                      </p>
                    </div>
                  </div>
                  <ArrowRight className="h-4 w-4 text-muted-foreground/30 transition-all group-hover:translate-x-1 group-hover:text-emerald" />
                </div>

                <p className="mt-3 pl-3 text-sm text-muted-foreground line-clamp-2">
                  {college.description}
                </p>

                {/* Majors preview */}
                <div className="mt-3 pl-3 flex flex-wrap gap-1.5">
                  {college.majors.map((major) => (
                    <span
                      key={major.id}
                      className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 text-[10px] uppercase tracking-wider"
                      style={{
                        backgroundColor: colorPrimary + '10',
                        color: colorPrimary,
                      }}
                    >
                      <GraduationCap className="h-2.5 w-2.5" />
                      {major.name}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
