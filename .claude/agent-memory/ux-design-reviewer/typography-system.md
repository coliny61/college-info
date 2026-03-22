---
name: OVV Typography System
description: Oswald display font classes, label conventions, and typographic hierarchy
type: project
---

## Font Stack
- Display: Oswald (--font-display) — loaded via next/font
- Sans: Geist Sans (--font-geist-sans)
- Mono: Geist Mono (--font-geist-mono)

## Display Classes (globals.css)
- .text-hero — font-display, uppercase, font-weight 900, letter-spacing -0.04em, line-height 0.9 — for hero headings
- .text-display — font-display, uppercase, font-weight 700, letter-spacing -0.02em — for section headings
- .font-display — just sets the font family, no other treatment
- .text-scoreboard — font-display, tabular-nums, letter-spacing -0.04em — for all stat numbers

## Label Convention (consistent across codebase)
- Section labels above headings: text-[10px] uppercase tracking-[0.25em] text-emerald (or muted-foreground)
- Table/card headers: text-[10px] uppercase tracking-[0.15em] text-muted-foreground
- Conference badges: text-[10px] font-bold uppercase tracking-[0.15em]
- Nav items: font-display text-xs uppercase tracking-[0.1em]

## Known Issues (from Mar 2026 audit)
- Page h1s on Schools, Favorites, Profile use "text-3xl font-black tracking-tight" (Geist Sans) — inconsistent with text-display (Oswald) used on Dashboard, Admin
- form labels use "text-sm font-medium" (Geist) while the rest of the UI uses uppercase tracking labels
- Register page subtitle "Join OVV to start exploring." is weak — no specificity
