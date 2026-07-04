"use client";

import { useState, useRef } from "react";
import { Upload, CheckCircle } from "lucide-react";
import styles from "@/components/nadir/nadir.module.css";

const MONO = "var(--font-ibm-plex-mono), monospace";

export function CareerApplyForm() {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const [status, setStatus] = useState<"idle" | "submitting" | "success">("idle");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
    }, 2000);
  };

  if (status === "success") {
    return (
      <div style={{ padding: "60px 0", textAlign: "center", display: "flex", flexDirection: "column", alignItems: "center", gap: 16 }}>
        <CheckCircle size={56} color="#15854F" />
        <div>
          <h3 style={{ fontSize: 24, fontWeight: 600, color: "#14181C", margin: "0 0 10px" }}>Application Received</h3>
          <p style={{ fontSize: 15, color: "#5a646e", margin: 0, lineHeight: 1.6 }}>
            Thank you for applying to Nadir Intelligence.<br/>Our engineering team will review your cryptographic submission shortly.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 24 }}>
      {/* Step 1: Basics */}
      <div>
        <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 16, borderBottom: "1px solid rgba(20,24,28,0.08)", paddingBottom: 8 }}>
          01 / PERSONAL DETAILS
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>FULL NAME *</label>
            <input disabled={status === "submitting"} type="text" required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="Jane Doe" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>EMAIL ADDRESS *</label>
            <input disabled={status === "submitting"} type="email" required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="jane@company.com" />
          </div>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginTop: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>PHONE NUMBER</label>
            <input disabled={status === "submitting"} type="tel" style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="+1 (555) 000-0000" />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>LINKEDIN OR PORTFOLIO *</label>
            <input disabled={status === "submitting"} type="url" required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", background: "#FFFFFF" }} placeholder="https://linkedin.com/in/..." />
          </div>
        </div>
      </div>

      {/* Step 2: Resume */}
      <div>
        <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 16, borderBottom: "1px solid rgba(20,24,28,0.08)", paddingBottom: 8 }}>
          02 / RÉSUMÉ UPLOAD
        </div>
        <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>ATTACH RÉSUMÉ (PDF, DOCX) *</label>
        <div
          onClick={() => fileInputRef.current?.click()}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          style={{
            border: `2px dashed ${dragActive ? "#0E7C8A" : "rgba(20,24,28,0.15)"}`,
            borderRadius: 8, padding: "32px 20px",
            textAlign: "center", cursor: status === "submitting" ? "not-allowed" : "pointer",
            background: dragActive ? "rgba(14,124,138,0.04)" : "#FAFAF8",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 10,
            opacity: status === "submitting" ? 0.7 : 1
          }}>
          <Upload size={24} style={{ color: file ? "#15854F" : "#7a848e" }} />
          <div>
            <span style={{ fontSize: 14, fontWeight: 600, color: file ? "#15854F" : "#14181C" }}>
              {file ? file.name : "Drag and drop your file here,"}
            </span>
            {!file && <span style={{ fontSize: 14, color: "#5a646e" }}> or click to browse</span>}
          </div>
          <div style={{ fontSize: 11.5, color: "#7a848e" }}>
            {file ? `${(file.size / 1024 / 1024).toFixed(2)} MB` : "Maximum size: 10MB"}
          </div>
          <input
            ref={fileInputRef}
            type="file"
            accept=".pdf,.docx,.doc"
            style={{ display: "none" }}
            onChange={handleChange}
            disabled={status === "submitting"}
            required={!file}
          />
        </div>
      </div>

      {/* Step 3: Questions */}
      <div>
        <div style={{ fontFamily: MONO, fontSize: 12, color: "#7a848e", letterSpacing: "0.06em", marginBottom: 16, borderBottom: "1px solid rgba(20,24,28,0.08)", paddingBottom: 8 }}>
          03 / QUESTIONNAIRE
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>
              WHY DO YOU WANT TO WORK AT NADIR? *
            </label>
            <textarea disabled={status === "submitting"} rows={4} required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", resize: "vertical", background: "#FFFFFF" }} placeholder="Tell us why you are interested in this specific role and team." />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11.5, fontWeight: 600, marginBottom: 8, color: "#5a646e", letterSpacing: "0.04em" }}>
              DESCRIBE A COMPLEX DATA OR SCHEMA ISSUE YOU HAVE DEALT WITH. *
            </label>
            <textarea disabled={status === "submitting"} rows={4} required style={{ width: "100%", padding: "12px 14px", fontSize: 14, border: "1px solid rgba(20,24,28,0.15)", borderRadius: 6, outline: "none", resize: "vertical", background: "#FFFFFF" }} placeholder="We deal with legacy schemas and database configurations daily. Share your experience." />
          </div>
        </div>
      </div>

      <button disabled={status === "submitting"} type="submit" className={styles.btnDark} style={{ background: "#14181C", color: "#FFFFFF", padding: "15px 32px", fontSize: 15, fontWeight: 600, border: "none", borderRadius: 8, cursor: status === "submitting" ? "not-allowed" : "pointer", alignSelf: "flex-start", marginTop: 8, opacity: status === "submitting" ? 0.7 : 1 }}>
        {status === "submitting" ? "Encrypting and Submitting..." : "Submit Application"}
      </button>
    </form>
  );
}
