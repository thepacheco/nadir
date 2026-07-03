import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { CheckCircle, Network, Cpu, Shield, ArrowRight } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Operational Graph — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const CAPABILITIES = [
  {
    title: "Continuous Event Integration",
    desc: "The Operational Graph is not a batch-processed report. As updates occur in your source databases, the graph resolves links and updates states in milliseconds.",
    bullets: [
      "Sub-second latency from source table updates to graph nodes",
      "Event-driven architecture connects streaming logs directly into the model",
      "Maintains complete relationship tracking over time",
    ],
  },
  {
    title: "Identity & Match Resolution",
    desc: "Unify records that represent the same physical entity across different database systems without creating manual translation tables.",
    bullets: [
      "Links badge scan IDs with HR employee directories and safety training logs",
      "Connects material batch codes from supplier shipping notes to internal inventory counts",
      "Discovers and resolves cross-database identity conflicts automatically",
    ],
  },
  {
    title: "Unified Query API",
    desc: "Query the status of your business using real-world vocabulary instead of joining a dozen legacy tables with hundreds of lines of SQL.",
    bullets: [
      "GraphQL and standard SQL access to the operational model",
      "Trace downstream dependencies automatically (e.g. Find all orders impacted by a broken machine)",
      "Sync graph outputs directly to ERP systems or dashboards via webhooks",
    ],
  },
];

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

      {/* CODE VISUAL */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px 80px" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderBottom: "1px solid rgba(20,24,28,0.08)" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
            <div style={{ marginLeft: 12, fontFamily: MONO, fontSize: 11.5, color: "#7a848e" }}>nadir · operational graph relationship lookup</div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 13, color: "#5a646e", lineHeight: 2.2, padding: "24px 28px" }}>
            <div><span style={{ color: "#7a848e" }}>graph_query</span> = Machine[T-114]</div>
            <div>&nbsp;&nbsp;→ connected_to: <span style={{ color: "#0E7C8A" }}>MaintenanceLog[3 records]</span></div>
            <div>&nbsp;&nbsp;→ running_shift: <span style={{ color: "#0E7C8A" }}>Shift[Code: SFT-A]</span></div>
            <div>&nbsp;&nbsp;→ assigned_operator: <span style={{ color: "#0E7C8A" }}>Operator[Name: Jose Torres]</span></div>
            <div>&nbsp;&nbsp;&nbsp;&nbsp;→ certified_for_machine: <span style={{ color: "#C7452F" }}>False (Certification Expired: 2026-06-15)</span></div>
            <div><span style={{ color: "#C7452F" }}>alert triggered: certification_mismatch → routed to plant manager ✓</span></div>
          </div>
        </div>
      </div>

      {/* FEATURE PILLARS */}
      <Section alt>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>CAPABILITIES</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>Trace relationships across systems.</h2>
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
