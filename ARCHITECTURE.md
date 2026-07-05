# Nadir — Core Architecture & The Real Engine

**What this file is:** the missing spine. The other docs describe features and phases; this one defines *what Nadir actually is underneath*, so that every surface stops fighting every other surface, and so there is a real technological stack behind the demo instead of a static site pretending. Read this before README.md and PHASES.md. If any feature contradicts this file, this file wins.

**Verified current state (re-checked 2026-07-04):** the engine has started to exist, in two disconnected halves. Half one: real CSV ingestion (`lib/engine/csv.ts`, RFC-4180, type inference, 5-row sampling), a deterministic mapper with computed confidence-plus-reasoning (`lib/engine/mapper.ts`), value-overlap wire validation with plain-English rejections (`lib/engine/validate.ts`), and a budget-capped portable LLM interface (`lib/engine/llm.ts`) — all behind `/api/ingest`. Half two: a Prisma/SQLite store with a recursive BOM micro-costing engine and a bid endpoint (`lib/engine/micro-costing.ts`, `/api/bids/generate`). What does NOT exist yet: the Graph Store itself (Part 3.1) — mapping output still evaporates instead of persisting as objects and relationships — plus config schemas (Part 2), identity (Part 5), and every lens still renders `lib/data.ts`. The repo is private. **The engine turns over; it is not yet connected to the wheels.** This document specifies the drivetrain.

**Document map (which file answers what):** `VISION.md` — the founder's thesis and the AI architecture (why Nadir exists, the three-source fusion, the review layers, per-role/industry molding); read it first for *why*, then this file for *what*. This file is the spine — what Nadir *is* and the build order; conflicts about the software resolve in its favor, conflicts about the intelligence resolve toward VISION.md. `README.md` — the operational spec of every screen and button. `PHASES.md` — the sequenced company plan with exit tests. `AI-AGENT-GUIDE.md` (with `FABLE5_README.md` as its condensed variant) — how any AI agent must think while working here. `OPERATION.md` — short platform overview. `ROI.md` — the customer-facing ROI one-pager draft. `GOOGLE_AI_CHANGES.md` — changelog of the 2026-07-03 overnight session. `ROADMAP.md` — historical; superseded by PHASES.md.

---

## PART 1 — THE ONE IDEA EVERYTHING HANGS ON

### 1.1 Nadir is an Operational Graph. Nothing else is the product.

A company is a set of **real-world objects** (people, machines, work orders, sites, invoices, shipments, incidents, filings) connected by **relationships** (this crew runs this work order on this asset at this site, which triggers this filing). That connected structure is the **ontology**. The live, current state of it is the **operational graph**.

**The graph is the product.** Everything a user sees or clicks is one of exactly two things:

- **A LENS** — a way of looking at the graph.
- **An ACTION** — a way of changing the graph or the work attached to it.

There is no third category. This is the rule that ends "jack of all trades." A feature that is neither a clean lens nor a clean action does not belong in the product.

### 1.2 The Microsoft Office test (why nothing overlaps)

Word, Excel, and PowerPoint never "step on each other's toes" because they operate on the same primitive (a document) in genuinely different modes (prose, grid, slides). Apply the same test to Nadir:

| Surface | Is it a LENS or ACTION? | On what part of the graph? | The one job it owns (and nothing else may do) |
|---|---|---|---|
| **Ops Map** | Lens | Objects placed in **physical space** | "Where is everything, and what's happening there right now" |
| **Fusion Graph** | Lens | Objects as a **flow / topology** | "How work moves from input to output, and where it breaks" |
| **Dashboard** | Lens | Graph as **aggregated numbers** | "The metrics that matter, composed by the user" |
| **Compliance Monitor** | Lens | **Rule evaluations** over the graph | "Where are we out of compliance, with evidence" |
| **Guidance Plan** | Lens | **Recommended actions** over graph state | "What to do next, in order, for *your* role and department" |
| **Work (tickets/tasks)** | Action | A unit of work attached to any object/finding | "The thing a human must do, tracked to done" |
| **Team Inbox** | Action | **Communication** attached to objects/work | "The conversation about a specific thing" |
| **Departments / Org** | Lens+Action | The **people subgraph** | "Who owns what, who reports to whom" |
| **Data Sources** | Action | The **ingestion pipeline** feeding the graph | "How the real data gets in and stays trusted" |
| **Settings / Knowledge Base** | Action | **Configuration & policy** of the account | "Who can do what, what AI may touch, how it's tuned" |

