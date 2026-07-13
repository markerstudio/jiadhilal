import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Switch } from '../components/Switch';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Icon, type IconName } from '../components/Icon';
import { displayStyle, Loading } from '../components/ui';
import { useAuth } from '../lib/AuthContext';
import { useClientData } from '../lib/useClientData';
import { dayStreak, todayISO } from '../lib/derive';
import { resetDemoData } from '../lib/demoStore';

/* Profile — user info, settings, sign out. Demo mode adds a data reset. */
export function ProfileScreen() {
  const { user, signOut, demoMode } = useAuth();
  const { data } = useClientData();
  const navigate = useNavigate();

  if (!user) return <Loading />;
  const streak = data ? dayStreak(data.sessions, todayISO()) : 0;

  const rows: [IconName, string, boolean][] = [
    ['bell', 'Workout reminders', true],
    ['moon', 'Rest-day notifications', true],
    ['ruler', 'Metric units', false],
  ];

  return (
    <div style={{ color: 'var(--white)', minHeight: '100%', paddingBottom: 20 }}>
      <div style={{ padding: '24px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Avatar name={user.name} ring status="online" size={64} />
        <div>
          <div style={displayStyle(24)}>{user.name}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            {user.goal && (
              <Badge tone="purple" variant="solid">
                {user.goal}
              </Badge>
            )}
            {streak > 0 && (
              <Badge tone="green" variant="soft" dot>
                {streak}-day streak
              </Badge>
            )}
          </div>
        </div>
      </div>
      <div style={{ padding: '0 22px', display: 'flex', flexDirection: 'column', gap: 12 }}>
        <Card variant="dark" padding="6px 16px">
          {rows.map(([ic, label, def], i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 0',
                borderTop: i ? '1px solid var(--border-dark)' : 'none',
              }}
            >
              <Icon name={ic} size={18} color="var(--purple-300)" />
              <span style={{ flex: 1, fontSize: 14.5, fontWeight: 600 }}>{label}</span>
              <Switch defaultChecked={def} />
            </div>
          ))}
        </Card>

        <Button variant="secondary" fullWidth iconLeft={<Icon name="message-square" size={17} />}>
          Message your coach
        </Button>

        <Button
          variant="ghost"
          fullWidth
          iconLeft={<Icon name="log-out" size={17} />}
          style={{ color: 'var(--gray-400)' }}
          onClick={async () => {
            await signOut();
            navigate('/login', { replace: true });
          }}
        >
          Sign out
        </Button>

        {demoMode && (
          <Button
            variant="ghost"
            fullWidth
            size="sm"
            style={{ color: 'var(--gray-600)' }}
            onClick={() => {
              resetDemoData();
              location.reload();
            }}
          >
            Reset demo data
          </Button>
        )}
      </div>
    </div>
  );
}
