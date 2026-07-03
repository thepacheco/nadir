// Checks and balances on user-drawn wires (README §4.6): a wire the data
// can't support is rejected with a plain-English reason, not accepted silently.

import type { NormalizedSchema } from "./schema";
import { valueOverlap } from "./mapper";

export interface WireCheck {
  ok: boolean;
  matchRate: number;
  message: string; // what happened, why, what to do next
  suggestion?: string;
}

export function checkWire(schema: NormalizedSchema, fromTable: string, fromColumn: string, toTable: string, toColumn: string): WireCheck {
  const ft = schema.tables.find((t) => t.name === fromTable);
  const tt = schema.tables.find((t) => t.name === toTable);
  if (!ft || !tt) return { ok: false, matchRate: 0, message: `Table "${!ft ? fromTable : toTable}" isn't in this schema scan. Re-run the scan, then wire again.` };
  const fc = ft.columns.find((c) => c.name === fromColumn);
  const tc = tt.columns.find((c) => c.name === toColumn);
  if (!fc || !tc) return { ok: false, matchRate: 0, message: `Column "${!fc ? fromColumn : toColumn}" doesn't exist in that table. Pick a column from the list.` };

  if ((fc.type === "date") !== (tc.type === "date")) {
    return { ok: false, matchRate: 0, message: `"${fromColumn}" is a ${fc.type} and "${toColumn}" is a ${tc.type} — a date can't identify a record in another table. This wire can't be right.`, suggestion: suggest(schema, fromTable, toTable) };
  }
  const rate = valueOverlap(fc.samples, tc.samples);
  if (rate === 0) {
    return { ok: false, matchRate: 0, message: `These columns share zero overlapping values in the sampled rows — this wire can't be right.`, suggestion: suggest(schema, fromTable, toTable) };
  }
  if (rate < 0.4) {
    return { ok: false, matchRate: rate, message: `Only ${Math.round(rate * 100)}% of sampled "${fromColumn}" values exist in "${toColumn}" — too weak to trust. If you're sure, correct the data first, then wire.`, suggestion: suggest(schema, fromTable, toTable) };
  }
  return { ok: true, matchRate: rate, message: `${Math.round(rate * 100)}% of sampled "${fromColumn}" values match "${toColumn}" — wire accepted.` };
}

function suggest(schema: NormalizedSchema, fromTable: string, toTable: string): string | undefined {
  const ft = schema.tables.find((t) => t.name === fromTable);
  const tt = schema.tables.find((t) => t.name === toTable);
  if (!ft || !tt) return undefined;
  let best: { from: string; to: string; rate: number } | null = null;
  for (const fc of ft.columns.filter((c) => c.type === "id")) {
    for (const tc of tt.columns.filter((c) => c.type === "id")) {
      const rate = valueOverlap(fc.samples, tc.samples);
      if (rate >= 0.4 && (!best || rate > best.rate)) best = { from: fc.name, to: tc.name, rate };
    }
  }
  return best ? `Did you mean ${fromTable}.${best.from} → ${toTable}.${best.to}? (${Math.round(best.rate * 100)}% of sampled values match.)` : undefined;
}
