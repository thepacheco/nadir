"use client";

import { useNadir } from "./context";
import styles from "./nadir.module.css";

const MONO = "var(--font-ibm-plex-mono), monospace";
const STATUS: Record<string, string> = { red: "#C7452F", amber: "#B47614", green: "#15854F" };

export default function DepartmentsScreen() {
  const { departments, setScreen } = useNadir();

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 19, fontWeight: 700 }}>Departments & oversight</div>
        <div style={{ fontSize: 13.5, color: "#7a848e", marginTop: 4 }}>
          Who owns what, who watches whom, and how each scorecard reads today. Checks and balances, made visible.
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16, maxWidth: 1180 }}>
        {departments.map((d) => (
          <div key={d.name} className={styles.layerCard} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "20px 22px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 9, marginBottom: 4 }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: STATUS[d.status], animation: d.status === "red" ? "nadirPulseRed 1.6s infinite" : "none" }} />
              <span style={{ fontSize: 15.5, fontWeight: 700 }}>{d.name}</span>
              <span style={{ marginLeft: "auto", fontSize: 12.5, color: "#5a646e" }}>{d.head}</span>
            </div>
            <div style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.1em", color: d.oversight.includes("GAP") ? "#C7452F" : "#9aa2ab", marginBottom: 14 }}>{d.oversight}</div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 1, background: "rgba(20,24,28,0.07)", border: "1px solid rgba(20,24,28,0.08)", borderRadius: 8, overflow: "hidden", marginBottom: 12 }}>
              {d.kpis.map((k) => (
                <div key={k.label} style={{ background: "#FCFBF9", padding: "10px 12px" }}>
                  <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.08em", color: "#9aa2ab", marginBottom: 4 }}>{k.label}</div>
                  <div style={{ fontSize: 16, fontWeight: 600, color: k.color }}>{k.val}</div>
                </div>
              ))}
            </div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: "#5a646e", marginBottom: 12 }}>{d.note}</div>
            <button
              onClick={() => setScreen("team")}
              style={{ fontFamily: "inherit", fontSize: 12, fontWeight: 600, padding: "7px 12px", background: "rgba(14,124,138,0.07)", color: "#0E7C8A", border: "1px solid rgba(14,124,138,0.3)", borderRadius: 6, cursor: "pointer" }}
            >
              Open team inbox →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
