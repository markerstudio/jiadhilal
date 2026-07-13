import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/Button';
import { Input } from '../components/Input';
import { Icon } from '../components/Icon';
import { useAuth } from '../lib/AuthContext';
import { displayStyle } from '../components/ui';
import logoWhite from '../assets/logo-mark-white.png';

/* Login — brand hero + email/password. Demo mode adds one-tap demo logins. */
export function LoginScreen() {
  const { signIn, demoMode } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [error, setError] = React.useState<string | null>(null);
  const [busy, setBusy] = React.useState(false);

  const go = async (emailOverride?: string) => {
    setBusy(true);
    setError(null);
    try {
      await signIn(emailOverride ?? email, password);
      const isCoach = (emailOverride ?? email).toLowerCase().startsWith('coach');
      navigate(isCoach ? '/admin' : '/', { replace: true });
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Could not sign in');
    } finally {
      setBusy(false);
    }
  };

  return (
    <div
      style={{
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at 50% 0%, #2a2140, var(--surface-dark) 70%)',
      }}
    >
      <form
        onSubmit={(e) => {
          e.preventDefault();
          void go();
        }}
        style={{
          width: '100%',
          maxWidth: 430,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          padding: '56px 26px 40px',
          boxSizing: 'border-box',
          color: 'var(--white)',
        }}
      >
        <img src={logoWhite} alt="Jiad Hilal" style={{ width: 64, marginBottom: 28 }} />
        <div style={{ ...displayStyle(44), letterSpacing: '-0.03em', lineHeight: 0.96 }}>
          No
          <br />
          excuses.
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--purple-300)', marginTop: 16 }}>
          Let's get to work
        </div>

        <div style={{ marginTop: 34, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Input
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            iconLeft={<Icon name="mail" size={18} />}
            autoComplete="email"
          />
          <Input
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            iconLeft={<Icon name="lock" size={18} />}
            autoComplete="current-password"
          />
        </div>

        {error && (
          <div style={{ marginTop: 14, fontSize: 13, fontWeight: 700, color: 'var(--red-neon)' }}>{error}</div>
        )}

        <div style={{ marginTop: 26, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Button variant="primary" size="lg" fullWidth type="submit" disabled={busy}>
            {busy ? 'Signing in…' : 'Log in & train'}
          </Button>

          {demoMode && (
            <div style={{ display: 'flex', gap: 10 }}>
              <Button variant="secondary" size="sm" fullWidth type="button" onClick={() => void go('sam@demo.com')}>
                Demo: client
              </Button>
              <Button variant="secondary" size="sm" fullWidth type="button" onClick={() => void go('coach@jiadhilal.com')}>
                Demo: coach
              </Button>
            </div>
          )}

          <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--gray-400)' }}>
            {demoMode ? (
              <>Demo mode — no backend configured. Any password works.</>
            ) : (
              <>
                New here? <span style={{ color: 'var(--purple-300)', fontWeight: 700 }}>Ask Jiad for an invite</span>
              </>
            )}
          </div>
        </div>
      </form>
    </div>
  );
}
