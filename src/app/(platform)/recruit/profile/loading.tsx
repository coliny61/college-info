import { Skeleton } from '@/components/ui/skeleton'

export default function ProfileLoading() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="space-y-2">
        <Skeleton className="h-8 w-32" />
        <Skeleton className="h-5 w-64" />
      </div>
      {/* Account card */}
      <Skeleton className="h-48 rounded-xl" />
      {/* Athletic profile card */}
      <Skeleton className="h-96 rounded-xl" />
      {/* Notifications card */}
      <Skeleton className="h-64 rounded-xl" />
    </div>
  )
}
