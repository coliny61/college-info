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
    <Card className="group relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:border-white/15">
      {/* Bold left color bar */}
      <div
        className="absolute left-0 top-0 h-full w-1 transition-all duration-300 group-hover:w-1.5"
        style={{
          background: `linear-gradient(to bottom, ${colorPrimary}, ${colorSecondary})`,
        }}
      />

      {/* Watermark short name */}
      <div
        className="pointer-events-none absolute -right-2 -top-3 select-none text-7xl font-black opacity-[0.03] transition-opacity duration-300 group-hover:opacity-[0.06]"
        style={{ color: colorPrimary }}
      >
        {shortName}
      </div>

      {/* Hover background wash */}
      <div
        className="absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{
          background: `linear-gradient(135deg, ${colorPrimary}08, transparent 70%)`,
        }}
      />

      <CardContent className="relative p-5 pl-5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0 flex-1">
            <Link href={`/recruit/school/${slug}`} className="block">
              {/* Short name + mascot */}
              <div className="flex items-baseline gap-2">
                <span
                  className="text-2xl font-black tracking-tight text-scoreboard"
                  style={{ color: colorPrimary }}
                >
                  {shortName}
                </span>
                <span className="text-sm font-medium text-muted-foreground">
                  {mascot}
                </span>
              </div>

              {/* Full name */}
              <h3 className="mt-1.5 truncate text-sm font-medium text-foreground transition-colors duration-200 group-hover:text-foreground/90">
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
                className="rounded-full px-2 py-0.5 text-[11px] font-bold"
                style={{
                  backgroundColor: colorPrimary,
                  color: '#FFFFFF',
                }}
              >
                {conference}
              </span>
            </div>

            {/* View link hint */}
            <Link
              href={`/recruit/school/${slug}`}
              className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-muted-foreground/50 transition-all duration-200 group-hover:text-emerald group-hover:gap-2"
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
