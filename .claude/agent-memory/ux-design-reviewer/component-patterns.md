---
name: OVV Component Patterns
description: Reused card patterns, glass-panel, stat-strip, school-color badge usage across platform
type: project
---

## glass-panel
- Defined in globals.css: backdrop-blur(24px), bg oklch(1 0 0 / 0.03), border oklch(1 0 0 / 0.06)
- Used on: demo account cards (login), role selector (register), sidebar active items, school tabs, facility cards, nil collective card, alumni cards, analytics panels, campaign tour gallery thumbnails

## stat-strip
- Defined in globals.css: flex, justify-center, dividers via ::before pseudo-element
- Used on: overview tab (school detail), academics tab, alumni tab, admin dashboard
- Issue: flex-wrap behavior can leave orphaned single stat in bottom row on certain viewport widths

## SchoolCard
- 3-part structure: gradient color band (h-28) → content area (p-5)
- Color band: bg is linear-gradient(colorPrimary, colorSecondary), watermark logo at opacity-20
- Conference badge: bottom-left of band, bg rgba(0,0,0,0.4) + backdrop-blur
- Hover: -translate-y-1, shadow-2xl shadow-black/30
- FavoriteButton: top-right of band, h-8 w-8 ghost icon
- Issue: h-28 color band is on the short side — feels cramped at mobile widths

## Section Labels (heading hierarchy pattern)
- Level 1 (page title): text-display text-4xl OR text-3xl font-black
- Level 2 (section): text-display text-3xl sm:text-4xl (landing) OR text-display text-sm tracking-[0.15em] text-muted-foreground (platform tabs)
- Level 3 (subsection): text-display text-xl (landing features) OR text-display text-xs tracking-[0.15em] (tab sub-sections)
- Issue: too many sections use the same "text-display text-sm tracking-[0.15em] text-muted-foreground" — all section labels look the same weight, no hierarchy within tabs

## Empty State Pattern
- Icon: h-14 w-14 rounded-xl bg-muted/50, icon h-7 w-7 text-muted-foreground
- Title: font-display text-sm font-semibold uppercase tracking-wide
- Desc: text-xs text-muted-foreground max-w-xs
- Used consistently across: alumni, nil, tour, school browser

## FavoriteButton
- ghost icon button h-8 w-8, Heart icon fills red-500 when favorited
- Touch target is 32px — below iOS 44pt minimum
- Placed on school card color band which has variable background — heart can be invisible against light school colors
