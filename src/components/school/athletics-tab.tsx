'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Trophy, Users, Building, Award, History, ChevronDown, ChevronUp } from 'lucide-react'

interface AthleticsTabProps {
  sports: Array<{
    id: string
    name: string
    conference: string
    headCoach: string
    record: string | null
    ranking: number | null
    offensiveScheme: string | null
    defensiveScheme: string | null
    offenseDescription: string | null
    defenseDescription: string | null
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
  roster: Array<{
    id: string
    name: string
    number: number
    position: string
    height: string
    weight: number
    year: string
    hometown: string
    state: string
    highSchool: string | null
    isStarter: boolean
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

// Group positions for display
const POSITION_GROUPS: Record<string, string[]> = {
  'Offense': ['QB', 'RB', 'WR', 'TE', 'OL', 'OT', 'OG', 'C'],
  'Defense': ['DE', 'DT', 'DL', 'LB', 'ILB', 'OLB', 'CB', 'S', 'FS', 'SS', 'EDGE', 'NICK'],
  'Special Teams': ['K', 'P', 'LS'],
}

function classifyPosition(pos: string): string {
  for (const [group, positions] of Object.entries(POSITION_GROUPS)) {
    if (positions.includes(pos)) return group
  }
  return 'Offense'
}

export function AthleticsTab({
  sports,
  roster,
  facilities,
  colorPrimary,
}: AthleticsTabProps) {
  const [showAllCoaches, setShowAllCoaches] = useState(false)
  const [rosterFilter, setRosterFilter] = useState<string>('all')

  // Group roster by side of ball
  const groupedRoster = roster.reduce<Record<string, typeof roster>>((acc, player) => {
    const group = classifyPosition(player.position)
    if (!acc[group]) acc[group] = []
    acc[group].push(player)
    return acc
  }, {})

  const filteredRoster = rosterFilter === 'all'
    ? roster
    : roster.filter(p => classifyPosition(p.position) === rosterFilter)

  return (
    <div className="space-y-10 animate-in-up">
      {sports.map((sport) => {
        const headCoach = sport.coaches.find(c => !!c.careerRecord)
        const coordinators = sport.coaches.filter(c => !c.careerRecord && (c.title.includes('Coordinator') || c.title.includes('Associate Head')))
        const positionCoaches = sport.coaches.filter(c => !c.careerRecord && !c.title.includes('Coordinator') && !c.title.includes('Associate Head'))
        const visibleCoaches = showAllCoaches ? positionCoaches : []

        return (
          <div key={sport.id} className="space-y-10">
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

            {/* ─── Scheme Identity ─────────────────────────────────────────── */}
            {(sport.offensiveScheme || sport.defensiveScheme) && (
              <div>
                <h4 className="mb-4 text-display text-xs tracking-[0.15em] text-muted-foreground">
                  Scheme Identity
                </h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {sport.offensiveScheme && (
                    <div className="glass-panel rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                          Offense
                        </span>
                        <span
                          className="rounded-sm px-2 py-0.5 text-xs font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: colorPrimary + '15',
                            color: colorPrimary,
                          }}
                        >
                          {sport.offensiveScheme}
                        </span>
                      </div>
                      {sport.offenseDescription && (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {sport.offenseDescription}
                        </p>
                      )}
                    </div>
                  )}
                  {sport.defensiveScheme && (
                    <div className="glass-panel rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                          Defense
                        </span>
                        <span
                          className="rounded-sm px-2 py-0.5 text-xs font-bold uppercase tracking-wider"
                          style={{
                            backgroundColor: colorPrimary + '15',
                            color: colorPrimary,
                          }}
                        >
                          {sport.defensiveScheme}
                        </span>
                      </div>
                      {sport.defenseDescription && (
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {sport.defenseDescription}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─── Coaching Staff ──────────────────────────────────────────── */}
            <div>
              <h4 className="mb-4 text-display text-xs tracking-[0.15em] text-muted-foreground">
                Coaching Staff
              </h4>

              {/* Head Coach — expanded card */}
              {headCoach && (
                <div
                  className="relative glass-panel overflow-hidden rounded-xl p-5 mb-4"
                >
                  <div
                    className="absolute left-0 top-0 h-full w-1"
                    style={{ backgroundColor: colorPrimary }}
                  />
                  <div className="pl-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-display text-base font-semibold uppercase tracking-wide text-foreground">
                          {headCoach.name}
                        </p>
                        <p
                          className="text-[10px] font-medium uppercase tracking-[0.15em]"
                          style={{ color: colorPrimary }}
                        >
                          {headCoach.title}
                        </p>
                      </div>
                      <span className="rounded-sm bg-white/[0.05] px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">
                        {headCoach.yearsAtSchool}y
                      </span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                      {headCoach.bio}
                    </p>

                    {/* Head coach stats */}
                    <div className="mt-4 space-y-3 border-t border-white/[0.06] pt-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-scoreboard text-sm font-bold text-foreground">
                          {headCoach.careerRecord}
                        </span>
                        {headCoach.playersInNfl != null && headCoach.playersInNfl > 0 && (
                          <Badge
                            style={{
                              backgroundColor: colorPrimary + '15',
                              color: colorPrimary,
                            }}
                            className="text-[10px] uppercase tracking-wider"
                          >
                            {headCoach.playersInNfl} players to NFL
                          </Badge>
                        )}
                      </div>

                      {headCoach.championships.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {headCoach.championships.map((c) => (
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

                      {headCoach.awards.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {headCoach.awards.map((a) => (
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

                      {headCoach.previousRoles.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                            <History className="h-3 w-3" />
                            Previous Roles
                          </p>
                          <div className="relative ml-2 border-l border-white/[0.06] pl-4 space-y-1.5">
                            {headCoach.previousRoles.map((role) => (
                              <div key={role} className="relative">
                                <div className="absolute -left-[17px] top-1.5 h-1.5 w-1.5 rounded-full bg-muted-foreground/30" />
                                <p className="text-xs text-muted-foreground">{role}</p>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              )}

              {/* Coordinators */}
              {coordinators.length > 0 && (
                <div className="grid gap-3 sm:grid-cols-2 mb-4">
                  {coordinators.map((coach) => (
                    <div
                      key={coach.id}
                      className="glass-panel rounded-xl p-4"
                    >
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
                    </div>
                  ))}
                </div>
              )}

              {/* Position coaches — expandable */}
              {positionCoaches.length > 0 && (
                <>
                  {showAllCoaches && (
                    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 mb-3">
                      {visibleCoaches.map((coach) => (
                        <div
                          key={coach.id}
                          className="glass-panel rounded-xl p-4"
                        >
                          <p className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                            {coach.name}
                          </p>
                          <p
                            className="text-[10px] font-medium uppercase tracking-[0.15em]"
                            style={{ color: colorPrimary }}
                          >
                            {coach.title}
                          </p>
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">
                            {coach.bio}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                  <button
                    onClick={() => setShowAllCoaches(!showAllCoaches)}
                    className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wider transition-colors hover:text-foreground"
                    style={{ color: colorPrimary }}
                  >
                    {showAllCoaches ? (
                      <>Hide position coaches <ChevronUp className="h-3.5 w-3.5" /></>
                    ) : (
                      <>{positionCoaches.length} more position coaches <ChevronDown className="h-3.5 w-3.5" /></>
                    )}
                  </button>
                </>
              )}
            </div>

            {/* ─── Roster ─────────────────────────────────────────────────── */}
            {roster.length > 0 && (
              <div>
                <div className="section-divider mb-8" />
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-display text-xs tracking-[0.15em] text-muted-foreground">
                    Roster ({roster.length})
                  </h4>
                  <div className="flex gap-1.5">
                    {['all', 'Offense', 'Defense', 'Special Teams'].map((filter) => (
                      <button
                        key={filter}
                        onClick={() => setRosterFilter(filter)}
                        className={`rounded-sm px-2.5 py-1 text-[10px] font-medium uppercase tracking-wider transition-colors ${
                          rosterFilter === filter
                            ? 'text-white'
                            : 'bg-white/[0.04] text-muted-foreground hover:text-foreground'
                        }`}
                        style={rosterFilter === filter ? {
                          backgroundColor: colorPrimary,
                        } : undefined}
                      >
                        {filter === 'all' ? 'All' : filter}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Roster table */}
                <div className="overflow-x-auto">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-white/[0.06]">
                        <th className="pb-2 pr-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">#</th>
                        <th className="pb-2 pr-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Name</th>
                        <th className="pb-2 pr-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Pos</th>
                        <th className="pb-2 pr-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground hidden sm:table-cell">Ht</th>
                        <th className="pb-2 pr-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground hidden sm:table-cell">Wt</th>
                        <th className="pb-2 pr-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Yr</th>
                        <th className="pb-2 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground hidden md:table-cell">Hometown</th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredRoster.map((player) => (
                        <tr
                          key={player.id}
                          className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]"
                        >
                          <td className="py-2.5 pr-3">
                            <span className="text-scoreboard font-bold text-foreground">
                              {player.number}
                            </span>
                          </td>
                          <td className="py-2.5 pr-3">
                            <span className="font-medium text-foreground">
                              {player.name}
                            </span>
                            {player.isStarter && (
                              <span
                                className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: colorPrimary }}
                                title="Starter"
                              />
                            )}
                          </td>
                          <td className="py-2.5 pr-3">
                            <span
                              className="rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider"
                              style={{
                                backgroundColor: colorPrimary + '15',
                                color: colorPrimary,
                              }}
                            >
                              {player.position}
                            </span>
                          </td>
                          <td className="py-2.5 pr-3 text-muted-foreground hidden sm:table-cell">
                            {player.height}
                          </td>
                          <td className="py-2.5 pr-3 text-muted-foreground hidden sm:table-cell">
                            {player.weight}
                          </td>
                          <td className="py-2.5 pr-3 text-muted-foreground">
                            {player.year}
                          </td>
                          <td className="py-2.5 text-muted-foreground hidden md:table-cell">
                            {player.hometown}, {player.state}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Legend */}
                <div className="mt-3 flex items-center gap-3 text-[10px] text-muted-foreground">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="inline-block h-1.5 w-1.5 rounded-full"
                      style={{ backgroundColor: colorPrimary }}
                    />
                    Starter
                  </span>
                </div>
              </div>
            )}

            {/* ─── Facilities ─────────────────────────────────────────────── */}
            {facilities.length > 0 && (
              <div>
                <div className="section-divider mb-8" />
                <h4 className="mb-4 flex items-center gap-2 text-display text-xs tracking-[0.15em] text-muted-foreground">
                  <Building className="h-4 w-4" style={{ color: colorPrimary }} />
                  Facilities
                </h4>
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
      })}
    </div>
  )
}
