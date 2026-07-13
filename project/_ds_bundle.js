/* @ds-bundle: {"format":3,"namespace":"JiadHilalDesignSystem_e787fe","components":[{"name":"Avatar","sourcePath":"components/data/Avatar.jsx"},{"name":"StatTile","sourcePath":"components/data/StatTile.jsx"},{"name":"Badge","sourcePath":"components/feedback/Badge.jsx"},{"name":"ProgressBar","sourcePath":"components/feedback/ProgressBar.jsx"},{"name":"ProgressRing","sourcePath":"components/feedback/ProgressRing.jsx"},{"name":"Tag","sourcePath":"components/feedback/Tag.jsx"},{"name":"Button","sourcePath":"components/forms/Button.jsx"},{"name":"Checkbox","sourcePath":"components/forms/Checkbox.jsx"},{"name":"IconButton","sourcePath":"components/forms/IconButton.jsx"},{"name":"Input","sourcePath":"components/forms/Input.jsx"},{"name":"Select","sourcePath":"components/forms/Select.jsx"},{"name":"Switch","sourcePath":"components/forms/Switch.jsx"},{"name":"Card","sourcePath":"components/layout/Card.jsx"},{"name":"Tabs","sourcePath":"components/navigation/Tabs.jsx"}],"sourceHashes":{"components/data/Avatar.jsx":"ec71e8adbac4","components/data/StatTile.jsx":"7284484eef3f","components/feedback/Badge.jsx":"c10e5205d112","components/feedback/ProgressBar.jsx":"97255d54e99e","components/feedback/ProgressRing.jsx":"8e598063f241","components/feedback/Tag.jsx":"eb69622af02f","components/forms/Button.jsx":"862235b27cca","components/forms/Checkbox.jsx":"105834e94812","components/forms/IconButton.jsx":"1395e06d5fcf","components/forms/Input.jsx":"5fb5a0409900","components/forms/Select.jsx":"6e0b4912d643","components/forms/Switch.jsx":"2aae14085993","components/layout/Card.jsx":"e7e32e95dda7","components/navigation/Tabs.jsx":"6b85bd98fffe","ui_kits/coaching-app/AppShell.jsx":"18efa5ed5385","ui_kits/coaching-app/LoginScreen.jsx":"de1074a6ba4e","ui_kits/coaching-app/ProgressScreen.jsx":"037973d86002","ui_kits/coaching-app/TodayScreen.jsx":"f4f37965b09c","ui_kits/coaching-app/WorkoutScreen.jsx":"724de5b70c26","ui_kits/coaching-app/icon-helper.jsx":"9d464a4af819","ui_kits/marketing-site/CtaFooter.jsx":"31dddc968a07","ui_kits/marketing-site/Hero.jsx":"9193166f7871","ui_kits/marketing-site/ProgramsSection.jsx":"187bedbbcd1c","ui_kits/marketing-site/ResultsSection.jsx":"004410e62e88","ui_kits/marketing-site/SiteHeader.jsx":"adf381f1a1d3","ui_kits/marketing-site/icon-helper.jsx":"33d92b3cd6e3"},"inlinedExternals":[],"unexposedExports":[]} */

(() => {

const __ds_ns = (window.JiadHilalDesignSystem_e787fe = window.JiadHilalDesignSystem_e787fe || {});

const __ds_scope = {};

(__ds_ns.__errors = __ds_ns.__errors || []);

// components/data/Avatar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — Avatar
 * Client / coach avatar. Image or initials; optional brand ring + status dot.
 */
function Avatar({
  src,
  name = '',
  size = 44,
  ring = false,
  status,
  // 'online' | 'rest' | null
  style = {},
  ...rest
}) {
  const initials = name.split(' ').map(w => w[0]).filter(Boolean).slice(0, 2).join('').toUpperCase();
  const statusColor = status === 'online' ? 'var(--green-neon)' : status === 'rest' ? 'var(--gray-400)' : null;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      width: size,
      height: size,
      flex: 'none',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
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
      boxShadow: ring ? '0 0 0 2px var(--white)' : 'none'
    }
  }, src ? /*#__PURE__*/React.createElement("img", {
    src: src,
    alt: name,
    style: {
      width: '100%',
      height: '100%',
      objectFit: 'cover'
    }
  }) : initials), statusColor && /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 0,
      bottom: 0,
      width: size * 0.28,
      height: size * 0.28,
      borderRadius: '50%',
      background: statusColor,
      border: '2px solid var(--white)',
      boxShadow: status === 'online' ? 'var(--glow-green)' : 'none'
    }
  }));
}
Object.assign(__ds_scope, { Avatar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/Avatar.jsx", error: String((e && e.message) || e) }); }

// components/data/StatTile.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — StatTile
 * Big mono metric with label + optional delta. The brand's signature data unit.
 */
function StatTile({
  value,
  unit,
  label,
  delta,
  // e.g. "+8%" or "-3kg"
  deltaTone = 'green',
  // green | red | neutral
  icon = null,
  dark = false,
  style = {},
  ...rest
}) {
  const deltaColors = {
    green: 'var(--green-ink)',
    red: 'var(--red-ink)',
    neutral: 'var(--text-muted)'
  };
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 6,
      padding: 'var(--space-5)',
      background: dark ? 'var(--surface-dark-card)' : 'var(--surface-card)',
      border: dark ? '1px solid var(--border-dark)' : '1px solid var(--border-subtle)',
      borderRadius: 'var(--radius-lg)',
      boxShadow: dark ? 'none' : 'var(--shadow-sm)',
      minWidth: 0,
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 8
    }
  }, icon && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--purple-400)'
    }
  }, icon), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 11,
      fontWeight: 800,
      letterSpacing: '0.12em',
      textTransform: 'uppercase',
      color: dark ? 'var(--gray-400)' : 'var(--text-muted)'
    }
  }, label)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'baseline',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 34,
      fontWeight: 700,
      letterSpacing: '-0.02em',
      lineHeight: 1,
      color: dark ? 'var(--white)' : 'var(--text-primary)'
    }
  }, value), unit && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 16,
      fontWeight: 500,
      color: 'var(--purple-400)'
    }
  }, unit)), delta && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 700,
      color: deltaColors[deltaTone] || deltaColors.green
    }
  }, delta));
}
Object.assign(__ds_scope, { StatTile });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/data/StatTile.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Badge.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — Badge
 * Small status pill. Solid or soft tint across brand/neon/neutral tones.
 */
