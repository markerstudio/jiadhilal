# Jiad Hilal — Coaching App + Coach Admin

Mobile-first **Vite + React + TypeScript** app on the Jiad Hilal design system.
Two surfaces in one deploy:

- **Client app** (`/`) — Today dashboard, Train (program + history), active workout with
  set logging, Progress (volume chart, PRs), Profile. Bottom tab bar on mobile; left rail
  + centered column on desktop (≥900px).
- **Coach admin** (`/admin`, coach role only) — analytics dashboard, client roster +
  client detail (progress, sessions, PRs, program assignment), program builder
  (workouts/exercises/set prescriptions), and coach notes that land on each client's
  Today screen.

## Run

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts: `npm run build` (typecheck + production build), `npm run typecheck`, `npm run preview`.

## Demo mode vs Supabase

The app picks its backend at build time:

- **No env vars → demo mode.** Data lives in localStorage, seeded with a coach
  (Jiad), three clients, a program, and ~6 weeks of session history. The login screen
  shows one-tap **Demo: client** / **Demo: coach** buttons; any password works.
- **Env vars set → Supabase.** Real auth (email/password) and Postgres with row-level
  security.

### Wiring up Supabase

1. Create a project at [supabase.com](https://supabase.com).
2. Run [`../supabase/schema.sql`](../supabase/schema.sql) in the SQL editor
   (tables, RLS policies, signup trigger), then optionally
   [`../supabase/seed.sql`](../supabase/seed.sql) for a starter program.
3. Create users (Dashboard → Authentication → Add user). Each signup auto-creates a
   `profiles` row. Promote the coach:
   `update public.profiles set role = 'coach' where email = '…';`
4. Copy `.env.example` → `.env` and fill in
   `VITE_SUPABASE_URL` + `VITE_SUPABASE_ANON_KEY`
   (Dashboard → Project Settings → API). For production, add the same two vars in
   **Vercel → Project → Settings → Environment Variables** and redeploy.

## Structure

```
src/
  App.tsx                router + auth gates (client vs coach)
  main.tsx
  styles/                design tokens (verbatim from the brand system) + base css
  components/            design-system primitives (Button, Card, StatTile, …) + ui helpers
  layouts/               ClientLayout (tabs/rail) · AdminLayout (sidebar/top bar)
  screens/               client: Login, Today, Train, Workout, Progress, Profile
  admin/                 coach: Dashboard, Clients, ClientDetail, Programs, ProgramEditor
  lib/
    types.ts             domain types + DataStore interface
    derive.ts            pure stats derivations (streaks, volume, PRs, next workout)
    demoStore.ts/demoData.ts   localStorage store + seed (demo mode)
    supabaseStore.ts     Supabase implementation of DataStore
    store.ts             picks the active store from env
    AuthContext.tsx      auth for both modes
```

## Notes

- Design tokens under `src/styles/tokens/` are copied verbatim from the brand manual
  (`#6200ff` / `#00f700` / `#ff2e5b` / `#232323`; Archivo + JetBrains Mono via Google
  Fonts — a flagged substitution, swap in licensed files when available).
- Icons: [lucide-react](https://lucide.dev), 2px stroke.
- SPA routing works on Vercel via the `rewrites` entry in the root `vercel.json`.
