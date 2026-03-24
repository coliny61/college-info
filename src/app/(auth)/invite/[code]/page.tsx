'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import Image from 'next/image'
import { createClient } from '@/lib/supabase/client'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Eye, EyeOff, AlertCircle, ArrowRight, GraduationCap } from 'lucide-react'

interface SchoolInfo {
  id: string
  name: string
  slug: string
  shortName: string
  mascot: string
  colorPrimary: string
  colorSecondary: string
  colorAccent: string
  logoUrl: string | null
}

interface InviteData {
  school: SchoolInfo
  headCoach: { name: string; title: string; imageUrl: string | null } | null
  welcomeMessage: string | null
  welcomeVideoUrl: string | null
}

type PageState = 'loading' | 'valid' | 'expired' | 'invalid'

export default function InvitePage({
  params,
}: {
  params: Promise<{ code: string }>
}) {
  const router = useRouter()
  const [code, setCode] = useState('')
  const [state, setState] = useState<PageState>('loading')
  const [inviteData, setInviteData] = useState<InviteData | null>(null)
  const [errorMsg, setErrorMsg] = useState('')

  // Form
  const [displayName, setDisplayName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [formError, setFormError] = useState('')
  const [loading, setLoading] = useState(false)

  // Validate invite code on mount
  useEffect(() => {
    params.then(async ({ code: inviteCode }) => {
      setCode(inviteCode)
      try {
        const res = await fetch(`/api/invite/${inviteCode}`)
        if (res.ok) {
          const data = await res.json()
          setInviteData(data)
          setState('valid')
        } else if (res.status === 410) {
          setState('expired')
          setErrorMsg('This invite link has expired.')
        } else {
          setState('invalid')
          setErrorMsg('Invalid invite link.')
        }
      } catch {
        setState('invalid')
        setErrorMsg('Something went wrong.')
      }
    })
  }, [params])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFormError('')
    setLoading(true)

    try {
      const supabase = createClient()

      const { error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            display_name: displayName,
            role: 'recruit',
            invite_code: code,
          },
        },
      })

      if (signUpError) {
        setFormError(signUpError.message)
        setLoading(false)
        return
      }

      // Sync user to Prisma
      try {
        await fetch('/api/auth/sync-user', { method: 'POST' })
      } catch {}

      // Increment invite used count
      try {
        await fetch(`/api/invite/${code}/used`, { method: 'POST' })
      } catch {}

      // Redirect to welcome screen
      router.push(`/recruit/welcome/${code}`)
      router.refresh()
    } catch {
      setFormError('Something went wrong. Please try again.')
      setLoading(false)
    }
  }

  // Loading state
  if (state === 'loading') {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <div className="h-8 w-8 rounded-full border-2 border-emerald border-t-transparent animate-spin" />
        <p className="mt-4 text-sm text-muted-foreground">Validating invite...</p>
      </div>
    )
  }

  // Error states
  if (state === 'expired' || state === 'invalid') {
    return (
      <div className="max-w-md space-y-6 text-center">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
          <AlertCircle className="h-8 w-8 text-destructive" />
        </div>
        <h1 className="text-display text-2xl text-foreground">{errorMsg}</h1>
        <p className="text-sm text-muted-foreground">
          {state === 'expired'
            ? 'Please contact your coach for a new invite link.'
            : 'This link may be incorrect or no longer active.'}
        </p>
        <Link href="/register">
          <Button className="gap-2">
            Sign Up Normally <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
      </div>
    )
  }

  // Valid invite — branded signup form
  const school = inviteData!.school

  return (
    <div className="w-full max-w-md space-y-6">
      {/* School branding header */}
      <div className="text-center">
        <div
          className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl"
          style={{ backgroundColor: school.colorPrimary }}
        >
          {school.logoUrl ? (
            <Image src={school.logoUrl} alt={school.name} width={36} height={36} className="h-9 w-9" />
          ) : (
            <GraduationCap className="h-8 w-8 text-white" />
          )}
        </div>
        <h1 className="text-display text-2xl text-foreground">
          You&apos;ve Been Invited!
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          <span style={{ color: school.colorPrimary }} className="font-semibold">
            {school.name}
          </span>{' '}
          wants you to explore their program.
        </p>
        {inviteData?.headCoach && (
          <p className="mt-1 text-xs text-muted-foreground">
            From {inviteData.headCoach.name}, {inviteData.headCoach.title}
          </p>
        )}
      </div>

      {/* Signup form */}
      <div className="space-y-4">
        {formError && (
          <div className="rounded-lg bg-destructive/10 border border-destructive/20 px-4 py-3">
            <p className="text-sm text-destructive">{formError}</p>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="mb-2 block text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              Full Name
            </label>
            <Input
              placeholder="Marcus Johnson"
              value={displayName}
              onChange={(e) => setDisplayName(e.target.value)}
              required
            />
          </div>
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
                placeholder="At least 6 characters"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="pr-10"
                required
                minLength={6}
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
            className="w-full text-white uppercase tracking-wider text-xs font-semibold"
            style={{ backgroundColor: school.colorPrimary }}
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account & Explore'}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground">
          Already have an account?{' '}
          <Link href="/login" className="font-medium hover:underline" style={{ color: school.colorPrimary }}>
            Sign In
          </Link>
        </p>
      </div>
    </div>
  )
}
