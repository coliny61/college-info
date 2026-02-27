'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

type Role = 'recruit' | 'parent' | 'coach_admin'

const ROLE_OPTIONS: { role: Role; label: string; desc: string }[] = [
  {
    role: 'recruit',
    label: 'Recruit',
    desc: 'I am a prospective student-athlete exploring schools.',
  },
  {
    role: 'parent',
    label: 'Parent',
    desc: 'I am supporting my child through the recruiting process.',
  },
  {
    role: 'coach_admin',
    label: 'Coach / Admin',
    desc: 'I manage a school profile and recruiting content.',
  },
]

const ROLE_ROUTES: Record<Role, string> = {
  recruit: '/recruit',
  parent: '/parent',
  coach_admin: '/admin',
}

export default function RegisterPage() {
  const router = useRouter()
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [selectedRole, setSelectedRole] = useState<Role>('recruit')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (password !== confirmPassword) {
      setError('Passwords do not match.')
      return
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters.')
      return
    }

    setLoading(true)
    const supabase = createClient()

    const { error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: {
        data: {
          display_name: displayName,
          role: selectedRole,
        },
      },
    })

    if (signUpError) {
      setError(signUpError.message)
      setLoading(false)
      return
    }

    // Create Prisma user record
    try {
      await fetch('/api/auth/sync-user', { method: 'POST' })
    } catch {
      // Non-blocking — middleware will pick up on next request
    }

    router.push(ROLE_ROUTES[selectedRole])
    router.refresh()
  }

  return (
    <div className="rounded-xl border border-border bg-card p-8">
      <h1 className="text-2xl font-bold text-foreground">Create Account</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        Join College Info to start exploring.
      </p>

      {error && (
        <div className="mt-4 rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <form onSubmit={handleRegister} className="mt-6 space-y-4">
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Display Name
          </label>
          <Input
            placeholder="Your name"
            value={displayName}
            onChange={(e) => setDisplayName(e.target.value)}
            required
          />
        </div>
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
            placeholder="At least 6 characters"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-foreground">
            Confirm Password
          </label>
          <Input
            type="password"
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>

        {/* Role Selector */}
        <div>
          <label className="mb-3 block text-sm font-medium text-foreground">
            I am a...
          </label>
          <div className="space-y-2">
            {ROLE_OPTIONS.map((option) => {
              const isSelected = selectedRole === option.role
              return (
                <button
                  type="button"
                  key={option.role}
                  onClick={() => setSelectedRole(option.role)}
                  className={`flex w-full items-center rounded-lg border p-4 text-left transition-colors ${
                    isSelected
                      ? 'border-emerald bg-emerald/5'
                      : 'border-border hover:border-muted-foreground/30'
                  }`}
                >
                  <div className="flex-1">
                    <p
                      className={`font-semibold ${
                        isSelected ? 'text-emerald' : 'text-foreground'
                      }`}
                    >
                      {option.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {option.desc}
                    </p>
                  </div>
                  <div
                    className={`flex h-5 w-5 items-center justify-center rounded-full border-2 ${
                      isSelected ? 'border-emerald' : 'border-muted-foreground/40'
                    }`}
                  >
                    {isSelected && (
                      <div className="h-2.5 w-2.5 rounded-full bg-emerald" />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full bg-emerald hover:bg-emerald-dark text-white"
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <p className="mt-6 text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-emerald hover:underline font-medium">
          Log In
        </Link>
      </p>
    </div>
  )
}
