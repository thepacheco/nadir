# Nadir — Operational README

**What this file is:** the definitive description of how Nadir works — every screen, every button, every role, every flow. This is the source of truth for any human or AI agent building on this codebase. If a behavior isn't described here, it isn't designed yet; design it here first, then build it.

**What Nadir is:** an operational intelligence and compliance fusion platform. It connects directly to a company's data sources (databases, ERPs, spreadsheets, documents), maps them into a real-world ontology (Customers, Work Orders, Assets, People, Incidents), builds a live operational graph of how the business actually flows, and layers intelligence on top: compliance monitoring, pain-point prediction, and guided next actions. The reference competitor is Palantir Foundry, scoped for the mid-market. Non-military, US-only at launch, first customers in Georgia.

**Core honesty rule for this codebase:** the current build is a scripted demo. Every AI reply, alert, and mapping is hardcoded in `lib/data.ts`. The single API route reads a dummy CSV. Nothing below should be built as more theater — from this point, every feature listed either works against real data or is explicitly labeled `[DEMO-ONLY]` in code and in the UI. We catch errors now, not in front of a customer.

---

## 1. The Five-Layer Architecture

1. **Connection** — read-only access to the customer's data sources: direct SQL (Postgres, MySQL, SQL Server, Oracle), file upload (CSV/XLSX), document stores (SharePoint-style libraries), and later ERP connectors (SAP, Oracle EBS, Maximo). Read-only is a security promise and a sales feature; it stays that way.
2. **Ontology Mapping** — AI inspects schemas plus a small sample of rows (3–5 per table, never full tables) and proposes what each table represents in the real world, with a confidence score AND an explanation of that score (see §4.6). A human confirms or corrects. Corrections are stored and the system learns from them.
3. **Operational Graph** — objects and relationships form a live map of the business: order in → product out, crew → work order → asset → filing. This graph is the product's spine; every other screen is a view into it.
4. **Intelligence / Pain-Point Engine** — deterministic checks run continuously (interval overdue? threshold crossed? PTO vs. crew minimum? cert expired vs. schedule posted?). LLM calls are reserved for semantic reconciliation and text generation only. Output is directive: "Here's the next bottleneck, here's what caused it last time, here's what to do."
5. **Compounding** — every new source, every human correction, every resolved ticket makes the ontology and predictions sharper for that specific company. This per-customer learning database (Nadir's own database *about* the customer's operation, separate from the customer's data) is the moat and the lock-in.

---

## 2. Users, Roles, and Pricing Model

Every account has a role hierarchy. This is not cosmetic — it drives routing, escalation, visibility, and billing.

- **Owner / Account Admin** — billing, user management, data source authorization, sees everything.
- **IT Admin** — manages connections, credentials, data classification (what AI may read / learn from), security settings. Cannot see financial dashboards unless granted.
- **Department Head** — sees their department's dashboard, inbox, tickets, compliance findings; can assign, escalate, and sign off within their department.
- **Manager / Supervisor** — receives assigned tickets and findings for their team, can resolve with required notes, can escalate up.
- **Member** — sees their own tickets, their department's board, can comment and mark work complete (pending supervisor sign-off where a workflow requires it).
- **Viewer** — read-only dashboards (e.g., a CFO or external auditor seat).

**Pricing structure:** platform fee (covers deterministic monitoring, which is arithmetic, not intelligence) + per-seat fee (target ~$5/user/month — seats are cheap on purpose, because more humans in the system means more corrections, more tickets, more learning, more lock-in) + metered AI usage for semantic reconciliation and generation, surfaced transparently in Settings so customers see exactly where tokens go.

Every user action that matters (confirm mapping, resolve finding, escalate, approve) is written to the audit trail with identity and timestamp.

---

## 3. Onboarding Flow (new account, step by step)

1. **Company profile** — name, industry, **physical address(es)**. The address is not decoration: it drives the Ops Map (see §4.2).
2. **Describe your operation (conversational intake)** — the owner talks/types: "We're a catering production facility, trucks arrive at dock 2, food safety logs live in Excel…" This intake seeds the ontology *before* any database is connected, and it's the entry point for the **No-Database Mode** (§6).
3. **Connect sources** — pick from: direct database (credentials, read-only user enforced and verified), file upload, or "I don't have a database" → No-Database Mode.
4. **Schema scan & mapping** — real inspection (Phase 2+): table list, row counts, sampled rows, proposed object mappings with confidence + reasoning. User confirms, renames, corrects.
5. **Wire connections** — Nadir's inferred relationships shown as editable wiring. Every user action here is validated (see §4.6 checks and balances). Layman-readable: each proposed wire has a plain-English sentence ("Every Work Order points to one Crew via `assigned_crew_id` — 94% of rows match").
6. **Site layout** — from the address, pull the building footprint (Google Maps / OpenStreetMap building polygons). Show it bird's-eye. Then the user **draws their own space**: drag-and-drop zones onto the footprint (Dock, Kitchen, Line 1, Cold Storage, Office). Their apartment, mapped as their apartment — not a generic house. This layout becomes the canvas for live signals (§4.2).
7. **Users & roles** — invite team, assign roles, define reporting lines (this builds the Org Tree, §4.5).
8. **First briefing** — Nadir presents what it found: mapped objects, first flags, and the guided plan.

---

## 4. Screen-by-Screen Specification

### 4.1 Dashboard (Home)
- KPI tiles, alert feed, "start here today" briefing.
- **Custom dashboard builder:** users compose their own dashboard from widgets — any KPI, any graph edge, ticket volume by department, compliance status, site-map signal summary. Widgets are drag-drop, resizable, savable per user and shareable per department. This is what lets a VP answer "how's Department X this week vs. last week" without asking the AI (saving tokens is a design principle, not just a cost tactic).

### 4.2 Ops Map (full rebuild — current version is rejected)
- Current behavior (click → ugly Google camera view of a building) is removed.
- New behavior: bird's-eye 2D/2.5D rendering of the customer's own drawn layout (from onboarding §3.6), built on the real building footprint.
- Live signals render **on the layout**: a temperature excursion glows over Cold Storage, a crew shortage badge sits on the zone where that crew works. Signal marker size is user-adjustable.
- Clicking a zone opens that zone's detail: assets in it, open tickets, live telemetry, people assigned.
- Editable after onboarding: the layout is a living document the customer maintains.
- Technical direction for the coder agent: building footprint via OpenStreetMap/Overpass (free) with Google Maps Platform as fallback; layout editor with a 2D canvas (drag-drop rectangles/polygons with labels); render signals as layers. 3D (three.js) is a later enhancement, not the MVP of this screen.

### 4.3 Fusion Graph
- Current version shows nodes with thin one-line metadata. Insufficient.
- Every node opens a **full detail panel**: derivation history (READ → MAP → LINK steps already modeled in `lib/types.ts`), row counts, freshness, linked tickets, linked findings, linked people, and the sampled evidence behind it.
- Every **edge** is also clickable: what join produced it, match rate, exceptions ("312 work orders have no crew — view them").
- Nodes expand recursively (Machines → Lines → Stations → Serials), not just one level.
- Ontology/mapping visuals get promoted in visual weight site-wide — this is the company's core claim and it should look like it (bolder treatment on the marketing site's ontology and mapping sections too).

