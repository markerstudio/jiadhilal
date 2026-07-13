import React from 'react';

/**
 * Jiad Hilal — Button
 * Athletic, confident CTA. Primary deepens + glows on hover, springs on press.
 */
export function Button({
  children,
  variant = 'primary',   // primary | secondary | ghost | danger | neon
  size = 'md',           // sm | md | lg
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  uppercase = true,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const sizes = {
    sm: { padding: '0 14px', height: 36, fontSize: 13, gap: 7, radius: 'var(--radius-sm)' },
    md: { padding: '0 22px', height: 46, fontSize: 15, gap: 9, radius: 'var(--radius-md)' },
    lg: { padding: '0 30px', height: 56, fontSize: 17, gap: 11, radius: 'var(--radius-md)' },
  };
  const s = sizes[size] || sizes.md;

  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    fontFamily: 'var(--font-sans)',
    fontWeight: 800,
    fontSize: s.fontSize,
    letterSpacing: uppercase ? '0.04em' : '0.01em',
    textTransform: uppercase ? 'uppercase' : 'none',
    lineHeight: 1,
    borderRadius: s.radius,
    border: '2px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transform: active && !disabled ? 'scale(0.97)' : 'scale(1)',
    transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), border-color var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    whiteSpace: 'nowrap',
    userSelect: 'none',
  };

  const variants = {
    primary: {
      background: hover ? 'var(--purple-600)' : 'var(--purple-500)',
      color: 'var(--white)',
      boxShadow: hover && !disabled ? 'var(--shadow-brand)' : 'var(--shadow-sm)',
    },
    secondary: {
      background: hover ? 'var(--purple-50)' : 'var(--white)',
      color: 'var(--purple-600)',
      borderColor: 'var(--purple-500)',
    },
    ghost: {
      background: hover ? 'var(--purple-50)' : 'transparent',
      color: 'var(--purple-600)',
    },
    danger: {
      background: hover ? 'var(--red-ink)' : 'var(--red-neon)',
      color: 'var(--white)',
      boxShadow: hover && !disabled ? 'var(--glow-red)' : 'var(--shadow-sm)',
    },
    neon: {
      background: 'var(--green-neon)',
      color: '#003d00',
      boxShadow: hover && !disabled ? 'var(--glow-green)' : 'var(--shadow-sm)',
    },
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{ ...base, ...(variants[variant] || variants.primary), ...style }}
      {...rest}
    >
      {iconLeft}
      {children}
      {iconRight}
    </button>
  );
}
