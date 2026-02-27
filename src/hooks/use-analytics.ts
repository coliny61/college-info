'use client'

import { useEffect, useRef, useCallback } from 'react'
import { getTracker } from '@/lib/analytics-tracker'

export function useTrackPageView(section: string, schoolId?: string) {
  useEffect(() => {
    const tracker = getTracker()
    tracker.track({
      section,
      action: 'page_view',
      schoolId,
    })
  }, [section, schoolId])
}

export function useTrackEvent() {
  return useCallback(
    (section: string, action: string, schoolId?: string, metadata?: Record<string, unknown>) => {
      const tracker = getTracker()
      tracker.track({ section, action, schoolId, metadata })
    },
    []
  )
}

export function useTrackDuration(section: string, schoolId?: string) {
  const startTime = useRef(Date.now())

  useEffect(() => {
    startTime.current = Date.now()

    return () => {
      const duration = Date.now() - startTime.current
      if (duration > 1000) {
        // Only track if > 1 second
        const tracker = getTracker()
        tracker.track({
          section,
          action: 'duration',
          schoolId,
          duration,
        })
      }
    }
  }, [section, schoolId])
}
