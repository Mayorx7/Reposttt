import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { RepostIcon } from '../components/UI';

const EyeOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);

const AuthCollage = () => (
  <aside className="auth-right">
    <div className="auth-collage">
      <div className="collage-col">
        <img src="https://picsum.photos/seed/neon/600/800" alt="" style={{ height: '34vh' }} />
        <img src="https://picsum.photos/seed/kicks/600/800" alt="" style={{ height: '42vh' }} />
        <img src="https://picsum.photos/seed/crave/600/800" alt="" style={{ height: '34vh' }} />
      </div>
      <div className="collage-col offset">
        <img src="https://picsum.photos/seed/midnight/600/800" alt="" style={{ height: '38vh' }} />
        <img src="https://picsum.photos/seed/thrift/600/800" alt="" style={{ height: '30vh' }} />
        <img src="https://picsum.photos/seed/finals/600/800" alt="" style={{ height: '38vh' }} />
      </div>
    </div>
    <div className="auth-right-overlay" />
    <div className="auth-testimonial">
      <div className="auth-testimonial-inner">
        <p className="auth-quote">"I made NGN 150,000 last month just reposting campus events to my WhatsApp Status. It took literally zero effort."</p>
        <div className="auth-person">
          <span className="auth-person-avatar">TA</span>
          <div>
            <p className="auth-person-name">Tunde A.</p>
            <p className="auth-person-sub">University of Lagos · 212 shares completed</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
);

export default function SignupPage() {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [role, setRole] = useState(searchParams.get('role') === 'creator' ? 'creator' : 'sharer');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!name.trim()) errs.name = 'Enter your full name.';
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email.';
    if (password.length < 8) errs.password = 'Password must be at least 8 characters.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => navigate('/feed'), 1000);
  };

  return (
    <>
      <div className="app-ambient noise" aria-hidden="true" />
      <div className="auth-grid">
        <div className="auth-left">
          <Link to="/" className="logo-link">
            <span className="logo-icon"><RepostIcon /></span>
            <span className="logo-text">repost<span className="text-volt">.</span></span>
          </Link>
          <div className="auth-form-wrap">
            <h1 className="auth-h2">Create your account</h1>
            <p className="auth-sub">Already have an account? <Link to="/login">Sign in</Link></p>

            {/* Role selector */}
            <div style={{ marginTop: '1.5rem', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.75rem' }}>
              <button type="button" className={`role-select-btn${role === 'sharer' ? ' active' : ''}`} onClick={() => setRole('sharer')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <circle cx="12" cy="12" r="10"/><path d="M12 8v4l3 3"/>
                </svg>
                <span>Earn as sharer</span>
              </button>
              <button type="button" className={`role-select-btn${role === 'creator' ? ' active' : ''}`} onClick={() => setRole('creator')}>
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
                  <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
                </svg>
                <span>Launch campaigns</span>
              </button>
            </div>

            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <label className="form-label" htmlFor="name">Full name</label>
                <input type="text" id="name" className="input-base" placeholder="ThankGod Bright"
                  value={name} onChange={e => setName(e.target.value)} />
                {errors.name && <span className="form-error visible">{errors.name}</span>}
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="email">Email address</label>
                <input type="email" id="email" className="input-base" placeholder="you@university.edu"
                  value={email} onChange={e => setEmail(e.target.value)} />
                {errors.email && <span className="form-error visible">{errors.email}</span>}
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="password-wrap">
                  <input type={showPw ? 'text' : 'password'} id="password" className="input-base"
                    placeholder="Min. 8 characters" value={password} onChange={e => setPassword(e.target.value)} />
                  <button type="button" className="password-toggle" onClick={() => setShowPw(!showPw)} aria-label="Show/hide password">
                    <EyeOpen />
                  </button>
                </div>
                {errors.password && <span className="form-error visible">{errors.password}</span>}
              </div>
              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? 'Creating account…' : "Create account — it's free"}
              </button>
            </form>
          </div>
          <p className="auth-footer">By continuing you agree to our Terms & Privacy Policy. Every share is protected by escrow and verified with proof.</p>
        </div>
        <AuthCollage />
      </div>

      <style>{`
        .role-select-btn {
          display: flex; flex-direction: column; align-items: center; gap: 0.375rem;
          padding: 0.875rem 1rem; border-radius: 1rem;
          border: 1px solid var(--color-edge); background: rgba(255,255,255,0.04);
          font-family: var(--font-display); font-size: 0.8125rem; font-weight: 600;
          color: var(--color-mute); cursor: pointer; transition: all 0.2s;
        }
        .role-select-btn.active { border-color: rgba(205,240,75,0.6); background: rgba(205,240,75,0.1); color: var(--color-volt); }
        .role-select-btn:hover:not(.active) { border-color: var(--color-edge); color: var(--color-mist); background: rgba(255,255,255,0.07); }
      `}</style>
    </>
  );
}
