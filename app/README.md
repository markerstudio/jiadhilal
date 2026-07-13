# Jiad Hilal — Coaching App

A real **Vite + React + TypeScript** implementation of the Jiad Hilal coaching-app
design (mobile, dark theme). Recreated from the design handoff in [`../project`](../project)
— the design-system tokens, primitive components, and the four app screens are ported
to production TSX with the brand CSS tokens wired in.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts: `npm run build` (typecheck + production build), `npm run typecheck`,
`npm run preview`.

## The flow

The app is an interactive click-through, exactly as designed:

**Log in & train** → **Today** dashboard → tap the workout card / *Start workout* →
**Active workout** (check off sets, watch the progress bar fill) → back → the bottom
tab bar switches **Today / Train / Progress / Profile**.

## Structure

```
src/
  App.tsx                 phone frame, status bar, bottom tab bar, routing (the "AppShell")
  main.tsx                React entry
  styles/
    styles.css            global entry — imports tokens, base reset, reduced-motion
    tokens/               brand CSS custom properties (colors, type, spacing, effects, fonts)
  components/             design-system primitives, ported 1:1 from ../project/components
    Button, IconButton, Input, Checkbox, Switch,
    Card, Badge, Avatar, StatTile, ProgressRing, ProgressBar, Tabs, Icon
  screens/
    LoginScreen, TodayScreen, WorkoutScreen, ProgressScreen, ProfileScreen
  assets/logo-mark-white.png
```

## Notes on fidelity

- **Design tokens are verbatim** — the CSS files under `src/styles/tokens/` are copied
  unchanged from the design bundle, so colors (`#6200ff` neon purple, `#00f700` neon
  green, `#ff2e5b` neon red), radii, shadows, and motion match exactly.
- **Icons** use [`lucide-react`](https://lucide.dev) (the design's chosen set) as a proper
  npm dependency, replacing the prototype's runtime CDN `<Icon>` helper. Same glyphs,
  same 2px stroke.
- **Fonts** are Archivo (display/body) + JetBrains Mono (data), loaded from Google Fonts
  via `tokens/fonts.css` — the substitution flagged in the original handoff. Swap in
  licensed brand fonts there if/when they're supplied.
- Components keep the prototype's inline-style approach so numeric values (paddings,
  sizes, line-heights) stay pixel-identical to the source rather than being re-snapped to
  a grid.
