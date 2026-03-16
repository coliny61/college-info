'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { MapPin, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

interface Hotspot {
  id: string
  x: number
  y: number
  label: string
  description: string
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
  const [selectedId, setSelectedId] = useState(tourFacilities[0]?.id ?? '')
  const selected = tourFacilities.find((f) => f.id === selectedId)

  if (tourFacilities.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted/50 mb-4">
          <MapPin className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
          No Tours Available
        </h3>
        <p className="mt-1.5 max-w-xs text-xs text-muted-foreground">
          360° virtual tours are not yet available for this school.
        </p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Facility selector */}
      <div className="flex flex-wrap gap-2">
        {tourFacilities.map((facility) => (
          <Button
            key={facility.id}
            variant={facility.id === selectedId ? 'default' : 'outline'}
            size="sm"
            onClick={() => setSelectedId(facility.id)}
            style={
              facility.id === selectedId
                ? { backgroundColor: colorPrimary }
                : undefined
            }
          >
            {facility.name}
          </Button>
        ))}
      </div>

      {/* Panorama viewer */}
      {selected && (
        <PanoramaViewer
          facility={selected}
          colorPrimary={colorPrimary}
        />
      )}
    </div>
  )
}

function PanoramaViewer({
  facility,
  colorPrimary,
}: {
  facility: Facility
  colorPrimary: string
}) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [zoom, setZoom] = useState(1)
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [isDragging, setIsDragging] = useState(false)
  const dragStart = useRef({ x: 0, y: 0 })
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null)

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      setIsDragging(true)
      dragStart.current = { x: e.clientX - offset.x, y: e.clientY - offset.y }
    },
    [offset]
  )

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isDragging) return
      setOffset({
        x: e.clientX - dragStart.current.x,
        y: e.clientY - dragStart.current.y,
      })
    },
    [isDragging]
  )

  const handleMouseUp = useCallback(() => {
    setIsDragging(false)
  }, [])

  const handleZoomIn = () => setZoom((z) => Math.min(z + 0.25, 3))
  const handleZoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5))
  const handleReset = () => {
    setZoom(1)
    setOffset({ x: 0, y: 0 })
  }

  return (
    <Card>
      <CardContent className="p-0">
        {/* Controls */}
        <div className="flex items-center justify-between border-b border-border px-4 py-2">
          <div>
            <p className="text-sm font-medium text-foreground">
              {facility.name}
            </p>
            <p className="text-xs text-muted-foreground capitalize">
              {facility.type.replace('-', ' ')}
            </p>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" onClick={handleZoomOut}>
              <ZoomOut className="h-4 w-4" />
            </Button>
            <span className="min-w-10 text-center text-xs text-muted-foreground">
              {Math.round(zoom * 100)}%
            </span>
            <Button variant="ghost" size="icon" onClick={handleZoomIn}>
              <ZoomIn className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" onClick={handleReset}>
              <RotateCcw className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Panorama */}
        <div
          ref={containerRef}
          className="relative h-[280px] cursor-grab overflow-hidden bg-black active:cursor-grabbing sm:h-[400px]"
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {facility.panoramaUrl && (
            <div
              className="absolute inset-0 transition-transform"
              style={{
                transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
                transformOrigin: 'center',
              }}
            >
              <Image
                src={facility.panoramaUrl}
                alt={facility.name}
                fill
                className="object-cover"
                draggable={false}
              />

              {/* Hotspots */}
              {facility.hotspots.map((hotspot) => (
                <button
                  key={hotspot.id}
                  className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${hotspot.x * 100}%`,
                    top: `${hotspot.y * 100}%`,
                  }}
                  onClick={(e) => {
                    e.stopPropagation()
                    setActiveHotspot(
                      activeHotspot === hotspot.id ? null : hotspot.id
                    )
                  }}
                >
                  <div
                    className="flex h-7 w-7 items-center justify-center rounded-full border-2 border-white shadow-lg transition-transform hover:scale-110"
                    style={{ backgroundColor: colorPrimary }}
                  >
                    <MapPin className="h-3.5 w-3.5 text-white" />
                  </div>

                  {/* Tooltip */}
                  {activeHotspot === hotspot.id && (
                    <div className="absolute left-1/2 top-full mt-2 z-20 w-56 -translate-x-1/2 rounded-lg bg-card p-3 shadow-xl border border-border">
                      <p className="text-sm font-medium text-foreground">
                        {hotspot.label}
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {hotspot.description}
                      </p>
                    </div>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
