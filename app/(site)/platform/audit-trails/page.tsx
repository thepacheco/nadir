import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageHero, Section } from "@/components/site/PageShell";
import Reveal from "@/components/site/Reveal";
import FeatureShowcase from "@/components/site/FeatureShowcase";
import { LedgerVisual, ActivityLogVisual, ExportVisual } from "@/components/site/Visuals";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Audit Trails — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const USE_CASES = [
  {
    title: "SOC 2 audits",
    desc: "Hand auditors the complete record of who accessed what, ran which query, and changed which setting — already formatted.",
  },
  {
    title: "Safety incidents",
    desc: "After an incident, pull the exact trail: who was on, what was checked, and when — down to the second.",
  },
  {
    title: "Security reviews",
    desc: "Spot unusual access, review sessions, and confirm nobody saw what they shouldn't have.",
  },
];

export default function AuditTrailsPage() {
  return (
    <>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 48px 0" }}>
        <Link href="/platform" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#5a646e", textDecoration: "none", marginBottom: 32 }}>
          <ArrowRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to Platform Overview
        </Link>
      </div>

      <PageHero
        eyebrow="PLATFORM / AUDIT TRAILS"
        title="A record nobody can quietly change."
        sub="Every query, setting change, and cleared alert is written to a sealed, append-only log. Once it's in, it can't be edited or deleted — only added to."
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

      {/* HERO VISUAL — the sealed chain */}
      <Reveal>
        <div style={{ maxWidth: 900, margin: "0 auto", padding: "0 48px 80px" }}>
          <LedgerVisual label="nadir · every action, sealed to the last" />
        </div>
      </Reveal>

      {/* INTERACTIVE CAPABILITIES */}
      <div style={{ background: "#F6F5F3", borderTop: "1px solid rgba(20,24,28,0.08)" }}>
        <FeatureShowcase
          eyebrow="WHAT YOU GET"
          title="Proof, not promises."
          features={[
            { label: "Nothing can be quietly changed", blurb: "Each entry is locked to the one before it. Alter any past record and the chain breaks — so tampering shows immediately.", visual: <LedgerVisual /> },
            { label: "Every action is on the record", blurb: "Who logged in, what they queried, which alert they cleared, what setting changed — captured with the user, time, and device.", visual: <ActivityLogVisual /> },
            { label: "Hand auditors a clean file", blurb: "Filter by date, person, or system and export a complete, verified log — pre-formatted for SOC 2, HIPAA, and your regulator.", visual: <ExportVisual /> },
          ]}
        />
      </div>

      {/* HOW TEAMS USE IT */}
      <Reveal>
        <Section>
          <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>USE CASES</div>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>When it matters most.</h2>
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
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Audit day, without the scramble.</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 500 }}>
            Every access and every change, already documented and ready to show.
          </p>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>
            Request a Demo →
          </Link>
        </div>
      </Section>
    </>
  );
}
