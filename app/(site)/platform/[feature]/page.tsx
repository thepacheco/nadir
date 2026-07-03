import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FEATURES } from "@/lib/features";
import { Section } from "@/components/site/PageShell";
import { ArrowLeft } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

export function generateStaticParams() {
  return FEATURES.map((f) => ({ feature: f.slug }));
}

export function generateMetadata({ params }: { params: { feature: string } }): Metadata {
  const feat = FEATURES.find((f) => f.slug === params.feature);
  return { title: feat ? `${feat.title} — Platform — Nadir` : "Platform — Nadir" };
}

export default function FeatureDetailPage({ params }: { params: { feature: string } }) {
  const feat = FEATURES.find((f) => f.slug === params.feature);
  if (!feat) notFound();

  return (
    <>
      {/* BACK + HERO */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "40px 48px 0" }}>
        <Link href="/platform" style={{ display: "inline-flex", alignItems: "center", gap: 6, fontSize: 14, color: "#5a646e", textDecoration: "none", marginBottom: 32 }}>
          <ArrowLeft size={16} /> Platform Overview
        </Link>
      </div>

      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "24px 48px 0" }}>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#5a646e", marginBottom: 24 }}>{feat.eyebrow}</div>
        <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 56, lineHeight: 1.08, margin: "0 0 20px", maxWidth: 800, letterSpacing: "-0.015em", color: "#14181C" }}>
          {feat.hero}
        </h1>
        <p style={{ fontSize: 18, lineHeight: 1.6, color: "#4a545e", maxWidth: 680, margin: "0 0 40px" }}>{feat.sub}</p>
        <div style={{ display: "flex", gap: 14 }}>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 15, fontWeight: 600, padding: "14px 28px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none" }}>
            Request a Demo
          </Link>
          <Link href="/workspace" style={{ fontSize: 15, fontWeight: 600, padding: "14px 28px", color: "#14181C", border: "1px solid rgba(20,24,28,0.2)", borderRadius: 8, textDecoration: "none", background: "#FFFFFF" }}>
            See it live →
          </Link>
        </div>
      </div>

      {/* CODE SNIPPET */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "60px 48px 0" }}>
        <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, overflow: "hidden" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderBottom: "1px solid rgba(20,24,28,0.08)" }}>
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
            <div style={{ width: 10, height: 10, borderRadius: "50%", background: "rgba(20,24,28,0.14)" }} />
            <div style={{ marginLeft: 12, fontFamily: MONO, fontSize: 11.5, color: "#7a848e" }}>nadir · {feat.slug}</div>
          </div>
          <div style={{ fontFamily: MONO, fontSize: 13, color: "#5a646e", lineHeight: 2.2, padding: "20px 24px" }}>
            {feat.snippet.map((line, i) => (
              <div key={i}>
                <span style={{ color: "#7a848e" }}>{line.label}</span>
                {line.value && <> <span style={{ color: line.color || "#14181C" }}>{line.value}</span></>}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CONTENT SECTIONS */}
      {feat.sections.map((section, i) => (
        <div key={i} style={i % 2 === 1 ? { background: "#F6F5F3", borderTop: "1px solid rgba(20,24,28,0.08)", borderBottom: "1px solid rgba(20,24,28,0.08)" } : undefined}>
          <div style={{ maxWidth: 1040, margin: "0 auto", padding: "80px 48px" }}>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>{section.title}</h2>
            <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#4a545e", margin: "0 0 28px", maxWidth: 700 }}>{section.body}</p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {section.bullets.map((b) => (
                <li key={b} style={{ display: "flex", gap: 12, fontSize: 14.5, color: "#3d4750", lineHeight: 1.5 }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#0E7C8A", flex: "none", marginTop: 7 }} />
                  {b}
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}

      {/* OTHER FEATURES */}
      <Section>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>EXPLORE MORE</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 28, margin: "0 0 24px", letterSpacing: "-0.01em", color: "#14181C" }}>Other platform capabilities.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 16 }}>
          {FEATURES.filter((f) => f.slug !== feat.slug).map((f) => (
            <Link key={f.slug} href={`/platform/${f.slug}`} style={{ display: "block", background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "24px 24px", textDecoration: "none", color: "inherit", transition: "border-color 0.2s" }} className={styles.layerCard}>
              <div style={{ fontWeight: 700, fontSize: 16, color: "#14181C", marginBottom: 6 }}>{f.title}</div>
              <div style={{ fontSize: 13.5, color: "#5a646e", lineHeight: 1.5 }}>{f.hero}</div>
            </Link>
          ))}
        </div>
      </Section>

      {/* CTA */}
      <Section alt>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>See {feat.title} in action.</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 500 }}>
            Explore the live workspace demo with five simulated regulated industries.
          </p>
          <Link href="/workspace" className={styles.btnDark} style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>
            Open the live workspace →
          </Link>
        </div>
      </Section>
    </>
  );
}
