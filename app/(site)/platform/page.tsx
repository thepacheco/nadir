import type { Metadata } from "next";
import Link from "next/link";
import { PageHero, Section } from "@/components/site/PageShell";
import ProductScreenshot from "@/components/site/ProductScreenshot";
import FAQ from "@/components/site/FAQ";
import styles from "@/components/nadir/nadir.module.css";
import { Database, GitMerge, Activity, Terminal, Shield, Lock, Users, BarChart3, ClipboardCheck } from "lucide-react";

export const metadata: Metadata = { title: "Platform — Nadir" };

const MONO = "var(--font-ibm-plex-mono), monospace";
const SERIF = "var(--font-newsreader), serif";

const FEATURES = [
  {
    id: "ontology",
    eyebrow: "LAYER 01",
    title: "Schema-Agnostic Ingestion",
    desc: "We connect directly to the databases your business already runs on — however old, customized, or messy. We require only read-only SQL access. Our engine automatically maps idiosyncratic table structures into clean, standardized digital objects.",
    bullets: ["Read-only access, no migration required", "Supports Oracle, SAP, Postgres, MSSQL, and custom ERPs", "Handles decades-old schemas with inconsistent naming"],
    icon: <Database size={24} />,
    color: "#0E7C8A",
  },
  {
    id: "mapper",
    eyebrow: "LAYER 02",
    title: "Ontology Engine & Schema Mapper",
    desc: "Our AI translates raw columns and rows into real-world objects — Work Orders, Turbines, Employees, Shifts. You confirm the mapping once through a visual drag-and-drop interface, and the system remembers.",
    bullets: ["Visual column-to-object matching with mismatch warnings", "AI-suggested mappings confirmed by your team", "Cross-database identity resolution (e.g. EmpID ↔ BadgeNumber)"],
    icon: <GitMerge size={24} />,
    color: "#15854F",
  },
  {
    id: "graph",
    eyebrow: "LAYER 03",
    title: "The Operational Graph",
    desc: "Once mapped, Nadir builds a live, continuously updating model of your entire enterprise. It links machinery to maintenance schedules, operators to certifications, raw materials to invoices. You're no longer querying disconnected tables.",
    bullets: ["Real-time graph updates as source data changes", "Links people, machines, processes, and compliance records", "Query the reality of your business, not just tables"],
    icon: <Activity size={24} />,
    color: "#0E7C8A",
  },
  {
    id: "compliance",
    eyebrow: "LAYER 04",
    title: "Deterministic Compliance Monitor",
    desc: "Nadir runs a continuous rules engine against your live data. Unlike chatbots that guess, our compliance checks are strictly deterministic — math, not probability. When a constraint is violated, the system generates a human-readable briefing with exact next steps.",
    bullets: ["Hard constraints: OSHA, NERC CIP, internal financial limits", "Zero hallucination — rules are evaluated mathematically", "AI generates context and recommendations, never the logic itself"],
    icon: <Terminal size={24} />,
    color: "#15854F",
  },
  {
    id: "audits",
    eyebrow: "LAYER 05",
    title: "Immutable Audit Trails",
    desc: "Every action in the platform is recorded in an append-only, tamper-evident ledger. Every query, every dismissed alert, every write-back. These logs cannot be altered by any user, including Nadir administrators.",
    bullets: ["Append-only ledger — no edits, no deletions", "Full SOC-2 Type II and HIPAA compliance", "Exportable for external auditors and regulators"],
    icon: <Lock size={24} />,
    color: "#0E7C8A",
  },
];

const ROLES = [
  { icon: <ClipboardCheck size={22} />, title: "Operations Manager", desc: "See every shift, machine, and bottleneck in one live view instead of pulling reports from three different systems." },
  { icon: <Shield size={22} />, title: "Compliance Officer", desc: "Get alerted to violations before they happen, with a full audit trail and recommended remediation steps already written." },
  { icon: <BarChart3 size={22} />, title: "CEO / Executive", desc: "Understand the real-time health of your operation at a glance — headcount, throughput, compliance posture — without waiting for weekly reports." },
];

