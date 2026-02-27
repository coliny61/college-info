import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'
import { PlatformSidebar } from '@/components/layout/platform-sidebar'
import { PlatformTopbar } from '@/components/layout/platform-topbar'

// All platform pages require auth + DB — never statically generate
export const dynamic = 'force-dynamic'

export default async function PlatformLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  // Only redirect if Supabase is actually configured
  const isSupabaseConfigured =
    process.env.NEXT_PUBLIC_SUPABASE_URL &&
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!user && isSupabaseConfigured) {
    redirect('/login')
  }

  const displayName =
    user?.user_metadata?.display_name ?? user?.email?.split('@')[0] ?? 'Demo User'

  return (
    <div className="min-h-screen bg-background">
      <PlatformSidebar />
      <div className="lg:pl-64">
        <PlatformTopbar
          userEmail={user?.email ?? 'demo@example.com'}
          displayName={displayName}
        />
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
