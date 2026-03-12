import { Skeleton } from '@/components/ui/skeleton'

export default function ProgramLoading() {
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-5 w-72" />
      </div>
      {/* Tabs bar */}
      <Skeleton className="h-10 w-full max-w-md rounded-lg" />
      {/* Content area */}
      <Skeleton className="h-[500px] rounded-xl" />
    </div>
  )
}
