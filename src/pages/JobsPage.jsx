import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { StatusBadge, Stars } from '../components/UI';
import { MOCK_JOBS, formatMoney, timeAgo } from '../data';

const TABS = [
  { key: 'all', label: 'All' },
  { key: 'accepted', label: 'To share' },
  { key: 'pending', label: 'In review' },
  { key: 'approved', label: 'Paid' },
  { key: 'rejected', label: 'Rejected' },
];

export default function JobsPage() {
  const [activeTab, setActiveTab] = useState('all');
  const jobs = MOCK_JOBS;

  const earned = jobs.filter(j => j.status === 'approved').reduce((a, j) => a + j.campaign.perShareCents, 0);
  const toShare = jobs.filter(j => j.status === 'accepted').length;
  const inReview = jobs.filter(j => j.status === 'pending').length;

  const filtered = activeTab === 'all' ? jobs : jobs.filter(j => j.status === activeTab);

  const stats = [
    { label: 'Total earned', value: formatMoney(earned), color: 'var(--color-volt)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg> },
    { label: 'Slots to share', value: String(toShare), color: '#7dd3fc', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/></svg> },
    { label: 'In review', value: String(inReview), color: '#fbbf24', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="20" height="20"><path d="M12 22a2 2 0 002-2H10a2 2 0 002 2zm6-6V11a6 6 0 10-12 0v5l-1.293 1.293A1 1 0 006 18h12a1 1 0 00.707-1.707L18 16z"/></svg> },
  ];

  return (
    <AppShell>
      <p className="page-label">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
          <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
        </svg>
        Sharer gigs
      </p>
      <h1 className="page-h1">Your shares & payouts</h1>

      {/* Stats */}
      <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(3,1fr)' }}>
        {stats.map(s => (
          <div key={s.label} className="stat-card panel">
            <span style={{ color: s.color }}>{s.icon}</span>
            <p className="stat-val">{s.value}</p>
            <p className="stat-lbl">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="tab-row">
        {TABS.map(t => {
          const count = t.key === 'all' ? jobs.length : jobs.filter(j => j.status === t.key).length;
          return (
            <button key={t.key} className={`tab-btn${activeTab === t.key ? ' active' : ''}`} onClick={() => setActiveTab(t.key)}>
              {t.label} <span className="tab-count">{count}</span>
            </button>
          );
        })}
      </div>

      {/* List */}
      <div style={{ marginTop: '1.25rem' }}>
        {filtered.length === 0 ? (
          <div className="panel empty-state">
            <span className="empty-icon">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
                <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
              </svg>
            </span>
            <h3 className="empty-title">No gigs here yet</h3>
            <p className="empty-sub">Head to the feed and reserve a slot — your first payout is one share away.</p>
            <Link to="/feed" className="btn-volt">
              Browse campaigns <svg className="icon-sm" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </Link>
          </div>
        ) : (
          filtered.map(j => {
            const amtColor = j.status === 'approved' ? 'var(--color-volt)' : 'inherit';
            const sign = j.status === 'approved' ? '+' : '';
            return (
              <Link key={j.id} to={`/campaign/${j.campaign.id}`} className="list-item">
                <img src={j.campaign.imageUrl} alt="" className="list-item-img" />
                <div className="list-item-body">
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.375rem', marginBottom: '0.25rem' }}>
                    <StatusBadge status={j.status} />
                    {j.status === 'approved' && j.rating && <Stars rating={j.rating} />}
                  </div>
                  <p className="list-item-title">{j.campaign.title}</p>
                  <p className="list-item-sub">
                    by {j.campaign.creatorName} · {j.status === 'approved' ? 'paid ' + timeAgo(j.reviewedAt) : 'claimed ' + timeAgo(j.createdAt)}
                  </p>
                  {j.rejectReason && (
                    <p style={{ fontSize: '0.75rem', fontStyle: 'italic', color: 'rgba(251,113,133,0.8)', marginTop: '0.25rem' }}>"{j.rejectReason}"</p>
                  )}
                </div>
                <div className="list-item-right">
                  <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 800, color: amtColor }}>
                    {sign}{formatMoney(j.campaign.perShareCents)}
                  </p>
                  <p style={{ fontSize: '0.6875rem', fontFamily: 'var(--font-display)', fontWeight: 700, color: 'var(--color-mute)', marginTop: '0.25rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                    {j.status === 'accepted' ? 'Submit proof' : 'Open'}
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="12" height="12"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                  </p>
                </div>
              </Link>
            );
          })
        )}
      </div>
    </AppShell>
  );
}
