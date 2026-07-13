import * as React from 'react';

/** Selectable filter chip (muscle group, equipment, focus). */
export interface TagProps {
  children: React.ReactNode;
  active?: boolean;
  iconLeft?: React.ReactNode;
  disabled?: boolean;
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  style?: React.CSSProperties;
}

export function Tag(props: TagProps): JSX.Element;
