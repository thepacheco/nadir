import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import Reveal from "@/components/site/Reveal";
import { GraphVisual } from "@/components/site/Visuals";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Investors — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const THESIS = [
  { n: "01", t: "AI can finally understand a whole company", d: "Not a chatbot bolted onto a dashboard — a system that reads your real data, works out how your operation actually runs, and hands the people in charge control of it. That capability didn't exist two years ago." },
  { n: "02", t: "The mid-market is flying blind", d: "Big enterprises buy Palantir and armies of consultants. Everyone else runs on a dozen disconnected systems and a founder who can't see the whole board. That's most companies — and nobody is serving them." },
  { n: "03", t: "Whoever understands the operation wins", d: "Defensibility here isn't a feature you can screenshot. It's that Nadir tunes to each customer's operation over time — an advantage that compounds and that a competitor can't match by shipping the same screens." },
];

const STATUS = [
  { label: "Real today", tone: "#15854F", items: ["Read-only, sampled data ingestion + deterministic mapping", "Persistent operational graph + process-mining math", "Procedural, self-verifying isometric site model", "All harness-tested"] },
  { label: "Demo today", tone: "#B47614", items: ["Five industry-authentic workspaces", "Workforce & schedule reconciliation", "The proactive assistant — realistic, clearly labeled, authored"] },
  { label: "The build ahead", tone: "#0E7C8A", items: ["Three-source understanding as an automated pipeline", "Industry knowledge sweep (vertical + horizontal)", "Review layers as code, per-role access", "The compounding memory that makes month six beat week one"] },
];

export default function InvestorsPage() {
  return (
    <>
      <PageHero
        eyebrow="INVESTORS"
        title="The operating brain for the mid-market."
        sub="Palantir gave the biggest institutions the power to see and steer their whole operation. Nadir brings that to everyone else — an AI that learns how a company actually runs and gives its operators control. Pointed at businesses, not agencies."
      />

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px 60px" }}>
        <div style={{ display: "flex", gap: 14, flexWrap: "wrap" }}>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 15, fontWeight: 600, padding: "14px 28px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none" }}>
            Request the deck
          </Link>
          <Link href="/workspace" style={{ fontSize: 15, fontWeight: 600, padding: "14px 28px", color: "#14181C", border: "1px solid rgba(20,24,28,0.2)", borderRadius: 8, textDecoration: "none", background: "#FFFFFF" }}>
            See it live →
          </Link>
        </div>
      </div>

      {/* AI-CENTERED VISUAL */}
      <Reveal>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px 80px" }}>
          <GraphVisual label="nadir · one AI, the whole company" />
        </div>
      </Reveal>

      {/* THE THESIS */}
      <Reveal>
        <Section alt>
          <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>THE THESIS</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>Why this, why now.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {THESIS.map((p) => (
              <div key={p.n} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "28px 24px" }}>
                <div style={{ fontFamily: MONO, fontSize: 12, color: "#0E7C8A", marginBottom: 12 }}>{p.n}</div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: "#14181C", lineHeight: 1.3 }}>{p.t}</div>
                <p style={{ fontSize: 14, lineHeight: 1.65, color: "#5a646e", margin: 0 }}>{p.d}</p>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* THE APPROACH */}
      <Reveal>
        <Section>
          <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>THE APPROACH</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 20px", letterSpacing: "-0.01em", color: "#14181C" }}>Depth before breadth.</h2>
          <p style={{ fontSize: 16, lineHeight: 1.7, color: "#4a545e", maxWidth: 720, margin: "0 0 36px" }}>
            We don&rsquo;t train a foundation model — we stand on the best general models and make them expert at one job: understanding a company. We start with a handful of Georgia design partners and earn each industry to the depth an insider would expect, because a tool that gives operators data they can&rsquo;t use is a failure, not a feature.
          </p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {[
              { t: "Three-source understanding", d: "What you tell it, what your data shows, and what your industry always has to manage — fused into one live picture." },
              { t: "It gets better the more it's used", d: "Nadir tunes to each customer's operation the longer it runs — inside their walls, never pooled — so the value deepens and switching away means starting that understanding over." },
              { t: "Land where the pain is", d: "Owners and managers lose a day a week to chasing numbers by hand. Nadir gives that time back — a value we can show, not a percentage we made up." },
            ].map((c) => (
              <div key={c.t} style={{ background: "#F6F5F3", border: "1px solid rgba(20,24,28,0.08)", borderRadius: 12, padding: "26px 24px" }}>
                <div style={{ fontWeight: 700, fontSize: 16.5, marginBottom: 10, color: "#14181C" }}>{c.t}</div>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: 0 }}>{c.d}</p>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* HONEST STATUS */}
      <Reveal>
        <Section alt>
          <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>WHERE WE ARE — HONESTLY</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 12px", letterSpacing: "-0.01em", color: "#14181C" }}>No smoke. Here&rsquo;s the real line.</h2>
          <p style={{ fontSize: 15, color: "#5a646e", margin: "0 0 36px", maxWidth: 640 }}>We&rsquo;d rather show you exactly what&rsquo;s built, what&rsquo;s staged for the demo, and what&rsquo;s ahead than dress up a number.</p>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {STATUS.map((col) => (
              <div key={col.label} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "24px 22px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16 }}>
                  <span style={{ width: 9, height: 9, borderRadius: "50%", background: col.tone }} />
                  <span style={{ fontWeight: 700, fontSize: 15, color: "#14181C" }}>{col.label}</span>
                </div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                  {col.items.map((it) => (
                    <li key={it} style={{ display: "flex", gap: 9, fontSize: 13.5, color: "#3d4750", lineHeight: 1.5 }}>
                      <span style={{ width: 5, height: 5, borderRadius: "50%", background: col.tone, flex: "none", marginTop: 7 }} />
                      {it}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* THE ASK */}
      <Section>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Building the company that finally sees the whole board.</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 560 }}>
            If you back founders who ship honest software in hard markets, we should talk. Reach out for the deck and a walkthrough of the live product.
          </p>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>
            Get in touch →
          </Link>
        </div>
      </Section>
    </>
  );
}
