import { Link } from 'react-router-dom';
import { useEffect, useRef } from 'react';
import { MOCK_CAMPAIGNS, PLATFORMS, formatMoney, timeLeft } from '../data';
import { RepostIcon, ProgressBar, PlatformRow, ArrowIcon } from '../components/UI';

const MARQUEE_ITEMS = [
  'Screenshot-verified proof',
  'Escrow protected payouts',
  'WhatsApp · Instagram · TikTok',
  'Real students, real reach',
  'Wallet & mobile money cash-out',
  'Live campaign tracking',
];

const RepostSvgIcon = () => (
  <svg viewBox="0 0 24 24" fill="none" stroke="#cdf04b" strokeWidth="2.5" width="16" height="16">
    <path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/>
    <path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/>
  </svg>
);

function AnimatedCounter({ target, prefix = '', suffix = '' }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let start = 0;
    const duration = 2000;
    const step = Math.ceil(target / (duration / 16));
    const timer = setInterval(() => {
      start = Math.min(start + step, target);
      el.textContent = prefix + start.toLocaleString() + suffix;
      if (start >= target) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [target, prefix, suffix]);
  return <p className="stat-value" ref={ref}>{prefix}0{suffix}</p>;
}

export default function LandingPage() {
  useEffect(() => {
    document.title = 'Repost — Pay students to share your content';
    // Reveal on scroll
    const els = document.querySelectorAll('.reveal, .reveal-right');
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { rootMargin: '-40px' }
    );
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <>
      <div className="app-ambient noise" aria-hidden="true" />

      {/* NAV */}
      <header id="nav" className="nav">
        <div className="nav-inner">
          <Link to="/" className="logo-link">
            <span className="logo-icon"><RepostIcon /></span>
            <span className="logo-text">repost<span className="text-volt">.</span></span>
          </Link>
          <nav className="nav-links">
            <a href="#how" className="nav-link">How it works</a>
            <a href="#trending" className="nav-link">Live campaigns</a>
            <a href="#earn" className="nav-link">Earn money</a>
          </nav>
          <div className="nav-actions">
            <Link to="/login" className="btn-ghost hide-sm">Log in</Link>
            <Link to="/signup" className="btn-volt">
              Get started <ArrowIcon />
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="hero" id="hero">
        <div className="hero-glow-1" />
        <div className="hero-glow-2" />
        <div className="hero-inner">
          <div className="hero-copy reveal">
            <span className="pill-badge">
              <span className="ping-dot"><span className="ping-inner" /><span className="ping-core" /></span>
              The paid-repost marketplace for real reach
            </span>
            <h1 className="hero-h1">
              Pay people to put your content in <span className="text-gradient-volt">everyone's feed.</span>
            </h1>
            <p className="hero-sub">
              Repost connects you with thousands of students who share your flyer, product, or event
              to their WhatsApp Status, Instagram Story and TikTok — with screenshot proof before a cent leaves escrow.
            </p>
            <div className="hero-ctas">
              <Link to="/signup" className="btn-volt btn-lg">
                Launch a campaign <ArrowIcon />
              </Link>
              <Link to="/signup?role=sharer" className="btn-outline btn-lg">
                <svg className="icon-sm text-volt" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/>
                </svg>
                Earn as a sharer
              </Link>
            </div>
            <div className="hero-stats">
              <div className="stat-item">
                <AnimatedCounter target={12800} suffix="+" />
                <p className="stat-label">Verified sharers</p>
              </div>
              <div className="stat-item">
                <AnimatedCounter target={384} suffix="k" />
                <p className="stat-label">Shares delivered</p>
              </div>
              <div className="stat-item">
                <AnimatedCounter target={250} prefix="$" suffix="k" />
                <p className="stat-label">Paid to students</p>
              </div>
            </div>
          </div>

          {/* Phone mockup */}
          <div className="phone-wrap reveal-right">
            <div className="phone-floater-1">
              <span className="floater-icon floater-green">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="16" height="16">
                  <path d="M9 12l2 2 4-4"/><circle cx="12" cy="12" r="10"/>
                </svg>
              </span>
              <div>
                <p className="floater-title">Shared to WhatsApp</p>
                <p className="floater-sub">Status · verified just now</p>
              </div>
            </div>
            <div className="phone-shell">
              <div className="phone-screen">
                <div className="phone-notch" />
                <div className="phone-status">
                  <span>9:41</span>
                  <span className="phone-5g">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" width="10" height="10">
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
                    </svg>
                    5G
                  </span>
                </div>
                <div className="phone-content">
                  <div className="phone-header-row">
                    <span className="phone-section-title">Campaigns near you</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="#cdf04b" strokeWidth="2" width="14" height="14">
                      <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/>
                    </svg>
                  </div>
                  <div className="phone-card">
                    <div className="phone-card-img">
                      <img src="https://picsum.photos/seed/neon/600/800" alt="" />
                      <div className="phone-card-overlay" />
                      <span className="phone-card-price">&#8358;0.80</span>
                      <div className="phone-card-info">
                        <p className="phone-card-title">Neon Riot — Freshers' Rave</p>
                        <p className="phone-card-sub">by Kemi A.</p>
                      </div>
                    </div>
                    <div className="phone-card-body">
                      <div className="phone-platforms-row">
                        <span className="platform-dot whatsapp-dot" title="WhatsApp" />
                        <span className="platform-dot instagram-dot" title="Instagram" />
                        <span className="platform-dot tiktok-dot" title="TikTok" />
                        <span className="phone-slots">38/60 claimed</span>
                      </div>
                      <div className="progress-bar"><div className="progress-fill" style={{ width: '63%' }} /></div>
                      <div className="phone-actions">
                        <span className="phone-btn-primary">Reserve slot</span>
                        <span className="phone-btn-secondary">Details</span>
                      </div>
                    </div>
                  </div>
                  <div className="phone-wallet">
                    <span className="wallet-icon">
                      <svg viewBox="0 0 24 24" fill="none" stroke="#cdf04b" strokeWidth="2" width="14" height="14">
                        <rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/>
                      </svg>
                    </span>
                    <div>
                      <p className="wallet-label">Wallet balance</p>
                      <p className="wallet-val">$47.80</p>
                    </div>
                    <span className="wallet-withdraw">Withdraw</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="phone-floater-2">
              <p className="floater-sub">Proof approved</p>
              <p className="floater-earn">+ &#8358;0.80</p>
            </div>
            <div className="phone-floater-3">
              <svg viewBox="0 0 24 24" fill="#cdf04b" width="14" height="14">
                <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
              </svg>
              4.9 sharer rating
            </div>
          </div>
        </div>

        {/* Marquee */}
        <div className="marquee-wrap">
          <div className="marquee-track">
            <div className="marquee-inner">
              {[...MARQUEE_ITEMS, ...MARQUEE_ITEMS].map((item, i) => (
                <span className="marquee-item" key={i}>{item} <RepostSvgIcon /></span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section id="how" className="section-container">
        <div className="section-heading reveal">
          <p className="section-label">How it works</p>
          <h2 className="section-h2">Organic reach, <span className="text-gradient-brand">engineered.</span></h2>
          <p className="section-sub">No bots. No fake impressions. Just thousands of real people sharing to the only audiences that trust them — their friends.</p>
        </div>
        <div className="steps-grid">
          {[
            {
              num: '01', title: 'Create & fund',
              desc: 'Upload your flyer, write the caption sharers must use, pick platforms and set your budget. Funds sit safely in escrow.',
              iconColor: '#8b5cf6', bgClass: 'bg-brand-12 ring-brand-30',
              icon: <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"/>,
              delay: '0s',
            },
            {
              num: '02', title: 'Students share it',
              desc: 'Sharers near your campus or niche claim a slot, post to their WhatsApp Status, Story or TikTok within hours.',
              iconColor: '#cdf04b', bgClass: 'bg-volt-12 ring-volt-30',
              icon: <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>,
              delay: '.1s',
            },
            {
              num: '03', title: 'Approve proof, pay',
              desc: "Every share comes with screenshot proof. Approve it and money lands in the sharer's wallet instantly. No ghost reach.",
              iconColor: '#7dd3fc', bgClass: 'bg-sky-12 ring-sky-30',
              icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"/>,
              delay: '.2s',
            },
          ].map(step => (
            <div key={step.num} className="step-card panel noise reveal" style={{ '--delay': step.delay }}>
              <span className="step-num">{step.num}</span>
              <span className={`step-icon ${step.bgClass}`}>
                <svg viewBox="0 0 24 24" fill="none" stroke={step.iconColor} strokeWidth="2" width="22" height="22">
                  {step.icon}
                </svg>
              </span>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>
        <div className="trust-strip panel reveal">
          {[
            { text: 'Escrow on every campaign', d: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z' },
            { text: 'Screenshot proof required', d: 'M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' },
            { text: 'Payouts to bank or MoMo', d: 'M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z' },
            { text: 'Campus-level targeting', d: 'M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z' },
          ].map(item => (
            <span key={item.text} className="trust-item">
              <svg viewBox="0 0 24 24" fill="none" stroke="#cdf04b" strokeWidth="2" width="18" height="18">
                <path d={item.d}/>
              </svg>
              {item.text}
            </span>
          ))}
        </div>
      </section>

      {/* TRENDING */}
      <section id="trending" className="trending-section">
        <div className="section-container">
          <div className="trending-header reveal">
            <div>
              <p className="section-label">Live now</p>
              <h2 className="section-h2 sm">Campaigns trending this week</h2>
            </div>
            <Link to="/signup" className="browse-all">Browse all <ArrowIcon /></Link>
          </div>
        </div>
        <div className="campaigns-scroll reveal">
          <div className="campaigns-track">
            {MOCK_CAMPAIGNS.map(c => {
              const pct = Math.round((c.usedSlots / c.totalShares) * 100);
              return (
                <Link key={c.id} to={`/campaign/${c.id}`} className="campaign-card panel">
                  <div className="campaign-card-img">
                    <img src={c.imageUrl} alt="" />
                    <div className="campaign-card-overlay" />
                    <span className="campaign-cat">{c.category}</span>
                    <span className="campaign-price">{formatMoney(c.perShareCents)}</span>
                  </div>
                  <div className="campaign-body">
                    <p className="campaign-title">{c.title}</p>
                    <div className="campaign-meta">
                      <PlatformRow platforms={c.platforms} size="sm" />
                      <span className="campaign-slot">{c.usedSlots}/{c.totalShares}</span>
                    </div>
                    <ProgressBar value={pct} />
                    <p style={{ marginTop: '0.375rem', fontSize: '0.6875rem', color: 'var(--color-mute)' }}>by {c.creatorName}</p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* ROLES */}
      <section id="earn" className="section-container">
        <div className="roles-grid">
          <div className="role-card role-creator reveal">
            <div className="role-glow role-glow-brand" />
            <span className="role-badge role-badge-brand">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6M5.436 13.683A4.001 4.001 0 017 6h1.832c4.1 0 7.625-1.234 9.168-3v14c-1.543-1.766-5.067-3-9.168-3H7a3.988 3.988 0 01-1.564-.317z"/>
              </svg>
              For creators
            </span>
            <h3 className="role-h3">Need reach? Rent a thousand stories.</h3>
            <ul className="role-list">
              <li>Launch a campaign in under 2 minutes</li>
              <li>Target by campus, city or platform</li>
              <li>Only pay for shares you verify</li>
              <li>Real-time progress dashboard</li>
            </ul>
            <Link to="/signup" className="btn-white">Start a campaign <ArrowIcon /></Link>
          </div>
          <div className="role-card role-sharer reveal" style={{ '--delay': '.12s' }}>
            <div className="role-glow role-glow-volt" />
            <span className="role-badge role-badge-volt">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" width="14" height="14">
                <path d="M8 21l4-4 4 4M12 17V3"/><path d="M4 7l8-4 8 4"/>
              </svg>
              For sharers
            </span>
            <h3 className="role-h3">Your status is worth money. Literally.</h3>
            <ul className="role-list role-list-volt">
              <li>Earn $0.50–$1.50 every time you repost</li>
              <li>Share what fits your vibe — you choose</li>
              <li>Withdraw to bank or mobile money</li>
              <li>Build a rating, unlock better gigs</li>
            </ul>
            <Link to="/signup?role=sharer" className="btn-volt">Start earning <ArrowIcon /></Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-container">
        <div className="cta-box noise reveal">
          <div className="cta-glow" />
          <svg viewBox="0 0 24 24" fill="#cdf04b" className="cta-sparkle" width="28" height="28">
            <path d="M12 2l2.4 7.4H22l-6.2 4.5 2.4 7.4L12 17l-6.2 4.3 2.4-7.4L2 9.4h7.6z"/>
          </svg>
          <h2 className="cta-h2">The internet runs on reposts. <span className="text-gradient-volt">Get yours.</span></h2>
          <p className="cta-sub">Join 12,000+ students and brands trading real reach for real money. Free to join — no subscription, ever.</p>
          <div className="cta-actions">
            <Link to="/signup" className="btn-volt btn-lg">Create free account</Link>
            <div className="platform-stack">
              <span className="p-icon whatsapp-bg">
                <svg viewBox="0 0 24 24" fill="#4BE07F" width="14" height="14"><path d="M12 2a9.96 9.96 0 0 0-8.6 15.05L2 22l5.08-1.33A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.17 15.28l-.3-.18-2.97.78.79-2.89-.2-.3A8.2 8.2 0 0 1 12 3.8Z"/></svg>
              </span>
              <span className="p-icon instagram-bg">
                <svg viewBox="0 0 24 24" fill="#F56A9C" width="14" height="14"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-2.28 2.28c-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-2.28-2.28c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Z"/></svg>
              </span>
              <span className="p-icon tiktok-bg">
                <svg viewBox="0 0 24 24" fill="#67E8F9" width="14" height="14"><path d="M21 8.5a7.09 7.09 0 0 1-4.2-1.4v7.87a6.26 6.26 0 1 1-6.26-6.26c.24 0 .47.01.7.05v3.16a3.15 3.15 0 1 0 2.42 3.05V1.5h3.14A7.1 7.1 0 0 0 21 5.36Z"/></svg>
              </span>
              <span className="p-icon x-bg">
                <svg viewBox="0 0 24 24" fill="#e4e4e7" width="14" height="14"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.6l5.24 6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3Z"/></svg>
              </span>
              Works on 6 platforms
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        <div className="footer-inner">
          <div className="footer-logo">
            <span className="footer-logo-icon"><RepostIcon width={18} height={18} /></span>
            <span className="footer-logo-text">repost<span className="text-volt">.</span></span>
          </div>
          <p className="footer-copy">Real people. Real shares. Real proof. © {new Date().getFullYear()} Repost Labs.</p>
          <div className="footer-platforms">
            {Object.entries(PLATFORMS).map(([key, p]) => (
              <span key={key} className="platform-chip sm" style={{ background: p.bg, color: p.text }} title={p.label}>
                {p.label}
              </span>
            ))}
          </div>
        </div>
      </footer>
    </>
  );
}
