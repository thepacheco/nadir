import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, ContentBlock } from "@/components/site/PageShell";
import { PRICING_TIERS, BILLING_COMPONENTS } from "@/lib/marketing";

export const metadata: Metadata = { title: "Pricing — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="PRICING"
        title="Predictable costs. Metered intelligence."
        sub="We believe that base operational intelligence should be affordable, and advanced model computation should only be paid for when strictly necessary."
      />

      {/* THE TIERS — same numbers as the home page preview, in full */}
      <div style={{ maxWidth: 1240, margin: "0 auto", padding: "24px 48px 72px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 16, alignItems: "stretch" }}>
          {PRICING_TIERS.map((t) => (
            <div key={t.name} style={{ position: "relative", color: t.fg, border: t.border, borderRadius: 14, padding: "26px 22px 22px", background: t.bg, display: "flex", flexDirection: "column" }}>
              {"badge" in t && t.badge && (
                <div style={{ position: "absolute", top: -10, left: 22, fontFamily: MONO, fontSize: 9.5, letterSpacing: "0.1em", fontWeight: 700, color: "#FFFFFF", background: "#0E7C8A", padding: "3px 9px", borderRadius: 100 }}>{t.badge}</div>
              )}
              <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.dot }} />
                <span style={{ fontWeight: 700, fontSize: 16.5 }}>{t.name}</span>
              </div>
              <div style={{ fontSize: 13.5, opacity: 0.65, marginBottom: 18 }}>{t.who}</div>
              <div style={{ display: "flex", alignItems: "baseline", gap: 6, marginBottom: 6 }}>
                <span style={{ fontFamily: "var(--font-newsreader), serif", fontSize: 40, fontWeight: 500 }}>{t.price}</span>
                <span style={{ fontSize: 13.5, opacity: 0.6 }}>{t.per}</span>
              </div>
              <div style={{ fontFamily: MONO, fontSize: 12, opacity: 0.75, marginBottom: 4 }}>{t.seats}</div>
              <div style={{ fontFamily: MONO, fontSize: 12, opacity: 0.75, marginBottom: 20 }}>{t.usage}</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 9, marginBottom: 26 }}>
                {t.feats.map((f) => (
                  <div key={f} style={{ fontSize: 13.5, display: "flex", gap: 8 }}>
                    <span style={{ color: t.dot }}>—</span>
                    <span style={{ opacity: 0.85 }}>{f}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/contact"
                style={{ marginTop: "auto", textAlign: "center", fontSize: 14.5, fontWeight: 600, padding: "12px 0", borderRadius: 8, textDecoration: "none", background: t.btnBg, color: t.btnFg, border: t.btnBorder }}
              >
                {t.cta}
              </Link>
            </div>
          ))}
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20, marginTop: 28 }}>
          {BILLING_COMPONENTS.map((b) => (
            <div key={b.n} style={{ borderTop: "2px solid rgba(20,24,28,0.14)", paddingTop: 14 }}>
              <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.12em", color: "#0E7C8A", marginBottom: 6 }}>{b.n} · {b.title.toUpperCase()}</div>
              <div style={{ fontSize: 13.5, lineHeight: 1.6, color: "#4a545e" }}>{b.desc}</div>
            </div>
          ))}
        </div>
      </div>

      <Section>
        <ContentBlock n="01" title="The Philosophy of Metered Intelligence">
          <p style={{ marginBottom: 16 }}>
            Most &ldquo;AI on your data&rdquo; products quietly re-read your entire database every single time a query is executed. This architectural flaw is why enterprise AI software often costs hundreds of thousands of dollars a year. Nadir operates differently.
          </p>
          <p>
            We rely on deterministic algorithms for 95% of our continuous monitoring. Checking if an invoice exceeds a limit is arithmetic, not intelligence, and we provide that at a flat platform rate. We reserve expensive Large Language Model (LLM) tokens exclusively for tasks that require deep semantic reconciliation or complex text generation. 
          </p>
        </ContentBlock>

        <ContentBlock n="02" title="Platform Fees vs. Seat Fees">
          <p style={{ marginBottom: 16 }}>
            Our pricing is divided into three transparent components. First, the <strong>Platform Fee</strong> covers the maintenance of the fusion engine, the continuous ingestion of data, the maintenance of the Operational Graph, and the execution of deterministic compliance checks.
          </p>
          <p>
            Second, the <strong>Seat Fee</strong> applies only to active operators who require write-access to the system or the ability to configure new compliance rules. Executives or line workers who only receive automated briefings or read-only dashboards are completely free.
          </p>
        </ContentBlock>

        <ContentBlock n="03" title="Enterprise Deployment">
          <p style={{ marginBottom: 16 }}>
            For multi-entity corporations, managed service providers (MSPs), and highly regulated environments requiring deep customization, we offer the Enterprise tier. This includes unlimited data sources, dedicated isolated VPCs, custom compliance rulebook ingestion, and access to our Forward-Deployed Engineering team.
          </p>
          <p>
            Enterprise pricing is entirely custom, based on the sheer volume of data ingested and the complexity of the required semantic mappings. 
          </p>
        </ContentBlock>
      </Section>

      <Section alt>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 34, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Ready to evaluate Nadir?</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 500 }}>
            Contact our engineering team to discuss a two-week proof of concept on your own data.
          </p>
          <Link href="/contact" style={{ fontSize: 15, fontWeight: 600, padding: "14px 32px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none" }}>
            Contact Engineering
          </Link>
        </div>
      </Section>
    </>
  );
}
