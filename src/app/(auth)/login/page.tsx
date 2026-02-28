'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Play } from 'lucide-react'

const ROLE_ROUTES: Record<string, string> = {
  recruit: '/recruit',
  parent: '/parent',
  coach_admin: '/admin',
  super_admin: '/super-admin',
}

const DEMO_ACCOUNTS = [
  { label: 'Recruit', email: 'recruit@test.com', password: 'test1234', role: 'recruit' },
  { label: 'Coach', email: 'coach@test.com', password: 'test1234', role: 'coach_admin' },
  { label: 'Parent', email: 'parent@test.com', password: 'test1234', role: 'parent' },
  { label: 'Admin', email: 'super@test.com', password: 'test1234', role: 'super_admin' },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [demoLoading, setDemoLoading] = useState<string | null>(null)

  const handleLogin = async (loginEmail: string, loginPassword: string, role?: string) => {
    setError(null)
    setLoading(true)

    const supabase = createClient()
    const { data, error: signInError } = await supabase.auth.signInWithPassword({
      email: loginEmail,
      password: loginPassword,
    })

    if (signInError) {
      setError(signInError.message)
      setLoading(false)
      setDemoLoading(null)
      return
    }

    try {
      await fetch('/api/auth/sync-user', { method: 'POST' })
    } catch {}

    const userRole = role ?? data.user?.user_metadata?.role ?? 'recruit'
    const route = ROLE_ROUTES[userRole] ?? '/recruit'

    router.push(route)
    router.refresh()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    await handleLogin(email, password)
  }

  const handleDemo = async (account: typeof DEMO_ACCOUNTS[0]) => {
    setDemoLoading(account.role)
    setLoading(true)
    await handleLogin(account.email, account.password, account.role)
  }

  return (
    <div className="space-y-4">
      {/* Demo buttons */}
      <div className="rounded-xl border border-emerald/30 bg-emerald/5 p-6">
        <div className="mb-4 flex items-center gap-2">
          <Play className="h-4 w-4 text-emerald" />
          <p className="text-sm font-semibold text-emerald">Try a demo</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {DEMO_ACCOUNTS.map((account) => (
            <Button
              key={account.role}
              variant="outline"
              size="sm"
              className="border-emerald/30 hover:bg-emerald/10 hover:border-emerald"
              disabled={loading}
              onClick={() => handleDemo(account)}
            >
              {demoLoading === account.role ? 'Loading...' : account.label}
            </Button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-border" />
        </div>
        <div className="relative flex justify-center text-xs">
          <span className="bg-background px-3 text-muted-foreground">or log in with email</span>
        </div>
      </div>

      {/* Login form */}
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

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
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
            {loading && !demoLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <p className="mt-6 text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-emerald hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
