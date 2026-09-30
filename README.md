# Repost

**The paid-repost marketplace.** Brands and students pay real people to share their content to WhatsApp Status, Instagram Stories, TikTok, X, Facebook and LinkedIn — with screenshot proof before a cent leaves escrow.

## Stack

- **Next.js 16** (App Router, RSC) + React 19, Tailwind CSS v4, Framer Motion
- **PostgreSQL** via Drizzle ORM (node-postgres)
- Custom cookie-session auth (bcrypt-hashed passwords)
- Lucide icons, Sora + Inter type

## Core flows

The system operates through several key processes that facilitate the interaction between creators and sharers:

1. **Campaign Creation**: Creators top up their wallets and create campaigns. Each campaign includes a flyer, caption, selected platforms, budget, and deadline. Once created, the budget is locked in escrow, ensuring that funds are secure until the campaign is completed.

2. **Content Sharing**: Sharers browse the campaign feed using various filters (search, platform, category, etc.) to find campaigns that interest them. They can reserve a slot for a campaign, post the content to their social media platforms, and upload screenshot proof of the post along with an optional link to their share.

3. **Proof Review**: Creators review the submitted proof from sharers. They can approve the proof, which triggers an instant payment to the sharer from the wallet, or reject it with a reason. If rejected, the slot is returned to the pool for other sharers to claim.

4. **Withdrawal Process**: Once sharers have earned money, they can withdraw their earnings to their bank account or mobile money service. An admin is responsible for marking payouts as paid, ensuring a smooth transaction process.

5. **Additional Features**: The system includes features such as star ratings for creators and sharers, in-app notifications, live progress polling, campaign cancellation with automatic escrow refunds, and a report/dispute system for resolving issues. An admin console is also available for managing disputes and approvals.

## Payments

The payment system is integrated through the endpoint `/api/wallet/deposit`. This is where the actual payment processing occurs. The integration can be swapped with a verified Stripe PaymentIntent webhook for card payments or a Paystack charge callback for mobile money and card payments targeted at African users. All amounts are stored as integer cents to avoid floating-point inaccuracies.

1. **Creator** tops up wallet → creates campaign (flyer, caption, platforms, budget, deadline) → escrow locks the budget → campaign goes live in the feed.
2. **Sharer** browses the feed (search / platform / category / sort filters) → reserves a slot → posts to their socials → uploads screenshot proof + optional link.
3. **Creator** reviews proof → approves (wallet pays the sharer instantly) or rejects with a reason (slot returns to the pool).
4. **Sharer** withdraws to bank or mobile money → admin marks payouts paid.
5. Extras: creator→sharer star ratings, in-app notifications, live progress polling, campaign cancel + automatic escrow refund, report/dispute system, admin console.

## Payments (skeleton)

`/api/wallet/deposit` is the integration point: swap the instant-credit stub with a verified Stripe PaymentIntent webhook (cards) or Paystack charge callback (mobile money / cards for African users). Amounts are stored as integer cents everywhere.

## Getting started

```bash
cp .env.example .env        # set DATABASE_URL
npm install
npx drizzle-kit push        # create tables
npx tsx scripts/seed.ts     # demo data
npm run dev
```

### Demo accounts (password: `repost123`)

| Account | Role |
| --- | --- |
| `kemi@repost.app` | Creator with 3 live campaigns + proofs to review |
| `alex@repost.app` | Sharer with earnings, gigs and a wallet balance |
| `admin@repost.app` | Admin console (withdrawal approvals, disputes) |

## Structure

```
src/
  app/
    (app)/            # authenticated app (feed, dashboard, jobs, wallet, …)
    api/              # auth, campaigns, submissions, reviews, wallet, admin, upload
    auth/             # login / signup (split-screen)
    page.tsx          # marketing landing
  components/         # app shell, campaign views, wizard, wallet modals, ui kit
  db/                 # drizzle client + schema
  lib/                # auth sessions, data access, platforms, formatting
scripts/seed.ts       # rich demo seed
```

## Realtime note

Campaign detail pages poll every 5–6s for slot/proof updates. For production realtime, broadcast the same events via Supabase Realtime or Pusher inside the API routes.
