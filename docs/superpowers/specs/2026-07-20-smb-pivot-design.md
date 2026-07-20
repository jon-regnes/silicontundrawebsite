# Silicon Tundra — SMB Pivot & Prompt Library Restructure

**Date:** 2026-07-20
**Status:** Approved design, pending spec review

## Overview

Silicon Tundra is pivoting its positioning from *lifestyle medicine only* to *all small- and
medium-sized businesses*, across eight industry sectors. The **services do not change** and the
**core premise stays the same** — only the audience widens and the prompt library is restructured
to match.

The prompt library moves from a single industry-vertical dimension to a **two-dimensional matrix**:
every prompt is tagged with one **function** (operations / marketing / sales) and one-or-more
**industries** (eight sectors). Implemented as **Approach A** — two sets of flat landing pages
(function pages + industry pages) with cross-linking and cross-filtering, rather than nested
per-cell combo routes. This captures the long-tail SEO ("marketing prompts for real estate")
through on-page copy and cross-links without the thin-content risk of 24 auto-generated combo
pages.

## Locked decisions

1. **Matrix, Approach A** — flat function pages + flat industry pages, cross-linked. No nested
   `/[industry]/[function]` combo routes in this phase (possible phase 2).
2. **8 industries × 3 functions.**
3. **Fresh seed set** — retire all 56 existing lifestyle-medicine prompts; write a new set
   (~24–30) spanning every function for every industry.
4. **Core tagline** → "Automated workflows + smarter tools = more time to focus on what your
   business does best."
5. **Terminology** — the ambiguous term "vertical" is retired in favor of "industry" and
   "function."

## Taxonomy

### Functions (3)

| slug | label |
|---|---|
| `operations` | Operations |
| `marketing` | Marketing |
| `sales` | Sales |

### Industries (8)

| slug | label |
|---|---|
| `field-services` | Home, Commercial & Field Services |
| `real-estate` | Real Estate |
| `manufacturing` | Specialty Manufacturing & Industrial |
| `lifestyle-medicine` | Lifestyle Medicine |
| `logistics` | Logistics |
| `rentals-b2b` | Rentals & B2B Operations |
| `pet-care` | Animal & Pet Care |
| `agriculture` | Agriculture & Extraction |

## Prompt frontmatter schema (new)

Replaces the old `vertical: [...]` array. Each prompt file carries:

```yaml
---
title: "Real Estate Listing Launch"
function: marketing            # exactly one: operations | marketing | sales
industries:                    # one or more of the 8 industry slugs
  - real-estate
useCase: "Turn property details into an MLS description plus social captions."
tags:
  - listings
  - social
---

```text
<the prompt text, in a fenced code block as today>
```
```

- `function` is single-valued (drives the canonical detail URL).
- `industries` is an array (a prompt may serve several sectors; e.g. a review-request prompt).
- Prompt text is still extracted from the first fenced code block in the body.

## URL structure

| Route | Purpose | Source |
|---|---|---|
| `/resources/prompts` | Overview grid, two-axis filter | rewritten `prompts/page.tsx` |
| `/resources/prompts/[function]` | Function landing (e.g. `/marketing`), filter by industry | repurposed `[vertical]/page.tsx` → `[function]/page.tsx` |
| `/resources/prompts/[function]/[slug]` | Prompt detail (canonical) | repurposed `[vertical]/[slug]` → `[function]/[slug]` |
| `/resources/prompts/industries/[industry]` | Industry landing (e.g. `/industries/real-estate`), filter by function | NEW route |

- Canonical prompt URL = `/resources/prompts/[function]/[slug]` (function is single-valued, so
  the URL is unique and stable).
- Industry pages link to each prompt at its canonical function URL.
- Both function and industry pages are indexable and included in the sitemap.

## Prompt content plan

Fresh set of 24 core prompts — one per function per industry — plus a handful of genuinely
cross-industry prompts (tagged to multiple industries) so industry pages don't look sparse.
Target ~24–30 total.

Core matrix (industry × function):

| Industry | Operations | Marketing | Sales |
|---|---|---|---|
| Field Services | Technician daily route/dispatch brief | Seasonal service-reminder campaign | Estimate follow-up on a pending quote |
| Real Estate | Transaction milestone / closing-coordination update | Listing launch: MLS description + social captions | New-lead follow-up sequence |
| Manufacturing & Industrial | Shift handoff / production-run status summary | Spec-sheet-to-product-page copy | RFQ response / quote cover note |
| Lifestyle Medicine | New-patient intake reminder | Treatment / seasonal promo campaign | Consult-to-booking follow-up |
| Logistics | Shipment exception / delay notification | Lane / capacity availability announcement | New-shipper prospect outreach |
| Rentals & B2B Ops | Rental return / overdue reminder | Off-season availability promo | Rental-inquiry quote follow-up |
| Animal & Pet Care | Appointment / vaccination reminder | Seasonal service promo (grooming, boarding) | New-client welcome / package upsell |
| Agriculture & Extraction | Field / equipment status log summary | Direct-to-buyer / seasonal supply update | Wholesale buyer outreach |

