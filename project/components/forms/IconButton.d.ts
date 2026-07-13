import * as React from 'react';

/** Icon-only button. Pass a Lucide SVG (size 20–24) as children. */
export interface IconButtonProps {
  children: React.ReactNode;
  /** @default "ghost" */
  variant?: 'ghost' | 'solid' | 'outline';
  /** @default "md" */
  size?: 'sm' | 'md' | 'lg';
  round?: boolean;
  disabled?: boolean;
  'aria-label': string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function IconButton(props: IconButtonProps): JSX.Element;
