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

/* ---- Nutrition ---- */

export type DayType = 'training' | 'rest';

/** One food line inside a meal. Macros are absolute for the stated portion. */
export interface FoodItem {
  id: string;
  name: string;
  portion: string; // "70 g", "2 large", "1 tsp"
  kcal: number;
  protein: number; // g
  carbs: number; // g
  fat: number; // g
}

export interface Meal {
  id: string;
  name: string; // "Meal 1"
  foods: FoodItem[];
}

export interface MacroTargets {
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

/** The prescribed meals + targets for one day type (training vs rest). */
export interface NutritionDay {
  targets: MacroTargets;
  meals: Meal[];
}

/** A client's meal plan — one template per day type. */
export interface NutritionPlan {
  clientId: string;
  name: string; // "Jiad nutrition plan"
  days: Record<DayType, NutritionDay>;
}

/** Per-date tracking state layered on top of the plan template. */
export interface NutritionLog {
  clientId: string;
  date: string; // ISO date (yyyy-mm-dd)
  dayType: DayType;
  completedMeals: string[]; // meal ids
  dayCompleted: boolean;
  extraFoods: Record<string, FoodItem[]>; // mealId → foods added just for this date
  extraMeals: Meal[]; // meals added just for this date
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

  getNutritionPlan(clientId: string): Promise<NutritionPlan | null>;
  saveNutritionPlan(p: NutritionPlan): Promise<void>;
  getNutritionLog(clientId: string, date: string): Promise<NutritionLog | null>;
  saveNutritionLog(log: NutritionLog): Promise<void>;
}
