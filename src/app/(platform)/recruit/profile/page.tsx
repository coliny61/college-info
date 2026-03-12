import type { Metadata } from 'next'
import { createClient } from '@/lib/supabase/server'
import { prisma } from '@/lib/prisma'
import { ProfileForm } from './profile-form'

export const metadata: Metadata = { title: 'Profile' }

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const displayName =
    user.user_metadata?.display_name ?? user.email?.split('@')[0] ?? ''

  const [profile, notifPrefs] = await Promise.all([
    prisma.recruitProfile.findUnique({ where: { userId: user.id } }),
    prisma.notificationPreference.findUnique({ where: { userId: user.id } }),
  ])

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8 animate-in-up">
        <h1 className="text-3xl font-black tracking-tight text-foreground">Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account and athletic profile.
        </p>
      </div>

      <ProfileForm
        displayName={displayName}
        email={user.email ?? ''}
        role={user.user_metadata?.role ?? 'recruit'}
        profile={profile}
        notificationPreferences={notifPrefs}
      />
    </div>
  )
}
