'use client'

import { useState, useTransition } from 'react'
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
import { SPORTS, POSITIONS, US_STATES, GRADUATION_YEARS, HEIGHT_FEET, HEIGHT_INCHES } from '@/data/sports'
import { createRecruitProfile } from '@/app/(platform)/recruit/actions'
import { GraduationCap, Dumbbell, BookOpen, User, ArrowRight, ArrowLeft, Check } from 'lucide-react'

const STEPS = [
  { label: 'Basics', icon: GraduationCap },
  { label: 'Athletic', icon: Dumbbell },
  { label: 'Academic', icon: BookOpen },
  { label: 'Bio', icon: User },
]

interface FormData {
  graduationYear: string
  highSchool: string
  city: string
  state: string
  sport: string
  position: string
  heightFeet: string
  heightInches: string
  weight: string
  gpa: string
  satScore: string
  actScore: string
  bio: string
  highlightsUrl: string
}

const INITIAL: FormData = {
  graduationYear: '',
  highSchool: '',
  city: '',
  state: '',
  sport: '',
  position: '',
  heightFeet: '',
  heightInches: '',
  weight: '',
  gpa: '',
  satScore: '',
  actScore: '',
  bio: '',
  highlightsUrl: '',
}

export function OnboardingWizard() {
  const router = useRouter()
  const [step, setStep] = useState(0)
  const [data, setData] = useState<FormData>(INITIAL)
  const [isPending, startTransition] = useTransition()

  const set = (field: keyof FormData) => (val: string) =>
    setData((prev) => ({ ...prev, [field]: val }))

  const positions = data.sport ? (POSITIONS[data.sport] ?? []) : []

  const handleFinish = () => {
    startTransition(async () => {
      const height =
        data.heightFeet && data.heightInches
          ? `${data.heightFeet}'${data.heightInches}"`
          : data.heightFeet
            ? `${data.heightFeet}'0"`
            : null

      await createRecruitProfile({
        graduationYear: data.graduationYear ? parseInt(data.graduationYear) : null,
        highSchool: data.highSchool || null,
        city: data.city || null,
        state: data.state || null,
        sport: data.sport || null,
        position: data.position || null,
        height,
        weight: data.weight ? parseInt(data.weight) : null,
        gpa: data.gpa ? parseFloat(data.gpa) : null,
        satScore: data.satScore ? parseInt(data.satScore) : null,
        actScore: data.actScore ? parseInt(data.actScore) : null,
        bio: data.bio || null,
        highlightsUrl: data.highlightsUrl || null,
      })

      router.refresh()
    })
  }

  const next = () => {
    if (step < 3) setStep(step + 1)
    else handleFinish()
  }

  const back = () => {
    if (step > 0) setStep(step - 1)
  }

  return (
    <div className="mx-auto max-w-2xl animate-in-up">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-black tracking-tight text-foreground">
          Set Up Your Profile
        </h1>
        <p className="mt-2 text-muted-foreground">
          Help coaches find you. Fill in what you can — you can always update later.
        </p>
      </div>

      {/* Step indicator */}
      <div className="mb-8 flex items-center justify-center gap-2">
        {STEPS.map((s, i) => (
          <div key={s.label} className="flex items-center gap-2">
            <button
              onClick={() => i < step && setStep(i)}
              className={`flex h-9 w-9 items-center justify-center rounded-full text-sm font-bold transition-all ${
                i < step
                  ? 'bg-emerald text-white'
                  : i === step
                    ? 'bg-emerald/20 text-emerald ring-2 ring-emerald/50 animate-pulse-glow'
                    : 'bg-muted text-muted-foreground'
              }`}
            >
              {i < step ? <Check className="h-4 w-4" /> : i + 1}
            </button>
            {i < 3 && (
              <div
                className={`hidden sm:block h-0.5 w-8 transition-colors ${
                  i < step ? 'bg-emerald' : 'bg-muted'
                }`}
              />
            )}
          </div>
        ))}
      </div>

      <Card className="overflow-hidden">
        <CardContent className="p-6 sm:p-8">
          {/* Step title */}
          <div className="mb-6 flex items-center gap-3">
            {(() => {
              const Icon = STEPS[step].icon
              return <Icon className="h-5 w-5 text-emerald" />
            })()}
            <h2 className="text-lg font-bold text-foreground">
              {STEPS[step].label}
            </h2>
            <span className="text-xs text-muted-foreground">
              Step {step + 1} of 4
            </span>
          </div>

          {/* Step content */}
          <div className="space-y-4 animate-in-fade">
            {step === 0 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Graduation Year</label>
                  <Select value={data.graduationYear} onValueChange={set('graduationYear')}>
                    <SelectTrigger><SelectValue placeholder="Select year" /></SelectTrigger>
                    <SelectContent>
                      {GRADUATION_YEARS.map((y) => (
                        <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">High School</label>
                  <Input
                    placeholder="e.g., Westlake High School"
                    value={data.highSchool}
                    onChange={(e) => set('highSchool')(e.target.value)}
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
              </>
            )}

            {step === 1 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sport</label>
                  <Select
                    value={data.sport}
                    onValueChange={(val) => {
                      setData((prev) => ({ ...prev, sport: val, position: '' }))
                    }}
                  >
                    <SelectTrigger><SelectValue placeholder="Select sport" /></SelectTrigger>
                    <SelectContent>
                      {SPORTS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                {positions.length > 0 && (
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
                )}
                <div className="grid grid-cols-3 gap-4">
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
              </>
            )}

            {step === 2 && (
              <>
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
                <div className="grid grid-cols-2 gap-4">
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
                <p className="text-xs text-muted-foreground">
                  All academic fields are optional. You can add them later.
                </p>
              </>
            )}

            {step === 3 && (
              <>
                <div className="space-y-2">
                  <label className="text-sm font-medium">About You</label>
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
              </>
            )}
          </div>

          {/* Navigation buttons */}
          <div className="mt-8 flex items-center justify-between">
            <div>
              {step > 0 && (
                <Button variant="ghost" onClick={back} className="gap-2">
                  <ArrowLeft className="h-4 w-4" /> Back
                </Button>
              )}
            </div>
            <div className="flex gap-3">
              <Button
                variant="ghost"
                onClick={step < 3 ? next : handleFinish}
                className="text-muted-foreground"
              >
                Skip
              </Button>
              <Button
                onClick={next}
                disabled={isPending}
                className="gap-2 bg-emerald text-white hover:bg-emerald/90"
              >
                {isPending
                  ? 'Saving...'
                  : step < 3
                    ? <>Continue <ArrowRight className="h-4 w-4" /></>
                    : <>Finish <Check className="h-4 w-4" /></>
                }
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
