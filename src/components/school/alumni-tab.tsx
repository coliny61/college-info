'use client'

import { useTrackDuration } from '@/hooks/use-analytics'
import { Badge } from '@/components/ui/badge'
import { Trophy, Award } from 'lucide-react'

interface AlumniData {
  id: string
  name: string
  position: string
  draftYear: number
  draftRound: number
  draftPick: number
  proTeam: string
  careerHighlights: string
  isFirstRound: boolean
  isActive: boolean
  sportId?: string | null
  sport?: { name: string } | null
}

interface AlumniTabProps {
  alumni: AlumniData[]
  schoolId: string
  colorPrimary: string
  sportId?: string | null
}

export function AlumniTab({ alumni, schoolId, colorPrimary, sportId }: AlumniTabProps) {
  useTrackDuration('alumni', schoolId)

  // Filter by sport if provided
  const filteredAlumni = sportId
    ? alumni.filter(a => a.sportId === sportId)
    : alumni

  if (filteredAlumni.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted/50 mb-4">
          <Trophy className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
          No Alumni Data Yet
        </h3>
        <p className="mt-1.5 max-w-xs text-xs text-muted-foreground">
          Notable alumni information is not yet available{sportId ? ' for this sport' : ' for this school'}.
        </p>
      </div>
    )
  }

  // For D3/non-drafted alumni, count achievements instead of draft picks
  const drafted = filteredAlumni.filter(a => a.draftRound > 0)
  const allAmericans = filteredAlumni.filter(a => a.draftRound === 0 && a.draftPick === 0)
  const activePlayers = filteredAlumni.filter(a => a.isActive)

  return (
    <div className="space-y-10 animate-in-up">
      {/* Hero stat strip */}
      <div className="stat-strip rounded-xl border border-border bg-card/50 py-8 px-4">
        {drafted.length > 0 ? (
          <div>
            <p className="text-scoreboard text-5xl font-bold" style={{ color: colorPrimary }}>
              {drafted.length}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              Pro Draft Picks
            </p>
          </div>
        ) : (
          <div>
            <p className="text-scoreboard text-5xl font-bold" style={{ color: colorPrimary }}>
              {allAmericans.length}
            </p>
            <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
              All-Americans / Champions
            </p>
          </div>
        )}
        <div>
          <p className="text-scoreboard text-5xl font-bold text-foreground">
            {filteredAlumni.length}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Notable Alumni
          </p>
        </div>
        <div>
          <p className="text-scoreboard text-5xl font-bold text-emerald">
            {activePlayers.length}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Active Pro / Current
          </p>
        </div>
      </div>

      {/* Alumni grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {filteredAlumni.map((alum) => {
          const isDrafted = alum.draftRound > 0
          const isUndrafted = alum.draftRound === 0 && alum.draftPick === 0

          return (
            <div
              key={alum.id}
              className="relative glass-panel overflow-hidden rounded-xl p-5"
              style={alum.isFirstRound ? { boxShadow: `inset 0 0 0 1px ${colorPrimary}30` } : undefined}
            >
              {alum.isFirstRound && (
                <div
                  className="absolute -right-4 -top-4 h-24 w-24 rounded-full blur-[40px] opacity-[0.08]"
                  style={{ backgroundColor: colorPrimary }}
                />
              )}

              <div className="relative flex items-start justify-between">
                <div>
                  <h4 className="font-display text-base font-bold uppercase tracking-wide text-foreground">
                    {alum.name}
                  </h4>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <Badge
                      className="text-[10px] uppercase tracking-wider"
                      style={{
                        backgroundColor: colorPrimary + '15',
                        color: colorPrimary,
                      }}
                    >
                      {alum.position}
                    </Badge>
                    {alum.sport?.name && (
                      <Badge variant="outline" className="text-[10px] uppercase tracking-wider">
                        {alum.sport.name}
                      </Badge>
                    )}
                    {alum.isActive ? (
                      <span className="flex items-center gap-1 text-[10px] uppercase tracking-wider text-emerald">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
                        Active
                      </span>
                    ) : (
                      <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
                        Retired
                      </span>
                    )}
                  </div>
                </div>

                <div className="text-right">
                  {isDrafted ? (
                    <>
                      <p
                        className="text-scoreboard text-3xl font-bold"
                        style={alum.isFirstRound ? { color: colorPrimary } : undefined}
                      >
                        #{alum.draftPick}
                      </p>
                      <p className="text-[9px] uppercase tracking-[0.15em] text-muted-foreground">
                        Rd {alum.draftRound}
                      </p>
                    </>
                  ) : isUndrafted ? (
                    <div className="flex items-center gap-1">
                      <Award className="h-4 w-4" style={{ color: colorPrimary }} />
                    </div>
                  ) : null}
                </div>
              </div>

              <div className="mt-3 text-xs text-muted-foreground">
                <p>
                  {alum.draftYear} &middot; {alum.proTeam}
                </p>
              </div>

              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {alum.careerHighlights}
              </p>
            </div>
          )
        })}
      </div>
    </div>
  )
}