If two surfaces both claim the same job, one of them is wrong and gets cut or merged. Example resolved below: the standalone "ticketing system" does not own a pillar — Work is an action surfaced *inside* the lenses, plus one global filtered view. It is not a peer to the Ops Map.

### 1.3 Every business is different; the tools are identical.

This is the whole commercial thesis and it must be enforced architecturally. A utility, an airline caterer, and a dental group have completely different graphs — but they use the *same* Ops Map, the *same* ingestion engine, the *same* Work object. The difference between customers lives **entirely in data and configuration**, never in code.

That leads directly to the single most important engineering rule in this project:

---

## PART 2 — CONFIG-DRIVEN, NOT AI-REGENERATED

### 2.1 The rule

**The AI never rewrites the site. The AI writes configuration; the site renders configuration.**

When a user says "add crew locations and open work orders to my ops map," the system does **not** regenerate code, and does **not** call an AI to rebuild a page. It writes a config object:

```json
{
  "opsMap": {
    "layers": [
      { "id": "crews", "source": "object:Crew", "field": "current_location", "marker": "dot", "size": "md" },
      { "id": "open_wos", "source": "object:WorkOrder", "filter": "status = OPEN", "marker": "badge" }
    ]
  }
}
```

The Ops Map component reads that config and renders it. Same component, infinite layouts. This is exactly the Excel analogy: Excel's engine never changes; the workbook (formulas, macros, layout) is data, and it works in any scenario. **Every configurable surface in Nadir is an "Excel engine": fixed code, data-driven behavior.**

### 2.2 Why this is non-negotiable

- **Consistency across AI models.** You flagged that different models produce inconsistent results. That happens because models are editing *code*. If models only ever emit *config that conforms to a fixed schema*, then any model — Fable, Opus, a cheaper one — produces interchangeable, validatable output. The schema is the contract; the model is a swappable pen.
- **Safety.** A user (or the AI) can't break the app by customizing it, because they can only produce config the renderer already knows how to validate and draw.
- **Speed & cost.** Re-rendering config is instant and free. Regenerating a page with an AI is slow, expensive, and non-deterministic.

### 2.3 What must be config-schema'd (build these schemas first)

Ops Map layers, Dashboard widgets, table columns/filters, Guidance Plan filters, Work board columns, alert/rule definitions, role permissions, notification routing. Each gets a versioned JSON schema. The AI's job on any "customize" request is: **emit valid config for the relevant schema, nothing more.**

---

## PART 3 — THE ENGINE (the parts that don't exist yet)

This is the motor, transmission, and drivetrain. Today: none of it exists. Build order matters — this is the dependency chain.

### 3.1 The data model (build this first — it is the foundation of everything)

Two stores, strictly separated:

**A) The Graph Store (per customer) — the ontology made real.**
Not eight hardcoded companies. A real schema that can hold *any* company's ontology:

- `objects` — id, customer_id, type (Crew, WorkOrder, Asset, …), attributes (JSON), source_ref, provenance, confidence, first_seen, last_seen.
- `relationships` — id, customer_id, from_object, to_object, type (ASSIGNED_TO, CONSUMES, TRIGGERS), inferred_from (FK / naming / value-overlap), confidence, confirmed_by (user or null).
- `object_types` / `relationship_types` — the customer's confirmed ontology vocabulary (the thing they rename/correct during onboarding).
- `events` — time-series state changes on objects (telemetry, status transitions) that feed rules and the map.

Postgres is the correct default: relational for objects/relationships, JSONB for flexible attributes, and it scales to the mid-market sizes you're targeting. (A dedicated graph DB is a later optimization, not a Phase-2 requirement — model relationships as rows now.) *Current state:* the repo runs Prisma over SQLite (`prisma/schema.prisma`) for zero-setup iteration; that is an acceptable stepping stone precisely because Prisma makes the swap to a managed Postgres a connection-string change, not a rewrite. The Graph Store tables below live in that same schema.

**B) The Learning Store (Nadir's own asset).**
Confirmed mappings, human corrections, resolved-ticket patterns, recurring findings, per-customer tuning. This is what makes month 6 smarter than week 1 and is the switching cost (Part 7). It never mixes with customer data and is never used to train external models.

**C) The platform store.**
Accounts, users, roles, permissions, sessions, billing, audit log, notification routing, saved configs (Part 2).

