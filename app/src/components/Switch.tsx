import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Jiad Hilal — Switch
 * On/off toggle. Track turns brand purple when on; thumb springs.
 */
export interface SwitchProps {
  checked?: boolean;
  defaultChecked?: boolean;
  onChange?: (checked: boolean) => void;
  disabled?: boolean;
  label?: ReactNode;
  size?: 'sm' | 'md';
  style?: CSSProperties;
}

export function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  size = 'md',
  style = {},
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;

  const dims = size === 'sm' ? { w: 38, h: 22, knob: 16 } : { w: 50, h: 28, knob: 22 };

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
        role="switch"
        aria-checked={on}
        disabled={disabled}
        onClick={toggle}
        style={{
          position: 'relative',
          width: dims.w,
          height: dims.h,
          flex: 'none',
          borderRadius: 'var(--radius-pill)',
          border: 'none',
          padding: 0,
          cursor: disabled ? 'not-allowed' : 'pointer',
          background: on ? 'var(--purple-500)' : 'var(--gray-300)',
          boxShadow: on ? 'var(--shadow-brand)' : 'none',
          transition:
            'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        }}
      >
        <span
          style={{
            position: 'absolute',
            top: (dims.h - dims.knob) / 2,
            left: on ? dims.w - dims.knob - (dims.h - dims.knob) / 2 : (dims.h - dims.knob) / 2,
            width: dims.knob,
            height: dims.knob,
            borderRadius: '50%',
            background: 'var(--white)',
            boxShadow: 'var(--shadow-sm)',
            transition: 'left var(--dur-base) var(--ease-spring)',
          }}
        />
      </button>
      {label && <span style={{ fontSize: 14, fontWeight: 600, color: 'var(--text-primary)' }}>{label}</span>}
    </label>
  );
}
