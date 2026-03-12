import type { Metadata } from 'next'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/server'

export const metadata: Metadata = { title: 'Dashboard' }
import { prisma } from '@/lib/prisma'
import { Card, CardContent } from '@/components/ui/card'
import { SchoolCard } from '@/components/school/school-card'
import { OnboardingWizard } from '@/components/recruit/onboarding-wizard'
import { ProfileSummaryCard } from '@/components/recruit/profile-summary-card'
import { Search, Heart, Shirt, ArrowRight } from 'lucide-react'

export default async function RecruitDashboard() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const displayName =
    user?.user_metadata?.display_name ?? user?.email?.split('@')[0] ?? 'Recruit'

  // Check for recruit profile
  const profile = user
    ? await prisma.recruitProfile.findUnique({ where: { userId: user.id } })
    : null

  if (user && !profile) {
    return <OnboardingWizard />
  }

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
        <h1 className="text-display text-4xl text-foreground">
          {displayName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Browse programs, tour facilities, and build your jersey.
        </p>
      </div>

      {/* Profile summary */}
      {profile && (
        <div className="mb-6 animate-in-up delay-1">
          <ProfileSummaryCard profile={profile} />
        </div>
      )}

      {/* Quick action cards */}
      <div className="mb-10 grid gap-4 grid-cols-2 sm:grid-cols-4 animate-in-up delay-1">
        {/* Browse Schools — spans 2 cols */}
        <Link href="/recruit/schools" className="col-span-2">
          <Card className="group relative h-full cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald/10 border-0 bg-gradient-to-br from-emerald/[0.06] to-transparent">
            <div className="bg-field-hash absolute inset-0 pointer-events-none opacity-30" />
            {/* Watermark */}
            <div className="pointer-events-none absolute -right-2 -bottom-4 select-none text-hero text-6xl text-emerald/[0.04] transition-all duration-300 group-hover:text-emerald/[0.08]">
              EXPLORE
            </div>
            <CardContent className="relative p-6">
              <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-emerald/10">
                <Search className="h-5 w-5 text-emerald" />
              </div>
              <h3 className="text-display text-lg tracking-wide text-foreground">Browse Schools</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Explore programs across the country.
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-emerald opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:gap-2">
                Explore <ArrowRight className="h-3.5 w-3.5" />
              </span>
            </CardContent>
          </Card>
        </Link>

        {/* Favorites */}
        <Link href="/recruit/favorites">
          <Card className="group h-full cursor-pointer overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/5 glass-panel border-0">
            <CardContent className="relative p-5">
              <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-red-500/10">
                <Heart className="h-5 w-5 text-red-400" />
              </div>
              <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">Favorites</h3>
              <p className="mt-1 text-xs text-muted-foreground">
                {favoriteSchools.length > 0
                  ? <><span className="text-scoreboard text-red-400 font-bold">{favoriteSchools.length}</span> saved</>
                  : 'Save schools'}
              </p>
            </CardContent>
          </Card>
        </Link>

        {/* Jersey Room */}
        <Card className="group overflow-hidden border-dashed glass-panel transition-colors hover:border-white/15">
          <CardContent className="relative p-5">
            <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-xl bg-white/[0.04]">
              <Shirt className="h-5 w-5 text-muted-foreground" />
            </div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Jersey Room
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              Pick a school first.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Favorites row — horizontal scroll on mobile */}
      {favoriteSchools.length > 0 && (
        <div className="mb-10 animate-in-up delay-2">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-display text-sm tracking-[0.15em] text-muted-foreground">
              Your Favorites
            </h2>
            <Link
              href="/recruit/favorites"
              className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-emerald hover:underline"
            >
              View all <ArrowRight className="h-3 w-3" />
            </Link>
          </div>
          <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
            {favoriteSchools.map((school) => (
              <div key={school.id} className="min-w-[260px] sm:min-w-0">
                <SchoolCard
                  {...school}
                  isFavorited
                  showFavorite
                />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All schools */}
      <div className="animate-in-up delay-3">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-display text-sm tracking-[0.15em] text-muted-foreground">All Schools</h2>
          <Link
            href="/recruit/schools"
            className="flex items-center gap-1 text-xs font-medium uppercase tracking-wider text-emerald hover:underline"
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
