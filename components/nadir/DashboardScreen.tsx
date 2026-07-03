"use client";

import { useNadir } from "./context";
import styles from "./nadir.module.css";

export default function DashboardScreen() {
  const { ingestedData } = useNadir();

  const totalTickets = ingestedData.length;
  const openTickets = ingestedData.filter(d => d.status === 'OPEN').length;
  const closedTickets = ingestedData.filter(d => d.status === 'CLOSED').length;
  const criticalTickets = ingestedData.filter(d => d.priority === 'CRITICAL').length;

  // Group by department
  const depts = Array.from(new Set(ingestedData.map(d => d.department).filter(Boolean))) as string[];
  const ticketsByDept = depts.map(dept => {
    return {
      dept,
      count: ingestedData.filter(d => d.department === dept).length
    };
  }).sort((a, b) => b.count - a.count);

  const maxDeptCount = Math.max(...ticketsByDept.map(d => d.count), 1);

  return (
    <div style={{ display: "flex", flexDirection: "column", flex: 1, minHeight: 0, background: "#FAF9F7", padding: 32, overflowY: "auto" }}>
      <div style={{ fontSize: 24, fontWeight: 700, color: "#14181C", marginBottom: 8 }}>Operations Dashboard</div>
      <div style={{ fontSize: 14, color: "#5a646e", marginBottom: 32 }}>Analytics derived from live backend ingestion.</div>

      {/* KPI Cards */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 16, marginBottom: 40 }}>
        {[
          { label: "Total Tickets", val: totalTickets, color: "#14181C" },
          { label: "Open Issues", val: openTickets, color: "#B47614" },
          { label: "Resolved", val: closedTickets, color: "#15854F" },
          { label: "Critical Priority", val: criticalTickets, color: "#C7452F" },
        ].map((kpi, idx) => (
          <div key={idx} style={{ background: "#FFFFFF", padding: 20, borderRadius: 12, border: "1px solid rgba(20,24,28,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
            <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, letterSpacing: "0.1em", color: "#7a848e", marginBottom: 8 }}>{kpi.label}</div>
            <div style={{ fontSize: 32, fontWeight: 700, color: kpi.color }}>{kpi.val}</div>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div style={{ display: "flex", gap: 24 }}>
        {/* Bar Chart: Issues by Department */}
        <div style={{ flex: 1, background: "#FFFFFF", padding: 24, borderRadius: 12, border: "1px solid rgba(20,24,28,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#14181C", marginBottom: 24 }}>Issues by Department</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {ticketsByDept.map(d => (
              <div key={d.dept} style={{ display: "flex", alignItems: "center", gap: 16 }}>
                <div style={{ width: 100, fontSize: 12, fontWeight: 600, color: "#5a646e", textAlign: "right" }}>{d.dept}</div>
                <div style={{ flex: 1, height: 24, background: "rgba(20,24,28,0.05)", borderRadius: 4, position: "relative", overflow: "hidden" }}>
                  <div style={{ 
                    position: "absolute", left: 0, top: 0, bottom: 0, 
                    width: `${(d.count / maxDeptCount) * 100}%`, 
                    background: "#0E7C8A", borderRadius: 4 
                  }} />
                </div>
                <div style={{ width: 30, fontSize: 12, fontWeight: 700, color: "#14181C" }}>{d.count}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Tickets Feed */}
        <div style={{ flex: 1, background: "#FFFFFF", padding: 24, borderRadius: 12, border: "1px solid rgba(20,24,28,0.1)", boxShadow: "0 4px 12px rgba(0,0,0,0.03)" }}>
          <div style={{ fontSize: 16, fontWeight: 600, color: "#14181C", marginBottom: 24 }}>Recent Ticket Flow</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {ingestedData.slice(0, 5).map(t => (
              <div key={t.ticket_id} style={{ display: "flex", alignItems: "flex-start", gap: 12, paddingBottom: 12, borderBottom: "1px solid rgba(20,24,28,0.06)" }}>
                <span style={{ width: 8, height: 8, borderRadius: "50%", background: t.status === 'CLOSED' ? "#15854F" : "#B47614", marginTop: 6, flex: "none" }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#14181C" }}>{t.description}</div>
                  <div style={{ fontSize: 11, color: "#7a848e", marginTop: 4 }}>{t.department} · {t.owner}</div>
                </div>
                <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, color: "#9aa2ab" }}>{t.created_at.split('T')[0]}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
