import type { Metadata } from "next";
import { PageHero, Section, ContentBlock } from "@/components/site/PageShell";

export const metadata: Metadata = { title: "Contact — Nadir" };

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Get in touch with Engineering."
        sub="We do not employ traditional sales teams. When you contact Nadir, you speak directly with the Forward-Deployed Engineers who will build your operational graph."
      />

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <div style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 28, marginBottom: 16, color: "#14181C", letterSpacing: "-0.01em" }}>Enterprise Evaluation</div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 32 }}>
              To initiate a two-week proof of concept, please email our deployment team with a brief description of your industry, the primary ERP or SQL database you utilize, and the specific compliance or operational bottleneck you intend to solve.
            </p>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 13, color: "#14181C" }}>
              deployments@nadir.systems
            </div>

            <div style={{ height: 1, background: "rgba(20,24,28,0.1)", margin: "40px 0" }} />

            <div style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 28, marginBottom: 16, color: "#14181C", letterSpacing: "-0.01em" }}>Press & Partnerships</div>
            <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e", marginBottom: 32 }}>
              For all press inquiries, analyst briefings, and strategic partnership proposals, please reach out to our communications office.
            </p>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 13, color: "#14181C" }}>
              press@nadir.systems
            </div>
          </div>

          <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", padding: 40 }}>
            <div style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 24, marginBottom: 24, color: "#14181C", letterSpacing: "-0.01em" }}>Direct Inquiry</div>
            <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: "#5a646e" }}>WORK EMAIL</label>
                <input type="email" style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 0, outline: "none" }} placeholder="you@company.com" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: "#5a646e" }}>COMPANY / INDUSTRY</label>
                <input type="text" style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 0, outline: "none" }} placeholder="e.g. Acme Corp / Aerospace" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: "#5a646e" }}>MESSAGE</label>
                <textarea rows={4} style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 0, outline: "none", resize: "vertical" }} placeholder="How can we help?" />
              </div>
              <button type="button" style={{ background: "#14181C", color: "#FFFFFF", padding: "14px 24px", fontSize: 14, fontWeight: 600, border: "none", cursor: "pointer", marginTop: 8 }}>
                Submit Inquiry
              </button>
            </form>
          </div>
        </div>
      </Section>
    </>
  );
}
