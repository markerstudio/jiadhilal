/* Food library — common coaching-staple foods with macros, used by the coach's
   nutrition plan builder (and the client's add-food form) so nobody hand-types
   macros. Values are per 100 g (basis 'g') or per single unit (basis 'unit'),
   from standard nutrition databases (USDA / packaging averages). */
import type { FoodItem } from './types';
import { foodId } from './nutrition';

export interface LibraryFood {
  name: string;
  category: string; // protein · carb · fruit · veg · fat · dairy · treat
  basis: 'g' | 'unit';
  unitLabel?: string; // for basis 'unit', e.g. "large" (egg), "tsp"
  /** Macros per 100 g, or per 1 unit for basis 'unit'. */
  kcal: number;
  protein: number;
  carbs: number;
  fat: number;
}

const g = (name: string, category: string, kcal: number, protein: number, carbs: number, fat: number): LibraryFood => ({
  name,
  category,
  basis: 'g',
  kcal,
  protein,
  carbs,
  fat,
});

const unit = (name: string, category: string, unitLabel: string, kcal: number, protein: number, carbs: number, fat: number): LibraryFood => ({
  name,
  category,
  basis: 'unit',
  unitLabel,
  kcal,
  protein,
  carbs,
  fat,
});

export const FOOD_LIBRARY: LibraryFood[] = [
  // proteins
  g('Chicken breast', 'protein', 106, 24, 0, 1.1),
  g('Chicken thigh', 'protein', 145, 19, 0, 7.5),
  g('Extra lean ground beef', 'protein', 126, 21.5, 0, 4.5),
  g('Lean beef steak', 'protein', 152, 26, 0, 5),
  g('Turkey breast', 'protein', 104, 24, 0, 0.8),
  g('Salmon fillet', 'protein', 179, 22, 0, 10),
  g('White fish (cod)', 'protein', 82, 18, 0, 0.7),
  g('Tuna (canned in water)', 'protein', 108, 24, 0, 1),
  g('Shrimp', 'protein', 85, 20, 0, 0.5),
  unit('Egg', 'protein', 'large', 70, 6, 0, 5),
  g('Egg whites', 'protein', 52, 11, 0.7, 0.2),
  g('Whey isolate', 'protein', 368, 84, 4.6, 1.6),
  g('Tofu (firm)', 'protein', 96, 10, 3, 5),
  // carbs
  g('Jasmine rice (dry)', 'carb', 356, 6.7, 80, 0),
  g('Basmati rice (dry)', 'carb', 349, 8.1, 77, 0.6),
  g('White rice (cooked)', 'carb', 130, 2.7, 28, 0.3),
  g('Oats (dry)', 'carb', 379, 13.2, 57.5, 6.5),
  g('Rice pudding (COR)', 'carb', 365, 8, 81.3, 1),
  g('Sweet potato', 'carb', 86, 1.6, 20, 0.1),
  g('White potato', 'carb', 77, 2, 17, 0.1),
  g('Pasta (dry)', 'carb', 371, 13, 75, 1.5),
  g('Couscous (dry)', 'carb', 376, 12.8, 77, 0.6),
  g('Quinoa (dry)', 'carb', 368, 14, 64, 6),
  g('Whole wheat bread', 'carb', 247, 13, 41, 3.4),
  g('Pita bread', 'carb', 275, 9, 55, 1.2),
  unit('Rice cake', 'carb', 'piece', 35, 0.7, 7.3, 0.3),
  g('Granola', 'carb', 450, 10, 64, 15),
  g('Chickpeas (cooked)', 'carb', 164, 8.9, 27, 2.6),
  g('Lentils (cooked)', 'carb', 116, 9, 20, 0.4),
  // fruit
  g('Blueberries', 'fruit', 57, 0.7, 12, 0.3),
  g('Banana', 'fruit', 89, 1.1, 23, 0.3),
  g('Apple', 'fruit', 52, 0.3, 14, 0.2),
  g('Strawberries', 'fruit', 32, 0.7, 7.7, 0.3),
  g('Pineapple', 'fruit', 50, 0.5, 12, 0.1),
  g('Orange', 'fruit', 47, 0.9, 12, 0.1),
  g('Grapes', 'fruit', 69, 0.7, 18, 0.2),
  unit('Date (medjool)', 'fruit', 'piece', 66, 0.4, 18, 0),
  // veg
  g('Green veg', 'veg', 42, 1.9, 7.9, 0.3),
  g('Broccoli', 'veg', 34, 2.8, 7, 0.4),
  g('Spinach', 'veg', 23, 2.9, 3.6, 0.4),
  g('Mixed salad', 'veg', 17, 1.2, 3.3, 0.2),
  g('Cucumber', 'veg', 15, 0.7, 3.6, 0.1),
  g('Tomato', 'veg', 18, 0.9, 3.9, 0.2),
  g('Carrots', 'veg', 41, 0.9, 10, 0.2),
  // dairy
  g('Greek yogurt 0%', 'dairy', 59, 10.3, 3.6, 0.4),
  g('Skyr', 'dairy', 63, 11, 4, 0.2),
  g('Cottage cheese', 'dairy', 98, 11, 3.4, 4.3),
  g('Labneh', 'dairy', 174, 8, 5, 13.5),
  g('Skim milk', 'dairy', 34, 3.4, 5, 0.1),
  g('Halloumi', 'dairy', 321, 22, 2.2, 25),
  g('Feta', 'dairy', 264, 14, 4.1, 21),
  // fats
  g('Peanut butter', 'fat', 588, 25, 21, 50),
  g('Almonds', 'fat', 579, 21, 22, 50),
  g('Walnuts', 'fat', 654, 15, 14, 65),
  g('Cashews', 'fat', 553, 18, 30, 44),
  g('Avocado', 'fat', 160, 2, 8.5, 15),
  unit('Olive oil', 'fat', 'tbsp', 119, 0, 0, 13.5),
  g('Hummus', 'fat', 166, 8, 14, 10),
  g('Chia seeds', 'fat', 486, 17, 42, 31),
  // treats / extras
  g('Honey', 'treat', 304, 0.3, 82, 0),
  g('Dark chocolate 85%', 'treat', 592, 9.7, 33, 46),
  unit('Cinnamon', 'treat', 'tsp', 6, 0.1, 0.6, 0),
];

