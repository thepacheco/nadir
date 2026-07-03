import type { Metadata } from "next";
import { PageHero, Section, LegalBlock } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Terms of Service — Nadir" };

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Terms of Service"
        sub="Last Updated: July 3, 2026. These terms govern your use of the Nadir platform. We've written them to be clear and straightforward."
      />
      <Section>
        <LegalBlock n="01" title="Provision of Services">
          <p>
            Nadir Intelligence, Inc. ("Company") grants the Customer a non-exclusive, non-transferable right to access and use the Nadir Platform during the Subscription Term, solely for the Customer's internal business operations. You are responsible for ensuring that anyone using the platform under your account complies with these terms.
          </p>
        </LegalBlock>

        <LegalBlock n="02" title="Acceptable Use">
          <p>
            You agree not to use the Platform for any illegal activities or to process data that violates applicable laws (including privacy and compliance regulations). Furthermore, you may not attempt to reverse engineer, decompile, or extract the underlying models, ontology schemas, or source code of the Platform. 
          </p>
        </LegalBlock>

        <LegalBlock n="03" title="Data Ownership">
          <p>
            You own your data. Customer retains all rights, title, and interest in and to all Customer Data. The Company acquires no rights in Customer Data other than the rights necessary to provide the Services. The unique Ontology and logic schemas generated during your usage of the Platform remain your property upon termination of the contract.
          </p>
        </LegalBlock>

        <LegalBlock n="04" title="Liability Limitations">
          <p>
            Nadir provides advanced deterministic checks and operational intelligence, but it is a tool—not a guarantee. The Platform does not guarantee the prevention of physical incidents, regulatory violations, or business disruptions. Therefore, Nadir is not liable for any indirect, incidental, special, or consequential damages resulting from the use or inability to use the Platform.
          </p>
        </LegalBlock>

        <LegalBlock n="05" title="Termination">
          <p>
            Either party may terminate the agreement if the other party materially breaches these terms and fails to cure the breach within 30 days. Upon termination, your right to access the platform is immediately revoked, and we will initiate the secure deletion of your isolated tenant environment within 30 days as detailed in our Privacy Policy.
          </p>
        </LegalBlock>
      </Section>
    </>
  );
}
