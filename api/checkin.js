/* POST /api/checkin — Apple Health → daily check-in ingest endpoint.
   Called by an iPhone Shortcuts automation (see firebase/APPLE-HEALTH-SYNC.md):
     { "token": "<client ingest token>", "date": "2026-07-18",
       "steps": 10432, "restingHr": 55, "sleepHrs": 7.4, "weightKg": 83.1 }
   Auth: the token maps to a client via the ingestTokens/{clientId} Firestore doc.
   Writes go through the Firestore REST API signed with a service account
   (FIREBASE_SA_EMAIL + FIREBASE_SA_KEY env vars on Vercel) — zero npm deps.
   Uses updateMask so it merges with anything the client typed manually. */
const crypto = require('node:crypto');

const PROJECT_ID = process.env.FIREBASE_PROJECT_ID || process.env.VITE_FIREBASE_PROJECT_ID || 'jiadhilal-coaching';
const SA_EMAIL = process.env.FIREBASE_SA_EMAIL || '';
const SA_KEY = (process.env.FIREBASE_SA_KEY || '').replace(/\\n/g, '\n');
const FIRESTORE = `https://firestore.googleapis.com/v1/projects/${PROJECT_ID}/databases/(default)/documents`;

const b64url = (input) => Buffer.from(input).toString('base64url');

/* Service-account OAuth token (RS256-signed JWT), cached across warm invocations. */
let cached = { token: null, exp: 0 };
async function accessToken() {
  const now = Math.floor(Date.now() / 1000);
  if (cached.token && now < cached.exp - 60) return cached.token;
  const header = b64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }));
  const claims = b64url(
    JSON.stringify({
      iss: SA_EMAIL,
      scope: 'https://www.googleapis.com/auth/datastore',
      aud: 'https://oauth2.googleapis.com/token',
      iat: now,
      exp: now + 3600,
    }),
  );
  const sig = crypto.createSign('RSA-SHA256').update(`${header}.${claims}`).sign(SA_KEY);
  const jwt = `${header}.${claims}.${b64url(sig)}`;
  const res = await fetch('https://oauth2.googleapis.com/token', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: `grant_type=${encodeURIComponent('urn:ietf:params:oauth:grant-type:jwt-bearer')}&assertion=${jwt}`,
  });
  if (!res.ok) throw new Error(`oauth ${res.status}: ${await res.text()}`);
  const data = await res.json();
  cached = { token: data.access_token, exp: now + (data.expires_in || 3600) };
  return cached.token;
}

async function clientIdForToken(token, auth) {
  const res = await fetch(`${FIRESTORE}:runQuery`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${auth}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({
      structuredQuery: {
        from: [{ collectionId: 'ingestTokens' }],
        where: { fieldFilter: { field: { fieldPath: 'token' }, op: 'EQUAL', value: { stringValue: token } } },
        limit: 1,
      },
    }),
  });
  if (!res.ok) throw new Error(`token lookup ${res.status}: ${await res.text()}`);
  const rows = await res.json();
  const name = rows.find((r) => r.document)?.document?.name;
  return name ? name.split('/').pop() : null;
}

const num = (v) => (typeof v === 'number' && Number.isFinite(v) && v >= 0 ? v : typeof v === 'string' && v.trim() !== '' && Number.isFinite(Number(v)) ? Math.max(0, Number(v)) : undefined);

module.exports = async (req, res) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(204).end();
  if (req.method !== 'POST') return res.status(405).json({ ok: false, error: 'POST only' });
  if (!SA_EMAIL || !SA_KEY) {
    return res.status(500).json({ ok: false, error: 'Sync not configured: set FIREBASE_SA_EMAIL and FIREBASE_SA_KEY in Vercel.' });
  }

  let body = req.body;
  if (typeof body === 'string') {
    try {
      body = JSON.parse(body);
    } catch {
      return res.status(400).json({ ok: false, error: 'Invalid JSON' });
    }
  }
  if (!body || typeof body !== 'object') return res.status(400).json({ ok: false, error: 'JSON body required' });

  const token = typeof body.token === 'string' ? body.token.trim() : '';
  if (!token) return res.status(400).json({ ok: false, error: 'token required' });

  const date = typeof body.date === 'string' && /^\d{4}-\d{2}-\d{2}$/.test(body.date) ? body.date : new Date().toISOString().slice(0, 10);
  const metrics = { weightKg: num(body.weightKg), steps: num(body.steps), sleepHrs: num(body.sleepHrs), restingHr: num(body.restingHr) };
  const provided = Object.entries(metrics).filter(([, v]) => v !== undefined);
  if (provided.length === 0) return res.status(400).json({ ok: false, error: 'Send at least one of weightKg, steps, sleepHrs, restingHr' });

  try {
    const auth = await accessToken();
    const clientId = await clientIdForToken(token, auth);
    if (!clientId) return res.status(401).json({ ok: false, error: 'Unknown token' });

    const fields = {
      clientId: { stringValue: clientId },
      date: { stringValue: date },
    };
    for (const [k, v] of provided) fields[k] = { doubleValue: v };
    const mask = ['clientId', 'date', ...provided.map(([k]) => k)]
      .map((f) => `updateMask.fieldPaths=${f}`)
      .join('&');

    const write = await fetch(`${FIRESTORE}/checkins/${clientId}_${date}?${mask}`, {
      method: 'PATCH',
      headers: { Authorization: `Bearer ${auth}`, 'Content-Type': 'application/json' },
      body: JSON.stringify({ fields }),
    });
    if (!write.ok) throw new Error(`write ${write.status}: ${await write.text()}`);

    return res.status(200).json({ ok: true, date, saved: provided.map(([k]) => k) });
  } catch (e) {
    console.error('checkin ingest failed:', e);
    return res.status(500).json({ ok: false, error: 'Sync failed — check server logs' });
  }
};
