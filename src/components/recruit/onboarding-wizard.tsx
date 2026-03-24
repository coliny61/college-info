'use client'

import { useState, useMemo, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Card, CardContent } from '@/components/ui/card'
import { POSITIONS, US_STATES, GRADUATION_YEARS, HEIGHT_FEET, HEIGHT_INCHES } from '@/data/sports'
import { createRecruitProfile } from '@/app/(platform)/recruit/actions'
import { calculateProfileCompleteness } from '@/lib/validations'
import { ProfileCompletenessBar } from './profile-completeness-bar'
import { Check, ArrowRight } from 'lucide-react'
import { toast } from 'sonner'

interface FormData {
  recruitType: string
  graduationYear: string
  sport: string
  position: string
  heightFeet: string
  heightInches: string
  weight: string
  gpa: string
  satScore: string
  actScore: string
  highSchool: string
  city: string
  state: string
  bio: string
  highlightsUrl: string
  // Transfer fields
  currentSchool: string
  collegeStats: string
  eligibilityYears: string
  transferReason: string
}

const INITIAL: FormData = {
  recruitType: 'high_school',
  graduationYear: '',
  sport: 'Football',
  position: '',
  heightFeet: '',
  heightInches: '',
  weight: '',
  gpa: '',
  satScore: '',
  actScore: '',
  highSchool: '',
  city: '',
  state: '',
  bio: '',
  highlightsUrl: '',
  currentSchool: '',
  collegeStats: '',
  eligibilityYears: '',
  transferReason: '',
}

