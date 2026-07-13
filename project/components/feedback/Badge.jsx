import React from 'react';

/**
 * Jiad Hilal — Badge
 * Small status pill. Solid or soft tint across brand/neon/neutral tones.
 */
export function Badge({
  children,
  tone = 'purple',     // purple | green | red | neutral | dark
  variant = 'soft',    // soft | solid
  size = 'md',         // sm | md
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    purple: { soft: ['var(--purple-50)', 'var(--purple-700)'], solid: ['var(--purple-500)', 'var(--white)'], dotc: 'var(--purple-500)' },
    green:  { soft: ['rgba(0,184,0,0.12)', 'var(--green-ink)'], solid: ['var(--green-neon)', '#003d00'], dotc: 'var(--green-ink)' },
    red:    { soft: ['rgba(224,30,73,0.10)', 'var(--red-ink)'], solid: ['var(--red-neon)', 'var(--white)'], dotc: 'var(--red-ink)' },
    neutral:{ soft: ['var(--gray-100)', 'var(--gray-600)'], solid: ['var(--gray-600)', 'var(--white)'], dotc: 'var(--gray-500)' },
    dark:   { soft: ['var(--ink-800)', 'var(--gray-200)'], solid: ['var(--char-black)', 'var(--white)'], dotc: 'var(--gray-300)' },
  };
  const t = tones[tone] || tones.purple;
  const [bg, fg] = t[variant] || t.soft;
  const dims = size === 'sm'
    ? { fs: 11, pad: '2px 8px', h: 20 }
    : { fs: 12, pad: '4px 11px', h: 24 };

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 6,
        height: dims.h,
        padding: dims.pad,
        background: bg,
        color: fg,
        fontFamily: 'var(--font-sans)',
        fontSize: dims.fs,
        fontWeight: 800,
        letterSpacing: '0.03em',
        textTransform: 'uppercase',
        borderRadius: 'var(--radius-pill)',
        lineHeight: 1,
        whiteSpace: 'nowrap',
        ...style,
      }}
      {...rest}
    >
      {dot && <span style={{ width: 6, height: 6, borderRadius: '50%', background: variant === 'solid' ? 'currentColor' : t.dotc }} />}
      {children}
    </span>
  );
}
