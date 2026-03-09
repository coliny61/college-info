'use client'

import { useState, useRef, useCallback } from 'react'
import { JerseyCanvas, downloadCanvas } from './jersey-canvas'
import { AssetSelector } from './asset-selector'
import { Button } from '@/components/ui/button'
import { Download, Share2 } from 'lucide-react'
import { useTrackDuration, useTrackEvent } from '@/hooks/use-analytics'

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

  const getColorLabel = useCallback((id: string | null) => {
    if (!id) return null
    return assets.find((a) => a.id === id)?.colorLabel ?? null
  }, [assets])

  const handleDownload = () => {
    const canvas = document.querySelector('canvas')
    if (canvas) {
      downloadCanvas(canvas, `${schoolSlug}-uniform.png`)
      trackEvent('jersey', 'combination_downloaded', schoolId, {
        helmet: getColorLabel(helmetId),
        jersey: getColorLabel(jerseyId),
        pants: getColorLabel(pantsId),
      })
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
        const file = new File([blob], `${schoolSlug}-uniform.png`, {
          type: 'image/png',
        })
        await navigator.share({
          title: `My ${schoolName} Uniform`,
          files: [file],
        })
      } else {
        handleDownload()
      }
    } catch {
      handleDownload()
    }
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

        <div className="flex gap-2">
          <Button onClick={handleDownload} variant="outline" size="sm">
            <Download className="mr-1 h-4 w-4" />
            Download
          </Button>
          <Button
            onClick={handleShare}
            size="sm"
            style={{ backgroundColor: colorPrimary }}
          >
            <Share2 className="mr-1 h-4 w-4" />
            Share
          </Button>
        </div>
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
            const label = assets.find((a) => a.id === id)?.colorLabel
            trackEvent('jersey', 'asset_selected', schoolId, { type: 'helmet', colorLabel: label })
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
            const label = assets.find((a) => a.id === id)?.colorLabel
            trackEvent('jersey', 'asset_selected', schoolId, { type: 'jersey', colorLabel: label })
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
            const label = assets.find((a) => a.id === id)?.colorLabel
            trackEvent('jersey', 'asset_selected', schoolId, { type: 'pants', colorLabel: label })
          }}
          colorPrimary={colorPrimary}
        />
      </div>
    </div>
  )
}
