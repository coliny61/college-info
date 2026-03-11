import { Skeleton } from '@/components/ui/skeleton'

export default function AnalyticsLoading() {
  return (
    <div className="mx-auto max-w-6xl space-y-8">
      {/* Stat strip */}
      <Skeleton className="h-24 w-full rounded-xl" />

      {/* Chart */}
      <Skeleton className="h-80 w-full rounded-xl" />

      {/* Two-col charts */}
      <div className="grid gap-6 lg:grid-cols-2">
        <Skeleton className="h-64 rounded-xl" />
        <Skeleton className="h-64 rounded-xl" />
      </div>

      {/* Table */}
      <Skeleton className="h-48 w-full rounded-xl" />
    </div>
  )
}
