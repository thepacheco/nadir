"use client";

import { createContext, useContext } from "react";
import type { Alert, ChatMessage, Company, GraphNode, Person, ThreadMessage } from "@/lib/types";
import type { ScreenId } from "@/lib/constants";

export interface DecoratedAlert extends Alert {
  anim: string;
  opacity: number;
  borderColor: string;
  statusTag: string;
  subLabel: string;
  onGoMap: () => void;
  onAsk: () => void;
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
  obStep: 1 | 2 | 3 | 4;
  obSrc: number;
  setObSrc: (i: number) => void;
  obNext: () => void;
  obConfirmed: Record<number, boolean>;
  onConfirmMapping: (i: number) => void;
  onConfirmAll: () => void;
  allConfirmed: boolean;
  obRestart: () => void;
  goMap: () => void;

  // toast
  toast: DecoratedAlert | null;
  dismissToast: () => void;
  toastToMap: () => void;
  toastToChat: () => void;
}

export const NadirContext = createContext<NadirCtxValue | null>(null);

export function useNadir(): NadirCtxValue {
  const ctx = useContext(NadirContext);
  if (!ctx) throw new Error("useNadir must be used within NadirApp");
  return ctx;
}
