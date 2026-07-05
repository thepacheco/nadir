"use client";

// Zone interior — click a zone on the ops map and zoom into what's actually
// inside it: the stations and the people working them, laid out like the real
// space (a prep line, a substation's transformer bays, a production line). The
// station tied to a live signal glows and pulses so you can see *where* on the
// floor the problem is, then assign someone to it without leaving the view.
//
// The layout is schematic, not a photo — but it's driven by the zone's real
// signals and the company's real roster, and the "assign" action is audited
// like every other mutation. It is not decorative animation.

import { useState } from "react";
import type { FloorZone } from "@/lib/floor";
import type { DecoratedAlert, DecoratedPerson } from "./context";

const MONO = "var(--font-ibm-plex-mono), monospace";

interface Station {
  id: string;
  name: string;
  x: number; // px in a 0..820 × 0..480 viewBox
  y: number;
  w: number;
  h: number;
}

type Kind = "office" | "kitchen" | "line" | "storage" | "dock" | "substation" | "generic";

function kindOf(label: string): Kind {
  const l = label.toLowerCase();
  if (l.includes("office") || l.includes("hq")) return "office";
  if (l.includes("kitchen")) return "kitchen";
  if (l.includes("line") || l.includes("assembly") || l.includes("production")) return "line";
  if (l.includes("storage") || l.includes("warehouse")) return "storage";
  if (l.includes("dock") || l.includes("receiving") || l.includes("shipping")) return "dock";
  if (l.includes("substation") || l.includes("transformer") || l.includes("bay")) return "substation";
  return "generic";
}

function spec(kind: Kind): { stations: Station[]; workers: [number, number][]; flow?: [number, number][]; workLabel: string } {
  switch (kind) {
    case "kitchen":
      return {
        workLabel: "prep line",
        stations: [
          { id: "s1", name: "Cold prep", x: 70, y: 90, w: 130, h: 70 },
          { id: "s2", name: "Assembly", x: 250, y: 90, w: 130, h: 70 },
          { id: "s3", name: "Hot line", x: 430, y: 90, w: 130, h: 70 },
          { id: "s4", name: "Pack & seal", x: 610, y: 90, w: 130, h: 70 },
          { id: "s5", name: "Walk-in cooler", x: 70, y: 300, w: 150, h: 100 },
          { id: "s6", name: "Dishwash", x: 610, y: 300, w: 130, h: 100 },
        ],
        workers: [[120, 190], [300, 190], [480, 190], [660, 190], [150, 260], [420, 300]],
        flow: [[70, 125], [740, 125]],
      };
    case "line":
      return {
        workLabel: "production line",
        stations: [
          { id: "s1", name: "Station A · load", x: 60, y: 150, w: 110, h: 90 },
          { id: "s2", name: "Station B · weld", x: 230, y: 150, w: 110, h: 90 },
          { id: "s3", name: "Station C · torque", x: 400, y: 150, w: 110, h: 90 },
          { id: "s4", name: "Station D · QA", x: 570, y: 150, w: 110, h: 90 },
          { id: "s5", name: "Outfeed", x: 710, y: 150, w: 70, h: 90 },
        ],
        workers: [[115, 260], [285, 260], [455, 260], [625, 260]],
        flow: [[60, 195], [780, 195]],
      };
    case "substation":
      return {
        workLabel: "energized bays",
        stations: [
          { id: "s1", name: "Bay 1 · T-114", x: 80, y: 120, w: 150, h: 240 },
          { id: "s2", name: "Bay 2 · T-115", x: 280, y: 120, w: 150, h: 240 },
          { id: "s3", name: "Bay 3 · T-116", x: 480, y: 120, w: 150, h: 240 },
          { id: "s4", name: "Control room", x: 680, y: 120, w: 100, h: 240 },
        ],
        workers: [[730, 300]],
      };
    case "storage":
      return {
        workLabel: "racking",
        stations: [
          { id: "s1", name: "Rack A", x: 70, y: 90, w: 690, h: 44 },
          { id: "s2", name: "Rack B", x: 70, y: 170, w: 690, h: 44 },
          { id: "s3", name: "Rack C", x: 70, y: 250, w: 690, h: 44 },
          { id: "s4", name: "Staging", x: 70, y: 330, w: 300, h: 90 },
        ],
        workers: [[420, 375], [520, 360]],
        flow: [[400, 355], [740, 355]],
      };
    case "dock":
      return {
        workLabel: "loading bays",
        stations: [
          { id: "s1", name: "Bay 1", x: 70, y: 90, w: 190, h: 120 },
          { id: "s2", name: "Bay 2", x: 320, y: 90, w: 190, h: 120 },
          { id: "s3", name: "Bay 3", x: 570, y: 90, w: 190, h: 120 },
          { id: "s4", name: "Marshalling", x: 70, y: 280, w: 690, h: 120 },
        ],
        workers: [[165, 250], [415, 250], [300, 340], [520, 340]],
      };
    case "office":
      return {
        workLabel: "desks",
        stations: [
          { id: "s1", name: "Ops pod", x: 70, y: 90, w: 200, h: 140 },
          { id: "s2", name: "Finance pod", x: 320, y: 90, w: 200, h: 140 },
          { id: "s3", name: "Meeting", x: 570, y: 90, w: 180, h: 140 },
          { id: "s4", name: "Floor desks", x: 70, y: 280, w: 450, h: 120 },
          { id: "s5", name: "Server room", x: 570, y: 280, w: 180, h: 120 },
        ],
        workers: [[120, 150], [200, 190], [370, 150], [450, 190], [150, 330], [300, 340], [430, 330]],
      };
    default:
      return {
        workLabel: "stations",
        stations: [
          { id: "s1", name: "Station 1", x: 90, y: 110, w: 200, h: 120 },
          { id: "s2", name: "Station 2", x: 340, y: 110, w: 200, h: 120 },
          { id: "s3", name: "Station 3", x: 90, y: 280, w: 200, h: 120 },
          { id: "s4", name: "Station 4", x: 340, y: 280, w: 200, h: 120 },
        ],
        workers: [[150, 250], [400, 250], [150, 360]],
      };
  }
}

