import "dotenv/config";
import bcrypt from "bcryptjs";
import { db } from "../src/db";
import {
  campaigns,
  disputes,
  notifications,
  reviews,
  submissions,
  transactions,
  users,
} from "../src/db/schema";

const HOUR = 3600_000;
const DAY = 24 * HOUR;
const ago = (d: number) => new Date(Date.now() - d * DAY);
const ahead = (d: number) => new Date(Date.now() + d * DAY);

async function main() {
  console.log("Clearing tables…");
  await db.delete(disputes);
  await db.delete(reviews);
  await db.delete(notifications);
  await db.delete(transactions);
  await db.delete(submissions);
  await db.delete(campaigns);
  await db.delete(users);

  const hash = await bcrypt.hash("repost123", 10);

  /* ------------------------------- users -------------------------------- */

  const [admin, kemi, alex, tunde, sarah, mike, zara] = await db
    .insert(users)
    .values([
      { name: "Repost Admin", email: "admin@repost.app", passwordHash: hash, isAdmin: true, avatarColor: "pink", bio: "Ops & support" },
      { name: "Kemi Adeyemi", email: "kemi@repost.app", passwordHash: hash, avatarColor: "violet", bio: "Throwing the loudest parties on campus.", university: "University of Lagos", balanceCents: 8400, ratingAvg: 483, ratingCount: 6, createdAt: ago(40) },
      { name: "Alex Carter", email: "alex@repost.app", passwordHash: hash, avatarColor: "lime", bio: "Status is basically my second job.", university: "UCLA", balanceCents: 4780, ratingAvg: 487, ratingCount: 3, sharesCompleted: 2, createdAt: ago(32) },
      { name: "Tunde Adebayo", email: "tunde@repost.app", passwordHash: hash, avatarColor: "cyan", university: "University of Lagos", balanceCents: 180, ratingAvg: 470, ratingCount: 5, sharesCompleted: 5, createdAt: ago(28) },
      { name: "Sarah Kim", email: "sarah@repost.app", passwordHash: hash, avatarColor: "orange", bio: "Sneakers & vintage, all day.", university: "NYU", balanceCents: 2500, ratingAvg: 490, ratingCount: 4, sharesCompleted: 1, createdAt: ago(25) },
      { name: "Mike Osei", email: "mike@repost.app", passwordHash: hash, avatarColor: "pink", bio: "Study Circle & Sol M. releases.", university: "KNUST", balanceCents: 2000, ratingAvg: 475, ratingCount: 2, sharesCompleted: 0, createdAt: ago(22) },
      { name: "Zara Khan", email: "zara@repost.app", passwordHash: hash, avatarColor: "violet", university: "UCL", balanceCents: 1050, ratingAvg: 450, ratingCount: 1, sharesCompleted: 1, createdAt: ago(18) },
    ])
    .returning();

  const fillerHash = hash;
  const fillerValues = Array.from({ length: 24 }).map((_, i) => ({
    name: `Campus Sharer ${String(i + 1).padStart(2, "0")}`,
    email: `sharer${String(i + 1).padStart(2, "0")}@repost.app`,
    passwordHash: fillerHash,
    avatarColor: ["violet", "lime", "cyan", "pink", "orange"][i % 5],
    balanceCents: 50,
    ratingAvg: 400 + (i % 5) * 20,
    ratingCount: 2 + (i % 3),
    sharesCompleted: 1,
    createdAt: ago(15 + i),
  }));
  const fillers = await db.insert(users).values(fillerValues).returning();

  /* ------------------------------ campaigns ------------------------------ */

  const [neonRiot, craveCart, kicks, tutoring, midnight, thrift, hackcamp] = await db
    .insert(campaigns)
    .values([
      {
        creatorId: kemi.id,
        title: "Neon Riot — Freshers' Rave",
        caption: "This Friday! NEON RIOT at The Loft — lasers, guest DJs & free entry before 11pm with student ID. Tell a friend to tell a friend.",
        imageUrl: "/images/campaigns/neon-riot.jpg",
        linkUrl: "https://neonriot.events/tickets",
        platforms: ["whatsapp", "instagram", "tiktok"],
        category: "Event",
        location: "University of Lagos",
        perShareCents: 80,
        totalShares: 60,
        deadline: ahead(3),
        createdAt: ago(2),
      },
      {
        creatorId: kemi.id,
        title: "Crave Cart · 20% off first order",
        caption: "Hungry at 2am? Crave Cart delivers on campus in under 20 minutes. Use code FRESH20 for 20% off your first order.",
        imageUrl: "/images/campaigns/crave-cart.jpg",
        linkUrl: "https://cravecart.app/download",
        platforms: ["whatsapp", "instagram", "facebook"],
        category: "Food",
        location: "UCLA",
        perShareCents: 70,
        totalShares: 80,
        deadline: ahead(6),
        createdAt: ago(4),
      },
      {
        creatorId: sarah.id,
        title: "Kicks District · Retro 88 Drop",
        caption: "The Retro 88 just landed at Kicks District. Only 200 pairs — early link drops tomorrow at noon. Cop or cry.",
        imageUrl: "/images/campaigns/kicks-district.jpg",
        linkUrl: "https://kicksdistrict.shop/retro-88",
        platforms: ["instagram", "tiktok", "x"],
        category: "Product",
        location: "New York",
        perShareCents: 120,
        totalShares: 40,
        deadline: ahead(5),
        createdAt: ago(1),
      },
      {
        creatorId: mike.id,
        title: "Ace Your Finals — 1:1 Tutoring",
        caption: "Finals season is here. Study Circle connects you with A-student tutors for Calc, Stats, Physics & Econ. First session free!",
        imageUrl: "/images/campaigns/finals-tutoring.jpg",
        linkUrl: "https://studycircle.io/free",
        platforms: ["whatsapp", "instagram", "facebook", "linkedin"],
        category: "Service",
        location: "KNUST",
        perShareCents: 50,
        totalShares: 100,
        deadline: ahead(9),
        createdAt: ago(5),
      },
      {
        creatorId: mike.id,
        title: "Midnight Sun — EP out Friday",
        caption: "MIDNIGHT SUN — the new EP from Sol M. drops on all platforms Friday. Pre-save now and vibe with us at launch night.",
        imageUrl: "/images/campaigns/midnight-sun-ep.jpg",
        linkUrl: "https://solm.fanlink.to/midnight-sun",
        platforms: ["tiktok", "instagram", "x"],
        category: "Music",
        location: "",
        perShareCents: 100,
        totalShares: 50,
        deadline: ahead(4),
        createdAt: ago(1),
      },
      {
        creatorId: sarah.id,
        title: "Thrift Thread Pop-Up — Sat 10am",
        caption: "Thrift Thread pop-up this Saturday 10am at Grand Hall car park. Vintage denim, Y2K tees & accessories from $3. Come early!",
        imageUrl: "/images/campaigns/thrift-thread.jpg",
        platforms: ["instagram", "facebook"],
        category: "Fashion",
        location: "Brooklyn, NYC",
        perShareCents: 60,
        totalShares: 45,
        deadline: ahead(2),
        createdAt: ago(3),
      },
      {
        creatorId: kemi.id,
        title: "HackCamp 2026 · Early bird tickets",
        caption: "HackCamp 2026 is loading: 48 hours, $5k in prizes, recruiters from top startups. Early bird tickets live now.",
        imageUrl: null,
        linkUrl: "https://hackcamp.dev/tickets",
        platforms: ["whatsapp", "instagram", "linkedin", "x"],
        category: "Event",
        location: "Accra",
        perShareCents: 50,
        totalShares: 24,
        deadline: ago(1),
        status: "completed",
        createdAt: ago(9),
      },
    ])
    .returning();

  /* --------------------------- creator money ----------------------------- */

  const escrowRows: typeof transactions.$inferInsert[] = [
    { userId: kemi.id, type: "deposit", amountCents: 20000, note: "Top-up · Card (Stripe test mode)", createdAt: ago(6) },
    { userId: kemi.id, type: "escrow", amountCents: -1200, campaignId: hackcamp.id, note: "Escrow for “HackCamp 2026 · Early bird tickets” (24 shares)", createdAt: ago(9) },
    { userId: kemi.id, type: "escrow", amountCents: -5600, campaignId: craveCart.id, note: "Escrow for “Crave Cart · 20% off first order” (80 shares)", createdAt: ago(4) },
    { userId: kemi.id, type: "escrow", amountCents: -4800, campaignId: neonRiot.id, note: "Escrow for “Neon Riot — Freshers' Rave” (60 shares)", createdAt: ago(2) },
    { userId: sarah.id, type: "deposit", amountCents: 10000, note: "Top-up · Card (Stripe test mode)", createdAt: ago(6) },
    { userId: sarah.id, type: "escrow", amountCents: -2700, campaignId: thrift.id, note: "Escrow for “Thrift Thread Pop-Up — Sat 10am” (45 shares)", createdAt: ago(3) },
    { userId: sarah.id, type: "escrow", amountCents: -4800, campaignId: kicks.id, note: "Escrow for “Kicks District · Retro 88 Drop” (40 shares)", createdAt: ago(1) },
    { userId: mike.id, type: "deposit", amountCents: 12000, note: "Top-up · Mobile money (Paystack)", createdAt: ago(7) },
    { userId: mike.id, type: "escrow", amountCents: -5000, campaignId: tutoring.id, note: "Escrow for “Ace Your Finals — 1:1 Tutoring” (100 shares)", createdAt: ago(5) },
    { userId: mike.id, type: "escrow", amountCents: -5000, campaignId: midnight.id, note: "Escrow for “Midnight Sun — EP out Friday” (50 shares)", createdAt: ago(1) },
    { userId: alex.id, type: "deposit", amountCents: 5000, note: "Top-up · Card (Stripe test mode)", createdAt: ago(20) },
    { userId: alex.id, type: "bonus", amountCents: 200, note: "Welcome bonus", createdAt: ago(20) },
    { userId: zara.id, type: "deposit", amountCents: 1000, note: "Top-up · Mobile money (Paystack)", createdAt: ago(10) },
  ];
  await db.insert(transactions).values(escrowRows);

  /* ----------------------------- submissions ----------------------------- */
  type SubSeed = {
    campaign: (typeof campaigns.$inferSelect)["id"];
    sharer: (typeof users.$inferSelect)["id"];
    status: "accepted" | "pending" | "approved" | "rejected";
    proof?: boolean;
    reason?: string;
    atH: number; // hours ago it was created
  };

  const seeds: SubSeed[] = [
    { campaign: neonRiot.id, sharer: tunde.id, status: "approved", proof: true, atH: 36 },
    { campaign: neonRiot.id, sharer: sarah.id, status: "approved", proof: true, atH: 30 },
    { campaign: neonRiot.id, sharer: alex.id, status: "pending", proof: true, atH: 5 },
    { campaign: neonRiot.id, sharer: zara.id, status: "rejected", proof: true, reason: "Screenshot doesn't show the required caption.", atH: 20 },
    { campaign: kicks.id, sharer: alex.id, status: "approved", proof: true, atH: 18 },
    { campaign: kicks.id, sharer: tunde.id, status: "pending", proof: true, atH: 3 },
    { campaign: craveCart.id, sharer: alex.id, status: "approved", proof: true, atH: 40 },
    { campaign: craveCart.id, sharer: tunde.id, status: "approved", proof: true, atH: 34 },
    { campaign: craveCart.id, sharer: mike.id, status: "accepted", atH: 8 },
    { campaign: tutoring.id, sharer: alex.id, status: "accepted", atH: 12 },
    { campaign: tutoring.id, sharer: zara.id, status: "approved", proof: true, atH: 44 },
    { campaign: tutoring.id, sharer: tunde.id, status: "approved", proof: true, atH: 41 },
    { campaign: midnight.id, sharer: tunde.id, status: "approved", proof: true, atH: 10 },
    { campaign: midnight.id, sharer: sarah.id, status: "accepted", atH: 6 },
    { campaign: thrift.id, sharer: tunde.id, status: "approved", proof: true, atH: 26 },
    { campaign: thrift.id, sharer: alex.id, status: "pending", proof: true, atH: 2 },
  ];

  const campaignById = new Map(
    [neonRiot, craveCart, kicks, tutoring, midnight, thrift, hackcamp].map((c) => [c.id, c])
  );

  const insertedSubs: (typeof submissions.$inferSelect)[] = [];
  for (const s of seeds) {
    const camp = campaignById.get(s.campaign)!;
    const createdAt = new Date(Date.now() - s.atH * HOUR);
    const [row] = await db
      .insert(submissions)
      .values({
        campaignId: s.campaign,
        sharerId: s.sharer,
        status: s.status,
        proofImageUrl: s.proof ? camp.imageUrl : null,
        proofLink: s.proof && camp.linkUrl ? camp.linkUrl : null,
        note: s.proof ? "Posted on all required platforms — will keep live for 24h." : null,
        rejectReason: s.reason ?? null,
        submittedAt: s.proof ? createdAt : null,
        reviewedAt: s.status === "approved" || s.status === "rejected" ? new Date(createdAt.getTime() + 2 * HOUR) : null,
        createdAt,
      })
      .returning();
    insertedSubs.push(row);
    if (s.status === "approved") {
      await db.insert(transactions).values({
        userId: s.sharer,
        type: "earning",
        amountCents: camp.perShareCents,
        campaignId: s.campaign,
        note: `Paid share · “${camp.title}”`,
        createdAt: new Date(createdAt.getTime() + 2 * HOUR),
      });
    }
  }

  // hackcamp — completed campaign with 24 approved filler shares
  for (const f of fillers) {
    const createdAt = ago(4 + Math.random() * 3);
    await db.insert(submissions).values({
      campaignId: hackcamp.id,
      sharerId: f.id,
      status: "approved",
      proofImageUrl: "/images/campaigns/finals-tutoring.jpg",
      note: "Shared to status + LinkedIn.",
      submittedAt: createdAt,
      reviewedAt: new Date(createdAt.getTime() + 3 * HOUR),
      createdAt,
    });
    await db.insert(transactions).values({
      userId: f.id,
      type: "earning",
      amountCents: 50,
      campaignId: hackcamp.id,
      note: "Paid share · “HackCamp 2026 · Early bird tickets”",
      createdAt: new Date(createdAt.getTime() + 3 * HOUR),
    });
  }

  /* -------------------------------- reviews ------------------------------ */

  const subOf = (campaignId: string, sharerId: string) =>
    insertedSubs.find((s) => s.campaignId === campaignId && s.sharerId === sharerId)!;

  await db.insert(reviews).values([
    { campaignId: neonRiot.id, submissionId: subOf(neonRiot.id, tunde.id).id, reviewerId: kemi.id, revieweeId: tunde.id, rating: 5, comment: "Perfect caption, posted fast.", createdAt: ago(1) },
    { campaignId: neonRiot.id, submissionId: subOf(neonRiot.id, sarah.id).id, reviewerId: kemi.id, revieweeId: sarah.id, rating: 4, comment: "Good story placement.", createdAt: ago(1) },
    { campaignId: kicks.id, submissionId: subOf(kicks.id, alex.id).id, reviewerId: sarah.id, revieweeId: alex.id, rating: 5, comment: "Sneaker pic on story was clean!", createdAt: ago(0) },
    { campaignId: craveCart.id, submissionId: subOf(craveCart.id, alex.id).id, reviewerId: kemi.id, revieweeId: alex.id, rating: 5, comment: null, createdAt: ago(1) },
    { campaignId: craveCart.id, submissionId: subOf(craveCart.id, tunde.id).id, reviewerId: kemi.id, revieweeId: tunde.id, rating: 4, comment: null, createdAt: ago(1) },
    { campaignId: tutoring.id, submissionId: subOf(tutoring.id, zara.id).id, reviewerId: mike.id, revieweeId: zara.id, rating: 5, comment: "Great reach on LinkedIn.", createdAt: ago(1) },
    { campaignId: tutoring.id, submissionId: subOf(tutoring.id, tunde.id).id, reviewerId: mike.id, revieweeId: tunde.id, rating: 4, comment: null, createdAt: ago(1) },
    { campaignId: midnight.id, submissionId: subOf(midnight.id, tunde.id).id, reviewerId: mike.id, revieweeId: tunde.id, rating: 5, comment: "TikTok got 2k views already.", createdAt: ago(0) },
    { campaignId: thrift.id, submissionId: subOf(thrift.id, tunde.id).id, reviewerId: sarah.id, revieweeId: tunde.id, rating: 4, comment: null, createdAt: ago(0) },
  ]);

  /* ------------------------------ withdrawal ----------------------------- */

  await db.insert(transactions).values([
    { userId: tunde.id, type: "withdrawal", status: "pending", amountCents: -180, note: "Withdraw · Mobile money · +234 801 234 5678", createdAt: new Date(Date.now() - 5 * HOUR) },
    { userId: alex.id, type: "withdrawal", status: "completed", amountCents: -610, note: "Withdraw · Bank · **** 7642 · Chase", createdAt: ago(6) },
  ]);

  /* ------------------------------ dispute -------------------------------- */

  await db.insert(disputes).values({
    submissionId: subOf(neonRiot.id, zara.id).id,
    reporterId: zara.id,
    reason: "My story stayed up the full 24 hours and the screenshot shows the correct caption — please re-check.",
    createdAt: new Date(Date.now() - 6 * HOUR),
  });

  /* ----------------------------- notifications ---------------------------- */

  await db.insert(notifications).values([
    { userId: alex.id, title: "Proof approved — you got paid", body: "$1.20 was added to your wallet for sharing “Kicks District · Retro 88 Drop”.", type: "payment", link: "/wallet", createdAt: new Date(Date.now() - 16 * HOUR) },
    { userId: alex.id, title: "You received a rating", body: "Sarah Kim rated your share 5/5 on “Kicks District · Retro 88 Drop”.", type: "success", link: "/profile", createdAt: new Date(Date.now() - 15 * HOUR) },
    { userId: alex.id, title: "Proof approved — you got paid", body: "$0.70 was added to your wallet for sharing “Crave Cart · 20% off first order”.", type: "payment", link: "/wallet", createdAt: ago(1) },
    { userId: alex.id, title: "Withdrawal paid", body: "$6.10 has been sent to your account.", type: "payment", link: "/wallet", read: true, createdAt: ago(6) },
    { userId: kemi.id, title: "Campaign is live", body: "“Neon Riot — Freshers' Rave” is now live on the marketplace.", type: "success", link: `/campaigns/${neonRiot.id}`, read: true, createdAt: ago(2) },
    { userId: kemi.id, title: "Slot claimed", body: `Tunde Adebayo reserved a share slot on “Neon Riot — Freshers' Rave”.`, type: "info", link: `/campaigns/${neonRiot.id}`, read: true, createdAt: ago(2) },
    { userId: kemi.id, title: "New proof to review", body: `Alex Carter submitted proof of sharing for “Neon Riot — Freshers' Rave”.`, type: "info", link: `/campaigns/${neonRiot.id}`, createdAt: new Date(Date.now() - 5 * HOUR) },
    { userId: kemi.id, title: "Campaign completed", body: "Every slot on “HackCamp 2026 · Early bird tickets” was approved. Nice work!", type: "success", link: `/campaigns/${hackcamp.id}`, read: true, createdAt: ago(1) },
    { userId: tunde.id, title: "Withdrawal requested", body: "$1.80 is on its way — payouts are reviewed by our team shortly.", type: "payment", link: "/wallet", createdAt: new Date(Date.now() - 5 * HOUR) },
    { userId: admin.id, title: "New dispute opened", body: "A dispute was opened on campaign “Neon Riot — Freshers' Rave”.", type: "warning", link: "/admin", createdAt: new Date(Date.now() - 6 * HOUR) },
  ]);

  /* --------------------------------- kpi fix-ups -------------------------- */
  // keep user counters honest after seeding
  const { sql, eq } = await import("drizzle-orm");
  for (const u of [alex, tunde, sarah, zara, ...fillers]) {
    const [earned] = await db
      .select({ n: sql<number>`count(*)` })
      .from(submissions)
      .where(sql`${submissions.sharerId} = ${u.id} and ${submissions.status} = 'approved'`);
    const [rated] = await db
      .select({ n: sql<number>`count(*)`, avg: sql<number>`coalesce(avg(${reviews.rating}) * 100, 0)` })
      .from(reviews)
      .where(eq(reviews.revieweeId, u.id));
    await db
      .update(users)
      .set({
        sharesCompleted: Number(earned?.n ?? 0),
        ratingCount: Number(rated?.n ?? 0),
        ratingAvg: Math.round(Number(rated?.avg ?? 0)),
      })
      .where(eq(users.id, u.id));
  }

  console.log("Seed complete:");
  console.log(`  users: ${7 + fillers.length}, campaigns: 7, submissions: ${16 + fillers.length}`);
  console.log("  logins → kemi@repost.app (creator) · alex@repost.app (sharer) · admin@repost.app — pw: repost123");
}

main()
  .then(() => process.exit(0))
  .catch((e) => {
    console.error(e);
    process.exit(1);
  });
