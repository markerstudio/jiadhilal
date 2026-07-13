import * as React from 'react';

export interface TabItem { id: string; label: string; }

/** Segmented in-content navigation. Underline or pill style. */
export interface TabsProps {
  tabs: Array<string | TabItem>;
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  /** @default "underline" */
  variant?: 'underline' | 'pill';
  style?: React.CSSProperties;
}

export function Tabs(props: TabsProps): JSX.Element;
