import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { Shield, Lock, Eye, Server, CheckCircle } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Security & Trust — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const PILLARS = [
  {
    icon: <Server size={24} />,
    title: "Tenant Isolation",
    summary: "Completely isolated VPCs per customer. Your data never co-mingles.",
    detail: "Every enterprise deployment runs within its own dedicated Virtual Private Cloud with separate encryption keys, database clusters, and compute instances. There is no shared infrastructure between customers.",
  },
  {
    icon: <Eye size={24} />,
    title: "Learns your business — only yours",
    summary: "Nadir learns from your data to run your operation, inside your own instance. It's never used to improve a model anyone else touches.",
    detail: "Getting smarter about your company is the point — but that learning stays in your tenant. Your data is never co-mingled with another customer's and never used to train a shared or foundation model. Strict DPAs with every sub-processor prohibit retention for outside model development.",
  },
  {
    icon: <Lock size={24} />,
    title: "Encryption & BYOK",
    summary: "TLS 1.3 in transit. AES-256 at rest. Bring Your Own Key available.",
    detail: "Enterprise customers can manage their own encryption keys via AWS KMS or Google Cloud KMS. This gives your security team a cryptographic kill switch — revoke access instantly, at any time, without our intervention.",
  },
  {
    icon: <Shield size={24} />,
    title: "Immutable Audit Trails",
    summary: "Append-only logging. No user can edit or delete records.",
    detail: "Every query, alert dismissal, integration sync, and write-back is logged in a tamper-evident ledger. These logs cannot be altered by any user, including Nadir administrators, ensuring full regulatory compliance.",
  },
];

const BADGES = ["SOC-2 Type II", "HIPAA", "NERC CIP", "ISO 27001", "GDPR", "DoD IL4"];

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="SECURITY & TRUST"
        title="Enterprise-grade data protection."
        sub="Nadir connects directly to your most sensitive operational and financial systems. Our security model was architected from day one assuming a zero-trust environment."
      />

      {/* COMPLIANCE BADGES */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px 60px" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {BADGES.map((b) => (
            <div key={b} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: 100,
              border: "1px solid rgba(20,24,28,0.12)", background: "#FFFFFF",
              fontFamily: MONO, fontSize: 12, letterSpacing: "0.06em", color: "#3d4750",
            }}>
              <CheckCircle size={14} style={{ color: "#15854F" }} />
              {b}
            </div>
          ))}
        </div>
      </div>

      {/* PILLAR CARDS */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          {PILLARS.map((p) => (
            <div key={p.title} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "32px 28px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
                <div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(14,124,138,0.08)", color: "#0E7C8A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {p.icon}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: 18, color: "#14181C" }}>{p.title}</div>
                  <div style={{ fontSize: 13.5, color: "#5a646e", marginTop: 2 }}>{p.summary}</div>
                </div>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>{p.detail}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* DEEP DIVE: DATA FLOW */}
      <Section alt>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>DATA FLOW</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>How your data moves through Nadir.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(20,24,28,0.08)", borderRadius: 12, overflow: "hidden" }}>
          {[
            { step: "01", label: "Ingestion", desc: "Read-only SQL access to your databases" },
            { step: "02", label: "Mapping", desc: "AI-assisted schema translation, human-confirmed" },
            { step: "03", label: "Processing", desc: "Isolated VPC, dedicated compute, AES-256" },
            { step: "04", label: "Output", desc: "Alerts, briefings, audit logs — all in your tenant" },
          ].map((s) => (
            <div key={s.step} style={{ background: "#FFFFFF", padding: "28px 24px" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#0E7C8A", marginBottom: 10 }}>{s.step}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: "#14181C" }}>{s.label}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#5a646e", margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* COMMITMENTS */}
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>OUR COMMITMENTS</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 24px", letterSpacing: "-0.01em", color: "#14181C" }}>What we will never do.</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 16 }}>
              {[
                "Sell, share, or monetize your operational data",
                "Use your data to train models for other customers",
                "Co-mingle your data with another customer's",
                "Prevent you from exporting or deleting your data",
                "Modify audit logs for any reason",
              ].map((item) => (
                <li key={item} style={{ display: "flex", gap: 12, fontSize: 15, color: "#3d4750", lineHeight: 1.5 }}>
                  <span style={{ color: "#C7452F", fontWeight: 700, flex: "none" }}>✕</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "32px 28px" }}>
            <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 20 }}>DATA OWNERSHIP</div>
            <div style={{ fontFamily: MONO, fontSize: 13, color: "#5a646e", lineHeight: 2.2, background: "#FAFAF8", border: "1px solid rgba(20,24,28,0.06)", borderRadius: 8, padding: "16px 18px" }}>
              <div><span style={{ color: "#7a848e" }}>owner:</span> <span style={{ color: "#14181C" }}>customer</span></div>
              <div><span style={{ color: "#7a848e" }}>ontology_maps:</span> <span style={{ color: "#14181C" }}>customer</span></div>
              <div><span style={{ color: "#7a848e" }}>operational_graph:</span> <span style={{ color: "#14181C" }}>customer</span></div>
              <div><span style={{ color: "#7a848e" }}>audit_logs:</span> <span style={{ color: "#14181C" }}>customer</span></div>
              <div><span style={{ color: "#7a848e" }}>on_termination:</span> <span style={{ color: "#C7452F" }}>cryptographic_wipe_30d</span></div>
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section alt>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Need a security review?</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 500 }}>
            Our engineering team is available to walk through our architecture, compliance posture, and data handling in detail.
          </p>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 15, fontWeight: 600, padding: "14px 32px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none" }}>
            Request a Security Review
          </Link>
        </div>
      </Section>
    </>
  );
}
