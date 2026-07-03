"use client";

import { useState } from "react";

const MONO = "var(--font-ibm-plex-mono), monospace";

const STEPS = [
  { n: "01", title: "Connection", blurb: "Read-only, schema-level access to the databases you already run — however messy. No manual entry, no migration." },
  { n: "02", title: "Object mapping", blurb: "AI proposes what each table actually represents in the real world. You confirm once; relationships are inferred automatically." },
  { n: "03", title: "The operational graph", blurb: "A live map of how your business actually flows — current because it reads the live database, not a snapshot." },
  { n: "04", title: "The pain-point engine", blurb: "AI watches the graph continuously. Output isn’t a chart — it’s the next move, with the evidence attached." },
  { n: "05", title: "Compounding", blurb: "Every new source makes the model sharper about your specific company. The longer it runs, the more it knows." },
];

function FadeIn({ delay, children }: { delay: number; children: React.ReactNode }) {
  return <div style={{ animation: `nadirFadeUp 0.5s ease both`, animationDelay: `${delay}ms` }}>{children}</div>;
}

function Vignette({ step }: { step: number }) {
  if (step === 0) {
    const sources = [
      { name: "PostgreSQL", meta: "erp_prod · 214 tables" },
      { name: "SQL Server", meta: "legacy WMS · 96 tables" },
      { name: "inventory_v7.xlsx", meta: "the load-bearing spreadsheet" },
    ];
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 28, height: "100%", padding: "0 12px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>
          {sources.map((s, i) => (
            <FadeIn key={s.name} delay={i * 180}>
              <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.12)", borderRadius: 9, padding: "11px 14px" }}>
                <div style={{ fontSize: 13.5, fontWeight: 700 }}>{s.name}</div>
                <div style={{ fontFamily: MONO, fontSize: 10.5, color: "#9aa2ab", marginTop: 2 }}>{s.meta}</div>
              </div>
            </FadeIn>
          ))}
        </div>
        <svg width="90" height="200" style={{ flex: "none" }}>
          {[36, 100, 164].map((y) => (
            <line key={y} x1="0" y1={y} x2="90" y2="100" stroke="rgba(14,124,138,0.55)" strokeWidth="1.4" strokeDasharray="4 3" style={{ animation: "nadirDash 0.9s linear infinite" }} />
          ))}
        </svg>
        <FadeIn delay={500}>
          <div style={{ width: 92, height: 92, border: "2.5px solid #14181C", borderRadius: "50%", position: "relative", display: "flex", alignItems: "center", justifyContent: "center", background: "#FFFFFF", flex: "none" }}>
            <span style={{ fontWeight: 700, fontSize: 13, letterSpacing: "0.06em" }}>NADIR</span>
            <div style={{ position: "absolute", left: "50%", bottom: 9, transform: "translateX(-50%)", width: 9, height: 9, borderRadius: "50%", background: "#0E7C8A", animation: "nadirBlink 2.4s infinite" }} />
          </div>
        </FadeIn>
      </div>
    );
  }
  if (step === 1) {
    const rows = [
      { t: "wo_master", o: "Work Orders", c: "98%" },
      { t: "emp_roster_v3", o: "Crews / People", c: "96%" },
      { t: "asset_registry", o: "Assets", c: "99%" },
      { t: "incident_docs", o: "Incidents & Filings", c: "88%" },
    ];
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 10, justifyContent: "center", height: "100%", padding: "0 8px" }}>
        {rows.map((r, i) => (
          <FadeIn key={r.t} delay={i * 200}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.12)", borderRadius: 9, padding: "11px 16px" }}>
              <span style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", width: 130 }}>{r.t}</span>
              <span style={{ color: "#9aa2ab" }}>→</span>
              <span style={{ fontSize: 13.5, fontWeight: 700, flex: 1 }}>{r.o}</span>
              <span style={{ fontFamily: MONO, fontSize: 10.5, color: "#9aa2ab" }}>{r.c}</span>
              <span style={{ fontFamily: MONO, fontSize: 11, color: "#15854F", background: "rgba(21,133,79,0.1)", border: "1px solid rgba(21,133,79,0.35)", padding: "2px 9px", borderRadius: 5 }}>✓</span>
            </div>
          </FadeIn>
        ))}
        <FadeIn delay={900}>
          <div style={{ fontSize: 12, color: "#9aa2ab", textAlign: "center", marginTop: 4 }}>Confirm once. 12 relationships inferred automatically after that.</div>
        </FadeIn>
      </div>
    );
  }
  if (step === 2) {
    const nodes = [
      { label: "Crews", x: 8, y: 18, c: "#0E7C8A" },
      { label: "Work Orders", x: 12, y: 62, c: "#0E7C8A" },
      { label: "Scheduling", x: 44, y: 34, c: "#15854F" },
      { label: "Field Work", x: 48, y: 74, c: "#15854F" },
      { label: "T-114 risk", x: 76, y: 46, c: "#B47614" },
    ];
    const edges = [
      [0, 2], [1, 2], [1, 3], [2, 4], [3, 4],
    ];
    return (
      <div style={{ position: "relative", height: "100%" }}>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" style={{ position: "absolute", inset: 0, width: "100%", height: "100%" }}>
          {edges.map(([a, b], i) => {
            const risky = b === 4;
            return (
              <line key={i} x1={nodes[a].x + 8} y1={nodes[a].y + 4} x2={nodes[b].x + 8} y2={nodes[b].y + 4}
                stroke={risky ? "rgba(180,118,20,0.55)" : "rgba(20,24,28,0.2)"} strokeWidth="0.5"
                strokeDasharray={risky ? "2 1.4" : undefined}
                style={risky ? { animation: "nadirDash 0.9s linear infinite" } : undefined} />
            );
          })}
        </svg>
        {nodes.map((n, i) => (
          <div key={n.label} style={{ position: "absolute", left: `${n.x}%`, top: `${n.y}%`, animation: `nadirFadeUp 0.5s ease both ${i * 140}ms` }}>
            <div style={{ display: "flex", alignItems: "center", gap: 7, background: n.c === "#B47614" ? "#FBF4E6" : "#FFFFFF", border: `1.5px solid ${n.c}55`, borderRadius: 100, padding: "7px 13px", fontSize: 12, fontWeight: 600, whiteSpace: "nowrap", boxShadow: "0 2px 8px -3px rgba(20,30,40,0.2)" }}>
              <span style={{ width: 7, height: 7, borderRadius: "50%", background: n.c }} />
              {n.label}
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (step === 3) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 12, justifyContent: "center", height: "100%", padding: "0 8px" }}>
        <FadeIn delay={0}>
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.12)", borderLeft: "3px solid #C7452F", borderRadius: 9, padding: "14px 16px" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 7 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#C7452F", animation: "nadirPulseRed 1.6s infinite" }} />
              <span style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.08em", color: "#C7452F" }}>CRITICAL · 06:12</span>
            </div>
            <div style={{ fontSize: 13.5, fontWeight: 700, marginBottom: 4 }}>Transformer T-114 running +8°C over seasonal norm</div>
            <div style={{ fontSize: 12.5, color: "#5a646e", lineHeight: 1.55 }}>Same signature preceded the T-109 failure last August.</div>
          </div>
        </FadeIn>
        <FadeIn delay={400}>
          <div style={{ background: "rgba(14,124,138,0.05)", border: "1px solid rgba(14,124,138,0.3)", borderRadius: 9, padding: "13px 16px" }}>
            <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.08em", color: "#0E7C8A", marginBottom: 6 }}>RECOMMENDED ACTION · DRAFTED</div>
            <div style={{ fontSize: 12.5, color: "#2a333c", lineHeight: 1.6 }}>Crew 7 is already at Substation 4 until 15:00 — thermal inspection costs zero extra roll. Work order drafted, waiting for sign-off.</div>
          </div>
        </FadeIn>
        <FadeIn delay={700}>
          <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
            {["PI historian · T-114 trend", "Maximo · crew 7 schedule", "Incident file · T-109"].map((c) => (
              <span key={c} style={{ fontFamily: MONO, fontSize: 10.5, color: "#0E7C8A", background: "rgba(14,124,138,0.07)", border: "1px solid rgba(14,124,138,0.25)", padding: "3px 9px", borderRadius: 5 }}>⌕ {c}</span>
            ))}
          </div>
        </FadeIn>
      </div>
    );
  }
  const sources = ["ERP", "HR", "SCADA", "Docs", "Finance", "Telematics"];
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 20, justifyContent: "center", alignItems: "center", height: "100%", padding: "0 12px" }}>
      <div style={{ display: "flex", gap: 10 }}>
        {sources.map((s, i) => (
          <FadeIn key={s} delay={i * 160}>
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
              <span style={{ width: 12, height: 12, borderRadius: i < 4 ? "2px" : "50%", background: i === 5 ? "#15854F" : "#0E7C8A" }} />
              <span style={{ fontFamily: MONO, fontSize: 10, color: "#7a848e" }}>{s}</span>
            </div>
          </FadeIn>
        ))}
      </div>
      <FadeIn delay={sources.length * 160}>
        <div style={{ width: 340, height: 6, background: "rgba(20,24,28,0.08)", borderRadius: 3, overflow: "hidden" }}>
          <div style={{ width: "86%", height: "100%", background: "linear-gradient(90deg, #0E7C8A, #15854F)", borderRadius: 3 }} />
        </div>
      </FadeIn>
      <FadeIn delay={sources.length * 160 + 200}>
        <div style={{ fontSize: 13, color: "#4a545e", textAlign: "center", maxWidth: 380, lineHeight: 1.6 }}>
          Model sharpness compounds with each source. That&apos;s why they can&apos;t rip it out.
        </div>
      </FadeIn>
    </div>
  );
}

