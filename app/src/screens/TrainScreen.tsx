import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';
import { PageTitle, Loading, EmptyState } from '../components/ui';
import { useClientData } from '../lib/useClientData';
import { nextWorkout, relativeDay, sessionVolume, fmtVolume, todayISO } from '../lib/derive';

/* Train — the client's program (start any workout) + recent session history. */
export function TrainScreen() {
  const { data, loading } = useClientData();
  const navigate = useNavigate();

  if (loading || !data) return <Loading />;
  const { program, sessions } = data;
  const today = todayISO();
  const upNext = program ? nextWorkout(program, sessions) : null;
  const recent = [...sessions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 6);

  return (
    <div style={{ color: 'var(--white)', paddingBottom: 16 }}>
      <div style={{ padding: '18px 22px 4px' }}>
        <PageTitle kicker={program?.name ?? 'Training'}>Train</PageTitle>
      </div>

      <div style={{ padding: '12px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {!program ? (
          <Card variant="dark" padding="20px">
            <EmptyState title="No program assigned yet" hint="Your coach will assign a training program — check back soon." />
          </Card>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[...program.workouts]
              .sort((a, b) => a.order - b.order)
              .map((w) => (
                <Card
                  key={w.id}
                  variant="dark"
                  interactive
                  onClick={() => navigate(`/workout/${w.id}`)}
                  padding="16px"
                  style={{ display: 'flex', alignItems: 'center', gap: 14 }}
                >
                  <div
                    style={{
                      width: 42,
                      height: 42,
                      flex: 'none',
                      borderRadius: 'var(--radius-md)',
                      background: 'rgba(98,0,255,0.18)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--purple-300)',
                    }}
                  >
                    <Icon name="dumbbell" size={20} />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 15.5 }}>{w.name}</div>
                    <div style={{ fontSize: 12.5, color: 'var(--gray-400)', marginTop: 2 }}>
                      {w.exercises.length} exercises · {w.subtitle}
                    </div>
                  </div>
                  {upNext?.id === w.id && (
                    <Badge tone="green" variant="soft" dot>
                      Up next
                    </Badge>
                  )}
                  <Icon name="chevron-right" size={18} color="var(--gray-500)" />
                </Card>
              ))}
          </div>
        )}

        {/* history */}
        <Card variant="dark" padding="0">
          <div style={{ padding: '14px 16px 8px', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
            Recent sessions
          </div>
          {recent.length === 0 && <EmptyState title="Nothing logged yet" hint="Finish a workout and it shows up here." />}
          {recent.map((s) => (
            <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '12px 16px', borderTop: '1px solid var(--border-dark)' }}>
              <div
                style={{
                  width: 36,
                  height: 36,
                  flex: 'none',
                  borderRadius: 'var(--radius-sm)',
                  background: 'var(--ink-800)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--gray-400)',
                }}
              >
                <Icon name="calendar" size={17} />
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>{s.workoutName}</div>
                <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>
                  {relativeDay(s.date, today)} · {s.durationMin} min
                </div>
              </div>
              <div style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14, color: 'var(--purple-300)' }}>
                {fmtVolume(sessionVolume(s))} kg
              </div>
            </div>
          ))}
        </Card>
      </div>
    </div>
  );
}
