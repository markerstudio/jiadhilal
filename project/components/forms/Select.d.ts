import * as React from 'react';

export interface SelectOption { value: string; label: string; }

/** Styled dropdown matching Input. Options accept strings or {value,label}. */
export interface SelectProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  options: Array<string | SelectOption>;
  hint?: string;
  error?: string;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  style?: React.CSSProperties;
}

export function Select(props: SelectProps): JSX.Element;
