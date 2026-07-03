"use client";

import { motion } from "framer-motion";
import { LayoutGrid, Terminal, CheckCircle2 } from "lucide-react";

const MONO = "var(--font-ibm-plex-mono), monospace";

export default function PlatformPage() {
  return (
    <div style={{ background: "#FAF9F7", minHeight: "100vh", padding: "160px 48px 100px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 24 }}>THE NADIR PLATFORM</div>
          <h1 style={{ fontFamily: "var(--font-newsreader), serif", fontSize: 56, fontWeight: 400, margin: "0 0 24px", color: "#14181C", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Engineered for physical operations.
          </h1>
          <p style={{ fontSize: 20, color: "#5a646e", lineHeight: 1.6, marginBottom: 60 }}>
            Nadir is not a chat interface wrapped around a vector database. It is a deterministic compliance and alerting engine built on top of a live ontological graph of your business.
          </p>
        </motion.div>

        {/* FEATURE 1 */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 16, overflow: "hidden", marginBottom: 40 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
            <div style={{ padding: 48, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(14,124,138,0.1)", color: "#0E7C8A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                <LayoutGrid size={24} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 16px" }}>The Ontology Engine</h2>
              <p style={{ fontSize: 16, color: "#5a646e", lineHeight: 1.6, margin: 0 }}>
                Legacy systems store rows and columns. Nadir translates those into objects: Factories, Shifts, Turbines, Operators. We map the physical reality of your business into a live digital graph, allowing the system to understand the context of every alert.
              </p>
            </div>
            <div style={{ background: "#14181C", position: "relative", overflow: "hidden" }}>
               {/* Abstract Grid Graphic */}
               <svg width="100%" height="100%" style={{ position: "absolute", opacity: 0.5 }}>
                 <defs>
                   <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                     <path d="M 40 0 L 0 0 0 40" fill="none" stroke="rgba(255,255,255,0.1)" strokeWidth="1"/>
                   </pattern>
                 </defs>
                 <rect width="100%" height="100%" fill="url(#grid)" />
                 <circle cx="120" cy="120" r="40" fill="rgba(14,124,138,0.2)" stroke="#0E7C8A" strokeWidth="2" />
                 <circle cx="280" cy="200" r="60" fill="rgba(21,133,79,0.2)" stroke="#15854F" strokeWidth="2" />
                 <line x1="150" y1="140" x2="230" y2="180" stroke="rgba(255,255,255,0.4)" strokeWidth="2" strokeDasharray="4 4" />
               </svg>
            </div>
          </div>
        </motion.div>

        {/* FEATURE 2 */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 16, overflow: "hidden", marginBottom: 40 }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
             <div style={{ background: "#14181C", padding: 40, fontFamily: MONO, fontSize: 13, color: "#9aa2ab", display: "flex", flexDirection: "column", justifyContent: "center" }}>
               <div style={{ color: "#E5E7EB", marginBottom: 8 }}>// Deterministic Check Execution</div>
               <div><span style={{ color: "#C7452F" }}>if</span> (turbine.temp &gt; seasonal_baseline + 5) {"{"}</div>
               <div style={{ paddingLeft: 16 }}>alert.trigger(level="CRITICAL");</div>
               <div style={{ paddingLeft: 16 }}>model.generate_plain_english_summary();</div>
               <div>{"}"}</div>
            </div>
            <div style={{ padding: 48, display: "flex", flexDirection: "column", justifyContent: "center" }}>
              <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(21,133,79,0.1)", color: "#15854F", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
                <Terminal size={24} />
              </div>
              <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 16px" }}>Algorithmic Rule Execution</h2>
              <p style={{ fontSize: 16, color: "#5a646e", lineHeight: 1.6, margin: 0 }}>
                LLMs hallucinate; factory safety systems cannot. Nadir writes strict, algorithmic code to constantly monitor your data streams. The LLM is only invoked to translate the resulting alert into plain English and suggest the next best action.
              </p>
            </div>
          </div>
        </motion.div>

        {/* BENEFITS LIST */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h3 style={{ fontSize: 20, fontWeight: 700, margin: "60px 0 24px" }}>Platform Capabilities</h3>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {[
              "Real-time bidirectional ERP write-back",
              "Role-based access controls (RBAC)",
              "Multi-tenant data isolation",
              "Sub-second alert latency",
              "Automated compliance sign-offs",
              "SOC-2 Type II Certified Architecture"
            ].map(benefit => (
              <div key={benefit} style={{ display: "flex", alignItems: "center", gap: 12, padding: "16px 20px", background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12 }}>
                <CheckCircle2 size={18} style={{ color: "#15854F", flex: "none" }} />
                <span style={{ fontSize: 15, fontWeight: 500, color: "#14181C" }}>{benefit}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
