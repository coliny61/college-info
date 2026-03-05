'use client'

import { useState, useTransition } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { generateFamilyCode } from '@/app/(platform)/recruit/actions'
import { Copy, Check, Users } from 'lucide-react'
import { toast } from 'sonner'

interface FamilyCodeDisplayProps {
  familyCode: string | null
}

export function FamilyCodeDisplay({ familyCode: initial }: FamilyCodeDisplayProps) {
  const [code, setCode] = useState(initial)
  const [copied, setCopied] = useState(false)
  const [isPending, startTransition] = useTransition()

  const handleGenerate = () => {
    startTransition(async () => {
      const newCode = await generateFamilyCode()
      setCode(newCode)
      toast.success('Family code generated')
    })
  }

  const handleCopy = async () => {
    if (!code) return
    await navigator.clipboard.writeText(code)
    setCopied(true)
    toast.success('Code copied to clipboard')
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg">
          <Users className="h-5 w-5 text-emerald" />
          Share with Family
        </CardTitle>
      </CardHeader>
      <CardContent>
        {code ? (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Share this code with a parent so they can link their account to yours.
            </p>
            <div className="flex items-center gap-3">
              <div className="flex-1 rounded-lg border border-border bg-muted px-4 py-3">
                <span className="text-xl font-black tracking-wider text-scoreboard text-foreground">
                  {code}
                </span>
              </div>
              <Button variant="outline" size="icon" onClick={handleCopy} className="shrink-0">
                {copied ? <Check className="h-4 w-4 text-emerald" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-sm text-muted-foreground">
              Generate a family code so your parent can link their account and follow your recruiting journey.
            </p>
            <Button onClick={handleGenerate} disabled={isPending} className="gap-2">
              <Users className="h-4 w-4" />
              {isPending ? 'Generating...' : 'Generate Family Code'}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
