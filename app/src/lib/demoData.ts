/* Demo-mode seed data. Generated relative to "today" so streaks/charts look alive. */
import type { Profile, Program, Assignment, Session, CoachNote, LoggedExercise, Workout } from './types';
import { addDays, todayISO } from './derive';

export const DEMO_COACH: Profile = {
  id: 'coach-jiad',
  name: 'Jiad Hilal',
  email: 'coach@jiadhilal.com',
  role: 'coach',
};

export const DEMO_CLIENTS: Profile[] = [
  { id: 'client-sam', name: 'Sam Rivera', email: 'sam@demo.com', role: 'client', goal: 'Hypertrophy' },
  { id: 'client-maya', name: 'Maya Chen', email: 'maya@demo.com', role: 'client', goal: 'Strength' },
  { id: 'client-leo', name: 'Leo Park', email: 'leo@demo.com', role: 'client', goal: 'Fat loss' },
];

const ex = (id: string, name: string, sets: [number, number][]) => ({
  id,
  name,
  sets: sets.map(([w, r]) => ({ w, r })),
});

/* All weights in kg. */
const WORKOUTS: Workout[] = [
  {
    id: 'w-push-a',
    name: 'Push Day A',
    subtitle: 'chest, shoulders, triceps',
    order: 0,
    exercises: [
      ex('e1', 'Barbell Bench Press - Medium Grip', [[60, 8], [70, 8], [77.5, 8], [82.5, 6]]),
      ex('e2', 'Incline Dumbbell Press', [[26, 10], [30, 10], [30, 9]]),
      ex('e3', 'Cable Crossover', [[15, 12], [15, 12], [17.5, 10]]),
      ex('e4', 'Standing Military Press', [[40, 8], [45, 8], [50, 6]]),
      ex('e5', 'Triceps Pushdown', [[25, 12], [27.5, 12], [27.5, 10]]),
    ],
  },
  {
    id: 'w-pull-a',
    name: 'Pull Day A',
    subtitle: 'back, biceps, rear delts',
    order: 1,
    exercises: [
      ex('e1', 'Barbell Deadlift', [[100, 5], [125, 5], [142.5, 3]]),
      ex('e2', 'Weighted Pull Ups', [[10, 8], [10, 7], [10, 6]]),
      ex('e3', 'Bent Over Barbell Row', [[60, 10], [70, 8], [70, 8]]),
      ex('e4', 'Face Pull', [[17.5, 15], [17.5, 15]]),
      ex('e5', 'EZ-Bar Curl', [[27.5, 10], [30, 8], [30, 8]]),
    ],
  },
  {
    id: 'w-legs-a',
    name: 'Leg Day A',
    subtitle: 'quads, glutes, hamstrings',
    order: 2,
    exercises: [
      ex('e1', 'Barbell Squat', [[80, 8], [100, 6], [115, 5], [125, 3]]),
      ex('e2', 'Romanian Deadlift', [[85, 10], [95, 8], [95, 8]]),
      ex('e3', 'Leg Press', [[160, 12], [180, 10], [180, 10]]),
      ex('e4', 'Standing Calf Raises', [[80, 15], [80, 15], [80, 12]]),
    ],
  },
  {
    id: 'w-upper-b',
    name: 'Upper B',
    subtitle: 'full upper, pump work',
    order: 3,
    exercises: [
      ex('e1', 'Barbell Incline Bench Press - Medium Grip', [[52.5, 10], [60, 8], [65, 8]]),
      ex('e2', 'Wide-Grip Lat Pulldown', [[60, 12], [65, 10], [65, 10]]),
      ex('e3', 'Side Lateral Raise', [[10, 15], [10, 15], [12.5, 12]]),
      ex('e4', 'Hammer Curls', [[15, 12], [15, 12]]),
    ],
  },
];

export const DEMO_PROGRAM: Program = {
  id: 'prog-hyper-1',
  name: 'Hypertrophy Block 1',
  description: '4-day upper/lower split. Progressive overload on the big lifts, pump volume behind it.',
  daysPerWeek: 4,
  workouts: WORKOUTS,
};

export const DEMO_ASSIGNMENTS: Assignment[] = DEMO_CLIENTS.map((c) => ({
  clientId: c.id,
  programId: DEMO_PROGRAM.id,
  startDate: addDays(todayISO(), -24), // week 4
}));

/** Turn a workout's specs into a completed logged session, with light per-week progression. */
function loggedFrom(w: Workout, progress: number): LoggedExercise[] {
  return w.exercises.map((e) => ({
    name: e.name,
    sets: e.sets.map((s) => ({
      w: Math.max(2.5, Math.round((s.w * (1 - 0.02 * progress)) / 2.5) * 2.5),
      r: s.r,
      done: true,
    })),
  }));
}

function history(clientId: string, daysAgoList: number[]): Session[] {
  const today = todayISO();
  return daysAgoList.map((daysAgo, i) => {
    const w = WORKOUTS[(daysAgoList.length - 1 - i) % WORKOUTS.length];
    const weeksBack = Math.floor(daysAgo / 7);
    return {
      id: `s-${clientId}-${daysAgo}`,
      clientId,
      workoutId: w.id,
      workoutName: w.name,
      date: addDays(today, -daysAgo),
      durationMin: 45 + ((daysAgo * 7) % 20),
      exercises: loggedFrom(w, weeksBack),
    };
  });
}

/* Sam trains ~4×/week and is on a streak; Maya ~3×/week; Leo is slipping. */
export const DEMO_SESSIONS: Session[] = [
  ...history('client-sam', [38, 36, 33, 31, 29, 26, 24, 22, 19, 17, 15, 12, 10, 8, 5, 3, 2, 1]),
  ...history('client-maya', [37, 34, 30, 27, 23, 20, 16, 13, 9, 6, 2]),
  ...history('client-leo', [39, 35, 32, 28, 25, 21, 11, 4]),
];

export const DEMO_NOTES: CoachNote[] = [
  {
    id: 'n1',
    clientId: 'client-sam',
    body: 'Strong bench last week. Keep the bar path tight today — chest, not shoulders.',
    createdAt: new Date(Date.now() - 86400_000).toISOString(),
  },
  {
    id: 'n2',
    clientId: 'client-maya',
    body: 'Deadlift is moving well. We pull for a PR next week — sleep and eat like it.',
    createdAt: new Date(Date.now() - 2 * 86400_000).toISOString(),
  },
  {
    id: 'n3',
    clientId: 'client-leo',
    body: 'Two sessions missed. No guilt — just show up today and log the work.',
    createdAt: new Date(Date.now() - 3 * 86400_000).toISOString(),
  },
];
