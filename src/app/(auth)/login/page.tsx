'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Play, Eye, EyeOff, GraduationCap, UserCheck } from 'lucide-react'

const ROLE_ROUTES: Record<string, string> = {
  recruit: '/recruit',
  coach_admin: '/admin',
}

const DEMO_ACCOUNTS = [
  { label: 'Recruit', email: 'recruit@test.com', password: 'test1234', role: 'recruit', icon: GraduationCap, desc: 'Browse schools', color: '#10B981' },
  { label: 'Coach', email: 'coach@test.com', password: 'test1234', role: 'coach_admin', icon: UserCheck, desc: 'Manage program', color: '#3B82F6' },
]

export default function LoginPage() {
  const router = useRouter()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [demoLoading, setDemoLoading] = useState<string | null>(null)
  const [showPassword, setShowPassword] = useState(false)

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
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl text-foreground">Welcome Back</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Log in to your account to continue.
        </p>
      </div>

      {/* Demo accounts */}
      <div className="glass-panel rounded-xl p-5">
        <div className="mb-3 flex items-center gap-2">
          <Play className="h-3.5 w-3.5 text-emerald" />
          <p className="text-xs font-semibold uppercase tracking-wider text-emerald">Try a demo</p>
        </div>
        <div className="grid grid-cols-2 gap-2">
          {DEMO_ACCOUNTS.map((account) => (
            <button
              key={account.role}
              className="glass-panel flex flex-col items-start gap-1 rounded-lg px-4 py-3 text-left transition-all duration-200 hover:bg-white/[0.04]"
              style={{
                borderLeft: `3px solid ${account.color}`,
              }}
              disabled={loading}
              onClick={() => handleDemo(account)}
            >
              <span className="flex items-center gap-1.5 text-xs font-semibold text-foreground">
                <account.icon className="h-3 w-3" style={{ color: account.color }} />
                {demoLoading === account.role ? 'Loading...' : account.label}
              </span>
              <span className="text-[10px] text-muted-foreground">
                {account.desc}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="section-divider" />

      {/* Login form */}
      <div className="space-y-4">
        {error && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3">
            <p className="text-sm text-destructive">{error}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
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
            <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Password
            </label>
            <div className="relative">
              <Input
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
              </button>
            </div>
          </div>
          <Button
            type="submit"
            className="w-full bg-emerald hover:bg-emerald-dark text-white uppercase tracking-wider text-xs font-semibold"
            disabled={loading}
          >
            {loading && !demoLoading ? 'Logging in...' : 'Log In'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="text-emerald hover:underline font-medium">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  )
}
