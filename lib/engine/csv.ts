// Real CSV parsing (RFC 4180: quoted fields, escaped quotes, embedded
// newlines and commas) — replaces the split-on-comma placeholder.

import { SAMPLE_ROWS, type ColumnProfile, type ColumnType, type NormalizedSchema, type TableProfile } from "./schema";

export function parseCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = "";
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') { field += '"'; i++; }
        else inQuotes = false;
      } else field += c;
    } else if (c === '"') inQuotes = true;
    else if (c === ",") { row.push(field); field = ""; }
    else if (c === "\n" || c === "\r") {
      if (c === "\r" && text[i + 1] === "\n") i++;
      row.push(field); field = "";
      if (row.length > 1 || row[0] !== "") rows.push(row);
      row = [];
    } else field += c;
  }
  if (field !== "" || row.length) { row.push(field); if (row.length > 1 || row[0] !== "") rows.push(row); }
  return rows;
}

const DATE_RE = /^\d{4}-\d{2}-\d{2}([T ].*)?$|^\d{1,2}\/\d{1,2}\/\d{2,4}$/;
const INT_RE = /^-?\d+$/;
const NUM_RE = /^-?\d+(\.\d+)?$/;
const BOOL_SET = new Set(["true", "false", "yes", "no", "y", "n", "0", "1"]);

export function inferType(values: string[]): ColumnType {
  const filled = values.filter((v) => v !== "" && v.toLowerCase() !== "null" && v.toLowerCase() !== "n/a");
  if (!filled.length) return "empty";
  const share = (re: RegExp) => filled.filter((v) => re.test(v.trim())).length / filled.length;
  if (share(DATE_RE) >= 0.8) return "date";
  if (share(INT_RE) >= 0.9) return "integer";
  if (share(NUM_RE) >= 0.9) return "number";
  if (filled.every((v) => BOOL_SET.has(v.trim().toLowerCase())) && new Set(filled.map((v) => v.toLowerCase())).size <= 2) return "boolean";
  return "text";
}

export function profileTable(name: string, header: string[], dataRows: string[][]): TableProfile {
  const scanned = dataRows.slice(0, 500); // profile window; full file never needed
  const columns: ColumnProfile[] = header.map((colName, ci) => {
    const values = scanned.map((r) => (r[ci] ?? "").trim());
    const filled = values.filter((v) => v !== "" && v.toLowerCase() !== "null");
    const distinct = new Set(filled).size;
    let type = inferType(values);
    // Key-shaped name => id. No distinctness gate: FOREIGN keys repeat by nature;
    // primary-key detection happens later via distinctRatio where it matters.
    const looksLikeId = /(^|_)(id|no|number|code|ref|sku|key)$/i.test(colName.trim());
    if (looksLikeId && (type === "integer" || type === "text")) type = "id";
    return {
      name: colName.trim(),
      type,
      nonNullRatio: values.length ? filled.length / values.length : 0,
      distinctRatio: filled.length ? distinct / filled.length : 0,
      samples: filled.slice(0, SAMPLE_ROWS),
    };
  });
  const sampleRows = dataRows.slice(0, SAMPLE_ROWS).map((r) =>
    Object.fromEntries(header.map((h, i) => [h.trim(), (r[i] ?? "").trim()]))
  );
  return { name, rowCount: dataRows.length, columns, sampleRows };
}

export function csvToSchema(fileName: string, text: string): NormalizedSchema {
  const rows = parseCsv(text);
  if (rows.length < 1) throw new Error(`"${fileName}" is empty — there is no header row to read. Check the file and re-upload.`);
  const [header, ...data] = rows;
  const tableName = fileName.replace(/\.[^.]+$/, "");
  return { source: fileName, kind: "csv", tables: [profileTable(tableName, header, data)], scannedAt: new Date().toISOString() };
}
