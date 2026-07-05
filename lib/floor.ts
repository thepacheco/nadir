// The god-view: what each company's site actually looks like from above, and
// who's on the floor right now. Every zone carries a live metric and a real
// workforce count (present / scheduled in the schedule system / called out) so
// Nadir can do the thing operators actually care about — notice the floor
// doesn't match the plan before it becomes a problem. Deterministic demo data,
// but industry-shaped so a buyer from that industry recognizes their own world.

export type ZoneKind = "office" | "kitchen" | "line" | "storage" | "dock" | "substation" | "generic";

export interface FloorZone {
  label: string;
  kind: ZoneKind;
  gx: number; gy: number; w: number; d: number; h: number; // isometric placement
  metric: string;        // the live number that matters here
  role: string;          // what the people here do (for the interior legend)
  present: number;       // on the floor right now (0 = not a staffed floor)
  scheduled: number;     // what the schedule system (ADP/Deputy) expected
  calledOut: number;     // no-shows Nadir matched from clock-in vs schedule
}

export interface TickerItem {
  label: string;
  value: string;
  sev: "crit" | "warn" | "ok" | "info";
}

// six non-overlapping slots on the ~13×8 iso grid, reused per company
const SLOT: [number, number, number, number, number][] = [
  [0, 0, 3, 2, 30],
  [4, 0, 3, 3, 26],
  [8.5, 1, 3.5, 2, 24],
  [0, 3.4, 2.6, 2.4, 20],
  [4.2, 4.2, 2.6, 2, 18],
  [9.2, 4.2, 2.6, 2, 28],
];
function at(i: number, z: Omit<FloorZone, "gx" | "gy" | "w" | "d" | "h">): FloorZone {
  const [gx, gy, w, d, h] = SLOT[i];
  return { ...z, gx, gy, w, d, h };
}

export const FLOORS: Record<string, FloorZone[]> = {
  utility: [
    at(0, { label: "Dispatch Center", kind: "office", metric: "142 open work orders", role: "Dispatcher", present: 9, scheduled: 9, calledOut: 0 }),
    at(1, { label: "Substation 4", kind: "substation", metric: "T-114 · +8°C", role: "Technician", present: 2, scheduled: 2, calledOut: 0 }),
    at(2, { label: "Fleet Yard", kind: "dock", metric: "11 / 14 crews rolled", role: "Line crew", present: 11, scheduled: 14, calledOut: 3 }),
    at(3, { label: "Materials Warehouse", kind: "storage", metric: "2 transformers in stock", role: "Warehouse", present: 3, scheduled: 3, calledOut: 0 }),
    at(4, { label: "Training Bay", kind: "generic", metric: "6 in cert class", role: "Apprentice", present: 6, scheduled: 6, calledOut: 0 }),
  ],
  manufacturing: [
    at(0, { label: "Front Office", kind: "office", metric: "3 orders at risk", role: "Planner", present: 5, scheduled: 5, calledOut: 0 }),
    at(1, { label: "Line 3", kind: "line", metric: "312 units / shift", role: "Operator", present: 14, scheduled: 18, calledOut: 4 }),
    at(2, { label: "Weld Cell B", kind: "line", metric: "torque out of spec", role: "Welder", present: 4, scheduled: 4, calledOut: 0 }),
    at(3, { label: "Warehouse", kind: "storage", metric: "fastener cert expired", role: "Material handler", present: 6, scheduled: 7, calledOut: 1 }),
    at(4, { label: "Shipping Dock", kind: "dock", metric: "2 trucks staged", role: "Loader", present: 5, scheduled: 5, calledOut: 0 }),
    at(5, { label: "QA Lab", kind: "generic", metric: "CMM #2 overdue", role: "Inspector", present: 3, scheduled: 3, calledOut: 0 }),
  ],
  staffing: [
    at(0, { label: "Recruiting Floor", kind: "office", metric: "48 active candidates", role: "Recruiter", present: 6, scheduled: 6, calledOut: 0 }),
    at(1, { label: "Account Management", kind: "office", metric: "2 clients stalled", role: "Account mgr", present: 3, scheduled: 3, calledOut: 0 }),
    at(2, { label: "Back Office", kind: "office", metric: "3 timesheets missing", role: "Coordinator", present: 2, scheduled: 2, calledOut: 0 }),
    at(3, { label: "Reception", kind: "generic", metric: "5 interviews today", role: "Front desk", present: 1, scheduled: 1, calledOut: 0 }),
  ],
  restaurant: [
    at(0, { label: "Dining Room", kind: "office", metric: "186 covers tonight", role: "Server", present: 8, scheduled: 11, calledOut: 3 }),
    at(1, { label: "Midtown Kitchen", kind: "kitchen", metric: "120 prepped vs 186 booked", role: "Line cook", present: 5, scheduled: 7, calledOut: 2 }),
    at(2, { label: "Prep Line", kind: "kitchen", metric: "cooler at 47°F", role: "Prep cook", present: 3, scheduled: 4, calledOut: 1 }),
    at(3, { label: "Walk-in & Dry Storage", kind: "storage", metric: "invoice #7741 flagged", role: "Steward", present: 1, scheduled: 1, calledOut: 0 }),
    at(4, { label: "Receiving", kind: "dock", metric: "AM delivery logged", role: "Receiver", present: 1, scheduled: 1, calledOut: 0 }),
  ],
  aerospace: [
    at(0, { label: "Program Office", kind: "office", metric: "AS9100 finding open", role: "Program", present: 4, scheduled: 4, calledOut: 0 }),
    at(1, { label: "Assembly Bay 2", kind: "line", metric: "torque record missing", role: "Technician", present: 6, scheduled: 8, calledOut: 2 }),
    at(2, { label: "Cleanroom A", kind: "generic", metric: "particle count high", role: "Cleanroom tech", present: 5, scheduled: 5, calledOut: 0 }),
    at(3, { label: "Receiving Inspection", kind: "dock", metric: "lot L-88 held", role: "Inspector", present: 2, scheduled: 2, calledOut: 0 }),
    at(4, { label: "Metrology", kind: "generic", metric: "gauge R&R due", role: "Metrologist", present: 2, scheduled: 2, calledOut: 0 }),
  ],
  solo: [
    at(0, { label: "Home Office", kind: "office", metric: "2 deals at contract", role: "Founder", present: 2, scheduled: 2, calledOut: 0 }),
    at(3, { label: "Client Sites", kind: "generic", metric: "3 placements live", role: "Placed contractor", present: 3, scheduled: 3, calledOut: 0 }),
  ],
  pulp: [
    at(0, { label: "Control Room", kind: "office", metric: "digester #2 deviation", role: "Board operator", present: 3, scheduled: 3, calledOut: 0 }),
    at(1, { label: "Paper Machine 4", kind: "line", metric: "reel R-9 off-spec", role: "Machine tender", present: 7, scheduled: 9, calledOut: 2 }),
    at(2, { label: "Digester House", kind: "substation", metric: "temp +6°C", role: "Cook operator", present: 2, scheduled: 2, calledOut: 0 }),
    at(3, { label: "Reel Room & Finishing", kind: "storage", metric: "moisture out of spec", role: "Finishing", present: 5, scheduled: 6, calledOut: 1 }),
    at(4, { label: "Wastewater", kind: "generic", metric: "BOD near permit", role: "Enviro tech", present: 1, scheduled: 1, calledOut: 0 }),
  ],
};

