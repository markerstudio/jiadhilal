import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { Icon } from './Icon';
import { store, demoMode } from '../lib/store';
import { useAuth } from '../lib/AuthContext';

const newToken = () => {
  const bytes = new Uint8Array(18);
  crypto.getRandomValues(bytes);
  return 'jh_' + Array.from(bytes, (b) => b.toString(16).padStart(2, '0')).join('');
};

/**
 * Apple Health auto-sync setup (Profile screen). Issues the client's ingest
 * token and walks them through the iPhone Shortcuts automation that POSTs
 * steps / resting HR / sleep / weight to /api/checkin every morning.
 */
export function HealthSyncCard() {
  const { user } = useAuth();
  const [open, setOpen] = React.useState(false);
  const [token, setToken] = React.useState<string | null>(null);
  const [copied, setCopied] = React.useState<string | null>(null);

  const endpoint = `${window.location.origin}/api/checkin`;

  React.useEffect(() => {
    if (!user || !open || token) return;
    let alive = true;
    void (async () => {
      let t = await store.getIngestToken(user.id);
      if (!t) {
        t = newToken();
        await store.saveIngestToken(user.id, t);
      }
      if (alive) setToken(t);
    })();
    return () => {
      alive = false;
    };
  }, [user, open, token]);

  if (!user) return null;

  const copy = async (label: string, value: string) => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(label);
      setTimeout(() => setCopied(null), 1500);
    } catch {
      /* clipboard unavailable — user can select the text */
    }
  };

  const regenerate = async () => {
    const t = newToken();
    await store.saveIngestToken(user.id, t);
    setToken(t);
  };

  const steps: [string, string][] = [
    ['Open the Shortcuts app', 'On your iPhone, create a new Shortcut.'],
    ['Add Health actions', '“Find Health Samples” for Steps (Today, sum), then again for Resting Heart Rate, Sleep, and Weight if you track them.'],
    ['Add “Get Contents of URL”', `URL: ${endpoint} · Method: POST · Request Body: JSON — add your token plus fields steps, restingHr, sleepHrs, weightKg from the Health results.`],
    ['Automate it', 'Shortcuts → Automation → Time of Day (e.g. 9:00 PM daily) → run this Shortcut → turn OFF “Ask Before Running”.'],
  ];

  return (
    <Card variant="dark" padding="16px">
      <div
        onClick={() => setOpen(!open)}
        style={{ display: 'flex', alignItems: 'center', gap: 12, cursor: 'pointer' }}
      >
        <Icon name="heart" size={18} color="var(--red-neon)" />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14.5, fontWeight: 700 }}>Apple Health auto-sync</div>
          <div style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 600, marginTop: 1 }}>
            Send steps, heart rate &amp; sleep automatically
          </div>
        </div>
        <Icon name={open ? 'chevron-up' : 'chevron-down'} size={18} color="var(--gray-500)" />
      </div>

      {open && (
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 12 }}>
          {demoMode && (
            <Badge tone="neutral" variant="soft" size="sm">
              Demo mode — sync works on the live site
            </Badge>
          )}

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 6 }}>
              Your sync token
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <code
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  background: 'var(--ink-950)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '9px 10px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {token ?? '…'}
              </code>
              <Button variant="secondary" size="sm" disabled={!token} onClick={() => token && void copy('token', token)}>
                {copied === 'token' ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 6 }}>
              Endpoint
            </div>
            <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
              <code
                style={{
                  flex: 1,
                  minWidth: 0,
                  fontFamily: 'var(--font-mono)',
                  fontSize: 12,
                  background: 'var(--ink-950)',
                  border: '1px solid var(--border-dark)',
                  borderRadius: 'var(--radius-sm)',
                  padding: '9px 10px',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                  whiteSpace: 'nowrap',
                }}
              >
                {endpoint}
              </code>
              <Button variant="secondary" size="sm" onClick={() => void copy('url', endpoint)}>
                {copied === 'url' ? 'Copied' : 'Copy'}
              </Button>
            </div>
          </div>

          <div>
            <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 8 }}>
              Set up once on your iPhone
            </div>
            {steps.map(([title, detail], i) => (
              <div key={i} style={{ display: 'flex', gap: 10, padding: '7px 0' }}>
                <span
                  style={{
                    width: 22,
                    height: 22,
                    flex: 'none',
                    borderRadius: '50%',
                    background: 'rgba(98,0,255,0.2)',
                    color: 'var(--purple-300)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 11.5,
                    fontWeight: 800,
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700 }}>{title}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)', lineHeight: 1.45, marginTop: 2, overflowWrap: 'break-word' }}>{detail}</div>
                </div>
              </div>
            ))}
          </div>

          <button
            onClick={() => void regenerate()}
            style={{ background: 'none', border: 'none', color: 'var(--gray-500)', fontWeight: 700, fontSize: 12, cursor: 'pointer', padding: 0, textAlign: 'left' }}
          >
            Regenerate token (old shortcut stops working)
          </button>
        </div>
      )}
    </Card>
  );
}
