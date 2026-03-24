'use client'

import { useEffect, useRef, useCallback } from 'react'
import { Viewer } from '@photo-sphere-viewer/core'
import { MarkersPlugin } from '@photo-sphere-viewer/markers-plugin'
import { AutorotatePlugin } from '@photo-sphere-viewer/autorotate-plugin'
import '@photo-sphere-viewer/core/index.css'
import '@photo-sphere-viewer/markers-plugin/index.css'

interface Hotspot {
  id: string
  x: number
  y: number
  z: number
  label: string
  description: string | null
  linkedFacilityId: string | null
}

interface PanoramaViewerProps {
  panoramaUrl: string
  hotspots?: Hotspot[]
  colorPrimary?: string
  onNavigate?: (facilityId: string) => void
}

export function PanoramaViewer({
  panoramaUrl,
  hotspots = [],
  colorPrimary = '#10B981',
  onNavigate,
}: PanoramaViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const viewerRef = useRef<Viewer | null>(null)
  const onNavigateRef = useRef(onNavigate)
  onNavigateRef.current = onNavigate

  const initViewer = useCallback(() => {
    if (!containerRef.current) return

    // Destroy previous instance
    if (viewerRef.current) {
      viewerRef.current.destroy()
      viewerRef.current = null
    }

    const viewer = new Viewer({
      container: containerRef.current,
      panorama: panoramaUrl,
      defaultYaw: 0,
      defaultPitch: 0,
      defaultZoomLvl: 50,
      navbar: ['zoom', 'fullscreen'],
      plugins: [
        [AutorotatePlugin, {
          autorotateSpeed: '0.5rpm',
          autorotatePitch: 0,
          autostartDelay: 3000,
          autostartOnIdle: true,
        }],
        [MarkersPlugin, {
          markers: hotspots.map((h) => ({
            id: h.id,
            position: {
              yaw: (h.x - 0.5) * Math.PI * 2,
              pitch: (0.5 - h.y) * Math.PI,
            },
            html: `<div style="
              width: 28px; height: 28px; border-radius: 50%;
              background: ${colorPrimary}; border: 2px solid white;
              display: flex; align-items: center; justify-content: center;
              cursor: pointer; box-shadow: 0 2px 8px rgba(0,0,0,0.3);
              transition: transform 0.2s;
            " onmouseenter="this.style.transform='scale(1.2)'" onmouseleave="this.style.transform='scale(1)'">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/>
              </svg>
            </div>`,
            anchor: 'center center',
            tooltip: {
              content: `<div style="font-weight:600;font-size:13px">${h.label}</div>${h.description ? `<div style="font-size:11px;opacity:0.8;margin-top:4px">${h.description}</div>` : ''}`,
              position: 'top center',
            },
            data: { linkedFacilityId: h.linkedFacilityId },
          })),
        }],
      ],
    })

    // Handle marker clicks for navigation
    const markersPlugin = viewer.getPlugin(MarkersPlugin)
    markersPlugin.addEventListener('select-marker', (e) => {
      const linkedId = e.marker.data?.linkedFacilityId
      if (linkedId && onNavigateRef.current) {
        onNavigateRef.current(linkedId)
      }
    })

    viewerRef.current = viewer
  }, [panoramaUrl, hotspots, colorPrimary])

  useEffect(() => {
    initViewer()
    return () => {
      if (viewerRef.current) {
        viewerRef.current.destroy()
        viewerRef.current = null
      }
    }
  }, [initViewer])

  return (
    <div
      ref={containerRef}
      className="w-full rounded-xl overflow-hidden"
      style={{ height: 'clamp(300px, 50vw, 500px)' }}
    />
  )
}
