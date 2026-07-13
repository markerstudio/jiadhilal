import React from 'react';
import { Card } from '../components/Card';
import { StatTile } from '../components/StatTile';
import { Tabs } from '../components/Tabs';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';

/* Progress / stats screen — coaching app */
export function ProgressScreen() {
  const [range, setRange] = React.useState('Month');
  const bars = [40, 55, 48, 70, 62, 85, 78, 92];
  const prs = [
    { lift: 'Bench Press', val: '185 lb', when: '2 days ago' },
    { lift: 'Back Squat', val: '275 lb', when: 'Last week' },
    { lift: 'Deadlift', val: '335 lb', when: '2 weeks ago' },
  ];
  return (
    <div style={{ background: 'var(--surface-dark)', color: 'var(--white)', minHeight: '100%', paddingBottom: 20 }}>
      <div style={{ padding: '18px 22px 4px' }}>
        <div
          style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontWeight: 900,
            fontSize: 26,
            textTransform: 'uppercase',
            letterSpacing: '-0.02em',
          }}
        >
          Progress
        </div>
      </div>
      <div style={{ padding: '8px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Tabs variant="pill" tabs={['Week', 'Month', 'Year']} value={range} onChange={setRange} style={{ background: 'var(--ink-800)' }} />

        {/* volume chart */}
        <Card variant="dark" padding="18px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
                Total volume
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, marginTop: 2 }}>
                112,480 <span style={{ fontSize: 15, color: 'var(--purple-300)' }}>lb</span>
              </div>
            </div>
            <Badge tone="green" variant="soft" dot>
              +14%
            </Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 110 }}>
            {bars.map((h, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                <div
                  style={{
                    height: `${h}%`,
                    background: i === bars.length - 1 ? 'var(--green-neon)' : 'var(--grad-brand)',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: i === bars.length - 1 ? 'var(--glow-green)' : 'none',
                  }}
                />
              </div>
            ))}
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <StatTile dark value="48" label="Workouts" delta="+6 this month" />
          <StatTile dark value="38.5" unit="h" label="Time trained" delta="+4.2h" />
        </div>

        {/* PRs */}
        <Card variant="dark" padding="0">
          <div style={{ padding: '14px 16px 8px', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
            Recent PRs
          </div>
          {prs.map((p, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: '1px solid var(--border-dark)' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: 'var(--radius-sm)',
                  background: 'rgba(98,0,255,0.18)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--purple-300)',
                }}
              >
                <Icon name="trophy" size={18} />
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>{p.lift}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{p.when}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16, color: 'var(--green-neon)' }}>{p.val}</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
