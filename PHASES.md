# Nadir — Company Phases: From Scripted Demo to Live Customers

**What this file is:** the sequenced plan from where the repo is today (Phase 1, scripted demo) to a company with paying customers. Each phase has: goal, build list, what the founder must supply, cost notes, and an exit test — a concrete thing that must be true before moving on. A coder AI agent should treat each phase's build list as its backlog, in order.

**Governing principle:** no more theater. From Phase 2 onward, everything either works against real data or is labeled `[DEMO-ONLY]` in the UI. We would rather catch a failure in our own testing than in a customer's conference room. If a prospect says "here's 15 TB, hook up SAP," the answer must be a real process (Phase 4), not a bluff.

---

## Phase 1 — Scripted Demo (DONE — freeze it)

What exists: enterprise marketing site, 8-industry scripted workspace, evidence drawers, approval flows, audit trail visuals. It's a good movie.

Remaining Phase 1 tasks (days, not weeks):
- [x] Make the GitHub repo private (or purge `design/` and history). *(Done — flipped via GitHub API.)*
- [ ] Label the workspace clearly as a guided demo internally; stop adding demo industries.
- [ ] Visual pass: promote the ontology and mapping sections (site + app) to bolder visual weight — they're the core claim and currently underweighted.

**Exit test:** repo is private; no new scripted content is being written.

---

## Phase 2 — The Real Engine, v0 (the ontology mapper actually works)

**Goal:** the mapping screen is generated from a live database, not from `lib/data.ts`. This is the single technical claim a buyer will test, so it gets built first and alone.

Build list:
- [ ] **Schema extractor:** connect read-only to Postgres and MySQL (SQL Server next). Pull table list, column types, row counts, foreign keys, and 3–5 sampled rows per table. Never full tables — sampling is both the cost control and the security story.
- [x] **File ingestion:** CSV path done — real RFC-4180 parser (`lib/engine/csv.ts`), normalized schema with type inference and 5-row sampling, `/api/ingest` fully replaced (POST upload + GET sample). XLSX still to add.
- [~] **Claude mapping pass:** deterministic mapper live (`lib/engine/mapper.ts` — vocabulary + key-shape + value-overlap signals, computed confidence WITH reasoning). Portable model interface with hard token budget in `lib/engine/llm.ts`, activates when ANTHROPIC_API_KEY is set (founder to supply); degrades gracefully to deterministic. UI hookup to OntologyGraph/DragDropMapper next.
- [x] **Validation layer (checks and balances):** `lib/engine/validate.ts` — value-overlap tests, type-compatibility checks, plain-English rejections WITH a suggested correct wire. (v1 runs on sampled values; full-column verification comes with the SQL extractor.)
- [ ] **Correction memory:** every human confirm/rename/rewire stored per customer; corrections included in future mapping prompts for that customer.
- [x] **Test harness with real dummy data:** `npm run harness` — utility ops, food-production, and messy-SMB CSV sets in `testdata/`, 16 assertions over parsing, proposals, wires, and validation. (It already caught its first real bug: FK columns were being rejected as IDs.) Messy XLSX workbooks to add with XLSX support.

Founder supplies: Anthropic API key (Claude Console); a Postgres instance with the dummy data (local or a $5–10/mo managed instance); decision on hosting (Vercel is fine for now; the ingestion worker may need a small separate service).

