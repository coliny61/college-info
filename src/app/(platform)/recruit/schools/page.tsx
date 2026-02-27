import { Suspense } from 'react'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { SchoolGrid } from '@/components/school/school-grid'
import { SchoolFilters } from '@/components/school/school-filters'
import { Skeleton } from '@/components/ui/skeleton'

interface SearchParams {
  q?: string
  conference?: string
  sort?: string
}

async function SchoolsList({ searchParams }: { searchParams: SearchParams }) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Build Prisma where clause
  const where: any = {}
  if (searchParams.q) {
    where.OR = [
      { name: { contains: searchParams.q, mode: 'insensitive' } },
      { mascot: { contains: searchParams.q, mode: 'insensitive' } },
      { city: { contains: searchParams.q, mode: 'insensitive' } },
      { state: { contains: searchParams.q, mode: 'insensitive' } },
    ]
  }
  if (searchParams.conference && searchParams.conference !== 'All') {
    where.conference = searchParams.conference
  }

  // Build orderBy
  let orderBy: any = { name: 'asc' }
  if (searchParams.sort === 'name-desc') {
    orderBy = { name: 'desc' }
  } else if (searchParams.sort === 'conference') {
    orderBy = [{ conference: 'asc' }, { name: 'asc' }]
  }

  const schools = await prisma.school.findMany({
    where,
    orderBy,
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

  // Get user's favorites
  let favoriteIds = new Set<string>()
  if (user) {
    const favorites = await prisma.favorite.findMany({
      where: { userId: user.id },
      select: { schoolId: true },
    })
    favoriteIds = new Set(favorites.map((f) => f.schoolId))
  }

  return <SchoolGrid schools={schools} favoriteIds={favoriteIds} />
}

function SchoolsLoading() {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="rounded-lg border border-border">
          <Skeleton className="h-2 w-full" />
          <div className="p-5 space-y-3">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-4 w-48" />
            <Skeleton className="h-3 w-32" />
          </div>
        </div>
      ))}
    </div>
  )
}

export default async function SchoolsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>
}) {
  const params = await searchParams

  return (
    <div className="mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-foreground">Browse Schools</h1>
        <p className="mt-2 text-muted-foreground">
          Explore programs across the country.
        </p>
      </div>

      <div className="mb-6">
        <SchoolFilters />
      </div>

      <Suspense fallback={<SchoolsLoading />}>
        <SchoolsList searchParams={params} />
      </Suspense>
    </div>
  )
}
