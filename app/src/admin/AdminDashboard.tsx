import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { StatTile } from '../components/StatTile';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { ProgressBar } from '../components/ProgressBar';
import { Icon } from '../components/Icon';
import { PageTitle, Loading } from '../components/ui';
import { store } from '../lib/store';
import { useAsync } from '../lib/useAsync';
import {
  todayISO,
  sessionsInWeek,
  sessionVolume,
  volumeByWeek,
  weekStart,
  addDays,
  dayStreak,
  fmtVolume,
} from '../lib/derive';

/* Coach dashboard — analytics across every client. */
export function AdminDashboard() {
  const { value, loading } = useAsync(async () => {
    const [clients, sessions, programs] = await Promise.all([
      store.listClients(),
      store.listAllSessions(),
      store.listPrograms(),
    ]);
    const assignments = await Promise.all(clients.map((c) => store.getAssignment(c.id)));
    return { clients, sessions, programs, assignments };
  }, []);

  if (loading || !value) return <Loading />;
  const { clients, sessions, programs, assignments } = value;
  const today = todayISO();

  const thisWeek = sessionsInWeek(sessions, today);
  const targetTotal = clients.reduce((a, _c, i) => {
    const prog = programs.find((p) => p.id === assignments[i]?.programId);
    return a + (prog?.daysPerWeek ?? 0);
  }, 0);
  const completion = targetTotal ? Math.round((thisWeek.length / targetTotal) * 100) : 0;
  const weekVol = thisWeek.reduce((a, s) => a + sessionVolume(s), 0);
  const bars = volumeByWeek(sessions, today, 8);
  const max = Math.max(1, ...bars);

  // per-client weekly picture, sorted by volume delta (top movers first)
  const rows = clients
    .map((c, i) => {
      const cs = sessions.filter((s) => s.clientId === c.id);
      const prog = programs.find((p) => p.id === assignments[i]?.programId);
      const done = sessionsInWeek(cs, today).length;
      const target = prog?.daysPerWeek ?? 4;
      const cur = sessionsInWeek(cs, today).reduce((a, s) => a + sessionVolume(s), 0);
      const prev = sessionsInWeek(cs, addDays(weekStart(today), -1)).reduce((a, s) => a + sessionVolume(s), 0);
      return { client: c, done, target, streak: dayStreak(cs, today), delta: cur - prev, programName: prog?.name };
    })
    .sort((a, b) => b.delta - a.delta);

  return (
    <div style={{ color: 'var(--white)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <PageTitle kicker={new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}>
        Coach dashboard
      </PageTitle>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12 }}>
        <StatTile dark value={String(clients.length)} label="Active clients" icon={<Icon name="users" size={16} />} />
        <StatTile dark value={String(thisWeek.length)} label="Sessions this week" delta={`of ${targetTotal} planned`} deltaTone="neutral" />
        <StatTile dark value={`${completion}`} unit="%" label="Completion rate" delta={completion >= 75 ? 'On track' : 'Needs a push'} deltaTone={completion >= 75 ? 'green' : 'red'} />
        <StatTile dark value={fmtVolume(weekVol)} label="Volume this week" delta="all clients" deltaTone="neutral" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
        {/* team volume chart */}
        <Card variant="dark" padding="18px">
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 14 }}>
            Team volume · 8 weeks
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 8, height: 120 }}>
            {bars.map((v, i) => (
              <div key={i} style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', height: '100%' }}>
                <div
                  style={{
                    height: `${Math.max(3, (v / max) * 100)}%`,
                    background: i === bars.length - 1 ? 'var(--green-neon)' : 'var(--grad-brand)',
                    borderRadius: '4px 4px 0 0',
                    boxShadow: i === bars.length - 1 ? 'var(--glow-green)' : 'none',
                    opacity: v === 0 ? 0.25 : 1,
                  }}
                />
              </div>
            ))}
          </div>
        </Card>

        {/* roster snapshot */}
        <Card variant="dark" padding="0">
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '14px 16px 8px' }}>
            <span style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
              This week by client
            </span>
            <Link to="/admin/clients" style={{ fontSize: 12.5, fontWeight: 700, color: 'var(--purple-300)', textDecoration: 'none' }}>
              All clients →
            </Link>
          </div>
          {rows.map((r) => (
            <Link
              key={r.client.id}
              to={`/admin/clients/${r.client.id}`}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 12,
                padding: '12px 16px',
                borderTop: '1px solid var(--border-dark)',
                textDecoration: 'none',
                color: 'var(--white)',
              }}
            >
              <Avatar name={r.client.name} size={36} />
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontWeight: 700, fontSize: 14.5 }}>{r.client.name}</div>
                <div style={{ marginTop: 6, maxWidth: 180 }}>
                  <ProgressBar value={(r.done / r.target) * 100} tone={r.done >= r.target ? 'green' : 'brand'} height={5} />
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, fontWeight: 700 }}>
                  {r.done}/{r.target}
                </div>
                <Badge tone={r.delta >= 0 ? 'green' : 'red'} variant="soft" size="sm" style={{ marginTop: 4 }}>
                  {r.delta >= 0 ? '+' : '−'}
                  {fmtVolume(Math.abs(r.delta))} vol
                </Badge>
              </div>
            </Link>
          ))}
        </Card>
      </div>
    </div>
  );
}
