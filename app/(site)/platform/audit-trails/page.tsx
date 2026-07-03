import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { CheckCircle, Lock, Server, FileText, ArrowRight } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Audit Trails — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const CAPABILITIES = [
  {
    title: "Cryptographic Verification",
    desc: "Every record in the log is hashed and linked to the preceding entry using SHA-256 chains, ensuring that any attempt to alter a historical entry is immediately detected.",
    bullets: [
      "Tamper-evident design detects alterations instantly",
      "Ledger is completely append-only — edits and deletions are physically impossible",
      "Periodic cryptographic audits verify the entire database integrity automatically",
    ],
  },
  {
    title: "Complete Activity Logging",
    desc: "We track every touchpoint. Every query, user login, alert dismissal, and write-back action is logged with detailed metadata.",
    bullets: [
      "Records username, IP address, device footprint, and timestamp",
      "Tracks exact query arguments and database records returned",
      "Logs structural updates like schema mappings and rule changes",
    ],
  },
  {
    title: "One-Click Compliance Exports",
    desc: "Export complete, verified operational logs in format templates optimized for SOC-2, HIPAA, and industry-specific regulators.",
    bullets: [
      "Pre-formatted templates for immediate regulatory compliance signs",
      "Filters logs by date range, specific entities, or individual user accounts",
      "Supports secure, encrypted transfer options to external auditor folders",
    ],
  },
];

const METRICS = [
  { val: "100%", label: "Cryptographic tamper-proofing and data integrity" },
  { val: "Instant", label: "Auditor alignment during compliance checkups" },
  { val: "7 Years", label: "Standard long-term secure log retention options" },
];

const USE_CASES = [
  {
    title: "SOC-2 Type II Audits",
    desc: "Provide external auditors with the complete, tamper-proof record of all database access, query executions, and admin configurations.",
  },
  {
    title: "Safety Incident Analysis",
    desc: "In the event of a safety incident, pull the complete audit trail showing exactly which operator was active and when certifications were checked.",
  },
  {
    title: "IT Security & Credential Reviews",
    desc: "IT security teams audit user sessions, query patterns, and API tokens to detect anomalous activity or verify access limits.",
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
        title="Immutable security logging."
        sub="The foundation of operational trust. Every query, configuration, alert dismissal, and mapping change is recorded in an unalterable, cryptographically signed ledger."
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
            <div style={{ marginLeft: 12, fontFamily: MONO, fontSize: 11.5, color: "#7a848e" }}>nadir · ledger verification output</div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 13, color: "#5a646e", lineHeight: 2.2, padding: "24px 28px" }}>
            <div><span style={{ color: "#7a848e" }}>ledger_verification:</span> <span style={{ color: "#0E7C8A" }}>initiated</span></div>
            <div><span style={{ color: "#7a848e" }}>verifying block hashes:</span></div>
            <div>&nbsp;&nbsp;- Block #14492: 0e82c1... [OK]</div>
            <div>&nbsp;&nbsp;- Block #14493: 84a7e2... [OK]</div>
            <div>&nbsp;&nbsp;- Block #14494: f109b4... [OK]</div>
            <div><span style={{ color: "#15854F" }}>cryptographic chain validated: 0 modifications detected ✓</span></div>
            <div><span style={{ color: "#7a848e" }}>system state: unalterable, append-only ✓</span></div>
          </div>
        </div>
      </div>

      {/* FEATURE PILLARS */}
      <Section alt>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>CAPABILITIES</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>Immutable, unalterable ledger logs.</h2>
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
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>AUDITS BY THE NUMBERS</div>
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
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>How teams use Audit Trails.</h2>
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
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Audit-readiness, resolved.</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 500 }}>
            Ensure your operational checks and data access logs are fully documented, secure, and compliant.
          </p>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>
            Request a Demo →
          </Link>
        </div>
      </Section>
    </>
  );
}
