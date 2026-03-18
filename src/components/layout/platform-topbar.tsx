'use client'

import { useRouter } from 'next/navigation'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { LogOut } from 'lucide-react'

interface PlatformTopbarProps {
  userEmail?: string
  displayName?: string
}

export function PlatformTopbar({ userEmail, displayName }: PlatformTopbarProps) {
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push('/login')
    router.refresh()
  }

  const initials = displayName
    ? displayName
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : userEmail?.[0]?.toUpperCase() ?? '?'

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-background/80 backdrop-blur-xl pl-16 pr-6 lg:pl-64 lg:pr-6">
      <div />
      <div className="flex items-center gap-4">
        <div className="text-right hidden sm:block">
          <p className="text-sm font-medium text-foreground">
            {displayName ?? 'User'}
          </p>
          <p className="text-[11px] text-muted-foreground">{userEmail}</p>
        </div>
        <Avatar className="h-9 w-9 ring-2 ring-emerald/20">
          <AvatarFallback className="bg-emerald/10 text-emerald text-xs font-semibold">
            {initials}
          </AvatarFallback>
        </Avatar>
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLogout}
          className="text-muted-foreground hover:text-destructive"
        >
          <LogOut className="h-4 w-4" />
        </Button>
      </div>
    </header>
  )
}
