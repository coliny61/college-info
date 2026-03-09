import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { MapPin, ArrowRight } from 'lucide-react'
import { FavoriteButton } from './favorite-button'
import { CompareCheckbox } from './compare-checkbox'

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
  showCompare?: boolean
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
  showCompare = false,
}: SchoolCardProps) {
  return (
    <Card className="group relative overflow-hidden transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/30 border-0">
      {/* Top gradient band — mini-poster style */}
      <div
        className="relative h-28 overflow-hidden"
        style={{
          background: `linear-gradient(135deg, ${colorPrimary}, ${colorSecondary})`,
        }}
      >
        {/* Noise texture */}
        <div className="absolute inset-0 bg-noise pointer-events-none" />

        {/* School short name in band */}
        <div
          className="absolute inset-0 flex items-center justify-center select-none pointer-events-none"
        >
          <span
            className="text-hero text-6xl opacity-[0.12] transition-opacity duration-300 group-hover:opacity-[0.2]"
            style={{ color: '#FFFFFF' }}
          >
            {shortName}
          </span>
        </div>

        {/* Favorite + compare — top right in band */}
        <div className="absolute right-2 top-2 flex items-center gap-1 z-10">
          {showCompare && <CompareCheckbox slug={slug} />}
          {showFavorite && (
            <FavoriteButton schoolId={slug} initialFavorited={isFavorited} />
          )}
        </div>

        {/* Conference badge — bottom left in band */}
        <div className="absolute bottom-3 left-4">
          <span
            className="rounded-sm px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em]"
            style={{
              backgroundColor: 'rgba(0,0,0,0.4)',
              color: '#FFFFFF',
              backdropFilter: 'blur(8px)',
            }}
          >
            {conference}
          </span>
        </div>
      </div>

      {/* Content area */}
      <Link href={`/recruit/school/${slug}`} className="block">
        <CardContent className="relative p-5">
          {/* School name + mascot */}
          <h3 className="font-display text-lg font-bold uppercase tracking-tight text-foreground">
            {name}
          </h3>
          <p className="mt-0.5 text-sm text-muted-foreground">{mascot}</p>

          {/* Location */}
          <div className="mt-3 flex items-center justify-between">
            <span className="flex items-center gap-1 text-xs text-muted-foreground">
              <MapPin className="h-3 w-3" />
              {city}, {state}
            </span>
            <span className="flex items-center gap-1 text-xs font-medium text-muted-foreground/40 transition-all duration-200 group-hover:text-emerald group-hover:gap-2">
              View <ArrowRight className="h-3 w-3" />
            </span>
          </div>
        </CardContent>
      </Link>
    </Card>
  )
}
