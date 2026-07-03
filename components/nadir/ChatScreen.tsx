"use client";

import { useNadir } from "./context";
import styles from "./nadir.module.css";

export default function ChatScreen() {
  const { co, messages, typing, draft, setDraft, onSend, chatScrollRef, alertsSide, actionTitle, actionDesc, onSendSnapshot, onOpenSource, onAttach, approval, approver } = useNadir();

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
                  {m.text}
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
              title="Attach files"
              onClick={onAttach}
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
              onClick={onSendSnapshot}
              style={{
                fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, width: "100%", padding: 9, borderRadius: 7,
                cursor: approval === "none" ? "pointer" : "default",
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
          </div>
        </div>
      </div>
    </div>
  );
}
