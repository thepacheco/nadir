import type { Metadata } from "next";
import { PageHero, Section, ContentBlock } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Careers — Nadir" };

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="CAREERS"
        title="Help companies see their own floor."
        sub="We're a small team building software for physical industries. We move fast, and our customers see real results in days, not years."
      />

      <Section>
        <ContentBlock n="01" title="How we work">
          <p style={{ marginBottom: 16 }}>
            Building Nadir means dealing with a lot of legacy mess. You might spend the morning writing SQL queries against an Oracle database from 1998, and the afternoon writing LLM prompts to map that data into something useful.
          </p>
          <p>
            We don't have product managers handing down strictly scoped Jira tickets. Our engineers talk directly to plant managers, compliance officers, and line workers. You own the problem from the first database connection to the final interface the customer uses to solve their crisis.
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
                We need someone to own our data ingestion. You'll write the code that connects to messy, on-premise ERPs and turns ten disjointed databases into one clean operational graph. If you like untangling gnarly SQL schemas and building fault-tolerant systems, this is for you.
              </p>
            </div>
            
            <div style={{ height: 1, background: "rgba(20,24,28,0.06)" }} />

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <div style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 22, color: "#14181C" }}>Forward-Deployed Engineer</div>
                <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#7a848e", letterSpacing: "0.06em" }}>REMOTE (US) / TRAVEL</div>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>
                You'll be the bridge between our product and our enterprise clients. You'll travel to client sites, hook up their databases to Nadir, and help them find hidden risks in their operations within the first two weeks. It's a highly autonomous role for someone who likes both engineering and talking to customers.
              </p>
            </div>

            <div style={{ height: 1, background: "rgba(20,24,28,0.06)" }} />

            <div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 12 }}>
                <div style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 22, color: "#14181C" }}>Product Design Engineer</div>
                <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#7a848e", letterSpacing: "0.06em" }}>REMOTE (US)</div>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>
                You'll design the interface our customers use every day. The challenge here is taking incredibly dense operational data and making it obvious—whether a factory line worker is checking their shift schedule on a phone, or a CEO is reviewing compliance reports on a desktop. Strong React and CSS skills are required.
              </p>
            </div>
          </div>
        </ContentBlock>
      </Section>
    </>
  );
}
