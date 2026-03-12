'use client'

import { useEffect } from 'react'
import { addRecentlyViewed, type RecentSchool } from '@/lib/recently-viewed'

export function TrackSchoolView({
  school,
}: {
  school: Omit<RecentSchool, 'viewedAt'>
}) {
  useEffect(() => {
    addRecentlyViewed(school)
  }, [school])

  return null
}