Optional cross-industry flagships (tagged to several industries), e.g.:
- Operations: "Missed-call-to-text recovery" (field-services, pet-care, lifestyle-medicine)
- Marketing: "Google review request" (most B2C industries)
- Sales: "Cold-lead reactivation" (most industries)

Each prompt uses `[BRACKETED]` placeholders as the current prompts do.

## Components & filtering UX

- **`lib/verticals.ts` → `lib/taxonomy.ts`** — exports `INDUSTRIES`, `FUNCTIONS`, `Industry`,
  `PromptFunction` types (named `PromptFunction`, not `Function`, to avoid shadowing the global
  `Function` type), and `isIndustry` / `isFunction` guards.
- **`lib/content.ts`** — `Prompt` type gains `function: PromptFunction` and
  `industries: Industry[]` (drops `vertical`); add `getPromptsByFunction()` and
  `getPromptsByIndustry()`.
- **`PromptGrid`** — two filter controls: function tabs + an industry filter. Selecting both
  narrows to the intersection.
- **`PromptCard`** — shows the function badge plus capped industry badges (reuses the existing
  "+N more" cap via the shared badge component; `VerticalBadges` → `IndustryBadges`).
- **Prompt detail page** — lists the single function and all industries in full (no cap).
- **Home `ResourcesTeaser` / `pickFeaturedPrompts`** — pick a spread across functions/industries
  instead of across the old verticals.

## Positioning & copy changes (services unchanged)

- **Hero** (`components/home/Hero.tsx`): H1 and subhead broaden from lifestyle-medicine language
  to SMBs across the eight sectors; new tagline applied.
- **`lib/seo.ts` `SITE_DESCRIPTION`** and default metadata: broaden audience wording.
- **`HowItWorks`** and any "patient care" phrasing: apply the new tagline / broader wording.
- **Consulting service** (`content/services/automation-consulting.mdx`): the audience sentence
  currently naming med spas/chiropractors/etc. widens to the eight sectors. The four services and
  their structure are otherwise unchanged.
- **Testimonial**: Mendota Health quote stays — it's an operations/automation story that fits the
  broader pitch.
- **`public/llms.txt`**: rewrite the audience summary and the prompt-library section (function +
  industry links) to the new taxonomy.

## Infrastructure

- **`app/sitemap.ts`** — enumerate the 3 function pages, 8 industry pages, and all prompt detail
  pages (at canonical function URLs).
- **`.claude/skills/content-schema/SKILL.md`** — replace the fixed `vertical` list with the new
  `function` + `industries` schema and the industry/function value tables.
- **`.claude/skills/seo-aeo/SKILL.md`** — update references from the five medical verticals to the
  new function/industry landing-page structure.
- **`app/robots.ts`** — no change expected.

## Retired

- All 56 files in `content/prompts/` (medical-specific) are deleted and replaced by the fresh set.
- The `vertical` frontmatter field and the `VERTICALS` map / `Vertical` type are removed.
- `/resources/prompts/[vertical]` semantics (the eight medical verticals) are gone; the route
  files are repurposed for `[function]`.

## Out of scope (this phase)

- Nested per-cell combo routes (`/resources/prompts/[industry]/[function]`) — deferred to a
  possible phase 2 (Approach C) once content depth justifies specific combo pages.
- Any change to the four services' scope or the Products library.
- Vercel/GitHub deployment (separate, already-tracked next step).

## File-by-file change summary

**Rename/rewrite**
- `lib/verticals.ts` → `lib/taxonomy.ts`
- `app/resources/prompts/[vertical]/page.tsx` → `[function]/page.tsx`
- `app/resources/prompts/[vertical]/[slug]/page.tsx` → `[function]/[slug]/page.tsx`
- `components/resources/VerticalBadges.tsx` → `IndustryBadges.tsx`

**New**
- `app/resources/prompts/industries/[industry]/page.tsx`
- `content/prompts/*.mdx` (fresh set)

**Edit**
- `lib/content.ts`, `lib/seo.ts`
- `app/resources/prompts/page.tsx`, `app/page.tsx`, `app/sitemap.ts`
- `components/resources/PromptGrid.tsx`, `PromptCard.tsx`
- `components/home/ResourcesTeaser.tsx`, `Hero.tsx`, `HowItWorks.tsx`
- `content/services/automation-consulting.mdx`
- `public/llms.txt`
- `.claude/skills/content-schema/SKILL.md`, `.claude/skills/seo-aeo/SKILL.md`

**Delete**
- The 56 existing `content/prompts/*.mdx` files
