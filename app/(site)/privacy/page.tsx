import type { Metadata } from "next";
import { MONO, PageHero, Section, LegalBlock } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Privacy Policy — Nadir" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        sub="What we collect, why we collect it, and what we will never do with it. Written to be read."
      />
      <Section>
        <div style={{ maxWidth: 900 }}>
          <LegalBlock n="1" title="Who this covers">
            This policy covers visitors to nadir.systems, users of the Nadir application, and the operational data our customers connect to the platform. Where Nadir processes a customer&apos;s business data, we act as a processor on the customer&apos;s instructions; the customer remains the controller of their data.
          </LegalBlock>
          <LegalBlock n="2" title="What we collect">
            <strong>Account data:</strong> name, work email, role, and authentication records for each user your organization invites. <strong>Connected data:</strong> the database schemas, sampled rows, documents, and derived findings your organization connects — read-only, scoped by your administrators. <strong>Usage data:</strong> product interactions and diagnostic logs used to keep the service reliable. <strong>Site data:</strong> standard server logs for this website. We do not buy, sell, or enrich data from brokers.
          </LegalBlock>
          <LegalBlock n="3" title="What we use it for">
            To operate the product: building your operational graph, generating findings and recommendations, routing notifications to the right owners, and maintaining the audit trail. To keep the service secure and reliable. To communicate with you about the service. That is the list.
          </LegalBlock>
          <LegalBlock n="4" title="What we never do">
            We never sell personal or customer data. We never use customer data to train models — ours or third parties&apos;. We never allow cross-tenant access to your data. We never retain connected data beyond your contract except where law requires.
          </LegalBlock>
          <LegalBlock n="5" title="Model providers">
            Nadir uses third-party language-model APIs for reconciliation and drafting. Requests are sent under zero-data-retention terms; providers may not train on or store the content of requests. Deterministic checks run entirely inside Nadir&apos;s infrastructure and never leave it.
          </LegalBlock>
          <div id="subprocessors">
            <LegalBlock n="6" title="Subprocessors">
              We use a small set of infrastructure subprocessors (cloud hosting, secrets management, error monitoring, model APIs), each bound by data-protection agreements at least as protective as this policy. The current list is available on request at <a href="mailto:privacy@nadir.systems" style={{ color: "#0E7C8A", fontWeight: 600, textDecoration: "none" }}>privacy@nadir.systems</a>; customers are notified before any addition.
            </LegalBlock>
          </div>
          <LegalBlock n="7" title="Retention & deletion">
            Account data lives while your account does. Connected data and derived findings are deleted within 30 days of contract termination, with certificates of deletion available. Audit logs are retained for the period your compliance regime requires, then deleted.
          </LegalBlock>
          <LegalBlock n="8" title="Your rights">
            Depending on your jurisdiction, you may have rights to access, correct, export, or delete personal data we hold about you. Requests go to <a href="mailto:privacy@nadir.systems" style={{ color: "#0E7C8A", fontWeight: 600, textDecoration: "none" }}>privacy@nadir.systems</a> and are answered within 30 days. If you&apos;re an employee of a Nadir customer, we&apos;ll route requests about connected data to your employer, the controller.
          </LegalBlock>
          <LegalBlock n="9" title="Changes">
            Material changes to this policy are announced to account administrators at least 30 days before they take effect. The change history is available on request.
          </LegalBlock>
        </div>
        <div style={{ marginTop: 36, fontFamily: MONO, fontSize: 12, color: "#7a848e" }}>Effective: July 3, 2026 · Contact: privacy@nadir.systems</div>
      </Section>
    </>
  );
}
