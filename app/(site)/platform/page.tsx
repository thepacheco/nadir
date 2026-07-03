import type { Metadata } from "next";
import Link from "next/link";
import { HOW_STEPS, PLATFORM_LAYERS } from "@/lib/marketing";
import { MONO, SERIF, PageHero, Section } from "@/components/site/PageShell";
import styles from "@/components/nadir/nadir.module.css";

export const metadata: Metadata = { title: "Platform — Nadir" };

const COST_POINTS = [
  { title: "Schema-first, not table-dump", desc: "Nadir maps your database from table names, keys, and a handful of the most recent rows per table — never by streaming whole tables through a model. The join map is built once, cached, and reused." },
  { title: "Algorithms before models", desc: "If an invoice ID doesn't match an invoice ID, that's arithmetic, not intelligence. Deterministic checks run continuously for free; the model is reserved for reconciliation only a model can do." },
  { title: "Learned formats, paid for once", desc: "The first time Nadir drafts a write-up, PO, or report format your company accepts, it's stored as a template. It is never generated — or paid for — twice." },
  { title: "Data is questioned, not assumed", desc: "When sources disagree — an invoice priced over its contract, timestamps that can't be real — Nadir holds the record as suspect and asks. Your confirmations build a data-quality profile of your company over time." },
];

export default function PlatformPage() {
  return (
    <>
      <PageHero
        eyebrow="THE PLATFORM"
        title="A fusion engine with a brain on top."
        sub="Three layers: direct ingestion from the systems you already run, AI reconciliation into one live operational graph, and an intelligence layer that watches it continuously."
      />

      <Section>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
          {PLATFORM_LAYERS.map((l) => (
            <div key={l.n} className={styles.layerCard} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "30px 28px" }}>
              <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.12em", color: "#0E7C8A", marginBottom: 16 }}>{l.n}</div>
              <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{l.title}</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: 0 }}>{l.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section alt id="how">
        <div style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18 }}>HOW IT WORKS</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 40, lineHeight: 1.15, margin: "0 0 40px", maxWidth: 760, letterSpacing: "-0.01em" }}>
          From raw tables to a living model — in five layers.
        </h2>
        <div style={{ display: "flex", flexDirection: "column" }}>
          {HOW_STEPS.map((s) => (
            <div key={s.n} style={{ display: "grid", gridTemplateColumns: "90px 300px 1fr", gap: 32, padding: "30px 0", borderTop: "1px solid rgba(20,24,28,0.12)", alignItems: "baseline" }}>
              <div style={{ fontFamily: MONO, fontSize: 14, color: "#0E7C8A" }}>{s.n}</div>
              <div style={{ fontWeight: 700, fontSize: 19 }}>{s.title}</div>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#4a545e", margin: 0, maxWidth: 560 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 18 }}>BUILT TO BE AFFORDABLE TO RUN</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 40, lineHeight: 1.15, margin: "0 0 16px", maxWidth: 760, letterSpacing: "-0.01em" }}>
          Intelligence is bought by the token. We spend yours like it&apos;s ours.
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.65, color: "#4a545e", maxWidth: 680, margin: "0 0 44px" }}>
          Most &quot;AI on your data&quot; products quietly re-read everything, every time. Nadir&apos;s ingestion discipline is what makes a $20 entry point — and mid-market margins — actually work.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
          {COST_POINTS.map((p) => (
            <div key={p.title} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "26px 28px" }}>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10 }}>{p.title}</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: 0 }}>{p.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section alt>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 30, flexWrap: "wrap" }}>
          <div>
            <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 10px", letterSpacing: "-0.01em" }}>See all of it on live data.</h2>
            <p style={{ fontSize: 15.5, color: "#4a545e", margin: 0 }}>Five industries, switchable in one click — utility, manufacturing, staffing, restaurants, space systems.</p>
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
