# Nadir — Product & Site Roadmap

The mapping list: everything the site and demo need, phased. Phase 1 ships in this
commit; later phases are ordered by what makes the demo more convincing per unit of work.

Reference points: **Harvey AI** (enterprise site structure — separate pages, deep footer,
legal/trust pages, restrained typography) and **Scale AI** (interactive homepage — click
something, something happens) and **Bloomberg Terminal** (dense, connected, drillable data).

---

## Phase 1 — Enterprise site structure (THIS COMMIT)

- [x] **Separate marketing pages** instead of one long landing page:
  - `/` Home — hero, live product teaser, problem, interactive how-it-works, moat, CTA
  - `/platform` — the three layers + five steps in depth, ingestion architecture, security posture
  - `/pricing` — tiers + FAQ (incl. how data/token costs stay controlled)
  - `/about` — the company story (from the concept doc)
  - `/careers` — open roles
  - `/contact` — sales/support contact
  - `/security` — read-only access model, encryption, data minimization
  - `/privacy`, `/terms` — real policy pages (jargon/policies the company will need anyway)
- [x] **Harvey-style footer** on every marketing page: logo, four link columns
  (Product / Company / Resources / Legal), copyright, socials. Legitimacy signal.
- [x] **Interactive "How it works"** on the home page (Scale-style): click each of the five
  layers and a live mini-visualization demonstrates it — connection, mapping, graph,
  pain-point engine, compounding.
- [x] **Workspace entry transition** — "Open live workspace" now boots you in with a
  staged connect sequence (connecting → fusing → live) so you *feel* the switch.
- [x] **Workspace at its own URL** (`/workspace`) so it can be linked/bookmarked directly.
- [x] **Two new demo companies** (now five industries switchable via dropdown):
  - **Solera Restaurant Group** (restaurant — everyone understands it). The
    meals-vs-headcount mismatch story now lives HERE, where it makes sense:
    prep sheet says 120 covers, OpenTable says 186 booked.
  - **Keystone Orbital** (space systems — the big end). Launch readiness sign-offs,
    valve qual-test anomaly matching a previous scrub signature, supplier cert lapse
    on a titanium lot, NCR aging. Shows checks-and-balances + audit-trail depth.
- [x] **Fixed Hartwell Pencil Co.** — the meal-order alert never made sense for a pencil
  factory; replaced with a certified-kiln-operator scheduling gap (ADP certs joined
  against Saturday overtime approvals).
- [x] **Escalation chain, v1** — every person in Team & Inbox now shows who they report
  to, and PTO status is surfaced (if the owner is out, Nadir tells you who to go to).

## Phase 2 — Demo depth (next)

- [ ] **Approve/disapprove workflow**: Nadir drafts a briefing → owner approves →
  action executes → audit trail records it. (Send-snapshot should land in the recipient's
  Team & Inbox thread, and their reply should be drafted from what's in their inbox.)
- [ ] **Escalation actions**: "Escalate" button on any alert/thread — walks the manager
  chain (manager → their manager), reassigns, notifies.
- [ ] **Department oversight & KPI dashboards**: assign a department head to oversee
  another; per-department scorecards (QHSE, Finance, Ops, HR) with drill-down.
- [ ] **Nadir questions the data**: when data doesn't reconcile (invoice priced over
  contract, duplicate payment, impossible timestamps), Nadir flags it as *suspect data*,
  asks "is this correct?", and user confirmations build a per-company data-quality
  profile over time. (Seeded in the restaurant demo: invoice #7741 priced 8% over contract.)
- [ ] **Drill-down everywhere**: click an overdue invoice → the invoice, the receipt,
  the contract line it violates. Click a machine → its audit log. Bloomberg-terminal rule:
  every number is a door.
- [ ] **Expandable fusion graph**: click "Machines" → it unfolds into the three lines;
  click a line → stations; progressive disclosure instead of one flat graph.
- [ ] **Spot checks / confirmations**: system-generated checklists from past mistakes
  ("last time this looked like X, Y was missed — did you check Y?"); departments can
  author their own sign-off forms. (Aerospace demo is the natural home.)
- [ ] **More industries**: solo operator, paper & pulp, air defense — plus scenario
  timers (a 2-week looping scenario clock so logging in at 2pm shows what's happening
  at 2pm in that fake company).
- [ ] **Settings, users, roles, notifications**: user management, which areas you
  oversee, alert routing preferences.

## Phase 3 — Real product architecture (pre-customer-#1)

- [ ] **Ingestion cost discipline** (this is the margin): schema-first mapping — read
  table/column names + keys + the 3 most recent rows per table, never full tables,
  through an LLM. Build the join map once, cache it, reuse it. Deterministic
  checks (invoice_id ↔ invoice_id mismatch) run as plain algorithms, not model calls;
  the model is reserved for reconciliation the algorithm can't do.
- [ ] **Learned formats**: once Nadir generates a write-up/PO/report format the company
  accepts, store it as a template — never re-generate (and re-pay for) it.
- [ ] **Security**: read-only DB credentials, per-tenant isolation, no training on
  customer data, audit every read. This is on /security already as a promise;
  it has to be true.
- [ ] **Plug-and-play onboarding**: first customer must connect a database and see a real
  insight in under an hour, guided the whole way — the system must be able to teach
  you how to use itself (in-product guide, not a PDF).
- [ ] **Custom site blueprints**: upload/draw a real floor plan (restaurant layout, plant
  layout) so the 3D ops map is *their* site, not a generic one; multi-site rollup
  (50 restaurants: owner → regional → GM → host all see their slice).
- [ ] **Third-party model cost tracking**: per-tenant token budgets and usage
  metering, since inference is bought, not owned.

---

*Order of operations: Phase 1 makes the pitch look enterprise. Phase 2 makes the demo
feel alive in an investor meeting. Phase 3 is what makes customer #1 renew.*