function Badge({
  children,
  tone = 'purple',
  // purple | green | red | neutral | dark
  variant = 'soft',
  // soft | solid
  size = 'md',
  // sm | md
  dot = false,
  style = {},
  ...rest
}) {
  const tones = {
    purple: {
      soft: ['var(--purple-50)', 'var(--purple-700)'],
      solid: ['var(--purple-500)', 'var(--white)'],
      dotc: 'var(--purple-500)'
    },
    green: {
      soft: ['rgba(0,184,0,0.12)', 'var(--green-ink)'],
      solid: ['var(--green-neon)', '#003d00'],
      dotc: 'var(--green-ink)'
    },
    red: {
      soft: ['rgba(224,30,73,0.10)', 'var(--red-ink)'],
      solid: ['var(--red-neon)', 'var(--white)'],
      dotc: 'var(--red-ink)'
    },
    neutral: {
      soft: ['var(--gray-100)', 'var(--gray-600)'],
      solid: ['var(--gray-600)', 'var(--white)'],
      dotc: 'var(--gray-500)'
    },
    dark: {
      soft: ['var(--ink-800)', 'var(--gray-200)'],
      solid: ['var(--char-black)', 'var(--white)'],
      dotc: 'var(--gray-300)'
    }
  };
  const t = tones[tone] || tones.purple;
  const [bg, fg] = t[variant] || t.soft;
  const dims = size === 'sm' ? {
    fs: 11,
    pad: '2px 8px',
    h: 20
  } : {
    fs: 12,
    pad: '4px 11px',
    h: 24
  };
  return /*#__PURE__*/React.createElement("span", _extends({
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 6,
      height: dims.h,
      padding: dims.pad,
      background: bg,
      color: fg,
      fontFamily: 'var(--font-sans)',
      fontSize: dims.fs,
      fontWeight: 800,
      letterSpacing: '0.03em',
      textTransform: 'uppercase',
      borderRadius: 'var(--radius-pill)',
      lineHeight: 1,
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), dot && /*#__PURE__*/React.createElement("span", {
    style: {
      width: 6,
      height: 6,
      borderRadius: '50%',
      background: variant === 'solid' ? 'currentColor' : t.dotc
    }
  }), children);
}
Object.assign(__ds_scope, { Badge });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Badge.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressBar.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — ProgressBar
 * Linear progress. Brand gradient fill by default; neon tones for live/PR.
 */
function ProgressBar({
  value = 0,
  // 0..100
  tone = 'brand',
  // brand | green | red
  height = 10,
  label,
  showValue = false,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  const fills = {
    brand: 'var(--grad-brand)',
    green: 'var(--green-neon)',
    red: 'var(--red-neon)'
  };
  const glow = tone === 'green' ? 'var(--glow-green)' : tone === 'red' ? 'var(--glow-red)' : 'none';
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      width: '100%',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), (label || showValue) && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 6
    }
  }, label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--text-primary)'
    }
  }, label), showValue && /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--text-secondary)'
    }
  }, Math.round(pct), "%")), /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height,
      background: 'var(--gray-200)',
      borderRadius: 'var(--radius-pill)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: `${pct}%`,
      height: '100%',
      background: fills[tone] || fills.brand,
      borderRadius: 'var(--radius-pill)',
      boxShadow: glow,
      transition: 'width var(--dur-slow) var(--ease-out)'
    }
  })));
}
Object.assign(__ds_scope, { ProgressBar });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressBar.jsx", error: String((e && e.message) || e) }); }

// components/feedback/ProgressRing.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — ProgressRing
 * Circular progress for workout / day completion. Brand purple stroke + center label.
 */
function ProgressRing({
  value = 0,
  // 0..100
  size = 96,
  stroke = 9,
  tone = 'brand',
  // brand | green | red
  label,
  sublabel,
  style = {},
  ...rest
}) {
  const pct = Math.max(0, Math.min(100, value));
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const offset = c * (1 - pct / 100);
  const colors = {
    brand: 'var(--purple-500)',
    green: 'var(--green-ink)',
    red: 'var(--red-ink)'
  };
  const col = colors[tone] || colors.brand;
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      position: 'relative',
      width: size,
      height: size,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), /*#__PURE__*/React.createElement("svg", {
    width: size,
    height: size,
    style: {
      transform: 'rotate(-90deg)'
    }
  }, /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: "var(--gray-200)",
    strokeWidth: stroke
  }), /*#__PURE__*/React.createElement("circle", {
    cx: size / 2,
    cy: size / 2,
    r: r,
    fill: "none",
    stroke: col,
    strokeWidth: stroke,
    strokeLinecap: "round",
    strokeDasharray: c,
    strokeDashoffset: offset,
    style: {
      transition: 'stroke-dashoffset var(--dur-slow) var(--ease-out)'
    }
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      inset: 0,
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      gap: 1
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: size * 0.26,
      color: 'var(--text-primary)',
      lineHeight: 1
    }
  }, label != null ? label : `${Math.round(pct)}%`), sublabel && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 10,
      fontWeight: 700,
      letterSpacing: '0.08em',
      textTransform: 'uppercase',
      color: 'var(--text-muted)'
    }
  }, sublabel)));
}
Object.assign(__ds_scope, { ProgressRing });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/ProgressRing.jsx", error: String((e && e.message) || e) }); }

// components/feedback/Tag.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — Tag / Chip
 * Selectable filter chip (muscle group, equipment, focus). Brand fill when active.
 */
function Tag({
  children,
  active = false,
  iconLeft = null,
  onClick,
  disabled = false,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const clickable = !!onClick && !disabled;
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    onClick: disabled ? undefined : onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => setHover(false),
    "aria-pressed": active,
    disabled: disabled,
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 7,
      height: 34,
      padding: '0 15px',
      fontFamily: 'var(--font-sans)',
      fontSize: 13,
      fontWeight: 700,
      lineHeight: 1,
      borderRadius: 'var(--radius-pill)',
      cursor: clickable ? 'pointer' : 'default',
      opacity: disabled ? 0.5 : 1,
      border: active ? '2px solid var(--purple-500)' : '2px solid var(--border-strong)',
      background: active ? 'var(--purple-500)' : hover && clickable ? 'var(--purple-50)' : 'var(--white)',
      color: active ? 'var(--white)' : 'var(--ink-800)',
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out), color var(--dur-fast) var(--ease-out)',
      whiteSpace: 'nowrap',
      ...style
    }
  }, rest), iconLeft, children);
}
Object.assign(__ds_scope, { Tag });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/feedback/Tag.jsx", error: String((e && e.message) || e) }); }

// components/forms/Button.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — Button
 * Athletic, confident CTA. Primary deepens + glows on hover, springs on press.
 */
function Button({
  children,
  variant = 'primary',
  // primary | secondary | ghost | danger | neon
  size = 'md',
  // sm | md | lg
  iconLeft = null,
  iconRight = null,
  fullWidth = false,
  uppercase = true,
  disabled = false,
  type = 'button',
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const sizes = {
    sm: {
      padding: '0 14px',
      height: 36,
      fontSize: 13,
      gap: 7,
      radius: 'var(--radius-sm)'
    },
    md: {
      padding: '0 22px',
      height: 46,
      fontSize: 15,
      gap: 9,
      radius: 'var(--radius-md)'
    },
    lg: {
      padding: '0 30px',
      height: 56,
      fontSize: 17,
      gap: 11,
      radius: 'var(--radius-md)'
    }
  };
  const s = sizes[size] || sizes.md;
  const base = {
    display: fullWidth ? 'flex' : 'inline-flex',
    width: fullWidth ? '100%' : undefined,
    alignItems: 'center',
    justifyContent: 'center',
    gap: s.gap,
    height: s.height,
    padding: s.padding,
    fontFamily: 'var(--font-sans)',
    fontWeight: 800,
    fontSize: s.fontSize,
    letterSpacing: uppercase ? '0.04em' : '0.01em',
    textTransform: uppercase ? 'uppercase' : 'none',
    lineHeight: 1,
    borderRadius: s.radius,
    border: '2px solid transparent',
    cursor: disabled ? 'not-allowed' : 'pointer',
    opacity: disabled ? 0.45 : 1,
    transform: active && !disabled ? 'scale(0.97)' : 'scale(1)',
    transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), border-color var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)',
    whiteSpace: 'nowrap',
    userSelect: 'none'
  };
  const variants = {
    primary: {
      background: hover ? 'var(--purple-600)' : 'var(--purple-500)',
      color: 'var(--white)',
      boxShadow: hover && !disabled ? 'var(--shadow-brand)' : 'var(--shadow-sm)'
    },
    secondary: {
      background: hover ? 'var(--purple-50)' : 'var(--white)',
      color: 'var(--purple-600)',
      borderColor: 'var(--purple-500)'
    },
    ghost: {
      background: hover ? 'var(--purple-50)' : 'transparent',
      color: 'var(--purple-600)'
    },
    danger: {
      background: hover ? 'var(--red-ink)' : 'var(--red-neon)',
      color: 'var(--white)',
      boxShadow: hover && !disabled ? 'var(--glow-red)' : 'var(--shadow-sm)'
    },
    neon: {
      background: 'var(--green-neon)',
      color: '#003d00',
      boxShadow: hover && !disabled ? 'var(--glow-green)' : 'var(--shadow-sm)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: type,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      ...base,
      ...(variants[variant] || variants.primary),
      ...style
    }
  }, rest), iconLeft, children, iconRight);
}
Object.assign(__ds_scope, { Button });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Button.jsx", error: String((e && e.message) || e) }); }

// components/forms/Checkbox.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — Checkbox
 * Square check used for set-completion, agreements, filters. Brand purple when on.
 */