export const TICKER: Record<string, TickerItem[]> = {
  utility: [
    { label: "SUBSTATION 4 · T-114", value: "+8°C over norm", sev: "crit" },
    { label: "FEEDER 12 CREW", value: "3 short Thu", sev: "warn" },
    { label: "OSHA 300 LOG", value: "2 gaps", sev: "warn" },
    { label: "OPEN WORK ORDERS", value: "142", sev: "info" },
    { label: "SLA THIS WEEK", value: "97% on time", sev: "ok" },
  ],
  manufacturing: [
    { label: "LINE 3", value: "4 operators short", sev: "crit" },
    { label: "WELD CELL B", value: "torque out of spec", sev: "warn" },
    { label: "FASTENER CERT", value: "expired", sev: "warn" },
    { label: "UNITS / SHIFT", value: "312", sev: "info" },
    { label: "OEE", value: "82%", sev: "ok" },
  ],
  staffing: [
    { label: "MSA", value: "2 clients stalled", sev: "crit" },
    { label: "TIMESHEETS", value: "3 missing", sev: "warn" },
    { label: "INVOICE #0007", value: "12d overdue", sev: "warn" },
    { label: "ACTIVE CANDIDATES", value: "48", sev: "info" },
    { label: "PLACED MTD", value: "7", sev: "ok" },
  ],
  restaurant: [
    { label: "WALK-IN COOLER", value: "47°F", sev: "crit" },
    { label: "KITCHEN", value: "120 prepped / 186 booked", sev: "warn" },
    { label: "KITCHEN STAFF", value: "2 called out", sev: "warn" },
    { label: "COVERS TONIGHT", value: "186", sev: "info" },
    { label: "FOOD COST", value: "29%", sev: "ok" },
  ],
  aerospace: [
    { label: "SERIAL SN-04", value: "torque record missing", sev: "crit" },
    { label: "LOT L-88", value: "cert gap · held", sev: "warn" },
    { label: "CLEANROOM A", value: "particle count high", sev: "warn" },
    { label: "AS9100 FINDINGS", value: "1 open", sev: "info" },
    { label: "FIRST-PASS YIELD", value: "94%", sev: "ok" },
  ],
  solo: [
    { label: "MSA TEMPLATE", value: "missing · 2 deals", sev: "crit" },
    { label: "INVOICE #0007", value: "$9,400 · 12d", sev: "warn" },
    { label: "MONTHS OF CASH", value: "4.2", sev: "warn" },
    { label: "PIPELINE", value: "$86k", sev: "info" },
    { label: "PLACED", value: "7", sev: "ok" },
  ],
  pulp: [
    { label: "DIGESTER #2", value: "+6°C deviation", sev: "crit" },
    { label: "EFFLUENT BOD", value: "near permit", sev: "warn" },
    { label: "MACHINE 4", value: "2 tenders short", sev: "warn" },
    { label: "REEL R-9", value: "moisture off-spec", sev: "info" },
    { label: "UPTIME", value: "96%", sev: "ok" },
  ],
};

export function floorFor(id: string): FloorZone[] {
  return FLOORS[id] ?? FLOORS.utility;
}
export function tickerFor(id: string): TickerItem[] {
  return TICKER[id] ?? TICKER.utility;
}
