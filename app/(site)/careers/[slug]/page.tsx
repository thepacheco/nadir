import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ROLES } from "@/lib/roles";
import { Section } from "@/components/site/PageShell";
import { MapPin, Clock, Users, ArrowLeft } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const role = ROLES.find((r) => r.slug === params.slug);
  return { title: role ? `${role.title} — Careers — Nadir` : "Careers — Nadir" };
}

export default function RoleDetailPage({ params }: { params: { slug: string } }) {
  const role = ROLES.find((r) => r.slug === params.slug);
  if (!role) notFound();

  return (
    <>
      {/* BACK LINK + HEADER */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 48px 0" }}>
        <Link href="/careers" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#5a646e", textDecoration: "none", marginBottom: 32 }}>
          <ArrowLeft size={16} /> All open roles
        </Link>
      </div>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "24px 48px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 40, flexWrap: "wrap" }}>
          <div>
            <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 48, lineHeight: 1.1, margin: "0 0 16px", letterSpacing: "-0.015em", color: "#14181C" }}>
              {role.title}
            </h1>
            <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: MONO, fontSize: 12, color: "#5a646e", letterSpacing: "0.04em" }}>
                <MapPin size={14} /> {role.location}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: MONO, fontSize: 12, color: "#5a646e", letterSpacing: "0.04em" }}>
                <Users size={14} /> {role.team}
              </span>
              <span style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: MONO, fontSize: 12, color: "#5a646e", letterSpacing: "0.04em" }}>
                <Clock size={14} /> {role.type}
              </span>
            </div>
          </div>
          <a href="#apply" className={styles.btnDark} style={{ fontSize: 16, fontWeight: 600, padding: "14px 32px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none", flex: "none" }}>
            Apply Now
          </a>
        </div>
      </div>

      {/* ROLE CONTENT */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "48px 48px 0" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", gap: 64 }}>
          {/* Main content */}
          <div>
            <div style={{ borderTop: "1px solid rgba(20,24,28,0.1)", paddingTop: 32, marginBottom: 48 }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>About the role</h2>
              <p style={{ fontSize: 15, lineHeight: 1.75, color: "#4a545e" }}>{role.about}</p>
            </div>

            <div style={{ borderTop: "1px solid rgba(20,24,28,0.1)", paddingTop: 32, marginBottom: 48 }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, margin: "0 0 20px", letterSpacing: "-0.01em", color: "#14181C" }}>What you'll do</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {role.whatYoullDo.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 12, fontSize: 15, color: "#3d4750", lineHeight: 1.6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0E7C8A", flex: "none", marginTop: 8 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div style={{ borderTop: "1px solid rgba(20,24,28,0.1)", paddingTop: 32, marginBottom: 48 }}>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 26, margin: "0 0 20px", letterSpacing: "-0.01em", color: "#14181C" }}>What we're looking for</h2>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 14 }}>
                {role.whatWereLookingFor.map((item) => (
                  <li key={item} style={{ display: "flex", gap: 12, fontSize: 15, color: "#3d4750", lineHeight: 1.6 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#15854F", flex: "none", marginTop: 8 }} />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Sidebar */}
          <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
            <div style={{ background: "#F6F5F3", border: "1px solid rgba(20,24,28,0.08)", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 16 }}>ROLE DETAILS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#7a848e", marginBottom: 4 }}>TEAM</div>
                  <div style={{ fontSize: 15, color: "#14181C" }}>{role.team}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#7a848e", marginBottom: 4 }}>LOCATION</div>
                  <div style={{ fontSize: 15, color: "#14181C" }}>{role.location}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#7a848e", marginBottom: 4 }}>TYPE</div>
                  <div style={{ fontSize: 15, color: "#14181C" }}>{role.type}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* APPLICATION FORM */}
      <Section alt>
        <div id="apply" style={{ maxWidth: 600 }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 30, margin: "0 0 8px", letterSpacing: "-0.01em", color: "#14181C" }}>Apply for {role.title}</h2>
          <p style={{ fontSize: 14.5, color: "#5a646e", margin: "0 0 32px" }}>
            Fill out the form below and we'll get back to you within a week.
          </p>
          <form style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>FULL NAME</label>
                <input type="text" style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="Jane Doe" />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>WORK EMAIL</label>
                <input type="email" style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="you@company.com" />
              </div>
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>LINKEDIN URL</label>
              <input type="url" style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="https://linkedin.com/in/..." />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 12, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>WHY THIS ROLE?</label>
              <textarea rows={4} style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", resize: "vertical", background: "#FFFFFF" }} placeholder="Tell us what excites you about this role and what you'd bring to the team." />
            </div>
            <button type="button" className={styles.btnDark} style={{ background: "#14181C", color: "#FFFFFF", padding: "14px 28px", fontSize: 15, fontWeight: 600, border: "none", borderRadius: 8, cursor: "pointer", alignSelf: "flex-start" }}>
              Submit Application
            </button>
          </form>
        </div>
      </Section>
    </>
  );
}
