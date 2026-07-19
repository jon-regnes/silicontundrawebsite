# Silicon Tundra — Marketing Site

AI & automation partner for lifestyle medicine businesses. Built with Next.js (App Router),
TypeScript, and Tailwind CSS. Content (services, products, prompts) lives as MDX files in
`/content` — no CMS.

Full architecture and build spec: [silicon-tundra-architecture.md](./silicon-tundra-architecture.md)

## Getting started

```bash
npm install
cp .env.local.example .env.local   # fill in real keys
npm run dev
```

## Project layout

- `app/` — routes (App Router). Home, `/services`, `/resources` (products + prompts), `/contact`.
- `components/ui/` — shared primitives (`Button`, `Card`, `Section`, `Container`, `Badge`). Use
  these; don't hand-roll one-off styles.
- `content/` — MDX collections. Schema rules live in `.claude/skills/content-schema/SKILL.md`.
- `lib/` — content loader (`content.ts`), SEO/JSON-LD builders (`seo.ts`).
- `.claude/skills/` — project skills: design system, content schema, SEO/AEO checklist, deploy.

## Deploying

Use the `/deploy` skill (lint + build locally, commit, push to `main`; Vercel auto-deploys).
Never commit `.env.local`.
