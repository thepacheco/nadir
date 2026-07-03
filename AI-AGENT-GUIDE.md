# AI Agent Guide — How to Think While Building Nadir

**What this file is:** operating instructions for any AI agent (coding or planning) working on this project. It exists because output quality between AI systems varies wildly, and the failures are predictable: generic design, shallow thinking, and confident theater. This file is the standard. Read it before touching the codebase, and re-read the Decision Rules before any large task.

---

## 1. The Prime Directive: No Theater

The most damaging thing you can produce is something that *looks* like it works but doesn't. A typing animation over a hardcoded string. A progress bar over a `setTimeout`. A confidence score no computation produced.

- If a feature is simulated, it is labeled `[DEMO-ONLY]` in code comments AND visibly in the UI.
- Never build new simulated behavior. Build the real thing smaller instead: a real pipeline over one table beats a fake pipeline over fifty.
- If asked to build something that can only be theater right now, say so, propose the smallest real version, and build that.

## 2. Go Down the Rabbit Hole (the button test)

For every interactive element, answer ALL of these before writing code:

1. What exactly happens when it's clicked?
2. Where does the data come from, and where does the result go (database write? message? ticket? audit entry)?
3. Who is allowed to click it (role check)?
4. What happens when it fails (error state, plain-English message, retry)?
5. What happens the second time, the hundredth time (idempotency, duplicates)?
6. Can the user edit/undo what it did?
7. Does someone else need to be notified, and does the audit trail record it?

An "Escalate" button that plays an animation fails this test. An "Escalate" button that creates a ticket, routes it PTO-aware up the org tree, notifies the assignee, and writes the audit entry passes. If you can't answer all seven, the design isn't done — stop and design, don't code.

## 3. Design Taste (how to not look AI-generated)

Reference points for this project: Harvey AI (restrained enterprise structure), Bloomberg Terminal (dense, drillable, connected), Scale AI (click something, something real happens).

- **Restraint:** one typeface family plus a mono for data. A small, committed color palette with semantic colors (red/amber/green) reserved for meaning, never decoration. No gradients-because-gradients, no glassmorphism, no emoji in UI, no sparkle icons on AI features.
- **Density with hierarchy:** enterprise operators want information density. Achieve it with a strict type scale and spacing system, not by shrinking everything. Every screen has one clear primary action.
- **Specificity is credibility:** "12,410 work orders, 98% mapped, 312 exceptions" reads as real. "Manage your work orders efficiently!" reads as AI filler. In UI copy, always prefer the concrete number the system actually knows.
- **Evidence-linked everything:** any claim the product makes (an alert, a score, a recommendation) must have a visible "why" one click away. This is both a design pattern and the product's core trust promise.
- **Motion:** only to explain state change (a ticket moving, a node expanding). Nothing loops, pulses, or floats for vibes.
- Before shipping any screen, render it and ask: "Would a Palantir or Bloomberg designer recognize this as a peer, or as a template?" If template, iterate.

## 4. Writing Standards (docs, UI copy, commit messages)

- Plain English over jargon. A layman must understand every mapping explanation, error message, and confidence rationale ("These columns share zero overlapping values — this wire can't be right").
- No hype adjectives ("revolutionary," "seamless," "cutting-edge"). State what it does.
- Every error message says: what happened, why (best known), what to do next.
- Commit messages describe the behavior change, not the file change.

## 5. Honesty and Uncertainty

- Distinguish facts, estimates, and assumptions — in code, in UI, in documents. The Bid Intelligence module shows every assumption as editable and every number's source. Follow that pattern everywhere.
- Confidence scores must be computed from something (match rates, value overlap, sample validation) and must carry their reasoning. If you can't compute it, don't display it.
- When you don't know a current fact (model pricing, API capabilities, library versions), verify at the source (docs.claude.com, official docs) instead of asserting from memory. Prices and models change; hardcoded "facts" rot.
- When the founder's request has a flaw, name the flaw directly, once, with the reason — then either build the corrected version or the requested version with the risk documented. Silent compliance and silent "improvements" are both failures.

## 6. Engineering Decision Rules

- **Deterministic first:** if arithmetic can do it, no LLM call. LLM calls are reserved for semantic reconciliation, mapping proposals, and prose composition — and each call site has a token budget.
- **Sample, never slurp:** schema + 3–5 rows per table. Never ship a full table to a model. This is cost control AND the security story.
- **Read-only means read-only:** verify at connection time; never request write access to customer sources.
- **Every mutation is audited:** who, what, when, evidence link. If a feature mutates state and doesn't write an audit entry, it's incomplete.
- **Roles checked server-side.** UI hiding is not access control.
- **Secrets in a vault, never in code, logs, or client bundles.**
- **Test harness before features:** the 5 dummy datasets (PHASES.md, Phase 2) run on every pipeline change. A feature that isn't exercised by the harness doesn't exist.
- **Portability:** keep prompts and model calls behind one internal interface so providers/models can be swapped without touching product logic.

## 7. Scope Discipline

- Build the smallest real version, prove it against the harness, then widen. One database engine before four. One vertical's rule pack before eight.
- Do not invent features not in README.md/PHASES.md. If you see a gap, propose it in writing (update the doc) before building it.
- When a task is ambiguous, state your interpretation in one sentence at the top of your work and proceed — don't stall, but leave the assumption visible for correction.

## 8. Working With the Founder

- He responds to momentum, specificity, and ambition. Give him concrete artifacts, not options essays.
- He explicitly does not want cheerleading. "Good" means passing the tests in this file, not compliments.
- Push back when he's wrong — with the reason and the alternative in the same breath. Then execute.
- Every work session ends with: what got built, what's real vs. `[DEMO-ONLY]`, what broke, and the single next action.

## 9. Pre-Ship Checklist (every PR / every artifact)

- [ ] No new theater; anything simulated is labeled in code and UI.
- [ ] Every new button passes the seven-question test (§2).
- [ ] Errors are plain-English with next steps.
- [ ] Roles enforced server-side; mutations audited.
- [ ] No secrets or customer data in code, logs, or prompts beyond the sampling rule.
- [ ] Harness passes on all dummy datasets.
- [ ] Screens pass the "peer, not template" design test (§3).
- [ ] Docs (README/PHASES) updated if behavior or plan changed.
