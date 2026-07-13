import { Card } from '../components/Card';
import { StatTile } from '../components/StatTile';
import { ProgressRing } from '../components/ProgressRing';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';

/* Today / dashboard — coaching app home */
export function TodayScreen({ onStartWorkout }: { onStartWorkout: () => void }) {
  return (
    <div style={{ background: 'var(--surface-dark)', color: 'var(--white)', minHeight: '100%', paddingBottom: 16 }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px 8px' }}>
        <div>
          <div
            style={{
              fontSize: 12,
              fontWeight: 700,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--gray-400)',
            }}
          >
            Tuesday · Week 4
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 900,
              fontSize: 26,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              marginTop: 2,
            }}
          >
            Let's go, Sam
          </div>
        </div>
        <Avatar name="Sam Rivera" status="online" ring size={46} />
      </div>

      <div style={{ padding: '6px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* today's workout — brand card */}
        <Card variant="brand" interactive onClick={onStartWorkout} padding="20px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Badge tone="green" variant="solid" dot>
              Today
            </Badge>
            <Icon name="dumbbell" size={26} color="rgba(255,255,255,0.85)" />
          </div>
          <div
            style={{
              fontFamily: 'var(--font-display)',
              fontStyle: 'italic',
              fontWeight: 900,
              fontSize: 30,
              textTransform: 'uppercase',
              letterSpacing: '-0.02em',
              marginTop: 14,
              lineHeight: 1,
            }}
          >
            Push Day A
          </div>
          <div style={{ fontSize: 14, opacity: 0.85, marginTop: 6 }}>6 exercises · 52 min · chest, shoulders, triceps</div>
          <div style={{ marginTop: 18 }}>
            <Button variant="neon" size="md" iconRight={<Icon name="arrow-right" size={18} />}>
              Start workout
            </Button>
          </div>
        </Card>

        {/* weekly ring + streak */}
        <div style={{ display: 'flex', gap: 14 }}>
          <Card variant="dark" padding="18px" style={{ flex: 1, display: 'flex', alignItems: 'center', gap: 16 }}>
            <ProgressRing value={75} sublabel="This week" size={84} dark />
            <div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700 }}>3 / 4</div>
              <div style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 600 }}>sessions done</div>
            </div>
          </Card>
        </div>

        {/* stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <StatTile dark value="12" label="Day streak" delta="Personal best" deltaTone="neutral" icon={<Icon name="flame" size={16} />} />
          <StatTile dark value="185" unit="lb" label="Bench top set" delta="+8%" />
          <StatTile dark value="14.2k" label="Weekly volume" delta="+1.1k" />
          <StatTile dark value="7.4" unit="h" label="Avg sleep" delta="-0.3h" deltaTone="red" />
        </div>

        {/* coach note */}
        <Card variant="dark" padding="16px" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
          <Avatar name="Jiad Hilal" size={40} />
          <div style={{ flex: 1 }}>
            <div
              style={{
                fontSize: 12,
                fontWeight: 800,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--purple-300)',
              }}
            >
              Note from Jiad
            </div>
            <div style={{ fontSize: 13.5, color: 'var(--gray-200)', marginTop: 3, lineHeight: 1.45 }}>
              Strong bench last week. Keep the bar path tight today — chest, not shoulders.
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
