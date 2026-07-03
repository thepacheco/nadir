import type { Metadata } from "next";
import Link from "next/link";
import { MONO, SERIF, PageHero, Section } from "@/components/site/PageShell";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Contact — Nadir" };

const CHANNELS = [
  { label: "SALES & DEMOS", email: "hello@nadir.systems", desc: "See Nadir on your own data. We'll connect one system, one narrow process, and show you something real inside two weeks." },
  { label: "SUPPORT", email: "support@nadir.systems", desc: "Existing customers — connection issues, ontology corrections, new source requests. We answer fast; broken visibility is an outage." },
  { label: "SECURITY", email: "security@nadir.systems", desc: "Vulnerability reports and security questionnaires. Responsible disclosure is appreciated and acknowledged within one business day." },
  { label: "PRESS & PARTNERS", email: "press@nadir.systems", desc: "Media, integration partnerships, and everything that doesn't fit the other three boxes." },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="CONTACT"
        title="Talk to a person, not a funnel."
        sub="Four inboxes, all read by humans. If you're not sure which one, pick any — we route internally, which is sort of our whole thing."
      />
      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, maxWidth: 980 }}>
          {CHANNELS.map((c) => (
            <div key={c.label} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "26px 28px" }}>
              <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.12em", color: "#7a848e", marginBottom: 12 }}>{c.label}</div>
              <a href={`mailto:${c.email}`} style={{ fontSize: 17, fontWeight: 700, color: "#0E7C8A", textDecoration: "none" }}>{c.email}</a>
              <p style={{ fontSize: 14, lineHeight: 1.65, color: "#5a646e", margin: "12px 0 0" }}>{c.desc}</p>
            </div>
          ))}
        </div>
      </Section>
      <Section alt>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 10px", letterSpacing: "-0.01em" }}>Or skip the email entirely.</h2>
            <p style={{ fontSize: 15.5, color: "#4a545e", margin: 0 }}>The live workspace is the best first meeting — five companies, real scenarios, no signup.</p>
          </div>
          <Link
            href="/workspace"
            className={styles.btnDark}
            style={{ fontSize: 16, fontWeight: 600, padding: "15px 32px", background: "#14181C", color: "#FAF9F7", borderRadius: 8, textDecoration: "none", flex: "none" }}
          >
            Open the live workspace →
          </Link>
        </div>
      </Section>
    </>
  );
}
