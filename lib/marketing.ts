export const HOW_STEPS = [
  { n: "01", title: "You point it at your systems", desc: "Connect the databases and tools you already use — read-only, no migration, no manual data entry. That's the only work you do." },
  { n: "02", title: "Nadir figures it out", desc: "Nadir samples your data — a few rows, not the whole database — and works out on its own what everything is and how it connects: shifts, work orders, invoices, machines, people. You confirm once; it remembers." },
  { n: "03", title: "It builds the live model", desc: "Nadir assembles one living picture of how your business actually runs, start to finish, updating as your systems change." },
  { n: "04", title: "It tells you what needs you", desc: "Nadir watches everything against your rules and catches what's about to break — then tells you what to do, not just that something is red." },
  { n: "05", title: "It gets sharper on you", desc: "Every correction and every resolved issue teaches Nadir your company specifically. Month six knows you far better than week one." },
];

export const PLATFORM_LAYERS = [
  { n: "01", title: "It reads what you already have", desc: "Nadir connects to your real systems — even messy, decades-old ones — and reads them as they are. No cleanup project, no rip-and-replace." },
  { n: "02", title: "It works out how it all connects", desc: "Nadir matches the same thing across systems (an employee in one is the same person in another) and links the broken pieces into one picture you can actually see." },
  { n: "03", title: "It watches and acts", desc: "Nadir keeps checking against your rules and, when something's wrong, shows you why — with the evidence — and what to do next." },
];

const LIGHT = { bg: "transparent", fg: "#14181C", border: "1px solid rgba(20,24,28,0.18)", dot: "#0E7C8A", btnBg: "transparent", btnFg: "#14181C", btnBorder: "1.5px solid rgba(20,24,28,0.3)" };
const DARK = { bg: "#14181C", fg: "#FAF9F7", border: "1px solid #14181C", dot: "#15854F", btnBg: "#0E7C8A", btnFg: "#FFFFFF", btnBorder: "none" };

// A real ladder — no cliff from $20 straight to $1,800.
export const PRICING_TIERS = [
  {
    name: "Founder", who: "Solo operators & early startups", price: "$20", per: "/ month",
    seats: "2 seats · $8 / extra", usage: "AI included to $10/mo, then at cost",
    feats: ["Drop in files & spreadsheets", "Ask Nadir, cited answers", "Zero-to-one guidance plan", "Compliance baseline"],
    cta: "Start now", ...LIGHT,
  },
  {
    name: "Team", who: "Small teams, one location", price: "$250", per: "/ month",
    seats: "8 seats · $20 / extra", usage: "AI included to $75/mo, then metered",
    feats: ["Connect a live database", "Assignments & checklists", "Live layout & alerts", "Inbox & org chart"],
    cta: "Start now", ...LIGHT,
  },
  {
    name: "Business", who: "Growing operations, one busy site", price: "$700", per: "/ month",
    seats: "15 seats · $25 / extra", usage: "Metered AI with a cap you set · per-user visibility",
    feats: ["Everything in Team", "Full flow & object model", "Continuous compliance monitor", "Custom dashboards", "Audit trails, automatic"],
    cta: "Book a demo", badge: "MOST POPULAR", ...DARK,
  },
  {
    name: "Operations", who: "Mid-market, one site or many", price: "$1,800", per: "/ month",
    seats: "25 seats · $30 / extra", usage: "Metered AI · per-tenant cap · committed-use discounts",
    feats: ["Everything in Business", "Multi-site layouts", "Client-by-client models", "Priority support"],
    cta: "Book a demo", ...LIGHT,
  },
  {
    name: "Enterprise", who: "Multi-entity, regulated, MSP", price: "Custom", per: "platform + per-site",
    seats: "Negotiated seat blocks", usage: "Committed-use AI · client-by-client budgets",
    feats: ["Unlimited sources & sites", "Regulatory change tracking", "Dedicated implementation", "SSO · SOC 2 on request"],
    cta: "Talk to us", ...LIGHT,
  },
];

export const BILLING_COMPONENTS = [
  { n: "01", title: "Platform", desc: "A flat monthly fee for the fusion engine: connections, the ontology, the ops map, compliance monitoring, and audit trails. Predictable — it never scales with how much you ask." },
  { n: "02", title: "Seats", desc: "Per-user accounts with roles, inboxes, and area oversight. A block is included in every tier; extra seats are a simple per-user price. Viewers who only receive briefings are free." },
  { n: "03", title: "Metered intelligence", desc: "Model calls are billed as used — with a per-tenant cap you set, per-user usage visibility, and the discipline that keeps it small: cached mapping, algorithmic checks, and reused formats never bill twice." },
];
