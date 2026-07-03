"use client";

import { motion } from "framer-motion";

const MONO = "var(--font-ibm-plex-mono), monospace";

export default function PrivacyPage() {
  return (
    <div style={{ background: "#FAF9F7", minHeight: "100vh", padding: "160px 48px 100px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.14em", color: "#5a646e", marginBottom: 24 }}>LEGAL</div>
          <h1 style={{ fontFamily: "var(--font-newsreader), serif", fontSize: 56, fontWeight: 400, margin: "0 0 24px", color: "#14181C", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Privacy Policy
          </h1>
          <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", marginBottom: 60 }}>LAST UPDATED: JULY 3, 2026</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ background: "#FFFFFF", padding: 48, borderRadius: 16, border: "1px solid rgba(20,24,28,0.1)", fontSize: 15, lineHeight: 1.7, color: "#4a545e", display: "flex", flexDirection: "column", gap: 24 }}>
          
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#14181C", margin: "0 0 -8px" }}>1. Data Collection</h2>
          <p>
            Nadir Intelligence, Inc. ("Nadir") operates entirely within isolated tenant boundaries. We do not aggregate operational data across customers. Information collected via our marketing site is limited to contact information submitted voluntarily.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#14181C", margin: "20px 0 -8px" }}>2. Usage of AI Models</h2>
          <p>
            We utilize large language models (LLMs) strictly as stateless translation engines. Any data sent to these models is purged immediately after inference. Nadir explicitly prohibits its sub-processors from utilizing customer data to train, fine-tune, or otherwise improve foundational models.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#14181C", margin: "20px 0 -8px" }}>3. Data Retention</h2>
          <p>
            Within your deployed workspace, Nadir maintains a localized Knowledge Base and Audit Trail. This data belongs to you. Upon contract termination, Nadir permanently destroys the isolated tenant environment and all associated cryptographic keys within 30 days.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#14181C", margin: "20px 0 -8px" }}>4. Subprocessors</h2>
          <p>
            We use a strictly vetted list of sub-processors to host our infrastructure (e.g., AWS, GCP). A full, up-to-date list of sub-processors can be requested via our support portal.
          </p>

        </motion.div>

      </div>
    </div>
  );
}
