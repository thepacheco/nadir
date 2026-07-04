import type { Company } from "./types";

export const COMPANIES: Company[] = [
  {
    id: "utility",
    name: "Georgia Grid Services",
    industry: "Utility field services · 340 employees",
    nowMin: 390,
    sources: [
      { name: "ADP Workforce Now", meta: "HR · 340 records", node: 0 },
      { name: "IBM Maximo", meta: "Assets · 12,410 WOs", node: 1 },
      { name: "OSIsoft PI", meta: "SCADA historian · live", node: 2 },
      { name: "Oracle EBS", meta: "ERP · 96k rows", node: 5 },
      { name: "Outage Mgmt System", meta: "OMS · live", node: 8 },
      { name: "SharePoint", meta: "Docs · 4,120 files", node: 3 },
    ],
    kpis: [
      { label: "OPEN WORK ORDERS", val: "142", color: "#14181C" },
      { label: "CREWS ON SITE", val: "11 / 14", color: "#14181C" },
      { label: "COMPLIANCE FLAGS", val: "3", color: "#B47614" },
      { label: "DATA FRESHNESS", val: "2 min", color: "#15854F" },
    ],
    alerts: [
      { sev: "CRITICAL", color: "#C7452F", at: 372, time: "06:12", title: "Transformer T-114 running +8°C over seasonal norm", plain: "A main power transformer is overheating the same way one did right before it failed last year.", detail: "PI historian trend crossed threshold. Same signature preceded the T-109 failure last August.", loc: "Substation 4 · Bay 1", q: "What do I do about T-114?" },
      { sev: "WARNING", color: "#B47614", at: 340, time: "05:40", title: "Thursday crew shortage on Feeder 12 rebuild", plain: "Too many approved vacations landed on the same day as a big job — you're short two crews.", detail: "6 PTO approvals in ADP overlap the 4-crew minimum on Maximo WO-2291. You will be two crews short.", loc: "Ops · scheduling", q: "Fix Thursday’s crew shortage" },
      { sev: "WARNING", color: "#B47614", at: 0, time: "Mon", title: "OSHA 300 log missing 2 March incidents", plain: "Two workplace injuries were documented internally but never entered in the official government log.", detail: "Incident reports exist in SharePoint but were never posted to the log. Citable gap if audited.", loc: "Compliance", q: "Close the OSHA log gap" },
    ],
    intro: "Overnight read: 6 systems, 214,000 rows reconciled. Three things need you today.\n\n1. T-114 is trending toward the same failure signature as T-109 last August.\n2. Thursday's Feeder 12 job is two crews short because of approved PTO.\n3. Your OSHA 300 log is missing two March incidents that exist in SharePoint.\n\nWhere do you want to start?",
    suggestions: ["What do I do about T-114?", "Fix Thursday’s crew shortage", "Close the OSHA log gap"],
    replies: [
      { text: "T-114, in order:\n\n1. Dispatch a thermal inspection today — crew 7 is already at Substation 4 until 15:00 (Maximo), so no extra roll.\n2. Shift non-critical load to T-115, which is at 61% capacity (PI).\n3. If the trend holds past 92°C, pre-stage the spare from the Macon yard — that's what cut the outage from 3 days to 6 hours on T-109.\n\nI've drafted the work order. Want me to file it?", cites: ["PI historian · T-114 trend", "Maximo · crew 7 schedule", "Incident file · T-109, Aug ’25"] },
      { text: "Thursday, two options:\n\nA. Crews 3 and 9 are on a deferrable maintenance ticket (WO-2307, no compliance deadline) — move them to Feeder 12.\nB. Approved contractor pool has 4 qualified linemen available Thursday at standard rate.\n\nOption A costs nothing and delays a low-risk ticket 4 days. I'd take A. Want the schedule change drafted for your sign-off?", cites: ["ADP · PTO approvals", "Maximo · WO-2291, WO-2307"] },
      { text: "The two missing incidents are documented in SharePoint (IR-031, IR-034, both March, both recordable under 29 CFR 1904). I've pre-filled the OSHA 300 entries from the incident reports — they need a supervisor signature, nothing else.\n\nOnce posted, your log is current and the audit trail shows the correction was self-identified. That matters if OSHA ever looks.", cites: ["SharePoint · IR-031, IR-034", "29 CFR 1904.29"] },
    ],
    action: { title: "Snapshot ready for regional director", desc: "One-pager: T-114 risk, the plan, and cost of inaction — drafted from today’s data. Send it before the 10:00 standup." },
    plan: {
      subtitle: "What to do next, in order — grounded in today’s data, not a template.",
      why: "T-114 is sequenced first because failure cost dwarfs everything else; the crew fix rides on a no-cost schedule swap that expires Wednesday; the OSHA correction is cheap now and expensive after an audit letter.",
      cols: [
        { title: "NOW · TODAY", color: "#C7452F", items: [{ t: "Thermal inspection on T-114", d: "Crew 7 is on site until 15:00 — zero extra roll cost.", tag: "PREVENTS OUTAGE" }, { t: "Move crews 3 & 9 to Feeder 12", d: "Deferrable ticket WO-2307 slips 4 days, no penalty.", tag: "NO-COST FIX" }] },
        { title: "NEXT · THIS WEEK", color: "#B47614", items: [{ t: "Post the 2 missing OSHA 300 entries", d: "Pre-filled from SharePoint incident reports. Needs one signature.", tag: "COMPLIANCE" }, { t: "Pre-stage spare transformer at Macon", d: "Only if T-114 trend passes 92°C. Decision point: Thursday.", tag: "CONTINGENCY" }] },
        { title: "LATER · THIS QUARTER", color: "#15854F", items: [{ t: "Automate PTO-vs-crew-minimum check", d: "This conflict has happened 4 times this year. Make it a standing rule.", tag: "SYSTEMIZE" }, { t: "Connect the fleet telematics feed", d: "Adds truck location to the graph — cuts dispatch guesswork.", tag: "COMPOUND" }] },
      ],
    },
    compliance: {
      tiles: [{ label: "OPEN FINDINGS", val: "3", color: "#B47614" }, { label: "HIGH SEVERITY", val: "1", color: "#C7452F" }, { label: "PASSED CHECKS", val: "47", color: "#15854F" }, { label: "NEXT AUDIT", val: "38 days", color: "#14181C" }],
      findings: [
        { sev: "HIGH", rule: "OSHA 300 log — 2 unrecorded March incidents", detail: "IR-031 and IR-034 are recordable under 29 CFR 1904 but absent from the log.", status: "OPEN" },
        { sev: "MED", rule: "NERC PRC-005 — relay test interval", detail: "Substation 2 relay bank is 11 days past its maintenance interval per Maximo history.", status: "OPEN" },
        { sev: "MED", rule: "I-9 documentation — 3 files incomplete", detail: "ADP shows 3 active employees with missing Section 2 verification.", status: "IN REVIEW" },
        { sev: "PASS", rule: "EPA SPCC plan — annual review", detail: "Reviewed and signed 04/2026. Next review due 04/2027.", status: "CURRENT" },
      ],
      audit: [
        { time: "06:14", text: "T-114 thermal exposure logged; recommendation generated and timestamped." },
        { time: "05:41", text: "Crew shortage detected — ADP PTO joined against Maximo WO-2291 minimums." },
        { time: "Mon", text: "OSHA 300 gap identified by cross-referencing SharePoint incident reports." },
        { time: "Mon", text: "PRC-005 interval check ran against Maximo maintenance history — 1 exception." },
        { time: "Sun", text: "Weekly full-graph compliance sweep: 47 checks passed, 3 findings open." },
      ],
    },
    people: [
      {
        initials: "RM", name: "Rosa Mendez", dept: "FIELD OPS", role: "Field Operations Manager", email: "r.mendez@ggs.com", phone: "(404) 555-0142", status: "red",
        issue: "T-114 thermal risk — needs crew 7 diverted for inspection today.", unread: 2, manager: "Gil Harmon · VP Field Operations",
        thread: [{ from: "nadir", text: "Heads up: T-114 crossed its thermal threshold at 06:12. Crew 7 is closest." }, { from: "them", text: "Saw the alert. Can we cover it without pulling crew 7 off the Feeder 8 job?" }, { from: "them", text: "Also — are we still 2 short for Thursday?" }],
        draft: "Rosa — keep crew 7 on Feeder 8; they pass Sub 4 at 14:30, do the T-114 thermal scan then. Thursday shortage is solved: moving crews 3 & 9 off WO-2307. Plan attached.",
      },
      {
        initials: "DT", name: "Derek Tran", dept: "COMPLIANCE", role: "EHS & Compliance Lead", email: "d.tran@ggs.com", phone: "(404) 555-0187", status: "amber",
        issue: "OSHA 300 log missing IR-031 & IR-034; PRC-005 relay interval overdue.", unread: 1, manager: "Coleen Marsh · COO",
        thread: [{ from: "them", text: "Did the weekend sweep flag anything I need before the audit window?" }, { from: "nadir", text: "Two OSHA 300 entries are missing and one relay bank is past interval. Both drafted." }],
        draft: "Derek — pre-filled OSHA 300 entries for IR-031/IR-034 are ready for your signature, and I’ve queued the PRC-005 relay bank into next week’s maintenance. Sign and both findings close.",
      },
      {
        initials: "PW", name: "Priya Walsh", dept: "HR", role: "HR Business Partner", email: "p.walsh@ggs.com", phone: "(404) 555-0119", status: "amber",
        issue: "3 I-9 files incomplete; PTO approvals collided with Thursday crew minimum.", unread: 0, manager: "Coleen Marsh · COO",
        thread: [{ from: "nadir", text: "FYI — 3 active employees have incomplete I-9 Section 2 verification in ADP." }],
        draft: "Priya — flagging 3 incomplete I-9s (list attached). Also, the Thursday PTO approvals put Feeder 12 below crew minimum; ops has a fix, no action needed from you, just visibility.",
      },
    ],
    graph: {
      nodes: [
        { label: "ADP", type: "source", x: 10, y: 18, meta: "HR system of record. Feeds the Crew object: rosters, PTO, certifications.", derivation: [{ step: "READ", text: "Schema pulled read-only from ADP Workforce Now." }, { step: "MAP", text: 'emp_roster_v3 proposed as "Crews / People" — confirmed by ops manager.' }, { step: "LINK", text: "Joined to Work Orders via assigned_crew_id." }] },
        { label: "Maximo", type: "source", x: 10, y: 42, meta: "Asset management. Feeds Work Orders and Asset condition history.", derivation: [{ step: "READ", text: "Direct SQL read of Maximo wo_master + asset_registry." }, { step: "MAP", text: "Two tables mapped to Work Orders and Assets." }, { step: "LINK", text: "Asset condition history joined to PI telemetry by tag." }] },
        { label: "PI Historian", type: "source", x: 10, y: 66, meta: "SCADA time-series. Feeds live Asset telemetry — temperatures, loads, states.", derivation: [{ step: "READ", text: "Streaming read of PI tag hierarchy (8.1M hourly points)." }, { step: "MAP", text: "Tags matched to physical Assets by naming + location." }, { step: "WATCH", text: "T-114 temp trend compared against T-109 pre-failure signature." }] },
        { label: "SharePoint", type: "source", x: 10, y: 88, meta: "Unstructured docs. Feeds Incidents and compliance filings via document parsing.", derivation: [{ step: "READ", text: "Document library indexed and parsed." }, { step: "MAP", text: "Incident reports extracted to structured Incidents." }, { step: "LINK", text: "Cross-checked against OSHA 300 log — 2 gaps found." }] },
        { label: "Crews", type: "object", x: 36, y: 22, meta: "14 crews, 340 people. Linked to work orders, certifications, and PTO calendar.", derivation: [{ step: "FROM", text: "Built from ADP roster + certification records." }, { step: "LINK", text: "PTO calendar joined to scheduling constraints." }] },
        { label: "Work Orders", type: "object", x: 36, y: 50, meta: "12,410 records. Each links a crew, an asset, materials, and a compliance requirement.", derivation: [{ step: "FROM", text: "Maximo wo_master, confirmed 98%." }, { step: "LINK", text: "Each WO joins Crew + Asset + Filing." }] },
        { label: "Assets", type: "object", x: 36, y: 76, meta: "2,180 tracked assets. Live telemetry joined to maintenance history.", derivation: [{ step: "FROM", text: "Maximo asset_registry + PI live tags." }, { step: "WATCH", text: "T-114 flagged as a live risk node." }] },
        { label: "Scheduling", type: "process", x: 63, y: 30, meta: "Where crews meet work orders. Current constraint: Thursday PTO conflict.", derivation: [{ step: "INFER", text: "Process inferred from crew↔WO assignment timestamps." }, { step: "FLAG", text: "Thursday minimum-crew constraint violated." }] },
        { label: "Field Work", type: "process", x: 63, y: 62, meta: "Execution flow: dispatch → work → closeout → filing.", derivation: [{ step: "INFER", text: "Flow reconstructed from WO status transitions." }] },
        { label: "T-114 risk", type: "risk", x: 86, y: 46, meta: "Live risk node. Thermal trend matches the T-109 pre-failure signature. Plan attached.", derivation: [{ step: "SIGNAL", text: "PI temp trend +8°C over norm at 06:12." }, { step: "MATCH", text: "Pattern matches T-109 (Aug ’25) pre-failure." }, { step: "ACT", text: "Inspection + load-shift plan generated." }] },
      ],
      edges: [[0, 4], [1, 5], [1, 6], [2, 6], [3, 5], [4, 7], [5, 7], [5, 8], [6, 8], [7, 9], [8, 9], [6, 9]],
    },
    obTables: [{ name: "wo_master", rows: "12,410" }, { name: "emp_roster_v3", rows: "340" }, { name: "asset_registry", rows: "2,180" }, { name: "pi_tags_hourly", rows: "8.1M" }, { name: "incident_docs", rows: "4,120" }],
    obMappings: [{ table: "wo_master", proposed: "Work Orders", conf: "98% confident" }, { table: "emp_roster_v3", proposed: "Crews / People", conf: "96% confident" }, { table: "asset_registry", proposed: "Assets", conf: "99% confident" }, { table: "pi_tags_hourly", proposed: "Asset Telemetry", conf: "93% confident" }, { table: "incident_docs", proposed: "Incidents & Filings", conf: "88% confident" }],
    obDone: "5 tables mapped to real-world objects. 12 relationships inferred from keys and timestamps.",
  },
  {
    id: "manufacturing",
    name: "Hartwell Pencil Co.",
    industry: "Manufacturing · 146 on shift",
    nowMin: 430,
    sources: [
      { name: "SAP Business One", meta: "ERP · 61k rows", node: 0 },
      { name: "Ignition SCADA", meta: "Floor systems · live", node: 1 },
      { name: "ADP", meta: "HR · 212 records", node: 2 },
      { name: "QuickBooks", meta: "Finance · 9,340 txns", node: 3 },
      { name: "inventory_final_v7.xlsx", meta: "Spreadsheet · 1,806 rows", node: 4 },
    ],
    kpis: [{ label: "LINES RUNNING", val: "2 / 3", color: "#C7452F" }, { label: "OEE TODAY", val: "71%", color: "#B47614" }, { label: "SHIP-HOLD RISK", val: "1 lot", color: "#B47614" }, { label: "CERT OPS · SAT", val: "4 / 6", color: "#C7452F" }],
    alerts: [
      { sev: "CRITICAL", color: "#C7452F", at: 422, time: "07:02", title: "Line 3 kiln down — cedar backlog forming", plain: "The oven that dries pencil wood is down, and unfinished wood is piling up behind it.", detail: "Ignition fault E-217. Slat backlog at station 4 hits bottleneck in 3.2 hours at current takt.", loc: "Floor · Line 3", q: "Walk me through the kiln fix" },
      { sev: "WARNING", color: "#B47614", at: 0, time: "Sat", title: "Saturday OT run needs 6 certified kiln operators — only 4 scheduled", plain: "Two of Saturday's overtime workers are no longer certified to run the kiln.", detail: "ADP training records joined against Saturday overtime approvals: two approved operators’ kiln certifications lapsed last month.", loc: "Training · scheduling", q: "Fix Saturday’s operator gap" },
      { sev: "WARNING", color: "#B47614", at: 0, time: "6/28", title: "Graphite lot #88 — supplier cert expired", plain: "A batch of pencil graphite is missing its supplier paperwork, which could hold up Friday's shipment.", detail: "Cert lapsed 6/28 in SAP. Lot feeds Friday’s export order. Ship-hold risk if unresolved.", loc: "QA · receiving", q: "What about lot #88?" },
    ],
    intro: "Morning read: 5 systems reconciled, including the spreadsheet nobody admits is load-bearing.\n\n1. Line 3's kiln has been down 41 minutes — backlog hits the bottleneck in ~3 hours.\n2. Saturday's overtime run needs 6 certified kiln operators; only 4 on the schedule are current. Two certs lapsed last month and nobody caught it.\n3. Graphite lot #88's supplier cert expired — it feeds Friday's export order.\n\nWhich first?",
    suggestions: ["Walk me through the kiln fix", "Fix Saturday’s operator gap", "What about lot #88?"],
    replies: [
      { text: "Kiln E-217 has occurred twice before — March 2024 and Nov 2025. Both times it was the feed damper actuator, not the burner. Repair took 90 minutes once the right part was in hand.\n\n1. Part #KD-3341 is in stores (bin 14-C, qty 2, per SAP).\n2. Reroute slats to Line 1's kiln at half-rate — buys 2 hours of buffer.\n3. If it's not the actuator, the fault history says call Vesta Services; they've closed every other E-217 same-day.\n\nMaintenance ticket drafted. File it?", cites: ["Ignition · fault log E-217", "SAP · stores bin 14-C", "Maintenance history · Mar ’24, Nov ’25"] },
      { text: "Saturday's gap, two ways to close it:\n\nA. Rodriguez and Chen — the two whose kiln certs lapsed — are both eligible for the 2-hour recert class. The instructor is on site Thursday; both pass and Saturday is covered at zero schedule impact.\n\nB. Pull Okafor and Reyes from Line 1 (both current) and backfill Line 1 with uncertified labor — Line 1 doesn't require kiln certs. Costs you ~4% takt on Line 1 for the shift.\n\nA is cheaper and fixes it permanently. I've drafted the recert enrollment and the Saturday schedule both ways.\n\nAlso: this is the second cert-vs-schedule collision this year. I can make cert expiry a standing check against every posted schedule.", cites: ["ADP · training records", "ADP · OT approvals 6/28", "Ignition · Line 1 takt"] },
      { text: "Lot #88 options, in order of cost:\n\nA. The supplier's updated cert may already exist — their portal shows a renewal issued 6/30. I've requested the document; if it lands, this closes for free.\nB. Swap in lot #85 (certified, 340kg on hand) for Friday's export run and burn #88 domestically after recert.\n\nEither way Friday ships. A costs nothing; B costs a re-stage. Start with A, fall back to B Thursday noon.", cites: ["SAP · lot #88, #85", "Supplier portal · cert renewal 6/30"] },
    ],
    action: { title: "Snapshot ready for plant manager", desc: "Kiln status, the Saturday recert plan, and lot #88 on one page — drafted for the 09:30 floor meeting." },
    plan: {
      subtitle: "Today’s sequence for the floor — ordered by cost of waiting.",
      why: "The kiln is first because the backlog compounds by the hour; the recert class only runs Thursday, so missing it means paying for option B; lot #88 has until Thursday noon before the fallback swap must start.",
      cols: [
        { title: "NOW · TODAY", color: "#C7452F", items: [{ t: "Swap kiln feed damper actuator", d: "Part in bin 14-C. Same fault, same fix, twice before — 90 min.", tag: "STOPS BLEEDING" }, { t: "Enroll Rodriguez & Chen in Thursday recert", d: "2-hour class, instructor already on site. Covers Saturday.", tag: "HARD DEADLINE" }] },
        { title: "NEXT · THIS WEEK", color: "#B47614", items: [{ t: "Chase lot #88 cert / stage lot #85", d: "Renewal likely exists. Decision point Thursday noon.", tag: "SHIP FRIDAY" }, { t: "Post-mortem the E-217 pattern", d: "Three occurrences. Price a spare actuator on the shelf vs downtime.", tag: "PREVENT REPEAT" }] },
        { title: "LATER · THIS QUARTER", color: "#15854F", items: [{ t: "Standing cert-vs-schedule check", d: "Every posted schedule joined against training records, automatically.", tag: "SYSTEMIZE" }, { t: "Retire inventory_final_v7.xlsx", d: "It’s load-bearing and unversioned. Migrate to SAP or keep it synced.", tag: "DE-RISK" }] },
      ],
    },
    compliance: {
      tiles: [{ label: "OPEN FINDINGS", val: "2", color: "#B47614" }, { label: "HIGH SEVERITY", val: "1", color: "#C7452F" }, { label: "PASSED CHECKS", val: "31", color: "#15854F" }, { label: "EXPORT DOCS", val: "AT RISK", color: "#B47614" }],
      findings: [
        { sev: "HIGH", rule: "Supplier certification — graphite lot #88", detail: "Cert lapsed 6/28. Lot is allocated to Friday’s export order; shipping uncertified material is a violation.", status: "OPEN" },
        { sev: "MED", rule: "OSHA machine guarding — Line 2 station 6", detail: "Guard interlock bypassed 4 times this month per Ignition event log.", status: "OPEN" },
        { sev: "PASS", rule: "Hazcom — SDS binder current", detail: "All 34 chemicals on floor have current sheets on file.", status: "CURRENT" },
        { sev: "PASS", rule: "Forklift certifications", detail: "12 of 12 operators current in ADP training records.", status: "CURRENT" },
      ],
      audit: [
        { time: "07:02", text: "Line 3 downtime logged with fault code, backlog projection, and response plan." },
        { time: "06:55", text: "Operator cert gap flagged — ADP training records joined against Saturday OT schedule." },
        { time: "6/28", text: "Lot #88 cert expiry detected on SAP receiving record; export allocation cross-checked." },
        { time: "6/27", text: "Guard interlock bypass pattern surfaced from Ignition event log — 4 events." },
        { time: "6/25", text: "Weekly sweep: 31 checks passed, 2 findings open." },
      ],
    },
    people: [
      {
        initials: "MK", name: "Marcus Kim", dept: "FLOOR", role: "Line 3 Supervisor", email: "m.kim@hartwell.co", phone: "(912) 555-0164", status: "red",
        issue: "Kiln E-217 down 41 min; cedar backlog building at station 4.", unread: 3, manager: "Dale Whitfield · Plant Manager",
        thread: [{ from: "them", text: "Kiln’s down again. Same code as last time?" }, { from: "nadir", text: "Yes — E-217. Both prior times it was the feed damper actuator, not the burner." }, { from: "them", text: "Part in stores?" }, { from: "them", text: "And what do I do with the slat backlog meanwhile?" }],
        draft: "Marcus — actuator #KD-3341 is in bin 14-C, qty 2. Swap it (90 min job, done twice before). Meanwhile reroute slats to Line 1 kiln at half-rate to hold the buffer. Ticket drafted, waiting your OK.",
      },
      {
        initials: "LR", name: "Lena Ruiz", dept: "QA", role: "Quality & Compliance Manager", email: "l.ruiz@hartwell.co", phone: "(912) 555-0198", status: "amber",
        issue: "Graphite lot #88 supplier cert expired; feeds Friday export order.", unread: 1, manager: "Dale Whitfield · Plant Manager",
        thread: [{ from: "nadir", text: "Lot #88 cert lapsed 6/28 and it’s allocated to Friday’s export run." }, { from: "them", text: "Do we have a certified substitute or do we hold the shipment?" }],
        draft: "Lena — supplier portal shows a renewed cert issued 6/30; I’ve requested the doc. If it lands by Thursday noon, #88 is clean. If not, swap in lot #85 (certified, 340kg on hand). Either way Friday ships.",
      },
      {
        initials: "TB", name: "Tanya Brooks", dept: "TRAINING", role: "Training & Certification Coordinator", email: "t.brooks@hartwell.co", phone: "(912) 555-0121", status: "amber",
        issue: "Saturday OT run: 2 of 6 scheduled kiln operators have lapsed certs.", unread: 0, manager: "Dale Whitfield · Plant Manager",
        thread: [{ from: "nadir", text: "Saturday’s OT schedule includes Rodriguez and Chen, whose kiln certifications lapsed last month." }],
        draft: "Tanya — Rodriguez and Chen are pre-enrolled in Thursday’s 2-hour recert class (instructor’s already on site). Both pass and Saturday is covered. I’ll also run cert expiry against every posted schedule going forward.",
      },
    ],
    graph: {
      nodes: [
        { label: "SAP B1", type: "source", x: 10, y: 18, meta: "ERP. Feeds Inventory, Orders, and supplier records.", derivation: [{ step: "READ", text: "Direct SQL read of SAP Business One." }, { step: "MAP", text: "OITM_items → Inventory (99%)." }, { step: "LINK", text: "Supplier cert dates joined to lot records." }] },
        { label: "Ignition", type: "source", x: 10, y: 42, meta: "Floor SCADA. Feeds Machines: states, faults, counts.", derivation: [{ step: "READ", text: "Streaming read of Ignition event tags." }, { step: "WATCH", text: "Fault E-217 matched to Line 3 kiln." }] },
        { label: "ADP", type: "source", x: 10, y: 66, meta: "HR. Feeds Shifts: roster, overtime, certifications.", derivation: [{ step: "READ", text: "ADP shift + roster + training tables read." }, { step: "LINK", text: "OT approvals joined to certification records." }] },
        { label: "QuickBooks", type: "source", x: 10, y: 88, meta: "Finance. Feeds POs and invoices.", derivation: [{ step: "READ", text: "QuickBooks PO + invoice ledger read." }, { step: "CHECK", text: "PO price variance checks run nightly." }] },
        { label: "Inventory", type: "object", x: 36, y: 22, meta: "1,806 SKUs. Includes the spreadsheet, reconciled nightly against SAP.", derivation: [{ step: "FROM", text: "SAP OITM_items + shadow spreadsheet." }, { step: "RECONCILE", text: "xlsx reconciled nightly to catch drift." }] },
        { label: "Machines", type: "object", x: 36, y: 50, meta: "3 lines, 14 stations. Live state from Ignition joined to maintenance history.", derivation: [{ step: "FROM", text: "Ignition tags mapped to stations." }, { step: "WATCH", text: "Line 3 kiln flagged as risk." }] },
        { label: "Shifts", type: "object", x: 36, y: 76, meta: "146 on shift tomorrow. Roster, overtime, and certifications linked here.", derivation: [{ step: "FROM", text: "ADP roster + OT approvals." }, { step: "LINK", text: "Cert records joined — Saturday gap found." }] },
        { label: "Production", type: "process", x: 63, y: 34, meta: "Cedar in → slats → pencils → packed. Current takt limited by Line 3.", derivation: [{ step: "INFER", text: "Flow from station throughput counts." }, { step: "FLAG", text: "Line 3 kiln is the current bottleneck." }] },
        { label: "Fulfillment", type: "process", x: 63, y: 66, meta: "Orders → allocation → QA → ship. Friday export order runs through here.", derivation: [{ step: "INFER", text: "Reconstructed from order status flow." }, { step: "FLAG", text: "Lot #88 cert blocks Friday allocation." }] },
        { label: "Line 3 kiln", type: "risk", x: 86, y: 34, meta: "Down 41 min, fault E-217. Fix plan attached — actuator in stores.", derivation: [{ step: "SIGNAL", text: "Ignition fault E-217 at 07:02." }, { step: "MATCH", text: "Same fault Mar ’24 and Nov ’25." }, { step: "ACT", text: "Actuator-swap plan generated." }] },
        { label: "Lot #88 hold", type: "risk", x: 86, y: 66, meta: "Cert lapsed; feeds Friday export. Two-path resolution attached.", derivation: [{ step: "SIGNAL", text: "SAP cert expiry on lot #88." }, { step: "TRACE", text: "Allocated to Friday export order." }, { step: "ACT", text: "Chase-cert / swap-#85 plan generated." }] },
      ],
      edges: [[0, 4], [1, 5], [2, 6], [3, 6], [3, 4], [4, 7], [5, 7], [6, 7], [4, 8], [7, 9], [8, 10], [5, 9]],
    },
    obTables: [{ name: "OITM_items", rows: "1,806" }, { name: "ign_events", rows: "2.4M" }, { name: "adp_shifts", rows: "18,220" }, { name: "qb_purchase_orders", rows: "9,340" }, { name: "inventory_final_v7.xlsx", rows: "1,806" }],
    obMappings: [{ table: "OITM_items", proposed: "Inventory", conf: "99% confident" }, { table: "ign_events", proposed: "Machine Events", conf: "97% confident" }, { table: "adp_shifts", proposed: "Shifts / People", conf: "96% confident" }, { table: "qb_purchase_orders", proposed: "Purchase Orders", conf: "95% confident" }, { table: "inventory_final_v7.xlsx", proposed: "Inventory (shadow copy)", conf: "84% confident" }],
    obDone: "5 tables mapped, including one shadow spreadsheet Nadir now reconciles nightly.",
  },
  {
    id: "staffing",
    name: "Meridian Staffing",
    industry: "Staffing startup · 2 founders, 7 placed",
    nowMin: 600,
    sources: [
      { name: "Google Sheets", meta: "Pipeline · 214 rows", node: 0 },
      { name: "HubSpot", meta: "CRM · 38 contacts", node: 1 },
      { name: "Gusto", meta: "Payroll · 9 records", node: 2 },
      { name: "Notion", meta: "Docs · 86 pages", node: 3 },
    ],
    kpis: [{ label: "RUNWAY", val: "4.2 mo", color: "#B47614" }, { label: "PIPELINE", val: "$86k", color: "#14181C" }, { label: "PLACED", val: "7", color: "#15854F" }, { label: "OVERDUE INVOICES", val: "1", color: "#C7452F" }],
    alerts: [
      { sev: "CRITICAL", color: "#C7452F", at: 0, time: "Now", title: "No signed MSA template — blocking 2 pending clients", plain: "Two clients are ready to sign, but you have no standard contract to send them.", detail: "Both deals in HubSpot are stalled at “contract” stage. There is no master services agreement anywhere in Notion or Drive.", loc: "Legal · contracts", q: "How do I get an MSA?" },
      { sev: "WARNING", color: "#B47614", at: 0, time: "Now", title: "Runway 4.2 months at current burn", plain: "At current spending you have about four months of cash left.", detail: "Gusto payroll plus recurring spend against the bank feed. One more placement extends it to 5.8.", loc: "Finance", q: "How do I extend runway?" },
      { sev: "WARNING", color: "#B47614", at: 0, time: "12 d", title: "Invoice #0007 overdue — $9,400", plain: "A client owes you $9,400 and nobody has reminded them yet.", detail: "Sent 12 days ago, no payment, no follow-up email on record in HubSpot.", loc: "AR", q: "Draft the invoice follow-up" },
    ],
    intro: "I've read your pipeline sheet, HubSpot, Gusto, and Notion. You're earlier-stage than the other companies in this demo, so the guidance is more zero-to-one.\n\n1. Two clients are stuck at contract stage because you don't have an MSA. This is your bottleneck — not sales.\n2. Invoice #0007 ($9,400) is 12 days overdue and nobody has followed up.\n3. Runway is 4.2 months. One placement extends it to 5.8.\n\nThe MSA is the highest-leverage fix. Want the plan?",
    suggestions: ["How do I get an MSA?", "Draft the invoice follow-up", "How do I find my next client?"],
    replies: [
      { text: "MSA, fastest credible path:\n\n1. Start from a staffing-specific template (SHRM and Priori both publish them) — do not write one from scratch.\n2. Get a flat-fee review from an employment attorney — typical range $500–$1,500, 3–5 days. You need staffing-specific indemnification and co-employment language; this is not optional in your industry.\n3. Send to both stalled clients the day it's back.\n\nBoth deals total $31k. A $1,000 legal spend to unblock $31k is the easiest decision in your pipeline. I can draft the attorney outreach email now.", cites: ["HubSpot · 2 deals at contract stage", "Pipeline sheet · deal values"] },
      { text: 'Follow-up drafted:\n\n"Hi Dana — flagging invoice #0007 ($9,400, due 6/20) as past due. Happy to resend or set up ACH if easier. Could you confirm payment timing this week?"\n\nFirm, warm, no apology. If no reply in 3 business days, the next one goes to their AP address with the original attached. After that, a call — 90% of first-invoice delays at this size are process, not solvency.\n\nAlso: your invoices don’t state payment terms. Add "Net 15" to the template and this stops recurring.', cites: ["HubSpot · no follow-up logged", "Invoice #0007 · sent 6/20"] },
      { text: "Your own data answers this: all 7 placements came from 2 clients, both in healthcare admin, both found via referral — zero from cold outreach (38 contacts, 0 conversions).\n\nSo: don't scale cold email. Work the referral vein.\n\n1. Ask both active clients for one introduction each — you have a 100% close rate on referrals.\n2. Join the two regional healthcare HR associations your clients belong to (they're listed on their sites).\n3. The MSA has to come first — a referral you can't sign is a referral you lose.", cites: ["Pipeline sheet · source column", "HubSpot · conversion by channel"] },
    ],
    action: { title: "Founder briefing ready", desc: "One page: the MSA bottleneck, the $31k it unblocks, and this week’s three moves. Send to your co-founder." },
    plan: {
      subtitle: "Zero to one hundred — the order matters more than the effort.",
      why: "The MSA is sequenced first because it unblocks $31k already in pipeline; cash actions come before growth actions because runway is the clock everything else runs on.",
      cols: [
        { title: "NOW · THIS WEEK", color: "#C7452F", items: [{ t: "Get the MSA reviewed and signed", d: "Template + flat-fee attorney review. Unblocks $31k in stalled deals.", tag: "UNBLOCKS REVENUE" }, { t: "Chase invoice #0007", d: "Follow-up drafted. $9,400 is 7% of your runway.", tag: "CASH" }, { t: "Add Net 15 terms to invoice template", d: "Prevents the next overdue before it happens.", tag: "5-MIN FIX" }] },
        { title: "NEXT · THIS MONTH", color: "#B47614", items: [{ t: "Ask both clients for one referral each", d: "100% historical close rate on referrals vs 0% on cold.", tag: "GROWTH" }, { t: "Workers’ comp + liability COI", d: "Every serious client will require it. Get quotes before they ask.", tag: "REMOVES FRICTION" }] },
        { title: "LATER · THIS QUARTER", color: "#15854F", items: [{ t: "Move pipeline off Google Sheets", d: "When you pass ~30 active candidates, the sheet becomes the bottleneck.", tag: "SCALE PREP" }, { t: "Seed conversations — only after 3 clients", d: "A working referral engine is a fundable story. An idea is not.", tag: "FUNDING PATH" }] },
      ],
    },
    compliance: {
      tiles: [{ label: "OPEN FINDINGS", val: "3", color: "#B47614" }, { label: "HIGH SEVERITY", val: "1", color: "#C7452F" }, { label: "PASSED CHECKS", val: "12", color: "#15854F" }, { label: "ENTITY STATUS", val: "GOOD", color: "#15854F" }],
      findings: [
        { sev: "HIGH", rule: "No MSA / contractor agreements on file", detail: "Placements are operating on email threads. Co-employment liability is unbounded without signed agreements.", status: "OPEN" },
        { sev: "MED", rule: "W-9s missing for 2 contractors", detail: "Gusto shows 2 of 9 contractor files without W-9s. Needed before any 1099 filing.", status: "OPEN" },
        { sev: "MED", rule: "Workers’ comp coverage not found", detail: "No policy detected in expenses or docs. Most client contracts will require a COI.", status: "OPEN" },
        { sev: "PASS", rule: "State registration & EIN", detail: "Entity in good standing; payroll registrations current in Gusto.", status: "CURRENT" },
      ],
      audit: [
        { time: "Today", text: "Contract-stage stall linked to missing MSA — flagged as revenue-blocking." },
        { time: "Today", text: "Runway recomputed from Gusto payroll + bank feed: 4.2 months." },
        { time: "6/30", text: "Invoice #0007 aged past 10 days with no follow-up on record." },
        { time: "6/28", text: "W-9 gap detected across contractor files in Gusto." },
        { time: "6/25", text: "Initial compliance baseline: 12 checks passed, 3 findings open." },
      ],
    },
    people: [
      {
        initials: "JD", name: "Jordan Diaz", dept: "CO-FOUNDER", role: "Co-founder / Sales", email: "jordan@meridianstaff.co", phone: "(678) 555-0155", status: "red",
        issue: "Two deals stalled at contract stage — no MSA to sign.", unread: 2, manager: "Board · monthly check-in",
        thread: [{ from: "them", text: "Both my healthcare deals went quiet. Did I lose them?" }, { from: "nadir", text: "No — they’re stuck at “contract” in HubSpot. You have no MSA to send them." }, { from: "them", text: "So it’s not a sales problem?" }],
        draft: "Jordan — it’s not sales, it’s paperwork. Both deals ($31k total) are waiting on an MSA. A $1k flat-fee attorney review unblocks them this week. Attorney outreach email drafted — want me to send?",
      },
      {
        initials: "AT", name: "Amara Twinam", dept: "FINANCE", role: "Co-founder / Ops & Finance", email: "amara@meridianstaff.co", phone: "(678) 555-0173", status: "amber",
        issue: "Runway 4.2 mo; invoice #0007 ($9,400) 12 days overdue.", unread: 1, manager: "Board · monthly check-in",
        thread: [{ from: "nadir", text: "Invoice #0007 is 12 days overdue with no follow-up logged. That’s 7% of runway sitting idle." }, { from: "them", text: "Ugh. Can you draft something that isn’t awkward?" }],
        draft: "Amara — follow-up for #0007 is drafted (firm, warm, no apology). If no reply in 3 business days it escalates to their AP contact. Also adding “Net 15” to the invoice template so this stops happening.",
      },
    ],
    graph: {
      nodes: [
        { label: "Sheets", type: "source", x: 10, y: 20, meta: "Pipeline spreadsheet. Feeds Candidates and deal sources.", derivation: [{ step: "READ", text: "Google Sheet pipeline parsed." }, { step: "MAP", text: "Rows → Candidates (91%)." }, { step: "ANALYZE", text: "Source column shows 100% of placements from referrals." }] },
        { label: "HubSpot", type: "source", x: 10, y: 44, meta: "CRM. Feeds Clients, deals, and outreach history.", derivation: [{ step: "READ", text: "HubSpot contacts + deal stages read." }, { step: "FLAG", text: "2 deals stuck at contract stage." }] },
        { label: "Gusto", type: "source", x: 10, y: 68, meta: "Payroll. Feeds Contractors and burn rate.", derivation: [{ step: "READ", text: "Gusto payroll records read." }, { step: "COMPUTE", text: "Burn rate → 4.2 months runway." }] },
        { label: "Notion", type: "source", x: 10, y: 88, meta: "Docs. Searched for contracts, SOPs, and templates — MSA not found.", derivation: [{ step: "READ", text: "86 Notion pages indexed." }, { step: "SEARCH", text: "No MSA or contractor agreement found anywhere." }] },
        { label: "Candidates", type: "object", x: 36, y: 26, meta: "214 tracked. 7 placed, all via referral-sourced clients.", derivation: [{ step: "FROM", text: "Pipeline sheet rows." }, { step: "LINK", text: "Joined to Clients by placement." }] },
        { label: "Clients", type: "object", x: 36, y: 54, meta: "2 active + 2 stalled at contract stage. Both stalls share one cause.", derivation: [{ step: "FROM", text: "HubSpot deals + contacts." }, { step: "FLAG", text: "Both stalls trace to the MSA gap." }] },
        { label: "Cash", type: "object", x: 36, y: 80, meta: "Burn from Gusto + bank feed. Runway 4.2 months.", derivation: [{ step: "FROM", text: "Gusto + bank feed." }, { step: "WATCH", text: "Overdue invoice = 7% of runway." }] },
        { label: "Placements", type: "process", x: 63, y: 38, meta: "Source → screen → place → invoice. Conversion is 100% referral-driven.", derivation: [{ step: "INFER", text: "Flow from candidate status history." }] },
        { label: "Billing", type: "process", x: 63, y: 70, meta: "Invoice → payment → payroll. One invoice aging, no terms on template.", derivation: [{ step: "INFER", text: "Reconstructed from invoice + payment records." }, { step: "FLAG", text: "#0007 overdue, no terms set." }] },
        { label: "MSA gap", type: "risk", x: 86, y: 52, meta: "Root blocker. Stalls $31k in deals and leaves co-employment risk unbounded.", derivation: [{ step: "SIGNAL", text: "2 deals stuck at contract stage." }, { step: "SEARCH", text: "No MSA found in Notion or Drive." }, { step: "ACT", text: "Template + attorney-review plan generated." }] },
      ],
      edges: [[0, 4], [1, 5], [2, 6], [3, 9], [4, 7], [5, 7], [5, 9], [6, 8], [7, 8], [9, 5], [8, 6]],
    },
    obTables: [{ name: "Pipeline (Sheet1)", rows: "214" }, { name: "hubspot_contacts", rows: "38" }, { name: "gusto_people", rows: "9" }, { name: "notion_pages", rows: "86" }],
    obMappings: [{ table: "Pipeline (Sheet1)", proposed: "Candidates", conf: "91% confident" }, { table: "hubspot_contacts", proposed: "Clients / Contacts", conf: "95% confident" }, { table: "gusto_people", proposed: "Contractors", conf: "97% confident" }, { table: "notion_pages", proposed: "Documents & SOPs", conf: "89% confident" }],
    obDone: "4 sources mapped. Nadir found the MSA gap during this scan — before you asked.",
  },
  {
    id: "restaurant",
    name: "Solera Restaurant Group",
    industry: "Restaurants · 6 locations, 214 staff",
    nowMin: 990,
    sources: [
      { name: "Toast POS", meta: "Sales · live, 6 sites", node: 0 },
      { name: "7shifts", meta: "Scheduling · 214 staff", node: 1 },
      { name: "OpenTable", meta: "Reservations · live", node: 2 },
      { name: "MarginEdge", meta: "Invoices · 3,120", node: 3 },
      { name: "Walk-in sensors", meta: "IoT · 12 units, live", node: 0 },
    ],
    kpis: [{ label: "COVERS TONIGHT", val: "186 booked", color: "#14181C" }, { label: "FOOD COST · WTD", val: "31.4%", color: "#B47614" }, { label: "LABOR · TODAY", val: "24.1%", color: "#15854F" }, { label: "MIDTOWN WALK-IN", val: "41.6°F ↑", color: "#C7452F" }],
    alerts: [
      { sev: "CRITICAL", color: "#C7452F", at: 920, time: "15:20", title: "Midtown walk-in up 6°F in 3 hours — compressor signature", plain: "The big fridge is warming up, and the food inside is at risk before dinner service.", detail: "Sensor trend matches the compressor failure at Westside in January. At this rate the box passes 41°F before dinner service — food-safety window closes fast.", loc: "Midtown · walk-in cooler", q: "What do I do about the walk-in?" },
      { sev: "WARNING", color: "#B47614", at: 0, time: "Tonight", title: "Prep sheet planned for 120 covers — OpenTable shows 186 booked", plain: "The kitchen prepped for 120 guests, but 186 are booked tonight.", detail: "The prep list was printed at 09:00. Two large parties (14 and 22) booked after 11:00 and nobody re-ran the sheet. You will 86 three mains by 8pm.", loc: "Midtown · kitchen", q: "Fix tonight’s prep gap" },
      { sev: "WARNING", color: "#B47614", at: 0, time: "12 d", title: "US Foods invoice #7741 priced 8% over contract", plain: "A supplier billed you more than the price you agreed to.", detail: "Line-item price on 40/50 shrimp doesn’t match the negotiated contract price in MarginEdge. Either the contract changed and nobody logged it, or the data is wrong. Nadir flagged this as suspect data.", loc: "AP · Midtown", q: "Why is invoice #7741 flagged?" },
    ],
    intro: "Afternoon read across all 6 locations — POS, scheduling, reservations, invoices, and the walk-in sensors.\n\n1. Midtown's walk-in is up 6°F in 3 hours. Same signature as the Westside compressor failure in January.\n2. Tonight's prep sheet was built for 120 covers; OpenTable now shows 186. Two big parties booked after the sheet was printed.\n3. Invoice #7741 from US Foods is priced 8% over your contract — the data doesn't reconcile, so I'm questioning it rather than booking it.\n\nService starts in 90 minutes. Where first?",
    suggestions: ["What do I do about the walk-in?", "Fix tonight’s prep gap", "Why is invoice #7741 flagged?"],
    replies: [
      { text: "Walk-in, in order:\n\n1. Move the protein and dairy to the bar lowboy and the Eastside van cooler — both have capacity (sensor feed). That protects tonight's service no matter what.\n2. ArcticServ closed the Westside failure in January in 90 minutes; they have a tech 20 minutes out (dispatch history). Call is drafted.\n3. Log the temp trail now — if anything is questionable later, you want the timeline showing you acted at 15:20, not at failure.\n\nIf the compressor dies before the tech lands, tonight still ships. Want me to send the dispatch?", cites: ["Walk-in sensors · Midtown trend", "Incident file · Westside, Jan ’26", "ArcticServ · dispatch history"] },
      { text: "The gap is 66 covers, but it's really 3 items:\n\n1. Re-run the prep sheet against live reservations — the delta is brined chicken, romesco, and focaccia (everything else has par).\n2. 7shifts shows Dominguez and Park both marked available for a 4-hour call-in; one prep cook covers the delta if they start by 17:00.\n3. The 22-top is a wine dinner — the menu was pre-set in the event sheet, which means half the prep list shrinks. Nobody joined the event sheet to the prep sheet.\n\nThis is the third prep-vs-book miss this quarter. I can re-run every prep sheet automatically at 14:00 against live bookings.", cites: ["OpenTable · tonight’s book", "7shifts · availability", "Events · wine dinner sheet"] },
      { text: "I flagged #7741 instead of booking it because the data doesn't reconcile — and data isn't automatically right.\n\n40/50 shrimp invoiced at $9.42/lb; your contract price in MarginEdge is $8.71 through September. Three possibilities, in order of likelihood from history:\n\n1. Substituted product billed at spot price (happened twice last year).\n2. Contract renewed and never logged — then the *contract data* is wrong, not the invoice.\n3. Straight billing error.\n\nDispute email is drafted with the contract line attached. If you confirm the contract actually changed, I'll correct the record and stop flagging — either way, the answer teaches me which source to trust here.", cites: ["MarginEdge · invoice #7741", "Contract · US Foods, exp 9/30", "History · 2 prior substitutions"] },
    ],
    action: { title: "Pre-service briefing ready for regional director", desc: "Walk-in status, the 186-cover plan, and the invoice dispute on one page — drafted for the 16:30 managers' call." },
    plan: {
      subtitle: "Tonight first, then the week — ordered by when the window closes.",
      why: "The walk-in is first because the food-safety window closes before service; the prep call-in has a hard 17:00 start; the invoice dispute has a 30-day window and can wait until tomorrow, but not until next week.",
      cols: [
        { title: "NOW · BEFORE SERVICE", color: "#C7452F", items: [{ t: "Relocate protein, dispatch ArcticServ", d: "Bar lowboy + van cooler have capacity. Tech is 20 min out.", tag: "FOOD SAFETY" }, { t: "Re-run prep vs live book, call in one prep", d: "Dominguez or Park, 4-hour call-in, must start by 17:00.", tag: "HARD DEADLINE" }] },
        { title: "NEXT · THIS WEEK", color: "#B47614", items: [{ t: "Dispute invoice #7741", d: "Contract line attached. $0.71/lb × standing order adds up.", tag: "CASH" }, { t: "PM the Midtown compressor", d: "Same age as Westside’s. Price replacement vs another failure.", tag: "PREVENT REPEAT" }] },
        { title: "LATER · THIS QUARTER", color: "#15854F", items: [{ t: "Auto re-run prep sheets at 14:00", d: "Prep joined to live reservations, every site, every day.", tag: "SYSTEMIZE" }, { t: "Sensor rollout to remaining 4 sites", d: "Two sites still have no cold-chain telemetry at all.", tag: "COMPOUND" }] },
      ],
    },
    compliance: {
      tiles: [{ label: "OPEN FINDINGS", val: "2", color: "#B47614" }, { label: "HIGH SEVERITY", val: "1", color: "#C7452F" }, { label: "PASSED CHECKS", val: "28", color: "#15854F" }, { label: "NEXT INSPECTION", val: "est. 21 d", color: "#14181C" }],
      findings: [
        { sev: "HIGH", rule: "Cold-holding temp log — Midtown, 3 gaps this week", detail: "Manual line checks missing for two dinner services; sensor data exists but the health-code log requires the signed check.", status: "OPEN" },
        { sev: "MED", rule: "Food handler certs — 3 expiring within 30 days", detail: "Two at Midtown, one at Eastside, per 7shifts training records.", status: "OPEN" },
        { sev: "PASS", rule: "Hood & fire suppression service", detail: "All 6 sites current; next service due 09/2026.", status: "CURRENT" },
        { sev: "PASS", rule: "Allergen matrix", detail: "Menu changes from 6/20 propagated to all site matrices.", status: "CURRENT" },
      ],
      audit: [
        { time: "15:22", text: "Walk-in thermal trend logged with relocation plan and dispatch recommendation." },
        { time: "14:05", text: "Prep-vs-reservations delta computed — 66 covers, 3 items short." },
        { time: "6/29", text: "Invoice #7741 held as suspect data — contract variance, not booked to COGS." },
        { time: "6/28", text: "Cold-holding log gaps detected by joining sensor uptime against signed checks." },
        { time: "6/25", text: "Weekly sweep across 6 sites: 28 checks passed, 2 findings open." },
      ],
    },
    people: [
      {
        initials: "CV", name: "Carla Vance", dept: "MIDTOWN", role: "General Manager · Midtown", email: "c.vance@solera.group", phone: "(404) 555-0129", status: "red", manager: "Ray Delgado · Regional Director",
        issue: "Walk-in failing + 66-cover prep gap, 90 minutes to service.", unread: 2,
        thread: [{ from: "nadir", text: "Walk-in is up 6°F since noon — same pattern as Westside in January. Relocation plan and ArcticServ dispatch are drafted." }, { from: "them", text: "Moving product now. Can we cover the book tonight or do I cut the walk-ins?" }, { from: "them", text: "And who approved a 22-top on a Tuesday??" }],
        draft: "Carla — don’t cut the book. Re-run the prep sheet (delta is 3 items), call in Dominguez by 17:00, and the 22-top is the pre-set wine dinner so its prep list is half what the sheet thinks. Tech is 20 min out for the walk-in. You’re covered.",
      },
      {
        initials: "MT", name: "Marcus Tran", dept: "CULINARY", role: "Executive Chef", email: "m.tran@solera.group", phone: "(404) 555-0166", status: "amber", manager: "Ray Delgado · Regional Director",
        issue: "Prep system keeps missing late bookings; third incident this quarter.", unread: 1,
        thread: [{ from: "them", text: "Third time this quarter the book moved after prep printed. Can we fix the process instead of firefighting?" }, { from: "nadir", text: "Yes — the prep sheet is a 09:00 snapshot. I can re-run it against live reservations at 14:00 daily, every site, and flag deltas over 10%." }],
        draft: "Marcus — standing fix is live from tomorrow: prep sheets re-run at 14:00 against the live book at all 6 sites, and you get a ping only when the delta is over 10%. Tonight’s gap is 3 items; call-in covers it.",
      },
      {
        initials: "RD", name: "Ray Delgado", dept: "REGIONAL", role: "Regional Director", email: "r.delgado@solera.group", phone: "(404) 555-0102", status: "amber", manager: "Priya Shah · Owner / CEO", pto: true,
        issue: "On PTO through Friday — escalations route to Priya Shah (Owner).", unread: 0,
        thread: [{ from: "nadir", text: "Ray is on PTO through Friday. Anything needing regional sign-off tonight routes to Priya Shah automatically — she has the pre-service briefing." }],
        draft: "Priya — Ray’s out through Friday so this comes to you: Midtown walk-in triage is running (tech en route), tonight’s 186 covers are handled, and there’s a $0.71/lb invoice variance with US Foods I’d like approval to dispute. One-pager attached.",
      },
    ],
    graph: {
      nodes: [
        { label: "Toast POS", type: "source", x: 10, y: 18, meta: "Sales, checks, and item counts across all 6 sites — live.", derivation: [{ step: "READ", text: "Toast API read across 6 locations." }, { step: "MAP", text: "Checks → Sales; items joined to menu matrix." }] },
        { label: "7shifts", type: "source", x: 10, y: 42, meta: "Scheduling. Feeds Staff: shifts, availability, training certs.", derivation: [{ step: "READ", text: "Schedules + availability + training read." }, { step: "LINK", text: "Call-in eligibility computed from availability." }] },
        { label: "OpenTable", type: "source", x: 10, y: 66, meta: "Reservations — live book, party sizes, event flags.", derivation: [{ step: "READ", text: "Live reservation feed, all sites." }, { step: "FLAG", text: "Prep-vs-book delta computed at 14:00." }] },
        { label: "MarginEdge", type: "source", x: 10, y: 88, meta: "Invoices and contract prices. Where the #7741 variance surfaced.", derivation: [{ step: "READ", text: "Invoice lines + contract prices read." }, { step: "QUESTION", text: "#7741 held as suspect — price ≠ contract." }] },
        { label: "Locations", type: "object", x: 36, y: 22, meta: "6 sites. Each rolls up sales, labor, food cost, and open issues.", derivation: [{ step: "FROM", text: "Toast site hierarchy, confirmed once." }, { step: "WATCH", text: "Midtown carrying 2 of 3 open alerts." }] },
        { label: "Staff", type: "object", x: 36, y: 50, meta: "214 people. Shifts, certs, and availability joined per site.", derivation: [{ step: "FROM", text: "7shifts roster + training records." }, { step: "FLAG", text: "3 food-handler certs expiring in 30 days." }] },
        { label: "Menu & Pars", type: "object", x: 36, y: 76, meta: "Menu items, par levels, and prep yields per site.", derivation: [{ step: "FROM", text: "Toast items + prep sheets + event menus." }, { step: "LINK", text: "Event sheets now joined to prep pars." }] },
        { label: "Service Flow", type: "process", x: 63, y: 34, meta: "Book → prep → line → service. Tonight constrained by prep snapshot lag.", derivation: [{ step: "INFER", text: "Flow from reservation → check timestamps." }, { step: "FLAG", text: "Prep sheet is a 09:00 snapshot — stale by service." }] },
        { label: "Purchasing", type: "process", x: 63, y: 66, meta: "Order → receive → invoice → COGS. One invoice held as suspect.", derivation: [{ step: "INFER", text: "Reconstructed from PO/receiving/invoice trail." }, { step: "QUESTION", text: "#7741 not booked pending dispute." }] },
        { label: "Walk-in risk", type: "risk", x: 86, y: 30, meta: "Midtown cooler trending toward the Westside failure signature. Plan attached.", derivation: [{ step: "SIGNAL", text: "+6°F in 3 hours at 15:20." }, { step: "MATCH", text: "Matches Westside compressor (Jan ’26)." }, { step: "ACT", text: "Relocate + dispatch plan generated." }] },
        { label: "Invoice #7741", type: "risk", x: 86, y: 66, meta: "Suspect data: invoiced 8% over contract. Held, not booked. Dispute drafted.", derivation: [{ step: "SIGNAL", text: "Line price $9.42 vs contract $8.71." }, { step: "QUESTION", text: "Data conflict — invoice vs contract record." }, { step: "ACT", text: "Dispute drafted; awaiting owner approval." }] },
      ],
      edges: [[0, 4], [1, 5], [2, 7], [3, 8], [0, 6], [4, 7], [5, 7], [6, 7], [4, 8], [7, 9], [8, 10], [4, 9]],
    },
    obTables: [{ name: "toast_checks", rows: "1.9M" }, { name: "shifts_schedule", rows: "48,300" }, { name: "ot_reservations", rows: "212,400" }, { name: "me_invoice_lines", rows: "61,800" }, { name: "walkin_telemetry", rows: "4.4M" }],
    obMappings: [{ table: "toast_checks", proposed: "Sales / Checks", conf: "99% confident" }, { table: "shifts_schedule", proposed: "Staff Schedules", conf: "97% confident" }, { table: "ot_reservations", proposed: "Reservations", conf: "98% confident" }, { table: "me_invoice_lines", proposed: "Invoices & Contracts", conf: "94% confident" }, { table: "walkin_telemetry", proposed: "Equipment Telemetry", conf: "92% confident" }],
    obDone: "5 sources mapped across 6 locations. The prep-vs-reservations join didn’t exist anywhere before this scan.",
  },
  {
    id: "aerospace",
    name: "Keystone Orbital",
    industry: "Space systems · 480 engineers, 38 days to launch",
    nowMin: 540,
    sources: [
      { name: "Teamcenter PLM", meta: "12,900 parts · BOM", node: 0 },
      { name: "Jira", meta: "Engineering · 8,412 issues", node: 1 },
      { name: "Test-stand telemetry", meta: "Live · 3 campaigns", node: 2 },
      { name: "SAP", meta: "Supply chain · 41k POs", node: 3 },
      { name: "ETQ QMS", meta: "Quality · 17 open NCRs", node: 3 },
    ],
    kpis: [{ label: "DAYS TO LAUNCH", val: "38", color: "#14181C" }, { label: "LRR SIGN-OFFS", val: "41 / 58", color: "#B47614" }, { label: "OPEN NCRS", val: "17", color: "#B47614" }, { label: "V-221 QUAL TEST", val: "ANOMALY", color: "#C7452F" }],
    alerts: [
      { sev: "CRITICAL", color: "#C7452F", at: 512, time: "08:32", title: "Valve V-221 qual test: pressure decay matches the SN-04 scrub signature", plain: "A rocket valve is leaking pressure in testing the same way as the one that cancelled the last launch attempt.", detail: "Test stand 2, run 14. Decay rate is within 4% of the curve that scrubbed SN-04. Last time, root cause was a seal batch — and that batch's sibling lot is in this valve.", loc: "Test stand 2 · propulsion", q: "Walk me through V-221" },
      { sev: "WARNING", color: "#B47614", at: 0, time: "6/29", title: "Titanium lot TI-88 supplier cert expired — feeds stage-2 tank welds", plain: "A batch of titanium is missing its quality certificate — and it's scheduled for welding next week.", detail: "Cert lapsed in SAP receiving. Lot is staged for next week's weld campaign. Welding uncertified material means cutting coupons later or scrapping welds.", loc: "Receiving · materials", q: "What about lot TI-88?" },
      { sev: "WARNING", color: "#B47614", at: 0, time: "LRR-2", title: "Launch readiness review: 17 sign-offs open, 3 with no assigned owner", plain: "Seventeen pre-launch checklist approvals are still open, and three have nobody responsible for them.", detail: "At the current close rate you enter LRR-2 with 9 open items. Three items have no owner at all — they belong to a reorg'd group and were never reassigned.", loc: "Mission assurance", q: "Close the sign-off gap" },
    ],
    intro: "Morning read: PLM, Jira, both test stands, SAP, and the QMS — 38 days to launch.\n\n1. V-221's qual test is showing the same pressure decay that scrubbed SN-04. The suspect seal batch's sibling lot is in this valve.\n2. Titanium lot TI-88's supplier cert expired — it feeds next week's stage-2 weld campaign.\n3. The launch readiness review has 17 open sign-offs and 3 of them have no owner.\n\nWhich thread first?",
    suggestions: ["Walk me through V-221", "What about lot TI-88?", "Close the sign-off gap"],
    replies: [
      { text: "V-221, from the history:\n\n1. SN-04's decay traced to seal batch SB-1107. This valve carries SB-1109 — same supplier, same cure window (Teamcenter genealogy). That's the first thing to rule out.\n2. Pull and inspect is a 6-hour job; a certified spare seal set is in stores (SAP). Retest fits tonight's stand window.\n3. If it's NOT the seal, the decision escalates to the component review board — I've pre-filled the NCR with the telemetry curves, the SN-04 comparison, and the genealogy so the board meets with evidence, not opinions.\n\nSpot-check added from this pattern: every valve with an SB-11xx seal batch now gets a decay-curve compare before install.", cites: ["Test stand 2 · run 14 telemetry", "NCR-2214 · SN-04 root cause", "Teamcenter · seal genealogy"] },
      { text: "TI-88, two paths:\n\nA. The supplier's cert renewal is likely already issued — their portal shows a 6/30 revision (same pattern as the last three lapses, all paperwork, not material). Document request is out; if it lands by Friday, the weld campaign holds schedule.\n\nB. If not: lot TI-91 is certified, in stock, and dimensionally interchangeable per the BOM. Swap costs a re-stage plus updated travelers — about a day.\n\nEither way, nothing uncertified gets welded. The travelers won't release against TI-88 until the cert clears — I've locked that in the QMS.", cites: ["SAP · TI-88 receiving record", "Supplier portal · cert rev 6/30", "Teamcenter · TI-91 equivalency"] },
      { text: "The 17 sign-offs, triaged:\n\n1. The 3 unowned items belonged to the avionics integration group before the reorg. By the current org chart they map to Chen's team — reassignment drafted, needs your approval, not theirs.\n2. 9 of the remaining 14 are documentation-complete and waiting on the owner to click — a reminder with the pre-filled evidence packet usually clears these same-day.\n3. The last 5 are real work: 2 depend on the V-221 outcome, 3 on the TI-88 cert. They close when those close — the critical path is the same three threads you already know about.\n\nSo the LRR gap isn't 17 problems. It's 3 owners, 9 clicks, and the two risks on this screen.", cites: ["ETQ · LRR-2 checklist", "Org chart · post-reorg mapping", "Jira · dependency links"] },
    ],
    action: { title: "Launch-risk snapshot ready for the chief engineer", desc: "V-221 evidence, TI-88 paths, and the true LRR critical path on one page — drafted for the 09:30 standup." },
    plan: {
      subtitle: "Thirty-eight days out — sequenced by what protects the launch date.",
      why: "V-221 is first because a scrub signature 38 days out owns the critical path; TI-88 is a paperwork race with a free fallback; the sign-off gap is mostly administrative once the first two resolve.",
      cols: [
        { title: "NOW · TODAY", color: "#C7452F", items: [{ t: "Pull, inspect, retest V-221", d: "6-hour job, spare seals in stores, stand window tonight.", tag: "LAUNCH CRITICAL" }, { t: "Reassign the 3 orphaned sign-offs", d: "Reorg orphans → Chen’s team. Draft ready for approval.", tag: "NO-COST FIX" }] },
        { title: "NEXT · THIS WEEK", color: "#B47614", items: [{ t: "Land TI-88 cert or stage TI-91", d: "Decision point Friday. Travelers locked until cert clears.", tag: "QUALITY" }, { t: "Clear the 9 click-ready sign-offs", d: "Evidence packets pre-filled; reminders go out with the packet.", tag: "COMPLIANCE" }] },
        { title: "LATER · THIS QUARTER", color: "#15854F", items: [{ t: "Decay-curve compare on every SB-11xx valve", d: "Spot-check generated from the SN-04/V-221 pattern, automatic.", tag: "SYSTEMIZE" }, { t: "Auto-link telemetry anomalies to NCRs", d: "Test stand curves attached to quality records at creation.", tag: "COMPOUND" }] },
      ],
    },
    compliance: {
      tiles: [{ label: "OPEN FINDINGS", val: "3", color: "#B47614" }, { label: "HIGH SEVERITY", val: "1", color: "#C7452F" }, { label: "PASSED CHECKS", val: "52", color: "#15854F" }, { label: "AS9100 AUDIT", val: "64 days", color: "#14181C" }],
      findings: [
        { sev: "HIGH", rule: "NCR aging — 4 records past 30-day disposition", detail: "Four NCRs in ETQ have no disposition past the internal 30-day limit; two touch flight hardware.", status: "OPEN" },
        { sev: "MED", rule: "Material certification — lot TI-88", detail: "Supplier cert lapsed on receiving record; lot staged for stage-2 weld campaign.", status: "OPEN" },
        { sev: "MED", rule: "Calibration — 2 instruments past due", detail: "Torque wrench T-41 and pressure transducer PT-9 past calibration interval per asset records.", status: "IN REVIEW" },
        { sev: "PASS", rule: "ITAR access review", detail: "Quarterly access recertification completed 6/15; no exceptions.", status: "CURRENT" },
      ],
      audit: [
        { time: "08:34", text: "V-221 anomaly logged with telemetry curves and SN-04 comparison attached." },
        { time: "08:40", text: "Spot-check rule generated: decay-curve compare for all SB-11xx seal batches." },
        { time: "6/29", text: "TI-88 cert lapse detected; travelers locked against the lot in QMS." },
        { time: "6/28", text: "LRR sign-off ownership audit — 3 orphaned items traced to reorg." },
        { time: "6/25", text: "Weekly sweep: 52 checks passed, 3 findings open, NCR aging escalated." },
      ],
    },
    people: [
      {
        initials: "EV", name: "Elena Vasquez", dept: "PROPULSION", role: "Chief Engineer · Propulsion", email: "e.vasquez@keystoneorbital.com", phone: "(321) 555-0184", status: "red", manager: "Sam Okonkwo · VP Engineering",
        issue: "V-221 pressure decay matches SN-04 scrub signature; retest window tonight.", unread: 3,
        thread: [{ from: "them", text: "Seeing the V-221 flag. How close is the curve to SN-04, actually?" }, { from: "nadir", text: "Within 4% across the full decay window. And the seal genealogy shows SB-1109 — sibling lot to SN-04's root cause." }, { from: "them", text: "Stand availability tonight?" }, { from: "them", text: "And if it's not the seal?" }],
        draft: "Elena — stand 2 is open 19:00–02:00 (test schedule). Pull-and-inspect is 6 hours with spares in stores, so retest fits tonight. If it's not the seal, the NCR is pre-filled with curves, genealogy, and the SN-04 comparison — component review board meets with evidence in hand.",
      },
      {
        initials: "JC", name: "James Chen", dept: "MISSION ASSUR.", role: "Mission Assurance Lead", email: "j.chen@keystoneorbital.com", phone: "(321) 555-0147", status: "amber", manager: "Sam Okonkwo · VP Engineering",
        issue: "17 LRR sign-offs open; 3 orphaned by the reorg now mapping to his team.", unread: 1,
        thread: [{ from: "nadir", text: "Three orphaned LRR items map to your team under the new org chart. Reassignment drafted — needs VP approval, then they're yours formally." }, { from: "them", text: "Fine, but I want the evidence packets before my people get pinged." }],
        draft: "James — packets are attached to all three items (test reports, closure criteria, precedent sign-offs from SN-04). Your team gets the assignment and the evidence in the same notification. Nine other items are click-ready with packets too.",
      },
      {
        initials: "PR", name: "Priya Raman", dept: "SUPPLY CHAIN", role: "Supply Chain Manager", email: "p.raman@keystoneorbital.com", phone: "(321) 555-0138", status: "amber", manager: "Dana Ellis · CFO",
        issue: "TI-88 cert lapsed; weld campaign staged against it next week.", unread: 0,
        thread: [{ from: "nadir", text: "TI-88's cert lapsed at receiving. Travelers are locked against the lot until the cert clears — renewal request is out to the supplier." }],
        draft: "Priya — supplier portal shows a 6/30 cert revision (their last three lapses were all paperwork). Doc request is out; if it lands by Friday the weld campaign holds. Fallback is TI-91 — certified, in stock, interchangeable per the BOM, costs one day of re-staging.",
      },
    ],
    graph: {
      nodes: [
        { label: "Teamcenter", type: "source", x: 10, y: 18, meta: "PLM — BOM, part genealogy, equivalencies. 12,900 parts.", derivation: [{ step: "READ", text: "BOM + genealogy read from Teamcenter." }, { step: "LINK", text: "Seal batches traced across serial numbers." }] },
        { label: "Jira", type: "source", x: 10, y: 42, meta: "Engineering work — 8,412 issues, dependency links.", derivation: [{ step: "READ", text: "Issues + links read." }, { step: "MAP", text: "LRR items joined to blocking work." }] },
        { label: "Test telemetry", type: "source", x: 10, y: 66, meta: "Live test-stand data, 3 campaigns. Where V-221 flagged.", derivation: [{ step: "READ", text: "Streaming stand data, both stands." }, { step: "MATCH", text: "Run 14 decay compared against SN-04 curve." }] },
        { label: "SAP + QMS", type: "source", x: 10, y: 88, meta: "Supply chain and quality — POs, receiving, NCRs, travelers.", derivation: [{ step: "READ", text: "PO/receiving + NCR/traveler tables read." }, { step: "FLAG", text: "TI-88 cert lapse caught at join." }] },
        { label: "Parts", type: "object", x: 36, y: 22, meta: "12,900 parts with genealogy — which batch went into which serial.", derivation: [{ step: "FROM", text: "Teamcenter BOM, confirmed once." }, { step: "WATCH", text: "SB-11xx seal batches under watch." }] },
        { label: "Test Articles", type: "object", x: 36, y: 50, meta: "Serials under test, with full telemetry and NCR history.", derivation: [{ step: "FROM", text: "Stand telemetry joined to serials." }, { step: "MATCH", text: "V-221 curve matched to SN-04 history." }] },
        { label: "Suppliers", type: "object", x: 36, y: 76, meta: "Material lots, certs, and lapse history per supplier.", derivation: [{ step: "FROM", text: "SAP receiving + cert records." }, { step: "FLAG", text: "TI-88 lapsed; TI-91 verified as fallback." }] },
        { label: "Integration & Test", type: "process", x: 63, y: 34, meta: "Build → test → disposition → retest. Stand windows are the constraint.", derivation: [{ step: "INFER", text: "Flow from traveler + stand schedules." }, { step: "FLAG", text: "V-221 retest inserted into tonight’s window." }] },
        { label: "Launch Readiness", type: "process", x: 63, y: 66, meta: "58 sign-offs, evidence packets, escalation to review boards.", derivation: [{ step: "INFER", text: "LRR checklist joined to owners + evidence." }, { step: "FLAG", text: "3 orphaned owners traced to reorg." }] },
        { label: "V-221 risk", type: "risk", x: 86, y: 34, meta: "Scrub-signature match. Pull/inspect/retest plan attached; CRB pre-filed.", derivation: [{ step: "SIGNAL", text: "Pressure decay within 4% of SN-04." }, { step: "MATCH", text: "Seal genealogy: sibling batch SB-1109." }, { step: "ACT", text: "Retest tonight; NCR pre-filled." }] },
        { label: "TI-88 hold", type: "risk", x: 86, y: 66, meta: "Cert lapse on staged material. Travelers locked; two-path plan attached.", derivation: [{ step: "SIGNAL", text: "Cert expired on receiving record." }, { step: "TRACE", text: "Staged for stage-2 weld campaign." }, { step: "ACT", text: "Chase cert / swap TI-91 by Friday." }] },
      ],
      edges: [[0, 4], [1, 8], [2, 5], [3, 6], [4, 7], [5, 7], [6, 7], [4, 5], [7, 9], [8, 9], [6, 10], [8, 10]],
    },
    obTables: [{ name: "tc_part_master", rows: "12,900" }, { name: "jira_issues", rows: "8,412" }, { name: "ts_run_telemetry", rows: "22M" }, { name: "sap_po_lines", rows: "41,200" }, { name: "etq_ncr_log", rows: "1,318" }],
    obMappings: [{ table: "tc_part_master", proposed: "Parts / BOM", conf: "99% confident" }, { table: "jira_issues", proposed: "Engineering Work", conf: "96% confident" }, { table: "ts_run_telemetry", proposed: "Test Telemetry", conf: "95% confident" }, { table: "sap_po_lines", proposed: "Purchase Orders", conf: "97% confident" }, { table: "etq_ncr_log", proposed: "Quality Records (NCRs)", conf: "93% confident" }],
    obDone: "5 sources mapped. Part genealogy → test telemetry → quality records is one graph now — the SN-04 comparison took seconds, not a week of tribal knowledge.",
  },
  {
    id: "solo",
    name: "Mike's Rooter & Plumbing",
    industry: "Field Services · 1 Owner/Operator",
    nowMin: 540,
    sources: [
      { name: "QuickBooks Online", meta: "Accounting", node: 0 },
      { name: "Housecall Pro", meta: "Dispatch & CRM", node: 1 },
      { name: "Home Depot Pro", meta: "Materials", node: 2 },
    ],
    kpis: [{ label: "OPEN JOBS", val: "4", color: "#14181C" }, { label: "UNINVOICED", val: "$1,850", color: "#C7452F" }, { label: "DRIVE TIME", val: "2.4 hrs", color: "#B47614" }],
    alerts: [
      { sev: "CRITICAL", color: "#C7452F", at: 0, time: "Now", title: "Unbilled Material: 80-Gal Water Heater", plain: "You bought a water heater this morning but didn't put it on the customer's invoice.", detail: "Home Depot Pro receipt for $845 matches the timestamp of the Smith job, but QuickBooks invoice #1042 only bills for labor.", loc: "Billing", q: "Add heater to Smith invoice" },
      { sev: "WARNING", color: "#B47614", at: 0, time: "Tomorrow", title: "Schedule Conflict: Double Booking", plain: "You have two jobs scheduled at the same time tomorrow on opposite sides of town.", detail: "Housecall Pro job #8812 (10:00 AM) conflicts with a manual Google Calendar entry (10:30 AM).", loc: "Dispatch", q: "Fix tomorrow's schedule" },
    ],
    intro: `Morning Mike. I've synced QuickBooks, Housecall Pro, and your Home Depot account.

1. You bought an $845 water heater this morning, but invoice #1042 only charges for labor. You're about to lose money.
2. Tomorrow at 10 AM you're double-booked across town.

Want me to fix the invoice?`,
    suggestions: ["Add heater to Smith invoice", "Fix tomorrow's schedule", "Show my tax estimate"],
    replies: [
      { text: "Invoice #1042 updated. I added '80-Gal Rheem Water Heater' at cost + 15% markup ($971.75). The new total is sent to QuickBooks and ready for the customer.", cites: ["Home Depot Pro · Receipt #441", "QuickBooks · Inv #1042"] },
      { text: "I've drafted a text to the 10:30 AM customer asking to push to 1:00 PM, factoring in the 45-minute drive from your 10:00 AM job. Want me to send it?", cites: ["Housecall Pro · Job #8812", "Google Calendar"] },
      { text: "Based on QuickBooks YTD revenue and Home Depot material expenses, your estimated Q3 estimated tax payment is $4,200. I can draft the transfer to your tax savings account.", cites: ["QuickBooks · P&L"] },
    ],
    action: { title: "Invoice Ready", desc: "Updated Smith invoice with material markup. Ready to send via QuickBooks." },
    plan: {
      subtitle: "Protecting your margin.",
      why: "You can't afford to eat $845 on a water heater. Billing comes first.",
      cols: [
        { title: "NOW", color: "#C7452F", items: [{ t: "Update Smith Invoice", d: "Add $971.75 material charge.", tag: "UNBLOCKS REVENUE" }] },
        { title: "NEXT", color: "#B47614", items: [{ t: "Reschedule 10:30AM Job", d: "Push to 1:00 PM to fix double-booking.", tag: "PREVENT REPEAT" }] },
        { title: "LATER", color: "#15854F", items: [{ t: "Automate material markup", d: "Auto-sync HD purchases to active jobs.", tag: "SYSTEMIZE" }] },
      ]
    },
    compliance: {
      tiles: [{ label: "OPEN FINDINGS", val: "1", color: "#B47614" }, { label: "HIGH SEVERITY", val: "0", color: "#C7452F" }, { label: "PASSED CHECKS", val: "4", color: "#15854F" }, { label: "LICENSES", val: "VALID", color: "#15854F" }],
      findings: [
        { sev: "MED", rule: "Vehicle Registration Renewal", detail: "Work van registration expires in 14 days.", status: "OPEN" },
        { sev: "PASS", rule: "State Contractor License", detail: "Valid through 2028.", status: "CURRENT" },
        { sev: "PASS", rule: "General Liability Insurance", detail: "Policy active.", status: "CURRENT" }
      ],
      audit: [
        { time: "Today", text: "Cross-referenced Home Depot receipt with QuickBooks invoice #1042." },
        { time: "Today", text: "Flagged schedule conflict between Housecall Pro and Calendar." }
      ]
    },
    people: [
      {
        initials: "MH", name: "Mike Harris", dept: "OWNER", role: "Owner/Operator", email: "mike@mikesrooter.com", phone: "(555) 019-2834", status: "amber",
        issue: "Unbilled material on Smith job.", unread: 1, manager: "",
        thread: [{ from: "nadir", text: "Mike, you forgot to bill the Smiths for the water heater. Inv #1042 is just labor." }],
        draft: "Update the invoice with a 15% markup and send it."
      }
    ],
    graph: {
      nodes: [
        { label: "QuickBooks", type: "source", x: 10, y: 20, meta: "Accounting", derivation: [] },
        { label: "Housecall Pro", type: "source", x: 10, y: 50, meta: "Dispatch", derivation: [] },
        { label: "Home Depot", type: "source", x: 10, y: 80, meta: "Materials", derivation: [] },
        { label: "Invoices", type: "object", x: 50, y: 20, meta: "Billing", derivation: [] },
        { label: "Schedule", type: "process", x: 50, y: 50, meta: "Jobs", derivation: [] },
        { label: "Missing Charge", type: "risk", x: 80, y: 35, meta: "Unbilled $845", derivation: [] }
      ],
      edges: [[0,3], [1,4], [2,3], [3,5]]
    },
    obTables: [{ name: "invoices", rows: "412" }, { name: "jobs", rows: "890" }, { name: "purchases", rows: "1,204" }],
    obMappings: [{ table: "invoices", proposed: "Billing", conf: "99%" }, { table: "jobs", proposed: "Schedule", conf: "98%" }, { table: "purchases", proposed: "Materials", conf: "95%" }],
    obDone: "3 systems synced. Ready to run."
  },
  {
    id: "pulp",
    name: "Cascadia Paper Mills",
    industry: "Heavy Manufacturing · 1,200 employees",
    nowMin: 480,
    sources: [
      { name: "SAP HANA", meta: "ERP & Supply Chain", node: 0 },
      { name: "ABB Ability", meta: "DCS / Process Control", node: 1 },
      { name: "Kronos", meta: "Time & Attendance", node: 2 },
      { name: "LIMS", meta: "Lab Information Mgmt", node: 3 },
    ],
    kpis: [{ label: "ROLL YIELD", val: "94.2%", color: "#15854F" }, { label: "BOILER TEMP", val: "840°C", color: "#B47614" }, { label: "CHEM TANK 4", val: "92%", color: "#C7452F" }],
    alerts: [
      { sev: "CRITICAL", color: "#C7452F", at: 0, time: "Now", title: "Bleach Tank 4 Approaching Overfill", plain: "A chemical tank is about to overflow because a valve didn't close.", detail: "ABB DCS reports Tank 4 at 92% capacity. SAP shows no planned maintenance. High risk of environmental spill.", loc: "Digester · Area 2", q: "Shut off Tank 4 intake" },
      { sev: "WARNING", color: "#B47614", at: 0, time: "10 mins ago", title: "Moisture Variance in Roll Batch A-99", plain: "Lab results show paper rolls are too wet, correlating with a boiler temperature drop.", detail: "LIMS reports 8% moisture (target 5%). ABB DCS shows Boiler 2 dropped 15°C during this batch run.", loc: "Paper Machine 1", q: "Adjust Boiler 2 parameters" }
    ],
    intro: `Cascadia Mill online. Reconciled SAP, ABB, Kronos, and LIMS.

1. CRITICAL: Bleach Tank 4 is at 92% and rising. Valve V-102 appears stuck open.
2. Roll Batch A-99 is out of spec (8% moisture) due to a temperature drop in Boiler 2.

Action required immediately on Tank 4 to prevent an environmental spill.`,
    suggestions: ["Shut off Tank 4 intake", "Adjust Boiler 2 parameters", "Check shift overtime"],
    replies: [
      { text: "Emergency halt signal sent to Valve V-102 via ABB DCS. Tank 4 level stabilized at 94%. Maintenance ticket dispatched to inspect the valve actuator.", cites: ["ABB Ability · Valve V-102", "SAP · Work Order generated"] },
      { text: "Boiler 2 setpoint increased by 15°C to compensate for wet bark fuel. Batch A-100 moisture is trending back down to 5.2%.", cites: ["ABB Ability · Boiler 2", "LIMS · Batch A-100"] },
      { text: "Kronos shows 14 operators approaching their union 12-hour limit in the next 45 minutes. Shift relief is scheduled but 3 are running late (gate badge logs).", cites: ["Kronos · Timecards", "Physical Security · Badge Swipes"] },
    ],
    action: { title: "Spill Prevented", desc: "Valve V-102 halted manually to prevent Tank 4 overfill." },
    plan: {
      subtitle: "Process stability and safety.",
      why: "Environmental spills carry massive fines and safety risks. Quality variance is secondary.",
      cols: [
        { title: "NOW", color: "#C7452F", items: [{ t: "Halt Tank 4 Intake", d: "Force close V-102 via DCS.", tag: "PREVENTS OUTAGE" }] },
        { title: "NEXT", color: "#B47614", items: [{ t: "Adjust Boiler 2", d: "Increase temp setpoint by 15°C.", tag: "QUALITY" }] },
        { title: "LATER", color: "#15854F", items: [{ t: "Review Bark Fuel Moisture", d: "Wet fuel caused the boiler drop.", tag: "SYSTEMIZE" }] },
      ]
    },
    compliance: {
      tiles: [{ label: "OPEN FINDINGS", val: "2", color: "#B47614" }, { label: "HIGH SEVERITY", val: "1", color: "#C7452F" }, { label: "PASSED CHECKS", val: "84", color: "#15854F" }, { label: "EPA LIMITS", val: "AT RISK", color: "#C7452F" }],
      findings: [
        { sev: "HIGH", rule: "EPA Chemical Spill Risk", detail: "Tank 4 level exceeding 90% threshold.", status: "OPEN" },
        { sev: "MED", rule: "Union Maximum Hours", detail: "14 operators approaching 12-hour limit.", status: "OPEN" },
      ],
      audit: [
        { time: "Today", text: "Flagged Tank 4 overfill risk via DCS telemetry." },
        { time: "Today", text: "Correlated LIMS moisture data with ABB boiler temps." }
      ]
    },
    people: [
      {
        initials: "SJ", name: "Sarah Jenkins", dept: "OPERATIONS", role: "Shift Supervisor", email: "s.jenkins@cascadia.com", phone: "(555) 019-3321", status: "red",
        issue: "Tank 4 overfill risk.", unread: 2, manager: "Mill Director",
        thread: [{ from: "nadir", text: "Sarah, Tank 4 is at 92%. V-102 didn't close." }],
        draft: "Force close V-102 from the control room immediately."
      }
    ],
    graph: {
      nodes: [
        { label: "SAP HANA", type: "source", x: 10, y: 20, meta: "ERP", derivation: [] },
        { label: "ABB Ability", type: "source", x: 10, y: 45, meta: "DCS", derivation: [] },
        { label: "LIMS", type: "source", x: 10, y: 70, meta: "Quality", derivation: [] },
        { label: "Tank 4", type: "object", x: 50, y: 25, meta: "Chemical Storage", derivation: [] },
        { label: "Boiler 2", type: "object", x: 50, y: 65, meta: "Power", derivation: [] },
        { label: "Spill Risk", type: "risk", x: 80, y: 25, meta: "Level > 90%", derivation: [] }
      ],
      edges: [[1,3], [1,4], [2,4], [3,5]]
    },
    obTables: [{ name: "mara_materials", rows: "45k" }, { name: "dcs_tags", rows: "12M" }, { name: "lims_batches", rows: "8,402" }],
    obMappings: [{ table: "mara_materials", proposed: "Inventory", conf: "99%" }, { table: "dcs_tags", proposed: "Telemetry", conf: "98%" }, { table: "lims_batches", proposed: "Quality", conf: "97%" }],
    obDone: "DCS and LIMS mapped to SAP processes."
  }
];
