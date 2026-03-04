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
      <div className="mb-8 animate-in-up">
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

      {/* Quick action cards — asymmetric layout */}
      <div className="mb-10 grid gap-4 grid-cols-2 sm:grid-cols-4">
        {/* Browse Schools — spans 2 cols */}
        <Link href="/recruit/schools" className="col-span-2">
          <Card className="group relative h-full cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-emerald/5 hover:border-emerald/30">
            <div className="bg-yard-lines absolute inset-0 pointer-events-none opacity-30" />
            <div className="absolute -right-6 -top-6 h-28 w-28 rounded-full bg-emerald/[0.06] blur-2xl transition-all group-hover:bg-emerald/[0.12]" />
            {/* Watermark */}
            <div className="pointer-events-none absolute -right-2 -bottom-4 select-none text-6xl font-black text-emerald/[0.04] transition-all duration-300 group-hover:text-emerald/[0.08]">
              EXPLORE
            </div>
            <CardContent className="relative p-6">
              <div className="mb-3 flex h-11 w-11 items-center justify-center rounded-xl bg-emerald/10">
                <Search className="h-5 w-5 text-emerald" />
              </div>
              <h3 className="text-lg font-bold text-foreground">Browse Schools</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore programs across the country. Compare academics, athletics, and more.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-emerald opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:gap-2">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </CardContent>
          </Card>
        </Link>

        {/* Favorites */}
        <Link href="/recruit/favorites">
          <Card className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-red-500/5 hover:border-red-500/20">
            <CardContent className="relative p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                <Heart className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="text-base font-bold text-foreground">Favorites</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {favoriteSchools.length > 0
                  ? <><span className="text-red-400 font-bold text-scoreboard">{favoriteSchools.length}</span> saved</>
                  : 'Save schools to compare'}
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Jersey Room */}
        <Card className="group overflow-hidden border-dashed transition-colors hover:border-white/15">
          <CardContent className="relative p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Shirt className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="text-base font-bold text-muted-foreground">
              Jersey Room
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Pick a school first.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Favorites row */}
      {favoriteSchools.length > 0 && (
        <div className="mb-10 animate-in-up delay-2">
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
      <div className="animate-in-up delay-3">
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
