import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { Eye, Server, Trash2, Share2 } from "lucide-react";

export const metadata: Metadata = { title: "Privacy Policy — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const TOC = [
  { id: "collect", label: "Information We Collect", icon: <Eye size={16} /> },
  { id: "use", label: "How We Use It", icon: <Server size={16} /> },
  { id: "retention", label: "Retention & Destruction", icon: <Trash2 size={16} /> },
  { id: "sharing", label: "Third-Party Sharing", icon: <Share2 size={16} /> },
];

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        sub="Last Updated: July 3, 2026. This policy governs how Nadir Intelligence, Inc. collects, processes, and protects your information."
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
            <div id="collect" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 01</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Information We Collect</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>Operational Data.</strong> When you deploy Nadir, you grant the system read-only access to your internal databases, ERPs, and APIs. This data is collected solely to generate your isolated Operational Graph and run compliance checks. We do not aggregate, sell, or monetize Operational Data.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>
                <strong>Account Information.</strong> We collect basic contact and billing information (names, emails, addresses, payment details) for billing, support, and critical service notifications.
              </p>
            </div>

            <div id="use" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 02</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>How We Use Your Information</h2>
              <div style={{ background: "#F6F5F3", borderRadius: 8, padding: "16px 20px", fontSize: 14, lineHeight: 1.7, color: "#4a545e", marginBottom: 20 }}>
                <strong style={{ color: "#14181C" }}>Key commitment:</strong> Nadir operates strictly within isolated tenant boundaries. We do not analyze your data to extract industry trends, benchmark against other customers, or train AI models.
              </div>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>
                Your Operational Data is processed automatically to provide the core platform functionality: generating alerts, resolving database relationships, and identifying compliance violations.
              </p>
            </div>

            <div id="retention" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 03</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Data Retention and Destruction</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                <strong>Active Subscriptions.</strong> We retain the Operational Graph and audit logs for the duration of your subscription.
              </p>
              <div style={{ background: "#FDF6F0", border: "1px solid rgba(199,69,47,0.15)", borderRadius: 8, padding: "16px 20px", fontSize: 14, lineHeight: 1.7, color: "#4a545e" }}>
                <strong style={{ color: "#14181C" }}>Post-Termination.</strong> Upon termination or verified deletion request, Nadir initiates a complete cryptographic wipe of your isolated tenant. All Operational Data, ontologies, and audit logs are permanently destroyed within 30 days.
              </div>
            </div>

            <div id="sharing" style={{ paddingBottom: 48 }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 04</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Sub-processors and Third-Party Sharing</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                We use vetted sub-processors (AWS, Google Cloud) to host infrastructure. These sub-processors are bound by strict Data Processing Agreements prohibiting access to or use of your Operational Data.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>
                We will never share your data with third parties for marketing or advertising. We will only disclose information if legally compelled by a valid subpoena or court order, and will attempt to notify you prior to disclosure.
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
                Questions? Contact <Link href="/contact" style={{ color: "#0E7C8A", textDecoration: "none" }}>privacy@nadir.systems</Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Section alt>
        <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
          <Link href="/terms" style={{ fontSize: 15, fontWeight: 600, color: "#0E7C8A", textDecoration: "none" }}>Terms of Service →</Link>
          <Link href="/security" style={{ fontSize: 15, fontWeight: 600, color: "#0E7C8A", textDecoration: "none" }}>Security & Trust →</Link>
        </div>
      </Section>
    </>
  );
}
