import * as React from 'react';

/** Linear progress bar. Brand gradient fill; neon tones for live/PR. */
export interface ProgressBarProps {
  /** 0–100 */
  value?: number;
  /** @default "brand" */
  tone?: 'brand' | 'green' | 'red';
  height?: number;
  label?: string;
  showValue?: boolean;
  style?: React.CSSProperties;
}

export function ProgressBar(props: ProgressBarProps): JSX.Element;
