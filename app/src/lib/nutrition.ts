/* Nutrition derivation helpers + the default "Jiad nutrition plan" template.
   Pure functions over the plan/log types — screens stay declarative. */
import type { DayType, FoodItem, MacroTargets, Meal, NutritionDay, NutritionLog, NutritionPlan } from './types';

/** Macro display colors on the dark app surface (kcal · protein · carbs · fat). */
export const MACRO_COLORS: Record<keyof MacroTargets, string> = {
  kcal: 'var(--purple-400)',
  protein: 'var(--green-neon)',
  carbs: '#ffa62e',
  fat: 'var(--red-neon)',
};

export const MACRO_KEYS = ['kcal', 'protein', 'carbs', 'fat'] as const;

export const ZERO_MACROS: MacroTargets = { kcal: 0, protein: 0, carbs: 0, fat: 0 };

export function addMacros(a: MacroTargets, b: { kcal: number; protein: number; carbs: number; fat: number }): MacroTargets {
  return {
    kcal: a.kcal + b.kcal,
    protein: a.protein + b.protein,
    carbs: a.carbs + b.carbs,
    fat: a.fat + b.fat,
  };
}

export function foodsTotal(foods: FoodItem[]): MacroTargets {
  return foods.reduce<MacroTargets>((acc, f) => addMacros(acc, f), ZERO_MACROS);
}

/** A plan meal merged with any date-specific extra foods from the log. */
export function mealFoods(meal: Meal, log: NutritionLog | null): FoodItem[] {
  return [...meal.foods, ...(log?.extraFoods[meal.id] ?? [])];
}

/** All meals shown for a date: the day-type template plus date-specific extras. */
export function mealsForDay(day: NutritionDay, log: NutritionLog | null): Meal[] {
  return [...day.meals, ...(log?.extraMeals ?? [])];
}

/** Planned totals for the whole day (template + extras). */
export function dayTotal(day: NutritionDay, log: NutritionLog | null): MacroTargets {
  return mealsForDay(day, log).reduce<MacroTargets>(
    (acc, m) => addMacros(acc, foodsTotal(mealFoods(m, log))),
    ZERO_MACROS,
  );
}

/** Format a macro value: grams for macros, plain integer for kcal. */
export function fmtMacro(key: keyof MacroTargets, v: number): string {
  const n = Math.round(v * 10) / 10;
  const s = Number.isInteger(n) ? String(n) : n.toFixed(1);
  return key === 'kcal' ? s : `${s}g`;
}

export function emptyLog(clientId: string, date: string, dayType: DayType = 'training'): NutritionLog {
  return { clientId, date, dayType, completedMeals: [], dayCompleted: false, extraFoods: {}, extraMeals: [] };
}

export const foodId = () => `f-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 6)}`;

/* ---- Default plan (seeded per client on first visit) ---- */

const food = (id: string, name: string, portion: string, kcal: number, protein: number, carbs: number, fat: number): FoodItem => ({
  id,
  name,
  portion,
  kcal,
  protein,
  carbs,
  fat,
});

const meal = (id: string, name: string, foods: FoodItem[]): Meal => ({ id, name, foods });

