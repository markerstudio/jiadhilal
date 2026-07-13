import * as React from 'react';

/** Small status pill — program tags, states, counts. */
export interface BadgeProps {
  children: React.ReactNode;
  /** @default "purple" */
  tone?: 'purple' | 'green' | 'red' | 'neutral' | 'dark';
  /** @default "soft" */
  variant?: 'soft' | 'solid';
  /** @default "md" */
  size?: 'sm' | 'md';
  dot?: boolean;
  style?: React.CSSProperties;
}

export function Badge(props: BadgeProps): JSX.Element;
