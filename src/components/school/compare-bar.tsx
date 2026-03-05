'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useCompare } from './compare-context'
import { X, GitCompareArrows } from 'lucide-react'

export function CompareBar() {
  const { selected, toggle, clear } = useCompare()

  if (selected.length < 1) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-card/95 backdrop-blur-sm animate-in-up lg:left-64">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-6 py-3">
        <div className="flex items-center gap-3">
          <span className="text-sm font-medium text-muted-foreground">
            Compare ({selected.length}/3):
          </span>
          <div className="flex gap-2">
            {selected.map((slug) => (
              <span
                key={slug}
                className="inline-flex items-center gap-1 rounded-full bg-emerald/10 px-3 py-1 text-xs font-medium text-emerald"
              >
                {slug}
                <button onClick={() => toggle(slug)} className="hover:text-white">
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={clear}>
            Clear
          </Button>
          {selected.length >= 2 && (
            <Link href={`/recruit/compare?schools=${selected.join(',')}`}>
              <Button size="sm" className="gap-2">
                <GitCompareArrows className="h-4 w-4" />
                Compare
              </Button>
            </Link>
          )}
        </div>
      </div>
    </div>
  )
}
