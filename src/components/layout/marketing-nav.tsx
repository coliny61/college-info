import Link from 'next/link'
import { GraduationCap } from 'lucide-react'
import { Button } from '@/components/ui/button'

export function MarketingNav() {
  return (
    <nav className="fixed top-0 z-50 w-full border-b border-white/[0.06] bg-background/80 backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald">
            <GraduationCap className="h-4 w-4 text-white" />
          </div>
          <span className="text-display text-lg tracking-normal text-foreground">
            OVV
          </span>
        </Link>
        <div className="flex items-center gap-3">
          <Link href="/login">
            <Button variant="ghost" size="sm" className="text-xs uppercase tracking-wider">
              Log In
            </Button>
          </Link>
          <Link href="/register">
            <Button size="sm" className="text-xs uppercase tracking-wider">Get Started</Button>
          </Link>
        </div>
      </div>
    </nav>
  )
}
