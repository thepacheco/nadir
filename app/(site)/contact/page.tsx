import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import { ContactForm } from "@/components/site/ContactForm";
import { MapPin, Globe, Calendar, ShieldAlert } from "lucide-react";

export const metadata: Metadata = { title: "Contact — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Get in touch with the team."
        sub="We do not employ high-pressure sales reps. When you reach out to Nadir, you speak directly with the deployment engineers who will configure your operational twin."
      />

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64 }}>
          {/* Channels & Info */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 40 }}>
              {/* Channel 1: Enterprise */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(14,124,138,0.08)", color: "#0E7C8A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Calendar size={18} />
                  </div>
                  <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 24, margin: 0, color: "#14181C" }}>Enterprise Evaluations</h2>
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: "0 0 16px" }}>
                  To initiate a two-week pilot connection, let us know your industry type, target legacy databases (Oracle, SAP HANA, custom SQL), and the specific regulatory check or workflow bottle-neck you need to solve.
                </p>
                <div style={{ fontFamily: MONO, fontSize: 13, color: "#0E7C8A", fontWeight: 700 }}>deployments@nadir.systems</div>
              </div>

              {/* Channel 2: Operations Support */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(21,133,79,0.08)", color: "#15854F", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <ShieldAlert size={18} />
                  </div>
                  <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 24, margin: 0, color: "#14181C" }}>Customer Support Desk</h2>
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: "0 0 16px" }}>
                  Active workspace operators requiring assistance with tenant configurations, alert routing alerts, or mapping drift updates can contact our priority support desk.
                </p>
                <div style={{ fontFamily: MONO, fontSize: 13, color: "#15854F", fontWeight: 700 }}>ops-support@nadir.systems</div>
              </div>

              {/* Channel 3: Partners & Press */}
              <div>
                <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                  <div style={{ width: 36, height: 36, borderRadius: 8, background: "rgba(20,24,28,0.06)", color: "#14181C", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Globe size={18} />
                  </div>
                  <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 24, margin: 0, color: "#14181C" }}>Partners &amp; Press</h2>
                </div>
                <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: "0 0 16px" }}>
                  For corporate development inquiries, partner API evaluations, or media requests, please contact our administrative relations team.
                </p>
                <div style={{ fontFamily: MONO, fontSize: 13, color: "#14181C", fontWeight: 700 }}>relations@nadir.systems</div>
              </div>

              {/* Channel 4: HQ Location */}
              <div style={{ borderTop: "1px solid rgba(20,24,28,0.1)", paddingTop: 32 }}>
                <div style={{ display: "flex", gap: 12 }}>
                  <MapPin size={18} style={{ color: "#7a848e", marginTop: 4, flex: "none" }} />
                  <div>
                    <h3 style={{ fontSize: 14, fontWeight: 600, color: "#14181C", margin: "0 0 6px" }}>ATLANTA HEADQUARTERS</h3>
                    <p style={{ fontSize: 13.5, lineHeight: 1.5, color: "#5a646e", margin: 0 }}>
                      Nadir Intelligence, Inc.<br />
                      600 Peachtree St NE, Suite 4000<br />
                      Atlanta, GA 30308
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Form Card */}
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "36px 32px", alignSelf: "start" }}>
            <h3 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, margin: "0 0 20px", color: "#14181C" }}>Send an Inquiry</h3>
            <ContactForm />
          </div>
        </div>
      </Section>
    </>
  );
}
