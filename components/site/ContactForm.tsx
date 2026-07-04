"use client";

import { useState } from "react";
import { Send, CheckCircle } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 1500);
  };

  if (status === "success") {
    return (
      <div style={{ padding: "40px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <CheckCircle size={48} color="#15854F" />
        <div>
          <h3 style={{ fontSize: 22, fontWeight: 600, color: "#14181C", margin: "0 0 8px" }}>Inquiry Received</h3>
          <p style={{ fontSize: 15, color: "#5a646e", margin: 0, lineHeight: 1.6 }}>
            Thank you for reaching out to Nadir Intelligence.<br/>A deployment engineer will contact you shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 20 }}>
      <div>
        <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>INQUIRY TYPE *</label>
        <select disabled={status === "submitting"} required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }}>
          <option>Enterprise Evaluation (Pilot Request)</option>
          <option>Active Customer Support Ticket</option>
          <option>Security &amp; Compliance Audit Inquiry</option>
          <option>Strategic Partnership Proposals</option>
          <option>Press / Media Inquiry</option>
        </select>
      </div>
      <div>
        <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>WORK EMAIL *</label>
        <input disabled={status === "submitting"} type="email" required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="you@company.com" />
      </div>
      <div>
        <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>COMPANY NAME / INDUSTRY *</label>
        <input disabled={status === "submitting"} type="text" required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="e.g. Acme Aerospace" />
      </div>
      <div>
        <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>MESSAGE *</label>
        <textarea disabled={status === "submitting"} rows={5} required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", resize: "vertical", background: "#FFFFFF" }} placeholder="Please describe your legacy database setups and target operational outcomes." />
      </div>
      <button disabled={status === "submitting"} type="submit" className={styles.btnDark} style={{ background: "#14181C", color: "#FFFFFF", padding: "14px 28px", fontSize: 15, fontWeight: 600, border: "none", borderRadius: 8, cursor: status === "submitting" ? "not-allowed" : "pointer", opacity: status === "submitting" ? 0.7 : 1, display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        {status === "submitting" ? "Submitting..." : <>Submit Inquiry <Send size={15} /></>}
      </button>
    </form>
  );
}
