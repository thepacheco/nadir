import type { CompanyId } from "./types";

export interface Wire {
  from: string; // table.column
  label: string; // relationship name, user-editable
  to: string; // target object (proposed name from obMappings)
  conf: string;
  custom?: boolean;
}

// Inferred relationship wiring per company — the starting point the user can
// rename, re-point, and extend during onboarding step 4.
export const WIRES: Record<CompanyId, Wire[]> = {
  utility: [
    { from: "wo_master.assigned_crew_id", label: "assigned to", to: "Crews / People", conf: "96%" },
    { from: "wo_master.asset_id", label: "performed on", to: "Assets", conf: "99%" },
    { from: "pi_tags_hourly.tag_id", label: "telemetry for", to: "Assets", conf: "93%" },
    { from: "incident_docs.wo_ref", label: "filed against", to: "Work Orders", conf: "88%" },
  ],
  manufacturing: [
    { from: "qb_purchase_orders.item_ref", label: "supplies", to: "Inventory", conf: "95%" },
    { from: "adp_shifts.operator_id", label: "operates", to: "Machine Events", conf: "92%" },
    { from: "OITM_items.lot_cert", label: "certifies", to: "Inventory", conf: "89%" },
    { from: "inventory_final_v7.xlsx.sku", label: "shadow of", to: "Inventory", conf: "84%" },
  ],
  staffing: [
    { from: "Pipeline (Sheet1).client_ref", label: "placed with", to: "Clients / Contacts", conf: "93%" },
    { from: "gusto_people.contractor_id", label: "paid as", to: "Contractors", conf: "97%" },
    { from: "Pipeline (Sheet1).source", label: "sourced by", to: "Clients / Contacts", conf: "91%" },
    { from: "notion_pages.doc_ref", label: "documents", to: "Candidates", conf: "86%" },
  ],
  restaurant: [
    { from: "ot_reservations.svc_date", label: "drives prep for", to: "Sales / Checks", conf: "96%" },
    { from: "shifts_schedule.emp_id", label: "staffs", to: "Sales / Checks", conf: "93%" },
    { from: "me_invoice_lines.contract_id", label: "priced against", to: "Invoices & Contracts", conf: "94%" },
    { from: "walkin_telemetry.site_id", label: "cold chain for", to: "Sales / Checks", conf: "90%" },
  ],
  aerospace: [
    { from: "ts_run_telemetry.serial_no", label: "tests", to: "Parts / BOM", conf: "95%" },
    { from: "etq_ncr_log.part_ref", label: "disposition for", to: "Parts / BOM", conf: "93%" },
    { from: "sap_po_lines.lot_no", label: "sources", to: "Parts / BOM", conf: "97%" },
    { from: "jira_issues.signoff_id", label: "blocks", to: "Quality Records (NCRs)", conf: "90%" },
  ],
};

// Phase 3 cost discipline, made visible: what actually costs money and what doesn't.
export const USAGE_ROWS = [
  { label: "Schema mapping", detail: "Built once from table structure + 3 sampled rows, then cached. Reused on every question.", cost: "$0.00", tag: "CACHED", color: "#15854F" },
  { label: "Deterministic checks", detail: "1,412 runs this month — joins, thresholds, cert expiry. Plain algorithms, no model calls.", cost: "$0.00", tag: "ALGORITHMIC", color: "#15854F" },
  { label: "Reconciliation (LLM)", detail: "38 calls where only a model could reconcile conflicting records.", cost: "$14.20", tag: "METERED", color: "#B47614" },
  { label: "Drafting & briefings", detail: "12 documents — 9 reused saved formats instead of regenerating.", cost: "$3.80", tag: "TEMPLATED", color: "#0E7C8A" },
];

export const USAGE_TOTAL = { spent: 18.0, cap: 50 };

// Per-user consumption this month, indexed against company.people order.
// The remainder (system jobs: sweeps, monitors, standing checks) is shown separately.
export const PER_USER_USAGE = [
  { queries: 124, briefings: 6, cost: "$4.10" },
  { queries: 86, briefings: 3, cost: "$2.60" },
  { queries: 51, briefings: 2, cost: "$1.30" },
];
export const SYSTEM_USAGE = { label: "System · sweeps & standing checks", queries: 1412, cost: "$10.00" };

// Learned formats: generated once, accepted, stored — never paid for twice.
export const FORMAT_LIBRARY = [
  { name: "One-page briefing", reuses: 6, saved: "accepted 5/12" },
  { name: "Write-up / incident entry", reuses: 4, saved: "accepted 5/28" },
  { name: "Dispute email", reuses: 3, saved: "accepted 6/09" },
  { name: "PO amendment", reuses: 2, saved: "accepted 6/21" },
];

// The system teaches you how to use itself.
export const GUIDE_STEPS = [
  { id: "ask", label: "Ask Nadir a question", desc: "Try a suggestion chip — every answer is grounded and cited.", screen: "chat" as const },
  { id: "evidence", label: "Open an alert's evidence", desc: "Click any pain point. Every number is a door.", screen: "chat" as const },
  { id: "approve", label: "Send a briefing for approval", desc: "The suggested action routes to the right approver — even around PTO.", screen: "chat" as const },
  { id: "expand", label: "Expand a fusion-graph node", desc: "Nodes with a “+” chip unfold into their components.", screen: "graph" as const },
  { id: "rewire", label: "Rewire a data connection", desc: "Connect a source, confirm objects, then rename and re-point the wiring yourself.", screen: "sources" as const },
  { id: "escalate", label: "Escalate up the chain", desc: "From a thread or an evidence drawer — Nadir walks the org chart for you.", screen: "team" as const },
];
