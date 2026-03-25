'use client'

import { useState, useCallback } from 'react'
import { JerseyCanvas, downloadCanvas } from './jersey-canvas'
import { AssetSelector } from './asset-selector'
import { Button } from '@/components/ui/button'
import { Download, Share2, Heart, Copy, Check, Twitter } from 'lucide-react'
import { useTrackDuration, useTrackEvent } from '@/hooks/use-analytics'
import { saveJerseyCombo } from '@/app/(platform)/recruit/actions'
import { toast } from 'sonner'

interface Asset {
  id: string
  type: string
  colorLabel: string
  imageUrl: string
}

interface JerseyBuilderProps {
  schoolId: string
  schoolName: string
  schoolSlug: string
  assets: Asset[]
  colorPrimary: string
}

export function JerseyBuilder({
  schoolId,
  schoolName,
  schoolSlug,
  assets,
  colorPrimary,
}: JerseyBuilderProps) {
  useTrackDuration('jersey', schoolId)
  const trackEvent = useTrackEvent()

  const [helmetId, setHelmetId] = useState<string | null>(null)
  const [helmetUrl, setHelmetUrl] = useState<string | null>(null)
  const [jerseyId, setJerseyId] = useState<string | null>(null)
  const [jerseyUrl, setJerseyUrl] = useState<string | null>(null)
  const [pantsId, setPantsId] = useState<string | null>(null)
  const [pantsUrl, setPantsUrl] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)
  const [savedId, setSavedId] = useState<string | null>(null)
  const [copied, setCopied] = useState(false)

  const getColorLabel = useCallback((id: string | null) => {
    if (!id) return null
    return assets.find((a) => a.id === id)?.colorLabel ?? null
  }, [assets])

  const canSave = helmetId && jerseyId && pantsId

  const handleSave = async () => {
    if (!canSave) return
    setSaving(true)
    try {
      const result = await saveJerseyCombo({
        schoolId,
        helmetId: helmetId!,
        jerseyId: jerseyId!,
        pantsId: pantsId!,
      })
      if ('error' in result) {
        toast.error(result.error)
      } else {
        setSavedId(result.id)
        toast.success('Jersey combo saved!')
        trackEvent('jersey', 'save_combo', schoolId, {
          helmetId, jerseyId, pantsId,
          helmet: getColorLabel(helmetId),
          jersey: getColorLabel(jerseyId),
          pants: getColorLabel(pantsId),
        })
      }
    } catch {
      toast.error('Failed to save')
    } finally {
      setSaving(false)
    }
  }

  const handleDownload = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      downloadCanvas(canvas, `${schoolSlug}-uniform.png`)
      trackEvent('jersey', 'share_combo', schoolId, { platform: 'download' })
    }
  }

  const handleShare = async () => {
    const canvas = document.querySelector('canvas')
    if (!canvas) return

    try {
      const blob = await new Promise<Blob | null>((resolve) =>
        canvas.toBlob(resolve, 'image/png')
      )
      if (blob && navigator.share) {
        const file = new File([blob], `${schoolSlug}-uniform.png`, { type: 'image/png' })
        await navigator.share({
          title: `My ${schoolName} Uniform`,
          text: `Check out my ${schoolName} jersey combo on OVV!`,
          files: [file],
        })
        trackEvent('jersey', 'share_combo', schoolId, { platform: 'native_share' })
      } else {
        handleDownload()
      }
    } catch {
      // User cancelled share
    }
  }

  const handleCopyLink = async () => {
    if (!savedId) {
      toast.error('Save your combo first to get a shareable link')
      return
    }
    const url = `${window.location.origin}/jersey/${savedId}`
    await navigator.clipboard.writeText(url)
    setCopied(true)
    toast.success('Link copied!')
    trackEvent('jersey', 'share_combo', schoolId, { platform: 'copy_link' })
    setTimeout(() => setCopied(false), 2000)
  }

  const handleTwitterShare = () => {
    const url = savedId ? `${window.location.origin}/jersey/${savedId}` : window.location.href
    const text = `Check out my ${schoolName} jersey combo on @OVV_official! 🏈`
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank')
    trackEvent('jersey', 'share_combo', schoolId, { platform: 'twitter' })
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
      {/* Canvas */}
      <div className="flex flex-col items-center gap-4">
        <JerseyCanvas
          helmetUrl={helmetUrl}
          jerseyUrl={jerseyUrl}
          pantsUrl={pantsUrl}
          colorPrimary={colorPrimary}
        />

        {/* Action buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          <Button
            onClick={handleSave}
            disabled={!canSave || saving}
            size="sm"
            className="gap-1.5"
            style={{ backgroundColor: colorPrimary }}
          >
            <Heart className="h-4 w-4" />
            {saving ? 'Saving...' : savedId ? 'Saved!' : 'Save Combo'}
          </Button>
          <Button onClick={handleDownload} variant="outline" size="sm" className="gap-1.5">
            <Download className="h-4 w-4" />
            Download
          </Button>
          <Button onClick={handleShare} variant="outline" size="sm" className="gap-1.5">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </div>

        {/* Social share row (visible after save) */}
        {savedId && (
          <div className="flex items-center gap-2 animate-in-fade">
            <Button onClick={handleTwitterShare} variant="ghost" size="sm" className="gap-1.5 text-xs">
              <Twitter className="h-3.5 w-3.5" />
              Twitter
            </Button>
            <Button onClick={handleCopyLink} variant="ghost" size="sm" className="gap-1.5 text-xs">
              {copied ? <Check className="h-3.5 w-3.5 text-emerald" /> : <Copy className="h-3.5 w-3.5" />}
              Copy Link
            </Button>
          </div>
        )}
      </div>

      {/* Selectors */}
      <div className="space-y-4">
        <AssetSelector
          assets={assets}
          type="helmet"
          label="Helmet"
          selectedId={helmetId}
          onSelect={(id, url) => {
            setHelmetId(id)
            setHelmetUrl(url)
            setSavedId(null)
            trackEvent('jersey', 'select_piece', schoolId, { pieceType: 'helmet', colorLabel: assets.find(a => a.id === id)?.colorLabel })
          }}
          colorPrimary={colorPrimary}
        />
        <AssetSelector
          assets={assets}
          type="jersey"
          label="Jersey"
          selectedId={jerseyId}
          onSelect={(id, url) => {
            setJerseyId(id)
            setJerseyUrl(url)
            setSavedId(null)
            trackEvent('jersey', 'select_piece', schoolId, { pieceType: 'jersey', colorLabel: assets.find(a => a.id === id)?.colorLabel })
          }}
          colorPrimary={colorPrimary}
        />
        <AssetSelector
          assets={assets}
          type="pants"
          label="Pants"
          selectedId={pantsId}
          onSelect={(id, url) => {
            setPantsId(id)
            setPantsUrl(url)
            setSavedId(null)
            trackEvent('jersey', 'select_piece', schoolId, { pieceType: 'pants', colorLabel: assets.find(a => a.id === id)?.colorLabel })
          }}
          colorPrimary={colorPrimary}
        />
      </div>
    </div>
  )
}
