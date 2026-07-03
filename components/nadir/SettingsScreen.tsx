"use client";

import { AV_PALETTE, STATUS_COLORS } from "@/lib/constants";
import { useNadir } from "./context";

const MONO = "var(--font-ibm-plex-mono), monospace";

const PREF_ROWS = [
  { key: "critical", label: "Critical alerts", desc: "Push + email the moment a critical signal crosses. Always routed to the area owner and their manager." },
  { key: "digest", label: "Warning digest", desc: "Non-critical warnings bundled into a morning digest instead of one-by-one pings." },
  { key: "approvals", label: "Approval requests", desc: "Briefings awaiting your sign-off — sent wherever you actually read messages." },
  { key: "quality", label: "Data-quality questions", desc: "When Nadir holds a record as suspect, ask the owner to confirm or correct it." },
];

function Toggle({ on, onClick }: { on: boolean; onClick: () => void }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: 40, height: 22, borderRadius: 20, border: "none", cursor: "pointer", position: "relative", flex: "none",
        background: on ? "#0E7C8A" : "rgba(20,24,28,0.18)", transition: "background 0.2s",
      }}
    >
      <span style={{ position: "absolute", top: 3, left: on ? 21 : 3, width: 16, height: 16, borderRadius: "50%", background: "#fff", transition: "left 0.2s" }} />
    </button>
  );
}

export default function SettingsScreen() {
  const { co, notifPrefs, toggleNotifPref, resetDemo, approver } = useNadir();

  return (
    <div style={{ flex: 1, overflowY: "auto", padding: "28px 32px" }}>
      <div style={{ marginBottom: 24 }}>
        <div style={{ fontSize: 19, fontWeight: 700 }}>Settings</div>
        <div style={{ fontSize: 13.5, color: "#7a848e", marginTop: 4 }}>Users, access, notification routing, and demo controls for {co.name}.</div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 18, maxWidth: 1180, alignItems: "start" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ padding: "14px 18px", fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", borderBottom: "1px solid rgba(20,24,28,0.08)" }}>USERS & ACCESS</div>
          {co.people.map((p, i) => {
            const [avBg, avFg] = AV_PALETTE[i % AV_PALETTE.length];
            return (
              <div key={p.name} style={{ padding: "13px 18px", borderBottom: "1px solid rgba(20,24,28,0.06)", display: "flex", alignItems: "center", gap: 12 }}>
                <span style={{ width: 32, height: 32, borderRadius: "50%", background: avBg, color: avFg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flex: "none" }}>{p.initials}</span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 7 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{p.name}</span>
                    <span style={{ width: 7, height: 7, borderRadius: "50%", background: STATUS_COLORS[p.status] }} />
                    {p.pto && <span style={{ fontFamily: MONO, fontSize: 9.5, color: "#B47614" }}>PTO</span>}
                  </div>
                  <div style={{ fontSize: 11.5, color: "#7a848e" }}>{p.role}{p.manager ? ` · reports to ${p.manager.split(" · ")[0]}` : ""}</div>
                </div>
                <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.06em", color: "#0E7C8A", background: "rgba(14,124,138,0.08)", border: "1px solid rgba(14,124,138,0.25)", padding: "3px 9px", borderRadius: 5, flex: "none" }}>
                  {i === 0 ? "AREA OWNER" : "DEPARTMENT"}
                </span>
              </div>
            );
          })}
          <div style={{ padding: "13px 18px", display: "flex", alignItems: "center", gap: 12 }}>
            <span style={{ width: 32, height: 32, borderRadius: "50%", background: "rgba(20,24,28,0.07)", color: "#5a646e", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 12, flex: "none" }}>
              {approver.name.split(" ").map((w) => w[0]).slice(0, 2).join("")}
            </span>
            <div style={{ minWidth: 0, flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{approver.name.split(" · ")[0]}</div>
              <div style={{ fontSize: 11.5, color: "#7a848e" }}>{approver.name.split(" · ")[1]} · receives briefings for approval</div>
            </div>
            <span style={{ fontFamily: MONO, fontSize: 10, letterSpacing: "0.06em", color: "#8a5a10", background: "rgba(180,118,20,0.1)", border: "1px solid rgba(180,118,20,0.35)", padding: "3px 9px", borderRadius: 5, flex: "none" }}>APPROVER</span>
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", borderBottom: "1px solid rgba(20,24,28,0.08)" }}>NOTIFICATION ROUTING</div>
            {PREF_ROWS.map((r) => (
              <div key={r.key} style={{ padding: "13px 18px", borderBottom: "1px solid rgba(20,24,28,0.06)", display: "flex", gap: 14, alignItems: "center" }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, marginBottom: 2 }}>{r.label}</div>
                  <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#7a848e" }}>{r.desc}</div>
                </div>
                <Toggle on={!!notifPrefs[r.key]} onClick={() => toggleNotifPref(r.key)} />
              </div>
            ))}
          </div>

          <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "16px 18px" }}>
            <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 8 }}>DEMO CONTROLS</div>
            <div style={{ fontSize: 12.5, lineHeight: 1.6, color: "#5a646e", marginBottom: 12 }}>
              Clears approvals, escalations, data-quality decisions, notifications, and runtime audit entries across all five companies — a clean slate for the next walkthrough.
            </div>
            <button
              onClick={resetDemo}
              style={{ fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, padding: "9px 16px", background: "transparent", color: "#C7452F", border: "1px solid rgba(199,69,47,0.4)", borderRadius: 7, cursor: "pointer" }}
            >
              Reset demo state
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
