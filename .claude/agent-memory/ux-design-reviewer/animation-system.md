---
name: OVV Animation System
description: Entrance animations, stagger delays, ambient animations across Stadium Dark design
type: project
---

## Entrance Animations
- .animate-in-up — fade-in-up 0.5s ease-out (translateY 16px → 0)
- .animate-in-fade — fade-in 0.4s ease-out
- .animate-in-right — slide-in-right 0.4s ease-out (translateX -12px → 0)
- Stagger: .delay-1 through .delay-8 (0.05s to 0.4s increments)

## Ambient / Looping
- .animate-float-slow — 8s translate drift loop (auth branding panel, hero section)
- .animate-drift — 12s subtle rotate + translate loop (hero diagonal slash, auth left panel slash)
- .animate-pulse-glow — opacity 0.4 ↔ 0.8, 3s (active step in onboarding wizard)
- .animate-shimmer — 3s linear shimmer for skeleton-like effects

## Notable Uses
- Landing hero: diagonal slash element with animate-drift at opacity-[0.04]
- Auth layout left panel: emerald gradient + drift slash (desktop only)
- School header: no ambient animation — static composite
- Onboarding wizard step indicator: active step gets animate-pulse-glow ring

## Issues Found (Mar 2026 audit)
- animate-in-up applied to static server components that never re-mount — only fires on initial page load, which is correct but creates jarring re-animation if user navigates and returns
- No scroll-based reveal used in platform pages (scroll-reveal class exists in globals.css but is not applied anywhere in the platform — only referenced in marketing)
- Tab content uses data-[state=active]:animate-in-fade which is good, but 0.4s feels sluggish for tab switching — 200ms would feel snappier
- Jersey builder has no entrance animation despite being a high-engagement, theatrical feature
