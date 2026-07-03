import type { Metadata } from "next";
import { PageHero, Section, ContentBlock } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Privacy Policy — Nadir" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Privacy Policy"
        sub="Last Updated: July 3, 2026. This policy governs how Nadir Intelligence, Inc. collects, processes, and protects your information."
      />
      <Section>
        <ContentBlock n="01" title="1. Information We Collect">
          <p style={{ marginBottom: 16 }}>
            <strong>1.1 Operational Data.</strong> When you deploy the Nadir platform, you grant the system read-only access to your internal operational databases, ERPs, and APIs. This "Operational Data" is collected solely for the purpose of generating your isolated Operational Graph and running compliance checks. We do not aggregate, sell, or monetize your Operational Data in any way.
          </p>
          <p>
            <strong>1.2 Account Information.</strong> To provide our services, we collect basic contact and billing information from your designated administrators. This includes names, email addresses, corporate addresses, and payment details. This information is used strictly for billing, support, and critical service notifications.
          </p>
        </ContentBlock>

        <ContentBlock n="02" title="2. How We Use Your Information">
          <p style={{ marginBottom: 16 }}>
            <strong>2.1 Providing the Service.</strong> Your Operational Data is processed automatically by our ingestion pipelines and fusion engine to provide you with the core functionality of the platform (e.g., generating alerts, resolving database relationships, identifying compliance violations).
          </p>
          <p>
            <strong>2.2 No Cross-Tenant Analysis.</strong> Nadir operates strictly within isolated tenant boundaries. We do not analyze your Operational Data to extract industry-wide trends, benchmark against other customers, or train foundational machine learning models. What happens in your tenant, stays in your tenant.
          </p>
        </ContentBlock>

        <ContentBlock n="03" title="3. Data Retention and Destruction">
          <p style={{ marginBottom: 16 }}>
            <strong>3.1 Active Subscriptions.</strong> As long as your subscription is active, Nadir will retain the Operational Graph and the associated audit logs required to maintain your compliance posture. 
          </p>
          <p>
            <strong>3.2 Post-Termination.</strong> Upon termination of the Master Subscription Agreement, or upon receiving a verified deletion request from an authorized administrator, Nadir will initiate a complete cryptographic wipe of your isolated tenant environment. All Operational Data, derived ontologies, and audit logs will be permanently destroyed within thirty (30) days of the request.
          </p>
        </ContentBlock>

        <ContentBlock n="04" title="4. Sub-processors and Third-Party Sharing">
          <p style={{ marginBottom: 16 }}>
            To deliver enterprise-grade availability and security, Nadir utilizes a vetted list of sub-processors (such as Amazon Web Services and Google Cloud Platform) to host our infrastructure. These sub-processors are legally bound by strict Data Processing Agreements (DPAs) that prohibit them from accessing your Operational Data or using it for their own purposes.
          </p>
          <p>
            We will never share your Operational Data with third parties for marketing or advertising purposes. We will only disclose information if legally compelled to do so by a valid subpoena or court order, and we will attempt to notify you prior to disclosure unless legally prohibited.
          </p>
        </ContentBlock>
      </Section>
    </>
  );
}
