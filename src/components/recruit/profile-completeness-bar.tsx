'use client'

import { getCompletenessMessage } from '@/lib/validations'

interface ProfileCompletenessBarProps {
  percentage: number
  colorPrimary?: string
}

export function ProfileCompletenessBar({ percentage, colorPrimary = '#10B981' }: ProfileCompletenessBarProps) {
  const message = getCompletenessMessage(percentage)

  return (
    <div className="space-y-2">
      <div className="flex items-center justify-between">
        <p className="text-xs text-muted-foreground">{message}</p>
        <span className="text-scoreboard text-sm font-bold" style={{ color: percentage >= 100 ? colorPrimary : undefined }}>
          {percentage}%
        </span>
      </div>
      <div className="h-2 w-full overflow-hidden rounded-full bg-white/[0.06]">
        <div
          className="h-full rounded-full transition-all duration-500"
          style={{
            width: `${percentage}%`,
            backgroundColor: colorPrimary,
          }}
        />
      </div>
    </div>
  )
}
