import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Button } from '../components/Button';
import { StatTile } from '../components/StatTile';
import { IconButton } from '../components/IconButton';
import { Icon } from '../components/Icon';
import { Loading, DarkField, EmptyState, displayStyle } from '../components/ui';
import { store } from '../lib/store';
import { useAsync } from '../lib/useAsync';
import {
  todayISO,
  addDays,
  sessionsInWeek,
  dayStreak,
  weeklyVolume,
  volumeByWeek,
  recentPRs,
  relativeDay,
  sessionVolume,
  fmtVolume,
} from '../lib/derive';
import { dayTotal, mealsForDay } from '../lib/nutrition';
import { ChatThread } from '../components/ChatThread';
import { PhotoSection } from '../components/PhotoSection';
import type { WellnessTargets } from '../lib/types';

/** Inline coach editor for a client's daily wellness targets. */
function WellnessTargetsEditor({ clientId, initial, onSaved }: { clientId: string; initial: WellnessTargets | null; onSaved: () => void }) {
  const [steps, setSteps] = React.useState(String(initial?.stepsTarget ?? 10000));
  const [sleep, setSleep] = React.useState(String(initial?.sleepTarget ?? 8));
  const [goal, setGoal] = React.useState(initial?.weightGoalKg?.toString() ?? '');
  const [saving, setSaving] = React.useState(false);

  const save = async () => {
    setSaving(true);
    await store.saveWellnessTargets({
      clientId,
      stepsTarget: Math.max(0, Number(steps) || 10000),
      sleepTarget: Math.max(0, Number(sleep) || 8),
      weightGoalKg: goal.trim() === '' ? undefined : Math.max(0, Number(goal) || 0),
    });
    setSaving(false);
    onSaved();
  };

  return (
    <div style={{ padding: '12px 16px 14px', borderTop: '1px solid var(--border-dark)' }}>
      <div style={{ fontSize: 11, fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--gray-500)', marginBottom: 8 }}>
        Daily targets
      </div>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end', flexWrap: 'wrap' }}>
        <DarkField label="Steps" value={steps} onChange={setSteps} type="number" mono width={110} />
        <DarkField label="Sleep (h)" value={sleep} onChange={setSleep} type="number" mono width={90} />
        <DarkField label="Goal wt (kg)" value={goal} onChange={setGoal} type="number" mono width={110} />
        <Button variant="primary" size="sm" disabled={saving} onClick={() => void save()}>
          {saving ? 'Saving…' : 'Save'}
        </Button>
      </div>
    </div>
  );
}

/* Client detail — progress, sessions, PRs, program assignment, coach notes. */
export function AdminClientDetail() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [noteDraft, setNoteDraft] = React.useState('');
  const [sending, setSending] = React.useState(false);

  const { value, loading, reload } = useAsync(async () => {
    const [client, sessions, notes, assignment, programs, nutritionPlan, nutritionLogs, checkIns, wellness] = await Promise.all([
      store.getProfile(clientId!),
      store.listSessions(clientId!),
      store.listNotes(clientId!),
      store.getAssignment(clientId!),
      store.listPrograms(),
      store.getNutritionPlan(clientId!),
      store.listNutritionLogs(clientId!),
      store.listCheckIns(clientId!),
      store.getWellnessTargets(clientId!),
    ]);
    return { client, sessions, notes, assignment, programs, nutritionPlan, nutritionLogs, checkIns, wellness };
  }, [clientId]);

  if (loading || !value) return <Loading />;
  const { client, sessions, notes, assignment, programs, nutritionPlan, nutritionLogs, checkIns, wellness } = value;
  if (!client) return <EmptyState title="Client not found" />;

  const today = todayISO();
  const program = programs.find((p) => p.id === assignment?.programId);
  const done = sessionsInWeek(sessions, today).length;
  const target = program?.daysPerWeek ?? 4;
  const streak = dayStreak(sessions, today);
  const vol = weeklyVolume(sessions, today);
  const bars = volumeByWeek(sessions, today, 8);
  const max = Math.max(1, ...bars);
  const recent = [...sessions].sort((a, b) => b.date.localeCompare(a.date)).slice(0, 5);
  const prs = recentPRs(sessions, 4);

  const sendNote = async () => {
    if (!noteDraft.trim()) return;
    setSending(true);
    await store.addNote({ clientId: client.id, body: noteDraft.trim() });
    setNoteDraft('');
    await reload();
    setSending(false);
  };

  return (
    <div style={{ color: 'var(--white)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap' }}>
        <IconButton aria-label="Back" variant="ghost" onClick={() => navigate('/admin/clients')} style={{ color: 'var(--white)' }}>
          <Icon name="chevron-left" size={22} />
        </IconButton>
        <Avatar name={client.name} size={56} ring={streak > 7} status={streak > 0 ? 'online' : 'rest'} />
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={displayStyle(24)}>{client.name}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 6, flexWrap: 'wrap' }}>
            {client.goal && (
              <Badge tone="purple" variant="solid" size="sm">
                {client.goal}
              </Badge>
            )}
            {streak > 0 && (
              <Badge tone="green" variant="soft" size="sm" dot>
                {streak}-day streak
              </Badge>
            )}
            <Badge tone={done >= target ? 'green' : 'neutral'} variant="soft" size="sm">
              {done}/{target} this week
            </Badge>
          </div>
        </div>
        {/* program assignment */}
        <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <span style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-400)', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Program</span>
          <select
            value={assignment?.programId ?? ''}
            onChange={async (e) => {
              if (e.target.value) {
                await store.assignProgram(client.id, e.target.value);
                await reload();
              }
            }}
            style={{
              background: 'var(--ink-800)',
              color: 'var(--white)',
              border: '2px solid var(--border-dark)',
              borderRadius: 'var(--radius-md)',
              height: 40,
              padding: '0 10px',
              fontSize: 14,
              fontWeight: 600,
            }}
          >
            <option value="" disabled>
              Assign…
            </option>
            {programs.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name}
              </option>
            ))}
          </select>
        </label>
        <Button
          variant="secondary"
          size="sm"
          iconLeft={<Icon name="apple" size={16} />}
          onClick={() => navigate(`/admin/clients/${client.id}/nutrition`)}
        >
          Nutrition plan
        </Button>
      </div>

      {/* stats */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
        <StatTile dark value={String(done)} label="This week" delta={`target ${target}`} deltaTone="neutral" />
        <StatTile dark value={fmtVolume(vol.volume)} label="Weekly volume" delta={`${vol.delta >= 0 ? '+' : '−'}${fmtVolume(Math.abs(vol.delta))}`} deltaTone={vol.delta >= 0 ? 'green' : 'red'} />
        <StatTile dark value={String(streak)} label="Day streak" icon={<Icon name="flame" size={16} />} />
        <StatTile dark value={String(sessions.length)} label="Total sessions" delta="all time" deltaTone="neutral" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {/* left column: chart + sessions */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Card variant="dark" padding="18px">
            <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 14 }}>
              Volume · 8 weeks
            </div>
            <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 100 }}>
              {bars.map((v, i) => (
                <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                  <div
                    style={{
                      height: `${Math.max(3, (v / max) * 100)}%`,
                      background: i === bars.length - 1 ? 'var(--green-neon)' : 'var(--grad-brand)',
                      borderRadius: '4px 4px 0 0',
                      opacity: v === 0 ? 0.25 : 1,
                    }}
                  />
                </div>
              ))}
            </div>
          </Card>

          <Card variant="dark" padding="0">
            <div style={{ padding: '14px 16px 8px', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
              Recent sessions
            </div>
            {recent.length === 0 && <EmptyState title="No sessions yet" />}
            {recent.map((s) => (
              <div key={s.id} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderTop: '1px solid var(--border-dark)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 14 }}>{s.workoutName}</div>
                  <div style={{ fontSize: 12, color: 'var(--gray-400)' }}>
                    {relativeDay(s.date, today)} · {s.durationMin} min
                  </div>
                </div>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 13.5, color: 'var(--purple-300)' }}>
                  {fmtVolume(sessionVolume(s))} kg
                </span>
              </div>
            ))}
          </Card>

          {/* nutrition adherence — last 7 days */}
          <Card variant="dark" padding="0">
            <div style={{ display: 'flex', alignItems: 'center', padding: '14px 16px 8px' }}>
              <span style={{ flex: 1, fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
                Nutrition · last 7 days
              </span>
              <button
                onClick={() => navigate(`/admin/clients/${client.id}/nutrition`)}
                style={{ background: 'none', border: 'none', color: 'var(--purple-300)', fontWeight: 800, fontSize: 12.5, cursor: 'pointer', padding: 0 }}
              >
                Edit plan
              </button>
            </div>
            {!nutritionPlan && <EmptyState title="No plan yet" hint="Build one with Edit plan — the default template loads to start from." />}
            {nutritionPlan &&
              Array.from({ length: 7 }, (_, i) => addDays(today, -i)).map((date) => {
                const log = nutritionLogs.find((l) => l.date === date) ?? null;
                const day = nutritionPlan.days[log?.dayType ?? 'training'];
                const meals = mealsForDay(day, log);
                const mealsDone = meals.filter((m) => log?.completedMeals.includes(m.id)).length;
                const planned = dayTotal(day, log);
                return (
                  <div key={date} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', borderTop: '1px solid var(--border-dark)' }}>
                    <span style={{ width: 84, fontSize: 12.5, fontWeight: 700, color: 'var(--gray-300)' }}>{relativeDay(date, today)}</span>
                    <Badge tone={log?.dayType === 'rest' ? 'neutral' : 'purple'} variant="soft" size="sm">
                      {log?.dayType === 'rest' ? 'Rest' : 'Train'}
                    </Badge>
                    <span style={{ flex: 1, fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 700, color: mealsDone === meals.length && meals.length > 0 ? 'var(--green-neon)' : 'var(--gray-400)', textAlign: 'right' }}>
                      {mealsDone}/{meals.length} meals · {Math.round(planned.kcal)} kcal
                    </span>
                    {log?.dayCompleted ? (
                      <Icon name="check" size={16} color="var(--green-neon)" />
                    ) : (
                      <span style={{ width: 16 }} />
                    )}
                  </div>
                );
              })}
          </Card>

          {/* daily check-ins — last 7 days + coach targets */}
          <Card variant="dark" padding="0">
            <div style={{ padding: '14px 16px 8px', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
              Check-ins · last 7 days
            </div>
            {checkIns.filter((c) => c.date > addDays(today, -7)).length === 0 && (
              <EmptyState title="No check-ins yet" hint={`${client.name.split(' ')[0]} logs weight, steps, sleep and resting HR on their Today screen.`} />
            )}
            {checkIns
              .filter((c) => c.date > addDays(today, -7))
              .map((c) => (
                <div key={c.date} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 16px', borderTop: '1px solid var(--border-dark)', fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 700 }}>
                  <span style={{ width: 84, fontFamily: 'var(--font-sans)', color: 'var(--gray-300)' }}>{relativeDay(c.date, today)}</span>
                  <span style={{ flex: 1, textAlign: 'right', color: 'var(--gray-300)' }}>{c.weightKg != null ? `${c.weightKg} kg` : '—'}</span>
                  <span style={{ flex: 1, textAlign: 'right', color: wellness && c.steps != null && c.steps >= wellness.stepsTarget ? 'var(--green-neon)' : 'var(--gray-400)' }}>
                    {c.steps != null ? `${c.steps.toLocaleString()} st` : '—'}
                  </span>
                  <span style={{ flex: 1, textAlign: 'right', color: 'var(--gray-400)' }}>{c.sleepHrs != null ? `${c.sleepHrs} h` : '—'}</span>
                  <span style={{ flex: 1, textAlign: 'right', color: 'var(--gray-400)' }}>{c.restingHr != null ? `${c.restingHr} bpm` : '—'}</span>
                </div>
              ))}
            <WellnessTargetsEditor clientId={client.id} initial={wellness} onSaved={() => void reload()} />
          </Card>

          <Card variant="dark" padding="0">
            <div style={{ padding: '14px 16px 8px', fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
              PRs
            </div>
            {prs.length === 0 && <EmptyState title="No PRs yet" />}
            {prs.map((p, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '11px 16px', borderTop: '1px solid var(--border-dark)' }}>
                <Icon name="trophy" size={16} color="var(--purple-300)" />
                <span style={{ flex: 1, fontWeight: 700, fontSize: 14 }}>{p.exercise}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14.5, color: 'var(--green-neon)' }}>{p.w} kg</span>
              </div>
            ))}
          </Card>
        </div>

        {/* right column: chat, photos, notes */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        <Card variant="dark" padding="16px">
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 12 }}>
            Chat with {client.name.split(' ')[0]}
          </div>
          <ChatThread clientId={client.id} as="coach" height={320} />
        </Card>

        <PhotoSection clientId={client.id} readOnly />

        <Card variant="dark" padding="16px" style={{ alignSelf: 'stretch' }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 12 }}>
            Notes to {client.name.split(' ')[0]}
          </div>
          <DarkField
            textarea
            value={noteDraft}
            onChange={setNoteDraft}
            placeholder="Short, direct, useful. It lands on their Today screen."
          />
          <div style={{ marginTop: 10, display: 'flex', justifyContent: 'flex-end' }}>
            <Button variant="primary" size="sm" disabled={sending || !noteDraft.trim()} onClick={() => void sendNote()} iconRight={<Icon name="send" size={15} />}>
              Send note
            </Button>
          </div>
          <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 10 }}>
            {notes.map((n) => (
              <div key={n.id} style={{ background: 'var(--ink-800)', borderRadius: 'var(--radius-md)', padding: '10px 12px' }}>
                <div style={{ fontSize: 13.5, color: 'var(--gray-200)', lineHeight: 1.45 }}>{n.body}</div>
                <div style={{ fontSize: 11, color: 'var(--gray-500)', marginTop: 6, fontWeight: 600 }}>
                  {new Date(n.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
                </div>
              </div>
            ))}
          </div>
        </Card>
        </div>
      </div>
    </div>
  );
}
