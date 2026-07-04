import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ROLES } from "@/lib/roles";
import { Section } from "@/components/site/PageShell";
import { ArrowLeft, Upload, FileText, CheckCircle } from "lucide-react";
import { CareerApplyForm } from "@/components/site/CareerApplyForm";
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
            <CareerApplyForm />
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
