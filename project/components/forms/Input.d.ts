import * as React from 'react';

/** Labeled text input with focus ring, hint, and error states. */
export interface InputProps {
  label?: string;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  /** @default "text" */
  type?: string;
  hint?: string;
  error?: string;
  iconLeft?: React.ReactNode;
  disabled?: boolean;
  fullWidth?: boolean;
  id?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: React.CSSProperties;
}

export function Input(props: InputProps): JSX.Element;
