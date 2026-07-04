"use client";

import React, { useState } from 'react';
import styles from "@/components/nadir/nadir.module.css";

const MONO = "var(--font-ibm-plex-mono), monospace";

export default function ROICalculator() {
  const [revenue, setRevenue] = useState(50000000);
  const [margin, setMargin] = useState(12);
  const [incidents, setIncidents] = useState(140);
  
  const costPerIncident = 8500; 
  const totalIncidentCost = incidents * costPerIncident;
  const nadirPreventionRate = 0.35; // 35% reduction
  
  const savedIncidentsCost = totalIncidentCost * nadirPreventionRate;
  const optimizationGains = revenue * 0.015; // 1.5% top-line gain from optimization
  
  const totalAnnualValue = savedIncidentsCost + optimizationGains;
  const estimatedNadirCost = 120000; // $120k/yr enterprise
  const netROI = totalAnnualValue - estimatedNadirCost;
  const roiMultiplier = (totalAnnualValue / estimatedNadirCost).toFixed(1);

  return (
    <div style={{ background: "#FFFFFF", borderRadius: 14, border: "1px solid rgba(20,24,28,0.12)", overflow: "hidden", boxShadow: "0 10px 40px -20px rgba(20,30,40,0.15)", maxWidth: 900, margin: "0 auto" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "12px 18px", borderBottom: "1px solid rgba(20,24,28,0.09)", background: "#FCFBF9" }}>
        <div style={{ fontFamily: MONO, fontSize: 11.5, color: "#7a848e", letterSpacing: "0.1em" }}>NADIR ROI CALCULATOR</div>
      </div>
      
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {/* Controls */}
        <div style={{ flex: "1 1 300px", padding: 32, borderRight: "1px solid rgba(20,24,28,0.09)" }}>
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#5a646e", marginBottom: 8 }}>ANNUAL REVENUE ($)</label>
            <input 
              type="range" min="10000000" max="500000000" step="10000000" 
              value={revenue} onChange={(e) => setRevenue(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#0E7C8A" }}
            />
            <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, color: "#14181C", marginTop: 8 }}>
              ${(revenue / 1000000).toFixed(0)}M
            </div>
          </div>
          
          <div style={{ marginBottom: 24 }}>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#5a646e", marginBottom: 8 }}>OPERATING MARGIN (%)</label>
            <input 
              type="range" min="2" max="35" step="1" 
              value={margin} onChange={(e) => setMargin(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#0E7C8A" }}
            />
            <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, color: "#14181C", marginTop: 8 }}>
              {margin}%
            </div>
          </div>

          <div>
            <label style={{ display: "block", fontSize: 12, fontWeight: 700, color: "#5a646e", marginBottom: 8 }}>ANNUAL INCIDENTS/OUTAGES</label>
            <input 
              type="range" min="10" max="1000" step="10" 
              value={incidents} onChange={(e) => setIncidents(Number(e.target.value))}
              style={{ width: "100%", accentColor: "#0E7C8A" }}
            />
            <div style={{ fontFamily: MONO, fontSize: 14, fontWeight: 600, color: "#14181C", marginTop: 8 }}>
              {incidents} incidents
            </div>
          </div>
        </div>
        
        {/* Output */}
        <div style={{ flex: "2 1 400px", padding: 32, background: "#FCFBF9", display: "flex", flexDirection: "column", justifyContent: "center" }}>
          <div style={{ fontSize: 14, color: "#5a646e", marginBottom: 24, lineHeight: 1.5 }}>
            By unifying disconnected systems and predicting anomalies before they cascade, Nadir conservatively reduces incident volume by 35% and optimizes labor/material burn by 1.5%.
          </div>
          
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 32 }}>
            <div>
              <div style={{ fontSize: 12, color: "#7a848e", marginBottom: 4 }}>Incident Savings</div>
              <div style={{ fontFamily: MONO, fontSize: 24, fontWeight: 600, color: "#15854F" }}>${(savedIncidentsCost / 1000).toFixed(0)}k</div>
            </div>
            <div>
              <div style={{ fontSize: 12, color: "#7a848e", marginBottom: 4 }}>Optimization Gains</div>
              <div style={{ fontFamily: MONO, fontSize: 24, fontWeight: 600, color: "#15854F" }}>${(optimizationGains / 1000).toFixed(0)}k</div>
            </div>
          </div>
          
          <div style={{ borderTop: "1px solid rgba(20,24,28,0.1)", paddingTop: 24 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end" }}>
              <div>
                <div style={{ fontSize: 12, fontWeight: 700, letterSpacing: "0.05em", color: "#14181C", marginBottom: 4 }}>ESTIMATED NET ROI</div>
                <div style={{ fontSize: 13, color: "#7a848e" }}>Based on $120k avg enterprise deployment</div>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ fontFamily: MONO, fontSize: 42, fontWeight: 500, color: "#0E7C8A", letterSpacing: "-0.02em" }}>
                  ${(netROI / 1000).toFixed(0)}k
                </div>
                <div style={{ fontFamily: MONO, fontSize: 14, color: "#15854F", fontWeight: 600, marginTop: 4 }}>
                  {roiMultiplier}x Return
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
