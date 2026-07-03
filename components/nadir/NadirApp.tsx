"use client";

import { useEffect, useRef, useState } from "react";
import { COMPANIES } from "@/lib/data";
import type { Alert, ChatMessage } from "@/lib/types";
import { GRAPH_TYPE_STYLE, AV_PALETTE, STATUS_COLORS, type ScreenId } from "@/lib/constants";
import { alertKey, fmtClock, initialToast, sevAnim } from "@/lib/derive";
import { NadirContext, type DecoratedAlert, type NadirCtxValue, type ThreadItemView } from "./context";
import LandingPage from "./LandingPage";
import AppShell from "./AppShell";

export default function NadirApp() {
  const [view, setView] = useState<"landing" | "app">("landing");
  const [screen, setScreen] = useState<ScreenId>("chat");
  const [cidx, setCidx] = useState(0);
  const [chats, setChats] = useState<Record<string, ChatMessage[]>>(() =>
    Object.fromEntries(COMPANIES.map((c) => [c.id, [{ role: "ai" as const, text: c.intro, cites: [] }]]))
  );
  const [draft, setDraft] = useState("");
  const [typing, setTyping] = useState(false);
  const [, setReplyIdx] = useState<Record<string, number>>({});
  const [snapshotSent, setSnapshotSent] = useState<Record<string, boolean>>({});
  const [selNode, setSelNode] = useState(COMPANIES[0].graph.nodes.length - 1);
  const [obStep, setObStep] = useState<1 | 2 | 3 | 4>(1);
  const [obSrc, setObSrc] = useState(-1);
  const [obConfirmed, setObConfirmed] = useState<Record<number, boolean>>({});
  const [selPerson, setSelPerson] = useState(0);
  const [msgSent, setMsgSent] = useState<Record<string, boolean>>({});
  const [clock, setClock] = useState(COMPANIES[0].nowMin);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState<Alert | null>(null);
  const [toastDismissed, setToastDismissed] = useState<Record<string, boolean>>({});

  const co = COMPANIES[cidx];

  const coRef = useRef(co);
  useEffect(() => {
    coRef.current = co;
  }, [co]);
  const toastDismissedRef = useRef(toastDismissed);
  useEffect(() => {
    toastDismissedRef.current = toastDismissed;
  }, [toastDismissed]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  const chatScrollRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    const el = chatScrollRef.current;
    if (!el) return;
    const id = requestAnimationFrame(() => { el.scrollTop = el.scrollHeight; });
    return () => cancelAnimationFrame(id);
  }, [chats, co.id, typing]);

  function applyClockChange(prevClock: number, newMin: number) {
    const company = coRef.current;
    if (newMin > prevClock) {
      const crossed = company.alerts.filter((a) => a.color === "#C7452F" && a.at > prevClock && a.at <= newMin)[0];
      if (crossed && !toastDismissedRef.current[alertKey(company, crossed)]) setToast(crossed);
    }
  }

  function onScrub(newMin: number) {
    applyClockChange(clock, newMin);
    setClock(newMin);
  }

  function togglePlay() {
    if (playing) {
      if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
      setPlaying(false);
      return;
    }
    setPlaying(true);
    timerRef.current = setInterval(() => {
      setClock((prev) => {
        const nm = prev + 5;
        if (nm > 1435) return 0;
        applyClockChange(prev, nm);
        return nm;
      });
    }, 120);
  }

  function selectCompany(i: number) {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    const c = COMPANIES[i];
    const crit = c.alerts.filter((a) => a.color === "#C7452F")[0] || c.alerts[0];
    setCidx(i);
    setSelNode(c.graph.nodes.length - 1);
    setObStep(1);
    setObSrc(-1);
    setObConfirmed({});
    setSelPerson(0);
    setClock(c.nowMin);
    setPlaying(false);
    setToast(crit && !toastDismissed[alertKey(c, crit)] ? crit : null);
  }

  function send(text?: string) {
    const t = (text ?? draft).trim();
    if (!t || typing) return;
    const id = co.id;
    setChats((prev) => ({ ...prev, [id]: [...prev[id], { role: "user", text: t, cites: [] }] }));
    setDraft("");
    setTyping(true);
    setTimeout(() => {
      setReplyIdx((prevRI) => {
        const ridx = prevRI[id] || 0;
        const company = COMPANIES.find((c) => c.id === id)!;
        const sidx = company.suggestions.indexOf(t);
        const reply = company.replies[sidx >= 0 ? sidx : ridx % company.replies.length];
        setChats((prevChats) => ({ ...prevChats, [id]: [...prevChats[id], { role: "ai", text: reply.text, cites: reply.cites }] }));
        setTyping(false);
        return { ...prevRI, [id]: (sidx >= 0 ? sidx : ridx) + 1 };
      });
    }, 1400);
  }

  function enterApp() {
    setView("app");
    window.scrollTo(0, 0);
    setToast(initialToast(co, clock, toastDismissed));
  }
  function exitApp() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setView("landing");
    setPlaying(false);
  }

  function dismissCurrentToast(t: Alert | null) {
    if (!t) return;
    setToastDismissed((prev) => ({ ...prev, [alertKey(co, t)]: true }));
  }

  // ---- decorated alerts (chat sidebar + ops map) ----
  const decorateAlert = (a: Alert): DecoratedAlert => {
    const active = a.at <= clock;
    return {
      ...a,
      anim: active ? sevAnim(a.color) : "none",
      opacity: active ? 1 : 0.4,
      borderColor: active ? a.color : "rgba(20,24,28,0.15)",
      statusTag: active ? a.sev : "SCHEDULED",
      subLabel: active ? a.loc : "opens " + fmtClock(a.at),
      onGoMap: () => setScreen("map"),
      onAsk: () => { setScreen("chat"); send(a.q); },
    };
  };
  const alertsSide = co.alerts.map(decorateAlert);
  const alertsFull = alertsSide;
  const activeCount = co.alerts.filter((a) => a.at <= clock).length;

  // ---- fusion graph ----
  const gnodes = co.graph.nodes.map((n, i) => {
    const tm = GRAPH_TYPE_STYLE[n.type];
    return {
      ...n,
      ...tm,
      anim: `nadirFloat ${5 + (i % 4)}s ease-in-out ${i * 0.4}s infinite`,
      bd: i === selNode ? "#0E7C8A" : tm.bd,
      shadow: i === selNode ? "0 6px 20px -6px rgba(14,124,138,0.5)" : "0 2px 8px -3px rgba(20,30,40,0.2)",
      onClick: () => setSelNode(i),
    };
  });
  const edges = co.graph.edges.map(([ai, bi]) => {
    const a = co.graph.nodes[ai], b = co.graph.nodes[bi];
    const risky = a.type === "risk" || b.type === "risk";
    return {
      x1: a.x, y1: a.y * 0.62, x2: b.x, y2: b.y * 0.62,
      stroke: risky ? "rgba(180,118,20,0.55)" : "rgba(20,24,28,0.18)",
      dash: risky ? "0.8 0.5" : undefined,
      animated: risky,
    };
  });
  const selIdx = Math.min(selNode, co.graph.nodes.length - 1);
  const seln = co.graph.nodes[selIdx];
  const selNodeView = { ...seln, ...GRAPH_TYPE_STYLE[seln.type], anim: "none", shadow: "none", onClick: () => {} };

  // ---- team ----
  const unreadTotal = co.people.reduce((n, p) => n + (p.unread || 0), 0);
  const people = co.people.map((p, i) => {
    const active = i === selPerson;
    const [avBg, avFg] = AV_PALETTE[i % AV_PALETTE.length];
    return { ...p, avBg, avFg, statusColor: STATUS_COLORS[p.status], active, onSelect: () => setSelPerson(i) };
  });
  const spIdx = Math.min(selPerson, co.people.length - 1);
  const sp = co.people[spIdx];
  const [spAvBg, spAvFg] = AV_PALETTE[spIdx % AV_PALETTE.length];
  const selPersonView = { ...sp, avBg: spAvBg, avFg: spAvFg, statusColor: STATUS_COLORS[sp.status], active: true, onSelect: () => {} };
  const msgSentFlag = !!msgSent[`${co.id}|${spIdx}`];
  let thread: ThreadItemView[] = (sp.thread || []).map((m) => {
    const isNadir = m.from === "nadir";
    const mine = m.from === "me";
    return {
      ...m,
      who: isNadir ? "Nadir" : mine ? "You" : sp.name,
      align: mine ? "flex-end" : "flex-start",
      bg: isNadir ? "rgba(14,124,138,0.06)" : mine ? "#0E7C8A" : "#FFFFFF",
      bd: isNadir ? "rgba(14,124,138,0.25)" : mine ? "#0E7C8A" : "rgba(20,24,28,0.1)",
      fg: mine ? "#FFFFFF" : "#14181C",
      radius: mine ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
    };
  });
  if (msgSentFlag) {
    thread = thread.concat([{ from: "me", text: sp.draft, who: "You", align: "flex-end", bg: "#0E7C8A", bd: "#0E7C8A", fg: "#FFFFFF", radius: "12px 12px 3px 12px" }]);
  }

  // ---- onboarding ----
  const allConfirmed = co.obMappings.every((_, i) => obConfirmed[i]);
  function obNext() {
    if (obStep === 1 && obSrc < 0) return;
    if (obStep === 3 && !allConfirmed) return;
    setObStep((s) => (Math.min(4, s + 1) as 1 | 2 | 3 | 4));
  }
  function obRestart() {
    setObStep(1);
    setObSrc(-1);
    setObConfirmed({});
  }

  // ---- toast view ----
  const toastView: DecoratedAlert | null = toast
    ? { ...decorateAlert(toast) }
    : null;

  const ctx: NadirCtxValue = {
    companies: COMPANIES,
    cidx,
    co,
    selectCompany,

    screen,
    setScreen,
    unreadTotal,

    clock,
    clockLabel: fmtClock(clock),
    onScrub,
    playing,
    togglePlay,

    exitApp,

    messages: chats[co.id] || [],
    typing,
    draft,
    setDraft,
    onSend: send,
    chatScrollRef,
    alertsSide,
    actionTitle: co.action.title,
    actionDesc: co.action.desc,
    snapshotSent: !!snapshotSent[co.id],
    onSendSnapshot: () => setSnapshotSent((prev) => ({ ...prev, [co.id]: true })),
    onOpenSource: (node: number) => { setScreen("graph"); setSelNode(node); },
    onAttach: () => setScreen("sources"),

    alertsFull,
    activeCount,

    gnodes,
    edges,
    selNode,
    setSelNode,
    selNodeView,

    people,
    selPersonView,
    thread,
    msgSent: msgSentFlag,
    onSendMsg: () => setMsgSent((prev) => ({ ...prev, [`${co.id}|${spIdx}`]: true })),

    obStep,
    obSrc,
    setObSrc,
    obNext,
    obConfirmed,
    onConfirmMapping: (i: number) => setObConfirmed((prev) => ({ ...prev, [i]: true })),
    onConfirmAll: () => setObConfirmed(Object.fromEntries(co.obMappings.map((_, i) => [i, true]))),
    allConfirmed,
    obRestart,
    goMap: () => setScreen("map"),

    toast: toastView,
    dismissToast: () => { dismissCurrentToast(toast); setToast(null); },
    toastToMap: () => { dismissCurrentToast(toast); setScreen("map"); setToast(null); },
    toastToChat: () => {
      const q = toast?.q;
      dismissCurrentToast(toast);
      setScreen("chat");
      setToast(null);
      if (q) send(q);
    },
  };

  if (view === "landing") return <LandingPage onEnterApp={enterApp} />;
  return (
    <NadirContext.Provider value={ctx}>
      <AppShell />
    </NadirContext.Provider>
  );
}
