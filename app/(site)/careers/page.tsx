import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import Reveal from "@/components/site/Reveal";
import { ROLES } from "@/lib/roles";
import { MapPin, ArrowRight, Code, Rocket, Palette } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Careers — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const ROLE_ICONS = [
  <Code key="0" size={22} />,
  <Rocket key="1" size={22} />,
  <Palette key="2" size={22} />,
];

export default function CareersPage() {
  return (
    <>
      <PageHero
        eyebrow="CAREERS"
        title="Teach an AI how real companies run."
        sub="Most software makes people fit the tool. We're building the opposite — an AI that learns how a business actually works and hands its operators control. Come build the thing that finally lets them see the whole board."
      />

      {/* OPEN ROLES */}
      <Reveal>
      <Section>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>OPEN POSITIONS</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 32px", letterSpacing: "-0.01em", color: "#14181C" }}>Current openings.</h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {ROLES.map((role, i) => (
            <Link
              key={role.slug}
              href={`/careers/${role.slug}`}
              style={{
                display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 20, alignItems: "center",
                background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12,
                padding: "24px 28px", textDecoration: "none", color: "inherit",
                transition: "border-color 0.2s, box-shadow 0.2s",
              }}
              className={styles.layerCard}
            >
              <div style={{ width: 48, height: 48, borderRadius: 10, background: "rgba(14,124,138,0.08)", color: "#0E7C8A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                {ROLE_ICONS[i]}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: 17, color: "#14181C", marginBottom: 4 }}>{role.title}</div>
                <div style={{ fontSize: 14, color: "#5a646e" }}>{role.shortDesc}</div>
                <div style={{ display: "flex", gap: 16, marginTop: 8 }}>
                  <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontFamily: MONO, fontSize: 11, color: "#7a848e", letterSpacing: "0.04em" }}>
                    <MapPin size={12} /> {role.location}
                  </span>
                  <span style={{ fontFamily: MONO, fontSize: 11, color: "#7a848e", letterSpacing: "0.04em" }}>{role.team}</span>
                </div>
              </div>
              <ArrowRight size={20} style={{ color: "#7a848e" }} />
            </Link>
          ))}
        </div>
      </Section>
      </Reveal>

      {/* LOCATION */}
      <Reveal>
      <Section alt>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>LOCATIONS</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Atlanta, GA</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a545e", margin: "0 0 24px" }}>
              Our headquarters are in Atlanta. Most engineering roles are hybrid (3 days in-office). Forward-deployed engineers work remotely with regular client travel. We also support fully remote for the right candidates.
            </p>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Remote (US)</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>
              For roles that don&rsquo;t require regular on-site presence, we support fully remote work within the United States.
            </p>
          </div>
          <div style={{ background: "#F6F5F3", border: "1px solid rgba(20,24,28,0.08)", borderRadius: 12, padding: "32px 28px" }}>
            <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 16 }}>BENEFITS</div>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {[
                "Competitive salary + meaningful equity",
                "Health, dental, and vision insurance",
                "Unlimited PTO (actually used — we track it)",
                "Home office stipend",
                "Annual learning budget",
              ].map((b) => (
                <li key={b} style={{ display: "flex", gap: 10, fontSize: 14.5, color: "#3d4750", lineHeight: 1.5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15854F", flex: "none", marginTop: 7 }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </Section>
      </Reveal>

      {/* BOTTOM CTA */}
      <Section>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>Don&rsquo;t see your role?</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 500 }}>
            We&rsquo;re always looking for people who are excited about turning messy data into operational clarity. Reach out anyway.
          </p>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 15, fontWeight: 600, padding: "14px 32px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none" }}>
            Get in touch
          </Link>
        </div>
      </Section>
    </>
  );
}
