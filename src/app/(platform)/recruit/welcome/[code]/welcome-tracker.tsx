'use client'

import { useEffect } from 'react'
import { useTrackEvent } from '@/hooks/use-analytics'

export function WelcomeTracker({ inviteCode, schoolId }: { inviteCode: string; schoolId: string }) {
  const trackEvent = useTrackEvent()

  useEffect(() => {
    trackEvent('welcome', 'view_welcome', schoolId, { inviteCode })
  }, [trackEvent, inviteCode, schoolId])

  return null
}