function Checkbox({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  style = {},
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "checkbox",
    "aria-checked": on,
    disabled: disabled,
    onClick: toggle,
    style: {
      width: 22,
      height: 22,
      flex: 'none',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 'var(--radius-xs)',
      border: on ? '2px solid var(--purple-500)' : '2px solid var(--border-strong)',
      background: on ? 'var(--purple-500)' : 'var(--white)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      padding: 0,
      transition: 'background var(--dur-fast) var(--ease-out), border-color var(--dur-fast) var(--ease-out)'
    }
  }, rest), on && /*#__PURE__*/React.createElement("svg", {
    width: "13",
    height: "13",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "white",
    strokeWidth: "3.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "20 6 9 17 4 12"
  }))), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 500,
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Checkbox });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Checkbox.jsx", error: String((e && e.message) || e) }); }

// components/forms/IconButton.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — IconButton
 * Square/circle icon-only control. Pass a Lucide SVG (or any node) as children.
 */
function IconButton({
  children,
  variant = 'ghost',
  // ghost | solid | outline
  size = 'md',
  // sm | md | lg
  round = false,
  disabled = false,
  'aria-label': ariaLabel,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const [active, setActive] = React.useState(false);
  const dims = {
    sm: 32,
    md: 40,
    lg: 48
  }[size] || 40;
  const variants = {
    ghost: {
      background: hover ? 'var(--purple-50)' : 'transparent',
      color: 'var(--ink-800)',
      border: '2px solid transparent'
    },
    solid: {
      background: hover ? 'var(--purple-600)' : 'var(--purple-500)',
      color: 'var(--white)',
      border: '2px solid transparent',
      boxShadow: hover && !disabled ? 'var(--shadow-brand)' : 'none'
    },
    outline: {
      background: hover ? 'var(--purple-50)' : 'var(--white)',
      color: 'var(--purple-600)',
      border: '2px solid var(--border-strong)'
    }
  };
  return /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    "aria-label": ariaLabel,
    disabled: disabled,
    onClick: onClick,
    onMouseEnter: () => setHover(true),
    onMouseLeave: () => {
      setHover(false);
      setActive(false);
    },
    onMouseDown: () => setActive(true),
    onMouseUp: () => setActive(false),
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      width: dims,
      height: dims,
      borderRadius: round ? 'var(--radius-pill)' : 'var(--radius-md)',
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.45 : 1,
      transform: active && !disabled ? 'scale(0.92)' : 'scale(1)',
      transition: 'background var(--dur-base) var(--ease-out), transform var(--dur-fast) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      ...(variants[variant] || variants.ghost),
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { IconButton });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/IconButton.jsx", error: String((e && e.message) || e) }); }

// components/forms/Input.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — Input
 * Labeled text field. Focus draws the brand ring; supports error + hint + icon.
 */
function Input({
  label,
  value,
  defaultValue,
  placeholder,
  type = 'text',
  hint,
  error,
  iconLeft = null,
  disabled = false,
  fullWidth = true,
  onChange,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const inputId = id || React.useId();
  const borderColor = error ? 'var(--red-ink)' : focus ? 'var(--purple-500)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: fullWidth ? '100%' : undefined,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: inputId,
    style: {
      display: 'block',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--text-primary)',
      marginBottom: 7,
      letterSpacing: '0.01em'
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 9,
      height: 46,
      padding: '0 14px',
      background: disabled ? 'var(--gray-100)' : 'var(--white)',
      border: `2px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus && !error ? 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    }
  }, iconLeft && /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'inline-flex',
      color: 'var(--gray-500)'
    }
  }, iconLeft), /*#__PURE__*/React.createElement("input", _extends({
    id: inputId,
    type: type,
    value: value,
    defaultValue: defaultValue,
    placeholder: placeholder,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      flex: 1,
      border: 'none',
      outline: 'none',
      background: 'transparent',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text-primary)',
      minWidth: 0
    }
  }, rest))), (hint || error) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 6,
      color: error ? 'var(--red-ink)' : 'var(--text-muted)',
      fontWeight: error ? 600 : 400
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Input });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Input.jsx", error: String((e && e.message) || e) }); }

// components/forms/Select.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — Select
 * Native-backed dropdown styled to match Input. Brand ring on focus.
 */
function Select({
  label,
  value,
  defaultValue,
  options = [],
  // [{value, label}] or string[]
  hint,
  error,
  disabled = false,
  fullWidth = true,
  onChange,
  id,
  style = {},
  ...rest
}) {
  const [focus, setFocus] = React.useState(false);
  const selId = id || React.useId();
  const opts = options.map(o => typeof o === 'string' ? {
    value: o,
    label: o
  } : o);
  const borderColor = error ? 'var(--red-ink)' : focus ? 'var(--purple-500)' : 'var(--border-strong)';
  return /*#__PURE__*/React.createElement("div", {
    style: {
      width: fullWidth ? '100%' : undefined,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, label && /*#__PURE__*/React.createElement("label", {
    htmlFor: selId,
    style: {
      display: 'block',
      fontSize: 13,
      fontWeight: 700,
      color: 'var(--text-primary)',
      marginBottom: 7
    }
  }, label), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'relative',
      display: 'flex',
      alignItems: 'center',
      height: 46,
      background: disabled ? 'var(--gray-100)' : 'var(--white)',
      border: `2px solid ${borderColor}`,
      borderRadius: 'var(--radius-md)',
      boxShadow: focus && !error ? 'var(--focus-ring)' : 'none',
      transition: 'border-color var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    }
  }, /*#__PURE__*/React.createElement("select", _extends({
    id: selId,
    value: value,
    defaultValue: defaultValue,
    disabled: disabled,
    onChange: onChange,
    onFocus: () => setFocus(true),
    onBlur: () => setFocus(false),
    style: {
      appearance: 'none',
      WebkitAppearance: 'none',
      border: 'none',
      outline: 'none',
      background: 'transparent',
      width: '100%',
      height: '100%',
      padding: '0 38px 0 14px',
      fontFamily: 'var(--font-sans)',
      fontSize: 15,
      fontWeight: 500,
      color: 'var(--text-primary)',
      cursor: disabled ? 'not-allowed' : 'pointer'
    }
  }, rest), opts.map(o => /*#__PURE__*/React.createElement("option", {
    key: o.value,
    value: o.value
  }, o.label))), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      right: 14,
      pointerEvents: 'none',
      color: 'var(--gray-500)',
      display: 'inline-flex'
    }
  }, /*#__PURE__*/React.createElement("svg", {
    width: "16",
    height: "16",
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: "2.5",
    strokeLinecap: "round",
    strokeLinejoin: "round"
  }, /*#__PURE__*/React.createElement("polyline", {
    points: "6 9 12 15 18 9"
  })))), (hint || error) && /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      marginTop: 6,
      color: error ? 'var(--red-ink)' : 'var(--text-muted)',
      fontWeight: error ? 600 : 400
    }
  }, error || hint));
}
Object.assign(__ds_scope, { Select });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Select.jsx", error: String((e && e.message) || e) }); }

// components/forms/Switch.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — Switch
 * On/off toggle. Track turns brand purple when on; thumb springs.
 */
function Switch({
  checked,
  defaultChecked = false,
  onChange,
  disabled = false,
  label,
  size = 'md',
  // sm | md
  style = {},
  ...rest
}) {
  const isControlled = checked !== undefined;
  const [internal, setInternal] = React.useState(defaultChecked);
  const on = isControlled ? checked : internal;
  const dims = size === 'sm' ? {
    w: 38,
    h: 22,
    knob: 16
  } : {
    w: 50,
    h: 28,
    knob: 22
  };
  const toggle = () => {
    if (disabled) return;
    if (!isControlled) setInternal(!on);
    onChange && onChange(!on);
  };
  return /*#__PURE__*/React.createElement("label", {
    style: {
      display: 'inline-flex',
      alignItems: 'center',
      gap: 10,
      cursor: disabled ? 'not-allowed' : 'pointer',
      opacity: disabled ? 0.5 : 1,
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, /*#__PURE__*/React.createElement("button", _extends({
    type: "button",
    role: "switch",
    "aria-checked": on,
    disabled: disabled,
    onClick: toggle,
    style: {
      position: 'relative',
      width: dims.w,
      height: dims.h,
      flex: 'none',
      borderRadius: 'var(--radius-pill)',
      border: 'none',
      padding: 0,
      cursor: disabled ? 'not-allowed' : 'pointer',
      background: on ? 'var(--purple-500)' : 'var(--gray-300)',
      boxShadow: on ? 'var(--shadow-brand)' : 'none',
      transition: 'background var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)'
    }
  }, rest), /*#__PURE__*/React.createElement("span", {
    style: {
      position: 'absolute',
      top: (dims.h - dims.knob) / 2,
      left: on ? dims.w - dims.knob - (dims.h - dims.knob) / 2 : (dims.h - dims.knob) / 2,
      width: dims.knob,
      height: dims.knob,
      borderRadius: '50%',
      background: 'var(--white)',
      boxShadow: 'var(--shadow-sm)',
      transition: 'left var(--dur-base) var(--ease-spring)'
    }
  })), label && /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 14,
      fontWeight: 600,
      color: 'var(--text-primary)'
    }
  }, label));
}
Object.assign(__ds_scope, { Switch });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/forms/Switch.jsx", error: String((e && e.message) || e) }); }

// components/layout/Card.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — Card
 * Surface container. Variants: surface (white), brand (gradient), dark, outline.
 * Optional interactive lift on hover.
 */
function Card({
  children,
  variant = 'surface',
  // surface | brand | dark | outline
  padding = 'var(--space-6)',
  interactive = false,
  onClick,
  style = {},
  ...rest
}) {
  const [hover, setHover] = React.useState(false);
  const variants = {
    surface: {
      background: 'var(--surface-card)',
      color: 'var(--text-primary)',
      border: '1px solid var(--border-subtle)',
      shadow: 'var(--shadow-md)',
      hoverShadow: 'var(--shadow-lg)'
    },
    brand: {
      background: 'var(--grad-brand)',
      color: 'var(--white)',
      border: 'none',
      shadow: 'var(--shadow-brand)',
      hoverShadow: 'var(--shadow-brand-lg)'
    },
    dark: {
      background: 'var(--surface-dark-card)',
      color: 'var(--white)',
      border: '1px solid var(--border-dark)',
      shadow: 'none',
      hoverShadow: '0 12px 32px rgba(0,0,0,0.5)'
    },
    outline: {
      background: 'transparent',
      color: 'var(--text-primary)',
      border: '2px solid var(--border-strong)',
      shadow: 'none',
      hoverShadow: 'var(--shadow-md)'
    }
  };
  const v = variants[variant] || variants.surface;
  return /*#__PURE__*/React.createElement("div", _extends({
    onClick: onClick,
    onMouseEnter: () => interactive && setHover(true),
    onMouseLeave: () => interactive && setHover(false),
    style: {
      background: v.background,
      color: v.color,
      border: v.border,
      borderRadius: 'var(--radius-lg)',
      padding,
      boxShadow: hover ? v.hoverShadow : v.shadow,
      transform: interactive && hover ? 'translateY(-3px)' : 'translateY(0)',
      transition: 'transform var(--dur-base) var(--ease-out), box-shadow var(--dur-base) var(--ease-out)',
      cursor: interactive || onClick ? 'pointer' : 'default',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), children);
}
Object.assign(__ds_scope, { Card });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/layout/Card.jsx", error: String((e && e.message) || e) }); }

// components/navigation/Tabs.jsx
try { (() => {
function _extends() { return _extends = Object.assign ? Object.assign.bind() : function (n) { for (var e = 1; e < arguments.length; e++) { var t = arguments[e]; for (var r in t) ({}).hasOwnProperty.call(t, r) && (n[r] = t[r]); } return n; }, _extends.apply(null, arguments); }
/**
 * Jiad Hilal — Tabs
 * Segmented in-content navigation. Active tab carries the brand underline (or pill).
 */
function Tabs({
  tabs = [],
  // [{id, label}] or string[]
  value,
  defaultValue,
  onChange,
  variant = 'underline',
  // underline | pill
  style = {},
  ...rest
}) {
  const items = tabs.map(t => typeof t === 'string' ? {
    id: t,
    label: t
  } : t);
  const isControlled = value !== undefined;
  const [internal, setInternal] = React.useState(defaultValue ?? items[0]?.id);
  const current = isControlled ? value : internal;
  const select = id => {
    if (!isControlled) setInternal(id);
    onChange && onChange(id);
  };
  if (variant === 'pill') {
    return /*#__PURE__*/React.createElement("div", _extends({
      style: {
        display: 'inline-flex',
        gap: 4,
        padding: 4,
        background: 'var(--surface-sunken)',
        borderRadius: 'var(--radius-pill)',
        fontFamily: 'var(--font-sans)',
        ...style
      }
    }, rest), items.map(t => {
      const on = t.id === current;
      return /*#__PURE__*/React.createElement("button", {
        key: t.id,
        type: "button",
        onClick: () => select(t.id),
        style: {
          border: 'none',
          cursor: 'pointer',
          padding: '8px 18px',
          borderRadius: 'var(--radius-pill)',
          fontSize: 14,
          fontWeight: 700,
          background: on ? 'var(--purple-500)' : 'transparent',
          color: on ? 'var(--white)' : 'var(--text-secondary)',
          boxShadow: on ? 'var(--shadow-sm)' : 'none',
          transition: 'background var(--dur-base) var(--ease-out), color var(--dur-base) var(--ease-out)'
        }
      }, t.label);
    }));
  }
  return /*#__PURE__*/React.createElement("div", _extends({
    style: {
      display: 'flex',
      gap: 28,
      borderBottom: '1px solid var(--border-subtle)',
      fontFamily: 'var(--font-sans)',
      ...style
    }
  }, rest), items.map(t => {
    const on = t.id === current;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      type: "button",
      onClick: () => select(t.id),
      style: {
        position: 'relative',
        border: 'none',
        background: 'transparent',
        cursor: 'pointer',
        padding: '0 0 12px',
        fontSize: 15,
        fontWeight: on ? 800 : 600,
        color: on ? 'var(--purple-600)' : 'var(--text-secondary)',
        transition: 'color var(--dur-base) var(--ease-out)'
      }
    }, t.label, /*#__PURE__*/React.createElement("span", {
      style: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: -1,
        height: 3,
        borderRadius: '3px 3px 0 0',
        background: on ? 'var(--purple-500)' : 'transparent',
        transition: 'background var(--dur-base) var(--ease-out)'
      }
    }));
  }));
}
Object.assign(__ds_scope, { Tabs });
})(); } catch (e) { __ds_ns.__errors.push({ path: "components/navigation/Tabs.jsx", error: String((e && e.message) || e) }); }

// ui_kits/coaching-app/AppShell.jsx
try { (() => {
/* App shell — phone frame, status bar, bottom tab bar, simple routing */
function AppShell() {
  const [authed, setAuthed] = React.useState(false);
  const [tab, setTab] = React.useState('today');
  const [inWorkout, setInWorkout] = React.useState(false);
  const tabs = [{
    id: 'today',
    icon: 'house',
    label: 'Today'
  }, {
    id: 'train',
    icon: 'dumbbell',
    label: 'Train'
  }, {
    id: 'progress',
    icon: 'trending-up',
    label: 'Progress'
  }, {
    id: 'profile',
    icon: 'user',
    label: 'Profile'
  }];
  let screen;
  if (!authed) {
    screen = /*#__PURE__*/React.createElement(LoginScreen, {
      onLogin: () => setAuthed(true)
    });
  } else if (inWorkout) {
    screen = /*#__PURE__*/React.createElement(WorkoutScreen, {
      onBack: () => setInWorkout(false)
    });
  } else if (tab === 'today' || tab === 'train') {
    screen = /*#__PURE__*/React.createElement(TodayScreen, {
      onStartWorkout: () => setInWorkout(true)
    });
  } else if (tab === 'progress') {
    screen = /*#__PURE__*/React.createElement(ProgressScreen, null);
  } else {
    screen = /*#__PURE__*/React.createElement(ProfileScreen, null);
  }
  return /*#__PURE__*/React.createElement("div", {
    style: {
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'radial-gradient(circle at 50% 0%, #2a2140, #0c0a12 70%)',
      padding: 24,
      fontFamily: 'var(--font-sans)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 390,
      height: 844,
      borderRadius: 52,
      background: '#000',
      padding: 11,
      boxShadow: '0 40px 90px rgba(0,0,0,0.6), 0 0 0 2px #2a2633',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: '100%',
      height: '100%',
      borderRadius: 42,
      overflow: 'hidden',
      position: 'relative',
      background: 'var(--surface-dark)',
      display: 'flex',
      flexDirection: 'column'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 44,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '0 28px',
      zIndex: 20,
      color: 'var(--white)',
      pointerEvents: 'none'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      fontWeight: 700
    }
  }, "9:41"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "signal",
    size: 15,
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "wifi",
    size: 15,
    color: "#fff"
  }), /*#__PURE__*/React.createElement(Icon, {
    name: "battery-full",
    size: 17,
    color: "#fff"
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'absolute',
      top: 11,
      left: '50%',
      transform: 'translateX(-50%)',
      width: 120,
      height: 30,
      background: '#000',
      borderRadius: 18,
      zIndex: 21
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      overflowY: 'auto',
      overflowX: 'hidden',
      paddingTop: authed && !inWorkout ? 44 : 0
    }
  }, screen), authed && !inWorkout && /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-around',
      alignItems: 'center',
      padding: '10px 14px 26px',
      background: 'rgba(20,17,24,0.9)',
      backdropFilter: 'var(--blur-glass)',
      WebkitBackdropFilter: 'var(--blur-glass)',
      borderTop: '1px solid var(--border-dark)'
    }
  }, tabs.map(t => {
    const on = tab === t.id || t.id === 'train' && false;
    return /*#__PURE__*/React.createElement("button", {
      key: t.id,
      onClick: () => setTab(t.id),
      style: {
        background: 'none',
        border: 'none',
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 4,
        padding: '4px 12px',
        color: on ? 'var(--purple-300)' : 'var(--gray-500)'
      }
    }, /*#__PURE__*/React.createElement(Icon, {
      name: t.icon,
      size: 22,
      color: on ? 'var(--purple-300)' : 'var(--gray-500)',
      strokeWidth: on ? 2.4 : 2
    }), /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 10,
        fontWeight: 700,
        letterSpacing: '0.02em'
      }
    }, t.label));
  })))));
}
window.AppShell = AppShell;

/* lightweight profile screen kept here to keep the kit compact */
function ProfileScreen() {
  const {
    Card,
    Avatar,
    Switch,
    Badge,
    Button
  } = window.JiadHilalDesignSystem_e787fe;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-dark)',
      color: 'var(--white)',
      minHeight: '100%',
      paddingBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '24px 22px',
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Sam Rivera",
    ring: true,
    status: "online",
    size: 64
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 24,
      textTransform: 'uppercase'
    }
  }, "Sam Rivera"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 6,
      marginTop: 6
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "purple",
    variant: "solid"
  }, "Hypertrophy"), /*#__PURE__*/React.createElement(Badge, {
    tone: "green",
    variant: "soft",
    dot: true
  }, "12-day streak")))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '0 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "dark",
    padding: "6px 16px"
  }, [['bell', 'Workout reminders', true], ['moon', 'Rest-day notifications', true], ['ruler', 'Metric units', false]].map(([ic, label, def], i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 0',
      borderTop: i ? '1px solid var(--border-dark)' : 'none'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: ic,
    size: 18,
    color: "var(--purple-300)"
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      flex: 1,
      fontSize: 14.5,
      fontWeight: 600
    }
  }, label), /*#__PURE__*/React.createElement(Switch, {
    defaultChecked: def
  })))), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    fullWidth: true
  }, "Message your coach")));
}
window.ProfileScreen = ProfileScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/coaching-app/AppShell.jsx", error: String((e && e.message) || e) }); }

// ui_kits/coaching-app/LoginScreen.jsx
try { (() => {
/* Login / welcome screen — coaching app */
function LoginScreen({
  onLogin
}) {
  const {
    Button,
    Input
  } = window.JiadHilalDesignSystem_e787fe;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      background: 'var(--grad-ink)',
      color: 'var(--white)',
      padding: '64px 26px 30px',
      boxSizing: 'border-box'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark-white.png",
    alt: "Jiad Hilal",
    style: {
      width: 64,
      marginBottom: 28
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 44,
      lineHeight: 0.96,
      textTransform: 'uppercase',
      letterSpacing: '-0.03em'
    }
  }, "No", /*#__PURE__*/React.createElement("br", null), "excuses."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 800,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--purple-300)',
      marginTop: 16
    }
  }, "Let's get to work"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 34,
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Input, {
    label: "",
    placeholder: "Email",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "mail",
      size: 18
    }),
    style: {
      '--x': 0
    }
  }), /*#__PURE__*/React.createElement(Input, {
    label: "",
    placeholder: "Password",
    type: "password",
    iconLeft: /*#__PURE__*/React.createElement(Icon, {
      name: "lock",
      size: 18
    })
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    onClick: onLogin
  }, "Log in & train"), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center',
      fontSize: 13,
      color: 'var(--gray-400)'
    }
  }, "New here? ", /*#__PURE__*/React.createElement("span", {
    style: {
      color: 'var(--purple-300)',
      fontWeight: 700
    }
  }, "Start your plan"))));
}
window.LoginScreen = LoginScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/coaching-app/LoginScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/coaching-app/ProgressScreen.jsx
try { (() => {
/* Progress / stats screen — coaching app */
function ProgressScreen() {
  const {
    Card,
    StatTile,
    Tabs,
    Badge
  } = window.JiadHilalDesignSystem_e787fe;
  const [range, setRange] = React.useState('Month');
  const bars = [40, 55, 48, 70, 62, 85, 78, 92];
  const prs = [{
    lift: 'Bench Press',
    val: '185 lb',
    when: '2 days ago'
  }, {
    lift: 'Back Squat',
    val: '275 lb',
    when: 'Last week'
  }, {
    lift: 'Deadlift',
    val: '335 lb',
    when: '2 weeks ago'
  }];
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-dark)',
      color: 'var(--white)',
      minHeight: '100%',
      paddingBottom: 20
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '18px 22px 4px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 26,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em'
    }
  }, "Progress")), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '8px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Tabs, {
    variant: "pill",
    tabs: ['Week', 'Month', 'Year'],
    value: range,
    onChange: setRange,
    style: {
      background: 'var(--ink-800)'
    }
  }), /*#__PURE__*/React.createElement(Card, {
    variant: "dark",
    padding: "18px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'baseline',
      marginBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--gray-400)'
    }
  }, "Total volume"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 28,
      fontWeight: 700,
      marginTop: 2
    }
  }, "112,480 ", /*#__PURE__*/React.createElement("span", {
    style: {
      fontSize: 15,
      color: 'var(--purple-300)'
    }
  }, "lb"))), /*#__PURE__*/React.createElement(Badge, {
    tone: "green",
    variant: "soft",
    dot: true
  }, "+14%")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'flex-end',
      gap: 8,
      height: 110
    }
  }, bars.map((h, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      flex: 1,
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'flex-end',
      height: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      height: `${h}%`,
      background: i === bars.length - 1 ? 'var(--green-neon)' : 'var(--grad-brand)',
      borderRadius: '4px 4px 0 0',
      boxShadow: i === bars.length - 1 ? 'var(--glow-green)' : 'none'
    }
  }))))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "48",
    label: "Workouts",
    delta: "+6 this month"
  }), /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "38.5",
    unit: "h",
    label: "Time trained",
    delta: "+4.2h"
  })), /*#__PURE__*/React.createElement(Card, {
    variant: "dark",
    padding: "0"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '14px 16px 8px',
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--gray-400)'
    }
  }, "Recent PRs"), prs.map((p, i) => /*#__PURE__*/React.createElement("div", {
    key: i,
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      padding: '12px 16px',
      borderTop: '1px solid var(--border-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      width: 36,
      height: 36,
      borderRadius: 'var(--radius-sm)',
      background: 'rgba(98,0,255,0.18)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'var(--purple-300)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "trophy",
    size: 18
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 700,
      fontSize: 14.5
    }
  }, p.lift), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--gray-400)'
    }
  }, p.when)), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontWeight: 700,
      fontSize: 16,
      color: 'var(--green-neon)'
    }
  }, p.val))))));
}
window.ProgressScreen = ProgressScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/coaching-app/ProgressScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/coaching-app/TodayScreen.jsx
try { (() => {
/* Today / dashboard — coaching app home */
function TodayScreen({
  onStartWorkout
}) {
  const {
    Card,
    StatTile,
    ProgressRing,
    Badge,
    Avatar,
    Button
  } = window.JiadHilalDesignSystem_e787fe;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-dark)',
      color: 'var(--white)',
      minHeight: '100%',
      paddingBottom: 16
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '18px 22px 8px'
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.14em',
      textTransform: 'uppercase',
      color: 'var(--gray-400)'
    }
  }, "Tuesday \xB7 Week 4"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 26,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      marginTop: 2
    }
  }, "Let's go, Sam")), /*#__PURE__*/React.createElement(Avatar, {
    name: "Sam Rivera",
    status: "online",
    ring: true,
    size: 46
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '6px 22px',
      display: 'flex',
      flexDirection: 'column',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "brand",
    interactive: true,
    onClick: onStartWorkout,
    padding: "20px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "green",
    variant: "solid",
    dot: true
  }, "Today"), /*#__PURE__*/React.createElement(Icon, {
    name: "dumbbell",
    size: 26,
    color: "rgba(255,255,255,0.85)"
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 30,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      marginTop: 14,
      lineHeight: 1
    }
  }, "Push Day A"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 14,
      opacity: 0.85,
      marginTop: 6
    }
  }, "6 exercises \xB7 52 min \xB7 chest, shoulders, triceps"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 18
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "neon",
    size: "md",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 18
    })
  }, "Start workout"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14
    }
  }, /*#__PURE__*/React.createElement(Card, {
    variant: "dark",
    padding: "18px",
    style: {
      flex: 1,
      display: 'flex',
      alignItems: 'center',
      gap: 16
    }
  }, /*#__PURE__*/React.createElement(ProgressRing, {
    value: 75,
    sublabel: "This week",
    size: 84
  }), /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 22,
      fontWeight: 700
    }
  }, "3 / 4"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--gray-400)',
      fontWeight: 600
    }
  }, "sessions done")))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "12",
    label: "Day streak",
    delta: "Personal best",
    deltaTone: "neutral",
    icon: /*#__PURE__*/React.createElement(Icon, {
      name: "flame",
      size: 16
    })
  }), /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "185",
    unit: "lb",
    label: "Bench top set",
    delta: "+8%"
  }), /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "14.2k",
    label: "Weekly volume",
    delta: "+1.1k"
  }), /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "7.4",
    unit: "h",
    label: "Avg sleep",
    delta: "-0.3h",
    deltaTone: "red"
  })), /*#__PURE__*/React.createElement(Card, {
    variant: "dark",
    padding: "16px",
    style: {
      display: 'flex',
      gap: 12,
      alignItems: 'center'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Jiad Hilal",
    size: 40
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: '0.1em',
      textTransform: 'uppercase',
      color: 'var(--purple-300)'
    }
  }, "Note from Jiad"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13.5,
      color: 'var(--gray-200)',
      marginTop: 3,
      lineHeight: 1.45
    }
  }, "Strong bench last week. Keep the bar path tight today \u2014 chest, not shoulders.")))));
}
window.TodayScreen = TodayScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/coaching-app/TodayScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/coaching-app/WorkoutScreen.jsx
try { (() => {
/* Active workout screen — coaching app */
function WorkoutScreen({
  onBack
}) {
  const {
    Card,
    Checkbox,
    ProgressBar,
    Badge,
    Button,
    IconButton
  } = window.JiadHilalDesignSystem_e787fe;
  const [done, setDone] = React.useState({
    '0-0': true,
    '0-1': true,
    '1-0': true
  });
  const exercises = [{
    name: 'Barbell Bench Press',
    target: '4 × 8',
    sets: [{
      w: '135',
      r: '8'
    }, {
      w: '155',
      r: '8'
    }, {
      w: '175',
      r: '8'
    }, {
      w: '185',
      r: '6'
    }]
  }, {
    name: 'Incline DB Press',
    target: '3 × 10',
    sets: [{
      w: '60',
      r: '10'
    }, {
      w: '65',
      r: '10'
    }, {
      w: '65',
      r: '9'
    }]
  }, {
    name: 'Cable Fly',
    target: '3 × 12',
    sets: [{
      w: '30',
      r: '12'
    }, {
      w: '30',
      r: '12'
    }, {
      w: '35',
      r: '10'
    }]
  }];
  const total = exercises.reduce((a, e) => a + e.sets.length, 0);
  const completed = Object.values(done).filter(Boolean).length;
  return /*#__PURE__*/React.createElement("div", {
    style: {
      background: 'var(--surface-dark)',
      color: 'var(--white)',
      minHeight: '100%'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 5,
      background: 'rgba(20,17,24,0.82)',
      backdropFilter: 'var(--blur-glass)',
      WebkitBackdropFilter: 'var(--blur-glass)',
      padding: '14px 20px 12px',
      borderBottom: '1px solid var(--border-dark)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "Back",
    variant: "ghost",
    onClick: onBack,
    style: {
      color: 'var(--white)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "chevron-left",
    size: 22
  })), /*#__PURE__*/React.createElement("div", {
    style: {
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 15,
      textTransform: 'uppercase',
      letterSpacing: '0.02em'
    }
  }, "Push Day A"), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-mono)',
      fontSize: 13,
      color: 'var(--green-neon)'
    }
  }, "28:14")), /*#__PURE__*/React.createElement(IconButton, {
    "aria-label": "More",
    variant: "ghost",
    style: {
      color: 'var(--white)'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "ellipsis",
    size: 22
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 10
    }
  }, /*#__PURE__*/React.createElement(ProgressBar, {
    value: completed / total * 100,
    tone: "green",
    height: 6
  }))), /*#__PURE__*/React.createElement("div", {
    style: {
      padding: '16px 20px 24px',
      display: 'flex',
      flexDirection: 'column',
      gap: 14
    }
  }, exercises.map((ex, ei) => /*#__PURE__*/React.createElement(Card, {
    key: ei,
    variant: "dark",
    padding: "16px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 12
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontWeight: 800,
      fontSize: 16
    }
  }, ex.name), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      color: 'var(--gray-400)',
      fontWeight: 600,
      marginTop: 2
    }
  }, ex.target)), /*#__PURE__*/React.createElement(Badge, {
    tone: ex.sets.every((_, si) => done[`${ei}-${si}`]) ? 'green' : 'neutral',
    variant: "soft"
  }, ex.sets.filter((_, si) => done[`${ei}-${si}`]).length, "/", ex.sets.length)), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 8
    }
  }, ex.sets.map((set, si) => {
    const key = `${ei}-${si}`;
    const on = !!done[key];
    return /*#__PURE__*/React.createElement("div", {
      key: si,
      style: {
        display: 'flex',
        alignItems: 'center',
        gap: 12,
        padding: '9px 12px',
        borderRadius: 'var(--radius-sm)',
        background: on ? 'rgba(98,0,255,0.16)' : 'var(--ink-800)',
        border: on ? '1px solid var(--purple-500)' : '1px solid transparent',
        transition: 'background var(--dur-base) var(--ease-out)'
      }
    }, /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 12,
        color: 'var(--gray-400)',
        width: 16
      }
    }, si + 1), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 16,
        fontWeight: 700,
        flex: 1
      }
    }, set.w, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--purple-300)'
      }
    }, " lb")), /*#__PURE__*/React.createElement("span", {
      style: {
        fontFamily: 'var(--font-mono)',
        fontSize: 16,
        fontWeight: 700,
        flex: 1
      }
    }, set.r, /*#__PURE__*/React.createElement("span", {
      style: {
        fontSize: 12,
        color: 'var(--purple-300)'
      }
    }, " reps")), /*#__PURE__*/React.createElement(Checkbox, {
      checked: on,
      onChange: v => setDone(d => ({
        ...d,
        [key]: v
      }))
    }));
  })))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "lg",
    fullWidth: true,
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "check",
      size: 20
    })
  }, "Finish workout")));
}
window.WorkoutScreen = WorkoutScreen;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/coaching-app/WorkoutScreen.jsx", error: String((e && e.message) || e) }); }

// ui_kits/coaching-app/icon-helper.jsx
try { (() => {
/* Shared Lucide icon helper for the coaching-app UI kit.
   Renders a Lucide SVG inline and keeps it in sync across React re-renders. */
function Icon({
  name,
  size = 22,
  color = 'currentColor',
  strokeWidth = 2,
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide && window.lucide.icons) {
      const pascal = name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
      const node = window.lucide.icons[pascal];
      if (node) {
        ref.current.innerHTML = '';
        const svg = window.lucide.createElement(node);
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('stroke', color);
        svg.setAttribute('stroke-width', strokeWidth);
        ref.current.appendChild(svg);
      }
    }
  }, [name, size, color, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      ...style
    }
  });
}
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/coaching-app/icon-helper.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/CtaFooter.jsx
try { (() => {
/* CTA band + footer — marketing site */
function CtaFooter() {
  const {
    Button
  } = window.JiadHilalDesignSystem_e787fe;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--grad-energy)',
      padding: '80px 32px',
      textAlign: 'center'
    }
  }, /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 'clamp(2.5rem,6vw,4.5rem)',
      textTransform: 'uppercase',
      letterSpacing: '-0.03em',
      color: '#fff',
      margin: 0,
      lineHeight: 0.95
    }
  }, "No excuses.", /*#__PURE__*/React.createElement("br", null), "Start today."), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-accent)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 22,
      letterSpacing: '-0.01em',
      color: 'rgba(255,255,255,0.92)',
      marginTop: 14,
      textTransform: 'lowercase'
    }
  }, "let's get to work"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 30,
      display: 'flex',
      gap: 14,
      justifyContent: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "neon",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 20
    })
  }, "Claim your plan"), /*#__PURE__*/React.createElement(Button, {
    size: "lg",
    style: {
      background: 'rgba(0,0,0,0.25)',
      color: '#fff'
    }
  }, "Book a free call"))), /*#__PURE__*/React.createElement("footer", {
    style: {
      background: 'var(--ink-950)',
      color: 'var(--gray-400)',
      padding: '54px 32px 40px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      flexWrap: 'wrap',
      gap: 32
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 280
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 10
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark-white.png",
    alt: "Jiad Hilal",
    style: {
      height: 28
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 16,
      color: '#fff',
      textTransform: 'uppercase'
    }
  }, "Jiad Hilal")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 700,
      letterSpacing: '0.16em',
      textTransform: 'uppercase',
      marginTop: 12
    }
  }, "Personal Trainer & Athlete")), [['Train', ['Programs', 'Coaching', '1-on-1', 'App']], ['Company', ['About', 'Results', 'Careers', 'Contact']], ['More', ['Instagram', 'YouTube', 'Privacy', 'Terms']]].map(([h, items]) => /*#__PURE__*/React.createElement("div", {
    key: h
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      color: '#fff',
      fontWeight: 800,
      fontSize: 13,
      letterSpacing: '0.04em',
      textTransform: 'uppercase',
      marginBottom: 14
    }
  }, h), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      flexDirection: 'column',
      gap: 10
    }
  }, items.map(it => /*#__PURE__*/React.createElement("a", {
    key: it,
    href: "#",
    style: {
      color: 'var(--gray-400)',
      textDecoration: 'none',
      fontSize: 14
    }
  }, it)))))), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '36px auto 0',
      paddingTop: 22,
      borderTop: '1px solid var(--ink-800)',
      fontSize: 12.5
    }
  }, "\xA9 2026 Jiad Hilal\u2122. All rights reserved.")));
}
window.CtaFooter = CtaFooter;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/CtaFooter.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/Hero.jsx
try { (() => {
/* Hero — marketing site */
function Hero() {
  const {
    Button,
    Badge,
    StatTile
  } = window.JiadHilalDesignSystem_e787fe;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      position: 'relative',
      background: 'var(--grad-brand)',
      overflow: 'hidden'
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark-white.png",
    alt: "",
    "aria-hidden": "true",
    style: {
      position: 'absolute',
      right: -80,
      top: -40,
      width: 520,
      opacity: 0.08,
      transform: 'rotate(-8deg)',
      pointerEvents: 'none'
    }
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '96px 32px 88px',
      position: 'relative'
    }
  }, /*#__PURE__*/React.createElement(Badge, {
    tone: "dark",
    variant: "solid",
    style: {
      background: 'rgba(0,0,0,0.25)',
      color: '#fff'
    }
  }, "Personal Trainer & Athlete"), /*#__PURE__*/React.createElement("h1", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 'clamp(3rem, 8vw, 6rem)',
      lineHeight: 0.92,
      color: '#fff',
      textTransform: 'uppercase',
      letterSpacing: '-0.03em',
      margin: '22px 0 0',
      maxWidth: 14 + 'ch'
    }
  }, "Build the body you train for"), /*#__PURE__*/React.createElement("p", {
    style: {
      fontSize: 19,
      lineHeight: 1.55,
      color: 'rgba(255,255,255,0.88)',
      maxWidth: '46ch',
      margin: '22px 0 0'
    }
  }, "Coaching built around progressive overload, honest tracking, and the days you don't feel like showing up. Train with intent. Recover with discipline."), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 32,
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Button, {
    variant: "neon",
    size: "lg",
    iconRight: /*#__PURE__*/React.createElement(Icon, {
      name: "arrow-right",
      size: 20
    })
  }, "Start your plan"), /*#__PURE__*/React.createElement(Button, {
    variant: "secondary",
    size: "lg",
    style: {
      background: 'transparent',
      color: '#fff',
      borderColor: 'rgba(255,255,255,0.5)'
    }
  }, "Watch a session")), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 14,
      marginTop: 56,
      maxWidth: 560
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "500+",
    label: "Clients coached",
    style: {
      flex: 1,
      background: 'rgba(255,255,255,0.10)',
      border: '1px solid rgba(255,255,255,0.18)',
      boxShadow: 'none'
    }
  }), /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "4.9",
    label: "Avg rating",
    style: {
      flex: 1,
      background: 'rgba(255,255,255,0.10)',
      border: '1px solid rgba(255,255,255,0.18)',
      boxShadow: 'none'
    }
  }), /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "12yr",
    label: "Coaching",
    style: {
      flex: 1,
      background: 'rgba(255,255,255,0.10)',
      border: '1px solid rgba(255,255,255,0.18)',
      boxShadow: 'none'
    }
  }))));
}
window.Hero = Hero;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/Hero.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/ProgramsSection.jsx
try { (() => {
/* Programs grid — marketing site */
function ProgramsSection() {
  const {
    Card,
    Badge,
    Tag
  } = window.JiadHilalDesignSystem_e787fe;
  const programs = [{
    name: 'Hypertrophy',
    tag: 'Build muscle',
    wk: '12 weeks',
    lv: '4 days / week',
    icon: 'dumbbell',
    featured: true
  }, {
    name: 'Strength',
    tag: 'Get stronger',
    wk: '8 weeks',
    lv: '3 days / week',
    icon: 'trending-up'
  }, {
    name: 'Shred',
    tag: 'Lose fat',
    wk: '10 weeks',
    lv: '5 days / week',
    icon: 'flame'
  }];
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-page)',
      padding: '88px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--purple-500)'
    }
  }, "Choose your path"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 'clamp(2rem,4vw,3rem)',
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      margin: '10px 0 0',
      color: 'var(--text-primary)'
    }
  }, "Programs that fit your goal"), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(3, 1fr)',
      gap: 20,
      marginTop: 40
    }
  }, programs.map((p, i) => /*#__PURE__*/React.createElement(Card, {
    key: i,
    variant: p.featured ? 'brand' : 'surface',
    interactive: true,
    padding: "26px"
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-start'
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: p.icon,
    size: 30,
    color: p.featured ? 'rgba(255,255,255,0.9)' : 'var(--purple-500)'
  }), p.featured && /*#__PURE__*/React.createElement(Badge, {
    tone: "green",
    variant: "solid"
  }, "Most popular")), /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 13,
      fontWeight: 700,
      marginTop: 18,
      color: p.featured ? 'rgba(255,255,255,0.85)' : 'var(--text-muted)'
    }
  }, p.tag), /*#__PURE__*/React.createElement("div", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 30,
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      marginTop: 2,
      color: p.featured ? '#fff' : 'var(--text-primary)'
    }
  }, p.name), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      gap: 18,
      marginTop: 16,
      fontSize: 13.5,
      fontWeight: 600,
      color: p.featured ? 'rgba(255,255,255,0.85)' : 'var(--text-secondary)'
    }
  }, /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "calendar",
    size: 15,
    color: "currentColor"
  }), p.wk), /*#__PURE__*/React.createElement("span", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 6
    }
  }, /*#__PURE__*/React.createElement(Icon, {
    name: "repeat",
    size: 15,
    color: "currentColor"
  }), p.lv)))))));
}
window.ProgramsSection = ProgramsSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/ProgramsSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/ResultsSection.jsx
try { (() => {
/* Results / testimonial — marketing site (dark) */
function ResultsSection() {
  const {
    StatTile,
    Avatar,
    Card
  } = window.JiadHilalDesignSystem_e787fe;
  return /*#__PURE__*/React.createElement("section", {
    style: {
      background: 'var(--surface-dark)',
      color: '#fff',
      padding: '88px 32px'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
      flexWrap: 'wrap',
      gap: 20
    }
  }, /*#__PURE__*/React.createElement("div", null, /*#__PURE__*/React.createElement("div", {
    style: {
      fontSize: 12,
      fontWeight: 800,
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      color: 'var(--purple-300)'
    }
  }, "The receipts"), /*#__PURE__*/React.createElement("h2", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 'clamp(2rem,4vw,3rem)',
      textTransform: 'uppercase',
      letterSpacing: '-0.02em',
      margin: '10px 0 0'
    }
  }, "Results, not hype"))), /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gap: 16,
      marginTop: 40
    }
  }, /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "500+",
    label: "Clients coached",
    delta: "Since 2014",
    deltaTone: "neutral"
  }), /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "92%",
    label: "Stick past 12 wks",
    delta: "+industry avg"
  }), /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "18k",
    unit: "lb",
    label: "Avg PR added",
    delta: "per client / yr",
    deltaTone: "neutral"
  }), /*#__PURE__*/React.createElement(StatTile, {
    dark: true,
    value: "4.9",
    label: "App store rating",
    delta: "2.1k reviews",
    deltaTone: "neutral"
  })), /*#__PURE__*/React.createElement(Card, {
    variant: "dark",
    padding: "32px",
    style: {
      marginTop: 24,
      display: 'flex',
      gap: 24,
      alignItems: 'center',
      flexWrap: 'wrap'
    }
  }, /*#__PURE__*/React.createElement(Avatar, {
    name: "Maya Chen",
    size: 64,
    ring: true
  }), /*#__PURE__*/React.createElement("div", {
    style: {
      flex: 1,
      minWidth: 280
    }
  }, /*#__PURE__*/React.createElement("p", {
    style: {
      fontFamily: 'var(--font-sans)',
      fontSize: 22,
      fontWeight: 600,
      lineHeight: 1.4,
      margin: 0
    }
  }, "\"Jiad didn't just hand me a program \u2014 he changed how I think about training. Down 22 lbs, benching more than ever, and I actually look forward to the gym now.\""), /*#__PURE__*/React.createElement("div", {
    style: {
      marginTop: 16,
      fontSize: 14,
      color: 'var(--gray-400)',
      fontWeight: 600
    }
  }, "Maya Chen \xB7 6 months coaching")))));
}
window.ResultsSection = ResultsSection;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/ResultsSection.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/SiteHeader.jsx
try { (() => {
/* Sticky glass site header — marketing site */
function SiteHeader() {
  const {
    Button
  } = window.JiadHilalDesignSystem_e787fe;
  const links = ['Programs', 'Coaching', 'Results', 'About'];
  return /*#__PURE__*/React.createElement("header", {
    style: {
      position: 'sticky',
      top: 0,
      zIndex: 50,
      background: 'rgba(20,17,24,0.72)',
      backdropFilter: 'var(--blur-glass)',
      WebkitBackdropFilter: 'var(--blur-glass)',
      borderBottom: '1px solid rgba(255,255,255,0.08)'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      maxWidth: 1200,
      margin: '0 auto',
      padding: '14px 32px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between'
    }
  }, /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 12
    }
  }, /*#__PURE__*/React.createElement("img", {
    src: "../../assets/logo-mark-white.png",
    alt: "Jiad Hilal",
    style: {
      height: 30
    }
  }), /*#__PURE__*/React.createElement("span", {
    style: {
      fontFamily: 'var(--font-display)',
      fontStyle: 'italic',
      fontWeight: 900,
      fontSize: 18,
      color: '#fff',
      textTransform: 'uppercase',
      letterSpacing: '0.02em'
    }
  }, "Jiad Hilal")), /*#__PURE__*/React.createElement("nav", {
    style: {
      display: 'flex',
      alignItems: 'center',
      gap: 34
    }
  }, links.map(l => /*#__PURE__*/React.createElement("a", {
    key: l,
    href: "#",
    style: {
      color: 'rgba(255,255,255,0.78)',
      textDecoration: 'none',
      fontSize: 14.5,
      fontWeight: 600
    }
  }, l))), /*#__PURE__*/React.createElement(Button, {
    variant: "primary",
    size: "sm"
  }, "Start your plan")));
}
window.SiteHeader = SiteHeader;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/SiteHeader.jsx", error: String((e && e.message) || e) }); }

// ui_kits/marketing-site/icon-helper.jsx
try { (() => {
/* Shared Lucide icon helper for the marketing-site UI kit. */
function Icon({
  name,
  size = 22,
  color = 'currentColor',
  strokeWidth = 2,
  style = {}
}) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current && window.lucide && window.lucide.icons) {
      const pascal = name.split('-').map(s => s[0].toUpperCase() + s.slice(1)).join('');
      const node = window.lucide.icons[pascal];
      if (node) {
        ref.current.innerHTML = '';
        const svg = window.lucide.createElement(node);
        svg.setAttribute('width', size);
        svg.setAttribute('height', size);
        svg.setAttribute('stroke', color);
        svg.setAttribute('stroke-width', strokeWidth);
        ref.current.appendChild(svg);
      }
    }
  }, [name, size, color, strokeWidth]);
  return /*#__PURE__*/React.createElement("span", {
    ref: ref,
    style: {
      display: 'inline-flex',
      width: size,
      height: size,
      ...style
    }
  });
}
window.Icon = Icon;
})(); } catch (e) { __ds_ns.__errors.push({ path: "ui_kits/marketing-site/icon-helper.jsx", error: String((e && e.message) || e) }); }

__ds_ns.Avatar = __ds_scope.Avatar;

__ds_ns.StatTile = __ds_scope.StatTile;

__ds_ns.Badge = __ds_scope.Badge;

__ds_ns.ProgressBar = __ds_scope.ProgressBar;

__ds_ns.ProgressRing = __ds_scope.ProgressRing;

__ds_ns.Tag = __ds_scope.Tag;

__ds_ns.Button = __ds_scope.Button;

__ds_ns.Checkbox = __ds_scope.Checkbox;

__ds_ns.IconButton = __ds_scope.IconButton;

__ds_ns.Input = __ds_scope.Input;

__ds_ns.Select = __ds_scope.Select;

__ds_ns.Switch = __ds_scope.Switch;

__ds_ns.Card = __ds_scope.Card;

__ds_ns.Tabs = __ds_scope.Tabs;

})();
