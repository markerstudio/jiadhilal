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
  sessionsInWeek,
  dayStreak,
  weeklyVolume,
  volumeByWeek,
  recentPRs,
  relativeDay,
  sessionVolume,
  fmtVolume,
} from '../lib/derive';

/* Client detail — progress, sessions, PRs, program assignment, coach notes. */
export function AdminClientDetail() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [noteDraft, setNoteDraft] = React.useState('');
  const [sending, setSending] = React.useState(false);

  const { value, loading, reload } = useAsync(async () => {
    const [client, sessions, notes, assignment, programs] = await Promise.all([
      store.getProfile(clientId!),
      store.listSessions(clientId!),
      store.listNotes(clientId!),
      store.getAssignment(clientId!),
      store.listPrograms(),
    ]);
    return { client, sessions, notes, assignment, programs };
  }, [clientId]);

  if (loading || !value) return <Loading />;
  const { client, sessions, notes, assignment, programs } = value;
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
                  {fmtVolume(sessionVolume(s))} lb
                </span>
              </div>
            ))}
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
                <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: 14.5, color: 'var(--green-neon)' }}>{p.w} lb</span>
              </div>
            ))}
          </Card>
        </div>

        {/* right column: notes */}
        <Card variant="dark" padding="16px" style={{ alignSelf: 'start' }}>
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
  );
}
