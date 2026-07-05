import Link from "next/link";
import { COMPANIES } from "@/lib/data";
import { PRICING_TIERS } from "@/lib/marketing";
import InteractiveHow from "@/components/site/InteractiveHow";
import ROICalculator from "@/components/site/ROICalculator";
import Reveal from "@/components/site/Reveal";
import FeatureShowcase from "@/components/site/FeatureShowcase";
import { GraphVisual, PipelineVisual, IsoVisual, AlertVisual } from "@/components/site/Visuals";
import NadirOrb from "@/components/NadirOrb";
import styles from "@/components/nadir/nadir.module.css";

const MONO = "var(--font-ibm-plex-mono), monospace";
const heroKpis = COMPANIES[0].kpis;

export default function Home() {
  return (
    <>
      {/* HERO */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "72px 48px 64px", textAlign: "center" }}>
        <div style={{ display: "flex", justifyContent: "center", marginBottom: 24 }}>
          <NadirOrb size={92} />
        </div>
        <div
          style={{
            display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO,
            fontSize: 12.5, letterSpacing: "0.12em", color: "#0E7C8A", border: "1px solid rgba(14,124,138,0.3)",
            padding: "7px 16px", borderRadius: 100, marginBottom: 28, background: "rgba(255,255,255,0.7)",
          }}
        >
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#0E7C8A", animation: "nadirBlink 2.4s infinite" }} />
          MEET NADIR · THE OPERATIONAL AI
        </div>
        <h1
          style={{
            fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 76, lineHeight: 1.04,
            margin: "0 auto 26px", maxWidth: 900, letterSpacing: "-0.015em", textWrap: "balance",
          }}
        >
          One AI that understands<br />
          <em style={{ color: "#0E7C8A", fontStyle: "italic" }}>your entire company.</em>
        </h1>
        <p style={{ fontSize: 19, lineHeight: 1.6, color: "#4a545e", maxWidth: 540, margin: "0 auto 40px", textWrap: "pretty" }}>
          Give Nadir your data. It maps how your company runs and watches it around the clock — so you stay in control of the whole floor.
        </p>
        <div style={{ display: "flex", gap: 14, justifyContent: "center" }}>
          <Link
            href="/workspace"
            className={styles.btnDark}
            style={{ fontSize: 16, fontWeight: 600, padding: "15px 32px", background: "#14181C", color: "#FAF9F7", border: "none", borderRadius: 8, cursor: "pointer", textDecoration: "none" }}
          >
            See it on live data →
          </Link>
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
            <div style={{ marginLeft: 12, fontFamily: MONO, fontSize: 11.5, color: "#7a848e" }}>nadir · your operation, understood by AI</div>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(20,24,28,0.08)" }}>
            {heroKpis.map((k) => (
              <div key={k.label} style={{ background: "#FFFFFF", padding: "22px 24px" }}>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 8 }}>{k.label}</div>
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
        <div style={{ textAlign: "center", marginTop: 22, fontFamily: MONO, fontSize: 12, color: "#7a848e" }}>
          Five industries in the live demo — utility · manufacturing · staffing · restaurants · space systems
        </div>
      </div>

      {/* PROBLEM */}
      <div style={{ borderTop: "1px solid rgba(20,24,28,0.1)", background: "#F3F1EC" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 48px" }}>
          <div style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18 }}>THE PROBLEM</div>
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

      {/* INTERACTIVE HOW IT WORKS */}
      <InteractiveHow />

      {/* PLATFORM PREVIEW — interactive, show-don't-tell */}
      <div style={{ background: "#F3F1EC", borderTop: "1px solid rgba(20,24,28,0.1)" }}>
        <Reveal>
          <FeatureShowcase
            eyebrow="WHAT NADIR DOES"
            title="Point it at your business. Watch it take over the hard part."
            features={[
              { label: "It understands your company", blurb: "Give it your systems — or just your website and a description. Nadir figures out what everything is and how it connects.", visual: <GraphVisual /> },
              { label: "It maps your data", blurb: "It samples your databases and spreadsheets — a few rows, never the whole thing — and turns raw tables into the real things you run on.", visual: <PipelineVisual /> },
              { label: "It shows you your floor", blurb: "Your whole operation, from above — every site, every zone, who's on shift, what's breaking, live.", visual: <IsoVisual /> },
              { label: "It tells you what needs you", blurb: "Not another red light. Nadir catches the problem, explains it in plain English, and routes it to the person who can fix it.", visual: <AlertVisual /> },
            ]}
          />
          <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px 60px" }}>
            <Link href="/platform" style={{ fontSize: 15, fontWeight: 600, color: "#0E7C8A", textDecoration: "none" }}>
              Explore the full platform →
            </Link>
          </div>
        </Reveal>
      </div>

      {/* ROI CALCULATOR */}
      <Reveal>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "92px 48px" }}>
        <div style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18, textAlign: "center" }}>THE BUSINESS CASE</div>
        <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 42, lineHeight: 1.15, margin: "0 auto 16px", textAlign: "center", letterSpacing: "-0.01em" }}>
          Predictable payback in weeks, not years.
        </h2>
        <p style={{ fontSize: 16.5, color: "#5a646e", textAlign: "center", maxWidth: 620, margin: "0 auto 40px", lineHeight: 1.55 }}>
          Nadir&rsquo;s return is simple: the hours your team stops spending chasing numbers across systems. Pick your world and see where they come from.
        </p>
        <ROICalculator />
      </div>
      </Reveal>

      {/* PRICING PREVIEW */}
      <Reveal>
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "92px 48px" }}>
        <div style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18 }}>PRICING</div>
        <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 42, lineHeight: 1.15, margin: "0 0 40px", letterSpacing: "-0.01em" }}>
          Starts where you are. Scales with the floor.
        </h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(190px, 1fr))", gap: 14 }}>
          {PRICING_TIERS.map((t) => (
            <Link key={t.name} href="/pricing" style={{ textDecoration: "none", color: t.fg, border: t.border, borderRadius: 14, padding: "22px 22px", background: t.bg, display: "block" }}>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 4 }}>{t.name}</div>
              <div style={{ fontSize: 12.5, opacity: 0.65, marginBottom: 14, minHeight: 34 }}>{t.who}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 5 }}>
                <span style={{ fontFamily: "var(--font-newsreader), serif", fontSize: 30, fontWeight: 500 }}>{t.price}</span>
                <span style={{ fontSize: 12.5, opacity: 0.6 }}>{t.per}</span>
              </div>
            </Link>
          ))}
        </div>
        <div style={{ marginTop: 26 }}>
          <Link href="/pricing" style={{ fontSize: 15, fontWeight: 600, color: "#0E7C8A", textDecoration: "none" }}>
            Full pricing &amp; FAQ →
          </Link>
        </div>
      </div>
      </Reveal>

      {/* CLOSING CTA */}
      <div style={{ background: "#F3F1EC", borderTop: "1px solid rgba(20,24,28,0.1)" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "84px 48px", textAlign: "center" }}>
          <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 46, margin: "0 0 18px", letterSpacing: "-0.01em" }}>
            See Nadir run a real operation.
          </h2>
          <p style={{ fontSize: 17, color: "#4a545e", margin: "0 0 36px" }}>Step into a live company and watch the AI map it, watch it, and tell you what needs you.</p>
          <Link
            href="/workspace"
            className={styles.btnDark}
            style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FAF9F7", border: "none", borderRadius: 8, cursor: "pointer", textDecoration: "none", display: "inline-block" }}
          >
            Open the live workspace →
          </Link>
        </div>
      </div>
    </>
  );
}
