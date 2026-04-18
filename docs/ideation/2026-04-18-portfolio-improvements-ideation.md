---
date: 2026-04-18
topic: portfolio-improvements
focus: UX clarity, frontend maintainability, mobile responsiveness, accessibility, loading/perceived performance, SEO basics
---

# Ideation: Portfolio — 10 Highest-Leverage Improvements

## Codebase Context

**Project:** Personal portfolio for Gabriele Clara Di Gioacchino (gabboclaa). Next.js 16 App Router, TypeScript strict, Tailwind CSS 3, MDX writing section, Vercel deployment.

**Key components:**
- `Hero.tsx` — name scramble animation, DotGrid canvas (event-driven, no RAF), CursorGlow (transform, not left/top), inline SVG social icons
- `Projects.tsx` — 527 lines, 5 hardcoded project objects + artworks, inline expandable rows, next/image thumbnails
- `Nav.tsx` — fixed nav, left/right clusters, theme toggle
- `MusicPlayer.tsx` — floating, dynamically imported with `ssr: false`
- `CVModal.tsx` — PDF viewer, focus trap, dynamically imported with `ssr: false`
- `Writing` — server-rendered MDX, only `hello-world.mdx` placeholder exists
- `Skills.tsx` — complete `"use client"` component with 5 category tabs, **not mounted anywhere**
- `Footer.tsx` — receives `postCount` prop from server

**Known pain points:**
- `Projects.tsx` is 527 lines with hardcoded data objects and artworks mixed into JSX
- Color hex strings (`#0f0f0f`, `#bd864b`, `#f3e7db`, `#6b6b6b`) duplicated across `MusicPlayer.tsx`, `Hero.tsx`, `Projects.tsx`, and `globals.css` — no single source of truth
- Only `hello-world.mdx` exists — writing section has no real content despite full SEO infrastructure being live
- No `app/not-found.tsx` — `writing/[slug]/page.tsx` already calls `notFound()`, so this path is reachable
- `Skills.tsx` is dead code — exists but not rendered
- Project thumbnails use `next/image` with `loading="lazy"` but no `placeholder="blur"` or `blurDataURL`
- GitHub and LinkedIn SVGs duplicated verbatim in both `Hero.tsx` and `Footer.tsx`
- Project rows are `<div onClick={...}>` — no `role`, `tabIndex`, or `onKeyDown` (WCAG 2.1 Level A failure)
- `app/sitemap.ts` generates writing routes without `lastModified` despite `getAllPosts()` already returning `date`

**No institutional learnings found** — `docs/solutions/` does not yet exist.

---

## Ranked Ideas

### 1. Extract Projects Data to a Typed Config File
**Description:** Move the 5 hardcoded project objects out of `Projects.tsx` into `lib/projects.ts` with a typed `Project` interface. The component becomes a pure renderer importing and mapping over the data. Artworks (inline SVG/strings) can move to a companion `lib/projects-artwork.ts` if needed.  
**Rationale:** Highest structural leverage available. Collapses a 527-line component, makes adding/reordering projects a safe data edit rather than a component surgery, and opens the path to CMS integration or MDX-per-project later. All future project maintenance becomes faster.  
**Downsides:** Mild refactor risk if artworks are interleaved with data objects. Types must be kept tight to avoid runtime surprises.  
**Confidence:** 95%  
**Complexity:** Low (1–2h)  
**Status:** Unexplored

---

### 2. Centralize Design Tokens in Tailwind Config
**Description:** Extract all repeated hex strings from component files into named Tailwind theme tokens (`ink`, `highlight`, `warm-bg`, `muted`, `accent`, `border-light`, `border-dark`). Replace raw hex usage in `style={}` props with CSS custom properties from the theme.  
**Rationale:** Multiplies the value of every future styling change. A color rename is currently a grep-and-replace across 6+ files with no type safety. Named tokens make consistency bugs structurally impossible and reduce cognitive load when reading component code.  
**Downsides:** Inline `style={}` props in `MusicPlayer.tsx` (which needs exact hex for the floating shell) may need to use CSS vars rather than Tailwind classes — requires careful handling.  
**Confidence:** 92%  
**Complexity:** Low (1–2h)  
**Status:** Unexplored

