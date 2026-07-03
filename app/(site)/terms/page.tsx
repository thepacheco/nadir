import type { Metadata } from "next";
import { MONO, PageHero, Section, LegalBlock } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Terms of Service — Nadir" };

export default function TermsPage() {
  return (
    <>
      <PageHero
        eyebrow="LEGAL"
        title="Terms of Service"
        sub="The agreement between Nadir Intelligence, Inc. and the organizations that use the platform."
      />
      <Section>
        <div style={{ maxWidth: 900 }}>
          <LegalBlock n="1" title="The service">
            Nadir provides an operational-intelligence platform that connects read-only to systems you designate, builds a model of your operation, and surfaces findings, recommendations, and audit trails. Your subscription tier determines which capabilities and how many connected sources are included.
          </LegalBlock>
          <LegalBlock n="2" title="Your data, your instructions">
            You retain all rights to the data you connect. You grant Nadir a license to process it solely to provide the service to you. You are responsible for having the authority to connect the systems you connect, and for designating which of your people may see what.
          </LegalBlock>
          <LegalBlock n="3" title="Recommendations are recommendations">
            Nadir surfaces findings and drafts actions; your people decide. The service is decision support, not a decision-maker of record — outputs should be reviewed by qualified personnel before action, especially where safety, regulatory filings, or employment decisions are involved. Nadir does not provide legal, accounting, or engineering advice.
          </LegalBlock>
          <div id="acceptable-use">
            <LegalBlock n="4" title="Acceptable use">
              Don&apos;t use the service to violate law or third-party rights; don&apos;t connect data you have no right to connect; don&apos;t attempt to access other tenants, probe or overload the infrastructure, resell access, or use the service to build a competing data-fusion product. Don&apos;t use findings to falsify records — the audit trail exists to surface problems, not to launder them.
            </LegalBlock>
          </div>
          <LegalBlock n="5" title="Fees">
            Subscription fees are billed monthly or annually in advance per your order form. Usage-based model costs, where applicable to your tier, are metered transparently and capped at limits you set. Fees are non-refundable except as required by law or stated in your order form.
          </LegalBlock>
          <LegalBlock n="6" title="Confidentiality">
            Each party protects the other&apos;s confidential information with at least the care it uses for its own, and uses it only to perform under these terms. Nadir&apos;s security commitments are described in the Security &amp; Trust page and your DPA.
          </LegalBlock>
          <LegalBlock n="7" title="Warranties & disclaimers">
            We warrant that the service will perform materially as described and that we&apos;ll provide it with reasonable skill and care. Except as stated, the service is provided &quot;as is&quot;; we disclaim implied warranties to the extent law allows. We do not warrant that findings are exhaustive — Nadir sees what the connected data shows.
          </LegalBlock>
          <LegalBlock n="8" title="Liability">
            Neither party is liable for indirect or consequential damages. Each party&apos;s aggregate liability is capped at the fees paid or payable in the twelve months before the claim, except for breaches of confidentiality, IP infringement, or amounts owed.
          </LegalBlock>
          <LegalBlock n="9" title="Term & termination">
            Either party may terminate for material breach uncured after 30 days&apos; notice. On termination, your data is exportable for 30 days and then deleted per the Privacy Policy. Sections that by nature survive (confidentiality, liability, payment) survive.
          </LegalBlock>
          <LegalBlock n="10" title="Governing law">
            These terms are governed by the laws of the State of Georgia, USA, excluding conflicts rules; exclusive venue is the state and federal courts of Fulton County, Georgia.
          </LegalBlock>
        </div>
        <div style={{ marginTop: 36, fontFamily: MONO, fontSize: 12, color: "#7a848e" }}>Effective: July 3, 2026 · Contact: legal@nadir.systems</div>
      </Section>
    </>
  );
}
