"use client";

// A small library of clean, on-brand animated SVG schematics for the marketing
// site — so we can show what Nadir does instead of describing it in paragraphs.
// Self-contained, theme-light, subtly animated.

const TEAL = "#0E7C8A";
const RED = "#C7452F";
const AMBER = "#B47614";
const GREEN = "#15854F";
const INK = "#14181C";

function Frame({ children, label }: { children: React.ReactNode; label: string }) {
  return (
    <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 14, overflow: "hidden", boxShadow: "0 24px 60px -34px rgba(20,30,40,0.28)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 16px", borderBottom: "1px solid rgba(20,24,28,0.08)" }}>
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
        <span style={{ width: 9, height: 9, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
        <span style={{ marginLeft: 10, fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#7a848e" }}>{label}</span>
      </div>
      <div style={{ position: "relative", aspectRatio: "16 / 10", background: "#F6F5F2" }}>{children}</div>
    </div>
  );
}

// Isometric building with live alert blips — the god-view, at marketing scale.
export function IsoVisual({ label = "nadir · your site, live" }: { label?: string }) {
  // simple diamond-tile isometric of a few rooms
  const iso = (gx: number, gy: number, z = 0): [number, number] => [200 + (gx - gy) * 26, 90 + (gx + gy) * 15 - z];
  const rooms: { x: number; y: number; w: number; d: number; h: number; tone: string; blip?: string }[] = [
    { x: 0, y: 0, w: 3, d: 2, h: 22, tone: "rgba(14,124,138,0.16)" },
    { x: 3.4, y: 0, w: 2.4, d: 3, h: 18, tone: "rgba(180,118,20,0.14)", blip: AMBER },
    { x: 0, y: 2.4, w: 2, d: 2.4, h: 14, tone: "rgba(21,133,79,0.12)" },
    { x: 3, y: 3.4, w: 2.4, d: 2, h: 26, tone: "rgba(199,69,47,0.18)", blip: RED },
  ];
  const face = (p: [number, number][]) => `M ${p.map((a) => a.join(" ")).join(" L ")} Z`;
  return (
    <Frame label={label}>
      <svg viewBox="0 0 400 250" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {[...rooms].sort((a, b) => a.x + a.y - (b.x + b.y)).map((r, i) => {
          const a0 = iso(r.x, r.y, r.h), a1 = iso(r.x + r.w, r.y, r.h), a2 = iso(r.x + r.w, r.y + r.d, r.h), a3 = iso(r.x, r.y + r.d, r.h);
          const b1 = iso(r.x + r.w, r.y, 0), b2 = iso(r.x + r.w, r.y + r.d, 0), b3 = iso(r.x, r.y + r.d, 0);
          const [lx, ly] = iso(r.x + r.w / 2, r.y + r.d / 2, r.h);
          return (
            <g key={i}>
              <path d={face([a1, a2, b2, b1])} fill="#E4E1DA" stroke="rgba(20,24,28,0.16)" />
              <path d={face([a3, a2, b2, b3])} fill="#EFECE5" stroke="rgba(20,24,28,0.16)" />
              <path d={face([a0, a1, a2, a3])} fill="#FFFFFF" stroke="rgba(20,24,28,0.22)" />
              <path d={face([a0, a1, a2, a3])} fill={r.tone} />
              {r.blip && (
                <g>
                  <circle cx={lx} cy={ly - 14} r={6} fill={r.blip}>
                    <animate attributeName="r" values="5;8;5" dur="1.5s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="1;0.6;1" dur="1.5s" repeatCount="indefinite" />
                  </circle>
                  <line x1={lx} y1={ly - 8} x2={lx} y2={ly} stroke={r.blip} strokeWidth={1.5} />
                </g>
              )}
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

// AI-centered node web — Nadir at the hub, systems + signals orbiting.
export function GraphVisual({ label = "nadir · everything through the AI" }: { label?: string }) {
  const cx = 200, cy = 125;
  const outer = [
    { a: -20, r: 120, c: "#9aa2ab", t: "SAP" },
    { a: 35, r: 130, c: TEAL, t: "Work orders" },
    { a: 90, r: 120, c: RED, t: "T-114 alert" },
    { a: 150, r: 132, c: TEAL, t: "Crews" },
    { a: 205, r: 120, c: "#9aa2ab", t: "Maximo" },
    { a: 270, r: 128, c: AMBER, t: "OSHA gap" },
    { a: 320, r: 118, c: "#9aa2ab", t: "ADP" },
  ];
  const pts = outer.map((o) => ({ ...o, x: cx + Math.cos((o.a * Math.PI) / 180) * o.r, y: cy + Math.sin((o.a * Math.PI) / 180) * o.r * 0.62 }));
  return (
    <Frame label={label}>
      <svg viewBox="0 0 400 250" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        {pts.map((p, i) => (
          <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(14,124,138,0.28)" strokeWidth={1} strokeDasharray="3 3">
            <animate attributeName="stroke-dashoffset" values="6;0" dur="1.2s" repeatCount="indefinite" />
          </line>
        ))}
        {pts.map((p, i) => (
          <g key={i}>
            <circle cx={p.x} cy={p.y} r={5} fill={p.c} />
            <text x={p.x} y={p.y - 9} textAnchor="middle" style={{ fontSize: 9, fill: "#5a646e", fontFamily: "var(--font-ibm-plex-mono), monospace" }}>{p.t}</text>
          </g>
        ))}
        <circle cx={cx} cy={cy} r={30} fill={TEAL} />
        <circle cx={cx} cy={cy} r={38} fill="none" stroke="rgba(14,124,138,0.35)" strokeWidth={1.5}>
          <animate attributeName="r" values="34;44;34" dur="2.4s" repeatCount="indefinite" />
          <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
        </circle>
        <circle cx={cx} cy={cy - 8} r={3.4} fill="#fff">
          <animate attributeName="opacity" values="1;0.3;1" dur="1.3s" repeatCount="indefinite" />
        </circle>
        <text x={cx} y={cy + 6} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: "#fff", fontFamily: "var(--font-ibm-plex-sans), sans-serif", letterSpacing: "0.04em" }}>NADIR</text>
      </svg>
    </Frame>
  );
}

// Left→right pipeline: sources → Nadir → objects (ingestion / mapping).
export function PipelineVisual({ label = "nadir · mapping your data" }: { label?: string }) {
  const cols = [
    { x: 60, title: "YOUR SYSTEMS", items: ["Database", "Spreadsheets", "ERP"], c: "#9aa2ab" },
    { x: 200, title: "NADIR", items: ["Samples", "Maps", "Validates"], c: TEAL },
    { x: 340, title: "YOUR MODEL", items: ["Work orders", "People", "Assets"], c: GREEN },
  ];
  return (
    <Frame label={label}>
      <svg viewBox="0 0 400 250" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <line x1={100} y1={125} x2={300} y2={125} stroke="rgba(14,124,138,0.3)" strokeWidth={1.5} strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="8;0" dur="0.9s" repeatCount="indefinite" />
        </line>
        <circle r={4} fill={TEAL}><animateMotion dur="2.6s" repeatCount="indefinite" path="M 100 125 L 300 125" /></circle>
        {cols.map((col, ci) => (
          <g key={ci}>
            <text x={col.x} y={54} textAnchor="middle" style={{ fontSize: 9, letterSpacing: "0.08em", fill: "#7a848e", fontFamily: "var(--font-ibm-plex-mono), monospace" }}>{col.title}</text>
            {col.items.map((it, i) => (
              <g key={it}>
                <rect x={col.x - 46} y={70 + i * 34} width={92} height={26} rx={6} fill="#FFFFFF" stroke={ci === 1 ? TEAL : "rgba(20,24,28,0.16)"} strokeWidth={ci === 1 ? 1.6 : 1} />
                <circle cx={col.x - 34} cy={83 + i * 34} r={3} fill={col.c} />
                <text x={col.x - 24} y={87 + i * 34} style={{ fontSize: 10.5, fill: INK, fontFamily: "var(--font-ibm-plex-sans), sans-serif" }}>{it}</text>
              </g>
            ))}
          </g>
        ))}
      </svg>
    </Frame>
  );
}

// A stack of live alerts turning into a routed action — "it tells you what to do."
export function AlertVisual({ label = "nadir · what needs you" }: { label?: string }) {
  const rows = [
    { c: RED, t: "Cooler at 47°F", s: "→ routed to Kitchen lead" },
    { c: AMBER, t: "120 prepped / 186 booked", s: "→ prep list drafted" },
    { c: TEAL, t: "Invoice 8% over contract", s: "→ dispute email ready" },
  ];
  return (
    <Frame label={label}>
      <div style={{ position: "absolute", inset: 0, padding: "26px 30px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 14 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderLeft: `3px solid ${r.c}`, borderRadius: "0 10px 10px 0", padding: "12px 14px" }}>
            <span style={{ width: 9, height: 9, borderRadius: "50%", background: r.c, flex: "none", animation: `nadirBlink ${1.4 + i * 0.3}s infinite` }} />
            <span style={{ fontSize: 13.5, fontWeight: 600, color: INK }}>{r.t}</span>
            <span style={{ marginLeft: "auto", fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: TEAL }}>{r.s}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}
