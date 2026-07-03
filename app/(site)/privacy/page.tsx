import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { Eye, Server, Trash2, ShieldCheck, Database, FileText } from "lucide-react";

export const metadata: Metadata = { title: "Privacy Policy — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const TOC = [
  { id: "collect", label: "1. Data Collection & VPC Ingestion", icon: <Eye size={16} /> },
  { id: "use", label: "2. Scope of Data Processing", icon: <Server size={16} /> },
  { id: "governance", label: "3. HIPAA & Regulatory Alignment", icon: <ShieldCheck size={16} /> },
  { id: "retention", label: "4. Storage & Deletion Cycles", icon: <Trash2 size={16} /> },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        sub="Last Updated: July 3, 2026. Data handling policy governing raw databases, system schemas, and entity graphs under Nadir custody."
      />

      {/* QUICK NAV */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px 60px" }}>
        <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
          {TOC.map((item) => (
            <a key={item.id} href={`#${item.id}`} style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "8px 16px", borderRadius: 8,
              border: "1px solid rgba(20,24,28,0.12)", background: "#FFFFFF",
              fontSize: 13, color: "#3d4750", textDecoration: "none",
            }}>
              {item.icon} {item.label}
            </a>
          ))}
        </div>
      </div>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 64 }}>
          <div>
            {/* Section 1 */}
            <div id="collect" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 01</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Data Collection &amp; VPC Ingestion</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>1.1 Ingested Database Schemas.</strong> The Ontology Engine reads system schemas, table names, primary/foreign keys, and data samples from your connected databases. This information is processed strictly within your isolated VPC tenant.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>
                <strong>1.2 Personal Data Categories.</strong> In compiling the Operational Graph, the system may process employee IDs, full names, certification credentials, shift assignments, and email addresses. We do not ingest sensitive national IDs or personal financial records unless explicitly stored in your operational databases and required for mapping.
              </p>
            </div>

            {/* Section 2 */}
            <div id="use" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 02</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Scope of Data Processing</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>2.1 Isolated Processing Covenants.</strong> Nadir operates strictly under single-tenant guidelines. We do not aggregate customer data across tenants, nor do we analyze operational charts to generate multi-client benchmarks or industry stats.
              </p>
              <div style={{ background: "#F6F5F3", borderRadius: 8, padding: "18px 22px", fontSize: 14, lineHeight: 1.7, color: "#4a545e", marginBottom: 20 }}>
                <strong style={{ color: "#14181C" }}>AI Training Policy:</strong> Customer database schemas, telemetry, logs, and personal details are processed in memory and are never used to train, fine-tune, or check any foundational AI or language models. All processing remains isolated within your VPC boundary.
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>
                <strong>2.2 Sub-processor Auditing.</strong> We utilize infrastructure hosts (e.g. AWS and GCP) to deploy isolated VPCs. All sub-processors are bound by strict Data Processing Agreements (DPAs) matching or exceeding the safety guidelines of this policy.
              </p>
            </div>

            {/* Section 3 */}
            <div id="governance" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 03</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>HIPAA &amp; Regulatory Alignment</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>3.1 Health &amp; Safety Registries.</strong> In industries such as healthcare staffing and heavy manufacturing, the system may ingest worker medical clearances or vaccination statuses to verify compliance. Nadir complies with all applicable provisions of the Health Insurance Portability and Accountability Act (HIPAA) and is prepared to sign Business Associate Agreements (BAAs) with covered entities.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>
                <strong>3.2 Legal Disclosures.</strong> We will not disclose operational records to law enforcement or regulators unless compelled by a valid subpoena, warrant, or court order. Except where legally prohibited, we will notify you immediately of any third-party request to access your records.
              </p>
            </div>

            {/* Section 4 */}
            <div id="retention" style={{ paddingBottom: 48 }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 04</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Storage &amp; Deletion Cycles</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>4.1 Secure Storage.</strong> All data within your VPC is encrypted in transit using TLS 1.3 and at rest using AES-256 keys managed via KMS.
              </p>
              <div style={{ background: "#FDF6F0", border: "1px solid rgba(199,69,47,0.15)", borderRadius: 8, padding: "18px 22px", fontSize: 14, lineHeight: 1.7, color: "#4a545e" }}>
                <strong style={{ color: "#14181C" }}>Termination Deletion Guarantee:</strong> Upon termination of the subscription or upon customer deletion request, the tenant VPC undergoes immediate shutdown. All backups, database mapping graphs, and ledger archives are cryptographically wiped and physically deleted from our hosting servers within 30 days.
              </div>
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
            <div style={{ background: "#F6F5F3", border: "1px solid rgba(20,24,28,0.08)", borderRadius: 12, padding: "24px 20px" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 16 }}>ON THIS PAGE</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {TOC.map((item) => (
                  <a key={item.id} href={`#${item.id}`} style={{ fontSize: 14, color: "#3d4750", textDecoration: "none" }}>{item.label}</a>
                ))}
              </div>
              <div style={{ height: 1, background: "rgba(20,24,28,0.1)", margin: "20px 0" }} />
              <div style={{ fontSize: 13, color: "#7a848e", lineHeight: 1.6 }}>
                Questions? Contact <Link href="/contact" style={{ color: "#0E7C8A", textDecoration: "none" }}>privacy@nadir.systems</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED */}
      <Section alt>
        <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
          <Link href="/terms" style={{ fontSize: 15, fontWeight: 600, color: "#0E7C8A", textDecoration: "none" }}>Terms of Service →</Link>
          <Link href="/security" style={{ fontSize: 15, fontWeight: 600, color: "#0E7C8A", textDecoration: "none" }}>Security &amp; Trust →</Link>
        </div>
      </Section>
    </>
  );
}
