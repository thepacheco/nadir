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

// Cryptic column names on the left becoming plain, recognizable things on the
// right — with one still waiting on a human's yes. The heart of schema mapping.
export function MappingVisual({ label = "nadir · naming your data" }: { label?: string }) {
  const SANS = "var(--font-ibm-plex-sans), sans-serif", MONO = "var(--font-ibm-plex-mono), monospace";
  const rows = [
    { raw: "EMP_ID_V2", plain: "Employee", ok: true },
    { raw: "TBL_WRK_ORD", plain: "Work order", ok: true },
    { raw: "LOC_CD", plain: "Site", ok: false },
    { raw: "DT_STAMP", plain: "Timestamp", ok: true },
  ];
  const lx = 34, lw = 120, rx = 246, rw = 120, top = 66, gap = 42, h = 28;
  return (
    <Frame label={label}>
      <svg viewBox="0 0 400 250" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <text x={lx + lw / 2} y={50} textAnchor="middle" style={{ fontSize: 9, letterSpacing: "0.1em", fill: "#7a848e", fontFamily: MONO }}>YOUR COLUMNS</text>
        <text x={rx + rw / 2} y={50} textAnchor="middle" style={{ fontSize: 9, letterSpacing: "0.1em", fill: "#7a848e", fontFamily: MONO }}>WHAT THEY ARE</text>
        {rows.map((r, i) => {
          const y = top + i * gap, cy = y + h / 2;
          const col = r.ok ? GREEN : AMBER;
          return (
            <g key={i}>
              <path d={`M ${lx + lw} ${cy} C 200 ${cy}, 200 ${cy}, ${rx} ${cy}`} fill="none" stroke={col} strokeWidth={1.5} strokeDasharray={r.ok ? "0" : "4 3"} opacity={r.ok ? 0.55 : 0.8} />
              {r.ok && <circle r={3} fill={GREEN}><animateMotion dur={`${2 + i * 0.3}s`} repeatCount="indefinite" path={`M ${lx + lw} ${cy} L ${rx} ${cy}`} /></circle>}
              {/* left card */}
              <rect x={lx} y={y} width={lw} height={h} rx={6} fill="#FFFFFF" stroke="rgba(20,24,28,0.16)" />
              <text x={lx + 12} y={cy + 4} style={{ fontSize: 11, fill: "#5a646e", fontFamily: MONO }}>{r.raw}</text>
              {/* right card */}
              <rect x={rx} y={y} width={rw} height={h} rx={6} fill="#FFFFFF" stroke={r.ok ? "rgba(20,24,28,0.16)" : AMBER} strokeWidth={r.ok ? 1 : 1.5} />
              <circle cx={rx + 13} cy={cy} r={3.5} fill={col} />
              <text x={rx + 24} y={cy + 4} style={{ fontSize: 11.5, fontWeight: 600, fill: INK, fontFamily: SANS }}>{r.plain}</text>
              {!r.ok && <text x={rx + rw - 10} y={cy + 4} textAnchor="end" style={{ fontSize: 9, fontWeight: 700, fill: AMBER, fontFamily: MONO }}>CONFIRM?</text>}
            </g>
          );
        })}
      </svg>
    </Frame>
  );
}

