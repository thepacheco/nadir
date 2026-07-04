// Graph Store persistence (ARCHITECTURE.md Part 3.1, pipeline step 7).
// Takes a confirmed mapping and writes it into real tables: object types,
// sampled object instances, and type-level relationships — plus the audit
// entry every mutation owes. Until this ran, a mapping only existed in the
// browser; after it runs, the graph is queryable by every lens.

import { prisma } from "../prisma";
import type { NormalizedSchema, TableProfile } from "./schema";
import type { MappingResult } from "./mapper";
import { checkWire } from "./validate";

export interface PersistResult {
  companyId: string;
  types: number;
  objects: number;
  relationships: number;
  rejectedWires: { wire: string; reason: string }[];
}

function keyColumn(t: TableProfile): string | null {
  // Prefer the id-typed column with the highest distinctness — that's the
  // primary key shape. FK columns repeat; PKs don't.
  const ids = t.columns.filter((c) => c.type === "id");
  if (!ids.length) return null;
  return ids.reduce((a, b) => (b.distinctRatio > a.distinctRatio ? b : a)).name;
}

/**
 * Persist a confirmed mapping into the Graph Store. Idempotent by
 * replacement: re-confirming the same source rebuilds that company's types,
 * sampled objects, and relationships instead of duplicating them.
 * Every wire is re-validated server-side before it is written — the UI's
 * validation is convenience, not the gate.
 */
export async function persistMapping(opts: {
  companyName: string;
  industry?: string;
  schema: NormalizedSchema;
  mapping: MappingResult;
  confirmedBy?: string;
}): Promise<PersistResult> {
  const { companyName, industry, schema, mapping, confirmedBy } = opts;

  let company = await prisma.company.findFirst({ where: { name: companyName } });
  if (!company) {
    company = await prisma.company.create({
      data: { name: companyName, industry: industry ?? "unspecified" },
    });
  }

  // Replace this company's previous graph (v0: full rebuild per confirm).
  await prisma.graphRelationship.deleteMany({ where: { companyId: company.id } });
  await prisma.graphObject.deleteMany({ where: { companyId: company.id } });
  await prisma.graphObjectType.deleteMany({ where: { companyId: company.id } });

  let objectCount = 0;
  const typeIdByTable = new Map<string, string>();

  for (const proposal of mapping.objects) {
    const table = schema.tables.find((t) => t.name === proposal.table);
    if (!table) continue;

    const type = await prisma.graphObjectType.create({
      data: {
        companyId: company.id,
        name: proposal.proposed,
        sourceTable: proposal.table,
        confidence: proposal.confidence,
        reasoning: proposal.reasoning.join("\n"),
      },
    });
    typeIdByTable.set(proposal.table, type.id);

    const key = keyColumn(table);
    for (const row of table.sampleRows) {
      await prisma.graphObject.create({
        data: {
          companyId: company.id,
          typeId: type.id,
          sourceKey: key ? (row[key] ?? "") : "",
          attributes: JSON.stringify(row),
        },
      });
      objectCount++;
    }
  }

  // Wires: re-validate each against the schema before persisting.
  let relationshipCount = 0;
  const rejectedWires: PersistResult["rejectedWires"] = [];
  for (const w of mapping.wires) {
    const verdict = checkWire(schema, w.fromTable, w.fromColumn, w.toTable, w.toColumn);
    if (!verdict.ok) {
      rejectedWires.push({
        wire: `${w.fromTable}.${w.fromColumn} → ${w.toTable}.${w.toColumn}`,
        reason: verdict.message,
      });
      continue;
    }
    await prisma.graphRelationship.create({
      data: {
        companyId: company.id,
        fromTable: w.fromTable,
        fromColumn: w.fromColumn,
        toTable: w.toTable,
        toColumn: w.toColumn,
        label: w.label,
        matchRate: verdict.matchRate ?? w.matchRate,
        confirmedBy: confirmedBy ?? null,
      },
    });
    relationshipCount++;
  }

  await prisma.auditEntry.create({
    data: {
      companyId: company.id,
      actor: confirmedBy ?? "system",
      action: "mapping.persisted",
      detail:
        `Persisted ontology from "${schema.source}": ${typeIdByTable.size} object types, ` +
        `${objectCount} sampled objects, ${relationshipCount} relationships` +
        (rejectedWires.length
          ? `; rejected ${rejectedWires.length} wire(s) that failed validation`
          : ""),
    },
  });

  return {
    companyId: company.id,
    types: typeIdByTable.size,
    objects: objectCount,
    relationships: relationshipCount,
    rejectedWires,
  };
}

/** Read the persisted graph back (what the lenses will render). */
export async function loadGraph(companyId: string) {
  const [types, objects, relationships] = await Promise.all([
    prisma.graphObjectType.findMany({ where: { companyId } }),
    prisma.graphObject.findMany({ where: { companyId } }),
    prisma.graphRelationship.findMany({ where: { companyId } }),
  ]);
  return { types, objects, relationships };
}
