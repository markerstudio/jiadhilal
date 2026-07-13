import {
  House,
  Dumbbell,
  TrendingUp,
  User,
  Signal,
  Wifi,
  BatteryFull,
  Mail,
  Lock,
  ArrowRight,
  Flame,
  ChevronLeft,
  Ellipsis,
  Check,
  Trophy,
  Bell,
  Moon,
  Ruler,
  type LucideIcon,
} from 'lucide-react';
import type { CSSProperties } from 'react';

/* Icon registry — kebab-case name → Lucide component.
   Mirrors the icons the coaching-app screens reference so screen
   code can stay declarative: <Icon name="dumbbell" />. */
const ICONS = {
  house: House,
  dumbbell: Dumbbell,
  'trending-up': TrendingUp,
  user: User,
  signal: Signal,
  wifi: Wifi,
  'battery-full': BatteryFull,
  mail: Mail,
  lock: Lock,
  'arrow-right': ArrowRight,
  flame: Flame,
  'chevron-left': ChevronLeft,
  ellipsis: Ellipsis,
  check: Check,
  trophy: Trophy,
  bell: Bell,
  moon: Moon,
  ruler: Ruler,
} satisfies Record<string, LucideIcon>;

export type IconName = keyof typeof ICONS;

export interface IconProps {
  name: IconName;
  size?: number;
  color?: string;
  strokeWidth?: number;
  style?: CSSProperties;
}

export function Icon({
  name,
  size = 22,
  color = 'currentColor',
  strokeWidth = 2,
  style,
}: IconProps) {
  const Glyph = ICONS[name];
  return (
    <span style={{ display: 'inline-flex', width: size, height: size, ...style }}>
      <Glyph size={size} color={color} strokeWidth={strokeWidth} />
    </span>
  );
}
