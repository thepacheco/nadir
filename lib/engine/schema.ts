// Normalized schema representation — the common shape every source
// (CSV upload, XLSX, direct SQL) reduces to before mapping.
// Sampling rule: never more than SAMPLE_ROWS rows per table leave the source.

export const SAMPLE_ROWS = 5;

export type ColumnType = "integer" | "number" | "date" | "boolean" | "text" | "id" | "empty";

export interface ColumnProfile {
  name: string;
  type: ColumnType;
  nonNullRatio: number; // 0..1 across the scanned rows
  distinctRatio: number; // distinct/scanned — 1.0 suggests a key
  samples: string[]; // up to SAMPLE_ROWS raw values
}

export interface TableProfile {
  name: string;
  rowCount: number;
  columns: ColumnProfile[];
  sampleRows: Record<string, string>[]; // up to SAMPLE_ROWS full rows
}

export interface NormalizedSchema {
  source: string; // filename or connection label
  kind: "csv" | "xlsx" | "postgres" | "mysql";
  tables: TableProfile[];
  scannedAt: string;
}
