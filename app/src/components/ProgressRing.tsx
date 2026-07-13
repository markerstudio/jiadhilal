import type { CSSProperties, ReactNode } from 'react';

/**
 * Jiad Hilal — ProgressRing
 * Circular progress for workout / day completion. Brand purple stroke + center label.
 */
export type RingTone = 'brand' | 'green' | 'red';

export interface ProgressRingProps {
  value?: number; // 0..100
  size?: number;
  stroke?: number;
  tone?: RingTone;
  label?: ReactNode;
  sublabel?: ReactNode;
  dark?: boolean; // invert center text + track for dark surfaces
  style?: CSSProperties;
}

export function ProgressRing({
  value = 0,
  size = 96,
  stroke = 9,
  tone = 'brand',
  label,
  sublabel,
  dark = false,
  style = {},
}: ProgressRingProps) {
  const pct = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  const colors: Record<RingTone, string> = {
    brand: 'var(--purple-500)',
    green: 'var(--green-ink)',
    red: 'var(--red-ink)',
  };
  const col = colors[tone] || colors.brand;

  return (
    <div style={{ position: 'relative', width: size, height: size, fontFamily: 'var(--font-sans)', ...style }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={dark ? 'var(--ink-700)' : 'var(--gray-200)'}
          strokeWidth={stroke}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={r}
          fill="none"
          stroke={col}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={c}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset var(--dur-slow) var(--ease-out)' }}
        />
      </svg>
      <div
        style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 1,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: size * 0.26,
            color: dark ? 'var(--white)' : 'var(--text-primary)',
            lineHeight: 1,
          }}
        >
          {label != null ? label : `${Math.round(pct)}%`}
        </span>
        {sublabel && (
          <span
            style={{
              fontSize: 10,
              fontWeight: 700,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              color: dark ? 'var(--gray-400)' : 'var(--text-muted)',
            }}
          >
            {sublabel}
          </span>
        )}
      </div>
    </div>
  );
}
