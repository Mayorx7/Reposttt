import { useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import AppShell from '../components/AppShell';
import { PlatformRow, StatusBadge, ProgressBar } from '../components/UI';
import { MOCK_CAMPAIGNS, MOCK_DASH_CAMPAIGNS, MOCK_JOBS, formatMoney, timeLeft } from '../data';

export default function CampaignDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const campaign = MOCK_CAMPAIGNS.find(c => c.id === id);

  const [copied, setCopied] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [proofSubmitting, setProofSubmitting] = useState(false);
  const [proofDone, setProofDone] = useState(false);
  const [reserving, setReserving] = useState(false);
  const [reserved, setReserved] = useState(false);

  const isCreator = MOCK_DASH_CAMPAIGNS.some(c => c.id === id);
  const existingJob = MOCK_JOBS.find(j => j.campaign.id === id);

  const copyCaption = () => {
    navigator.clipboard.writeText(campaign?.caption || '').then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleReserve = () => {
    setReserving(true);
    setTimeout(() => {
      setReserving(false);
      setReserved(true);
    }, 1200);
  };

  const handleProofSubmit = (e) => {
    e.preventDefault();
    setProofSubmitting(true);
    setTimeout(() => {
      setProofDone(true);
      setTimeout(() => setModalOpen(false), 1000);
    }, 1200);
  };

  if (!campaign) {
    return (
      <AppShell>
        <Link to="/feed" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginTop: '1rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '99px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Feed
        </Link>
        <div style={{ marginTop: '4rem', textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 700 }}>Campaign not found</h2>
          <p style={{ color: 'var(--color-mute)', marginTop: '0.5rem' }}>It may have been closed or doesn't exist.</p>
        </div>
      </AppShell>
    );
  }

  const pct = Math.min(100, Math.round((campaign.usedSlots / campaign.totalShares) * 100));

  // Determine action bar state
  let actionText = 'Ready to earn?';
  let actionSubText = 'Reserve a slot now.';
  let actionBtnLabel = 'Reserve Slot';
  let actionBtnDisabled = false;
  let actionBtnStyle = {};
  let actionBtnClick = handleReserve;
  let showActionBar = true;

  if (isCreator) {
    actionText = 'Creator View';
    actionSubText = `${campaign.usedSlots} total shares claimed.`;
    actionBtnLabel = 'Manage Campaign';
    actionBtnStyle = { background: 'var(--color-brand)', color: '#fff' };
    actionBtnClick = () => navigate('/dashboard');
  } else if (existingJob) {
    if (existingJob.status === 'accepted' || reserved) {
      actionText = 'Slot Reserved';
      actionSubText = 'Post it and submit proof when done.';
      actionBtnLabel = 'Submit Proof';
      actionBtnClick = () => setModalOpen(true);
    } else if (existingJob.status === 'pending' || proofDone) {
      actionText = 'In Review';
      actionSubText = 'Creator is verifying your screenshot.';
      actionBtnLabel = 'Pending';
      actionBtnDisabled = true;
      actionBtnStyle = { opacity: 0.5 };
      actionBtnClick = () => {};
    } else if (existingJob.status === 'approved') {
      actionText = 'Paid Out';
      actionSubText = 'Funds added to your wallet.';
      actionBtnLabel = 'View Earnings';
      actionBtnClick = () => navigate('/wallet');
    } else {
      showActionBar = false;
    }
  } else if (campaign.status !== 'active' || campaign.usedSlots >= campaign.totalShares) {
    actionText = 'Campaign Closed';
    actionSubText = 'No more slots available.';
    actionBtnLabel = '';
  } else if (reserving) {
    actionBtnLabel = 'Reserving…';
    actionBtnDisabled = true;
  } else if (reserved) {
    actionText = 'Slot Reserved';
    actionSubText = 'Post it and submit proof when done.';
    actionBtnLabel = 'Submit Proof';
    actionBtnClick = () => setModalOpen(true);
  }

  return (
    <AppShell>
      <div style={{ paddingTop: 0 }}>
        <Link to="/feed" className="btn-ghost" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', marginTop: '1rem', padding: '0.5rem 1rem', background: 'rgba(255,255,255,0.05)', borderRadius: '99px' }}>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="16" height="16"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
          Back to Feed
        </Link>

        {/* Hero image */}
        <div style={{ position: 'relative', height: '16rem', borderRadius: '1.5rem', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', marginTop: '1rem' }}>
          <img src={campaign.imageUrl} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, var(--color-ink) 0%, rgba(10,9,18,0.3) 100%)' }} />
        </div>

        {/* Main content */}
        <div style={{ position: 'relative', maxWidth: '48rem', margin: '-5rem auto 0', padding: '0 1rem', zIndex: 10 }}>
          <div style={{ background: 'rgba(21,18,36,0.8)', backdropFilter: 'blur(24px)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '1.5rem', padding: '1.5rem', boxShadow: '0 24px 48px -12px rgba(0,0,0,0.6)' }}>
            <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'space-between', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <span className="tag" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--color-mist)' }}>{campaign.category}</span>
                <StatusBadge status={campaign.status} />
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--color-volt)' }}>{formatMoney(campaign.perShareCents)}</p>
                <p style={{ fontSize: '0.6875rem', textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-mute)' }}>Per share</p>
              </div>
            </div>
            <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)', fontWeight: 800, letterSpacing: '-0.02em', marginTop: '0.5rem' }}>{campaign.title}</h1>
            <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', color: 'var(--color-mute)' }}>Created by <span style={{ fontWeight: 600, color: 'var(--color-mist)' }}>{campaign.creatorName}</span></p>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1rem', marginTop: '1.5rem', borderTop: '1px solid rgba(255,255,255,0.05)', paddingTop: '1.25rem' }}>
              <div>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-mute)' }}>Available slots</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginTop: '0.25rem' }}>
                  <span style={{ color: 'var(--color-volt)' }}>{campaign.totalShares - campaign.usedSlots}</span> / {campaign.totalShares}
                </p>
              </div>
              <div>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-mute)' }}>Deadline</p>
                <p style={{ fontFamily: 'var(--font-display)', fontWeight: 700, marginTop: '0.25rem' }}>{timeLeft(campaign.deadline)}</p>
              </div>
              <div>
                <p style={{ fontSize: '0.6875rem', color: 'var(--color-mute)' }}>Required Platforms</p>
                <div style={{ marginTop: '0.375rem' }}><PlatformRow platforms={campaign.platforms} /></div>
              </div>
            </div>
          </div>

          {/* Brief */}
          <div style={{ marginTop: '2rem', padding: '0 0.5rem' }}>
            <h2 className="section-title" style={{ marginTop: 0 }}>Campaign Brief</h2>
            <p style={{ marginTop: '0.75rem', lineHeight: 1.7, color: 'rgba(236,232,255,0.85)' }}>{campaign.description}</p>
          </div>

          {/* Caption */}
          <div style={{ marginTop: '2rem', padding: '0 0.5rem' }}>
            <h2 className="section-title">Required Caption</h2>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-mute)', marginTop: '0.375rem' }}>You must include this exact text in your post.</p>
            <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid var(--color-edge)', borderRadius: '1rem', padding: '1.25rem', marginTop: '0.75rem', position: 'relative' }}>
              <button onClick={copyCaption} style={{ position: 'absolute', right: '0.75rem', top: '0.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid var(--color-edge)', borderRadius: '0.5rem', padding: '0.25rem 0.5rem', fontSize: '0.6875rem', fontWeight: 600, color: 'var(--color-mist)', cursor: 'pointer', transition: 'background 0.2s' }}>
                {copied ? 'Copied!' : 'Copy'}
              </button>
              <p style={{ fontSize: '0.9375rem', lineHeight: 1.6, paddingRight: '3rem' }}>{campaign.caption}</p>
            </div>
          </div>

          {/* Proof guidelines */}
          <div style={{ marginTop: '2rem', padding: '0 0.5rem' }}>
            <h2 className="section-title">Proof Guidelines</h2>
            <ul style={{ marginTop: '0.75rem', display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.875rem', color: 'var(--color-mute)' }}>
              {['Post must remain live for at least 24 hours.', 'Screenshot must clearly show the view count and timestamp.', 'No deletion or hiding from specific contacts. Escrow pays out after creator approval.'].map((g, i) => (
                <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.625rem' }}>
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-volt)" strokeWidth="2" width="16" height="16" style={{ flexShrink: 0, marginTop: '0.125rem' }}>
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
                  </svg>
                  <span dangerouslySetInnerHTML={{ __html: g.replace('24 hours', '<strong>24 hours</strong>').replace('view count', '<strong>view count</strong>').replace('timestamp', '<strong>timestamp</strong>') }} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Action bar */}
        {showActionBar && (
          <div style={{ position: 'sticky', bottom: '5rem', maxWidth: '48rem', margin: '2rem auto 0', background: 'rgba(28,24,48,0.9)', backdropFilter: 'blur(24px)', border: '1px solid var(--color-edge)', borderRadius: '99px', padding: '0.75rem 1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', boxShadow: '0 16px 32px rgba(0,0,0,0.4)' }}>
            <div>
              <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.8125rem', fontWeight: 700 }}>{actionText}</p>
              <p style={{ fontSize: '0.6875rem', color: 'var(--color-mute)' }}>{actionSubText}</p>
            </div>
            {actionBtnLabel && (
              <button className="btn-volt" onClick={actionBtnClick} disabled={actionBtnDisabled}
                style={{ height: '2.75rem', padding: '0 1.5rem', ...actionBtnStyle }}>
                {actionBtnLabel}
              </button>
            )}
          </div>
        )}
      </div>

      {/* Proof submission modal */}
      {modalOpen && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={e => { if (e.target === e.currentTarget) setModalOpen(false); }}>
          <div className="panel" style={{ width: '100%', maxWidth: '26rem', padding: '1.75rem', position: 'relative' }}>
            <button onClick={() => setModalOpen(false)} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--color-mute)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.25rem', fontWeight: 700 }}>Submit Proof</h3>
            <p style={{ fontSize: '0.875rem', color: 'var(--color-mute)', marginTop: '0.375rem' }}>Upload a screenshot showing your post and view count after 24h.</p>
            {!proofDone ? (
              <form onSubmit={handleProofSubmit} style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div>
                  <label className="form-label" style={{ display: 'block', marginBottom: '0.5rem' }}>Upload Screenshot</label>
                  <div style={{ border: '2px dashed var(--color-edge)', borderRadius: '1rem', padding: '2rem', textAlign: 'center', background: 'rgba(255,255,255,0.02)' }}>
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-mute)" strokeWidth="2" width="24" height="24" style={{ margin: '0 auto' }}>
                      <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M17 8l-5-5-5 5M12 3v12"/>
                    </svg>
                    <p style={{ fontSize: '0.75rem', color: 'var(--color-mute)', marginTop: '0.5rem' }}>Click or drag image here</p>
                  </div>
                </div>
                <div>
                  <label className="form-label" htmlFor="proofViews">Total Views (approx)</label>
                  <input type="number" id="proofViews" className="input-base" placeholder="e.g. 150" required />
                </div>
                <button type="submit" className="form-submit" disabled={proofSubmitting}>
                  {proofSubmitting ? 'Uploading…' : 'Submit for Review'}
                </button>
              </form>
            ) : (
              <p style={{ marginTop: '1.5rem', textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--color-volt)' }}>✓ Submitted! Creator will review your proof.</p>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
