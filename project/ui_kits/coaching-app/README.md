# Coaching App — UI Kit

High-fidelity recreation of the **Jiad Hilal coaching app** (mobile, dark theme). This is
a *concept product* built on the brand identity — the manual ships brand assets only, so
these screens demonstrate how the system applies to a real coaching app. Flag to the brand
owner before treating as a product spec.

## Run
Open `index.html`. It's interactive:
**Log in & train** → **Today** dashboard → tap the workout card → **Active workout**
(check off sets) → back → bottom tabs switch **Today / Train / Progress / Profile**.

## Screens
- `LoginScreen.jsx` — welcome / auth, brand gradient, tracked uppercase tagline.
- `TodayScreen.jsx` — dashboard: today's workout (brand card), weekly ring, stat grid, coach note.
- `WorkoutScreen.jsx` — active session: exercise/set list, completion checkboxes, glass header, progress.
- `ProgressScreen.jsx` — volume chart, totals, recent PRs, range tabs.
- `AppShell.jsx` — phone frame, status bar, bottom tab bar, routing; also holds `ProfileScreen`.
- `Icons.jsx` — Lucide icon helper (`<Icon name="dumbbell" />`).

## Composition
Screens compose the design-system primitives (`Card`, `StatTile`, `ProgressRing`,
`ProgressBar`, `Badge`, `Avatar`, `Button`, `Checkbox`, `Switch`, `Tabs`, `IconButton`)
from `window.JiadHilalDesignSystem_e787fe`, loaded via `../../_ds_bundle.js`. Icons are
Lucide (CDN). Dark surfaces use `--surface-dark*`; data uses the mono font.