---

### 3. Fix Keyboard Navigation in Projects List
**Description:** Project rows in `Projects.tsx` are `<div onClick={...}>` with no `role`, `tabIndex`, or `onKeyDown` handler. Add `role="button"`, `tabIndex={0}`, and `onKeyDown` (Enter/Space triggers the same handler as click) to every expandable row.  
**Rationale:** This is a **WCAG 2.1 Level A failure** — keyboard-only users cannot expand any project. The projects section is the core portfolio content. Recruiters and hiring managers using keyboard navigation or assistive technology cannot access it at all.  
**Downsides:** None — purely additive. No visual change.  
**Confidence:** 90%  
**Complexity:** Very Low (<1h)  
**Status:** Unexplored

---

### 4. Mount Skills.tsx on the Homepage
**Description:** Import and render `Skills.tsx` in `HomeClient.tsx`. Audit the 5 skill categories for accuracy before surfacing. Place it between Projects and Footer, or as a collapsible section matching the Projects interaction model.  
**Rationale:** Zero new code required. The component is complete with mobile tab state. Skills are among the highest-read sections for recruiters. A fully built component invisible to every visitor is pure wasted work.  
**Downsides:** Content accuracy must be verified before mounting — stale skill claims visible to recruiters could be worse than no section at all.  
**Confidence:** 88%  
**Complexity:** Very Low (<30min to wire up; variable for content audit)  
**Status:** Unexplored

---

### 5. Add a Custom 404 Not-Found Page
**Description:** Create `app/not-found.tsx` with the site's nav, a short branded message, and a link back to home. Next.js App Router picks it up automatically. The writing slug route already calls `notFound()` on missing slugs — this fallback is live and reachable right now.  
**Rationale:** Any broken link, mistyped URL, or removed writing slug currently hits Next.js's unstyled generic 404, breaking visual identity and offering no exit. A branded page signals craft and keeps users inside the site.  
**Downsides:** None — ~30 lines, no risk.  
**Confidence:** 95%  
**Complexity:** Very Low (<30min)  
**Status:** Explored — implemented 2026-04-18. See `docs/brainstorms/2026-04-18-custom-404-requirements.md`.

---

### 6. Add Aria-Labels to Icon-Only Social Links
**Description:** Audit and add explicit `aria-label` attributes to the GitHub, LinkedIn, and Mail icon anchors in `Hero.tsx` and `Footer.tsx`. Each label should describe the platform and destination (e.g., `aria-label="GitHub profile"`, `aria-label="Email gabrieleclara01@gmail.com"`).  
**Rationale:** Screen reader users hear "link" with no context for icon-only anchors without `aria-label`. This is a WCAG 2.1 Level A gap on the most prominent contact affordances on the page. CLAUDE.md acknowledges aria labels are sparse in some areas.  
**Downsides:** None — purely additive.  
**Confidence:** 90%  
**Complexity:** Very Low (<20min)  
**Status:** Unexplored

---

### 7. Add Blur Placeholders to Project Thumbnails
**Description:** Generate base64 LQIP (low-quality image placeholder) blur data URIs for each of the 5 project images (via `plaiceholder` at build time or a one-off script) and pass them as `placeholder="blur"` + `blurDataURL` to the `next/image` instances in `Projects.tsx`.  
**Rationale:** Currently expanding a project row causes a flash of empty space before the thumbnail loads. This is the most visually jarring moment in the portfolio on slower connections. A blur-in feels intentional and polished; the flash feels broken.  
**Downsides:** Requires a one-time blur generation step. `plaiceholder` adds a dev dependency; alternatively, blur URIs can be hand-crafted and inlined as constants.  
**Confidence:** 88%  
**Complexity:** Low (~1h including blur generation)  
**Status:** Unexplored

---

