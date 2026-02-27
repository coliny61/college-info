import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

  if (!supabaseUrl || !supabaseKey) {
    // Return a mock client for development without Supabase
    return {
      auth: {
        getUser: async () => ({ data: { user: null }, error: null }),
        signUp: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
        signInWithPassword: async () => ({ data: { user: null }, error: { message: 'Supabase not configured' } }),
        signOut: async () => ({ error: null }),
      },
    } as any
  }

  return createBrowserClient(supabaseUrl, supabaseKey)
}
