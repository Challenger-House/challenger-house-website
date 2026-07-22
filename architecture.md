---
page: architecture
nav_label: Architecture
title: "Why AI demands new organisational architecture."
eyebrow: "The argument"
readtime: "A one-minute read"
---

For two centuries, an organisation could carry undocumented knowledge, unclear ownership, informal power and contradictory incentives, and still function. Human thinking was slow and expensive enough to quietly absorb the mess. **That slack was a buffer.**

**AI removes the buffer.** The moment you put AI on a process, the first thing that breaks is not the technology. It is a handover nobody ever wrote down.

> **house-line (accent left border, larger type):**
> The tacit knowledge lives in the dusty attic. The organisational shadow sits in the basement. The messy middle runs through every floor in between.

This is why the ROI never arrives on schedule: the workflows are undocumented, the handovers are inconsistent, and the knowledge lives in heads. Licences don't fix that. **Access without workflow change is theatre.**

And the org chart won't warn you. The org chart is a lagging indicator: the informal ways of working move first, the boxes get redrawn years later.

## Three-things grid

### 01 · The work — Workflows get rewired.
What took weeks takes days. Outputs shift from slides to working artefacts. The value of knowing-that collapses, the value of judgment climbs.

### 02 · The team — Handovers get exposed.
Every assumption, every inconsistency, every quiet workaround becomes visible. Psychological safety stops being a nice-to-have and becomes infrastructure.

### 03 · The organisation — Foundations get stress-tested.
Structures, incentives, and eventually the employer-employee contract itself. AI is the biggest organisational design question of the decade.

---

AI changes all three at once. Most programmes address one, and are surprised by the other two.

We are challengers, so we name it. The attic and the basement are there, everyone in your building knows they are there, and with a mirror we can show you. **Naming it is the first step to rebuilding it.** That is what organisational architecture means to us: not moving boxes, but redesigning how the work, the judgment and the knowledge actually flow.

## Live instrument — The Talking Tax calculator

**INTERACTIVE COMPONENT.** See `components/talking-tax-calculator.md` for the full spec.

- **c-label:** Live instrument
- **h3:** The Talking Tax. Run your own number.

### Sliders

| id | Label | Min | Max | Step | Default |
|---|---|---|---|---|---|
| `s-people` | People involved in the work | 3 | 100 | 1 | 12 |
| `s-share` | Share of the week spent talking about the work, meetings, status, alignment | 10 | 80 | 1 | 40 (%) |
| `s-cost` | All-in cost per person, per year | 60 | 180 | 5 | 100 (× €1,000) |

### Result

- Big number: `people × (cost × 1000) × (share / 100)` formatted as `€NNN,NNN` (en-GB locale, rounded)
- Result label: "per year, spent talking *about* the work. Not doing it. Talking about it."

### Hard lines beneath the result

1. Dynamic: `That is <N> full-time salaries paid for alignment, status and re-explaining what was never written down.`
   where `N = (total / cost_per_person).toFixed(1)`
2. Static: The tax exists because the work itself was never made explicit. To retrieve it, someone has to climb into the attic, every single time.
3. Static: Meanwhile, teams that build compound at roughly 1% a week. That is **5x over three years**. The delta between talking and building widens every single day, and most organisations are too inward-looking to notice, because everyone's calendar looks the same.

### Calc CTA

Want your number pressure-tested? [We'll run it with you on the call →](#CALENDLY-25MIN)

---

## Closing CTA

Experience the reveal in one day → `/experience`
