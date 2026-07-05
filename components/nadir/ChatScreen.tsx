"use client";

import { useEffect, useState } from "react";
import { useNadir } from "./context";
import styles from "./nadir.module.css";

// Nadir's replies type themselves out on arrival — the Tony-Stark feel. Runs
// once when the message mounts and always completes; older messages, already
// mounted, stay put.
function Typewriter({ text }: { text: string }) {
  const [shown, setShown] = useState("");
  useEffect(() => {
    let i = 0;
    const step = Math.max(1, Math.round(text.length / 90));
    const id = setInterval(() => {
      i += step;
      setShown(i >= text.length ? text : text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
    // mount-only: each message has a stable key, so text never changes for an instance
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return <>{shown}{shown.length < text.length && <span style={{ opacity: 0.5 }}>▍</span>}</>;
}

export default function ChatScreen() {
  const { co, messages, typing, draft, setDraft, onSend, chatScrollRef, alertsSide, actionTitle, actionDesc, onSendSnapshot, onOpenSource, approval, approver } = useNadir();

  const [briefOpen, setBriefOpen] = useState(false);
  const [dropOpen, setDropOpen] = useState(false);
  const snapshotStyles = {
    none: { label: "Send for approval →", bg: "#0E7C8A", fg: "#FFFFFF", bd: "none" },
    pending: { label: `Sent to ${approver.name.split(" · ")[0]} — awaiting approval…`, bg: "rgba(180,118,20,0.12)", fg: "#8a5a10", bd: "1px solid rgba(180,118,20,0.4)" },
    approved: { label: "✓ Approved — executing plan", bg: "rgba(21,133,79,0.12)", fg: "#15854F", bd: "1px solid rgba(21,133,79,0.4)" },
  }[approval];

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div ref={chatScrollRef} style={{ flex: 1, overflowY: "auto", padding: "28px 36px 12px", display: "flex", flexDirection: "column", gap: 18 }}>
          {messages.map((m, i) => {
            const user = m.role === "user";
            const hasCites = (m.cites || []).length > 0;
            return (
              <div key={i} style={{ display: "flex", flexDirection: "column", gap: 8, alignItems: user ? "flex-end" : "flex-start" }}>
                <div
                  style={{
                    maxWidth: 680, padding: "14px 18px", borderRadius: user ? "12px 12px 3px 12px" : "12px 12px 12px 3px",
                    background: user ? "rgba(14,124,138,0.08)" : "#FFFFFF", border: `1px solid ${user ? "rgba(14,124,138,0.3)" : "rgba(20,24,28,0.1)"}`,
                    fontSize: 14.5, lineHeight: 1.65, color: "#14181C", whiteSpace: "pre-line",
                  }}
                >
                  {user ? m.text : <Typewriter key={i} text={m.text} />}
                </div>
                {hasCites && (
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 6, maxWidth: 680 }}>
                    {m.cites.map((ct, ci) => (
                      <span key={ci} style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#0E7C8A", background: "rgba(14,124,138,0.07)", border: "1px solid rgba(14,124,138,0.25)", padding: "3px 9px", borderRadius: 5 }}>
                        ⌕ {ct}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
          {typing && (
            <div style={{ display: "flex", gap: 5, padding: "16px 18px", background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: "12px 12px 12px 3px", width: "fit-content" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0E7C8A", animation: "nadirTyping 1.1s infinite" }} />
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0E7C8A", animation: "nadirTyping 1.1s infinite 0.18s" }} />
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0E7C8A", animation: "nadirTyping 1.1s infinite 0.36s" }} />
            </div>
          )}
        </div>
        <div style={{ padding: "12px 36px 20px", flex: "none" }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 12 }}>
            {co.suggestions.map((sg) => (
              <button
                key={sg}
                onClick={() => onSend(sg)}
                className={styles.chip}
                style={{ fontFamily: "inherit", fontSize: 12.5, fontWeight: 500, padding: "7px 14px", background: "#FFFFFF", color: "#5a646e", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 100, cursor: "pointer" }}
              >
                {sg}
              </button>
            ))}
          </div>
          <div className={styles.inputWrap} style={{ display: "flex", gap: 10, alignItems: "center", background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 12, padding: "6px 6px 6px 18px" }}>
            <input
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              onKeyDown={(e) => { if (e.key === "Enter") onSend(); }}
              placeholder="Ask about your operation — or drop files here…"
              style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#14181C", fontFamily: "inherit", fontSize: 15, padding: "10px 0" }}
            />
            <button
              title="Add a file or note"
              onClick={() => setDropOpen(true)}
              className={styles.iconBtn}
              style={{ fontFamily: "inherit", fontSize: 18, width: 40, height: 40, background: "transparent", color: "#7a848e", border: "none", borderRadius: 8, cursor: "pointer" }}
            >
              +
            </button>
            <button
              onClick={() => onSend()}
              style={{ fontFamily: "inherit", fontSize: 14, fontWeight: 700, padding: "0 20px", height: 40, background: "#0E7C8A", color: "#FFFFFF", border: "none", borderRadius: 8, cursor: "pointer" }}
            >
              Send
            </button>
          </div>
        </div>
      </div>

      <div style={{ width: 320, flex: "none", borderLeft: "1px solid rgba(20,24,28,0.1)", overflowY: "auto", padding: "22px 20px", display: "flex", flexDirection: "column", gap: 24, background: "#FCFBF9" }}>
        <div>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 6 }}>WHAT NADIR IS READING</div>
          <div style={{ fontSize: 11.5, color: "#9aa2ab", marginBottom: 12 }}>Click a source to see how it maps →</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {co.sources.map((src) => (
              <button
                key={src.name}
                onClick={() => onOpenSource(src.node)}
                className={styles.sourceCard}
                style={{ textAlign: "left", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px", background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 8, cursor: "pointer", width: "100%", color: "inherit" }}
              >
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#15854F", flex: "none" }} />
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{src.name}</div>
                  <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: "#9aa2ab" }}>{src.meta}</div>
                </div>
                <span style={{ color: "#b7bec5", fontSize: 15 }}>→</span>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 12 }}>PAIN POINTS · LIVE</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {alertsSide.map((al) => (
              <button
                key={al.title}
                onClick={al.onEvidence}
                title="View evidence"
                className={styles.alertCard}
                style={{ textAlign: "left", fontFamily: "inherit", display: "flex", gap: 10, padding: "11px 12px", background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 8, cursor: "pointer", width: "100%", color: "inherit", opacity: al.opacity }}
              >
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: al.color, flex: "none", marginTop: 4, animation: al.anim }} />
                <div>
                  <div style={{ fontSize: 12.5, fontWeight: 600, lineHeight: 1.4 }}>{al.title}</div>
                  <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: "#9aa2ab", marginTop: 3 }}>{al.subLabel}</div>
                  {al.plain && <div style={{ fontSize: 11, lineHeight: 1.45, color: "#0E7C8A", fontStyle: "italic", marginTop: 4 }}>{al.plain}</div>}
                </div>
              </button>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 12 }}>SUGGESTED ACTION</div>
          <div style={{ padding: 14, background: "rgba(14,124,138,0.05)", border: "1px solid rgba(14,124,138,0.25)", borderRadius: 10 }}>
            <div style={{ fontSize: 13.5, fontWeight: 600, marginBottom: 6 }}>{actionTitle}</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "#5a646e", marginBottom: 12 }}>{actionDesc}</div>
            <button
              onClick={() => (approval === "none" ? onSendSnapshot() : setBriefOpen(true))}
              style={{
                fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, width: "100%", padding: 9, borderRadius: 7,
                cursor: "pointer",
                background: snapshotStyles.bg, color: snapshotStyles.fg, border: snapshotStyles.bd,
              }}
            >
              {snapshotStyles.label}
            </button>
            {approval === "approved" && (
              <div style={{ fontSize: 11.5, lineHeight: 1.55, color: "#5a646e", marginTop: 8, fontStyle: "italic" }}>
                “{approver.reply}”
              </div>
            )}
            {approval !== "none" && (
              <div style={{ fontSize: 10.5, color: "#9aa2ab", marginTop: 6, textAlign: "center" }}>click to open the briefing</div>
            )}
          </div>
        </div>
      </div>

      {dropOpen && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 58, background: "rgba(20,24,28,0.35)" }} onClick={() => setDropOpen(false)} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 59, width: 460, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 14, boxShadow: "0 40px 90px -30px rgba(20,30,40,0.5)", padding: "22px 24px", animation: "nadirFadeUp 0.22s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ fontSize: 15.5, fontWeight: 700 }}>Give Nadir more to work with</div>
              <button onClick={() => setDropOpen(false)} style={{ marginLeft: "auto", fontFamily: "inherit", background: "transparent", border: "none", color: "#9aa2ab", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.55, marginBottom: 16 }}>
              Drop a file, paste a note, or describe something — Nadir folds it into what it already knows about {co.name}. It stays right here; nothing navigates away.
            </div>
            <div style={{ border: "1.5px dashed rgba(14,124,138,0.5)", borderRadius: 10, padding: "26px 16px", textAlign: "center", background: "rgba(14,124,138,0.04)", marginBottom: 14 }}>
              <div style={{ fontSize: 26, marginBottom: 6 }}>⊕</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#0E7C8A" }}>Drop a file here</div>
              <div style={{ fontSize: 11.5, color: "#9aa2ab", marginTop: 3 }}>CSV, Excel, PDF, or an export — read-only, sampled, never stored whole</div>
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button onClick={() => setDropOpen(false)} style={{ flex: 1, fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "10px 0", borderRadius: 8, border: "none", background: "#0E7C8A", color: "#fff", cursor: "pointer" }}>Choose a file…</button>
              <button onClick={() => { setDropOpen(false); onOpenSource(0); }} style={{ flex: 1, fontFamily: "inherit", fontSize: 13, fontWeight: 600, padding: "10px 0", borderRadius: 8, border: "1px solid rgba(20,24,28,0.16)", background: "#fff", color: "#5a646e", cursor: "pointer" }}>Connect a database instead →</button>
            </div>
          </div>
        </>
      )}

      {briefOpen && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 58, background: "rgba(20,24,28,0.35)" }} onClick={() => setBriefOpen(false)} />
          <div style={{ position: "fixed", top: "50%", left: "50%", transform: "translate(-50%,-50%)", zIndex: 59, width: 620, maxHeight: "82vh", overflowY: "auto", background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 14, boxShadow: "0 40px 90px -30px rgba(20,30,40,0.5)", padding: "26px 30px", animation: "nadirFadeUp 0.25s ease" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 4 }}>
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.12em", color: "#0E7C8A" }}>ONE-PAGE BRIEFING · DRAFTED BY NADIR</div>
              <button onClick={() => setBriefOpen(false)} style={{ marginLeft: "auto", fontFamily: "inherit", background: "transparent", border: "none", color: "#9aa2ab", fontSize: 20, cursor: "pointer", lineHeight: 1 }}>×</button>
            </div>
            <div style={{ fontFamily: "var(--font-newsreader), serif", fontSize: 25, lineHeight: 1.2, marginBottom: 4 }}>{actionTitle}</div>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: "#9aa2ab", marginBottom: 20 }}>To: {approver.name} · From: Nadir, on your behalf · {co.name}</div>

            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 8 }}>THE SITUATION</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 18 }}>
              {co.alerts.map((a) => (
                <div key={a.title} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: a.color, flex: "none", marginTop: 5 }} />
                  <div style={{ fontSize: 13, lineHeight: 1.55, color: "#2a333c" }}>
                    <strong>{a.title}.</strong> {a.plain || a.detail}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 8 }}>PROPOSED FIX</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 7, marginBottom: 18 }}>
              {co.plan.cols[0].items.concat(co.plan.cols[1].items).map((it) => (
                <div key={it.t} style={{ display: "flex", gap: 9, alignItems: "flex-start" }}>
                  <span style={{ color: "#0E7C8A", fontWeight: 700, flex: "none" }}>→</span>
                  <div style={{ fontSize: 13, lineHeight: 1.55, color: "#2a333c" }}><strong>{it.t}.</strong> {it.d}</div>
                </div>
              ))}
            </div>

            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 8 }}>IF WE DO THIS</div>
            <div style={{ fontSize: 13, lineHeight: 1.6, color: "#2a333c", marginBottom: 18, padding: "12px 14px", background: "rgba(21,133,79,0.06)", border: "1px solid rgba(21,133,79,0.3)", borderRadius: 9 }}>{co.plan.why}</div>

            <div style={{ borderTop: "1px solid rgba(20,24,28,0.1)", paddingTop: 14, display: "flex", gap: 10, alignItems: "center" }}>
              <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, letterSpacing: "0.08em", color: approval === "approved" ? "#15854F" : "#B47614", background: approval === "approved" ? "rgba(21,133,79,0.1)" : "rgba(180,118,20,0.1)", border: `1px solid ${approval === "approved" ? "rgba(21,133,79,0.4)" : "rgba(180,118,20,0.4)"}`, padding: "4px 10px", borderRadius: 5 }}>
                {approval === "approved" ? "✓ APPROVED" : "AWAITING APPROVAL"}
              </span>
              {approval === "approved" && <span style={{ fontSize: 12.5, fontStyle: "italic", color: "#5a646e" }}>“{approver.reply}”</span>}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
