import * as React from 'react';

/** Circular progress for workout / daily-goal completion. */
export interface ProgressRingProps {
  /** 0–100 */
  value?: number;
  size?: number;
  stroke?: number;
  /** @default "brand" */
  tone?: 'brand' | 'green' | 'red';
  /** Override center text (defaults to %). */
  label?: string;
  sublabel?: string;
  style?: React.CSSProperties;
}

export function ProgressRing(props: ProgressRingProps): JSX.Element;
