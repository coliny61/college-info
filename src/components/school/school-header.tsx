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
      className="relative overflow-hidden rounded-2xl"
      style={{
        background: `linear-gradient(135deg, ${colorPrimary}, ${colorSecondary})`,
        ['--school-primary' as string]: colorPrimary,
        ['--school-secondary' as string]: colorSecondary,
        ['--school-accent' as string]: colorAccent,
      }}
    >
      {/* Yard-line pattern */}
      <div
        className="absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: `repeating-linear-gradient(90deg, transparent, transparent calc(50% - 0.5px), ${colorAccent} calc(50% - 0.5px), ${colorAccent} calc(50% + 0.5px), transparent calc(50% + 0.5px))`,
          backgroundSize: '80px 100%',
        }}
      />

      {/* Dark gradient overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />

      {/* Watermark short name */}
      <div
        className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none text-[12rem] font-black leading-none opacity-[0.06]"
        style={{ color: colorAccent }}
      >
        {shortName}
      </div>

      <div className="relative px-6 py-10 sm:px-8 sm:py-14">
        <div className="flex items-start justify-between gap-4">
          <div className="animate-in-up">
            <div className="flex items-center gap-3">
              <h1
                className="text-5xl font-black tracking-tighter sm:text-7xl text-scoreboard"
                style={{ color: colorAccent }}
              >
                {shortName}
              </h1>
              <Badge
                variant="outline"
                className="border-white/30 text-xs font-bold"
                style={{ color: colorAccent }}
              >
                {conference}
              </Badge>
            </div>

            <p
              className="mt-2 text-lg font-medium opacity-90"
              style={{ color: colorAccent }}
            >
              {name}
            </p>

            <div
              className="mt-2 flex items-center gap-1 text-sm opacity-70"
              style={{ color: colorAccent }}
            >
              <MapPin className="h-3.5 w-3.5" />
              {city}, {state} &middot; {mascot}
            </div>
          </div>

          <FavoriteButton schoolId={slug} initialFavorited={isFavorited} />
        </div>
      </div>
    </div>
  )
}
