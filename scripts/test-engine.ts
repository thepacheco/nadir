// Engine-stage tests for the Prisma-backed BOM / micro-costing engine.
// Invoked by scripts/harness.mjs (`npm run harness`), which points
// DATABASE_URL at a scratch copy of prisma/dev.db before importing this file —
// so the committed database is never mutated by a test run.
import { ingestHistoricalData } from '../lib/engine/ingestion';
import { calculateTrueCost } from '../lib/engine/micro-costing';
import { prisma } from '../lib/prisma';
import type { NormalizedSchema } from '../lib/engine/schema';
import type { MappingResult } from '../lib/engine/mapper';

type Ok = (cond: boolean, msg: string) => void;

const NUREST_PAYLOAD = {
  companyName: 'NuRest',
  industry: 'Catering & Logistics',
  items: [
    { name: 'Apple', type: 'RAW_MATERIAL', baseCost: 0.3, unit: 'whole' },
    { name: 'Labor (Prep)', type: 'LABOR', baseCost: 15.0, unit: 'hour' },
    { name: 'Packaging', type: 'PACKAGING', baseCost: 0.15, unit: 'box' },
    {
      name: 'Apple Slices (Prep)',
      type: 'SUB_ASSEMBLY',
      unit: 'slice',
      bom: [
        { childName: 'Apple', quantity: 0.16666 }, // 1 apple = 6 slices
        { childName: 'Labor (Prep)', quantity: 0.005 }, // fraction of an hour per slice
      ],
    },
    {
      name: 'Breakfast Meal',
      type: 'FINISHED_GOOD',
      unit: 'meal',
      bom: [
        { childName: 'Apple Slices (Prep)', quantity: 2 },
        { childName: 'Packaging', quantity: 1 },
      ],
    },
  ],
};

export async function runEngineTests(ok: Ok) {
  // Clean slate on the scratch database.
  await prisma.bOM.deleteMany({});
  await prisma.bid.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.company.deleteMany({});

  const first = await ingestHistoricalData(NUREST_PAYLOAD);
  ok(first.itemsIngested === 5, 'NuRest payload ingested: 5 items');

  const meal = await prisma.item.findFirst({ where: { name: 'Breakfast Meal' } });
  ok(!!meal, 'Breakfast Meal exists in the store');
  if (!meal) return;

  // 2 slices × (apple 1/6 × $0.30 + labor 0.005h × $15) + $0.15 packaging
  // = $0.399996/meal → 80,000 meals = $31,999.68
  const run = await calculateTrueCost(meal.id, 80000);
  ok(
    Math.abs(run.totalCost - 31999.68) < 0.01,
    `80,000 meals cost $31,999.68 (got $${run.totalCost.toFixed(2)})`,
  );
  ok(Math.abs(run.unitCost - 0.399996) < 1e-6, 'unit cost is $0.399996 per meal');
  ok(run.components.length === 2, 'meal decomposes into 2 components (slices + packaging)');

  // Idempotency: re-sending the identical payload must not duplicate anything.
  await ingestHistoricalData(NUREST_PAYLOAD);
  const itemCount = await prisma.item.count();
  const bomCount = await prisma.bOM.count();
  ok(itemCount === 5, `re-ingest is idempotent: still 5 items (got ${itemCount})`);
  ok(bomCount === 4, `re-ingest is idempotent: still 4 BOM rows (got ${bomCount})`);

  const company = await prisma.company.findFirst();
  if (!company) return;

  // Cycle guard: a circular BOM is a data error, not an infinite loop.
  const a = await prisma.item.create({
    data: { companyId: company.id, name: 'Cycle A', type: 'SUB_ASSEMBLY', unit: 'unit' },
  });
  const b = await prisma.item.create({
    data: { companyId: company.id, name: 'Cycle B', type: 'SUB_ASSEMBLY', unit: 'unit' },
  });
  await prisma.bOM.create({ data: { parentId: a.id, childId: b.id, quantity: 1 } });
  await prisma.bOM.create({ data: { parentId: b.id, childId: a.id, quantity: 1 } });
  let cycleErr = '';
  try {
    await calculateTrueCost(a.id, 1);
  } catch (e) {
    cycleErr = (e as Error).message;
  }
  ok(cycleErr.includes('circular'), 'circular BOM rejected in plain English');

  // An item with no cost and no components is uncostable — say so, don't return $0.
  const orphan = await prisma.item.create({
    data: { companyId: company.id, name: 'Mystery Part', type: 'SUB_ASSEMBLY', unit: 'unit' },
  });
  let orphanErr = '';
  try {
    await calculateTrueCost(orphan.id, 10);
  } catch (e) {
    orphanErr = (e as Error).message;
  }
  ok(orphanErr.includes('nothing to compute'), 'uncostable item rejected with guidance');

  let qtyErr = '';
  try {
    await calculateTrueCost(meal.id, 0);
  } catch (e) {
    qtyErr = (e as Error).message;
  }
  ok(qtyErr.includes('positive'), 'zero/negative quantity rejected');
}

