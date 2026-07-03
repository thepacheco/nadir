"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Shield, Zap, Terminal, Factory } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

const MONO = "var(--font-ibm-plex-mono), monospace";

const fadeIn: any = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } }
};

const stagger: any = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
};

export default function Home() {
  return (
    <div style={{ background: "#14181C", color: "#FAF9F7", minHeight: "100vh", overflow: "hidden" }}>
      
      {/* HERO SECTION */}
      <section style={{ position: "relative", paddingTop: 140, paddingBottom: 120 }}>
        {/* Abstract Glowing Background */}
        <div style={{ position: "absolute", top: -200, left: "50%", transform: "translateX(-50%)", width: 800, height: 800, background: "radial-gradient(circle, rgba(14,124,138,0.15) 0%, transparent 60%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: 0, right: 0, bottom: 0, backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)", backgroundSize: "40px 40px", pointerEvents: "none", maskImage: "linear-gradient(to bottom, black, transparent)" }} />

        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 48px", textAlign: "center", position: "relative", zIndex: 10 }}>
          <motion.div initial="hidden" animate="visible" variants={stagger}>
            <motion.div variants={fadeIn} style={{ display: "inline-flex", alignItems: "center", gap: 8, fontFamily: MONO, fontSize: 12, letterSpacing: "0.12em", color: "#0E7C8A", border: "1px solid rgba(14,124,138,0.4)", background: "rgba(14,124,138,0.1)", padding: "8px 18px", borderRadius: 100, marginBottom: 40 }}>
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0E7C8A", animation: "nadirBlink 2s infinite" }} />
              OPERATIONAL INTELLIGENCE & COMPLIANCE FUSION
            </motion.div>
            
            <motion.h1 variants={fadeIn} style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 84, lineHeight: 1.05, margin: "0 auto 30px", maxWidth: 960, letterSpacing: "-0.02em" }}>
              We map the floor.<br />
              <em style={{ color: "#0E7C8A", fontStyle: "italic" }}>AI tells you what it means.</em>
            </motion.h1>
            
            <motion.p variants={fadeIn} style={{ fontSize: 20, lineHeight: 1.6, color: "#9aa2ab", maxWidth: 680, margin: "0 auto 48px" }}>
              Nadir connects to the databases your business already runs on, builds a live ontological model of how everything actually moves, and tells you what breaks next.
            </motion.p>
            
            <motion.div variants={fadeIn} style={{ display: "flex", gap: 16, justifyContent: "center" }}>
              <Link href="/workspace" style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", background: "#FAF9F7", color: "#14181C", border: "none", borderRadius: 8, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "transform 0.2s" }} onMouseOver={(e) => e.currentTarget.style.transform = "translateY(-2px)"} onMouseOut={(e) => e.currentTarget.style.transform = "translateY(0)"}>
                Launch Live Demo <ArrowRight size={18} />
              </Link>
              <Link href="/contact" style={{ fontSize: 16, fontWeight: 600, padding: "16px 36px", color: "#FAF9F7", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, textDecoration: "none", background: "rgba(255,255,255,0.05)", transition: "background 0.2s" }} onMouseOver={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.1)"} onMouseOut={(e) => e.currentTarget.style.background = "rgba(255,255,255,0.05)"}>
                Talk to Engineering
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* DASHBOARD MOCKUP (ABSTRACT CSS GRAPHIC) */}
      <section style={{ maxWidth: 1100, margin: "0 auto -100px", position: "relative", zIndex: 20, padding: "0 48px" }}>
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }} transition={{ duration: 0.8, ease: "easeOut" }} style={{ background: "#FFFFFF", borderRadius: 16, border: "1px solid rgba(20,24,28,0.1)", overflow: "hidden", boxShadow: "0 40px 100px -20px rgba(0,0,0,0.6)" }}>
          {/* Header */}
          <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "16px 20px", borderBottom: "1px solid rgba(20,24,28,0.08)", background: "#FCFBF9" }}>
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#E5E7EB" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#E5E7EB" }} />
            <div style={{ width: 12, height: 12, borderRadius: "50%", background: "#E5E7EB" }} />
            <div style={{ marginLeft: 16, fontFamily: MONO, fontSize: 12, color: "#7a848e" }}>live-operational-graph / ga-grid-01</div>
          </div>
          {/* Body */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 340px", height: 420 }}>
            <div style={{ background: "#F3F1EC", position: "relative", overflow: "hidden" }}>
               {/* Node Network Abstract */}
               <svg width="100%" height="100%" style={{ position: "absolute" }}>
                 <line x1="100" y1="100" x2="300" y2="200" stroke="#0E7C8A" strokeWidth="2" strokeDasharray="4 4" />
                 <line x1="300" y1="200" x2="500" y2="150" stroke="#0E7C8A" strokeWidth="2" strokeDasharray="4 4" />
                 <circle cx="100" cy="100" r="8" fill="#15854F" />
                 <circle cx="300" cy="200" r="12" fill="#C7452F" />
                 <circle cx="500" cy="150" r="8" fill="#15854F" />
                 <circle cx="300" cy="200" r="24" fill="none" stroke="#C7452F" strokeWidth="1" opacity="0.5">
                   <animate attributeName="r" values="12; 40" dur="2s" repeatCount="indefinite" />
                   <animate attributeName="opacity" values="0.8; 0" dur="2s" repeatCount="indefinite" />
                 </circle>
               </svg>
            </div>
            <div style={{ background: "#FFFFFF", borderLeft: "1px solid rgba(20,24,28,0.1)", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
               <div style={{ fontFamily: MONO, fontSize: 11, letterSpacing: "0.1em", color: "#C7452F" }}>CRITICAL ALERT DEPLOYED</div>
               <div style={{ fontSize: 16, fontWeight: 700, color: "#14181C" }}>Transformer T-114 Thermal Runaway</div>
               <div style={{ fontSize: 14, color: "#5a646e", lineHeight: 1.5 }}>Running +8°C over seasonal norm. High probability of cascading failure in Grid Sector 4.</div>
               <div style={{ marginTop: "auto", display: "flex", gap: 10 }}>
                 <div style={{ flex: 1, padding: 12, background: "rgba(14,124,138,0.1)", color: "#0E7C8A", borderRadius: 8, fontSize: 13, fontWeight: 600, textAlign: "center" }}>Ask AI</div>
                 <div style={{ flex: 1, padding: 12, border: "1px solid #E5E7EB", color: "#5a646e", borderRadius: 8, fontSize: 13, fontWeight: 600, textAlign: "center" }}>Evidence</div>
               </div>
            </div>
          </div>
        </motion.div>
      </section>

      {/* THE PROBLEM SECTION */}
      <section style={{ background: "#FAF9F7", color: "#14181C", paddingTop: 200, paddingBottom: 100 }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 48px" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={stagger}>
            <motion.div variants={fadeIn} style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 20 }}>THE LEGACY PROBLEM</motion.div>
            <motion.h2 variants={fadeIn} style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 48, lineHeight: 1.15, margin: "0 0 70px", maxWidth: 800, letterSpacing: "-0.01em" }}>
              Your business runs on ten systems. None of them talk. Nobody sees the whole floor.
            </motion.h2>
            
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 40 }}>
              {[
                { icon: <Factory size={28} />, title: "Fragmented by default", desc: "Legacy ERPs, siloed databases, spreadsheets. Every answer requires three exports and a meeting." },
                { icon: <Shield size={28} />, title: "Compliance flags too late", desc: "Existing tools catch violations after the fact. The exposure was visible in your data weeks earlier." },
                { icon: <Terminal size={28} />, title: "Knowledge walks out", desc: "When it looks like this again, nobody remembers how you solved it. The data is dead." }
              ].map((f, i) => (
                <motion.div key={i} variants={fadeIn} style={{ padding: 32, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 16 }}>
                  <div style={{ color: "#0E7C8A", marginBottom: 24 }}>{f.icon}</div>
                  <div style={{ fontWeight: 700, fontSize: 20, marginBottom: 12 }}>{f.title}</div>
                  <p style={{ fontSize: 15.5, lineHeight: 1.6, color: "#5a646e", margin: 0 }}>{f.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* PLATFORM ARCHITECTURE */}
      <section style={{ background: "#14181C", color: "#FAF9F7", padding: "120px 0" }}>
        <div style={{ maxWidth: 1240, margin: "0 auto", padding: "0 48px" }}>
          <motion.div initial="hidden" whileInView="visible" viewport={{ once: true }} variants={stagger}>
            <motion.div variants={fadeIn} style={{ fontFamily: MONO, fontSize: 12.5, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 20 }}>THE MOAT</motion.div>
            <motion.h2 variants={fadeIn} style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 48, lineHeight: 1.15, margin: "0 0 70px", maxWidth: 800, letterSpacing: "-0.01em" }}>
              Not a wrapper on a chatbot. A fusion engine with a brain on top.
            </motion.h2>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: 60, alignItems: "center" }}>
              {/* Graphic Left */}
              <motion.div variants={fadeIn} style={{ position: "relative", height: 400, background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 16, padding: 32, display: "flex", flexDirection: "column", gap: 16 }}>
                 <div style={{ padding: 16, background: "rgba(14,124,138,0.2)", border: "1px solid rgba(14,124,138,0.5)", borderRadius: 8, color: "#0E7C8A", fontFamily: MONO, textAlign: "center" }}>INTELLIGENCE LAYER (LLM)</div>
                 <div style={{ display: "flex", justifyContent: "center" }}>↓</div>
                 <div style={{ padding: 16, background: "rgba(255,255,255,0.1)", border: "1px solid rgba(255,255,255,0.2)", borderRadius: 8, color: "#FFF", fontFamily: MONO, textAlign: "center" }}>ONTOLOGY GRAPH ENGINE</div>
                 <div style={{ display: "flex", justifyContent: "center" }}>↓</div>
                 <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                   <div style={{ padding: 12, background: "rgba(255,255,255,0.05)", borderRadius: 6, fontSize: 12, textAlign: "center" }}>SAP ERP</div>
                   <div style={{ padding: 12, background: "rgba(255,255,255,0.05)", borderRadius: 6, fontSize: 12, textAlign: "center" }}>SCADA</div>
                   <div style={{ padding: 12, background: "rgba(255,255,255,0.05)", borderRadius: 6, fontSize: 12, textAlign: "center" }}>Snowflake</div>
                 </div>
              </motion.div>
              {/* Text Right */}
              <motion.div variants={fadeIn} style={{ display: "flex", flexDirection: "column", gap: 32 }}>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(14,124,138,0.2)", color: "#0E7C8A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO }}>01</div>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>Data Fusion</div>
                  </div>
                  <p style={{ fontSize: 16, color: "#9aa2ab", lineHeight: 1.6 }}>We plug directly into your messy, siloed source systems and unify them into a single, cohesive timeline.</p>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(14,124,138,0.2)", color: "#0E7C8A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO }}>02</div>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>Ontology Mapping</div>
                  </div>
                  <p style={{ fontSize: 16, color: "#9aa2ab", lineHeight: 1.6 }}>We map your physical reality (turbines, shifts, trucks) to digital objects so the machine understands the context of your business.</p>
                </div>
                <div>
                  <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                    <div style={{ width: 32, height: 32, borderRadius: 8, background: "rgba(14,124,138,0.2)", color: "#0E7C8A", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: MONO }}>03</div>
                    <div style={{ fontSize: 22, fontWeight: 700 }}>Deterministic AI</div>
                  </div>
                  <p style={{ fontSize: 16, color: "#9aa2ab", lineHeight: 1.6 }}>Instead of hallucinating, Nadir writes strict deterministic checks that run cheaply. The LLM only acts as the translation layer.</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: "#0E7C8A", color: "#FAF9F7", padding: "100px 0", textAlign: "center" }}>
        <div style={{ maxWidth: 800, margin: "0 auto", padding: "0 48px" }}>
          <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} style={{ fontFamily: "var(--font-newsreader), serif", fontWeight: 400, fontSize: 54, lineHeight: 1.1, margin: "0 auto 24px", letterSpacing: "-0.01em" }}>
            "We found this in your data in two weeks."
          </motion.h2>
          <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: 0.2 }} style={{ fontSize: 18, color: "rgba(255,255,255,0.8)", marginBottom: 40 }}>
            That sentence is our pitch. Run a simulation against our demo companies right now.
          </motion.p>
          <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: 0.3 }}>
            <Link href="/workspace" style={{ fontSize: 16, fontWeight: 600, padding: "18px 40px", background: "#14181C", color: "#FAF9F7", border: "none", borderRadius: 8, cursor: "pointer", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 8, transition: "transform 0.2s" }} onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.02)"} onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}>
              Open Live Workspace <ArrowRight size={18} />
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
