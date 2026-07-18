import {
  House,
  Dumbbell,
  TrendingUp,
  User,
  Users,
  Mail,
  Lock,
  ArrowRight,
  ArrowLeft,
  Flame,
  ChevronLeft,
  ChevronRight,
  Ellipsis,
  Check,
  Trophy,
  Bell,
  Moon,
  Ruler,
  Plus,
  X,
  Send,
  Trash2,
  Pencil,
  MessageSquare,
  LayoutDashboard,
  ClipboardList,
  LogOut,
  Calendar,
  Timer,
  Menu,
  ExternalLink,
  Apple,
  UtensilsCrossed,
  ChevronDown,
  ChevronUp,
  Copy,
  Undo2,
  Heart,
  Footprints,
  Scale,
  type LucideIcon,
} from 'lucide-react';
import type { CSSProperties } from 'react';

/* Icon registry — kebab-case name → Lucide component, so screens stay declarative. */
const ICONS = {
  house: House,
  dumbbell: Dumbbell,
  'trending-up': TrendingUp,
  user: User,
  users: Users,
  mail: Mail,
  lock: Lock,
  'arrow-right': ArrowRight,
  'arrow-left': ArrowLeft,
  flame: Flame,
  'chevron-left': ChevronLeft,
  'chevron-right': ChevronRight,
  ellipsis: Ellipsis,
  check: Check,
  trophy: Trophy,
  bell: Bell,
  moon: Moon,
  ruler: Ruler,
  plus: Plus,
  x: X,
  send: Send,
  trash: Trash2,
  pencil: Pencil,
  'message-square': MessageSquare,
  'layout-dashboard': LayoutDashboard,
  'clipboard-list': ClipboardList,
  'log-out': LogOut,
  calendar: Calendar,
  timer: Timer,
  menu: Menu,
  'external-link': ExternalLink,
  apple: Apple,
  utensils: UtensilsCrossed,
  'chevron-down': ChevronDown,
  'chevron-up': ChevronUp,
  copy: Copy,
  undo: Undo2,
  heart: Heart,
  footprints: Footprints,
  scale: Scale,
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
