import React from 'react';
import { Card } from '../components/Card';
import { StatTile } from '../components/StatTile';
import { Tabs } from '../components/Tabs';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';
import { PageTitle, Loading } from '../components/ui';
import { useClientData } from '../lib/useClientData';
import {
  todayISO,
  addDays,
  sessionVolume,
  volumeByWeek,
  recentPRs,
  relativeDay,
  weeklyVolume,
} from '../lib/derive';

type Range = 'Week' | 'Month' | 'Year';

/* Progress — volume chart, range totals, recent PRs. All derived from sessions. */
export function ProgressScreen({ clientId }: { clientId?: string }) {
  const { data, loading } = useClientData(clientId);
  const [range, setRange] = React.useState<Range>('Month');

  if (loading || !data) return <Loading />;
  const { sessions } = data;
  const today = todayISO();

  // chart bars per range: Week → 7 daily bars; Month → 8 weekly; Year → 12 weekly-ish
  let bars: number[];
  if (range === 'Week') {
    bars = Array.from({ length: 7 }, (_, i) => {
      const d = addDays(today, -(6 - i));
      return sessions.filter((s) => s.date === d).reduce((a, s) => a + sessionVolume(s), 0);
    });
  } else {
    bars = volumeByWeek(sessions, today, range === 'Month' ? 8 : 12);
  }
  const max = Math.max(1, ...bars);

  const rangeDays = range === 'Week' ? 7 : range === 'Month' ? 30 : 365;
  const cutoff = addDays(today, -rangeDays);
  const inRange = sessions.filter((s) => s.date >= cutoff);
  const totalVol = inRange.reduce((a, s) => a + sessionVolume(s), 0);
  const hours = inRange.reduce((a, s) => a + s.durationMin, 0) / 60;
  const vol = weeklyVolume(sessions, today);
  const deltaPct = vol.volume - vol.delta > 0 ? Math.round((vol.delta / (vol.volume - vol.delta)) * 100) : 0;
  const prs = recentPRs(sessions, 4);

  return (
    <div style={{ color: 'var(--white)', paddingBottom: 20 }}>
      <div style={{ padding: '18px 22px 4px' }}>
        <PageTitle>Progress</PageTitle>
      </div>
      <div style={{ padding: '8px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Tabs
          variant="pill"
          tabs={['Week', 'Month', 'Year']}
          value={range}
          onChange={(id) => setRange(id as Range)}
          style={{ background: 'var(--ink-800)' }}
        />

        {/* volume chart */}
        <Card variant="dark" padding="18px">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 16 }}>
            <div>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
                Total volume · {range.toLowerCase()}
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 28, fontWeight: 700, marginTop: 2 }}>
                {totalVol.toLocaleString()} <span style={{ fontSize: 15, color: 'var(--purple-300)' }}>kg</span>
              </div>
            </div>
            <Badge tone={deltaPct >= 0 ? 'green' : 'red'} variant="soft" dot>
              {deltaPct >= 0 ? '+' : ''}
              {deltaPct}%
            </Badge>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 110 }}>
            {bars.map((v, i) => {
              const last = i === bars.length - 1;
              return (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                  <div
                    style={{
                      height: `${Math.max(3, (v / max) * 100)}%`,
                      background: last ? 'var(--green-neon)' : 'var(--grad-brand)',
                      borderRadius: '4px 4px 0 0',
                      boxShadow: last ? 'var(--glow-green)' : 'none',
                      opacity: v === 0 ? 0.25 : 1,
                    }}
                  />
                </div>
              );
            })}
          </div>
        </Card>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <StatTile dark value={String(inRange.length)} label="Workouts" delta={`this ${range.toLowerCase()}`} deltaTone="neutral" />
          <StatTile dark value={hours.toFixed(1)} unit="h" label="Time trained" delta={`this ${range.toLowerCase()}`} deltaTone="neutral" />
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
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>{p.exercise}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>{relativeDay(p.date, today)}</div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 16, color: 'var(--green-neon)' }}>{p.w} kg</div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
