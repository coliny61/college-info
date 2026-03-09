'use client'

import { useTrackDuration } from '@/hooks/use-analytics'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Trophy, Star, Users } from 'lucide-react'

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
    <div className="space-y-6 animate-in-up">
      {/* Summary stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Trophy className="h-5 w-5" style={{ color: colorPrimary }} />
            <div>
              <p className="text-xs text-muted-foreground">First-Round Picks</p>
              <p className="text-xl font-bold text-scoreboard" style={{ color: colorPrimary }}>
                {firstRounders.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Star className="h-5 w-5" style={{ color: colorPrimary }} />
            <div>
              <p className="text-xs text-muted-foreground">#1 Overall Picks</p>
              <p className="text-xl font-bold text-scoreboard">
                {numberOneOverall.length}
              </p>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-3 p-4">
            <Users className="h-5 w-5" style={{ color: colorPrimary }} />
            <div>
              <p className="text-xs text-muted-foreground">Active in NFL</p>
              <p className="text-xl font-bold text-scoreboard">
                {activePlayers.length}
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Alumni grid */}
      <div className="grid gap-4 sm:grid-cols-2">
        {alumni.map((alum, idx) => (
          <Card key={alum.id} className={`animate-in-up delay-${Math.min(idx + 1, 8)}`}>
            <CardContent className="p-4">
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="font-semibold text-foreground">{alum.name}</h4>
                  <div className="mt-1 flex items-center gap-2">
                    <Badge
                      style={{
                        backgroundColor: colorPrimary + '1A',
                        color: colorPrimary,
                      }}
                    >
                      {alum.position}
                    </Badge>
                    {alum.isActive ? (
                      <Badge variant="outline" className="border-emerald/40 text-emerald">
                        Active
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-muted-foreground">
                        Retired
                      </Badge>
                    )}
                  </div>
                </div>
                {alum.isFirstRound && (
                  <div
                    className="rounded-full px-2 py-1 text-xs font-bold"
                    style={{
                      backgroundColor: colorPrimary,
                      color: '#fff',
                    }}
                  >
                    R{alum.draftRound} #{alum.draftPick}
                  </div>
                )}
              </div>

              <div className="mt-3 text-sm text-muted-foreground">
                {alum.draftRound === 0 ? (
                  <p>Undrafted &middot; {alum.draftYear} &middot; {alum.nflTeam}</p>
                ) : (
                  <p>
                    Round {alum.draftRound}, Pick {alum.draftPick} &middot;{' '}
                    {alum.draftYear} NFL Draft &middot; {alum.nflTeam}
                  </p>
                )}
              </div>

              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {alum.careerHighlights}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
