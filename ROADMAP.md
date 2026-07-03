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

## Phase 2 — Demo depth (SHIPPED, except where noted)

- [x] **Approve/disapprove workflow**: "Send for approval" routes the briefing to the
  company's approver (respecting PTO — Solera's routes past Ray to the owner), the
  approval comes back with their reply, actions release, and the audit trail records
  both ends. Notifications track the whole arc.
- [x] **Escalation actions**: "Escalate ↑" on team threads and inside every alert's
  evidence drawer — walks the manager chain, notes PTO routing, notifies, audits.
- [x] **Department oversight & KPI dashboards**: new Departments screen — per-dept
  scorecards with status, head, oversight assignments ("oversees / overseen by",
  including Meridian's unowned Legal gap), three KPIs each, and open-issue notes.
- [x] **Nadir questions the data**: invoice #7741's evidence drawer asks "which record
  is wrong?" — dispute the invoice or correct the contract; either answer updates the
  data-quality profile, the audit trail, and what Nadir trusts going forward.
- [x] **Drill-down everywhere (v1)**: every alert now opens an evidence drawer — the
  sensor trend, the contract line, the incident file — with owner, escalation, and
  actions attached. v2: make every KPI and graph edge a door too.
- [x] **Expandable fusion graph (one level)**: nodes with a "+" chip unfold into
  components (Machines → the three lines; Locations → the six sites; Parts → V-221 /
  TI-88 / seal batch). v2: recurse to stations/serials.
- [ ] **Spot checks / confirmations**: system-generated checklists from past mistakes;
  departments author their own sign-off forms. (Represented in aerospace copy;
  interactive checklist UI still to build.)
- [ ] **More industries**: solo operator, paper & pulp, air defense — plus a 2-week
  looping scenario clock.
- [x] **Settings, users, roles, notifications**: Settings screen (users & access with
  reporting lines, approver identity, notification routing toggles, demo-state reset)
  plus a live notifications bell in the top bar.

## Phase 3 — Real product architecture (demonstrated in-product; production engines still to build)

- [x] **User-owned ontology wiring** (demo): onboarding now has a "Wire connections"
  step — Nadir's inferred relationships shown as branches per object; rename any
  object inline, rename any relationship, re-point where a connection lands, or add
  a wire Nadir missed. Renames carry the wiring along; orphaned wires prompt for a
  new target; every edit hits the audit trail and Nadir learns from the corrections.
- [x] **Ingestion cost discipline** (demo surface): schema scan shows "sampled 3 rows
  per table · full tables never leave your database"; Settings has the usage meter
  splitting spend into CACHED mapping / ALGORITHMIC checks / METERED reconciliation /
  TEMPLATED drafting. The production ingestion engine behind it is the build.
- [x] **Learned formats** (demo surface): Settings format library — each accepted
  format stored with reuse count; generated once, reused free.
- [x] **Security posture** (stated + surfaced): read-only strip in onboarding,
  /security page commitments. Production hardening is the real work.
- [x] **Plug-and-play onboarding / self-teaching**: in-product Guide (6 live moves,
  auto-checked as you do them) + the five-step connect flow. Target stands: first
  insight on a real database in under an hour.
- [ ] **Custom site blueprints**: upload/draw a real floor plan so the 3D ops map is
  *their* site; multi-site rollup (owner → regional → GM all see their slice).
- [x] **Third-party model cost tracking** (demo surface): per-tenant budget bar with
  cap in Settings. Production metering to build.

---

*Order of operations: Phase 1 makes the pitch look enterprise. Phase 2 makes the demo
feel alive in an investor meeting. Phase 3 is what makes customer #1 renew.*
