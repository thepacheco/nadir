import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import FeatureShowcase from "@/components/site/FeatureShowcase";
import { GraphVisual, PipelineVisual, AlertVisual } from "@/components/site/Visuals";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Operational Graph — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const METRICS = [
  { val: "< 50ms", label: "Query latency for complex cross-entity lookups" },
  { val: "10M+", label: "Connected entities and relations tracked in real-time" },
  { val: "Live", label: "Continuous background sync of operational relationships" },
];

const USE_CASES = [
  {
    title: "Bottleneck Analysis",
    desc: "Operations managers query the graph to trace manufacturing delays back to specific raw material shipping batches or operator shift handovers.",
  },
  {
    title: "Change Impact Audits",
    desc: "Before taking a machine offline for maintenance, query the graph to list every scheduled work order, operator, and customer invoice impacted.",
  },
  {
    title: "Safety Audits",
    desc: "Instantly list all operators currently clocked in who lack the active certifications required for the machinery assigned to their station.",
  },
];

export default function OperationalGraphPage() {
  return (
    <>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 48px 0" }}>
        <Link href="/platform" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#5a646e", textDecoration: "none", marginBottom: 32 }}>
          <ArrowRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to Platform Overview
        </Link>
      </div>

      <PageHero
        eyebrow="PLATFORM / OPERATIONAL GRAPH"
        title="A live model of your entire operation."
        sub="The Operational Graph links data across all your databases into a single, unified digital twin. Trace every worker, machine, shift, and compliance limit in real-time."
      />

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px 60px" }}>
        <div style={{ display: "flex", gap: 14 }}>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 15, fontWeight: 600, padding: "14px 28px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none" }}>
            Request a Demo
          </Link>
          <Link href="/workspace" style={{ fontSize: 15, fontWeight: 600, padding: "14px 28px", color: "#14181C", border: "1px solid rgba(20,24,28,0.2)", borderRadius: 8, textDecoration: "none", background: "#FFFFFF" }}>
            See it live →
          </Link>
        </div>
      </div>

      {/* LIVE VISUAL */}
      <Reveal>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px 80px" }}>
          <GraphVisual label="nadir · everything connected through the AI" />
        </div>
      </Reveal>

      {/* INTERACTIVE CAPABILITIES */}
      <div style={{ background: "#F6F5F3", borderTop: "1px solid rgba(20,24,28,0.08)" }}>
        <FeatureShowcase
          eyebrow="CAPABILITIES"
          title="One live model, traced across every system."
          features={[
            { label: "It connects in real time", blurb: "As your systems change, the model updates in milliseconds — not a nightly report you read the next morning.", visual: <GraphVisual label="nadir · live, sub-second" /> },
            { label: "It knows the same thing across systems", blurb: "A badge scan, an HR record, a training log — Nadir figures out they're the same person, with no translation tables.", visual: <PipelineVisual label="nadir · one identity, many systems" /> },
            { label: "It answers in plain language", blurb: "Ask \"who's clocked in without the right certification\" and get the answer — no SQL, no joining a dozen tables.", visual: <AlertVisual label="nadir · ask in plain English" /> },
          ]}
        />
      </div>

      {/* BY THE NUMBERS */}
      <Section>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>GRAPH BY THE NUMBERS</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>Proven performance.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {METRICS.map((m) => (
            <div key={m.label} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontFamily: SERIF, fontSize: 44, fontWeight: 400, color: "#0E7C8A", marginBottom: 8 }}>{m.val}</div>
              <div style={{ fontSize: 14, color: "#5a646e", lineHeight: 1.5 }}>{m.label}</div>
            </div>
          ))}
        </div>
      </Section>

      {/* HOW TEAMS USE IT */}
      <Section alt>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>USE CASES</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>How teams use the Graph.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {USE_CASES.map((uc) => (
            <div key={uc.title} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: "#14181C" }}>{uc.title}</div>
              <p style={{ fontSize: 14, lineHeight: 1.6, color: "#5a646e", margin: 0 }}>{uc.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BOTTOM CTA */}
      <Section>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Build your operational model.</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 500 }}>
            Discover how connecting your disparate database tables into an Operational Graph unlocks immediate insights.
          </p>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>
            Request a Demo →
          </Link>
        </div>
      </Section>
    </>
  );
}