**Until these tables exist and are written to by real ingestion, there is no product — only a screenshot.**

### 3.2 The ingestion engine (the "connect data like Power BI" you asked for)

A real pipeline, staged, each stage persisted and inspectable:

1. **Connect** — read-only credentials to Postgres/MySQL/SQL Server, OR file upload (CSV/XLSX), OR (later) an ERP connector. Verify read-only at connect time; store credentials in a vault, never in code/logs.
2. **Introspect** — pull tables, columns, types, foreign keys, row counts. Real reflection, no guessing.
3. **Sample** — 3–5 rows per table. Never full tables (cost + security).
4. **Propose (the AI step)** — send schema + samples to the model; get back proposed object types, relationships, confidence, and *reasoning*. This is the ONLY place an AI touches ingestion, and it emits structured mapping proposals (config), not prose.
5. **Validate (checks & balances)** — value-overlap tests on every proposed and user-drawn relationship. A wire joining columns with zero shared values is **rejected with a plain-English reason** ("these share no values — did you mean `crew_id`?"). This is the Power BI "it tells you if it's right" behavior, done honestly.
6. **Confirm** — user renames/corrects/approves. Every correction → Learning Store.
7. **Persist** — write objects + relationships into the Graph Store. *Now* the graph is real, and every lens reads from it.
8. **Refresh** — schema fingerprinting so unchanged sources aren't re-mapped; scheduled or triggered re-reads keep the graph live.

**Exit condition for "we have a real demo":** point this at a database no one has seen, and the Ops Map / Fusion Graph / Dashboard populate from *its* data — not from `lib/data.ts`. That is the line between a real demo and a Theranos demo (Part 6).

### 3.3 The intelligence engine (deterministic first, AI last)

- **Rules are deterministic and defined in config** (Part 2.3): threshold crossed, interval overdue, cert-expiry vs. schedule, count mismatch (prep sheet 120 vs. bookings 186). Arithmetic, not intelligence — flat cost, instant, testable. This is 95% of monitoring.
- **The AI composes, it does not decide.** Once a rule fires, an LLM may write the human-readable briefing and suggested action. It is never in the detection hot loop. Every AI call site has a hard token budget.
- **Provenance on every claim.** Any alert, score, or recommendation links to the objects/rows/rule that produced it. No evidence link → it doesn't ship.

### 3.4 No-Database Mode (the niche you want on the side)

For prospects/customers with only a website + description: a single **bounded** extraction pass (small model, hard token cap) turns a spoken description + site into a provisional ontology and a starter layout. They operate on Work, checklists, and manual inputs from day one; real sources snap into the ontology later. This is a real, capped algorithm — not "throw everything at the AI and hope," which would burn your token budget and is explicitly forbidden.

---

## PART 4 — EVERY SURFACE, RESOLVED (going down each rabbit hole)

For each: what it is, what was wrong, and the fix. This is the spec the coder agent builds to.

### 4.1 Ops Map — make it Gotham-for-mid-market
- **Is:** the spatial lens. The customer's own drawn layout (from onboarding), real building footprint, objects rendered *on it*.
- **Wrong now:** doesn't look like an ops map; fixed data points chosen by us; clicking dumps you into an ugly raw building view.
- **Fix:** (a) user-configurable layers (Part 2.1) — the *user* decides what's on the map by asking, and config renders it; (b) click a zone → see the objects there (assets, crews, open work) → **assign a task from a popup** → that creates a Work item → status flows back onto the map as the work progresses and Nadir reads the responses. This is the Gotham interaction pattern, non-military: click a place, see what's there, task it, watch it move.

### 4.2 Fusion Graph — make it mean something
- **Is:** the flow lens — how operations actually move, input → output, and where the constraint is.
- **Wrong now:** pretty nodes, thin metadata, no real drill-down; unclear purpose.
- **Fix:** every node and **every edge** opens full detail (derivation, row counts, freshness, exceptions: "312 work orders have no crew — view them"), recursive expansion (Machines → Lines → Stations → Serials), and the current bottleneck is visibly marked. Its job is diagnosis: *show me where the flow jams.*

