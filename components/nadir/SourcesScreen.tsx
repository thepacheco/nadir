"use client";

import { OB_LABELS, SRC_TYPES } from "@/lib/constants";
import { useNadir } from "./context";
import styles from "./nadir.module.css";

export default function SourcesScreen() {
  const { co, obStep, obSrc, setObSrc, obNext, obConfirmed, onConfirmMapping, onConfirmAll, allConfirmed, obRestart, goMap } = useNadir();

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
      <div style={{ maxWidth: 860, margin: "0 auto" }}>
        <div style={{ marginBottom: 26, textAlign: "center" }}>
          <div style={{ fontSize: 19, fontWeight: 700 }}>Connect a data source</div>
          <div style={{ fontSize: 13.5, color: "#7a848e", marginTop: 4 }}>Read-only, schema-level. No forms, no manual entry — Nadir reads how you already store data.</div>
        </div>

        <div style={{ display: "flex", justifyContent: "center", gap: 0, marginBottom: 34 }}>
          {OB_LABELS.map((label, i) => {
            const n = i + 1;
            const done = obStep > n;
            const active = obStep === n;
            return (
              <div key={label} style={{ display: "flex", alignItems: "center" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                  <span
                    style={{
                      width: 26, height: 26, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 12, fontWeight: 600,
                      background: done ? "rgba(21,133,79,0.12)" : active ? "rgba(14,124,138,0.12)" : "transparent",
                      color: done ? "#15854F" : active ? "#0E7C8A" : "#b7bec5",
                      border: `1.5px solid ${done ? "rgba(21,133,79,0.4)" : active ? "rgba(14,124,138,0.5)" : "rgba(20,24,28,0.14)"}`,
                    }}
                  >
                    {done ? "✓" : n}
                  </span>
                  <span style={{ fontSize: 12.5, fontWeight: 600, color: active ? "#14181C" : "#b7bec5" }}>{label}</span>
                </div>
                {i < OB_LABELS.length - 1 && <div style={{ width: 54, height: 1, background: "rgba(20,24,28,0.14)", margin: "0 14px" }} />}
              </div>
            );
          })}
        </div>

        {obStep === 1 && (
          <>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
              {SRC_TYPES.map((os, i) => {
                const sel = obSrc === i;
                return (
                  <button
                    key={os.name}
                    onClick={() => setObSrc(i)}
                    className={styles.obSourceCard}
                    style={{
                      fontFamily: "inherit", textAlign: "left", padding: "20px 18px", background: sel ? "rgba(14,124,138,0.07)" : "#FFFFFF",
                      border: `1.5px solid ${sel ? "rgba(14,124,138,0.6)" : "rgba(20,24,28,0.1)"}`, borderRadius: 12, cursor: "pointer", color: "#14181C",
                    }}
                  >
                    <span style={{ display: "block", width: 12, height: 12, borderRadius: os.shape, background: os.dot, marginBottom: 12 }} />
                    <span style={{ display: "block", fontSize: 14.5, fontWeight: 700, marginBottom: 4 }}>{os.name}</span>
                    <span style={{ display: "block", fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#9aa2ab" }}>{os.kind}</span>
                  </button>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 22 }}>
              <button
                onClick={obNext}
                style={{ fontFamily: "inherit", fontSize: 14, fontWeight: 700, padding: "12px 26px", background: obSrc >= 0 ? "#0E7C8A" : "rgba(20,24,28,0.1)", color: obSrc >= 0 ? "#FFFFFF" : "#b7bec5", border: "none", borderRadius: 8, cursor: obSrc >= 0 ? "pointer" : "default" }}
              >
                Connect →
              </button>
            </div>
          </>
        )}

        {obStep === 2 && (
          <>
            <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden" }}>
              <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(20,24,28,0.08)", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ position: "relative", width: 120, height: 5, background: "rgba(20,24,28,0.08)", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ position: "absolute", top: 0, left: 0, width: "34%", height: "100%", background: "#0E7C8A", borderRadius: 3, animation: "nadirScan 1.4s ease-in-out infinite" }} />
                </div>
                <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 12, color: "#0E7C8A" }}>Inspecting schema — {co.obTables.length} tables found</span>
              </div>
              {co.obTables.map((tb) => (
                <div key={tb.name} style={{ padding: "12px 20px", borderBottom: "1px solid rgba(20,24,28,0.06)", display: "flex", alignItems: "center", gap: 14 }}>
                  <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 12.5, color: "#14181C", width: 220 }}>{tb.name}</span>
                  <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#9aa2ab" }}>{tb.rows} rows</span>
                  <span style={{ marginLeft: "auto", width: 7, height: 7, borderRadius: "50%", background: "#15854F" }} />
                </div>
              ))}
            </div>
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 22 }}>
              <button onClick={obNext} style={{ fontFamily: "inherit", fontSize: 14, fontWeight: 700, padding: "12px 26px", background: "#0E7C8A", color: "#FFFFFF", border: "none", borderRadius: 8, cursor: "pointer" }}>
                Map objects →
              </button>
            </div>
          </>
        )}

        {obStep === 3 && (
          <>
            <div style={{ fontSize: 13, color: "#5a646e", marginBottom: 14, lineHeight: 1.6 }}>
              Nadir proposes what each table <em>actually represents in the real world</em>. Confirm once — relationships are inferred automatically after that.
            </div>
            <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden" }}>
              {co.obMappings.map((mp, i) => {
                const c = !!obConfirmed[i];
                return (
                  <div key={mp.table} style={{ padding: "13px 20px", borderBottom: "1px solid rgba(20,24,28,0.06)", display: "flex", alignItems: "center", gap: 14 }}>
                    <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 12.5, color: "#7a848e", width: 200 }}>{mp.table}</span>
                    <span style={{ color: "#9aa2ab" }}>→</span>
                    <span style={{ fontSize: 13.5, fontWeight: 600 }}>{mp.proposed}</span>
                    <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: "#9aa2ab" }}>{mp.conf}</span>
                    <button
                      onClick={() => onConfirmMapping(i)}
                      style={{
                        marginLeft: "auto", fontFamily: "inherit", fontSize: 12, fontWeight: 700, padding: "6px 14px", borderRadius: 6, cursor: "pointer",
                        background: c ? "rgba(21,133,79,0.1)" : "transparent", color: c ? "#15854F" : "#0E7C8A",
                        border: `1px solid ${c ? "rgba(21,133,79,0.4)" : "rgba(14,124,138,0.4)"}`,
                      }}
                    >
                      {c ? "✓ Confirmed" : "Confirm"}
                    </button>
                  </div>
                );
              })}
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", marginTop: 22 }}>
              <button onClick={onConfirmAll} className={styles.ghostBtn} style={{ fontFamily: "inherit", fontSize: 13, fontWeight: 600, padding: "12px 20px", background: "transparent", color: "#5a646e", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 8, cursor: "pointer" }}>
                Confirm all
              </button>
              <button
                onClick={obNext}
                style={{ fontFamily: "inherit", fontSize: 14, fontWeight: 700, padding: "12px 26px", background: allConfirmed ? "#0E7C8A" : "rgba(20,24,28,0.1)", color: allConfirmed ? "#FFFFFF" : "#b7bec5", border: "none", borderRadius: 8, cursor: allConfirmed ? "pointer" : "default" }}
              >
                Build the graph →
              </button>
            </div>
          </>
        )}

        {obStep === 4 && (
          <div style={{ textAlign: "center", padding: "40px 20px" }}>
            <div style={{ width: 58, height: 58, border: "3px solid #15854F", borderRadius: "50%", margin: "0 auto 22px", position: "relative" }}>
              <div style={{ position: "absolute", left: "50%", bottom: 7, transform: "translateX(-50%)", width: 11, height: 11, borderRadius: "50%", background: "#15854F" }} />
            </div>
            <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 10 }}>Your operational graph is live.</div>
            <div style={{ fontSize: 14, color: "#5a646e", lineHeight: 1.6, maxWidth: 440, margin: "0 auto 28px" }}>
              {co.obDone} Every new source you plug in makes the model sharper — this is where the compounding starts.
            </div>
            <div style={{ display: "flex", gap: 12, justifyContent: "center" }}>
              <button onClick={goMap} style={{ fontFamily: "inherit", fontSize: 14, fontWeight: 700, padding: "13px 26px", background: "#0E7C8A", color: "#FFFFFF", border: "none", borderRadius: 8, cursor: "pointer" }}>
                Open the ops map →
              </button>
              <button onClick={obRestart} style={{ fontFamily: "inherit", fontSize: 14, fontWeight: 600, padding: "13px 26px", background: "transparent", color: "#5a646e", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 8, cursor: "pointer" }}>
                Connect another source
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
