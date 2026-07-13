import React from 'react';

/**
 * Jiad Hilal — IconButton
 * Square/circle icon-only control. Pass a Lucide SVG (or any node) as children.
 */
export function IconButton({
  children,
  variant = 'ghost',   // ghost | solid | outline
  size = 'md',         // sm | md | lg
  round = false,
  disabled = false,
  'aria-label': ariaLabel,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);

  const dims = { sm: 32, md: 40, lg: 48 }[size] || 40;

  const variants = {
    ghost: {
      background: hover ? 'var(--purple-50)' : 'transparent',
      color: 'var(--ink-800)',
      border: '2px solid transparent',
    },
    solid: {
      background: hover ? 'var(--purple-600)' : 'var(--purple-500)',
      color: 'var(--white)',
      border: '2px solid transparent',
      boxShadow: hover && !disabled ? 'var(--shadow-brand)' : 'none',
    },
    outline: {
      background: hover ? 'var(--purple-50)' : 'var(--white)',
      color: 'var(--purple-600)',
      border: '2px solid var(--border-strong)',
    },
  };

  return (
    <button
      type="button"
      aria-label={ariaLabel}
      disabled={disabled}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => { setHover(false); setActive(false); }}
      onMouseDown={() => setActive(true)}
      onMouseUp={() => setActive(false)}
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: dims,
        height: dims,
        borderRadius: round ? 'var(--radius-pill)' : 'var(--radius-md)',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.45 : 1,
        transform: active && !disabled ? 'scale(0.92)' : 'scale(1)',
        transition: 'background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        ...(variants[variant] || variants.ghost),
        ...style,
      }}
      {...rest}
    >
      {children}
    </button>
  );
}