### 4.4 Departments (moves ABOVE Team & Inbox in the nav)
- Departments are the organizing unit; team inboxes live **inside** departments.
- Per-department: scorecard (status, head, 3 KPIs), open tickets, open findings, issue history ("this week's issue vs. last week's issue" — a rolling weekly digest per department, auto-generated).
- Oversight view: who oversees whom, unowned gaps flagged (e.g., "Legal has no owner").

### 4.5 Org Tree & Team Inbox
- Org Tree becomes its **own entity/screen**, not an afterthought below the inbox.
- Click any person → their position in the full hierarchy, their manager chain, PTO status, open tickets, open threads.
- **Escalation = ticket creation.** The "Escalate" button no longer just plays an animation. It creates a ticket: title, evidence link, origin, assignee (next person up the chain, PTO-aware routing), due date, status. That ticket is visible to everyone up the chain (supervisor → ops manager → site manager → GM → VP → C-suite), each at their permission level.
- Inbox threads support editing drafts before send, attachments, and show delivery/read state.

### 4.6 Data Sources & Mapping
- Connect → **real** inspection (Phase 2): live schema read, sampled rows, progress states that reflect actual backend work.
- Confidence scores get an explanation drawer: *why* 88%? ("Column names match 'incident' vocabulary; 12% of rows have no date; two candidate object types considered."). Confidence without reasoning is theater.
- **Checks and balances on wiring:** if a user drags a nonsensical connection (joining a date column to a person object), the system validates against sampled data and errors out with a plain-English reason ("These columns share zero overlapping values — this wire can't be right. Did you mean `crew_id`?"). Orphaned wires prompt for re-targeting. Every accepted correction is logged and learned from.
- "Build the graph" must produce a **new artifact** — the operational graph generated from this mapping session — never a redirect to the same static map.

### 4.7 Guidance Plan (Kanban)
- Now / Next / Later columns, each item grounded in data with a "why this order" explanation.
- **Assign** on any item: pick a person (from Org Tree), edit the task before sending, and it sends a real message/ticket to them.
- After assignment: live progress state on the card (assigned → acknowledged → in progress → done pending sign-off → closed). Clicking shows where they are and the thread.
- Graphs/burndown per plan so leadership sees movement, not a static to-do list.

