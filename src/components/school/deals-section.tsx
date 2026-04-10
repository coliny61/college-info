'use client'

import { useEffect, useRef } from 'react'
import { Badge } from '@/components/ui/badge'
import { Package, ExternalLink } from 'lucide-react'
import { useTrackEvent } from '@/hooks/use-analytics'

interface BrandPartner {
  id: string
  name: string
  slug: string
  logoUrl: string | null
  websiteUrl: string | null
  category: string
  description: string | null
}

interface SchoolBrandDeal {
  id: string
  brandPartnerId: string
  brandPartner: BrandPartner
  dealText: string
  promoCode: string | null
  promoUrl: string | null
  isActive: boolean
  isFeatured: boolean
  sortOrder: number
}

interface DealsSectionProps {
  deals: SchoolBrandDeal[]
  schoolId: string
  colorPrimary: string
}

export function DealsSection({ deals, schoolId, colorPrimary }: DealsSectionProps) {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackEvent = useTrackEvent()
  const hasTrackedView = useRef(false)

  // Track section view on viewport entry
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTrackedView.current) {
          hasTrackedView.current = true
          trackEvent('deals', 'view', schoolId)
        }
      },
      { threshold: 0.3 }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [schoolId, trackEvent])

  const handleDealClick = (deal: SchoolBrandDeal) => {
    trackEvent('deals', 'click_deal', schoolId, { brandId: deal.brandPartner.id, brandName: deal.brandPartner.name })
  }

  if (deals.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-muted/50 mb-4">
          <Package className="h-7 w-7 text-muted-foreground" />
        </div>
        <h3 className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
          Brand Partnerships Coming Soon
        </h3>
        <p className="mt-1.5 max-w-xs text-xs text-muted-foreground">
          Athlete deals and discounts will be available here soon.
        </p>
      </div>
    )
  }

  return (
    <div ref={sectionRef} className="animate-in-up">
      {/* Header with Influxor badge */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-xs text-muted-foreground">
          {deals.length} brand partnerships
        </span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground/60">
          Powered by Influxor
        </span>
      </div>

      {/* Deal cards grid */}
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
        {deals.map((deal) => (
          <div
            key={deal.id}
            className="glass-panel rounded-xl p-5 flex flex-col gap-3 transition-all hover:bg-white/[0.04]"
            style={deal.isFeatured ? { boxShadow: `inset 0 0 0 1px ${colorPrimary}40` } : undefined}
          >
            {/* Brand logo / placeholder */}
            <div className="flex items-center gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg"
                style={{ backgroundColor: colorPrimary + '15' }}
              >
                <Package className="h-5 w-5" style={{ color: colorPrimary }} />
              </div>
              <div>
                <p className="font-display text-sm font-semibold uppercase tracking-wide text-foreground">
                  {deal.brandPartner.name}
                </p>
                <Badge
                  variant="outline"
                  className="mt-0.5 text-[9px] uppercase tracking-wider"
                >
                  {deal.brandPartner.category}
                </Badge>
              </div>
            </div>

            {/* Deal text */}
            <p
              className="text-sm font-bold uppercase tracking-wide"
              style={{ color: colorPrimary }}
            >
              {deal.dealText}
            </p>

            {/* Promo code */}
            {deal.promoCode && (
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-wider text-muted-foreground">Code:</span>
                <span className="rounded-sm bg-white/[0.06] px-2 py-0.5 text-xs font-mono font-bold text-foreground">
                  {deal.promoCode}
                </span>
              </div>
            )}

            {/* Redeem button */}
            <div className="mt-auto pt-2">
              {deal.promoUrl ? (
                <a
                  href={deal.promoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => handleDealClick(deal)}
                  className="inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-xs font-medium uppercase tracking-wider text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: colorPrimary }}
                >
                  Redeem <ExternalLink className="h-3 w-3" />
                </a>
              ) : (
                <button
                  disabled
                  className="inline-flex items-center gap-1.5 rounded-lg bg-white/[0.06] px-4 py-2 text-xs font-medium uppercase tracking-wider text-muted-foreground cursor-not-allowed"
                >
                  Coming Soon
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
