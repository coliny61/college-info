'use client'

import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useCallback, useState, useTransition } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Search, SlidersHorizontal, X } from 'lucide-react'

const CONFERENCES = ['All', 'SEC', 'Big Ten', 'Big 12', 'ACC', 'Pac-12']
const SORT_OPTIONS = [
  { value: 'name-asc', label: 'A → Z' },
  { value: 'name-desc', label: 'Z → A' },
  { value: 'conference', label: 'Conference' },
]

const STATES = ['All', 'CA', 'OK', 'TX'] // States from seeded data
const SPORTS = ['All', 'Football', 'Basketball', 'Baseball', 'Soccer']
const TUITION_OPTIONS = [
  { value: 'All', label: 'Any Tuition' },
  { value: 'under-15k', label: 'Under $15k' },
  { value: '15k-30k', label: '$15k - $30k' },
  { value: '30k-50k', label: '$30k - $50k' },
  { value: 'over-50k', label: 'Over $50k' },
]
const ENROLLMENT_OPTIONS = [
  { value: 'All', label: 'Any Size' },
  { value: 'small', label: 'Small (<5k)' },
  { value: 'medium', label: 'Medium (5-15k)' },
  { value: 'large', label: 'Large (15k+)' },
]

export function SchoolFilters() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const [, startTransition] = useTransition()
  const [showMore, setShowMore] = useState(false)

  const search = searchParams.get('q') ?? ''
  const conference = searchParams.get('conference') ?? 'All'
  const sort = searchParams.get('sort') ?? 'name-asc'
  const stateFilter = searchParams.get('state') ?? 'All'
  const sport = searchParams.get('sport') ?? 'All'
  const tuition = searchParams.get('tuition') ?? 'All'
  const enrollment = searchParams.get('enrollment') ?? 'All'

  const hasAdvancedFilters =
    stateFilter !== 'All' || sport !== 'All' || tuition !== 'All' || enrollment !== 'All'

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

  const clearAdvanced = () => {
    const params = new URLSearchParams(searchParams.toString())
    params.delete('state')
    params.delete('sport')
    params.delete('tuition')
    params.delete('enrollment')
    startTransition(() => {
      router.push(`${pathname}?${params.toString()}`, { scroll: false })
    })
    setShowMore(false)
  }

  return (
    <div className="space-y-3">
      {/* Row 1: Search + Conference + Sort */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
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

        <Select value={conference} onValueChange={(v) => updateParams('conference', v)}>
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

        <Button
          variant={showMore || hasAdvancedFilters ? 'default' : 'outline'}
          size="sm"
          onClick={() => setShowMore(!showMore)}
          className="gap-2 shrink-0"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filters
          {hasAdvancedFilters && (
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-white/20 text-xs font-bold">
              {[stateFilter, sport, tuition, enrollment].filter((v) => v !== 'All').length}
            </span>
          )}
        </Button>
      </div>

      {/* Row 2: Advanced Filters (collapsible) */}
      {showMore && (
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center animate-in-up rounded-lg border border-border bg-card/50 p-3">
          <Select value={stateFilter} onValueChange={(v) => updateParams('state', v)}>
            <SelectTrigger className="w-full sm:w-32">
              <SelectValue placeholder="State" />
            </SelectTrigger>
            <SelectContent>
              {STATES.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === 'All' ? 'All States' : s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={sport} onValueChange={(v) => updateParams('sport', v)}>
            <SelectTrigger className="w-full sm:w-36">
              <SelectValue placeholder="Sport" />
            </SelectTrigger>
            <SelectContent>
              {SPORTS.map((s) => (
                <SelectItem key={s} value={s}>
                  {s === 'All' ? 'All Sports' : s}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={tuition} onValueChange={(v) => updateParams('tuition', v)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Tuition" />
            </SelectTrigger>
            <SelectContent>
              {TUITION_OPTIONS.map((t) => (
                <SelectItem key={t.value} value={t.value}>{t.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={enrollment} onValueChange={(v) => updateParams('enrollment', v)}>
            <SelectTrigger className="w-full sm:w-40">
              <SelectValue placeholder="Size" />
            </SelectTrigger>
            <SelectContent>
              {ENROLLMENT_OPTIONS.map((e) => (
                <SelectItem key={e.value} value={e.value}>{e.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>

          {hasAdvancedFilters && (
            <Button variant="ghost" size="sm" onClick={clearAdvanced} className="gap-1 text-muted-foreground shrink-0">
              <X className="h-3 w-3" /> Clear
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
