/* ============================================================
   REPOST STATIC — MOCK DATA
   Replaces all DB calls
   ============================================================ */

const MOCK_USER = {
  id: "u1",
  name: "Adaeze Okonkwo",
  email: "adaeze@unilag.edu.ng",
  avatarColor: "#6d28d9",
  bio: "Final-year Marketing student. Love sharing campus vibes.",
  university: "University of Lagos",
  phone: "+234 801 234 5678",
  balanceCents: 4780,
  sharesCompleted: 12,
  ratingAvg: 4.7,
  ratingCount: 9,
  isAdmin: false,
  createdAt: "2024-09-01",
};

const MOCK_CAMPAIGNS = [
  {
    id: "c1",
    title: "Neon Riot — Freshers' Rave",
    imageUrl: "https://picsum.photos/seed/neon/600/800",
    perShareCents: 80,
    category: "Event",
    platforms: ["whatsapp", "instagram", "tiktok"],
    usedSlots: 38,
    totalShares: 60,
    status: "active",
    deadline: "2025-12-01",
    creatorName: "Kemi A.",
    caption: "🔥 The biggest fresher rave of the year is HERE! Share this to your WhatsApp Status and earn \u20A60.80. Use the caption below 👇",
    location: "Lagos, Nigeria",
    description: "Lagos biggest freshers rave returns! Share to earn instantly.",
  },
  {
    id: "c2",
    title: "Kicks District · Retro Drop",
    imageUrl: "https://picsum.photos/seed/kicks/600/800",
    perShareCents: 120,
    category: "Product",
    platforms: ["instagram", "tiktok", "x"],
    usedSlots: 21,
    totalShares: 40,
    status: "active",
    deadline: "2025-11-15",
    creatorName: "Dre O.",
    caption: "🔥 Retro kicks just dropped. Limited pairs only. Share and earn \u20A61.20!",
    location: "Abuja, Nigeria",
    description: "Limited retro sneaker drop — share the news and get paid.",
  },
  {
    id: "c3",
    title: "Midnight Sun — EP out Friday",
    imageUrl: "https://picsum.photos/seed/midnight/600/800",
    perShareCents: 100,
    category: "Music",
    platforms: ["tiktok", "instagram", "x"],
    usedSlots: 12,
    totalShares: 50,
    status: "active",
    deadline: "2025-11-30",
    creatorName: "Sol M.",
    caption: "🎵 My EP drops Friday — share this to your story and earn \u20A61.00!",
    location: "Nationwide",
    description: "Afro-fusion EP dropping Friday. Help spread the word.",
  },
  {
    id: "c4",
    title: "Crave Cart · 20% off first order",
    imageUrl: "https://picsum.photos/seed/crave/600/800",
    perShareCents: 70,
    category: "Food",
    platforms: ["whatsapp", "instagram"],
    usedSlots: 55,
    totalShares: 80,
    status: "active",
    deadline: "2025-11-20",
    creatorName: "Crave Cart",
    caption: "🍔 Get 20% off your first Crave Cart order! Share and earn \u20A60.70.",
    location: "Lagos, Nigeria",
    description: "Food delivery platform offering 20% first-order discount.",
  },
  {
    id: "c5",
    title: "Thrift Thread Pop-Up",
    imageUrl: "https://picsum.photos/seed/thrift/600/800",
    perShareCents: 60,
    category: "Fashion",
    platforms: ["instagram", "facebook"],
    usedSlots: 30,
    totalShares: 45,
    status: "active",
    deadline: "2025-12-05",
    creatorName: "Zara K.",
    caption: "👗 Thrift pop-up this weekend! Amazing finds from \u20A6500. Share & earn \u20A60.60.",
    location: "Lagos, Nigeria",
    description: "Weekend thrift market — vintage finds at student prices.",
  },
  {
    id: "c6",
    title: "Ace Your Finals — 1:1 Tutoring",
    imageUrl: "https://picsum.photos/seed/finals/600/800",
    perShareCents: 50,
    category: "Service",
    platforms: ["whatsapp", "instagram", "facebook"],
    usedSlots: 64,
    totalShares: 100,
    status: "active",
    deadline: "2025-12-15",
    creatorName: "Study Circle",
    caption: "📚 Finals coming up? Book a 1:1 tutor now. Share and earn \u20A60.50!",
    location: "Nationwide",
    description: "Peer tutoring service for finals season.",
  },
];

const CATEGORIES = ["All", "Event", "Product", "Music", "Food", "Fashion", "Service"];

const PLATFORMS = {
  whatsapp: { label: "WhatsApp", color: "#25D366", text: "#4BE07F", bg: "rgba(37,211,102,0.15)" },
  instagram: { label: "Instagram", color: "#E1306C", text: "#F56A9C", bg: "rgba(225,48,108,0.15)" },
  tiktok: { label: "TikTok", color: "#22D3EE", text: "#67E8F9", bg: "rgba(34,211,238,0.12)" },
  x: { label: "X/Twitter", color: "#E7E9EA", text: "#e4e4e7", bg: "rgba(255,255,255,0.1)" },
  facebook: { label: "Facebook", color: "#1877F2", text: "#5EA0F8", bg: "rgba(24,119,242,0.15)" },
  linkedin: { label: "LinkedIn", color: "#0A66C2", text: "#4C9BE8", bg: "rgba(10,102,194,0.18)" },
};

