/* Small shared presentational helpers used across client screens and the admin panel. */
import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

/** Archivo black-italic uppercase — the brand display voice. */
export function displayStyle(fontSize: number): CSSProperties {
  return {
    fontFamily: 'var(--font-display)',
    fontStyle: 'italic',
    fontWeight: 900,
    fontSize,
    textTransform: 'uppercase',
    letterSpacing: '-0.02em',
    lineHeight: 1.02,
  };
}

export function Overline({ children, color = 'var(--gray-400)', style }: { children: ReactNode; color?: string; style?: CSSProperties }) {
  return (
    <div
      style={{
        fontSize: 12,
        fontWeight: 800,
        letterSpacing: '0.14em',
        textTransform: 'uppercase',
        color,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export function PageTitle({ children, kicker }: { children: ReactNode; kicker?: ReactNode }) {
  return (
    <div>
      {kicker && <Overline>{kicker}</Overline>}
      <div style={{ ...displayStyle(26), marginTop: kicker ? 2 : 0 }}>{children}</div>
    </div>
  );
}

/** Dark-surface labeled input for in-app forms (workout logging, admin builder). */
export function DarkField({
  label,
  value,
  onChange,
  type = 'text',
  placeholder,
  width,
  textarea = false,
  mono = false,
  style,
}: {
  label?: string;
  value: string | number;
  onChange: (v: string) => void;
  type?: string;
  placeholder?: string;
  width?: number | string;
  textarea?: boolean;
  mono?: boolean;
  style?: CSSProperties;
}) {
  const [focus, setFocus] = React.useState(false);
  const base: CSSProperties = {
    width: '100%',
    boxSizing: 'border-box',
    background: 'var(--ink-800)',
    border: `2px solid ${focus ? 'var(--purple-500)' : 'var(--border-dark)'}`,
    borderRadius: 'var(--radius-md)',
    color: 'var(--white)',
    fontFamily: mono ? 'var(--font-mono)' : 'var(--font-sans)',
    fontSize: 15,
    fontWeight: 600,
    padding: textarea ? '10px 12px' : '0 12px',
    height: textarea ? undefined : 44,
    minHeight: textarea ? 92 : undefined,
    outline: 'none',
    boxShadow: focus ? 'var(--focus-ring)' : 'none',
    transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
    resize: 'vertical',
  };
  return (
    <label style={{ display: 'block', width, ...style }}>
      {label && (
        <div style={{ fontSize: 12, fontWeight: 700, color: 'var(--gray-400)', marginBottom: 6, letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          {label}
        </div>
      )}
      {textarea ? (
        <textarea
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={base}
        />
      ) : (
        <input
          type={type}
          value={value}
          placeholder={placeholder}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={base}
        />
      )}
    </label>
  );
}

export function Loading({ label = 'Loading' }: { label?: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 240, color: 'var(--gray-500)', gap: 10 }}>
      <span
        style={{
          width: 18,
          height: 18,
          borderRadius: '50%',
          border: '3px solid var(--ink-700)',
          borderTopColor: 'var(--purple-500)',
          animation: 'jh-spin 0.8s linear infinite',
        }}
      />
      <style>{'@keyframes jh-spin { to { transform: rotate(360deg) } }'}</style>
      <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</span>
    </div>
  );
}

export function EmptyState({ title, hint }: { title: string; hint?: string }) {
  return (
    <div style={{ padding: '36px 20px', textAlign: 'center', color: 'var(--gray-500)' }}>
      <div style={{ fontWeight: 800, fontSize: 15, color: 'var(--gray-400)' }}>{title}</div>
      {hint && <div style={{ fontSize: 13, marginTop: 6, lineHeight: 1.5 }}>{hint}</div>}
    </div>
  );
}
