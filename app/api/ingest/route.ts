// Real ingestion endpoint (replaces the split-on-comma placeholder).
// POST a CSV (multipart "file" or raw text/csv) → normalized schema profile,
// computed object proposals with reasoning, and value-overlap-verified wires.
// GET runs the same real pipeline over the bundled sample file.

import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { csvToSchema, parseCsv } from "@/lib/engine/csv";
import { mapSchema } from "@/lib/engine/mapper";
import { llmAvailable, refineMapping } from "@/lib/engine/llm";

const MAX_BYTES = 10 * 1024 * 1024; // 10 MB per upload; bigger belongs in a direct connection

async function runPipeline(fileName: string, text: string) {
  const schema = csvToSchema(fileName, text);
  const mapping = await refineMapping(schema, mapSchema(schema));
  // Full parsed rows ride along for demo surfaces (ticket board) that render
  // the file's records directly. Sampling still governs what reaches any model.
  const grid = parseCsv(text);
  const header = grid[0] ?? [];
  const data = grid.slice(1).map((r) => Object.fromEntries(header.map((h, i) => [h, r[i] ?? ""])));
  return {
    status: "success" as const,
    engine: mapping.engine,
    llmConfigured: llmAvailable(),
    schema,
    objects: mapping.objects,
    wires: mapping.wires,
    data,
  };
}

export async function POST(req: NextRequest) {
  try {
    let fileName = "upload.csv";
    let text: string;
    const contentType = req.headers.get("content-type") ?? "";
    if (contentType.includes("multipart/form-data")) {
      const form = await req.formData();
      const file = form.get("file");
      if (!(file instanceof File)) {
        return NextResponse.json({ error: 'No file received. Attach a CSV as the "file" field and try again.' }, { status: 400 });
      }
      if (file.size > MAX_BYTES) {
        return NextResponse.json({ error: `"${file.name}" is ${(file.size / 1e6).toFixed(1)} MB — uploads cap at 10 MB. For files this size, connect the database directly instead.` }, { status: 413 });
      }
      fileName = file.name;
      text = await file.text();
    } else {
      text = await req.text();
      if (text.length > MAX_BYTES) {
        return NextResponse.json({ error: "Upload exceeds the 10 MB cap. Connect the database directly instead." }, { status: 413 });
      }
    }
    return NextResponse.json(await runPipeline(fileName, text));
  } catch (err) {
    const message = err instanceof Error ? err.message : "The file could not be parsed as CSV.";
    return NextResponse.json({ error: `${message} If the file opens in a spreadsheet, export it as CSV and re-upload.` }, { status: 422 });
  }
}

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), "dummy_operations.csv");
    const text = await fs.readFile(filePath, "utf8");
    return NextResponse.json(await runPipeline("dummy_operations.csv", text));
  } catch {
    return NextResponse.json({ error: "Sample file missing — POST a CSV instead." }, { status: 500 });
  }
}
