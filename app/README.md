# Jiad Hilal — Coaching App + Coach Admin

Mobile-first **Vite + React + TypeScript** app on the Jiad Hilal design system.
Two surfaces in one deploy:

- **Client app** (`/`) — Today dashboard, Train (program + history), active workout with
  set logging, Nutrition (daily meal plan with training/rest-day macro targets, per-food
  macros, meal + day completion), daily check-in (weight, steps, sleep, resting HR vs coach targets), Progress (volume chart, body-weight trend, progress photos, PRs), two-way coach chat, Profile. Bottom tab bar
  on mobile; left rail + centered column on desktop (≥900px).
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

## Demo mode vs Firebase

The app picks its backend at build time:

- **No env vars → demo mode.** Data lives in localStorage, seeded with a coach
  (Jiad), three clients, a program, and ~6 weeks of session history. The login screen
  shows one-tap **Demo: client** / **Demo: coach** buttons; any password works.
- **Env vars set → Firebase.** Real auth (email/password) and Firestore with security
  rules. The free **Spark** plan is plenty — no credit card required.

### Wiring up Firebase

1. Create a project at [console.firebase.google.com](https://console.firebase.google.com)
   (Spark plan; you can skip Google Analytics).
2. **Authentication** → Get started → Sign-in method → enable **Email/Password**.
   Then **Users → Add user** for the coach and each client.
3. **Firestore Database** → Create database (production mode) → **Rules** tab →
   paste [`../firebase/firestore.rules`](../firebase/firestore.rules) → Publish.
4. **Project settings → General → Your apps** → add a **Web app** (</>) — no hosting
   needed. Copy the config values into `.env` (see `.env.example`):
   `VITE_FIREBASE_API_KEY` + `VITE_FIREBASE_PROJECT_ID` (auth domain and app id optional).
   For production, add the same vars in **Vercel → Project → Settings →
   Environment Variables** and redeploy.
5. Each user's profile document is created automatically the first time they sign in
   (role `client`). Promote yourself to coach: **Firestore → `profiles` → your doc →
   edit `role` → `coach`**.
6. Sign in as the coach and build your first program in **/admin → Programs** —
   no SQL seeding needed; the builder writes straight to Firestore.

## Structure

```
src/
  App.tsx                router + auth gates (client vs coach)
  main.tsx
  styles/                design tokens (verbatim from the brand system) + base css
  components/            design-system primitives (Button, Card, StatTile, …) + ui helpers
  layouts/               ClientLayout (tabs/rail) · AdminLayout (sidebar/top bar)
  screens/               client: Login, Today, Train, Workout, Nutrition, Progress, Profile
  admin/                 coach: Dashboard, Clients, ClientDetail, Programs, ProgramEditor
  lib/
    types.ts             domain types + DataStore interface
    derive.ts            pure stats derivations (streaks, volume, PRs, next workout)
    nutrition.ts         macro/meal derivations + the default "Jiad nutrition plan" template
    demoStore.ts/demoData.ts   localStorage store + seed (demo mode)
    firebaseStore.ts     Firebase Auth + Firestore implementation of DataStore
    store.ts             picks the active store from env
    AuthContext.tsx      auth for both modes
```

## Notes

- Design tokens under `src/styles/tokens/` are copied verbatim from the brand manual
  (`#6200ff` / `#00f700` / `#ff2e5b` / `#232323`; Archivo + JetBrains Mono via Google
  Fonts — a flagged substitution, swap in licensed files when available).
- Icons: [lucide-react](https://lucide.dev), 2px stroke.
- SPA routing works on Vercel via the `rewrites` entry in the root `vercel.json`.
