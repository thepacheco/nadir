import type { Metadata } from "next";
import { PageHero, Section, ContentBlock } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Careers — Nadir" };

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="CAREERS"
        title="Help companies see their own floor."
        sub="We are a small team solving exceptionally hard data problems for physical industries. Our customers feel the impact of our work within days, not years."
      />

      <Section>
        <ContentBlock n="01" title="The Engineering Culture">
          <p style={{ marginBottom: 16 }}>
            Building Nadir requires a unique blend of extreme patience for legacy mess and aggressive ambition for cutting-edge AI. You will be writing SQL queries against Oracle databases that were installed in 1998, and in the exact same afternoon, writing prompts for state-of-the-art Large Language Models to infer the semantic relationships within those tables.
          </p>
          <p>
            We do not have product managers throwing Jira tickets over the wall. Engineers at Nadir talk directly to plant managers, compliance officers, and line workers. You own the problem end-to-end: from the initial database connection, to the semantic mapping, to the final interface the customer uses to solve their crisis.
          </p>
        </ContentBlock>

        <ContentBlock n="02" title="Open Positions">
          <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <div style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 22, color: "#14181C" }}>Founding Fusion Engineer</div>
                <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#7a848e", letterSpacing: "0.06em" }}>ATLANTA · HYBRID</div>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>
                You will own the data ingestion layer. Your primary responsibility is writing robust, fault-tolerant code that safely connects to legacy databases (like older SAP or bespoke on-premise ERP systems). You will build the heuristics that allow our system to automatically infer schema structures, merging ten messy databases into one clean, unified operational graph. If you enjoy untangling complex data knots and possess a deep, innate understanding of relational data, this is for you.
              </p>
            </div>
            
            <div style={{ height: 1, background: "rgba(20,24,28,0.06)" }} />

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <div style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 22, color: "#14181C" }}>Forward-Deployed Engineer</div>
                <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#7a848e", letterSpacing: "0.06em" }}>REMOTE (US) / TRAVEL</div>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>
                You will be the bridge between our enterprise clients and our core product. You will travel to client sites, orchestrate the connection of their databases to the Nadir platform, and guide them through the process of confirming their operational ontology. Your mandate is to help the client uncover hidden operational risks or compliance violations within their first two weeks of deployment.
              </p>
            </div>

            <div style={{ height: 1, background: "rgba(20,24,28,0.06)" }} />

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <div style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 22, color: "#14181C" }}>Product Design Engineer</div>
                <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#7a848e", letterSpacing: "0.06em" }}>REMOTE (US)</div>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>
                You will design the interface that our customers rely on daily. Your goal is to take incredibly dense, multi-dimensional operational data and render it instantly understandable. You must balance the needs of a factory line worker checking their shift schedule on a mobile device with the needs of a CEO reviewing high-level compliance reports on a desktop. Strong React and CSS skills are mandatory.
              </p>
            </div>
          </div>
        </ContentBlock>
      </Section>
    </>
  );
}
