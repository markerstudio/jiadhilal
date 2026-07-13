import * as React from 'react';

/** Surface container. surface (white) · brand (gradient) · dark · outline. */
export interface CardProps {
  children: React.ReactNode;
  /** @default "surface" */
  variant?: 'surface' | 'brand' | 'dark' | 'outline';
  /** CSS padding (token or value). @default "var(--space-6)" */
  padding?: string;
  /** Lift on hover. */
  interactive?: boolean;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
  style?: React.CSSProperties;
}

export function Card(props: CardProps): JSX.Element;
