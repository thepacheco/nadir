import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { ArrowRight } from "lucide-react";
import Reveal from "@/components/site/Reveal";
import FeatureShowcase from "@/components/site/FeatureShowcase";
import { GraphVisual, PipelineVisual, IsoVisual } from "@/components/site/Visuals";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Ontology Engine — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const METRICS = [
  { val: "99.8%", label: "Mapping accuracy on standard ERP schemas" },
  { val: "< 14 Days", label: "Average deployment time from connection to verified graph" },
  { val: "100+", label: "Database and ERP connectors supported out-of-the-box" },
];

const USE_CASES = [
  {
    title: "Manufacturing Floor",
    desc: "Map raw tables containing plant schedules, machine telemetry, and work orders into connected Shift, Machine, and WorkOrder objects.",
  },
  {
    title: "Healthcare Staffing",
    desc: "Resolve entity matches between nurse scheduling software, external credential databases, and payroll spreadsheets to monitor hours worked.",
  },
  {
    title: "Power & Utilities",
    desc: "Connect substation physical entry logs, employee security clearances, and work order schedules to enforce access control compliance.",
  },
  {
    title: "Aerospace Part Traceability",
    desc: "Track raw material batch numbers from supplier invoices to final assembly quality tests across separate legacy SQL databases.",
  },
];

export default function OntologyEnginePage() {
  return (
    <>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 48px 0" }}>
        <Link href="/platform" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#5a646e", textDecoration: "none", marginBottom: 32 }}>
          <ArrowRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to Platform Overview
        </Link>
      </div>

      <PageHero
        eyebrow="PLATFORM / ONTOLOGY ENGINE"
        title="It turns your data into a map of your company."
        sub="Nadir reads your messy tables and builds the real thing they describe — your sites, your machines, your people, and how they all connect. You see your operation, not a schema."
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

      {/* ISOMETRIC HERO VISUAL */}
      <Reveal>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px 80px" }}>
          <IsoVisual label="nadir · your operation, built from your data" />
        </div>
      </Reveal>

      {/* INTERACTIVE CAPABILITIES */}
      <div style={{ background: "#F6F5F3", borderTop: "1px solid rgba(20,24,28,0.08)" }}>
        <FeatureShowcase
          eyebrow="HOW IT MAPS YOU"
          title="From raw tables to a map you recognize."
          features={[
            { label: "It reads what you already have", blurb: "Read-only access to the systems you run on — Oracle, SAP, SQL Server, spreadsheets. Nothing to migrate, nothing to rebuild.", visual: <PipelineVisual label="nadir · read-only, sampled" /> },
            { label: "It works out what everything is", blurb: "\"EMP_ID_V2\" becomes an employee, \"TBL_WRK_ORD\" becomes a work order. Nadir figures it out and flags anything it's unsure about for you to confirm.", visual: <GraphVisual label="nadir · figuring out your data" /> },
            { label: "It builds your operation", blurb: "The confirmed pieces become one live map of your company — sites, machines, people, and how they connect, with the trouble spots lit up.", visual: <IsoVisual label="nadir · the map it builds" /> },
          ]}
        />
      </div>

      {/* BY THE NUMBERS */}
      <Section>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>ONTOLOGY BY THE NUMBERS</div>
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
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>How teams use the engine.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {USE_CASES.map((uc) => (
            <div key={uc.title} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: "#14181C" }}>{uc.title}</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.6, color: "#5a646e", margin: 0 }}>{uc.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* BOTTOM CTA */}
      <Section>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Ready to map your databases?</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 500 }}>
            Connect with our team to setup a pilot deployment with your own schemas in under two weeks.
          </p>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>
            Schedule a Demo →
          </Link>
        </div>
      </Section>
    </>
  );
}
