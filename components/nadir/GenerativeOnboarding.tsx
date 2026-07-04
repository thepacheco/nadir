"use client";

import { useState } from "react";
import styles from "./nadir.module.css";

export default function GenerativeOnboarding({ onComplete, onCancel }: { onComplete: () => void, onCancel: () => void }) {
  const [website, setWebsite] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"idle" | "scraping" | "generating" | "done">("idle");
  const [logs, setLogs] = useState<string[]>([]);

  const handleGenerate = () => {
    setStatus("scraping");
    setLogs(["Initializing headless browser...", `Scraping operations from ${website}...`, "Querying Google Maps API for footprint..."]);
    
    setTimeout(() => {
      setStatus("generating");
      setLogs(prev => [...prev, "Extracting text into vector chunks...", "Inferring local SQLite schema from dictated SOPs...", "Populating Fusion Graph with deterministic mapping..."]);
      
      setTimeout(() => {
        setStatus("done");
        setLogs(prev => [...prev, "✅ Schema Generated.", "✅ Ops Map populated."]);
      }, 3000);
    }, 2000);
  };

  return (
    <div style={{ background: "#FFFFFF", padding: 32, borderRadius: 12, border: "1px solid rgba(20,24,28,0.1)", boxShadow: "0 8px 24px rgba(0,0,0,0.06)" }}>
      <div style={{ fontSize: 22, fontWeight: 700, color: "#14181C", marginBottom: 8 }}>Generative AI Onboarding (No Database)</div>
      <div style={{ fontSize: 14, color: "#5a646e", marginBottom: 32, lineHeight: 1.6 }}>
        Don't have a 15TB database? Provide your website and dictate your standard operating procedures. Nadir will scrape your operations, pull your building outline via Google Maps, and auto-generate your local schema using low-cost LLMs.
      </div>

      {status === "idle" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#14181C", marginBottom: 8 }}>Company Website</label>
            <input 
              value={website} 
              onChange={e => setWebsite(e.target.value)} 
              placeholder="e.g. https://www.nurest.com"
              style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid rgba(20,24,28,0.14)", fontSize: 14, fontFamily: "inherit" }}
            />
          </div>
          
          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#14181C", marginBottom: 8 }}>Primary Facility Address</label>
            <input 
              value={address} 
              onChange={e => setAddress(e.target.value)} 
              placeholder="e.g. 100 Logistics Way, Atlanta, GA"
              style={{ width: "100%", padding: 12, borderRadius: 8, border: "1px solid rgba(20,24,28,0.14)", fontSize: 14, fontFamily: "inherit" }}
            />
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#14181C", marginBottom: 8 }}>Dictate Operations (SOPs)</label>
            <textarea 
              value={description} 
              onChange={e => setDescription(e.target.value)} 
              placeholder="e.g. We assemble 80,000 meals a month. Each meal has an apple yogurt..."
              style={{ width: "100%", height: 120, padding: 12, borderRadius: 8, border: "1px solid rgba(20,24,28,0.14)", fontSize: 14, fontFamily: "inherit", resize: "vertical" }}
            />
          </div>

          <div style={{ display: "flex", gap: 12, justifyContent: "flex-end", marginTop: 12 }}>
            <button onClick={onCancel} style={{ padding: "12px 24px", background: "transparent", color: "#5a646e", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Cancel</button>
            <button onClick={handleGenerate} style={{ padding: "12px 24px", background: "#0E7C8A", color: "#FFFFFF", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Generate Operations Graph</button>
          </div>
        </div>
      )}

      {status !== "idle" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 12, background: "#14181C", color: "#00FF00", padding: 20, borderRadius: 8, height: 200, overflowY: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
            {logs.map((log, idx) => (
              <div key={idx}>{">"} {log}</div>
            ))}
            {status !== "done" && <div style={{ animation: "nadirPulse 1.5s infinite" }}>_</div>}
          </div>
          
          {status === "done" && (
            <div style={{ display: "flex", justifyContent: "flex-end", marginTop: 12 }}>
              <button onClick={onComplete} style={{ padding: "12px 24px", background: "#0E7C8A", color: "#FFFFFF", border: "none", borderRadius: 8, cursor: "pointer", fontWeight: 600 }}>Continue to Graph</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
