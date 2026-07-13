import React from 'react';

/**
 * Jiad Hilal — Tag / Chip
 * Selectable filter chip (muscle group, equipment, focus). Brand fill when active.
 */
export function Tag({
  children,
  active = false,
  iconLeft = null,
  onClick,
  disabled = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick && !disabled;

  return (
    <button
      type="button"
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      aria-pressed={active}
      disabled={disabled}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 7,
        height: 34,
        padding: '0 15px',
        fontFamily: 'var(--font-sans)',
        fontSize: 13,
        fontWeight: 700,
        lineHeight: 1,
        borderRadius: 'var(--radius-pill)',
        cursor: clickable ? 'pointer' : 'default',
        opacity: disabled ? 0.5 : 1,
        border: active ? '2px solid var(--purple-500)' : '2px solid var(--border-strong)',
        background: active ? 'var(--purple-500)' : hover && clickable ? 'var(--purple-50)' : 'var(--white)',
        color: active ? 'var(--white)' : 'var(--ink-800)',
        transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {iconLeft}
      {children}
    </button>
  );
}