// A tamper-evident chain of sealed records — every action locked to the last.
export function LedgerVisual({ label = "nadir · every action, sealed" }: { label?: string }) {
  const blocks = [
    { t: "login", h: "0e82c1" },
    { t: "query", h: "84a7e2" },
    { t: "rule change", h: "f109b4" },
    { t: "alert cleared", h: "b7c3d9" },
  ];
  const bw = 70, gap = 20, y = 88, total = blocks.length * bw + (blocks.length - 1) * gap;
  const startX = (400 - total) / 2, linkY = y + 28;
  const SANS = "var(--font-ibm-plex-sans), sans-serif", MONO = "var(--font-ibm-plex-mono), monospace";
  return (
    <Frame label={label}>
      <svg viewBox="0 0 400 250" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <line x1={startX} y1={linkY} x2={startX + total} y2={linkY} stroke="rgba(14,124,138,0.25)" strokeWidth={2} strokeDasharray="4 3">
          <animate attributeName="stroke-dashoffset" values="7;0" dur="1s" repeatCount="indefinite" />
        </line>
        {blocks.map((b, i) => {
          const x = startX + i * (bw + gap);
          return (
            <g key={i}>
              <rect x={x} y={y} width={bw} height={56} rx={8} fill="#FFFFFF" stroke="rgba(20,24,28,0.16)" />
              <rect x={x} y={y} width={bw} height={56} rx={8} fill="rgba(14,124,138,0.05)" />
              <text x={x + bw / 2} y={y + 22} textAnchor="middle" style={{ fontSize: 9.5, fontWeight: 700, fill: INK, fontFamily: SANS }}>{b.t}</text>
              <text x={x + bw / 2} y={y + 38} textAnchor="middle" style={{ fontSize: 8.5, fill: "#7a848e", fontFamily: MONO }}>{b.h}…</text>
              <circle cx={x + bw / 2} cy={y + 48} r={2.6} fill={GREEN} />
            </g>
          );
        })}
        <circle r={4} fill={GREEN}>
          <animateMotion dur="3s" repeatCount="indefinite" path={`M ${startX} ${linkY} L ${startX + total} ${linkY}`} />
        </circle>
        <g transform="translate(200, 182)">
          <rect x={-84} y={-15} width={168} height={30} rx={15} fill="rgba(21,133,79,0.1)" stroke="rgba(21,133,79,0.35)" />
          <circle cx={-64} cy={0} r={4} fill={GREEN}><animate attributeName="opacity" values="1;0.4;1" dur="1.6s" repeatCount="indefinite" /></circle>
          <text x={6} y={4} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: GREEN, fontFamily: MONO, letterSpacing: "0.04em" }}>CHAIN VERIFIED · 0 TAMPERING</text>
        </g>
      </svg>
    </Frame>
  );
}

// A live, append-only activity log — who did what, when.
export function ActivityLogVisual({ label = "nadir · the record" }: { label?: string }) {
  const rows = [
    { c: TEAL, who: "m.voss", act: "ran query · crews on Feeder 12", t: "06:31:04" },
    { c: AMBER, who: "system", act: "rule changed · overtime cap → 8h", t: "06:28:55" },
    { c: GREEN, who: "j.reyes", act: "cleared alert · T-114 acknowledged", t: "06:24:12" },
    { c: "#9aa2ab", who: "a.khan", act: "login · 10.2.1.44 · desktop", t: "06:19:47" },
  ];
  const MONO = "var(--font-ibm-plex-mono), monospace";
  return (
    <Frame label={label}>
      <div style={{ position: "absolute", inset: 0, padding: "22px 26px", display: "flex", flexDirection: "column", justifyContent: "center", gap: 9 }}>
        {rows.map((r, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.09)", borderRadius: 8, padding: "9px 12px" }}>
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: r.c, flex: "none", animation: `nadirBlink ${1.5 + i * 0.25}s infinite` }} />
            <span style={{ fontFamily: MONO, fontSize: 11, color: "#14181C", fontWeight: 600, flex: "none", width: 52 }}>{r.who}</span>
            <span style={{ fontSize: 12.5, color: "#3a444e", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{r.act}</span>
            <span style={{ marginLeft: "auto", fontFamily: MONO, fontSize: 10.5, color: "#9aa4ae", flex: "none" }}>{r.t}</span>
          </div>
        ))}
      </div>
    </Frame>
  );
}

// A finished, verified export handed to an auditor.
export function ExportVisual({ label = "nadir · ready for your auditor" }: { label?: string }) {
  const MONO = "var(--font-ibm-plex-mono), monospace";
  return (
    <Frame label={label}>
      <svg viewBox="0 0 400 250" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
        <g transform="translate(148, 44)">
          <rect x={0} y={0} width={104} height={132} rx={8} fill="#FFFFFF" stroke="rgba(20,24,28,0.18)" />
          {[0, 1, 2, 3, 4, 5].map((i) => (
            <rect key={i} x={16} y={20 + i * 15} width={i === 5 ? 44 : 72} height={5} rx={2.5} fill="rgba(20,24,28,0.12)" />
          ))}
          <g transform="translate(74, 96)">
            <circle r={22} fill="rgba(21,133,79,0.12)" stroke={GREEN} strokeWidth={1.5} />
            <path d="M -9 1 L -3 8 L 10 -7" fill="none" stroke={GREEN} strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" />
            <circle r={22} fill="none" stroke={GREEN} strokeWidth={1.5} opacity={0.5}>
              <animate attributeName="r" values="20;28;20" dur="2.4s" repeatCount="indefinite" />
              <animate attributeName="opacity" values="0.5;0;0.5" dur="2.4s" repeatCount="indefinite" />
            </circle>
          </g>
        </g>
        <text x={200} y={206} textAnchor="middle" style={{ fontSize: 11, fontWeight: 700, fill: GREEN, fontFamily: MONO, letterSpacing: "0.04em" }}>SOC 2 · HIPAA · SIGNED</text>
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
