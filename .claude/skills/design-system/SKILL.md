---
name: design-system
description: Defines Silicon Tundra's visual design system — colors, typography, spacing, and component conventions. Use this whenever building, styling, or reviewing ANY page, layout, or UI component on this site, even if the user's request doesn't mention design, colors, or fonts by name (e.g. "add a pricing section," "build the resources page," "make a card for this"). Every visual decision on this site should trace back to this file instead of being invented fresh.
---

# Silicon Tundra Design System

Dark-mode-first brand, matching the white-on-black ST monogram lockup. Sharp, geometric, high
contrast, generous whitespace. When in doubt, favor restraint over decoration.

## Color tokens

Define these once in `tailwind.config.ts` under `theme.extend.colors`, and in `globals.css` as CSS
variables so they're usable outside Tailwind too (e.g. in inline SVGs).

| Token | Value | Usage |
|---|---|---|
| `background` | `#0A0A0A` | Page background. Never pure `#000` — it reads harsher than the brand intends. |
| `foreground` | `#F5F5F5` | Body/heading text. Never pure `#FFF`. |
| `muted` | `#8A8A8A` | Secondary text, captions, metadata. |
| `border` | `#232323` | Card borders, dividers. |
| `surface` | `#141414` | Card/panel backgrounds, one step lighter than `background`. |
| `accent` | `#3B9EFF` | Primary CTA color, links, active states, icon highlights. Icy blue, nods to "Tundra." |
| `accent-hover` | `#5FB4FF` | Hover/active state of `accent`. |

**Rule:** `accent` is used sparingly — CTAs, links, focus states, small highlights. It should never
dominate a section. If more than ~10% of a viewport is accent-colored, pull back.

## Typography

- Headings: **Space Grotesk** (via `next/font/google`) — geometric, matches the angular ST mark.
- Body: **Inter** (via `next/font/google`) — neutral workhorse, high legibility at small sizes.
- Load both once in `app/layout.tsx`, expose as CSS variables (`--font-heading`, `--font-body`),
  reference them in `tailwind.config.ts` `fontFamily`.
- Heading weight: 600–700. Body weight: 400, 500 for emphasis.
- Don't introduce a third typeface without updating this file.

## Shape language

- Minimal border-radius — `rounded-sm` (2–4px) on cards/buttons, not `rounded-lg`/`rounded-xl`.
  The brand mark is angular; soft rounded UI fights it.
- 1px borders (`border-border`) rather than heavy shadows to separate cards from background.
- Generous section padding — don't cramp sections; the hero and CTA bands especially should feel
  spacious, not dense.

## Component conventions

Build these once in `components/ui/` and reuse everywhere. Do not create one-off styled divs that
duplicate what these should do:

- **`Container`** — max-width wrapper (e.g. `max-w-6xl mx-auto px-6`), used inside every `Section`.
- **`Section`** — vertical rhythm wrapper (e.g. `py-20 md:py-28`), optional `variant` for
  `surface`-background sections (alternating background creates visual separation between page
  sections without needing dividers).
- **`Button`** — variants: `primary` (accent background, dark text), `secondary` (bordered,
  transparent), `ghost` (text-only). Every primary CTA on the site ("Book a Discovery Call," "Join
  the list," form submits) uses the same `Button` component — never a raw `<a>`/`<button>` styled
  inline.
- **`Card`** — `surface` background, `border` outline, `rounded-sm`, consistent padding. Used for
  service cards, product cards, prompt cards — one component, not three near-duplicates.
- **`Badge`** — small pill for tags (e.g. vertical tags on prompts: "Med Spa," "TRT," etc.) —
  outlined, `accent` text on transparent/`surface` background.

## Do / Don't

- Do reuse `components/ui/` primitives everywhere; don't hand-roll new button/card styles per page.
- Do keep `accent` usage sparse and intentional; don't tint whole sections accent-blue.
- Do use the provided logo lockups from `public/images/brand/` (light-on-dark for this theme);
  don't recolor or redraw the logo.
- Do maintain WCAG AA contrast (foreground on background comfortably passes; double-check any text
  placed directly on `accent`).