// Stage 3: Graph Store round-trip — mapping output must persist as a real,
// queryable graph (ARCHITECTURE.md Part 3.1/3.2 step 7), not evaporate.
export async function runGraphStoreTests(
  ok: Ok,
  schema: NormalizedSchema,
  mapping: MappingResult,
) {
  const { persistMapping, loadGraph } = await import('../lib/engine/graph-store');

  const expectedObjects = schema.tables.reduce((n, t) => n + t.sampleRows.length, 0);

  const first = await persistMapping({
    companyName: 'Harness Utility Co',
    industry: 'utilities',
    schema,
    mapping,
    confirmedBy: 'harness',
  });
  ok(first.types === schema.tables.length, `persisted ${schema.tables.length} object types`);
  ok(
    first.objects === expectedObjects,
    `persisted ${expectedObjects} sampled objects (got ${first.objects})`,
  );
  ok(first.relationships >= 2, `persisted relationships (got ${first.relationships})`);
  ok(first.rejectedWires.length === 0, 'no valid wire was rejected');

  // Idempotent by replacement: confirming again must not grow the graph.
  const second = await persistMapping({
    companyName: 'Harness Utility Co',
    industry: 'utilities',
    schema,
    mapping,
    confirmedBy: 'harness',
  });
  ok(
    second.types === first.types &&
      second.objects === first.objects &&
      second.relationships === first.relationships,
    're-confirm is idempotent: graph size unchanged',
  );

  const graph = await loadGraph(first.companyId);
  ok(
    graph.types.length === first.types &&
      graph.objects.length === first.objects &&
      graph.relationships.length === first.relationships,
    'loadGraph reads back exactly what was persisted',
  );
  ok(
    graph.types.every((t) => t.reasoning.length > 0),
    'every persisted type kept its mapper reasoning',
  );

  // A deliberately wrong wire must be re-validated server-side and refused.
  const withBadWire: MappingResult = {
    ...mapping,
    wires: [
      ...mapping.wires,
      {
        fromTable: schema.tables[0].name,
        fromColumn: schema.tables[0].columns[0].name,
        toTable: schema.tables[1].name,
        toColumn: schema.tables[1].columns[schema.tables[1].columns.length - 1].name,
        toObject: 'Nonsense',
        label: 'should not exist',
        matchRate: 1, // client lies about the match rate — server must not trust it
        reasoning: 'injected by harness',
      },
    ],
  };
  const third = await persistMapping({
    companyName: 'Harness Utility Co',
    industry: 'utilities',
    schema,
    mapping: withBadWire,
    confirmedBy: 'harness',
  });
  ok(
    third.rejectedWires.length === 1 && third.relationships === first.relationships,
    'server-side re-validation rejects an injected bad wire',
  );

  const audits = await prisma.auditEntry.findMany({
    where: { companyId: first.companyId, action: 'mapping.persisted' },
  });
  ok(audits.length === 3, `every persist wrote an audit entry (got ${audits.length}/3)`);
}

export async function disconnectEngine() {
  await prisma.$disconnect();
}
