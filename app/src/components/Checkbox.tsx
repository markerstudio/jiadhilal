import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Jiad Hilal — Checkbox
 * Square check used for set-completion, agreements, filters. Brand purple when on.
 */
export interface CheckboxProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  style?: CSSProperties;
}

export function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  style = {},
}: CheckboxProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;

  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  };

  return (
    <label
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        fontFamily: 'var(--font-sans)',
        ...style,
      }}
    >
      <button
        type="button"
        role="checkbox"
        aria-checked={on}
        disabled={disabled}
        onClick={toggle}
        style={{
          width: 22,
          height: 22,
          flex: 'none',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 'var(--radius-xs)',
          border: on ? '2px solid var(--purple-500)' : '2px solid var(--border-strong)',
          background: on ? 'var(--purple-500)' : 'var(--white)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          padding: 0,
          transition:
            'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)',
        }}
      >
        {on && (
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <polyline points="20 6 9 17 4 12" />
          </svg>
        )}
      </button>
      {label && <span style={{ fontSize: 14, fontWeight: 500, color: 'var(--text-primary)' }}>{label}</span>}
    </label>
  );
}
