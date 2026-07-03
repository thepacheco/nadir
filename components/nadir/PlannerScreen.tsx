"use client";

import { TAG_COLORS } from "@/lib/constants";
import { useNadir } from "./context";
import styles from "./nadir.module.css";

export default function PlannerScreen() {
  const { co } = useNadir();
  const { plan } = co;

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 19, fontWeight: 700 }}>Guidance plan</div>
        <div style={{ fontSize: 13.5, color: "#7a848e", marginTop: 4 }}>{plan.subtitle}</div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 18, maxWidth: 1180 }}>
        {plan.cols.map((col) => (
          <div key={col.title} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: 16, minHeight: 200 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 14 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: col.color }} />
              <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11.5, letterSpacing: "0.12em", color: col.color }}>{col.title}</span>
              <span style={{ marginLeft: "auto", fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#9aa2ab" }}>{col.items.length} items</span>
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {col.items.map((p) => (
                <div key={p.t} className={styles.planItem} style={{ padding: "13px 14px", background: "#FCFBF9", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 9 }}>
                  <div style={{ fontSize: 13.5, fontWeight: 600, lineHeight: 1.45, marginBottom: 6 }}>{p.t}</div>
                  <div style={{ fontSize: 12.5, lineHeight: 1.55, color: "#5a646e", marginBottom: 9 }}>{p.d}</div>
                  <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, letterSpacing: "0.08em", color: TAG_COLORS[p.tag] || "#5a646e", background: "rgba(20,24,28,0.05)", padding: "3px 8px", borderRadius: 4 }}>
                    {p.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: 22, maxWidth: 1180, padding: "16px 20px", background: "rgba(21,133,79,0.06)", border: "1px solid rgba(21,133,79,0.28)", borderRadius: 10, display: "flex", gap: 14, alignItems: "baseline" }}>
        <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "#15854F", flex: "none" }}>WHY THIS ORDER</span>
        <span style={{ fontSize: 13.5, lineHeight: 1.6, color: "#2a333c" }}>{plan.why}</span>
      </div>
    </div>
  );
}
