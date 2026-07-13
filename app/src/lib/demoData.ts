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

const WORKOUTS: Workout[] = [
  {
    id: 'w-push-a',
    name: 'Push Day A',
    subtitle: 'chest, shoulders, triceps',
    order: 0,
    exercises: [
      ex('e1', 'Barbell Bench Press', [[135, 8], [155, 8], [175, 8], [185, 6]]),
      ex('e2', 'Incline DB Press', [[60, 10], [65, 10], [65, 9]]),
      ex('e3', 'Cable Fly', [[30, 12], [30, 12], [35, 10]]),
      ex('e4', 'Overhead Press', [[95, 8], [105, 8], [110, 6]]),
      ex('e5', 'Triceps Pushdown', [[50, 12], [55, 12], [55, 10]]),
    ],
  },
  {
    id: 'w-pull-a',
    name: 'Pull Day A',
    subtitle: 'back, biceps, rear delts',
    order: 1,
    exercises: [
      ex('e1', 'Deadlift', [[225, 5], [275, 5], [315, 3]]),
      ex('e2', 'Weighted Pull-up', [[25, 8], [25, 7], [25, 6]]),
      ex('e3', 'Barbell Row', [[135, 10], [155, 8], [155, 8]]),
      ex('e4', 'Face Pull', [[40, 15], [40, 15]]),
      ex('e5', 'EZ-Bar Curl', [[60, 10], [65, 8], [65, 8]]),
    ],
  },
  {
    id: 'w-legs-a',
    name: 'Leg Day A',
    subtitle: 'quads, glutes, hamstrings',
    order: 2,
    exercises: [
      ex('e1', 'Back Squat', [[185, 8], [225, 6], [255, 5], [275, 3]]),
      ex('e2', 'Romanian Deadlift', [[185, 10], [205, 8], [205, 8]]),
      ex('e3', 'Leg Press', [[360, 12], [400, 10], [400, 10]]),
      ex('e4', 'Standing Calf Raise', [[180, 15], [180, 15], [180, 12]]),
    ],
  },
  {
    id: 'w-upper-b',
    name: 'Upper B',
    subtitle: 'full upper, pump work',
    order: 3,
    exercises: [
      ex('e1', 'Incline Bench Press', [[115, 10], [135, 8], [145, 8]]),
      ex('e2', 'Lat Pulldown', [[130, 12], [145, 10], [145, 10]]),
      ex('e3', 'DB Lateral Raise', [[20, 15], [20, 15], [25, 12]]),
      ex('e4', 'Hammer Curl', [[35, 12], [35, 12]]),
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
      w: Math.max(5, Math.round((s.w * (1 - 0.02 * progress)) / 5) * 5),
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