const PLATFORM_SVGS = {
  whatsapp: `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2a9.96 9.96 0 0 0-8.6 15.05L2 22l5.08-1.33A10 10 0 1 0 12 2Zm0 1.8a8.2 8.2 0 1 1-4.17 15.28l-.3-.18-2.97.78.79-2.89-.2-.3A8.2 8.2 0 0 1 12 3.8Z"/></svg>`,
  instagram: `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23a3.7 3.7 0 0 1-2.28 2.28c-.43.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-2.28-2.28c-.16-.43-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16ZM12 0C8.74 0 8.33.01 7.05.07 5.78.13 4.9.33 4.14.6a5.9 5.9 0 0 0-2.13 1.4A5.9 5.9 0 0 0 .6 4.14C.33 4.9.13 5.78.07 7.05.01 8.33 0 8.74 0 12s.01 3.67.07 4.95c.06 1.27.26 2.15.53 2.91.28.8.65 1.5 1.4 2.13.75.76 1.33 1.12 2.13 1.4.76.27 1.64.47 2.91.53C8.33 23.99 8.74 24 12 24s3.67-.01 4.95-.07c1.27-.06 2.15-.26 2.91-.53a5.9 5.9 0 0 0 2.13-1.4 5.9 5.9 0 0 0 1.4-2.13c.27-.76.47-1.64.53-2.91.06-1.28.07-1.69.07-4.95s-.01-3.67-.07-4.95c-.06-1.27-.26-2.15-.53-2.91a5.9 5.9 0 0 0-1.4-2.13A5.9 5.9 0 0 0 19.86.6C19.1.33 18.22.13 16.95.07 15.67.01 15.26 0 12 0Zm0 5.84A6.16 6.16 0 1 0 18.16 12 6.16 6.16 0 0 0 12 5.84ZM12 16a4 4 0 1 1 4-4 4 4 0 0 1-4 4Zm7.85-10.4a1.44 1.44 0 1 1-2.88 0 1.44 1.44 0 0 1 2.88 0Z"/></svg>`,
  tiktok: `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M21 8.5a7.09 7.09 0 0 1-4.2-1.4v7.87a6.26 6.26 0 1 1-6.26-6.26c.24 0 .47.01.7.05v3.16a3.15 3.15 0 1 0 2.42 3.05V1.5h3.14A7.1 7.1 0 0 0 21 5.36Z"/></svg>`,
  x: `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M18.9 1.15h3.68l-8.04 9.19L24 22.85h-7.4l-5.8-7.59-6.64 7.59H.47l8.6-9.83L0 1.15h7.6l5.24 6.93Zm-1.29 19.5h2.04L6.49 3.24H4.3Z"/></svg>`,
  facebook: `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.09 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.7 4.53-4.7 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.26h3.33l-.53 3.49h-2.8V24C19.61 23.09 24 18.1 24 12.07Z"/></svg>`,
  linkedin: `<svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05a3.74 3.74 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.8 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg>`,
};

const MOCK_JOBS = [
  { id: "j1", status: "approved", campaign: MOCK_CAMPAIGNS[0], createdAt: "2025-10-20", reviewedAt: "2025-10-22", rating: 5 },
  { id: "j2", status: "pending", campaign: MOCK_CAMPAIGNS[2], createdAt: "2025-10-28", reviewedAt: null, rating: null },
  { id: "j3", status: "accepted", campaign: MOCK_CAMPAIGNS[3], createdAt: "2025-10-30", reviewedAt: null, rating: null },
  { id: "j4", status: "approved", campaign: MOCK_CAMPAIGNS[1], createdAt: "2025-10-15", reviewedAt: "2025-10-17", rating: 4 },
  { id: "j5", status: "rejected", campaign: MOCK_CAMPAIGNS[4], createdAt: "2025-10-10", reviewedAt: "2025-10-11", rating: null, rejectReason: "Screenshot didn't show full post duration" },
];

const MOCK_DASH_CAMPAIGNS = [
  { ...MOCK_CAMPAIGNS[0], approvedCount: 30, pendingCount: 3 },
  { ...MOCK_CAMPAIGNS[1], status: "paused", approvedCount: 18, pendingCount: 0 },
  { ...MOCK_CAMPAIGNS[3], approvedCount: 50, pendingCount: 5 },
];

