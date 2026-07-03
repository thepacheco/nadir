"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { RETICLE_CURSOR } from "@/lib/constants";
import { useNadir } from "./context";
import styles from "./nadir.module.css";

import SiteMapper from "./SiteMapper";

export default function MapScreen() {
  const { co, alertsFull, activeCount, clockLabel } = useNadir();
  const [clickedBuilding, setClickedBuilding] = useState<number | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);

  // If a building is clicked, we filter the alerts to simulate focus
  const handleBuildingClick = (idx: number | null) => {
    if (idx !== null && clickedBuilding === null) {
      setIsQuerying(true);
      setTimeout(() => setIsQuerying(false), 450);
    }
    setClickedBuilding(idx);
  };
  const filteredAlerts = clickedBuilding !== null 
    ? alertsFull.slice(0, 1) // Just mock filtering to 1 alert for the demo
    : alertsFull;

  const filteredCount = clickedBuilding !== null ? filteredAlerts.length : activeCount;

  return (
    <div className={styles.mobileStack} style={{ display: "flex", flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(20,24,28,0.08)", borderBottom: "1px solid rgba(20,24,28,0.08)", flex: "none" }}>
          {co.kpis.map((k) => (
            <div key={k.label} style={{ background: "#FFFFFF", padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: "#9aa2ab", marginBottom: 3 }}>{k.label}</div>
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 18, fontWeight: 600, color: k.color }}>{k.val}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minHeight: 0, position: "relative", background: "#F3F1EC", cursor: RETICLE_CURSOR }}>
          <SiteMapper onBuildingClick={handleBuildingClick} />
          
          {!isPanelOpen && (
            <button
              onClick={() => setIsPanelOpen(true)}
              style={{
                position: "absolute", top: 16, right: 16, fontFamily: "inherit", fontSize: 12, fontWeight: 700,
                padding: "8px 14px", background: "#FFFFFF", color: "#14181C", border: "1px solid rgba(20,24,28,0.1)",
                borderRadius: 8, cursor: "pointer", boxShadow: "0 4px 12px rgba(0,0,0,0.1)", zIndex: 10,
                display: "flex", alignItems: "center", gap: 8
              }}
            >
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#C7452F", animation: "nadirBlink 2s infinite" }} />
              Show Signals
            </button>
          )}

          <div style={{ position: "absolute", left: 16, bottom: 14, fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#7a848e", pointerEvents: "none" }}>
            drag to rotate · live from {co.sources.length} systems · as of {clockLabel}
          </div>
        </div>
      </div>
      {isPanelOpen && (
        <div className={styles.mobileFullWidth} style={{ width: 344, flex: "none", borderLeft: "1px solid rgba(20,24,28,0.1)", overflowY: "auto", padding: 20, background: "#FCFBF9", display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e" }}>
              {clickedBuilding !== null ? `BUILDING SIGNALS · ${filteredCount}` : `ACTIVE SIGNALS · ${activeCount}`}
            </div>
            <button 
              onClick={() => setIsPanelOpen(false)}
              style={{ background: "transparent", border: "none", color: "#9aa2ab", cursor: "pointer", fontSize: 18, lineHeight: 1, padding: 4 }}
            >
              ×
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {isQuerying ? (
            <div style={{ padding: 16, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 6, animation: "nadirPulse 1.5s infinite" }}>
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: "#0E7C8A", marginBottom: 12 }}>
                Querying {co.sources.length} live systems...
              </div>
              <div style={{ width: "80%", height: 16, background: "rgba(20,24,28,0.06)", borderRadius: 4, marginBottom: 8 }} />
              <div style={{ width: "60%", height: 12, background: "rgba(20,24,28,0.04)", borderRadius: 4, marginBottom: 16 }} />
              <div style={{ width: "100%", height: 48, background: "rgba(20,24,28,0.04)", borderRadius: 4 }} />
            </div>
          ) : (
            filteredAlerts.map((al) => (
              <div key={al.title} style={{ padding: 12, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderLeft: `3px solid ${al.borderColor}`, borderRadius: 6, opacity: al.opacity, boxShadow: al.opacity === 1 ? "0 4px 12px rgba(14,124,138,0.06)" : "none" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: al.color, animation: al.anim }} />
                  <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.08em", color: al.color }}>{al.statusTag}</span>
                  <span style={{ marginLeft: "auto", fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: "#9aa2ab" }}>{al.time}</span>
                </div>
                <div style={{ fontSize: 13, fontWeight: 600, lineHeight: 1.4, marginBottom: 4 }}>{al.title}</div>
                <div style={{ fontSize: 12, lineHeight: 1.5, color: "#5a646e", marginBottom: 6 }}>{al.detail}</div>
                {al.plain && <div style={{ fontSize: 11, lineHeight: 1.4, color: "#0E7C8A", fontStyle: "italic", marginBottom: 6 }}>In plain terms: {al.plain}</div>}
                <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: "#9aa2ab" }}>{al.loc}</div>
                <div style={{ display: "flex", gap: 6, marginTop: 8 }}>
                  <button
                    onClick={al.onAsk}
                    className={styles.askBtn}
                    style={{ fontFamily: "inherit", flex: 1, fontSize: 11.5, fontWeight: 600, padding: "6px 10px", background: "rgba(14,124,138,0.08)", color: "#0E7C8A", border: "1px solid rgba(14,124,138,0.3)", borderRadius: 5, cursor: "pointer" }}
                  >
                    Ask Nadir →
                  </button>
                  <button
                    onClick={al.onEvidence}
                    className={styles.ghostBtn}
                    style={{ fontFamily: "inherit", flex: 1, fontSize: 11.5, fontWeight: 600, padding: "6px 10px", background: "transparent", color: "#5a646e", border: "1px solid rgba(20,24,28,0.16)", borderRadius: 5, cursor: "pointer" }}
                  >
                    Evidence →
                  </button>
                </div>
              </div>
            ))
          )}
          </div>
        </div>
      )}
    </div>
  );
}
