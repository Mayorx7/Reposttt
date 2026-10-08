import { PLATFORMS } from '../data';

/* SVG icons for each platform */
const PLATFORM_SVGS = {
  whatsapp: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M12 2a9.96 9.96 0 0 0-8.6 15.05L2 22l5.08-1.33A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.17 15.28l-.3-.18-2.97.78.79-2.89-.2-.3A8.2 8.2 0 0 1 12 3.8Z"/>
    </svg>
  ),
  instagram: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-2.28 2.28c-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-2.28-2.28c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.6a5.9 5.9 0 0 0-2.13 1.4A5.9 5.9 0 0 0 .6 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.53 2.91.28.8.65 1.5 1.4 2.13.75.76 1.33 1.12 2.13 1.4.76.27 1.64.47 2.91.53C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.53a5.9 5.9 0 0 0 2.13-1.4 5.9 5.9 0 0 0 1.4-2.13c.27-.76.47-1.64.53-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.53-2.91a5.9 5.9 0 0 0-1.4-2.13A5.9 5.9 0 0 0 19.86.6C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"/>
    </svg>
  ),
  tiktok: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M21 8.5a7.09 7.09 0 0 1-4.2-1.4v7.87a6.26 6.26 0 1 1-6.26-6.26c.24 0 .47.01.7.05v3.16a3.15 3.15 0 1 0 2.42 3.05V1.5h3.14A7.1 7.1 0 0 0 21 5.36Z"/>
    </svg>
  ),
  x: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.6l5.24 6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3Z"/>
    </svg>
  ),
  facebook: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z"/>
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/>
    </svg>
  ),
};

export function PlatformRow({ platforms, size = '' }) {
  return (
    <div className="platform-row">
      {platforms.map(p => {
        const def = PLATFORMS[p];
        if (!def) return null;
        return (
          <span
            key={p}
            className={`platform-chip${size ? ' ' + size : ''}`}
            style={{ background: def.bg, color: def.text }}
            title={def.label}
          >
            {PLATFORM_SVGS[p]}
          </span>
        );
      })}
    </div>
  );
}

export function ProgressBar({ value }) {
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="progress-bar">
      <div className="progress-fill" style={{ width: `${pct}%` }} />
    </div>
  );
}

export function StatusBadge({ status }) {
  const map = {
    active: 'Active', paused: 'Paused', closed: 'Closed',
    pending: 'In review', approved: 'Paid', accepted: 'To share', rejected: 'Rejected',
  };
  return <span className={`status-badge status-${status}`}>{map[status] || status}</span>;
}

export function Avatar({ name, color, size = '' }) {
  const inits = name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
  return (
    <span className={`avatar${size ? ' avatar-' + size : ''}`} style={{ background: color }}>
      {inits}
    </span>
  );
}

export function Stars({ rating }) {
  return (
    <div className="stars">
      {[1, 2, 3, 4, 5].map(i => (
        <svg
          key={i}
          className={`star-icon ${i <= Math.round(rating) ? 'star-filled' : 'star-empty'}`}
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
      ))}
    </div>
  );
}

export function RepostIcon({ width = 20, height = 20 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.75" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" width={width} height={height}>
      <path d="M17 1l4 4-4 4"/>
      <path d="M3 11V9a4 4 0 014-4h14"/>
      <path d="M7 23l-4-4 4-4"/>
      <path d="M21 13v2a4 4 0 01-4 4H3"/>
    </svg>
  );
}

export function ArrowIcon({ width = 14, height = 14 }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width={width} height={height}>
      <path d="M5 12h14M12 5l7 7-7 7"/>
    </svg>
  );
}

export function PlatformCheckbox({ platform, selected, onChange }) {
  const def = PLATFORMS[platform];
  return (
    <label
      className={`platform-chk-wrap${selected ? ' selected' : ''}`}
      onClick={() => onChange(platform)}
      style={{ cursor: 'pointer' }}
    >
      <span style={{ color: def.text }}>{PLATFORM_SVGS[platform]}</span>
      {def.label}
    </label>
  );
}
