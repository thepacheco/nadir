import type { Metadata } from "next";
import { MONO, PageHero, Section, LegalBlock } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Security & Trust — Nadir" };

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="SECURITY & TRUST"
        title="We read your most sensitive systems. Here's why that's safe."
        sub="Nadir's entire product is access to your operational data. That only works if the access model is boringly conservative — so it is."
      />
      <Section>
        <div style={{ maxWidth: 900 }}>
          <LegalBlock n="01" title="Read-only, always">
            Nadir connects with read-only database credentials. There is no code path that writes to a customer system — not to fix things, not to annotate, not ever. Actions Nadir drafts (work orders, POs, messages) execute in your systems only when your people approve and send them.
          </LegalBlock>
          <LegalBlock n="02" title="Data minimization by architecture">
            Schema mapping uses table structures, keys, and a small sample of recent rows — not full-table extraction. Whole tables are never streamed through a language model. What Nadir retains is the ontology (what your tables mean and how they join), plus the signals and findings it derives — the smallest set that keeps the graph live.
          </LegalBlock>
          <LegalBlock n="03" title="No training on customer data">
            Your data is never used to train models — ours or any third party&apos;s. Model providers we use are bound to zero-retention API terms. The compounding intelligence Nadir builds about your company belongs to your tenant and dies with your contract if you leave.
          </LegalBlock>
          <LegalBlock n="04" title="Tenant isolation">
            Each customer&apos;s ontology, findings, and credentials live in an isolated tenant with separate encryption keys. There is no cross-tenant query path. The fusion layer gets smarter from patterns of work, not from your rows appearing in someone else&apos;s graph.
          </LegalBlock>
          <LegalBlock n="05" title="Encryption & credentials">
            TLS 1.2+ in transit, AES-256 at rest, credentials in a dedicated secrets manager with automatic rotation support. Database connections support IP allowlisting, SSH tunnels, and PrivateLink-style peering for customers who need it.
          </LegalBlock>
          <LegalBlock n="06" title="Every read is logged">
            The same audit-trail machinery Nadir gives you for compliance runs on Nadir itself: every source read, every derivation, every human confirmation is timestamped and attributable. If you ask &quot;why does the system believe this?&quot; there is always an answer with receipts.
          </LegalBlock>
          <LegalBlock n="07" title="Compliance program">
            SOC 2 readiness program is underway with an external auditor; our control set is built against SOC 2 Type II and mapped to the frameworks our customers live under (OSHA, NERC CIP, HACCP, AS9100, HIPAA where applicable). Current documentation available under NDA.
          </LegalBlock>
          <LegalBlock n="08" title="Responsible disclosure">
            Found something? <a href="mailto:security@nadir.systems" style={{ color: "#0E7C8A", fontWeight: 600, textDecoration: "none" }}>security@nadir.systems</a> — acknowledged within one business day. We don&apos;t pursue good-faith researchers, and we credit fixes unless you&apos;d rather we didn&apos;t.
          </LegalBlock>
        </div>
        <div style={{ marginTop: 36, fontFamily: MONO, fontSize: 12, color: "#7a848e" }}>Last updated: July 3, 2026</div>
      </Section>
    </>
  );
}
