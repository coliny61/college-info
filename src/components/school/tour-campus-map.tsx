'use client'

import { useState } from 'react'
import { MapPin, Expand, X } from 'lucide-react'
import { Button } from '@/components/ui/button'

interface Facility {
  id: string
  name: string
  type: string
}

// Approximate layout positions for facility types (percentage-based)
const TYPE_POSITIONS: Record<string, { x: number; y: number }> = {
  stadium: { x: 50, y: 25 },
  'locker-room': { x: 35, y: 45 },
  'weight-room': { x: 65, y: 45 },
  practice: { x: 50, y: 70 },
}

interface TourCampusMapProps {
  facilities: Facility[]
  activeId: string
  colorPrimary: string
  onSelect: (id: string) => void
}

export function TourCampusMap({ facilities, activeId, colorPrimary, onSelect }: TourCampusMapProps) {
  const [expanded, setExpanded] = useState(false)

  if (facilities.length === 0) return null

  const mapContent = (
    <div className="relative w-full h-full bg-card/80 rounded-xl overflow-hidden">
      {/* Grid pattern background */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            linear-gradient(${colorPrimary}30 1px, transparent 1px),
            linear-gradient(90deg, ${colorPrimary}30 1px, transparent 1px)
          `,
          backgroundSize: '20px 20px',
        }}
      />

      {/* Campus label */}
      <div className="absolute top-2 left-2">
        <p className="text-[8px] font-bold uppercase tracking-[0.2em] text-muted-foreground/50">
          Campus Map
        </p>
      </div>

      {/* Facility pins */}
      {facilities.map((facility) => {
        const pos = TYPE_POSITIONS[facility.type] ?? { x: 50, y: 50 }
        const isActive = facility.id === activeId

        return (
          <button
            key={facility.id}
            onClick={() => onSelect(facility.id)}
            className="absolute -translate-x-1/2 -translate-y-1/2 transition-all duration-200 z-10"
            style={{
              left: `${pos.x}%`,
              top: `${pos.y}%`,
            }}
          >
            <div className="flex flex-col items-center gap-0.5">
              <div
                className="flex h-5 w-5 items-center justify-center rounded-full border-2 transition-transform"
                style={{
                  backgroundColor: isActive ? colorPrimary : 'rgba(255,255,255,0.15)',
                  borderColor: isActive ? 'white' : 'rgba(255,255,255,0.3)',
                  transform: isActive ? 'scale(1.3)' : 'scale(1)',
                }}
              >
                <MapPin className="h-2.5 w-2.5 text-white" />
              </div>
              <span
                className="text-[7px] font-medium uppercase tracking-wider whitespace-nowrap"
                style={{ color: isActive ? colorPrimary : 'var(--muted-foreground)' }}
              >
                {facility.name.length > 15 ? facility.type.replace('-', ' ') : facility.name}
              </span>
            </div>
          </button>
        )
      })}
    </div>
  )

  return (
    <>
      {/* Mini map — corner overlay */}
      <div className="relative">
        <div className="glass-panel rounded-xl p-1.5 w-48 h-32 sm:w-56 sm:h-40">
          {mapContent}
          <Button
            variant="ghost"
            size="icon"
            className="absolute top-1 right-1 h-6 w-6"
            onClick={() => setExpanded(true)}
          >
            <Expand className="h-3 w-3" />
          </Button>
        </div>
      </div>

      {/* Expanded overlay */}
      {expanded && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">
          <div className="relative w-[90vw] max-w-xl h-[60vh] glass-panel rounded-2xl p-4">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-2 right-2 z-10"
              onClick={() => setExpanded(false)}
            >
              <X className="h-4 w-4" />
            </Button>
            <h3 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-3">
              Campus Map
            </h3>
            <div className="h-[calc(100%-2rem)]">
              {mapContent}
            </div>
          </div>
        </div>
      )}
    </>
  )
}
