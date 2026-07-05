"use client";

// The priorities ticker — a live, stock-ticker-style band across the top of
// the Layout. It's Nadir surfacing what matters most across the whole company
// right now, ranked, so the room can read the state of the operation at a
// glance. Data is per-company and real (lib/floor.ts), not decoration.

import { tickerFor, type TickerItem } from "@/lib/floor";
import { useNadir } from "./context";

const MONO = "var(--font-ibm-plex-mono), monospace";

const SEV: Record<TickerItem["sev"], { dot: string; label: string; val: string; arrow: string }> = {
  crit: { dot: "#C7452F", label: "#8f3322", val: "#C7452F", arrow: "▲" },
  warn: { dot: "#B47614", label: "#8a5a10", val: "#B47614", arrow: "▲" },
  ok: { dot: "#15854F", label: "#0f6b3f", val: "#15854F", arrow: "▼" },
  info: { dot: "#7a848e", label: "#5a646e", val: "#3d4750", arrow: "•" },
};

export default function PrioritiesTicker() {
  const { co } = useNadir();
  const items = tickerFor(co.id);
  const rank = { crit: 0, warn: 1, info: 2, ok: 3 } as const;
  const ordered = [...items].sort((a, b) => rank[a.sev] - rank[b.sev]);
  // duplicate the run so the marquee loops seamlessly
  const run = [...ordered, ...ordered];

  return (
    <div style={{ flex: "none", display: "flex", alignItems: "stretch", borderBottom: "1px solid rgba(20,24,28,0.1)", background: "#14181C", overflow: "hidden" }}>
      <div style={{ flex: "none", display: "flex", alignItems: "center", gap: 7, padding: "0 14px", background: "#0E7C8A", color: "#fff", fontFamily: MONO, fontSize: 10.5, fontWeight: 700, letterSpacing: "0.1em" }}>
        <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#fff", animation: "nadirBlink 1.4s infinite" }} />
        NADIR PRIORITIES
      </div>
      <div style={{ flex: 1, minWidth: 0, overflow: "hidden", position: "relative", maskImage: "linear-gradient(90deg, transparent, #000 3%, #000 97%, transparent)" }}>
        <div style={{ display: "inline-flex", alignItems: "center", whiteSpace: "nowrap", padding: "8px 0", animation: "nadirTicker 34s linear infinite" }}>
          {run.map((it, i) => {
            const s = SEV[it.sev];
            return (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "0 22px", borderRight: "1px solid rgba(255,255,255,0.08)" }}>
                <span style={{ width: 7, height: 7, borderRadius: "50%", background: s.dot, flex: "none" }} />
                <span style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.06em", color: "#c7ccd1" }}>{it.label}</span>
                <span style={{ fontFamily: MONO, fontSize: 11, fontWeight: 700, color: s.val === "#3d4750" ? "#e8eaec" : s.dot }}>{s.arrow} {it.value}</span>
              </span>
            );
          })}
        </div>
      </div>
    </div>
  );
}
