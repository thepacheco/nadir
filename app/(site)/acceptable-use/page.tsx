import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { AlertOctagon, ShieldAlert, Cpu, Terminal } from "lucide-react";

export const metadata: Metadata = { title: "Acceptable Use Policy — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const TOC = [
  { id: "restrictions", label: "1. Core Restrictions", icon: <AlertOctagon size={16} /> },
  { id: "testing", label: "2. Security & Testing Policies", icon: <ShieldAlert size={16} /> },
  { id: "limits", label: "3. API & Resource Limits", icon: <Terminal size={16} /> },
];

export default function AcceptableUsePage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Acceptable Use Policy"
        sub="Last Updated: July 3, 2026. This policy outlines prohibited behaviors and environment boundaries for users on Nadir systems."
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
            <div id="restrictions" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 01</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Core Restrictions</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                Customer shall not utilize the Nadir platform to: (a) monitor databases containing prohibited classified military records or national security information without specific government-cleared VPC infrastructure; (b) execute automated actions that bypass manual lockout-tagout safety protocols; or (c) process data that violates third-party copyright, trade secret, or intellectual property terms.
              </p>
              <div style={{ background: "#FDF6F0", border: "1px solid rgba(199,69,47,0.15)", borderRadius: 8, padding: "18px 22px", fontSize: 14, lineHeight: 1.7, color: "#4a545e" }}>
                <strong style={{ color: "#C7452F" }}>Physical Operations Warning:</strong> Nadir provides operational twin monitoring. It must never be configured to bypass active manual emergency shut-off valves or critical physical fail-safe triggers. Operators must always maintain manual backup checks.
              </div>
            </div>

            <div id="testing" style={{ paddingBottom: 48, marginBottom: 48, borderBottom: "1px solid rgba(20,24,28,0.1)" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 02</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Security &amp; Testing Policies</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                While we support tenant evaluations, you may not execute automated vulnerability scans, port sweeps, or load-test injections against the main routing gateways of Nadir systems.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>
                Any discovered vulnerability must be reported privately to <code style={{ fontFamily: MONO, fontSize: 13, background: "#F6F5F3", padding: "2px 6px" }}>security@nadir.systems</code> within 24 hours of discovery and in accordance with responsible disclosure guidelines.
              </p>
            </div>

            <div id="limits" style={{ paddingBottom: 48 }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 12 }}>SECTION 03</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>API &amp; Resource Limits</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 16 }}>
                Customer agrees to adhere to standard rate-limiting thresholds (typically 5,000 queries per minute per tenant) to prevent resource exhaustion of shared virtualization gateways.
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>
                If your connected database triggers excessive log telemetry exceeding contract thresholds, Nadir reserves the right to throttle background mapping tasks until structural mappings are adjusted.
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
          <Link href="/terms" style={{ fontSize: 15, fontWeight: 600, color: "#0E7C8A", textDecoration: "none" }}>Terms of Service →</Link>
          <Link href="/privacy" style={{ fontSize: 15, fontWeight: 600, color: "#0E7C8A", textDecoration: "none" }}>Privacy Policy →</Link>
        </div>
      </Section>
    </>
  );
}
