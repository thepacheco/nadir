"use client";

import { useNadir } from "./context";
import styles from "./nadir.module.css";

export default function TeamScreen() {
  const { people, selPersonView, thread, msgSent, onSendMsg } = useNadir();

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
      <div style={{ width: 340, flex: "none", borderRight: "1px solid rgba(20,24,28,0.1)", overflowY: "auto", padding: 20, background: "#FCFBF9" }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 3 }}>Team &amp; inbox</div>
        <div style={{ fontSize: 12.5, color: "#7a848e", marginBottom: 16 }}>Departments you oversee. Nadir routes each pain point to the right owner.</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {people.map((p) => (
            <button
              key={p.name}
              onClick={p.onSelect}
              className={styles.personBtn}
              style={{
                textAlign: "left", fontFamily: "inherit", display: "flex", gap: 12, padding: "12px 13px",
                background: p.active ? "rgba(14,124,138,0.06)" : "#FFFFFF", border: `1px solid ${p.active ? "rgba(14,124,138,0.4)" : "rgba(20,24,28,0.1)"}`,
                borderRadius: 10, cursor: "pointer", width: "100%", color: "inherit", alignItems: "center",
              }}
            >
              <span style={{ width: 36, height: 36, borderRadius: "50%", background: p.avBg, color: p.avFg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 13, flex: "none", position: "relative" }}>
                {p.initials}
                <span style={{ position: "absolute", right: -1, bottom: -1, width: 10, height: 10, borderRadius: "50%", background: p.statusColor, border: "2px solid #FCFBF9" }} />
              </span>
              <div style={{ minWidth: 0, flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ fontSize: 13.5, fontWeight: 700 }}>{p.name}</span>
                  <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, color: "#9aa2ab" }}>{p.dept}</span>
                </div>
                <div style={{ fontSize: 12, color: "#5a646e", marginTop: 2, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{p.issue}</div>
              </div>
              {!!p.unread && (
                <span style={{ flex: "none", fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, background: "#0E7C8A", color: "#fff", minWidth: 18, height: 18, padding: "0 5px", borderRadius: 20, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {p.unread}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }}>
        <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(20,24,28,0.1)", display: "flex", alignItems: "center", gap: 13, flex: "none", background: "#FFFFFF" }}>
          <span style={{ width: 42, height: 42, borderRadius: "50%", background: selPersonView.avBg, color: selPersonView.avFg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 15, flex: "none" }}>
            {selPersonView.initials}
          </span>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: 15.5, fontWeight: 700 }}>{selPersonView.name}</div>
            <div style={{ fontSize: 12.5, color: "#7a848e" }}>{selPersonView.role} · {selPersonView.dept}</div>
          </div>
          <div style={{ textAlign: "right", fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#9aa2ab", lineHeight: 1.6 }}>
            <div>{selPersonView.email}</div>
            <div>{selPersonView.phone}</div>
          </div>
        </div>
        <div style={{ padding: "12px 24px", borderBottom: "1px solid rgba(20,24,28,0.08)", background: "#FCFBF9", flex: "none", display: "flex", gap: 12, alignItems: "baseline" }}>
          <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.1em", color: selPersonView.statusColor, flex: "none" }}>OPEN ISSUE</span>
          <span style={{ fontSize: 13, color: "#2a333c", lineHeight: 1.5 }}>{selPersonView.issue}</span>
        </div>
        <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 14, background: "#FAF9F7" }}>
          {thread.map((t, i) => (
            <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: t.align, gap: 4 }}>
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, color: "#9aa2ab" }}>{t.who}</div>
              <div style={{ maxWidth: 560, padding: "12px 16px", borderRadius: t.radius, background: t.bg, border: `1px solid ${t.bd}`, fontSize: 14, lineHeight: 1.6, color: t.fg, whiteSpace: "pre-line" }}>
                {t.text}
              </div>
            </div>
          ))}
        </div>
        <div style={{ padding: "14px 24px 20px", flex: "none", borderTop: "1px solid rgba(20,24,28,0.08)" }}>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.1em", color: "#0E7C8A", marginBottom: 8 }}>NADIR DRAFTED THIS FOR YOU</div>
          <div style={{ display: "flex", gap: 10, alignItems: "flex-end", background: "#FFFFFF", border: "1px solid rgba(14,124,138,0.3)", borderRadius: 12, padding: "12px 12px 12px 16px" }}>
            <div style={{ flex: 1, fontSize: 14, lineHeight: 1.55, color: "#2a333c" }}>{selPersonView.draft}</div>
            <button
              onClick={onSendMsg}
              disabled={msgSent}
              style={{
                fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "10px 18px", borderRadius: 8, cursor: msgSent ? "default" : "pointer", border: "none", flex: "none",
                background: msgSent ? "rgba(21,133,79,0.15)" : "#0E7C8A", color: msgSent ? "#15854F" : "#FFFFFF",
              }}
            >
              {msgSent ? "✓ Sent" : "Send"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
