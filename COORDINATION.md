# COORDINATION.md — Burt ↔ Dex Task Queue
**Last Updated:** 2026-02-13 03:40 UTC
**Project:** Command Center Redesign v2.0

---

## CONTEXT

Alex wants the Command Center polished to be extremely professional:
- NO emojis, icons, or stickers
- Clean, executive-style design (Bloomberg/Stripe aesthetic)
- Mobile-first (he's often on the road)
- Superior support system (Dex may power live chat later)

**Design System:** See `DESIGN-SYSTEM.md` in this directory — this is the source of truth.

**Repo:** The Command Center is at `/home/ubuntu/clawd/loop/loop-dashboard/` (Burt's server) 
but Dex should work in `C:\dev\loop\clawd\loop-dashboard\` if cloned locally.

**Deployment:** Vercel at https://loop-dashboard-three.vercel.app

---

## ACTIVE TASK

**Task ID:** CC-001
**Assigned:** 2026-02-13 03:40 UTC
**Owner:** Dex
**Priority:** HIGH

### Task: Implement Design System Foundation

**Objective:** Strip all emojis from the Command Center and implement the new muted, professional color palette.

**Deliverables:**
1. Create `src/styles/design-system.css` with CSS variables from DESIGN-SYSTEM.md
2. Update `src/layouts/DashboardLayout.astro`:
   - Remove all emoji characters
   - Apply new color variables
   - Update navigation to be text-only (no emoji prefixes)
3. Create `src/components/ui/StatusDot.astro`:
   - Small colored circle component for status indicators
   - Props: color (success/warning/error/info/neutral), size (sm/md)
4. Create `src/components/ui/Badge.astro`:
   - Clean status badge component
   - Props: variant (success/warning/error/info/neutral), text
5. Update `src/pages/index.astro` (Overview tab only for now):
   - Replace all emoji with StatusDot or Badge components
   - Apply new typography classes
   - Ensure mobile responsiveness

**Acceptance Criteria:**
- [ ] Zero emoji characters in DashboardLayout and index.astro
- [ ] New color palette visible throughout
- [ ] StatusDot and Badge components working
- [ ] Mobile view tested (responsive)
- [ ] `npm run build` passes without errors

**Status:** NOT_STARTED

**Notes:** 
- Reference DESIGN-SYSTEM.md for all color values and component specs
- Keep existing functionality — this is visual polish only
- Test on mobile viewport before marking complete

---

## QUEUE (Next Up)

### CC-002: Update Remaining Pages
- Strip emojis from all other pages (support, trading, treasury, etc.)
- Apply consistent styling
- **Blocked by:** CC-001

### CC-003: Mobile Navigation Redesign  
- Bottom tab bar for mobile
- Swipeable sections
- Touch-optimized
- **Blocked by:** CC-001

### CC-004: Support Page Redesign
- Prepare for Dex live chat integration
- Clean ticket queue UI
- Chat panel layout
- **Blocked by:** CC-002

### CC-005: Trading Dashboard Polish
- Real-time data display
- Clean charts
- Survival status without emoji
- **Blocked by:** CC-002

---

## COMPLETED

(none yet)

---

## COMMUNICATION

**Burt → Dex:** Updates via this file (pushed via SSH)
**Dex → Burt:** Update the Status field and Notes in this file
**Escalation:** If blocked, add to BLOCKED section with details

When completing a task:
1. Move task to COMPLETED section
2. Add completion timestamp
3. Note any issues or follow-ups needed
4. Commit and push changes

---

## BLOCKERS

(none currently)

---
