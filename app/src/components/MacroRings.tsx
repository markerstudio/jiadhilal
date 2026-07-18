import type { CSSProperties } from 'react';

/**
 * Jiad Hilal — MacroRings
 * Apple-activity-style concentric progress rings for the four macros
 * (kcal outer → protein → carbs → fat inner). Values are 0..100 percents.
 */
export interface MacroRing {
  value: number; // 0..100
  color: string;
}

export interface MacroRingsProps {
  rings: MacroRing[]; // outer → inner
  size?: number;
  stroke?: number;
  gap?: number;
  style?: CSSProperties;
}

export function MacroRings({ rings, size = 132, stroke = 12, gap = 3, style }: MacroRingsProps) {
  return (
    <div style={{ position: 'relative', width: size, height: size, ...style }}>
      <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
        {rings.map((ring, i) => {
          const r = (size - stroke) / 2 - i * (stroke + gap);
          if (r <= 0) return null;
          const c = 2 * Math.PI * r;
          const pct = Math.max(0, Math.min(100, ring.value));
          return (
            <g key={i}>
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={ring.color}
                strokeOpacity={0.18}
                strokeWidth={stroke}
              />
              <circle
                cx={size / 2}
                cy={size / 2}
                r={r}
                fill="none"
                stroke={ring.color}
                strokeWidth={stroke}
                strokeLinecap="round"
                strokeDasharray={c}
                strokeDashoffset={c * (1 - pct / 100)}
                style={{ transition: 'stroke-dashoffset var(--dur-slow) var(--ease-out)' }}
              />
            </g>
          );
        })}
      </svg>
    </div>
  );
}
