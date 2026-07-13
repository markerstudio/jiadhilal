import * as React from 'react';

/**
 * Signature metric tile — big mono number + label + delta. The brand's core data unit.
 *
 * @startingPoint section="Data" subtitle="Mono metric tile with delta" viewport="700x180"
 */
export interface StatTileProps {
  value: React.ReactNode;
  unit?: string;
  label: string;
  /** Change indicator, e.g. "+8%". */
  delta?: string;
  /** @default "green" */
  deltaTone?: 'green' | 'red' | 'neutral';
  icon?: React.ReactNode;
  /** Render on a dark surface. */
  dark?: boolean;
  style?: React.CSSProperties;
}

export function StatTile(props: StatTileProps): JSX.Element;
