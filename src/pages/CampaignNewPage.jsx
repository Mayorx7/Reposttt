import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { MOCK_USER, PLATFORMS } from '../data';

const PLATFORM_SVGS = {
  whatsapp: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2a9.96 9.96 0 0 0-8.6 15.05L2 22l5.08-1.33A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.17 15.28l-.3-.18-2.97.78.79-2.89-.2-.3A8.2 8.2 0 0 1 12 3.8Z"/></svg>,
  instagram: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-2.28 2.28c-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-2.28-2.28c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Z"/></svg>,
  tiktok: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21 8.5a7.09 7.09 0 0 1-4.2-1.4v7.87a6.26 6.26 0 1 1-6.26-6.26c.24 0 .47.01.7.05v3.16a3.15 3.15 0 1 0 2.42 3.05V1.5h3.14A7.1 7.1 0 0 0 21 5.36Z"/></svg>,
  x: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.6l5.24 6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3Z"/></svg>,
  facebook: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z"/></svg>,
  linkedin: <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg>,
};

export default function CampaignNewPage() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('');
  const [deadline, setDeadline] = useState('');
  const [caption, setCaption] = useState('');
  const [slots, setSlots] = useState('');
  const [cpa, setCpa] = useState('');
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [platformErr, setPlatformErr] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const bal = MOCK_USER.balanceCents / 100;
  const slotsNum = parseInt(slots, 10) || 0;
  const cpaNum = parseFloat(cpa) || 0;
  const sub = slotsNum * cpaNum;
  const fee = sub * 0.1;
  const total = sub + fee;
  const insufficient = total > 0 && total > bal;

  const togglePlatform = (key) => {
    setSelectedPlatforms(prev =>
      prev.includes(key) ? prev.filter(p => p !== key) : [...prev, key]
    );
    setPlatformErr(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedPlatforms.length === 0) { setPlatformErr(true); return; }
    setSubmitting(true);
    setTimeout(() => navigate('/dashboard'), 2300);
  };

  return (
    <AppShell>
      <div style={{ paddingTop: 0 }}>
        <Link to="/dashboard" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginTop: '1rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '99px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Cancel
        </Link>

        <div style={{ marginTop: '1.5rem', marginBottom: '2rem' }}>
          <h1 className="page-h1">Launch a Campaign</h1>
          <p style={{ color: 'var(--color-mute)', marginTop: '0.375rem' }}>Set your budget, define your brief, and fund escrow.</p>
        </div>

        <form onSubmit={handleSubmit} noValidate>
          <div style={{ display: 'grid', gap: '1.5rem', gridTemplateColumns: '1fr', alignItems: 'start' }} className="layout-desktop">

            {/* Left: form cards */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>

              {/* Basics */}
              <div className="form-card">
                <h2 className="section-title" style={{ marginTop: 0, marginBottom: '1.25rem' }}>1. Campaign Basics</h2>
                <div className="form-grid">
                  <div className="form-row" style={{ gridColumn: '1/-1' }}>
                    <label className="form-label" htmlFor="title">Campaign Title</label>
                    <input type="text" id="title" className="input-base" placeholder="e.g. Neon Riot Freshers Party"
                      value={title} onChange={e => setTitle(e.target.value)} required />
                  </div>
                  <div className="form-row">
                    <label className="form-label" htmlFor="category">Category</label>
                    <select id="category" className="input-base" value={category} onChange={e => setCategory(e.target.value)} required>
                      <option value="">Select one...</option>
                      {['Event','Product','Music','Food','Fashion','Service'].map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div className="form-row">
                    <label className="form-label" htmlFor="deadline">End Date</label>
                    <input type="date" id="deadline" className="input-base" value={deadline} onChange={e => setDeadline(e.target.value)} required />
                  </div>
                </div>
              </div>

              {/* Creative */}
              <div className="form-card">
                <h2 className="section-title" style={{ marginTop: 0, marginBottom: '1.25rem' }}>2. Creative Asset & Caption</h2>
                <div className="form-row" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">Promotional Image</label>
                  <div style={{ border: '2px dashed var(--color-edge)', borderRadius: '1rem', padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-mute)" strokeWidth="2" width="24" height="24" style={{ margin: '0 auto' }}>
                      <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21 15 16 10 5 21"/>
                    </svg>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-mute)', marginTop: '0.5rem' }}>Upload 1080x1920 (9:16) image for best results on stories.</p>
                  </div>
                </div>
                <div className="form-row">
                  <label className="form-label" htmlFor="caption">Required Caption</label>
                  <p style={{ fontSize: '0.75rem', color: 'var(--color-mute)', marginBottom: '0.25rem' }}>Sharers must include this text exactly.</p>
                  <textarea id="caption" className="input-base" rows={3} placeholder="🔥 Biggest rave of the year! Grab your tickets via link in bio."
                    value={caption} onChange={e => setCaption(e.target.value)} required />
                </div>
              </div>

              {/* Distribution */}
              <div className="form-card">
                <h2 className="section-title" style={{ marginTop: 0, marginBottom: '1.25rem' }}>3. Distribution & Budget</h2>
                <div className="form-row" style={{ marginBottom: '1.25rem' }}>
                  <label className="form-label">Target Platforms</label>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(120px, 1fr))', gap: '0.75rem', marginTop: '0.375rem' }}>
                    {Object.entries(PLATFORMS).map(([key, p]) => (
                      <label key={key}
                        className={`platform-chk-wrap${selectedPlatforms.includes(key) ? ' selected' : ''}`}
                        onClick={() => togglePlatform(key)}
                        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem', border: '1px solid var(--color-edge)', background: selectedPlatforms.includes(key) ? 'rgba(205,240,75,0.08)' : 'rgba(255,255,255,0.03)', padding: '0.75rem', borderRadius: '1rem', cursor: 'pointer', transition: 'all 0.2s', fontFamily: 'var(--font-display)', fontSize: '0.8125rem', fontWeight: 600, color: selectedPlatforms.includes(key) ? 'var(--color-volt)' : 'var(--color-mute)', borderColor: selectedPlatforms.includes(key) ? 'rgba(205,240,75,0.6)' : 'var(--color-edge)' }}>
                        <span style={{ color: p.text }}>{PLATFORM_SVGS[key]}</span>
                        {p.label}
                      </label>
                    ))}
                  </div>
                  {platformErr && <span className="form-error visible" style={{ marginTop: '0.5rem' }}>Select at least one platform.</span>}
                </div>
                <div className="form-grid">
                  <div className="form-row">
                    <label className="form-label" htmlFor="slots">Total Shares Needed</label>
                    <input type="number" id="slots" className="input-base" placeholder="50" min="10"
                      value={slots} onChange={e => setSlots(e.target.value)} required />
                  </div>
                  <div className="form-row">
                    <label className="form-label" htmlFor="cpa">Pay Per Share (&#8358;)</label>
                    <input type="number" id="cpa" className="input-base" placeholder="50" step="5" min="50"
                      value={cpa} onChange={e => setCpa(e.target.value)} required />
                  </div>
                </div>
              </div>
            </div>

            {/* Right: summary */}
            <div style={{ position: 'sticky', top: '5rem', background: 'var(--color-panel-2)', border: '1px solid var(--color-edge)', borderRadius: '1.5rem', padding: '1.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, marginBottom: '1.5rem' }}>Budget Summary</h3>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-mute)', marginBottom: '0.75rem' }}>
                <span>Shares ({slotsNum}) × &#8358;{cpaNum.toFixed(2)}</span>
                <span>&#8358;{sub.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.875rem', color: 'var(--color-mute)', marginBottom: '0.75rem' }}>
                <span>Platform Fee (10%)</span>
                <span>&#8358;{fee.toFixed(2)}</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1rem', marginTop: '0.5rem' }}>
                <span style={{ fontWeight: 600, color: 'var(--color-mist)' }}>Total to Escrow</span>
                <span style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-volt)' }}>&#8358;{total.toFixed(2)}</span>
              </div>
              <p style={{ fontSize: '0.75rem', color: 'var(--color-mute)', marginTop: '1.5rem', lineHeight: 1.6 }}>
                Funds will be held in secure escrow. You only pay for approved, verified shares. Any unused funds are refunded when the campaign ends.
              </p>
              <button type="submit" className="btn-volt" style={{ width: '100%', justifyContent: 'center', marginTop: '1.5rem', height: '3rem' }} disabled={submitting}>
                {submitting ? 'Campaign Launched! ✓' : insufficient ? 'Top up & Launch' : 'Fund & Launch'}
              </button>
              {insufficient && (
                <div style={{ marginTop: '1rem', padding: '0.75rem', borderRadius: '0.75rem', background: 'rgba(251,113,133,0.1)', border: '1px solid rgba(251,113,133,0.3)', fontSize: '0.75rem', color: 'var(--color-blush)' }}>
                  Wallet balance (&#8358;{bal.toFixed(2)}) is insufficient. You will be prompted to top up.
                </div>
              )}
            </div>
          </div>
        </form>
      </div>

      <style>{`
        .form-card { background: linear-gradient(165deg, var(--color-panel) 0%, var(--color-ink-2) 100%); border: 1px solid var(--color-edge); border-radius: 1.5rem; padding: 1.5rem; margin-bottom: 1.25rem; }
        .form-grid { display: grid; gap: 1.25rem; }
        @media (min-width: 768px) { .form-grid { grid-template-columns: 1fr 1fr; } }
        @media (min-width: 1024px) { .layout-desktop { grid-template-columns: 1.5fr 1fr !important; } }
      `}</style>
    </AppShell>
  );
}
