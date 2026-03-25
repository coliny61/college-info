'use client'

import { useEffect, useState } from 'react'
import { Map, Trophy, GraduationCap, DollarSign, Users, Award, Shirt, Play } from 'lucide-react'

const SECTIONS = [
  { id: 'tour', label: 'Tour', icon: Map },
  { id: 'football', label: 'Football', icon: Trophy },
  { id: 'academics', label: 'Academics', icon: GraduationCap },
  { id: 'nil', label: 'NIL', icon: DollarSign },
  { id: 'roster', label: 'Roster', icon: Users },
  { id: 'alumni', label: 'Alumni', icon: Award },
  { id: 'jersey', label: 'Jersey', icon: Shirt },
  { id: 'video', label: 'Video', icon: Play },
]

export function SectionNavigator() {
  const [activeSection, setActiveSection] = useState('tour')

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveSection(id)
          }
        },
        { rootMargin: '-20% 0px -60% 0px' }
      )
      observer.observe(el)
      observers.push(observer)
    })

    return () => observers.forEach((o) => o.disconnect())
  }, [])

  const scrollTo = (id: string) => {
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <>
      {/* Desktop — fixed right sidebar */}
      <nav className="fixed right-6 top-1/2 z-30 hidden -translate-y-1/2 xl:flex flex-col gap-1">
        {SECTIONS.map(({ id, label, icon: Icon }) => {
          const isActive = activeSection === id
          return (
            <button
              key={id}
              onClick={() => scrollTo(id)}
              aria-label={`Navigate to ${label} section`}
              className={`group flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs transition-all duration-200 ${
                isActive
                  ? 'glass-panel text-[var(--school-primary)]'
                  : 'text-muted-foreground/50 hover:text-muted-foreground'
              }`}
            >
              <Icon className="h-3.5 w-3.5 shrink-0" />
              <span
                className={`font-display uppercase tracking-[0.1em] transition-all duration-200 ${
                  isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'
                }`}
              >
                {label}
              </span>
              {isActive && (
                <span
                  className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full"
                  style={{ backgroundColor: 'var(--school-primary)' }}
                />
              )}
            </button>
          )
        })}
      </nav>

      {/* Mobile — fixed bottom bar */}
      <nav className="fixed bottom-0 left-0 right-0 z-30 border-t border-border bg-background/90 backdrop-blur-xl xl:hidden">
        <div className="flex items-center justify-between px-2 py-1.5 overflow-x-auto gap-0.5">
          {SECTIONS.map(({ id, label, icon: Icon }) => {
            const isActive = activeSection === id
            return (
              <button
                key={id}
                onClick={() => scrollTo(id)}
                aria-label={`Navigate to ${label} section`}
                className={`flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 min-w-[48px] transition-colors ${
                  isActive
                    ? 'text-[var(--school-primary)]'
                    : 'text-muted-foreground/50'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span className="text-[8px] font-medium uppercase tracking-wider">
                  {label}
                </span>
              </button>
            )
          })}
        </div>
      </nav>
    </>
  )
}
