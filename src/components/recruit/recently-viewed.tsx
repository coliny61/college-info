'use client'

import { useEffect, useState } from 'react'
import { getRecentlyViewed, type RecentSchool } from '@/lib/recently-viewed'
import { SchoolCard } from '@/components/school/school-card'
import { Clock } from 'lucide-react'

export function RecentlyViewed() {
  const [schools, setSchools] = useState<RecentSchool[]>([])

  useEffect(() => {
    setSchools(getRecentlyViewed().slice(0, 4))
  }, [])

  if (schools.length === 0) return null

  return (
    <div className="mb-10 animate-in-up delay-2">
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h2 className="text-display text-sm tracking-[0.15em] text-muted-foreground">
          Recently Viewed
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
        {schools.map((school) => (
          <div key={school.id} className="min-w-[260px] sm:min-w-0">
            <SchoolCard
              id={school.id}
              slug={school.slug}
              name={school.name}
              shortName={school.shortName}
              mascot={school.mascot}
              conference={school.conference}
              city={school.city}
              state={school.state}
              colorPrimary={school.colorPrimary}
              colorSecondary={school.colorSecondary}
              logoUrl={school.logoUrl}
              isFavorited={false}
              showFavorite={false}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
