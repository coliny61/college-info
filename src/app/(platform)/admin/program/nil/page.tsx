import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Manage NIL' }

function formatBudget(amount: number) {
  if (amount >= 1000000) return `$${(amount / 1000000).toFixed(1)}M`
  if (amount >= 1000) return `$${(amount / 1000).toFixed(0)}K`
  return `$${amount.toLocaleString()}`
}

async function getSchool() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { schoolId: true } })
  if (!dbUser?.schoolId) return null
  return prisma.school.findUnique({
    where: { id: dbUser.schoolId },
    include: { nilProgram: true, nilFieldVisibility: true },
  })
}

const VISIBILITY_LABELS: Record<string, string> = {
  public: 'Public',
  invite_only: 'Invite Only',
  hidden: 'Hidden',
}

export default async function NilPage() {
  const school = await getSchool()
  if (!school) notFound()

  const nil = school.nilProgram
  const visibility = school.nilFieldVisibility

  return (
    <div className="mx-auto max-w-4xl">
      <div className="mb-8 animate-in-up">
        <h1 className="text-display text-3xl text-foreground">Manage NIL</h1>
        <p className="mt-2 text-muted-foreground">Edit NIL program details and control field visibility.</p>
      </div>

      {!nil ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No NIL program configured yet.</p>
        </div>
      ) : (
        <div className="space-y-6">
          <div className="glass-panel rounded-xl p-5">
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground mb-3">{nil.collectiveName}</h3>
            <div className="grid gap-3 sm:grid-cols-3 text-sm">
              <div><span className="text-muted-foreground">Total Budget:</span> <span className="text-scoreboard font-bold">{formatBudget(nil.totalBudget)}</span></div>
              <div><span className="text-muted-foreground">Football:</span> <span className="text-scoreboard font-bold">{formatBudget(nil.footballSpend)}</span></div>
              {nil.averageDealSize && <div><span className="text-muted-foreground">Avg Deal:</span> <span className="text-scoreboard font-bold">{formatBudget(nil.averageDealSize)}</span></div>}
            </div>
          </div>

          {visibility && (
            <div className="glass-panel rounded-xl p-5">
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground mb-3">Field Visibility</h3>
              <div className="space-y-2">
                {Object.entries({
                  totalBudget: 'Total Budget',
                  footballSpend: 'Football Spend',
                  allSportsSpend: 'All Sports Spend',
                  averageDealSize: 'Average Deal Size',
                  notableDeals: 'Notable Deals',
                }).map(([field, label]) => (
                  <div key={field} className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">{label}</span>
                    <span className="text-xs rounded-sm px-2 py-0.5 bg-white/[0.05]">
                      {VISIBILITY_LABELS[(visibility as Record<string, string>)[field]] ?? 'public'}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  )
}
