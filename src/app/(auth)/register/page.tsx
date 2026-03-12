'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, GraduationCap, UserCheck } from 'lucide-react'
import { registerSchema } from '@/lib/validations'

type Role = 'recruit' | 'coach_admin'

const ROLE_OPTIONS: { role: Role; label: string; desc: string; icon: React.ComponentType<{ className?: string }>; color: string }[] = [
  {
    role: 'recruit',
    label: 'Recruit',
    desc: 'I am a prospective student-athlete exploring schools.',
    icon: GraduationCap,
    color: '#10B981',
  },
  {
    role: 'coach_admin',
    label: 'Coach / Admin',
    desc: 'I manage a school profile and recruiting content.',
    icon: UserCheck,
    color: '#3B82F6',
  },
]

const ROLE_ROUTES: Record<Role, string> = {
  recruit: '/recruit',
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
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(false)
  const [showPassword, setShowPassword] = useState(false)

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setFieldErrors({})

    const result = registerSchema.safeParse({
      displayName,
      email,
      password,
      confirmPassword,
      role: selectedRole,
    })
    if (!result.success) {
      const errors: Record<string, string> = {}
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as string
        if (!errors[field]) errors[field] = issue.message
      })
      setFieldErrors(errors)
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

    try {
      await fetch('/api/auth/sync-user', { method: 'POST' })
    } catch {}

    router.push(ROLE_ROUTES[selectedRole])
    router.refresh()
  }

  const selectedColor = ROLE_OPTIONS.find(o => o.role === selectedRole)?.color ?? '#10B981'

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-display text-3xl text-foreground">Create Account</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Join OVV to start exploring.
        </p>
      </div>

      {error && (
        <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3">
          <p className="text-sm text-destructive">{error}</p>
        </div>
      )}

      <form onSubmit={handleRegister} className="space-y-4">
        <div>
          <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Display Name
          </label>
          <Input
            placeholder="Your name"
            value={displayName}
            onChange={(e) => { setDisplayName(e.target.value); setFieldErrors((p) => ({ ...p, displayName: '' })) }}
            required
          />
          {fieldErrors.displayName && <p className="mt-1 text-sm text-destructive">{fieldErrors.displayName}</p>}
        </div>
        <div>
          <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Email
          </label>
          <Input
            type="email"
            placeholder="you@example.com"
            value={email}
            onChange={(e) => { setEmail(e.target.value); setFieldErrors((p) => ({ ...p, email: '' })) }}
            required
          />
          {fieldErrors.email && <p className="mt-1 text-sm text-destructive">{fieldErrors.email}</p>}
        </div>
        <div>
          <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Password
          </label>
          <div className="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="At least 6 characters"
              value={password}
              onChange={(e) => { setPassword(e.target.value); setFieldErrors((p) => ({ ...p, password: '' })) }}
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
          {fieldErrors.password && <p className="mt-1 text-sm text-destructive">{fieldErrors.password}</p>}
        </div>
        <div>
          <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
            Confirm Password
          </label>
          <Input
            type={showPassword ? 'text' : 'password'}
            placeholder="Re-enter your password"
            value={confirmPassword}
            onChange={(e) => { setConfirmPassword(e.target.value); setFieldErrors((p) => ({ ...p, confirmPassword: '' })) }}
            required
          />
          {fieldErrors.confirmPassword && <p className="mt-1 text-sm text-destructive">{fieldErrors.confirmPassword}</p>}
        </div>

        {/* Role Selector */}
        <div>
          <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
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
                  className="flex w-full items-center gap-3 rounded-xl p-4 text-left transition-all duration-200 glass-panel"
                  style={{
                    borderColor: isSelected ? option.color : undefined,
                    backgroundColor: isSelected ? `${option.color}08` : undefined,
                    boxShadow: isSelected ? `0 0 20px ${option.color}10` : 'none',
                  }}
                >
                  <div
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-colors"
                    style={{
                      backgroundColor: isSelected ? `${option.color}15` : 'oklch(1 0 0 / 0.04)',
                    }}
                  >
                    <span style={{ color: isSelected ? option.color : 'var(--muted-foreground)' }}>
                      <option.icon className="h-4 w-4" />
                    </span>
                  </div>
                  <div className="flex-1">
                    <p
                      className="font-display text-sm font-semibold uppercase tracking-wide transition-colors"
                      style={{ color: isSelected ? option.color : 'var(--foreground)' }}
                    >
                      {option.label}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {option.desc}
                    </p>
                  </div>
                  <div
                    className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors"
                    style={{
                      borderColor: isSelected ? option.color : 'var(--muted-foreground)',
                      opacity: isSelected ? 1 : 0.4,
                    }}
                  >
                    {isSelected && (
                      <div
                        className="h-2.5 w-2.5 rounded-full"
                        style={{ backgroundColor: option.color }}
                      />
                    )}
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <Button
          type="submit"
          className="w-full text-white uppercase tracking-wider text-xs font-semibold transition-colors"
          style={{ backgroundColor: selectedColor }}
          disabled={loading}
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </Button>
      </form>

      <p className="text-center text-sm text-muted-foreground">
        Already have an account?{' '}
        <Link href="/login" className="text-emerald hover:underline font-medium">
          Log In
        </Link>
      </p>
    </div>
  )
}
