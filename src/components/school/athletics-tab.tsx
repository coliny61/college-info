import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Users, Building, Award, History, Star } from 'lucide-react'

interface AthleticsTabProps {
  sports: Array<{
    id: string
    name: string
    conference: string
    headCoach: string
    record: string | null
    ranking: number | null
    coaches: Array<{
      id: string
      name: string
      title: string
      bio: string
      yearsAtSchool: number
      careerRecord: string | null
      championships: string[]
      previousRoles: string[]
      awards: string[]
      playersInNfl: number | null
    }>
  }>
  facilities: Array<{
    id: string
    name: string
    type: string
    description: string
    panoramaUrl: string | null
  }>
  colorPrimary: string
}

export function AthleticsTab({
  sports,
  facilities,
  colorPrimary,
}: AthleticsTabProps) {
  return (
    <div className="space-y-6">
      {/* Sports */}
      {sports.map((sport) => (
        <Card key={sport.id}>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Trophy
                    className="h-5 w-5"
                    style={{ color: colorPrimary }}
                  />
                  {sport.name}
                </CardTitle>
                <p className="mt-1 text-sm text-muted-foreground">
                  {sport.conference}
                </p>
              </div>
              <div className="flex items-center gap-2">
                {sport.record && (
                  <Badge variant="outline">{sport.record}</Badge>
                )}
                {sport.ranking && (
                  <Badge
                    style={{
                      backgroundColor: colorPrimary + '1A',
                      color: colorPrimary,
                    }}
                  >
                    #{sport.ranking}
                  </Badge>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <h4 className="mb-3 flex items-center gap-2 text-sm font-semibold text-foreground">
              <Users className="h-4 w-4" style={{ color: colorPrimary }} />
              Coaching Staff
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {sport.coaches.map((coach) => {
                const isHeadCoach = !!coach.careerRecord
                return (
                  <div
                    key={coach.id}
                    className={`rounded-lg border border-border p-3 ${isHeadCoach ? 'sm:col-span-2' : ''}`}
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-medium text-foreground">
                          {coach.name}
                        </p>
                        <p
                          className="text-xs font-medium"
                          style={{ color: colorPrimary }}
                        >
                          {coach.title}
                        </p>
                      </div>
                      <span className="rounded-full bg-muted px-2 py-0.5 text-xs text-muted-foreground">
                        {coach.yearsAtSchool}y
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground line-clamp-3">
                      {coach.bio}
                    </p>

                    {/* Coaching history for head coaches */}
                    {isHeadCoach && (
                      <div className="mt-3 space-y-2 border-t border-border pt-3">
                        <div className="flex flex-wrap items-center gap-2">
                          <Badge variant="outline" className="font-mono">
                            {coach.careerRecord}
                          </Badge>
                          {coach.playersInNfl != null && coach.playersInNfl > 0 && (
                            <Badge
                              style={{
                                backgroundColor: colorPrimary + '1A',
                                color: colorPrimary,
                              }}
                            >
                              {coach.playersInNfl} players to NFL
                            </Badge>
                          )}
                        </div>

                        {coach.championships.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {coach.championships.map((c) => (
                              <span
                                key={c}
                                className="inline-flex items-center gap-1 rounded-full bg-amber-500/10 px-2 py-0.5 text-xs text-amber-400"
                              >
                                <Trophy className="h-3 w-3" />
                                {c}
                              </span>
                            ))}
                          </div>
                        )}

                        {coach.awards.length > 0 && (
                          <div className="flex flex-wrap gap-1.5">
                            {coach.awards.map((a) => (
                              <span
                                key={a}
                                className="inline-flex items-center gap-1 rounded-full bg-emerald/10 px-2 py-0.5 text-xs text-emerald"
                              >
                                <Award className="h-3 w-3" />
                                {a}
                              </span>
                            ))}
                          </div>
                        )}

                        {coach.previousRoles.length > 0 && (
                          <div className="space-y-1">
                            <p className="flex items-center gap-1 text-xs font-medium text-muted-foreground">
                              <History className="h-3 w-3" />
                              Previous Roles
                            </p>
                            {coach.previousRoles.map((role) => (
                              <p key={role} className="ml-4 text-xs text-muted-foreground">
                                {role}
                              </p>
                            ))}
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      ))}

      {/* Facilities */}
      {facilities.length > 0 && (
        <div>
          <h3 className="mb-3 flex items-center gap-2 text-lg font-semibold text-foreground">
            <Building className="h-5 w-5" style={{ color: colorPrimary }} />
            Facilities
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {facilities.map((facility) => (
              <Card key={facility.id}>
                <CardContent className="p-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-foreground">
                        {facility.name}
                      </p>
                      <span
                        className="mt-1 inline-block rounded-full px-2 py-0.5 text-xs font-medium capitalize"
                        style={{
                          backgroundColor: colorPrimary + '1A',
                          color: colorPrimary,
                        }}
                      >
                        {facility.type.replace('-', ' ')}
                      </span>
                    </div>
                    {facility.panoramaUrl && (
                      <Badge variant="outline" className="text-xs">
                        360°
                      </Badge>
                    )}
                  </div>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                    {facility.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
