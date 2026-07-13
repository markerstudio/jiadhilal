**Button** — the brand's primary call-to-action; use for any committed action (start a plan, log a lift, book a session).

```jsx
<Button variant="primary" size="lg" onClick={start}>Start your plan</Button>
```

Variants: `primary` (purple, glows on hover) · `secondary` (purple outline) · `ghost` (text only) · `danger` (neon red) · `neon` (neon green, for live/PR moments). Sizes `sm | md | lg`. Labels are UPPERCASE by default — pass `uppercase={false}` for sentence case. Supports `iconLeft` / `iconRight` (pass a Lucide SVG), `fullWidth`, `disabled`.
