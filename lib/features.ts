export const FEATURES = [
  {
    slug: "ontology-engine",
    title: "Ontology Engine",
    eyebrow: "PLATFORM / ONTOLOGY ENGINE",
    hero: "Turn messy databases into real-world objects.",
    sub: "The Ontology Engine is the semantic core of Nadir. It takes raw, inconsistent database schemas and translates them into living digital objects — Work Orders, Machines, Employees, Shifts — that represent how your business actually operates.",
    sections: [
      {
        title: "What it does",
        body: "Most enterprise databases were designed decades ago by someone who is no longer at the company. Column names like 'EMP_ID_V2' or 'TBL_WRK_ORD_99' are common. The Ontology Engine uses a combination of deterministic heuristics and AI-assisted inference to automatically map these raw schemas into standardized semantic objects.",
        bullets: [
          "Automatically infers entity types (Person, Machine, WorkOrder, Location) from raw columns",
          "Handles inconsistent naming conventions across multiple databases",
          "Human-in-the-loop confirmation — AI suggests, your team approves",
          "Learns your company's specific naming patterns over time",
        ],
      },
      {
        title: "Why it matters",
        body: "Without the Ontology Engine, every integration project starts from scratch. A new data engineer spends weeks manually mapping columns to business concepts, and the mapping breaks every time the source schema changes. With Nadir, the mapping is semantic and self-healing — it adapts as your databases evolve.",
        bullets: [
          "Deploy into 'too messy' environments that traditional SaaS cannot handle",
          "Eliminate months of manual data mapping per integration",
          "Mappings persist and compound — they get better the longer you use the system",
        ],
      },
    ],
    snippet: [
      { label: "source", value: "oracle_erp_prod", color: "#0E7C8A" },
      { label: "table", value: "TBL_WRK_ORD_99" },
      { label: "inferred_type", value: "WorkOrder", color: "#15854F" },
      { label: "confidence", value: "0.94", color: "#15854F" },
      { label: "status", value: "awaiting_confirmation" },
    ],
  },
  {
    slug: "schema-mapper",
    title: "Schema Mapper",
    eyebrow: "PLATFORM / SCHEMA MAPPER",
    hero: "Visual drag-and-drop column matching.",
    sub: "The Schema Mapper is the interactive interface where your team confirms, adjusts, and validates the AI-suggested mappings from the Ontology Engine. It's how raw database columns become trusted semantic objects.",
    sections: [
      {
        title: "How it works",
        body: "When the Ontology Engine processes a new database, it generates a set of suggested mappings. The Schema Mapper presents these visually — source columns on the left, target objects on the right — with confidence scores and mismatch warnings for anything that looks off.",
        bullets: [
          "Drag-and-drop interface for column-to-object matching",
          "Mismatch warnings when data types or formats don't align",
          "Batch confirmation for high-confidence mappings",
          "Version history — see how mappings have changed over time",
        ],
      },
      {
        title: "Built for non-engineers",
        body: "The Schema Mapper is designed so that a plant manager or compliance officer — not just a data engineer — can understand and validate the mappings. Labels are written in plain English, and every mapping shows a sample of the actual data so reviewers can verify at a glance.",
        bullets: [
          "Plain-English labels for every column and object",
          "Live data previews alongside each mapping",
          "One-click approval for trusted suggestions",
        ],
      },
    ],
    snippet: [
      { label: "mapping", value: "" },
      { label: "  EMP_ID", value: "→ Employee.id", color: "#0E7C8A" },
      { label: "  WRK_DESC", value: "→ WorkOrder.description", color: "#0E7C8A" },
      { label: "  MACH_SER", value: "→ Machine.serial", color: "#0E7C8A" },
      { label: "status", value: "3 confirmed ✓", color: "#15854F" },
    ],
  },
  {
    slug: "operational-graph",
    title: "Operational Graph",
    eyebrow: "PLATFORM / OPERATIONAL GRAPH",
    hero: "A live model of your entire operation.",
    sub: "The Operational Graph is the output of the fusion layer — a massive, continuously updating model that links every entity in your business: machines to maintenance logs, operators to certifications, raw materials to invoices.",
    sections: [
      {
        title: "What makes it different",
        body: "Traditional BI tools give you charts from a single data source. The Operational Graph links data across every connected system into a single queryable model. When you look up a machine, you see its maintenance history, the operators who run it, their certifications, the parts on order, and the compliance rules that apply — all in one place.",
        bullets: [
          "Cross-system entity resolution — one view across all databases",
          "Real-time updates as source data changes",
          "Queryable by any user, not just engineers",
          "Powers the compliance monitor and alert system",
        ],
      },
      {
        title: "How teams use it",
        body: "Operations managers use the graph to trace bottlenecks. Compliance officers use it to verify that every worker on a shift has the required certifications. Executives use it to understand the real-time health of their operation without waiting for weekly reports.",
        bullets: [
          "Trace any entity to its relationships and dependencies",
          "Identify single points of failure before they break",
          "Power automated compliance checks across the entire operation",
        ],
      },
    ],
    snippet: [
      { label: "graph.query", value: "" },
      { label: "  Machine[T-114]", value: "" },
      { label: "    → MaintenanceLog", value: "[3 records]", color: "#0E7C8A" },
      { label: "    → Operator", value: "[J. Torres]", color: "#0E7C8A" },
      { label: "    → Certification", value: "[EXPIRED]", color: "#C7452F" },
    ],
  },
  {
    slug: "compliance-monitor",
    title: "Compliance Monitor",
    eyebrow: "PLATFORM / COMPLIANCE MONITOR",
    hero: "Deterministic rules, not AI guessing.",
    sub: "The Compliance Monitor runs a continuous rules engine against your Operational Graph. Every check is strictly deterministic — math, not probability. When a constraint is violated, the system generates a briefing with exact next steps.",
    sections: [
      {
        title: "How rules work",
        body: "You define compliance rules as hard constraints — OSHA safety limits, NERC CIP requirements, internal financial thresholds, or custom business logic. The engine evaluates these continuously against the live Operational Graph. There is no AI involved in the evaluation itself.",
        bullets: [
          "Rules are evaluated mathematically — zero hallucination risk",
          "Supports regulatory frameworks: OSHA, NERC CIP, HIPAA, and custom rules",
          "Continuous monitoring — not batch, not nightly, continuous",
          "AI generates context and next-step recommendations after a violation is detected",
        ],
      },
      {
        title: "What happens when something breaks",
        body: "When a rule is violated — or when the system detects a pattern that historically preceded a violation — it generates a human-readable briefing. The briefing includes the exact data that triggered the alert, the rule that was violated, and a recommended course of action.",
        bullets: [
          "Briefings are written in plain English, not database jargon",
          "Includes the exact evidence trail for auditors",
          "Recommended actions based on how similar violations were resolved in the past",
        ],
      },
    ],
    snippet: [
      { label: "rule", value: "OSHA_1910.147" },
      { label: "check", value: "lockout_tagout_verified" },
      { label: "result", value: "VIOLATION", color: "#C7452F" },
      { label: "severity", value: "critical", color: "#C7452F" },
      { label: "action", value: "briefing generated →", color: "#0E7C8A" },
    ],
  },
  {
    slug: "audit-trails",
    title: "Audit Trails",
    eyebrow: "PLATFORM / AUDIT TRAILS",
    hero: "Immutable, tamper-evident logging.",
    sub: "Every action in the Nadir platform is recorded in an append-only ledger that cannot be altered or deleted by any user — including Nadir administrators. This is the foundation of your compliance posture.",
    sections: [
      {
        title: "What gets logged",
        body: "Every query executed, every alert dismissed, every integration sync, every write-back action, every schema mapping change, and every user login. The logs include timestamps, user identities, the exact data accessed, and the action taken.",
        bullets: [
          "Append-only — no edits, no deletions, no exceptions",
          "Tamper-evident — cryptographic hashing ensures integrity",
          "Exportable in standard formats for external auditors",
          "Retained for the duration of your subscription + 30 days post-termination",
        ],
      },
      {
        title: "Compliance coverage",
        body: "The audit trail system is designed to satisfy the logging requirements of SOC-2 Type II, HIPAA, NERC CIP, and DoD IL4. For industries with specific retention requirements, we support custom retention policies and encrypted long-term archival.",
        bullets: [
          "SOC-2 Type II, HIPAA, NERC CIP, DoD IL4 compatible",
          "Custom retention policies for regulated industries",
          "Encrypted archival for long-term storage",
        ],
      },
    ],
    snippet: [
      { label: "14:32:07", value: "query.execute user=marta.voss" },
      { label: "14:32:09", value: "alert.dismiss id=AL-4421" },
      { label: "14:33:01", value: "writeback.approve ref=WO-882" },
      { label: "14:33:44", value: "schema.confirm map=EMP_ID" },
      { label: "mode", value: "append_only · immutable ✓", color: "#15854F" },
    ],
  },
];
