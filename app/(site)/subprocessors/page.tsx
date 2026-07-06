import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Subprocessors Directory — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";

const SUBPROCESSORS = [
  { name: "Amazon Web Services (AWS)", purpose: "Primary cloud infrastructure — isolated tenant hosting and encrypted database storage.", location: "United States (East / West regions)", standard: "SOC 2 Type II, ISO 27001" },
  { name: "Google Cloud Platform (GCP)", purpose: "Backup cloud infrastructure and key management.", location: "United States (Central / East regions)", standard: "SOC 2 Type II, ISO 27001" },
  { name: "SendGrid (Twilio)", purpose: "Sends the notification emails Nadir routes to your team.", location: "United States", standard: "SOC 2 Type II" },
  { name: "Twilio", purpose: "Sends the SMS alerts Nadir routes for time-sensitive issues.", location: "United States", standard: "SOC 2 Type II" },
];

export default function SubprocessorsPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Subprocessors Directory"
        sub="Last Updated: July 3, 2026. Authorized third-party sub-processors utilized by Nadir to deploy, support, and host enterprise systems."
      />

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px 48px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 280px", gap: 64 }}>
          <div>
            <p style={{ fontSize: 15.5, lineHeight: 1.7, color: "#4a545e", marginBottom: 32 }}>
              We sign a data processing agreement (DPA) with every subprocessor below, and we choose vendors that hold their own independent security certifications like SOC 2 Type II and ISO 27001. We keep this list current as our vendors change.
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {SUBPROCESSORS.map((sp, i) => (
                <div key={i} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 10, padding: "28px 24px" }}>
                  <h3 style={{ fontWeight: 700, fontSize: 18, color: "#14181C", marginBottom: 12 }}>{sp.name}</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: 10, fontSize: 14 }}>
                    <div>
                      <span style={{ color: "#7a848e", fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.04em", display: "inline-block", width: 120 }}>PURPOSE:</span>
                      <span style={{ color: "#3d4750" }}>{sp.purpose}</span>
                    </div>
                    <div>
                      <span style={{ color: "#7a848e", fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.04em", display: "inline-block", width: 120 }}>LOCATION:</span>
                      <span style={{ color: "#3d4750" }}>{sp.location}</span>
                    </div>
                    <div>
                      <span style={{ color: "#7a848e", fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.04em", display: "inline-block", width: 120 }}>COMPLIANCE:</span>
                      <span style={{ color: "#15854F", fontWeight: 600 }}>{sp.standard}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* SIDEBAR */}
          <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
            <div style={{ background: "#F6F5F3", border: "1px solid rgba(20,24,28,0.08)", borderRadius: 12, padding: "24px 20px" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>HOW WE CHOOSE THEM</div>
              <div style={{ fontSize: 13, color: "#5a646e", lineHeight: 1.6, marginBottom: 16 }}>
                We only route data to vendors that keep tenants isolated and will delete data on request. Your data is never used to train anyone else&rsquo;s model.
              </div>
              <div style={{ height: 1, background: "rgba(20,24,28,0.1)", margin: "16px 0" }} />
              <Link href="/privacy" style={{ fontSize: 13.5, color: "#0E7C8A", textDecoration: "none", fontWeight: 600 }}>View Privacy Policy →</Link>
            </div>
          </div>
        </div>
      </div>

      <Section alt>
        <div style={{ display: "flex", justifyContent: "center", gap: 24 }}>
          <Link href="/terms" style={{ fontSize: 15, fontWeight: 600, color: "#0E7C8A", textDecoration: "none" }}>Terms of Service →</Link>
          <Link href="/privacy" style={{ fontSize: 15, fontWeight: 600, color: "#0E7C8A", textDecoration: "none" }}>Privacy Policy →</Link>
        </div>
      </Section>
    </>
  );
}
