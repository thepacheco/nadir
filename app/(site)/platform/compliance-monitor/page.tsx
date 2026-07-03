import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { CheckCircle, AlertOctagon, RefreshCw, Send, ArrowRight } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Compliance Monitor — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const CAPABILITIES = [
  {
    title: "Zero-Hallucination Evaluation",
    desc: "We do not ask chatbots if your business complies with rules. The engine translates policies into mathematical constraints executed directly over the Operational Graph.",
    bullets: [
      "No probability or random variance — evaluation is strictly binary (Pass/Fail)",
      "Supports complex logic constraints including temporal boundaries and dependency checks",
      "Full tracking of compliance history for subsequent auditor reviews",
    ],
  },
  {
    title: "AI-Generated Actionable Briefings",
    desc: "When a violation is detected, Nadir uses language models to draft a human-readable summary of what broke, why it matters, and the recommended steps to fix it.",
    bullets: [
      "Saves hours translating database IDs and logs into plain-English reports",
      "Compiles exact evidence logs (SQL rows, timestamps) and attaches them to the briefing",
      "Prepares draft tickets, shift schedules, or write-back commands for quick operational sign-off",
    ],
  },
  {
    title: "Role-Based Alerts & Workflows",
    desc: "Alerts are automatically routed to the right people based on severity, category, and department, preventing alert fatigue.",
    bullets: [
      "Supports alerts via SMS, email, Slack, Microsoft Teams, and Webhook integrations",
      "Automatic escalation paths if an alert is not acknowledged within a set time",
      "Allows operations staff to log notes and sign off directly from their mobile devices",
    ],
  },
];

const METRICS = [
  { val: "Zero", label: "AI Hallucinations in rule evaluation" },
  { val: "92%", label: "Average reduction in time to resolve regulatory violations" },
  { val: "500+", label: "Pre-built compliance rule templates for standard frameworks" },
];

const USE_CASES = [
  {
    title: "OSHA & Shift Safety",
    desc: "Verify in real-time that no operator is assigned to machinery without active certifications, preventing safety incidents and regulatory fines.",
  },
  {
    title: "NERC CIP Power Security",
    desc: "Monitor substation physical entry logs alongside access clearance databases to instantly flag and report unauthorized physical access.",
  },
  {
    title: "Financial Audits",
    desc: "Verify that all work orders exceeding $50k have direct sign-off signatures from authorized managers before parts are dispatched.",
  },
];

export default function ComplianceMonitorPage() {
  return (
    <>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 48px 0" }}>
        <Link href="/platform" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#5a646e", textDecoration: "none", marginBottom: 32 }}>
          <ArrowRight size={16} style={{ transform: "rotate(180deg)" }} /> Back to Platform Overview
        </Link>
      </div>

      <PageHero
        eyebrow="PLATFORM / COMPLIANCE MONITOR"
        title="Deterministic operational compliance."
        sub="Monitor your operations against regulations and business rules continuously. Mathematics flags the violation — AI drafts the briefing and recommendation."
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
            <div style={{ marginLeft: 12, fontFamily: MONO, fontSize: 11.5, color: "#7a848e" }}>nadir · compliance rules engine</div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 13, color: "#5a646e", lineHeight: 2.2, padding: "24px 28px" }}>
            <div><span style={{ color: "#7a848e" }}>policy_evaluation:</span> OSHA_1910.147_lockout_tagout</div>
            <div><span style={{ color: "#7a848e" }}>target_machine:</span> Compressor_C-22</div>
            <div><span style={{ color: "#7a848e" }}>evaluation_log:</span></div>
            <div>&nbsp;&nbsp;- check: maintenance_status == UNDER_REPAIR &nbsp;&nbsp;&nbsp;[PASSED]</div>
            <div>&nbsp;&nbsp;- check: lockout_tagout_verified == True &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[PASSED]</div>
            <div>&nbsp;&nbsp;- check: assigned_operator_certified == True &nbsp;[PASSED]</div>
            <div>&nbsp;&nbsp;- check: supervisor_signoff == True &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;[<span style={{ color: "#C7452F" }}>FAILED</span>]</div>
            <div><span style={{ color: "#C7452F" }}>rule result: VIOLATION DETECTED</span></div>
            <div><span style={{ color: "#0E7C8A" }}>briefing_draft:</span> &quot;Compressor C-22 is currently undergoing repair by operator Jose Torres. However, active supervisor sign-off has not been logged. Lockout-tagout procedure requires immediate review.&quot;</div>
          </div>
        </div>
      </div>

      {/* FEATURE PILLARS */}
      <Section alt>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>CAPABILITIES</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>Mathematical rules with AI-driven summaries.</h2>
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
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>MONITOR BY THE NUMBERS</div>
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
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>How teams use Compliance Monitor.</h2>
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
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Hard compliance, soft operations.</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 500 }}>
            Ensure your organization stays compliant with mathematical certainty without slowing down your teams.
          </p>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>
            Request a Demo →
          </Link>
        </div>
      </Section>
    </>
  );
}