### 4.8 Compliance Monitor
- Findings keep current structure (severity, rule, detail, status) — this screen is working.
- Additions: every open finding has an **owner and routing** ("Holding temperature — open" → routes to Kitchen department head by default, editable). Closing a finding **requires notes** ("what was done") and, where the customer configures it, a supervisor sign-off. Notes land in the audit trail.
- Spot-check/confirmation forms: departments author their own recurring sign-off checklists; Nadir also generates suggested checklists from past incidents ("this failed twice — make it a standing check").

### 4.9 Evidence Drawer
- Keep. Add adjustable signal sizing, and make every KPI and graph edge open an evidence drawer too (drill-down everywhere, v2 of the existing roadmap item).

### 4.10 Settings
- Users & access, reporting lines, approver identity, notification routing.
- **Data classification console (IT Admin):** per source and per folder — `AI may read`, `AI may cite`, `AI may never access`, `retain / purge after inference`. Defaults conservative. This console is a headline security feature, not buried config.
- Usage & cost meter: deterministic checks (flat) vs. LLM calls (metered), per department.

### 4.11 Tickets (new subsystem, underpins 4.4/4.5/4.7/4.8)
- One ticket model serves escalations, plan assignments, compliance remediations, and user-reported issues.
- Fields: origin (alert/finding/plan/manual), evidence links, assignee, department, severity, due, status, thread, resolution notes (required), sign-off (optional per workflow).
- Tickets are the raw material for department dashboards and the weekly digests — and they are training signal for the per-customer learning database.

---

## 5. Nadir's Own Database (the learning layer)

Two databases per customer, strictly separated:
1. **The customer's data** — read-only, never used to train any model, purged from inference memory per the classification console.
2. **Nadir's operational model of the customer** — confirmed mappings, corrected wires, ticket history, resolution patterns, recurring issues, layout, org structure. This is Nadir's asset. It's what makes month 6 smarter than week 1, and it's what a competitor can't copy by cloning the UI.

**Dogfooding requirement:** Nadir runs on Nadir. Our own company (repos, invoices, usage metrics, sales pipeline, compliance obligations) gets an account. If Nadir can't navigate Nadir, the science doesn't work, and we find out first.

---

## 6. No-Database Mode & Public-Data Intelligence

Two related capabilities for customers (and prospects) with little or no structured data:

**6.1 No-Database Mode**
- Input: conversational description of the operation + website URL + optionally a GitHub/docs link.
- Nadir builds a provisional ontology from the description (entities, flows, roles) and a starter site layout from the address. The customer operates on tickets, checklists, layout, and manual/spreadsheet inputs from day one — structured data connections come later and snap into the ontology already built.
- Token discipline: intake is one bounded extraction pass (small model), not an open-ended "throw everything at the AI and hope." Hard caps per onboarding session.

**6.2 Public-Data / Bid Intelligence Module (the Newrest scenario)**
- Input: a target company or contract context (e.g., an airline catering bid).
- Nadir gathers public signals (published menus, route/flight volumes, market pricing for inputs in the customer's region) and builds a **cost model**: menu item → ingredients → units required → prep labor time → per-unit cost → bid estimate. The apple example is the template: yogurt with apple → slices per serving → apples per 1,000 meals → purchase cost + cutting labor → landed cost per serving.
- Output: a bid workbook with every assumption editable (fill rate, waste %, labor rate) so the customer owns the numbers.
- Honest constraint, stated in the UI: public data yields **estimates with stated assumptions**, not facts. Every number carries its source and its assumption. This module is a door-opener and a genuinely useful estimator — it is not presented as omniscience.

---

## 7. Security & Compliance Posture (competing with Palantir means matching this posture, scaled down)

- Read-only database users, enforced and tested at connection time.
- Encryption in transit and at rest; per-customer isolation (no shared indices).
- LLMs as stateless translation layers: data processed in memory, purged after inference; DPAs with all AI subprocessors prohibiting retention/training.
- Data classification console (§4.10) controls exactly what AI may touch.
- Full audit trail: every mapping confirmation, wire edit, ticket action, sign-off.
- Secrets management for customer credentials (vault, never in code or logs).
- US-only data residency at launch.
- What we take from studying Palantir Gotham/Foundry: the ontology-first architecture, evidence-linked decisions, and audit discipline. What we explicitly do not do: military/intelligence applications. This is a product-design study, not a market.

---

## 8. Current Repo Reality Map (for the coder agent)

- `lib/data.ts` — all 8 demo companies, fully scripted. Keep as `[DEMO-ONLY]` seed content; do not extend it further.
- `app/api/ingest/route.ts` — dummy CSV reader. This is the first thing replaced (see PHASES.md, Phase 2).
- `components/nadir/*` — the UI shell is good and largely reusable; screens above specify what changes.
- `design/` folder — contains internal strategy docs in a public repo. **Make the repo private or remove this folder immediately.**
