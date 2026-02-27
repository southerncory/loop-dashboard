# Loop Command Center Architecture

## Astro Islands Architecture

```mermaid
flowchart TB
    subgraph Server["Server (Build Time)"]
        Astro["Astro Pages"]
        Layouts["Layouts"]
        Static["Static HTML"]
    end

    subgraph Client["Client (Runtime)"]
        Islands["React Islands"]
        Hydration["Partial Hydration"]
    end

    subgraph Data["Data Layer"]
        EdgeFn["Edge Functions"]
        Supabase["Supabase Client"]
    end

    Astro --> Layouts --> Static
    Static --> Islands
    Islands --> Hydration
    Islands --> Data
```

## Page Structure

```mermaid
flowchart LR
    subgraph Layout["DashboardLayout.astro"]
        Sidebar["Sidebar Nav"]
        Header["Header"]
        Slot["Page Slot"]
    end

    subgraph Pages["Pages (*.astro)"]
        Index["index.astro"]
        Users["users.astro"]
        Merchants["merchants.astro"]
        Treasury["treasury.astro"]
        Loops["loops.astro"]
        OXO["oxo.astro"]
        Solana["solana.astro"]
        Trading["trading.astro"]
        Analytics["analytics.astro"]
        Health["system-health.astro"]
        Support["support.astro"]
        Waitlist["waitlist.astro"]
    end

    Layout --> Pages
    Slot --> Index
    Slot --> Users
    Slot --> Pages
```

## Data Flow

```mermaid
sequenceDiagram
    participant Browser
    participant Astro as Astro Page
    participant Island as React Island
    participant Edge as Edge Function
    participant DB as PostgreSQL

    Browser->>Astro: Request page
    Astro->>Browser: Return static HTML
    Browser->>Island: Hydrate React
    Island->>Edge: Fetch data
    Edge->>DB: Query with service key
    DB->>Edge: Return data
    Edge->>Island: JSON response
    Island->>Browser: Render data table
```

## Authentication

```mermaid
flowchart TB
    subgraph Login["Login Flow"]
        LoginPage["login.astro"]
        SupaAuth["Supabase Auth"]
        Whitelist["Admin Whitelist"]
    end

    subgraph Protected["Protected Pages"]
        Check["Check Session"]
        Redirect["Redirect to Login"]
        Render["Render Page"]
    end

    LoginPage --> SupaAuth
    SupaAuth --> Whitelist
    Whitelist -->|"allowed"| Protected
    Whitelist -->|"denied"| LoginPage
    Check -->|"valid"| Render
    Check -->|"invalid"| Redirect
```

## React Islands

Interactive components that hydrate on the client:

```mermaid
flowchart TB
    subgraph Islands["React Islands"]
        DataTable["DataTable<br/>(sorting, filtering)"]
        Charts["Charts<br/>(recharts)"]
        RefreshBtn["Refresh Button<br/>(re-fetch data)"]
        Search["Search Input<br/>(filter data)"]
        Modal["Modal Dialogs<br/>(confirmations)"]
    end

    subgraph Static["Static Content"]
        Headers["Page Headers"]
        Nav["Navigation"]
        Cards["Metric Cards"]
    end

    Static --> HTML["Pure HTML/CSS"]
    Islands --> Hydration["client:load"]
```

## Edge Function Integration

| Page | Edge Function | Data |
|------|---------------|------|
| Dashboard | `dashboard-status` | KPIs, totals |
| Users | `users-status` | User list, balances |
| Merchants | `merchants-status` | Merchant list, pools |
| Treasury | `treasury-action` | Balances, positions |
| Loops | `loops-status` | Loop metrics |
| OXO | `oxo-status` | Token metrics |
| Analytics | `analytics-status` | Growth data |
| Waitlist | `waitlist-status` | Signups |

## Security Model

```mermaid
flowchart TB
    subgraph Public["Public"]
        Login["Login Page"]
    end

    subgraph Protected["Protected (Auth Required)"]
        All["All Other Pages"]
    end

    subgraph Backend["Backend Access"]
        ServiceKey["Service Role Key"]
        BypassRLS["Bypass RLS"]
    end

    Login --> SupaAuth["Supabase Auth"]
    SupaAuth -->|"session"| Protected
    Protected -->|"API calls"| ServiceKey
    ServiceKey --> BypassRLS
    BypassRLS --> DB[(Database)]
```

## Design Tokens

```css
/* Command Center Dark Theme */
--bg-primary: #0f1419;
--bg-secondary: #1a1f26;
--bg-tertiary: #252b33;

--text-primary: #e7e9ea;
--text-secondary: #71767b;
--text-muted: #536471;

--accent-green: #00ba7c;
--accent-red: #f4212e;
--accent-blue: #1d9bf0;
--accent-gold: #ffd700;

--border: #2f3336;
--border-light: #3d4349;
```

## Build Output

```
dist/
├── index.html          # Dashboard
├── users/index.html    # Users page
├── merchants/...
├── treasury/...
├── _astro/
│   ├── client.xxxxx.js  # React islands bundle
│   └── hoisted.xxxxx.js # Shared JS
└── assets/
    └── styles.xxxxx.css # Tailwind output
```

Fully static output — can be served from any CDN.
