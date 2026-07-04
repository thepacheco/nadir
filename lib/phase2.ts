import type { CompanyId } from "./types";

export interface EvidenceRow {
  source: string;
  record: string;
  note: string;
}

export interface SuspectData {
  question: string;
  wrongLabel: string;
  wrongResult: string;
  correctLabel: string;
  correctResult: string;
}

export interface AlertMeta {
  owner: number; // index into company.people
  evidence: EvidenceRow[];
  suspect?: SuspectData;
}

export interface GraphChild {
  label: string;
  meta: string;
  tone: "red" | "amber" | "ok";
}

export interface Department {
  name: string;
  head: string;
  status: "red" | "amber" | "green";
  oversight: string;
  kpis: { label: string; val: string; color: string }[];
  note: string;
}

export interface Approver {
  name: string;
  reply: string;
}

export interface Phase2Data {
  approver: Approver;
  alerts: AlertMeta[]; // parallel to company.alerts
  children: Record<number, GraphChild[]>; // graph node index → sub-components
  departments: Department[];
}

export const PHASE2: Record<CompanyId, Phase2Data> = {
  utility: {
    approver: { name: "Marta Voss · Regional Director", reply: "Approved — file the T-114 work order and move the crews. Good catch. — M" },
    alerts: [
      {
        owner: 0,
        evidence: [
          { source: "PI historian · tag T114_TEMP", record: "87.4°C at 06:12", note: "+8.1°C over the 30-day seasonal baseline of 79.3°C. Trend slope steepening since 04:40." },
          { source: "Maximo · asset A-2214", record: "Last thermal inspection: 14 months ago", note: "Oil sample overdue; bushing IR scan not on any open work order." },
          { source: "Incident file · T-109, Aug ’25", record: "Pre-failure signature", note: "+7.9°C climb over 11 days preceded dielectric failure. Current T-114 curve is 96% correlated." },
        ],
      },
      {
        owner: 0,
        evidence: [
          { source: "ADP · PTO approvals", record: "6 approvals land Thursday", note: "Crews 2 and 5 both drop below minimum staffing on the same day." },
          { source: "Maximo · WO-2291", record: "Feeder 12 rebuild — 4-crew minimum", note: "Scheduled Thursday 07:00. Hard requirement per switching order." },
          { source: "Maximo · WO-2307", record: "Deferrable maintenance ticket", note: "No compliance deadline. Crews 3 & 9 assigned — the free swap." },
        ],
      },
      {
        owner: 1,
        evidence: [
          { source: "SharePoint · IR-031", record: "Laceration incident, 3/12", note: "Recordable under 29 CFR 1904. Absent from the OSHA 300 log." },
          { source: "SharePoint · IR-034", record: "Overexertion incident, 3/28", note: "Recordable. Also absent from the log." },
          { source: "OSHA 300 log", record: "Last entry: 2/17", note: "Two-month gap versus the incident reports that exist in SharePoint." },
        ],
      },
    ],
    children: {
      6: [
        { label: "T-114", meta: "Substation 4 transformer — live thermal risk, inspection drafted.", tone: "red" },
        { label: "T-115", meta: "At 61% capacity — the load-shift target if T-114 trend holds.", tone: "ok" },
        { label: "Feeder 12 relays", meta: "Relay bank 11 days past PRC-005 interval.", tone: "amber" },
      ],
    },
    departments: [
      { name: "Field Operations", head: "Rosa Mendez", status: "red", oversight: "OVERSEEN BY G. HARMON · VP FIELD OPS", kpis: [{ label: "CREWS ON SITE", val: "11 / 14", color: "#14181C" }, { label: "WO BACKLOG", val: "142", color: "#B47614" }, { label: "OVERTIME", val: "6.2%", color: "#14181C" }], note: "Carrying both live risks today: T-114 and the Thursday crew gap." },
      { name: "Compliance & EHS", head: "Derek Tran", status: "amber", oversight: "OVERSEES MAINTENANCE QA", kpis: [{ label: "OPEN FINDINGS", val: "3", color: "#B47614" }, { label: "CHECKS PASSED", val: "47", color: "#15854F" }, { label: "NEXT AUDIT", val: "38 d", color: "#14181C" }], note: "OSHA log gap is self-identified — closing it now costs a signature." },
      { name: "Human Resources", head: "Priya Walsh", status: "amber", oversight: "OVERSEEN BY C. MARSH · COO", kpis: [{ label: "I-9 GAPS", val: "3", color: "#B47614" }, { label: "PTO CONFLICTS", val: "1", color: "#C7452F" }, { label: "HEADCOUNT", val: "340", color: "#14181C" }], note: "PTO approvals aren’t checked against crew minimums — Nadir now runs that join." },
      { name: "Maintenance", head: "J. Alvarez", status: "green", oversight: "OVERSEEN BY COMPLIANCE & EHS", kpis: [{ label: "PM ON-TIME", val: "92%", color: "#15854F" }, { label: "OVERDUE ITEMS", val: "1", color: "#B47614" }, { label: "SPARES COVERAGE", val: "88%", color: "#14181C" }], note: "One relay bank past interval; spare transformer staging decision Thursday." },
    ],
  },
  manufacturing: {
    approver: { name: "Dale Whitfield · Plant Manager", reply: "Approved. Swap the actuator and book the recert class. — D" },
    alerts: [
      {
        owner: 0,
        evidence: [
          { source: "Ignition · fault log", record: "E-217 at 07:02 — feed damper actuator no-response", note: "Identical code and onset pattern to Mar ’24 and Nov ’25 events." },
          { source: "SAP · stores bin 14-C", record: "Actuator #KD-3341 — qty 2 on hand", note: "The exact part both prior fixes used. No purchase wait." },
          { source: "Maintenance history", record: "Both prior E-217s: ~90 min repair", note: "Actuator swap, not burner work. Vesta Services closed the one escalation same-day." },
        ],
      },
      {
        owner: 2,
        evidence: [
          { source: "ADP · training records", record: "Rodriguez cert lapsed 6/2 · Chen lapsed 6/9", note: "Both were approved for Saturday overtime after their certs expired." },
          { source: "ADP · OT approvals", record: "Saturday run approved at 6 operators", note: "Approval flow never joins against certification status." },
          { source: "Schedule · Saturday", record: "4 current-cert operators rostered", note: "Kiln stations require 6. Gap = 2, both recoverable via Thursday recert." },
        ],
      },
      {
        owner: 1,
        evidence: [
          { source: "SAP · receiving", record: "Lot #88 cert expired 6/28", note: "Material physically fine; certification paperwork lapsed at the supplier." },
          { source: "Supplier portal", record: "Renewal rev issued 6/30", note: "Document not yet transmitted. Same pattern as their last three lapses — paperwork, not material." },
          { source: "SAP · allocations", record: "Lot #88 → export order EX-1108 (Friday)", note: "Lot #85 is certified, 340 kg on hand, and swap-compatible." },
        ],
      },
    ],
    children: {
      5: [
        { label: "Line 1 kiln", meta: "Nominal. Absorbing rerouted slats at half-rate.", tone: "ok" },
        { label: "Line 2 · station 6", meta: "Guard interlock bypassed 4× this month — open compliance finding.", tone: "amber" },
        { label: "Line 3 kiln", meta: "Down 41 min — fault E-217, actuator swap planned.", tone: "red" },
      ],
    },
    departments: [
      { name: "Production Floor", head: "Marcus Kim", status: "red", oversight: "OVERSEEN BY D. WHITFIELD · PLANT MGR", kpis: [{ label: "LINES RUNNING", val: "2 / 3", color: "#C7452F" }, { label: "OEE TODAY", val: "71%", color: "#B47614" }, { label: "TAKT VS PLAN", val: "−9%", color: "#B47614" }], note: "Line 3 kiln is the constraint; backlog compounds hourly until the actuator swap." },
      { name: "Quality & Compliance", head: "Lena Ruiz", status: "amber", oversight: "OVERSEES PRODUCTION FLOOR", kpis: [{ label: "OPEN FINDINGS", val: "2", color: "#B47614" }, { label: "SHIP-HOLDS", val: "1 lot", color: "#B47614" }, { label: "CHECKS PASSED", val: "31", color: "#15854F" }], note: "Lot #88 hold protects Friday’s export; guard-bypass pattern needs a floor conversation." },
      { name: "Training & Certs", head: "Tanya Brooks", status: "amber", oversight: "OVERSEEN BY QUALITY & COMPLIANCE", kpis: [{ label: "CURRENT CERTS", val: "94%", color: "#15854F" }, { label: "LAPSED · 30D", val: "2", color: "#C7452F" }, { label: "CLASSES BOOKED", val: "1", color: "#14181C" }], note: "Cert expiry now joined against every posted schedule — this gap won’t recur silently." },
      { name: "Supply & Stores", head: "H. Okada", status: "green", oversight: "OVERSEEN BY PLANT MANAGER", kpis: [{ label: "STOCKOUTS", val: "0", color: "#15854F" }, { label: "SHADOW SHEETS", val: "1", color: "#B47614" }, { label: "SPARES HIT RATE", val: "96%", color: "#15854F" }], note: "inventory_final_v7.xlsx is still load-bearing — retirement is on the quarter plan." },
    ],
  },
  staffing: {
    approver: { name: "Jordan Diaz · Co-founder", reply: "Do it — send the attorney email today. — J" },
    alerts: [
      {
        owner: 0,
        evidence: [
          { source: "HubSpot · deals", record: "2 deals at “contract” stage — 19 and 24 days", note: "$31k combined. Zero activity since the stage change; nothing to send them." },
          { source: "Notion · full-text search", record: "0 results for MSA / master services", note: "86 pages indexed. No agreement template exists anywhere." },
          { source: "Pipeline sheet · source column", record: "Both deals referral-sourced", note: "Your highest-converting channel is stalled on paperwork, not interest." },
        ],
      },
      {
        owner: 1,
        evidence: [
          { source: "Gusto · payroll", record: "$14.2k/month", note: "Two founders + contractor payouts, steady for 3 months." },
          { source: "Bank feed", record: "Recurring spend $6.8k/mo · balance $88k", note: "Burn $21k/mo all-in → 4.2 months at current pace." },
          { source: "Computed", record: "One placement ≈ +1.6 months", note: "Average placement fee against burn. The MSA unblocks two of them." },
        ],
      },
      {
        owner: 1,
        evidence: [
          { source: "Invoice #0007", record: "$9,400 · sent 6/20", note: "No payment terms stated on the invoice itself." },
          { source: "HubSpot · activity", record: "No follow-up logged since send", note: "12 days of silence is process, not solvency, at this invoice size." },
          { source: "Invoice template", record: "Terms field: missing", note: "Adding “Net 15” prevents the next one of these." },
        ],
      },
    ],
    children: {
      5: [
        { label: "2 active clients", meta: "Both healthcare admin, both referral-sourced, 100% of placements.", tone: "ok" },
        { label: "2 stalled deals", meta: "$31k at contract stage — both waiting on the MSA.", tone: "red" },
      ],
    },
    departments: [
      { name: "Sales & Clients", head: "Jordan Diaz", status: "red", oversight: "CO-FOUNDER · BOARD CHECK-IN MONTHLY", kpis: [{ label: "PIPELINE", val: "$86k", color: "#14181C" }, { label: "STALLED", val: "$31k", color: "#C7452F" }, { label: "REFERRAL CLOSE", val: "100%", color: "#15854F" }], note: "The bottleneck is legal paperwork, not selling. Fix the MSA, work the referral vein." },
      { name: "Finance & Ops", head: "Amara Twinam", status: "amber", oversight: "CO-FOUNDER · BOARD CHECK-IN MONTHLY", kpis: [{ label: "RUNWAY", val: "4.2 mo", color: "#B47614" }, { label: "AR OVERDUE", val: "$9.4k", color: "#C7452F" }, { label: "BURN", val: "$21k/mo", color: "#14181C" }], note: "One overdue invoice is 7% of runway. Follow-up drafted; Net 15 goes on the template." },
      { name: "Recruiting", head: "Shared · both founders", status: "green", oversight: "NO DEDICATED OWNER YET", kpis: [{ label: "CANDIDATES", val: "214", color: "#14181C" }, { label: "PLACED", val: "7", color: "#15854F" }, { label: "SHEET LIMIT", val: "~30 active", color: "#B47614" }], note: "Google Sheets holds until ~30 active candidates; migration is scale-prep, not urgent." },
      { name: "Legal & Risk", head: "Unassigned", status: "red", oversight: "GAP — NO OWNER ON FILE", kpis: [{ label: "MSA", val: "MISSING", color: "#C7452F" }, { label: "W-9 GAPS", val: "2", color: "#B47614" }, { label: "WC POLICY", val: "NONE", color: "#C7452F" }], note: "Co-employment liability is unbounded until agreements exist. Highest-leverage $1k you can spend." },
    ],
  },
  restaurant: {
    approver: { name: "Priya Shah · Owner / CEO", reply: "Approved. Dispute the invoice and keep me on the walk-in until the tech clears it. — P" },
    alerts: [
      {
        owner: 0,
        evidence: [
          { source: "Walk-in sensors · Midtown", record: "35.4°F → 41.6°F between 12:10 and 15:20", note: "Compressor duty cycle pinned at 100% for 3 hours — it’s running, not cooling." },
          { source: "Incident file · Westside, Jan ’26", record: "Same 3-hour climb preceded compressor seizure", note: "That failure cost a full day of service and $6.1k in product." },
          { source: "ArcticServ · dispatch history", record: "Tech available — ETA 20 min", note: "Prior fix: 90 minutes. Call is drafted and ready to send." },
        ],
      },
      {
        owner: 1,
        evidence: [
          { source: "Prep sheet · printed 09:00", record: "Built for 120 covers", note: "A static snapshot — it never sees bookings that land after print." },
          { source: "OpenTable · live book", record: "186 covers · incl. 14-top and 22-top", note: "Both large parties booked after 11:00." },
          { source: "Events · wine dinner sheet", record: "22-top menu is pre-set", note: "Half that party’s prep list doesn’t apply — the sheets were never joined." },
        ],
      },
      {
        owner: 2,
        evidence: [
          { source: "MarginEdge · invoice #7741", record: "40/50 shrimp — $9.42/lb", note: "Received 6/21, unbooked. Held by Nadir as suspect data." },
          { source: "Contract · US Foods", record: "$8.71/lb through 9/30", note: "Signed price sheet on file. $0.71/lb variance × standing weekly order." },
          { source: "History · 2025", record: "2 prior substitutions billed at spot", note: "Same vendor, same pattern: substituted product invoiced above contract." },
        ],
        suspect: {
          question: "Invoice #7741 doesn’t reconcile: $9.42/lb invoiced vs $8.71/lb contracted. One of these records is wrong — which?",
          wrongLabel: "The invoice is wrong — dispute it",
          wrongResult: "Dispute sent with the contract line attached. #7741 stays unbooked, and Nadir will treat contract price as truth for this supplier and watch for repeat substitutions.",
          correctLabel: "The contract changed — update the record",
          correctResult: "Contract record updated to $9.42/lb. #7741 released to COGS, food-cost forecasts re-baselined, and this line stops flagging.",
        },
      },
    ],
    children: {
      4: [
        { label: "Midtown", meta: "Flagship. Carrying tonight’s walk-in risk and the prep gap.", tone: "red" },
        { label: "Westside", meta: "Nominal. Compressor replaced after the January failure.", tone: "ok" },
        { label: "Eastside", meta: "One food-handler cert expiring within 30 days.", tone: "amber" },
        { label: "3 more sites", meta: "Riverside, Decatur, Airport — nominal, no cold-chain sensors yet.", tone: "ok" },
      ],
    },
    departments: [
      { name: "Operations · Midtown", head: "Carla Vance", status: "red", oversight: "OVERSEEN BY R. DELGADO (PTO → P. SHAH)", kpis: [{ label: "COVERS TONIGHT", val: "186", color: "#14181C" }, { label: "WALK-IN", val: "41.6°F", color: "#C7452F" }, { label: "LABOR", val: "24.1%", color: "#15854F" }], note: "Two of three live alerts sit here. Triage plans are drafted and waiting." },
      { name: "Culinary Group", head: "Marcus Tran", status: "amber", oversight: "OVERSEES ALL 6 KITCHENS", kpis: [{ label: "FOOD COST WTD", val: "31.4%", color: "#B47614" }, { label: "PREP MISSES QTD", val: "3", color: "#B47614" }, { label: "86’D LAST WK", val: "5 items", color: "#14181C" }], note: "Prep-vs-book auto re-run goes live tomorrow across every site at 14:00." },
      { name: "Facilities", head: "Ray Delgado", status: "amber", oversight: "ON PTO — ESCALATIONS ROUTE TO OWNER", kpis: [{ label: "SENSOR SITES", val: "2 / 6", color: "#B47614" }, { label: "OPEN TICKETS", val: "4", color: "#14181C" }, { label: "PM CURRENT", val: "83%", color: "#B47614" }], note: "Midtown compressor is the same age as Westside’s was. Replacement quote requested." },
      { name: "Finance & AP", head: "D. Okafor", status: "amber", oversight: "OVERSEEN BY P. SHAH · OWNER", kpis: [{ label: "SUSPECT INVOICES", val: "1", color: "#C7452F" }, { label: "AP AGING", val: "$18.2k", color: "#14181C" }, { label: "DISPUTES WON", val: "2 / 2", color: "#15854F" }], note: "#7741 held unbooked pending the owner’s call — the data-quality question is live." },
    ],
  },
  aerospace: {
    approver: { name: "Sam Okonkwo · VP Engineering", reply: "Approved. Retest tonight; brief the CRB either way. — S" },
    alerts: [
      {
        owner: 0,
        evidence: [
          { source: "Test stand 2 · run 14", record: "Pressure decay 0.42 psi/min", note: "Within 4% of the SN-04 pre-scrub curve across the full decay window." },
          { source: "ETQ · NCR-2214", record: "SN-04 root cause: seal batch SB-1107", note: "Closed after seal replacement and retest. Scrub cost 6 weeks." },
          { source: "Teamcenter · genealogy", record: "V-221 carries seal batch SB-1109", note: "Same supplier, same cure window as SB-1107 — sibling lot." },
        ],
      },
      {
        owner: 2,
        evidence: [
          { source: "SAP · receiving", record: "TI-88 cert expired 6/29", note: "Lot staged for next week’s stage-2 weld campaign." },
          { source: "Supplier portal", record: "Cert revision issued 6/30", note: "Document pending transmission. Prior three lapses were all paperwork." },
          { source: "Teamcenter · equivalency", record: "TI-91: certified, in stock, interchangeable", note: "Fallback costs one day of re-staging plus traveler updates." },
        ],
      },
      {
        owner: 1,
        evidence: [
          { source: "ETQ · LRR-2 checklist", record: "17 open of 58 sign-offs", note: "At current close rate you enter LRR-2 with 9 open." },
          { source: "Org chart · post-reorg", record: "3 items map to no owner", note: "They belonged to avionics integration before the reorg; never reassigned." },
          { source: "Jira · dependency links", record: "5 items blocked by V-221 / TI-88", note: "The sign-off gap’s critical path is the two risks already on this screen." },
        ],
      },
    ],
    children: {
      4: [
        { label: "V-221 valve", meta: "Qual-test anomaly — pull, inspect, retest tonight.", tone: "red" },
        { label: "TI-88 lot", meta: "Cert lapsed; travelers locked until it clears.", tone: "amber" },
        { label: "SB-1109 seals", meta: "Sibling batch to SN-04’s root cause — under watch.", tone: "amber" },
      ],
    },
    departments: [
      { name: "Propulsion", head: "Elena Vasquez", status: "red", oversight: "OVERSEEN BY S. OKONKWO · VP ENG", kpis: [{ label: "QUAL TESTS", val: "ANOMALY", color: "#C7452F" }, { label: "STAND WINDOWS", val: "TONIGHT", color: "#14181C" }, { label: "OPEN NCRS", val: "6", color: "#B47614" }], note: "V-221 owns the critical path. Retest fits tonight’s window with spares in stores." },
      { name: "Mission Assurance", head: "James Chen", status: "amber", oversight: "OVERSEES ALL SIGN-OFF EVIDENCE", kpis: [{ label: "LRR SIGN-OFFS", val: "41 / 58", color: "#B47614" }, { label: "UNOWNED ITEMS", val: "3", color: "#C7452F" }, { label: "NCRS AGING", val: "4", color: "#C7452F" }], note: "Nine items are click-ready with evidence packets; three need the reorg reassignment approved." },
      { name: "Supply Chain", head: "Priya Raman", status: "amber", oversight: "OVERSEEN BY D. ELLIS · CFO", kpis: [{ label: "CERT HOLDS", val: "1 lot", color: "#B47614" }, { label: "PO EXCEPTIONS", val: "3", color: "#14181C" }, { label: "SUPPLIER OTD", val: "91%", color: "#15854F" }], note: "TI-88 is a paperwork race with a free fallback. Decision point Friday." },
      { name: "Test Operations", head: "R. Chandra", status: "green", oversight: "OVERSEEN BY PROPULSION", kpis: [{ label: "CAMPAIGNS LIVE", val: "3", color: "#14181C" }, { label: "STAND UPTIME", val: "97%", color: "#15854F" }, { label: "CAL OVERDUE", val: "2", color: "#B47614" }], note: "Stand 2 open 19:00–02:00 tonight — the V-221 retest window is protected." },
    ],
  },
  solo: {
    children: {},
    alerts: [
      { owner: 0, evidence: [], suspect: { question: "Is this receipt billed?", wrongLabel: "Receipt unlinked", wrongResult: "Lost margin", correctLabel: "Material added to invoice", correctResult: "Invoice Updated" } },
      { owner: 0, evidence: [], suspect: { question: "Is there a conflict?", wrongLabel: "Double booking", wrongResult: "Conflict", correctLabel: "Schedule moved", correctResult: "Resolved" } }
    ],
    approver: { name: "Mike Harris", reply: "Approved. Send it." },
    departments: [
      { name: "Field", head: "Mike", oversight: "Owner", status: "amber", kpis: [{ label: "Efficiency", val: "90%", color: "#15854F" }], note: "Field work" },
      { name: "Office", head: "Mike", oversight: "Owner", status: "red", kpis: [{ label: "Backlog", val: "2", color: "#C7452F" }], note: "Office work" }
    ]
  },
  pulp: {
    children: {},
    alerts: [
      { owner: 0, evidence: [], suspect: { question: "Is valve open?", wrongLabel: "Sensor error", wrongResult: "Stuck Open", correctLabel: "Valve closed", correctResult: "Closed" } },
      { owner: 0, evidence: [], suspect: { question: "Is moisture high?", wrongLabel: "Lab error", wrongResult: "8% Moisture", correctLabel: "Boiler adjusted", correctResult: "Target 5%" } }
    ],
    approver: { name: "Mill Director", reply: "Approved. Executing." },
    departments: [
      { name: "Digester", head: "Sarah J.", oversight: "Mill Director", status: "red", kpis: [{ label: "Tank 4", val: "92%", color: "#C7452F" }], note: "Overfill risk" },
      { name: "Paper Machine 1", head: "John D.", oversight: "Mill Director", status: "amber", kpis: [{ label: "Moisture", val: "8%", color: "#B47614" }], note: "Wet rolls" },
      { name: "Shipping", head: "Amy C.", oversight: "Mill Director", status: "green", kpis: [{ label: "On Time", val: "100%", color: "#15854F" }], note: "Normal" }
    ]
  }

};
