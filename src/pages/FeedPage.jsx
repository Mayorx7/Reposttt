import { useState } from 'react';
import { Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { PlatformRow, ProgressBar, StatusBadge } from '../components/UI';
import { MOCK_CAMPAIGNS, MOCK_USER, CATEGORIES, formatMoney } from '../data';

export default function FeedPage() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = MOCK_CAMPAIGNS.filter(c => {
    if (activeCategory !== 'All' && c.category !== activeCategory) return false;
    const q = search.toLowerCase();
    if (q && !c.title.toLowerCase().includes(q) && !c.category.toLowerCase().includes(q)) return false;
    return true;
  });

  return (
    <AppShell>
      {/* Greeting */}
      <div style={{ marginBottom: '1.5rem' }}>
        <p className="page-label">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
            <path d="M4 11a9 9 0 019-9"/><path d="M4 4a16 16 0 0116 16"/><circle cx="5" cy="19" r="1"/>
          </svg>
          Discover
        </p>
        <h1 className="page-h1">Hey, <span className="text-volt">{MOCK_USER.name.split(' ')[0]}</span> — pick a campaign</h1>
      </div>

      {/* Stats strip */}
      <div style={{ display: 'flex', gap: '0.875rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
        <div className="panel" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.25rem', flex: 1, minWidth: '150px' }}>
          <span style={{ color: 'var(--color-volt)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
            </svg>
          </span>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 800 }}>{formatMoney(MOCK_USER.balanceCents)}</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-mute)' }}>Wallet balance</p>
          </div>
        </div>
        <div className="panel" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', padding: '0.875rem 1.25rem', flex: 1, minWidth: '150px' }}>
          <span style={{ color: 'var(--color-brand)' }}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
              <polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/>
            </svg>
          </span>
          <div>
            <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 800 }}>{MOCK_USER.sharesCompleted}</p>
            <p style={{ fontSize: '0.7rem', color: 'var(--color-mute)' }}>Shares completed</p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="feed-meta">
        {CATEGORIES.map(cat => (
          <button
            key={cat}
            className={`feed-filter-btn${activeCategory === cat ? ' active' : ''}`}
            onClick={() => setActiveCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Search */}
      <div style={{ marginTop: '1rem', position: 'relative' }}>
        <input
          type="search"
          className="input-base"
          placeholder="Search campaigns…"
          style={{ paddingLeft: '2.75rem' }}
          value={search}
          onChange={e => setSearch(e.target.value)}
        />
        <svg style={{ position: 'absolute', left: '0.875rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-mute)' }}
          viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16">
          <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
        </svg>
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="panel empty-state" style={{ gridColumn: '1/-1', marginTop: '2rem' }}>
          <span className="empty-icon">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="28" height="28">
              <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
            </svg>
          </span>
          <h3 className="empty-title">No campaigns found</h3>
          <p className="empty-sub">Try a different search or filter.</p>
        </div>
      ) : (
        <div className="feed-grid" style={{ marginTop: '1.25rem' }}>
          {filtered.map(c => {
            const pct = Math.round((c.usedSlots / c.totalShares) * 100);
            return (
              <Link key={c.id} to={`/campaign/${c.id}`} className="feed-card">
                <div className="feed-card-img">
                  <img src={c.imageUrl} alt="" />
                  <div className="feed-card-overlay" />
                  <span className="campaign-cat">{c.category}</span>
                  <span className="campaign-price">{formatMoney(c.perShareCents)}</span>
                </div>
                <div className="campaign-body">
                  <p className="campaign-title">{c.title}</p>
                  <div className="campaign-meta">
                    <PlatformRow platforms={c.platforms} size="sm" />
                    <span className="campaign-slot">{c.usedSlots}/{c.totalShares}</span>
                  </div>
                  <div className="campaign-progress" style={{ marginTop: '0.5rem' }}>
                    <ProgressBar value={pct} />
                  </div>
                  <p style={{ marginTop: '0.375rem', fontSize: '0.6875rem', color: 'var(--color-mute)' }}>by {c.creatorName}</p>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </AppShell>
  );
}
