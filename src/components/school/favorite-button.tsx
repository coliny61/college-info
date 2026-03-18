'use client'

import { useState, useTransition } from 'react'
import { Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { toggleFavorite } from '@/app/(platform)/recruit/actions'
import { toast } from 'sonner'

interface FavoriteButtonProps {
  schoolId: string
  initialFavorited: boolean
}

export function FavoriteButton({
  schoolId,
  initialFavorited,
}: FavoriteButtonProps) {
  const [isFavorited, setIsFavorited] = useState(initialFavorited)
  const [isPending, startTransition] = useTransition()

  const handleToggle = () => {
    // Optimistic update
    setIsFavorited(!isFavorited)

    startTransition(async () => {
      try {
        await toggleFavorite(schoolId)
        toast.success(!isFavorited ? 'Added to favorites' : 'Removed from favorites')
      } catch {
        setIsFavorited(isFavorited)
        toast.error('Failed to update favorite')
      }
    })
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      className="h-8 w-8 shrink-0"
      onClick={handleToggle}
      disabled={isPending}
    >
      <Heart
        className={`h-4 w-4 transition-colors ${
          isFavorited
            ? 'fill-red-500 text-red-500'
            : 'text-muted-foreground hover:text-red-400'
        }`}
      />
    </Button>
  )
}
