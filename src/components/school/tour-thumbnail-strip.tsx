'use client'

import Image from 'next/image'

interface Facility {
  id: string
  name: string
  type: string
  panoramaUrl: string | null
}

interface TourThumbnailStripProps {
  facilities: Facility[]
  activeId: string
  colorPrimary: string
  onSelect: (id: string) => void
}

export function TourThumbnailStrip({ facilities, activeId, colorPrimary, onSelect }: TourThumbnailStripProps) {
  return (
    <div className="flex gap-2 overflow-x-auto pb-2 -mx-2 px-2">
      {facilities.map((facility) => {
        const isActive = facility.id === activeId
        return (
          <button
            key={facility.id}
            onClick={() => onSelect(facility.id)}
            className="group relative shrink-0 overflow-hidden rounded-lg transition-all duration-200 hover:opacity-100"
            style={{
              outline: isActive ? `2px solid ${colorPrimary}` : '2px solid transparent',
              outlineOffset: '2px',
              opacity: isActive ? 1 : 0.6,
            }}
          >
            <div className="relative h-16 w-24 sm:h-20 sm:w-32">
              {facility.panoramaUrl ? (
                <Image
                  src={facility.panoramaUrl}
                  alt={facility.name}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="h-full w-full bg-muted" />
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              <p className="absolute bottom-1 left-1.5 right-1.5 text-[9px] font-medium uppercase tracking-wider text-white truncate">
                {facility.name}
              </p>
            </div>
          </button>
        )
      })}
    </div>
  )
}
