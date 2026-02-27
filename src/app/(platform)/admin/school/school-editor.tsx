'use client'

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { updateSchoolProfile } from '@/app/(platform)/admin/actions'

interface SchoolEditorProps {
  school: {
    id: string
    name: string
    description: string
    colorPrimary: string
    colorSecondary: string
    colorAccent: string
  }
}

export function SchoolEditor({ school }: SchoolEditorProps) {
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setSaving(true)
    setSaved(false)

    const formData = new FormData(e.currentTarget)
    await updateSchoolProfile(formData)

    setSaving(false)
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Basic Info</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="name" className="text-sm font-medium">
              School Name
            </label>
            <Input id="name" name="name" defaultValue={school.name} />
          </div>

          <div className="space-y-2">
            <label htmlFor="description" className="text-sm font-medium">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              defaultValue={school.description}
              rows={4}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Colors</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="space-y-2">
              <label htmlFor="colorPrimary" className="text-sm font-medium">
                Primary
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="colorPrimary"
                  name="colorPrimary"
                  defaultValue={school.colorPrimary}
                  className="h-10 w-10 cursor-pointer rounded border border-input"
                />
                <Input
                  name="colorPrimaryText"
                  defaultValue={school.colorPrimary}
                  className="flex-1"
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="colorSecondary" className="text-sm font-medium">
                Secondary
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="colorSecondary"
                  name="colorSecondary"
                  defaultValue={school.colorSecondary}
                  className="h-10 w-10 cursor-pointer rounded border border-input"
                />
                <Input
                  defaultValue={school.colorSecondary}
                  className="flex-1"
                  readOnly
                />
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="colorAccent" className="text-sm font-medium">
                Accent
              </label>
              <div className="flex items-center gap-2">
                <input
                  type="color"
                  id="colorAccent"
                  name="colorAccent"
                  defaultValue={school.colorAccent}
                  className="h-10 w-10 cursor-pointer rounded border border-input"
                />
                <Input
                  defaultValue={school.colorAccent}
                  className="flex-1"
                  readOnly
                />
              </div>
            </div>
          </div>

          {/* Preview */}
          <div className="mt-4">
            <p className="mb-2 text-sm font-medium">Preview</p>
            <div
              className="h-3 rounded-full"
              style={{
                background: `linear-gradient(to right, ${school.colorPrimary}, ${school.colorSecondary}, ${school.colorAccent})`,
              }}
            />
          </div>
        </CardContent>
      </Card>

      <Button type="submit" disabled={saving}>
        {saving ? 'Saving...' : saved ? 'Saved!' : 'Save Changes'}
      </Button>
    </form>
  )
}
