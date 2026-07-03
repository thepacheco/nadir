import type { Metadata } from "next";
import { PageHero, Section, ContentBlock } from "@/components/site/PageShell";

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
        <ContentBlock n="01" title="Strict Tenant Isolation">
          <p style={{ marginBottom: 16 }}>
            We understand that for regulated physical industries, multi-tenant databases are often a non-starter. Nadir provisions completely isolated cloud environments for every enterprise deployment. Your data never co-mingles with another customer's data.
          </p>
          <p>
            This isolation extends through the entire stack: your operations run within dedicated Virtual Private Clouds (VPCs), utilizing dedicated encryption keys, separate database clusters for the Operational Graph, and isolated compute instances for AI inference. 
          </p>
        </ContentBlock>

        <ContentBlock n="02" title="Zero AI Model Training">
          <p style={{ marginBottom: 16 }}>
            Nadir utilizes Large Language Models (LLMs) strictly as stateless translation layers to interpret rules and generate human-readable text. Your operational data is <strong>never</strong> used to train, fine-tune, or improve foundational AI models.
          </p>
          <p>
            Any data transmitted to our LLM endpoints is processed entirely in memory and purged immediately following the inference request. We have executed strict Data Processing Agreements (DPAs) with our sub-processors ensuring they are legally and technically prohibited from retaining your data or using it for their own model development.
          </p>
        </ContentBlock>

        <ContentBlock n="03" title="Encryption and Key Management (BYOK)">
          <p style={{ marginBottom: 16 }}>
            All data transmitted between your on-premise systems and the Nadir VPC is encrypted in transit using TLS 1.3. All data stored within the Nadir platform—including the generated Operational Graph and cached schemas—is encrypted at rest using AES-256 block-level encryption.
          </p>
          <p>
            For Enterprise tier customers, we support Bring Your Own Key (BYOK) architectures via AWS Key Management Service (KMS) or Google Cloud KMS. This grants your security team the ultimate kill switch: you can cryptographically revoke Nadir's access to your data instantaneously, at any time, without our intervention.
          </p>
        </ContentBlock>

        <ContentBlock n="04" title="Immutable Audit Trails">
          <p style={{ marginBottom: 16 }}>
            Accountability is the foundation of compliance. Every single action taken within the Nadir platform is recorded in an append-only, tamper-evident ledger. 
          </p>
          <p>
            This includes every query executed, every alert dismissed by a user, every integration sync, and every write-back action initiated by an authorized operator. These logs cannot be altered or deleted by any user, including Nadir administrators, ensuring full compliance with SOC-2 Type II, HIPAA, and DoD IL4 audit requirements.
          </p>
        </ContentBlock>
      </Section>
    </>
  );
}
