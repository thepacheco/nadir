export const HOW_STEPS = [
  { n: "01", title: "Connection", desc: "Read-only, schema-level access to the databases you already run — however messy. No manual entry, no forms, no migration." },
  { n: "02", title: "Object mapping", desc: "AI proposes what each table actually represents in the real world — customers, work orders, machines, filings. You confirm once. Relationships are inferred automatically." },
  { n: "03", title: "The operational graph", desc: "A live map of how your business actually flows, start to finish — order in, product out. Current because it reads the live database, not a snapshot." },
  { n: "04", title: "The pain-point engine", desc: "AI watches the graph continuously: where is flow slowing, where is risk building, what broke last time this happened. Output isn’t a chart — it’s the next move." },
  { n: "05", title: "Compounding", desc: "Every new source makes the model sharper about your specific company. The longer it runs, the more it knows — and the harder it is to live without." },
];

export const PLATFORM_LAYERS = [
  { n: "LAYER 01", title: "Ingestion", desc: "Direct SQL-level connection to your databases and ERPs — not just API integrations. Maps disparate, inconsistent structures into one operational graph, however idiosyncratic the system." },
  { n: "LAYER 02", title: "Fusion", desc: "AI reconciles the mess: resolves naming conflicts, links processes across systems, and builds a coherent model of how the business moves from input to output." },
  { n: "LAYER 03", title: "Intelligence", desc: "Compliance monitoring against live requirements with auto-generated audit trails — plus operational foresight: the next bottleneck, the last fix, the next move." },
];

export const PRICING_TIERS = [
  {
    name: "Founder", who: "Startups and solo operators", price: "$20", per: "/ month platform",
    seats: "2 seats included · $8 / extra seat", usage: "AI usage included to $10/mo, then at cost",
    feats: ["Drop files & spreadsheets", "Zero-to-100 guidance plan", "Compliance baseline", "Ask anything, cited answers"],
    cta: "Start now", bg: "transparent", fg: "#14181C", border: "1px solid rgba(20,24,28,0.18)", dot: "#0E7C8A",
    btnBg: "transparent", btnFg: "#14181C", btnBorder: "1.5px solid rgba(20,24,28,0.3)",
  },
  {
    name: "Operations", who: "Mid-market, one site or many", price: "$1,800", per: "/ month platform",
    seats: "25 seats included · $30 / extra seat", usage: "Metered AI with per-tenant cap · per-user visibility",
    feats: ["Direct database connection", "Live ops map & alerts", "Full fusion graph & model", "Continuous compliance monitor", "Audit trails, auto-generated"],
    cta: "Book a demo", bg: "#14181C", fg: "#FAF9F7", border: "1px solid #14181C", dot: "#15854F",
    btnBg: "#0E7C8A", btnFg: "#FFFFFF", btnBorder: "none",
  },
  {
    name: "Enterprise", who: "Multi-entity, regulated, MSP", price: "Custom", per: "platform + per-site",
    seats: "Negotiated seat blocks across entities", usage: "Committed-use AI discounts · client-by-client budgets",
    feats: ["Unlimited sources & sites", "Client-by-client models", "Regulatory change tracking", "Dedicated fusion engineering"],
    cta: "Talk to us", bg: "transparent", fg: "#14181C", border: "1px solid rgba(20,24,28,0.18)", dot: "#0E7C8A",
    btnBg: "transparent", btnFg: "#14181C", btnBorder: "1.5px solid rgba(20,24,28,0.3)",
  },
];

export const BILLING_COMPONENTS = [
  { n: "01", title: "Platform", desc: "A flat monthly fee for the fusion engine: connections, the ontology, the ops map, compliance monitoring, and audit trails. Predictable — it never scales with how much you ask." },
  { n: "02", title: "Seats", desc: "Per-user accounts with roles, inboxes, and area oversight. A block is included in every tier; extra seats are a simple per-user price. Viewers who only receive briefings are free." },
  { n: "03", title: "Metered intelligence", desc: "Model calls are billed as used — with a per-tenant cap you set, per-user usage visibility, and the discipline that keeps it small: cached mapping, algorithmic checks, and reused formats never bill twice." },
];
