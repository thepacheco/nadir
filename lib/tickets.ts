// Per-company demo tickets. Each company sees only its own, industry-accurate
// work — no cross-contamination (a staffing firm must never see a catering
// checklist). Fields match what the Assignments board and Layout read:
// ticket_id, department, owner, status, priority, description, location.

export type DemoTicket = {
  ticket_id: string;
  department: string;
  owner: string;
  status: "OPEN" | "IN_PROGRESS" | "CLOSED";
  priority: "CRITICAL" | "HIGH" | "MEDIUM" | "LOW";
  description: string;
  location: string;
};

export const TICKETS: Record<string, DemoTicket[]> = {
  utility: [
    { ticket_id: "GG-2041", department: "Maintenance", owner: "J. Doyle", status: "OPEN", priority: "CRITICAL", description: "Transformer T-114 running +8°C over seasonal norm", location: "Substation 4" },
    { ticket_id: "GG-2044", department: "Field Ops", owner: "R. Mendez", status: "OPEN", priority: "HIGH", description: "Feeder 12 rebuild — crew short for Thursday", location: "Feeder 12" },
    { ticket_id: "GG-2039", department: "Compliance", owner: "L. Rowe", status: "IN_PROGRESS", priority: "HIGH", description: "OSHA 300 log missing 2 March incidents", location: "Safety Office" },
    { ticket_id: "GG-2050", department: "Engineering", owner: "A. Whitfield", status: "OPEN", priority: "MEDIUM", description: "Recloser R-88 miscoordination on lateral", location: "Sector 7" },
    { ticket_id: "GG-2033", department: "Field Ops", owner: "T. Nguyen", status: "OPEN", priority: "MEDIUM", description: "Pole inspection cycle overdue", location: "Sector 7" },
    { ticket_id: "GG-2018", department: "IT/OT", owner: "S. Park", status: "CLOSED", priority: "LOW", description: "AMI collector data gap reconciled", location: "HQ Office" },
  ],
  manufacturing: [
    { ticket_id: "MF-3120", department: "Maintenance", owner: "J. Doyle", status: "CLOSED", priority: "HIGH", description: "Line 3 kiln actuator failure E-217", location: "Line 3" },
    { ticket_id: "MF-3126", department: "Quality", owner: "P. Osei", status: "IN_PROGRESS", priority: "HIGH", description: "Weld station B torque out of spec", location: "Weld Cell B" },
    { ticket_id: "MF-3131", department: "Supply Chain", owner: "D. Kline", status: "OPEN", priority: "HIGH", description: "Fastener supplier certificate expired", location: "Receiving" },
    { ticket_id: "MF-3140", department: "Quality", owner: "P. Osei", status: "OPEN", priority: "MEDIUM", description: "CMM #2 calibration overdue", location: "Metrology" },
    { ticket_id: "MF-3115", department: "Maintenance", owner: "R. Vance", status: "OPEN", priority: "MEDIUM", description: "Preventive maintenance due — Press 4", location: "Press Line" },
  ],
  staffing: [
    { ticket_id: "ST-4102", department: "Contracts", owner: "M. Voss", status: "OPEN", priority: "CRITICAL", description: "No signed MSA — 2 clients stalled at contract", location: "Legal" },
    { ticket_id: "ST-4108", department: "Recruiting", owner: "R. Mendez", status: "IN_PROGRESS", priority: "HIGH", description: "Background check pending — start date at risk", location: "Placements" },
    { ticket_id: "ST-4111", department: "Payroll", owner: "D. Okafor", status: "OPEN", priority: "HIGH", description: "3 contractor timesheets missing — billing at risk", location: "Back Office" },
    { ticket_id: "ST-4115", department: "Account Mgmt", owner: "S. Lindqvist", status: "OPEN", priority: "HIGH", description: "Contractor fell off assignment — backfill needed", location: "Client: Delta Foods" },
    { ticket_id: "ST-4119", department: "Finance", owner: "A. Twinam", status: "OPEN", priority: "MEDIUM", description: "Client PO expired — invoice can't be sent", location: "Finance" },
    { ticket_id: "ST-4122", department: "Compliance", owner: "L. Rowe", status: "OPEN", priority: "MEDIUM", description: "I-9 reverification due — 4 contractors", location: "HR" },
    { ticket_id: "ST-4097", department: "Recruiting", owner: "T. Nguyen", status: "CLOSED", priority: "LOW", description: "Redeployment placed — contractor ending Friday", location: "Placements" },
  ],
  restaurant: [
    { ticket_id: "HW-5210", department: "Kitchen", owner: "M. Kaur", status: "OPEN", priority: "CRITICAL", description: "Walk-in cooler temp excursion — 47°F", location: "Midtown Kitchen" },
    { ticket_id: "HW-5214", department: "Finance", owner: "A. Twinam", status: "IN_PROGRESS", priority: "HIGH", description: "Invoice #7741 billed 8% over contract price", location: "HQ Office" },
    { ticket_id: "HW-5218", department: "Kitchen", owner: "M. Kaur", status: "OPEN", priority: "HIGH", description: "Prep count vs bookings mismatch — 120 vs 186", location: "Midtown Kitchen" },
    { ticket_id: "HW-5221", department: "Compliance", owner: "L. Rowe", status: "OPEN", priority: "MEDIUM", description: "Health inspection prep — permit renewal due", location: "Midtown Kitchen" },
    { ticket_id: "HW-5199", department: "Finance", owner: "A. Twinam", status: "CLOSED", priority: "LOW", description: "POS reconciliation gap resolved", location: "HQ Office" },
  ],
  aerospace: [
    { ticket_id: "AV-6301", department: "Quality", owner: "P. Osei", status: "OPEN", priority: "CRITICAL", description: "Torque record missing — serial SN-04", location: "Assembly Bay 2" },
    { ticket_id: "AV-6305", department: "Quality", owner: "P. Osei", status: "OPEN", priority: "HIGH", description: "Traceability gap — lot L-88 material cert", location: "Receiving Inspection" },
    { ticket_id: "AV-6309", department: "Production", owner: "R. Vance", status: "IN_PROGRESS", priority: "HIGH", description: "Cleanroom particle count excursion", location: "Cleanroom A" },
    { ticket_id: "AV-6312", department: "Compliance", owner: "L. Rowe", status: "OPEN", priority: "MEDIUM", description: "AS9100 audit finding open past due", location: "Quality Office" },
    { ticket_id: "AV-6288", department: "Quality", owner: "S. Park", status: "CLOSED", priority: "MEDIUM", description: "Torque wrench T-22 calibrated", location: "Metrology" },
  ],
  solo: [
    { ticket_id: "SO-0007", department: "Legal", owner: "You", status: "OPEN", priority: "CRITICAL", description: "No MSA template — 2 deals stalled at contract", location: "Contracts" },
    { ticket_id: "SO-0011", department: "Finance", owner: "You", status: "OPEN", priority: "HIGH", description: "Invoice #0007 ($9,400) 12 days overdue", location: "Finance" },
    { ticket_id: "SO-0014", department: "Ops", owner: "A. Twinam", status: "OPEN", priority: "MEDIUM", description: "New-client onboarding checklist incomplete", location: "Ops" },
    { ticket_id: "SO-0016", department: "Legal", owner: "You", status: "OPEN", priority: "MEDIUM", description: "Contractor agreement unsigned", location: "Contracts" },
  ],
  pulp: [
    { ticket_id: "PP-7401", department: "Operations", owner: "R. Vance", status: "OPEN", priority: "CRITICAL", description: "Digester #2 temperature deviation", location: "Digester House" },
    { ticket_id: "PP-7405", department: "Environmental", owner: "L. Rowe", status: "IN_PROGRESS", priority: "HIGH", description: "Effluent BOD approaching permit limit", location: "Wastewater" },
    { ticket_id: "PP-7409", department: "Maintenance", owner: "J. Doyle", status: "OPEN", priority: "HIGH", description: "Bearing vibration alarm — Machine 4", location: "Paper Machine 4" },
    { ticket_id: "PP-7412", department: "Quality", owner: "P. Osei", status: "OPEN", priority: "MEDIUM", description: "Moisture out of spec — reel R-9", location: "Reel Room" },
    { ticket_id: "PP-7388", department: "Safety", owner: "T. Nguyen", status: "OPEN", priority: "MEDIUM", description: "Lockout/tagout audit due", location: "Plant Floor" },
  ],
};

export function ticketsFor(companyId: string): DemoTicket[] {
  return TICKETS[companyId] ?? [];
}
