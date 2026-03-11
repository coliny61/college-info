import { Skeleton } from '@/components/ui/skeleton'

export default function SchoolDetailLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-6">
      {/* Breadcrumb */}
      <Skeleton className="h-5 w-48" />

      {/* School header */}
      <Skeleton className="h-64 w-full rounded-2xl" />

      {/* Tab bar */}
      <div className="flex gap-4 border-b border-border pb-3">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-16" />
        ))}
      </div>

      {/* Tab content */}
      <div className="space-y-6">
        <Skeleton className="h-24 w-full rounded-xl" />
        <div className="grid gap-4 sm:grid-cols-2">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </div>
    </div>
  )
}
