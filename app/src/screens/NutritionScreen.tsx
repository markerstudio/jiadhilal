import React from 'react';
import { Card } from '../components/Card';
import { Icon } from '../components/Icon';
import { Button } from '../components/Button';
import { Badge } from '../components/Badge';
import { MacroRings } from '../components/MacroRings';
import { Overline, displayStyle, Loading, EmptyState, DarkField } from '../components/ui';
import { useAuth } from '../lib/AuthContext';
import { store } from '../lib/store';
import { addDays, todayISO, relativeDay } from '../lib/derive';
import {
  MACRO_COLORS,
  MACRO_KEYS,
  defaultNutritionPlan,
  dayTotal,
  emptyLog,
  fmtMacro,
  foodId,
  foodsTotal,
  mealFoods,
  mealsForDay,
} from '../lib/nutrition';
import type { DayType, FoodItem, Meal, NutritionLog, NutritionPlan } from '../lib/types';

const MACRO_LABELS: Record<(typeof MACRO_KEYS)[number], string> = {
  kcal: 'Kcal',
  protein: 'Protein',
  carbs: 'Carbs',
  fat: 'Fat',
};

/* Nutrition — the daily meal plan tracker. The coach's template (per training/rest day)
   plus per-date tracking: complete meals, add foods, complete the day. */
