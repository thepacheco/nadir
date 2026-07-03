"use client";

import { motion } from "framer-motion";

const MONO = "var(--font-ibm-plex-mono), monospace";

export default function TermsPage() {
  return (
    <div style={{ background: "#FAF9F7", minHeight: "100vh", padding: "160px 48px 100px" }}>
      <div style={{ maxWidth: 800, margin: "0 auto" }}>
        
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.14em", color: "#5a646e", marginBottom: 24 }}>LEGAL</div>
          <h1 style={{ fontFamily: "var(--font-newsreader), serif", fontSize: 56, fontWeight: 400, margin: "0 0 24px", color: "#14181C", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Terms of Service
          </h1>
          <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", marginBottom: 60 }}>LAST UPDATED: JULY 3, 2026</div>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ background: "#FFFFFF", padding: 48, borderRadius: 16, border: "1px solid rgba(20,24,28,0.1)", fontSize: 15, lineHeight: 1.7, color: "#4a545e", display: "flex", flexDirection: "column", gap: 24 }}>
          
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#14181C", margin: "0 0 -8px" }}>1. Provision of Services</h2>
          <p>
            Nadir Intelligence, Inc. ("Company") grants the Customer a non-exclusive, non-transferable right to access and use the Nadir Platform during the Subscription Term, solely for the Customer's internal business operations.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#14181C", margin: "20px 0 -8px" }}>2. Acceptable Use</h2>
          <p>
            Customer shall not use the Platform to process any data that violates applicable laws or regulations. The Customer is strictly prohibited from attempting to reverse engineer, decompile, or extract the underlying models, ontology schemas, or source code of the Platform.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#14181C", margin: "20px 0 -8px" }}>3. Data Ownership</h2>
          <p>
            Customer retains all rights, title, and interest in and to all Customer Data. The Company acquires no rights in Customer Data other than the rights necessary to provide the Services. The Ontology generated during the usage of the Platform specifically regarding the Customer's operational mapping remains the property of the Customer upon termination.
          </p>

          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#14181C", margin: "20px 0 -8px" }}>4. Liability Limitations</h2>
          <p>
            While Nadir implements deterministic checks, the Platform serves as an operational intelligence tool and does not guarantee the prevention of physical incidents or regulatory violations. Nadir is not liable for indirect, incidental, special, or consequential damages.
          </p>

        </motion.div>

      </div>
    </div>
  );
}
