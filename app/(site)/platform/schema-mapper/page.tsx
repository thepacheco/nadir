import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { CheckCircle, AlertTriangle, Users, Database, ArrowRight } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Schema Mapper — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const CAPABILITIES = [
  {
    title: "Interactive Column Mapping",
    desc: "The Schema Mapper provides a visual workspace where your team can view suggestions, click to approve, or drag-and-drop to manually override links.",
    bullets: [
      "No coding or SQL knowledge required to edit mappings",
      "Side-by-side display of source columns and target ontology models",
      "Live search and filter to find columns across thousands of tables",
    ],
  },
  {
    title: "Type & Structure Validation",
    desc: "Our validation engine runs continuously as you map, alerting you to data type mismatches, null values, or structural inconsistencies before they affect rules.",
    bullets: [
      "Flags type mismatches (e.g. mapping a TEXT column to a DATETIME object)",
      "Highlights missing foreign key paths or broken connections",
      "Gives detailed suggestions for resolving mapping conflicts",
    ],
  },
  {
    title: "Version Control & Collaboration",
    desc: "Changes to your mappings are treated as code. Every mapping update creates a new version, allowing you to rollback or audit changes over time.",
    bullets: [
      "Full log of who approved or edited each mapping",
      "Review history shows before/after schema snapshots",
      "Compare different mapping versions in a structured format",
    ],
  },
];

const METRICS = [
  { val: "1 Click", label: "Approval for high-confidence suggestions" },
  { val: "Zero", label: "Database experience required for operational sign-off" },
  { val: "100%", label: "Audit logging on all schema mapping edits" },
];

const USE_CASES = [
  {
    title: "IT Integration Workshops",
    desc: "IT teams and business stakeholders sit together to confirm mappings, replacing weeks of traditional database architecture workshops.",
  },
  {
    title: "Resolving ERP Upgrades",
    desc: "When an ERP vendor updates their database schema, use Schema Mapper to re-link relocated tables to the operational model in minutes.",
  },
  {
    title: "Cross-System Synchronization",
    desc: "Map the 'Employee' object across a legacy SQL database, an Active Directory sync, and a badge reader database to unify user identities.",
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
        title="Human-in-the-loop schema confirmation."
        sub="The Schema Mapper is the interactive workspace where your domain experts validate AI suggestions. Drag-and-drop raw columns to targets with live data previews."
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

      {/* CODE VISUAL */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px 80px" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderBottom: "1px solid rgba(20,24,28,0.08)" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
            <div style={{ marginLeft: 12, fontFamily: MONO, fontSize: 11.5, color: "#7a848e" }}>nadir · validation output</div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 13, color: "#5a646e", lineHeight: 2.2, padding: "24px 28px" }}>
            <div><span style={{ color: "#7a848e" }}>running_validation:</span> <span style={{ color: "#0E7C8A" }}>active</span></div>
            <div><span style={{ color: "#7a848e" }}>warnings:</span></div>
            <div>&nbsp;&nbsp;[WARN] <span style={{ color: "#C7452F" }}>type_mismatch</span> on table: oracle_erp.TBL_WRK_ORD_99</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;→ source column <span style={{ color: "#C7452F" }}>EMP_ID</span> (VARCHAR) mapped to target <span style={{ color: "#15854F" }}>Employee.id</span> (INTEGER)</div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;→ <span style={{ color: "#0E7C8A" }}>resolution:</span> system will auto-cast VARCHAR to INTEGER at runtime. Mapped successfully.</div>
            <div><span style={{ color: "#15854F" }}>validation status: 0 critical errors, 1 warning (cast resolved) ✓</span></div>
          </div>
        </div>
      </div>

      {/* FEATURE PILLARS */}
      <Section alt>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>CAPABILITIES</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>Fast and secure mapping tools.</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
          {CAPABILITIES.map((cap, i) => (
            <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48, borderTop: "1px solid rgba(20,24,28,0.1)", paddingTop: 32 }}>
              <div>
                <h3 style={{ fontWeight: 700, fontSize: 19, color: "#14181C", margin: "0 0 12px" }}>{cap.title}</h3>
                <p style={{ fontSize: 15, lineHeight: 1.65, color: "#4a545e", margin: 0 }}>{cap.desc}</p>
              </div>
              <div>
                <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
                  {cap.bullets.map((b) => (
                    <li key={b} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "#3d4750", lineHeight: 1.5 }}>
                      <CheckCircle size={16} style={{ color: "#15854F", flex: "none", marginTop: 3 }} />
                      {b}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* BY THE NUMBERS */}
      <Section>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>MAPPER BY THE NUMBERS</div>
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
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>How teams use Schema Mapper.</h2>
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
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Streamline mapping reviews.</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 500 }}>
            See how your team can easily align raw data columns with operational workflows using Nadir.
          </p>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>
            Request a Demo →
          </Link>
        </div>
      </Section>
    </>
  );
}
