// Heuristic mapping engine: proposes real-world objects for tables and
// relationships between them. Every confidence score is COMPUTED from the
// signals below and carries its reasoning — nothing is invented.
// An optional LLM pass (lib/engine/llm.ts) can refine these proposals when
// an API key is configured; without it, this deterministic pass stands alone.

import type { NormalizedSchema, TableProfile } from "./schema";

export interface ObjectProposal {
  table: string;
  proposed: string;
  confidence: number; // 0..1, computed
  reasoning: string[]; // the signals behind the number, plain English
}

export interface WireProposal {
  fromTable: string;
  fromColumn: string;
  toTable: string;
  toColumn: string;
  toObject: string;
  label: string;
  matchRate: number; // computed value overlap on samples
  reasoning: string;
}

export interface MappingResult {
  objects: ObjectProposal[];
  wires: WireProposal[];
  engine: "deterministic" | "deterministic+llm";
}

// Vocabulary → real-world object. Order matters: first hit wins per table.
const VOCAB: { object: string; label: string; words: RegExp }[] = [
  { object: "Work Orders", label: "work on", words: /(work[_ ]?order|wo[_ ]|job|ticket|task)/i },
  { object: "People / Staff", label: "staffed by", words: /(employee|staff|crew|roster|person|people|operator|worker|user)/i },
  { object: "Assets / Equipment", label: "performed on", words: /(asset|equipment|machine|device|unit|vehicle|transformer)/i },
  { object: "Customers / Clients", label: "for customer", words: /(customer|client|account|contact)/i },
  { object: "Orders / Sales", label: "fulfils", words: /(order|sale|invoice|check|transaction|booking|reservation)/i },
  { object: "Inventory / Materials", label: "consumes", words: /(inventory|stock|item|material|sku|product|ingredient|lot)/i },
  { object: "Incidents / Findings", label: "filed against", words: /(incident|finding|violation|inspection|audit|defect|ncr)/i },
  { object: "Locations / Sites", label: "located at", words: /(location|site|store|facility|zone|warehouse|address)/i },
  { object: "Schedules / Shifts", label: "scheduled in", words: /(schedule|shift|calendar|pto|leave)/i },
  { object: "Suppliers / Vendors", label: "supplied by", words: /(supplier|vendor|purchase)/i },
];

export function proposeObject(t: TableProfile): ObjectProposal {
  const reasoning: string[] = [];
  let score = 0;
  const nameHit = VOCAB.find((v) => v.words.test(t.name));
  const colHits = VOCAB.map((v) => ({ v, n: t.columns.filter((c) => v.words.test(c.name)).length }))
    .filter((x) => x.n > 0)
    .sort((a, b) => b.n - a.n);
  const winner = nameHit ?? colHits[0]?.v;
  if (!winner) {
    return { table: t.name, proposed: "Unclassified records", confidence: 0.3, reasoning: [
      `Neither the table name "${t.name}" nor its ${t.columns.length} column names match any known business vocabulary — a human should name this one.`,
    ] };
  }
  if (nameHit) { score += 0.5; reasoning.push(`Table name "${t.name}" matches ${winner.object} vocabulary.`); }
  const supporting = t.columns.filter((c) => winner.words.test(c.name)).length;
  if (supporting) { score += Math.min(0.25, supporting * 0.08); reasoning.push(`${supporting} column name(s) also match (${t.columns.filter((c) => winner.words.test(c.name)).map((c) => c.name).join(", ")}).`); }
  const idCol = t.columns.find((c) => c.type === "id" && c.distinctRatio > 0.9);
  if (idCol) { score += 0.15; reasoning.push(`"${idCol.name}" behaves like a primary key (${Math.round(idCol.distinctRatio * 100)}% distinct) — this table is a record-of-things, not a log.`); }
  const dateCols = t.columns.filter((c) => c.type === "date").length;
  if (dateCols) { score += 0.05; reasoning.push(`${dateCols} date column(s) present.`); }
  const emptyCols = t.columns.filter((c) => c.nonNullRatio < 0.5).length;
  if (emptyCols) { score -= 0.08 * Math.min(emptyCols, 3); reasoning.push(`Caution: ${emptyCols} column(s) are more than half empty in the sample.`); }
  return { table: t.name, proposed: winner.object, confidence: Math.max(0.3, Math.min(0.99, score)), reasoning };
}

/** Value overlap between two sampled columns: |A ∩ B| / |A| over sample values. */
export function valueOverlap(a: string[], b: string[]): number {
  const A = a.filter(Boolean);
  if (!A.length) return 0;
  const B = new Set(b.filter(Boolean));
  return A.filter((v) => B.has(v)).length / A.length;
}

export function proposeWires(schema: NormalizedSchema, objects: ObjectProposal[]): WireProposal[] {
  const wires: WireProposal[] = [];
  const objByTable = Object.fromEntries(objects.map((o) => [o.table, o.proposed]));
  for (const t of schema.tables) {
    for (const c of t.columns) {
      if (c.type !== "id") continue;
      const base = c.name.replace(/(^|_)(id|no|number|code|ref|key)$/i, "").replace(/_$/, "");
      if (!base) continue;
      for (const other of schema.tables) {
        if (other.name === t.name) continue;
        const targetKey = other.columns.find(
          (oc) => oc.type === "id" && (oc.name.toLowerCase() === c.name.toLowerCase() || oc.name.toLowerCase().startsWith(base.toLowerCase()))
        );
        if (!targetKey) continue;
        const overlap = valueOverlap(c.samples, targetKey.samples);
        if (overlap < 0.4) continue; // name matched, values don't — not a wire
        const vocab = VOCAB.find((v) => v.words.test(base) || v.words.test(other.name));
        wires.push({
          fromTable: t.name, fromColumn: c.name, toTable: other.name, toColumn: targetKey.name,
          toObject: objByTable[other.name] ?? other.name,
          label: vocab?.label ?? "relates to",
          matchRate: overlap,
          reasoning: `"${t.name}.${c.name}" and "${other.name}.${targetKey.name}" share ${Math.round(overlap * 100)}% of sampled values and matching names.`,
        });
      }
    }
  }
  return wires;
}

export function mapSchema(schema: NormalizedSchema): MappingResult {
  const objects = schema.tables.map(proposeObject);
  return { objects, wires: proposeWires(schema, objects), engine: "deterministic" };
}
