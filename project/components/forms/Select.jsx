import React from 'react';

/**
 * Jiad Hilal — Select
 * Native-backed dropdown styled to match Input. Brand ring on focus.
 */
export function Select({
  label,
  value,
  defaultValue,
  options = [],   // [{value, label}] or string[]
  hint,
  error,
  disabled = false,
  fullWidth = true,
  onChange,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const selId = id || React.useId();
  const opts = options.map((o) => (typeof o === 'string' ? { value: o, label: o } : o));
  const borderColor = error ? 'var(--red-ink)' : focus ? 'var(--purple-500)' : 'var(--border-strong)';

  return (
    <div style={{ width: fullWidth ? '100%' : undefined, fontFamily: 'var(--font-sans)', ...style }}>
      {label && (
        <label htmlFor={selId} style={{ display: 'block', fontSize: 13, fontWeight: 700, color: 'var(--text-primary)', marginBottom: 7 }}>
          {label}
        </label>
      )}
      <div
        style={{
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          height: 46,
          background: disabled ? 'var(--gray-100)' : 'var(--white)',
          border: `2px solid ${borderColor}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focus && !error ? 'var(--focus-ring)' : 'none',
          transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        }}
      >
        <select
          id={selId}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            appearance: 'none',
            WebkitAppearance: 'none',
            border: 'none',
            outline: 'none',
            background: 'transparent',
            width: '100%',
            height: '100%',
            padding: '0 38px 0 14px',
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 500,
            color: 'var(--text-primary)',
            cursor: disabled ? 'not-allowed' : 'pointer',
          }}
          {...rest}
        >
          {opts.map((o) => (
            <option key={o.value} value={o.value}>{o.label}</option>
          ))}
        </select>
        <span style={{ position: 'absolute', right: 14, pointerEvents: 'none', color: 'var(--gray-500)', display: 'inline-flex' }}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9" />
          </svg>
        </span>
      </div>
      {(hint || error) && (
        <div style={{ fontSize: 12, marginTop: 6, color: error ? 'var(--red-ink)' : 'var(--text-muted)', fontWeight: error ? 600 : 400 }}>
          {error || hint}
        </div>
      )}
    </div>
  );
}
