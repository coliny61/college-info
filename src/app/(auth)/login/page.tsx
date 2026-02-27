'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

const ROLE_ROUTES: Record<string, string> = {
  recruit: '/recruit',
  parent: '/parent',
  coach_admin: '/admin',
  super_admin: '/super-admin',
}

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      return
    }

    // Ensure Prisma user exists
    try {
      await fetch('/api/auth/sync-user', { method: 'POST' })
    } catch {
      // Non-blocking
    }

    // Route based on role stored in user metadata
    const role = data.user?.user_metadata?.role ?? 'recruit'
    const route = ROLE_ROUTES[role] ?? '/recruit'

    router.push(route)
    router.refresh()
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <h1 className="text-2xl font-bold text-foreground">Welcome back</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Log in to your account to continue.
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <form onSubmit={handleLogin} className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Email
          </label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Password
          </label>
          <Input
            type="password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button
          type="submit"
          className="w-full bg-emerald hover:bg-emerald-dark text-white"
          disabled={loading}
        >
          {loading ? 'Logging in...' : 'Log In'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Don&apos;t have an account?{' '}
        <Link href="/register" className="text-emerald hover:underline font-medium">
          Sign Up
        </Link>
      </p>
    </div>
  )
}
