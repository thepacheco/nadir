// Pipeline step 7 (ARCHITECTURE.md Part 3.2): CONFIRM → PERSIST.
// The client sends back the schema + mapping it received from /api/ingest
// (with any renames/rewires the user made). Every wire is re-validated
// server-side; what survives is written into the Graph Store and audited.

import { NextRequest, NextResponse } from "next/server";
import { persistMapping } from "@/lib/engine/graph-store";
import type { NormalizedSchema } from "@/lib/engine/schema";
import type { MappingResult } from "@/lib/engine/mapper";

export async function POST(req: NextRequest) {
  let body: {
    companyName?: string;
    industry?: string;
    schema?: NormalizedSchema;
    mapping?: MappingResult;
    confirmedBy?: string;
  } | null = null;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json(
      { error: "The request body must be JSON: { companyName, schema, mapping, confirmedBy? }." },
      { status: 400 },
    );
  }

  if (!body?.companyName || typeof body.companyName !== "string") {
    return NextResponse.json(
      { error: "companyName is required — the graph is stored per company." },
      { status: 400 },
    );
  }
  if (!body.schema?.tables?.length) {
    return NextResponse.json(
      { error: "schema is missing or has no tables. Send back the schema object you received from /api/ingest." },
      { status: 400 },
    );
  }
  if (!body.mapping?.objects?.length) {
    return NextResponse.json(
      { error: "mapping has no objects. Confirm at least one object proposal before persisting." },
      { status: 400 },
    );
  }

  try {
    const result = await persistMapping({
      companyName: body.companyName,
      industry: body.industry,
      schema: body.schema,
      mapping: body.mapping,
      confirmedBy: body.confirmedBy,
    });
    return NextResponse.json({
      status: "success" as const,
      ...result,
      message:
        `Ontology persisted: ${result.types} object types, ${result.objects} sampled objects, ` +
        `${result.relationships} relationships.` +
        (result.rejectedWires.length
          ? ` ${result.rejectedWires.length} wire(s) failed validation and were not saved — see rejectedWires.`
          : ""),
    });
  } catch (err) {
    const message =
      err instanceof Error && err.message
        ? err.message
        : "The mapping could not be persisted for an unknown reason.";
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
