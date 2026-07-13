/* Shared Lucide icon helper for the marketing-site UI kit. */
function Icon({ name, size = 22, color = 'currentColor', strokeWidth = 2, style = {} }) {
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
  return <span ref={ref} style={{ display: 'inline-flex', width: size, height: size, ...style }} />;
}
window.Icon = Icon;
