"use client";

import { useState } from "react";
import ActionModal from "./ActionModal";
import styles from "./nadir.module.css";

const MONO = "var(--font-ibm-plex-mono), monospace";

export default function ChecklistForm({ onSubmit }: { onSubmit: () => void }) {
  const [checks, setChecks] = useState([false, false, false]);

  const toggle = (index: number) => {
    const newChecks = [...checks];
    newChecks[index] = !newChecks[index];
    setChecks(newChecks);
  };

  const allChecked = checks.every(Boolean);
  const [submitted, setSubmitted] = useState(false);
  const [showModal, setShowModal] = useState(false);

  if (submitted) {
    return (
      <div style={{ padding: 14, background: "rgba(21,133,79,0.06)", border: "1px solid rgba(21,133,79,0.4)", borderRadius: 10 }}>
        <div style={{ display: "flex", gap: 9, alignItems: "center" }}>
          <span style={{ color: "#15854F", fontWeight: 700, flex: "none" }}>✓</span>
          <div style={{ fontSize: 13, color: "#15854F", fontWeight: 600 }}>Spot-check completed</div>
        </div>
        <div style={{ fontFamily: MONO, fontSize: 10.5, color: "#9aa2ab", marginTop: 6, paddingLeft: 22 }}>
          Logged to audit trail with timestamp.
        </div>
      </div>
    );
  }

  return (
    <div style={{ padding: 14, background: "#FCFBF9", border: "1px solid rgba(20,24,28,0.18)", borderRadius: 10 }}>
      <div style={{ fontFamily: MONO, fontSize: 10.5, letterSpacing: "0.1em", color: "#14181C", marginBottom: 12 }}>REQUIRED SPOT-CHECK</div>
      <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 16 }}>
        {[
          "Verify Valve Qual-Test (Doc #882)",
          "Check Supplier Certification for Titanium Lot",
          "Sign-off on Non-Conformance Report (NCR)"
        ].map((item, i) => (
          <label key={i} style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
            <input
              type="checkbox"
              checked={checks[i]}
              onChange={() => toggle(i)}
              style={{ marginTop: 2, accentColor: "#0E7C8A" }}
            />
            <span style={{ fontSize: 12.5, lineHeight: 1.4, color: checks[i] ? "#9aa2ab" : "#2a333c", textDecoration: checks[i] ? "line-through" : "none" }}>
              {item}
            </span>
          </label>
        ))}
      </div>
      <button
        disabled={!allChecked}
        onClick={() => setShowModal(true)}
        style={{
          fontFamily: "inherit", fontSize: 12.5, fontWeight: 700, padding: "8px 12px", width: "100%", borderRadius: 7,
          background: allChecked ? "#0E7C8A" : "rgba(20,24,28,0.06)",
          color: allChecked ? "#fff" : "#9aa2ab",
          border: "none",
          cursor: allChecked ? "pointer" : "default"
        }}
      >
        Submit Sign-off
      </button>

      {showModal && (
        <ActionModal
          title="Submitting Compliance Sign-off"
          steps={[
            "Validating user session...",
            "Committing checklist to audit trail...",
            "Updating NCR status..."
          ]}
          onComplete={() => {
            setSubmitted(true);
            onSubmit();
          }}
          onClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}