/** Case-insensitive search over name + category, prefix matches first. */
export function searchFoods(q: string, limit = 30): LibraryFood[] {
  const needle = q.trim().toLowerCase();
  if (!needle) return FOOD_LIBRARY.slice(0, limit);
  const starts: LibraryFood[] = [];
  const contains: LibraryFood[] = [];
  for (const f of FOOD_LIBRARY) {
    const n = f.name.toLowerCase();
    if (n.startsWith(needle)) starts.push(f);
    else if (n.includes(needle) || f.category.includes(needle)) contains.push(f);
    if (starts.length >= limit) break;
  }
  return [...starts, ...contains].slice(0, limit);
}

/** Recipe / prep video for a food (search link — always works, no API key). */
export function foodVideoUrl(name: string): string {
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(`${name} healthy recipe how to prepare`)}`;
}

/** Scale a library food to a quantity (grams, or unit count) → concrete FoodItem. */
export function toFoodItem(f: LibraryFood, qty: number): FoodItem {
  const factor = f.basis === 'g' ? qty / 100 : qty;
  const round1 = (n: number) => Math.round(n * 10) / 10;
  return {
    id: foodId(),
    name: f.name,
    portion: f.basis === 'g' ? `${qty} g` : `${qty} ${f.unitLabel ?? 'x'}`,
    kcal: Math.round(f.kcal * factor),
    protein: round1(f.protein * factor),
    carbs: round1(f.carbs * factor),
    fat: round1(f.fat * factor),
  };
}
