import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export async function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  // Return a mock client if Supabase is not configured
  if (!supabaseUrl || !supabaseKey) {
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signUp: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
        signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
        signOut: async () => ({ error: null }),
        updateUser: async () => ({ data: { user: null }, error: null }),
        exchangeCodeForSession: async () => ({ error: { message: 'Supabase not configured' } }),
      },
    } as any
  }

  const cookieStore = await cookies()

  return createServerClient(
    supabaseUrl,
    supabaseKey,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll()
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options),
            )
          } catch {
            // setAll is called from a Server Component —
            // can be ignored if middleware refreshes the session.
          }
        },
      },
    },
  )
}
