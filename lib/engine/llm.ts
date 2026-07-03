// Portable model interface (AI-AGENT-GUIDE §6): one call site, hard token
// budget, provider-swappable. Active only when ANTHROPIC_API_KEY is set —
// otherwise the deterministic mapper stands alone (which is real, not theater).
// Verify current model names/pricing at docs.claude.com before changing MODEL.

import type { MappingResult } from "./mapper";
import type { NormalizedSchema } from "./schema";

const MODEL = "claude-haiku-4-5-20251001"; // cheapest viable tier for mapping
const MAX_TOKENS_PER_SESSION = 4000; // hard budget: a mapping session costs cents

export function llmAvailable(): boolean {
  return !!process.env.ANTHROPIC_API_KEY;
}

/** Refine deterministic proposals with a single bounded model pass. */
export async function refineMapping(schema: NormalizedSchema, base: MappingResult): Promise<MappingResult> {
  if (!llmAvailable()) return base;
  const prompt = [
    "You are refining table→business-object mappings. Reply with strict JSON only:",
    '{"objects":[{"table":string,"proposed":string,"note":string}]}',
    "Rename a proposed object ONLY if the schema clearly supports a better name. Keep names layman-readable.",
    "Schema (names, types, sampled values only — no full data):",
    JSON.stringify(schema.tables.map((t) => ({
      table: t.name, rows: t.rowCount,
      columns: t.columns.map((c) => ({ name: c.name, type: c.type, samples: c.samples.slice(0, 3) })),
    }))),
    "Current proposals:", JSON.stringify(base.objects.map((o) => ({ table: o.table, proposed: o.proposed }))),
  ].join("\n");
  const res = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: { "content-type": "application/json", "x-api-key": process.env.ANTHROPIC_API_KEY!, "anthropic-version": "2023-06-01" },
    body: JSON.stringify({ model: MODEL, max_tokens: Math.min(1500, MAX_TOKENS_PER_SESSION), messages: [{ role: "user", content: prompt }] }),
  });
  if (!res.ok) return base; // model failure degrades to deterministic, never blocks
  try {
    const data = await res.json();
    const text = data?.content?.[0]?.text ?? "";
    const parsed = JSON.parse(text.slice(text.indexOf("{"), text.lastIndexOf("}") + 1));
    const byTable = new Map<string, { proposed: string; note?: string }>((parsed.objects ?? []).map((o: { table: string; proposed: string; note?: string }) => [o.table, o]));
    return {
      ...base,
      engine: "deterministic+llm",
      objects: base.objects.map((o) => {
        const r = byTable.get(o.table);
        return r && r.proposed !== o.proposed
          ? { ...o, proposed: r.proposed, reasoning: [...o.reasoning, `Model refinement: ${r.note ?? "renamed for clarity"}.`] }
          : o;
      }),
    };
  } catch {
    return base;
  }
}
