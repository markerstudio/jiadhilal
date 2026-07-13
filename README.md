# Jiad Hilal — Coaching Platform

Personal-training platform for **Jiad Hilal** (personal trainer & athlete): a mobile-first
client app for training, logging workouts, and tracking progress, plus a coach admin panel
for managing clients, building programs, and sending notes.

Built with **Vite + React + TypeScript** on the Jiad Hilal design system
(neon purple `#6200ff` · neon green `#00f700` · neon red `#ff2e5b` · char-black `#232323`,
Archivo + JetBrains Mono).

## Layout

```
app/        the web app (client app + /admin coach panel)
vercel.json zero-config Vercel deploy from app/
```

See [`app/README.md`](./app/README.md) for setup, Supabase configuration, and the demo mode.

## Quick start

```bash
cd app
npm install
npm run dev     # http://localhost:5173 — runs in demo mode without any config
```

## Deploy

Push to `main` — Vercel builds via the root `vercel.json`
(install/build inside `app/`, output `app/dist`). Add `VITE_SUPABASE_URL` and
`VITE_SUPABASE_ANON_KEY` in Vercel → Project → Settings → Environment Variables to run
against a real Supabase backend; without them the app ships in demo mode.
