import React from 'react';

/**
 * Jiad Hilal — StatTile
 * Big mono metric with label + optional delta. The brand's signature data unit.
 */
export function StatTile({
  value,
  unit,
  label,
  delta,                 // e.g. "+8%" or "-3kg"
  deltaTone = 'green',   // green | red | neutral
  icon = null,
  dark = false,
  style = {},
  ...rest
}) {
  const deltaColors = {
    green: 'var(--green-ink)',
    red: 'var(--red-ink)',
    neutral: 'var(--text-muted)',
  };
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 6,
        padding: 'var(--space-5)',
        background: dark ? 'var(--surface-dark-card)' : 'var(--surface-card)',
        border: dark ? '1px solid var(--border-dark)' : '1px solid var(--border-subtle)',
        borderRadius: 'var(--radius-lg)',
        boxShadow: dark ? 'none' : 'var(--shadow-sm)',
        minWidth: 0,
        ...style,
      }}
      {...rest}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        {icon && <span style={{ display: 'inline-flex', color: 'var(--purple-400)' }}>{icon}</span>}
        <span style={{
          fontFamily: 'var(--font-sans)',
          fontSize: 11,
          fontWeight: 800,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: dark ? 'var(--gray-400)' : 'var(--text-muted)',
        }}>{label}</span>
      </div>
      <div style={{ display: 'flex', alignItems: 'baseline', gap: 6 }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: 34,
          fontWeight: 700,
          letterSpacing: '-0.02em',
          lineHeight: 1,
          color: dark ? 'var(--white)' : 'var(--text-primary)',
        }}>{value}</span>
        {unit && <span style={{ fontFamily: 'var(--font-mono)', fontSize: 16, fontWeight: 500, color: 'var(--purple-400)' }}>{unit}</span>}
      </div>
      {delta && (
        <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: deltaColors[deltaTone] || deltaColors.green }}>
          {delta}
        </span>
      )}
    </div>
  );
}
