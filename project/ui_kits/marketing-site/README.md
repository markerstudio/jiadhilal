# Marketing Site — UI Kit

High-fidelity recreation of the **Jiad Hilal marketing site** (desktop landing page). A
*concept product* on the brand identity — the manual ships brand assets only, so this
demonstrates the system on a real site. Flag to the brand owner before treating as spec.

## Run
Open `index.html` — a single scrolling landing page.

## Sections
- `SiteHeader.jsx` — sticky glass nav with logo lockup + primary CTA.
- `Hero.jsx` — full-bleed brand-gradient hero, display headline, hero stats, watermark mark.
- `ProgramsSection.jsx` — 3-up program cards (featured = brand gradient).
- `ResultsSection.jsx` — dark stats band + testimonial card.
- `CtaFooter.jsx` — energy-gradient CTA band + multi-column footer.
- `Icons.jsx` — Lucide icon helper.

## Composition
Sections compose `Button`, `Card`, `Badge`, `StatTile`, `Avatar`, `Tag` from
`window.JiadHilalDesignSystem_e787fe` (via `../../_ds_bundle.js`). Icons are Lucide (CDN).
Light section = `--surface-page`; dark sections = `--surface-dark`; gradients =
`--grad-brand` / `--grad-energy`. Display type is Archivo 900 italic uppercase.
