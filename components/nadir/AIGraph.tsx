"use client";

// Flow — the AI-centered web. Nadir AI sits at the hub; the systems it reads,
// the objects it built, and the signals it caught orbit around it, all wired
// into one web you can physically rearrange (drag any node, the edges follow —
// like a node editor, not a fixed process chart). The hub shows what the AI is
// doing right now. This is deliberately NOT a left-to-right process diagram:
// the point is that everything connects through the AI.

import { useMemo, useRef, useState } from "react";
import { useNadir } from "./context";

const MONO = "var(--font-ibm-plex-mono), monospace";

type NodeKind = "ai" | "source" | "object" | "signal";
interface WebNode {
  id: string;
  kind: NodeKind;
  label: string;
  sub: string;
}

export default function AIGraph() {
  const { co, objectName, wires, alertsFull, notifications, audit, notify } = useNadir();

  // ----- derive the node set from real company data -----
  const nodes: WebNode[] = useMemo(() => {
    const ns: WebNode[] = [{ id: "ai", kind: "ai", label: "Nadir AI", sub: "reasoning over your operation" }];
    co.sources.forEach((s, i) => ns.push({ id: `src-${i}`, kind: "source", label: s.name, sub: "read-only source" }));
    co.obMappings.forEach((_, i) => ns.push({ id: `obj-${i}`, kind: "object", label: objectName(i), sub: "object" }));
    alertsFull.slice(0, 3).forEach((a, i) => ns.push({ id: `sig-${i}`, kind: "signal", label: a.title, sub: a.statusTag }));
    return ns;
  }, [co, objectName, alertsFull]);

  // ----- edges: everything routes through the AI, plus object↔object wires -----
  const edges = useMemo(() => {
    const es: { a: string; b: string; kind: "ai" | "wire" | "signal" }[] = [];
    nodes.forEach((n) => {
      if (n.kind === "source" || n.kind === "object") es.push({ a: "ai", b: n.id, kind: "ai" });
      if (n.kind === "signal") es.push({ a: "ai", b: n.id, kind: "signal" });
    });
    // object-to-object connections (the ontology web) from confirmed wires
    wires.forEach((w) => {
      const fi = co.obMappings.findIndex((_, i) => objectName(i) === w.from);
      const ti = co.obMappings.findIndex((_, i) => objectName(i) === w.to);
      if (fi >= 0 && ti >= 0 && fi !== ti) es.push({ a: `obj-${fi}`, b: `obj-${ti}`, kind: "wire" });
    });
    return es;
  }, [nodes, wires, co, objectName]);

  // ----- initial positions: AI at center, others on a ring by kind -----
  const initial = useMemo(() => {
    const pos: Record<string, { x: number; y: number }> = { ai: { x: 50, y: 50 } };
    const groups: Record<NodeKind, WebNode[]> = { ai: [], source: [], object: [], signal: [] };
    nodes.forEach((n) => groups[n.kind].push(n));
    // sources arc on the left, objects around the middle ring, signals on the right
    const place = (arr: WebNode[], startDeg: number, endDeg: number, radius: number) => {
      arr.forEach((n, i) => {
        const t = arr.length === 1 ? 0.5 : i / (arr.length - 1);
        const deg = startDeg + (endDeg - startDeg) * t;
        const rad = (deg * Math.PI) / 180;
        pos[n.id] = { x: 50 + Math.cos(rad) * radius, y: 50 + Math.sin(rad) * radius * 0.82 };
      });
    };
    place(groups.source, 140, 220, 38);
    place(groups.object, -70, 70, 30);
    place(groups.signal, 250, 290, 40);
    return pos;
  }, [nodes]);

  const [pos, setPos] = useState<Record<string, { x: number; y: number }>>(initial);
  const [sel, setSel] = useState<string>("ai");
  const canvasRef = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: string; sx: number; sy: number; ox: number; oy: number } | null>(null);

  // keep positions in sync when the node set changes (company switch)
  const posFor = (id: string) => pos[id] ?? initial[id] ?? { x: 50, y: 50 };

  function onPointerDown(e: React.PointerEvent, id: string) {
    e.preventDefault();
    setSel(id);
    const p = posFor(id);
    drag.current = { id, sx: e.clientX, sy: e.clientY, ox: p.x, oy: p.y };
    window.addEventListener("pointermove", onPointerMove);
    window.addEventListener("pointerup", onPointerUp);
  }
  function onPointerMove(e: PointerEvent) {
    const d = drag.current;
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!d || !rect) return;
    const nx = d.ox + ((e.clientX - d.sx) / rect.width) * 100;
    const ny = d.oy + ((e.clientY - d.sy) / rect.height) * 100;
    setPos((prev) => ({ ...prev, [d.id]: { x: Math.max(4, Math.min(96, nx)), y: Math.max(6, Math.min(94, ny)) } }));
  }
  function onPointerUp() {
    drag.current = null;
    window.removeEventListener("pointermove", onPointerMove);
    window.removeEventListener("pointerup", onPointerUp);
  }

  const aiActivity = notifications.slice(0, 6);
  const selNode = nodes.find((n) => n.id === sel);
  const selAlert = sel.startsWith("sig-") ? alertsFull[Number(sel.split("-")[1])] : null;

  const KIND_STYLE: Record<NodeKind, { bg: string; bd: string; fg: string }> = {
    ai: { bg: "#0E7C8A", bd: "#0E7C8A", fg: "#FFFFFF" },
    source: { bg: "#FFFFFF", bd: "rgba(20,24,28,0.2)", fg: "#14181C" },
    object: { bg: "#FFFFFF", bd: "rgba(14,124,138,0.4)", fg: "#14181C" },
    signal: { bg: "#FFFFFF", bd: "rgba(199,69,47,0.4)", fg: "#14181C" },
  };

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
      <div ref={canvasRef} style={{ flex: 1, minWidth: 0, position: "relative", overflow: "hidden", background: "#F6F4EF" }}>
        <div style={{ position: "absolute", top: 16, left: 20, zIndex: 3, pointerEvents: "none" }}>
          <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", color: "#7a848e" }}>FLOW</div>
          <div style={{ fontSize: 16, fontWeight: 700 }}>Everything runs through Nadir</div>
          <div style={{ fontSize: 12, color: "#7a848e", marginTop: 2 }}>Drag any node to rearrange the web. The AI reads your systems, keeps the model, and catches what breaks.</div>
        </div>

        {/* edges */}
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {edges.map((e, i) => {
            const a = posFor(e.a);
            const b = posFor(e.b);
            const mx = (a.x + b.x) / 2 + (b.y - a.y) * 0.08;
            const my = (a.y + b.y) / 2 - (b.x - a.x) * 0.08;
            const stroke = e.kind === "signal" ? "rgba(199,69,47,0.5)" : e.kind === "wire" ? "rgba(14,124,138,0.35)" : "rgba(14,124,138,0.28)";
            return (
              <path
                key={i}
                d={`M ${a.x} ${a.y} Q ${mx} ${my} ${b.x} ${b.y}`}
                fill="none"
                stroke={stroke}
                strokeWidth={e.kind === "ai" ? 1.1 : 0.9}
                strokeDasharray={e.kind === "signal" ? "1.4 1.1" : undefined}
                vectorEffect="non-scaling-stroke"
                style={e.a === "ai" ? { animation: "nadirDash 1.4s linear infinite" } : undefined}
              />
            );
          })}
        </svg>

        {/* nodes */}
        {nodes.map((n) => {
          const p = posFor(n.id);
          const st = KIND_STYLE[n.kind];
          const isAI = n.kind === "ai";
          const selected = sel === n.id;
          return (
            <div
              key={n.id}
              onPointerDown={(e) => onPointerDown(e, n.id)}
              style={{
                position: "absolute", left: `${p.x}%`, top: `${p.y}%`, transform: "translate(-50%, -50%)",
                zIndex: isAI ? 5 : selected ? 4 : 2, cursor: "grab", touchAction: "none",
                display: "flex", flexDirection: "column", alignItems: "center", gap: 4,
              }}
            >
              {isAI ? (
                <div style={{ position: "relative", width: 118, height: 118, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <span style={{ position: "absolute", inset: 0, borderRadius: "50%", border: "2px solid rgba(14,124,138,0.35)", animation: "nadirPulse 2.4s ease-in-out infinite" }} />
                  <span style={{ position: "absolute", inset: 16, borderRadius: "50%", border: "1.5px solid rgba(14,124,138,0.25)" }} />
                  <div style={{ width: 84, height: 84, borderRadius: "50%", background: "#0E7C8A", color: "#fff", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", boxShadow: "0 10px 30px -8px rgba(14,124,138,0.6)", border: selected ? "2.5px solid #14181C" : "2.5px solid #fff" }}>
                    <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#fff", marginBottom: 5, animation: "nadirBlink 1.4s infinite" }} />
                    <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: "0.04em" }}>NADIR</span>
                    <span style={{ fontFamily: MONO, fontSize: 8.5, opacity: 0.85 }}>{notifications.length} events</span>
                  </div>
                </div>
              ) : (
                <div style={{
                  maxWidth: 150, padding: "7px 11px", background: st.bg, color: st.fg, border: `1.5px solid ${selected ? "#0E7C8A" : st.bd}`,
                  borderRadius: n.kind === "source" ? 7 : 100, boxShadow: selected ? "0 8px 22px -8px rgba(14,124,138,0.5)" : "0 3px 12px -4px rgba(20,30,40,0.18)",
                  display: "flex", alignItems: "center", gap: 7, whiteSpace: "nowrap",
                }}>
                  <span style={{ width: 8, height: 8, flex: "none", borderRadius: n.kind === "source" ? 2 : "50%", background: n.kind === "signal" ? (selAlert && sel === n.id ? "#C7452F" : "#C7452F") : n.kind === "object" ? "#0E7C8A" : "#9aa2ab" }} />
                  <span style={{ fontSize: 12, fontWeight: 600, overflow: "hidden", textOverflow: "ellipsis" }}>{n.label}</span>
                </div>
              )}
            </div>
          );
        })}

        <div style={{ position: "absolute", bottom: 14, left: 20, display: "flex", gap: 16, fontFamily: MONO, fontSize: 10.5, color: "#7a848e", pointerEvents: "none" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "#9aa2ab" }} />SYSTEM</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0E7C8A" }} />OBJECT</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#C7452F" }} />SIGNAL</span>
        </div>
      </div>

      {/* right rail: AI activity when the hub is selected, else node detail */}
      <div style={{ width: 320, flex: "none", borderLeft: "1px solid rgba(20,24,28,0.1)", background: "#FCFBF9", padding: "20px 18px", overflowY: "auto" }}>
        {sel === "ai" ? (
          <>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#0E7C8A", animation: "nadirBlink 1.4s infinite" }} />
              <span style={{ fontSize: 15, fontWeight: 700 }}>Nadir AI · live</span>
            </div>
            <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.55, marginBottom: 16 }}>
              You gave Nadir your systems. It sampled them, built the model, and now watches everything — surfacing only what needs a human. This is what it&apos;s done recently:
            </div>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 10 }}>AI ACTIVITY</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 2 }}>
              {aiActivity.map((n, i) => (
                <div key={i} style={{ display: "flex", gap: 9, padding: "9px 2px", borderTop: i ? "1px solid rgba(20,24,28,0.06)" : "none" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", flex: "none", marginTop: 4, background: n.kind === "warn" ? "#C7452F" : n.kind === "ok" ? "#15854F" : "#0E7C8A" }} />
                  <div style={{ fontSize: 12, lineHeight: 1.5, color: "#2a333c", flex: 1 }}>{n.text}</div>
                  <span style={{ fontFamily: MONO, fontSize: 9.5, color: "#9aa2ab", flex: "none" }}>{n.time}</span>
                </div>
              ))}
            </div>
            <button
              onClick={() => { notify("Nadir re-scanned all systems — model is current.", "ok"); audit("Nadir re-scan triggered from Flow — schema fingerprints unchanged, model current."); }}
              style={{ marginTop: 16, width: "100%", fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, padding: "10px 0", borderRadius: 8, border: "none", background: "#0E7C8A", color: "#fff", cursor: "pointer" }}
            >
              Ask Nadir to re-scan now
            </button>
          </>
        ) : (
          <>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 10 }}>
              {selNode?.kind === "signal" ? "SIGNAL" : selNode?.kind === "object" ? "OBJECT" : "SYSTEM"} DETAIL
            </div>
            <div style={{ fontSize: 15.5, fontWeight: 700, marginBottom: 6 }}>{selNode?.label}</div>
            {selAlert ? (
              <>
                <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.55, marginBottom: 8 }}>{selAlert.detail}</div>
                {selAlert.plain && <div style={{ fontSize: 12, color: "#0E7C8A", fontStyle: "italic", lineHeight: 1.5, marginBottom: 10 }}>In plain terms: {selAlert.plain}</div>}
                <div style={{ fontFamily: MONO, fontSize: 10.5, color: "#9aa2ab" }}>{selAlert.statusTag} · {selAlert.time} · {selAlert.loc}</div>
              </>
            ) : selNode?.kind === "object" ? (
              <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.6 }}>
                A real-world object Nadir built from your data and confirmed once. It stays wired to its source and to the other objects it touches — {wires.filter((w) => w.to === selNode.label || w.from === selNode.label).length} connections.
              </div>
            ) : (
              <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.6 }}>
                A read-only system Nadir samples — a few rows per table, never the whole database — to keep the model current at almost no cost.
              </div>
            )}
            <div style={{ marginTop: 16, fontFamily: MONO, fontSize: 10.5, color: "#9aa2ab", lineHeight: 1.5 }}>
              Everything connects back to the AI hub. Drag this node to see the web move.
            </div>
          </>
        )}
      </div>
    </div>
  );
}
