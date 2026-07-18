import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card } from '../components/Card';
import { Button } from '../components/Button';
import { IconButton } from '../components/IconButton';
import { Icon } from '../components/Icon';
import { Badge } from '../components/Badge';
import { FoodEntryForm } from '../components/FoodEntryForm';
import { Loading, DarkField, EmptyState, displayStyle } from '../components/ui';
import { store } from '../lib/store';
import { useAsync } from '../lib/useAsync';
import { foodVideoUrl } from '../lib/foodLibrary';
import { MACRO_COLORS, MACRO_KEYS, defaultNutritionPlan, fmtMacro, foodId, foodsTotal } from '../lib/nutrition';
import type { DayType, FoodItem, NutritionPlan } from '../lib/types';

const MACRO_LABELS = { kcal: 'Kcal', protein: 'Protein (g)', carbs: 'Carbs (g)', fat: 'Fat (g)' } as const;

/* Coach nutrition builder — edit a client's meal plan per day type: targets +
   meals built from the food library (pick food, type quantity, macros compute). */
export function AdminNutritionEditor() {
  const { clientId } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = React.useState<NutritionPlan | null>(null);
  const [dayType, setDayType] = React.useState<DayType>('training');
  const [dirty, setDirty] = React.useState(false);
  const [saving, setSaving] = React.useState(false);
  const [addingFoodTo, setAddingFoodTo] = React.useState<string | null>(null);

  const { value, loading } = useAsync(async () => {
    const [client, existing] = await Promise.all([store.getProfile(clientId!), store.getNutritionPlan(clientId!)]);
    return { client, existing };
  }, [clientId]);

  React.useEffect(() => {
    if (value) setPlan(value.existing ?? defaultNutritionPlan(clientId!));
  }, [value, clientId]);

  if (loading || !value || !plan) return <Loading />;
  const { client } = value;
  if (!client) return <EmptyState title="Client not found" />;

  const day = plan.days[dayType];
  const totals = day.meals.reduce((acc, m) => {
    const t = foodsTotal(m.foods);
    return { kcal: acc.kcal + t.kcal, protein: acc.protein + t.protein, carbs: acc.carbs + t.carbs, fat: acc.fat + t.fat };
  }, { kcal: 0, protein: 0, carbs: 0, fat: 0 });

  /** Immutable update of the currently-edited day. */
  const patchDay = (fn: (d: typeof day) => typeof day) => {
    setPlan({ ...plan, days: { ...plan.days, [dayType]: fn(day) } });
    setDirty(true);
  };

  const setTarget = (k: (typeof MACRO_KEYS)[number], v: string) =>
    patchDay((d) => ({ ...d, targets: { ...d.targets, [k]: Math.max(0, Number(v) || 0) } }));

  const addFood = (mealId: string, f: FoodItem) => {
    patchDay((d) => ({ ...d, meals: d.meals.map((m) => (m.id === mealId ? { ...m, foods: [...m.foods, f] } : m)) }));
    setAddingFoodTo(null);
  };

  const removeFood = (mealId: string, fid: string) =>
    patchDay((d) => ({ ...d, meals: d.meals.map((m) => (m.id === mealId ? { ...m, foods: m.foods.filter((f) => f.id !== fid) } : m)) }));

  const renameMeal = (mealId: string, name: string) =>
    patchDay((d) => ({ ...d, meals: d.meals.map((m) => (m.id === mealId ? { ...m, name } : m)) }));

  const addMeal = () => {
    const id = foodId();
    patchDay((d) => ({ ...d, meals: [...d.meals, { id, name: `Meal ${d.meals.length + 1}`, foods: [] }] }));
    setAddingFoodTo(id);
  };

  const removeMeal = (mealId: string) => patchDay((d) => ({ ...d, meals: d.meals.filter((m) => m.id !== mealId) }));

  const save = async () => {
    setSaving(true);
    await store.saveNutritionPlan(plan);
    setDirty(false);
    setSaving(false);
  };

  return (
    <div style={{ color: 'var(--white)', display: 'flex', flexDirection: 'column', gap: 16 }}>
      {/* header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
        <IconButton aria-label="Back" variant="ghost" onClick={() => navigate(`/admin/clients/${clientId}`)} style={{ color: 'var(--white)' }}>
          <Icon name="chevron-left" size={22} />
        </IconButton>
        <div style={{ flex: 1, minWidth: 200 }}>
          <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)' }}>
            Nutrition plan
          </div>
          <div style={displayStyle(22)}>{client.name}</div>
        </div>
        {dirty && (
          <Badge tone="red" variant="soft" size="sm">
            Unsaved changes
          </Badge>
        )}
        <Button variant="primary" size="md" disabled={!dirty || saving} onClick={() => void save()}>
          {saving ? 'Saving…' : 'Save plan'}
        </Button>
      </div>

      {/* day type tabs */}
      <div style={{ display: 'flex', gap: 8 }}>
        {(['training', 'rest'] as const).map((t) => (
          <button
            key={t}
            onClick={() => {
              setDayType(t);
              setAddingFoodTo(null);
            }}
            style={{
              padding: '10px 20px',
              borderRadius: 'var(--radius-pill)',
              border: '2px solid ' + (dayType === t ? 'var(--purple-500)' : 'var(--border-dark)'),
              background: dayType === t ? 'rgba(98,0,255,0.22)' : 'transparent',
              color: dayType === t ? 'var(--white)' : 'var(--gray-500)',
              fontWeight: 800,
              fontSize: 13,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >
            {t === 'training' ? 'Training day' : 'Rest day'}
          </button>
        ))}
      </div>

      {/* targets + live totals */}
      <Card variant="dark" padding="16px">
        <div style={{ fontSize: 12, fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gray-400)', marginBottom: 12 }}>
          Daily targets — {dayType} day
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))', gap: 10 }}>
          {MACRO_KEYS.map((k) => (
            <DarkField key={k} label={MACRO_LABELS[k]} value={day.targets[k]} onChange={(v) => setTarget(k, v)} type="number" mono />
          ))}
        </div>
        <div style={{ display: 'flex', gap: 16, marginTop: 14, flexWrap: 'wrap' }}>
          {MACRO_KEYS.map((k) => (
            <span key={k} style={{ fontSize: 13, fontWeight: 700, color: 'var(--gray-400)' }}>
              Planned{' '}
              <span style={{ fontFamily: 'var(--font-mono)', color: MACRO_COLORS[k] }}>
                {fmtMacro(k, totals[k])}
              </span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--gray-500)' }}> / {fmtMacro(k, day.targets[k])}</span>
            </span>
          ))}
        </div>
      </Card>

      {/* meals */}
      {day.meals.map((meal) => {
        const t = foodsTotal(meal.foods);
        return (
          <Card key={meal.id} variant="dark" padding="16px">
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 8 }}>
              <input
                value={meal.name}
                onChange={(e) => renameMeal(meal.id, e.target.value)}
                aria-label="Meal name"
                style={{
                  background: 'transparent',
                  border: 'none',
                  outline: 'none',
                  color: 'var(--white)',
                  fontSize: 16,
                  fontWeight: 800,
                  flex: 1,
                  minWidth: 100,
                }}
              />
              <span style={{ fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 700, color: 'var(--gray-400)' }}>
                {Math.round(t.kcal)} kcal · {fmtMacro('protein', t.protein)}p · {fmtMacro('carbs', t.carbs)}c · {fmtMacro('fat', t.fat)}f
              </span>
              <IconButton aria-label="Remove meal" variant="ghost" size="sm" onClick={() => removeMeal(meal.id)} style={{ color: 'var(--gray-500)' }}>
                <Icon name="trash" size={16} />
              </IconButton>
            </div>

            {meal.foods.map((f) => (
              <div key={f.id} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '9px 0', borderTop: '1px solid var(--border-dark)' }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</div>
                  <div style={{ fontSize: 11.5, color: 'var(--gray-500)', fontWeight: 600, marginTop: 1 }}>{f.portion}</div>
                </div>
                {MACRO_KEYS.map((k) => (
                  <span key={k} style={{ width: 48, textAlign: 'right', fontFamily: 'var(--font-mono)', fontSize: 12.5, fontWeight: 600, color: 'var(--gray-300)' }}>
                    {fmtMacro(k, f[k])}
                  </span>
                ))}
                <a
                  href={foodVideoUrl(f.name)}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Watch ${f.name} video`}
                  style={{ display: 'flex', color: 'var(--gray-500)' }}
                >
                  <Icon name="external-link" size={15} />
                </a>
                <IconButton aria-label={`Remove ${f.name}`} variant="ghost" size="sm" onClick={() => removeFood(meal.id, f.id)} style={{ color: 'var(--gray-500)' }}>
                  <Icon name="x" size={15} />
                </IconButton>
              </div>
            ))}
            {meal.foods.length === 0 && (
              <div style={{ padding: '10px 0', fontSize: 13, color: 'var(--gray-500)', fontWeight: 600, borderTop: '1px solid var(--border-dark)' }}>
                No foods yet — add from the library below.
              </div>
            )}

            {addingFoodTo === meal.id ? (
              <FoodEntryForm onAdd={(f) => addFood(meal.id, f)} onCancel={() => setAddingFoodTo(null)} />
            ) : (
              <button
                onClick={() => setAddingFoodTo(meal.id)}
                style={{ background: 'none', border: 'none', color: 'var(--purple-300)', fontWeight: 800, fontSize: 13.5, cursor: 'pointer', padding: '10px 0 0' }}
              >
                + Add food
              </button>
            )}
          </Card>
        );
      })}

      <Button variant="secondary" size="md" onClick={addMeal} iconLeft={<Icon name="plus" size={17} />} style={{ alignSelf: 'flex-start' }}>
        Add meal
      </Button>
    </div>
  );
}
