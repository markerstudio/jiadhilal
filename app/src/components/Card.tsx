import React from 'react';
import type { CSSProperties, ReactNode } from 'react';

/**
 * Jiad Hilal — Card
 * Surface container. Variants: surface (white), brand (gradient), dark, outline.
 * Optional interactive lift on hover.
 */
export type CardVariant = 'surface' | 'brand' | 'dark' | 'outline';

export interface CardProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, 'style'> {
  children?: ReactNode;
  variant?: CardVariant;
  padding?: string | number;
  interactive?: boolean;
  style?: CSSProperties;
}

export function Card({
  children,
  variant = 'surface',
  padding = 'var(--space-6)',
  interactive = false,
  onClick,
  style = {},
  ...rest
}: CardProps) {
  const [hover, setHover] = React.useState(false);

  const variants: Record<
    CardVariant,
    { background: string; color: string; border: string; shadow: string; hoverShadow: string }
  > = {
    surface: {
      background: 'var(--surface-card)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle)',
      shadow: 'var(--shadow-md)',
      hoverShadow: 'var(--shadow-lg)',
    },
    brand: {
      background: 'var(--grad-brand)',
      color: 'var(--white)',
      border: 'none',
      shadow: 'var(--shadow-brand)',
      hoverShadow: 'var(--shadow-brand-lg)',
    },
    dark: {
      background: 'var(--surface-dark-card)',
      color: 'var(--white)',
      border: '1px solid var(--border-dark)',
      shadow: 'none',
      hoverShadow: '0 12px 32px rgba(0,0,0,0.5)',
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '2px solid var(--border-strong)',
      shadow: 'none',
      hoverShadow: 'var(--shadow-md)',
    },
  };
  const v = variants[variant] || variants.surface;

  return (
    <div
      onClick={onClick}
      onMouseEnter={() => interactive && setHover(true)}
      onMouseLeave={() => interactive && setHover(false)}
      style={{
        background: v.background,
        color: v.color,
        border: v.border,
        borderRadius: 'var(--radius-lg)',
        padding,
        boxShadow: hover ? v.hoverShadow : v.shadow,
        transform: interactive && hover ? 'translateY(-3px)' : 'translateY(0)',
        transition:
          'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
        cursor: interactive || onClick ? 'pointer' : 'default',
        fontFamily: 'var(--font-sans)',
        ...style,
      }}
      {...rest}
    >
      {children}
    </div>
  );
}
