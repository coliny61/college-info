import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { notFound } from 'next/navigation'

export const metadata: Metadata = { title: 'Manage Roster' }

async function getSchool() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()
  if (!user) return null
  const dbUser = await prisma.user.findUnique({ where: { id: user.id }, select: { schoolId: true } })
  if (!dbUser?.schoolId) return null
  return prisma.school.findUnique({
    where: { id: dbUser.schoolId },
    include: {
      rosterPlayers: {
        orderBy: [{ isStarter: 'desc' }, { position: 'asc' }, { name: 'asc' }],
      },
    },
  })
}

export default async function RosterManagementPage() {
  const school = await getSchool()
  if (!school) notFound()

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 animate-in-up">
        <h1 className="text-display text-3xl text-foreground">Manage Roster</h1>
        <p className="mt-2 text-muted-foreground">{school.rosterPlayers.length} players on the {school.name} roster.</p>
      </div>

      {school.rosterPlayers.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">No players on the roster yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full text-xs">
            <thead>
              <tr className="border-b border-border">
                <th className="pb-2 pr-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">#</th>
                <th className="pb-2 pr-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Name</th>
                <th className="pb-2 pr-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Pos</th>
                <th className="pb-2 pr-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Yr</th>
                <th className="pb-2 pr-3 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Ht/Wt</th>
                <th className="pb-2 text-left text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">Starter</th>
              </tr>
            </thead>
            <tbody>
              {school.rosterPlayers.map((p) => (
                <tr key={p.id} className="border-b border-white/[0.03]">
                  <td className="py-2 pr-3 text-scoreboard font-bold">{p.number}</td>
                  <td className="py-2 pr-3 font-medium text-foreground">{p.name}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{p.position}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{p.year}</td>
                  <td className="py-2 pr-3 text-muted-foreground">{p.height} / {p.weight}</td>
                  <td className="py-2">{p.isStarter ? '✓' : ''}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
