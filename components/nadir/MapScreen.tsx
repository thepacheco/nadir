"use client";

import { useState } from "react";
import dynamic from "next/dynamic";
import { RETICLE_CURSOR } from "@/lib/constants";
import { useNadir } from "./context";
import styles from "./nadir.module.css";

import SiteMapper from "./SiteMapper";
import Nadir3D from "./Nadir3D";
import PipelineMapper from "./PipelineMapper";
import IsoZoneMap from "./IsoZoneMap";

export default function MapScreen() {
  const { co, alertsFull, activeCount, clockLabel } = useNadir();
  const [clickedBuilding, setClickedBuilding] = useState<number | null>(null);
  const [isQuerying, setIsQuerying] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [viewMode, setViewMode] = useState<"ISO" | "2D" | "3D">("ISO");
  const [activeFilter, setActiveFilter] = useState<"ALL" | "CRITICAL" | "MAINTENANCE" | "SECURITY">("ALL");

  // If a building is clicked, we filter the alerts to simulate focus
  const handleBuildingClick = (idx: number | null) => {
    if (idx !== null && clickedBuilding === null) {
      setIsQuerying(true);
      setTimeout(() => setIsQuerying(false), 450);
    }
    setClickedBuilding(idx);
  };
  
  // Categorize a signal from its own text so the filters actually mean
  // something — no category field is faked, it's derived at read time.
  const categoryOf = (a: (typeof alertsFull)[number]): "CRITICAL" | "MAINTENANCE" | "SECURITY" | "OTHER" => {
    if (a.color === "#C7452F") return "CRITICAL";
    const hay = `${a.title} ${a.detail ?? ""}`.toLowerCase();
    if (/transformer|actuator|compressor|cooler|kiln|equipment|maintenance|calibration|torque|seal|bay|feeder|line|pump|motor|valve/.test(hay)) return "MAINTENANCE";
    if (/osha|incident|log|audit|access|compliance|i-9|certificate|\bcert\b|filing|badge|security|breach|permit/.test(hay)) return "SECURITY";
    return "OTHER";
  };
  const matchesFilter = (a: (typeof alertsFull)[number]) => activeFilter === "ALL" || categoryOf(a) === activeFilter;

  const countFor = (f: string) => (f === "ALL" ? alertsFull.length : alertsFull.filter((a) => categoryOf(a) === f).length);

  const filteredAlerts = alertsFull.filter(matchesFilter);
  const filteredCount = filteredAlerts.length;

  return (
    <div className={styles.mobileStack} style={{ display: "flex", flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0, position: "relative" }}>
        
        {/* FILTERS & TOGGLES */}
        <div style={{ padding: "12px 16px", background: "#FCFBF9", borderBottom: "1px solid rgba(20,24,28,0.1)", display: "flex", gap: 16, alignItems: "center", flex: "none" }}>
          <div style={{ display: "flex", gap: 8, flex: 1, alignItems: "center" }}>
            {(["ALL", "CRITICAL", "MAINTENANCE", "SECURITY"] as const).map((f) => {
              const n = countFor(f);
              const tone = f === "CRITICAL" ? "#C7452F" : f === "MAINTENANCE" ? "#B47614" : f === "SECURITY" ? "#0E7C8A" : "#5a646e";
              return (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  style={{
                    fontFamily: "inherit", fontSize: 11, fontWeight: 700, padding: "6px 12px", borderRadius: 20, cursor: "pointer",
                    display: "flex", alignItems: "center", gap: 6,
                    background: activeFilter === f ? "rgba(14,124,138,0.1)" : "transparent",
                    color: activeFilter === f ? "#0E7C8A" : "#7a848e",
                    border: `1px solid ${activeFilter === f ? "rgba(14,124,138,0.3)" : "rgba(20,24,28,0.1)"}`
                  }}
                >
                  {f}
                  <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, fontWeight: 700, color: n ? tone : "#c7ccd1", background: n ? `${tone}18` : "transparent", padding: "1px 6px", borderRadius: 8, minWidth: 16, textAlign: "center" }}>{n}</span>
                </button>
              );
            })}
          </div>
          
          <div style={{ display: "flex", background: "rgba(20,24,28,0.06)", borderRadius: 6, padding: 2 }}>
            {co.id === "staffing" ? (
              <button
                onClick={() => setViewMode("2D")} // We can just overload 2D mode to be pipeline for now
                style={{ padding: "4px 12px", fontSize: 11, fontWeight: 700, borderRadius: 4, cursor: "pointer", border: "none", background: "#FFFFFF", color: "#14181C", boxShadow: "0 2px 4px rgba(0,0,0,0.05)" }}
              >
                Pipeline View
              </button>
            ) : (
              <>
                <button
                  onClick={() => setViewMode("ISO")}
                  style={{ padding: "4px 12px", fontSize: 11, fontWeight: 700, borderRadius: 4, cursor: "pointer", border: "none", background: viewMode === "ISO" ? "#FFFFFF" : "transparent", color: viewMode === "ISO" ? "#14181C" : "#7a848e", boxShadow: viewMode === "ISO" ? "0 2px 4px rgba(0,0,0,0.05)" : "none" }}
                >
                  2.5D Zones
                </button>
                <button
                  onClick={() => setViewMode("2D")}
                  style={{ padding: "4px 12px", fontSize: 11, fontWeight: 700, borderRadius: 4, cursor: "pointer", border: "none", background: viewMode === "2D" ? "#FFFFFF" : "transparent", color: viewMode === "2D" ? "#14181C" : "#7a848e", boxShadow: viewMode === "2D" ? "0 2px 4px rgba(0,0,0,0.05)" : "none" }}
                >
                  2D Blueprint
                </button>
                <button
                  onClick={() => setViewMode("3D")}
                  style={{ padding: "4px 12px", fontSize: 11, fontWeight: 700, borderRadius: 4, cursor: "pointer", border: "none", background: viewMode === "3D" ? "#FFFFFF" : "transparent", color: viewMode === "3D" ? "#14181C" : "#7a848e", boxShadow: viewMode === "3D" ? "0 2px 4px rgba(0,0,0,0.05)" : "none" }}
                >
                  3D Site
                </button>
              </>
            )}
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(20,24,28,0.08)", borderBottom: "1px solid rgba(20,24,28,0.08)", flex: "none" }}>
          {co.kpis.map((k) => (
            <div key={k.label} style={{ background: "#FFFFFF", padding: "10px 14px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: "#9aa2ab", marginBottom: 3 }}>{k.label}</div>
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 18, fontWeight: 600, color: k.color }}>{k.val}</div>
            </div>
          ))}
        </div>
        <div style={{ flex: 1, minHeight: 0, position: "relative", background: "#F3F1EC", cursor: RETICLE_CURSOR }}>
          
          {co.id === "staffing" ? (
            <PipelineMapper onBuildingClick={handleBuildingClick} />
          ) : viewMode === "ISO" ? (
            <IsoZoneMap onZoneClick={(z) => handleBuildingClick(z ? 0 : null)} />
          ) : viewMode === "2D" ? (
            <SiteMapper onBuildingClick={handleBuildingClick} />
          ) : (
            <Nadir3D onBuildingClick={handleBuildingClick} clickedBuilding={clickedBuilding} />
          )}
          
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
              {activeFilter === "ALL" ? `ACTIVE SIGNALS · ${filteredCount}` : `${activeFilter} · ${filteredCount} OF ${activeCount}`}
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
