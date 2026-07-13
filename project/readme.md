# Jiad Hilal — Design System

The brand system for **Jiad Hilal**, a personal trainer & athlete. Built for coaching
products (app + marketing site), client-facing content, and brand collateral.

> **Tagline / lockup line:** `PERSONAL TRAINER & ATHLETE`
> **Personality:** electric, disciplined, high-energy, no-nonsense. A premium athletic
> coach — not a gym chain, not a wellness-spa. Bold purple, sharp geometry, real effort.

---

## Source materials

Everything in this system is derived from the assets the brand owner provided:

- `uploads/JIAD HILAL MANUAL.pdf` — **logo guidelines manual** (11 pp). Covers logo, logo
  mark, construction grid, color, and background usage. This is the authoritative source
  for the **color palette** (see below). It contains **no typography or component spec**.
- `uploads/Banner.png` — primary horizontal logo lockup on the brand gradient.
- `uploads/Jiad-Hilal-App-Icon.png` / `.gif` — app-icon treatment (gradient tile + mark).
- `uploads/Asset 1@4x.png` — the standalone logo mark (transparent, gradient fill).

Copied/derived assets live in [`assets/`](./assets) (see the index at the bottom).

> ⚠️ **Font substitution flagged.** The manual ships no typeface spec. The fonts here are
> Google-Fonts matches chosen to mirror the logo (see Visual Foundations → Type). If you
> hold the licensed brand fonts, send them and we'll swap them in.

---

## Brand colors (verbatim from the manual)

| Name | Web | RGB | Role |
|---|---|---|---|
| **NEON Purple** | `#6200ff` | 98 / 0 / 255 | Primary brand color |
| **NEON Green** | `#00f700` | 0 / 247 / 0 | High-energy accent (live / success / PR) |
| **NEON Red** | `#ff2e5b` | 250 / 46 / 91 | Alert / effort / intensity |
| **Char-Black** | `#232323` | 35 / 35 / 35 | Primary ink / dark surfaces |

Scales, neutrals and gradients in [`tokens/colors.css`](./tokens/colors.css) are derived
harmonically from these four.

---

## CONTENT FUNDAMENTALS — how Jiad Hilal writes

**Voice:** a coach in your corner. Direct, motivating, earned-confidence. Speaks *to* the
athlete ("you", "your"), rarely about itself. Imperative and active — it tells you what to
do, then gets out of the way.

- **Person:** Second person ("you train", "your program", "show up"). First person only for
  Jiad's own voice in testimonials/about ("I coach the way I train").
- **Casing:** Display headlines and CTA buttons are **UPPERCASE** (mirrors the wordmark and
  the `PERSONAL TRAINER & ATHLETE` lockup). Body and labels are sentence case. Never Title
  Case Everything.
- **Tone:** Disciplined, not preachy. Confident, not cocky. Warm under the intensity —
  "the days you don't feel like showing up" energy. No hustle-bro clichés, no shame.
- **Length:** Short. Punchy. Headlines 2–5 words. Body in tight 1–2 sentence blocks.
- **Numbers matter:** This is a results brand. Real metrics — reps, loads, weeks, %
  progress — rendered in mono. Never invent vanity stats; show what's tracked.
- **Emoji:** **No emoji.** Energy comes from type weight, color, and motion — not 💪.
- **Punctuation:** Em-dashes and periods for rhythm. Avoid exclamation-mark spam; let the
  type size do the shouting.

**Examples of on-brand copy:**

- Hero: `NO EXCUSES.` / `Train with intent. Recover with discipline.`
- CTA: `START YOUR PLAN` · `BOOK A SESSION` · `LOG TODAY'S LIFT`
- Encouragement: `Consistency beats intensity. Show up, log the set, move on.`
- Section overline: `PERSONAL TRAINER & ATHLETE`
- Stat caption: `+8% on your top set vs last week`

**Off-brand (avoid):** "Welcome to your fitness journey! 🎉", "We are passionate about
helping you achieve your goals", "Unlock Your Best Self Today!!!"

---

## VISUAL FOUNDATIONS

### Color & vibe
Electric violet is the hero — used at full saturation on large fields and gradients, not
just as an accent. Char-black grounds it. Neon green and red are **spark colors**: small
doses for live/success/effort states, often with a soft glow. Imagery skews **cool,
high-contrast, energetic** — think gym-floor action, sweat, motion blur — and pairs well
with a purple duotone or a purple gradient scrim. Light surfaces are near-white with the
faintest cool tint; the app leans into a deep purple-black dark mode.

### Type
- **Display:** `Archivo` at **900 / italic, UPPERCASE**, tight tracking (−0.03em). This is
  the athletic-punch voice that mirrors the heavy oblique **JIAD** wordmark.
