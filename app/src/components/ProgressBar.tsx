import type { CSSProperties, ReactNode } from 'react';

/**
 * Jiad Hilal — ProgressBar
 * Linear progress. Brand gradient fill by default; neon tones for live/PR.
 */
export type BarTone = 'brand' | 'green' | 'red';

export interface ProgressBarProps {
  value?: number; // 0..100
  tone?: BarTone;
  height?: number;
  label?: ReactNode;
  showValue?: boolean;
  style?: CSSProperties;
}

export function ProgressBar({
  value = 0,
  tone = 'brand',
  height = 10,
  label,
  showValue = false,
  style = {},
}: ProgressBarProps) {
  const pct = Math.max(0, Math.min(100, value));
  const fills: Record<BarTone, string> = {
    brand: 'var(--grad-brand)',
    green: 'var(--green-neon)',
    red: 'var(--red-neon)',
  };
  const glow = tone === 'green' ? 'var(--glow-green)' : tone === 'red' ? 'var(--glow-red)' : 'none';

  return (
    <div style={{ width: '100%', fontFamily: 'var(--font-sans)', ...style }}>
      {(label || showValue) && (
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', marginBottom: 6 }}>
          {label && <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>{label}</span>}
          {showValue && (
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 13, fontWeight: 700, color: 'var(--text-secondary)' }}>
              {Math.round(pct)}%
            </span>
          )}
        </div>
      )}
      <div
        style={{
          width: '100%',
          height,
          background: 'var(--gray-200)',
          borderRadius: 'var(--radius-pill)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${pct}%`,
            height: '100%',
            background: fills[tone] || fills.brand,
            borderRadius: 'var(--radius-pill)',
            boxShadow: glow,
            transition: 'width var(--dur-slow) var(--ease-out)',
          }}
        />
      </div>
    </div>
  );
}
