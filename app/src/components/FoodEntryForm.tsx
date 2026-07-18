import React from 'react';
import { Button } from './Button';
import { DarkField } from './ui';
import { FoodPicker } from './FoodPicker';
import { toFoodItem, type LibraryFood } from '../lib/foodLibrary';
import { foodId } from '../lib/nutrition';
import { MACRO_COLORS, fmtMacro } from '../lib/nutrition';
import type { FoodItem } from '../lib/types';

/**
 * Add-food form shared by the coach plan builder and the client tracker.
 * Picking a library food needs only a quantity — macros compute themselves.
 * Free-text foods fall back to manual portion + macro entry.
 */
export function FoodEntryForm({ onAdd, onCancel }: { onAdd: (f: FoodItem) => void; onCancel: () => void }) {
  const [name, setName] = React.useState('');
  const [picked, setPicked] = React.useState<LibraryFood | null>(null);
  const [qty, setQty] = React.useState('100');
  const [portion, setPortion] = React.useState('100 g');
  const [kcal, setKcal] = React.useState('');
  const [protein, setProtein] = React.useState('');
  const [carbs, setCarbs] = React.useState('');
  const [fat, setFat] = React.useState('');

  const num = (s: string) => Math.max(0, Number(s) || 0);
  const preview = picked ? toFoodItem(picked, num(qty)) : null;
  const valid = picked ? num(qty) > 0 : name.trim().length > 0 && kcal.trim().length > 0;

  const submit = () => {
    if (picked) {
      onAdd(toFoodItem(picked, num(qty)));
    } else {
      onAdd({
        id: foodId(),
        name: name.trim(),
        portion: portion.trim() || '1 serving',
        kcal: num(kcal),
        protein: num(protein),
        carbs: num(carbs),
        fat: num(fat),
      });
    }
  };

  return (
    <div style={{ marginTop: 12, padding: 12, background: 'var(--ink-950)', borderRadius: 'var(--radius-md)', display: 'flex', flexDirection: 'column', gap: 10 }}>
      <div style={{ display: 'flex', gap: 8, alignItems: 'flex-end' }}>
        <FoodPicker
          value={name}
          onChange={(n) => {
            setName(n);
            if (n && !picked) setPortion((p) => p);
          }}
          onPick={(f) => {
            setPicked(f);
            if (f) setQty(f.basis === 'g' ? '100' : '1');
          }}
          autoFocus
        />
        {picked && (
          <DarkField
            label={picked.basis === 'g' ? 'Grams' : picked.unitLabel ?? 'Count'}
            value={qty}
            onChange={setQty}
            type="number"
            mono
            width={92}
          />
        )}
      </div>

      {picked && preview ? (
        <div style={{ display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
          {(['kcal', 'protein', 'carbs', 'fat'] as const).map((k) => (
            <span key={k} style={{ fontFamily: 'var(--font-mono)', fontSize: 13.5, fontWeight: 700, color: MACRO_COLORS[k] }}>
              {fmtMacro(k, preview[k])}
              {k === 'kcal' ? ' kcal' : ''}
            </span>
          ))}
          <span style={{ fontSize: 11.5, color: 'var(--gray-500)', fontWeight: 600 }}>auto from library</span>
        </div>
      ) : (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr 1fr 1fr', gap: 8 }}>
            <DarkField label="Portion" value={portion} onChange={setPortion} placeholder="100 g" />
            <DarkField label="Kcal" value={kcal} onChange={setKcal} type="number" mono />
            <DarkField label="P (g)" value={protein} onChange={setProtein} type="number" mono />
            <DarkField label="C (g)" value={carbs} onChange={setCarbs} type="number" mono />
            <DarkField label="F (g)" value={fat} onChange={setFat} type="number" mono />
          </div>
          <div style={{ fontSize: 11.5, color: 'var(--gray-500)', fontWeight: 600 }}>
            Not in the library — enter macros manually, or keep typing to search.
          </div>
        </>
      )}

      <div style={{ display: 'flex', gap: 8, justifyContent: 'flex-end' }}>
        <Button variant="ghost" size="sm" onClick={onCancel} style={{ color: 'var(--gray-400)' }}>
          Cancel
        </Button>
        <Button size="sm" disabled={!valid} onClick={submit}>
          Add food
        </Button>
      </div>
    </div>
  );
}
