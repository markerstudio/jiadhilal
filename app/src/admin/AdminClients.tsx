import { Link } from 'react-router-dom';
import { Card } from '../components/Card';
import { Avatar } from '../components/Avatar';
import { Badge } from '../components/Badge';
import { Icon } from '../components/Icon';
import { PageTitle, Loading } from '../components/ui';
import { store } from '../lib/store';
import { useAsync } from '../lib/useAsync';
import { todayISO, sessionsInWeek, dayStreak, relativeDay } from '../lib/derive';

/* Client roster — adherence, streaks, last session. Tap through for detail. */
export function AdminClients() {
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

  return (
    <div style={{ color: 'var(--white)', display: 'flex', flexDirection: 'column', gap: 18 }}>
      <PageTitle kicker={`${clients.length} active`}>Clients</PageTitle>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))', gap: 12 }}>
        {clients.map((c, i) => {
          const cs = sessions.filter((s) => s.clientId === c.id);
          const prog = programs.find((p) => p.id === assignments[i]?.programId);
          const done = sessionsInWeek(cs, today).length;
          const target = prog?.daysPerWeek ?? 4;
          const streak = dayStreak(cs, today);
          const last = [...cs].sort((a, b) => b.date.localeCompare(a.date))[0];
          const onTrack = done >= Math.ceil((target * new Date().getDay()) / 7);
          return (
            <Link key={c.id} to={`/admin/clients/${c.id}`} style={{ textDecoration: 'none' }}>
              <Card variant="dark" interactive padding="16px" style={{ display: 'flex', flexDirection: 'column', gap: 12, height: '100%', boxSizing: 'border-box' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                  <Avatar name={c.name} size={44} ring={streak > 7} status={streak > 0 ? 'online' : 'rest'} />
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <div style={{ fontWeight: 800, fontSize: 15.5, color: 'var(--white)' }}>{c.name}</div>
                    <div style={{ fontSize: 12, color: 'var(--gray-400)', marginTop: 2 }}>{prog?.name ?? 'No program'}</div>
                  </div>
                  <Icon name="chevron-right" size={18} color="var(--gray-500)" />
                </div>
                <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                  {c.goal && (
                    <Badge tone="purple" variant="soft" size="sm">
                      {c.goal}
                    </Badge>
                  )}
                  <Badge tone={done >= target ? 'green' : onTrack ? 'neutral' : 'red'} variant="soft" size="sm">
                    {done}/{target} this week
                  </Badge>
                  {streak > 0 && (
                    <Badge tone="green" variant="soft" size="sm" dot>
                      {streak}d streak
                    </Badge>
                  )}
                </div>
                <div style={{ fontSize: 12, color: 'var(--gray-500)', fontWeight: 600 }}>
                  {last ? `Last session ${relativeDay(last.date, today).toLowerCase()} · ${last.workoutName}` : 'No sessions logged yet'}
                </div>
              </Card>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
