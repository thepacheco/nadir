import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section, ContentBlock } from "@/components/site/PageShell";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "About — Nadir" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="THE COMPANY"
        title="We build the central nervous system for physical industry."
        sub="Nadir exists because mid-market companies in regulated, operationally complex industries run on fragmented systems — and no one has a single live picture of what's actually happening."
      />

      <Section>
        <ContentBlock n="01" title="The Problem of Fragmentation">
          <p style={{ marginBottom: 16 }}>
            Modern industrial operations are highly complex, yet they are managed through a patchwork of legacy enterprise resource planning (ERP) systems, siloed SQL databases, physical paperwork, and disparate SaaS applications. When a critical failure occurs, the root cause is rarely isolated to one system; it is found in the gaps between them. 
          </p>
          <p>
            Regulatory compliance requires a unified view of these operations. Yet, because no single system can see the entire picture, compliance officers and operations managers are forced to manually export, reconcile, and analyze data after the fact. By the time a report is generated, the data is already stale, and the opportunity for proactive intervention has passed.
          </p>
        </ContentBlock>

        <ContentBlock n="02" title="The Philosophical Shift: Ontologies over Tables">
          <p style={{ marginBottom: 16 }}>
            For decades, data engineering has focused on moving and transforming tabular data. At Nadir, we believe that businesses do not operate on rows and columns; they operate on <em>Entities</em> and <em>Relationships</em>. 
          </p>
          <p>
            We utilize deterministic mapping and advanced language models to automatically infer the semantic meaning behind raw database schemas. A row in a `maintenance_log_v3` table is transformed into a living `WorkOrder` object, intrinsically linked to a `Machine` object and an `Employee` object. This creates an Operational Graph: a live, semantic model of the entire enterprise.
          </p>
        </ContentBlock>

        <ContentBlock n="03" title="Deterministic Rules before Generative AI">
          <p style={{ marginBottom: 16 }}>
            In highly regulated environments like aerospace manufacturing, nuclear power, and defense, hallucinations are unacceptable. While we leverage Large Language Models (LLMs) to dramatically accelerate the initial data mapping phase, the actual runtime compliance checks are entirely deterministic.
          </p>
          <p>
            If a pressure valve exceeds its rated limit, or an employee clocks in without the required certification, the rule is evaluated mathematically. AI is strictly reserved for generating human-readable context around the violation and proposing the next best action, never for the underlying logic evaluation itself.
          </p>
        </ContentBlock>
      </Section>

      <Section alt>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 34, margin: "0 0 10px", letterSpacing: "-0.01em", color: "#14181C" }}>Building this interests you?</h2>
            <p style={{ fontSize: 15.5, color: "#4a545e", margin: 0 }}>We are a small team fusing ugly databases into living models. It is harder — and more rewarding — than it sounds.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flex: "none" }}>
            <Link href="/careers" className={styles.btnDark} style={{ fontSize: 15, fontWeight: 600, padding: "13px 26px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none" }}>
              Open roles →
            </Link>
            <Link href="/contact" style={{ fontSize: 15, fontWeight: 600, padding: "13px 26px", color: "#14181C", border: "1px solid rgba(20,24,28,0.2)", borderRadius: 8, textDecoration: "none", background: "#FFFFFF" }}>
              Contact us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
