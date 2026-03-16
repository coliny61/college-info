'use client'

import { useState } from 'react'
import { MapPin, Building, Eye, Expand } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { PanoramaViewer } from './panorama-viewer'

interface Facility {
  id: string
  name: string
  type: string
  description: string
  panoramaUrl: string | null
  hotspots: Array<{
    id: string
    x: number
    y: number
    label: string
    description: string | null
  }>
}

interface CampusTabProps {
  description: string
  city: string
  state: string
  enrollment: number | null
  facilities: Facility[]
  colorPrimary: string
}

export function CampusTab({
  description,
  city,
  state,
  enrollment,
  facilities,
  colorPrimary,
}: CampusTabProps) {
  const [viewerFacility, setViewerFacility] = useState<Facility | null>(null)
  const facilitiesWithPanorama = facilities.filter((f) => f.panoramaUrl)

  return (
    <div className="space-y-10 animate-in-up">
      {/* Campus Overview */}
      <div>
        <h3 className="text-display mb-4 text-sm tracking-[0.15em] text-muted-foreground">
          Campus
        </h3>
        <div className="glass-panel rounded-xl p-6">
          <div className="flex flex-wrap items-center gap-4 mb-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" style={{ color: colorPrimary }} />
              {city}, {state}
            </span>
            {enrollment && (
              <span className="flex items-center gap-1.5">
                <Building className="h-3.5 w-3.5" style={{ color: colorPrimary }} />
                {enrollment.toLocaleString()} students
              </span>
            )}
          </div>
          <p className="drop-cap text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        </div>
      </div>

      <div className="section-divider" />

      {/* Points of Interest */}
      <div>
        <h3 className="text-display mb-4 text-sm tracking-[0.15em] text-muted-foreground">
          Points of Interest
        </h3>
        <div className="grid gap-3 sm:grid-cols-2">
          {facilities.map((facility) => (
            <div key={facility.id} className="glass-panel rounded-xl overflow-hidden group">
              {/* Panorama thumbnail */}
              {facility.panoramaUrl && (
                <div className="relative h-28 overflow-hidden sm:h-32">
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${facility.panoramaUrl})` }}
                  />
                  <div
                    className="absolute inset-0"
                    style={{ background: `linear-gradient(to top, var(--background) 0%, ${colorPrimary}33 100%)` }}
                  />
                  <button
                    onClick={() => setViewerFacility(facility)}
                    className="absolute bottom-2 right-2 flex items-center gap-1.5 rounded-full glass-panel px-3 py-1.5 text-[10px] font-medium uppercase tracking-wider text-foreground/80 hover:text-foreground transition-colors"
                  >
                    <Eye className="h-3 w-3" />
                    360° Tour
                  </button>
                </div>
              )}
              <div className="p-5">
                <div className="flex items-center gap-2">
                  <Building
                    className="h-4 w-4 shrink-0"
                    style={{ color: colorPrimary }}
                  />
                  <h4 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                    {facility.name}
                  </h4>
                </div>
                <span
                  className="mt-2 inline-block rounded-sm px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider capitalize"
                  style={{
                    backgroundColor: colorPrimary + '15',
                    color: colorPrimary,
                  }}
                >
                  {facility.type.replace('-', ' ')}
                </span>
                <p className="mt-2 text-xs text-muted-foreground line-clamp-3">
                  {facility.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Panorama Gallery */}
      {facilitiesWithPanorama.length > 0 && (
        <>
          <div className="section-divider" />
          <div>
            <h3 className="text-display mb-4 text-sm tracking-[0.15em] text-muted-foreground">
              Virtual Campus Walk
            </h3>
            <div className="flex gap-3 overflow-x-auto pb-2 -mx-6 px-6 sm:-mx-8 sm:px-8 lg:mx-0 lg:px-0">
              {facilitiesWithPanorama.map((facility) => (
                <button
                  key={facility.id}
                  onClick={() => setViewerFacility(facility)}
                  className="relative h-40 w-56 shrink-0 overflow-hidden rounded-xl group sm:w-64"
                >
                  <div
                    className="absolute inset-0 bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                    style={{ backgroundImage: `url(${facility.panoramaUrl})` }}
                  />
                  <div
                    className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"
                  />
                  <div className="absolute bottom-0 left-0 right-0 p-3">
                    <p className="font-display text-xs font-semibold uppercase tracking-wide text-white">
                      {facility.name}
                    </p>
                    <p className="mt-0.5 flex items-center gap-1 text-[10px] text-white/60">
                      <Expand className="h-2.5 w-2.5" />
                      Click to explore
                    </p>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </>
      )}

      {/* Panorama Viewer Dialog */}
      <Dialog open={!!viewerFacility} onOpenChange={(open) => !open && setViewerFacility(null)}>
        <DialogContent className="max-w-5xl h-[80vh] p-0 overflow-hidden">
          <DialogHeader className="absolute top-0 left-0 right-0 z-10 bg-gradient-to-b from-background/90 to-transparent px-6 py-4">
            <DialogTitle className="font-display text-sm uppercase tracking-wider">
              {viewerFacility?.name}
            </DialogTitle>
          </DialogHeader>
          {viewerFacility && viewerFacility.panoramaUrl && (
            <PanoramaViewer
              imageUrl={viewerFacility.panoramaUrl}
              hotspots={viewerFacility.hotspots}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}
