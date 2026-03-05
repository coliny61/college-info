'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'

interface CompareContextType {
  selected: string[]
  toggle: (slug: string) => void
  clear: () => void
  isSelected: (slug: string) => boolean
  isFull: boolean
}

const CompareContext = createContext<CompareContextType>({
  selected: [],
  toggle: () => {},
  clear: () => {},
  isSelected: () => false,
  isFull: false,
})

export function CompareProvider({ children }: { children: ReactNode }) {
  const [selected, setSelected] = useState<string[]>([])

  const toggle = (slug: string) => {
    setSelected((prev) =>
      prev.includes(slug)
        ? prev.filter((s) => s !== slug)
        : prev.length < 3
          ? [...prev, slug]
          : prev
    )
  }

  const clear = () => setSelected([])
  const isSelected = (slug: string) => selected.includes(slug)
  const isFull = selected.length >= 3

  return (
    <CompareContext.Provider value={{ selected, toggle, clear, isSelected, isFull }}>
      {children}
    </CompareContext.Provider>
  )
}

export function useCompare() {
  return useContext(CompareContext)
}
