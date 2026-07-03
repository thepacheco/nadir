import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, ContentBlock } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Pricing — Nadir" };

export default function PricingPage() {
  return (
    <>
      <PageHero
        eyebrow="PRICING"
        title="Predictable costs. Metered intelligence."
        sub="We believe that base operational intelligence should be affordable, and advanced model computation should only be paid for when strictly necessary."
      />

      <Section>
        <ContentBlock n="01" title="The Philosophy of Metered Intelligence">
          <p style={{ marginBottom: 16 }}>
            Most "AI on your data" products quietly re-read your entire database every single time a query is executed. This architectural flaw is why enterprise AI software often costs hundreds of thousands of dollars a year. Nadir operates differently.
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
