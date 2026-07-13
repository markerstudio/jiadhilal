/* Shared domain types — used by both the demo store and the Supabase store. */

export type Role = 'client' | 'coach';

export interface Profile {
  id: string;
  name: string;
  email: string;
  role: Role;
  goal?: string;
}

/** A prescribed set within an exercise (weight lb × reps). */
export interface SetSpec {
  w: number;
  r: number;
}

export interface ExerciseSpec {
  id: string;
  name: string;
  sets: SetSpec[];
}

export interface Workout {
  id: string;
  name: string; // e.g. "Push Day A"
  subtitle: string; // e.g. "chest, shoulders, triceps"
  order: number;
  exercises: ExerciseSpec[];
}

export interface Program {
  id: string;
  name: string;
  description: string;
  daysPerWeek: number;
  workouts: Workout[];
}

export interface Assignment {
  clientId: string;
  programId: string;
  startDate: string; // ISO date
}

export interface LoggedSet {
  w: number;
  r: number;
  done: boolean;
}

export interface LoggedExercise {
  name: string;
  sets: LoggedSet[];
}

export interface Session {
  id: string;
  clientId: string;
  workoutId: string;
  workoutName: string;
  date: string; // ISO date (yyyy-mm-dd)
  durationMin: number;
  exercises: LoggedExercise[];
}

export interface CoachNote {
  id: string;
  clientId: string;
  body: string;
  createdAt: string; // ISO datetime
}

/** CRUD surface implemented by demoStore (localStorage) and supabaseStore. */
export interface DataStore {
  getProfile(id: string): Promise<Profile | null>;
  listClients(): Promise<Profile[]>;

  listPrograms(): Promise<Program[]>;
  getProgram(id: string): Promise<Program | null>;
  saveProgram(p: Program): Promise<void>;
  deleteProgram(id: string): Promise<void>;

  getAssignment(clientId: string): Promise<Assignment | null>;
  assignProgram(clientId: string, programId: string): Promise<void>;

  listSessions(clientId: string): Promise<Session[]>;
  listAllSessions(): Promise<Session[]>;
  addSession(s: Omit<Session, 'id'>): Promise<Session>;

  listNotes(clientId: string): Promise<CoachNote[]>;
  addNote(n: Omit<CoachNote, 'id' | 'createdAt'>): Promise<CoachNote>;
}
