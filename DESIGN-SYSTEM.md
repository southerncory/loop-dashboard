# Loop Command Center — Design System v2.0

## Philosophy
Executive operations hub. Bloomberg meets Stripe. Information-dense, not decorative.
Mobile-first. Professional. Zero emojis.

---

## Colors

### Primary Palette (Muted & Professional)
```css
/* Backgrounds */
--bg-primary: #0f1419;      /* Near black - main bg */
--bg-secondary: #1a2028;    /* Cards, panels */
--bg-tertiary: #242d38;     /* Hover states, inputs */
--bg-elevated: #2d3748;     /* Dropdowns, modals */

/* Borders */
--border-subtle: #2d3748;
--border-default: #3d4a5c;
--border-strong: #4a5a6d;

/* Text */
--text-primary: #f1f5f9;    /* Headings, important */
--text-secondary: #94a3b8;  /* Body text */
--text-muted: #64748b;      /* Labels, hints */
--text-disabled: #475569;
```

### Status Colors (Muted Variants)
```css
/* Success/Positive */
--status-success: #22c55e;
--status-success-muted: #166534;
--status-success-bg: rgba(34, 197, 94, 0.1);

/* Warning/Caution */
--status-warning: #f59e0b;
--status-warning-muted: #b45309;
--status-warning-bg: rgba(245, 158, 11, 0.1);

/* Error/Critical */
--status-error: #ef4444;
--status-error-muted: #b91c1c;
--status-error-bg: rgba(239, 68, 68, 0.1);

/* Info/Neutral */
--status-info: #3b82f6;
--status-info-muted: #1d4ed8;
--status-info-bg: rgba(59, 130, 246, 0.1);

/* In Progress */
--status-progress: #a855f7;
--status-progress-muted: #7e22ce;
--status-progress-bg: rgba(168, 85, 247, 0.1);
```

### Accent (Use Sparingly)
```css
--accent-primary: #10b981;   /* Loop green - CTAs only */
--accent-gold: #d4af37;      /* Premium indicators */
```

---

## Typography

### Font Stack
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
--font-mono: 'JetBrains Mono', 'SF Mono', Consolas, monospace;
```

### Scale
```css
--text-xs: 0.75rem;    /* 12px - labels, hints */
--text-sm: 0.875rem;   /* 14px - body small */
--text-base: 1rem;     /* 16px - body */
--text-lg: 1.125rem;   /* 18px - subheadings */
--text-xl: 1.25rem;    /* 20px - card titles */
--text-2xl: 1.5rem;    /* 24px - section titles */
--text-3xl: 1.875rem;  /* 30px - page titles */
```

### Usage Rules
- **Page titles:** text-2xl or text-3xl, font-semibold, text-primary
- **Section headers:** text-lg, font-medium, text-primary
- **Card titles:** text-base, font-medium, text-primary
- **Body:** text-sm, font-normal, text-secondary
- **Labels:** text-xs, font-medium, text-muted, uppercase tracking-wide
- **Data/Numbers:** font-mono, tabular-nums
- **Timestamps:** font-mono, text-xs, text-muted

---

## Spacing

### Scale (8px base)
```css
--space-1: 0.25rem;   /* 4px */
--space-2: 0.5rem;    /* 8px */
--space-3: 0.75rem;   /* 12px */
--space-4: 1rem;      /* 16px */
--space-5: 1.25rem;   /* 20px */
--space-6: 1.5rem;    /* 24px */
--space-8: 2rem;      /* 32px */
--space-10: 2.5rem;   /* 40px */
--space-12: 3rem;     /* 48px */
```

### Component Spacing
- **Card padding:** space-4 (mobile), space-6 (desktop)
- **Section gaps:** space-6 (mobile), space-8 (desktop)
- **Element gaps within cards:** space-3 or space-4
- **Inline gaps:** space-2

---

## Components

### Cards
```css
.card {
  background: var(--bg-secondary);
  border: 1px solid var(--border-subtle);
  border-radius: 8px;  /* Not too rounded */
  padding: var(--space-4);
}

.card:hover {
  border-color: var(--border-default);
}

/* No shadows - keep flat */
```

### Stat Cards
```html
<div class="stat-card">
  <span class="stat-label">OPEN TICKETS</span>
  <span class="stat-value">12</span>
  <span class="stat-change positive">+3 today</span>
