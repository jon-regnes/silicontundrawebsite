# Silicon Tundra — Website Architecture & Build Spec

> Purpose: this file is a build brief for Claude Code. It describes the full site architecture,
> page-by-page requirements, integrations, and SEO/AEO strategy for the Silicon Tundra marketing
> site. Treat each `## Page:` section as a discrete implementation task.

---

## 1. Overview

**Company:** Silicon Tundra — AI & automation partner for lifestyle medicine businesses (med spas,
plastic surgery practices, chiropractors, dental/orthodontic offices, IV wellness clinics, men's
health/TRT clinics).

**Positioning statement (homepage hero theme):**
> Silicon Tundra is the AI and Automation Navigator for Lifestyle Medicine.
> Automated workflows + smarter tools = more time to focus on patient care.

**Primary goals of the site:**
1. Convert visiting practice owners/operators into booked discovery calls.
2. Rank organically (SEO) and get cited by AI answer engines (AEO) for queries like
   "AI receptionist for med spas," "automation consultant for chiropractic clinics," etc.
3. House a growing library of resources (researched products + plug-and-play prompts) that
   attracts organic traffic and builds authority.

**Brand assets:** ST monogram + "SILICON TUNDRA" wordmark, provided in both black-on-white and
white-on-black lockups (see `/public/images/brand/`). Clean, geometric, high-contrast — the design
system below leans into that.

---

## 2. Tech Stack

| Layer | Choice | Why |
|---|---|---|
| Framework | **Next.js 14+ (App Router)**, TypeScript | Best-in-class SEO controls (metadata API, streaming, ISR), pairs natively with Vercel |
| Styling | **Tailwind CSS** | Fast to iterate, easy for Claude Code to generate consistent utility classes |
| Content | **MDX content collections** (services, products, prompts) stored as files in `/content` | Git-based, no CMS account needed, Claude Code can bulk-generate/edit entries |
| Booking | **Cal.com**, embedded, synced to Google Workspace calendar | Open-source, free tier, native Google Calendar 2-way sync, embeddable widget or hosted link |
| Email capture | **Kit (formerly ConvertKit)** — see §7.2 for rationale | Simple REST API, generous free tier, built for tagging/automation which fits an automation-first brand |
| Contact form delivery | **Resend** + a Next.js API route | Clean DX, generous free tier, reliable deliverability, easy to wire to a "send to my inbox" flow |
| Hosting | **Vercel** | Matches stated deploy path; zero-config Next.js hosting, previews on every PR |
| Analytics | **Vercel Analytics** + Google Search Console | Privacy-friendly, zero extra script weight; Search Console for indexing/AEO monitoring |
| Version control | **GitHub**, local dev → commit → push → Vercel auto-deploy | As specified |

---

## 3. Project Structure

```
silicontundrawebsite/
├── app/
│   ├── layout.tsx                # Root layout: <html>, fonts, nav, footer, JSON-LD org schema
│   ├── page.tsx                  # Home
│   ├── globals.css
│   ├── sitemap.ts                # Dynamic sitemap (includes all MDX content routes)
│   ├── robots.ts
│   ├── services/
│   │   └── page.tsx
│   ├── resources/
│   │   ├── page.tsx              # Resources landing — links into the two subsections
│   │   ├── products/
│   │   │   ├── page.tsx          # Full researched-products listing
│   │   │   └── [slug]/page.tsx   # Individual product detail (optional, phase 2)
│   │   └── prompts/
│   │       ├── page.tsx          # All prompts + vertical filter
│   │       └── [vertical]/page.tsx  # e.g. /resources/prompts/med-spas — SEO landing per vertical
│   ├── contact/
│   │   └── page.tsx
│   └── api/
│       ├── contact/route.ts      # Validates + sends via Resend
│       └── newsletter/route.ts   # Subscribes email to Kit
├── components/
│   ├── layout/                   # Header, Footer, MobileNav
│   ├── home/                     # Hero, ServicesPreview, Testimonial, BookingCTA, EmailCapture
│   ├── services/                 # ServiceCard, ServiceDetail
│   ├── resources/                # ProductCard, PromptCard, VerticalFilter
│   ├── contact/                  # ContactForm
│   └── ui/                       # Button, Container, Section, Badge — shared primitives
├── content/
│   ├── services/                 # 4 .mdx files, one per service (see §5.2)
│   ├── products/                 # one .mdx per researched product/tool
│   └── prompts/                  # one .mdx per prompt, frontmatter includes `vertical` tag(s)
├── lib/
│   ├── content.ts                # MDX loader/parser helpers (gray-matter + next-mdx-remote)
│   ├── email.ts                  # Resend + Kit client wrappers
│   └── seo.ts                    # metadata() helpers, JSON-LD builders (Organization, FAQPage, Service)
├── public/
│   ├── images/brand/              # logo lockups (black/white), favicon, og-image
│   └── llms.txt                   # AEO: plain-language summary of the site for LLM crawlers
├── .env.local.example
├── next.config.js
├── tailwind.config.ts
├── package.json
└── README.md
```

