"use client";

import { useState } from "react";
import { SCREENS } from "@/lib/constants";
import { useNadir } from "./context";
import styles from "./nadir.module.css";
import ChatScreen from "./ChatScreen";
import MapScreen from "./MapScreen";
import GraphScreen from "./GraphScreen";
import TeamScreen from "./TeamScreen";
import DepartmentsScreen from "./DepartmentsScreen";
import PlannerScreen from "./PlannerScreen";
import ComplianceScreen from "./ComplianceScreen";
import SourcesScreen from "./SourcesScreen";
import SettingsScreen from "./SettingsScreen";
import EvidenceDrawer from "./EvidenceDrawer";
import Toast from "./Toast";

const NOTIF_COLORS = { ok: "#15854F", warn: "#B47614", info: "#0E7C8A" } as const;

// Distinct icon per tab — 15px stroke icons, colored by active state.
function NavIcon({ id, color }: { id: string; color: string }) {
  const common = { width: 15, height: 15, viewBox: "0 0 16 16", fill: "none", stroke: color, strokeWidth: 1.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const, style: { flex: "none" } };
  switch (id) {
    case "chat": // speech bubble
      return <svg {...common}><path d="M2.5 3.5h11v7h-6l-3 3v-3h-2z" /></svg>;
    case "map": // location pin
      return <svg {...common}><path d="M8 14s4.5-4.2 4.5-7.5a4.5 4.5 0 1 0-9 0C3.5 9.8 8 14 8 14z" /><circle cx="8" cy="6.5" r="1.6" /></svg>;
    case "graph": // linked nodes
      return <svg {...common}><circle cx="3.5" cy="12.5" r="1.8" /><circle cx="8" cy="4" r="1.8" /><circle cx="12.5" cy="11" r="1.8" /><path d="M4.6 11.1 7 5.7M9.3 5.3l2.3 4.2M5.3 12.3l5.4-.9" /></svg>;
    case "team": // two people
      return <svg {...common}><circle cx="5.5" cy="5.5" r="2" /><path d="M1.8 13.5c0-2 1.7-3.4 3.7-3.4s3.7 1.4 3.7 3.4" /><circle cx="11.5" cy="6" r="1.6" /><path d="M10.5 10.4c2.1-.2 3.7 1.2 3.7 3.1" /></svg>;
    case "depts": // org chart
      return <svg {...common}><rect x="5.2" y="1.8" width="5.6" height="3.4" rx="0.8" /><rect x="1.2" y="10.8" width="5.2" height="3.4" rx="0.8" /><rect x="9.6" y="10.8" width="5.2" height="3.4" rx="0.8" /><path d="M8 5.2v2.6M8 7.8H3.8v3M8 7.8h4.2v3" /></svg>;
    case "plan": // kanban columns
      return <svg {...common}><rect x="1.8" y="2" width="3.6" height="12" rx="0.8" /><rect x="6.2" y="2" width="3.6" height="8" rx="0.8" /><rect x="10.6" y="2" width="3.6" height="5" rx="0.8" /></svg>;
    case "comp": // shield + check
      return <svg {...common}><path d="M8 1.8 13 3.6v4.2c0 3.4-2.2 5.4-5 6.4-2.8-1-5-3-5-6.4V3.6z" /><path d="m5.8 7.8 1.6 1.6 2.8-3" /></svg>;
    case "sources": // database cylinder
      return <svg {...common}><ellipse cx="8" cy="3.4" rx="5.4" ry="1.9" /><path d="M2.6 3.4v9.2c0 1 2.4 1.9 5.4 1.9s5.4-.9 5.4-1.9V3.4M2.6 8c0 1 2.4 1.9 5.4 1.9s5.4-.9 5.4-1.9" /></svg>;
    case "settings": // gear
      return <svg {...common}><circle cx="8" cy="8" r="2.2" /><path d="M8 1.6v2M8 12.4v2M1.6 8h2M12.4 8h2M3.5 3.5l1.4 1.4M11.1 11.1l1.4 1.4M12.5 3.5l-1.4 1.4M4.9 11.1l-1.4 1.4" /></svg>;
    default:
      return <svg {...common}><circle cx="8" cy="8" r="4" /></svg>;
  }
}

