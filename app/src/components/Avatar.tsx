import type { CSSProperties } from 'react';

/**
 * Jiad Hilal — Avatar
 * Client / coach avatar. Image or initials; optional brand ring + status dot.
 */
export interface AvatarProps {
  src?: string;
  name?: string;
  size?: number;
  ring?: boolean;
  status?: 'online' | 'rest';
  style?: CSSProperties;
}

export function Avatar({
  src,
  name = '',
  size = 44,
  ring = false,
  status,
  style = {},
}: AvatarProps) {
  const initials = name
    .split(' ')
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  const statusColor =
    status === 'online'
      ? 'var(--green-neon)'
      : status === 'rest'
      ? 'var(--gray-400)'
      : null;

  return (
    <div style={{ position: 'relative', width: size, height: size, flex: 'none', ...style }}>
      <div
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          background: src ? 'var(--gray-200)' : 'var(--grad-brand)',
          color: 'var(--white)',
          fontFamily: 'var(--font-sans)',
          fontWeight: 800,
          fontSize: size * 0.38,
          letterSpacing: '0.01em',
          boxSizing: 'border-box',
          border: ring ? '2.5px solid var(--purple-500)' : 'none',
          boxShadow: ring ? '0 0 0 2px var(--white)' : 'none',
        }}
      >
        {src ? (
          <img src={src} alt={name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        ) : (
          initials
        )}
      </div>
      {statusColor && (
        <span
          style={{
            position: 'absolute',
            right: 0,
            bottom: 0,
            width: size * 0.28,
            height: size * 0.28,
            borderRadius: '50%',
            background: statusColor,
            border: '2px solid var(--white)',
            boxShadow: status === 'online' ? 'var(--glow-green)' : 'none',
          }}
        />
      )}
    </div>
  );
}
