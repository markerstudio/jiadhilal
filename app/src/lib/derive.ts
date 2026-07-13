/* Pure derivation helpers — stats computed from raw sessions.
   Shared by client screens and the coach admin so both stores stay CRUD-only. */
import type { Session, Program, Workout, Assignment } from './types';

export const isoDate = (d: Date): string => d.toISOString().slice(0, 10);

export function addDays(date: string, n: number): string {
  const d = new Date(date + 'T00:00:00Z');
  d.setUTCDate(d.getUTCDate() + n);
  return isoDate(d);
}

/** Monday of the week containing `date`. */
export function weekStart(date: string): string {
  const d = new Date(date + 'T00:00:00Z');
  const dow = (d.getUTCDay() + 6) % 7; // 0 = Monday
  return addDays(date, -dow);
}

/** Total lifted volume (lb) of the completed sets in a session. */
export function sessionVolume(s: Session): number {
  return s.exercises.reduce(
    (a, ex) => a + ex.sets.reduce((b, set) => b + (set.done ? set.w * set.r : 0), 0),
    0,
  );
}

export function sessionsInWeek(sessions: Session[], anyDateInWeek: string): Session[] {
  const start = weekStart(anyDateInWeek);
  const end = addDays(start, 7);
  return sessions.filter((s) => s.date >= start && s.date < end);
}

/** Consecutive training days ending today or yesterday. */
export function dayStreak(sessions: Session[], today: string): number {
  const days = new Set(sessions.map((s) => s.date));
  let cursor = days.has(today) ? today : addDays(today, -1);
  let streak = 0;
  while (days.has(cursor)) {
    streak += 1;
    cursor = addDays(cursor, -1);
  }
  return streak;
}

export interface TopSet {
  exercise: string;
  w: number;
  r: number;
  date: string;
}

/** Heaviest completed set across all sessions (optionally filtered by exercise name). */
export function topSet(sessions: Session[], match?: string): TopSet | null {
  let best: TopSet | null = null;
  for (const s of sessions) {
    for (const ex of s.exercises) {
      if (match && !ex.name.toLowerCase().includes(match.toLowerCase())) continue;
      for (const set of ex.sets) {
        if (set.done && (!best || set.w > best.w)) {
          best = { exercise: ex.name, w: set.w, r: set.r, date: s.date };
        }
      }
    }
  }
  return best;
}

/** Weekly volume for the week of `today`, plus delta vs the previous week. */
export function weeklyVolume(sessions: Session[], today: string): { volume: number; delta: number } {
  const cur = sessionsInWeek(sessions, today).reduce((a, s) => a + sessionVolume(s), 0);
  const prev = sessionsInWeek(sessions, addDays(weekStart(today), -1)).reduce(
    (a, s) => a + sessionVolume(s),
    0,
  );
  return { volume: cur, delta: cur - prev };
}

export interface PR {
  exercise: string;
  w: number;
  date: string;
}

/** Personal records: for each exercise, the first date its all-time max weight was hit. */
export function recentPRs(sessions: Session[], limit = 5): PR[] {
  const best = new Map<string, PR>();
  const ordered = [...sessions].sort((a, b) => a.date.localeCompare(b.date));
  for (const s of ordered) {
    for (const ex of s.exercises) {
      for (const set of ex.sets) {
        if (!set.done) continue;
        const cur = best.get(ex.name);
        if (!cur || set.w > cur.w) best.set(ex.name, { exercise: ex.name, w: set.w, date: s.date });
      }
    }
  }
  return [...best.values()].sort((a, b) => b.date.localeCompare(a.date)).slice(0, limit);
}

/** Volume per week for the last `n` weeks (oldest → newest), for bar charts. */
export function volumeByWeek(sessions: Session[], today: string, n = 8): number[] {
  const out: number[] = [];
  for (let i = n - 1; i >= 0; i--) {
    const anchor = addDays(weekStart(today), -7 * i);
    out.push(sessionsInWeek(sessions, anchor).reduce((a, s) => a + sessionVolume(s), 0));
  }
  return out;
}

/** Which workout is "today's" for a client: next in program order after their last session. */
export function nextWorkout(program: Program, sessions: Session[]): Workout | null {
  const ws = [...program.workouts].sort((a, b) => a.order - b.order);
  if (!ws.length) return null;
  const last = [...sessions].sort((a, b) => a.date.localeCompare(b.date)).at(-1);
  if (!last) return ws[0];
  const idx = ws.findIndex((w) => w.id === last.workoutId);
  return ws[(idx + 1) % ws.length];
}

/** Week number of the program for display ("Week 4"). */
export function programWeek(assignment: Assignment, today: string): number {
  const ms = new Date(today).getTime() - new Date(assignment.startDate).getTime();
  return Math.max(1, Math.floor(ms / (7 * 86400_000)) + 1);
}

export function relativeDay(date: string, today: string): string {
  const days = Math.round((new Date(today).getTime() - new Date(date).getTime()) / 86400_000);
  if (days <= 0) return 'Today';
  if (days === 1) return 'Yesterday';
  if (days < 7) return `${days} days ago`;
  if (days < 14) return 'Last week';
  return `${Math.round(days / 7)} weeks ago`;
}

export function fmtVolume(v: number): string {
  return v >= 1000 ? `${(v / 1000).toFixed(1)}k` : `${v}`;
}

export const todayISO = (): string => isoDate(new Date());
