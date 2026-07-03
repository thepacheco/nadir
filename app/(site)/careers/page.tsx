import type { Metadata } from "next";
import { MONO, PageHero, Section } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Careers — Nadir" };

const ROLES = [
  { title: "Founding Fusion Engineer", team: "ENGINEERING", loc: "Atlanta · hybrid", desc: "Own the ingestion layer: direct SQL connections to legacy ERPs, schema inference, and the join map that turns ten ugly databases into one graph. The weirder the ERP variant, the more we want you." },
  { title: "Forward-Deployed Engineer", team: "CUSTOMER", loc: "Atlanta / travel", desc: "Live inside design-partner deployments. Connect the first database, confirm the first ontology, find the first piece of hidden risk — and turn what you learn into product." },
  { title: "Product Design Engineer", team: "DESIGN", loc: "Remote (US)", desc: "The interface is the argument: ops maps, fusion graphs, guidance plans. Make dense operational data legible to a plant manager at 6am and an investor at noon." },
  { title: "Compliance & Trust Lead", team: "TRUST", loc: "Remote (US)", desc: "Own the compliance rulebook — OSHA, NERC, HACCP, AS9100 — and the audit-trail machinery that proves what Nadir saw and when. Regulated-industry background strongly preferred." },
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="CAREERS"
        title="Help companies see their own floor."
        sub="Small team, hard data problems, customers who feel the difference the same week. We hire people who like both halves of that."
      />
      <Section>
        <div style={{ display: "flex", flexDirection: "column", maxWidth: 900 }}>
          {ROLES.map((r) => (
            <div key={r.title} style={{ display: "grid", gridTemplateColumns: "1fr 2fr auto", gap: 32, padding: "28px 0", borderTop: "1px solid rgba(20,24,28,0.12)", alignItems: "start" }}>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 6 }}>{r.title}</div>
                <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: "#7a848e" }}>{r.team} · {r.loc}</div>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>{r.desc}</p>
              <a
                href={`mailto:careers@nadir.systems?subject=${encodeURIComponent(r.title)}`}
                style={{ fontSize: 14, fontWeight: 600, color: "#0E7C8A", textDecoration: "none", whiteSpace: "nowrap", paddingTop: 2 }}
              >
                Apply →
              </a>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 40, padding: "22px 26px", border: "1px solid rgba(14,124,138,0.3)", borderRadius: 12, background: "rgba(14,124,138,0.05)", maxWidth: 900 }}>
          <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#2a333c", margin: 0 }}>
            Don&apos;t see your role? If you&apos;ve untangled a legacy ERP, run a plant, audited a utility, or shipped data products people actually used — write us anyway: <a href="mailto:careers@nadir.systems" style={{ color: "#0E7C8A", fontWeight: 600, textDecoration: "none" }}>careers@nadir.systems</a>
          </p>
        </div>
      </Section>
    </>
  );
}
