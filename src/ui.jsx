import { useState, useEffect } from 'react';

export const STATUS = {
  done:     { label: 'Cursado',     color: '#6BA876', bg: '#EAF4EC', dot: '#6BA876' },
  progress: { label: 'En progreso', color: '#4A90E2', bg: '#E9F1FB', dot: '#4A90E2' },
  pending:  { label: 'Pendiente',   color: '#8A8A8A', bg: '#F0F0F0', dot: '#C7C7C7' },
};

export function Icon({ name, size = 22, color = '#2C2C2C', strokeWidth = 1.8 }) {
  const p = { fill: 'none', stroke: color, strokeWidth, strokeLinecap: 'round', strokeLinejoin: 'round' };
  const paths = {
    back:     <path d="M15 5l-7 7 7 7" {...p} />,
    search:   <g {...p}><circle cx="11" cy="11" r="7" /><path d="M20 20l-3.5-3.5" /></g>,
    menu:     <g {...p}><path d="M4 7h16M4 12h16M4 17h16" /></g>,
    close:    <path d="M6 6l12 12M18 6L6 18" {...p} />,
    check:    <path d="M5 12.5l4.5 4.5L19 7" {...p} />,
    chevron:  <path d="M9 6l6 6-6 6" {...p} />,
    chevDown: <path d="M6 9l6 6 6-6" {...p} />,
    filter:   <g {...p}><path d="M4 6h16M7 12h10M10 18h4" /></g>,
    book:     <g {...p}><path d="M5 5a2 2 0 012-2h11v15H7a2 2 0 00-2 2z" /><path d="M5 18a2 2 0 002 2h11" /></g>,
    user:     <g {...p}><circle cx="12" cy="8" r="4" /><path d="M5 20a7 7 0 0114 0" /></g>,
    swap:     <g {...p}><path d="M7 4L4 7l3 3" /><path d="M4 7h11a5 5 0 015 5" /><path d="M17 20l3-3-3-3" /><path d="M20 17H9a5 5 0 01-5-5" /></g>,
    bell:     <g {...p}><path d="M6 9a6 6 0 1112 0c0 5 2 6 2 6H4s2-1 2-6z" /><path d="M10 20a2 2 0 004 0" /></g>,
    star:     <path d="M12 4l2.3 4.9 5.2.7-3.8 3.6.9 5.3-4.6-2.6-4.6 2.6.9-5.3L4.5 9.6l5.2-.7z" {...p} />,
    eye:      <g {...p}><path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" /><circle cx="12" cy="12" r="2.6" /></g>,
  };
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" style={{ display: 'block', flexShrink: 0 }}>
      {paths[name]}
    </svg>
  );
}

export function Button({ children, variant = 'primary', onClick, full = true, style: sx = {}, size = 'lg' }) {
  const [press, setPress] = useState(false);
  const base = {
    display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
    width: full ? '100%' : 'auto', height: size === 'lg' ? 56 : 46,
    borderRadius: 14, border: 'none', cursor: 'pointer', boxSizing: 'border-box',
    fontFamily: 'Inter, system-ui', fontWeight: 600, fontSize: 16, letterSpacing: -0.1,
    transition: 'transform .12s ease, filter .12s ease',
    transform: press ? 'scale(0.975)' : 'scale(1)',
    WebkitTapHighlightColor: 'transparent', userSelect: 'none',
  };
  const variants = {
    primary:   { background: 'var(--olive)', color: '#fff', boxShadow: '0 4px 14px rgba(74,124,89,0.28)', filter: press ? 'brightness(0.92)' : 'none' },
    secondary: { background: press ? '#F1F1F1' : 'transparent', color: 'var(--ink)', border: '1.5px solid #E2E2E2' },
    olivesoft: { background: press ? '#DCE9DF' : '#EAF1EC', color: 'var(--olive)' },
    ghost:     { background: press ? '#F1F1F1' : 'transparent', color: 'var(--ink)' },
  };
  return (
    <button
      onClick={onClick}
      onPointerDown={() => setPress(true)}
      onPointerUp={() => setPress(false)}
      onPointerLeave={() => setPress(false)}
      style={{ ...base, ...variants[variant], ...sx }}
    >{children}</button>
  );
}