export function NutritionScreen() {
  const { user } = useAuth();
  const [plan, setPlan] = React.useState<NutritionPlan | null>(null);
  const [log, setLog] = React.useState<NutritionLog | null>(null);
  const [date, setDate] = React.useState(todayISO());
  const [loading, setLoading] = React.useState(true);
  const [addingFoodTo, setAddingFoodTo] = React.useState<string | null>(null);
  const [expanded, setExpanded] = React.useState<string[]>([]); // completed meals peeked open

  // load (and first-time seed) the plan
  React.useEffect(() => {
    if (!user) return;
    let alive = true;
    void (async () => {
      let p = await store.getNutritionPlan(user.id);
      if (!p) {
        p = defaultNutritionPlan(user.id);
        await store.saveNutritionPlan(p);
      }
      if (alive) setPlan(p);
    })();
    return () => {
      alive = false;
    };
  }, [user]);

  // load the log whenever the date changes
  React.useEffect(() => {
    if (!user) return;
    let alive = true;
    setLoading(true);
    void (async () => {
      const l = await store.getNutritionLog(user.id, date);
      if (!alive) return;
      setLog(l ?? emptyLog(user.id, date));
      setExpanded([]);
      setAddingFoodTo(null);
      setLoading(false);
    })();
    return () => {
      alive = false;
    };
  }, [user, date]);

  const update = (patch: Partial<NutritionLog>) => {
    if (!log) return;
    const next = { ...log, ...patch };
    setLog(next);
    void store.saveNutritionLog(next);
  };

  if (!user || !plan || !log || loading) return <Loading />;

  const day = plan.days[log.dayType];
  const meals = mealsForDay(day, log);
  const planned = dayTotal(day, log);
  const targets = day.targets;
  const doneCount = meals.filter((m) => log.completedMeals.includes(m.id)).length;
  const allDone = doneCount === meals.length && meals.length > 0;

  const toggleMeal = (mealId: string, done: boolean) => {
    const rest = log.completedMeals.filter((id) => id !== mealId);
    const completedMeals = done ? [...rest, mealId] : rest;
    update({ completedMeals, dayCompleted: log.dayCompleted && !done ? false : log.dayCompleted });
    if (done) setExpanded((e) => e.filter((id) => id !== mealId));
  };

  const completeDay = () => {
    if (log.dayCompleted) {
      update({ dayCompleted: false });
    } else {
      update({ dayCompleted: true, completedMeals: meals.map((m) => m.id) });
      setExpanded([]);
    }
  };

  const addFood = (mealId: string, f: FoodItem) => {
    update({ extraFoods: { ...log.extraFoods, [mealId]: [...(log.extraFoods[mealId] ?? []), f] } });
    setAddingFoodTo(null);
  };

  const removeExtraFood = (mealId: string, id: string) => {
    update({
      extraFoods: { ...log.extraFoods, [mealId]: (log.extraFoods[mealId] ?? []).filter((f) => f.id !== id) },
    });
  };

  const addMeal = () => {
    const m: Meal = { id: foodId(), name: `Meal ${meals.length + 1}`, foods: [] };
    update({ extraMeals: [...log.extraMeals, m] });
    setAddingFoodTo(m.id);
  };

  return (
    <div style={{ color: 'var(--white)', paddingBottom: 16 }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '18px 22px 8px' }}>
        <div>
          <Overline>{plan.name}</Overline>
          <div style={{ ...displayStyle(26), marginTop: 2 }}>Nutrition</div>
        </div>
        <Icon name="apple" size={26} color="var(--purple-300)" />
      </div>

      <div style={{ padding: '6px 22px', display: 'flex', flexDirection: 'column', gap: 14 }}>
        {/* date navigator + day type */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <NavArrow dir="chevron-left" onClick={() => setDate(addDays(date, -1))} />
          <div style={{ flex: 1, textAlign: 'center' }}>
            <div style={{ fontWeight: 800, fontSize: 15 }}>{relativeDay(date, todayISO()) === 'Today' ? 'Today' : fmtDate(date)}</div>
            <div style={{ fontSize: 11, color: 'var(--gray-500)', fontWeight: 600, marginTop: 1 }}>
              {relativeDay(date, todayISO())}
            </div>
          </div>
          <NavArrow dir="chevron-right" onClick={() => setDate(addDays(date, 1))} disabled={date >= todayISO()} />
        </div>

        <DayTypeSwitch value={log.dayType} onChange={(dayType) => update({ dayType })} />

        {/* macro summary */}
        <Card variant="dark" padding="18px" style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 9 }}>
            {MACRO_KEYS.map((k) => (
              <div key={k} style={{ display: 'flex', alignItems: 'baseline', gap: 8 }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-400)', width: 56 }}>{MACRO_LABELS[k]}</span>
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: 15, fontWeight: 700, color: MACRO_COLORS[k] }}>
                  {fmtMacro(k, planned[k])}
                  <span style={{ color: 'var(--gray-500)', fontWeight: 600 }}>
                    {' / '}
                    {fmtMacro(k, targets[k])}
                    {k === 'kcal' ? ' kcal' : ''}
                  </span>
                </span>
              </div>
            ))}
            <div style={{ fontSize: 11.5, fontWeight: 700, color: 'var(--gray-500)', marginTop: 2 }}>
              {doneCount} / {meals.length} meals complete
            </div>
          </div>
          <MacroRings
            size={128}
            stroke={11}
            rings={MACRO_KEYS.map((k) => ({
              value: targets[k] > 0 ? (planned[k] / targets[k]) * 100 : 0,
              color: MACRO_COLORS[k],
            }))}
          />
        </Card>

        {/* meals */}
        {meals.length === 0 && (
          <Card variant="dark">
            <EmptyState title="No meals planned" hint="Add a meal to start building this day." />
          </Card>
        )}
        {meals.map((meal) => (
          <MealCard
            key={meal.id}
            meal={meal}
            foods={mealFoods(meal, log)}
            done={log.completedMeals.includes(meal.id)}
            peeked={expanded.includes(meal.id)}
            onPeek={(open) => setExpanded((e) => (open ? [...e, meal.id] : e.filter((id) => id !== meal.id)))}
            onToggleDone={(d) => toggleMeal(meal.id, d)}
            adding={addingFoodTo === meal.id}
            onStartAdd={() => setAddingFoodTo(meal.id)}
            onCancelAdd={() => setAddingFoodTo(null)}
            onAddFood={(f) => addFood(meal.id, f)}
            extraIds={new Set((log.extraFoods[meal.id] ?? []).map((f) => f.id))}
            onRemoveExtra={(id) => removeExtraFood(meal.id, id)}
          />
        ))}

        <button
          onClick={addMeal}
          style={{
            background: 'none',
            border: '1px dashed var(--ink-700)',
            borderRadius: 'var(--radius-lg)',
            color: 'var(--purple-300)',
            fontWeight: 800,
            fontSize: 14,
            padding: '13px 0',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Icon name="plus" size={17} /> Add meal
        </button>

        {log.dayCompleted ? (
          <Button variant="neon" size="lg" fullWidth iconLeft={<Icon name="check" size={19} />} onClick={completeDay}>
            Day complete
          </Button>
        ) : (
          <Button variant="primary" size="lg" fullWidth onClick={completeDay}>
            Complete day{allDone ? '' : ` · ${doneCount}/${meals.length}`}
          </Button>
        )}
      </div>
    </div>
  );
}

