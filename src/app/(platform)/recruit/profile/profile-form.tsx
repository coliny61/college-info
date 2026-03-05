'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { updateProfile, updateRecruitProfile } from '@/app/(platform)/recruit/actions'
import { SPORTS, POSITIONS, US_STATES, GRADUATION_YEARS, HEIGHT_FEET, HEIGHT_INCHES } from '@/data/sports'
import { toast } from 'sonner'

interface RecruitProfile {
  sport?: string | null
  position?: string | null
  height?: string | null
  weight?: number | null
  graduationYear?: number | null
  gpa?: number | null
  satScore?: number | null
  actScore?: number | null
  highSchool?: string | null
  city?: string | null
  state?: string | null
  bio?: string | null
  highlightsUrl?: string | null
}

interface ProfileFormProps {
  displayName: string
  email: string
  role: string
  profile?: RecruitProfile | null
}

function parseHeight(h: string | null | undefined): { feet: string; inches: string } {
  if (!h) return { feet: '', inches: '' }
  const match = h.match(/(\d+)'(\d+)"?/)
  return match ? { feet: match[1], inches: match[2] } : { feet: '', inches: '' }
}

export function ProfileForm({ displayName, email, role, profile }: ProfileFormProps) {
  const [name, setName] = useState(displayName)
  const [saving, setSaving] = useState(false)

  // Recruit profile fields
  const parsed = parseHeight(profile?.height)
  const [sport, setSport] = useState(profile?.sport ?? '')
  const [position, setPosition] = useState(profile?.position ?? '')
  const [heightFeet, setHeightFeet] = useState(parsed.feet)
  const [heightInches, setHeightInches] = useState(parsed.inches)
  const [weight, setWeight] = useState(profile?.weight?.toString() ?? '')
  const [gradYear, setGradYear] = useState(profile?.graduationYear?.toString() ?? '')
  const [gpa, setGpa] = useState(profile?.gpa?.toString() ?? '')
  const [sat, setSat] = useState(profile?.satScore?.toString() ?? '')
  const [act, setAct] = useState(profile?.actScore?.toString() ?? '')
  const [highSchool, setHighSchool] = useState(profile?.highSchool ?? '')
  const [city, setCity] = useState(profile?.city ?? '')
  const [state, setState] = useState(profile?.state ?? '')
  const [bio, setBio] = useState(profile?.bio ?? '')
  const [highlightsUrl, setHighlightsUrl] = useState(profile?.highlightsUrl ?? '')

  const positions = sport ? (POSITIONS[sport] ?? []) : []

  const initials = name
    ? name.split(' ').map((n) => n[0]).join('').toUpperCase().slice(0, 2)
    : email[0]?.toUpperCase() ?? '?'

  const handleAccountSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    const formData = new FormData()
    formData.set('displayName', name)
    try {
      await updateProfile(formData)
      toast.success('Account updated')
    } finally {
      setSaving(false)
    }
  }

  const handleProfileSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const height =
        heightFeet && heightInches
          ? `${heightFeet}'${heightInches}"`
          : heightFeet
            ? `${heightFeet}'0"`
            : null

      await updateRecruitProfile({
        sport: sport || null,
        position: position || null,
        height,
        weight: weight ? parseInt(weight) : null,
        graduationYear: gradYear ? parseInt(gradYear) : null,
        gpa: gpa ? parseFloat(gpa) : null,
        satScore: sat ? parseInt(sat) : null,
        actScore: act ? parseInt(act) : null,
        highSchool: highSchool || null,
        city: city || null,
        state: state || null,
        bio: bio || null,
        highlightsUrl: highlightsUrl || null,
      })
      toast.success('Profile updated')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Avatar + Account */}
      <Card className="animate-in-up">
        <CardHeader>
          <CardTitle className="text-lg">Account</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleAccountSave} className="space-y-4">
            <div className="flex items-center gap-4 mb-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-emerald/10 text-emerald text-lg">
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-medium text-foreground">{name}</p>
                <p className="text-xs text-muted-foreground">{email}</p>
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-medium">Display Name</label>
                <Input value={name} onChange={(e) => setName(e.target.value)} />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Role</label>
                <Input value={role.replace('_', ' ')} disabled className="bg-muted capitalize" />
              </div>
            </div>
            <Button type="submit" size="sm" disabled={saving || name === displayName}>
              {saving ? 'Saving...' : 'Save Account'}
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Athletic Profile */}
      {profile !== undefined && (
        <Card className="animate-in-up delay-1">
          <CardHeader>
            <CardTitle className="text-lg">Athletic Profile</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleProfileSave} className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Sport</label>
                  <Select value={sport} onValueChange={(v) => { setSport(v); setPosition('') }}>
                    <SelectTrigger><SelectValue placeholder="Select sport" /></SelectTrigger>
                    <SelectContent>
                      {SPORTS.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Position</label>
                  <Select value={position} onValueChange={setPosition} disabled={!positions.length}>
                    <SelectTrigger><SelectValue placeholder="Select position" /></SelectTrigger>
                    <SelectContent>
                      {positions.map((p) => (
                        <SelectItem key={p} value={p}>{p}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid gap-4 grid-cols-3">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Height (ft)</label>
                  <Select value={heightFeet} onValueChange={setHeightFeet}>
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
                  <Select value={heightInches} onValueChange={setHeightInches}>
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
                  <Input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="185" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Graduation Year</label>
                  <Select value={gradYear} onValueChange={setGradYear}>
                    <SelectTrigger><SelectValue placeholder="Year" /></SelectTrigger>
                    <SelectContent>
                      {GRADUATION_YEARS.map((y) => (
                        <SelectItem key={y} value={y.toString()}>{y}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">GPA</label>
                  <Input type="number" step="0.1" min="0" max="5" value={gpa} onChange={(e) => setGpa(e.target.value)} placeholder="3.8" />
                </div>
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">SAT Score</label>
                  <Input type="number" value={sat} onChange={(e) => setSat(e.target.value)} placeholder="1280" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">ACT Score</label>
                  <Input type="number" value={act} onChange={(e) => setAct(e.target.value)} placeholder="29" />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">High School</label>
                <Input value={highSchool} onChange={(e) => setHighSchool(e.target.value)} placeholder="Westlake High School" />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">City</label>
                  <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Austin" />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">State</label>
                  <Select value={state} onValueChange={setState}>
                    <SelectTrigger><SelectValue placeholder="State" /></SelectTrigger>
                    <SelectContent>
                      {US_STATES.map((s) => (
                        <SelectItem key={s} value={s}>{s}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">About You</label>
                <Textarea value={bio} onChange={(e) => setBio(e.target.value)} rows={3} placeholder="Your goals and what you're looking for..." />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Highlights Video URL</label>
                <Input type="url" value={highlightsUrl} onChange={(e) => setHighlightsUrl(e.target.value)} placeholder="https://www.hudl.com/profile/..." />
              </div>

              <Button type="submit" size="sm" disabled={saving}>
                {saving ? 'Saving...' : 'Save Profile'}
              </Button>
            </form>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
