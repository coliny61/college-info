import { SchoolCard } from '@/components/school/school-card'
import { Sparkles } from 'lucide-react'

interface RecommendedSchool {
  id: string
  slug: string
  name: string
  shortName: string
  mascot: string
  conference: string
  city: string
  state: string
  colorPrimary: string
  colorSecondary: string
}

export function Recommendations({ schools }: { schools: RecommendedSchool[] }) {
  if (schools.length === 0) return null

  return (
    <div className="mb-10 animate-in-up delay-3">
      <div className="mb-4 flex items-center gap-2">
        <Sparkles className="h-4 w-4 text-emerald" />
        <h2 className="text-display text-sm tracking-[0.15em] text-muted-foreground">
          Recommended For You
        </h2>
      </div>
      <div className="flex gap-4 overflow-x-auto pb-2 sm:grid sm:grid-cols-2 sm:overflow-visible lg:grid-cols-4">
        {schools.map((school) => (
          <div key={school.id} className="min-w-[260px] sm:min-w-0">
            <SchoolCard
              {...school}
              isFavorited={false}
              showFavorite
            />
          </div>
        ))}
      </div>
    </div>
  )
}
