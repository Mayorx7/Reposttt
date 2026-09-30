/* ============================================================
   REPOST STATIC — APP SHELL JS
   Used by all authenticated inner pages
   ============================================================ */

/* ---- Build App Shell ---- */
function buildAppShell(activePage) {
  const NAV = [
    { href: "feed.html", label: "Feed", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M4 11a9 9 0 019-9"/><path d="M4 4a16 16 0 0116 16"/><circle cx="5" cy="19" r="1"/></svg>`, key: "feed" },
    { href: "dashboard.html", label: "Studio", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`, key: "dashboard" },
    { href: "jobs.html", label: "My Gigs", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><rect x="2" y="7" width="20" height="14" rx="2"/><path d="M16 21V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v16"/></svg>`, key: "jobs" },
    { href: "wallet.html", label: "Wallet", icon: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20"><path d="M20 7H4a2 2 0 00-2 2v10a2 2 0 002 2h16a2 2 0 002-2V9a2 2 0 00-2-2z"/><path d="M16 3H8L4 7h16l-4-4z"/><circle cx="17" cy="13" r="1" fill="currentColor"/></svg>`, key: "wallet" },
  ];

  const unread = MOCK_NOTIFICATIONS.filter(n => !n.read).length;

  const header = document.createElement("header");
  header.className = "app-header";
  header.innerHTML = `
    <div class="app-header-inner">
      <a href="index.html" class="logo-link">
        <span class="logo-icon"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.75" stroke-linecap="round" stroke-linejoin="round" width="20" height="20"><path d="M17 1l4 4-4 4"/><path d="M3 11V9a4 4 0 014-4h14"/><path d="M7 23l-4-4 4-4"/><path d="M21 13v2a4 4 0 01-4 4H3"/></svg></span>
        <span class="logo-text">repost<span class="text-volt">.</span></span>
      </a>
      <nav class="app-nav">
        ${NAV.map(n => `<a href="${n.href}" class="app-nav-link${activePage === n.key ? " active" : ""}">${n.label}</a>`).join("")}
      </nav>
      <div class="app-header-actions">
        <a href="campaign-new.html" class="btn-new-campaign">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="16" height="16"><path d="M12 5v14M5 12h14"/></svg>
          New campaign
        </a>
        <a href="notifications.html" class="notif-btn" aria-label="Notifications">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="18" height="18"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 0 1-3.46 0"/></svg>
          ${unread > 0 ? `<span class="notif-badge">${unread > 9 ? "9+" : unread}</span>` : ""}
        </a>
        <a href="profile.html" aria-label="Profile">
          ${avatarHtml(MOCK_USER.name, MOCK_USER.avatarColor)}
        </a>
      </div>
    </div>`;

  const bottomNav = document.createElement("nav");
  bottomNav.className = "bottom-nav";
  bottomNav.innerHTML = `
    <div class="bottom-nav-inner">
      ${NAV.map((n, i) => {
        if (i === 1) { // Insert create button after Studio
          return `${buildBnavLink(n, activePage)}
          <a href="campaign-new.html" class="bnav-create" aria-label="Create campaign">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" width="24" height="24"><path d="M12 5v14M5 12h14"/></svg>
          </a>`;
        }
        return buildBnavLink(n, activePage);
      }).join("")}
    </div>`;

  document.body.insertBefore(header, document.body.firstChild);
  document.body.appendChild(bottomNav);
}

function buildBnavLink(n, activePage) {
  return `<a href="${n.href}" class="bnav-link${activePage === n.key ? " active" : ""}">
    ${n.icon}
    ${n.label}
  </a>`;
}

/* ---- Reveal on scroll ---- */
function initReveal() {
  const els = document.querySelectorAll(".reveal, .reveal-right");
  const obs = new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
  }, { rootMargin: "-40px" });
  els.forEach(el => obs.observe(el));
}
