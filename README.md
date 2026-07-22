# Challenger House — website

The live marketing site. Static HTML, no framework, no build step.

- **Production:** https://challenger-house-website.vercel.app
- **Repo:** https://github.com/beanb0t/challenger-house-website
- **Deploys:** push to `main` → Vercel publishes automatically. Branches and PRs get their own preview URL.

---

## ⚠️ Read this first: there is no build step

This trips people up, so it is stated up front.

**The markdown files at the repo root are not compiled into anything.** They are a written record of the copy. The website that actually ships is the hand-written HTML in `site/`.

```
home.md   ──(no build, no script, no generator)──►   site/index.html
```

**Editing `home.md` alone changes nothing on the live site.** To change what visitors see, you must edit the HTML in `site/`. Keep the markdown updated alongside it so the two do not drift.

If you only ever want to touch one file per change, edit the HTML — that is the site. The markdown exists so the copy can be read and reviewed without wading through markup.

---

## Golden rules

1. **Do not rewrite the copy.** The writing is deliberate and specific — *"Access without workflow change is theatre."* *"You'll get a straight answer, including no."* Move it, don't paraphrase, soften, tidy, or regenerate it. If a sentence looks like a typo, ask before "fixing" it (see `Adiffferent` below).
2. **Do not break the calculator maths.** Spec and regression cases in `talking-tax-calculator.md`. Test after any change.
3. **Do not invent new design.** The design is agreed. New content should reuse the existing component classes (see *Design* below), not new bespoke styles.
4. **Keep the accessibility bits.** The reduced-motion query and `:focus-visible` outlines in `site/css/style.css` are correct. Don't lose them.

---

## Layout

```
site/                        ← THE ACTUAL WEBSITE (this is what deploys)
  index.html                 ← homepage
  architecture.html          ← contains the Talking Tax calculator
  experience.html
  sprint.html
  mirror.html
  constitution.html
  builders.html
  faq.html
  css/style.css              ← the whole design system. All tokens at the top.
  js/site.js                 ← calculator + cursor coordinate readout. That's all the JS.
  assets/images/

*.md  (repo root)            ← content record, one file per page (see mapping below)
talking-tax-calculator.md    ← calculator spec + regression test cases
vercel.json                  ← tells Vercel to serve site/
```

### Page mapping

| Content file | Ships as | Live path |
|---|---|---|
| `home.md` | `site/index.html` | `/` |
| `architecture.md` | `site/architecture.html` | `/architecture.html` |
| `experience.md` | `site/experience.html` | `/experience.html` |
| `sprint.md` | `site/sprint.html` | `/sprint.html` |
| `mirror.md` | `site/mirror.html` | `/mirror.html` |
| `constitution.md` | `site/constitution.html` | `/constitution.html` |
| `builders.md` | `site/builders.html` | `/builders.html` |
| `faq.md` | `site/faq.html` | `/faq.html` (footer link only, not in main nav) |

---

## How to make a content change

1. Find the page in the table above.
2. Update the markdown file (the record).
3. Make the **same** change in the matching `site/*.html` file, word for word.
4. Check it renders (see *Running it locally*).
5. Commit and push. Vercel deploys `main` automatically.

**If the copy appears on more than one page, change it everywhere.** These strings are intentionally repeated:

- **The derisk line** — homepage hero + homepage final CTA + FAQ:
  > 25 minutes with a builder, not a salesperson. Bring the problem that actually hurts. You'll get a straight answer, including no.
- **The compound line** — homepage (centred) + sprint (left-aligned):
  > AI adoption doesn't compound in individuals. *It compounds in teams.*
- **"Builders, not consultants."** — an `h2` on the homepage, the `h1` on builders.
- **"We spark courage to act now."** — builders `h2` + the footer signature on every page.
- **The footer, nav, and technical legend** are duplicated in all eight HTML files. Change one, change all eight.

Two Kortz quotes exist (homepage and experience). They are **different quotes from the same person**, not duplicates. Both are intended.

---

## Adding a new section

Reuse the existing vocabulary in `site/css/style.css` rather than writing new CSS. What's available:

