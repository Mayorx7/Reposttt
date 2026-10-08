import { useState } from 'react';
import AppShell from '../components/AppShell';
import { Avatar, Stars } from '../components/UI';
import { MOCK_USER, MOCK_REVIEWS } from '../data';

export default function ProfilePage() {
  const u = MOCK_USER;
  
  const [name, setName] = useState(u.name);
  const [bio, setBio] = useState(u.bio || '');
  const [uni, setUni] = useState(u.university || '');
  const [phone, setPhone] = useState(u.phone || '');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const tier = u.sharesCompleted >= 20 ? 'Pro' : u.sharesCompleted >= 5 ? 'Active' : 'Rookie';

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 3000);
    }, 700);
  };

  return (
    <AppShell>
      <div className="profile-grid">
        {/* Identity Card */}
        <div>
          <div className="identity-card panel noise" style={{ position: 'relative', overflow: 'hidden' }}>
            <div className="identity-glow" />
            <div style={{ position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'center' }}>
                <Avatar name={u.name} color={u.avatarColor} size="xl" />
              </div>
              <h1 className="id-name">{u.name}</h1>
              <div className="id-rating">
                <svg fill="#cdf04b" viewBox="0 0 24 24" width="16" height="16"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>
                <span className="id-rating-val">{u.ratingAvg.toFixed(1)}</span>
                <span>({u.ratingCount} review{u.ratingCount === 1 ? '' : 's'})</span>
              </div>
              {u.bio && <p className="id-bio">{u.bio}</p>}
              
              <div className="id-info">
                <div className="id-info-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-brand)" strokeWidth="2" width="14" height="14" style={{ flexShrink: 0 }}><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/></svg>
                  {u.email}
                </div>
                {u.university && (
                  <div className="id-info-row">
                    <svg viewBox="0 0 24 24" fill="none" stroke="var(--color-volt)" strokeWidth="2" width="14" height="14" style={{ flexShrink: 0 }}><path d="M22 10v6M2 10l10-5 10 5-10 5z"/><path d="M6 12v5c3 3 9 3 12 0v-5"/></svg>
                    {u.university}
                  </div>
                )}
                <div className="id-info-row">
                  <svg viewBox="0 0 24 24" fill="none" stroke="#7dd3fc" strokeWidth="2" width="14" height="14" style={{ flexShrink: 0 }}><path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/></svg>
                  Member since {new Date(u.createdAt).toLocaleDateString('en-GB', { year: 'numeric', month: 'long' })}
                </div>
              </div>

              <div className="id-stats">
                <div className="id-stat"><p className="id-stat-val" style={{ color: 'var(--color-volt)' }}>{u.sharesCompleted}</p><p className="id-stat-lbl">Paid shares</p></div>
                <div className="id-stat"><p className="id-stat-val" style={{ color: 'var(--color-brand)' }}>{tier}</p><p className="id-stat-lbl">Sharer tier</p></div>
              </div>
            </div>
          </div>
        </div>

        {/* Editor + Reviews */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Profile Editor */}
          <div className="profile-editor panel">
            <h2 className="profile-editor-title">Edit profile</h2>
            <form onSubmit={handleSubmit} style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }} noValidate>
              <div>
                <label className="form-label" htmlFor="editName">Display name</label>
                <input type="text" id="editName" className="input-base" value={name} onChange={e => setName(e.target.value)} />
              </div>
              <div>
                <label className="form-label" htmlFor="editBio">Bio <span style={{ color: 'var(--color-mute)', fontWeight: 400 }}>(optional)</span></label>
                <textarea id="editBio" className="input-base" rows="3" style={{ resize: 'vertical' }} value={bio} onChange={e => setBio(e.target.value)} />
              </div>
              <div>
                <label className="form-label" htmlFor="editUni">University <span style={{ color: 'var(--color-mute)', fontWeight: 400 }}>(optional)</span></label>
                <input type="text" id="editUni" className="input-base" value={uni} onChange={e => setUni(e.target.value)} />
              </div>
              <div>
                <label className="form-label" htmlFor="editPhone">Phone / WhatsApp <span style={{ color: 'var(--color-mute)', fontWeight: 400 }}>(optional)</span></label>
                <input type="tel" id="editPhone" className="input-base" value={phone} onChange={e => setPhone(e.target.value)} />
              </div>
              <button type="submit" className="form-submit" disabled={submitting}>{submitting ? 'Saving…' : 'Save changes'}</button>
              {success && <p style={{ textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-volt)' }}>✓ Changes saved (demo mode)</p>}
            </form>
          </div>

          {/* Reviews */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700, letterSpacing: '-0.01em' }}>Reviews from creators</h2>
            <div style={{ marginTop: '0.75rem' }}>
              {MOCK_REVIEWS.length === 0 ? (
                <div className="panel" style={{ padding: '1.5rem', textAlign: 'center', fontSize: '0.875rem', color: 'var(--color-mute)' }}>
                  No reviews yet — approved shares can earn you a rating.
                </div>
              ) : (
                MOCK_REVIEWS.map(r => (
                  <div key={r.id} className="panel" style={{ padding: '1.25rem', marginBottom: '0.75rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <Avatar name={r.reviewer.name} color={r.reviewer.avatarColor} size="sm" />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontFamily: 'var(--font-display)', fontSize: '0.875rem', fontWeight: 700, overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>{r.reviewer.name}</p>
                        <p style={{ fontSize: '0.6875rem', color: 'var(--color-mute)', overflow: 'hidden', whiteSpace: 'nowrap', textOverflow: 'ellipsis' }}>on "{r.campaign.title}"</p>
                      </div>
                      <Stars rating={r.rating} />
                    </div>
                    {r.comment && <p style={{ marginTop: '0.75rem', fontSize: '0.875rem', lineHeight: 1.6, color: 'var(--color-mute)' }}>"{r.comment}"</p>}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