### 4.3 Work (tickets/tasks) — one object, surfaced in context (my direct recommendation)
- **You asked my opinion: we are NOT a ticketing system.** A ticket is an *action*, not a pillar. Build one **Work** object (origin, evidence links, assignee, department, due, status, thread, required resolution notes, optional sign-off). It appears *in context* — inside an alert, a finding, a plan item, a map zone. The "global board" is just a **filtered lens** over all Work items; useful, but not a peer to the Ops Map.
- **Wrong now:** standalone board with no flexibility; can't edit after assigning.
- **Fix:** everything about a Work item is editable after creation (reassign, re-scope, re-route, edit the message), every change audited. Board columns/filters are config (Part 2.3).

### 4.4 Team Inbox — make it an actual inbox
- **Is:** the communication action, attached to a specific object/work item (not free-floating chat).
- **Wrong now:** "halfway there," not Slack/Teams-grade; can't revise/edit/change sent messages.
- **Fix:** edit and delete sent messages, threads tied to the object they're about, attachments, read/delivery state, @mentions that pull people from the Org subgraph. The point of difference vs. Slack: **every conversation is anchored to a real graph object**, so context is never lost.

### 4.5 Departments & Org — one clean hierarchy, not slop
- **Is:** the people subgraph — people are objects too, with reporting relationships.
- **Wrong now:** org tree "slapped on the side," convoluted; departments and inboxes not clearly related.
- **Fix:** **Departments is the container**; team inboxes and Work live *inside* departments. Org Tree is its own screen; click a person → their place in the hierarchy, reports, PTO, open work. Escalation walks this tree (PTO-aware). Flow, don't dump: a user sees their department by default and drills up only if permitted.

### 4.6 Guidance Plan — per role, per department
- **Is:** the recommendations lens over current graph state.
- **Wrong now:** one-size plan; forgettable.
- **Fix:** filtered by department and **scoped by role** — a department head, a supervisor, and a floor worker in the same airline-catering company see different plans because they can act on different things. Assign → edit → send → track progress states (assigned → ack → in progress → done → closed), with movement charted so leadership sees momentum.

### 4.7 Compliance Monitor — keep, extend
- **Is:** the rule-evaluation lens (local + public law). You confirmed this one works.
- **Fix:** each open finding has an owner and routing; closing **requires notes**; optional supervisor sign-off; notes hit the audit trail. Department-authored recurring sign-off checklists, plus Nadir-suggested checklists from repeat findings.

### 4.8 Data Sources — the engine's control panel (Power BI-grade)
- **Is:** the UI over the ingestion engine (Part 3.2).
- **Wrong now:** "wheels turning, no engine" — sloppy, not layman-legible, doesn't really connect anything.
- **Fix:** the staged real pipeline with confidence-plus-reasoning, value-overlap validation that errors out sensibly, and "Build the graph" producing a **new real artifact** from *this* mapping — never a redirect to the same static map.

### 4.9 Dashboard — the composed metric lens
- **Is:** user-composed KPIs/widgets over the graph.
- **Wrong now:** overlaps with task lists; feels like a second copy of other screens in a different style.
- **Fix:** widgets are config (Part 2.3); a Dashboard widget is a *saved view of a lens*, never a re-implementation of one. If a widget duplicates the Work board, it embeds the Work lens — it doesn't rebuild it.

---

## PART 5 — IDENTITY & LIFECYCLE (the basics I missed — you were right)

None of this is optional and it must exist before real customers. Build it in Phase 3, not after.

- **Auth:** email + password (hashed, salted), email verification on signup, sessions, optional SSO later.
- **Forgot password / password change / password reset** — full flow, tokenized, expiring links.
- **Invite flow:** admin invites by email → invitee sets password → lands in the right role/department.
- **Roles & permissions** (Owner, IT Admin, Dept Head, Manager, Member, Viewer) enforced **server-side**; UI hiding is not security.
- **Offboarding (someone gets fired):** revoke access immediately; their open Work auto-reassigns up the chain; their audit history is retained, not deleted.
- **Role / position change:** move a person in the Org subgraph; permissions and routing update automatically; their Work follows or reassigns per policy.
- **Department restructure:** add/split/merge departments without breaking existing Work, inboxes, or history.
- **Nadir proposes org changes:** because the org is a subgraph, Nadir can *recommend* structure ("Legal has no owner"; "this person is a routing bottleneck on 40% of tickets — consider a lead"). Driving the company, not just recording it.

---

## PART 6 — THE THERANOS LINE (the thing you're actually afraid of)

You named the real risk: a facade that looks like it works and does nothing — Edison at Theranos. Here is the exact, usable line between an honest demo and fraud:

