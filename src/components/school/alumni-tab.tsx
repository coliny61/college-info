'use client'

import { useTrackDuration } from '@/hooks/use-analytics'
import { Badge } from '@/components/ui/badge'

interface AlumniTabProps {
  alumni: Array<{
    id: string
    name: string
    position: string
    draftYear: number
    draftRound: number
    draftPick: number
    nflTeam: string
    careerHighlights: string
    isFirstRound: boolean
    isActive: boolean
  }>
  schoolId: string
  colorPrimary: string
}

export function AlumniTab({ alumni, schoolId, colorPrimary }: AlumniTabProps) {
  useTrackDuration('alumni', schoolId)

  if (alumni.length === 0) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        Alumni information is not yet available for this school.
      </p>
    )
  }

  const firstRounders = alumni.filter((a) => a.isFirstRound)
  const numberOneOverall = alumni.filter((a) => a.draftPick === 1 && a.draftRound === 1)
  const activePlayers = alumni.filter((a) => a.isActive)

  return (
    <div className="space-y-10 animate-in-up">
      {/* Hero stat strip */}
      <div className="stat-strip rounded-xl border border-border bg-card/50 py-8 px-4">
        <div>
          <p className="text-scoreboard text-5xl font-bold" style={{ color: colorPrimary }}>
            {firstRounders.length}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            First-Round Picks
          </p>
        </div>
        <div>
          <p className="text-scoreboard text-5xl font-bold text-foreground">
            {numberOneOverall.length}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            #1 Overall
          </p>
        </div>
        <div>
          <p className="text-scoreboard text-5xl font-bold text-emerald">
            {activePlayers.length}
          </p>
          <p className="mt-1 text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
            Active in NFL
          </p>
        </div>
      </div>

      {/* Alumni grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {alumni.map((alum) => (
          <div
            key={alum.id}
            className="relative glass-panel overflow-hidden rounded-xl p-5"
            style={alum.isFirstRound ? { boxShadow: `inset 0 0 0 1px ${colorPrimary}30` } : undefined}
          >
            {/* First-rounder gold glow */}
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
                <div className="mt-1.5 flex items-center gap-2">
                  <Badge
                    className="text-[10px] uppercase tracking-wider"
                    style={{
                      backgroundColor: colorPrimary + '15',
                      color: colorPrimary,
                    }}
                  >
                    {alum.position}
                  </Badge>
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

              {/* Draft number — prominent Oswald */}
              <div className="text-right">
                {alum.draftRound > 0 ? (
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
                ) : (
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                    UDFA
                  </p>
                )}
              </div>
            </div>

            <div className="mt-3 text-xs text-muted-foreground">
              <p>
                {alum.draftYear} &middot; {alum.nflTeam}
              </p>
            </div>

            <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
              {alum.careerHighlights}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}
