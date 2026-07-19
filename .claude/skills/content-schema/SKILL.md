---
name: content-schema
description: Defines the exact MDX frontmatter schema for content/services/*.mdx, content/products/*.mdx, and content/prompts/*.mdx on the Silicon Tundra site. Use whenever adding, editing, or generating a service, product, or prompt entry, or building any component/page that reads from these collections — fields, types, and the fixed vertical-tag list must match this schema exactly or the resource pages, services page, and [vertical] routes will break.
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
`content/prompts/reactivation-campaign-med-spa.mdx` → `/resources/prompts/med-spas` listing,
individual slug if detail pages get built later).

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
title: string             # e.g. "No-Show Reactivation Follow-Up"
vertical:                 # one or more — MUST be from the fixed list below
  - med-spa
useCase: string           # 1 sentence — when/why to use this prompt
tags:
  - string                # free-form, additional filter tags beyond vertical
---

<prompt text goes in the MDX body, in a fenced code block or blockquote so the "Copy prompt"
button can target it cleanly>
```

### Fixed `vertical` tag list — do not deviate

Only these five values are valid. Each one maps 1:1 to a generated route at
`/resources/prompts/[vertical]`. Adding a new tag value here means adding a new route — don't
introduce a sixth tag casually.

| Tag value | Maps to |
|---|---|
| `iv-wellness` | IV Wellness Clinics |
| `trt` | TRT / Men's Health Clinics |
| `chiropractic` | Chiropractors |
| `dental-ortho` | Dental / Orthodontic Offices |
| `med-spa` | Med Spas |

A prompt can carry multiple vertical tags if it genuinely applies to more than one (e.g. a generic
"review request" prompt might apply to all five) — the `[vertical]` page for each tag should then
include that entry.

## Adding a new entry

1. Create the `.mdx` file with the correct frontmatter shape above — validate every required field
   is present.
2. For prompts, confirm every `vertical` value is from the fixed list.
3. No code changes needed for a new entry to appear — the content loader in `lib/content.ts` reads
   the whole directory. If a new field is genuinely needed, add it here first, then to the loader
   types, then backfill existing entries — don't add ad hoc fields to one file only.
