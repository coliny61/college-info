'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function SchoolError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error('School page error:', error)
  }, [error])

  return (
    <div className="mx-auto flex max-w-md flex-col items-center justify-center py-32 text-center">
      <h2 className="font-display text-lg font-semibold uppercase tracking-wide">
        Something went wrong
      </h2>
      <p className="mt-2 text-sm text-muted-foreground">
        We couldn&apos;t load this school page. Please try again.
      </p>
      <Button onClick={reset} className="mt-6" variant="outline">
        Try Again
      </Button>
    </div>
  )
}
