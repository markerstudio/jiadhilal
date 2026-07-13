/* Exercise library — 873 exercises from the open-source free-exercise-db
   (https://github.com/yuhonas/free-exercise-db, public domain), trimmed to
   name / primary muscle / equipment / category. */
import raw from './exercises.json';

export interface LibraryExercise {
  name: string;
  muscle: string;
  equipment: string;
  category: string;
}

export const EXERCISE_LIBRARY = raw as LibraryExercise[];

/** Case-insensitive substring search over name + muscle, capped for dropdown use. */
export function searchExercises(q: string, limit = 30): LibraryExercise[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return EXERCISE_LIBRARY.slice(0, limit);
  const starts: LibraryExercise[] = [];
  const contains: LibraryExercise[] = [];
  for (const e of EXERCISE_LIBRARY) {
    const n = e.name.toLowerCase();
    if (n.startsWith(needle)) starts.push(e);
    else if (n.includes(needle) || e.muscle.toLowerCase().includes(needle)) contains.push(e);
    if (starts.length >= limit) break;
  }
  return [...starts, ...contains].slice(0, limit);
}

/** Where a trainee can watch how an exercise is performed (always available, no API). */
export function exerciseDemoUrl(name: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`how to ${name} proper form`)}`;
}
