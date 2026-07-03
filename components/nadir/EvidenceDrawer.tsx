"use client";

import { useNadir } from "./context";
import ChecklistForm from "./ChecklistForm";
import OntologyGraph from "./OntologyGraph";
import ActionModal from "./ActionModal";
import { useState } from "react";
import styles from "./nadir.module.css";

const MONO = "var(--font-ibm-plex-mono), monospace";

export default function EvidenceDrawer() {
  const { co, alertMeta, evidenceIdx, closeEvidence, dataDecision, onDataDecision, alertEscalated, escalateAlert, onSend, setScreen } = useNadir();
  const [showGraph, setShowGraph] = useState(false);
  const [showEscalateModal, setShowEscalateModal] = useState(false);
  if (evidenceIdx === null) return null;
  const alert = co.alerts[evidenceIdx];
  const meta = alertMeta[evidenceIdx];
  if (!alert || !meta) return null;
  const owner = co.people[meta.owner];
  const escalated = alertEscalated(evidenceIdx);
  const escTarget = owner.manager || "leadership";

  return (
    <>
      <div style={{ position: "absolute", inset: 0, zIndex: 44, background: "rgba(20,24,28,0.18)" }} onClick={closeEvidence} />
      <div style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 420, zIndex: 45, background: "#FFFFFF", borderLeft: "1px solid rgba(20,24,28,0.14)", boxShadow: "-24px 0 60px -30px rgba(20,30,40,0.4)", display: "flex", flexDirection: "column", animation: "nadirFadeUp 0.25s ease" }}>
        <div style={{ padding: "18px 22px 14px", borderBottom: "1px solid rgba(20,24,28,0.1)", flex: "none" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 9 }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: alert.color }} />
            <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.08em", color: alert.color }}>{alert.sev} · {alert.time}</span>
            <button onClick={closeEvidence} style={{ marginLeft: "auto", fontFamily: "inherit", background: "transparent", border: "none", color: "#9aa2ab", fontSize: 19, cursor: "pointer", lineHeight: 1 }}>×</button>
          </div>
          <div style={{ fontSize: 15.5, fontWeight: 700, lineHeight: 1.4, marginBottom: 4 }}>{alert.title}</div>
          <div style={{ fontFamily: MONO, fontSize: 10.5, color: "#9aa2ab" }}>{alert.loc}</div>
          {alert.plain && <div style={{ fontSize: 12, lineHeight: 1.5, color: "#0E7C8A", fontStyle: "italic", marginTop: 6 }}>In plain terms: {alert.plain}</div>}
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "18px 22px", display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "#7a848e" }}>EVIDENCE · EVERY NUMBER IS A DOOR</div>
              <button 
                onClick={() => setShowGraph(true)}
                style={{ fontFamily: "inherit", fontSize: 10, fontWeight: 700, padding: "4px 8px", background: "rgba(14,124,138,0.1)", color: "#0E7C8A", border: "1px solid rgba(14,124,138,0.3)", borderRadius: 4, cursor: "pointer" }}
              >
                ⎈ View Data Lineage
              </button>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {meta.evidence.map((e, i) => (
                <div key={i} style={{ padding: "11px 13px", background: "#FCFBF9", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 9 }}>
                  <div style={{ fontFamily: MONO, fontSize: 10.5, color: "#0E7C8A", marginBottom: 4 }}>⌕ {e.source}</div>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 3 }}>{e.record}</div>
                  <div style={{ fontSize: 12, lineHeight: 1.55, color: "#5a646e" }}>{e.note}</div>
                </div>
              ))}
            </div>
          </div>

          {meta.suspect && (
            <div style={{ padding: 14, background: "rgba(180,118,20,0.06)", border: "1px solid rgba(180,118,20,0.4)", borderRadius: 10 }}>
              <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.1em", color: "#B47614", marginBottom: 8 }}>NADIR IS QUESTIONING THIS DATA</div>
              {!dataDecision ? (
                <>
                  <div style={{ fontSize: 13, lineHeight: 1.6, color: "#2a333c", marginBottom: 12 }}>{meta.suspect.question}</div>
                  <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    <button onClick={() => onDataDecision(evidenceIdx, "wrong")} style={{ fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, padding: "9px 12px", background: "#14181C", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer", textAlign: "left" }}>
                      {meta.suspect.wrongLabel}
                    </button>
                    <button onClick={() => onDataDecision(evidenceIdx, "correct")} style={{ fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, padding: "9px 12px", background: "transparent", color: "#14181C", border: "1px solid rgba(20,24,28,0.25)", borderRadius: 7, cursor: "pointer", textAlign: "left" }}>
                      {meta.suspect.correctLabel}
                    </button>
                  </div>
                </>
              ) : (
                <div style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <span style={{ color: "#15854F", fontWeight: 700, flex: "none" }}>✓</span>
                  <div style={{ fontSize: 12.5, lineHeight: 1.6, color: "#2a333c" }}>
                    {dataDecision === "wrong" ? meta.suspect.wrongResult : meta.suspect.correctResult}
                    <div style={{ fontFamily: MONO, fontSize: 10.5, color: "#9aa2ab", marginTop: 6 }}>Logged to the audit trail · data-quality profile updated</div>
                  </div>
                </div>
              )}
            </div>
          )}

          {co.id === "aerospace" && (
            <div>
              <ChecklistForm onSubmit={() => {}} />
            </div>
          )}

          <div>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 10 }}>OWNER & ESCALATION</div>
            <div style={{ padding: "12px 13px", background: "#FCFBF9", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 9 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
                <span style={{ fontSize: 13, fontWeight: 700 }}>{owner.name}</span>
                <span style={{ fontFamily: MONO, fontSize: 10, color: "#9aa2ab" }}>{owner.dept}</span>
                {owner.pto && <span style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.06em", color: "#B47614", background: "rgba(180,118,20,0.12)", padding: "1px 6px", borderRadius: 4 }}>ON PTO</span>}
              </div>
              {owner.manager && <div style={{ fontSize: 11.5, color: "#9aa2ab", marginBottom: 10 }}>↑ Reports to <span style={{ color: "#5a646e", fontWeight: 600 }}>{owner.manager}</span></div>}
              <button
                onClick={() => setShowEscalateModal(true)}
                disabled={escalated}
                style={{
                  fontFamily: "inherit", fontSize: 12, fontWeight: 700, padding: "8px 13px", borderRadius: 6, width: "100%",
                  cursor: escalated ? "default" : "pointer",
                  background: escalated ? "rgba(21,133,79,0.1)" : "rgba(180,118,20,0.1)",
                  color: escalated ? "#15854F" : "#8a5a10",
                  border: `1px solid ${escalated ? "rgba(21,133,79,0.4)" : "rgba(180,118,20,0.45)"}`,
                }}
              >
                {escalated ? `✓ Escalated to ${escTarget}` : `Escalate to ${escTarget} ↑${owner.pto ? " (owner on PTO)" : ""}`}
              </button>
            </div>
          </div>
        </div>

        <div style={{ padding: "14px 22px", borderTop: "1px solid rgba(20,24,28,0.1)", display: "flex", gap: 8, flex: "none" }}>
          <button
            onClick={() => { closeEvidence(); setScreen("chat"); onSend(alert.q); }}
            style={{ fontFamily: "inherit", flex: 1, fontSize: 12.5, fontWeight: 700, padding: "10px 12px", background: "#0E7C8A", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer" }}
          >
            Ask Nadir →
          </button>
          <button
            onClick={() => { closeEvidence(); setScreen("map"); }}
            className={styles.ghostBtn}
            style={{ fontFamily: "inherit", flex: 1, fontSize: 12.5, fontWeight: 600, padding: "10px 12px", background: "transparent", color: "#5a646e", border: "1px solid rgba(20,24,28,0.16)", borderRadius: 7, cursor: "pointer" }}
          >
            View on ops map
          </button>
        </div>
      </div>

      {showGraph && (
        <div style={{ position: "absolute", inset: 0, zIndex: 60, background: "rgba(20,24,28,0.7)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
          <div style={{ width: "90%", height: "90%", background: "#FFFFFF", borderRadius: 12, overflow: "hidden", display: "flex", flexDirection: "column", boxShadow: "0 24px 60px rgba(0,0,0,0.4)" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(20,24,28,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FCFBF9" }}>
              <div style={{ fontSize: 15, fontWeight: 700 }}>Data Lineage Explorer</div>
              <button onClick={() => setShowGraph(false)} style={{ fontFamily: "inherit", background: "transparent", border: "none", color: "#9aa2ab", fontSize: 24, cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ flex: 1, position: "relative" }}>
              <OntologyGraph graph={co.graph} />
            </div>
          </div>
        </div>
      )}

      {showEscalateModal && (
        <ActionModal
          title={`Escalating to ${escTarget}`}
          steps={[
            "Locating chain of command...",
            "Verifying PTO schedule...",
            "Paging leadership...",
            "Logging escalation..."
          ]}
          onComplete={() => escalateAlert(evidenceIdx)}
          onClose={() => setShowEscalateModal(false)}
        />
      )}
    </>
  );
}
