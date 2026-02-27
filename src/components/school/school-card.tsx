import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin } from 'lucide-react'
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
    <Card className="group relative overflow-hidden transition-all duration-200 hover:scale-[1.02] hover:shadow-lg">
      {/* School color accent strip */}
      <div
        className="h-2"
        style={{
          background: `linear-gradient(to right, ${colorPrimary}, ${colorSecondary})`,
        }}
      />

      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Link href={`/recruit/school/${slug}`} className="block">
              {/* Short name + mascot */}
              <div className="flex items-center gap-2">
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
              <h3 className="mt-1 truncate text-sm font-medium text-foreground group-hover:text-emerald">
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
                className="rounded-full px-2 py-0.5 text-xs font-medium"
                style={{
                  backgroundColor: colorPrimary + '1A',
                  color: colorPrimary,
                }}
              >
                {conference}
              </span>
            </div>
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
