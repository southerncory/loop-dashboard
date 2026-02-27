# Loop Command Center

Internal admin dashboard for monitoring and managing the Loop ecosystem.

[![Astro](https://img.shields.io/badge/Astro-5-FF5D01?logo=astro)](https://astro.build)
[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://react.dev)
[![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com)
[![License](https://img.shields.io/badge/License-Proprietary-red)](./LICENSE)

## What is This?

The Command Center is the internal operations dashboard for Loop. It provides a unified view of the entire ecosystem — users, merchants, transactions, treasury, and system health. Built for the founding team to monitor growth and respond to issues in real-time.

**Key Features:**
- 👥 **Users** — User list, profiles, balances, activity
- 🏪 **Merchants** — Merchant accounts, pool status, integrations
- 💰 **Treasury** — Real-time treasury balance, DeFi positions, yield tracking
- 🗺️ **Loops** — Geographic micro-economies, membership, velocity
- 📊 **Analytics** — Growth metrics, transaction volume, retention
- ⚙️ **System Health** — Database status, edge function logs, error tracking
- 🤖 **Trading** — Burt trading system status and performance (FreqTrade)
- ☀️ **Solana** — On-chain treasury, token metrics, staking

## Screenshots

*Internal tool — no public screenshots*

## Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [Astro 5](https://astro.build) (Static + Islands) |
| UI Components | React 19 (hydrated islands) |
| Styling | Tailwind CSS 4 |
| Backend | [Supabase](https://supabase.com) Edge Functions |
| Auth | Supabase Auth (email/password) |
| Charts | Custom SVG (lightweight) |

## Getting Started

### Prerequisites

- **Node.js** 18+ and npm 9+

### Installation

```bash
# Clone the repository
git clone https://github.com/southerncory/loop-dashboard.git
cd loop-dashboard

# Install dependencies
npm install
```

### Environment Variables

Create a `.env` file in the project root:

```bash
# Supabase (required)
PUBLIC_SUPABASE_URL=https://your-project.supabase.co
PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Optional: FreqUI for trading tab
VITE_FREQUI_URL=https://your-frequi-instance.com
```

### Running Locally

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

The dashboard runs at `http://localhost:4321` by default.

## Project Structure

```
loop-dashboard/
├── src/
│   ├── pages/               # Route pages (Astro components)
│   │   ├── index.astro      # Dashboard home
│   │   ├── users.astro      # User management
│   │   ├── merchants.astro  # Merchant management
│   │   ├── transactions.astro
│   │   ├── treasury.astro   # Treasury overview
│   │   ├── loops.astro      # Loop micro-economies
│   │   ├── oxo.astro        # OXO token metrics
│   │   ├── solana.astro     # On-chain data
│   │   ├── trading.astro    # Burt trading system
│   │   ├── analytics.astro  # Growth metrics
│   │   ├── system-health.astro
│   │   ├── support.astro    # Support tickets
│   │   ├── waitlist.astro   # Waitlist management
│   │   ├── settings.astro
│   │   └── login.astro
│   ├── layouts/
│   │   ├── Layout.astro     # Base HTML layout
│   │   └── DashboardLayout.astro  # Sidebar + header
│   └── components/          # React islands (interactive)
├── public/                  # Static assets
└── astro.config.mjs         # Astro configuration
```

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     Loop Command Center                      │
├─────────────────────────────────────────────────────────────┤
│  Astro Pages (Static)       │  React Islands (Interactive)  │
│  - Fast initial load        │  - Data tables with sort      │
│  - SEO-friendly             │  - Real-time updates          │
│  - Minimal JS by default    │  - Charts and graphs          │
├─────────────────────────────────────────────────────────────┤
│                     Supabase Client                          │
│  - Direct DB queries (RLS)  │  - Edge Function calls         │
└─────────────────────────────────────────────────────────────┘
                              │
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Supabase Backend                          │
│  Edge Functions:                                             │
│  - dashboard-status    - treasury-action                     │
│  - waitlist-status     - loops-status                        │
│  - users-status        - merchants-status                    │
└─────────────────────────────────────────────────────────────┘
```

## Key Pages

| Page | Purpose |
|------|---------|
| **Dashboard** | High-level KPIs — users, merchants, treasury, transactions |
| **Users** | Full user list, search, balance details, activity history |
| **Merchants** | Merchant accounts, pool balances, POS connection status |
| **Treasury** | Aggregate treasury balance, DeFi positions, yield tracking |
| **Loops** | Geographic micro-economies — Miami, etc. |
| **OXO** | Token metrics, bonding curve status, holder distribution |
| **Solana** | On-chain treasury, Squads multi-sig, staking positions |
| **Trading** | Burt trading system — FreqTrade integration, P&L |
| **Analytics** | Growth charts, cohort analysis, retention metrics |
| **System Health** | Database status, migration tracking, error logs |
| **Support** | Support ticket queue, AI response history |
| **Waitlist** | Pre-launch signups, invite management |

## Design System

The Command Center follows a distinct dark theme:

```css
/* Background */
--bg-primary: #0f1419;
--bg-secondary: #1a1f26;

/* Text */
--text-primary: #e7e9ea;
--text-secondary: #71767b;

/* Accents */
--accent-green: #00ba7c;
--accent-red: #f4212e;
--accent-blue: #1d9bf0;
```

**Design Principles:**
- No emojis in data displays (professional aesthetic)
- Monospace fonts for numbers and IDs
- High information density
- Minimal animations

## Deployment

### Vercel (Recommended)

```bash
# Install Vercel CLI
npm install -g vercel

# Deploy
vercel --prod
```

### Manual Build

```bash
npm run build
# Output in dist/ — can be served statically
```

## Authentication

Access is restricted to authorized users only. Authentication is handled via Supabase Auth with email/password. The login page checks against a whitelist of admin emails.

## Related Repositories

| Repository | Description |
|------------|-------------|
| [loop-app-native](https://github.com/southerncory/loop-app-native) | Consumer mobile app |
| [loop-merchant](https://github.com/southerncory/loop-merchant) | Merchant portal |
| [OAR-Technologies-Inc](https://github.com/southerncory/OAR-Technologies-Inc) | Supabase backend |
| [looplocal-marketing](https://github.com/southerncory/looplocal-marketing) | Marketing website |

## Live URL

- **Production**: [command.looplocal.io](https://command.looplocal.io) (auth required)

## License

Proprietary — © 2026 OAR Technologies Inc. All rights reserved.
