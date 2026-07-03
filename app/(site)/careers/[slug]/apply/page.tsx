import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ROLES } from "@/lib/roles";
import { Section } from "@/components/site/PageShell";
import { ArrowLeft, Upload, FileText, CheckCircle } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

export function generateStaticParams() {
  return ROLES.map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const role = ROLES.find((r) => r.slug === slug);
  return { title: role ? `Apply — ${role.title} — Nadir` : "Apply — Careers — Nadir" };
}

export default async function ApplyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const role = ROLES.find((r) => r.slug === slug);
  if (!role) notFound();

  return (
    <>
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 48px 0" }}>
        <Link href={`/careers/${role.slug}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#5a646e", textDecoration: "none", marginBottom: 32 }}>
          <ArrowLeft size={16} /> Back to role details
        </Link>
      </div>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "24px 48px 0" }}>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#5a646e", marginBottom: 16 }}>JOB APPLICATION</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 44, lineHeight: 1.1, margin: "0 0 12px", letterSpacing: "-0.015em", color: "#14181C" }}>
          Apply for {role.title}
        </h1>
        <p style={{ fontSize: 16, color: "#4a545e", maxWidth: 600, margin: 0 }}>
          Please complete the form below. Required fields are marked with an asterisk (*).
        </p>
      </div>

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1fr", gap: 64 }}>
          {/* Main Form */}
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "36px 32px" }}>
            <form style={{ display: "flex", flexDirection: "column", gap: 24 }}>
              {/* Step 1: Basics */}
              <div>
                <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 16, borderBottom: "1px solid rgba(20,24,28,0.08)", paddingBottom: 8 }}>
                  01 / PERSONAL DETAILS
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>FULL NAME *</label>
                    <input type="text" required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="Jane Doe" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>EMAIL ADDRESS *</label>
                    <input type="email" required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="jane@company.com" />
                  </div>
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>PHONE NUMBER</label>
                    <input type="tel" style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="+1 (555) 000-0000" />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>LINKEDIN OR PORTFOLIO *</label>
                    <input type="url" required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="https://linkedin.com/in/..." />
                  </div>
                </div>
              </div>

              {/* Step 2: Resume */}
              <div>
                <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 16, borderBottom: "1px solid rgba(20,24,28,0.08)", paddingBottom: 8 }}>
                  02 / RÉSUMÉ UPLOAD
                </div>
                <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>ATTACH RÉSUMÉ (PDF, DOCX) *</label>
                {/* Styled drag & drop file uploader */}
                <div style={{
                  border: "2px dashed rgba(20,24,28,0.15)", borderRadius: 8, padding: "32px 20px",
                  textAlign: "center", cursor: "pointer", background: "#FAFAF8",
                  display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
                }}>
                  <Upload size={24} style={{ color: "#7a848e" }} />
                  <div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#14181C" }}>Drag and drop your file here,</span>
                    <span style={{ fontSize: 14, color: "#5a646e" }}> or click to browse</span>
                  </div>
                  <div style={{ fontSize: 11.5, color: "#7a848e" }}>Maximum size: 10MB</div>
                  <input type="file" accept=".pdf,.docx,.doc" style={{ display: "none" }} id="resume-upload" />
                </div>
              </div>

              {/* Step 3: Questions */}
              <div>
                <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 16, borderBottom: "1px solid rgba(20,24,28,0.08)", paddingBottom: 8 }}>
                  03 / QUESTIONNAIRE
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                  <div>
                    <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>
                      WHY DO YOU WANT TO WORK AT NADIR? *
                    </label>
                    <textarea rows={4} required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", resize: "vertical", background: "#FFFFFF" }} placeholder="Tell us why you are interested in this specific role and team." />
                  </div>
                  <div>
                    <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>
                      DESCRIBE A COMPLEX DATA OR SCHEMA ISSUE YOU HAVE DEALT WITH. *
                    </label>
                    <textarea rows={4} required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", resize: "vertical", background: "#FFFFFF" }} placeholder="We deal with legacy schemas and database configurations daily. Share your experience." />
                  </div>
                </div>
              </div>

              <button type="button" className={styles.btnDark} style={{ background: "#14181C", color: "#FFFFFF", padding: "15px 32px", fontSize: 15, fontWeight: 600, border: "none", borderRadius: 8, cursor: "pointer", alignSelf: "flex-start", marginTop: 8 }}>
                Submit Application
              </button>
            </form>
          </div>

          {/* Sidebar Info */}
          <div style={{ position: "sticky", top: 100, alignSelf: "start" }}>
            <div style={{ background: "#F6F5F3", border: "1px solid rgba(20,24,28,0.08)", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 16 }}>ROLE HIGHLIGHTS</div>
              <div style={{ display: "flex", flexDirection: "column", gap: 16, marginBottom: 20 }}>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#7a848e", marginBottom: 4 }}>ROLE</div>
                  <div style={{ fontSize: 15, color: "#14181C", fontWeight: 700 }}>{role.title}</div>
                </div>
                <div>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#7a848e", marginBottom: 4 }}>TEAM / LOCATION</div>
                  <div style={{ fontSize: 14.5, color: "#5a646e" }}>{role.team} · {role.location}</div>
                </div>
              </div>
              <div style={{ height: 1, background: "rgba(20,24,28,0.1)", margin: "20px 0" }} />
              <div style={{ display: "flex", gap: 12, alignItems: "flex-start" }}>
                <CheckCircle size={18} style={{ color: "#15854F", flex: "none", marginTop: 2 }} />
                <div style={{ fontSize: 13, color: "#5a646e", lineHeight: 1.5 }}>
                  Your application will be cryptographically isolated within our recruitment portal. We never share your resume or personal details with third-party aggregators.
                </div>
              </div>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
