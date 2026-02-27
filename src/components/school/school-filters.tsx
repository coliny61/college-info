'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search } from 'lucide-react'

const CONFERENCES = ['All', 'SEC', 'Big Ten', 'Big 12', 'ACC', 'Pac-12']
const SORT_OPTIONS = [
  { value: 'name-asc', label: 'A → Z' },
  { value: 'name-desc', label: 'Z → A' },
  { value: 'conference', label: 'Conference' },
]

export function SchoolFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()

  const search = searchParams.get('q') ?? ''
  const conference = searchParams.get('conference') ?? 'All'
  const sort = searchParams.get('sort') ?? 'name-asc'

  const updateParams = useCallback(
    (key: string, value: string) => {
      const params = new URLSearchParams(searchParams.toString())
      if (value && value !== 'All' && value !== 'name-asc') {
        params.set(key, value)
      } else {
        params.delete(key)
      }
      startTransition(() => {
        router.push(`${pathname}?${params.toString()}`, { scroll: false })
      })
    },
    [router, pathname, searchParams]
  )

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search schools..."
          defaultValue={search}
          onChange={(e) => {
            const timer = setTimeout(() => {
              updateParams('q', e.target.value)
            }, 300)
            return () => clearTimeout(timer)
          }}
          className="pl-9"
        />
      </div>

      {/* Conference filter */}
      <Select
        value={conference}
        onValueChange={(v) => updateParams('conference', v)}
      >
        <SelectTrigger className="w-full sm:w-40">
          <SelectValue placeholder="Conference" />
        </SelectTrigger>
        <SelectContent>
          {CONFERENCES.map((c) => (
            <SelectItem key={c} value={c}>
              {c === 'All' ? 'All Conferences' : c}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {/* Sort */}
      <Select value={sort} onValueChange={(v) => updateParams('sort', v)}>
        <SelectTrigger className="w-full sm:w-36">
          <SelectValue placeholder="Sort" />
        </SelectTrigger>
        <SelectContent>
          {SORT_OPTIONS.map((opt) => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  )
}
