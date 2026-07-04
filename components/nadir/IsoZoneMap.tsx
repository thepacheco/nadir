"use client";

// 2.5D isometric zone view (ARCHITECTURE.md §9.2 — the WRLD look).
// Zones are the customer's drawn spaces (same zone set as the 2D blueprint,
// where they can be dragged); this view extrudes them isometrically and
// attaches live signals to the zone they belong to. Click a zone to see the
// signals and open tickets there and to assign a task — which writes to the
// audit trail like every other mutation.

import { useMemo, useState } from "react";
import { useNadir } from "./context";

const MONO = "var(--font-ibm-plex-mono), monospace";

interface Zone {
  label: string;
  gx: number; // grid cell x
  gy: number; // grid cell y
  w: number; // cells wide
  d: number; // cells deep
  h: number; // extrusion height (px)
}

// Same zone vocabulary as the 2D blueprint so alert/ticket locations resolve.
const ZONES: Zone[] = [
  { label: "HQ Office", gx: 0, gy: 0, w: 3, d: 2, h: 34 },
  { label: "Midtown Kitchen", gx: 4, gy: 0, w: 3, d: 3, h: 26 },
  { label: "Midtown Storage", gx: 4, gy: 4, w: 2, d: 2, h: 20 },
  { label: "Line 3", gx: 8, gy: 1, w: 4, d: 2, h: 22 },
  { label: "Receiving Dock", gx: 0, gy: 3, w: 2, d: 3, h: 16 },
  { label: "Substation 4", gx: 9, gy: 4, w: 2, d: 2, h: 28 },
];

const CELL = 34;
const ISO_X = 0.866; // cos 30°
const ISO_Y = 0.5; // sin 30°
const OX = 340; // origin offset
const OY = 60;

function iso(gx: number, gy: number, z = 0): [number, number] {
  return [OX + (gx - gy) * CELL * ISO_X, OY + (gx + gy) * CELL * ISO_Y - z];
}

function facePath(pts: [number, number][]): string {
  return `M ${pts.map((p) => p.join(" ")).join(" L ")} Z`;
}

