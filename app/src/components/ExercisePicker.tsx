import React from 'react';
import { searchExercises } from '../lib/exerciseLibrary';

/**
 * Searchable exercise dropdown for the program builder.
 * Type to filter the 873-exercise library; picking fills the field.
 * Free text is kept too, so custom exercises still work.
 */
export function ExercisePicker({
  value,
  onChange,
  autoFocus = false,
}: {
  value: string;
  onChange: (name: string) => void;
  autoFocus?: boolean;
}) {
  const [open, setOpen] = React.useState(false);
  const [query, setQuery] = React.useState<string | null>(null);
  const wrapRef = React.useRef<HTMLDivElement>(null);

  const results = React.useMemo(() => searchExercises(query ?? ''), [query]);

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
        placeholder="Search exercises…"
        autoFocus={autoFocus}
        onFocus={() => setOpen(true)}
        onChange={(e) => {
          setQuery(e.target.value);
          onChange(e.target.value);
          setOpen(true);
        }}
        style={{
          width: '100%',
          boxSizing: 'border-box',
          background: 'transparent',
          border: 'none',
          outline: 'none',
          color: 'var(--white)',
          fontSize: 14.5,
          fontWeight: 800,
          padding: 0,
        }}
        aria-label="Exercise name"
      />
      {open && results.length > 0 && (
        <div
          style={{
            position: 'absolute',
            top: 'calc(100% + 8px)',
            left: -12,
            right: -12,
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
          {results.map((e) => (
            <button
              key={e.name}
              type="button"
              onMouseDown={(ev) => {
                ev.preventDefault();
                onChange(e.name);
                setQuery(null);
                setOpen(false);
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 10,
                width: '100%',
                textAlign: 'left',
                background: 'none',
                border: 'none',
                cursor: 'pointer',
                padding: '9px 12px',
                borderTop: '1px solid var(--border-dark)',
                color: 'var(--white)',
              }}
            >
              <span style={{ flex: 1, fontSize: 13.5, fontWeight: 700 }}>{e.name}</span>
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
                {e.muscle}
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
