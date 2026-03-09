'use client'

import { useTrackDuration } from '@/hooks/use-analytics'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { DollarSign, Building2, Handshake } from 'lucide-react'
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

  return (
    <div className="space-y-6 animate-in-up">
      {/* Budget stats */}
      <div className="grid gap-3 sm:grid-cols-3">
        <Card>
          <CardContent className="p-4 text-center">
            <DollarSign className="mx-auto h-6 w-6" style={{ color: colorPrimary }} />
            <p className="mt-2 text-xs text-muted-foreground">Total NIL Budget</p>
            <p className="mt-1 text-2xl font-bold text-scoreboard" style={{ color: colorPrimary }}>
              {formatBudget(nilProgram.totalBudget)}
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">Football Spend</p>
            <p className="mt-1 text-xl font-bold text-scoreboard">
              {formatBudget(nilProgram.footballSpend)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {Math.round((nilProgram.footballSpend / nilProgram.totalBudget) * 100)}% of total
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4 text-center">
            <p className="text-xs text-muted-foreground">All Other Sports</p>
            <p className="mt-1 text-xl font-bold text-scoreboard">
              {formatBudget(nilProgram.allSportsSpend)}
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              {Math.round((nilProgram.allSportsSpend / nilProgram.totalBudget) * 100)}% of total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Collective info */}
      <Card className="animate-in-up delay-1">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <Building2 className="h-5 w-5" style={{ color: colorPrimary }} />
            {nilProgram.collectiveName}
          </CardTitle>
          <p className="text-xs text-muted-foreground">
            Founded {nilProgram.founded}
          </p>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {nilProgram.description}
          </p>
        </CardContent>
      </Card>

      {/* Notable deals */}
      {deals.length > 0 && (
        <Card className="animate-in-up delay-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-lg">
              <Handshake className="h-5 w-5" style={{ color: colorPrimary }} />
              Notable NIL Deals
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            {deals.map((deal, i) => (
              <div
                key={i}
                className="flex items-start gap-3 rounded-lg border border-border p-3"
              >
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <p className="font-medium text-foreground">{deal.athlete}</p>
                    <Badge
                      variant="outline"
                      style={{
                        borderColor: colorPrimary + '40',
                        color: colorPrimary,
                      }}
                    >
                      {deal.sport}
                    </Badge>
                  </div>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {deal.description}
                  </p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  )
}