export default function IsoZoneMap({ onZoneClick }: { onZoneClick?: (label: string | null) => void }) {
  const { co, alertsFull, ingestedData, people, audit, notify } = useNadir();
  const [selZone, setSelZone] = useState<string | null>(null);
  const [assignee, setAssignee] = useState("");
  const [note, setNote] = useState("");
  const [assigned, setAssigned] = useState<Record<string, { to: string; note: string }[]>>({});

  const tickets = Array.isArray(ingestedData) ? ingestedData : [];

  const zoneSignals = useMemo(() => {
    const m: Record<string, { alerts: typeof alertsFull; tickets: typeof tickets }> = {};
    for (const z of ZONES) {
      m[z.label] = {
        alerts: alertsFull.filter((a) => a.loc.includes(z.label) || z.label.includes(a.loc)),
        tickets: tickets.filter((t) => (t.location ?? "") === z.label && t.status !== "CLOSED"),
      };
    }
    return m;
  }, [alertsFull, tickets]);

  const zoneTone = (label: string): string => {
    const s = zoneSignals[label];
    if (s?.alerts.some((a) => a.color === "#C7452F")) return "#C7452F";
    if (s?.alerts.length || s?.tickets.length) return "#B47614";
    return "#15854F";
  };

  const sorted = [...ZONES].sort((a, b) => a.gx + a.gy - (b.gx + b.gy));
  const sel = selZone ? ZONES.find((z) => z.label === selZone) : null;
  const selSig = selZone ? zoneSignals[selZone] : null;

  function pick(label: string) {
    const next = selZone === label ? null : label;
    setSelZone(next);
    setAssignee("");
    setNote("");
    onZoneClick?.(next);
  }

  function assignTask() {
    if (!selZone || !assignee) return;
    setAssigned((prev) => ({ ...prev, [selZone]: [...(prev[selZone] || []), { to: assignee, note }] }));
    audit(`Ops map — task assigned in zone "${selZone}" to ${assignee}${note ? `: "${note}"` : ""}.`);
    notify(`Task assigned to ${assignee} · ${selZone}`, "ok");
    setAssignee("");
    setNote("");
  }

  return (
    <div style={{ position: "absolute", inset: 0, overflow: "hidden" }}>
      <svg viewBox="0 0 720 460" style={{ width: "100%", height: "100%" }}>
        {/* floor grid */}
        {Array.from({ length: 13 }).map((_, i) => {
          const [x1, y1] = iso(i, 0);
          const [x2, y2] = iso(i, 7);
          return <line key={`gx${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(20,24,28,0.07)" strokeWidth={1} />;
        })}
        {Array.from({ length: 8 }).map((_, i) => {
          const [x1, y1] = iso(0, i);
          const [x2, y2] = iso(12, i);
          return <line key={`gy${i}`} x1={x1} y1={y1} x2={x2} y2={y2} stroke="rgba(20,24,28,0.07)" strokeWidth={1} />;
        })}

        {/* zones, painter's order */}
        {sorted.map((z) => {
          const tone = zoneTone(z.label);
          const isSel = selZone === z.label;
          const a0 = iso(z.gx, z.gy, z.h);
          const a1 = iso(z.gx + z.w, z.gy, z.h);
          const a2 = iso(z.gx + z.w, z.gy + z.d, z.h);
          const a3 = iso(z.gx, z.gy + z.d, z.h);
          const b1 = iso(z.gx + z.w, z.gy, 0);
          const b2 = iso(z.gx + z.w, z.gy + z.d, 0);
          const b3 = iso(z.gx, z.gy + z.d, 0);
          const topTint = isSel ? "rgba(14,124,138,0.28)" : tone === "#C7452F" ? "rgba(199,69,47,0.16)" : tone === "#B47614" ? "rgba(180,118,20,0.14)" : "rgba(21,133,79,0.10)";
          const [lx, ly] = iso(z.gx + z.w / 2, z.gy + z.d / 2, z.h);
          const sigCount = (zoneSignals[z.label]?.alerts.length ?? 0) + (zoneSignals[z.label]?.tickets.length ?? 0);
          return (
            <g key={z.label} onClick={() => pick(z.label)} style={{ cursor: "pointer" }}>
              {/* right face */}
              <path d={facePath([a1, a2, b2, b1])} fill="#E4E1DA" stroke="rgba(20,24,28,0.18)" strokeWidth={1} />
              {/* left face */}
              <path d={facePath([a3, a2, b2, b3])} fill="#EFECE5" stroke="rgba(20,24,28,0.18)" strokeWidth={1} />
              {/* top face */}
              <path d={facePath([a0, a1, a2, a3])} fill="#FFFFFF" stroke={isSel ? "#0E7C8A" : "rgba(20,24,28,0.24)"} strokeWidth={isSel ? 2 : 1} />
              <path d={facePath([a0, a1, a2, a3])} fill={topTint} />
              {/* label */}
              <text x={lx} y={ly + 3} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: "#14181C", fontFamily: "inherit", pointerEvents: "none" }}>{z.label}</text>
              {/* transparent hit target over the top face so the whole zone is clickable */}
              <path d={facePath([a0, a1, a2, a3])} fill="transparent" />
              {/* signal beacon */}
              {sigCount > 0 && (
                <g pointerEvents="none">
                  <circle cx={lx} cy={ly - 22} r={9} fill={tone}>
                    {tone !== "#15854F" && <animate attributeName="r" values="8;10;8" dur="1.6s" repeatCount="indefinite" />}
                  </circle>
                  <text x={lx} y={ly - 18.5} textAnchor="middle" style={{ fontSize: 10, fontWeight: 700, fill: "#FFFFFF", fontFamily: "inherit" }}>{sigCount}</text>
                  <line x1={lx} y1={ly - 13} x2={lx} y2={ly - 4} stroke={tone} strokeWidth={1.5} />
                </g>
              )}
            </g>
          );
        })}
      </svg>

      <div style={{ position: "absolute", left: 16, top: 12, fontFamily: MONO, fontSize: 10.5, color: "#7a848e" }}>
        2.5D ZONES · drawn by {co.name} during onboarding · signals attach to the zone they belong to
      </div>

      {/* zone panel */}
      {sel && selSig && (
        <div style={{ position: "absolute", right: 14, top: 14, width: 280, maxHeight: "calc(100% - 28px)", overflowY: "auto", background: "#FFFFFF", border: "1.5px solid rgba(14,124,138,0.5)", borderRadius: 10, boxShadow: "0 14px 34px -12px rgba(20,30,40,0.4)", animation: "nadirFadeUp 0.22s ease" }}>
          <div style={{ padding: "12px 14px 8px", borderBottom: "1px solid rgba(20,24,28,0.08)", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ fontSize: 14.5, fontWeight: 700 }}>{sel.label}</div>
              <div style={{ fontFamily: MONO, fontSize: 10, color: "#7a848e" }}>
                {selSig.alerts.length} signal{selSig.alerts.length === 1 ? "" : "s"} · {selSig.tickets.length} open ticket{selSig.tickets.length === 1 ? "" : "s"}
              </div>
            </div>
            <button onClick={() => pick(sel.label)} style={{ background: "none", border: "none", fontSize: 17, cursor: "pointer", color: "#9aa2ab" }}>×</button>
          </div>
          <div style={{ padding: "10px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
            {selSig.alerts.map((a) => (
              <div key={a.title} style={{ borderLeft: `3px solid ${a.color}`, background: "#FCFBF9", borderRadius: "0 6px 6px 0", padding: "7px 10px" }}>
                <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.35 }}>{a.title}</div>
                <div style={{ fontFamily: MONO, fontSize: 9.5, color: "#9aa2ab", marginTop: 2 }}>{a.sev} · {a.time}</div>
              </div>
            ))}
            {selSig.tickets.map((t) => (
              <div key={t.ticket_id} style={{ borderLeft: "3px solid #0E7C8A", background: "#FCFBF9", borderRadius: "0 6px 6px 0", padding: "7px 10px" }}>
                <div style={{ fontSize: 12, fontWeight: 600, lineHeight: 1.35 }}>{t.description}</div>
                <div style={{ fontFamily: MONO, fontSize: 9.5, color: "#9aa2ab", marginTop: 2 }}>{t.ticket_id} · {t.status} · {t.owner}</div>
              </div>
            ))}
            {selSig.alerts.length === 0 && selSig.tickets.length === 0 && (
              <div style={{ fontSize: 12, color: "#15854F" }}>✓ Nothing active in this zone right now.</div>
            )}

            {(assigned[sel.label] || []).map((a, i) => (
              <div key={i} style={{ fontSize: 11.5, color: "#0f6b3f", background: "rgba(21,133,79,0.07)", border: "1px solid rgba(21,133,79,0.3)", borderRadius: 6, padding: "6px 9px" }}>
                ✓ Task assigned to {a.to}{a.note ? ` — "${a.note}"` : ""}
              </div>
            ))}

            {/* assign a task from the map — the Gotham interaction, non-military */}
            <div style={{ borderTop: "1px solid rgba(20,24,28,0.08)", paddingTop: 10, marginTop: 2 }}>
              <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em", color: "#7a848e", marginBottom: 7 }}>ASSIGN A TASK HERE</div>
              <select
                value={assignee}
                onChange={(e) => setAssignee(e.target.value)}
                style={{ width: "100%", fontFamily: "inherit", fontSize: 12.5, padding: "7px 9px", borderRadius: 6, border: "1px solid rgba(20,24,28,0.18)", background: "#FCFBF9", marginBottom: 7, cursor: "pointer" }}
              >
                <option value="">Who should handle it?</option>
                {people.map((p) => (
                  <option key={p.name} value={p.name} disabled={p.pto}>{p.name}{p.pto ? " (on PTO)" : ""}</option>
                ))}
              </select>
              <input
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="What needs doing? (optional)"
                style={{ width: "100%", fontFamily: "inherit", fontSize: 12.5, padding: "7px 9px", borderRadius: 6, border: "1px solid rgba(20,24,28,0.18)", marginBottom: 8, boxSizing: "border-box" }}
              />
              <button
                onClick={assignTask}
                disabled={!assignee}
                style={{ width: "100%", fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, padding: "9px 0", borderRadius: 7, border: "none", background: assignee ? "#0E7C8A" : "rgba(20,24,28,0.08)", color: assignee ? "#FFFFFF" : "#b7bec5", cursor: assignee ? "pointer" : "default" }}
              >
                Assign &amp; notify →
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
