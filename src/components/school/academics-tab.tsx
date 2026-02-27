import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { BookOpen, GraduationCap, DollarSign, Briefcase } from 'lucide-react'

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
  colorPrimary: string
}

export function AcademicsTab({
  academics,
  colleges,
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
                  className="mt-1 text-xl font-bold"
                  style={{ color: colorPrimary }}
                >
                  {stat.value}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      {/* Colleges */}
      {colleges.map((college) => (
        <Card key={college.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen
                    className="h-5 w-5"
                    style={{ color: colorPrimary }}
                  />
                  {college.name}
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {college.totalStudents.toLocaleString()} students
                </p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {college.description}
            </p>
          </CardHeader>
          <CardContent className="space-y-4">
            {college.majors.map((major, idx) => (
              <div key={major.id}>
                {idx > 0 && <Separator className="mb-4" />}
                <div className="space-y-3">
                  <div>
                    <div className="flex items-center gap-2">
                      <GraduationCap
                        className="h-4 w-4"
                        style={{ color: colorPrimary }}
                      />
                      <h4 className="font-medium text-foreground">
                        {major.name}
                      </h4>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {major.degreeType}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {major.description}
                    </p>
                  </div>

                  {/* Degree Pathways */}
                  {major.pathways.length > 0 && (
                    <div className="ml-6 space-y-2">
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
                  )}

                  {/* Career Outcomes */}
                  {major.careerOutcomes.length > 0 && (
                    <div className="ml-6">
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
                            <p className="text-sm font-medium text-foreground">
                              {outcome.title}
                            </p>
                            <p className="text-xs text-muted-foreground">
                              {outcome.description}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="flex items-center gap-1 text-sm font-bold text-foreground">
                              <DollarSign className="h-3 w-3" />
                              {outcome.medianSalary.toLocaleString()}
                            </p>
                            <p className="text-xs text-emerald">
                              +{(outcome.growthRate * 100).toFixed(0)}% growth
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
