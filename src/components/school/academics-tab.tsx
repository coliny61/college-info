import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
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
}

export function AcademicsTab({
  academics,
  colleges,
  schoolSlug,
  colorPrimary,
}: AcademicsTabProps) {
  return (
    <div className="space-y-6">
      {/* Academic stats */}
      {academics && (
        <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {[
            { label: 'SAT Avg', value: academics.satAvg.toString() },
            { label: 'ACT Avg', value: academics.actAvg.toString() },
            {
              label: 'In-State Tuition',
              value: `$${academics.tuitionInState.toLocaleString()}`,
            },
            {
              label: 'Out-of-State',
              value: `$${academics.tuitionOutOfState.toLocaleString()}`,
            },
            {
              label: 'Retention',
              value: `${(academics.retentionRate * 100).toFixed(0)}%`,
            },
          ].map((stat) => (
            <Card key={stat.label}>
              <CardContent className="p-4 text-center">
                <p className="text-xs text-muted-foreground">{stat.label}</p>
                <p
                  className="mt-1 text-xl font-bold text-scoreboard"
                  style={{ color: colorPrimary }}
                >
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* College directory */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">
          Colleges & Departments
        </h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {colleges.map((college, idx) => (
            <Link
              key={college.id}
              href={`/recruit/school/${schoolSlug}/college/${college.slug}`}
              className={`group animate-in-up delay-${idx + 1}`}
            >
              <Card className="h-full transition-all hover:border-[color:var(--school-color)] hover:shadow-lg hover:shadow-[color:var(--school-color)]/5"
                style={{ '--school-color': colorPrimary } as React.CSSProperties}
              >
                <CardContent className="p-5">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3">
                      <BookOpen
                        className="mt-0.5 h-5 w-5 shrink-0"
                        style={{ color: colorPrimary }}
                      />
                      <div>
                        <h4 className="font-semibold text-foreground group-hover:text-[color:var(--school-color)]"
                          style={{ '--school-color': colorPrimary } as React.CSSProperties}
                        >
                          {college.name}
                        </h4>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {college.totalStudents.toLocaleString()} students
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-[color:var(--school-color)]"
                      style={{ '--school-color': colorPrimary } as React.CSSProperties}
                    />
                  </div>

                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                    {college.description}
                  </p>

                  {/* Majors preview */}
                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {college.majors.map((major) => (
                      <span
                        key={major.id}
                        className="inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-xs"
                        style={{
                          backgroundColor: colorPrimary + '15',
                          color: colorPrimary,
                        }}
                      >
                        <GraduationCap className="h-3 w-3" />
                        {major.name}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </div>
  )
}
