"use client";

import { useState, useEffect } from "react";

const MONO = "var(--font-ibm-plex-mono), monospace";

interface ActionModalProps {
  title: string;
  steps: string[];
  onComplete: () => void;
  onClose: () => void;
}

export default function ActionModal({ title, steps, onComplete, onClose }: ActionModalProps) {
const [currentStep, setCurrentStep] = useState(0);
  const done = currentStep >= steps.length;

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout>;
    if (currentStep < steps.length) {
      timer = setTimeout(() => {
        setCurrentStep((s) => s + 1);
      }, 500); // 500ms per step
    } else {
      timer = setTimeout(() => {
        onComplete();
        onClose();
      }, 1000); // auto close after 1s on success
    }
    return () => clearTimeout(timer);
  }, [currentStep, steps.length, onComplete, onClose]);

  return (
    <div style={{ position: "fixed", inset: 0, zIndex: 99, background: "rgba(20,24,28,0.7)", display: "flex", alignItems: "center", justifyContent: "center", backdropFilter: "blur(4px)" }}>
      <div style={{ width: 400, background: "#FFFFFF", borderRadius: 12, overflow: "hidden", boxShadow: "0 24px 60px rgba(0,0,0,0.4)", animation: "nadirFadeUp 0.25s ease" }}>
        <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(20,24,28,0.1)", background: "#FCFBF9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div style={{ fontSize: 15, fontWeight: 700 }}>{title}</div>
          {done && <button onClick={onClose} style={{ fontFamily: "inherit", background: "transparent", border: "none", color: "#9aa2ab", fontSize: 24, cursor: "pointer", lineHeight: 1 }}>×</button>}
        </div>
        
        <div style={{ padding: "20px 24px", minHeight: 140 }}>
          {done ? (
            <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12, height: "100%", animation: "nadirFadeUp 0.3s ease" }}>
              <div style={{ width: 40, height: 40, borderRadius: "50%", background: "#15854F", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, fontWeight: 700 }}>✓</div>
              <div style={{ fontSize: 15, fontWeight: 600, color: "#14181C" }}>Transaction Complete</div>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {steps.map((step, i) => {
                if (i > currentStep) return null;
                const isCurrent = i === currentStep;
                return (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: MONO, fontSize: 12, color: isCurrent ? "#14181C" : "#9aa2ab", animation: "nadirFadeUp 0.2s ease" }}>
                    <span style={{ 
                      width: 8, height: 8, borderRadius: "50%", 
                      background: isCurrent ? "#0E7C8A" : "#15854F", 
                      animation: isCurrent ? "nadirBlink 1s infinite" : "none" 
                    }} />
                    {step} {isCurrent ? "..." : "✓"}
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