- **Body & UI:** `Archivo` 400–600, line-height 1.6. One family keeps the system tight.
- **Expressive accent:** `Archivo` **900 italic, lowercase** — used for short "signature"
  moments (taglines, CTAs like *let's get to work*). Sparingly; never body or UI labels.
  *(A calligraphy script was trialed and removed — the brand voice is bold, not handwritten.)*
- **Mono / data:** `JetBrains Mono` for reps, loads, timers, and tabular figures.
- **Overline:** 11px, 800, uppercase, tracking 0.18em — the `PERSONAL TRAINER & ATHLETE`
  lockup treatment, used as section kickers.

### Backgrounds
Three modes: (1) **brand gradient** `--grad-brand` (bright violet → deep purple, ~140°);
(2) **char-black / ink** dark fields; (3) **near-white** light surfaces. Full-bleed
gradient or photo for heroes; flat surfaces for content. The energy gradient
(purple → red) is reserved for high-intensity moments. No noisy patterns; the geometry of
the mark is the motif. Subtle diagonal energy (the logo's 45° geometry) can echo in
section dividers.

### Geometry, corners & cards
The logo mark is built on a **45° diamond grid** — sharp, interlocking, confident. Corner
radii are generous but not soft: cards use `--radius-lg` (18px), pills for chips/buttons,
xl/2xl for hero panels. Cards on light: white surface, `--shadow-md`, hairline
`--border-subtle` only when shadow isn't enough. Cards on dark: `--surface-dark-card` with
a 1px `--border-dark`. Brand cards (CTAs, featured) use the gradient + `--shadow-brand`
(purple glow).

### Shadows & elevation
Two systems: **neutral** (sm → xl, cool near-black, for spatial layering) and **brand
glow** (`--shadow-brand`, purple bloom for primary actions and featured cards). Neon green
and red have matching `--glow-*` halos for live/alert moments. Don't stack both.

### Borders
Hairline 1px subtle borders on light; 2px brand borders for selected/active and for
outline buttons; 3px reserved for heavy emphasis. Dark mode uses `--border-dark`.

### Motion
Snappy and athletic. Default `--ease-out` over `--dur-base` (200ms). Interactive press
uses a slight **spring** (`--ease-spring`) and a scale-down (0.97). Entrances fade-and-rise
8–16px. Live/PR moments may pulse a neon glow. No slow, floaty, decorative loops — motion
should feel like it has intent. Honor `prefers-reduced-motion`.

### Hover / press states
- **Hover:** primary buttons deepen (purple-500 → purple-600) and lift (`--shadow-brand`);
  ghost/secondary fill with `--purple-50`; cards lift one shadow step.
- **Press / active:** `transform: scale(0.97)`, shadow drops, `--dur-fast`.
- **Focus:** `--focus-ring` (3px 35% purple halo), always visible for keyboard users.

### Transparency & blur
Glass (`--blur-glass`) for sticky headers and overlays on photos/gradients — backdrop blur
+ slight saturation. Scrims: a bottom-up dark gradient protects white text over imagery.
Used sparingly; the brand is mostly solid and confident.

### Layout rules
Max content width `--container` (1200) / `--container-wide` (1440). Generous
`--section-y` rhythm. Sticky glass header. Bottom tab bar in-app. The mark sits top-left in
nav; the full lockup is reserved for heroes, footers, and splash.

---

## ICONOGRAPHY

The brand manual ships **no icon set** — the only proprietary glyph is the **JH logo
mark** (a diamond monogram on a 45° grid), provided in `assets/` in white / purple / black
and as the gradient app icon.

- **UI icons:** use **[Lucide](https://lucide.dev)** via CDN — a clean, consistent
  **2px-stroke, rounded-cap** open-source set. It matches the brand's geometric-but-human
  feel. **(Substitution flagged** — there is no brand-native icon font; Lucide is our
  recommended match. Swap if the brand later defines its own.)
  - Load: `<script src="https://unpkg.com/lucide@latest"></script>` then `lucide.createIcons()`,
    or use individual SVGs. Stroke width **2**, `currentColor`, size 20–24 in UI.
  - Fitness-relevant glyphs: `dumbbell`, `activity`, `flame`, `timer`, `trophy`,
    `trending-up`, `calendar-check`, `heart-pulse`, `play`, `check`.
- **The logo mark** is the brand's hero icon — use it for the app icon, avatars, loaders,
  empty states, and watermark moments. Never redraw it; use the PNGs in `assets/`.
- **No emoji** in product or marketing UI. **No multicolor icon sets.** Keep icons
  monochrome (`currentColor`), tinted purple/neon only for state.

---

## INDEX — what's in this system

**Root**
- `styles.css` — global entry (import lines only). Consumers link this.
- `readme.md` — this guide.
- `SKILL.md` — Agent-Skills-compatible entry for downloadable use.

**`tokens/`** — `fonts.css`, `colors.css`, `typography.css`, `spacing.css`, `effects.css`

**`assets/`**
- `logo-banner.png` — primary horizontal lockup (on purple)
- `logo-mark.png` — gradient mark (transparent)
- `logo-mark-white.png` / `-purple.png` / `-black.png` — recolored marks for any bg
- `app-icon.png` / `app-icon.gif` — app-icon tile (static + animated)

**`guidelines/`** — foundation specimen cards (Colors, Type, Spacing, Brand) shown in the
Design System tab.

**`components/`** — reusable React UI primitives, grouped under "Components" in the tab:
- `forms/` — Button, IconButton, Input, Select, Checkbox, Switch
- `feedback/` — Badge, Tag, ProgressBar, ProgressRing
- `data/` — StatTile (signature mono metric), Avatar
- `layout/` — Card · `navigation/` — Tabs

**`ui_kits/`** — full-screen product recreations (concept products on the brand identity):
- `coaching-app/` — mobile dark-theme app: Login → Today → Workout → Progress → Profile
- `marketing-site/` — desktop landing page: hero, programs, results, CTA, footer

> Components, UI kits and slides are added/expanded over time — check the Design System tab
> for the live, compiled inventory.
