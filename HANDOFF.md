# Challenger House — website handoff

This is the Challenger House marketing site, ready to put on the live domain.

**Start with [README.md](README.md).** It explains the one thing that trips
everyone up: there is **no build step**. The site that ships is the hand-written
HTML in `site/` — the markdown files at the root are just a written record of
the copy, not a source that compiles into anything.

## How to deploy it

The `site/` folder is a complete, self-contained static website. Every image
loads from `site/assets/`, there are no dependencies, and nothing needs to be
built or installed.

To go live, publish the **contents of `site/`** to your host (Vercel, Netlify,
Cloudflare Pages, or wherever the domain currently points). If you use Claude to
do it, tell it: *"Deploy the `site/` folder as a static site."* That's the whole
job — `site/index.html` is the homepage.

## ⚠️ Before (or right after) launch — a short checklist

These are known and deliberate; they were left for whoever puts the site on the
real domain, because they need real destinations that only you have.

1. **Three footer links are dead placeholders** on every page (`#IMPRESSUM`,
   `#PRIVACY`, `#LINKEDIN-COMPANY`). Point each at a real URL:
   - **Impressum** — legally required for a German business (§5 DDG, formerly
     TMG). This is a real compliance requirement, not a nicety; don't launch
     the public domain without a real Impressum page behind this link.
   - **Privacy / Datenschutzerklärung** — likewise required under GDPR/DSGVO.
   - **LinkedIn** — point at the company page (or remove the link).

   To fix: search the `site/*.html` files for `#IMPRESSUM`, `#PRIVACY`, and
   `#LINKEDIN-COMPANY` and replace each `href` with the real URL. They appear
   once per page (8 pages each).

2. **The site publishes named client content** — testimonials attributed to
   Dr. Christof Kortz (VP, E.ON Group Innovation) and a client logo wall
   (Deutsche Telekom, E.ON, Lidl, Digitalservice des Bundes, and others).
   This is intentional and client-approved, but confirm you're happy for it to
   be publicly live under the real domain before you launch.

3. **The Calendly links** point at
   `https://calendly.com/marcusdruen/challenger-house-intro-call`. Confirm
   that's the correct booking destination for the live site.

## If you edit the copy

Keep the matching root markdown file in sync when you change wording on a page —
the README has the full page → file mapping. And a hard rule: **don't rewrite the
copy.** It's client-approved and deliberately written; move it, don't paraphrase.
