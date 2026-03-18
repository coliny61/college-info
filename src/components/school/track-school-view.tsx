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
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only re-run when school changes, not on every render
  }, [school.id])

  return null
}