---

## 4. Design System

- **Theme:** dark-mode-first, matching the white-on-black logo lockup. Near-black background
  (`#0A0A0A`), off-white text (`#F5F5F5`), not pure black/white (avoids harsh contrast).
- **Accent color:** a cold, icy blue to play off "Tundra" — e.g. `#4FD1FF` / `#3B9EFF` range.
  Used sparingly: CTAs, links, active states, chart/icon accents.
- **Typography:** geometric sans for headings (e.g. **Space Grotesk** or **Sora**), a clean
  workhorse sans for body copy (e.g. **Inter**). Both free via `next/font/google`.
- **Shape language:** sharp edges / minimal rounding on cards and buttons, echoing the angular ST
  monogram. Generous whitespace, confident large type on the hero.
- **Components:** build a small set of primitives (`Section`, `Container`, `Button`, `Card`,
  `Badge`) once in `components/ui/` and reuse everywhere — keeps Claude Code consistent across pages.

*(All of the above is a starting point — adjust hex values / fonts freely; the doc just needs a
committed direction so component code doesn't drift page to page.)*

---

## 5. Pages & Routes

### 5.1 Page: Home (`/`)

Sections, top to bottom:
1. **Hero** — positioning statement (§1), one-line subhead, primary CTA "Book a Discovery Call"
   (opens Cal.com embed/modal) + secondary CTA "See Services."
2. **Social proof strip** — testimonial quote block (placeholder copy provided; swap in real
   quotes as they're collected). Design to hold 1–3 testimonials, even if only one exists at launch.
3. **Services preview** — 4 cards (title + 1-sentence summary) pulled from `content/services/*.mdx`,
   linking to `/services#[slug]`.
4. **How it works / value framing** — 3–4 step visual translating "automated workflows + smarter
   tools = more time for patient care" into concrete steps.
5. **Resources teaser** — 2–3 featured prompts or products, linking to `/resources`.
6. **Email capture band** — "Join the list" — inline form (email only) wired to `/api/newsletter`.
7. **Final CTA** — repeat booking CTA before the footer.

### 5.2 Page: Services (`/services`)

One page, four sections (one per service), each addressable via anchor (`#receptionist`,
`#agents`, `#consulting`, `#product-studio`) and sourced from its own MDX file so copy is easy to
edit independently:

1. **The 24/7 Receptionist** — AI receptionist systems: inbound call answering, lead
   qualification, appointment booking, after-hours response, preventing missed high-intent
   patients from going to voicemail or a competing clinic.
2. **AI Agent Development** — agents beyond phone answering: patient follow-up, intake reminders,
   reactivation campaigns, lead qualification, appointment coordination, review requests, internal
   admin workflows.
3. **AI & Automation Consulting for Lifestyle Medicine Businesses** — audits to find wasted hours,
   missed revenue, manual workflows across med spas, plastic surgery, chiropractic, dental/ortho,
   IV wellness, men's health, and related practices.
4. **AI Product Studio for Lifestyle Medicine** — custom web apps from workflows/manual processes:
   dashboards, client portals, booking tools, lead management systems, automation interfaces,
   MVPs. Framed as "You bring the problem. We build the product."

Each service section ends with a "Book a discovery call" CTA. Add `Service` schema (JSON-LD) per
section for AEO.

### 5.3 Page: Resources (`/resources`)

Landing page linking to the two subsections below, each with its own short intro.

#### 5.3.1 `/resources/products`
Curated list of AI/automation products/tools Jon has researched. Each entry (from
`content/products/*.mdx`) should carry frontmatter: `name`, `category`, `description`,
`bestFor`, `link`, `pros`, `cons`. Render as filterable cards (filter by category).

#### 5.3.2 `/resources/prompts`
Plug-and-play AI prompt library. Each prompt (from `content/prompts/*.mdx`) carries frontmatter:
`title`, `vertical` (one or more of: `iv-wellness`, `trt`, `chiropractic`, `dental-ortho`,
`med-spa`), `useCase`, `prompt` (the actual prompt text), `tags`.

- `/resources/prompts` — overview grid with a vertical filter/tab control.
- `/resources/prompts/[vertical]` — dedicated, indexable landing page per vertical (e.g.
  `/resources/prompts/med-spas`) generated from the same content — this is a deliberate SEO/AEO
  move so each vertical has its own crawlable, citable URL instead of everything living behind a
  client-side filter.

Each prompt card should open to a new page with a descriptive url and should have a one-click "Copy prompt" button.

### 5.4 Page: Contact (`/contact`)

Simple form: name, email, practice/business name, message. Submits to `/api/contact`, which
validates input server-side and sends via Resend to Jon's work email (`jon@silicontundra.com`). Show a clear success/error state; no page
reload. Add basic spam mitigation (honeypot field + rate limiting) since there's no CAPTCHA in
scope.

---

## 6. Global Components

- **Header/Nav** — logo (theme-aware lockup), links: Services, Resources, Contact, persistent
  "Book a Call" button.
- **Footer** — logo, nav links, email capture (or link to it), social links (if any), copyright.
- **BookingModal / BookingEmbed** — wraps the Cal.com embed so it can be triggered from any CTA
  across the site without page navigation.
- **EmailCaptureForm** — reusable, used on home + footer.

---

## 7. Integrations

### 7.1 Cal.com (booking)
- Self-hosted or Cal.com's hosted free tier — either works; hosted is faster to stand up.
- Create a "30-Minute Discovery Call" event type, connect Google Workspace calendar for
  availability + conflict checking (Cal.com's native Google Calendar integration).
- Embed via Cal.com's official React embed component (`@calcom/embed-react`) for an in-page modal,
  rather than a plain link-out, to keep the visitor on-site.

### 7.2 Kit (email list) — recommended
Recommending **Kit** (formerly ConvertKit) over Mailchimp/Beehiiv because:
- Free tier covers a new list comfortably (no cost to start).
- API is simple (single POST to subscribe an email + tag it, e.g. `source: website`).
- Built around tagging/automation sequences, which fits naturally with an automation-focused
  brand and gives Jon a growth path (welcome sequence, nurture emails) without swapping tools later.
- Beehiiv leans newsletter-publisher-first (less relevant here); Mailchimp's API/pricing gets
  clunkier as the list and automations grow.

`/api/newsletter/route.ts` posts to Kit's API using a form/tag ID stored in env vars.

### 7.3 Resend (contact form delivery)
`/api/contact/route.ts` validates the payload, then calls Resend's send API to deliver a
formatted email to Jon's work inbox. Reply-to is set to the submitter's email for easy replies.

---

## 8. SEO & AEO Strategy

- **Per-page metadata** via Next.js Metadata API: unique title/description for every route,
  including generated `[vertical]` and `[slug]` pages.
- **Structured data (JSON-LD):** `Organization` sitewide, `Service` on each service section,
  `FAQPage` anywhere FAQs live, `Product`/`SoftwareApplication` optionally on product entries.
- **`sitemap.ts` and `robots.ts`** generated dynamically so new MDX content is auto-included.
- **`public/llms.txt`** — a plain-language summary of what Silicon Tundra does, who it serves, and
  links to key pages, formatted per the emerging llms.txt convention — an explicit AEO play for
  LLM-based answer engines.
- **Semantic HTML + descriptive headings** throughout (avoid div-soup) so both search crawlers and
  LLMs can parse page structure cleanly.
- **Vertical-specific landing pages** (`/resources/prompts/[vertical]`) intentionally created for
  long-tail SEO — "AI prompts for TRT clinics" etc. — rather than hiding that content behind a
  client-side filter only.
- **Core Web Vitals:** Next.js Image component for all images, font optimization via `next/font`,
  minimal client JS (keep Cal.com/Kit widgets lazy-loaded).
- **Google Search Console** verified at launch; submit sitemap.

---

## 9. Deployment Pipeline

1. Local development (`npm run dev`), working in this folder.
2. Git init → commit → push to a new GitHub repo.
3. Connect the GitHub repo to Vercel; every push to `main` auto-deploys to production, every PR
   gets a preview URL.
4. Environment variables (Cal.com keys if self-hosted, Kit API key + form ID, Resend API key,
   destination email) set in Vercel project settings, mirrored locally in `.env.local`
   (`.env.local.example` committed as a template, real `.env.local` gitignored).

---

## 10. Additiona Items

- Final domain: wwww.silicontundrallc.com
- Real work email for contact form delivery is jon@silicontundrallc.com
- [ ] Real testimonial(s) to replace placeholder quote
- [ ] Cal.com account created + Google Workspace calendar connected
- [ ] Kit account created + API key / form ID
- [ ] Resend account created + API key + verified sending domain
- [ ] Actual content for `content/products/*.mdx` and `content/prompts/*.mdx` (can be generated
      collaboratively with Claude Code once the shell is built)
- [ ] Confirm brand colors/fonts in §4, or supply exact brand guidelines if they exist beyond the
      logo files

---

## 11. Suggested Build Order (for Claude Code)

1. Scaffold Next.js + Tailwind + TypeScript project; commit initial skeleton.
2. Build `components/ui/` primitives + root layout (header/footer/fonts/theme).
3. Build Home page with static/placeholder content in every section.
4. Build Services page from MDX content collection.
5. Build Resources → Products and Resources → Prompts (including `[vertical]` routes).
6. Build Contact page + `/api/contact` (Resend).
7. Wire up Cal.com embed + `/api/newsletter` (Kit).
8. Add SEO layer: metadata per route, JSON-LD, sitemap/robots, `llms.txt`.
9. Content pass: fill in real service copy, seed a handful of real products + prompts.
10. Deploy: GitHub repo → Vercel → verify Search Console + env vars in production.
