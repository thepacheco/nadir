import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { FileText, Shield, Database, Scale, AlertTriangle, Key } from "lucide-react";

export const metadata: Metadata = { title: "Terms of Service — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const TOC = [
  { id: "agreement", label: "1. Agreement & Definitions", icon: <FileText size={16} /> },
  { id: "access", label: "2. Licensing & VPC Tenancy", icon: <Shield size={16} /> },
  { id: "data", label: "3. Cryptographic Data Ownership", icon: <Database size={16} /> },
  { id: "writeback", label: "4. Write-back Indemnity", icon: <Key size={16} /> },
  { id: "warranties", label: "5. Operational Liability Disclaimers", icon: <AlertTriangle size={16} /> },
  { id: "disputes", label: "6. Jurisdictions & Disputes", icon: <Scale size={16} /> },
];

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Terms of Service"
        sub="Last Updated: July 3, 2026. Master Subscription Terms governing the integration, processing, and operations twin virtualization of Nadir systems."
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
              transition: "border-color 0.2s",
            }}>
              {item.icon} {item.label}
            </a>
          ))}
        </div>
      </div>

      {/* CONTENT */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 64 }}>
          <div>
            {/* Section 1 */}
            <div id="agreement" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 01</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Agreement and Definitions</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                This Master Subscription Agreement (the &quot;Agreement&quot;) forms a legally binding contract between Nadir Intelligence, Inc. (&quot;Nadir&quot;) and the subscriber (&quot;Customer&quot;). By integrating, connecting, or querying databases using the Nadir platform, Customer agrees to comply with all operational covenants herein.
              </p>
              <div style={{ background: "#F6F5F3", borderRadius: 8, padding: "18px 22px", fontSize: 14, lineHeight: 1.7, color: "#4a545e" }}>
                <strong style={{ color: "#14181C" }}>Standard Definitions:</strong><br/>
                • <strong>&quot;Services&quot;</strong> — The Nadir enterprise operations virtualization platform, including local schema ingestion scripts, the Ontology Engine, the Schema Mapper dashboard, and live compliance query networks.<br/>
                • <strong>&quot;Operational Graph&quot;</strong> — The real-time semantic relationship model compiled by linking customer entities (shifts, machinery parameters, safety records).<br/>
                • <strong>&quot;Tamper-Evident Ledger&quot;</strong> — The append-only, SHA-256 cryptographically chained log recording all actions, alerts, mappings, and configurations.
              </div>
            </div>

            {/* Section 2 */}
            <div id="access" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 02</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Licensing &amp; Isolated VPC Tenancy</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>2.1 Isolated VPC Mandate.</strong> Every client instance of the Nadir platform is deployed in an isolated Virtual Private Cloud (VPC) tenant. Cross-tenant data co-mingling is strictly prevented at the networking level.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>2.2 Read-Only SQL Integration.</strong> Standard connection settings of the Ingestion Layer operate under read-only credentials. Customer represents and warrants that database connectors configured by their technicians grant Nadir read-only access, except where write-back actions are explicitly configured by customer consent.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>
                <strong>2.3 Access Restrictions.</strong> Customer shall not: (a) bypass tenant access checks; (b) execute security stress tests or penetration scans without a minimum of 14 business days prior written notice to Nadir Security; or (c) run automated scraping scripts against the Schema Mapper interface.
              </p>
            </div>

            {/* Section 3 */}
            <div id="data" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 03</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Cryptographic Data Ownership</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>3.1 Customer Data Ownership.</strong> As between Nadir and the Customer, all raw database schemas, table metadata, operational telemetry logs, and worker registries remain the sole intellectual property of the Customer.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>3.2 Resultant Ontologies.</strong> The unique ontologies, relationship structures, and mapping records built by linking raw columns to target business concepts are the exclusive property of the Customer. Upon termination of subscriptions, Nadir will export mapping config scripts at customer request prior to complete tenant erasure.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>
                <strong>3.3 Security Keys &amp; BYOK.</strong> For Enterprise customers utilizing Bring Your Own Key (BYOK) integrations via AWS KMS or GCP KMS, the customer maintains direct cryptographic ownership. Revoking access to the key immediately and permanently halts Nadir's processing capabilities, which constitutes an immediate operational suspension.
              </p>
            </div>

            {/* Section 4 */}
            <div id="writeback" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 04</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Write-back Indemnification</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>4.1 Operational Writes.</strong> Certain configurations of the platform allow operators to execute write-back actions from the Workspace directly to the source database (e.g. logging a supervisor signature, assigning a shift operator, or dismissing a maintenance hold).
              </p>
              <div style={{ background: "#FDF6F0", border: "1px solid rgba(199,69,47,0.15)", borderRadius: 8, padding: "18px 22px", fontSize: 14, lineHeight: 1.7, color: "#4a545e" }}>
                <strong style={{ color: "#C7452F" }}>Write-back Indemnity Covenant:</strong> Customer agrees to defend, indemnify, and hold harmless Nadir against any and all claims, liabilities, or regulatory fines arising from write-back operations executed by customer accounts. The customer is solely responsible for verifying the correctness of all database writes, and acknowledges that Nadir acts only as a transport channel for these commands.
              </div>
            </div>

            {/* Section 5 */}
            <div id="warranties" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 05</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Operational Liability Disclaimers</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>5.1 No Operational Safety Guarantee.</strong> The compliance monitor runs deterministic evaluations to flag anomalies, but does not guarantee the safety, security, or error-free state of physical operations. The customer maintains full responsibility for factory floor safety, machinery maintenance, and operator certifications.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>
                <strong>5.2 Liability Caps.</strong> IN NO EVENT SHALL EITHER PARTY&apos;S AGGREGATE LIABILITY EXCEED THE TOTAL FEES PAID BY CUSTOMER IN THE TWELVE (12) MONTHS PRECEDING THE CLAIM. NADIR IS NOT LIABLE FOR INDIRECT, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO MACHINERY DOWNTIME, WORK STOPPAGES, OR FACTORY ACCIDENTS.
              </p>
            </div>

            {/* Section 6 */}
            <div id="disputes" style={{ paddingBottom: 48 }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 06</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Jurisdictions and Disputes</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>6.1 Governing Law.</strong> This Agreement and all disputes arising out of it shall be governed exclusively by the laws of the State of Delaware, without regard to conflict of law principles.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>
                <strong>6.2 Arbitration.</strong> Any dispute, controversy, or claim arising out of or relating to this Agreement, including its formation, shall be settled by binding arbitration administered by the American Arbitration Association (AAA) in accordance with its Commercial Arbitration Rules. The place of arbitration shall be Atlanta, Georgia.
              </p>
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
                Questions? Contact <Link href="/contact" style={{ color: "#0E7C8A", textDecoration: "none" }}>legal@nadir.systems</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RELATED */}
      <Section alt>
        <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
          <Link href="/privacy" style={{ fontSize: 15, fontWeight: 600, color: "#0E7C8A", textDecoration: "none" }}>Privacy Policy →</Link>
          <Link href="/security" style={{ fontSize: 15, fontWeight: 600, color: "#0E7C8A", textDecoration: "none" }}>Security &amp; Trust →</Link>
        </div>
      </Section>
    </>
  );
}