const FAQS = [
  { q: "How long does deployment take?", a: "Typical deployments take 1–2 weeks. We require read-only SQL access to your databases. There is no data migration, no schema changes, and no disruption to your existing systems. Our forward-deployed engineers handle the setup." },
  { q: "Do we need to replace our current ERP?", a: "No. Nadir is designed to work alongside your existing systems — SAP, Oracle, custom databases, spreadsheets. We never ask you to migrate. We plug into what you already have and build a unified view on top." },
  { q: "How is this different from a BI dashboard?", a: "BI dashboards show you historical charts. Nadir builds a live, semantic model of your operation and continuously monitors it against compliance rules. It tells you what's about to break and what to do about it — not just what happened last quarter." },
  { q: "Is our data used to train AI models?", a: "Never. Your operational data is processed in isolated tenant environments and is never used to train, fine-tune, or improve any foundational AI model. We've signed strict Data Processing Agreements with all sub-processors." },
  { q: "What industries do you support?", a: "Nadir works for any industry with rigid, high-stakes physical workflows — manufacturing, aerospace, power & utility, staffing, food service, defense, and paper & pulp. If your business runs on databases and compliance rules, we can map it." },
];

export default function PlatformPage() {
  return (
    <>
      {/* HERO */}
      <PageHero
        eyebrow="THE PLATFORM"
        title="A fusion engine with a brain on top."
        sub="Nadir connects to the databases your business already runs on — however messy — builds a live model of how everything actually moves, and tells you what breaks next."
      />

      {/* REQUEST A DEMO */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px 60px" }}>
        <div style={{ display: "flex", gap: 14 }}>
          <Link href="/contact" className={styles.btnDark} style={{ fontSize: 15, fontWeight: 600, padding: "14px 28px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none" }}>
            Request a Demo
          </Link>
          <Link href="/workspace" style={{ fontSize: 15, fontWeight: 600, padding: "14px 28px", color: "#14181C", border: "1px solid rgba(20,24,28,0.2)", borderRadius: 8, textDecoration: "none", background: "#FFFFFF" }}>
            See it live →
          </Link>
        </div>
      </div>

      {/* PRODUCT SCREENSHOT */}
      <div style={{ maxWidth: 1040, margin: "0 auto", padding: "0 48px 80px" }}>
        <ProductScreenshot />
      </div>

      {/* FEATURE SECTIONS — ALTERNATING */}
      {FEATURES.map((feat, i) => (
        <div key={feat.id} id={feat.id} style={i % 2 === 1 ? { background: "#F6F5F3", borderTop: "1px solid rgba(20,24,28,0.08)", borderBottom: "1px solid rgba(20,24,28,0.08)" } : undefined}>
          <div style={{ maxWidth: 1040, margin: "0 auto", padding: "80px 48px", display: "grid", gridTemplateColumns: "1fr 1fr", gap: 64, alignItems: "center", direction: i % 2 === 1 ? "rtl" : "ltr" }}>
            <div style={{ direction: "ltr" }}>
              <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: feat.color, marginBottom: 16 }}>{feat.eyebrow}</div>
              <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>{feat.title}</h2>
              <p style={{ fontSize: 15.5, lineHeight: 1.65, color: "#4a545e", margin: "0 0 24px" }}>{feat.desc}</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {feat.bullets.map((b) => (
                  <li key={b} style={{ display: "flex", gap: 10, fontSize: 14, color: "#3d4750", lineHeight: 1.5 }}>
                    <span style={{ width: 6, height: 6, borderRadius: "50%", background: feat.color, flex: "none", marginTop: 7 }} />
                    {b}
                  </li>
                ))}
              </ul>
            </div>
            <div style={{ direction: "ltr", background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "28px 24px", minHeight: 200 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 20 }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: `${feat.color}12`, color: feat.color, display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {feat.icon}
                </div>
                <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em" }}>{feat.eyebrow}</div>
              </div>
              {/* Mini code/schema snippet */}
              <div style={{ fontFamily: MONO, fontSize: 12, color: "#5a646e", lineHeight: 2, background: "#FAFAF8", border: "1px solid rgba(20,24,28,0.06)", borderRadius: 8, padding: "16px 18px" }}>
                {feat.id === "ontology" && <>
                  <div><span style={{ color: "#7a848e" }}>source:</span> <span style={{ color: "#0E7C8A" }}>oracle_erp_prod</span></div>
                  <div><span style={{ color: "#7a848e" }}>table:</span> TBL_WRK_ORD_99</div>
                  <div><span style={{ color: "#7a848e" }}>mode:</span> read_only</div>
                  <div><span style={{ color: "#7a848e" }}>status:</span> <span style={{ color: "#15854F" }}>connected ✓</span></div>
                </>}
                {feat.id === "mapper" && <>
                  <div><span style={{ color: "#7a848e" }}>mapping:</span></div>
                  <div>&nbsp;&nbsp;EMP_ID → <span style={{ color: "#0E7C8A" }}>Employee.id</span></div>
                  <div>&nbsp;&nbsp;WRK_DESC → <span style={{ color: "#0E7C8A" }}>WorkOrder.description</span></div>
                  <div>&nbsp;&nbsp;MACH_SER → <span style={{ color: "#0E7C8A" }}>Machine.serial</span></div>
                  <div><span style={{ color: "#15854F" }}>3 mappings confirmed ✓</span></div>
                </>}
                {feat.id === "graph" && <>
                  <div><span style={{ color: "#7a848e" }}>graph.query:</span></div>
                  <div>&nbsp;&nbsp;Machine[T-114]</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;→ MaintenanceLog[3 records]</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;→ Operator[J. Torres]</div>
                  <div>&nbsp;&nbsp;&nbsp;&nbsp;→ Certification[<span style={{ color: "#C7452F" }}>EXPIRED</span>]</div>
                </>}
                {feat.id === "compliance" && <>
                  <div><span style={{ color: "#7a848e" }}>rule:</span> OSHA_1910.147</div>
                  <div><span style={{ color: "#7a848e" }}>check:</span> lockout_tagout_verified</div>
                  <div><span style={{ color: "#7a848e" }}>result:</span> <span style={{ color: "#C7452F" }}>VIOLATION</span></div>
                  <div><span style={{ color: "#7a848e" }}>action:</span> <span style={{ color: "#0E7C8A" }}>briefing generated →</span></div>
                </>}
                {feat.id === "audits" && <>
                  <div><span style={{ color: "#7a848e" }}>14:32:07</span> query.execute user=marta.voss</div>
                  <div><span style={{ color: "#7a848e" }}>14:32:09</span> alert.dismiss id=AL-4421</div>
                  <div><span style={{ color: "#7a848e" }}>14:33:01</span> writeback.approve ref=WO-882</div>
                  <div><span style={{ color: "#15854F" }}>append_only · immutable ✓</span></div>
                </>}
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* WHO IT HELPS */}
      <Section>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>WHO IT HELPS</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>Built for the people running the floor.</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 24 }}>
          {ROLES.map((r) => (
            <div key={r.title} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "28px 24px" }}>
              <div style={{ width: 44, height: 44, borderRadius: 10, background: "rgba(14,124,138,0.08)", color: "#0E7C8A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16 }}>
                {r.icon}
              </div>
              <div style={{ fontWeight: 700, fontSize: 17, marginBottom: 10, color: "#14181C" }}>{r.title}</div>
              <p style={{ fontSize: 14.5, lineHeight: 1.65, color: "#5a646e", margin: 0 }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ */}
      <Section alt>
        <div style={{ fontFamily: MONO, fontSize: 11.5, letterSpacing: "0.14em", color: "#7a848e", marginBottom: 16 }}>FAQ</div>
        <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 34, margin: "0 0 40px", letterSpacing: "-0.01em", color: "#14181C" }}>Common questions.</h2>
        <FAQ items={FAQS} />
      </Section>

      {/* BOTTOM CTA */}
      <Section>
        <div style={{ textAlign: "center", padding: "40px 0" }}>
          <h2 style={{ fontFamily: SERIF, fontWeight: 400, fontSize: 38, margin: "0 0 16px", letterSpacing: "-0.01em", color: "#14181C" }}>"We found this in your data in two weeks."</h2>
          <p style={{ fontSize: 16, color: "#4a545e", margin: "0 auto 32px", maxWidth: 500 }}>
            That sentence is the pitch. See it run on a real operation right now.
          </p>
          <Link href="/workspace" className={styles.btnDark} style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#14181C", color: "#FFFFFF", borderRadius: 8, textDecoration: "none", display: "inline-block" }}>
            Open the live workspace →
          </Link>
        </div>
      </Section>
    </>
  );
}