/* ---- pieces ---- */

function fmtDate(date: string): string {
  return new Date(date + 'T00:00:00').toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' });
}

function NavArrow({ dir, onClick, disabled }: { dir: 'chevron-left' | 'chevron-right'; onClick: () => void; disabled?: boolean }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={dir === 'chevron-left' ? 'Previous day' : 'Next day'}
      style={{
        width: 40,
        height: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--surface-dark-card)',
        border: '1px solid var(--border-dark)',
        borderRadius: 'var(--radius-md)',
        color: disabled ? 'var(--ink-700)' : 'var(--purple-300)',
        cursor: disabled ? 'default' : 'pointer',
      }}
    >
      <Icon name={dir} size={20} />
    </button>
  );
}

function DayTypeSwitch({ value, onChange }: { value: DayType; onChange: (t: DayType) => void }) {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 4,
        background: 'var(--surface-dark-card)',
        border: '1px solid var(--border-dark)',
        borderRadius: 'var(--radius-pill)',
        padding: 4,
      }}
    >
      {(['training', 'rest'] as const).map((t) => (
        <button
          key={t}
          onClick={() => onChange(t)}
          style={{
            border: 'none',
            borderRadius: 'var(--radius-pill)',
            padding: '9px 0',
            fontWeight: 800,
            fontSize: 13,
            letterSpacing: '0.04em',
            textTransform: 'uppercase',
            cursor: 'pointer',
            background: value === t ? 'var(--purple-500)' : 'transparent',
            color: value === t ? 'var(--white)' : 'var(--gray-500)',
            transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
          }}
        >
          {t === 'training' ? 'Training day' : 'Rest day'}
        </button>
      ))}
    </div>
  );
}

const COL = { width: 46, textAlign: 'right' as const, fontFamily: 'var(--font-mono)' };

