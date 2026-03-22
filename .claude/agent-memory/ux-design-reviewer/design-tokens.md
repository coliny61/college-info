---
name: OVV Design Tokens
description: Color tokens, spacing, radius, and shadow conventions used across the platform
type: project
---

## Colors (oklch, dark-first)
- Background: oklch(0.09 0.005 260) — near-black with slight blue cast
- Card: oklch(0.12 0.005 260)
- Surface elevated: oklch(0.14 0.005 260)
- Primary (emerald): oklch(0.696 0.17 162.48) = #10B981
- Muted foreground: oklch(0.55 0 0) — used for labels, secondary text
- Border: oklch(1 0 0 / 8%) — nearly invisible white
- School colors set via CSS custom props: --school-primary, --school-secondary, --school-accent

## Border Radius
- --radius: 0.625rem (base)
- sm: calc(radius - 4px), md: calc(radius - 2px), lg: radius, xl: radius+4px, 2xl: +8px, 3xl: +12px, 4xl: +16px
- Dominant use: rounded-xl (school cards, glass panels), rounded-lg (table rows, inline elements), rounded-full (badges, avatar)

## Shadows
- No global shadow token — shadows applied contextually
- Hover: hover:shadow-2xl hover:shadow-black/30 (school cards)
- Jersey CTA hover: hover:shadow-xl hover:shadow-black/20
- Glass panel: backdrop-blur-[24px], bg oklch(1 0 0 / 0.03), border oklch(1 0 0 / 0.06)

## Spacing Patterns
- Page max-width: max-w-6xl (most pages), max-w-5xl (admin), max-w-2xl (profile/forms), max-w-3xl (about)
- Section padding: py-32 (landing sections), py-8 (tab content top), p-6 (card content)
- Platform main: p-6 (flat, no responsive variation — a known gap)
- Sidebar: w-64, top bar: h-16
