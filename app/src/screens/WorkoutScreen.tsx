import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Card } from '../components/Card';
import { Checkbox } from '../components/Checkbox';
import { ProgressBar } from '../components/ProgressBar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { Icon } from '../components/Icon';
import { Loading, EmptyState } from '../components/ui';
import { useClientData } from '../lib/useClientData';
import { store } from '../lib/store';
import { todayISO } from '../lib/derive';
import type { LoggedSet } from '../lib/types';

const numInput: React.CSSProperties = {
  width: 52,
  background: 'transparent',
  border: 'none',
  outline: 'none',
  color: 'var(--white)',
  fontFamily: 'var(--font-mono)',
  fontSize: 16,
  fontWeight: 700,
  padding: 0,
};

function mmss(totalSec: number): string {
  const m = Math.floor(totalSec / 60);
  const s = totalSec % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

/* Active workout — check off sets (weights/reps editable), finish saves a session. */
export function WorkoutScreen() {
  const { workoutId } = useParams();
  const navigate = useNavigate();
  const { data, loading, clientId } = useClientData();
  const [logged, setLogged] = React.useState<LoggedSet[][] | null>(null);
  const [saving, setSaving] = React.useState(false);
  const [elapsed, setElapsed] = React.useState(0);

  const workout = data?.program?.workouts.find((w) => w.id === workoutId) ?? null;

  React.useEffect(() => {
    if (workout && !logged) {
      setLogged(workout.exercises.map((e) => e.sets.map((s) => ({ ...s, done: false }))));
    }
  }, [workout, logged]);

  React.useEffect(() => {
    const t = setInterval(() => setElapsed((s) => s + 1), 1000);
    return () => clearInterval(t);
  }, []);

  if (loading || !data) return <Loading />;
  if (!workout || !logged) {
    return (
      <div style={{ padding: 40 }}>
        <EmptyState title="Workout not found" hint="It may have been removed from your program." />
        <div style={{ textAlign: 'center' }}>
          <Button variant="secondary" onClick={() => navigate('/train')}>Back to training</Button>
        </div>
      </div>
    );
  }

  const total = logged.reduce((a, ex) => a + ex.length, 0);
  const completed = logged.reduce((a, ex) => a + ex.filter((s) => s.done).length, 0);

  const update = (ei: number, si: number, patch: Partial<LoggedSet>) =>
    setLogged((prev) =>
      prev!.map((ex, i) => (i === ei ? ex.map((s, j) => (j === si ? { ...s, ...patch } : s)) : ex)),
    );

  const finish = async () => {
    if (!clientId) return;
    setSaving(true);
    await store.addSession({
      clientId,
      workoutId: workout.id,
      workoutName: workout.name,
      date: todayISO(),
      durationMin: Math.max(1, Math.round(elapsed / 60)),
      exercises: workout.exercises.map((e, ei) => ({ name: e.name, sets: logged[ei] })),
    });
    navigate('/', { replace: true });
  };

  return (
    <div style={{ minHeight: '100dvh', background: 'var(--surface-dark)', color: 'var(--white)' }}>
      <div style={{ maxWidth: 640, margin: '0 auto' }}>
        {/* sticky glass header */}
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
            <IconButton aria-label="Back" variant="ghost" onClick={() => navigate(-1)} style={{ color: 'var(--white)' }}>
              <Icon name="chevron-left" size={22} />
            </IconButton>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontWeight: 800, fontSize: 15, textTransform: 'uppercase', letterSpacing: '0.02em' }}>{workout.name}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--green-neon)' }}>{mmss(elapsed)}</div>
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
          {workout.exercises.map((ex, ei) => {
            const sets = logged[ei];
            const doneCount = sets.filter((s) => s.done).length;
            return (
              <Card key={ex.id} variant="dark" padding="16px">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                  <div>
                    <div style={{ fontWeight: 800, fontSize: 16 }}>{ex.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 600, marginTop: 2 }}>
                      {ex.sets.length} × {ex.sets[0]?.r ?? '—'}
                    </div>
                  </div>
                  <Badge tone={doneCount === sets.length ? 'green' : 'neutral'} variant="soft">
                    {doneCount}/{sets.length}
                  </Badge>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  {sets.map((set, si) => (
                    <div
                      key={si}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 12,
                        padding: '9px 12px',
                        borderRadius: 'var(--radius-sm)',
                        background: set.done ? 'rgba(98,0,255,0.16)' : 'var(--ink-800)',
                        border: set.done ? '1px solid var(--purple-500)' : '1px solid transparent',
                        transition: 'background var(--dur-base) var(--ease-out)',
                      }}
                    >
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--gray-400)', width: 16 }}>{si + 1}</span>
                      <span style={{ display: 'flex', alignItems: 'baseline', flex: 1 }}>
                        <input
                          type="number"
                          inputMode="decimal"
                          value={set.w}
                          onChange={(e) => update(ei, si, { w: Number(e.target.value) || 0 })}
                          style={numInput}
                          aria-label="Weight"
                        />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--purple-300)' }}>lb</span>
                      </span>
                      <span style={{ display: 'flex', alignItems: 'baseline', flex: 1 }}>
                        <input
                          type="number"
                          inputMode="numeric"
                          value={set.r}
                          onChange={(e) => update(ei, si, { r: Number(e.target.value) || 0 })}
                          style={numInput}
                          aria-label="Reps"
                        />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--purple-300)' }}>reps</span>
                      </span>
                      <Checkbox checked={set.done} onChange={(v) => update(ei, si, { done: v })} />
                    </div>
                  ))}
                </div>
              </Card>
            );
          })}

          <Button
            variant="primary"
            size="lg"
            fullWidth
            disabled={saving || completed === 0}
            onClick={() => void finish()}
            iconRight={<Icon name="check" size={20} />}
          >
            {saving ? 'Saving…' : 'Finish workout'}
          </Button>
        </div>
      </div>
    </div>
  );
}
