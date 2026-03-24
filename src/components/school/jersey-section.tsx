import Link from 'next/link'
import { Shirt, ArrowRight } from 'lucide-react'

interface JerseySectionProps {
  schoolSlug: string
  colorPrimary: string
  hasAssets: boolean
  isPublic?: boolean
}

export function JerseySection({ schoolSlug, colorPrimary, hasAssets, isPublic = false }: JerseySectionProps) {
  if (!hasAssets) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted/50 mb-4">
          <Shirt className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
          Jersey Builder Coming Soon
        </h3>
        <p className="mt-1.5 max-w-xs text-xs text-muted-foreground">
          The jersey builder is not yet available for this school.
        </p>
      </div>
    )
  }

  return (
    <Link
      href={isPublic ? '/register' : `/recruit/school/${schoolSlug}/jersey`}
      className="group block"
    >
      <div
        className="relative overflow-hidden rounded-xl p-8 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl hover:shadow-black/20"
        style={{
          background: `linear-gradient(135deg, ${colorPrimary}25, ${colorPrimary}08)`,
          border: `1px solid ${colorPrimary}25`,
        }}
      >
        {/* Watermark */}
        <div className="pointer-events-none absolute -right-4 top-1/2 -translate-y-1/2 select-none font-display text-[6rem] font-black uppercase leading-none tracking-tighter opacity-[0.04]">
          JERSEY
        </div>

        <div className="relative flex items-center justify-between gap-3">
          <div className="flex items-center gap-4 min-w-0">
            <div
              className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl"
              style={{ backgroundColor: colorPrimary + '25' }}
            >
              <Shirt className="h-7 w-7" style={{ color: colorPrimary }} />
            </div>
            <div className="min-w-0">
              <h3 className="font-display text-lg font-bold uppercase tracking-wide text-foreground">
                Jersey Room
              </h3>
              <p className="mt-0.5 text-sm text-muted-foreground">
                Mix and match helmets, jerseys, and pants — download your dream uniform
              </p>
            </div>
          </div>
          <ArrowRight className="h-5 w-5 shrink-0 text-muted-foreground transition-all group-hover:translate-x-1.5 group-hover:text-foreground" />
        </div>
      </div>
    </Link>
  )
}
