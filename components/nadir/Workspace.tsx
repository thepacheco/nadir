"use client";

import { useEffect, useRef, useState } from "react";
import { COMPANIES } from "@/lib/data";
import type { Alert, ChatMessage } from "@/lib/types";
import { GRAPH_TYPE_STYLE, AV_PALETTE, STATUS_COLORS, type ScreenId } from "@/lib/constants";
import { useRouter } from "next/navigation";
import { alertKey, fmtClock, initialToast, sevAnim } from "@/lib/derive";
import { PHASE2 } from "@/lib/phase2";
import { GUIDE_STEPS, WIRES, type Wire } from "@/lib/phase3";
import { NadirContext, type DecoratedAlert, type NadirCtxValue, type NotifItem, type ThreadItemView } from "./context";
import AppShell from "./AppShell";

const MONO = "var(--font-ibm-plex-mono), monospace";

const BOOT_LINES = ["Connecting to live systems", "Mapping schema → objects", "Fusing operational graph", "Live"];

function BootOverlay({ companyName, sourceCount, stage }: { companyName: string; sourceCount: number; stage: number }) {
  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100, background: "#FAF9F7", display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 26,
        opacity: stage >= BOOT_LINES.length ? 0 : 1, transition: "opacity 0.45s ease",
        pointerEvents: stage >= BOOT_LINES.length ? "none" : "auto",
      }}
    >
      <div style={{ width: 52, height: 52, border: "3px solid #14181C", borderRadius: "50%", position: "relative" }}>
        <div style={{ position: "absolute", left: "50%", bottom: 5, transform: "translateX(-50%)", width: 10, height: 10, borderRadius: "50%", background: "#0E7C8A", animation: "nadirBlink 1.2s infinite" }} />
      </div>
      <div style={{ fontWeight: 700, fontSize: 17, letterSpacing: "0.06em" }}>NADIR</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, minHeight: 118 }}>
        {BOOT_LINES.map((line, i) => {
          if (i > stage) return <div key={line} style={{ height: 18 }} />;
          const done = i < stage;
          const label = i === 0 ? `Connecting to ${companyName} — ${sourceCount} systems` : line;
          return (
            <div key={line} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: MONO, fontSize: 12.5, color: done ? "#9aa2ab" : "#0E7C8A", animation: "nadirFadeUp 0.35s ease both" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: done ? "#15854F" : "#0E7C8A", animation: done ? "none" : "nadirBlink 1s infinite" }} />
              {done ? `${label} ✓` : label}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Workspace() {
  const router = useRouter();
  const [bootStage, setBootStage] = useState(0);
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
  const [obStep, setObStep] = useState<1 | 2 | 3 | 4 | 5>(1);
  const [obSrc, setObSrc] = useState(-1);
  const [obConfirmed, setObConfirmed] = useState<Record<number, boolean>>({});
  const [obNames, setObNames] = useState<Record<string, Record<number, string>>>({});
  const [obWires, setObWires] = useState<Record<string, Wire[]>>({});
  const [rewired, setRewired] = useState<Record<string, number>>({});
  const [guideFlags, setGuideFlags] = useState<Record<string, boolean>>({});
  const [selPerson, setSelPerson] = useState(0);
  const [msgSent, setMsgSent] = useState<Record<string, boolean>>({});
  const [clock, setClock] = useState(COMPANIES[0].nowMin);
  const [playing, setPlaying] = useState(false);
  const [toast, setToast] = useState<Alert | null>(null);
  const [toastDismissed, setToastDismissed] = useState<Record<string, boolean>>({});

  // phase 2 runtime state
  const [evidenceIdx, setEvidenceIdx] = useState<number | null>(null);
  const [ingestedData, setIngestedData] = useState<any[]>([]);

  useEffect(() => {
    fetch('/api/ingest')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setIngestedData(data.data);
        }
      })
      .catch(err => console.error("Failed to ingest data:", err));
  }, []);

  const [approvals, setApprovals] = useState<Record<string, "none" | "pending" | "approved">>({});
  const [escalations, setEscalations] = useState<Record<string, boolean>>({});
  const [decisions, setDecisions] = useState<Record<string, "wrong" | "correct">>({});
  const [threadExtras, setThreadExtras] = useState<Record<string, string[]>>({});
  const [notifications, setNotifications] = useState<NotifItem[]>([]);
  const [notifSeen, setNotifSeen] = useState(0);
  const [runtimeAudit, setRuntimeAudit] = useState<Record<string, { time: string; text: string }[]>>({});
  const [selChild, setSelChild] = useState<number | null>(null);
  const [graphExpanded, setGraphExpanded] = useState(true);
  const [notifPrefs, setNotifPrefs] = useState<Record<string, boolean>>({ critical: true, digest: true, approvals: true, quality: true });
  const [activeRole, setActiveRole] = useState<string>("IT Ops");
  const approvalTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  useEffect(() => () => { if (approvalTimer.current) clearTimeout(approvalTimer.current); }, []);

  const co = COMPANIES[cidx];
  const p2 = PHASE2[co.id];

  function notify(text: string, kind: NotifItem["kind"]) {
    setNotifications((prev) => [{ time: fmtClock(clockRef.current), text, kind }, ...prev].slice(0, 30));
  }
  function audit(text: string) {
    setRuntimeAudit((prev) => ({ ...prev, [coRef.current.id]: [{ time: fmtClock(clockRef.current), text }, ...(prev[coRef.current.id] || [])] }));
  }

  const coRef = useRef(co);
  useEffect(() => {
    coRef.current = co;
  }, [co]);
  const toastDismissedRef = useRef(toastDismissed);
  useEffect(() => {
    toastDismissedRef.current = toastDismissed;
  }, [toastDismissed]);
  const clockRef = useRef(clock);
  useEffect(() => {
    clockRef.current = clock;
  }, [clock]);

  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  useEffect(() => () => { if (timerRef.current) clearInterval(timerRef.current); }, []);

  // entry boot sequence, then the initial critical-alert toast
  useEffect(() => {
    const steps = [420, 840, 1260, 1680].map((ms, i) =>
      setTimeout(() => setBootStage(i + 1), ms)
    );
    const done = setTimeout(() => {
      const c = coRef.current;
      setToast(initialToast(c, c.nowMin, toastDismissedRef.current));
    }, 1950);
    return () => { steps.forEach(clearTimeout); clearTimeout(done); };
  }, []);

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
    setEvidenceIdx(null);
    setSelChild(null);
    setToast(crit && !toastDismissed[alertKey(c, crit)] ? crit : null);
  }

  // ---- phase 2: approvals ----
  const approval = approvals[co.id] || "none";
  function onSendSnapshot() {
    if (approval !== "none") return;
    const id = co.id;
    const approver = PHASE2[id].approver;
    setApprovals((prev) => ({ ...prev, [id]: "pending" }));
    notify(`Briefing sent to ${approver.name} for approval`, "info");
    audit(`Briefing "${co.action.title}" sent to ${approver.name} — approval requested.`);
    approvalTimer.current = setTimeout(() => {
      setApprovals((prev) => ({ ...prev, [id]: "approved" }));
      notify(`${approver.name.split(" · ")[0]} approved: "${approver.reply}"`, "ok");
      audit(`Approval recorded — ${approver.name} approved the plan. Actions released for execution.`);
    }, 2600);
  }

  // ---- phase 2: escalation ----
  function escalateAlert(alertIdx: number) {
    const key = `${co.id}|a${alertIdx}`;
    if (escalations[key]) return;
    const owner = co.people[p2.alerts[alertIdx].owner];
    const target = owner.pto && owner.manager ? owner.manager : owner.manager || "leadership";
    setEscalations((prev) => ({ ...prev, [key]: true }));
    notify(`Escalated "${co.alerts[alertIdx].title}" to ${target}${owner.pto ? ` (${owner.name} is on PTO — routed past)` : ""}`, "warn");
    audit(`Escalation — "${co.alerts[alertIdx].title}" routed to ${target} with the evidence pack.`);
  }
  const personEscalatedKey = () => `${co.id}|p${Math.min(selPerson, co.people.length - 1)}`;
  function escalatePerson() {
    const key = personEscalatedKey();
    if (escalations[key]) return;
    const person = co.people[Math.min(selPerson, co.people.length - 1)];
    if (!person.manager) return;
    setEscalations((prev) => ({ ...prev, [key]: true }));
    setThreadExtras((prev) => ({
      ...prev,
      [key]: [...(prev[key] || []), `Escalated to ${person.manager} — full thread and evidence pack attached. They've been notified.`],
    }));
    notify(`Thread with ${person.name} escalated to ${person.manager}`, "warn");
    audit(`Escalation — ${person.name}'s open issue routed up to ${person.manager}.`);
  }

  // ---- phase 2: data questioning ----
  function onDataDecision(alertIdx: number, d: "wrong" | "correct") {
    const key = `${co.id}|a${alertIdx}`;
    if (decisions[key]) return;
    setDecisions((prev) => ({ ...prev, [key]: d }));
    const s = p2.alerts[alertIdx].suspect!;
    notify(d === "wrong" ? "Suspect data confirmed wrong — dispute filed, source trust adjusted" : "Record corrected — Nadir updated its model and stopped flagging", "ok");
    audit(`Data-quality decision on "${co.alerts[alertIdx].title}": ${d === "wrong" ? s.wrongLabel : s.correctLabel}. Company data-quality profile updated.`);
  }

  function resetDemo() {
    if (approvalTimer.current) clearTimeout(approvalTimer.current);
    setApprovals({});
    setEscalations({});
    setDecisions({});
    setThreadExtras({});
    setNotifications([]);
    setNotifSeen(0);
    setRuntimeAudit({});
    setSnapshotSent({});
    setMsgSent({});
    setToastDismissed({});
    notify("Demo state reset — approvals, escalations, and audit entries cleared", "info");
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

  function exitApp() {
    if (timerRef.current) { clearInterval(timerRef.current); timerRef.current = null; }
    setPlaying(false);
    router.push("/");
  }

  function dismissCurrentToast(t: Alert | null) {
    if (!t) return;
    setToastDismissed((prev) => ({ ...prev, [alertKey(co, t)]: true }));
  }

  // ---- decorated alerts (chat sidebar + ops map) ----
  const decorateAlert = (a: Alert, idx = -1): DecoratedAlert => {
    return {
      ...a,
      anim: sevAnim(a.color),
      opacity: 1,
      borderColor: a.color,
      statusTag: a.sev,
      subLabel: a.loc,
      onGoMap: () => setScreen("map"),
      onAsk: () => { setScreen("chat"); send(a.q); },
      onEvidence: () => { setEvidenceIdx(idx >= 0 ? idx : co.alerts.indexOf(a)); setGuideFlags((prev) => ({ ...prev, evidence: true })); },
    };
  };
  const alertsSide = co.alerts
    .map((a, i) => ({ a, i }))
    .filter(({ a }) => a.at <= clock)
    .map(({ a, i }) => decorateAlert(a, i));
  const alertsFull = alertsSide;
  const activeCount = co.alerts.filter((a) => a.at <= clock).length;

  // ---- fusion graph ----
  function selectNode(i: number) {
    if (i === selNode && p2.children[i]?.length) {
      setGraphExpanded((e) => !e); // re-click a "+" node to fold it back up
      setSelChild(null);
      return;
    }
    setSelNode(i);
    setSelChild(null);
    setGraphExpanded(true);
    if (p2.children[i]?.length) setGuideFlags((prev) => ({ ...prev, expand: true }));
  }
  const gnodes = co.graph.nodes.map((n, i) => {
    const tm = GRAPH_TYPE_STYLE[n.type];
    return {
      ...n,
      ...tm,
      anim: `nadirFloat ${5 + (i % 4)}s ease-in-out ${i * 0.4}s infinite`,
      bd: i === selNode ? "#0E7C8A" : tm.bd,
      shadow: i === selNode ? "0 6px 20px -6px rgba(14,124,138,0.5)" : "0 2px 8px -3px rgba(20,30,40,0.2)",
      onClick: () => selectNode(i),
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

  // phase 2: expandable children for the selected node
  const childFan = [
    { dx: 13, dy: -10 },
    { dx: 15, dy: 0 },
    { dx: 13, dy: 10 },
    { dx: 9, dy: 18 },
  ];
  const rawChildren = graphExpanded ? p2.children[selIdx] || [] : [];
  const childNodes = rawChildren.map((c, i) => ({
    ...c,
    x: Math.min(seln.x + childFan[i % childFan.length].dx, 88),
    y: Math.max(4, Math.min(seln.y + childFan[i % childFan.length].dy, 92)),
  }));

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
  for (const extra of threadExtras[`${co.id}|p${spIdx}`] || []) {
    thread = thread.concat([{ from: "nadir", text: extra, who: "Nadir", align: "flex-start", bg: "rgba(180,118,20,0.07)", bd: "rgba(180,118,20,0.35)", fg: "#14181C", radius: "12px 12px 12px 3px" }]);
  }

  // ---- onboarding ----
  const allConfirmed = co.obMappings.every((_, i) => obConfirmed[i]);
  function obNext() {
    if (obStep === 1 && obSrc < 0) return;
    if (obStep === 3 && !allConfirmed) return;
    setObStep((s) => (Math.min(5, s + 1) as 1 | 2 | 3 | 4 | 5));
  }
  function obRestart() {
    setObStep(1);
    setObSrc(-1);
    setObConfirmed({});
    setObNames((prev) => ({ ...prev, [co.id]: {} }));
    setObWires((prev) => ({ ...prev, [co.id]: WIRES[co.id].map((w) => ({ ...w })) }));
    setRewired((prev) => ({ ...prev, [co.id]: 0 }));
  }

  // ---- phase 3: object renaming + relationship wiring ----
  const objectName = (i: number) => obNames[co.id]?.[i] ?? co.obMappings[i]?.proposed ?? "";
  function renameObject(i: number, name: string) {
    const old = objectName(i);
    setObNames((prev) => ({ ...prev, [co.id]: { ...(prev[co.id] || {}), [i]: name } }));
    // carry existing wiring along with the rename
    mutateWires((ws) => ws.map((w) => (w.to === old ? { ...w, to: name } : w)));
  }
  const wires = obWires[co.id] ?? WIRES[co.id];
  function bumpRewired() {
    setRewired((prev) => ({ ...prev, [co.id]: (prev[co.id] || 0) + 1 }));
    setGuideFlags((prev) => ({ ...prev, rewire: true }));
  }
  function mutateWires(fn: (ws: Wire[]) => Wire[]) {
    setObWires((prev) => ({ ...prev, [co.id]: fn(prev[co.id] ?? WIRES[co.id].map((w) => ({ ...w }))) }));
  }
  function retargetWire(i: number, to: string) {
    mutateWires((ws) => ws.map((w, j) => (j === i ? { ...w, to, conf: "manual" } : w)));
    bumpRewired();
    audit(`Ontology edit — connection ${wires[i]?.from} re-pointed to "${to}" by the user.`);
  }
  function relabelWire(i: number, label: string) {
    mutateWires((ws) => ws.map((w, j) => (j === i ? { ...w, label } : w)));
  }
  function addWire(from: string, label: string, to: string) {
    mutateWires((ws) => [...ws, { from, label, to, conf: "manual", custom: true }]);
    bumpRewired();
    notify(`New connection wired: ${from} → ${to}`, "info");
    audit(`Ontology edit — user added connection ${from} —[${label}]→ ${to}.`);
  }

  // ---- phase 3: guide ----
  const guideItems = GUIDE_STEPS.map((g) => {
    let done = !!guideFlags[g.id];
    if (g.id === "ask") done = (chats[co.id] || []).length > 1;
    if (g.id === "approve") done = approval !== "none";
    if (g.id === "escalate") done = Object.keys(escalations).length > 0;
    return { id: g.id, label: g.label, desc: g.desc, done, go: () => setScreen(g.screen) };
  });

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
    onSendSnapshot,
    onOpenSource: (node: number) => { setScreen("graph"); setSelNode(node); },
    onAttach: () => setScreen("sources"),

    alertsFull,
    activeCount,

    gnodes,
    edges,
    selNode,
    setSelNode: selectNode,
    selNodeView,
    childNodes,
    selChild,
    setSelChild,
    parentLabel: seln.label,

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

    objectName,
    renameObject,
    wires,
    retargetWire,
    relabelWire,
    addWire,
    rewiredCount: rewired[co.id] || 0,
    guideItems,

    alertMeta: p2.alerts,
    evidenceIdx,
    openEvidence: (i: number) => { setEvidenceIdx(i); setGuideFlags((prev) => ({ ...prev, evidence: true })); },
    closeEvidence: () => setEvidenceIdx(null),
    dataDecision: evidenceIdx !== null ? decisions[`${co.id}|a${evidenceIdx}`] || null : null,
    onDataDecision,
    alertEscalated: (i: number) => !!escalations[`${co.id}|a${i}`],
    escalateAlert,

    approval,
    approver: p2.approver,

    personEscalated: !!escalations[personEscalatedKey()],
    escalatePerson,

    departments: p2.departments,

    notifications,
    unseenCount: Math.max(0, notifications.length - notifSeen),
    markNotifsSeen: () => setNotifSeen(notifications.length),

    auditMerged: [...(runtimeAudit[co.id] || []), ...co.compliance.audit],
    notifPrefs,
    toggleNotifPref: (k: string) => setNotifPrefs((prev) => ({ ...prev, [k]: !prev[k] })),
    resetDemo,
    ingestedData,

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

    activeRole,
    setActiveRole,
  };

  return (
    <NadirContext.Provider value={ctx}>
      <AppShell />
      <BootOverlay companyName={co.name} sourceCount={co.sources.length} stage={bootStage} />
    </NadirContext.Provider>
  );
}
