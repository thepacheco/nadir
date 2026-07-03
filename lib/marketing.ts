export const HOW_STEPS = [
  { n: "01", title: "Connection", desc: "We securely connect to the databases and software systems you are already using today (like SAP, Oracle, or legacy systems). We only require read-only access. There is no manual data entry required, and you do not have to migrate away from your current tools." },
  { n: "02", title: "Object Mapping", desc: "Our AI looks at your messy raw data (rows and columns) and translates it into real-world concepts you actually care about—like 'Shifts', 'Work Orders', 'Turbines', or 'Employees'. You confirm our guesses once, and the system remembers." },
  { n: "03", title: "The Operational Graph", desc: "Once the data is mapped, Nadir builds a living, breathing model of your entire business. It shows exactly how materials, people, and processes flow from start to finish, updating in real-time." },
  { n: "04", title: "The Rules Engine", desc: "Nadir constantly monitors your live data against a set of strict rules (like OSHA safety guidelines or financial limits). Instead of just showing you a dashboard with a red light, it tells you exactly what is about to break and what to do next." },
  { n: "05", title: "Compounding Knowledge", desc: "Every time you connect a new data source or confirm an AI suggestion, the system gets smarter about your specific company. It learns your operational quirks so well that it becomes a tailored nervous system for your business." },
];

export const PLATFORM_LAYERS = [
  { n: "LAYER 01", title: "Data Ingestion", desc: "We plug directly into your databases. Unlike basic API integrations, we can handle messy, unstructured, and idiosyncratic data from decades-old legacy systems without breaking a sweat." },
  { n: "LAYER 02", title: "AI Data Fusion", desc: "Our AI cleans up the mess. It automatically resolves naming conflicts (e.g., matching 'EmpID' in one system to 'EmployeeNumber' in another) and links broken processes together into one unified picture." },
  { n: "LAYER 03", title: "Active Intelligence", desc: "We run constant, automated compliance checks against your live data. When an issue arises, the system generates a human-readable audit trail and predicts the best corrective action." },
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
