import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, Section } from "@/components/site/PageShell";
import Reveal from "@/components/site/Reveal";
import FeatureShowcase from "@/components/site/FeatureShowcase";
import { MappingVisual, ActivityLogVisual, AlertVisual } from "@/components/site/Visuals";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Schema Mapper — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const USE_CASES = [
  {
    title: "Getting started",
    desc: "Your team confirms what Nadir figured out in an afternoon — no database workshop, no consultants.",
  },
  {
    title: "When a system changes",
    desc: "An ERP update moves your tables around? Re-point them to the right things in minutes, not a re-integration project.",
  },
  {
    title: "One person, many systems",
    desc: "The same employee lives in your old database, your badge reader, and payroll. Nadir ties them together as one.",
  },
];

export default function SchemaMapperPage() {
  return (
    <>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 48px 0" }}>
        <Link href="/platform" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#5a646e", textDecoration: "none", marginBottom: 32 }}>
          <ArrowRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to Platform Overview
        </Link>
      </div>

      <PageHero
        eyebrow="PLATFORM / SCHEMA MAPPER"
        title="You have the final say on what your data means."
        sub="Nadir works out what your cryptic table names really are, then shows you its answers. You click to confirm the ones it's sure about and settle the ones it isn't. No SQL, no database team."
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

      {/* HERO VISUAL — cryptic columns → plain things */}
      <Reveal>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px 80px" }}>
          <MappingVisual label="nadir · your columns, in plain english" />
        </div>
      </Reveal>

      {/* INTERACTIVE CAPABILITIES */}
      <div style={{ background: "#F6F5F3", borderTop: "1px solid rgba(20,24,28,0.08)" }}>
        <FeatureShowcase
          eyebrow="HOW IT WORKS"
          title="Point and confirm. That's it."
          features={[
            { label: "See its answers, side by side", blurb: "Your raw column names on one side, what Nadir thinks each one is on the other. Click to accept, or change it — no code.", visual: <MappingVisual /> },
            { label: "It catches the mismatches", blurb: "A date that isn't really a date, an ID that won't line up — Nadir flags it and suggests the fix before it can break a rule.", visual: <AlertVisual label="nadir · things to check" /> },
            { label: "Every change is tracked", blurb: "Each confirmation is logged with who made it and when, so you can always see how your data got mapped the way it did.", visual: <ActivityLogVisual label="nadir · mapping history" /> },
          ]}
        />
      </div>

      {/* HOW TEAMS USE IT */}
      <Reveal>
        <Section>
          <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>USE CASES</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>Where it earns its keep.</h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
            {USE_CASES.map((uc) => (
              <div key={uc.title} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "28px 24px" }}>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: "#14181C" }}>{uc.title}</div>
                <p style={{ fontSize: 14, lineHeight: 1.6, color: "#5a646e", margin: 0 }}>{uc.desc}</p>
              </div>
            ))}
          </div>
        </Section>
      </Reveal>

      {/* BOTTOM CTA */}
      <Section>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Your data, in your words.</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 500 }}>
            See how quickly Nadir turns your raw tables into a map you actually recognize.
          </p>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>
            Request a Demo →
          </Link>
        </div>
      </Section>
    </>
  );
}
