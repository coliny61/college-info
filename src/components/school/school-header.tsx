import Image from 'next/image'
import { FavoriteButton } from './favorite-button'
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
  logoUrl?: string | null
  isFavorited: boolean
  isPublic?: boolean
}

export function SchoolHeader({
  id,
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
  logoUrl,
  isFavorited,
  isPublic = false,
}: SchoolHeaderProps) {
  return (
    <div
      className="relative -mx-6 overflow-hidden sm:-mx-8 lg:-mx-0 lg:rounded-2xl"
      style={{
        ['--school-primary' as string]: colorPrimary,
        ['--school-secondary' as string]: colorSecondary,
        ['--school-accent' as string]: colorAccent,
      }}
    >
      {/* Stadium panorama background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: `url(/panoramas/${slug}-stadium.jpg)`,
        }}
      />

      {/* Color overlay for schools without panorama or to tint it */}
      <div
        className="absolute inset-0"
        style={{
          background: `linear-gradient(135deg, ${colorPrimary}CC, ${colorSecondary}99)`,
        }}
      />

      {/* Heavy gradient overlay for text contrast */}
      <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />

      {/* Film grain texture */}
      <div className="absolute inset-0 bg-noise pointer-events-none" />

      {/* Watermark — logo or mascot */}
      <div className="pointer-events-none absolute -right-8 top-1/2 -translate-y-1/2 select-none sm:-right-4">
        {logoUrl ? (
          <Image
            src={logoUrl}
            alt=""
            width={400}
            height={400}
            className="opacity-[0.06] lg:h-[20rem] lg:w-[20rem] sm:h-[16rem] sm:w-[16rem] h-[12rem] w-[12rem]"
          />
        ) : (
          <span
            className="text-[10rem] leading-none opacity-[0.05] text-hero sm:text-[14rem] lg:text-[18rem]"
            style={{ color: colorAccent }}
          >
            {mascot}
          </span>
        )}
      </div>

      <div className="relative px-6 pb-10 pt-32 sm:px-8 sm:pb-14 sm:pt-40">
        {/* Favorite button — top right (hidden on public pages) */}
        {!isPublic && (
          <div className="absolute right-4 top-4 sm:right-6 sm:top-6">
            <div className="glass-panel rounded-full p-1">
              <FavoriteButton schoolId={id} initialFavorited={isFavorited} />
            </div>
          </div>
        )}

        <div className="animate-in-up">
          {/* Conference + Location — small caps above name */}
          <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.2em]" style={{ color: colorAccent + 'CC' }}>
            <span className="font-semibold">{conference}</span>
            <span className="opacity-40">|</span>
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {city}, {state}
            </span>
          </div>

          {/* School name — massive Oswald */}
          <h1
            className="mt-3 text-hero text-[clamp(2.5rem,7vw,6rem)] leading-[0.9]"
            style={{ color: colorAccent }}
          >
            {name}
          </h1>

          {/* Mascot */}
          <p
            className="mt-2 font-display text-lg font-medium uppercase tracking-wide opacity-70"
            style={{ color: colorAccent }}
          >
            {mascot}
          </p>
        </div>
      </div>
    </div>
  )
}
