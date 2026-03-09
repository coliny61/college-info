import { Badge } from '@/components/ui/badge'
import { Trophy, Users, Building, Award, History } from 'lucide-react'

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
    <div className="space-y-10 animate-in-up">
      {/* Sports */}
      {sports.map((sport) => (
        <div key={sport.id} className="space-y-4">
          {/* Sport header bar */}
          <div
            className="relative overflow-hidden rounded-xl px-6 py-5"
            style={{
              background: `linear-gradient(135deg, ${colorPrimary}20, ${colorPrimary}08)`,
            }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Trophy className="h-5 w-5" style={{ color: colorPrimary }} />
                <div>
                  <h3 className="text-display text-lg tracking-wide text-foreground">
                    {sport.name}
                  </h3>
                  <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
                    {sport.conference}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {sport.record && (
                  <span className="text-scoreboard text-lg font-bold text-foreground">
                    {sport.record}
                  </span>
                )}
                {sport.ranking && (
                  <Badge
                    style={{
                      backgroundColor: colorPrimary + '20',
                      color: colorPrimary,
                    }}
                    className="font-display text-sm"
                  >
                    #{sport.ranking}
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {/* Coaching staff */}
          <div>
            <h4 className="mb-3 flex items-center gap-2 text-display text-xs tracking-[0.15em] text-muted-foreground">
              <Users className="h-4 w-4" style={{ color: colorPrimary }} />
              Coaching Staff
            </h4>
            <div className="grid gap-3 sm:grid-cols-2">
              {sport.coaches.map((coach) => {
                const isHeadCoach = !!coach.careerRecord
                return (
                  <div
                    key={coach.id}
                    className={`relative glass-panel overflow-hidden rounded-xl p-4 ${isHeadCoach ? 'sm:col-span-2' : ''}`}
                  >
                    {/* Head coach left accent */}
                    {isHeadCoach && (
                      <div
                        className="absolute left-0 top-0 h-full w-1"
                        style={{ backgroundColor: colorPrimary }}
                      />
                    )}

                    <div className={`${isHeadCoach ? 'pl-3' : ''}`}>
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                            {coach.name}
                          </p>
                          <p
                            className="text-[10px] font-medium uppercase tracking-[0.15em]"
                            style={{ color: colorPrimary }}
                          >
                            {coach.title}
                          </p>
                        </div>
                        <span className="rounded-sm bg-white/[0.05] px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                          {coach.yearsAtSchool}y
                        </span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-3">
                        {coach.bio}
                      </p>

                      {/* Coaching history for head coaches */}
                      {isHeadCoach && (
                        <div className="mt-4 space-y-3 border-t border-white/[0.06] pt-4">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-scoreboard text-sm font-bold text-foreground">
                              {coach.careerRecord}
                            </span>
                            {coach.playersInNfl != null && coach.playersInNfl > 0 && (
                              <Badge
                                style={{
                                  backgroundColor: colorPrimary + '15',
                                  color: colorPrimary,
                                }}
                                className="text-[10px] uppercase tracking-wider"
                              >
                                {coach.playersInNfl} to NFL
                              </Badge>
                            )}
                          </div>

                          {coach.championships.length > 0 && (
                            <div className="flex flex-wrap gap-1.5">
                              {coach.championships.map((c) => (
                                <span
                                  key={c}
                                  className="inline-flex items-center gap-1 rounded-sm bg-gradient-to-r from-amber-500/15 to-amber-600/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-400"
                                >
                                  <Trophy className="h-2.5 w-2.5" />
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
                                  className="inline-flex items-center gap-1 rounded-sm bg-emerald/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald"
                                >
                                  <Award className="h-2.5 w-2.5" />
                                  {a}
                                </span>
                              ))}
                            </div>
                          )}

                          {coach.previousRoles.length > 0 && (
                            <div className="space-y-1.5">
                              <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                                <History className="h-3 w-3" />
                                Previous Roles
                              </p>
                              <div className="relative ml-2 border-l border-white/[0.06] pl-4 space-y-1.5">
                                {coach.previousRoles.map((role) => (
                                  <div key={role} className="relative">
                                    <div className="absolute -left-[17px] top-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                                    <p className="text-xs text-muted-foreground">{role}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      ))}

      {/* Facilities */}
      {facilities.length > 0 && (
        <div>
          <div className="section-divider mb-8" />
          <h3 className="mb-4 flex items-center gap-2 text-display text-xs tracking-[0.15em] text-muted-foreground">
            <Building className="h-4 w-4" style={{ color: colorPrimary }} />
            Facilities
          </h3>
          <div className="grid gap-3 sm:grid-cols-2">
            {facilities.map((facility) => (
              <div key={facility.id} className="glass-panel rounded-xl p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                      {facility.name}
                    </p>
                    <span
                      className="mt-1.5 inline-block rounded-sm px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider capitalize"
                      style={{
                        backgroundColor: colorPrimary + '15',
                        color: colorPrimary,
                      }}
                    >
                      {facility.type.replace('-', ' ')}
                    </span>
                  </div>
                  {facility.panoramaUrl && (
                    <span className="rounded-sm bg-white/[0.05] px-2 py-0.5 text-[10px] text-muted-foreground">
                      360°
                    </span>
                  )}
                </div>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                  {facility.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
