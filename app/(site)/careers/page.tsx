"use client";

import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const MONO = "var(--font-ibm-plex-mono), monospace";

const JOBS = [
  { role: "Founding Forward Deployed Engineer", loc: "New York / Remote", type: "Full-time" },
  { role: "Senior Rust Systems Engineer", loc: "Remote", type: "Full-time" },
  { role: "Ontology Architect", loc: "New York", type: "Full-time" },
  { role: "Product Designer (Data Viz)", loc: "Remote", type: "Full-time" }
];

export default function CareersPage() {
  return (
    <div style={{ background: "#FAF9F7", minHeight: "100vh", padding: "160px 48px 100px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.14em", color: "#0E7C8A", marginBottom: 24 }}>CAREERS</div>
          <h1 style={{ fontFamily: "var(--font-newsreader), serif", fontSize: 56, fontWeight: 400, margin: "0 0 24px", color: "#14181C", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Build the central nervous system of physical industry.
          </h1>
          <p style={{ fontSize: 20, color: "#5a646e", lineHeight: 1.6, marginBottom: 60 }}>
            We're a team of engineers building deterministic intelligence layers for environments where hallucinations are catastrophic. If you want to solve complex, real-world data problems, join us.
          </p>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, margin: "0 0 24px" }}>Open Roles</h2>
          
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {JOBS.map((job) => (
              <div key={job.role} style={{ background: "#FFFFFF", padding: 24, borderRadius: 12, border: "1px solid rgba(20,24,28,0.1)", display: "flex", alignItems: "center", justifyContent: "space-between", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s" }} onMouseOver={(e) => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 12px 30px rgba(0,0,0,0.06)"; }} onMouseOut={(e) => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: "#14181C", marginBottom: 8 }}>{job.role}</div>
                  <div style={{ display: "flex", gap: 12, fontFamily: MONO, fontSize: 12, color: "#7a848e" }}>
                    <span>{job.loc}</span>
                    <span>·</span>
                    <span>{job.type}</span>
                  </div>
                </div>
                <div style={{ color: "#0E7C8A" }}>
                  <ArrowRight size={20} />
                </div>
              </div>
            ))}
          </div>
        </motion.div>

      </div>
    </div>
  );
}
