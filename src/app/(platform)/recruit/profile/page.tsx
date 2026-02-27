import { createClient } from '@/lib/supabase/server'
import { ProfileForm } from './profile-form'

export default async function ProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return null

  const displayName =
    user.user_metadata?.display_name ?? user.email?.split('@')[0] ?? ''

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your account settings.
        </p>
      </div>

      <ProfileForm
        displayName={displayName}
        email={user.email ?? ''}
        role={user.user_metadata?.role ?? 'recruit'}
      />
    </div>
  )
}
