import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Switch } from '../components/Switch';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { Icon, type IconName } from '../components/Icon';

/* Lightweight profile screen — settings + coach contact */
export function ProfileScreen() {
  const rows: [IconName, string, boolean][] = [
    ['bell', 'Workout reminders', true],
    ['moon', 'Rest-day notifications', true],
    ['ruler', 'Metric units', false],
  ];
  return (
    <div style={{ background: 'var(--surface-dark)', color: 'var(--white)', minHeight: '100%', paddingBottom: 20 }}>
      <div style={{ padding: '24px 22px', display: 'flex', alignItems: 'center', gap: 16 }}>
        <Avatar name="Sam Rivera" ring status="online" size={64} />
        <div>
          <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontWeight: 900, fontSize: 24, textTransform: 'uppercase' }}>
            Sam Rivera
          </div>
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <Badge tone="purple" variant="solid">
              Hypertrophy
            </Badge>
            <Badge tone="green" variant="soft" dot>
              12-day streak
            </Badge>
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
        <Button variant="secondary" fullWidth>
          Message your coach
        </Button>
      </div>
    </div>
  );
}
