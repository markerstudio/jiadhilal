import React from 'react';
import { Card } from './Card';
import { Button } from './Button';
import { Badge } from './Badge';
import { Icon } from './Icon';
import { DarkField } from './ui';
import { store } from '../lib/store';
import { useAuth } from '../lib/AuthContext';
import { todayISO } from '../lib/derive';
import type { CheckIn, WellnessTargets } from '../lib/types';

/**
 * Daily check-in — weight, steps, sleep, resting HR. Manual entry (phones don't
 * expose health data to web apps); shown on the Today screen. All fields optional.
 */
export function CheckInCard() {
  const { user } = useAuth();
  const [checkIn, setCheckIn] = React.useState<CheckIn | null>(null);
  const [targets, setTargets] = React.useState<WellnessTargets | null>(null);
  const [loaded, setLoaded] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const today = todayISO();

  React.useEffect(() => {
    if (!user) return;
    let alive = true;
    void (async () => {
      let c: CheckIn | null = null;
      let t: WellnessTargets | null = null;
      try {
        [c, t] = await Promise.all([store.getCheckIn(user.id, today), store.getWellnessTargets(user.id)]);
      } catch (e) {
        console.error('check-in load failed', e);
      }
      if (!alive) return;
      setCheckIn(c);
      setTargets(t);
      setLoaded(true);
    })();
    return () => {
      alive = false;
    };
  }, [user, today]);

  if (!user || !loaded) return null;

  const save = async (c: CheckIn) => {
    setCheckIn(c);
    setEditing(false);
    await store.saveCheckIn(c);
  };

  if (editing || !checkIn) {
    if (!editing) {
      return (
        <Card variant="dark" padding="16px" interactive onClick={() => setEditing(true)} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <Icon name="heart" size={22} color="var(--red-neon)" />
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 800 }}>Daily check-in</div>
            <div style={{ fontSize: 12.5, color: 'var(--gray-400)', fontWeight: 600, marginTop: 2 }}>
              Log weight, steps, sleep &amp; resting HR
            </div>
          </div>
          <Icon name="chevron-right" size={18} color="var(--gray-500)" />
        </Card>
      );
    }
    return <CheckInForm initial={checkIn} clientId={user.id} date={today} onSave={save} onCancel={() => setEditing(false)} />;
  }

  const stepsPct = targets?.stepsTarget ? Math.min(100, ((checkIn.steps ?? 0) / targets.stepsTarget) * 100) : null;

  return (
    <Card variant="dark" padding="16px" interactive onClick={() => setEditing(true)}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 10 }}>
        <Icon name="heart" size={18} color="var(--red-neon)" />
        <span style={{ fontSize: 14, fontWeight: 800, flex: 1 }}>Daily check-in</span>
        <Badge tone="green" variant="soft" size="sm" dot>
          Logged
        </Badge>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8 }}>
        <Metric icon="scale" label="Weight" value={checkIn.weightKg != null ? `${checkIn.weightKg}` : '—'} unit="kg" />
        <Metric icon="footprints" label="Steps" value={checkIn.steps != null ? checkIn.steps.toLocaleString() : '—'} />
        <Metric icon="moon" label="Sleep" value={checkIn.sleepHrs != null ? `${checkIn.sleepHrs}` : '—'} unit="h" />
        <Metric icon="heart" label="Rest HR" value={checkIn.restingHr != null ? `${checkIn.restingHr}` : '—'} unit="bpm" />
      </div>
      {stepsPct != null && (
        <div style={{ marginTop: 12 }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 11.5, fontWeight: 700, color: 'var(--gray-400)', marginBottom: 5 }}>
            <span>Steps target</span>
            <span style={{ fontFamily: 'var(--font-mono)' }}>
              {(checkIn.steps ?? 0).toLocaleString()} / {targets!.stepsTarget.toLocaleString()}
            </span>
          </div>
          <div style={{ height: 6, borderRadius: 3, background: 'var(--ink-800)' }}>
            <div
              style={{
                width: `${stepsPct}%`,
                height: '100%',
                borderRadius: 3,
                background: stepsPct >= 100 ? 'var(--green-neon)' : 'var(--grad-brand-vivid)',
                transition: 'width var(--dur-slow) var(--ease-out)',
              }}
            />
          </div>
        </div>
      )}
    </Card>
  );
}

function Metric({ icon, label, value, unit }: { icon: 'scale' | 'footprints' | 'moon' | 'heart'; label: string; value: string; unit?: string }) {
  return (
    <div style={{ background: 'var(--ink-800)', borderRadius: 'var(--radius-md)', padding: '9px 8px', textAlign: 'center' }}>
      <Icon name={icon} size={14} color="var(--gray-500)" />
      <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14.5, fontWeight: 700, marginTop: 3 }}>
        {value}
        {unit && value !== '—' && <span style={{ fontSize: 10, color: 'var(--gray-500)' }}> {unit}</span>}
      </div>
      <div style={{ fontSize: 10, fontWeight: 700, color: 'var(--gray-500)', textTransform: 'uppercase', letterSpacing: '0.05em', marginTop: 1 }}>
        {label}
      </div>
    </div>
  );
}

function CheckInForm({
  initial,
  clientId,
  date,
  onSave,
  onCancel,
}: {
  initial: CheckIn | null;
  clientId: string;
  date: string;
  onSave: (c: CheckIn) => void;
  onCancel: () => void;
}) {
  const [weight, setWeight] = React.useState(initial?.weightKg?.toString() ?? '');
  const [steps, setSteps] = React.useState(initial?.steps?.toString() ?? '');
  const [sleep, setSleep] = React.useState(initial?.sleepHrs?.toString() ?? '');
  const [hr, setHr] = React.useState(initial?.restingHr?.toString() ?? '');

  const opt = (s: string) => (s.trim() === '' || Number.isNaN(Number(s)) ? undefined : Math.max(0, Number(s)));
  const any = [weight, steps, sleep, hr].some((s) => s.trim() !== '');

  return (
    <Card variant="dark" padding="16px">
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
        <Icon name="heart" size={18} color="var(--red-neon)" />
        <span style={{ fontSize: 14, fontWeight: 800 }}>Daily check-in</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
        <DarkField label="Weight (kg)" value={weight} onChange={setWeight} type="number" mono placeholder="82.4" />
        <DarkField label="Steps" value={steps} onChange={setSteps} type="number" mono placeholder="10000" />
        <DarkField label="Sleep (h)" value={sleep} onChange={setSleep} type="number" mono placeholder="7.5" />
        <DarkField label="Resting HR (bpm)" value={hr} onChange={setHr} type="number" mono placeholder="58" />
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end', marginTop: 12 }}>
        <Button variant="ghost" size="sm" onClick={onCancel} style={{ color: 'var(--gray-400)' }}>
          Cancel
        </Button>
        <Button
          size="sm"
          disabled={!any}
          onClick={() =>
            onSave({
              clientId,
              date,
              weightKg: opt(weight),
              steps: opt(steps),
              sleepHrs: opt(sleep),
              restingHr: opt(hr),
            })
          }
        >
          Save check-in
        </Button>
      </div>
    </Card>
  );
}
