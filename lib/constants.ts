import type { NodeType } from "./types";

export const RETICLE_CURSOR =
  "url('data:image/svg+xml;utf8,<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"26\" height=\"26\" viewBox=\"0 0 26 26\"><path d=\"M5 2l16 9.5-7.2 1.4L18.5 22l-3.4 1.6-4.6-8.7L5 20z\" fill=\"%23FAF9F7\" stroke=\"%230E7C8A\" stroke-width=\"1.8\" stroke-linejoin=\"round\"/></svg>') 5 2, default";

export const SCREENS = [
  { id: "chat", label: "Ask Nadir" },
  { id: "map", label: "Ops map" },
  { id: "graph", label: "Fusion graph" },
  { id: "team", label: "Team & inbox" },
  { id: "depts", label: "Departments" },
  { id: "plan", label: "Guidance plan" },
  { id: "comp", label: "Compliance" },
  { id: "sources", label: "Data sources" },
  { id: "settings", label: "Settings" },
] as const;

export type ScreenId = (typeof SCREENS)[number]["id"];

export const TAG_COLORS: Record<string, string> = {
  "PREVENTS OUTAGE": "#C7452F", "STOPS BLEEDING": "#C7452F", "UNBLOCKS REVENUE": "#C7452F", "HARD DEADLINE": "#C7452F",
  "FOOD SAFETY": "#C7452F", "LAUNCH CRITICAL": "#C7452F", QUALITY: "#B47614",
  "NO-COST FIX": "#15854F", CASH: "#15854F", "5-MIN FIX": "#15854F",
  COMPLIANCE: "#B47614", "SHIP FRIDAY": "#B47614", "REMOVES FRICTION": "#B47614", CONTINGENCY: "#B47614", "PREVENT REPEAT": "#B47614",
  GROWTH: "#0E7C8A", SYSTEMIZE: "#0E7C8A", COMPOUND: "#0E7C8A", "DE-RISK": "#0E7C8A", "SCALE PREP": "#0E7C8A", "FUNDING PATH": "#0E7C8A",
};

export const GRAPH_TYPE_STYLE: Record<NodeType, { dotColor: string; dotShape: string; shape: string; bg: string; bd: string; typeLabel: string }> = {
  source: { dotColor: "#9aa2ab", dotShape: "2px", shape: "8px", bg: "#FFFFFF", bd: "rgba(20,24,28,0.2)", typeLabel: "SOURCE SYSTEM" },
  object: { dotColor: "#0E7C8A", dotShape: "50%", shape: "100px", bg: "#FFFFFF", bd: "rgba(14,124,138,0.35)", typeLabel: "BUSINESS OBJECT" },
  process: { dotColor: "#15854F", dotShape: "50%", shape: "100px", bg: "#FFFFFF", bd: "rgba(21,133,79,0.35)", typeLabel: "PROCESS" },
  risk: { dotColor: "#B47614", dotShape: "50%", shape: "100px", bg: "#FBF4E6", bd: "rgba(180,118,20,0.5)", typeLabel: "LIVE RISK" },
};

export const AV_PALETTE: [string, string][] = [
  ["rgba(14,124,138,0.14)", "#0E7C8A"],
  ["rgba(180,118,20,0.16)", "#8a5a10"],
  ["rgba(21,133,79,0.14)", "#0f6b3f"],
  ["rgba(199,69,47,0.13)", "#a5391f"],
];

export const STATUS_COLORS: Record<string, string> = { red: "#C7452F", amber: "#B47614", green: "#15854F" };

export const SEV_STYLES: Record<string, [string, string]> = {
  HIGH: ["#C7452F", "rgba(199,69,47,0.1)"],
  MED: ["#B47614", "rgba(180,118,20,0.1)"],
  PASS: ["#15854F", "rgba(21,133,79,0.1)"],
};

export const OB_LABELS = ["Choose source", "Scan schema", "Confirm objects", "Wire connections", "Live"];

export const SRC_TYPES = [
  { name: "PostgreSQL", kind: "direct · read-only", dot: "#0E7C8A", shape: "2px" },
  { name: "SQL Server", kind: "direct · read-only", dot: "#0E7C8A", shape: "2px" },
  { name: "Oracle / EBS", kind: "direct · read-only", dot: "#0E7C8A", shape: "2px" },
  { name: "MySQL", kind: "direct · read-only", dot: "#0E7C8A", shape: "2px" },
  { name: "CSV / Excel", kind: "drop files here", dot: "#15854F", shape: "50%" },
  { name: "SaaS APIs", kind: "ADP · SAP · QuickBooks…", dot: "#15854F", shape: "50%" },
];