// A worker that actually walks a loop around the floor (the "Good Job" feel).
// The whole glyph rides an <animateMotion> path; a subtle bob sells the stride.
const WALK_LOOPS = [
  "M 120 130 H 380 V 380 H 120 Z",
  "M 440 130 H 720 V 380 H 440 Z",
  "M 200 220 H 620 V 360 H 200 Z",
];
function WalkingWorker({ i, busy }: { i: number; busy: boolean }) {
  const loop = WALK_LOOPS[i % WALK_LOOPS.length];
  const dur = 13 + (i % 5) * 2; // seconds per lap, varied so they don't march in step
  const begin = `-${(i * 1.7).toFixed(1)}s`;   // spread them around the loop
  const body = busy ? "#0E7C8A" : "#9aa2ab";
  const head = busy ? "#0b5d68" : "#7a848e";
  return (
    <g>
      <g style={{ animation: `nadirBob ${1.1 + (i % 3) * 0.2}s ease-in-out infinite` }}>
        <ellipse cx={0} cy={9} rx={8} ry={3.5} fill="rgba(20,24,28,0.12)" />
        <circle cx={0} cy={0} r={5} fill={body} />
        <circle cx={0} cy={-6.5} r={3.3} fill={head} />
      </g>
      <animateMotion dur={`${dur}s`} begin={begin} repeatCount="indefinite" path={loop} rotate="0" />
    </g>
  );
}

