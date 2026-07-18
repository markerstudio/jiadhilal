import { useNavigate } from 'react-router-dom';
import { Avatar } from '../components/Avatar';
import { IconButton } from '../components/IconButton';
import { Icon } from '../components/Icon';
import { ChatThread } from '../components/ChatThread';
import { Loading } from '../components/ui';
import { useAuth } from '../lib/AuthContext';

/* Full-screen chat with the coach (client side). */
export function ChatScreen() {
  const { user } = useAuth();
  const navigate = useNavigate();
  if (!user) return <Loading />;

  return (
    <div style={{ height: '100dvh', background: 'var(--surface-dark)', color: 'var(--white)', display: 'flex', flexDirection: 'column' }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '12px 16px',
          borderBottom: '1px solid var(--border-dark)',
          background: 'rgba(20,17,24,0.9)',
        }}
      >
        <IconButton aria-label="Back" variant="ghost" onClick={() => navigate(-1)} style={{ color: 'var(--white)' }}>
          <Icon name="chevron-left" size={22} />
        </IconButton>
        <Avatar name="Jiad Hilal" size={38} status="online" />
        <div>
          <div style={{ fontWeight: 800, fontSize: 15 }}>Jiad Hilal</div>
          <div style={{ fontSize: 11.5, color: 'var(--green-neon)', fontWeight: 700 }}>Your coach</div>
        </div>
      </div>
      <div style={{ flex: 1, minHeight: 0, maxWidth: 640, width: '100%', margin: '0 auto', padding: '10px 16px calc(12px + env(safe-area-inset-bottom))', boxSizing: 'border-box', display: 'flex' }}>
        <div style={{ flex: 1, minWidth: 0 }}>
          <ChatThread clientId={user.id} as="client" height="100%" />
        </div>
      </div>
    </div>
  );
}
