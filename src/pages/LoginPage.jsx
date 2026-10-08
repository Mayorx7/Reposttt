import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { RepostIcon } from '../components/UI';

const EyeOpen = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/>
  </svg>
);
const EyeClosed = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="18" height="18">
    <path d="M17.94 17.94A10.07 10.07 0 0112 20c-7 0-11-8-11-8a18.45 18.45 0 015.06-5.94M9.9 4.24A9.12 9.12 0 0112 4c7 0 11 8 11 8a18.5 18.5 0 01-2.16 3.19m-6.72-1.07a3 3 0 11-4.24-4.24"/>
    <line x1="1" y1="1" x2="23" y2="23"/>
  </svg>
);

const AuthCollage = ({ quote, person }) => (
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
        <p className="auth-quote">{quote}</p>
        <div className="auth-person">
          <span className="auth-person-avatar">{person.initials}</span>
          <div>
            <p className="auth-person-name">{person.name}</p>
            <p className="auth-person-sub">{person.sub}</p>
          </div>
        </div>
      </div>
    </div>
  </aside>
);

export default function LoginPage() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const errs = {};
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errs.email = 'Please enter a valid email.';
    if (!password) errs.password = 'Please enter your password.';
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);
    if (Object.keys(errs).length > 0) return;
    setLoading(true);
    setTimeout(() => navigate('/feed'), 900);
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
            <h1 className="auth-h2">Welcome back</h1>
            <p className="auth-sub">Don't have an account? <Link to="/signup">Sign up free</Link></p>
            <form className="form" onSubmit={handleSubmit} noValidate>
              <div className="form-row">
                <label className="form-label" htmlFor="email">Email address</label>
                <input
                  type="email" id="email" className="input-base"
                  placeholder="you@university.edu" autoComplete="email"
                  value={email} onChange={e => setEmail(e.target.value)}
                />
                {errors.email && <span className="form-error visible">{errors.email}</span>}
              </div>
              <div className="form-row">
                <label className="form-label" htmlFor="password">Password</label>
                <div className="password-wrap">
                  <input
                    type={showPw ? 'text' : 'password'} id="password" className="input-base"
                    placeholder="••••••••" autoComplete="current-password"
                    value={password} onChange={e => setPassword(e.target.value)}
                  />
                  <button type="button" className="password-toggle" onClick={() => setShowPw(!showPw)} aria-label="Show/hide password">
                    {showPw ? <EyeClosed /> : <EyeOpen />}
                  </button>
                </div>
                {errors.password && <span className="form-error visible">{errors.password}</span>}
              </div>
              <button type="submit" className="form-submit" disabled={loading}>
                {loading ? 'Signing in…' : 'Sign in'}
              </button>
            </form>
            <div style={{ marginTop: '1.5rem', textAlign: 'center' }}>
              <Link to="/signup" style={{ fontSize: '0.8125rem', color: 'var(--color-mute)' }}>
                Forgot password? <span style={{ color: 'var(--color-volt)' }}>Reset it</span>
              </Link>
            </div>
          </div>
          <p className="auth-footer">By continuing you agree to our Terms & Privacy Policy. Every share is protected by escrow and verified with proof.</p>
        </div>
        <AuthCollage
          quote={'"I made NGN 62,000 last month just reposting campus events to my WhatsApp Status. It took literally zero effort."'}
          person={{ initials: 'TA', name: 'Tunde A.', sub: 'University of Lagos · 212 shares completed' }}
        />
      </div>
    </>
  );
}
