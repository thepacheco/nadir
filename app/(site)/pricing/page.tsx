import type { Metadata } from "next";
import Link from "next/link";
import { PRICING_TIERS } from "@/lib/marketing";
import { MONO, SERIF, PageHero, Section } from "@/components/site/PageShell";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Pricing — Nadir" };

const FAQ = [
  { q: "How long does implementation take?", a: "One connection, one narrow process first — typically a working operational graph on your own data inside two weeks. No consultants, no data migration: Nadir reads your systems where they already live, read-only." },
  { q: "Is my data used to train models?", a: "No. Your data is never used to train models — ours or anyone's. Access is read-only, per-tenant isolated, encrypted in transit and at rest, and every read is logged. See Security & trust for the full posture." },
  { q: "What keeps AI costs from blowing up?", a: "Ingestion discipline. Nadir maps schemas from table structure plus a few sampled rows — never full-table reads through a model. Deterministic checks (does this invoice match its PO?) run as plain algorithms; the model is reserved for what only a model can do, and accepted formats are cached, not regenerated." },
  { q: "What happens when Nadir is wrong — or my data is?", a: "Both happen, and the system is built for it. When sources disagree, Nadir holds the record as suspect data and asks you instead of silently booking it. Every confirmation teaches it which of your systems to trust, for which fields." },
  { q: "Can I switch tiers later?", a: "Yes — Founder to Operations is a connection upgrade, not a reimplementation. The ontology you confirmed carries over; you're adding direct database connections, the live ops map, and continuous compliance." },
];

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="PRICING"
        title="Starts where you are. Scales with the floor."
        sub="A solo founder and a 40-client MSP shouldn't pay the same. Every tier gets the same brain — the difference is how many systems it fuses."
      />

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, alignItems: "stretch" }}>
          {PRICING_TIERS.map((t) => (
            <div key={t.name} style={{ border: t.border, borderRadius: 14, padding: "34px 30px", display: "flex", flexDirection: "column", background: t.bg, color: t.fg }}>
              <div style={{ fontWeight: 700, fontSize: 18, marginBottom: 6 }}>{t.name}</div>
              <div style={{ fontSize: 14, marginBottom: 22, opacity: 0.65 }}>{t.who}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 24 }}>
                <span style={{ fontFamily: SERIF, fontSize: 44, fontWeight: 500 }}>{t.price}</span>
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
              <Link
                href="/workspace"
                style={{ marginTop: "auto", fontSize: 15, fontWeight: 600, padding: 13, background: t.btnBg, color: t.btnFg, border: t.btnBorder, borderRadius: 8, cursor: "pointer", textAlign: "center", textDecoration: "none" }}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
      </Section>

      <Section alt>
        <div style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18 }}>QUESTIONS, ANSWERED</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 40, lineHeight: 1.15, margin: "0 0 40px", letterSpacing: "-0.01em" }}>The fine print, in plain language.</h2>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 860 }}>
          {FAQ.map((f) => (
            <div key={f.q} style={{ padding: "26px 0", borderTop: "1px solid rgba(20,24,28,0.12)" }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{f.q}</div>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>{f.a}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div style={{ textAlign: "center", padding: "20px 0" }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, margin: "0 0 16px", letterSpacing: "-0.01em" }}>Try it before any of this matters.</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 0 30px" }}>The live workspace is open — five companies, real scenarios, no signup.</p>
          <Link
            href="/workspace"
            className={styles.btnDark}
            style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FAF9F7", borderRadius: 8, textDecoration: "none", display: "inline-block" }}
          >
            Open the live workspace →
          </Link>
        </div>
      </Section>
    </>
  );
}
