import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { SchoolGrid } from '@/components/school/school-grid'
import { Heart, Eye } from 'lucide-react'

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

  return (
    <div className="mx-auto max-w-5xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">
          Welcome back, {displayName}
        </h1>
        <p className="mt-2 text-muted-foreground">
          Monitor your recruit&apos;s college search progress.
        </p>
      </div>

      <div className="mb-8 grid gap-4 sm:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Recruit&apos;s Favorites
            </CardTitle>
            <Heart className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{recruitFavorites.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Schools Viewed
            </CardTitle>
            <Eye className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">—</p>
          </CardContent>
        </Card>
      </div>

      {recruitFavorites.length > 0 ? (
        <div>
          <h2 className="mb-4 text-lg font-semibold text-foreground">
            Recruit&apos;s Favorite Schools
          </h2>
          <SchoolGrid schools={recruitFavorites} showFavorites={false} />
        </div>
      ) : (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No linked recruit found. Once your recruit account is linked,
            their favorites and activity will appear here.
          </p>
        </div>
      )}
    </div>
  )
}
