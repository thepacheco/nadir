import type { Metadata } from "next";
import { PageHero, Section, LegalBlock } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Privacy Policy — Nadir" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        sub="Last Updated: July 3, 2026. This policy outlines how Nadir Intelligence, Inc. handles your data, ensuring complete transparency and control."
      />
      <Section>
        <LegalBlock n="01" title="Data Collection & Usage">
          <p>
            Nadir operates entirely within isolated tenant boundaries. The operational data you connect to our platform (e.g., ERP data, SCADA feeds, HR systems) is processed solely to provide the agreed-upon services to your organization. We do not aggregate operational data across our customer base. The only data we collect for our own business purposes is the contact and billing information you voluntarily provide during account creation.
          </p>
        </LegalBlock>

        <LegalBlock n="02" title="Zero Model Training">
          <p>
            We utilize large language models (LLMs) strictly as stateless translation engines to interpret rules and generate human-readable text. Any data sent to these models is purged immediately after inference. Nadir explicitly prohibits its infrastructure providers and sub-processors from utilizing any customer data to train or improve their foundational models.
          </p>
        </LegalBlock>

        <LegalBlock n="03" title="Data Retention & Deletion">
          <p>
            Within your deployed workspace, Nadir maintains a localized Knowledge Base and Audit Trail. This data belongs exclusively to you. Upon contract termination or upon a verified deletion request, Nadir will permanently destroy the isolated tenant environment, wiping all operational data, derived ontologies, and associated cryptographic keys within 30 days.
          </p>
        </LegalBlock>

        <LegalBlock n="04" title="Third-Party Sub-processors">
          <p>
            To provide our services, we rely on a strictly vetted list of sub-processors to host our infrastructure (e.g., Amazon Web Services, Google Cloud Platform). These vendors are contractually bound to the same strict privacy and security standards as Nadir. A full, up-to-date list of sub-processors can be provided via our support portal upon request.
          </p>
        </LegalBlock>

        <LegalBlock n="05" title="Marketing Communications">
          <p>
            If you submit your information via our contact forms, we may use your email address to send you product updates or marketing materials. You retain the right to opt-out of these communications at any time by clicking the "unsubscribe" link at the bottom of our emails. Opting out will not affect critical service or security notifications.
          </p>
        </LegalBlock>
      </Section>
    </>
  );
}