const TRAINING_MEALS: Meal[] = [
  meal('m1', 'Meal 1', [
    food('m1-egg', 'Egg', '2 large', 140, 12, 0, 10),
    food('m1-oats', 'Oats', '70 g', 265, 9.2, 40, 4.6),
    food('m1-blue', 'Blueberries', '100 g', 57, 0.7, 12, 0.3),
    food('m1-whey', 'Whey isolate', '25 g', 92, 21, 1.1, 0.4),
    food('m1-cinn', 'Cinnamon', '1 tsp', 6, 0.1, 0.6, 0),
  ]),
  meal('m2', 'Meal 2', [
    food('m2-chik', 'Chicken breast', '200 g', 212, 48, 0, 2.2),
    food('m2-rice', 'Jasmine rice', '70 g', 249, 4.7, 56, 0),
    food('m2-pine', 'Pineapple', '100 g', 50, 0.5, 12, 0.1),
  ]),
  meal('m3', 'Meal 3', [
    food('m3-whey', 'Whey isolate', '50 g', 184, 42, 2.3, 0.8),
    food('m3-ricepud', 'Rice pudding (COR)', '80 g', 292, 6.4, 65, 0.8),
    food('m3-honey', 'Honey', '20 g', 61, 0.1, 16, 0),
  ]),
  meal('m4', 'Meal 4', [
    food('m4-chik', 'Chicken breast', '200 g', 212, 48, 0, 2.2),
    food('m4-rice', 'Jasmine rice', '70 g', 249, 4.7, 56, 0),
    food('m4-veg', 'Green veg', '100 g', 42, 1.9, 7.9, 0.3),
  ]),
  meal('m5', 'Meal 5', [
    food('m5-beef', 'Extra lean ground beef', '200 g', 252, 43, 0, 8.9),
    food('m5-rice', 'Jasmine rice', '70 g', 249, 4.7, 56, 0),
    food('m5-veg', 'Green veg', '100 g', 42, 1.9, 7.9, 0.3),
  ]),
  meal('m6', 'Meal 6', [
    food('m6-whey', 'Whey isolate', '50 g', 184, 42, 2.3, 0.8),
    food('m6-oats', 'Oats', '50 g', 190, 6.6, 29, 3.3),
    food('m6-pb', 'Peanut butter', '15 g', 88, 3.8, 3.2, 7.5),
    food('m6-honey', 'Honey', '10 g', 30, 0, 8, 0),
  ]),
];

const REST_MEALS: Meal[] = [
  meal('m1', 'Meal 1', [
    food('m1-egg', 'Egg', '2 large', 140, 12, 0, 10),
    food('m1-oats', 'Oats', '50 g', 190, 6.6, 29, 3.3),
    food('m1-blue', 'Blueberries', '100 g', 57, 0.7, 12, 0.3),
    food('m1-whey', 'Whey isolate', '25 g', 92, 21, 1.1, 0.4),
    food('m1-cinn', 'Cinnamon', '1 tsp', 6, 0.1, 0.6, 0),
  ]),
  meal('m2', 'Meal 2', [
    food('m2-chik', 'Chicken breast', '200 g', 212, 48, 0, 2.2),
    food('m2-rice', 'Jasmine rice', '60 g', 213, 4, 48, 0),
    food('m2-pine', 'Pineapple', '100 g', 50, 0.5, 12, 0.1),
  ]),
  meal('m3', 'Meal 3', [
    food('m3-whey', 'Whey isolate', '50 g', 184, 42, 2.3, 0.8),
    food('m3-ricepud', 'Rice pudding (COR)', '70 g', 256, 5.6, 57, 0.7),
  ]),
  meal('m4', 'Meal 4', [
    food('m4-chik', 'Chicken breast', '200 g', 212, 48, 0, 2.2),
    food('m4-rice', 'Jasmine rice', '60 g', 213, 4, 48, 0),
    food('m4-veg', 'Green veg', '100 g', 42, 1.9, 7.9, 0.3),
  ]),
  meal('m5', 'Meal 5', [
    food('m5-beef', 'Extra lean ground beef', '200 g', 252, 43, 0, 8.9),
    food('m5-rice', 'Jasmine rice', '60 g', 213, 4, 48, 0),
    food('m5-veg', 'Green veg', '100 g', 42, 1.9, 7.9, 0.3),
  ]),
  meal('m6', 'Meal 6', [
    food('m6-whey', 'Whey isolate', '50 g', 184, 42, 2.3, 0.8),
    food('m6-oats', 'Oats', '40 g', 152, 5.3, 23, 2.6),
    food('m6-pb', 'Peanut butter', '15 g', 88, 3.8, 3.2, 7.5),
  ]),
];

/** The coach's default template — cloned per client the first time they open Nutrition. */
export function defaultNutritionPlan(clientId: string): NutritionPlan {
  return {
    clientId,
    name: 'Jiad nutrition plan',
    days: {
      training: { targets: { kcal: 3187, protein: 304.8, carbs: 373, fat: 44.8 }, meals: TRAINING_MEALS },
      rest: { targets: { kcal: 2870, protein: 299.1, carbs: 309.3, fat: 41.3 }, meals: REST_MEALS },
    },
  };
}