function GuideButton() {
  const { guideItems } = useNadir();
  const [open, setOpen] = useState(false);
  const doneCount = guideItems.filter((g) => g.done).length;
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        title="Guide — learn the workspace"
        style={{ fontFamily: "inherit", display: "flex", alignItems: "center", gap: 7, height: 32, padding: "0 12px", borderRadius: 8, border: "1px solid rgba(14,124,138,0.4)", background: open ? "rgba(14,124,138,0.12)" : "rgba(14,124,138,0.06)", cursor: "pointer", fontSize: 12.5, fontWeight: 600, color: "#0E7C8A" }}
      >
        Guide
        <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5 }}>{doneCount}/{guideItems.length}</span>
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 49 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 50, width: 380, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 10, boxShadow: "0 18px 44px -16px rgba(20,30,40,0.35)", padding: 6 }}>
            <div style={{ padding: "10px 12px 8px" }}>
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, letterSpacing: "0.12em", color: "#9aa2ab", marginBottom: 3 }}>LEARN THE WORKSPACE</div>
              <div style={{ fontSize: 12, color: "#5a646e", lineHeight: 1.5 }}>The system teaches you how to use itself. Six moves, each one live — do them in any order.</div>
            </div>
            {guideItems.map((g) => (
              <div key={g.id} style={{ display: "flex", gap: 10, padding: "10px 12px", borderTop: "1px solid rgba(20,24,28,0.06)", alignItems: "flex-start" }}>
                <span style={{ width: 18, height: 18, borderRadius: "50%", flex: "none", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 10, fontWeight: 700, background: g.done ? "rgba(21,133,79,0.14)" : "rgba(20,24,28,0.06)", color: g.done ? "#15854F" : "#9aa2ab", border: `1.5px solid ${g.done ? "rgba(21,133,79,0.5)" : "rgba(20,24,28,0.14)"}` }}>
                  {g.done ? "✓" : ""}
                </span>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: 13, fontWeight: 700, color: g.done ? "#9aa2ab" : "#14181C", textDecoration: g.done ? "line-through" : "none" }}>{g.label}</div>
                  <div style={{ fontSize: 11.5, lineHeight: 1.5, color: "#7a848e", marginTop: 2 }}>{g.desc}</div>
                </div>
                {!g.done && (
                  <button
                    onClick={() => { g.go(); setOpen(false); }}
                    style={{ fontFamily: "inherit", fontSize: 11.5, fontWeight: 700, padding: "5px 11px", background: "rgba(14,124,138,0.08)", color: "#0E7C8A", border: "1px solid rgba(14,124,138,0.3)", borderRadius: 6, cursor: "pointer", flex: "none" }}
                  >
                    Show me
                  </button>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function NotificationsBell() {
  const { notifications, unseenCount, markNotifsSeen } = useNadir();
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => { setOpen((o) => !o); if (!open) markNotifsSeen(); }}
        title="Notifications"
        style={{ fontFamily: "inherit", position: "relative", width: 32, height: 32, borderRadius: 8, border: "1px solid rgba(20,24,28,0.14)", background: open ? "rgba(14,124,138,0.08)" : "transparent", cursor: "pointer", fontSize: 14, color: "#5a646e" }}
      >
        ◔
        {unseenCount > 0 && (
          <span style={{ position: "absolute", top: -6, right: -6, minWidth: 16, height: 16, padding: "0 4px", borderRadius: 10, background: "#C7452F", color: "#fff", fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            {unseenCount}
          </span>
        )}
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 49 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "calc(100% + 8px)", right: 0, zIndex: 50, width: 360, maxHeight: 420, overflowY: "auto", background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 10, boxShadow: "0 18px 44px -16px rgba(20,30,40,0.35)", padding: 6 }}>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, letterSpacing: "0.12em", color: "#9aa2ab", padding: "8px 12px 6px" }}>NOTIFICATIONS</div>
            {notifications.length === 0 ? (
              <div style={{ padding: "14px 12px 18px", fontSize: 12.5, color: "#9aa2ab" }}>Nothing yet. Send a briefing for approval, escalate an alert, or answer a data-quality question — everything lands here.</div>
            ) : (
              notifications.map((n, i) => (
                <div key={i} style={{ display: "flex", gap: 10, padding: "10px 12px", borderTop: i ? "1px solid rgba(20,24,28,0.06)" : "none", alignItems: "flex-start" }}>
                  <span style={{ width: 8, height: 8, borderRadius: "50%", background: NOTIF_COLORS[n.kind], flex: "none", marginTop: 4 }} />
                  <div style={{ fontSize: 12.5, lineHeight: 1.5, color: "#2a333c", flex: 1 }}>{n.text}</div>
                  <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, color: "#9aa2ab", flex: "none" }}>{n.time}</span>
                </div>
              ))
            )}
          </div>
        </>
      )}
    </div>
  );
}

