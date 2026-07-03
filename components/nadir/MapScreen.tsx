"use client";

import dynamic from "next/dynamic";
import { RETICLE_CURSOR } from "@/lib/constants";
import { useNadir } from "./context";
import styles from "./nadir.module.css";

const Nadir3D = dynamic(() => import("../Nadir3D"), { ssr: false });

export default function MapScreen() {
  const { co, alertsFull, activeCount, clockLabel } = useNadir();

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(20,24,28,0.08)", borderBottom: "1px solid rgba(20,24,28,0.08)", flex: "none" }}>
          {co.kpis.map((k) => (
            <div key={k.label} style={{ background: "#FFFFFF", padding: "14px 20px" }}>
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.1em", color: "#9aa2ab", marginBottom: 5 }}>{k.label}</div>
              <div style={{ fontSize: 20, fontWeight: 600, color: k.color }}>{k.val}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minHeight: 0, position: "relative", background: "#F3F1EC", cursor: RETICLE_CURSOR }}>
          <Nadir3D variant={co.id} />
          <div style={{ position: "absolute", left: 16, bottom: 14, fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#7a848e", pointerEvents: "none" }}>
            drag to rotate · live from {co.sources.length} systems · as of {clockLabel}
          </div>
        </div>
      </div>
      <div style={{ width: 344, flex: "none", borderLeft: "1px solid rgba(20,24,28,0.1)", overflowY: "auto", padding: 20, background: "#FCFBF9" }}>
        <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 14 }}>ACTIVE SIGNALS · {activeCount}</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {alertsFull.map((al) => (
            <div key={al.title} style={{ padding: 14, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderLeft: `3px solid ${al.borderColor}`, borderRadius: 8, opacity: al.opacity }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: al.color, animation: al.anim }} />
                <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.08em", color: al.color }}>{al.statusTag}</span>
                <span style={{ marginLeft: "auto", fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: "#9aa2ab" }}>{al.time}</span>
              </div>
              <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.45, marginBottom: 6 }}>{al.title}</div>
              <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "#5a646e", marginBottom: 8 }}>{al.detail}</div>
              {al.plain && <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#0E7C8A", fontStyle: "italic", marginBottom: 8 }}>In plain terms: {al.plain}</div>}
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: "#9aa2ab" }}>{al.loc}</div>
              <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
                <button
                  onClick={al.onAsk}
                  className={styles.askBtn}
                  style={{ fontFamily: "inherit", fontSize: 12, fontWeight: 600, padding: "7px 12px", background: "rgba(14,124,138,0.08)", color: "#0E7C8A", border: "1px solid rgba(14,124,138,0.3)", borderRadius: 6, cursor: "pointer" }}
                >
                  Ask Nadir →
                </button>
                <button
                  onClick={al.onEvidence}
                  className={styles.ghostBtn}
                  style={{ fontFamily: "inherit", fontSize: 12, fontWeight: 600, padding: "7px 12px", background: "transparent", color: "#5a646e", border: "1px solid rgba(20,24,28,0.16)", borderRadius: 6, cursor: "pointer" }}
                >
                  Evidence →
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
