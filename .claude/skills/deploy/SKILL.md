---
name: deploy
description: Deploys the Silicon Tundra site to production via GitHub → Vercel. Only run this when explicitly invoked with /deploy — do not trigger it automatically just because code changed or a task seems "done."
disable-model-invocation: true
context: fork
---

# Deploy Silicon Tundra

Run this as an explicit `/deploy` command, never automatically.

1. **Lint and build locally** — catch failures before they hit GitHub/Vercel:
   ```
   npm run lint
   npm run build
   ```
   Stop and report the error if either fails. Do not proceed to commit/push with a broken build.

2. **Review the diff** — summarize what changed since the last commit (`git status`, `git diff
   --stat`) and confirm with the user before committing, unless they've already described exactly
   what this deploy should contain.

3. **Commit and push**:
   ```
   git add -A
   git commit -m "<clear, specific message describing what changed>"
   git push origin main
   ```

4. **Vercel auto-deploys from `main`** — no manual deploy step needed once pushed, assuming the
   GitHub repo is already connected to the Vercel project. Confirm the connection exists before
   relying on this; if it's a first-ever deploy, the user needs to have connected the repo in the
   Vercel dashboard first.

5. **Post-push checks**:
   - Confirm the new deployment shows up and succeeds in the Vercel dashboard (or via `vercel ls` /
     `vercel inspect` if the Vercel CLI is set up locally).
   - Spot-check the production URL once the deploy finishes.
   - If this deploy touched routes, content, or metadata, remind the user to check Google Search
     Console for the sitemap status — new pages should already be included via the dynamic
     `sitemap.ts`, but it's worth a glance after major content additions.

6. **Environment variables** — if this deploy introduces a new integration or env var (Cal.com,
   Kit, Resend keys), confirm it's set in the Vercel project settings, not just `.env.local` —
   local success doesn't guarantee production has the same variable.

## Don't

- Don't force-push to `main`.
- Don't deploy with a failing build "to see what happens" — fix it first.
- Don't commit `.env.local` or any real API keys — only `.env.local.example` with placeholder
  values should ever be tracked.
