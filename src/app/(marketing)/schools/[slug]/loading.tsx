import { Skeleton } from '@/components/ui/skeleton'

export default function PublicSchoolLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Nav placeholder */}
      <div className="h-16 border-b border-white/[0.06]" />

      <div className="mx-auto max-w-6xl px-6 pt-24 pb-16 sm:px-8">
        {/* Banner */}
        <Skeleton className="mb-6 h-14 w-full rounded-xl" />

        {/* School header */}
        <Skeleton className="h-64 w-full rounded-2xl" />

        {/* Tabs */}
        <div className="mt-6 flex gap-4 border-b border-border pb-3">
          {Array.from({ length: 7 }).map((_, i) => (
            <Skeleton key={i} className="h-4 w-16" />
          ))}
        </div>

        {/* Content */}
        <div className="mt-8 space-y-6">
          <Skeleton className="h-24 w-full rounded-xl" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Skeleton className="h-32 rounded-xl" />
            <Skeleton className="h-32 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  )
}
