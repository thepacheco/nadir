"use client";

import { useState } from "react";
import styles from "./nadir.module.css";

export default function BiddingScreen() {
  const [mealsTotal, setMealsTotal] = useState(80000);
  const [breakfastFlights, setBreakfastFlights] = useState(200);
  
  // Deterministic Micro-Costing Engine
  const daysCycle = 3;
  const flightsPerCycle = breakfastFlights * daysCycle;
  const mealsPerFlight = Math.round(mealsTotal / flightsPerCycle); // approx meals per flight
  
  // Component breakdown (Apple Yogurt Example)
  const appleCost = 0.50; // $0.50 per whole apple
  const slicesPerApple = 6;
  const slicesPerYogurt = 2;
  const yogurtBaseCost = 0.80; // $0.80 per yogurt cup
  const laborRateMin = 0.35; // $0.35 per minute of labor
  const timeToSliceAppleMin = 0.5; // 30 seconds
  const timeToAssembleYogurtMin = 0.75; // 45 seconds

  // Math
  const applesNeededPerMeal = slicesPerYogurt / slicesPerApple; // 0.333 apples
  const costOfApplePerMeal = applesNeededPerMeal * appleCost; // $0.166
  const slicingLaborPerMeal = applesNeededPerMeal * timeToSliceAppleMin * laborRateMin; // $0.058
  const assemblyLaborPerMeal = timeToAssembleYogurtMin * laborRateMin; // $0.262
  
  const totalCostPerYogurt = yogurtBaseCost + costOfApplePerMeal + slicingLaborPerMeal + assemblyLaborPerMeal;
  const totalBreakfastCostPerCycle = totalCostPerYogurt * mealsPerFlight * flightsPerCycle;

  // Margin
  const targetMargin = 0.30; // 30% margin
  const recommendedBidPerMeal = totalCostPerYogurt / (1 - targetMargin);
  const totalBidPerCycle = recommendedBidPerMeal * mealsPerFlight * flightsPerCycle;

  return (
    <div style={{ flex: 1, padding: 32, background: "#FAF9F7", overflowY: "auto" }}>
      <div style={{ maxWidth: 900, margin: "0 auto" }}>
        <div style={{ fontSize: 24, fontWeight: 700, color: "#14181C", marginBottom: 8 }}>Predictive Bidding Engine</div>
        <div style={{ fontSize: 14, color: "#5a646e", marginBottom: 32, lineHeight: 1.6 }}>
          Nadir ingests historical data (e.g. United Airlines cycle volumes) and maps out the micro-costs of production deterministically. No LLM hallucinations—just raw operations math.
        </div>

        <div style={{ display: "flex", gap: 24, marginBottom: 32 }}>
          {/* Inputs */}
          <div style={{ flex: 1, background: "#FFFFFF", padding: 24, borderRadius: 12, border: "1px solid rgba(20,24,28,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#9aa2ab", marginBottom: 16, letterSpacing: "0.05em" }}>HISTORICAL CYCLE DATA</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#14181C", marginBottom: 8 }}>Total Meals (Last Cycle)</label>
                <input type="number" value={mealsTotal} onChange={e => setMealsTotal(Number(e.target.value))} style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid rgba(20,24,28,0.2)", fontSize: 14 }} />
              </div>
              <div>
                <label style={{ display: "block", fontSize: 12, fontWeight: 600, color: "#14181C", marginBottom: 8 }}>Daily Breakfast Flights</label>
                <input type="number" value={breakfastFlights} onChange={e => setBreakfastFlights(Number(e.target.value))} style={{ width: "100%", padding: 10, borderRadius: 6, border: "1px solid rgba(20,24,28,0.2)", fontSize: 14 }} />
              </div>
            </div>
          </div>

          {/* Micro-Cost Rollup */}
          <div style={{ flex: 1, background: "#FFFFFF", padding: 24, borderRadius: 12, border: "1px solid rgba(20,24,28,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: "#9aa2ab", marginBottom: 16, letterSpacing: "0.05em" }}>MICRO-COST ROLLUP (APPLE YOGURT)</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 12, fontSize: 13, color: "#5a646e" }}>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Raw Apple (2 of 6 slices)</span> <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}>${costOfApplePerMeal.toFixed(3)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Yogurt Base</span> <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}>${yogurtBaseCost.toFixed(3)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between" }}><span>Slicing Labor (0.5m)</span> <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}>${slicingLaborPerMeal.toFixed(3)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", borderBottom: "1px solid rgba(20,24,28,0.1)", paddingBottom: 12 }}><span>Assembly Labor (0.75m)</span> <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}>${assemblyLaborPerMeal.toFixed(3)}</span></div>
              <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 700, color: "#14181C" }}><span>Total Cost per Meal</span> <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace" }}>${totalCostPerYogurt.toFixed(3)}</span></div>
            </div>
          </div>
        </div>

        {/* Output Bid */}
        <div style={{ background: "#14181C", color: "#FFFFFF", padding: 32, borderRadius: 12, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 12, fontWeight: 700, color: "#9aa2ab", letterSpacing: "0.05em", marginBottom: 8 }}>DATA-BACKED BID PROPOSAL</div>
            <div style={{ fontSize: 32, fontWeight: 700, marginBottom: 4 }}>${recommendedBidPerMeal.toFixed(2)} <span style={{ fontSize: 16, color: "#7a848e", fontWeight: 400 }}>/ meal</span></div>
            <div style={{ fontSize: 14, color: "#9aa2ab" }}>Targeting 30% Gross Margin. Total Cycle Bid: ${totalBidPerCycle.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
          </div>
          <button style={{ padding: "14px 28px", background: "#0E7C8A", color: "#FFFFFF", border: "none", borderRadius: 8, fontSize: 14, fontWeight: 700, cursor: "pointer" }}>
            Generate Bid PDF
          </button>
        </div>
      </div>
    </div>
  );
}
