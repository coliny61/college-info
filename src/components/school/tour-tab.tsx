'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import dynamic from 'next/dynamic'
import { MapPin } from 'lucide-react'
import { TourThumbnailStrip } from './tour-thumbnail-strip'
import { TourCampusMap } from './tour-campus-map'
import { useTrackEvent } from '@/hooks/use-analytics'

// Dynamic import — PSV uses window/document
const PanoramaViewer = dynamic(
  () => import('./panorama-viewer').then((mod) => mod.PanoramaViewer),
  { ssr: false, loading: () => <div className="w-full rounded-xl bg-black/50 animate-pulse" style={{ height: 'clamp(300px, 50vw, 500px)' }} /> }
)

interface Hotspot {
  id: string
  x: number
  y: number
  z: number
  label: string
  description: string | null
  linkedFacilityId: string | null
}

interface Facility {
  id: string
  name: string
  type: string
  description: string
  panoramaUrl: string | null
  hotspots: Hotspot[]
}

interface TourTabProps {
  facilities: Facility[]
  colorPrimary: string
}

export function TourTab({ facilities, colorPrimary }: TourTabProps) {
  const tourFacilities = facilities.filter((f) => f.panoramaUrl)
  const [activeId, setActiveId] = useState(tourFacilities[0]?.id ?? '')
  const activeFacility = tourFacilities.find((f) => f.id === activeId)
  const trackEvent = useTrackEvent()
  const viewStartTime = useRef(Date.now())

  // Track duration when switching POIs
  const handleSelectPOI = useCallback((newId: string) => {
    if (newId === activeId) return

    // Track duration of current POI
    const duration = Date.now() - viewStartTime.current
    if (duration > 1000 && activeFacility) {
      trackEvent('tour', 'view_panorama', undefined, {
        facilityId: activeFacility.id,
        facilityName: activeFacility.name,
        duration,
      })
    }

    // Track navigation
    trackEvent('tour', 'navigate_poi', undefined, {
      fromFacilityId: activeId,
      toFacilityId: newId,
    })

    setActiveId(newId)
    viewStartTime.current = Date.now()
  }, [activeId, activeFacility, trackEvent])

  // Track duration on unmount
  useEffect(() => {
    return () => {
      const duration = Date.now() - viewStartTime.current
      if (duration > 1000) {
        // Can't use trackEvent in cleanup reliably, but analytics tracker handles beforeunload
      }
    }
  }, [])

  if (tourFacilities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted/50 mb-4">
          <MapPin className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
          360° Tour Coming Soon
        </h3>
        <p className="mt-1.5 max-w-xs text-xs text-muted-foreground">
          Immersive virtual tours are being prepared for this school.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Panorama viewer + campus map overlay */}
      <div className="relative">
        {activeFacility && (
          <>
            {/* Facility name overlay */}
            <div className="absolute top-3 left-3 z-10 glass-panel rounded-lg px-3 py-1.5">
              <p className="text-xs font-display uppercase tracking-wider text-foreground">
                {activeFacility.name}
              </p>
              <p className="text-[9px] text-muted-foreground capitalize">
                {activeFacility.type.replace('-', ' ')}
              </p>
            </div>

            <PanoramaViewer
              panoramaUrl={activeFacility.panoramaUrl!}
              hotspots={activeFacility.hotspots}
              colorPrimary={colorPrimary}
              onNavigate={handleSelectPOI}
            />

            {/* Mini campus map overlay */}
            <div className="absolute bottom-3 left-3 z-10">
              <TourCampusMap
                facilities={tourFacilities}
                activeId={activeId}
                colorPrimary={colorPrimary}
                onSelect={handleSelectPOI}
              />
            </div>
          </>
        )}
      </div>

      {/* Thumbnail strip */}
      <TourThumbnailStrip
        facilities={tourFacilities}
        activeId={activeId}
        colorPrimary={colorPrimary}
        onSelect={handleSelectPOI}
      />

      {/* Facility description */}
      {activeFacility && (
        <div className="glass-panel rounded-xl p-4 animate-in-fade">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {activeFacility.description}
          </p>
        </div>
      )}
    </div>
  )
}