export default function InteractiveHow() {
  const [active, setActive] = useState(0);
  return (
    <div id="how" style={{ maxWidth: 1240, margin: "0 auto", padding: "92px 48px" }}>
      <div style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18 }}>HOW IT WORKS</div>
      <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 42, lineHeight: 1.15, margin: "0 0 12px", maxWidth: 760, letterSpacing: "-0.01em" }}>
        From raw tables to a living model of your business — in five layers.
      </h2>
      <div style={{ fontSize: 14.5, color: "#7a848e", marginBottom: 40 }}>Click each layer to see it work.</div>
      <div style={{ display: "grid", gridTemplateColumns: "380px 1fr", gap: 28, alignItems: "stretch" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {STEPS.map((s, i) => {
            const on = i === active;
            return (
              <button
                key={s.n}
                onClick={() => setActive(i)}
                style={{
                  fontFamily: "inherit", textAlign: "left", padding: "16px 18px", borderRadius: 11, cursor: "pointer",
                  background: on ? "#FFFFFF" : "transparent",
                  border: `1.5px solid ${on ? "rgba(14,124,138,0.5)" : "rgba(20,24,28,0.1)"}`,
                  boxShadow: on ? "0 8px 24px -12px rgba(14,124,138,0.35)" : "none",
                  transition: "border-color 0.2s, box-shadow 0.2s, background 0.2s",
                }}
              >
                <div style={{ display: "flex", alignItems: "baseline", gap: 12, marginBottom: on ? 7 : 0 }}>
                  <span style={{ fontFamily: MONO, fontSize: 12.5, color: on ? "#0E7C8A" : "#9aa2ab" }}>{s.n}</span>
                  <span style={{ fontSize: 16, fontWeight: 700, color: on ? "#14181C" : "#5a646e" }}>{s.title}</span>
                </div>
                {on && <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "#4a545e" }}>{s.blurb}</div>}
              </button>
            );
          })}
        </div>
        <div style={{ background: "#F6F4EF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 14, padding: 26, minHeight: 380, position: "relative", overflow: "hidden" }}>
          <div key={active} style={{ height: "100%" }}>
            <Vignette step={active} />
          </div>
        </div>
      </div>
    </div>
  );
}
