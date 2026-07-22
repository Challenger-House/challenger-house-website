# Component: Talking Tax calculator

Location: Architecture page, after "Naming it is the first step to rebuilding it."

The only interactive, stateful component on the site. Everything else is static. A redesign will restyle it; **the maths must survive unchanged**, because the copy beneath it references the outputs directly.

---

## Inputs

| id | Label | Type | Min | Max | Step | Default | Display format |
|---|---|---|---|---|---|---|---|
| `s-people` | People involved in the work | range | 3 | 100 | 1 | `12` | integer |
| `s-share` | Share of the week spent talking about the work, meetings, status, alignment | range | 10 | 80 | 1 | `40` | `40%` |
| `s-cost` | All-in cost per person, per year | range | 60 | 180 | 5 | `100` | `€100,000` |

Note `s-cost` is expressed in **thousands**. The slider reads `100`; the value is `100 × 1000 = 100000`.

---

## Derived values

```
costPerPerson = s-cost × 1000
total         = s-people × costPerPerson × (s-share / 100)
fteEquivalent = total / costPerPerson          // == s-people × s-share / 100
```

`fteEquivalent` simplifies so that it never depends on cost. Present behaviour, worth knowing: moving the cost slider changes the headline number but never the "full-time salaries" figure. Probably intentional. Confirm before "fixing".

---

## Formatting

```js
fmt(n) => '€' + Math.round(n).toLocaleString('en-GB')
```

- Currency: **euro**, en-GB grouping. `€480,000`.
- `fteEquivalent` rendered to **one decimal place**: `.toFixed(1)` → `4.8`.

---

## Outputs

**Headline** (`#r-total`), accent-coloured, `clamp(38px, 5vw, 54px)` mono:

> €480,000

**Label directly beneath**, static:

> per year, spent talking *about* the work. Not doing it. Talking about it.

**Dynamic hard line** (`#r-message`), the FTE figure wrapped in an accent `<span>`:

> That is **4.8 full-time salaries** paid for alignment, status and re-explaining what was never written down.

**Two static hard lines** follow. Full copy in `content/architecture.md`.

---

## Behaviour

- `oninput` on every slider → recalculate immediately. No debounce, no submit.
- `calc()` runs once on page load to populate defaults.
- Value readouts (`#v-people`, `#v-share`, `#v-cost`) update alongside the result.
- Purely client-side. No network, no persistence, no analytics on the current site.

---

## Defaults produce

| Output | Value |
|---|---|
| Headline | `€480,000` |
| FTE line | `4.8 full-time salaries` |

**Use these as a regression check.** Load the rebuilt page, touch nothing, confirm both. If either differs, the maths broke.

Second check, worth adding: set people `50`, share `60`, cost `120`. Expect `€3,600,000` and `30.0 full-time salaries`.

---

## Accessibility work for the rebuild

The current implementation is functional but thin.

- Each `<input type="range">` should have a proper `<label for>`, not just adjacency.
- Add `aria-valuetext` so a screen reader announces `€100,000` rather than `100`.
- The result region should be `aria-live="polite"` so updates are announced. Currently silent.
- `#r-message` is populated with `innerHTML` to inject the accent `<span>`. In a React rebuild use JSX children, not `dangerouslySetInnerHTML`.

---

## Rebuild notes

- The current version reads and writes the DOM directly via `getElementById`. In React this is three `useState` values and a derived `total`. No effect hook needed.
- Keep it dependency-free. It is arithmetic.
- The `€` is hardcoded. If the site ever serves UK clients in sterling, that becomes a token, not a string literal. Not a problem today. Flagged in `open-questions.md`.
