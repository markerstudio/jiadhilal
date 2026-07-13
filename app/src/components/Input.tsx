import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Jiad Hilal — Input
 * Labeled text field. Focus draws the brand ring; supports error + hint + icon.
 */
export interface InputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'style'> {
  label?: ReactNode;
  hint?: ReactNode;
  error?: ReactNode;
  iconLeft?: ReactNode;
  fullWidth?: boolean;
  style?: CSSProperties;
}

export function Input({
  label,
  value,
  defaultValue,
  placeholder,
  type = 'text',
  hint,
  error,
  iconLeft = null,
  disabled = false,
  fullWidth = true,
  onChange,
  id,
  style = {},
  ...rest
}: InputProps) {
  const [focus, setFocus] = React.useState(false);
  const reactId = React.useId();
  const inputId = id || reactId;
  const borderColor = error
    ? 'var(--red-ink)'
    : focus
    ? 'var(--purple-500)'
    : 'var(--border-strong)';

  return (
    <div style={{ width: fullWidth ? '100%' : undefined, fontFamily: 'var(--font-sans)', ...style }}>
      {label && (
        <label
          htmlFor={inputId}
          style={{
            display: 'block',
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--text-primary)',
            marginBottom: 7,
            letterSpacing: '0.01em',
          }}
        >
          {label}
        </label>
      )}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 9,
          height: 46,
          padding: '0 14px',
          background: disabled ? 'var(--gray-100)' : 'var(--white)',
          border: `2px solid ${borderColor}`,
          borderRadius: 'var(--radius-md)',
          boxShadow: focus && !error ? 'var(--focus-ring)' : 'none',
          transition:
            'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        }}
      >
        {iconLeft && <span style={{ display: 'inline-flex', color: 'var(--gray-500)' }}>{iconLeft}</span>}
        <input
          id={inputId}
          type={type}
          value={value}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          onChange={onChange}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}
          style={{
            flex: 1,
            border: 'none',
            outline: 'none',
            background: 'transparent',
            fontFamily: 'var(--font-sans)',
            fontSize: 15,
            fontWeight: 500,
            color: 'var(--text-primary)',
            minWidth: 0,
          }}
          {...rest}
        />
      </div>
      {(hint || error) && (
        <div
          style={{
            fontSize: 12,
            marginTop: 6,
            color: error ? 'var(--red-ink)' : 'var(--text-muted)',
            fontWeight: error ? 600 : 400,
          }}
        >
          {error || hint}
        </div>
      )}
    </div>
  );
}
