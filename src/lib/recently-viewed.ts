const STORAGE_KEY = 'ovv_recently_viewed'
const MAX_ITEMS = 8

export interface RecentSchool {
  id: string
  slug: string
  name: string
  shortName: string
  mascot: string
  conference: string
  city: string
  state: string
  colorPrimary: string
  colorSecondary: string
  logoUrl?: string | null
  viewedAt: number
}

export function getRecentlyViewed(): RecentSchool[] {
  if (typeof window === 'undefined') return []
  try {
    const data = localStorage.getItem(STORAGE_KEY)
    if (!data) return []
    return JSON.parse(data) as RecentSchool[]
  } catch {
    return []
  }
}

export function addRecentlyViewed(school: Omit<RecentSchool, 'viewedAt'>) {
  if (typeof window === 'undefined') return
  try {
    const existing = getRecentlyViewed().filter((s) => s.id !== school.id)
    const updated: RecentSchool[] = [
      { ...school, viewedAt: Date.now() },
      ...existing,
    ].slice(0, MAX_ITEMS)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated))
  } catch {
    // localStorage unavailable
  }
}
