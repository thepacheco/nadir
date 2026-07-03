"use client";

import { SEV_STYLES } from "@/lib/constants";
import { useNadir } from "./context";

export default function ComplianceScreen() {
  const { co, auditMerged } = useNadir();
  const { compliance } = co;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
      <div style={{ marginBottom: 22 }}>
        <div style={{ fontSize: 19, fontWeight: 700 }}>Compliance monitor</div>
        <div style={{ fontSize: 13.5, color: "#7a848e", marginTop: 4 }}>Live exposure, checked continuously against current requirements. Audit trail auto-generated.</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, maxWidth: 1180, marginBottom: 26 }}>
        {compliance.tiles.map((ct) => (
          <div key={ct.label} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 10, padding: "18px 20px" }}>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.1em", color: "#9aa2ab", marginBottom: 8 }}>{ct.label}</div>
            <div style={{ fontSize: 26, fontWeight: 600, color: ct.color }}>{ct.val}</div>
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1.6fr 1fr", gap: 18, maxWidth: 1180, alignItems: "start" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", borderBottom: "1px solid rgba(20,24,28,0.08)" }}>FINDINGS</div>
          {compliance.findings.map((f) => {
            const [sevColor, sevBg] = SEV_STYLES[f.sev];
            const statusColor = f.status === "CURRENT" ? "#15854F" : f.status === "OPEN" ? "#C7452F" : "#B47614";
            return (
              <div key={f.rule} style={{ padding: "15px 18px", borderBottom: "1px solid rgba(20,24,28,0.06)", display: "flex", gap: 14, alignItems: "flex-start" }}>
                <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, letterSpacing: "0.08em", color: sevColor, background: sevBg, padding: "3px 8px", borderRadius: 4, flex: "none", marginTop: 2 }}>{f.sev}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>{f.rule}</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "#5a646e" }}>{f.detail}</div>
                </div>
                <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: statusColor, flex: "none", marginTop: 4 }}>{f.status}</span>
              </div>
            );
          })}
        </div>
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", borderBottom: "1px solid rgba(20,24,28,0.08)" }}>AUDIT TRAIL · AUTO</div>
          <div style={{ padding: "8px 0" }}>
            {auditMerged.map((a, i) => (
              <div key={i} style={{ padding: "10px 18px", display: "flex", gap: 12, alignItems: "baseline" }}>
                <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: "#9aa2ab", flex: "none", width: 52 }}>{a.time}</span>
                <span style={{ fontSize: 12.5, lineHeight: 1.5, color: "#2a333c" }}>{a.text}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