- `.zone` — the "ZONE 01 / PURPOSE" ruled eyebrow that opens each section
- `.sheet-grid` + `.c2` / `.c3` / `.c4` — the ruled multi-column grid, with `.rule` + `.pno` for the "———— P.01" markers
- `.panel`, `.panel-accent`, `.panel-dashed`, `.panel-hatch` — bordered/tinted callout boxes
- `.bigquote` / `.smallquote` — testimonials
- `.offer` (+ `.flagship`) — the offer cards
- `.btn-bar` (solid), `.btn-outline`, `.think-link` (inline arrow link)
- `.chip`, `.logos`, `.tribe-list`, `.deliv`, `.house-line`, `.callout-left`, `.compound`, `.fineprint`

Sections follow the pattern: `<section>` → `.wrap` (or `.wrap-narrow` for prose) → `.zone` label → `h2` → content.

> **Gotcha:** inside a `.tribe-list` item, wrap the text in a single `<span>`. The list is a CSS grid; loose text and `<strong>` runs each become separate grid cells and the bold phrases jump into the number column.

---

## Design

Everything lives in `site/css/style.css`. The tokens are all at the top of the file:

- **Paper** `#F0ECE1`, **ink** `#1C1A16`, **accent** burnt orange `#A05E1D` (`--accent-deep` `#7E4A15` for small text and links, for contrast).
- **Type:** Bodoni Moda (serif — headings, quotes), IBM Plex Mono (everything else — body, labels, chrome). Loaded from Google Fonts in each page's `<head>`.
- The background drafting grid is `--grid` + `background-size` on `body`.

The look is an architect's drafting sheet: cream grid paper, Didone headlines, monospace annotations, ruled dividers, technical legend and stamp in the footer.

---

## The calculator

`site/architecture.html` + the second half of `site/js/site.js`. It is the only stateful thing on the site.

**Regression check — run this after touching it:**

| Inputs | Expected headline | Expected FTE line |
|---|---|---|
| defaults (12 / 40% / 100) | `€480,000` | `4.8 full-time salaries` |
| 50 people / 60% / 120 | `€3,600,000` | `30.0 full-time salaries` |

Note `fteEquivalent` deliberately does not depend on the cost slider. Moving cost changes the headline but not the salaries figure. That is intended — do not "fix" it.

---

## Running it locally

Any static server pointed at `site/`. For example:

```
npx serve site
```

Then open the printed URL. There is nothing to install and nothing to build.

---

## Known unresolved items

These are deliberate placeholders, not bugs. They are marked with `TODO` comments in the HTML.

| Placeholder | Count | Needs |
|---|---|---|
| `#CALENDLY-25MIN` | 9 | The real booking URL. Every CTA on the site points at it. |
| `#MIRROR-MVP-EMBED` | 1 | The Mirror MVP itself. The page currently claims to *be* the product while showing a dashed placeholder box. |
| FAQ Q1 (Copilot) | 1 | Holding copy is in place; the agreed Copilot-vs-frontier-LLM statement should replace it. |
| The Open House (FAQ) | 1 | Cadence and link to confirm. Copy says "roughly monthly, dates announced on LinkedIn". |
| `#CONSTITUTION-PDF` | 1 | The PDF asset. |
| `#LINKEDIN-*`, `#ANDRE-NEWSLETTER`, `#ANDRE-PODCAST` | 5 | Real URLs. |
| `#IMPRESSUM`, `#PRIVACY` | 2 | Legal pages. `Impressum` implies German requirements; no `/de` route exists yet. |

**`Adiffferent`** (three f's) appears in the logo wall on the homepage and builders page. Spelled consistently in the original source, so possibly deliberate. Unconfirmed — check before changing.

---

## Historical documents

These describe the **previous** version of the site and are kept as a record. Do not follow them as instructions.

- `design-tokens.md` — the old v3.0 dark navy/orange theme and its component inventory. **Superseded** by `site/css/style.css`. The current site is light, not dark.
- `site-structure.md` — the old single-file architecture (one 912-line HTML file, no URLs). **Superseded**: every page is now its own file with a real URL.
- `open-questions.md` — questions raised during the original extraction. Several are now answered (it is a static site, not a CMS; the mockup arrived; the redesign is a rebuild). The content ones in the table above are still open.
- `Screenshot 2026-07-09 at 10.00.20.png` — the design mockup the current look is based on.
