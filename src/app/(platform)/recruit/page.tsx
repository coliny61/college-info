import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SchoolCard } from '@/components/school/school-card'
import { Search, Heart, Shirt, ArrowRight } from 'lucide-react'

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
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {displayName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Explore schools, build your dream uniform, and find the right fit.
        </p>
      </div>

      {/* Quick action cards */}
      <div className="mb-8 grid gap-4 sm:grid-cols-3">
        <Link href="/recruit/schools">
          <Card className="cursor-pointer transition-colors hover:border-emerald/50">
            <CardHeader className="pb-2">
              <Search className="h-6 w-6 text-emerald" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-base">Browse Schools</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                Explore programs across the country.
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link href="/recruit/favorites">
          <Card className="cursor-pointer transition-colors hover:border-emerald/50">
            <CardHeader className="pb-2">
              <Heart className="h-6 w-6 text-emerald" />
            </CardHeader>
            <CardContent>
              <CardTitle className="text-base">Favorites</CardTitle>
              <p className="mt-1 text-xs text-muted-foreground">
                {favoriteSchools.length > 0
                  ? `${favoriteSchools.length} school${favoriteSchools.length === 1 ? '' : 's'} saved`
                  : 'Save schools to compare'}
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card className="border-dashed">
          <CardHeader className="pb-2">
            <Shirt className="h-6 w-6 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <CardTitle className="text-base text-muted-foreground">
              Jersey Room
            </CardTitle>
            <p className="mt-1 text-xs text-muted-foreground">
              Pick a school to build your uniform.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Favorites row */}
      {favoriteSchools.length > 0 && (
        <div className="mb-8">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              Your Favorites
            </h2>
            <Link
              href="/recruit/favorites"
              className="flex items-center gap-1 text-sm text-emerald hover:underline"
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
          <h2 className="text-lg font-semibold text-foreground">All Schools</h2>
          <Link
            href="/recruit/schools"
            className="flex items-center gap-1 text-sm text-emerald hover:underline"
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
