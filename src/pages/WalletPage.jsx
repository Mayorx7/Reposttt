import { useState } from 'react';
import AppShell from '../components/AppShell';
import { MOCK_USER, MOCK_TRANSACTIONS, formatMoney, formatMoneySign, timeAgo } from '../data';

const TYPE_META = {
  deposit:    { label: 'Top-up',        tone: 'color:var(--color-volt);background:rgba(205,240,75,0.12);box-shadow:0 0 0 1px rgba(205,240,75,0.3)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M12 5v14M5 12l7 7 7-7"/></svg> },
  earning:    { label: 'Share payout',  tone: 'color:var(--color-volt);background:rgba(205,240,75,0.12);box-shadow:0 0 0 1px rgba(205,240,75,0.3)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M12 5v14M5 12l7 7 7-7"/></svg> },
  escrow:     { label: 'Campaign escrow', tone: 'color:var(--color-brand);background:rgba(139,92,246,0.12);box-shadow:0 0 0 1px rgba(139,92,246,0.3)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg> },
  withdrawal: { label: 'Withdrawal',    tone: 'color:#fbbf24;background:rgba(251,191,36,0.12);box-shadow:0 0 0 1px rgba(251,191,36,0.3)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M12 19V5M5 12l7-7 7 7"/></svg> },
  refund:     { label: 'Refund',        tone: 'color:#7dd3fc;background:rgba(125,211,252,0.12);box-shadow:0 0 0 1px rgba(125,211,252,0.3)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 102.13-9.36L1 10"/></svg> },
  bonus:      { label: 'Bonus',         tone: 'color:#e879f9;background:rgba(232,121,249,0.12);box-shadow:0 0 0 1px rgba(232,121,249,0.3)', icon: <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg> },
};

export default function WalletPage() {
  const [modalType, setModalType] = useState(null); // 'deposit' or 'withdraw'
  const [amount, setAmount] = useState('');
  const [bank, setBank] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const txns = MOCK_TRANSACTIONS;
  const pendingOut = txns.filter(t => t.type === 'withdrawal' && t.status === 'pending').reduce((a, t) => a + Math.abs(t.amountCents), 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setTimeout(() => {
      setSubmitting(false);
      setSuccess(true);
    }, 1000);
  };

  const closeModal = () => {
    setModalType(null);
    setSuccess(false);
    setAmount('');
    setBank('');
  };

  return (
    <AppShell>
      <p className="page-label">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8L4 7h16l-4-4z"/></svg>
        Wallet
      </p>
      <h1 className="page-h1">Your money</h1>

      {/* Balance hero */}
      <div className="wallet-hero">
        <div className="wallet-hero-glow1" />
        <div className="wallet-hero-glow2" />
        <div className="wallet-hero-inner">
          <div>
            <p className="wallet-label-small">Available balance</p>
            <p className="wallet-balance">{formatMoney(MOCK_USER.balanceCents)}</p>
            {pendingOut > 0 && <p className="wallet-pending">{formatMoney(pendingOut)} payout in flight</p>}
          </div>
          <div className="wallet-actions">
            <button className="wallet-action-btn wallet-deposit" onClick={() => setModalType('deposit')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M12 5v14M5 12l7 7 7-7"/></svg>
              Top up
            </button>
            <button className="wallet-action-btn wallet-withdraw-btn" onClick={() => setModalType('withdraw')}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16"><path d="M12 19V5M5 12l7-7 7 7"/></svg>
              Withdraw
            </button>
          </div>
        </div>
      </div>

      {/* Transactions */}
      <h2 className="section-title">Activity</h2>
      {txns.length === 0 ? (
        <div className="panel empty-state" style={{ marginTop: '1rem' }}>
          <span className="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/></svg></span>
          <p style={{ marginTop: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>No activity yet</p>
          <p className="empty-sub">Top up to launch a campaign, or earn from the sharer feed.</p>
        </div>
      ) : (
        <div className="txn-list">
          {txns.map(t => {
            const meta = TYPE_META[t.type] || TYPE_META.deposit;
            const pos = t.amountCents > 0;
            const statusTag = t.status === 'pending'
              ? <span style={{ background: 'rgba(251,191,36,0.15)', borderRadius: '99px', padding: '0.125rem 0.5rem', fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: '#fbbf24', boxShadow: '0 0 0 1px rgba(251,191,36,0.3)' }}>pending</span>
              : t.status === 'failed'
              ? <span style={{ background: 'rgba(251,113,133,0.15)', borderRadius: '99px', padding: '0.125rem 0.5rem', fontSize: '0.5625rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', color: 'var(--color-blush)', boxShadow: '0 0 0 1px rgba(251,113,133,0.3)' }}>failed</span>
              : null;
            return (
              <div key={t.id} className="txn-row">
                <span className="txn-icon" style={meta.tone.split(';').reduce((acc, str) => { const [k, v] = str.split(':'); if (k && v) acc[k.replace(/-./g, x => x[1].toUpperCase())] = v; return acc; }, {})}>{meta.icon}</span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <p className="txn-label">{meta.label} {statusTag}</p>
                  <p className="txn-note">{t.note || '—'}</p>
                </div>
                <div style={{ textAlign: 'right', flexShrink: 0 }}>
                  <p className={`txn-amount ${pos ? 'positive' : ''}`}>{formatMoneySign(t.amountCents)}</p>
                  <p className="txn-time">{timeAgo(t.createdAt)}</p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Modal */}
      {modalType && (
        <div style={{ position: 'fixed', inset: 0, zIndex: 100, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '1rem', background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(8px)' }}
          onClick={e => { if (e.target === e.currentTarget) closeModal(); }}>
          <div className="panel" style={{ width: '100%', maxWidth: '22rem', padding: '1.75rem', position: 'relative' }}>
            <button onClick={closeModal} style={{ position: 'absolute', top: '1rem', right: '1rem', color: 'var(--color-mute)', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.25rem' }}>✕</button>
            <h3 style={{ fontFamily: 'var(--font-display)', fontSize: '1.125rem', fontWeight: 700 }}>
              {modalType === 'deposit' ? 'Top up wallet' : 'Withdraw funds'}
            </h3>
            
            {!success ? (
              <form onSubmit={handleSubmit} style={{ marginTop: '1.25rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <div>
                  <label className="form-label" htmlFor="amountInput">Amount (&#8358;)</label>
                  <input type="number" id="amountInput" className="input-base" placeholder="10.00" min="1" step="0.01" value={amount} onChange={e => setAmount(e.target.value)} required />
                </div>
                {modalType === 'withdraw' && (
                  <div>
                    <label className="form-label" htmlFor="bankInput">Bank account / MoMo number</label>
                    <input type="text" id="bankInput" className="input-base" placeholder="e.g. GTBank ****1234" value={bank} onChange={e => setBank(e.target.value)} required />
                  </div>
                )}
                <button type="submit" className="form-submit" disabled={submitting}>
                  {submitting ? 'Processing…' : modalType === 'deposit' ? 'Add funds' : 'Request withdrawal'}
                </button>
              </form>
            ) : (
              <p style={{ marginTop: '1rem', textAlign: 'center', fontFamily: 'var(--font-display)', fontSize: '0.9rem', color: 'var(--color-volt)' }}>
                ✓ Done! This is a demo — no real transaction was made.
              </p>
            )}
          </div>
        </div>
      )}
    </AppShell>
  );
}
