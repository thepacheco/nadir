"use client";

import { AV_PALETTE, STATUS_COLORS } from "@/lib/constants";
import { FORMAT_LIBRARY, PER_USER_USAGE, SYSTEM_USAGE, USAGE_ROWS, USAGE_TOTAL, WIRES } from "@/lib/phase3";
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
        <div>
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

          <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden", marginTop: 18 }}>
            <div style={{ padding: "14px 18px", fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", borderBottom: "1px solid rgba(20,24,28,0.08)" }}>
              KNOWLEDGE BASE · WHAT NADIR HAS LEARNED ABOUT {co.name.toUpperCase()}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(20,24,28,0.07)" }}>
              {[
                { label: "OBJECTS", val: String(co.obMappings.length) },
                { label: "RELATIONSHIPS", val: String(co.graph.edges.length + WIRES[co.id].length) },
                { label: "INCIDENT MEMORIES", val: "3" },
                { label: "YOUR CORRECTIONS", val: "2" },
              ].map((k) => (
                <div key={k.label} style={{ background: "#FCFBF9", padding: "12px 14px" }}>
                  <div style={{ fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.08em", color: "#9aa2ab", marginBottom: 4 }}>{k.label}</div>
                  <div style={{ fontSize: 18, fontWeight: 600 }}>{k.val}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "13px 18px", fontSize: 12, lineHeight: 1.6, color: "#5a646e" }}>
              This is the compounding asset: the ontology, the join map, past incidents and their fixes, your corrections, and accepted formats.
              It lives in your tenant, grows with every source and answer, and dies with your contract if you leave.
              <span style={{ color: "#0E7C8A" }}> Per question, only the relevant slice is loaded — the knowledge base is the moat; the context window stays small and cheap.</span>
            </div>
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

          <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", borderBottom: "1px solid rgba(20,24,28,0.08)" }}>
              MODEL USAGE & COST · THIS MONTH
            </div>
            {USAGE_ROWS.map((r) => (
              <div key={r.label} style={{ padding: "12px 18px", borderBottom: "1px solid rgba(20,24,28,0.06)", display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 2 }}>
                    <span style={{ fontSize: 13, fontWeight: 700 }}>{r.label}</span>
                    <span style={{ fontFamily: MONO, fontSize: 9, letterSpacing: "0.06em", color: r.color, background: `${r.color}18`, padding: "2px 7px", borderRadius: 4 }}>{r.tag}</span>
                  </div>
                  <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#7a848e" }}>{r.detail}</div>
                </div>
                <span style={{ fontFamily: MONO, fontSize: 13, fontWeight: 600, color: r.cost === "$0.00" ? "#15854F" : "#14181C", flex: "none" }}>{r.cost}</span>
              </div>
            ))}
            <div style={{ padding: "13px 18px" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontFamily: MONO, fontSize: 11, color: "#5a646e", marginBottom: 7 }}>
                <span>${USAGE_TOTAL.spent.toFixed(2)} of ${USAGE_TOTAL.cap} tenant cap</span>
                <span style={{ color: "#15854F" }}>{Math.round((USAGE_TOTAL.spent / USAGE_TOTAL.cap) * 100)}%</span>
              </div>
              <div style={{ height: 6, background: "rgba(20,24,28,0.08)", borderRadius: 3, overflow: "hidden" }}>
                <div style={{ width: `${(USAGE_TOTAL.spent / USAGE_TOTAL.cap) * 100}%`, height: "100%", background: "linear-gradient(90deg, #0E7C8A, #15854F)", borderRadius: 3 }} />
              </div>
              <div style={{ fontSize: 11, color: "#9aa2ab", marginTop: 8, lineHeight: 1.5 }}>
                Intelligence is bought by the token. Mapping is cached, checks are algorithmic — the model is reserved for what only a model can do.
              </div>
            </div>
            <div style={{ padding: "13px 18px 6px", fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.1em", color: "#7a848e", borderTop: "1px solid rgba(20,24,28,0.08)" }}>
              BY USER
            </div>
            {co.people.map((p, i) => {
              const u = PER_USER_USAGE[i % PER_USER_USAGE.length];
              return (
                <div key={p.name} style={{ padding: "9px 18px", display: "flex", alignItems: "center", gap: 10, borderBottom: "1px solid rgba(20,24,28,0.05)" }}>
                  <span style={{ fontSize: 12.5, fontWeight: 600, flex: 1 }}>{p.name}</span>
                  <span style={{ fontFamily: MONO, fontSize: 10.5, color: "#9aa2ab" }}>{u.queries} queries · {u.briefings} briefings</span>
                  <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, width: 52, textAlign: "right" }}>{u.cost}</span>
                </div>
              );
            })}
            <div style={{ padding: "9px 18px 14px", display: "flex", alignItems: "center", gap: 10 }}>
              <span style={{ fontSize: 12.5, color: "#7a848e", flex: 1 }}>{SYSTEM_USAGE.label}</span>
              <span style={{ fontFamily: MONO, fontSize: 10.5, color: "#9aa2ab" }}>{SYSTEM_USAGE.queries} runs · mostly algorithmic</span>
              <span style={{ fontFamily: MONO, fontSize: 12, fontWeight: 600, width: 52, textAlign: "right" }}>{SYSTEM_USAGE.cost}</span>
            </div>
          </div>

          <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden" }}>
            <div style={{ padding: "14px 18px", fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", borderBottom: "1px solid rgba(20,24,28,0.08)" }}>
              FORMAT LIBRARY · GENERATED ONCE, REUSED FREE
            </div>
            {FORMAT_LIBRARY.map((f) => (
              <div key={f.name} style={{ padding: "11px 18px", borderBottom: "1px solid rgba(20,24,28,0.06)", display: "flex", alignItems: "center", gap: 10 }}>
                <span style={{ fontSize: 13, fontWeight: 600, flex: 1 }}>{f.name}</span>
                <span style={{ fontFamily: MONO, fontSize: 10.5, color: "#9aa2ab" }}>{f.saved}</span>
                <span style={{ fontFamily: MONO, fontSize: 10.5, color: "#15854F" }}>reused ×{f.reuses}</span>
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
