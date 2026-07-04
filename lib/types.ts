export type NodeType = "source" | "object" | "process" | "risk";

export interface Derivation {
  step: string;
  text: string;
}

export interface GraphNode {
  label: string;
  type: NodeType;
  x: number;
  y: number;
  meta: string;
  derivation: Derivation[];
}

export interface Graph {
  nodes: GraphNode[];
  edges: [number, number][];
}

export interface SourceRef {
  name: string;
  meta: string;
  node: number;
}

export interface Kpi {
  label: string;
  val: string;
  color: string;
}

export interface Alert {
  sev: "CRITICAL" | "WARNING";
  color: string;
  at: number;
  time: string;
  title: string;
  detail: string;
  loc: string;
  q: string;
  plain?: string;
}

export interface ChatReply {
  text: string;
  cites: string[];
}

export interface PlanItem {
  t: string;
  d: string;
  tag: string;
}

export interface PlanCol {
  title: string;
  color: string;
  items: PlanItem[];
}

export interface Plan {
  subtitle: string;
  why: string;
  cols: PlanCol[];
}

export interface Finding {
  sev: "HIGH" | "MED" | "PASS";
  rule: string;
  detail: string;
  status: string;
}

export interface AuditEntry {
  time: string;
  text: string;
}

export interface Compliance {
  tiles: Kpi[];
  findings: Finding[];
  audit: AuditEntry[];
}

export interface ThreadMessage {
  from: "nadir" | "them" | "me";
  text: string;
}

export interface Person {
  initials: string;
  name: string;
  dept: string;
  role: string;
  email: string;
  phone: string;
  status: "red" | "amber" | "green";
  issue: string;
  unread: number;
  thread: ThreadMessage[];
  draft: string;
  manager?: string;
  pto?: boolean;
}

export interface ObTable {
  name: string;
  rows: string;
}

export interface ObMapping {
  table: string;
  proposed: string;
  conf: string;
}

export type CompanyId = "utility" | "manufacturing" | "staffing" | "restaurant" | "aerospace" | "solo" | "pulp";

export interface Company {
  id: CompanyId;
  name: string;
  industry: string;
  nowMin: number;
  sources: SourceRef[];
  kpis: Kpi[];
  alerts: Alert[];
  intro: string;
  suggestions: string[];
  replies: ChatReply[];
  action: { title: string; desc: string };
  plan: Plan;
  compliance: Compliance;
  people: Person[];
  graph: Graph;
  obTables: ObTable[];
  obMappings: ObMapping[];
  obDone: string;
}

export interface ChatMessage {
  role: "ai" | "user";
  text: string;
  cites: string[];
}
