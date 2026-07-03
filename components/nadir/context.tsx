"use client";

import { createContext, useContext } from "react";
import type { Alert, AuditEntry, ChatMessage, Company, GraphNode, Person, ThreadMessage } from "@/lib/types";
import type { ScreenId } from "@/lib/constants";
import type { AlertMeta, Approver, Department, GraphChild } from "@/lib/phase2";
import type { Wire } from "@/lib/phase3";

export interface NotifItem {
  time: string;
  text: string;
  kind: "ok" | "warn" | "info";
}

export interface ChildNodeView extends GraphChild {
  x: number;
  y: number;
}

export interface DecoratedAlert extends Alert {
  anim: string;
  opacity: number;
  borderColor: string;
  statusTag: string;
  subLabel: string;
  onGoMap: () => void;
  onAsk: () => void;
  onEvidence: () => void;
}

export interface DecoratedGraphNode extends GraphNode {
  dotColor: string;
  dotShape: string;
  shape: string;
  bg: string;
  bd: string;
  typeLabel: string;
  anim: string;
  shadow: string;
  onClick: () => void;
}

export interface GraphEdgeView {
  x1: number;
  y1: number;
  x2: number;
  y2: number;
  stroke: string;
  dash?: string;
  animated: boolean;
}

export interface DecoratedPerson extends Person {
  avBg: string;
  avFg: string;
  statusColor: string;
  active: boolean;
  onSelect: () => void;
}

export interface ThreadItemView extends ThreadMessage {
  who: string;
  align: "flex-start" | "flex-end";
  bg: string;
  bd: string;
  fg: string;
  radius: string;
}

export interface NadirCtxValue {
  companies: Company[];
  cidx: number;
  co: Company;
  selectCompany: (i: number) => void;

  screen: ScreenId;
  setScreen: (s: ScreenId) => void;
  unreadTotal: number;

  clock: number;
  clockLabel: string;
  onScrub: (min: number) => void;
  playing: boolean;
  togglePlay: () => void;

  exitApp: () => void;

  // chat
  messages: ChatMessage[];
  typing: boolean;
  draft: string;
  setDraft: (v: string) => void;
  onSend: (text?: string) => void;
  chatScrollRef: React.RefObject<HTMLDivElement | null>;
  alertsSide: DecoratedAlert[];
  actionTitle: string;
  actionDesc: string;
  snapshotSent: boolean;
  onSendSnapshot: () => void;
  onOpenSource: (node: number) => void;
  onAttach: () => void;

  // ops map
  alertsFull: DecoratedAlert[];
  activeCount: number;

  // fusion graph
  gnodes: DecoratedGraphNode[];
  edges: GraphEdgeView[];
  selNode: number;
  setSelNode: (i: number) => void;
  selNodeView: DecoratedGraphNode;

  // team
  people: DecoratedPerson[];
  selPersonView: DecoratedPerson;
  thread: ThreadItemView[];
  msgSent: boolean;
  onSendMsg: () => void;

  // onboarding
  obStep: 1 | 2 | 3 | 4 | 5;
  obSrc: number;
  setObSrc: (i: number) => void;
  obNext: () => void;
  obConfirmed: Record<number, boolean>;
  onConfirmMapping: (i: number) => void;
  onConfirmAll: () => void;
  allConfirmed: boolean;
  obRestart: () => void;
  goMap: () => void;

  // phase 3 — object renaming + wiring
  objectName: (i: number) => string;
  renameObject: (i: number, name: string) => void;
  wires: Wire[];
  retargetWire: (i: number, to: string) => void;
  relabelWire: (i: number, label: string) => void;
  addWire: (from: string, label: string, to: string) => void;
  rewiredCount: number;

  // phase 3 — guide
  guideItems: { id: string; label: string; desc: string; done: boolean; go: () => void }[];

  // toast
  toast: DecoratedAlert | null;
  dismissToast: () => void;
  toastToMap: () => void;
  toastToChat: () => void;

  // phase 2 — evidence drill-down
  alertMeta: AlertMeta[];
  evidenceIdx: number | null;
  openEvidence: (i: number) => void;
  closeEvidence: () => void;
  dataDecision: "wrong" | "correct" | null;
  onDataDecision: (alertIdx: number, d: "wrong" | "correct") => void;
  alertEscalated: (alertIdx: number) => boolean;
  escalateAlert: (alertIdx: number) => void;

  // phase 2 — approvals
  approval: "none" | "pending" | "approved";
  approver: Approver;

  // phase 2 — team escalation
  personEscalated: boolean;
  escalatePerson: () => void;

  // phase 2 — graph children
  childNodes: ChildNodeView[];
  selChild: number | null;
  setSelChild: (i: number | null) => void;
  parentLabel: string;

  // phase 2 — departments
  departments: Department[];

  // phase 2 — notifications
  notifications: NotifItem[];
  unseenCount: number;
  markNotifsSeen: () => void;

  // phase 2 — audit + settings
  auditMerged: AuditEntry[];
  notifPrefs: Record<string, boolean>;
  toggleNotifPref: (k: string) => void;
  resetDemo: () => void;
  ingestedData: any[];
}

export const NadirContext = createContext<NadirCtxValue | null>(null);

export function useNadir(): NadirCtxValue {
  const ctx = useContext(NadirContext);
  if (!ctx) throw new Error("useNadir must be used within NadirApp");
  return ctx;
}
