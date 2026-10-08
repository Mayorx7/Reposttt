/* ============================================================
   REPOST — MOCK DATA & HELPERS (converted from data.js)
   ============================================================ */

export const MOCK_USER = {
  id: 'u1',
  name: 'Adaeze Okonkwo',
  email: 'adaeze@unilag.edu.ng',
  avatarColor: '#6d28d9',
  bio: 'Final-year Marketing student. Love sharing campus vibes.',
  university: 'University of Lagos',
  phone: '+234 801 234 5678',
  balanceCents: 4780,
  sharesCompleted: 12,
  ratingAvg: 4.7,
  ratingCount: 9,
  isAdmin: false,
  createdAt: '2024-09-01',
};

export const MOCK_CAMPAIGNS = [
  {
    id: 'c1',
    title: "Neon Riot — Freshers' Rave",
    imageUrl: 'https://picsum.photos/seed/neon/600/800',
    perShareCents: 80,
    category: 'Event',
    platforms: ['whatsapp', 'instagram', 'tiktok'],
    usedSlots: 38,
    totalShares: 60,
    status: 'active',
    deadline: '2025-12-01',
    creatorName: 'Kemi A.',
    caption: '🔥 The biggest fresher rave of the year is HERE! Share this to your WhatsApp Status and earn NGN 0.80. Use the caption below 👇',
    location: 'Lagos, Nigeria',
    description: "Lagos biggest freshers rave returns! Share to earn instantly.",
  },
  {
    id: 'c2',
    title: 'Kicks District · Retro Drop',
    imageUrl: 'https://picsum.photos/seed/kicks/600/800',
    perShareCents: 120,
    category: 'Product',
    platforms: ['instagram', 'tiktok', 'x'],
    usedSlots: 21,
    totalShares: 40,
    status: 'active',
    deadline: '2025-11-15',
    creatorName: 'Dre O.',
    caption: '🔥 Retro kicks just dropped. Limited pairs only. Share and earn NGN 1.20!',
    location: 'Abuja, Nigeria',
    description: 'Limited retro sneaker drop — share the news and get paid.',
  },
  {
    id: 'c3',
    title: 'Midnight Sun — EP out Friday',
    imageUrl: 'https://picsum.photos/seed/midnight/600/800',
    perShareCents: 100,
    category: 'Music',
    platforms: ['tiktok', 'instagram', 'x'],
    usedSlots: 12,
    totalShares: 50,
    status: 'active',
    deadline: '2025-11-30',
    creatorName: 'Sol M.',
    caption: '🎵 My EP drops Friday — share this to your story and earn NGN 1.00!',
    location: 'Nationwide',
    description: 'Afro-fusion EP dropping Friday. Help spread the word.',
  },
  {
    id: 'c4',
    title: 'Crave Cart · 20% off first order',
    imageUrl: 'https://picsum.photos/seed/crave/600/800',
    perShareCents: 70,
    category: 'Food',
    platforms: ['whatsapp', 'instagram'],
    usedSlots: 55,
    totalShares: 80,
    status: 'active',
    deadline: '2025-11-20',
    creatorName: 'Crave Cart',
    caption: '🍔 Get 20% off your first Crave Cart order! Share and earn NGN 0.70.',
    location: 'Lagos, Nigeria',
    description: 'Food delivery platform offering 20% first-order discount.',
  },
  {
    id: 'c5',
    title: 'Thrift Thread Pop-Up',
    imageUrl: 'https://picsum.photos/seed/thrift/600/800',
    perShareCents: 60,
    category: 'Fashion',
    platforms: ['instagram', 'facebook'],
    usedSlots: 30,
    totalShares: 45,
    status: 'active',
    deadline: '2025-12-05',
    creatorName: 'Zara K.',
    caption: '👗 Thrift pop-up this weekend! Amazing finds from NGN 500. Share & earn NGN 0.60.',
    location: 'Lagos, Nigeria',
    description: 'Weekend thrift market — vintage finds at student prices.',
  },
  {
    id: 'c6',
    title: 'Ace Your Finals — 1:1 Tutoring',
    imageUrl: 'https://picsum.photos/seed/finals/600/800',
    perShareCents: 50,
    category: 'Service',
    platforms: ['whatsapp', 'instagram', 'facebook'],
    usedSlots: 64,
    totalShares: 100,
    status: 'active',
    deadline: '2025-12-15',
    creatorName: 'Study Circle',
    caption: '📚 Finals coming up? Book a 1:1 tutor now. Share and earn NGN 0.50!',
    location: 'Nationwide',
    description: 'Peer tutoring service for finals season.',
  },
];

export const CATEGORIES = ['All', 'Event', 'Product', 'Music', 'Food', 'Fashion', 'Service'];

export const PLATFORMS = {
  whatsapp: { label: 'WhatsApp', color: '#25D366', text: '#4BE07F', bg: 'rgba(37,211,102,0.15)' },
  instagram: { label: 'Instagram', color: '#E1306C', text: '#F56A9C', bg: 'rgba(225,48,108,0.15)' },
  tiktok: { label: 'TikTok', color: '#22D3EE', text: '#67E8F9', bg: 'rgba(34,211,238,0.12)' },
  x: { label: 'X/Twitter', color: '#E7E9EA', text: '#e4e4e7', bg: 'rgba(255,255,255,0.1)' },
  facebook: { label: 'Facebook', color: '#1877F2', text: '#5EA0F8', bg: 'rgba(24,119,242,0.15)' },
  linkedin: { label: 'LinkedIn', color: '#0A66C2', text: '#4C9BE8', bg: 'rgba(10,102,194,0.18)' },
};

