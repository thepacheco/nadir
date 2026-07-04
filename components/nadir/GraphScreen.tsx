"use client";
import React from "react";

import { RETICLE_CURSOR } from "@/lib/constants";
import { PHASE2 } from "@/lib/phase2";
import { useNadir } from "./context";
import styles from "./nadir.module.css";

const TONE: Record<string, string> = { red: "#C7452F", amber: "#B47614", ok: "#15854F" };

export default function GraphScreen() {
  const { co, gnodes, edges, selNodeView, childNodes, selChild, setSelChild, parentLabel, selNode } = useNadir();
  const childrenMap = PHASE2[co.id].children;
  const child = selChild !== null ? childNodes[selChild] : null;

  const [selectedAction, setSelectedAction] = React.useState<string>("");
  const [webhookTerminal, setWebhookTerminal] = React.useState<{ action: string, logs: string[] } | null>(null);

  const handleRunAction = () => {
    const actionToRun = selectedAction || (
      selNodeView.type === "object" ? "Log Lockout/Tagout" :
      selNodeView.type === "source" ? "Trigger Manual Sync" :
      selNodeView.type === "process" ? "Halt Process (Emergency)" :
      "Dispatch Remediation Ticket"
    );
    
    setWebhookTerminal({ action: actionToRun, logs: [
      `> Initiating secure webhook execution for action: ${actionToRun}`,
      `> Authenticating with target ERP (SAP/EBS)... [OK]`,
      `> Constructing JSON payload from Operational Graph context... [OK]`,
      `> POST /api/v1/erp/writeback`,
      `> Awaiting response...`
    ] });

    // Simulate completion
    setTimeout(() => {
      setWebhookTerminal(prev => {
        if (!prev) return prev;
        return {
          ...prev,
          logs: [...prev.logs, `> 200 OK: Transaction 0x8F9B committed successfully.`, `> Audit trail entry created.`]
        };
      });
    }, 1500);
  };

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, minWidth: 0, position: "relative", overflow: "hidden", background: "#F6F4EF", cursor: RETICLE_CURSOR }}>
        <div style={{ position: "absolute", inset: 0, transform: child ? `scale(1.8)` : "none", transformOrigin: child ? `${child.x}% ${child.y}%` : "50% 50%", transition: "transform 0.55s cubic-bezier(0.22, 1, 0.36, 1)" }}>
        <div style={{ position: "absolute", top: 18, left: 24, zIndex: 3 }}>
          <div style={{ fontSize: 16, fontWeight: 700 }}>
            Fusion graph <span style={{ fontWeight: 400, color: "#9aa2ab", fontSize: 13 }}>· live model</span>
          </div>
          <div style={{ fontSize: 12.5, color: "#5a646e", marginTop: 3 }}>
            How {co.name} actually moves, inferred from {co.sources.length} systems. Click a node — a “+” chip unfolds its components.
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
          {childNodes.map((c, i) => (
            <line
              key={`c${i}`}
              x1={selNodeView.x} y1={selNodeView.y * 0.62} x2={c.x} y2={c.y * 0.62}
              stroke="rgba(14,124,138,0.5)" strokeWidth={0.13} strokeDasharray="0.6 0.5"
              style={{ animation: "nadirDash 0.9s linear infinite" }}
            />
          ))}
        </svg>
        {gnodes.map((n, i) => (
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
            {(childrenMap[i]?.length ?? 0) > 0 && (
              <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 9.5, color: i === selNode ? "#0E7C8A" : "#9aa2ab", background: "rgba(14,124,138,0.08)", padding: "1px 6px", borderRadius: 8 }}>
                {i === selNode ? "−" : "+"}{childrenMap[i].length}
              </span>
            )}
          </button>
        ))}
        {childNodes.map((c, i) => (
          <button
            key={c.label}
            onClick={() => setSelChild(i)}
            style={{
              position: "absolute", left: `${c.x}%`, top: `${c.y}%`, fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6,
              padding: "5px 11px", background: selChild === i ? "rgba(14,124,138,0.08)" : "#FFFFFF",
              border: `1.5px solid ${selChild === i ? "#0E7C8A" : "rgba(14,124,138,0.35)"}`, borderRadius: 100, cursor: "pointer",
              color: "#14181C", fontSize: 11, fontWeight: 600, whiteSpace: "nowrap", zIndex: 3,
              boxShadow: "0 2px 8px -3px rgba(20,30,40,0.25)", animation: "nadirFadeUp 0.3s ease both",
            }}
          >
            <span style={{ width: 6, height: 6, flex: "none", background: TONE[c.tone], borderRadius: "50%" }} />
            {c.label}
          </button>
        ))}
        </div>
        {child && (
          <button
            onClick={() => setSelChild(null)}
            style={{ position: "absolute", top: 18, right: 20, zIndex: 5, fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, padding: "9px 16px", background: "#14181C", color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", boxShadow: "0 10px 26px -10px rgba(20,30,40,0.5)" }}
          >
            ← Zoom out
          </button>
        )}
      </div>
      <div style={{ width: 320, flex: "none", borderLeft: "1px solid rgba(20,24,28,0.1)", padding: "22px 20px", overflowY: "auto", background: "#FCFBF9" }}>
        <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 14 }}>NODE DETAIL</div>
        {child && (
          <div style={{ padding: 16, background: "#FFFFFF", border: "1.5px solid rgba(14,124,138,0.45)", borderRadius: 10, marginBottom: 16, animation: "nadirFadeUp 0.25s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
              <span style={{ width: 8, height: 8, background: TONE[child.tone], borderRadius: "50%" }} />
              <span style={{ fontSize: 14.5, fontWeight: 700 }}>{child.label}</span>
            </div>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: "#0E7C8A", marginBottom: 8 }}>COMPONENT · {parentLabel.toUpperCase()}</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: "#5a646e", marginBottom: 10 }}>{child.meta}</div>
            <button onClick={() => setSelChild(null)} style={{ fontFamily: "inherit", fontSize: 11.5, fontWeight: 600, color: "#0E7C8A", background: "transparent", border: "none", cursor: "pointer", padding: 0 }}>
              ← Back to {parentLabel}
            </button>
          </div>
        )}
        <div style={{ padding: 16, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 10, marginBottom: 16, opacity: child ? 0.55 : 1 }}>
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
        <div style={{ fontSize: 12, lineHeight: 1.6, color: "#9aa2ab", borderTop: "1px solid rgba(20,24,28,0.08)", paddingTop: 12, marginBottom: 24 }}>
          Nadir inspected the raw schema, proposed what each table represents, and a human confirmed it once. Relationships were inferred from keys, timestamps, and usage.
        </div>

        {/* --- NODE PROPERTIES DEEP DIVE --- */}
        <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 10 }}>PROPERTIES & METADATA</div>
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 10, padding: 14, marginBottom: 24, fontSize: 12.5, color: "#14181C" }}>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(20,24,28,0.06)", paddingBottom: 8, marginBottom: 8 }}>
            <span style={{ color: "#7a848e" }}>Data Source</span>
            <span style={{ fontWeight: 600 }}>{co.sources[0]?.name || "Local Postgres"}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(20,24,28,0.06)", paddingBottom: 8, marginBottom: 8 }}>
            <span style={{ color: "#7a848e" }}>Last Synced</span>
            <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11 }}>2 mins ago</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(20,24,28,0.06)", paddingBottom: 8, marginBottom: 8 }}>
            <span style={{ color: "#7a848e" }}>Owner</span>
            <span style={{ fontWeight: 600 }}>IT Ops Team</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <span style={{ color: "#7a848e" }}>Conf Level</span>
            <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#15854F" }}>99.9% (Confirmed)</span>
          </div>
        </div>

        {/* --- GOTHAM-INSPIRED SEARCH AROUND --- */}
        <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 10 }}>SEARCH AROUND</div>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 24 }}>
          {selNodeView.type === "object" && (
            <>
              <button style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, fontWeight: 600, color: "#0E7C8A", background: "rgba(14,124,138,0.08)", border: "1px solid rgba(14,124,138,0.2)", borderRadius: 100, padding: "4px 10px", cursor: "pointer" }}>[+] Linked Sources</button>
              <button style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, fontWeight: 600, color: "#0E7C8A", background: "rgba(14,124,138,0.08)", border: "1px solid rgba(14,124,138,0.2)", borderRadius: 100, padding: "4px 10px", cursor: "pointer" }}>[+] Active Tasks</button>
              <button style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, fontWeight: 600, color: "#B47614", background: "rgba(180,118,20,0.08)", border: "1px solid rgba(180,118,20,0.2)", borderRadius: 100, padding: "4px 10px", cursor: "pointer" }}>[+] Open Alerts</button>
            </>
          )}
          {selNodeView.type === "source" && (
            <>
              <button style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, fontWeight: 600, color: "#0E7C8A", background: "rgba(14,124,138,0.08)", border: "1px solid rgba(14,124,138,0.2)", borderRadius: 100, padding: "4px 10px", cursor: "pointer" }}>[+] Derived Objects</button>
              <button style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, fontWeight: 600, color: "#0E7C8A", background: "rgba(14,124,138,0.08)", border: "1px solid rgba(14,124,138,0.2)", borderRadius: 100, padding: "4px 10px", cursor: "pointer" }}>[+] Ingestion Logs</button>
            </>
          )}
          {selNodeView.type === "process" && (
            <>
              <button style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, fontWeight: 600, color: "#C7452F", background: "rgba(199,69,47,0.08)", border: "1px solid rgba(199,69,47,0.2)", borderRadius: 100, padding: "4px 10px", cursor: "pointer" }}>[+] Blocking Risks</button>
              <button style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, fontWeight: 600, color: "#0E7C8A", background: "rgba(14,124,138,0.08)", border: "1px solid rgba(14,124,138,0.2)", borderRadius: 100, padding: "4px 10px", cursor: "pointer" }}>[+] Involved Objects</button>
            </>
          )}
          {selNodeView.type === "risk" && (
            <>
              <button style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, fontWeight: 600, color: "#C7452F", background: "rgba(199,69,47,0.08)", border: "1px solid rgba(199,69,47,0.2)", borderRadius: 100, padding: "4px 10px", cursor: "pointer" }}>[+] Affected Processes</button>
              <button style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, fontWeight: 600, color: "#B47614", background: "rgba(180,118,20,0.08)", border: "1px solid rgba(180,118,20,0.2)", borderRadius: 100, padding: "4px 10px", cursor: "pointer" }}>[+] Related Incidents</button>
            </>
          )}
        </div>

        {/* --- GOTHAM-INSPIRED TASK & ACTIONS PANEL --- */}
        <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 10 }}>ACTIVE TASKS & ACTIONS</div>
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 10, overflow: "hidden" }}>
          <div style={{ padding: 14, borderBottom: "1px solid rgba(20,24,28,0.08)" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#14181C" }}>{selNodeView.type === "risk" ? "Urgent Remediation" : "Standard Review"}</div>
              <span style={{ fontSize: 11, fontWeight: 600, color: selNodeView.type === "risk" ? "#C7452F" : "#B47614", background: selNodeView.type === "risk" ? "rgba(199,69,47,0.1)" : "rgba(180,118,20,0.1)", padding: "2px 6px", borderRadius: 4 }}>PENDING</span>
            </div>
            <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.5 }}>
              {selNodeView.type === "source" ? "Verify schema sync status and map consistency." : "Ensure compliance parameters are within normal ranges."}
            </div>
          </div>
          <div style={{ padding: 14, background: "#FCFBF9" }}>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, letterSpacing: "0.08em", color: "#7a848e", marginBottom: 8 }}>EXECUTE WEBHOOK</div>
            <select 
              value={selectedAction}
              onChange={(e) => setSelectedAction(e.target.value)}
              style={{ width: "100%", padding: "8px 10px", borderRadius: 6, border: "1px solid rgba(20,24,28,0.2)", fontSize: 13, fontFamily: "inherit", cursor: "pointer", marginBottom: 10, appearance: "none", background: "#FFFFFF" }}
            >
              <option value="">Select an action...</option>
              {selNodeView.type === "object" && (
                <>
                  <option value="Log Lockout/Tagout">Log Lockout/Tagout</option>
                  <option value="Assign Certified Operator">Assign Certified Operator</option>
                  <option value="Approve Supervisor Sign-off">Approve Supervisor Sign-off</option>
                </>
              )}
              {selNodeView.type === "source" && (
                <>
                  <option value="Trigger Manual Sync">Trigger Manual Sync</option>
                  <option value="View Raw Schema">View Raw Schema</option>
                </>
              )}
              {selNodeView.type === "process" && (
                <>
                  <option value="Halt Process (Emergency)">Halt Process (Emergency)</option>
                  <option value="Escalate to Manager">Escalate to Manager</option>
                </>
              )}
              {selNodeView.type === "risk" && (
                <>
                  <option value="Dispatch Remediation Ticket">Dispatch Remediation Ticket</option>
                  <option value="Silence Alert (24h)">Silence Alert (24h)</option>
                </>
              )}
            </select>
            <button onClick={handleRunAction} style={{ width: "100%", padding: "8px", borderRadius: 6, border: "none", background: "#14181C", color: "#FFFFFF", fontSize: 13, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
              Run Action
            </button>
          </div>
        </div>
      </div>

      {/* Webhook Terminal Modal */}
      {webhookTerminal && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(20,24,28,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 600, background: "#14181C", borderRadius: 8, overflow: "hidden", boxShadow: "0 20px 40px rgba(0,0,0,0.4)" }}>
            <div style={{ padding: "12px 16px", borderBottom: "1px solid rgba(255,255,255,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#0c0f12" }}>
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 12, color: "#9aa2ab", letterSpacing: "0.05em" }}>
                SECURE WEBHOOK TERMINAL · {co.sources[0]?.name || "SAP ERP"}
              </div>
              <button onClick={() => setWebhookTerminal(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#5a646e" }}>×</button>
            </div>
            <div style={{ padding: 24, minHeight: 200, fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 13, color: "#15854F", lineHeight: 1.6, background: "#14181C" }}>
              {webhookTerminal.logs.map((log, idx) => (
                <div key={idx} style={{ marginBottom: 4, color: log.includes("Error") ? "#C7452F" : log.includes("OK") ? "#15854F" : "#9aa2ab" }}>
                  {log}
                </div>
              ))}
              <div style={{ marginTop: 12, display: "inline-block", width: 8, height: 16, background: "#15854F", animation: "nadirBlink 1s infinite" }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
