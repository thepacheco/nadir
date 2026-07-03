"use client";

import { RETICLE_CURSOR } from "@/lib/constants";
import { useNadir } from "./context";
import styles from "./nadir.module.css";

export default function GraphScreen() {
  const { co, gnodes, edges, selNodeView } = useNadir();

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, minWidth: 0, position: "relative", overflow: "hidden", background: "#F6F4EF", cursor: RETICLE_CURSOR }}>
        <div style={{ position: "absolute", top: 18, left: 24, zIndex: 3 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>
            Fusion graph <span style={{ fontWeight: 400, color: "#9aa2ab", fontSize: 13 }}>· live model</span>
          </div>
          <div style={{ fontSize: 12.5, color: "#5a646e", marginTop: 3 }}>
            How {co.name} actually moves, inferred from {co.sources.length} systems. Click a node.
          </div>
        </div>
        <div style={{ position: "absolute", bottom: 16, left: 24, zIndex: 3, display: "flex", gap: 16, fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#7a848e" }}>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: 2, background: "#9aa2ab" }} />SOURCE</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0E7C8A" }} />OBJECT</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#15854F" }} />PROCESS</span>
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}><span style={{ width: 8, height: 8, borderRadius: "50%", background: "#B47614" }} />RISK</span>
        </div>
        <svg viewBox="0 0 100 62" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {edges.map((e, i) => (
            <line
              key={i}
              x1={e.x1} y1={e.y1} x2={e.x2} y2={e.y2}
              stroke={e.stroke} strokeWidth={0.13}
              strokeDasharray={e.dash}
              style={e.animated ? { animation: "nadirDash 0.9s linear infinite" } : undefined}
            />
          ))}
        </svg>
        {gnodes.map((n) => (
          <button
            key={n.label}
            onClick={n.onClick}
            className={styles.graphNode}
            style={{
              position: "absolute", left: `${n.x}%`, top: `${n.y}%`, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8,
              padding: "8px 14px", background: n.bg, border: `1.5px solid ${n.bd}`, borderRadius: n.shape, cursor: "pointer", color: "#14181C",
              fontSize: 12.5, fontWeight: 600, whiteSpace: "nowrap", zIndex: 2, boxShadow: n.shadow, animation: n.anim,
            }}
          >
            <span style={{ width: 8, height: 8, flex: "none", background: n.dotColor, borderRadius: n.dotShape }} />
            {n.label}
          </button>
        ))}
      </div>
      <div style={{ width: 320, flex: "none", borderLeft: "1px solid rgba(20,24,28,0.1)", padding: "22px 20px", overflowY: "auto", background: "#FCFBF9" }}>
        <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 14 }}>NODE DETAIL</div>
        <div style={{ padding: 16, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 10, marginBottom: 16 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 10 }}>
            <span style={{ width: 9, height: 9, background: selNodeView.dotColor, borderRadius: selNodeView.dotShape }} />
            <span style={{ fontSize: 15, fontWeight: 700 }}>{selNodeView.label}</span>
          </div>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.1em", color: selNodeView.dotColor, marginBottom: 10 }}>{selNodeView.typeLabel}</div>
          <div style={{ fontSize: 13, lineHeight: 1.6, color: "#5a646e" }}>{selNodeView.meta}</div>
        </div>
        <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 10 }}>HOW THIS STATUS WAS DERIVED</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {selNodeView.derivation.map((d, i) => (
            <div key={i} style={{ display: "flex", gap: 10, alignItems: "flex-start", fontSize: 12.5, lineHeight: 1.5, color: "#4a545e" }}>
              <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, color: "#0E7C8A", background: "rgba(14,124,138,0.08)", padding: "2px 6px", borderRadius: 4, flex: "none", marginTop: 1 }}>{d.step}</span>
              <span>{d.text}</span>
            </div>
          ))}
        </div>
        <div style={{ fontSize: 12, lineHeight: 1.6, color: "#9aa2ab", borderTop: "1px solid rgba(20,24,28,0.08)", paddingTop: 12 }}>
          Nadir inspected the raw schema, proposed what each table represents, and a human confirmed it once. Relationships were inferred from keys, timestamps, and usage.
        </div>
      </div>
    </div>
  );
}
