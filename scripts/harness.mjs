// Phase 2 test harness (PHASES.md): runs the real pipeline over the dummy
// datasets on every change. A feature not exercised here doesn't exist.
import { readFileSync, readdirSync, copyFileSync, rmSync } from "fs";
import path from "path";


// compile TS on the fly via next's bundled swc? Keep it simple: import the
// compiled logic through tsx-less route — we re-implement imports via ts paths
// using a tiny esbuild-free trick: run with `npx tsx` (devDependency of next? no).
// Instead: this harness imports the TS sources through Next's own transpilation
// is unavailable in plain node, so we test through the built route handler? No —
// simplest honest path: use dynamic import with ts-node/esm if present, else
// instruct. (See package.json "harness" script: node --experimental-strip-types)
const { csvToSchema } = await import("../lib/engine/csv.ts");
const { mapSchema, valueOverlap } = await import("../lib/engine/mapper.ts");
const { checkWire } = await import("../lib/engine/validate.ts");

let failures = 0;
const ok = (cond, msg) => { if (cond) console.log("  ✓", msg); else { failures++; console.error("  ✗", msg); } };

function loadSet(dir) {
  const base = path.join("testdata", dir);
  const tables = [];
  for (const f of readdirSync(base).filter((f) => f.endsWith(".csv"))) {
    tables.push(...csvToSchema(f, readFileSync(path.join(base, f), "utf8")).tables);
  }
  return { source: dir, kind: "csv", tables, scannedAt: new Date().toISOString() };
}

console.log("— utility set —");
const u = loadSet("utility");
const um = mapSchema(u);
ok(um.objects.find((o) => o.table === "work_orders")?.proposed === "Work Orders", "work_orders → Work Orders");
ok(um.objects.find((o) => o.table === "assets")?.proposed.includes("Asset"), "assets → Assets");
ok(um.objects.find((o) => o.table === "crew_roster")?.proposed.includes("People"), "crew_roster → People/Staff");
ok(um.objects.every((o) => o.reasoning.length > 0), "every proposal carries reasoning");
ok(um.wires.some((w) => w.fromTable === "work_orders" && w.toTable === "assets" && w.matchRate === 1), "wire: work_orders.asset_id → assets (100% overlap)");
ok(um.wires.some((w) => w.fromTable === "work_orders" && w.toTable === "crew_roster"), "wire: work_orders.crew_id → crew_roster");

console.log("— wire validation —");
const bad = checkWire(u, "work_orders", "opened_date", "crew_roster", "crew_id");
ok(!bad.ok && bad.message.includes("can't be right"), "date→id wire rejected in plain English");
const wrong = checkWire(u, "work_orders", "wo_id", "assets", "asset_id");
ok(!wrong.ok && (wrong.suggestion ?? "").includes("asset_id"), "zero-overlap wire rejected WITH a suggestion: " + wrong.suggestion);
const good = checkWire(u, "work_orders", "asset_id", "assets", "asset_id");
ok(good.ok && good.matchRate === 1, "correct wire accepted at 100%");

console.log("— food set —");
const fm = mapSchema(loadSet("food"));
ok(fm.objects.find((o) => o.table === "orders")?.proposed.includes("Orders"), "orders → Orders/Sales");
ok(fm.objects.find((o) => o.table === "ingredients_inventory")?.proposed.includes("Inventory"), "ingredients_inventory → Inventory");

console.log("— messy SMB export —");
const s = loadSet("smb");
const t = s.tables[0];
ok(t.rowCount === 4, "quoted commas parsed: 4 rows, not more");
ok(t.sampleRows[0].client_name === "Vance, Carla", 'embedded comma preserved: "Vance, Carla"');
const sm = mapSchema(s);
ok(sm.objects[0].proposed.includes("Customer"), "clients_export → Customers/Clients");
ok(sm.objects[0].reasoning.some((r) => r.includes("empty")), "half-empty columns flagged in reasoning");

ok(valueOverlap(["a","b","c"], ["b","c","d"]) > 0.6 && valueOverlap(["a"], ["z"]) === 0, "valueOverlap sane");

console.log("— process-flow engine (Process Explorer computation) —");
const { generateEventLog, computeFlow, DEFAULT_EXPECTED_PATH } = await import("../lib/flow.ts");
const log1 = generateEventLog("hartwell");
const log2 = generateEventLog("hartwell");
ok(JSON.stringify(log1) === JSON.stringify(log2), "event generation is deterministic (same company → same log)");
const flow = computeFlow(log1, DEFAULT_EXPECTED_PATH);
ok(flow.totalObjects === 180, `180 objects tracked (got ${flow.totalObjects})`);
ok(flow.states.reduce((n, s) => n + s.current, 0) === flow.totalObjects, "every object is in exactly one current state");
const outStates = [...new Set(flow.transitions.map((t) => t.from))];
ok(outStates.every((s) => {
  const outs = flow.transitions.filter((t) => t.from === s);
  const totalPct = outs.reduce((n, t) => n + t.pct, 0);
  return totalPct >= 97 && totalPct <= 103; // rounding tolerance
}), "outgoing transition percentages sum to ~100% per state");
ok(flow.states.filter((s) => s.isBottleneck).length === 1, "exactly one bottleneck is identified");
ok(flow.states.find((s) => s.isBottleneck)?.id === "Assigned", "bottleneck is computed from dwell times (Assigned)");
ok(flow.transitions.some((t) => t.from === "Open" && t.to === "Submitted" && t.expected), "expected-path edges are flagged");
ok(flow.transitions.some((t) => !t.expected && t.to === "Cancelled"), "off-path cancellations are captured");
ok(flow.deviationSentences.length > 0 && flow.deviationSentences[0].includes("bottleneck"), "plain-English deviation findings are computed");
const flowNoAssign = computeFlow(log1, ["Open", "Submitted", "Dispositioned", "Closed"]);
ok(flowNoAssign.transitions.find((t) => t.from === "Submitted" && t.to === "Assigned")?.expected === false, "changing the expected path reclassifies edges");

console.log("— BOM / micro-costing engine (runs on a scratch copy of prisma/dev.db) —");
const scratch = path.resolve("prisma/.harness.db");
copyFileSync(path.resolve("prisma/dev.db"), scratch);
process.env.DATABASE_URL = "file:" + scratch;
// Import AFTER setting DATABASE_URL: lib/prisma.ts reads it at module init.
const engine = await import("./test-engine.ts");
try {
  await engine.runEngineTests(ok);
  console.log("— graph store round-trip (utility set → persisted ontology) —");
  await engine.runGraphStoreTests(ok, u, um);
} catch (e) {
  failures++;
  console.error("  ✗ engine stage crashed:", e.message);
} finally {
  await engine.disconnectEngine();
  for (const suffix of ["", "-journal", "-wal", "-shm"]) rmSync(scratch + suffix, { force: true });
}

console.log(failures ? `\n${failures} FAILURE(S)` : "\nALL CHECKS PASSED");
process.exit(failures ? 1 : 0);
