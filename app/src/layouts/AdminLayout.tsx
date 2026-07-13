/* Coach admin chrome — desktop sidebar; mobile sticky top bar with nav pills. */
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { Icon, type IconName } from '../components/Icon';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { useAuth } from '../lib/AuthContext';
import { useDesktop } from '../lib/useMediaQuery';
import logoWhite from '../assets/logo-mark-white.png';

const NAV: { to: string; icon: IconName; label: string; end?: boolean }[] = [
  { to: '/admin', icon: 'layout-dashboard', label: 'Dashboard', end: true },
  { to: '/admin/clients', icon: 'users', label: 'Clients' },
  { to: '/admin/programs', icon: 'clipboard-list', label: 'Programs' },
];

function navStyle(isActive: boolean, desktop: boolean) {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: desktop ? 12 : 7,
    padding: desktop ? '11px 12px' : '8px 14px',
    borderRadius: desktop ? 'var(--radius-md)' : 'var(--radius-pill)',
    textDecoration: 'none',
    fontSize: desktop ? 14.5 : 13,
    fontWeight: 700,
    whiteSpace: 'nowrap' as const,
    color: isActive ? 'var(--white)' : 'var(--gray-500)',
    background: isActive ? 'rgba(98,0,255,0.22)' : 'transparent',
    border: isActive ? '1px solid var(--purple-700)' : '1px solid transparent',
    transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
  };
}

export function AdminLayout() {
  const desktop = useDesktop();
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  const signOutBtn = (
    <button
      onClick={async () => {
        await signOut();
        navigate('/login', { replace: true });
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 8,
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        color: 'var(--gray-500)',
        fontSize: 13,
        fontWeight: 700,
        padding: desktop ? '10px 12px' : 6,
      }}
      aria-label="Sign out"
    >
      <Icon name="log-out" size={16} />
      {desktop && 'Sign out'}
    </button>
  );

  if (desktop) {
    return (
      <div style={{ display: 'flex', minHeight: '100dvh', background: 'var(--surface-dark)' }}>
        <aside
          style={{
            width: 240,
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
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '0 10px 8px' }}>
            <img src={logoWhite} alt="Jiad Hilal" style={{ width: 30 }} />
            <div>
              <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 15, textTransform: 'uppercase' }}>
                Jiad Hilal
              </div>
            </div>
          </div>
          <div style={{ padding: '0 10px 16px' }}>
            <Badge tone="purple" variant="solid" size="sm">
              Coach panel
            </Badge>
          </div>
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} style={({ isActive }) => navStyle(isActive, true)}>
              <Icon name={n.icon} size={19} />
              {n.label}
            </NavLink>
          ))}
          <div style={{ flex: 1 }} />
          {user && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 10px', borderTop: '1px solid var(--border-dark)' }}>
              <Avatar name={user.name} size={32} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 13.5, fontWeight: 800, color: 'var(--white)' }}>{user.name}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 600 }}>Head coach</div>
              </div>
            </div>
          )}
          {signOutBtn}
        </aside>
        <main style={{ flex: 1, padding: '28px 32px', minWidth: 0 }}>
          <div style={{ maxWidth: 1040, margin: '0 auto' }}>
            <Outlet />
          </div>
        </main>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--surface-dark)' }}>
      <header
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 30,
          background: 'rgba(20,17,24,0.9)',
          backdropFilter: 'var(--blur-glass)',
          WebkitBackdropFilter: 'var(--blur-glass)',
          borderBottom: '1px solid var(--border-dark)',
          padding: '12px 16px 10px',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <img src={logoWhite} alt="Jiad Hilal" style={{ width: 26 }} />
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 14, textTransform: 'uppercase', color: 'var(--white)' }}>
            Coach panel
          </span>
          <div style={{ flex: 1 }} />
          {signOutBtn}
        </div>
        <nav style={{ display: 'flex', gap: 6, marginTop: 10, overflowX: 'auto' }} className="screen-scroll">
          {NAV.map((n) => (
            <NavLink key={n.to} to={n.to} end={n.end} style={({ isActive }) => navStyle(isActive, false)}>
              <Icon name={n.icon} size={15} />
              {n.label}
            </NavLink>
          ))}
        </nav>
      </header>
      <main style={{ padding: '18px 16px 32px' }}>
        <Outlet />
      </main>
    </div>
  );
}
