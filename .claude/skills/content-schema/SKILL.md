---
name: content-schema
description: Defines the exact MDX frontmatter schema for content/services/*.mdx, content/products/*.mdx, and content/prompts/*.mdx on the Silicon Tundra site. Use whenever adding, editing, or generating a service, product, or prompt entry, or building any component/page that reads from these collections — fields, types, and the fixed function/industry lists must match this schema exactly or the resource pages, services page, and [function]/[industry] routes will break.
---

# Content Schema — Services, Products & Prompts

All three collections live as one `.mdx` file per entry. Filenames are kebab-case slugs (services
and products use the slug as the filename; prompts can use a descriptive slug — see below).

## `content/services/*.mdx`

There are exactly four entries — one per Silicon Tundra service. `order` controls display order on
`/services` and in the home page preview cards; `slug` is the anchor id (`/services#<slug>`).

```yaml
---
title: string    # e.g. "The 24/7 Receptionist"
slug: string     # anchor id — one of: receptionist, agents, consulting, product-studio
order: number    # 1-4, controls display order
summary: string  # one sentence, used on home page preview cards
---

<full pitch for the service goes in the MDX body — this is what renders on the /services page>
```

Existing files: `24-7-receptionist.mdx`, `ai-agent-development.mdx`, `automation-consulting.mdx`,
`ai-product-studio.mdx`. Don't add a fifth service file without updating the home page preview
grid (currently assumes 4 cards) and the `Service` JSON-LD loop in `lib/seo.ts`.

## `content/products/*.mdx` and `content/prompts/*.mdx`

Filenames are kebab-case slugs and become the entry's URL slug (e.g.
`content/prompts/field-services-dispatch-brief.mdx` →
`/resources/prompts/operations/field-services-dispatch-brief` detail page, and listed on the
`operations` function page and the `field-services` industry page).

## `content/products/*.mdx`

```yaml
---
name: string              # Product/tool name, e.g. "Cal.com"
category: string          # e.g. "Scheduling", "Voice AI", "CRM" — keep categories short and reused
description: string       # 1-3 sentences, what it does
bestFor: string           # 1 sentence — who/what use case this fits
link: string (URL)        # official product URL
pros:
  - string
  - string
cons:
  - string
  - string
---
```

Body of the file (below frontmatter) can hold longer-form notes/commentary if useful, but the
listing/card UI should render from frontmatter fields only — don't require reading the MDX body to
populate the card grid.

## `content/prompts/*.mdx`

```yaml
---
title: string             # e.g. "Field Services Dispatch Brief"
function: string          # exactly one — MUST be from the fixed Function list below
industries:                # one or more — MUST be from the fixed Industry list below
  - field-services
useCase: string           # 1 sentence — when/why to use this prompt
tags:
  - string                # free-form, additional filter tags beyond function/industries
---

<prompt text goes in the MDX body, in a fenced code block or blockquote so the "Copy prompt"
button can target it cleanly>
```

### Fixed `function` list — do not deviate

Exactly one value per prompt. Each value maps 1:1 to a generated function landing route at
`/resources/prompts/[function]`, and prompt detail pages live under
`/resources/prompts/[function]/[slug]`. Adding a new value here means adding a new route — don't
introduce one casually. (The list lives in code at `lib/taxonomy.ts` (`FUNCTIONS`) — update both
together.)

| Value | Maps to |
|---|---|
| `operations` | Operations |
| `marketing` | Marketing |
| `sales` | Sales |

### Fixed `industries` list — do not deviate

One or more values per prompt. Each value maps 1:1 to a generated industry landing route at
`/resources/prompts/industries/[industry]`. Adding a new value here means adding a new route —
don't introduce one casually. (The list lives in code at `lib/taxonomy.ts` (`INDUSTRIES`) — update
both together.)

| Value | Maps to |
|---|---|
| `field-services` | Home, Commercial & Field Services |
| `real-estate` | Real Estate |
| `manufacturing` | Specialty Manufacturing & Industrial |
| `lifestyle-medicine` | Lifestyle Medicine |
| `logistics` | Logistics |
| `rentals-b2b` | Rentals & B2B Operations |
| `pet-care` | Animal & Pet Care |
| `agriculture` | Agriculture & Extraction |

A prompt can carry multiple industry values if it genuinely applies to more than one (e.g. a
generic "review request" prompt might apply to several) — the industry landing page for each value
should then include that entry.

## Adding a new entry

1. Create the `.mdx` file with the correct frontmatter shape above — validate every required field
   is present.
2. For prompts, confirm `function` is a single value from the fixed Function list, and every
   `industries` value is from the fixed Industry list.
3. No code changes needed for a new entry to appear — the content loader in `lib/content.ts` reads
   the whole directory. If a new field is genuinely needed, add it here first, then to the loader
   types, then backfill existing entries — don't add ad hoc fields to one file only.
