"use client";

import { useState } from "react";
import { SEV_STYLES } from "@/lib/constants";
import { useNadir } from "./context";

export default function ComplianceScreen() {
  const { co, auditMerged, audit, notify } = useNadir();
  const { compliance } = co;
  const [resolved, setResolved] = useState<Record<string, boolean>>({});
  const [resolvingFinding, setResolvingFinding] = useState<string | null>(null);
  const [resolutionNotes, setResolutionNotes] = useState("");

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
            const statusColor = f.status === "CURRENT" || resolved[f.rule] ? "#15854F" : f.status === "OPEN" ? "#C7452F" : "#B47614";
            const displayStatus = resolved[f.rule] ? "RESOLVED" : f.status;
            const isOpen = f.status === "OPEN" && !resolved[f.rule];

            return (
              <div key={f.rule} style={{ padding: "15px 18px", borderBottom: "1px solid rgba(20,24,28,0.06)", display: "flex", flexDirection: "column", gap: 10 }}>
                <div style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                  <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, letterSpacing: "0.08em", color: sevColor, background: sevBg, padding: "3px 8px", borderRadius: 4, flex: "none", marginTop: 2 }}>{f.sev}</span>
                  <div style={{ minWidth: 0, flex: 1 }}>
                    <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 4 }}>{f.rule}</div>
                    <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "#5a646e" }}>{f.detail}</div>
                  </div>
                  <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flex: "none" }}>
                    <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: statusColor, marginTop: 4 }}>{displayStatus}</span>
                    {isOpen && resolvingFinding !== f.rule && (
                      <button 
                        onClick={() => setResolvingFinding(f.rule)}
                        style={{ fontFamily: "inherit", fontSize: 11, fontWeight: 600, padding: "4px 8px", background: "#14181C", color: "#FFFFFF", border: "none", borderRadius: 4, cursor: "pointer" }}
                      >
                        Resolve
                      </button>
                    )}
                  </div>
                </div>

                {resolvingFinding === f.rule && (
                  <div style={{ background: "rgba(20,24,28,0.03)", padding: 12, borderRadius: 8, border: "1px solid rgba(20,24,28,0.1)", marginTop: 4 }}>
                    <div style={{ fontSize: 11, fontWeight: 600, color: "#5a646e", marginBottom: 6 }}>Resolution Notes (Required for Audit)</div>
                    <textarea 
                      autoFocus
                      value={resolutionNotes}
                      onChange={e => setResolutionNotes(e.target.value)}
                      placeholder="Detail the actions taken to resolve this compliance risk..."
                      style={{ width: "100%", height: 60, padding: 8, borderRadius: 4, border: "1px solid rgba(20,24,28,0.2)", fontSize: 13, fontFamily: "inherit", resize: "none", marginBottom: 8 }}
                    />
                    <div style={{ display: "flex", gap: 8, justifyContent: "flex-end" }}>
                      <button 
                        onClick={() => { setResolvingFinding(null); setResolutionNotes(""); }}
                        style={{ padding: "6px 12px", background: "transparent", border: "1px solid rgba(20,24,28,0.2)", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: "pointer" }}
                      >
                        Cancel
                      </button>
                      <button 
                        disabled={!resolutionNotes.trim()}
onClick={() => {
                          setResolved(prev => ({ ...prev, [f.rule]: true }));
                          setResolvingFinding(null);
                          audit(`Resolved compliance finding "${f.rule}" with notes: ${resolutionNotes}`);
                          notify("Compliance finding resolved and audited", "ok");
                          setResolutionNotes("");
                        }}
                        style={{ padding: "6px 12px", background: resolutionNotes.trim() ? "#0E7C8A" : "rgba(20,24,28,0.1)", color: resolutionNotes.trim() ? "#FFFFFF" : "#9aa2ab", border: "none", borderRadius: 4, fontSize: 12, fontWeight: 600, cursor: resolutionNotes.trim() ? "pointer" : "default" }}
                      >
                        Submit & Close
                      </button>
                    </div>
                  </div>
                )}
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
