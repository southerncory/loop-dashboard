# Loop Merchant Portal - Product Specification

**Version:** 1.0
**Date:** February 1, 2026
**Status:** Draft - Pending Approval

---

## Executive Summary

The Merchant Portal is the primary interface for businesses to join Loop, manage their reward programs, and access customer insights. It supports single-location shops to multi-location chains, with tiered access to premium analytics features.

---

## Table of Contents

1. [User Stories](#user-stories)
2. [Information Architecture](#information-architecture)
3. [Feature Specifications](#feature-specifications)
4. [Tiered Access Model](#tiered-access-model)
5. [Multi-Location Support](#multi-location-support)
6. [Data Model](#data-model)
7. [Technical Requirements](#technical-requirements)
8. [Screens & Flows](#screens--flows)

---

## User Stories

### Onboarding
- As a merchant, I can sign up with my email and verify my business
- As a merchant, I can add my business details and logo
- As a merchant, I can add multiple store locations
- As a merchant, I can connect a payment method to seed my reward pool

### Daily Operations
- As a merchant, I can award rewards to customers by entering their phone number
- As a merchant, I can process reward redemptions
- As a merchant, I can view today's transactions at a glance
- As a staff member, I can perform POS operations with limited access

### Pool Management
- As a merchant, I can deposit funds to seed my reward pool
- As a merchant, I can view my pool balance and yield earned
- As a merchant, I can request withdrawals (with cooldown period)
- As a merchant, I can set reward rates (3-9%) per location

### Analytics (Tiered)
- As a Free merchant, I can see basic transaction summaries
- As a Pro merchant, I can see customer visit patterns and insights
- As an Enterprise merchant, I can access advanced segmentation and predictions

### Account Management
- As a merchant, I can upgrade my subscription tier
- As a merchant, I can manage team members and permissions
- As a merchant, I can view invoices and billing history

---

## Information Architecture

```
Merchant Portal
├── Dashboard (Home)
│   ├── Quick Stats
│   ├── Recent Transactions
│   ├── Pool Balance
│   └── Alerts/Notifications
│
├── Locations
│   ├── Location List (cards)
│   ├── Add Location
│   └── Location Detail
│       ├── Profile & Settings
│       ├── Reward Rate (3-9% slider)
│       ├── Operating Hours
│       └── Location-specific Stats
│
├── Transactions
│   ├── Award Rewards (POS)
│   ├── Process Redemption
│   ├── Transaction History
│   └── Export
│
├── Pool Management
│   ├── Balance Overview
│   ├── Deposit Funds
│   ├── Withdrawal Request
│   ├── Yield Earned
│   └── Transaction History
│
├── Analytics (Tiered)
│   ├── Overview
│   ├── Customer Insights [Pro+]
│   ├── Reward Performance [Pro+]
│   ├── Segmentation [Enterprise]
│   └── Predictions [Enterprise]
│
├── Team [Pro+]
│   ├── Team Members
│   ├── Roles & Permissions
│   └── Invite Member
│
├── Settings
│   ├── Business Profile
│   ├── Notification Preferences
│   ├── Security (2FA, Password)
│   ├── API Keys [Enterprise]
│   └── Integrations [Enterprise]
│
├── Billing
│   ├── Current Plan
│   ├── Upgrade/Downgrade
│   ├── Payment Methods
│   └── Invoice History
│
└── Support
    ├── Help Center
    ├── Contact Support
    └── Ticket History
```

---

## Feature Specifications

### 1. Authentication & Onboarding

#### Sign Up Flow
1. Enter email → Receive verification code
2. Set password (min 8 chars, 1 number, 1 special)
3. Business information
   - Legal business name
   - DBA (if different)
   - Business category (dropdown)
   - Tax ID (optional, required for payouts)
4. First location setup
   - Address
   - Phone
   - Operating hours
5. Connect payment method (Stripe)
6. Initial deposit (minimum $100)
7. Set initial reward rate (default 5%)

#### Sign In
- Email + password
- 2FA (optional, encouraged)
- "Remember this device" option
- Password reset via email

### 2. Dashboard

**Quick Stats Cards:**
- Today's transactions (count + value)
- Rewards given today
- Redemptions today
- Current pool balance

**Recent Activity Feed:**
- Last 10 transactions
- New customer signups
- Large transactions flagged

**Alerts:**
- Low pool balance warning (<$500)
- Pending withdrawal status
- Subscription renewal reminder

### 3. Multi-Location Management

#### Location List View
- Card-based grid layout
- Each card shows:
  - Location name/nickname
  - Address
  - Current reward rate
  - Today's transaction count
  - Status (active/paused)
- "Add Location" card at end

#### Add Location Flow
1. Location nickname (e.g., "Newslink - Terminal D")
2. Full address (with autocomplete)
3. Phone number
4. Operating hours
5. Reward rate slider (3-9%)
6. Confirm and activate

#### Location Detail View
- Edit all location info
- **Reward Rate Control**
  - Slider: 3% to 9%
  - Visual indicator of current rate
  - "Higher rates attract more customers"
  - Changes take effect immediately
- Location-specific stats (if Pro+)
- Pause/reactivate location
- Delete location (with confirmation)

### 4. Point of Sale Operations

#### Award Rewards
1. Enter customer phone number (formatted input)
2. Enter transaction amount ($)
3. System calculates reward based on location's rate
4. Confirm button
5. Success screen with:
   - Reward amount given
   - Customer's new balance
   - Optional: Send receipt to customer

#### Process Redemption
1. Enter customer phone number
2. Display customer's available balance
3. Enter redemption amount (up to balance)
4. Confirm button
5. Success screen with:
   - Amount redeemed
   - Customer's remaining balance

**POS Mode (Simplified View):**
- Large buttons optimized for tablets
- Quick switch between Award/Redeem
- Minimal distractions
- Staff can access only this view (if permissions set)

### 5. Pool Management

#### Balance Overview
- Current pool balance
- Pending deposits
- Pending withdrawals
- Yield earned (lifetime + this month)
- Projected monthly yield (based on APY)

#### Deposit Funds
1. Enter amount (min $100)
2. Select payment method
3. Review (show any fees)
4. Confirm
5. Processing → Confirmed (usually instant)

#### Withdrawal Request
1. Enter amount (up to available balance)
2. Show cooldown period (7 days from request)
3. Select destination (bank account)
4. Confirm
5. Status tracking: Requested → Processing → Completed

#### Yield Display
- Current APY (from DeFi allocation)
- Yield earned this month
- Yield history chart
- "Yield is auto-compounded into your pool"

### 6. Analytics

#### Free Tier
- Transaction count (daily/weekly/monthly)
- Total rewards given
- Total redemptions
- Redemption rate %
- Pool balance history

#### Pro Tier ($49/month)
All Free features plus:
- **Customer Insights**
  - Active customers count
  - New vs returning ratio
  - Visit frequency distribution
  - Average transaction value
  - Top 10 customers (by visits or spend)
- **Reward Performance**
  - Reward rate effectiveness
  - Redemption patterns (day of week, time)
  - Average time to redemption
- **Reports**
  - Monthly summary PDF
  - CSV export of transactions
  - Customer list export

#### Enterprise Tier ($199/month)
All Pro features plus:
- **Advanced Segmentation**
  - Customer cohorts (VIP, Regular, At-Risk, Churned)
  - Custom segment builder
  - Segment-specific metrics
- **Predictive Insights**
  - Churn risk scores
  - Recommended actions
  - Optimal reward rate suggestion
- **Multi-Location Analytics**
  - Cross-location comparisons
  - Best performing locations
  - Aggregate reporting
- **API Access**
  - Full REST API
  - Webhooks for transactions
  - Integration with POS systems
- **Dedicated Support**
  - Priority ticket handling
  - Account manager (for $500+/month spend)

### 7. Team Management (Pro+)

#### Roles
- **Owner**: Full access, billing, can delete account
- **Admin**: All features except billing and account deletion
- **Manager**: Locations, transactions, analytics, no settings
- **Staff**: POS operations only (award/redeem)

#### Invite Flow
1. Enter email
2. Select role
3. Select location access (all or specific)
4. Send invite
5. Invitee receives email → Sets password → Access granted

### 8. Billing & Subscription

#### Plan Display
- Current plan with features
- Usage stats (if applicable)
- Next billing date
- "Upgrade" CTA if on Free/Pro

#### Upgrade Flow
1. Select new plan
2. Review price difference
3. Enter/confirm payment method
4. Confirm
5. Immediate access to new features

#### Downgrade
- Takes effect at end of billing period
- Warning about features that will be lost
- Confirmation required

---

## Tiered Access Model

| Feature | Free | Pro ($49/mo) | Enterprise ($199/mo) |
|---------|------|--------------|---------------------|
| Locations | 1 | Up to 5 | Unlimited |
| Award/Redeem | ✅ | ✅ | ✅ |
| Basic Stats | ✅ | ✅ | ✅ |
| Pool Management | ✅ | ✅ | ✅ |
| Customer Insights | ❌ | ✅ | ✅ |
| Reports & Export | ❌ | ✅ | ✅ |
| Team Members | 1 | Up to 5 | Unlimited |
| Advanced Analytics | ❌ | ❌ | ✅ |
| API Access | ❌ | ❌ | ✅ |
| Priority Support | ❌ | ❌ | ✅ |

---

## Multi-Location Support

### Data Structure
```
Merchant (Organization)
└── Locations[]
    ├── Location 1 (Main St)
    │   ├── reward_rate: 5%
    │   ├── transactions[]
    │   └── staff[]
    ├── Location 2 (Airport Terminal D)
    │   ├── reward_rate: 7%
    │   ├── transactions[]
    │   └── staff[]
    └── Location 3 (Mall Kiosk)
        ├── reward_rate: 4%
        ├── transactions[]
        └── staff[]
```


---

## Data Model

### merchants (organizations)
```sql
id UUID PRIMARY KEY
email VARCHAR UNIQUE
password_hash VARCHAR
business_name VARCHAR
dba_name VARCHAR
tax_id VARCHAR
logo_url VARCHAR
subscription_tier ENUM('free', 'pro', 'enterprise')
subscription_status ENUM('active', 'past_due', 'cancelled')
stripe_customer_id VARCHAR
created_at TIMESTAMP
```

### merchant_locations
```sql
id UUID PRIMARY KEY
merchant_id UUID REFERENCES merchants
nickname VARCHAR
address_line1 VARCHAR
address_line2 VARCHAR
city VARCHAR
state VARCHAR
zip VARCHAR
country VARCHAR DEFAULT 'US'
phone VARCHAR
reward_rate DECIMAL(3,2) -- 0.03 to 0.09
is_active BOOLEAN DEFAULT true
created_at TIMESTAMP
```

### merchant_pool_balances
```sql
merchant_id UUID PRIMARY KEY REFERENCES merchants
balance DECIMAL(12,2)
pending_deposits DECIMAL(12,2)
pending_withdrawals DECIMAL(12,2)
lifetime_yield DECIMAL(12,2)
updated_at TIMESTAMP
```

### merchant_transactions
```sql
id UUID PRIMARY KEY
merchant_id UUID REFERENCES merchants
location_id UUID REFERENCES merchant_locations
user_id UUID REFERENCES users
type ENUM('award', 'redeem')
amount DECIMAL(10,2) -- Transaction amount
reward_amount DECIMAL(10,2) -- Cred awarded/redeemed
created_at TIMESTAMP
created_by UUID REFERENCES merchant_team_members
```

### merchant_team_members
```sql
id UUID PRIMARY KEY
merchant_id UUID REFERENCES merchants
email VARCHAR
password_hash VARCHAR
name VARCHAR
role ENUM('owner', 'admin', 'manager', 'staff')
location_access UUID[] -- Array of location_ids, or NULL for all
is_active BOOLEAN DEFAULT true
created_at TIMESTAMP
```

---

## Technical Requirements

### Frontend
- **Framework**: React (consistent with Loop App)
- **Styling**: Tailwind CSS
- **Charts**: Recharts or Chart.js
- **Forms**: React Hook Form + Zod validation
- **State**: React Query for server state

### Backend
- **Database**: Supabase (Postgres)
- **Auth**: Supabase Auth with RLS
- **Payments**: Stripe
- **File Storage**: Supabase Storage (logos)

### Security
- Row Level Security (RLS) on all tables
- Team member access scoped to their merchant
- Staff role restricted to POS operations only
- Rate limiting on sensitive endpoints
- Audit log for financial operations

### Performance
- Dashboard loads in <2s
- Transaction processing <500ms
- Analytics queries cached (refresh every 5 min)

---

## Screens & Flows

### Priority Order for Build

**Phase 1: MVP (Week 1-2)**
1. Sign up / Sign in
2. Business profile setup
3. Single location setup
4. Deposit funds
5. Award rewards (basic POS)
6. Dashboard (basic stats)

**Phase 2: Core Features (Week 3-4)**
7. Redemption flow
8. Transaction history
9. Pool management (deposits, withdrawals)
10. Location management (add/edit)
11. Settings

**Phase 3: Growth Features (Week 5-6)**
12. Multi-location support (full)
13. Team members
14. Basic analytics
15. Subscription/billing

**Phase 4: Premium (Week 7-8)**
16. Pro analytics
17. Enterprise features
18. API
19. Integrations

---

## Open Questions

1. **Minimum deposit amount?** Proposed: $100
2. **Withdrawal cooldown period?** Proposed: 7 days
3. **Reward rate range?** Proposed: 3% - 9%
4. **Pro tier price?** Proposed: $49/month
5. **Enterprise tier price?** Proposed: $199/month
6. **Free tier location limit?** Proposed: 1

---

## Approval

- [ ] Alex approval
- [ ] Technical review
- [ ] Design review

---

*Spec created by Burt | February 1, 2026*