Cost notes: mapping passes are small — schemas and a handful of rows, not datasets. Use the cheapest current Claude model that passes the test harness (per standing decision: cheapest viable model; have the coder agent verify current model list and pricing at docs.claude.com rather than hardcoding today's prices). A full mapping session should cost cents, not dollars; put a hard token budget per session in code from day one.

**Exit test:** point Nadir at a database it has never seen; within minutes the mapping screen shows real tables, real proposals, real confidence-with-reasoning; a deliberately wrong wire is rejected with a sensible explanation. Demo sentence unlocked: *"This screen was generated from a live database 40 seconds ago."*

---

## Phase 3 — The Working Product Core (graph, tickets, deterministic intelligence)

**Goal:** a customer could actually run part of their operation in Nadir.

Build list:
- [ ] **Real operational graph:** persist the confirmed ontology; "Build the graph" produces the live graph from mapped data (never a redirect to a static view). Full node/edge detail panels and recursive expansion per README §4.3.
- [ ] **Ticket subsystem** (README §4.11): one model for escalations, assignments, remediations. Escalate = create ticket, PTO-aware routing up the real org tree.
- [ ] **Org Tree as first-class screen; Departments above Team & Inbox; department scorecards with weekly issue digests.**
- [ ] **Deterministic pain-point engine v1:** rule checks against the live graph (thresholds, intervals, cert-vs-schedule joins, count mismatches like prep-sheet-vs-bookings). No LLM in the hot loop — arithmetic first. LLM only composes the human-readable briefing from rule outputs.
- [ ] **Guidance Plan with real assignment:** assign → edit → send → track progress states.
- [ ] **Compliance findings with ownership, required resolution notes, configurable sign-off.**
- [ ] **Custom dashboard builder v1** (widget compose/save/share).
- [ ] **Ops Map rebuild v1:** address → building footprint (OpenStreetMap first, Google fallback) → bird's-eye canvas → user-drawn zones → signals rendered on zones with adjustable sizing. 2D/2.5D now; 3D later.
- [ ] **Auth, roles, permissions** per README §2 (this is the last moment it can be retrofitted cheaply).

Founder supplies: Google Maps Platform key (only if OSM footprints prove insufficient); choice of auth provider; a decision on the first vertical's rule pack to write (recommendation: utilities or food production, where your domain knowledge is deepest).

Cost notes: this phase is almost entirely deterministic compute — hosting and database costs, minimal tokens. Budget tens of dollars per month, not hundreds.

**Exit test:** using only real ingested dummy data, a full loop works end-to-end: source connected → mapped → graph built → rule fires → alert appears on the ops map and dashboard → escalated to a ticket → assigned → resolved with notes → visible in the department digest and audit trail. No scripted content anywhere in the loop.

---

## Phase 4 — Demo-Demo & Design Partner (a real company's data, supervised)

**Goal:** survive contact with reality — someone else's messy data — and produce the sales assets.

Build list:
- [ ] **Onboarding flow complete** (README §3), including conversational intake and No-Database Mode v1 (bounded, capped extraction pass).
- [ ] **Security hardening for other people's data:** secrets vault for connection credentials; per-customer isolation; data classification console v1 (`AI may read / cite / never access`); purge-after-inference verified; DPA template ready.
- [ ] **The "hook up anything" playbook:** a written, honest process for the SAP/15TB question — discovery call → read-only credentials or extract → scoped pilot on 2–3 core tables → expand. Big-system connectors are a roadmap item; the playbook is how we say yes credibly before they exist.
- [ ] **ROI one-pager generator:** template that takes pilot findings and produces the page: hours of manual cross-checking eliminated, compliance exposure found (with citation), predicted failure avoided, cost of inaction. One page, customer's own numbers.
- [ ] **Public-Data / Bid Intelligence module v1** (README §6.2): target company → public signals → editable cost model workbook → bid estimate with stated assumptions. Newrest-style food production is the first template because the founder can validate every number from direct industry experience.
- [ ] **Interactive marketing site pass:** the live "connect a sample database" moment embedded on the site (sandboxed), replacing pure animation.

Founder supplies: **one design partner** — a Georgia company where you have a warm relationship, offered a free supervised pilot on a scoped slice of their data. Also: entity/insurance basics before touching third-party data (LLC in place, a basic E&O/cyber policy quote — talk to your CPA/attorney; this file is planning, not legal advice).

Cost notes: this is where metered LLM usage starts mattering. Instrument per-customer token accounting now (it becomes the billing meter in Phase 5). Reconciliation calls on messy real data are the expensive path — cache aggressively, batch where possible, and keep the deterministic-first rule.

**Exit test:** one real company's real data ran through the pipeline; at least one finding they didn't know about, documented on the ROI one-pager; they'd take a reference call. That one-pager plus the live mapping demo is the entire sales kit.

---

## Phase 5 — First Paying Customers (Georgia, 3–5 accounts)

**Goal:** revenue, references, and proof the learning layer compounds.

Build list:
- [ ] **Billing:** Stripe — platform fee + per-seat (~$5/user/mo) + metered AI usage from the Phase 4 accounting. Founding-customer rate locked for early accounts.
- [ ] **Reliability:** error monitoring, backups, uptime alerting, incident notes. Nothing fancy; nothing missing.
- [ ] **Dogfood account:** Nadir runs Nadir — our repos, invoices, usage, pipeline, and compliance obligations in our own product. If it can't navigate us, we fix that before selling harder.
- [ ] **Per-customer learning proof:** measurable improvement in mapping confidence and rule precision between week 1 and week 8 for each account (this becomes a sales chart).
- [ ] **Weekly digest emails** per department head (pulls from the digest system, drives habitual use).
- [ ] **Support loop:** in-app issue reporting that creates a ticket in our own dogfood account.

Founder supplies: sales motion — 10 warm-first conversations in Georgia utilities/food production/construction; the ask is a paid pilot, priced low, scoped tight. Funding conversations, if wanted, happen after this phase with revenue and the learning-curve chart in hand — that story needs no one's permission to build.

**Exit test:** 3–5 paying accounts, at least one referenceable, MRR covering infrastructure + AI costs with margin, and the dogfood account catching real issues in our own operation.

---

## Phase 6 — Depth and Moat (post-revenue)

Directional, to be re-planned with customer evidence:
- ERP connectors in earnest (start with whatever the first 5 customers actually run — likely QuickBooks/Sage/Maximo-class before SAP).
- Ops Map 3D and richer layout tooling; recursive graph expansion v2.
- Vertical rule packs as products (utilities pack, food-safety pack) — packaged domain intelligence is pricing power.
- Bid Intelligence as a standalone wedge product for new-customer acquisition.
- SOC 2 readiness track (start evidence collection early; certify when enterprise deals require it).
- Team: first hire is a customer-facing implementation engineer, not a salesperson — implementations are where the learning layer gets built.

---

## Cross-Phase: AI Cost & Vendor Strategy

- **Deterministic first, always.** 95% of monitoring is arithmetic; it runs at flat cost. Tokens are reserved for semantic reconciliation, mapping, and briefing composition.
- **Model tiering:** cheapest viable model for extraction/mapping/classification; step up a tier only where the test harness proves the cheap model fails. Re-run the harness on every new model release — model prices fall; our COGS should too.
- **Hard budgets in code:** per-session and per-customer monthly token caps with graceful degradation (queue non-urgent reconciliation) rather than surprise bills.
- **Vendor posture:** primary on the Claude API (verify current models/pricing at docs.claude.com at build time rather than trusting any hardcoded number); keep prompts portable (no vendor-specific formats in core logic) so a second provider can be added for redundancy/price pressure later. Never send customer data to any provider without a retention-prohibiting DPA.
- **Caching and batching:** schema fingerprinting (don't re-map unchanged schemas), response caching on repeated reconciliations, batch APIs for non-interactive work.

## Cross-Phase: Security Checklist (accumulates, never shrinks)

Read-only enforcement → encrypted transit/rest → per-customer isolation → secrets vault → classification console → purge-after-inference → audit everything → US residency → DPAs with all subprocessors → incident response note → (later) SOC 2.
