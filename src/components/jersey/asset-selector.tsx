'use client'

import Image from 'next/image'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

interface Asset {
  id: string
  type: string
  colorLabel: string
  imageUrl: string
}

interface AssetSelectorProps {
  assets: Asset[]
  type: string
  label: string
  selectedId: string | null
  onSelect: (id: string, url: string) => void
  colorPrimary: string
}

export function AssetSelector({
  assets,
  type,
  label,
  selectedId,
  onSelect,
  colorPrimary,
}: AssetSelectorProps) {
  const filtered = assets.filter((a) => a.type === type)

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-sm capitalize">{label}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-2">
          {filtered.map((asset) => (
            <button
              key={asset.id}
              onClick={() => onSelect(asset.id, asset.imageUrl)}
              className={`relative aspect-square overflow-hidden rounded-lg border-2 transition-all ${
                selectedId === asset.id
                  ? 'scale-105 shadow-lg'
                  : 'border-border hover:border-muted-foreground'
              }`}
              style={
                selectedId === asset.id
                  ? { borderColor: colorPrimary }
                  : undefined
              }
            >
              <Image
                src={asset.imageUrl}
                alt={`${asset.type} - ${asset.colorLabel}`}
                fill
                className="object-cover"
              />
              <span className="absolute bottom-0 inset-x-0 bg-black/60 px-1 py-0.5 text-center text-[10px] text-white capitalize">
                {asset.colorLabel}
              </span>
            </button>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
