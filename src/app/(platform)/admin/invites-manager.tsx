'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Plus, Copy, Trash2, Check } from 'lucide-react'
import { generateInviteLink, deleteInviteLink } from '@/app/(platform)/admin/actions'

interface Invite {
  id: string
  code: string
  expiresAt: Date | null
  usedCount: number
  createdAt: Date
}

export function InvitesManager({ invites }: { invites: Invite[] }) {
  const [generating, setGenerating] = useState(false)
  const [copiedId, setCopiedId] = useState<string | null>(null)

  const handleGenerate = async () => {
    setGenerating(true)
    await generateInviteLink()
    setGenerating(false)
  }

  const handleCopy = async (code: string, id: string) => {
    const url = `${window.location.origin}/invite/${code}`
    await navigator.clipboard.writeText(url)
    setCopiedId(id)
    setTimeout(() => setCopiedId(null), 2000)
  }

  const isExpired = (invite: Invite) =>
    invite.expiresAt ? new Date(invite.expiresAt) < new Date() : false

  return (
    <div className="space-y-4">
      <Button onClick={handleGenerate} disabled={generating}>
        <Plus className="mr-1 h-4 w-4" />
        {generating ? 'Generating...' : 'Generate New Link'}
      </Button>

      {invites.length === 0 ? (
        <div className="rounded-lg border border-dashed border-border p-12 text-center">
          <p className="text-muted-foreground">
            No invite links yet. Generate one to share with recruits.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {invites.map((invite) => (
            <Card key={invite.id}>
              <CardContent className="flex items-center justify-between p-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <code className="text-sm font-mono text-foreground">
                      /invite/{invite.code}
                    </code>
                    {isExpired(invite) ? (
                      <Badge variant="destructive" className="text-xs">
                        Expired
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="text-xs text-emerald">
                        Active
                      </Badge>
                    )}
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Used {invite.usedCount} times &middot; Created{' '}
                    {new Date(invite.createdAt).toLocaleDateString()}
                    {invite.expiresAt && (
                      <>
                        {' '}&middot; Expires{' '}
                        {new Date(invite.expiresAt).toLocaleDateString()}
                      </>
                    )}
                  </p>
                </div>

                <div className="flex items-center gap-1">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleCopy(invite.code, invite.id)}
                  >
                    {copiedId === invite.id ? (
                      <Check className="h-4 w-4 text-emerald" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <form action={() => deleteInviteLink(invite.id)}>
                    <Button variant="ghost" size="icon" type="submit">
                      <Trash2 className="h-4 w-4 text-destructive" />
                    </Button>
                  </form>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
