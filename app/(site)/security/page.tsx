"use client";

import { motion } from "framer-motion";
import { Shield, Lock, Server, FileCheck } from "lucide-react";

const MONO = "var(--font-ibm-plex-mono), monospace";

export default function SecurityPage() {
  return (
    <div style={{ background: "#FAF9F7", minHeight: "100vh", padding: "160px 48px 100px" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        
        {/* HEADER */}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div style={{ fontFamily: MONO, fontSize: 13, letterSpacing: "0.14em", color: "#8a5a10", marginBottom: 24 }}>SECURITY & TRUST</div>
          <h1 style={{ fontFamily: "var(--font-newsreader), serif", fontSize: 56, fontWeight: 400, margin: "0 0 24px", color: "#14181C", letterSpacing: "-0.01em", lineHeight: 1.1 }}>
            Enterprise-grade data protection.
          </h1>
          <p style={{ fontSize: 20, color: "#5a646e", lineHeight: 1.6, marginBottom: 60 }}>
            Nadir connects directly to your most sensitive operational and financial systems. We architected our security model from day one assuming a zero-trust environment.
          </p>
        </motion.div>

        {/* SECURITY GRID */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.5 }} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 60 }}>
          
          <div style={{ background: "#FFFFFF", padding: 32, borderRadius: 16, border: "1px solid rgba(20,24,28,0.1)" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(180,118,20,0.1)", color: "#8a5a10", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <Server size={24} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 12px" }}>Strict Tenant Isolation</h3>
            <p style={{ fontSize: 15, color: "#5a646e", lineHeight: 1.6, margin: 0 }}>
              Your data never touches another customer's data. Nadir provisions isolated cloud environments for every enterprise deployment, complete with dedicated VPCs and encryption keys.
            </p>
          </div>

          <div style={{ background: "#FFFFFF", padding: 32, borderRadius: 16, border: "1px solid rgba(20,24,28,0.1)" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(14,124,138,0.1)", color: "#0E7C8A", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <Lock size={24} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 12px" }}>No Model Training</h3>
            <p style={{ fontSize: 15, color: "#5a646e", lineHeight: 1.6, margin: 0 }}>
              Nadir's LLM components are strictly stateless translation layers. Your operational data, incident memories, and compliance checks are never used to train foundational models.
            </p>
          </div>

          <div style={{ background: "#FFFFFF", padding: 32, borderRadius: 16, border: "1px solid rgba(20,24,28,0.1)" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(21,133,79,0.1)", color: "#15854F", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <Shield size={24} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 12px" }}>Role-Based Access</h3>
            <p style={{ fontSize: 15, color: "#5a646e", lineHeight: 1.6, margin: 0 }}>
              Permissions map 1:1 with your existing SSO provider (Okta, Entra). Line workers only see their shifts; area managers see their floor. Write-back actions require explicit authorization.
            </p>
          </div>

          <div style={{ background: "#FFFFFF", padding: 32, borderRadius: 16, border: "1px solid rgba(20,24,28,0.1)" }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: "rgba(20,24,28,0.06)", color: "#14181C", display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 24 }}>
              <FileCheck size={24} />
            </div>
            <h3 style={{ fontSize: 20, fontWeight: 700, margin: "0 0 12px" }}>Immutable Audit Logs</h3>
            <p style={{ fontSize: 15, color: "#5a646e", lineHeight: 1.6, margin: 0 }}>
              Every query, alert dismissal, and write-back action is logged immutably. Nadir is designed to be fully compliant with SOC-2, HIPAA, and DoD IL4 requirements.
            </p>
          </div>

        </motion.div>

      </div>
    </div>
  );
}