const MOCK_TRANSACTIONS = [
  { id: "t1", type: "deposit", amountCents: 5000, status: "completed", note: "Top-up via Paystack", createdAt: "2025-10-01" },
  { id: "t2", type: "escrow", amountCents: -2400, status: "completed", note: "Neon Riot campaign escrow", createdAt: "2025-10-02" },
  { id: "t3", type: "earning", amountCents: 80, status: "completed", note: "Share approved: Neon Riot", createdAt: "2025-10-22" },
  { id: "t4", type: "earning", amountCents: 120, status: "completed", note: "Share approved: Kicks District", createdAt: "2025-10-17" },
  { id: "t5", type: "withdrawal", amountCents: -1000, status: "pending", note: "Withdraw to GTBank ****1234", createdAt: "2025-10-29" },
  { id: "t6", type: "refund", amountCents: 600, status: "completed", note: "Campaign closed early refund", createdAt: "2025-10-05" },
];

const MOCK_NOTIFICATIONS = [
  { id: "n1", message: "Your share for 'Neon Riot' was approved! \u20A60.80 added to your wallet.", read: false, createdAt: "2025-10-22" },
  { id: "n2", message: "New campaign matching your profile: 'Kicks District · Retro Drop' pays \u20A61.20 per share.", read: false, createdAt: "2025-10-20" },
  { id: "n3", message: "Dre O. left you a 4-star review for 'Kicks District'.", read: true, createdAt: "2025-10-17" },
  { id: "n4", message: "Your withdrawal of \u20A610.00 is being processed.", read: true, createdAt: "2025-10-29" },
  { id: "n5", message: "Reminder: You have 1 slot to share — post within 24h to keep it!", read: true, createdAt: "2025-10-31" },
];

const MOCK_REVIEWS = [
  { id: "r1", rating: 5, comment: "Shared quickly and sent proof within the hour. Excellent sharer!", reviewer: { name: "Kemi A.", avatarColor: "#0d9488" }, campaign: { title: "Neon Riot — Freshers' Rave" }, createdAt: "2025-10-22" },
  { id: "r2", rating: 4, comment: "Good work, minor delay but sorted it out.", reviewer: { name: "Dre O.", avatarColor: "#7c3aed" }, campaign: { title: "Kicks District · Retro Drop" }, createdAt: "2025-10-17" },
];

/* ---- Helpers ---- */
function formatMoney(cents) {
  if (cents === undefined || cents === null) return "\u20A60.00";
  const abs = Math.abs(cents);
  const formatted = (abs / 100).toFixed(2);
  return (cents < 0 ? "-" : "") + "\u20A6" + formatted;
}
function formatMoneySign(cents) {
  if (cents === undefined || cents === null) return "\u20A60.00";
  const sign = cents >= 0 ? "+" : "-";
  return sign + "\u20A6" + (Math.abs(cents) / 100).toFixed(2);
}
function timeAgo(dateStr) {
  if (!dateStr) return "";
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return "just now";
  if (diff < 3600) return Math.floor(diff / 60) + "m ago";
  if (diff < 86400) return Math.floor(diff / 3600) + "h ago";
  if (diff < 86400 * 7) return Math.floor(diff / 86400) + "d ago";
  return new Date(dateStr).toLocaleDateString("en-GB", { day: "numeric", month: "short" });
}
function timeLeft(dateStr) {
  if (!dateStr) return "";
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff < 0) return "Ended";
  const days = Math.floor(diff / 86400000);
  if (days === 0) return "Today";
  if (days === 1) return "Tomorrow";
  return days + "d left";
}
function ratingLabel(avg) {
  if (avg >= 4.5) return avg.toFixed(1) + " · Excellent";
  if (avg >= 3.5) return avg.toFixed(1) + " · Good";
  if (avg >= 2.5) return avg.toFixed(1) + " · Average";
  return avg.toFixed(1);
}
function initials(name) {
  return name.split(" ").map(w => w[0]).join("").slice(0, 2).toUpperCase();
}
function progressHtml(value) {
  const pct = Math.min(100, Math.max(0, value));
  return `<div class="progress-bar"><div class="progress-fill" style="width:${pct}%"></div></div>`;
}
function platformRowHtml(platforms, size = "") {
  return `<div class="platform-row">${platforms.map(p => {
    const def = PLATFORMS[p];
    if (!def) return "";
    return `<span class="platform-chip${size ? " " + size : ""}" style="background:${def.bg};color:${def.text}" title="${def.label}">${PLATFORM_SVGS[p] || ""}</span>`;
  }).join("")}</div>`;
}
function starsHtml(rating) {
  let s = '<div class="stars">';
  for (let i = 1; i <= 5; i++) {
    s += `<svg class="star-icon ${i <= Math.round(rating) ? "star-filled" : "star-empty"}" viewBox="0 0 24 24" fill="currentColor"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`;
  }
  return s + "</div>";
}
function statusBadgeHtml(status) {
  const map = { active: "Active", paused: "Paused", closed: "Closed", pending: "In review", approved: "Paid", accepted: "To share", rejected: "Rejected" };
  return `<span class="status-badge status-${status}">${map[status] || status}</span>`;
}
function avatarHtml(name, color, size = "") {
  return `<span class="avatar${size ? " avatar-" + size : ""}" style="background:${color}">${initials(name)}</span>`;
}
