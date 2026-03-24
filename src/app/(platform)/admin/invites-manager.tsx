'use client'

import { useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { Plus, Copy, Trash2, Check, Settings2 } from 'lucide-react'
import { toast } from 'sonner'
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
  const [dialogOpen, setDialogOpen] = useState(false)

  // Generate form
  const [quantity, setQuantity] = useState('1')
  const [expiresAt, setExpiresAt] = useState('')
  const [welcomeMessage, setWelcomeMessage] = useState('')

  const handleGenerate = async () => {
    setGenerating(true)
    try {
      await generateInviteLink({
        quantity: parseInt(quantity) || 1,
        expiresAt: expiresAt || undefined,
        welcomeMessage: welcomeMessage || undefined,
      })
      const count = parseInt(quantity) || 1
      toast.success(count > 1 ? `${count} invite links created` : 'Invite link created')
      setDialogOpen(false)
      setQuantity('1')
      setExpiresAt('')
      setWelcomeMessage('')
    } catch {
      toast.error('Failed to generate invite link')
    } finally {
      setGenerating(false)
    }
  }

  const handleQuickGenerate = async () => {
    setGenerating(true)
    try {
      await generateInviteLink()
      toast.success('Invite link created')
    } catch {
      toast.error('Failed to generate invite link')
    } finally {
      setGenerating(false)
    }
  }

  const handleCopy = async (code: string, id: string) => {
    const url = `${window.location.origin}/invite/${code}`
    await navigator.clipboard.writeText(url)
    setCopiedId(id)
    toast.success('Link copied')
    setTimeout(() => setCopiedId(null), 2000)
  }

  const handleDelete = async (inviteId: string) => {
    await deleteInviteLink(inviteId)
    toast.success('Invite link deleted')
  }

  const isExpired = (invite: Invite) =>
    invite.expiresAt ? new Date(invite.expiresAt) < new Date() : false

  // Default expiry date (30 days from now)
  const defaultExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        <Button onClick={handleQuickGenerate} disabled={generating} size="sm">
          <Plus className="mr-1 h-4 w-4" />
          {generating ? 'Generating...' : 'Quick Generate'}
        </Button>

        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogTrigger asChild>
            <Button variant="outline" size="sm">
              <Settings2 className="mr-1 h-4 w-4" />
              Advanced
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Generate Invite Links</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 pt-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <Input
                    type="number"
                    min="1"
                    max="100"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium">Expires</label>
                  <Input
                    type="date"
                    value={expiresAt}
                    onChange={(e) => setExpiresAt(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    placeholder={defaultExpiry}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">Welcome Message (optional)</label>
                <Textarea
                  placeholder="Custom message recruits see when they sign up via this link..."
                  value={welcomeMessage}
                  onChange={(e) => setWelcomeMessage(e.target.value)}
                  rows={3}
                />
              </div>
              <Button onClick={handleGenerate} disabled={generating} className="w-full">
                {generating ? 'Generating...' : `Generate ${parseInt(quantity) > 1 ? `${quantity} Links` : 'Link'}`}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

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
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Delete Invite Link</AlertDialogTitle>
                        <AlertDialogDescription>
                          Are you sure you want to delete this invite link? Recruits will no longer be able to use it.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction onClick={() => handleDelete(invite.id)}>
                          Delete
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}
