"use client";

import { useNadir } from "./context";

export default function Toast() {
  const { toast, dismissToast, toastToMap, toastToChat } = useNadir();
  if (!toast) return null;

  return (
    <div
      style={{
        position: "absolute", left: 22, bottom: 22, width: 372, zIndex: 40, background: "#FFFFFF",
        border: "1px solid rgba(20,24,28,0.14)", borderLeft: `4px solid ${toast.color}`, borderRadius: 12,
        boxShadow: "0 24px 60px -20px rgba(20,30,40,0.4)", padding: "16px 18px", animation: "nadirToastIn 0.35s ease",
        opacity: 0.9,
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 8 }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: toast.color, animation: toast.anim }} />
        <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.1em", color: toast.color }}>{toast.sev} · {toast.time}</span>
        <button onClick={dismissToast} style={{ marginLeft: "auto", fontFamily: "inherit", background: "transparent", border: "none", color: "#9aa2ab", fontSize: 18, cursor: "pointer", lineHeight: 1, padding: "0 2px" }}>
          ×
        </button>
      </div>
      <div style={{ fontSize: 14, fontWeight: 700, lineHeight: 1.4, marginBottom: 5 }}>{toast.title}</div>
      <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "#5a646e", marginBottom: toast.plain ? 7 : 13 }}>{toast.detail}</div>
      {toast.plain && <div style={{ fontSize: 12, lineHeight: 1.5, color: "#0E7C8A", fontStyle: "italic", marginBottom: 13 }}>In plain terms: {toast.plain}</div>}
      <div style={{ display: "flex", gap: 8 }}>
        <button onClick={toastToMap} style={{ fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, padding: "9px 14px", background: "#14181C", color: "#fff", border: "none", borderRadius: 7, cursor: "pointer" }}>
          View on ops map
        </button>
        <button onClick={toastToChat} style={{ fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, padding: "9px 14px", background: "rgba(14,124,138,0.08)", color: "#0E7C8A", border: "1px solid rgba(14,124,138,0.3)", borderRadius: 7, cursor: "pointer" }}>
          Ask Nadir →
        </button>
      </div>
    </div>
  );
}
