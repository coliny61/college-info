import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, ChevronRight } from 'lucide-react'
import { FavoriteButton } from './favorite-button'

interface SchoolCardProps {
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
  isFavorited?: boolean
  showFavorite?: boolean
}

export function SchoolCard({
  slug,
  name,
  shortName,
  mascot,
  conference,
  city,
  state,
  colorPrimary,
  colorSecondary,
  isFavorited = false,
  showFavorite = true,
}: SchoolCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-black/20 hover:border-white/20">
      {/* School color accent strip */}
      <div
        className="h-1.5"
        style={{
          background: `linear-gradient(to right, ${colorPrimary}, ${colorSecondary})`,
        }}
      />

      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Link href={`/recruit/school/${slug}`} className="block">
              {/* Short name + mascot */}
              <div className="flex items-baseline gap-2">
                <span
                  className="text-2xl font-black tracking-tight"
                  style={{ color: colorPrimary }}
                >
                  {shortName}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {mascot}
                </span>
              </div>

              {/* Full name */}
              <h3 className="mt-1.5 truncate text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-emerald">
                {name}
              </h3>
            </Link>

            {/* Location + Conference */}
            <div className="mt-3 flex items-center gap-3 text-xs text-muted-foreground">
              <span className="flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {city}, {state}
              </span>
              <span
                className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
                style={{
                  backgroundColor: colorPrimary + '1A',
                  color: colorPrimary,
                }}
              >
                {conference}
              </span>
            </div>

            {/* View link hint */}
            <Link
              href={`/recruit/school/${slug}`}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/60 transition-colors group-hover:text-emerald"
            >
              View program <ChevronRight className="h-3 w-3" />
            </Link>
          </div>

          {/* Favorite button */}
          {showFavorite && (
            <FavoriteButton schoolId={slug} initialFavorited={isFavorited} />
          )}
        </div>
      </CardContent>
    </Card>
  )
}
