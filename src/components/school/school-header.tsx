import { FavoriteButton } from './favorite-button'
import { Badge } from '@/components/ui/badge'
import { MapPin } from 'lucide-react'

interface SchoolHeaderProps {
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
  colorAccent: string
  isFavorited: boolean
}

export function SchoolHeader({
  slug,
  name,
  shortName,
  mascot,
  conference,
  city,
  state,
  colorPrimary,
  colorSecondary,
  colorAccent,
  isFavorited,
}: SchoolHeaderProps) {
  return (
    <div
      className="relative overflow-hidden rounded-xl p-6 sm:p-8"
      style={{
        background: `linear-gradient(135deg, ${colorPrimary}, ${colorSecondary})`,
        // Set CSS vars for downstream theming
        ['--school-primary' as string]: colorPrimary,
        ['--school-secondary' as string]: colorSecondary,
        ['--school-accent' as string]: colorAccent,
      }}
    >
      {/* Background pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `radial-gradient(circle at 20% 50%, ${colorAccent} 1px, transparent 1px)`,
          backgroundSize: '40px 40px',
        }}
      />

      <div className="relative flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1
              className="text-4xl font-black tracking-tight sm:text-5xl"
              style={{ color: colorAccent }}
            >
              {shortName}
            </h1>
            <Badge
              variant="outline"
              className="border-white/30 text-xs"
              style={{ color: colorAccent }}
            >
              {conference}
            </Badge>
          </div>

          <p
            className="mt-1 text-lg font-medium opacity-90"
            style={{ color: colorAccent }}
          >
            {name}
          </p>

          <div
            className="mt-2 flex items-center gap-1 text-sm opacity-75"
            style={{ color: colorAccent }}
          >
            <MapPin className="h-3.5 w-3.5" />
            {city}, {state} &middot; {mascot}
          </div>
        </div>

        <FavoriteButton schoolId={slug} initialFavorited={isFavorited} />
      </div>
    </div>
  )
}
