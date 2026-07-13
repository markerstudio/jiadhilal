import * as React from 'react';

/** Client/coach avatar — image or initials, optional brand ring + status dot. */
export interface AvatarProps {
  src?: string;
  /** Used for initials fallback + alt text. */
  name?: string;
  /** Pixel diameter. @default 44 */
  size?: number;
  ring?: boolean;
  status?: 'online' | 'rest';
  style?: React.CSSProperties;
}

export function Avatar(props: AvatarProps): JSX.Element;
