import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { SchoolGrid } from '@/components/school/school-grid'
import { Heart } from 'lucide-react'
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
        <h1 className="text-3xl font-bold text-foreground">Favorites</h1>
        <p className="mt-2 text-muted-foreground">
          Schools you&apos;re interested in.
        </p>
      </div>

      {schools.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <Heart className="mx-auto h-12 w-12 text-muted-foreground/50" />
          <h3 className="mt-4 text-lg font-medium text-foreground">
            No favorites yet
          </h3>
          <p className="mt-2 text-sm text-muted-foreground">
            Browse schools and tap the heart icon to save your favorites.
          </p>
          <Link href="/recruit/schools" className="mt-4 inline-block">
            <Button>Browse Schools</Button>
          </Link>
        </div>
      ) : (
        <SchoolGrid schools={schools} favoriteIds={favoriteIds} />
      )}
    </div>
  )
}
