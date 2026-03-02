import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { SchoolGrid } from '@/components/school/school-grid'
import { Heart, Search } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export default async function FavoritesPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

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
  })

  const schools = favorites.map((f) => f.school)
  const favoriteIds = new Set(schools.map((s) => s.id))

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tight text-foreground">Favorites</h1>
        <p className="mt-2 text-muted-foreground">
          Schools you&apos;re interested in.
        </p>
      </div>

      {schools.length === 0 ? (
        <div className="rounded-2xl border border-dashed border-border bg-card/50 p-16 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-500/10">
            <Heart className="h-8 w-8 text-red-400" />
          </div>
          <h3 className="text-xl font-bold text-foreground">
            No favorites yet
          </h3>
          <p className="mx-auto mt-2 max-w-sm text-sm text-muted-foreground">
            Browse schools and tap the heart icon to save your favorites. They&apos;ll show up here so you can compare.
          </p>
          <Link href="/recruit/schools" className="mt-6 inline-block">
            <Button className="gap-2">
              <Search className="h-4 w-4" />
              Browse Schools
            </Button>
          </Link>
        </div>
      ) : (
        <SchoolGrid schools={schools} favoriteIds={favoriteIds} />
      )}
    </div>
  )
}
