'use client'

import { useRef, useEffect, useCallback } from 'react'

interface JerseyCanvasProps {
  helmetUrl: string | null
  jerseyUrl: string | null
  pantsUrl: string | null
  colorPrimary: string
}

export function JerseyCanvas({
  helmetUrl,
  jerseyUrl,
  pantsUrl,
  colorPrimary,
}: JerseyCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const draw = useCallback(async () => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    // Clear
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    // Background
    ctx.fillStyle = '#1a1a2e'
    ctx.fillRect(0, 0, canvas.width, canvas.height)

    const loadImage = (src: string, timeoutMs = 10000): Promise<HTMLImageElement> =>
      new Promise((resolve, reject) => {
        const img = new Image()
        const timer = setTimeout(() => {
          img.src = ''
          reject(new Error(`Image load timeout: ${src}`))
        }, timeoutMs)
        img.onload = () => { clearTimeout(timer); resolve(img) }
        img.onerror = () => { clearTimeout(timer); reject(new Error(`Failed to load: ${src}`)) }
        img.crossOrigin = 'anonymous'
        img.src = src
      })

    // Draw layers: helmet (top), jersey (middle), pants (bottom)
    const layers = [
      { url: helmetUrl, y: 20, size: 200 },
      { url: jerseyUrl, y: 230, size: 220 },
      { url: pantsUrl, y: 460, size: 200 },
    ]

    for (const layer of layers) {
      if (layer.url) {
        try {
          const img = await loadImage(layer.url)
          const x = (canvas.width - layer.size) / 2
          ctx.drawImage(img, x, layer.y, layer.size, layer.size)
        } catch {
          // Draw placeholder
          ctx.fillStyle = colorPrimary + '33'
          ctx.fillRect(
            (canvas.width - layer.size) / 2,
            layer.y,
            layer.size,
            layer.size
          )
          ctx.fillStyle = '#666'
          ctx.font = '14px sans-serif'
          ctx.textAlign = 'center'
          ctx.fillText(
            'Image unavailable',
            canvas.width / 2,
            layer.y + layer.size / 2
          )
        }
      } else {
        // Empty placeholder
        ctx.strokeStyle = '#333'
        ctx.lineWidth = 2
        ctx.setLineDash([8, 4])
        ctx.strokeRect(
          (canvas.width - 160) / 2,
          layer.y + 20,
          160,
          layer.size - 40
        )
        ctx.setLineDash([])
        ctx.fillStyle = '#555'
        ctx.font = '12px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText('Select an asset', canvas.width / 2, layer.y + layer.size / 2)
      }
    }
  }, [helmetUrl, jerseyUrl, pantsUrl, colorPrimary])

  useEffect(() => {
    draw()
  }, [draw])

  return (
    <canvas
      ref={canvasRef}
      width={400}
      height={700}
      className="mx-auto rounded-lg border border-border"
    />
  )
}

export function downloadCanvas(canvas: HTMLCanvasElement, filename: string) {
  const link = document.createElement('a')
  link.download = filename
  link.href = canvas.toDataURL('image/png')
  link.click()
}
