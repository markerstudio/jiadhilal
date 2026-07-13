import React from 'react';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { ProgressBar } from '../components/ProgressBar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { Icon } from '../components/Icon';

interface SetEntry {
  w: string;
  r: string;
}
interface Exercise {
  name: string;
  target: string;
  sets: SetEntry[];
}

/* Active workout screen — coaching app */
export function WorkoutScreen({ onBack }: { onBack: () => void }) {
  const [done, setDone] = React.useState<Record<string, boolean>>({ '0-0': true, '0-1': true, '1-0': true });
  const exercises: Exercise[] = [
    {
      name: 'Barbell Bench Press',
      target: '4 × 8',
      sets: [
        { w: '135', r: '8' },
        { w: '155', r: '8' },
        { w: '175', r: '8' },
        { w: '185', r: '6' },
      ],
    },
    {
      name: 'Incline DB Press',
      target: '3 × 10',
      sets: [
        { w: '60', r: '10' },
        { w: '65', r: '10' },
        { w: '65', r: '9' },
      ],
    },
    {
      name: 'Cable Fly',
      target: '3 × 12',
      sets: [
        { w: '30', r: '12' },
        { w: '30', r: '12' },
        { w: '35', r: '10' },
      ],
    },
  ];
  const total = exercises.reduce((a, e) => a + e.sets.length, 0);
  const completed = Object.values(done).filter(Boolean).length;

  return (
    <div style={{ background: 'var(--surface-dark)', color: 'var(--white)', minHeight: '100%' }}>
      {/* sticky header */}
      <div
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 5,
          background: 'rgba(20,17,24,0.82)',
          backdropFilter: 'var(--blur-glass)',
          WebkitBackdropFilter: 'var(--blur-glass)',
          padding: '14px 20px 12px',
          borderBottom: '1px solid var(--border-dark)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <IconButton aria-label="Back" variant="ghost" onClick={onBack} style={{ color: 'var(--white)' }}>
            <Icon name="chevron-left" size={22} />
          </IconButton>
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.02em' }}>Push Day A</div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--green-neon)' }}>28:14</div>
          </div>
          <IconButton aria-label="More" variant="ghost" style={{ color: 'var(--white)' }}>
            <Icon name="ellipsis" size={22} />
          </IconButton>
        </div>
        <div style={{ marginTop: 10 }}>
          <ProgressBar value={(completed / total) * 100} tone="green" height={6} />
        </div>
      </div>

      <div style={{ padding: '16px 20px 24px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {exercises.map((ex, ei) => (
          <Card key={ei} variant="dark" padding="16px">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div>
                <div style={{ fontWeight: 800, fontSize: 16 }}>{ex.name}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 600, marginTop: 2 }}>{ex.target}</div>
              </div>
              <Badge tone={ex.sets.every((_, si) => done[`${ei}-${si}`]) ? 'green' : 'neutral'} variant="soft">
                {ex.sets.filter((_, si) => done[`${ei}-${si}`]).length}/{ex.sets.length}
              </Badge>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {ex.sets.map((set, si) => {
                const key = `${ei}-${si}`;
                const on = !!done[key];
                return (
                  <div
                    key={si}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 12,
                      padding: '9px 12px',
                      borderRadius: 'var(--radius-sm)',
                      background: on ? 'rgba(98,0,255,0.16)' : 'var(--ink-800)',
                      border: on ? '1px solid var(--purple-500)' : '1px solid transparent',
                      transition: 'background var(--dur-base) var(--ease-out)',
                    }}
                  >
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gray-400)', width: 16 }}>
                      {si + 1}
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, flex: 1 }}>
                      {set.w}
                      <span style={{ fontSize: 12, color: 'var(--purple-300)' }}> lb</span>
                    </span>
                    <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 700, flex: 1 }}>
                      {set.r}
                      <span style={{ fontSize: 12, color: 'var(--purple-300)' }}> reps</span>
                    </span>
                    <Checkbox checked={on} onChange={(v) => setDone((d) => ({ ...d, [key]: v }))} />
                  </div>
                );
              })}
            </div>
          </Card>
        ))}
        <Button variant="primary" size="lg" fullWidth iconRight={<Icon name="check" size={20} />}>
          Finish workout
        </Button>
      </div>
    </div>
  );
}
