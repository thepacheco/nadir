import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { Section } from "@/components/site/PageShell";
import { Target, Cpu, Shield, Users, Network, Code, Server, HelpCircle } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "About — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const PRINCIPLES = [
  { icon: <Target size={22} />, title: "Ontologies over tables", desc: "Businesses don't operate on database rows and columns. They operate on Entities (people, machines, shifts) and Relationships. We model real operations." },
  { icon: <Cpu size={22} />, title: "Deterministic rules before AI", desc: "For high-risk environments, hallucinations are unacceptable. Rules are evaluated using strict mathematical verification — AI only writes the briefing context." },
  { icon: <Shield size={22} />, title: "Your data stays yours", desc: "We never train foundational AI models on your operational logs. Each deployment runs in an isolated tenant with custom encryption keys." },
  { icon: <Users size={22} />, title: "Forward-Deployed Engineering", desc: "We sit directly on the floor with operations managers and plant engineers to build, verify, and launch the ontology mappings." },
];

const ENGAGEMENT_STEPS = [
  { step: "01", label: "Initial Integration & Scope", desc: "We connect to your ERP or SQL databases via read-only paths. No write access required, ensuring absolute safety for your operational systems." },
  { step: "02", label: "Semantic Mapping Approval", desc: "Our forward-deployed engineers guide your domain experts through validating and confirming the ontology mappings via the Schema Mapper UI." },
  { step: "03", label: "Compliance Configuration", desc: "We translate your regulatory policies (e.g. OSHA limits, access clearances) into mathematical rules evaluated continuously against the live graph." },
  { step: "04", label: "Operational Launch", desc: "Alert routings, SMS notification schedules, and tamper-proof ledgers are deployed. Your team begins monitoring live activities." },
];


export default function AboutPage() {
  return (
    <>
      {/* CUSTOM HERO WITH COMPACT RIGHT-ALIGNED PHOTO */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "100px 48px 40px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "1.2fr 1fr", gap: 64, alignItems: "center" }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#5a646e", marginBottom: 24 }}>THE COMPANY</div>
            <h1 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 52, lineHeight: 1.1, margin: 0, letterSpacing: "-0.015em", color: "#14181C" }}>
              We connect the physical world to AI, and give it back to the people who run it.
            </h1>
            <p style={{ fontSize: 16.5, lineHeight: 1.65, color: "#4a545e", margin: "24px 0 0" }}>
              Our whole goal is control: to let a company see and steer how it actually operates. Most businesses run on a dozen disconnected systems and nobody has the full picture. Nadir is the AI that puts it back together — so the people running the place are the ones in charge of it.
            </p>
          </div>
          <div style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: 12, boxShadow: "0 20px 40px -20px rgba(0,0,0,0.06)" }}>
            <Image
              src="/images/office.png"
              alt="Nadir team collaborating at the Atlanta office"
              width={450}
              height={300}
              style={{ width: "100%", height: "auto", borderRadius: 8, display: "block" }}
              priority
            />
            <div style={{ fontFamily: MONO, fontSize: 11, color: "#7a848e", marginTop: 10, textAlign: "center" }}>
              Nadir HQ · Atlanta, GA
            </div>
          </div>
        </div>
      </div>

      {/* CORE PROBLEM & SOLUTIONS */}
      <Section alt>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64 }}>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>THE CHALLENGE</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 32, margin: "0 0 20px", letterSpacing: "-0.01em", color: "#14181C" }}>Systemic fragmentation.</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a545e", margin: "0 0 16px" }}>
              Modern industrial systems are highly specialized, yet they are managed using disconnected legacy technologies. Plant logs, compliance registries, and supplier tables sit in separate databases, resulting in blindspots.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>
              Because there is no unified semantic connection between these data systems, auditing is done after the fact, forcing companies to assume high liability risks.
            </p>
          </div>
          <div>
            <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>THE APPROACH</div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 32, margin: "0 0 20px", letterSpacing: "-0.01em", color: "#14181C" }}>Operational virtualizations.</h2>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a545e", margin: "0 0 16px" }}>
              Nadir connects directly to your databases via read-only pathways, reading schemas and mapping tables into unified entities. We construct a real-time, interactive graph linking machinery, shifts, and worker compliance logs.
            </p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>
              Our deterministic rules engine monitors the graph continuously to flag anomalies before they create liabilities, generating actionable reports with full data trails.
            </p>
          </div>
        </div>
      </Section>

      {/* GUIDING PRINCIPLES */}
      <Section alt>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>PHILOSOPHY</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 32px", letterSpacing: "-0.01em", color: "#14181C" }}>Operational standards we live by.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {PRINCIPLES.map((p, i) => (
            <div key={i} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 14 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(14,124,138,0.08)", color: "#0E7C8A", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {p.icon}
                </div>
                <div style={{ fontWeight: 700, fontSize: 17, color: "#14181C" }}>{p.title}</div>
              </div>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* ENGAGEMENT MODEL */}
      <Section>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>HOW WE DEPLOY</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>The deployment roadmap.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 1, background: "rgba(20,24,28,0.08)", borderRadius: 12, overflow: "hidden" }}>
          {ENGAGEMENT_STEPS.map((s, i) => (
            <div key={i} style={{ background: "#FFFFFF", padding: "28px 24px" }}>
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#0E7C8A", marginBottom: 10 }}>{s.step}</div>
              <div style={{ fontWeight: 700, fontSize: 16, marginBottom: 8, color: "#14181C" }}>{s.label}</div>
              <p style={{ fontSize: 13.5, lineHeight: 1.6, color: "#5a646e", margin: 0 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* WHERE WE START */}
      <Section alt>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>WHERE WE START</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 20px", letterSpacing: "-0.01em", color: "#14181C" }}>Georgia first. Real operators first.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {[
            { t: "Built with operators, not for them", d: "We work alongside people who run utilities, plants, kitchens, and staffing floors — because the ones who know the work are the ones who should shape the tool." },
            { t: "US-based, starting in Georgia", d: "We're beginning close to home with a handful of design partners, so every industry we support, we support to the depth an insider would expect." },
            { t: "Depth before breadth", d: "One vertical understood cold beats ten understood shallowly. We earn each industry before we claim it." },
          ].map((c, i) => (
            <div key={i} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "26px 24px" }}>
              <div style={{ fontWeight: 700, fontSize: 16.5, marginBottom: 10, color: "#14181C" }}>{c.t}</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: 0 }}>{c.d}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* JOIN CTA */}
      <Section>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 10px", letterSpacing: "-0.01em", color: "#14181C" }}>Building this interests you?</h2>
            <p style={{ fontSize: 15.5, color: "#4a545e", margin: 0 }}>We are a small team fusing ugly databases into living models. It is harder — and more rewarding — than it sounds.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flex: "none" }}>
            <Link href="/careers" className={styles.btnDark} style={{ fontSize: 15, fontWeight: 600, padding: "13px 26px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none" }}>
              Open roles →
            </Link>
            <Link href="/contact" style={{ fontSize: 15, fontWeight: 600, padding: "13px 26px", color: "#14181C", border: "1px solid rgba(20,24,28,0.2)", borderRadius: 8, textDecoration: "none", background: "#FFFFFF" }}>
              Contact us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
