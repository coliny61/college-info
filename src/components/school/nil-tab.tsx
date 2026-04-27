'use client'

import { useTrackDuration } from '@/hooks/use-analytics'
import { Building2, Handshake, Package, ExternalLink, TrendingUp, Users } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface SportBreakdown {
  id: string
  sportId: string
  sport: { id: string; name: string }
  budget: number
  averageDealSize: number | null
  athleteCount: number | null
  topDealValue: number | null
  description: string | null
  notableDeals: Array<{ athlete: string; description: string }> | null
}

interface BrandDeal {
  id: string
  brandPartner: {
    id: string
    name: string
    slug: string
    logoUrl: string | null
    category: string
  }
  dealText: string
  promoCode: string | null
  promoUrl: string | null
  isFeatured: boolean
}

interface NilTabProps {
  nilProgram: {
    collectiveName: string
    totalBudget: number
    founded: number
    description: string
    notableDeals: Array<{ athlete: string; sport: string; description: string }> | null
    averageDealSize?: number | null
    howToGetInvolved?: string | null
    sportBreakdowns: SportBreakdown[]
  } | null
  brandDeals?: BrandDeal[]
  schoolId: string
  colorPrimary: string
  selectedSportId?: string | null
}

function formatBudget(amount: number) {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`
  return `$${amount.toLocaleString()}`
}

export function NilTab({ nilProgram, brandDeals = [], schoolId, colorPrimary, selectedSportId }: NilTabProps) {
  useTrackDuration('nil', schoolId)

  if (!nilProgram) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted/50 mb-4">
          <Handshake className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
          No NIL Data Yet
        </h3>
        <p className="mt-1.5 max-w-xs text-xs text-muted-foreground">
          NIL program information is not yet available for this school.
        </p>
      </div>
    )
  }

  const breakdowns = nilProgram.sportBreakdowns ?? []
  // Sort by budget descending
  const sortedBreakdowns = [...breakdowns].sort((a, b) => b.budget - a.budget)
  // Selected breakdown — match selectedSportId or default to top budget
  const activeBreakdown = sortedBreakdowns.find(b => b.sportId === selectedSportId) || sortedBreakdowns[0]
  const activeDeals = (activeBreakdown?.notableDeals ?? []) as Array<{ athlete: string; description: string }>

  return (
    <div className="space-y-10 animate-in-up">
      {/* ─── Hero Budget ────────────────────────────────────────── */}
      <div className="text-center py-8">
        <p className="text-xs uppercase tracking-[0.25em] text-muted-foreground">
          Total NIL Budget
        </p>
        <p
          className="text-scoreboard mt-2 max-w-full overflow-hidden text-[clamp(4rem,8vw,7rem)] font-bold leading-none"
          style={{ color: colorPrimary }}
        >
          {formatBudget(nilProgram.totalBudget)}
        </p>
        <div className="mt-3 flex items-center justify-center gap-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-4 w-4" style={{ color: colorPrimary }} />
            <span className="text-sm text-foreground font-medium">{nilProgram.collectiveName}</span>
          </div>
          <span className="text-xs text-muted-foreground">Est. {nilProgram.founded}</span>
        </div>
      </div>

      {/* ─── Collective Description ─────────────────────────────── */}
      <div className="glass-panel rounded-xl p-6">
        <p className="text-sm text-muted-foreground leading-relaxed">
          {nilProgram.description}
        </p>
      </div>

      {/* ─── Per-Sport Breakdown Cards ──────────────────────────── */}
      {sortedBreakdowns.length > 0 && (
        <div>
          <h3 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-4">
            NIL by Sport
          </h3>
          <div className="flex gap-3 overflow-x-auto pb-2 scrollbar-hide -mx-1 px-1">
            {sortedBreakdowns.map((bd) => {
              const isActive = bd.sportId === activeBreakdown?.sportId
              const pct = Math.round((bd.budget / nilProgram.totalBudget) * 100)
              return (
                <div
                  key={bd.id}
                  className={`shrink-0 glass-panel rounded-xl p-4 w-[180px] transition-all cursor-default ${
                    isActive ? 'ring-1' : ''
                  }`}
                  style={isActive ? { borderColor: colorPrimary + '60', boxShadow: `inset 0 0 0 1px ${colorPrimary}40` } : undefined}
                >
                  <p className="font-display text-xs font-semibold uppercase tracking-wide text-foreground truncate">
                    {bd.sport.name}
                  </p>
                  <p className="text-scoreboard text-xl font-bold mt-1" style={{ color: colorPrimary }}>
                    {formatBudget(bd.budget)}
                  </p>
                  <p className="text-[10px] text-muted-foreground mt-0.5">{pct}% of total</p>
                  <div className="mt-2 flex items-center gap-2 text-[10px] text-muted-foreground">
                    {bd.athleteCount != null && (
                      <span className="flex items-center gap-0.5">
                        <Users className="h-3 w-3" />
                        {bd.athleteCount}
                      </span>
                    )}
                    {bd.averageDealSize != null && (
                      <span>avg {formatBudget(bd.averageDealSize)}</span>
                    )}
                  </div>
                  {/* Budget bar */}
                  <div className="h-1 w-full mt-2 rounded-full bg-white/[0.05] overflow-hidden">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${pct}%`, backgroundColor: colorPrimary }}
                    />
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}

      {/* ─── Selected Sport Detail ──────────────────────────────── */}
      {activeBreakdown && (
        <div className="glass-panel rounded-xl p-6 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-4 w-4" style={{ color: colorPrimary }} />
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                {activeBreakdown.sport.name} NIL
              </h3>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-scoreboard text-lg font-bold" style={{ color: colorPrimary }}>
                {formatBudget(activeBreakdown.budget)}
              </span>
            </div>
          </div>

          {/* Stats row */}
          <div className="flex flex-wrap gap-4">
            {activeBreakdown.averageDealSize != null && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Avg Deal</p>
                <p className="text-scoreboard text-sm font-bold text-foreground">{formatBudget(activeBreakdown.averageDealSize)}</p>
              </div>
            )}
            {activeBreakdown.topDealValue != null && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Top Deal</p>
                <p className="text-scoreboard text-sm font-bold text-foreground">{formatBudget(activeBreakdown.topDealValue)}</p>
              </div>
            )}
            {activeBreakdown.athleteCount != null && (
              <div>
                <p className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">Athletes w/ Deals</p>
                <p className="text-scoreboard text-sm font-bold text-foreground">{activeBreakdown.athleteCount}</p>
              </div>
            )}
          </div>

          {activeBreakdown.description && (
            <p className="text-sm text-muted-foreground leading-relaxed">
              {activeBreakdown.description}
            </p>
          )}

          {/* Sport-specific notable deals */}
          {activeDeals.length > 0 && (
            <div className="space-y-2 pt-2 border-t border-white/[0.06]">
              <p className="text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Notable Deals</p>
              {activeDeals.map((deal, i) => (
                <div key={i} className="glass-panel rounded-lg p-3">
                  <p className="font-display text-xs font-semibold uppercase tracking-wide text-foreground">{deal.athlete}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{deal.description}</p>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="section-divider" />

      {/* ─── Brand Partnerships & Discounts (Influxor) ──────────── */}
      {brandDeals.length > 0 && (
        <div>
          <div className="flex items-center justify-between mb-4">
            <h3 className="flex items-center gap-2 text-display text-xs tracking-[0.15em] text-muted-foreground">
              <Handshake className="h-4 w-4" style={{ color: colorPrimary }} />
              Brand Partnerships & Discounts
            </h3>
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
              Powered by Influxor
            </span>
          </div>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-2">
            {brandDeals.map((deal) => (
              <div
                key={deal.id}
                className="glass-panel rounded-xl p-4 flex items-start gap-3"
                style={deal.isFeatured ? { boxShadow: `inset 0 0 0 1px ${colorPrimary}40` } : undefined}
              >
                <div
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg"
                  style={{ backgroundColor: colorPrimary + '15' }}
                >
                  <Package className="h-4 w-4" style={{ color: colorPrimary }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-display text-xs font-semibold uppercase tracking-wide text-foreground truncate">
                      {deal.brandPartner.name}
                    </p>
                    <Badge variant="outline" className="text-[8px] uppercase tracking-wider shrink-0">
                      {deal.brandPartner.category}
                    </Badge>
                  </div>
                  <p className="text-xs font-bold uppercase tracking-wide mt-1" style={{ color: colorPrimary }}>
                    {deal.dealText}
                  </p>
                  {deal.promoCode && (
                    <span className="inline-block mt-1 rounded-sm bg-white/[0.06] px-1.5 py-0.5 text-[10px] font-mono font-bold text-foreground">
                      {deal.promoCode}
                    </span>
                  )}
                </div>
                {deal.promoUrl && (
                  <a
                    href={deal.promoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="shrink-0 mt-1"
                  >
                    <ExternalLink className="h-3.5 w-3.5 text-muted-foreground hover:text-foreground transition-colors" />
                  </a>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ─── How to Get Involved ─────────────────────────────────── */}
      {nilProgram.howToGetInvolved && (
        <div className="glass-panel rounded-xl p-6">
          <h3 className="text-display text-sm tracking-wide text-foreground mb-2">How to Get Involved</h3>
          <p className="text-sm text-muted-foreground leading-relaxed">{nilProgram.howToGetInvolved}</p>
        </div>
      )}
    </div>
  )
}