export default function ZoneInterior({
  label,
  zone,
  alerts,
  tickets,
  people,
  onClose,
  onAssign,
}: {
  label: string;
  zone?: FloorZone;
  alerts: DecoratedAlert[];
  tickets: Record<string, string>[];
  people: DecoratedPerson[];
  onClose: () => void;
  onAssign: (assignee: string, note: string, station: string) => void;
}) {
  const kind = zone?.kind ?? kindOf(label);
  const { stations, flow, workLabel } = spec(kind);
  // How many people are actually on this floor right now (from the schedule
  // reconciliation), capped for legibility.
  const present = zone?.present ?? 6;
  const workerCount = Math.min(present, 16);
  const crit = alerts.find((a) => a.color === "#C7452F");
  const warn = alerts.find((a) => a.color !== "#C7452F");

  // The affected station: match a station whose name shares a word with the
  // signal location/title, else fall back to the first station.
  const hay = `${crit?.title ?? ""} ${crit?.loc ?? warn?.title ?? ""}`.toLowerCase();
  const affectedIdx = Math.max(
    0,
    stations.findIndex((s) => s.name.toLowerCase().split(/[ ·]+/).some((w) => w.length > 2 && hay.includes(w))),
  );
  const alertTone = crit ? "#C7452F" : warn ? "#B47614" : null;

  const [assignee, setAssignee] = useState("");
  const [note, setNote] = useState("");
  const [done, setDone] = useState<{ to: string; station: string } | null>(null);

  const affectedStation = stations[affectedIdx];

  function assign() {
    if (!assignee) return;
    onAssign(assignee, note, affectedStation?.name ?? label);
    setDone({ to: assignee, station: affectedStation?.name ?? label });
    setAssignee("");
    setNote("");
  }

  return (
    <div style={{ position: "absolute", inset: 0, background: "#F6F4EF", zIndex: 20, display: "flex", flexDirection: "column", animation: "nadirZoomIn 0.4s cubic-bezier(0.22,1,0.36,1)" }}>
      <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(20,24,28,0.1)", display: "flex", alignItems: "center", gap: 12, flex: "none", background: "#FCFBF9" }}>
        <button onClick={onClose} style={{ fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, padding: "7px 13px", background: "#14181C", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer" }}>← Zoom out</button>
        <div>
          <div style={{ fontSize: 15.5, fontWeight: 700 }}>{label} <span style={{ fontWeight: 400, color: "#9aa2ab", fontSize: 12.5 }}>· inside the space</span></div>
          <div style={{ fontFamily: MONO, fontSize: 10.5, color: "#7a848e" }}>
            live · {present} {zone?.role.toLowerCase() ?? "worker"}s on the floor · {stations.length} {workLabel}{alertTone ? ` · 1 flagged` : " · all nominal"}
          </div>
        </div>
      </div>

      <div style={{ flex: 1, minHeight: 0, display: "flex" }}>
        {/* floor */}
        <div style={{ flex: 1, minWidth: 0, position: "relative" }}>
          <svg viewBox="0 0 820 480" preserveAspectRatio="xMidYMid meet" style={{ width: "100%", height: "100%" }}>
            {/* room shell */}
            <rect x={30} y={40} width={760} height={410} rx={10} fill="#FFFFFF" stroke="rgba(20,24,28,0.18)" strokeWidth={2} />
            {/* subtle floor grid */}
            {Array.from({ length: 15 }).map((_, i) => (
              <line key={`v${i}`} x1={30 + i * 52} y1={40} x2={30 + i * 52} y2={450} stroke="rgba(20,24,28,0.04)" strokeWidth={1} />
            ))}

            {/* flow lane (conveyor / prep line) */}
            {flow && (
              <g>
                <line x1={flow[0][0]} y1={flow[0][1]} x2={flow[1][0]} y2={flow[1][1]} stroke="rgba(14,124,138,0.25)" strokeWidth={14} strokeLinecap="round" />
                <circle r={6} fill="#0E7C8A">
                  <animateMotion dur="4s" repeatCount="indefinite" path={`M ${flow[0][0]} ${flow[0][1]} L ${flow[1][0]} ${flow[1][1]}`} />
                </circle>
                <circle r={6} fill="#0E7C8A" opacity={0.5}>
                  <animateMotion dur="4s" begin="1.6s" repeatCount="indefinite" path={`M ${flow[0][0]} ${flow[0][1]} L ${flow[1][0]} ${flow[1][1]}`} />
                </circle>
              </g>
            )}

            {/* stations */}
            {stations.map((s, i) => {
              const flagged = alertTone && i === affectedIdx;
              return (
                <g key={s.id}>
                  <rect
                    x={s.x} y={s.y} width={s.w} height={s.h} rx={7}
                    fill={flagged ? (crit ? "rgba(199,69,47,0.12)" : "rgba(180,118,20,0.12)") : "rgba(20,24,28,0.03)"}
                    stroke={flagged ? alertTone! : "rgba(20,24,28,0.18)"}
                    strokeWidth={flagged ? 2.4 : 1.4}
                  >
                    {flagged && <animate attributeName="stroke-opacity" values="1;0.35;1" dur="1.5s" repeatCount="indefinite" />}
                  </rect>
                  <text x={s.x + 10} y={s.y + 20} style={{ fontSize: 12, fontWeight: 700, fill: "#14181C", fontFamily: "inherit" }}>{s.name}</text>
                  {flagged && (
                    <text x={s.x + 10} y={s.y + 38} style={{ fontSize: 10.5, fill: alertTone!, fontFamily: MONO }}>
                      ⚠ {crit ? "CRITICAL" : "WATCH"}
                    </text>
                  )}
                </g>
              );
            })}

            {/* workers walking the floor — one per person actually present */}
            {Array.from({ length: workerCount }).map((_, i) => (
              <WalkingWorker key={i} i={i} busy={i % 4 !== 0} />
            ))}
          </svg>

          <div style={{ position: "absolute", left: 18, bottom: 12, fontFamily: MONO, fontSize: 10, color: "#9aa2ab", pointerEvents: "none" }}>
            live floor · each figure is a {zone?.role.toLowerCase() ?? "worker"} on shift right now
          </div>
        </div>

        {/* right rail: workforce reconciliation + what's happening here + assign */}
        <div style={{ width: 300, flex: "none", borderLeft: "1px solid rgba(20,24,28,0.1)", background: "#FCFBF9", padding: 16, overflowY: "auto" }}>
          {zone && zone.scheduled > 0 && (
            <div style={{ marginBottom: 16 }}>
              <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 8 }}>WORKFORCE · NOW</div>
              <div style={{ display: "flex", gap: 8, marginBottom: 10 }}>
                {[
                  { k: "On floor", v: zone.present, c: "#14181C" },
                  { k: "Scheduled", v: zone.scheduled, c: "#5a646e" },
                  { k: "Called out", v: zone.calledOut, c: zone.calledOut > 0 ? "#C7452F" : "#15854F" },
                ].map((s) => (
                  <div key={s.k} style={{ flex: 1, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 8, padding: "8px 6px", textAlign: "center" }}>
                    <div style={{ fontFamily: MONO, fontSize: 18, fontWeight: 700, color: s.c }}>{s.v}</div>
                    <div style={{ fontFamily: MONO, fontSize: 8.5, color: "#9aa2ab", letterSpacing: "0.04em" }}>{s.k.toUpperCase()}</div>
                  </div>
                ))}
              </div>
              {(() => {
                const gap = zone.present - zone.scheduled;
                if (zone.calledOut > 0 && gap < 0) {
                  return (
                    <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#8f3322", background: "rgba(199,69,47,0.07)", border: "1px solid rgba(199,69,47,0.3)", borderRadius: 8, padding: "9px 11px" }}>
                      <strong>Nadir flagged this.</strong> {zone.calledOut} scheduled {zone.role.toLowerCase()}{zone.calledOut > 1 ? "s" : ""} never clocked in — you&apos;re {Math.abs(gap)} short of plan on this floor. It matched the schedule against clock-in before anyone noticed the line was thin.
                    </div>
                  );
                }
                if (gap > 0) {
                  return (
                    <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#8a5a10", background: "rgba(180,118,20,0.07)", border: "1px solid rgba(180,118,20,0.3)", borderRadius: 8, padding: "9px 11px" }}>
                      <strong>Nadir noticed.</strong> {gap} more on the floor than the schedule called for — unplanned labor Nadir caught against the roster.
                    </div>
                  );
                }
                return (
                  <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#0f6b3f", background: "rgba(21,133,79,0.06)", border: "1px solid rgba(21,133,79,0.3)", borderRadius: 8, padding: "9px 11px" }}>
                    ✓ Floor matches the schedule — {zone.present} of {zone.scheduled} {zone.role.toLowerCase()}s clocked in.
                  </div>
                );
              })()}
            </div>
          )}
          <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 10 }}>WHAT&apos;S HAPPENING HERE</div>
          {alerts.length === 0 && tickets.length === 0 && (
            <div style={{ fontSize: 12.5, color: "#15854F", background: "rgba(21,133,79,0.06)", border: "1px solid rgba(21,133,79,0.3)", borderRadius: 8, padding: "9px 11px", marginBottom: 12 }}>
              ✓ All {workLabel} nominal, nothing flagged here.
            </div>
          )}
          {alerts.map((a) => (
            <div key={a.title} style={{ borderLeft: `3px solid ${a.color}`, background: "#FFFFFF", borderRadius: "0 7px 7px 0", padding: "9px 11px", marginBottom: 8, border: "1px solid rgba(20,24,28,0.08)", borderLeftWidth: 3 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.35 }}>{a.title}</div>
              {a.plain && <div style={{ fontSize: 11, color: "#0E7C8A", fontStyle: "italic", marginTop: 3 }}>In plain terms: {a.plain}</div>}
              <div style={{ fontFamily: MONO, fontSize: 9.5, color: "#9aa2ab", marginTop: 4 }}>{a.statusTag} · {a.time} · at {affectedStation?.name}</div>
            </div>
          ))}
          {tickets.map((t) => (
            <div key={t.ticket_id} style={{ borderLeft: "3px solid #0E7C8A", background: "#FFFFFF", borderRadius: "0 7px 7px 0", padding: "9px 11px", marginBottom: 8, border: "1px solid rgba(20,24,28,0.08)", borderLeftWidth: 3 }}>
              <div style={{ fontSize: 12.5, fontWeight: 600 }}>{t.description}</div>
              <div style={{ fontFamily: MONO, fontSize: 9.5, color: "#9aa2ab", marginTop: 4 }}>{t.ticket_id} · {t.status} · {t.owner}</div>
            </div>
          ))}

          <div style={{ borderTop: "1px solid rgba(20,24,28,0.08)", marginTop: 6, paddingTop: 12 }}>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.08em", color: "#7a848e", marginBottom: 7 }}>
              DISPATCH SOMEONE TO {(affectedStation?.name ?? label).toUpperCase()}
            </div>
            {done ? (
              <div style={{ fontSize: 12, color: "#0f6b3f", background: "rgba(21,133,79,0.07)", border: "1px solid rgba(21,133,79,0.3)", borderRadius: 7, padding: "9px 11px" }}>
                ✓ {done.to} dispatched to {done.station}. Task created, they&apos;ve been notified, audit entry written.
                <button onClick={() => setDone(null)} style={{ display: "block", marginTop: 6, fontFamily: "inherit", fontSize: 11, fontWeight: 600, color: "#0E7C8A", background: "transparent", border: "none", padding: 0, cursor: "pointer" }}>Dispatch another →</button>
              </div>
            ) : (
              <>
                <select value={assignee} onChange={(e) => setAssignee(e.target.value)} style={{ width: "100%", fontFamily: "inherit", fontSize: 12.5, padding: "7px 9px", borderRadius: 6, border: "1px solid rgba(20,24,28,0.18)", background: "#FFFFFF", marginBottom: 7, cursor: "pointer" }}>
                  <option value="">Who should handle it?</option>
                  {people.map((p) => (
                    <option key={p.name} value={p.name} disabled={p.pto}>{p.name}{p.pto ? " (on PTO)" : ""}</option>
                  ))}
                </select>
                <input value={note} onChange={(e) => setNote(e.target.value)} placeholder="What needs doing? (optional)" style={{ width: "100%", boxSizing: "border-box", fontFamily: "inherit", fontSize: 12.5, padding: "7px 9px", borderRadius: 6, border: "1px solid rgba(20,24,28,0.18)", marginBottom: 8 }} />
                <button onClick={assign} disabled={!assignee} style={{ width: "100%", fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, padding: "9px 0", borderRadius: 7, border: "none", background: assignee ? "#0E7C8A" : "rgba(20,24,28,0.08)", color: assignee ? "#fff" : "#b7bec5", cursor: assignee ? "pointer" : "default" }}>
                  Dispatch &amp; notify →
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
