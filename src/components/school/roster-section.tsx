'use client'

import { useState } from 'react'
import { useTrackDuration } from '@/hooks/use-analytics'

interface RosterPlayer {
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
  sportId: string | null
}

interface RosterSectionProps {
  roster: RosterPlayer[]
  schoolId: string
  colorPrimary: string
  sportId?: string | null
  sportName?: string | null
}

const FOOTBALL_BASKETBALL_POSITIONS: Record<string, string[]> = {
  'Offense': ['QB', 'RB', 'WR', 'TE', 'OL', 'OT', 'OG', 'C'],
  'Defense': ['DE', 'DT', 'DL', 'LB', 'ILB', 'OLB', 'CB', 'S', 'FS', 'SS', 'EDGE', 'NICK'],
  'Special Teams': ['K', 'P', 'LS'],
}

function classifyPosition(pos: string): string {
  for (const [group, positions] of Object.entries(FOOTBALL_BASKETBALL_POSITIONS)) {
    if (positions.includes(pos)) return group
  }
  return 'Other'
}

function isFootball(name: string | null | undefined): boolean {
  return name?.toLowerCase() === 'football'
}

export function RosterSection({ roster, schoolId, colorPrimary, sportId, sportName }: RosterSectionProps) {
  useTrackDuration('roster', schoolId)
  const [filter, setFilter] = useState<string>('all')

  // Filter by sport
  const sportRoster = sportId
    ? roster.filter(p => p.sportId === sportId)
    : roster

  if (sportRoster.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center animate-in-up">
        <p className="text-sm text-muted-foreground">No roster available for this sport.</p>
      </div>
    )
  }

  // Only show position group filters for football
  const showPositionGroups = isFootball(sportName)
  const filtered = showPositionGroups && filter !== 'all'
    ? sportRoster.filter(p => classifyPosition(p.position) === filter)
    : sportRoster

  // Show hometown column for non-football/basketball
  const showHometown = !['football', 'men\'s basketball', 'women\'s basketball'].includes((sportName || '').toLowerCase())

  return (
    <div className="animate-in-up">
      <div className="flex items-center justify-between mb-4">
        <span className="text-xs text-muted-foreground">
          {sportRoster.length} players
        </span>
        {showPositionGroups && (
          <div className="flex flex-wrap gap-1.5">
            {['all', 'Offense', 'Defense', 'Special Teams'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`rounded-sm px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider transition-colors ${
                  filter === f
                    ? 'text-white'
                    : 'bg-white/[0.04] text-muted-foreground hover:text-foreground'
                }`}
                style={filter === f ? { backgroundColor: colorPrimary } : undefined}
              >
                {f === 'all' ? 'All' : f}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="relative">
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
              {filtered.map((player) => (
                <tr key={player.id} className="border-b border-white/[0.03] transition-colors hover:bg-white/[0.02]">
                  <td className="py-2.5 pr-3">
                    <span className="text-scoreboard font-bold text-foreground">{player.number}</span>
                  </td>
                  <td className="py-2.5 pr-3">
                    <span className="font-medium text-foreground">{player.name}</span>
                    {player.isStarter && (
                      <span className="ml-1.5 inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colorPrimary }} title="Starter" />
                    )}
                  </td>
                  <td className="py-2.5 pr-3">
                    <span className="rounded-sm px-1.5 py-0.5 text-[10px] font-bold uppercase tracking-wider" style={{ backgroundColor: colorPrimary + '15', color: colorPrimary }}>
                      {player.position}
                    </span>
                  </td>
                  <td className="py-2.5 pr-3 text-muted-foreground hidden sm:table-cell">{player.height}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground hidden sm:table-cell">{player.weight}</td>
                  <td className="py-2.5 pr-3 text-muted-foreground">{player.year}</td>
                  <td className="py-2.5 text-muted-foreground hidden md:table-cell">{player.hometown}, {player.state}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-background to-transparent sm:hidden" />
      </div>

      <div className="mt-3 flex items-center gap-3 text-[10px] text-muted-foreground">
        <span className="flex items-center gap-1.5">
          <span className="inline-block h-1.5 w-1.5 rounded-full" style={{ backgroundColor: colorPrimary }} />
          Starter
        </span>
      </div>
    </div>
  )
}