export function OnboardingWizard() {
  const router = useRouter()
  const [data, setData] = useState<FormData>(INITIAL)
  const [isPending, startTransition] = useTransition()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const set = (field: keyof FormData) => (val: string) =>
    setData((prev) => ({ ...prev, [field]: val }))

  const positions = data.sport ? (POSITIONS[data.sport] ?? []) : []
  const isTransfer = data.recruitType === 'transfer'

  // Live completeness calculation
  const completeness = useMemo(() => {
    const height =
      data.heightFeet && data.heightInches
        ? `${data.heightFeet}'${data.heightInches}"`
        : null
    return calculateProfileCompleteness({
      sport: data.sport || null,
      graduationYear: data.graduationYear ? parseInt(data.graduationYear) : null,
      position: data.position || null,
      height,
      weight: data.weight ? parseInt(data.weight) : null,
      gpa: data.gpa ? parseFloat(data.gpa) : null,
      satScore: data.satScore ? parseInt(data.satScore) : null,
      actScore: data.actScore ? parseInt(data.actScore) : null,
      highSchool: data.highSchool || null,
      city: data.city || null,
      state: data.state || null,
      bio: data.bio || null,
      highlightsUrl: data.highlightsUrl || null,
    })
  }, [data])

  const handleSubmit = () => {
    // Validate required fields
    const newErrors: Record<string, string> = {}
    if (!data.sport) newErrors.sport = 'Sport is required'
    if (!data.graduationYear) newErrors.graduationYear = 'Graduation year is required'
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }
    setErrors({})

    startTransition(async () => {
      const height =
        data.heightFeet && data.heightInches
          ? `${data.heightFeet}'${data.heightInches}"`
          : data.heightFeet
            ? `${data.heightFeet}'0"`
            : null

      const result = await createRecruitProfile({
        recruitType: data.recruitType,
        sport: data.sport || null,
        graduationYear: data.graduationYear ? parseInt(data.graduationYear) : null,
        position: data.position || null,
        height,
        weight: data.weight ? parseInt(data.weight) : null,
        gpa: data.gpa ? parseFloat(data.gpa) : null,
        satScore: data.satScore ? parseInt(data.satScore) : null,
        actScore: data.actScore ? parseInt(data.actScore) : null,
        highSchool: data.highSchool || null,
        city: data.city || null,
        state: data.state || null,
        bio: data.bio || null,
        highlightsUrl: data.highlightsUrl || null,
        currentSchool: isTransfer ? (data.currentSchool || null) : null,
        collegeStats: isTransfer ? (data.collegeStats || null) : null,
        eligibilityYears: isTransfer && data.eligibilityYears ? parseInt(data.eligibilityYears) : null,
        transferReason: isTransfer ? (data.transferReason || null) : null,
      })

      if ('error' in result) {
        toast.error(result.error)
      } else {
        router.refresh()
      }
    })
  }

  return (
    <div className="mx-auto max-w-2xl animate-in-up">
      <div className="mb-8 text-center">
        <h1 className="text-display text-3xl text-foreground">
          Set Up Your Profile
        </h1>
        <p className="mt-2 text-muted-foreground">
          Help coaches find you. Fill in what you can — you can always update later.
        </p>
      </div>

      {/* Completeness bar */}
      <div className="mb-8">
        <ProfileCompletenessBar percentage={completeness} />
      </div>

      <Card>
        <CardContent className="p-6 sm:p-8 space-y-8">
          {/* ─── Recruit Type Toggle ─────────────────────────────────── */}
          <div>
            <label className="mb-3 block text-[10px] font-medium uppercase tracking-[0.15em] text-muted-foreground">
              I am a...
            </label>
            <div className="grid grid-cols-2 gap-2">
              {[
                { value: 'high_school', label: 'High School Recruit' },
                { value: 'transfer', label: 'Transfer Portal' },
              ].map((opt) => (
                <button
                  key={opt.value}
                  type="button"
                  onClick={() => set('recruitType')(opt.value)}
                  className={`rounded-xl px-4 py-3 text-sm font-medium transition-all ${
                    data.recruitType === opt.value
                      ? 'bg-emerald/10 text-emerald ring-2 ring-emerald/50'
                      : 'glass-panel text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>

          {/* ─── Required Fields ──────────────────────────────────────── */}
          <div>
            <h3 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-4">
              Required
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Sport</label>
                <Select value={data.sport} onValueChange={set('sport')}>
                  <SelectTrigger className={errors.sport ? 'ring-2 ring-destructive' : ''}>
                    <SelectValue placeholder="Select sport" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Football">Football</SelectItem>
                  </SelectContent>
                </Select>
                {errors.sport && <p className="text-xs text-destructive">{errors.sport}</p>}
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Graduation Year</label>
                <Select value={data.graduationYear} onValueChange={set('graduationYear')}>
                  <SelectTrigger className={errors.graduationYear ? 'ring-2 ring-destructive' : ''}>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {GRADUATION_YEARS.map((y) => (
                      <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {errors.graduationYear && <p className="text-xs text-destructive">{errors.graduationYear}</p>}
              </div>
            </div>
          </div>

          {/* ─── Athletic Info ────────────────────────────────────────── */}
          <div>
            <h3 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-4">
              Athletic Info
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Position</label>
                <Select value={data.position} onValueChange={set('position')}>
                  <SelectTrigger><SelectValue placeholder="Select position" /></SelectTrigger>
                  <SelectContent>
                    {positions.map((p) => (
                      <SelectItem key={p} value={p}>{p}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div />
              <div className="space-y-2">
                <label className="text-sm font-medium">Height (ft)</label>
                <Select value={data.heightFeet} onValueChange={set('heightFeet')}>
                  <SelectTrigger><SelectValue placeholder="ft" /></SelectTrigger>
                  <SelectContent>
                    {HEIGHT_FEET.map((f) => (
                      <SelectItem key={f} value={f.toString()}>{f}&apos;</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Height (in)</label>
                <Select value={data.heightInches} onValueChange={set('heightInches')}>
                  <SelectTrigger><SelectValue placeholder="in" /></SelectTrigger>
                  <SelectContent>
                    {HEIGHT_INCHES.map((i) => (
                      <SelectItem key={i} value={i.toString()}>{i}&quot;</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Weight (lbs)</label>
                <Input
                  type="number"
                  placeholder="e.g., 185"
                  value={data.weight}
                  onChange={(e) => set('weight')(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ─── Transfer Fields (conditional) ────────────────────────── */}
          {isTransfer && (
            <div>
              <h3 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-4">
                Transfer Info
              </h3>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Current / Previous School</label>
                  <Input
                    placeholder="e.g., University of Texas"
                    value={data.currentSchool}
                    onChange={(e) => set('currentSchool')(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Eligibility Remaining</label>
                  <Select value={data.eligibilityYears} onValueChange={set('eligibilityYears')}>
                    <SelectTrigger><SelectValue placeholder="Years" /></SelectTrigger>
                    <SelectContent>
                      {[1, 2, 3, 4].map((y) => (
                        <SelectItem key={y} value={y.toString()}>{y} year{y > 1 ? 's' : ''}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium">College Stats</label>
                <Textarea
                  placeholder="e.g., 2,400 passing yards, 18 TDs, 5 INTs..."
                  value={data.collegeStats}
                  onChange={(e) => set('collegeStats')(e.target.value)}
                  rows={3}
                />
              </div>
              <div className="mt-4 space-y-2">
                <label className="text-sm font-medium">Transfer Reason (optional)</label>
                <Input
                  placeholder="e.g., Seeking more playing time"
                  value={data.transferReason}
                  onChange={(e) => set('transferReason')(e.target.value)}
                />
              </div>
            </div>
          )}

          {/* ─── Academic Info ────────────────────────────────────────── */}
          <div>
            <h3 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-4">
              Academics
            </h3>
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <label className="text-sm font-medium">GPA</label>
                <Input
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  placeholder="e.g., 3.8"
                  value={data.gpa}
                  onChange={(e) => set('gpa')(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">SAT Score</label>
                <Input
                  type="number"
                  placeholder="e.g., 1280"
                  value={data.satScore}
                  onChange={(e) => set('satScore')(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">ACT Score</label>
                <Input
                  type="number"
                  placeholder="e.g., 29"
                  value={data.actScore}
                  onChange={(e) => set('actScore')(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* ─── Location ────────────────────────────────────────────── */}
          <div>
            <h3 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-4">
              Location
            </h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2 sm:col-span-2">
                <label className="text-sm font-medium">High School</label>
                <Input
                  placeholder="e.g., Westlake High School"
                  value={data.highSchool}
                  onChange={(e) => set('highSchool')(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">City</label>
                <Input
                  placeholder="e.g., Austin"
                  value={data.city}
                  onChange={(e) => set('city')(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">State</label>
                <Select value={data.state} onValueChange={set('state')}>
                  <SelectTrigger><SelectValue placeholder="State" /></SelectTrigger>
                  <SelectContent>
                    {US_STATES.map((s) => (
                      <SelectItem key={s} value={s}>{s}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* ─── About & Highlights ──────────────────────────────────── */}
          <div>
            <h3 className="text-display text-xs tracking-[0.15em] text-muted-foreground mb-4">
              About You
            </h3>
            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Bio</label>
                <Textarea
                  placeholder="Tell coaches about yourself — your goals, interests, and what you're looking for..."
                  value={data.bio}
                  onChange={(e) => set('bio')(e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Highlights Video URL</label>
                <Input
                  type="url"
                  placeholder="e.g., https://www.hudl.com/profile/..."
                  value={data.highlightsUrl}
                  onChange={(e) => set('highlightsUrl')(e.target.value)}
                />
                <p className="text-xs text-muted-foreground">
                  Hudl, YouTube, or any video link showcasing your skills.
                </p>
              </div>
            </div>
          </div>

          {/* ─── Submit ──────────────────────────────────────────────── */}
          <div className="flex items-center justify-between pt-4 border-t border-border">
            <ProfileCompletenessBar percentage={completeness} />
            <Button
              onClick={handleSubmit}
              disabled={isPending}
              className="ml-6 shrink-0 gap-2 bg-emerald text-white hover:bg-emerald/90"
            >
              {isPending ? (
                'Saving...'
              ) : (
                <>
                  Get Started <ArrowRight className="h-4 w-4" />
                </>
              )}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
