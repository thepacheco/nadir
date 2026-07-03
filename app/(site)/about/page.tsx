import type { Metadata } from "next";
import Link from "next/link";
import { MONO, SERIF, PageHero, Section } from "@/components/site/PageShell";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "About — Nadir" };

export default function AboutPage() {
  return (
    <>
      <PageHero
        eyebrow="THE COMPANY"
        title="We build the central nervous system for physical industry."
        sub="Nadir exists because mid-market companies in regulated, operationally complex industries run on fragmented systems — and no one has a single live picture of what's actually happening."
      />

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 44, maxWidth: 1100 }}>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>Why now</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>
              Regulatory complexity is increasing, not shrinking. LLMs are finally good enough to do the reconciliation work that used to require armies of consultants. And no dominant player owns operational data fusion + compliance for the mid-market — Palantir plays enterprise and government scale; Harvey plays legal documents. This lane is open.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>How we build</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>
              Design partner first, deck second. We start with one company, one database, one narrow process — and show them a real piece of hidden risk or inefficiency in their own data within two weeks. That demo is the pitch. The product compounds from there, one source at a time.
            </p>
          </div>
          <div>
            <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>What we believe</div>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: "#4a545e", margin: 0 }}>
              The ontology is the product — a live model that turns raw database rows into real-world objects and relationships, so the system understands the business, not just its tables. And data isn&apos;t automatically right: a system that never questions its inputs is a dashboard, not a brain.
            </p>
          </div>
        </div>
      </Section>

      <Section alt>
        <div style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18 }}>THE NAME</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, lineHeight: 1.2, margin: "0 0 18px", maxWidth: 720, letterSpacing: "-0.01em" }}>
          The nadir is the point directly beneath you.
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, color: "#4a545e", maxWidth: 680, margin: 0 }}>
          In observation, it&apos;s where the satellite looks: straight down, at the ground truth. That&apos;s the product — not a view from the org chart, but from directly above the floor, where the work actually happens and the risk actually hides.
        </p>
      </Section>

      <Section>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 10px", letterSpacing: "-0.01em" }}>Building this interests you?</h2>
            <p style={{ fontSize: 15.5, color: "#4a545e", margin: 0 }}>We&apos;re a small team fusing ugly databases into living models. It&apos;s harder — and more fun — than it sounds.</p>
          </div>
          <div style={{ display: "flex", gap: 12, flex: "none" }}>
            <Link href="/careers" className={styles.btnDark} style={{ fontSize: 15, fontWeight: 600, padding: "13px 26px", background: "#14181C", color: "#FAF9F7", borderRadius: 8, textDecoration: "none" }}>
              Open roles →
            </Link>
            <Link href="/contact" style={{ fontSize: 15, fontWeight: 600, padding: "13px 26px", color: "#14181C", border: "1.5px solid rgba(20,24,28,0.25)", borderRadius: 8, textDecoration: "none", background: "rgba(255,255,255,0.5)" }}>
              Contact us
            </Link>
          </div>
        </div>
      </Section>
    </>
  );
}