export const MOCK_JOBS = [
  { id: 'j1', status: 'approved', campaign: MOCK_CAMPAIGNS[0], createdAt: '2025-10-20', reviewedAt: '2025-10-22', rating: 5 },
  { id: 'j2', status: 'pending', campaign: MOCK_CAMPAIGNS[2], createdAt: '2025-10-28', reviewedAt: null, rating: null },
  { id: 'j3', status: 'accepted', campaign: MOCK_CAMPAIGNS[3], createdAt: '2025-10-30', reviewedAt: null, rating: null },
  { id: 'j4', status: 'approved', campaign: MOCK_CAMPAIGNS[1], createdAt: '2025-10-15', reviewedAt: '2025-10-17', rating: 4 },
  { id: 'j5', status: 'rejected', campaign: MOCK_CAMPAIGNS[4], createdAt: '2025-10-10', reviewedAt: '2025-10-11', rating: null, rejectReason: "Screenshot didn't show full post duration" },
];

export const MOCK_DASH_CAMPAIGNS = [
  { ...MOCK_CAMPAIGNS[0], approvedCount: 30, pendingCount: 3 },
  { ...MOCK_CAMPAIGNS[1], status: 'paused', approvedCount: 18, pendingCount: 0 },
  { ...MOCK_CAMPAIGNS[3], approvedCount: 50, pendingCount: 5 },
];

export const MOCK_TRANSACTIONS = [
  { id: 't1', type: 'deposit', amountCents: 5000, status: 'completed', note: 'Top-up via Paystack', createdAt: '2025-10-01' },
  { id: 't2', type: 'escrow', amountCents: -2400, status: 'completed', note: 'Neon Riot campaign escrow', createdAt: '2025-10-02' },
  { id: 't3', type: 'earning', amountCents: 80, status: 'completed', note: 'Share approved: Neon Riot', createdAt: '2025-10-22' },
  { id: 't4', type: 'earning', amountCents: 120, status: 'completed', note: 'Share approved: Kicks District', createdAt: '2025-10-17' },
  { id: 't5', type: 'withdrawal', amountCents: -1000, status: 'pending', note: 'Withdraw to GTBank ****1234', createdAt: '2025-10-29' },
  { id: 't6', type: 'refund', amountCents: 600, status: 'completed', note: 'Campaign closed early refund', createdAt: '2025-10-05' },
];

export const MOCK_NOTIFICATIONS = [
  { id: 'n1', message: "Your share for 'Neon Riot' was approved! NGN 0.80 added to your wallet.", read: false, createdAt: '2025-10-22' },
  { id: 'n2', message: "New campaign matching your profile: 'Kicks District · Retro Drop' pays NGN 1.20 per share.", read: false, createdAt: '2025-10-20' },
  { id: 'n3', message: "Dre O. left you a 4-star review for 'Kicks District'.", read: true, createdAt: '2025-10-17' },
  { id: 'n4', message: 'Your withdrawal of NGN 10.00 is being processed.', read: true, createdAt: '2025-10-29' },
  { id: 'n5', message: 'Reminder: You have 1 slot to share — post within 24h to keep it!', read: true, createdAt: '2025-10-31' },
];

export const MOCK_REVIEWS = [
  { id: 'r1', rating: 5, comment: 'Shared quickly and sent proof within the hour. Excellent sharer!', reviewer: { name: 'Kemi A.', avatarColor: '#0d9488' }, campaign: { title: "Neon Riot — Freshers' Rave" }, createdAt: '2025-10-22' },
  { id: 'r2', rating: 4, comment: 'Good work, minor delay but sorted it out.', reviewer: { name: 'Dre O.', avatarColor: '#7c3aed' }, campaign: { title: 'Kicks District · Retro Drop' }, createdAt: '2025-10-17' },
];

/* ---- Helpers ---- */
export function formatMoney(cents) {
  if (cents === undefined || cents === null) return 'NGN 0.00';
  const abs = Math.abs(cents);
  const formatted = (abs / 100).toFixed(2);
  return (cents < 0 ? '-' : '') + 'NGN ' + formatted;
}

export function formatMoneySign(cents) {
  if (cents === undefined || cents === null) return 'NGN 0.00';
  const sign = cents >= 0 ? '+' : '-';
  return sign + 'NGN ' + (Math.abs(cents) / 100).toFixed(2);
}

export function timeAgo(dateStr) {
  if (!dateStr) return '';
  const diff = (Date.now() - new Date(dateStr).getTime()) / 1000;
  if (diff < 60) return 'just now';
  if (diff < 3600) return Math.floor(diff / 60) + 'm ago';
  if (diff < 86400) return Math.floor(diff / 3600) + 'h ago';
  if (diff < 86400 * 7) return Math.floor(diff / 86400) + 'd ago';
  return new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' });
}

export function timeLeft(dateStr) {
  if (!dateStr) return '';
  const diff = new Date(dateStr).getTime() - Date.now();
  if (diff < 0) return 'Ended';
  const days = Math.floor(diff / 86400000);
  if (days === 0) return 'Today';
  if (days === 1) return 'Tomorrow';
  return days + 'd left';
}

export function ratingLabel(avg) {
  if (avg >= 4.5) return avg.toFixed(1) + ' · Excellent';
  if (avg >= 3.5) return avg.toFixed(1) + ' · Good';
  if (avg >= 2.5) return avg.toFixed(1) + ' · Average';
  return avg.toFixed(1);
}

export function initials(name) {
  return name.split(' ').map(w => w[0]).join('').slice(0, 2).toUpperCase();
}