function MealCard({
  meal,
  foods,
  done,
  peeked,
  onPeek,
  onToggleDone,
  adding,
  onStartAdd,
  onCancelAdd,
  onAddFood,
  extraIds,
  onRemoveExtra,
}: {
  meal: Meal;
  foods: FoodItem[];
  done: boolean;
  peeked: boolean;
  onPeek: (open: boolean) => void;
  onToggleDone: (done: boolean) => void;
  adding: boolean;
  onStartAdd: () => void;
  onCancelAdd: () => void;
  onAddFood: (f: FoodItem) => void;
  extraIds: Set<string>;
  onRemoveExtra: (id: string) => void;
}) {
  const totals = foodsTotal(foods);
  const open = !done || peeked;

  return (
    <Card variant="dark" padding="0">
      {/* header row */}
      <div
        onClick={done ? () => onPeek(!peeked) : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 10,
          padding: '15px 16px',
          cursor: done ? 'pointer' : 'default',
        }}
      >
        {done && (
          <span
            style={{
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: 'rgba(0,247,0,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--green-neon)',
            }}
          >
            <Icon name="check" size={14} strokeWidth={3} />
          </span>
        )}
        <span style={{ fontWeight: 800, fontSize: 16 }}>{meal.name}</span>
        <span style={{ flex: 1 }} />
        {done ? (
          <Icon name={peeked ? 'chevron-up' : 'chevron-down'} size={18} color="var(--gray-500)" />
        ) : (
          <Badge tone="dark" size="sm">
            {Math.round(totals.kcal)} kcal
          </Badge>
        )}
      </div>

      {open && (
        <div style={{ padding: '0 16px 14px' }}>
          {/* totals header row with macro color bars */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '2px 0 8px' }}>
            <span style={{ flex: 1 }} />
            {MACRO_KEYS.map((k) => (
              <span key={k} style={{ ...COL, fontSize: 12.5, fontWeight: 700, color: 'var(--gray-300)' }}>
                {fmtMacro(k, totals[k])}
                <div style={{ height: 3, borderRadius: 2, background: MACRO_COLORS[k], marginTop: 3 }} />
              </span>
            ))}
          </div>

          {/* food rows */}
          <div style={{ borderTop: '1px solid var(--border-dark)' }}>
            {foods.map((f) => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 0', borderBottom: '1px solid var(--border-dark)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, display: 'flex', alignItems: 'center', gap: 6 }}>
                    <span style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                    {extraIds.has(f.id) && (
                      <button
                        onClick={() => onRemoveExtra(f.id)}
                        aria-label={`Remove ${f.name}`}
                        style={{ background: 'none', border: 'none', color: 'var(--gray-500)', cursor: 'pointer', padding: 0, display: 'flex' }}
                      >
                        <Icon name="x" size={13} />
                      </button>
                    )}
                  </div>
                  <div style={{ fontSize: 11.5, color: 'var(--gray-500)', fontWeight: 600, marginTop: 2 }}>{f.portion}</div>
                </div>
                {MACRO_KEYS.map((k) => (
                  <span key={k} style={{ ...COL, fontSize: 12.5, fontWeight: 600, color: 'var(--gray-300)' }}>
                    {fmtMacro(k, f[k])}
                  </span>
                ))}
              </div>
            ))}
            {foods.length === 0 && (
              <div style={{ padding: '12px 0', fontSize: 13, color: 'var(--gray-500)', fontWeight: 600 }}>No foods yet.</div>
            )}
          </div>

          {adding ? (
            <AddFoodForm onAdd={onAddFood} onCancel={onCancelAdd} />
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: 12 }}>
              <TextAction onClick={onStartAdd}>+ Add food</TextAction>
              {done ? (
                <TextAction color="var(--gray-400)" onClick={() => onToggleDone(false)}>
                  Undo complete
                </TextAction>
              ) : (
                <TextAction color="var(--green-neon)" onClick={() => onToggleDone(true)}>
                  Complete
                </TextAction>
              )}
            </div>
          )}
        </div>
      )}
    </Card>
  );
}

function TextAction({ children, onClick, color = 'var(--purple-300)' }: { children: React.ReactNode; onClick: () => void; color?: string }) {
  return (
    <button
      onClick={onClick}
      style={{ background: 'none', border: 'none', color, fontWeight: 800, fontSize: 13.5, cursor: 'pointer', padding: 0 }}
    >
      {children}
    </button>
  );
}

function AddFoodForm({ onAdd, onCancel }: { onAdd: (f: FoodItem) => void; onCancel: () => void }) {
  const [name, setName] = React.useState('');
  const [portion, setPortion] = React.useState('100 g');
  const [kcal, setKcal] = React.useState('');
  const [protein, setProtein] = React.useState('');
  const [carbs, setCarbs] = React.useState('');
  const [fat, setFat] = React.useState('');

  const num = (s: string) => Math.max(0, Number(s) || 0);
  const valid = name.trim().length > 0 && kcal.trim().length > 0;

  return (
    <div style={{ marginTop: 12, padding: 12, background: 'var(--ink-950)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 8 }}>
        <DarkField label="Food" value={name} onChange={setName} placeholder="Chicken breast" />
        <DarkField label="Portion" value={portion} onChange={setPortion} placeholder="100 g" />
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr', gap: 8 }}>
        <DarkField label="Kcal" value={kcal} onChange={setKcal} type="number" mono />
        <DarkField label="P (g)" value={protein} onChange={setProtein} type="number" mono />
        <DarkField label="C (g)" value={carbs} onChange={setCarbs} type="number" mono />
        <DarkField label="F (g)" value={fat} onChange={setFat} type="number" mono />
      </div>
      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button variant="ghost" size="sm" onClick={onCancel} style={{ color: 'var(--gray-400)' }}>
          Cancel
        </Button>
        <Button
          size="sm"
          disabled={!valid}
          onClick={() =>
            onAdd({
              id: foodId(),
              name: name.trim(),
              portion: portion.trim() || '1 serving',
              kcal: num(kcal),
              protein: num(protein),
              carbs: num(carbs),
              fat: num(fat),
            })
          }
        >
          Add food
        </Button>
      </div>
    </div>
  );
}
