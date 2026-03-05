import { SchoolCard } from './school-card'
import { CompareProvider } from './compare-context'
import { CompareBar } from './compare-bar'

interface School {
  id: string
  slug: string
  name: string
  shortName: string
  mascot: string
  conference: string
  city: string
  state: string
  colorPrimary: string
  colorSecondary: string
}

interface SchoolGridProps {
  schools: School[]
  favoriteIds?: Set<string>
  showFavorites?: boolean
  showCompare?: boolean
}

export function SchoolGrid({
  schools,
  favoriteIds = new Set(),
  showFavorites = true,
  showCompare = true,
}: SchoolGridProps) {
  if (schools.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center">
        <p className="text-muted-foreground">No schools found.</p>
      </div>
    )
  }

  const grid = (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {schools.map((school) => (
        <SchoolCard
          key={school.id}
          {...school}
          isFavorited={favoriteIds.has(school.id)}
          showFavorite={showFavorites}
          showCompare={showCompare}
        />
      ))}
    </div>
  )

  if (!showCompare) return grid

  return (
    <CompareProvider>
      {grid}
      <CompareBar />
    </CompareProvider>
  )
}
