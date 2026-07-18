/* Client app chrome — full-viewport, mobile-first.
   Mobile: fixed bottom tab bar. Desktop (≥900px): left rail + centered column. */
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Icon, type IconName } from '../components/Icon';
import { Avatar } from '../components/Avatar';
import { useAuth } from '../lib/AuthContext';
import { useDesktop } from '../lib/useMediaQuery';
import logoWhite from '../assets/logo-mark-white.png';

const TABS: { to: string; icon: IconName; label: string; end?: boolean }[] = [
  { to: '/', icon: 'house', label: 'Today', end: true },
  { to: '/train', icon: 'dumbbell', label: 'Train' },
  { to: '/nutrition', icon: 'apple', label: 'Nutrition' },
  { to: '/progress', icon: 'trending-up', label: 'Progress' },
  { to: '/profile', icon: 'user', label: 'Profile' },
];

export function ClientLayout() {
  const desktop = useDesktop();
  const { user } = useAuth();
  const navigate = useNavigate();
  const { pathname } = useLocation();

  if (desktop) {
    return (
      <div style={{ display: 'flex', minHeight: '100dvh', background: 'var(--surface-dark)' }}>
        {/* left rail */}
        <aside
          style={{
            width: 232,
            flex: 'none',
            borderRight: '1px solid var(--border-dark)',
            padding: '26px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 6,
            position: 'sticky',
            top: 0,
            height: '100dvh',
            boxSizing: 'border-box',
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px 22px' }}>
            <img src={logoWhite} alt="Jiad Hilal" style={{ width: 30 }} />
            <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.02em' }}>
              Jiad Hilal
            </span>
          </div>
          {TABS.map((t) => (
            <NavLink
              key={t.to}
              to={t.to}
              end={t.end}
              style={({ isActive }) => ({
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '11px 12px',
                borderRadius: 'var(--radius-md)',
                textDecoration: 'none',
                fontSize: 14.5,
                fontWeight: 700,
                color: isActive ? 'var(--white)' : 'var(--gray-500)',
                background: isActive ? 'rgba(98,0,255,0.22)' : 'transparent',
                border: isActive ? '1px solid var(--purple-700)' : '1px solid transparent',
                transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
              })}
            >
              <Icon name={t.icon} size={19} />
              {t.label}
            </NavLink>
          ))}
          <div style={{ flex: 1 }} />
          {user && (
            <button
              onClick={() => navigate('/profile')}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 10px',
                background: 'var(--surface-dark-card)',
                border: '1px solid var(--border-dark)',
                borderRadius: 'var(--radius-md)',
                cursor: 'pointer',
                color: 'var(--white)',
                textAlign: 'left',
              }}
            >
              <Avatar name={user.name} size={32} status="online" />
              <div style={{ minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{user.name}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 600 }}>{user.goal ?? 'Athlete'}</div>
              </div>
            </button>
          )}
        </aside>

        {/* centered content column */}
        <main style={{ flex: 1, display: 'flex', justifyContent: 'center', padding: '28px 24px' }}>
          <div key={pathname} className="screen-fade" style={{ width: '100%', maxWidth: 620 }}>
            <Outlet />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--surface-dark)', paddingBottom: 78 }}>
      <div key={pathname} className="screen-fade">
        <Outlet />
      </div>
      {/* bottom tab bar */}
      <nav
        style={{
          position: 'fixed',
          left: 0,
          right: 0,
          bottom: 0,
          zIndex: 30,
          display: 'flex',
          justifyContent: 'space-around',
          alignItems: 'center',
          padding: '10px 14px calc(10px + env(safe-area-inset-bottom))',
          background: 'rgba(20,17,24,0.9)',
          backdropFilter: 'var(--blur-glass)',
          WebkitBackdropFilter: 'var(--blur-glass)',
          borderTop: '1px solid var(--border-dark)',
        }}
      >
        {TABS.map((t) => (
          <NavLink
            key={t.to}
            to={t.to}
            end={t.end}
            style={({ isActive }) => ({
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 4,
              padding: '4px 12px',
              textDecoration: 'none',
              color: isActive ? 'var(--purple-300)' : 'var(--gray-500)',
            })}
          >
            {({ isActive }) => (
              <>
                <Icon name={t.icon} size={22} strokeWidth={isActive ? 2.4 : 2} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.02em' }}>{t.label}</span>
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </div>
  );
}