### 8. Consolidate GitHub/LinkedIn SVGs into Icon Components
**Description:** Move the GitHub and LinkedIn inline SVGs (duplicated verbatim in `Hero.tsx` and `Footer.tsx`) into `components/icons/GitHubIcon.tsx` and `components/icons/LinkedInIcon.tsx`, each accepting a `className` prop for size and color control.  
**Rationale:** CLAUDE.md explicitly documents "keep them in sync" as a manual requirement — that's a documented maintenance tax. A single source eliminates accidental drift and makes any future SVG update (e.g., GitHub changes their logo) a one-file change.  
**Downsides:** Purely mechanical refactor. Must preserve any `aria-hidden` or `aria-label` attributes correctly on both sides.  
**Confidence:** 92%  
**Complexity:** Very Low (<30min)  
**Status:** Unexplored

---

### 9. Write 1–2 Real MDX Posts
**Description:** Replace `hello-world.mdx` with at least one substantive post using the existing frontmatter schema (`title`, `date`, `description`, `tags`). Strong candidates: Martian Terrain Segmentation retrospective, a technical decision writeup, or a short essay matching the "I ask why before how" voice.  
**Rationale:** The writing section, sitemap, JSON-LD Article schema, `postCount` prop, and GSC sitemap submission are all live infrastructure waiting for content. Real posts activate indexable SEO signal, make "I write things ↗" credible to visitors, and give the Footer's post count meaningful value.  
**Downsides:** This is writing work, not coding work. Effort varies entirely by author and topic chosen.  
**Confidence:** 85%  
**Complexity:** Low–Medium (writing-dependent; code infrastructure is already complete)  
**Status:** Unexplored

---

### 10. Add `lastModified` Dates to Sitemap
**Description:** Extend `app/sitemap.ts` to include `lastModified` per writing route by reading the `date` frontmatter field already returned by `getAllPosts()`. Static routes (`/`, `/writing`) can use a hardcoded approximation or the most recent post date.  
**Rationale:** Google uses `lastModified` to prioritize recrawl scheduling. The sitemap is already submitted to Google Search Console — adding dates costs ~5 lines of code and improves crawl efficiency at zero runtime cost. The data is already available from the existing MDX pipeline.  
**Downsides:** `date` frontmatter represents publish date, not last-edit date — minor semantic imprecision, but better than omitting it entirely.  
**Confidence:** 88%  
**Complexity:** Very Low (~15min)  
**Status:** Unexplored

---

## Rejection Summary

| # | Idea | Reason Rejected |
|---|------|-----------------|
| 1 | MusicPlayer track/mute state persistence | Low visitor impact on a single-page portfolio; nice-to-have |
| 2 | generateStaticParams + explicit revalidation | Already Next.js App Router default for server components with static filesystem content |
| 3 | Dynamic OG images via next/og | Effort too high given current single-post situation; revisit once writing section is populated |
| 4 | Font subsets audit | `next/font/google` already optimizes subsets; likely a no-op |
| 5 | CSS transition scope guard | Zero user value — a defensive comment, not a product change |
| 6 | Replace postCount prop with static badge | Opinion, not an objective improvement; revisit after real posts exist |
| 7 | Reduced-motion: remove post-scramble delay | Extremely narrow; affects almost no users and has no visible symptom for typical visitors |
| 8 | Hero font preload audit | `next/font` already emits preload hints automatically |
| 9 | MusicPlayer loading skeleton CLS audit | Edge case; not observable on typical connection speeds |
| 10 | loading.tsx skeletons for writing routes | Premature with no real content; Vercel edge cold starts are fast enough |
| 11 | Preconnect/dns-prefetch for YouTube | Loses top-10 slot to sitemap lastModified which has higher SEO leverage for less effort |

---

## Session Log

- 2026-04-18: Initial ideation — 4 parallel agents (user friction, inversion/automation, assumption-breaking, leverage/compounding), ~21 raw candidates generated, 11 rejected, 10 survived. Volume override: user requested top 10.
- 2026-04-18: Idea #5 (Custom 404 page) brainstormed and implemented. `app/not-found.tsx` created.
