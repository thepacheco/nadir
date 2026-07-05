# Nadir — The Vision and the AI Architecture

**What this file is:** the founder's thesis, in his own logic, plus the concrete AI architecture it demands. `ARCHITECTURE.md` says what the software is; this says *why it exists and how the intelligence has to be built*. When a decision is about "what should Nadir the AI actually do," this file wins.

---

## 1. The thesis: control of the whole company, from the ground up

The name is the point. The *nadir* is the lowest point — you start at the bottom and climb. Nadir is the AI that takes a company from the ground up and gives the people who run it **control**: the ability to step into the viewpoint of any worker, any department, any site, and to trust their own data enough to make the next decision.

This comes from real experience. Two years in flight catering taught the founder that the problem is never one desk. From the analyst's chair you blame the floor for bad data; on the floor you learn the data itself was wrong, and everyone is scatterbrained on an irregular-operations day (flights delayed, meals returned, overtime spiking) because **no one can see the whole board at once**. Nadir is the coach who sees every player and can move them like a chessboard — the "Palantir of companies," but pointed at operators, not agencies.

**The AI is the product.** Everything else — the map, the graph, the tickets — exists to let the AI show you what it understands and to let you act on it. We are an AI company first. If a feature doesn't make the AI more useful or more trusted, it doesn't belong.

---

## 2. How Nadir actually comes to understand a company (the three sources)

Nadir builds its understanding from **three inputs, fused** — this is the core loop the whole architecture serves.

1. **Human input.** You tell it who you are: a name, a website, an address, a spoken description, a document. Even with nothing else, it drafts a first model of your company and hands it back: *"Here's what I think you are. Tell me what's wrong."* You correct it. That correction is gold.
2. **Data input.** Then it connects to your systems — the database, the ERP, the spreadsheets, the invoices — read-only, sampled (a few rows per table, not the whole terabyte). Now it's not guessing; it's reading what actually happens, 24/7, in and out of the company.
3. **Outside input — the vertical & horizontal sweep.** This is what makes it more than a dashboard. Nadir studies the *industry*: horizontally (how peers and competitors in your space operate) and vertically (the full stack of what your kind of business must handle). A restaurant isn't just food — it's equipment, suppliers, spoilage, inspections, labor. Nadir anticipates the categories your industry always has to manage, whether or not you mentioned them.

It fuses all three, separates the company **by department** (each department thinks differently — finance, production, HR, the data team, IT all have their own logic and their own systems), and composes one coherent picture. Then it crafts the story, builds the isometric map of the place, and guides you through it.

**The sweep, concretely (grocery store example):** people aren't one thing. HR's people = time clock, PTO, holiday pay, pay rate vs. the local market, turnover, retention, *reasons for quitting*. Cashiers = drawer reconciliation, scan rate, rush windows. Inventory = what's spoiling, what's tossed, what's shelved, what sells fastest and where, the price point where customers stop buying. With live data, Nadir stitches those into one live picture — and only then can it be genuinely useful.

---

## 3. The four review layers (tell me if one is missing)

On top of the three-source understanding, every plan Nadir produces passes through four layers before it reaches you:

1. **Operational** — does this actually work on the floor?
2. **Security** — who's allowed to see and do this? (server-side, per role.)
3. **Legal** — labor law, food safety, filings, contracts, co-employment risk.
4. **Quality** — is the data trustworthy and the recommendation sound?

A recommendation that fails any layer gets flagged, not shipped. (Open question for the founder: is there a fifth?)

---

## 4. Per-role, per-department, per-industry — the UI molds to who you are

Nadir is not one screen for everyone. It reshapes around the viewer and the business:

- **Per role:** log in as HR and you see HR's problems (an opening unfilled for 20 days at above-market pay — *why?*). Log in as Production and you see people **and** inventory **and** open issues. A write-up you file as a supervisor routes to HR; a firing that looks like selective enforcement **oversteps HR and escalates to the owner** as a risk. Nadir puts a spotlight on the problem and routes it to exactly the person who can act — and, when it matters, to the person who should be watching.
- **Per industry — the shape of the truth changes.** A staffing company should **not** see line-workers walking a floor; it should see a **pipeline / pathway / workflow / timeline**. A caterer or a plant *should* see the floor. Nadir chooses the representation that gives that business control, and gives them nothing they don't need. Giving people data they can't use is a failure, not a feature.

This is the discipline behind every "gadget" in the product: **does it serve control of the company?** If a screen doesn't help the operator see and steer their world, it's noise, and noise scares people.

---

## 5. What this means for the build (how we get an AI to do this without building Claude)

We don't train a foundation model. Like Harvey or Bolt, we stand on top of strong general models and make them expert at *this* job through architecture, retrieval, and a compounding private memory. The pipeline the product must implement:

1. **Intake → provisional model.** Human input (site, address, description, docs) → a small, bounded model pass → a first ontology and a starter layout. Cheap, capped, honest about being provisional.
2. **Connect → ground it.** Read-only, sampled ingestion (the real engine already in `lib/engine`). Deterministic mapping first; the model only proposes and reconciles, with a hard token budget.
3. **Departmental decomposition.** Split the confirmed graph into departmental sub-views, each with its own objects, rules, and vocabulary.
4. **Vertical/horizontal sweep.** A retrieval layer of industry knowledge (what this vertical must manage; how peers operate) that the model consults to anticipate categories the customer didn't name.
5. **Live loop.** Once connected, Nadir reads continuously, runs deterministic rules in the hot loop (arithmetic, flat cost), and reserves the model for composing the human-readable story, the plan, and the routing decision.
6. **Compounding memory (the moat, kept internal — never on the marketing site).** Every correction, every resolved issue, every routing outcome is stored per-customer and fed back, so month six is genuinely sharper than week one. This lives in the Learning Store, inside the customer's tenant, never used to train anyone else's model.
7. **Present.** The AI crafts the story, builds the isometric map, and lets the operator move their people like a coach.

**The guiding test for every architectural choice:** does it help Nadir take human input + data + industry context, understand the business *as that business actually works*, and hand back control? If yes, build it. If it's a nice gadget that doesn't serve that, cut it.

---

## 6. Where the current product is honest vs. aspirational

- **Real today:** sampled ingestion + deterministic mapping + validation (`lib/engine`), the Graph Store persistence, the process-mining math, the deterministic bid/costing engine, the procedural isometric site (`lib/facilityGen`). These work and are harness-tested.
- **Demo-shaped today:** the per-company workspace content, the workforce reconciliation, the chat responses — realistic and industry-shaped, clearly labeled, but authored, not yet produced by the live loop above.
- **Not built yet:** the three-source fusion as an automated pipeline, the vertical/horizontal sweep retrieval layer, the four review layers as code, per-role auth, and the per-industry automatic UI selection. Sections 2–5 are the roadmap for making the demo real.

The job from here is to close the gap between §6's first bullet and §5's pipeline — not to add more gadgets.
