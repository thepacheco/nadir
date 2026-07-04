"use client";

// Pipeline DAG — the Foundry-style dataflow view of the ingestion pipeline
// (ARCHITECTURE.md §9.3): raw sources → transforms → confirmed objects →
// the lenses that consume them, with a Changes panel that lists exactly what
// the user renamed, re-pointed, or added during onboarding. Every entry in
// the Changes panel is derived from real onboarding state — nothing is staged.

import { useMemo } from "react";
import { useNadir } from "./context";

const MONO = "var(--font-ibm-plex-mono), monospace";

interface DagNode {
  id: string;
  title: string;
  sub: string;
  col: number;
  row: number;
  accent?: "added" | "modified" | undefined;
}

const COL_X = [3, 29, 55, 81]; // % left per column
const COL_LABELS = ["SOURCES", "TRANSFORMS", "OBJECTS", "LENSES"];
const NODE_W = 16; // %

export default function PipelineDAG() {
  const { co, objectName, wires, rewiredCount } = useNadir();

  const renamed = co.obMappings
    .map((mp, i) => ({ table: mp.table, was: mp.proposed, now: objectName(i) }))
    .filter((r) => r.was !== r.now && r.now.trim().length > 0);
  const retargeted = wires.filter((w) => w.conf === "manual" && !w.custom);
  const added = wires.filter((w) => w.custom);

  const { nodes, edges } = useMemo(() => {
    const ns: DagNode[] = [];
    const es: { from: string; to: string; accent?: "added" | "modified"; label?: string }[] = [];

    co.sources.forEach((s, i) => {
      ns.push({ id: `src-${i}`, title: s.name, sub: "read-only", col: 0, row: i });
    });
    const transforms: [string, string][] = [
      ["Schema scan", `${co.obTables.length} tables · 3 rows sampled`],
      ["Object mapping", `${co.obMappings.length} proposals confirmed`],
      ["Wire validation", `${wires.length} connections checked`],
    ];
    transforms.forEach(([t, sub], i) => {
      ns.push({ id: `tf-${i}`, title: t, sub, col: 1, row: i });
    });
    co.obMappings.forEach((mp, i) => {
      const name = objectName(i);
      const isRenamed = renamed.some((r) => r.table === mp.table);
      const into = wires.filter((w) => w.to === name).length;
      ns.push({
        id: `ob-${i}`,
        title: name,
        sub: `${mp.table} · ${into} connection${into === 1 ? "" : "s"} in`,
        col: 2,
        row: i,
        accent: isRenamed ? "modified" : undefined,
      });
    });
    const lenses: [string, string][] = [
      ["Map", "spatial lens"],
      ["Process explorer", "flow lens"],
      ["Dashboard", "metric lens"],
    ];
    lenses.forEach(([t, sub], i) => {
      ns.push({ id: `ln-${i}`, title: t, sub, col: 3, row: i });
    });

    co.sources.forEach((_, i) => es.push({ from: `src-${i}`, to: "tf-0" }));
    es.push({ from: "tf-0", to: "tf-1" });
    es.push({ from: "tf-1", to: "tf-2" });
    co.obMappings.forEach((_, i) => es.push({ from: "tf-2", to: `ob-${i}` }));
    // object-to-object wires (the ontology itself)
    wires.forEach((w) => {
      const fi = co.obMappings.findIndex((_, i) => objectName(i) === w.from);
      const ti = co.obMappings.findIndex((_, i) => objectName(i) === w.to);
      if (fi >= 0 && ti >= 0 && fi !== ti) {
        es.push({ from: `ob-${fi}`, to: `ob-${ti}`, accent: w.custom ? "added" : w.conf === "manual" ? "modified" : undefined, label: w.label });
      }
    });
    co.obMappings.forEach((_, i) => {
      es.push({ from: `ob-${i}`, to: `ln-${i % lenses.length}` });
    });
    return { nodes: ns, edges: es };
  }, [co, wires, objectName, renamed]);

  const rowsPerCol = [0, 1, 2, 3].map((c) => nodes.filter((n) => n.col === c).length);
  const canvasH = Math.max(...rowsPerCol) * 64 + 60;

  const posOf = (n: DagNode) => {
    const count = rowsPerCol[n.col];
    const span = canvasH - 70;
    const y = count === 1 ? span / 2 : (span / Math.max(1, count - 1)) * n.row;
    return { x: COL_X[n.col], y: y + 34 };
  };
  const byId = Object.fromEntries(nodes.map((n) => [n.id, n]));

  const changeEntries: { kind: "Added" | "Modified"; text: string }[] = [
    ...renamed.map((r) => ({ kind: "Modified" as const, text: `${r.table} renamed “${r.was}” → “${r.now}”` })),
    ...retargeted.map((w) => ({ kind: "Modified" as const, text: `Connection re-pointed: ${w.from} → ${w.to}` })),
    ...added.map((w) => ({ kind: "Added" as const, text: `${w.from} —[${w.label}]→ ${w.to}` })),
  ];

  return (
    <div style={{ marginTop: 26, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden", textAlign: "left" }}>
      <div style={{ padding: "12px 18px", borderBottom: "1px solid rgba(20,24,28,0.08)", display: "flex", alignItems: "center", gap: 10 }}>
        <span style={{ fontSize: 14, fontWeight: 700 }}>Pipeline</span>
        <span style={{ fontFamily: MONO, fontSize: 10.5, color: "#7a848e" }}>MAIN branch · how data becomes your operational graph</span>
        <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 10.5, color: rewiredCount ? "#0E7C8A" : "#9aa2ab" }}>
          {changeEntries.length} change{changeEntries.length === 1 ? "" : "s"} by you
        </span>
      </div>
      <div style={{ display: "flex", minHeight: canvasH }}>
        {/* Changes panel */}
        <div style={{ width: 218, flex: "none", borderRight: "1px solid rgba(20,24,28,0.08)", padding: "14px 14px", background: "#FCFBF9" }}>
          <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 10 }}>CHANGES</div>
          {changeEntries.length === 0 ? (
            <div style={{ fontSize: 12, color: "#9aa2ab", lineHeight: 1.55 }}>
              No user changes yet — this is Nadir&apos;s inference, untouched. Rename an object or rewire a connection in step 3–4 and it appears here.
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {changeEntries.map((c, i) => (
                <div key={i} style={{ fontSize: 11.5, lineHeight: 1.45 }}>
                  <span style={{ fontFamily: MONO, fontSize: 10, fontWeight: 700, color: c.kind === "Added" ? "#15854F" : "#B47614" }}>{c.kind}</span>
                  <div style={{ color: "#4a545e" }}>{c.text}</div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* DAG canvas */}
        <div style={{ flex: 1, position: "relative", minWidth: 0 }}>
          {COL_LABELS.map((l, i) => (
            <div key={l} style={{ position: "absolute", left: `${COL_X[i]}%`, top: 8, fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.12em", color: "#b7bec5" }}>{l}</div>
          ))}
          <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }} viewBox={`0 0 100 ${canvasH}`} preserveAspectRatio="none">
            {edges.map((e, i) => {
              const a = byId[e.from];
              const b = byId[e.to];
              if (!a || !b) return null;
              const pa = posOf(a);
              const pb = posOf(b);
              const x1 = pa.x + NODE_W, y1 = pa.y + 14;
              const x2 = pb.x, y2 = pb.y + 14;
              const mx = (x1 + x2) / 2;
              const stroke = e.accent === "added" ? "#15854F" : e.accent === "modified" ? "#B47614" : "rgba(20,24,28,0.18)";
              return (
                <path
                  key={i}
                  d={`M ${x1} ${y1} C ${mx} ${y1}, ${mx} ${y2}, ${x2} ${y2}`}
                  fill="none"
                  stroke={stroke}
                  strokeWidth={e.accent ? 1.6 : 1}
                  strokeDasharray={a.col === 2 && b.col === 2 ? "4 3" : undefined}
                  vectorEffect="non-scaling-stroke"
                />
              );
            })}
          </svg>
          {nodes.map((n) => {
            const p = posOf(n);
            return (
              <div
                key={n.id}
                style={{
                  position: "absolute", left: `${p.x}%`, top: p.y, width: `${NODE_W}%`, minWidth: 96,
                  background: "#FFFFFF", borderRadius: 7, padding: "6px 9px",
                  border: `1.5px solid ${n.accent === "modified" ? "#B47614" : n.accent === "added" ? "#15854F" : n.col === 2 ? "rgba(14,124,138,0.45)" : "rgba(20,24,28,0.14)"}`,
                  boxShadow: "0 2px 8px -3px rgba(20,30,40,0.15)",
                }}
              >
                <div style={{ fontSize: 11.5, fontWeight: 700, color: "#14181C", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{n.title}</div>
                <div style={{ fontFamily: MONO, fontSize: 9, color: n.accent === "modified" ? "#B47614" : "#9aa2ab", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                  {n.accent === "modified" ? "modified · " : n.accent === "added" ? "added · " : ""}{n.sub}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