export function StatusBadge({ status, withDot = true }) {
  const s = STATUS[status] || STATUS.pending;
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 6,
      padding: '4px 10px', borderRadius: 999, background: s.bg,
      fontFamily: 'Inter, system-ui', fontWeight: 600, fontSize: 12.5, color: s.color,
      whiteSpace: 'nowrap', flexShrink: 0,
    }}>
      {withDot && <span style={{ width: 7, height: 7, borderRadius: 99, background: s.dot }} />}
      {s.label}
    </span>
  );
}

export function Toast({ show, children }) {
  return (
    <div style={{
      position: 'absolute', top: 64, left: 0, right: 0,
      display: 'flex', justifyContent: 'center', zIndex: 80, pointerEvents: 'none',
      opacity: show ? 1 : 0, transform: show ? 'translateY(0)' : 'translateY(-12px)',
      transition: 'opacity .35s ease, transform .35s ease',
    }}>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 8,
        padding: '10px 16px', borderRadius: 999,
        background: 'rgba(20,28,22,0.92)', backdropFilter: 'blur(8px)',
        color: '#fff', fontFamily: 'Inter, system-ui', fontWeight: 600, fontSize: 14,
        boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
      }}>
        <span style={{ display: 'inline-flex', width: 18, height: 18, borderRadius: 99, background: 'var(--green)', alignItems: 'center', justifyContent: 'center' }}>
          <Icon name="check" size={13} color="#fff" strokeWidth={2.6} />
        </span>
        {children}
      </div>
    </div>
  );
}

export function Sheet({ open, onClose, children, peek = 0.86 }) {
  const [mounted, setMounted] = useState(open);
  useEffect(() => { if (open) setMounted(true); }, [open]);
  if (!mounted) return null;
  return (
    <div style={{ position: 'absolute', inset: 0, zIndex: 90 }}>
      <div
        onClick={onClose}
        style={{
          position: 'absolute', inset: 0, background: 'rgba(20,24,20,0.4)',
          opacity: open ? 1 : 0, transition: 'opacity .3s ease',
        }}
      />
      <div
        onTransitionEnd={() => { if (!open) setMounted(false); }}
        style={{
          position: 'absolute', left: 0, right: 0, bottom: 0,
          height: `${peek * 100}%`, background: '#fff',
          borderTopLeftRadius: 26, borderTopRightRadius: 26,
          boxShadow: '0 -10px 40px rgba(0,0,0,0.18)',
          transform: open ? 'translateY(0)' : 'translateY(100%)',
          transition: 'transform .36s cubic-bezier(.32,.72,0,1)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'center', padding: '10px 0 4px', flexShrink: 0 }}>
          <div onClick={onClose} style={{ width: 40, height: 5, borderRadius: 99, background: '#DADADA', cursor: 'pointer' }} />
        </div>
        <div style={{ flex: 1, overflowY: 'auto', WebkitOverflowScrolling: 'touch' }}>{children}</div>
      </div>
    </div>
  );
}

export function Ring({ value, size = 46, stroke = 4, color = 'var(--olive)', track = '#ECECEC' }) {
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  return (
    <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} style={{ transform: 'rotate(-90deg)' }}>
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={track} strokeWidth={stroke} />
      <circle cx={size / 2} cy={size / 2} r={r} fill="none" stroke={color} strokeWidth={stroke}
        strokeDasharray={c} strokeDashoffset={c * (1 - value)} strokeLinecap="round"
        style={{ transition: 'stroke-dashoffset .8s cubic-bezier(.4,0,.2,1)' }} />
    </svg>
  );
}

export function PistachioMark({ size = 64, tone = 'olive' }) {
  const fill = tone === 'olive' ? 'var(--olive)' : '#fff';
  const ink = tone === 'olive' ? '#fff' : 'var(--olive)';
  return (
    <div style={{
      width: size, height: size, borderRadius: size * 0.32,
      background: fill, display: 'flex', alignItems: 'center', justifyContent: 'center',
      boxShadow: tone === 'olive' ? '0 8px 22px rgba(74,124,89,0.32)' : '0 6px 18px rgba(0,0,0,0.06)',
      flexShrink: 0,
    }}>
      <span style={{
        fontFamily: '"Instrument Serif", Georgia, serif',
        fontSize: size * 0.62, color: ink, lineHeight: 1, marginTop: size * 0.04,
      }}>P</span>
    </div>
  );
}

export function Wordmark({ size = 15 }) {
  return (
    <span style={{
      fontFamily: 'Inter, system-ui', fontWeight: 700, fontSize: size,
      letterSpacing: 3, textTransform: 'uppercase', color: 'var(--ink)',
    }}>Pistachio</span>
  );
}
