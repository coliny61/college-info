'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Home,
  Search,
  Heart,
  User,
  BarChart3,
  Building,
  Menu,
  GraduationCap,
} from 'lucide-react'

interface NavItem {
  label: string
  href: string
  icon: React.ComponentType<{ className?: string }>
}

const RECRUIT_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/recruit', icon: Home },
  { label: 'Schools', href: '/recruit/schools', icon: Search },
  { label: 'Favorites', href: '/recruit/favorites', icon: Heart },
  { label: 'Profile', href: '/recruit/profile', icon: User },
]

const ADMIN_NAV: NavItem[] = [
  { label: 'Dashboard', href: '/admin', icon: Home },
  { label: 'Program', href: '/admin/program', icon: Building },
  { label: 'Analytics', href: '/admin/analytics', icon: BarChart3 },
]

function getNavItems(pathname: string): NavItem[] {
  if (pathname.startsWith('/admin')) return ADMIN_NAV
  return RECRUIT_NAV
}

function getRoleLabel(pathname: string): string {
  if (pathname.startsWith('/admin')) return 'Coach Admin'
  return 'Recruit'
}

function SidebarContent({
  navItems,
  roleLabel,
  pathname,
  onNavigate,
}: {
  navItems: NavItem[]
  roleLabel: string
  pathname: string
  onNavigate?: () => void
}) {
  return (
    <>
      {/* Logo + Brand */}
      <div className="flex h-16 items-center gap-2.5 border-b border-white/[0.06] px-6">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald">
          <GraduationCap className="h-4 w-4 text-white" />
        </div>
        <Link
          href="/"
          className="font-display text-lg font-bold uppercase tracking-wider text-foreground"
          onClick={onNavigate}
        >
          OVV
        </Link>
      </div>

      {/* Role badge */}
      <div className="px-4 py-3">
        <span className="inline-flex items-center gap-1.5 rounded-sm bg-emerald/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-emerald">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald" />
          {roleLabel}
        </span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-0.5 px-3 py-2">
        {navItems.map((item) => {
          const isActive =
            pathname === item.href ||
            (item.href !== '/recruit' &&
              item.href !== '/admin' &&
              pathname.startsWith(item.href))
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onNavigate}
              className={`relative flex items-center gap-3 rounded-lg px-3 py-2.5 font-display text-xs uppercase tracking-[0.1em] transition-all duration-150 ${
                isActive
                  ? 'glass-panel text-emerald'
                  : 'text-muted-foreground hover:bg-white/[0.03] hover:text-foreground'
              }`}
            >
              {isActive && (
                <span className="absolute left-0 top-1/2 h-5 w-1 -translate-y-1/2 rounded-r-full bg-emerald" />
              )}
              <item.icon className="h-4 w-4 shrink-0" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      {/* Bottom branding */}
      <div className="border-t border-white/[0.06] px-4 py-3">
        <p className="font-display text-[9px] uppercase tracking-[0.2em] text-muted-foreground/40">
          Official Virtual Visit
        </p>
      </div>
    </>
  )
}

export function PlatformSidebar() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)
  const navItems = getNavItems(pathname)
  const roleLabel = getRoleLabel(pathname)

  return (
    <>
      {/* Desktop sidebar */}
      <aside className="fixed left-0 top-0 z-40 hidden h-screen w-64 flex-col border-r border-white/[0.06] bg-background lg:flex">
        <SidebarContent
          navItems={navItems}
          roleLabel={roleLabel}
          pathname={pathname}
        />
      </aside>

      {/* Mobile hamburger */}
      <div className="fixed left-4 top-4 z-50 lg:hidden">
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon" className="shadow-lg glass-panel">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <SidebarContent
              navItems={navItems}
              roleLabel={roleLabel}
              pathname={pathname}
              onNavigate={() => setOpen(false)}
            />
          </SheetContent>
        </Sheet>
      </div>
    </>
  )
}
