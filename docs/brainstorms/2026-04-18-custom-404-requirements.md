---
date: 2026-04-18
topic: custom-404-not-found-page
---

# Custom 404 Not-Found Page

## Problem Frame

Any non-existent URL — mistyped paths, removed writing slugs, broken shared links — currently falls through to Next.js's unstyled generic 404. The writing slug route already calls `notFound()` on missing posts, meaning this fallback is live and reachable today. A branded page keeps visitors inside the site and signals craft.

## Requirements

- R1. Create `app/not-found.tsx` as a server component (no `"use client"`).
- R2. Layout: full-viewport-height, centered vertically and horizontally using `min-h-screen flex flex-col items-center justify-center`. (Note: `app/error.tsx` uses this same layout but is a client component by Next.js requirement; `not-found.tsx` must remain a server component per R1 — do not copy its `"use client"` directive.)
- R3. Display `404` as a large numeral in DM Mono, muted color (`#6b6b6b` light / `#9a9a9a` dark), generous letter-spacing. Do not use the DM Sans hero-name treatment.
- R4. Display a short human message in DM Sans below the numeral: `"This page doesn't exist."` — plain, no punctuation variation.
- R5. Display a `← Home` link below the message in DM Mono: small, muted base color with proper dark-mode variant (`text-[#6b6b6b] dark:text-[#9a9a9a]`), hover accent matching the writing page's pattern (`hover:text-[#0f0f0f] dark:hover:text-[#f0f0f0]`). The writing page's `← Back` link omits a dark base color — this page must add it to satisfy R6.
- R6. Page respects the dark/light theme via Tailwind `dark:` classes; uses the site's background tokens (`#f3e7db` light / `#0f0f0f` dark).
- R7. No custom `metadata` export — Next.js App Router does not process metadata from `not-found.tsx`. The root layout's default title (`"Gabriele Clara Di Gioacchino — Software Developer"`) is acceptable for this edge-case route.

## Success Criteria

- Visiting any non-existent route renders the branded page, not the Next.js default.
- Visiting a non-existent writing slug (which calls `notFound()`) renders the branded page.
- Both dark and light themes render correctly with no FOUC.
- The page is visually consistent with `app/error.tsx` and `app/writing/page.tsx`.

## Scope Boundaries

- No `<Nav>` component — Nav requires an `onOpenCV` prop and is not in the root layout; the `← Home` link is the only exit affordance.
- No links to `/writing` or GitHub — deliberate; the site is minimal and a single home link is sufficient.
- No animation — the 404 numeral is static.
- No custom OG image — the global `og-image.png` from `app/layout.tsx` is sufficient for this edge-case route.

## Key Decisions

- **DM Mono for the numeral, not DM Sans:** Error codes are technical labels, not identity markers. DM Mono is already used for Nav labels and section headings; DM Sans is reserved for names and body copy.
- **Standalone layout (no Nav):** Follows the established pattern of `app/error.tsx` and `app/writing/page.tsx`. Including Nav would require threading `onOpenCV` state into a server component context.
- **Single exit link:** Minimalism is a core site value. Multiple navigation hints add noise on a dead-end page.

## Next Steps

-> `/ce:plan` for structured implementation planning
