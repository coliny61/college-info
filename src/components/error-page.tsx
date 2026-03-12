'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { AlertTriangle } from 'lucide-react'

interface ErrorPageProps {
  error: Error & { digest?: string }
  reset: () => void
  title?: string
}

export function ErrorPage({ error, reset, title = 'Something went wrong' }: ErrorPageProps) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center text-center animate-in-up">
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-destructive/10">
        <AlertTriangle className="h-10 w-10 text-destructive" />
      </div>
      <h1 className="text-display text-3xl text-foreground">{title}</h1>
      <p className="mt-3 max-w-md text-sm text-muted-foreground">
        We hit an unexpected error. You can try again or head back to the dashboard.
      </p>
      <div className="mt-8 flex gap-3">
        <Button onClick={reset} variant="outline">
          Try Again
        </Button>
        <Button onClick={() => (window.location.href = '/')}>
          Go Home
        </Button>
      </div>
      {error.digest && (
        <p className="mt-6 text-xs text-muted-foreground/50">
          Error ID: {error.digest}
        </p>
      )}
    </div>
  )
}
