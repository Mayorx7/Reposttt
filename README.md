# Repost

**The paid-repost marketplace.** Brands and students pay real people to share their content to WhatsApp Status, Instagram Stories, TikTok, X, Facebook, and LinkedIn — with screenshot proof before a cent leaves escrow.

Organic reach, engineered. No bots. No fake impressions. Just thousands of real people sharing to the only audiences that trust them — their friends.

## Tech Stack

This project was recently migrated from a static HTML/Vanilla JS multi-page application to a modern Single Page Application (SPA).

- **Framework**: [React](https://react.dev/) 18
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router v6](https://reactrouter.com/)
- **Styling**: Vanilla CSS (Original design system preserved)

## Project Structure

- `/src/pages/` - Contains all route views (Landing, Feed, Dashboard, Campaign creation, Profile, Wallet, etc.)
- `/src/components/` - Shared UI components (`AppShell`, `UI` widgets)
- `/src/data.js` - Centralized mock data layer containing sample campaigns, users, transactions, and helper utilities.
- `/src/index.css` - Global CSS containing the full design system, tokens, and responsive rules.

## Getting Started

First, make sure you have [Node.js](https://nodejs.org/) installed.

1. Clone the repository and navigate into the project directory:
   ```bash
   git clone https://github.com/Mayorx7/Reposttt.git
   cd Reposttt
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:5173](http://localhost:5173) in your browser to view the application.

## Features Overview

- **Landing Page**: Animated hero, live campaign scroller, and dynamic statistics.
- **Creator Studio**: Dashboard to track active campaigns, escrow balances, and review submitted screenshot proofs.
- **Sharer Feed**: Live marketplace of available sharing gigs, filterable by category and search.
- **Campaign Flow**: Dynamic campaign creation with live budget/fee calculators.
- **Wallet**: Financial tracking, mock deposits, and withdrawals.
- **Jobs & Profile**: Gig management and user identity settings.

## License

ISC
