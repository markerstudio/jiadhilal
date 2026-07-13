import { useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { StatTile } from '../components/StatTile';
import { ProgressRing } from '../components/ProgressRing';
import { Badge } from '../components/Badge';
import { Avatar } from '../components/Avatar';
import { Button } from '../components/Button';
import { Icon } from '../components/Icon';
import { Overline, displayStyle, Loading, EmptyState } from '../components/ui';
import { useAuth } from '../lib/AuthContext';
import { useClientData } from '../lib/useClientData';
import {
  todayISO,
  programWeek,
  nextWorkout,
  sessionsInWeek,
  dayStreak,
  topSet,
  weeklyVolume,
  fmtVolume,
} from '../lib/derive';

/* Today / dashboard — the client home. Everything derives from real sessions. */
export function TodayScreen() {
  const { user } = useAuth();
  const { data, loading } = useClientData();
  const navigate = useNavigate();

  if (loading || !data || !user) return <Loading />;

  const today = todayISO();
  const { program, assignment, sessions, notes } = data;
  const workout = program ? nextWorkout(program, sessions) : null;
  const week = assignment ? programWeek(assignment, today) : 1;
  const doneThisWeek = sessionsInWeek(sessions, today).length;
  const target = program?.daysPerWeek ?? 4;
  const streak = dayStreak(sessions, today);
  const best = topSet(sessions);
  const vol = weeklyVolume(sessions, today);
  const latestNote = notes[0];
  const weekday = new Date().toLocaleDateString('en-US', { weekday: 'long' });
  const firstName = user.name.split(' ')[0];
  const trainedToday = sessions.some((s) => s.date === today);

  return (
    <div style={{ color: 'var(--white)', paddingBottom: 16 }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px 8px' }}>
        <div>
          <Overline>
            {weekday} · Week {week}
          </Overline>
          <div style={{ ...displayStyle(26), marginTop: 2 }}>Let's go, {firstName}</div>
        </div>
        <Avatar name={user.name} status="online" ring size={46} />
      </div>

      <div style={{ padding: '6px 22px', display: 'flex', flexDirection: 'column', gap: 16 }}>
        {/* today's workout — brand card */}
        {workout ? (
          <Card variant="brand" interactive onClick={() => navigate(`/workout/${workout.id}`)} padding="20px">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <Badge tone="green" variant="solid" dot>
                {trainedToday ? 'Bonus' : 'Today'}
              </Badge>
              <Icon name="dumbbell" size={26} color="rgba(255,255,255,0.85)" />
            </div>
            <div style={{ ...displayStyle(30), marginTop: 14 }}>{workout.name}</div>
            <div style={{ fontSize: 14, opacity: 0.85, marginTop: 6 }}>
              {workout.exercises.length} exercises · ~{Math.max(30, workout.exercises.length * 9)} min · {workout.subtitle}
            </div>
            <div style={{ marginTop: 18 }}>
              <Button variant="neon" size="md" iconRight={<Icon name="arrow-right" size={18} />}>
                Start workout
              </Button>
            </div>
          </Card>
        ) : (
          <Card variant="dark" padding="20px">
            <EmptyState title="No program assigned yet" hint="Your coach will assign a training program — check back soon." />
          </Card>
        )}

        {/* weekly ring */}
        <Card variant="dark" padding="18px" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <ProgressRing value={(doneThisWeek / target) * 100} sublabel="This week" size={84} dark />
          <div>
            <div style={{ fontFamily: 'var(--font-mono)', fontSize: 22, fontWeight: 700 }}>
              {doneThisWeek} / {target}
            </div>
            <div style={{ fontSize: 12, color: 'var(--gray-400)', fontWeight: 600 }}>sessions done</div>
          </div>
        </Card>

        {/* stats grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
          <StatTile
            dark
            value={String(streak)}
            label="Day streak"
            delta={streak >= 10 ? 'Personal best' : streak > 0 ? 'Keep it alive' : 'Start today'}
            deltaTone="neutral"
            icon={<Icon name="flame" size={16} />}
          />
          <StatTile
            dark
            value={best ? String(best.w) : '—'}
            unit={best ? 'kg' : undefined}
            label={best ? best.exercise.split(' ').slice(-2).join(' ') : 'Top set'}
            delta={best ? `×${best.r} reps` : undefined}
            deltaTone="neutral"
          />
          <StatTile dark value={fmtVolume(vol.volume)} label="Weekly volume" delta={`${vol.delta >= 0 ? '+' : '−'}${fmtVolume(Math.abs(vol.delta))}`} deltaTone={vol.delta >= 0 ? 'green' : 'red'} />
          <StatTile dark value={String(sessions.length)} label="Total sessions" delta="All time" deltaTone="neutral" />
        </div>

        {/* coach note */}
        {latestNote && (
          <Card variant="dark" padding="16px" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <Avatar name="Jiad Hilal" size={40} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--purple-300)' }}>
                Note from Jiad
              </div>
              <div style={{ fontSize: 13.5, color: 'var(--gray-200)', marginTop: 3, lineHeight: 1.45 }}>{latestNote.body}</div>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}