> **It is an honest demo if you never claim the simulated part is real. It becomes Theranos the moment you say "this ran on your data" when it didn't.**

Enterprise startups demo unfinished products constantly — that's legitimate. Theranos's crime was *claiming the blood was tested when it wasn't.* So the rule for next week:

- **One thing must be genuinely real:** ingest a real database (theirs, sandboxed, or a realistic one you control) → produce a real ontology → surface at least one real finding. When you say "Nadir generated this from a live database," it must be literally true.
- **Everything else is labeled preview** — in the UI, out loud, in the deck. "This section is a preview of where the product goes; the mapping you just watched is live." That sentence is honest and still sells.
- **In code, `[DEMO-ONLY]` on every simulated surface**, so no one — including future-you — forgets which is which.

Do this and you are not Theranos; you are every honest seed-stage enterprise company. Skip it and demo the whole thing as "working," and you're building the facade you're afraid of.

---

## PART 7 — WHY THIS BECOMES SOMETHING PEOPLE CAN'T LEAVE

You don't want a small tool; you want something companies depend on. Dependence is engineered, not wished:

- **The graph is switching cost.** Once a company's entire operation — objects, relationships, history, corrections — lives in Nadir's graph, leaving means rebuilding their operational memory from scratch. That's the Palantir lock-in mechanism, and it compounds monthly.
- **The Learning Store is a moat that grows while you sleep.** Every correction and resolved issue makes Nadir better at *that customer* specifically. A competitor cloning your UI starts from zero on that customer; you're at month 12.
- **Config is glue.** Because each customer molds Nadir to their exact operation via config (not code), the product fits them like a custom tool while costing you nothing to maintain — and a custom-fit tool is painful to abandon.
- **Vertical rule packs = pricing power and network effect.** A utilities pack, a food-safety pack — packaged domain intelligence that gets better across all customers in that vertical. This is how one product becomes a category and eventually a platform others build on.

The path to conglomerate scale is not more features. It's this spine, made real, with the graph and the learning layer deepening under every customer until leaving is unthinkable.

---

## PART 8 — WHAT TO BUILD, IN ORDER (hand this to the coder agent)

1. **Data model** (Part 3.1): the three stores, real tables. Nothing else works until this exists.
2. **Ingestion engine** (Part 3.2): connect → introspect → sample → AI-propose → validate → confirm → persist. Prove it on a real DB no one has seen.
3. **Config schemas** (Part 2.3): ops map layers, dashboard widgets, columns, rules, permissions. The AI emits these — never code.
4. **Lenses read from the graph** (Part 4): rewire Ops Map, Fusion Graph, Dashboard to render the real Graph Store + config. Delete dependence on `lib/data.ts` (keep it only as clearly-labeled seed for empty demos).
5. **Work object + Team Inbox + Org/Departments** (4.3–4.5): one Work model, contextual; editable messages; clean hierarchy.
6. **Deterministic rule engine + AI briefing composer** (3.3).
7. **Identity & lifecycle** (Part 5): auth, reset, invite, roles server-side, offboarding.
8. **Then** the polish: No-Database Mode, Bid Intelligence, custom dashboards, 3D map.

## PART 9 — REFERENCE TEARDOWN (the four screenshots, translated into build specs)

The founder supplied four reference screenshots (2026-07-04): a Celonis-style Process Explorer (light and dark variants), a WRLD indoor 2.5D building map, a Palantir Foundry pipeline DAG, and a Gotham-style stage-gated board. Here is exactly what each one teaches and which Nadir surface inherits it. These refine Parts 4.1, 4.2, 4.8, and 4.3 — they don't replace them.

### 9.1 Fusion Graph v2 = a process-state graph (from the Process Explorer shots)

The single biggest lesson: the graph's nodes are not tables — **they are the states a work object moves through** (Open → Submitted → Assigned → Dispositioned → Closed, plus terminals like Cancelled). What makes it a diagnosis tool:

