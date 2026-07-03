"use client";

import { COMPANIES } from "@/lib/data";
import { HOW_STEPS, PLATFORM_LAYERS, PRICING_TIERS } from "@/lib/marketing";
import styles from "./nadir.module.css";

const heroKpis = COMPANIES[0].kpis;

function Logo({ size = 24, dot = 6 }: { size?: number; dot?: number }) {
  return (
    <div style={{ width: size, height: size, border: "2.5px solid #14181C", borderRadius: "50%", position: "relative" }}>
      <div style={{ position: "absolute", left: "50%", bottom: 2, transform: "translateX(-50%)", width: dot, height: dot, borderRadius: "50%", background: "#0E7C8A" }} />
    </div>
  );
}

export default function LandingPage({ onEnterApp }: { onEnterApp: () => void }) {
  return (
    <div style={{ background: "#FAF9F7", minHeight: "100vh", position: "relative" }}>
      <div
        style={{
          position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none",
          backgroundImage:
            "radial-gradient(circle, rgba(14,124,138,0.14) 1.1px, transparent 1.3px), radial-gradient(circle, rgba(20,24,28,0.05) 1px, transparent 1.2px)",
          backgroundSize: "27px 27px, 38px 38px", backgroundPosition: "0 0, 0 0",
          animation: "nadirDrift 30s linear infinite",
        }}
      />
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* NAV */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "22px 48px", maxWidth: 1240, margin: "0 auto" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 11 }}>
            <Logo />
            <div style={{ fontWeight: 700, fontSize: 19, letterSpacing: "0.06em" }}>NADIR</div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 34, fontSize: 14.5, color: "#3d4750", fontWeight: 500 }}>
            <a href="#how" style={{ color: "inherit", textDecoration: "none" }}>How it works</a>
            <a href="#layers" style={{ color: "inherit", textDecoration: "none" }}>Platform</a>
            <a href="#pricing" style={{ color: "inherit", textDecoration: "none" }}>Pricing</a>
            <button
              onClick={onEnterApp}
              className={styles.btnDark}
              style={{ fontFamily: "inherit", fontSize: 14.5, fontWeight: 600, padding: "10px 22px", background: "#14181C", color: "#FAF9F7", border: "none", borderRadius: 6, cursor: "pointer" }}
            >
              Open live workspace
            </button>
          </div>
        </div>

        {/* HERO */}
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 48px 64px", textAlign: "center" }}>
          <div
            style={{
              display: "inline-flex", alignItems: "center", gap: 8, fontFamily: "var(--font-ibm-plex-mono), monospace",
              fontSize: 12.5, letterSpacing: "0.12em", color: "#0E7C8A", border: "1px solid rgba(14,124,138,0.3)",
              padding: "7px 16px", borderRadius: 100, marginBottom: 34, background: "rgba(255,255,255,0.7)",
            }}
          >
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0E7C8A", animation: "nadirBlink 2.4s infinite" }} />
            OPERATIONAL INTELLIGENCE &amp; COMPLIANCE FUSION
          </div>
          <h1
            style={{
              fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 76, lineHeight: 1.04,
              margin: "0 auto 26px", maxWidth: 900, letterSpacing: "-0.015em", textWrap: "balance",
            }}
          >
            We map the floor.<br />
            <em style={{ color: "#0E7C8A", fontStyle: "italic" }}>AI tells you what it means.</em>
          </h1>
          <p style={{ fontSize: 19, lineHeight: 1.6, color: "#4a545e", maxWidth: 640, margin: "0 auto 40px", textWrap: "pretty" }}>
            Nadir connects to the databases your business already runs on — however messy — builds a live model of how everything actually moves, and tells you what breaks next and what to do about it.
          </p>
          <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
            <button
              onClick={onEnterApp}
              className={styles.btnDark}
              style={{ fontFamily: "inherit", fontSize: 16, fontWeight: 600, padding: "15px 32px", background: "#14181C", color: "#FAF9F7", border: "none", borderRadius: 8, cursor: "pointer" }}
            >
              See it on live data →
            </button>
            <a
              href="#how"
              className={styles.linkOutline}
              style={{ fontSize: 16, fontWeight: 600, padding: "15px 32px", color: "#14181C", border: "1.5px solid rgba(20,24,28,0.25)", borderRadius: 8, textDecoration: "none", background: "rgba(255,255,255,0.5)" }}
            >
              How it works
            </a>
          </div>
        </div>

        {/* PRODUCT TEASER */}
        <div style={{ maxWidth: 1080, margin: "0 auto", padding: "0 48px 90px" }}>
          <div style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid rgba(20,24,28,0.12)", overflow: "hidden", boxShadow: "0 30px 70px -34px rgba(20,30,40,0.28)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderBottom: "1px solid rgba(20,24,28,0.09)" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
              <div style={{ marginLeft: 12, fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11.5, color: "#7a848e" }}>nadir · live operational graph</div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(20,24,28,0.08)" }}>
              {heroKpis.map((k) => (
                <div key={k.label} style={{ background: "#FFFFFF", padding: "22px 24px" }}>
                  <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 8 }}>{k.label}</div>
                  <div style={{ fontSize: 26, fontWeight: 600, color: k.color }}>{k.val}</div>
                </div>
              ))}
            </div>
            <div style={{ padding: "20px 24px", display: "flex", alignItems: "center", gap: 12, borderTop: "1px solid rgba(20,24,28,0.08)", background: "#FCFBF9" }}>
              <span style={{ width: 9, height: 9, borderRadius: "50%", background: "#C7452F", flex: "none", animation: "nadirPulseRed 1.6s infinite" }} />
              <div style={{ fontSize: 14.5, color: "#2a333c" }}>
                Transformer T-114 running +8°C over seasonal norm — same signature that preceded the T-109 failure last August.{" "}
                <span style={{ color: "#0E7C8A", fontWeight: 600 }}>Recommended action ready.</span>
              </div>
            </div>
          </div>
        </div>

        {/* PROBLEM */}
        <div style={{ borderTop: "1px solid rgba(20,24,28,0.1)", background: "#F3F1EC" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 48px" }}>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18 }}>THE PROBLEM</div>
            <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 42, lineHeight: 1.15, margin: "0 0 54px", maxWidth: 720, letterSpacing: "-0.01em" }}>
              Your business runs on ten systems. None of them talk. Nobody sees the whole floor.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 44 }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>Fragmented by default</div>
                <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#4a545e", margin: 0 }}>Legacy ERPs, siloed databases, spreadsheets, paper trails. Every answer requires three exports and a meeting.</p>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>Compliance flags too late</div>
                <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#4a545e", margin: 0 }}>Existing tools catch violations after the fact. The exposure was visible in your data weeks earlier — nothing was watching.</p>
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>Knowledge walks out the door</div>
                <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#4a545e", margin: 0 }}>&quot;How we solved this last time&quot; lives in someone&apos;s head. When it looks like this again, nobody remembers.</p>
              </div>
            </div>
          </div>
        </div>

        {/* HOW IT WORKS */}
        <div id="how" style={{ maxWidth: 1240, margin: "0 auto", padding: "92px 48px" }}>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18 }}>HOW IT WORKS</div>
          <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 42, lineHeight: 1.15, margin: "0 0 56px", maxWidth: 760, letterSpacing: "-0.01em" }}>
            From raw tables to a living model of your business — in five layers.
          </h2>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {HOW_STEPS.map((s) => (
              <div key={s.n} style={{ display: "grid", gridTemplateColumns: "90px 300px 1fr", gap: 32, padding: "30px 0", borderTop: "1px solid rgba(20,24,28,0.12)", alignItems: "baseline" }}>
                <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 14, color: "#0E7C8A" }}>{s.n}</div>
                <div style={{ fontWeight: 700, fontSize: 19 }}>{s.title}</div>
                <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#4a545e", margin: 0, maxWidth: 560 }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* PLATFORM */}
        <div id="layers" style={{ background: "#F3F1EC", borderTop: "1px solid rgba(20,24,28,0.1)" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "92px 48px" }}>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18 }}>THE PLATFORM</div>
            <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 42, lineHeight: 1.15, margin: "0 0 56px", maxWidth: 700, letterSpacing: "-0.01em" }}>
              Not a wrapper on a chatbot. A fusion engine with a brain on top.
            </h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
              {PLATFORM_LAYERS.map((l) => (
                <div key={l.n} className={styles.layerCard} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "30px 28px" }}>
                  <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11.5, letterSpacing: "0.12em", color: "#0E7C8A", marginBottom: 16 }}>{l.n}</div>
                  <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{l.title}</div>
                  <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: 0 }}>{l.desc}</p>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 44, padding: "26px 30px", border: "1px solid rgba(14,124,138,0.3)", borderRadius: 12, display: "flex", gap: 20, alignItems: "baseline", background: "rgba(14,124,138,0.05)" }}>
              <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11.5, letterSpacing: "0.12em", color: "#0E7C8A", flex: "none" }}>THE MOAT</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#2a333c", margin: 0 }}>
                Every new client — and every weird ERP variant — makes the fusion layer harder to replicate. The system compounds on <em>your</em> company the longer it runs. That&apos;s why they can&apos;t rip it out.
              </p>
            </div>
          </div>
        </div>

        {/* PRICING */}
        <div id="pricing" style={{ maxWidth: 1240, margin: "0 auto", padding: "92px 48px" }}>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18 }}>PRICING</div>
          <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 42, lineHeight: 1.15, margin: "0 0 56px", letterSpacing: "-0.01em" }}>
            Starts where you are. Scales with the floor.
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "stretch" }}>
            {PRICING_TIERS.map((t) => (
              <div key={t.name} style={{ border: t.border, borderRadius: 14, padding: "34px 30px", display: "flex", flexDirection: "column", gap: 0, background: t.bg, color: t.fg }}>
                <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{t.name}</div>
                <div style={{ fontSize: 14, marginBottom: 22, opacity: 0.65 }}>{t.who}</div>
                <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                  <span style={{ fontFamily: "var(--font-newsreader), serif", fontSize: 44, fontWeight: 500 }}>{t.price}</span>
                  <span style={{ fontSize: 14, opacity: 0.6 }}>{t.per}</span>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 11, fontSize: 14.5, lineHeight: 1.45, marginBottom: 30 }}>
                  {t.feats.map((f) => (
                    <div key={f} style={{ display: "flex", gap: 10, alignItems: "baseline" }}>
                      <span style={{ width: 6, height: 6, borderRadius: "50%", background: t.dot, flex: "none", position: "relative", top: -2 }} />
                      <span>{f}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={onEnterApp}
                  style={{ marginTop: "auto", fontFamily: "inherit", fontSize: 15, fontWeight: 600, padding: 13, background: t.btnBg, color: t.btnFg, border: t.btnBorder, borderRadius: 8, cursor: "pointer" }}
                >
                  {t.cta}
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* CLOSING */}
        <div style={{ background: "#F3F1EC", borderTop: "1px solid rgba(20,24,28,0.1)" }}>
          <div style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 48px", textAlign: "center" }}>
            <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 46, margin: "0 0 18px", letterSpacing: "-0.01em" }}>
              &quot;We found this in your data in two weeks.&quot;
            </h2>
            <p style={{ fontSize: 17, color: "#4a545e", margin: "0 0 36px" }}>That sentence is the pitch. See it run on a real operation right now.</p>
            <button
              onClick={onEnterApp}
              className={styles.btnDark}
              style={{ fontFamily: "inherit", fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FAF9F7", border: "none", borderRadius: 8, cursor: "pointer" }}
            >
              Open the live workspace →
            </button>
            <div style={{ marginTop: 70, display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: 13.5, color: "#7a848e" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 9 }}>
                <Logo size={18} dot={4.5} />
                <span style={{ fontWeight: 700, letterSpacing: "0.06em", color: "#14181C" }}>NADIR</span>
              </div>
              <div>© 2026 Nadir · We map the floor.</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
