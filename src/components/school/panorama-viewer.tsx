'use client'

import { useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import { MapPin, ZoomIn, ZoomOut, RotateCcw } from 'lucide-react'

interface Hotspot {
  id: string
  x: number
  y: number
  label: string
  description: string | null
}

interface PanoramaViewerProps {
  imageUrl: string
  hotspots?: Hotspot[]
  colorPrimary?: string
  height?: string
}

export function PanoramaViewer({
  imageUrl,
  hotspots = [],
  colorPrimary = '#10B981',
  height = '100%',
}: PanoramaViewerProps) {
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
    <div className="flex h-full flex-col">
      {/* Controls */}
      <div className="flex items-center justify-end gap-1 border-b border-border px-4 py-2 shrink-0">
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

      {/* Panorama */}
      <div
        ref={containerRef}
        className="relative flex-1 cursor-grab overflow-hidden bg-black active:cursor-grabbing"
        style={{ minHeight: height === '100%' ? undefined : height }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        <div
          className="absolute inset-0 transition-transform"
          style={{
            transform: `translate(${offset.x}px, ${offset.y}px) scale(${zoom})`,
            transformOrigin: 'center',
          }}
        >
          <Image
            src={imageUrl}
            alt="Panorama"
            fill
            className="object-cover"
            draggable={false}
          />

          {/* Hotspots */}
          {hotspots.map((hotspot) => (
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

              {activeHotspot === hotspot.id && (
                <div className="absolute left-1/2 top-full mt-2 z-20 w-56 -translate-x-1/2 rounded-lg bg-card p-3 shadow-xl border border-border">
                  <p className="text-sm font-medium text-foreground">
                    {hotspot.label}
                  </p>
                  {hotspot.description && (
                    <p className="mt-1 text-xs text-muted-foreground">
                      {hotspot.description}
                    </p>
                  )}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}
