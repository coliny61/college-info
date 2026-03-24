'use client'

import { useState } from 'react'
import { Badge } from '@/components/ui/badge'
import { Trophy, Award, History, ChevronDown, ChevronUp, Dumbbell, UtensilsCrossed, Landmark, Star } from 'lucide-react'
import { useTrackDuration } from '@/hooks/use-analytics'

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
    strengthProgram: string | null
    nutritionProgram: string | null
    recentBowlGames: string[]
    conferenceStanding: string | null
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
      coachingTree: string[]
    }>
  }>
  // School-level fields for Game Day
  stadiumCapacity?: number | null
  traditions?: string | null
  gameDayDescription?: string | null
  colorPrimary: string
  schoolSlug?: string
  schoolId?: string
  isPublic?: boolean
}

export function AthleticsTab({
  sports,
  stadiumCapacity,
  traditions,
  gameDayDescription,
  colorPrimary,
  schoolId,
  isPublic = false,
}: AthleticsTabProps) {
  useTrackDuration('football', schoolId)
  const [showAllCoaches, setShowAllCoaches] = useState(false)

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
              style={{ background: `linear-gradient(135deg, ${colorPrimary}20, ${colorPrimary}08)` }}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Trophy className="h-5 w-5" style={{ color: colorPrimary }} />
                  <div>
                    <h3 className="text-display text-lg tracking-wide text-foreground">{sport.name}</h3>
                    <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">{sport.conference}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {sport.record && <span className="text-scoreboard text-lg font-bold text-foreground">{sport.record}</span>}
                  {sport.ranking && (
                    <Badge style={{ backgroundColor: colorPrimary + '20', color: colorPrimary }} className="font-display text-sm">#{sport.ranking}</Badge>
                  )}
                </div>
              </div>
            </div>

            {/* ─── Performance Stats ──────────────────────────────────── */}
            {(sport.conferenceStanding || sport.recentBowlGames.length > 0) && (
              <div>
                <h4 className="mb-4 text-display text-xs tracking-[0.15em] text-muted-foreground">Performance</h4>
                <div className="flex flex-wrap gap-3">
                  {sport.conferenceStanding && (
                    <div className="glass-panel rounded-xl px-5 py-3">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Conference Standing</p>
                      <p className="text-scoreboard text-lg font-bold" style={{ color: colorPrimary }}>{sport.conferenceStanding}</p>
                    </div>
                  )}
                  {sport.recentBowlGames.length > 0 && (
                    <div className="glass-panel rounded-xl px-5 py-3">
                      <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground mb-1.5">Recent Bowl Games</p>
                      <div className="space-y-1">
                        {sport.recentBowlGames.map((game) => (
                          <p key={game} className="flex items-center gap-1.5 text-xs text-foreground">
                            <Star className="h-3 w-3" style={{ color: colorPrimary }} />
                            {game}
                          </p>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─── Scheme Identity ────────────────────────────────────── */}
            {(sport.offensiveScheme || sport.defensiveScheme) && (
              <div>
                <h4 className="mb-4 text-display text-xs tracking-[0.15em] text-muted-foreground">Scheme Identity</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {sport.offensiveScheme && (
                    <div className="glass-panel rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Offense</span>
                        <span className="rounded-sm px-2 py-0.5 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: colorPrimary + '15', color: colorPrimary }}>{sport.offensiveScheme}</span>
                      </div>
                      {sport.offenseDescription && <p className="text-xs text-muted-foreground leading-relaxed">{sport.offenseDescription}</p>}
                    </div>
                  )}
                  {sport.defensiveScheme && (
                    <div className="glass-panel rounded-xl p-5">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Defense</span>
                        <span className="rounded-sm px-2 py-0.5 text-xs font-bold uppercase tracking-wider" style={{ backgroundColor: colorPrimary + '15', color: colorPrimary }}>{sport.defensiveScheme}</span>
                      </div>
                      {sport.defenseDescription && <p className="text-xs text-muted-foreground leading-relaxed">{sport.defenseDescription}</p>}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─── Coaching Staff ─────────────────────────────────────── */}
            <div>
              <h4 className="mb-4 text-display text-xs tracking-[0.15em] text-muted-foreground">Coaching Staff</h4>

              {/* Head Coach */}
              {headCoach && (
                <div className="relative glass-panel overflow-hidden rounded-xl p-5 mb-4">
                  <div className="absolute left-0 top-0 h-full w-1" style={{ backgroundColor: colorPrimary }} />
                  <div className="pl-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="font-display text-base font-semibold uppercase tracking-wide text-foreground">{headCoach.name}</p>
                        <p className="text-[10px] font-medium uppercase tracking-[0.15em]" style={{ color: colorPrimary }}>{headCoach.title}</p>
                      </div>
                      <span className="rounded-sm bg-white/[0.05] px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{headCoach.yearsAtSchool}y</span>
                    </div>
                    <p className="mt-2 text-xs text-muted-foreground leading-relaxed">{headCoach.bio}</p>

                    <div className="mt-4 space-y-3 border-t border-white/[0.06] pt-4">
                      <div className="flex flex-wrap items-center gap-3">
                        <span className="text-scoreboard text-sm font-bold text-foreground">{headCoach.careerRecord}</span>
                        {headCoach.playersInNfl != null && headCoach.playersInNfl > 0 && (
                          <Badge style={{ backgroundColor: colorPrimary + '15', color: colorPrimary }} className="text-[10px] uppercase tracking-wider">{headCoach.playersInNfl} players to NFL</Badge>
                        )}
                      </div>

                      {headCoach.championships.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {headCoach.championships.map((c) => (
                            <span key={c} className="inline-flex items-center gap-1 rounded-sm bg-gradient-to-r from-amber-500/15 to-amber-600/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-amber-400">
                              <Trophy className="h-2.5 w-2.5" />{c}
                            </span>
                          ))}
                        </div>
                      )}

                      {headCoach.awards.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {headCoach.awards.map((a) => (
                            <span key={a} className="inline-flex items-center gap-1 rounded-sm bg-emerald/10 px-2 py-0.5 text-[10px] uppercase tracking-wider text-emerald">
                              <Award className="h-2.5 w-2.5" />{a}
                            </span>
                          ))}
                        </div>
                      )}

                      {/* Coaching Tree */}
                      {headCoach.coachingTree.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Coaching Tree</p>
                          <div className="flex flex-wrap gap-1.5">
                            {headCoach.coachingTree.map((name) => (
                              <span key={name} className="rounded-sm bg-white/[0.04] px-2 py-0.5 text-[10px] text-muted-foreground">{name}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {headCoach.previousRoles.length > 0 && (
                        <div className="space-y-1.5">
                          <p className="flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
                            <History className="h-3 w-3" />Previous Roles
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
                    <div key={coach.id} className="glass-panel rounded-xl p-4">
                      <div className="flex items-start justify-between">
                        <div>
                          <p className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">{coach.name}</p>
                          <p className="text-[10px] font-medium uppercase tracking-[0.15em]" style={{ color: colorPrimary }}>{coach.title}</p>
                        </div>
                        <span className="rounded-sm bg-white/[0.05] px-2 py-0.5 text-[10px] uppercase tracking-wider text-muted-foreground">{coach.yearsAtSchool}y</span>
                      </div>
                      <p className="mt-2 text-xs text-muted-foreground line-clamp-3">{coach.bio}</p>
                    </div>
                  ))}
                </div>
              )}

              {/* Position coaches — expandable */}
              {positionCoaches.length > 0 && (
                <>
                  {showAllCoaches && (
                    <div className="grid gap-3 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 mb-3">
                      {visibleCoaches.map((coach) => (
                        <div key={coach.id} className="glass-panel rounded-xl p-4">
                          <p className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">{coach.name}</p>
                          <p className="text-[10px] font-medium uppercase tracking-[0.15em]" style={{ color: colorPrimary }}>{coach.title}</p>
                          <p className="mt-2 text-xs text-muted-foreground line-clamp-2">{coach.bio}</p>
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

            {/* ─── Player Development ─────────────────────────────────── */}
            {(sport.strengthProgram || sport.nutritionProgram) && (
              <div>
                <div className="section-divider mb-8" />
                <h4 className="mb-4 text-display text-xs tracking-[0.15em] text-muted-foreground">Player Development</h4>
                <div className="grid gap-4 sm:grid-cols-2">
                  {sport.strengthProgram && (
                    <div className="glass-panel rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <Dumbbell className="h-4 w-4" style={{ color: colorPrimary }} />
                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Strength & Conditioning</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{sport.strengthProgram}</p>
                    </div>
                  )}
                  {sport.nutritionProgram && (
                    <div className="glass-panel rounded-xl p-5">
                      <div className="flex items-center gap-2 mb-3">
                        <UtensilsCrossed className="h-4 w-4" style={{ color: colorPrimary }} />
                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Nutrition Program</span>
                      </div>
                      <p className="text-xs text-muted-foreground leading-relaxed">{sport.nutritionProgram}</p>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* ─── Game Day Experience ────────────────────────────────── */}
            {(stadiumCapacity || traditions || gameDayDescription) && (
              <div>
                <div className="section-divider mb-8" />
                <h4 className="mb-4 flex items-center gap-2 text-display text-xs tracking-[0.15em] text-muted-foreground">
                  <Landmark className="h-4 w-4" style={{ color: colorPrimary }} />
                  Game Day Experience
                </h4>
                <div className="glass-panel rounded-xl p-5 space-y-4">
                  {stadiumCapacity && (
                    <div className="flex items-center gap-3">
                      <span className="text-scoreboard text-2xl font-bold" style={{ color: colorPrimary }}>{stadiumCapacity.toLocaleString()}</span>
                      <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Seat Capacity</span>
                    </div>
                  )}
                  {gameDayDescription && (
                    <p className="text-sm text-muted-foreground leading-relaxed">{gameDayDescription}</p>
                  )}
                  {traditions && (
                    <div>
                      <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground mb-2">Traditions</p>
                      <p className="text-xs text-muted-foreground leading-relaxed">{traditions}</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
