import { useState } from 'react';
import AppShell from '../components/AppShell';
import { MOCK_NOTIFICATIONS, timeAgo } from '../data';

export default function NotificationsPage() {
  const [notifs, setNotifs] = useState(MOCK_NOTIFICATIONS);

  const markAllRead = () => {
    setNotifs(notifs.map(n => ({ ...n, read: true })));
  };

  const handleNotifClick = (id) => {
    setNotifs(notifs.map(n => n.id === id ? { ...n, read: true } : n));
  };

  const unreadCount = notifs.filter(n => !n.read).length;

  return (
    <AppShell>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1.5rem' }}>
        <div>
          <p className="page-label">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
            </svg>
            Inbox
          </p>
          <h1 className="page-h1">Notifications</h1>
        </div>
        {unreadCount > 0 && (
          <button onClick={markAllRead} style={{ background: 'none', border: 'none', color: 'var(--color-volt)', fontFamily: 'var(--font-display)', fontSize: '0.8125rem', fontWeight: 600, cursor: 'pointer', transition: 'opacity 0.2s' }}>
            Mark all read
          </button>
        )}
      </div>

      <div style={{ maxWidth: '42rem' }}>
        {notifs.length === 0 ? (
          <div className="panel empty-state">
            <span className="empty-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="24" height="24"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg></span>
            <p style={{ marginTop: '1rem', fontFamily: 'var(--font-display)', fontWeight: 700 }}>You're all caught up!</p>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {notifs.map(n => {
              const isWin = n.message.includes('approved') || n.message.includes('added');
              const isAlert = n.message.includes('Reminder');
              const iconColor = isWin ? 'var(--color-volt)' : isAlert ? '#fbbf24' : 'var(--color-mist)';
              
              return (
                <div key={n.id} onClick={() => handleNotifClick(n.id)} style={{ padding: '1rem', borderRadius: '1rem', background: n.read ? 'rgba(255,255,255,0.02)' : 'rgba(205,240,75,0.06)', border: `1px solid ${n.read ? 'transparent' : 'rgba(205,240,75,0.2)'}`, display: 'flex', gap: '1rem', cursor: 'pointer', transition: 'background 0.2s' }}>
                  <div style={{ marginTop: '0.125rem' }}>
                    {!n.read ? (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(205,240,75,0.15)', color: 'var(--color-volt)' }}>
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="14" height="14"><circle cx="12" cy="12" r="10"/></svg>
                      </span>
                    ) : (
                      <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '2rem', height: '2rem', borderRadius: '50%', background: 'rgba(255,255,255,0.05)', color: iconColor }}>
                        {isWin ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6"/></svg>
                        ) : isAlert ? (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/></svg>
                        ) : (
                          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/></svg>
                        )}
                      </span>
                    )}
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <p style={{ fontSize: '0.875rem', lineHeight: 1.5, color: n.read ? 'var(--color-mute)' : 'var(--color-mist)' }}>
                      {n.message}
                    </p>
                    <p style={{ fontSize: '0.6875rem', color: 'rgba(255,255,255,0.3)', marginTop: '0.375rem' }}>{timeAgo(n.createdAt)}</p>
                  </div>
                  {!n.read && (
                    <div style={{ alignSelf: 'center', width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: 'var(--color-volt)', boxShadow: '0 0 8px var(--color-volt)' }} />
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>
    </AppShell>
  );
}
