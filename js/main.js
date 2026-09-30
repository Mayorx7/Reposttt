/* ============================================================
   REPOST STATIC — MAIN JS
   Handles all interactivity for index.html
   ============================================================ */

/* ---- Scroll-based nav ---- */
const nav = document.getElementById("nav");
if (nav) {
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 24);
  }, { passive: true });
}

/* ---- Reveal on scroll ---- */
const revealEls = document.querySelectorAll(".reveal, .reveal-right");
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => { if (e.isIntersecting) e.target.classList.add("visible"); });
}, { rootMargin: "-60px" });
revealEls.forEach(el => revealObserver.observe(el));

/* ---- Animated counters ---- */
function animateCounter(el) {
  const to = parseInt(el.dataset.count, 10);
  const suffix = el.dataset.suffix || "";
  const prefix = el.dataset.prefix || "";
  const dur = 1400;
  const start = performance.now();
  const tick = (t) => {
    const p = Math.min(1, (t - start) / dur);
    const ease = 1 - Math.pow(1 - p, 3);
    const val = Math.round(to * ease);
    el.textContent = prefix + val.toLocaleString() + suffix;
    if (p < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
const counterObserver = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      animateCounter(e.target);
      counterObserver.unobserve(e.target);
    }
  });
}, { rootMargin: "-80px" });
document.querySelectorAll("[data-count]").forEach(el => counterObserver.observe(el));

/* ---- Campaign cards (trending section) ---- */
const track = document.getElementById("campaignsTrack");
if (track) {
  MOCK_CAMPAIGNS.forEach(c => {
    const pct = Math.round((c.usedSlots / c.totalShares) * 100);
    track.innerHTML += `
      <a href="campaign.html?id=${c.id}" class="campaign-card">
        <div class="campaign-card-img">
          <img src="${c.imageUrl}" alt="" onerror="this.parentElement.style.background='linear-gradient(135deg,#1a0a2e,#0d1a0a)';this.style.opacity='0'">
          <div class="campaign-card-overlay"></div>
          <span class="campaign-cat">${c.category}</span>
          <span class="campaign-price">${formatMoney(c.perShareCents)}</span>
        </div>
        <div class="campaign-body">
          <p class="campaign-title">${c.title}</p>
          <div class="campaign-meta">
            ${platformRowHtml(c.platforms, "sm")}
            <span class="campaign-slot">${c.usedSlots}/${c.totalShares} shares</span>
          </div>
          <div class="campaign-progress">${progressHtml(pct)}</div>
        </div>
      </a>`;
  });
}

/* ---- Footer platforms ---- */
const footerPlatforms = document.getElementById("footerPlatforms");
if (footerPlatforms) {
  Object.entries(PLATFORMS).forEach(([key, p]) => {
    footerPlatforms.innerHTML += `<span class="footer-p-btn" title="${p.label}" style="color:${p.text}">${PLATFORM_SVGS[key] || ""}</span>`;
  });
}

/* ---- Year ---- */
const yearEl = document.getElementById("year");
if (yearEl) yearEl.textContent = new Date().getFullYear();
