import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { SchoolGrid } from '@/components/school/school-grid'
import { Heart, Eye, Users, Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function ParentDashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const displayName =
    user?.user_metadata?.display_name ?? user?.email?.split('@')[0] ?? 'Parent'

  // Find linked recruit (if any)
  let recruitFavorites: any[] = []
  if (user) {
    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { linkedRecruitId: true },
    }).catch(() => null)

    if (dbUser?.linkedRecruitId) {
      const favorites = await prisma.favorite.findMany({
        where: { userId: dbUser.linkedRecruitId },
        include: {
          school: {
            select: {
              id: true,
              slug: true,
              name: true,
              shortName: true,
              mascot: true,
              conference: true,
              city: true,
              state: true,
              colorPrimary: true,
              colorSecondary: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      })
      recruitFavorites = favorites.map((f) => f.school)
    }
  }

  const stats = [
    { label: "Recruit's Favorites", value: recruitFavorites.length.toString(), icon: Heart, color: 'text-red-400', bg: 'bg-red-400/10' },
    { label: 'Schools Viewed', value: '—', icon: Eye, color: 'text-blue-400', bg: 'bg-blue-400/10' },
  ]

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8 animate-in-up">
        <span className="text-sm font-medium text-emerald">Parent Dashboard</span>
        <h1 className="mt-1 text-3xl font-black tracking-tight text-foreground">
          Welcome back, {displayName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Monitor your recruit&apos;s college search progress.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2 animate-in-up delay-1">
        {stats.map((stat) => (
          <Card key={stat.label} className="overflow-hidden">
            <CardContent className="p-5">
              <div className="flex items-center justify-between">
                <p className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  {stat.label}
                </p>
                <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${stat.bg}`}>
                  <stat.icon className={`h-4 w-4 ${stat.color}`} />
                </div>
              </div>
              <p className="mt-3 text-3xl font-black tracking-tight text-scoreboard">{stat.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {recruitFavorites.length > 0 ? (
        <div>
          <h2 className="mb-4 text-lg font-bold text-foreground">
            Recruit&apos;s Favorite Schools
          </h2>
          <SchoolGrid schools={recruitFavorites} showFavorites={false} />
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald/10">
            <Users className="h-8 w-8 text-emerald" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            No linked recruit
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Once your recruit account is linked, their favorites and activity will appear here.
          </p>
        </div>
      )}
    </div>
  )
}
