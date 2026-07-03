import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { Target, Cpu, Shield, Users } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "About — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const PRINCIPLES = [
  { icon: <Target size={22} />, title: "Ontologies over tables", desc: "Businesses don't operate on rows and columns. They operate on Entities and Relationships. We map the reality, not the schema." },
  { icon: <Cpu size={22} />, title: "Deterministic rules before AI", desc: "In regulated industries, hallucinations are unacceptable. Our compliance checks are math — AI only generates the human-readable context around the result." },
  { icon: <Shield size={22} />, title: "Your data stays yours", desc: "We never train models on your data. Every deployment runs in an isolated tenant. You own the ontology, the graph, and the audit logs." },
  { icon: <Users size={22} />, title: "Engineers talk to customers", desc: "We don't have layers between the people building the product and the people using it. Our engineers sit with plant managers and compliance officers." },
];

const TIMELINE = [
  { year: "2025", event: "Founded in Atlanta. First prototype built for a regional power utility." },
  { year: "2025", event: "Expanded demo to five regulated industries: utility, manufacturing, aerospace, staffing, and restaurants." },
  { year: "2026", event: "Live workspace demo deployed. Forward-deployed engineering model validated with initial enterprise prospects." },
  { year: "2026", event: "Platform architecture hardened: isolated tenant VPCs, immutable audit trails, BYOK encryption." },
];

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="THE COMPANY"
        title="We build the central nervous system for physical industry."
        sub="Nadir exists because mid-market companies in regulated, operationally complex industries run on fragmented systems — and no one has a single live picture of what's actually happening."
      />

      {/* OFFICE IMAGE */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px 80px" }}>
        <div style={{ borderRadius: 14, overflow: "hidden", border: "1px solid rgba(20,24,28,0.1)" }}>
          <Image
            src="/images/office.png"
            alt="Nadir team collaborating at the Atlanta office"
            width={1040}
            height={585}
            style={{ width: "100%", height: "auto", display: "block" }}
            priority
          />
        </div>
        <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", marginTop: 12, textAlign: "center" }}>
          Nadir HQ · Atlanta, GA
        </div>
      </div>

      {/* THE PROBLEM */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>THE PROBLEM</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 20px", letterSpacing: "-0.01em", color: "#14181C" }}>Fragmented by default.</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#4a545e", margin: "0 0 16px" }}>
              Industrial operations are managed through a patchwork of legacy ERPs, siloed SQL databases, paper trails, and disconnected SaaS tools. When a critical failure happens, the root cause is never in one system — it's in the gaps between them.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#4a545e", margin: 0 }}>
              Compliance requires a unified view, but because no single system sees the whole picture, teams manually export, reconcile, and analyze data after the fact. By the time a report exists, the data is already stale.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>THE SOLUTION</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 20px", letterSpacing: "-0.01em", color: "#14181C" }}>A live operational model.</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#4a545e", margin: "0 0 16px" }}>
              Nadir plugs into your existing databases — however old, messy, or undocumented — and builds a live semantic model of how your business actually operates. Not a dashboard. Not a report. A continuously updating graph of every entity and relationship in your operation.
            </p>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#4a545e", margin: 0 }}>
              On top of that graph, we run deterministic compliance checks that catch violations before they happen and generate human-readable briefings with exact next steps.
            </p>
          </div>
        </div>
      </Section>

      {/* PRINCIPLES */}
      <Section alt>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>PRINCIPLES</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 32px", letterSpacing: "-0.01em", color: "#14181C" }}>What we believe.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {PRINCIPLES.map((p) => (
            <div key={p.title} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(14,124,138,0.08)", color: "#0E7C8A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {p.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: 17, color: "#14181C" }}>{p.title}</div>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* TIMELINE */}
      <Section>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>COMPANY TIMELINE</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 32px", letterSpacing: "-0.01em", color: "#14181C" }}>Where we are.</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
          {TIMELINE.map((t, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "80px 1fr", gap: 24, padding: "20px 0", borderTop: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 13, color: "#0E7C8A", letterSpacing: "0.04em" }}>{t.year}</div>
              <div style={{ fontSize: 15, lineHeight: 1.6, color: "#3d4750" }}>{t.event}</div>
            </div>
          ))}
          <div style={{ borderTop: "1px solid rgba(20,24,28,0.1)" }} />
        </div>
      </Section>

      {/* CTA */}
      <Section alt>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 10px", letterSpacing: "-0.01em", color: "#14181C" }}>Building this interests you?</h2>
            <p style={{ fontSize: 15.5, color: "#4a545e", margin: 0 }}>We're a small team turning ugly databases into living models. It's harder than it sounds.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flex: "none" }}>
            <Link href="/careers" className={styles.btnDark} style={{ fontSize: 15, fontWeight: 600, padding: "13px 26px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none" }}>
              Open roles →
            </Link>
            <Link href="/contact" style={{ fontSize: 15, fontWeight: 600, padding: "13px 26px", color: "#14181C", border: "1px solid rgba(20,24,28,0.2)", borderRadius: 8, textDecoration: "none", background: "#FFFFFF" }}>
              Contact us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