function CompanySwitcher() {
  const { companies, cidx, selectCompany } = useNadir();
  const [open, setOpen] = useState(false);
  const co = companies[cidx];
  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={() => setOpen((o) => !o)}
        style={{
          fontFamily: "inherit", display: "flex", alignItems: "center", gap: 10, fontSize: 13, fontWeight: 600,
          padding: "7px 12px 7px 14px", borderRadius: 7, cursor: "pointer",
          background: "rgba(14,124,138,0.08)", color: "#14181C", border: "1px solid rgba(14,124,138,0.4)",
        }}
      >
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0E7C8A", flex: "none" }} />
        {co.name}
        <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, color: "#7a848e" }}>▾</span>
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 49 }} onClick={() => setOpen(false)} />
          <div style={{ position: "absolute", top: "calc(100% + 6px)", left: 0, zIndex: 50, width: 300, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 10, boxShadow: "0 18px 44px -16px rgba(20,30,40,0.35)", padding: 6, display: "flex", flexDirection: "column", gap: 2 }}>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, letterSpacing: "0.12em", color: "#9aa2ab", padding: "8px 12px 6px" }}>SWITCH DEMO COMPANY</div>
            {companies.map((c, i) => {
              const active = i === cidx;
              return (
                <button
                  key={c.id}
                  onClick={() => { selectCompany(i); setOpen(false); }}
                  style={{
                    fontFamily: "inherit", textAlign: "left", display: "flex", alignItems: "center", gap: 10, padding: "9px 12px",
                    borderRadius: 7, cursor: "pointer", border: "none", width: "100%",
                    background: active ? "rgba(14,124,138,0.1)" : "transparent",
                  }}
                >
                  <span style={{ width: 7, height: 7, borderRadius: "50%", background: active ? "#0E7C8A" : "#b7bec5", flex: "none" }} />
                  <span style={{ minWidth: 0 }}>
                    <span style={{ display: "block", fontSize: 13, fontWeight: 600, color: active ? "#0E7C8A" : "#14181C" }}>{c.name}</span>
                    <span style={{ display: "block", fontSize: 11, color: "#9aa2ab", marginTop: 1 }}>{c.industry}</span>
                  </span>
                </button>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
}

function Logo({ size = 21, dot = 5 }: { size?: number; dot?: number }) {
  return (
    <div style={{ width: size, height: size, border: "2.5px solid #14181C", borderRadius: "50%", position: "relative" }}>
      <div style={{ position: "absolute", left: "50%", bottom: 1.5, transform: "translateX(-50%)", width: dot, height: dot, borderRadius: "50%", background: "#0E7C8A" }} />
    </div>
  );
}

export default function AppShell() {
  const ctx = useNadir();
  const { co, screen, setScreen, companies, clock, clockLabel, onScrub, playing, togglePlay, exitApp, unreadTotal } = ctx;

  return (
    <div style={{ background: "#FAF9F7", color: "#14181C", height: "100vh", display: "flex", flexDirection: "column", overflow: "hidden", position: "relative" }}>
      {/* TOP BAR */}
      <div style={{ display: "flex", alignItems: "center", gap: 18, padding: "0 20px", height: 56, borderBottom: "1px solid rgba(20,24,28,0.1)", flex: "none", background: "#FFFFFF" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 10, cursor: "pointer" }} onClick={exitApp} title="Back to site">
          <Logo />
          <div style={{ fontWeight: 700, fontSize: 15.5, letterSpacing: "0.06em" }}>NADIR</div>
        </div>
        <div style={{ width: 1, height: 24, background: "rgba(20,24,28,0.12)" }} />
        <CompanySwitcher />
        <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, letterSpacing: "0.08em", color: "#9aa2ab" }}>
          {companies.length} DEMO COMPANIES
        </div>
        <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 9.5, letterSpacing: "0.1em", color: "#8a5a10", border: "1px solid rgba(180,118,20,0.4)", background: "rgba(180,118,20,0.07)", padding: "3px 9px", borderRadius: 100 }}>
          SIMULATED DATA
        </div>

        <div style={{ marginLeft: "auto", display: "flex", alignItems: "center", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "5px 12px 5px 10px", border: "1px solid rgba(20,24,28,0.12)", borderRadius: 100, background: "#FCFBF9" }}>
            <button
              onClick={togglePlay}
              title="Play scenario"
              style={{
                fontFamily: "inherit", width: 24, height: 24, borderRadius: "50%", border: "none", cursor: "pointer",
                fontSize: 11, display: "flex", alignItems: "center", justifyContent: "center",
                background: playing ? "#0E7C8A" : "rgba(20,24,28,0.08)", color: playing ? "#FFFFFF" : "#5a646e",
              }}
            >
              {playing ? "❚❚" : "▶"}
            </button>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, letterSpacing: "0.1em", color: "#7a848e" }}>AS OF</div>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 14, fontWeight: 600, color: "#14181C", width: 46 }}>{clockLabel}</div>
            <input
              type="range" min={0} max={1435} step={5} value={clock}
              onChange={(e) => onScrub(parseInt(e.target.value, 10))}
              style={{ width: 130, accentColor: "#0E7C8A", cursor: "pointer" }}
            />
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 12, color: "#7a848e" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#15854F", animation: "nadirBlink 2.4s infinite" }} />
            {co.sources.length} live
          </div>
          <GuideButton />
          <NotificationsBell />
          <button
            onClick={exitApp}
            className={styles.exitBtn}
            style={{ fontFamily: "inherit", fontSize: 12.5, fontWeight: 600, padding: "7px 14px", background: "transparent", color: "#5a646e", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 7, cursor: "pointer" }}
          >
            Exit demo
          </button>
        </div>
      </div>

      <div className={styles.mobileStack} style={{ display: "flex", flex: 1, minHeight: 0 }}>
        {/* NAV */}
        <div className={styles.mobileFullWidth} style={{ width: 214, flex: "none", borderRight: "1px solid rgba(20,24,28,0.1)", padding: "14px 10px", display: "flex", flexDirection: "column", gap: 3, background: "#FFFFFF" }}>
          {SCREENS.map((sc) => {
            const active = screen === sc.id;
            let badge: string | false = false;
            let badgeBg = "rgba(199,69,47,0.12)";
            let badgeFg = "#C7452F";
            if (sc.id === "comp") badge = String(co.compliance.tiles[0].val);
            if (sc.id === "map") badge = String(co.alerts.length);
            if (sc.id === "team" && unreadTotal) { badge = String(unreadTotal); badgeBg = "rgba(14,124,138,0.12)"; badgeFg = "#0E7C8A"; }
            if (sc.id === "depts") {
              const red = ctx.departments.filter((d) => d.status === "red").length;
              if (red) badge = String(red);
            }
            return (
              <button
                key={sc.id}
                onClick={() => setScreen(sc.id)}
                className={styles.navItem}
                style={{
                  display: "flex", alignItems: "center", gap: 12, fontFamily: "inherit", fontSize: 13.5, fontWeight: 600, textAlign: "left",
                  padding: "10px 12px", borderRadius: 8, cursor: "pointer", background: active ? "rgba(14,124,138,0.1)" : "transparent",
                  color: active ? "#14181C" : "#5a646e", border: "none", width: "100%",
                }}
              >
                <NavIcon id={sc.id} color={active ? "#0E7C8A" : "#9aa2ab"} />
                {sc.label}
                {badge && (
                  <span style={{ marginLeft: "auto", fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, background: badgeBg, color: badgeFg, padding: "1px 7px", borderRadius: 20 }}>
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
          <div style={{ marginTop: "auto", padding: 12, borderTop: "1px solid rgba(20,24,28,0.08)", fontSize: 12, color: "#7a848e", lineHeight: 1.5 }}>
            <div style={{ fontWeight: 600, color: "#14181C", marginBottom: 2 }}>{co.name}</div>
            {co.industry}
          </div>
        </div>

        <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0 }}>
          {screen === "chat" && <ChatScreen />}
          {screen === "map" && <MapScreen />}
          {screen === "graph" && <GraphScreen />}
          {screen === "team" && <TeamScreen />}
          {screen === "depts" && <DepartmentsScreen />}
          {screen === "plan" && <PlannerScreen />}
          {screen === "comp" && <ComplianceScreen />}
          {screen === "sources" && <SourcesScreen />}
          {screen === "settings" && <SettingsScreen />}
        </div>
      </div>

      <EvidenceDrawer />
      <Toast />
    </div>
  );
}
