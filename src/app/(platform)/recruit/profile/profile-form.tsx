'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { updateProfile } from '@/app/(platform)/recruit/actions'

interface ProfileFormProps {
  displayName: string
  email: string
  role: string
}

export function ProfileForm({ displayName, email, role }: ProfileFormProps) {
  const [name, setName] = useState(displayName)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const initials = name
    ? name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2)
    : email[0]?.toUpperCase() ?? '?'

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)

    const formData = new FormData()
    formData.set('displayName', name)

    try {
      await updateProfile(formData)
      setSaved(true)
      setTimeout(() => setSaved(false), 2000)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="space-y-6">
      {/* Avatar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Avatar</CardTitle>
        </CardHeader>
        <CardContent className="flex items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback className="bg-emerald/10 text-emerald text-lg">
              {initials}
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium text-foreground">{name}</p>
            <p className="text-xs text-muted-foreground">{email}</p>
          </div>
        </CardContent>
      </Card>

      {/* Info */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account Info</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="displayName" className="text-sm font-medium">
                Display Name
              </label>
              <Input
                id="displayName"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Email</label>
              <Input value={email} disabled className="bg-muted" />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Role</label>
              <Input
                value={role.replace('_', ' ')}
                disabled
                className="bg-muted capitalize"
              />
            </div>

            <Button type="submit" disabled={saving || name === displayName}>
              {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
