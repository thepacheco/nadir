import { COMPANIES } from "@/lib/data";

const MONO = "var(--font-ibm-plex-mono), monospace";
const kpis = COMPANIES[0].kpis;

export default function ProductScreenshot() {
  return (
    <div style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid rgba(20,24,28,0.12)", overflow: "hidden", boxShadow: "0 30px 70px -34px rgba(20,30,40,0.28)" }}>
      {/* Browser chrome */}
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderBottom: "1px solid rgba(20,24,28,0.09)" }}>
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
        <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
        <div style={{ marginLeft: 12, fontFamily: MONO, fontSize: 11.5, color: "#7a848e" }}>nadir · live operational graph</div>
      </div>

      {/* KPI row */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(20,24,28,0.08)" }}>
        {kpis.map((k) => (
          <div key={k.label} style={{ background: "#FFFFFF", padding: "22px 24px" }}>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 8 }}>{k.label}</div>
            <div style={{ fontSize: 26, fontWeight: 600, color: k.color }}>{k.val}</div>
          </div>
        ))}
      </div>

      {/* Alert bar */}
      <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid rgba(20,24,28,0.08)", background: "#FCFBF9" }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#C7452F", flex: "none" }} />
        <div style={{ fontSize: 14.5, color: "#2a333c" }}>
          Transformer T-114 running +8°C over seasonal norm — same signature that preceded the T-109 failure last August.{" "}
          <span style={{ color: "#0E7C8A", fontWeight: 600 }}>Recommended action ready.</span>
        </div>
      </div>

      {/* Mini sidebar + content preview */}
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", borderTop: "1px solid rgba(20,24,28,0.08)" }}>
        <div style={{ background: "#F6F5F3", padding: "16px 18px", borderRight: "1px solid rgba(20,24,28,0.08)" }}>
          {["Dashboard", "Compliance", "Sources", "Team", "Graph"].map((label, i) => (
            <div key={label} style={{
              fontSize: 13, padding: "8px 12px", borderRadius: 6, marginBottom: 4, fontWeight: i === 0 ? 600 : 400,
              color: i === 0 ? "#14181C" : "#7a848e",
              background: i === 0 ? "rgba(14,124,138,0.08)" : "transparent",
            }}>
              {label}
            </div>
          ))}
        </div>
        <div style={{ padding: "20px 24px" }}>
          <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 14 }}>RECENT ALERTS</div>
          {[
            { text: "Pressure valve PSV-207 exceeded rated limit by 12%", tone: "#C7452F" },
            { text: "Employee J. Torres clocked in without CWI certification renewal", tone: "#B8860B" },
            { text: "Shift 2B headcount below minimum — 2 of 5 operators present", tone: "#C7452F" },
          ].map((a, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderTop: i > 0 ? "1px solid rgba(20,24,28,0.06)" : undefined }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: a.tone, flex: "none" }} />
              <span style={{ fontSize: 13.5, color: "#2a333c" }}>{a.text}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