</div>
```
```css
.stat-label {
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

.stat-value {
  font-family: var(--font-mono);
  font-size: var(--text-2xl);
  font-weight: 600;
  color: var(--text-primary);
}

.stat-change {
  font-size: var(--text-xs);
  color: var(--text-muted);
}

.stat-change.positive { color: var(--status-success); }
.stat-change.negative { color: var(--status-error); }
```

### Status Badges
```css
.badge {
  display: inline-flex;
  align-items: center;
  padding: 0.25rem 0.5rem;
  font-size: var(--text-xs);
  font-weight: 500;
  border-radius: 4px;
  text-transform: uppercase;
  letter-spacing: 0.025em;
}

.badge-success {
  background: var(--status-success-bg);
  color: var(--status-success);
}

.badge-warning {
  background: var(--status-warning-bg);
  color: var(--status-warning);
}

.badge-error {
  background: var(--status-error-bg);
  color: var(--status-error);
}

.badge-info {
  background: var(--status-info-bg);
  color: var(--status-info);
}

.badge-neutral {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
}
```

### Buttons
```css
.btn-primary {
  background: var(--accent-primary);
  color: white;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: opacity 0.15s;
}

.btn-primary:hover {
  opacity: 0.9;
}

.btn-secondary {
  background: var(--bg-tertiary);
  color: var(--text-secondary);
  border: 1px solid var(--border-default);
}

.btn-ghost {
  background: transparent;
  color: var(--text-secondary);
}

.btn-ghost:hover {
  background: var(--bg-tertiary);
}
```

### Tables
```css
.table {
  width: 100%;
  font-size: var(--text-sm);
}

.table th {
  text-align: left;
  font-size: var(--text-xs);
  font-weight: 500;
  color: var(--text-muted);
  text-transform: uppercase;
  letter-spacing: 0.05em;
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
}

.table td {
  padding: var(--space-3) var(--space-4);
  border-bottom: 1px solid var(--border-subtle);
  color: var(--text-secondary);
}

.table tr:hover td {
  background: var(--bg-tertiary);
}

/* Numeric columns */
.table td.numeric {
  font-family: var(--font-mono);
  text-align: right;
}
```

### Navigation (Mobile-First)
```css
/* Mobile: Bottom tab bar */
@media (max-width: 768px) {
  .nav-mobile {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    background: var(--bg-secondary);
    border-top: 1px solid var(--border-subtle);
    display: flex;
    justify-content: space-around;
    padding: var(--space-2) 0;
    z-index: 50;
  }
  
  .nav-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: var(--space-2);
    color: var(--text-muted);
    font-size: var(--text-xs);
  }
  
  .nav-item.active {
    color: var(--accent-primary);
  }
}

/* Desktop: Sidebar or top bar */
@media (min-width: 769px) {
  .nav-desktop {
    /* Horizontal tabs or sidebar */
  }
}
```

---

## Icon Replacement Guide

Instead of emojis, use:
- **Color dots** for status (small circles)
- **Typography weight** for emphasis
- **Indentation/borders** for hierarchy
- **Subtle SVG icons** if needed (Lucide or Heroicons, stroke-width: 1.5)

| Old (Emoji) | New (Clean) |
|-------------|-------------|
| ✅ Done | Green dot + "Complete" |
| 🔄 In Progress | Amber dot + "In Progress" |
| ⚠️ Warning | Amber background bar |
| 🚀 Launch | Bold text + accent underline |
| 📋 Tasks | Section header only |
| ✈️ Trip | "FLIGHT" label badge |
| 💰 Revenue | $ prefix, green if positive |

---

## Mobile Breakpoints

```css
/* Mobile first */
@media (min-width: 640px) { /* sm */ }
@media (min-width: 768px) { /* md */ }
@media (min-width: 1024px) { /* lg */ }
@media (min-width: 1280px) { /* xl */ }
```

### Mobile Considerations
- Touch targets minimum 44x44px
- No hover-only interactions
- Swipeable horizontal tabs
- Collapsible sections default closed on mobile
- Bottom navigation bar
- Pull-to-refresh where applicable

---

## Tailwind Mappings

If using Tailwind, here are the class equivalents:

```
bg-primary     → bg-[#0f1419]
bg-secondary   → bg-slate-800 (approximate)
bg-tertiary    → bg-slate-700
text-primary   → text-slate-100
text-secondary → text-slate-400
text-muted     → text-slate-500
border-subtle  → border-slate-700
font-mono      → font-mono
```

---

## File Structure

```
src/
├── styles/
│   └── design-system.css    ← CSS variables
├── components/
│   ├── ui/
│   │   ├── Card.astro
│   │   ├── StatCard.astro
│   │   ├── Badge.astro
│   │   ├── Button.astro
│   │   ├── Table.astro
│   │   └── StatusDot.astro
│   └── layout/
│       ├── MobileNav.astro
│       └── DesktopNav.astro
└── layouts/
    └── DashboardLayout.astro  ← Updated with new system
```

---

## Implementation Priority

1. **Create design-system.css** with variables
2. **Update DashboardLayout.astro** — new nav, remove emojis
3. **Create reusable components** — StatCard, Badge, StatusDot
4. **Update index.astro** — Overview tab first
5. **Update remaining pages** one by one

---

*This document is the source of truth for Command Center visual design.*
