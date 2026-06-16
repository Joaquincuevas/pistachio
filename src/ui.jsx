import { useEffect } from 'react';

export function Icon({ name, size = 20, color = 'currentColor', strokeWidth = 1.8, style }) {
  const p = { fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    grid:     <g {...p}><rect x="3" y="3" width="7" height="7" rx="1.5" /><rect x="14" y="3" width="7" height="7" rx="1.5" /><rect x="3" y="14" width="7" height="7" rx="1.5" /><rect x="14" y="14" width="7" height="7" rx="1.5" /></g>,
    chart:    <g {...p}><path d="M4 20V10M10 20V4M16 20v-7M22 20H2" /></g>,
    search:   <g {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></g>,
    user:     <g {...p}><circle cx="12" cy="8" r="4" /><path d="M5 20a7 7 0 0114 0" /></g>,
    back:     <path d="M15 5l-7 7 7 7" {...p} />,
    close:    <path d="M6 6l12 12M18 6L6 18" {...p} />,
    check:    <path d="M5 12.5l4.5 4.5L19 7" {...p} />,
    chevron:  <path d="M9 6l6 6-6 6" {...p} />,
    chevDown: <path d="M6 9l6 6 6-6" {...p} />,
    book:     <g {...p}><path d="M5 5a2 2 0 012-2h11v15H7a2 2 0 00-2 2z" /><path d="M5 18a2 2 0 002 2h11" /></g>,
    swap:     <g {...p}><path d="M7 4L4 7l3 3" /><path d="M4 7h11a5 5 0 015 5" /><path d="M17 20l3-3-3-3" /><path d="M20 17H9a5 5 0 01-5-5" /></g>,
    logout:   <g {...p}><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4" /><path d="M16 17l5-5-5-5" /><path d="M21 12H9" /></g>,
    eye:      <g {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="2.6" /></g>,
    mail:     <g {...p}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></g>,
    lock:     <g {...p}><rect x="4" y="11" width="16" height="9" rx="2" /><path d="M8 11V7a4 4 0 018 0v4" /></g>,
    filter:   <g {...p}><path d="M4 6h16M7 12h10M10 18h4" /></g>,
    layers:   <g {...p}><path d="M12 2l9 5-9 5-9-5 9-5z" /><path d="M3 12l9 5 9-5" /><path d="M3 17l9 5 9-5" /></g>,
    award:    <g {...p}><circle cx="12" cy="8" r="6" /><path d="M9 13.5L8 22l4-2 4 2-1-8.5" /></g>,
    clock:    <g {...p}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></g>,
    target:   <g {...p}><circle cx="12" cy="12" r="9" /><circle cx="12" cy="12" r="5" /><circle cx="12" cy="12" r="1" /></g>,
    plus:     <path d="M12 5v14M5 12h14" {...p} />,
    info:     <g {...p}><circle cx="12" cy="12" r="9" /><path d="M12 11v5M12 8h.01" /></g>,
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0, ...style }}>{paths[name]}</svg>;
}

export function Logo({ size = 32, showText = true, light = false }) {
  return (
    <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: size, height: size, borderRadius: size * 0.3,
        background: 'var(--olive)', display: 'flex', alignItems: 'center', justifyContent: 'center',
        boxShadow: '0 4px 12px rgba(74,124,89,0.28)', flexShrink: 0,
      }}>
        <span className="serif" style={{ fontSize: size * 0.62, color: '#fff', lineHeight: 1, marginTop: size * 0.04 }}>P</span>
      </div>
      {showText && (
        <span style={{ fontWeight: 700, fontSize: 16, letterSpacing: 1, color: light ? '#fff' : 'var(--ink)' }}>
          Pistachio
        </span>
      )}
    </div>
  );
}

export function Button({ children, variant = 'primary', size = 'md', onClick, type = 'button', full, disabled, style }) {
  const sizes = {
    sm: { height: 34, padding: '0 12px', fontSize: 13 },
    md: { height: 42, padding: '0 18px', fontSize: 14 },
    lg: { height: 50, padding: '0 24px', fontSize: 15 },
  };
  const variants = {
    primary:   { background: 'var(--olive)', color: '#fff', border: '1px solid var(--olive)' },
    secondary: { background: 'var(--surface)', color: 'var(--ink)', border: '1px solid var(--border-strong)' },
    ghost:     { background: 'transparent', color: 'var(--muted)', border: '1px solid transparent' },
    danger:    { background: 'var(--red-bg)', color: 'var(--red)', border: '1px solid transparent' },
  };
  return (
    <button
      type={type} onClick={onClick} disabled={disabled}
      style={{
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        width: full ? '100%' : 'auto', borderRadius: 'var(--r-md)', fontWeight: 600,
        transition: 'filter .15s, transform .1s, background .15s', whiteSpace: 'nowrap',
        opacity: disabled ? 0.5 : 1, cursor: disabled ? 'not-allowed' : 'pointer',
        ...sizes[size], ...variants[variant], ...style,
      }}
      onMouseDown={e => !disabled && (e.currentTarget.style.transform = 'scale(0.98)')}
      onMouseUp={e => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1)')}
      onMouseEnter={e => !disabled && (e.currentTarget.style.filter = 'brightness(0.96)')}
    >
      {children}
    </button>
  );
}

export function StatusPill({ status, meta }) {
  const m = meta[status] || meta.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6, padding: '3px 10px',
      borderRadius: 999, background: m.bg, color: m.color, fontWeight: 600, fontSize: 12,
      whiteSpace: 'nowrap',
    }}>
      <span style={{ width: 6, height: 6, borderRadius: 99, background: m.dot }} />
      {m.label}
    </span>
  );
}

export function Field({ icon, label, error, children }) {
  return (
    <label style={{ display: 'block' }}>
      {label && <span style={{ display: 'block', fontSize: 13, fontWeight: 600, color: 'var(--ink)', marginBottom: 7 }}>{label}</span>}
      <div style={{ position: 'relative' }}>
        {icon && (
          <span style={{ position: 'absolute', left: 13, top: '50%', transform: 'translateY(-50%)', color: 'var(--faint)', pointerEvents: 'none' }}>
            <Icon name={icon} size={18} />
          </span>
        )}
        {children}
      </div>
      {error && <span style={{ display: 'block', fontSize: 12, color: 'var(--red)', marginTop: 6 }}>{error}</span>}
    </label>
  );
}

export function Modal({ open, onClose, children, width = 480 }) {
  useEffect(() => {
    if (!open) return;
    const h = e => e.key === 'Escape' && onClose();
    window.addEventListener('keydown', h);
    return () => window.removeEventListener('keydown', h);
  }, [open, onClose]);
  if (!open) return null;
  return (
    <div onClick={onClose} className="fade-in" style={{
      position: 'fixed', inset: 0, background: 'rgba(20,28,22,0.45)', backdropFilter: 'blur(3px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000, padding: 24,
    }}>
      <div onClick={e => e.stopPropagation()} className="fade-up" style={{
        background: 'var(--surface)', borderRadius: 'var(--r-lg)', boxShadow: 'var(--shadow-lg)',
        width: '100%', maxWidth: width, maxHeight: '88vh', overflow: 'hidden', display: 'flex', flexDirection: 'column',
      }}>
        {children}
      </div>
    </div>
  );
}

export function Card({ children, style, hover, onClick }) {
  return (
    <div onClick={onClick} className={hover ? 'card-hover' : ''} style={{
      background: 'var(--surface)', border: '1px solid var(--border)', borderRadius: 'var(--r-lg)',
      boxShadow: 'var(--shadow-sm)', ...style,
    }}>
      {children}
    </div>
  );
}
