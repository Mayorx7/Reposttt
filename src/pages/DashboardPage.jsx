import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { StatusBadge, PlatformRow, ProgressBar } from '../components/UI';
import { MOCK_DASH_CAMPAIGNS, MOCK_TRANSACTIONS, formatMoney, timeLeft } from '../data';

export default function DashboardPage() {
  const campaigns = MOCK_DASH_CAMPAIGNS;
  const totalSpent = MOCK_TRANSACTIONS.filter(t => t.type === 'escrow').reduce((a, t) => a + Math.abs(t.amountCents), 0);
  const activeCount = campaigns.filter(c => c.status === 'active' && c.usedSlots < c.totalShares).length;
  const totalVerified = campaigns.reduce((a, c) => a + c.approvedCount, 0);
  const pendingTotal = campaigns.reduce((a, c) => a + c.pendingCount, 0);

  const stats = [
    { label: 'Total invested', value: formatMoney(totalSpent), color: 'var(--color-brand)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
    { label: 'Live campaigns', value: String(activeCount), color: 'var(--color-volt)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/></svg> },
    { label: 'Verified shares', value: String(totalVerified), color: '#7dd3fc', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg> },
    { label: 'Unique sharers', value: '12', color: '#e879f9', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z"/></svg> },
  ];

  return (
    <AppShell>
      {/* Header row */}
      <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'flex-end', justifyContent: 'space-between', gap: '1rem' }}>
        <div>
          <p className="page-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/>
              <rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/>
            </svg>
            Creator Studio
          </p>
          <h1 className="page-h1">Your campaigns</h1>
        </div>
        <Link to="/campaign-new" className="btn-volt">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" width="16" height="16"><path d="M12 5v14M5 12h14"/></svg>
          New campaign
        </Link>
      </div>

      {/* Stats */}
      <div className="stat-grid">
        {stats.map(s => (
          <div key={s.label} className="stat-card panel">
            <span style={{ color: s.color }}>{s.icon}</span>
            <p className="stat-val">{s.value}</p>
            <p className="stat-lbl">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Pending alert */}
      {pendingTotal > 0 && (
        <a href="#campaigns" className="alert-banner">
          <span className="alert-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20">
              <path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-1.293 1.293A1 1 0 006 18h12a1 1 0 00.707-1.707L18 16z"/>
            </svg>
          </span>
          <div style={{ flex: 1 }}>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.875rem', fontWeight: 700, color: '#fef3c7' }}>
              {pendingTotal} proof{pendingTotal > 1 ? 's' : ''} waiting for your review
            </p>
            <p style={{ fontSize: '0.75rem', color: 'var(--color-mute)' }}>Approve shares to release payment to sharers.</p>
          </div>
          <svg viewBox="0 0 24 24" fill="none" stroke="#fbbf24" strokeWidth="2.5" width="16" height="16">
            <path d="M5 12h14M12 5l7 7-7 7"/>
          </svg>
        </a>
      )}

      {/* Campaign list */}
      <div id="campaigns" style={{ marginTop: '2rem' }}>
        {campaigns.length === 0 ? (
          <div className="panel noise empty-state" style={{ position: 'relative', overflow: 'hidden' }}>
            <div style={{ position: 'absolute', top: '-6rem', left: '50%', transform: 'translateX(-50%)', width: '24rem', height: '12rem', borderRadius: '50%', background: 'rgba(139,92,246,0.2)', filter: 'blur(3rem)', pointerEvents: 'none' }} />
            <span className="empty-icon" style={{ background: 'rgba(205,240,75,0.1)', boxShadow: '0 0 0 1px rgba(205,240,75,0.3)', color: 'var(--color-volt)' }}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                <path d="M12 2a10 10 0 110 20 10 10 0 010-20z"/><path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3"/><path d="M12 17h.01"/>
              </svg>
            </span>
            <h3 className="empty-title">No campaigns yet</h3>
            <p className="empty-sub">Launch your first campaign and reach hundreds of student feeds in the next hour.</p>
            <Link to="/campaign-new" className="btn-volt">
              Create a campaign <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        ) : (
          campaigns.map(c => {
            const pct = Math.min(100, Math.round((c.usedSlots / c.totalShares) * 100));
            return (
              <Link key={c.id} to={`/campaign/${c.id}`} className="dash-campaign">
                <img src={c.imageUrl} alt="" className="dash-campaign-img" />
                <div className="dash-campaign-body">
                  <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '0.5rem' }}>
                    <StatusBadge status={c.status} />
                    <PlatformRow platforms={c.platforms} size="sm" />
                    {c.pendingCount > 0 && <span className="pending-tag">{c.pendingCount} to review</span>}
                  </div>
                  <h3 style={{ marginTop: '0.375rem', fontFamily: 'var(--font-display)', fontSize: '0.9375rem', fontWeight: 700, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{c.title}</h3>
                  <div style={{ marginTop: '0.5rem', maxWidth: '28rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-mute)', marginBottom: '0.25rem' }}>
                      <span><span style={{ color: 'var(--color-volt)' }}>{c.usedSlots}</span>/{c.totalShares} slots · {c.approvedCount} paid</span>
                      <span>{timeLeft(c.deadline)}</span>
                    </div>
                    <ProgressBar value={pct} />
                  </div>
                </div>
                <div className="dash-campaign-right">
                  <div style={{ textAlign: 'right' }}>
                    <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 800, color: 'var(--color-volt)' }}>{formatMoney(c.perShareCents)}</p>
                    <p style={{ fontSize: '0.625rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-mute)' }}>per share</p>
                  </div>
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontFamily: 'var(--font-display)', fontSize: '0.75rem', fontWeight: 700, color: 'var(--color-mute)' }}>
                    Manage <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </span>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </AppShell>
  );
}
