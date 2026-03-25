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

/**
 * Track section visibility using Intersection Observer.
 * Sends heartbeat pings every 10s while the section is in view.
 */
export function useTrackSection(sectionId: string, schoolId?: string) {
  const isVisible = useRef(false)
  const heartbeatTimer = useRef<ReturnType<typeof setInterval> | null>(null)
  const viewStart = useRef(0)

  useEffect(() => {
    const el = document.getElementById(sectionId)
    if (!el) return

    const tracker = getTracker()

    const startHeartbeat = () => {
      if (heartbeatTimer.current) return
      viewStart.current = Date.now()
      heartbeatTimer.current = setInterval(() => {
        const duration = Date.now() - viewStart.current
        tracker.track({
          section: sectionId,
          action: 'heartbeat',
          schoolId,
          duration,
        })
      }, 10_000)
    }

    const stopHeartbeat = () => {
      if (heartbeatTimer.current) {
        clearInterval(heartbeatTimer.current)
        heartbeatTimer.current = null
      }
      if (viewStart.current > 0) {
        const duration = Date.now() - viewStart.current
        if (duration > 1000) {
          tracker.track({
            section: sectionId,
            action: 'view_section',
            schoolId,
            duration,
          })
        }
        viewStart.current = 0
      }
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !isVisible.current) {
          isVisible.current = true
          startHeartbeat()
        } else if (!entry.isIntersecting && isVisible.current) {
          isVisible.current = false
          stopHeartbeat()
        }
      },
      { threshold: 0.3 }
    )

    observer.observe(el)

    return () => {
      observer.disconnect()
      stopHeartbeat()
    }
  }, [sectionId, schoolId])
}

/**
 * Track video play time.
 */
export function useTrackVideo(
  section: string,
  schoolId?: string,
  metadata?: Record<string, unknown>
) {
  const videoRef = useRef<HTMLVideoElement | null>(null)
  const playStart = useRef(0)
  const totalWatch = useRef(0)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const tracker = getTracker()

    const onPlay = () => { playStart.current = Date.now() }
    const onPause = () => {
      if (playStart.current > 0) {
        totalWatch.current += Date.now() - playStart.current
        playStart.current = 0
      }
    }
    const onEnded = () => {
      onPause()
      tracker.track({
        section,
        action: 'video_complete',
        schoolId,
        duration: totalWatch.current,
        metadata,
      })
    }

    video.addEventListener('play', onPlay)
    video.addEventListener('pause', onPause)
    video.addEventListener('ended', onEnded)

    return () => {
      video.removeEventListener('play', onPlay)
      video.removeEventListener('pause', onPause)
      video.removeEventListener('ended', onEnded)

      // Track accumulated watch time on unmount
      if (totalWatch.current > 1000 || playStart.current > 0) {
        if (playStart.current > 0) {
          totalWatch.current += Date.now() - playStart.current
        }
        tracker.track({
          section,
          action: 'video_duration',
          schoolId,
          duration: totalWatch.current,
          metadata,
        })
      }
    }
  }, [section, schoolId, metadata])

  return videoRef
}
