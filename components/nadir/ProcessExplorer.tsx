"use client";

// Process Explorer — the process-state lens (ARCHITECTURE.md §9.1).
// Every number on screen is computed by lib/flow.ts from an event log:
// counts, dwell times, transition percentages, the bottleneck, and the
// plain-English findings. The event log itself is [DEMO-ONLY] seeded data;
// the mathematics is the real product and survives the swap to real events.

import { useMemo, useState } from "react";
import { computeFlow, DEFAULT_EXPECTED_PATH, generateEventLog, type Transition } from "@/lib/flow";
import { useNadir } from "./context";

const MONO = "var(--font-ibm-plex-mono), monospace";

const NODE_W = 15; // % of viewBox width
const NODE_H = 8.4; // % of viewBox height (viewBox 0 0 100 62)

function fmtH(h: number): string {
  if (h <= 0) return "—";
  if (h < 48) return `${h.toFixed(1)} h`;
  return `${(h / 24).toFixed(1)} d`;
}

export default function ProcessExplorer() {
  const { co, audit, notify } = useNadir();
  const [expectedByCo, setExpectedByCo] = useState<Record<string, string[]>>({});
  const [rankBy, setRankBy] = useState<"count" | "duration">("count");
  const [extraShown, setExtraShown] = useState(2);
  const [selState, setSelState] = useState<string | null>(null);
  const [editingPath, setEditingPath] = useState<string[] | null>(null);
  const [actioned, setActioned] = useState<Record<string, string>>({});

  const expectedPath = expectedByCo[co.id] ?? DEFAULT_EXPECTED_PATH;

  const flow = useMemo(() => computeFlow(generateEventLog(co.id), expectedPath), [co.id, expectedPath]);

  const expectedEdges = flow.transitions.filter((t) => t.expected);
  const extraEdges = useMemo(() => {
    const xs = flow.transitions.filter((t) => !t.expected);
    return rankBy === "count" ? xs.sort((a, b) => b.count - a.count) : [...xs].sort((a, b) => b.avgHours - a.avgHours);
  }, [flow, rankBy]);
  const visibleExtra = extraEdges.slice(0, extraShown);
  const visibleEdges: Transition[] = [...expectedEdges, ...visibleExtra];

  // ---- layout: expected path steps down left→right; off-path states on the right ----
  const pos = useMemo(() => {
    const p: Record<string, { x: number; y: number }> = {};
    const onPath = expectedPath.filter((s) => flow.states.some((st) => st.id === s));
    // First expected step clears the control card (which occupies the left
    // ~22% of the canvas) so it's never occluded; the path then steps down
    // toward the right terminals.
    const startX = 25;
    const endX = 66;
    onPath.forEach((s, i) => {
      p[s] = { x: startX + i * ((endX - startX) / Math.max(1, onPath.length - 1)), y: 4 + i * (48 / Math.max(1, onPath.length - 1)) };
    });
    const off = flow.states.filter((s) => !expectedPath.includes(s.id)).map((s) => s.id);
    off.forEach((s, i) => {
      p[s] = { x: 83, y: 4 + i * 24 };
    });
    return p;
  }, [expectedPath, flow]);

  const visibleStates = flow.states.filter(
    (s) => s.onExpectedPath || visibleEdges.some((t) => t.from === s.id || t.to === s.id),
  );

  const headerColor = (s: (typeof flow.states)[number]) =>
    s.isBottleneck ? "#C7452F" : s.terminal ? "#7a848e" : s.onExpectedPath ? "#15854F" : "#B47614";

  const inState = selState ? flow.objects.filter((o) => o.current === selState).sort((a, b) => b.hoursInState - a.hoursInState) : [];

  function takeAction(objId: string, action: string) {
    setActioned((prev) => ({ ...prev, [objId]: action }));
    audit(`Process Explorer — "${action}" issued on ${objId} (state: ${selState}).`);
    notify(`${action}: ${objId} — routed to the owning department`, "ok");
  }

  function savePath() {
    if (!editingPath || editingPath.length < 2) return;
    setExpectedByCo((prev) => ({ ...prev, [co.id]: editingPath }));
    setEditingPath(null);
    setExtraShown(2);
    audit(`Expected path changed to: ${editingPath.join(" → ")}. Deviations recomputed.`);
    notify("Expected path updated — deviations recomputed", "info");
  }

  return (
    <div style={{ flex: 1, minHeight: 0, display: "flex", flexDirection: "column", background: "#F6F4EF", position: "relative", overflow: "hidden" }}>
      {/* header */}
      <div style={{ padding: "16px 24px 10px", display: "flex", alignItems: "flex-start", justifyContent: "space-between", flex: "none" }}>
        <div>
          <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 3 }}>DISCOVER</div>
          <div style={{ fontSize: 17, fontWeight: 700 }}>
            Process Explorer <span style={{ fontWeight: 400, color: "#9aa2ab", fontSize: 13 }}>· {flow.totalObjects} objects · computed from the event log</span>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 10.5, color: "#B47614", marginTop: 3 }}>[DEMO-ONLY] event data · every number on screen is computed, none are typed in</div>
        </div>
        <button
          onClick={() => setEditingPath([...expectedPath])}
          style={{ fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, padding: "9px 16px", background: "#FFFFFF", color: "#14181C", border: "1px solid rgba(20,24,28,0.16)", borderRadius: 8, cursor: "pointer", boxShadow: "0 2px 8px rgba(0,0,0,0.05)" }}
        >
          ⑃ Change Expected Path
        </button>
      </div>

      {/* computed findings strip */}
      <div style={{ padding: "0 24px 10px", display: "flex", gap: 8, flexWrap: "wrap", flex: "none" }}>
        {flow.deviationSentences.slice(0, 3).map((s, i) => (
          <div key={i} style={{ fontSize: 11.5, lineHeight: 1.45, color: i === 0 ? "#C7452F" : "#5a646e", background: "#FFFFFF", border: `1px solid ${i === 0 ? "rgba(199,69,47,0.35)" : "rgba(20,24,28,0.1)"}`, borderRadius: 8, padding: "6px 10px", maxWidth: 380 }}>
            {s}
          </div>
        ))}
      </div>

      {/* canvas */}
      <div style={{ flex: 1, minHeight: 0, position: "relative" }}>
        {/* control card */}
        <div style={{ position: "absolute", top: 10, left: 24, zIndex: 4, width: 250, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.12)", borderRadius: 10, padding: 16, boxShadow: "0 8px 24px -8px rgba(20,30,40,0.18)" }}>
          <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>Show Additional Transitions</div>
          <div style={{ fontSize: 12, color: "#7a848e", marginBottom: 8 }}>based on highest:</div>
          <select
            value={rankBy}
            onChange={(e) => setRankBy(e.target.value as "count" | "duration")}
            style={{ width: "100%", fontFamily: "inherit", fontSize: 12.5, padding: "7px 10px", borderRadius: 6, border: "1px solid rgba(20,24,28,0.18)", background: "#FCFBF9", marginBottom: 14, cursor: "pointer" }}
          >
            <option value="count">Number of Transitions</option>
            <option value="duration">Average Duration</option>
          </select>
          <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11.5, color: "#5a646e", marginBottom: 6 }}>
            <span>Expected Transitions</span>
            <span>→ Full Graph</span>
          </div>
          <input
            type="range"
            min={0}
            max={extraEdges.length}
            value={extraShown}
            onChange={(e) => setExtraShown(Number(e.target.value))}
            style={{ width: "100%", accentColor: "#0E7C8A" }}
          />
          <div style={{ fontFamily: MONO, fontSize: 10.5, color: "#7a848e", marginTop: 4 }}>
            {extraShown === 0 ? "expected path only" : `+${extraShown} of ${extraEdges.length} off-path transitions`}
          </div>
        </div>

        {/* edges */}
        <svg viewBox="0 0 100 62" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          <defs>
            <marker id="peArrow" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="#7a848e" />
            </marker>
            <marker id="peArrowT" viewBox="0 0 6 6" refX="5" refY="3" markerWidth="5" markerHeight="5" orient="auto">
              <path d="M0 0 L6 3 L0 6 z" fill="#0E7C8A" />
            </marker>
          </defs>
          {visibleEdges.map((t) => {
            const a = pos[t.from];
            const b = pos[t.to];
            if (!a || !b) return null;
            const x1 = a.x + NODE_W, y1 = a.y + NODE_H / 2;
            const x2 = b.x, y2 = b.y + NODE_H / 2;
            const mx = (x1 + x2) / 2;
            return (
              <g key={`${t.from}->${t.to}`}>
                <path
                  d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
                  fill="none"
                  stroke={t.expected ? "#0E7C8A" : "rgba(122,132,142,0.75)"}
                  strokeWidth={t.expected ? 0.32 : 0.2}
                  strokeDasharray={t.expected ? undefined : "0.9 0.7"}
                  markerEnd={t.expected ? "url(#peArrowT)" : "url(#peArrow)"}
                  vectorEffect="non-scaling-stroke"
                />
              </g>
            );
          })}
        </svg>
        {/* edge % labels (HTML so text isn't stretched by preserveAspectRatio=none) */}
        {visibleEdges.map((t) => {
          const a = pos[t.from];
          const b = pos[t.to];
          if (!a || !b) return null;
          const lx = (a.x + NODE_W + b.x) / 2;
          const ly = (a.y + b.y + NODE_H) / 2;
          return (
            <div
              key={`lbl-${t.from}->${t.to}`}
              title={`${t.from} → ${t.to}: ${t.count} objects · avg ${fmtH(t.avgHours)}`}
              style={{ position: "absolute", left: `${lx}%`, top: `${(ly / 62) * 100}%`, transform: "translate(-50%, -50%)", fontFamily: MONO, fontSize: 10, color: t.expected ? "#0E7C8A" : "#7a848e", background: "rgba(246,244,239,0.92)", padding: "1px 5px", borderRadius: 4, zIndex: 2, cursor: "default" }}
            >
              {t.pct}%
            </div>
          );
        })}

        {/* state nodes */}
        {visibleStates.map((s) => {
          const p = pos[s.id];
          if (!p) return null;
          const sel = selState === s.id;
          return (
            <button
              key={s.id}
              onClick={() => setSelState(sel ? null : s.id)}
              style={{
                position: "absolute", left: `${p.x}%`, top: `${(p.y / 62) * 100}%`, width: `${NODE_W}%`, minWidth: 148,
                fontFamily: "inherit", textAlign: "left", padding: 0, background: "#FFFFFF", cursor: "pointer",
                border: `1.5px solid ${sel ? "#0E7C8A" : "rgba(20,24,28,0.14)"}`, borderRadius: 8, overflow: "hidden",
                boxShadow: sel ? "0 8px 24px -8px rgba(14,124,138,0.5)" : "0 3px 12px -4px rgba(20,30,40,0.18)", zIndex: 3,
              }}
            >
              <span style={{ display: "block", background: headerColor(s), color: "#FFFFFF", fontSize: 11.5, fontWeight: 700, padding: "4px 9px", letterSpacing: "0.02em" }}>
                {s.id}{s.isBottleneck ? " · BOTTLENECK" : ""}
              </span>
              <span style={{ display: "block", padding: "7px 9px 8px" }}>
                <span style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 10.5, color: "#5a646e", marginBottom: 3 }}>
                  <span style={{ color: "#9aa2ab" }}>● Count</span>
                  <span style={{ fontWeight: 600, color: "#14181C" }}>{s.total} objects</span>
                </span>
                <span style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 10.5, color: "#5a646e" }}>
                  <span style={{ color: "#9aa2ab" }}>● Avg duration</span>
                  <span style={{ fontWeight: 600, color: s.isBottleneck ? "#C7452F" : "#14181C" }}>{fmtH(s.avgHours)}</span>
                </span>
                <span style={{ display: "block", fontFamily: MONO, fontSize: 9.5, color: "#9aa2ab", marginTop: 4 }}>{s.current} currently here</span>
              </span>
            </button>
          );
        })}
      </div>

      {/* bottom drawer: objects in the selected state, with actions */}
      {selState && (
        <div style={{ flex: "none", maxHeight: 220, overflowY: "auto", borderTop: "1px solid rgba(20,24,28,0.12)", background: "#FFFFFF", animation: "nadirFadeUp 0.25s ease" }}>
          <div style={{ padding: "10px 24px 6px", display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 13.5, fontWeight: 700 }}>Currently in “{selState}”</span>
            <span style={{ fontFamily: MONO, fontSize: 11, color: "#7a848e" }}>{inState.length} objects · longest-waiting first</span>
            <button onClick={() => setSelState(null)} style={{ marginLeft: "auto", fontFamily: "inherit", background: "transparent", border: "none", fontSize: 16, color: "#9aa2ab", cursor: "pointer" }}>×</button>
          </div>
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 12.5 }}>
            <thead>
              <tr style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em", color: "#9aa2ab", textAlign: "left" }}>
                <th style={{ padding: "4px 24px", fontWeight: 600 }}>ID</th>
                <th style={{ padding: "4px 8px", fontWeight: 600 }}>ISSUE</th>
                <th style={{ padding: "4px 8px", fontWeight: 600 }}>OWNER</th>
                <th style={{ padding: "4px 8px", fontWeight: 600 }}>TIME IN STATE</th>
                <th style={{ padding: "4px 8px", fontWeight: 600 }}>STEPS SO FAR</th>
                <th style={{ padding: "4px 24px", fontWeight: 600, textAlign: "right" }}>ACT</th>
              </tr>
            </thead>
            <tbody>
              {inState.slice(0, 30).map((o) => (
                <tr key={o.id} style={{ borderTop: "1px solid rgba(20,24,28,0.06)" }}>
                  <td style={{ padding: "6px 24px", fontFamily: MONO, fontSize: 11.5, color: "#0E7C8A" }}>{o.id}</td>
                  <td style={{ padding: "6px 8px", fontWeight: 600 }}>{o.label}</td>
                  <td style={{ padding: "6px 8px", color: "#5a646e" }}>{o.owner}</td>
                  <td style={{ padding: "6px 8px", fontFamily: MONO, fontSize: 11.5, color: o.hoursInState > 200 ? "#C7452F" : "#5a646e" }}>{fmtH(o.hoursInState)}</td>
                  <td style={{ padding: "6px 8px", fontFamily: MONO, fontSize: 10.5, color: "#9aa2ab" }}>{o.path.join(" → ")}</td>
                  <td style={{ padding: "6px 24px", textAlign: "right", whiteSpace: "nowrap" }}>
                    {actioned[o.id] ? (
                      <span style={{ fontFamily: MONO, fontSize: 10.5, color: "#15854F" }}>✓ {actioned[o.id]}</span>
                    ) : (
                      <>
                        <button onClick={() => takeAction(o.id, "Assign staff")} style={{ fontFamily: "inherit", fontSize: 11, fontWeight: 700, padding: "4px 9px", marginRight: 6, background: "#0E7C8A", color: "#FFF", border: "none", borderRadius: 5, cursor: "pointer" }}>Assign staff</button>
                        <button onClick={() => takeAction(o.id, "Alert facility")} style={{ fontFamily: "inherit", fontSize: 11, fontWeight: 700, padding: "4px 9px", marginRight: 6, background: "rgba(180,118,20,0.1)", color: "#8a5a10", border: "1px solid rgba(180,118,20,0.35)", borderRadius: 5, cursor: "pointer" }}>Alert facility</button>
                        <button onClick={() => takeAction(o.id, "Deprioritized")} style={{ fontFamily: "inherit", fontSize: 11, fontWeight: 600, padding: "4px 9px", background: "transparent", color: "#5a646e", border: "1px solid rgba(20,24,28,0.16)", borderRadius: 5, cursor: "pointer" }}>Deprioritize</button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Change Expected Path modal */}
      {editingPath && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(20,24,28,0.55)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 460, background: "#FFFFFF", borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 32px rgba(0,0,0,0.2)" }}>
            <div style={{ padding: "15px 20px", borderBottom: "1px solid rgba(20,24,28,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FCFBF9" }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Change Expected Path</div>
              <button onClick={() => setEditingPath(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9aa2ab" }}>×</button>
            </div>
            <div style={{ padding: 20 }}>
              <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.55, marginBottom: 14 }}>
                This is the flow you intend work to follow. Everything the data does <em>differently</em> gets flagged as a deviation the moment you save.
              </div>
              {editingPath.map((s, i) => (
                <div key={s} style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 8, marginBottom: 6, background: "#FCFBF9" }}>
                  <span style={{ fontFamily: MONO, fontSize: 10.5, color: "#9aa2ab", width: 18 }}>{i + 1}</span>
                  <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{s}</span>
                  <button disabled={i === 0} onClick={() => setEditingPath((p) => { const q = [...p!]; [q[i - 1], q[i]] = [q[i], q[i - 1]]; return q; })} style={{ fontFamily: "inherit", border: "none", background: "transparent", cursor: i === 0 ? "default" : "pointer", color: i === 0 ? "#d5d9dd" : "#5a646e", fontSize: 13 }}>↑</button>
                  <button disabled={i === editingPath.length - 1} onClick={() => setEditingPath((p) => { const q = [...p!]; [q[i + 1], q[i]] = [q[i], q[i + 1]]; return q; })} style={{ fontFamily: "inherit", border: "none", background: "transparent", cursor: i === editingPath.length - 1 ? "default" : "pointer", color: i === editingPath.length - 1 ? "#d5d9dd" : "#5a646e", fontSize: 13 }}>↓</button>
                  <button disabled={editingPath.length <= 2} onClick={() => setEditingPath((p) => p!.filter((_, j) => j !== i))} style={{ fontFamily: "inherit", border: "none", background: "transparent", cursor: editingPath.length <= 2 ? "default" : "pointer", color: editingPath.length <= 2 ? "#d5d9dd" : "#C7452F", fontSize: 13 }}>✕</button>
                </div>
              ))}
              {flow.states.filter((s) => !editingPath.includes(s.id)).length > 0 && (
                <select
                  value=""
                  onChange={(e) => { if (e.target.value) setEditingPath((p) => [...p!.slice(0, -1), e.target.value, p![p!.length - 1]]); }}
                  style={{ width: "100%", fontFamily: "inherit", fontSize: 12.5, padding: "8px 10px", borderRadius: 8, border: "1px dashed rgba(14,124,138,0.5)", background: "transparent", color: "#0E7C8A", cursor: "pointer", marginTop: 4 }}
                >
                  <option value="">+ Insert a state before the final step…</option>
                  {flow.states.filter((s) => !editingPath.includes(s.id)).map((s) => (
                    <option key={s.id} value={s.id}>{s.id}</option>
                  ))}
                </select>
              )}
            </div>
            <div style={{ padding: "14px 20px", background: "rgba(20,24,28,0.03)", borderTop: "1px solid rgba(20,24,28,0.06)", display: "flex", justifyContent: "flex-end", gap: 10 }}>
              <button onClick={() => setEditingPath(null)} style={{ fontFamily: "inherit", padding: "9px 16px", borderRadius: 7, border: "1px solid rgba(20,24,28,0.15)", background: "#FFF", fontSize: 12.5, fontWeight: 600, cursor: "pointer", color: "#5a646e" }}>Cancel</button>
              <button onClick={savePath} style={{ fontFamily: "inherit", padding: "9px 16px", borderRadius: 7, border: "none", background: "#0E7C8A", color: "#FFF", fontSize: 12.5, fontWeight: 700, cursor: "pointer" }}>Save &amp; recompute</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