- **Node cards carry computed numbers:** count of objects currently in the state, average time in state, and — for cost-bearing flows — average cost/revenue. Color is semantic: green = on the expected path, red = the current bottleneck or violation hotspot, gray = terminal.
- **Edges carry transition percentages** ("70% go Open→Submitted; 16% go Open→Cancelled"). Rare paths render dashed. Every number is arithmetic over transition events — no LLM anywhere in this lens.
- **The expected-vs-full slider is the product.** Default view shows the *expected path* (the SOP the customer confirmed). Dragging the slider progressively reveals rarer real transitions. The gap between expected and actual IS the finding: "16% of non-conformities jump straight from Open to Cancelled" is a sentence a COO pays for.
- **"Change Expected Path" is an editable declaration:** the user states the intended flow; the deterministic rule engine flags deviations from it. Expected paths are config (Part 2.3), per object type.
- **Lens → action in one motion:** selecting a node or edge opens the actual object rows beneath the graph (the dark screenshot's order table), with action buttons — Add Staff, Alert Facility, Deprioritize — each of which creates a Work item or state change, audited.
- **Data requirement this creates:** the Graph Store needs an `events` table — object id, state, entered_at, left_at — written during ingestion/refresh. Counts, durations, and transition frequencies all derive from it. Build the events table with the SQL extractor; the CSV path can synthesize events from status + timestamp columns where they exist.

### 9.2 Ops Map target = the WRLD look, built in the right order

The WRLD shot is the visual bar: an isometric 2.5D interior of *the customer's actual building*, with zones (their green desk clusters) lit by live status. How we get there without faking it:

1. Address → building footprint (OpenStreetMap first, Google fallback).
2. Bird's-eye 2D canvas where the user **draws their own zones** — apartment-layout style drag and drop, because no two floors are alike (this is the onboarding moment).
3. Zones are polygons in config; objects and signals attach to zones (`object:Crew`, `filter: status = OPEN` layers per Part 2.1).
4. Extrude to 2.5D isometric rendering with zone highlight colors, IoT/live signals blinking *on the zone they belong to*, click-through to the objects there and a task-assignment popup.

The data model (zones as polygons with attached objects/signals) comes first; the pretty extrusion is a renderer over it. 3D-for-3D's-sake stays cut.

### 9.3 Data Sources v2 = a pipeline DAG with change tracking (from the Foundry shot)

The ingestion control panel should read left-to-right as a dataflow: **raw sources → cleaning/mapping transforms → derived object types → the lenses that consume them**, each node showing its column/row counts. The two Foundry behaviors worth copying exactly:

- **A "Changes" panel** listing what an edit or a re-scan added/modified (transform added, input modified), with affected edges highlighted red/green. When schema fingerprinting (Part 3.2 step 8) detects a source changed, this is how the user sees the blast radius *before* re-confirming the mapping.
- **Branches:** a proposed mapping change renders as a branch next to Main until confirmed — mapping versions, not mapping overwrites. Correction memory (the Learning Store) hangs off the diffs between branches.

### 9.4 Stage-gated Work board (from the Gotham board — pattern only, never the domain)

We take the interaction pattern, not the subject matter: Nadir has no targets and no weaponeering. The pattern: **kanban columns are stages of a governed workflow, and a card physically cannot advance until its checklist for that stage is complete.** The right-hand panel shows the object's detail with its confirmation checklist ("2/3 complete — Has submitter identity ✓, Location verified ✓, sign-off pending"), each requirement evidence-linked.

Applied to Nadir: compliance remediation flows Found → Owner assigned → Evidence attached → Sign-off → Closed; work orders flow their own stages. Per-stage required checklists are department-configurable (Part 2.3), satisfy README §4.7's "closing requires notes," and every gate passage writes the audit entry. This is what makes the board a control, not a to-do list.

**Build order for all four:** 9.1 first (deterministic, needs only the events table, and it's the demo moment), then 9.3 (it strengthens the already-real ingestion pipeline), then 9.4 (rides the Work object build in Phase 3), then 9.2's drawn-zone canvas (its data model early in Phase 3, the isometric renderer later).

---

**Founder action list (only you can do these):**
- ~~Make the repo **private**~~ — done 2026-07-03, flipped via GitHub API.
- Provision Postgres (managed, ~$10–20/mo to start) and an Anthropic API key (Claude Console). The key unlocks the already-built LLM mapping pass in `lib/engine/llm.ts`; without it the mapper runs deterministic-only.
- ~~Fix the pricing page~~ — real tiers now render on `/pricing` (same numbers as the home page).
- Pick **one real dataset** for next week's demo — ideally a realistic ops database you control or a design partner's sandboxed slice — so the "this is live" claim is true.
- Decide the first vertical's rule pack (recommendation: the one you know cold — food production / airline catering — so you can validate every number).
- **Rotate the GitHub personal-access token** that was pasted into AI chat sessions — treat it as exposed.
