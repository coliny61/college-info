import { SchoolCard } from './school-card'

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
}

export function SchoolGrid({
  schools,
  favoriteIds = new Set(),
  showFavorites = true,
}: SchoolGridProps) {
  if (schools.length === 0) {
    return (
      <div className="rounded-lg border border-dashed border-border p-12 text-center">
        <p className="text-muted-foreground">No schools found.</p>
      </div>
    )
  }

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {schools.map((school) => (
        <SchoolCard
          key={school.id}
          {...school}
          isFavorited={favoriteIds.has(school.id)}
          showFavorite={showFavorites}
        />
      ))}
    </div>
  )
}
