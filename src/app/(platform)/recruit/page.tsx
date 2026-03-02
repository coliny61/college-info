import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { SchoolCard } from '@/components/school/school-card'
import { Search, Heart, Shirt, ArrowRight, Sparkles } from 'lucide-react'

export default async function RecruitDashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const displayName =
    user?.user_metadata?.display_name ?? user?.email?.split('@')[0] ?? 'Recruit'

  // Fetch favorites
  let favoriteSchools: any[] = []
  let favoriteIds = new Set<string>()
  if (user) {
    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
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
      take: 4,
    })
    favoriteSchools = favorites.map((f) => f.school)
    favoriteIds = new Set(favoriteSchools.map((s) => s.id))
  }

  // Fetch all schools
  const allSchools = await prisma.school.findMany({
    orderBy: { name: 'asc' },
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
  })

  return (
    <div className="mx-auto max-w-6xl">
      {/* Welcome */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-1">
          <Sparkles className="h-5 w-5 text-emerald" />
          <span className="text-sm font-medium text-emerald">Dashboard</span>
        </div>
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Welcome back, {displayName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore schools, build your dream uniform, and find the right fit.
        </p>
      </div>

      {/* Quick action cards */}
      <div className="mb-10 grid gap-4 sm:grid-cols-3">
        <Link href="/recruit/schools">
          <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald/5 hover:border-emerald/30">
            <CardContent className="relative p-6">
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-emerald/5 blur-2xl transition-all group-hover:bg-emerald/10" />
              <div className="relative">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-emerald/10">
                  <Search className="h-5 w-5 text-emerald" />
                </div>
                <h3 className="text-base font-bold text-foreground">Browse Schools</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  Explore programs across the country.
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald opacity-0 transition-opacity group-hover:opacity-100">
                  Explore <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Link href="/recruit/favorites">
          <Card className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald/5 hover:border-emerald/30">
            <CardContent className="relative p-6">
              <div className="absolute -right-4 -top-4 h-20 w-20 rounded-full bg-red-500/5 blur-2xl transition-all group-hover:bg-red-500/10" />
              <div className="relative">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                  <Heart className="h-5 w-5 text-red-400" />
                </div>
                <h3 className="text-base font-bold text-foreground">Favorites</h3>
                <p className="mt-1 text-xs text-muted-foreground">
                  {favoriteSchools.length > 0
                    ? `${favoriteSchools.length} school${favoriteSchools.length === 1 ? '' : 's'} saved`
                    : 'Save schools to compare'}
                </p>
                <span className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-emerald opacity-0 transition-opacity group-hover:opacity-100">
                  View <ArrowRight className="h-3 w-3" />
                </span>
              </div>
            </CardContent>
          </Card>
        </Link>

        <Card className="overflow-hidden border-dashed opacity-60">
          <CardContent className="relative p-6">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Shirt className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-base font-bold text-muted-foreground">
              Jersey Room
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Pick a school to build your uniform.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Favorites row */}
      {favoriteSchools.length > 0 && (
        <div className="mb-10">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              Your Favorites
            </h2>
            <Link
              href="/recruit/favorites"
              className="flex items-center gap-1 text-sm font-medium text-emerald hover:underline"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {favoriteSchools.map((school) => (
              <SchoolCard
                key={school.id}
                {...school}
                isFavorited
                showFavorite
              />
            ))}
          </div>
        </div>
      )}

      {/* All schools */}
      <div>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold text-foreground">All Schools</h2>
          <Link
            href="/recruit/schools"
            className="flex items-center gap-1 text-sm font-medium text-emerald hover:underline"
          >
            Browse all <ArrowRight className="h-3 w-3" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {allSchools.map((school) => (
            <SchoolCard
              key={school.id}
              {...school}
              isFavorited={favoriteIds.has(school.id)}
              showFavorite
            />
          ))}
        </div>
      </div>
    </div>
  )
}
