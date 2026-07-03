import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, ContentBlock } from "@/components/site/PageShell";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Platform — Nadir" };

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="THE PLATFORM"
        title="A fusion engine with a brain on top."
        sub="The Nadir platform does not rely on simple API integrations. It is a deep, foundational rewrite of how operational data is mapped, understood, and monitored."
      />

      <Section>
        <ContentBlock n="01" title="The Ingestion Layer: Schema-Agnostic Processing">
          <p style={{ marginBottom: 16 }}>
            Legacy industrial companies often run on decades-old ERP systems, heavily customized SQL databases, and disparate SaaS tools. Traditional integration requires months of manual data mapping and fragile ETL pipelines. Nadir abandons this approach entirely.
          </p>
          <p>
            We require only read-only, SQL-level access to your databases. Our ingestion engine leverages advanced semantic inference to automatically map idiosyncratic, inconsistent table structures (e.g., `TBL_WRK_ORD_99`) into clean, standardized digital objects. This allows us to deploy into environments that are traditionally considered "too messy" for modern SaaS.
          </p>
        </ContentBlock>

        <ContentBlock n="02" title="The Fusion Layer: The Operational Graph">
          <p style={{ marginBottom: 16 }}>
            Once the data is ingested and semantically mapped, the Fusion Layer reconciles the inevitable conflicts. If an employee ID in the HR system does not perfectly match the badge ID in the factory floor system, our probabilistic models resolve the identity automatically.
          </p>
          <p>
            The output of this layer is the Operational Graph—a massive, continuously updating model of your entire enterprise. It links physical machinery to maintenance schedules, operators to compliance certifications, and raw materials to final invoices. You are no longer querying disconnected tables; you are querying the reality of your business.
          </p>
        </ContentBlock>

        <ContentBlock n="03" title="The Intelligence Layer: Deterministic Compliance">
          <p style={{ marginBottom: 16 }}>
            With the Operational Graph established, Nadir deploys a continuous rules engine across the data. Unlike generative AI chatbots that are prone to hallucination, our compliance monitoring is strictly deterministic. It evaluates the graph against hard constraints—OSHA safety guidelines, NERC CIP requirements, or internal financial limits.
          </p>
          <p>
            When a constraint is violated, or when an impending bottleneck is identified, the Intelligence Layer does not merely flag a dashboard. It utilizes a securely sandboxed Large Language Model to synthesize the context of the violation into a human-readable briefing and proposes the exact next steps required to mitigate the risk.
          </p>
        </ContentBlock>
      </Section>

      <Section alt>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 34, margin: "0 0 10px", letterSpacing: "-0.01em", color: "#14181C" }}>See the engine run on live data.</h2>
            <p style={{ fontSize: 15.5, color: "#4a545e", margin: 0 }}>Explore the live workspace demo simulating five distinct regulated industries.</p>
          </div>
          <Link
            href="/workspace"
            className={styles.btnDark}
            style={{ fontSize: 16, fontWeight: 600, padding: "15px 32px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none", flex: "none" }}
          >
            Open the live workspace →
          </Link>
        </div>
      </Section>
    </>
  );
}
