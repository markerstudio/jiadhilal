import React from 'react';
import { searchFoods, foodVideoUrl, type LibraryFood } from '../lib/foodLibrary';
import { Icon } from './Icon';

/**
 * Searchable food dropdown for the nutrition builder.
 * Type to filter the food library; picking a food reports it (with its macros)
 * so quantities auto-compute. Free text is kept too for custom foods.
 * Each row links to a recipe/prep video on YouTube.
 */
export function FoodPicker({
  value,
  onChange,
  onPick,
  autoFocus = false,
  placeholder = 'Search foods…',
}: {
  value: string;
  onChange: (name: string) => void;
  onPick: (food: LibraryFood | null) => void;
  autoFocus?: boolean;
  placeholder?: string;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string | null>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const results = React.useMemo(() => searchFoods(query ?? ''), [query]);

  React.useEffect(() => {
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
        setQuery(null);
      }
    };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, []);

  return (
    <div ref={wrapRef} style={{ position: 'relative', flex: 1, minWidth: 140 }}>
      <input
        value={query ?? value}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          onPick(null); // typing free text clears any library selection
          setOpen(true);
        }}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: 'var(--ink-800)',
          border: '2px solid var(--border-dark)',
          borderRadius: 'var(--radius-md)',
          outline: 'none',
          color: 'var(--white)',
          fontSize: 14,
          fontWeight: 700,
          height: 44,
          padding: '0 12px',
        }}
        aria-label="Food name"
      />
      {open && results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: 0,
            right: 0,
            zIndex: 40,
            maxHeight: 280,
            overflowY: 'auto',
            background: 'var(--ink-900)',
            border: '1px solid var(--ink-700)',
            borderRadius: 'var(--radius-md)',
            boxShadow: '0 16px 40px rgba(0,0,0,0.55)',
          }}
          className="screen-scroll"
        >
          {results.map((f) => (
            <div
              key={f.name}
              style={{ display: 'flex', alignItems: 'center', borderTop: '1px solid var(--border-dark)' }}
            >
              <button
                type="button"
                onMouseDown={(ev) => {
                  ev.preventDefault();
                  onChange(f.name);
                  onPick(f);
                  setQuery(null);
                  setOpen(false);
                }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 10,
                  flex: 1,
                  minWidth: 0,
                  textAlign: 'left',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '9px 12px',
                  color: 'var(--white)',
                }}
              >
                <span style={{ flex: 1, minWidth: 0 }}>
                  <span style={{ display: 'block', fontSize: 13.5, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                    {f.name}
                  </span>
                  <span style={{ display: 'block', fontSize: 11, color: 'var(--gray-500)', fontWeight: 600, marginTop: 1 }}>
                    {f.kcal} kcal · {f.protein}p / {f.carbs}c / {f.fat}f{' '}
                    {f.basis === 'g' ? 'per 100 g' : `per ${f.unitLabel}`}
                  </span>
                </span>
                <span
                  style={{
                    fontSize: 10.5,
                    fontWeight: 800,
                    letterSpacing: '0.06em',
                    textTransform: 'uppercase',
                    color: 'var(--purple-300)',
                    background: 'rgba(98,0,255,0.16)',
                    borderRadius: 'var(--radius-pill)',
                    padding: '3px 8px',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {f.category}
                </span>
              </button>
              <a
                href={foodVideoUrl(f.name)}
                target="_blank"
                rel="noreferrer"
                aria-label={`Watch ${f.name} recipe video`}
                onMouseDown={(ev) => ev.stopPropagation()}
                style={{ display: 'flex', padding: '9px 12px', color: 'var(--gray-500)' }}
              >
                <Icon name="external-link" size={15} />
              </a>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
