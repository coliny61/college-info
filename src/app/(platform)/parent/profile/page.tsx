import { createClient } from '@/lib/supabase/server'

export default async function ParentProfilePage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  return (
    <div className="mx-auto max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground">Profile</h1>
        <p className="mt-2 text-muted-foreground">
          Manage your parent account settings.
        </p>
      </div>

      <div className="space-y-4 rounded-lg border border-border p-6">
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Display Name
          </label>
          <p className="text-foreground">
            {user?.user_metadata?.display_name ?? user?.email?.split('@')[0]}
          </p>
        </div>
        <div>
          <label className="text-sm font-medium text-muted-foreground">
            Email
          </label>
          <p className="text-foreground">{user?.email}</p>
        </div>
      </div>
    </div>
  )
}
