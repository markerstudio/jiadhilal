import React from 'react';
import type { CSSProperties } from 'react';

/**
 * Jiad Hilal — Tabs
 * Segmented in-content navigation. Active tab carries the brand underline (or pill).
 */
export interface TabItem {
  id: string;
  label: string;
}

export interface TabsProps {
  tabs?: (TabItem | string)[];
  value?: string;
  defaultValue?: string;
  onChange?: (id: string) => void;
  variant?: 'underline' | 'pill';
  style?: CSSProperties;
}

export function Tabs({
  tabs = [],
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  style = {},
}: TabsProps) {
  const items: TabItem[] = tabs.map((t) => (typeof t === 'string' ? { id: t, label: t } : t));
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState<string | undefined>(defaultValue ?? items[0]?.id);
  const current = isControlled ? value : internal;

  const select = (id: string) => {
    if (!isControlled) setInternal(id);
    onChange && onChange(id);
  };

  if (variant === 'pill') {
    return (
      <div
        style={{
          display: 'inline-flex',
          gap: 4,
          padding: 4,
          background: 'var(--surface-sunken)',
          borderRadius: 'var(--radius-pill)',
          fontFamily: 'var(--font-sans)',
          ...style,
        }}
      >
        {items.map((t) => {
          const on = t.id === current;
          return (
            <button
              key={t.id}
              type="button"
              onClick={() => select(t.id)}
              style={{
                border: 'none',
                cursor: 'pointer',
                padding: '8px 18px',
                borderRadius: 'var(--radius-pill)',
                fontSize: 14,
                fontWeight: 700,
                background: on ? 'var(--purple-500)' : 'transparent',
                color: on ? 'var(--white)' : 'var(--text-secondary)',
                boxShadow: on ? 'var(--shadow-sm)' : 'none',
                transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
              }}
            >
              {t.label}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        gap: 28,
        borderBottom: '1px solid var(--border-subtle)',
        fontFamily: 'var(--font-sans)',
        ...style,
      }}
    >
      {items.map((t) => {
        const on = t.id === current;
        return (
          <button
            key={t.id}
            type="button"
            onClick={() => select(t.id)}
            style={{
              position: 'relative',
              border: 'none',
              background: 'transparent',
              cursor: 'pointer',
              padding: '0 0 12px',
              fontSize: 15,
              fontWeight: on ? 800 : 600,
              color: on ? 'var(--purple-600)' : 'var(--text-secondary)',
              transition: 'color var(--dur-base) var(--ease-out)',
            }}
          >
            {t.label}
            <span
              style={{
                position: 'absolute',
                left: 0,
                right: 0,
                bottom: -1,
                height: 3,
                borderRadius: '3px 3px 0 0',
                background: on ? 'var(--purple-500)' : 'transparent',
                transition: 'background var(--dur-base) var(--ease-out)',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
