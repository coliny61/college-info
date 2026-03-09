'use client'

import { useTrackDuration } from '@/hooks/use-analytics'
import { Building2, Handshake } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

interface NilTabProps {
  nilProgram: {
    collectiveName: string
    totalBudget: number
    footballSpend: number
    allSportsSpend: number
    founded: number
    description: string
    notableDeals: Array<{ athlete: string; sport: string; description: string }> | null
  } | null
  schoolId: string
  colorPrimary: string
}

function formatBudget(amount: number) {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`
  return `$${amount.toLocaleString()}`
}

export function NilTab({ nilProgram, schoolId, colorPrimary }: NilTabProps) {
  useTrackDuration('nil', schoolId)

  if (!nilProgram) {
    return (
      <p className="py-12 text-center text-muted-foreground">
        NIL information is not yet available for this school.
      </p>
    )
  }

  const deals = (nilProgram.notableDeals ?? []) as Array<{ athlete: string; sport: string; description: string }>
  const footballPct = Math.round((nilProgram.footballSpend / nilProgram.totalBudget) * 100)
  const otherPct = Math.round((nilProgram.allSportsSpend / nilProgram.totalBudget) * 100)

  return (
    <div className="space-y-10 animate-in-up">
      {/* Hero budget number */}
      <div className="text-center py-8">
        <p className="text-[10px] uppercase tracking-[0.25em] text-muted-foreground">
          Total NIL Budget
        </p>
        <p
          className="text-scoreboard mt-2 text-[clamp(4rem,8vw,7rem)] font-bold leading-none"
          style={{ color: colorPrimary }}
        >
          {formatBudget(nilProgram.totalBudget)}
        </p>
      </div>

      {/* Budget breakdown — progress bars */}
      <div className="space-y-4">
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              Football
            </span>
            <span className="text-scoreboard text-sm font-bold text-foreground">
              {formatBudget(nilProgram.footballSpend)} <span className="text-muted-foreground font-normal">({footballPct}%)</span>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${footballPct}%`,
                backgroundColor: colorPrimary,
              }}
            />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] uppercase tracking-[0.15em] text-muted-foreground">
              All Other Sports
            </span>
            <span className="text-scoreboard text-sm font-bold text-foreground">
              {formatBudget(nilProgram.allSportsSpend)} <span className="text-muted-foreground font-normal">({otherPct}%)</span>
            </span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.05]">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{
                width: `${otherPct}%`,
                backgroundColor: colorPrimary + '80',
              }}
            />
          </div>
        </div>
      </div>

      <div className="section-divider" />

      {/* Collective info */}
      <div className="glass-panel rounded-xl p-6">
        <div className="flex items-center gap-3 mb-3">
          <Building2 className="h-5 w-5" style={{ color: colorPrimary }} />
          <h3 className="text-display text-sm tracking-wide text-foreground">
            {nilProgram.collectiveName}
          </h3>
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Est. {nilProgram.founded}
          </span>
        </div>
        <p className="text-sm text-muted-foreground leading-relaxed">
          {nilProgram.description}
        </p>
      </div>

      {/* Notable deals */}
      {deals.length > 0 && (
        <div>
          <h3 className="flex items-center gap-2 text-display text-xs tracking-[0.15em] text-muted-foreground mb-4">
            <Handshake className="h-4 w-4" style={{ color: colorPrimary }} />
            Notable Deals
          </h3>
          <div className="space-y-3">
            {deals.map((deal, i) => (
              <div
                key={i}
                className="glass-panel rounded-xl p-4"
              >
                <div className="flex items-center gap-2">
                  <p className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                    {deal.athlete}
                  </p>
                  <Badge
                    style={{
                      backgroundColor: colorPrimary + '15',
                      color: colorPrimary,
                    }}
                    className="text-[10px] uppercase tracking-wider"
                  >
                    {deal.sport}
                  </Badge>
                </div>
                <p className="mt-1.5 text-sm text-muted-foreground">
                  {deal.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
