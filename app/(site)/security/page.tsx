import type { Metadata } from "next";
import { PageHero, Section, LegalBlock } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Security — Nadir" };

export default function SecurityPage() {
  return (
    <>
      <PageHero
        eyebrow="SECURITY & TRUST"
        title="Enterprise-grade data protection."
        sub="Nadir connects directly to your most sensitive operational and financial systems. We architected our security model from day one assuming a zero-trust environment."
      />
      <Section>
        <LegalBlock n="01" title="Strict Tenant Isolation">
          <p>
            Your data never touches another customer's data. Nadir provisions completely isolated cloud environments for every enterprise deployment. This means your operations run within dedicated Virtual Private Clouds (VPCs), utilizing dedicated encryption keys and separate database clusters. We do not use shared multi-tenant databases for enterprise clients.
          </p>
        </LegalBlock>

        <LegalBlock n="02" title="No Model Training on Your Data">
          <p>
            Nadir's Large Language Model (LLM) components act strictly as stateless translation layers. This means that your operational data, incident memories, and compliance checks are used exclusively to process your queries at runtime. Your data is <strong>never</strong> used to train, fine-tune, or improve foundational AI models, either by us or our subprocessors.
          </p>
        </LegalBlock>

        <LegalBlock n="03" title="Role-Based Access Control (RBAC)">
          <p>
            Permissions in Nadir map 1:1 with your existing SSO provider (Okta, Entra, Google Workspace). We enforce strict least-privilege access: a line worker only sees their shift and equipment; an area manager sees their specific floor; executives see the aggregated views. Write-back actions into your ERP systems require explicit authorization and multi-step approvals.
          </p>
        </LegalBlock>

        <LegalBlock n="04" title="Immutable Audit Logs">
          <p>
            Every single action taken within the platform is recorded. Every query, alert dismissal, system integration, and write-back action is logged immutably. These logs are preserved in a tamper-evident ledger, ensuring that Nadir meets the strict requirements of SOC-2 Type II, HIPAA, and DoD IL4 compliance audits.
          </p>
        </LegalBlock>

        <LegalBlock n="05" title="Data Encryption">
          <p>
            All data is encrypted in transit using TLS 1.3 and at rest using AES-256 encryption. We support Bring Your Own Key (BYOK) architectures via AWS KMS or Google Cloud KMS, giving you the ability to revoke our access to your data instantaneously at any time.
          </p>
        </LegalBlock>
      </Section>
    </>
  );
}
