# Apple Health auto-sync (iPhone Shortcuts bridge)

Web apps cannot read Apple Health directly, but the iPhone **Shortcuts** app can —
and it can POST the numbers to the site every day. This bridge has three parts:

1. `api/checkin.js` — a Vercel serverless function that receives the numbers and
   writes them into the client's daily check-in in Firestore (merging with
   anything typed manually).
2. An **ingest token** per client — issued in the app under
   **Profile → Apple Health auto-sync** (stored in `ingestTokens/{clientId}`).
3. A **Shortcuts automation** on the client's iPhone that runs daily.

## One-time server setup (owner)

The endpoint writes to Firestore with a **service account** (it can't use the
client's browser session):

1. Firebase Console → ⚙ **Project settings → Service accounts** →
   **Generate new private key**. A JSON file downloads.
2. Vercel → your project → **Settings → Environment Variables**, add:
   - `FIREBASE_SA_EMAIL` — the `client_email` value from the JSON
   - `FIREBASE_SA_KEY` — the `private_key` value from the JSON
     (paste as-is; literal `\n` sequences are handled)
   - `FIREBASE_PROJECT_ID` — optional, defaults to `jiadhilal-coaching`
3. Redeploy. Also publish the updated `firestore.rules` (adds `ingestTokens`).

Sanity check (should answer `401 Unknown token`, proving auth + Firestore work):

```bash
curl -X POST https://<your-site>/api/checkin \
  -H 'Content-Type: application/json' \
  -d '{"token":"nope","steps":1}'
```

## Client phone setup (once per client)

In the app: **Profile → Apple Health auto-sync** → copy the **token** and
**endpoint URL**. Then on the iPhone:

1. **Shortcuts** app → **+** new Shortcut.
2. Add **Find Health Samples** — Type: *Steps*, Group By: none,
   filtered to *Today*; then **Calculate Statistics** → *Sum* (or set the
   Health action itself to return the daily total).
   Repeat for *Resting Heart Rate* (average), *Sleep* (hours asleep), and
   *Weight* (latest) if tracked.
3. Add **Get Contents of URL**:
   - URL: the endpoint from the app
   - Method: **POST**
   - Request Body: **JSON** with fields:

   | key | value |
   | --- | ----- |
   | `token` | the token from the app |
   | `steps` | Steps result |
   | `restingHr` | Resting HR result |
   | `sleepHrs` | Sleep hours result |
   | `weightKg` | Weight result |

   Send only what you track — every field except `token` is optional. An
   optional `date` (`yyyy-MM-dd`, e.g. from *Format Date*) targets a specific
   day; omitted, the server uses today.
4. **Automation** tab → **+** → *Time of Day* → e.g. **9:00 PM daily** →
   **Run Shortcut** → pick the shortcut → disable **Ask Before Running**.

From then on the check-in fills itself; the client can still open the app and
add or correct anything by hand (manual and synced values merge per field).

## Security notes

- The token only allows writing that one client's `checkins/*` docs — nothing
  can be read with it, and the coach/client can regenerate it anytime in the
  app (old shortcuts stop working immediately).
- The service-account key lives only in Vercel env vars; never commit it.
