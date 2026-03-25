'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { Sun, Moon, Monitor } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])
  if (!mounted) return <Button variant="ghost" size="icon" className="h-8 w-8" disabled><Monitor className="h-4 w-4" /></Button>

  const next = theme === 'dark' ? 'light' : theme === 'light' ? 'system' : 'dark'
  const Icon = theme === 'dark' ? Moon : theme === 'light' ? Sun : Monitor

  return (
    <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setTheme(next)} aria-label={`Switch to ${next} theme`}>
      <Icon className="h-4 w-4" />
    </Button>
  )
}
