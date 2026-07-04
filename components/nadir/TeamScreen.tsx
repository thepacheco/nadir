"use client";

import { useState } from "react";
import { useNadir } from "./context";
import styles from "./nadir.module.css";

export default function TeamScreen() {
  const { people, approver, ingestedData } = useNadir();
  const [selectedDept, setSelectedDept] = useState<string | null>(null);

  const safeData = Array.isArray(ingestedData) ? ingestedData : [];

  // Derive unique departments from ingested data
  const departments = Array.from(new Set(safeData.map(d => d.department).filter(Boolean))) as string[];
  
  // Filter tickets by selected department
  const visibleTickets = selectedDept 
    ? safeData.filter(d => d.department === selectedDept)
    : safeData;

  const ticketsByStatus = {
    OPEN: visibleTickets.filter(t => t.status === 'OPEN'),
    IN_PROGRESS: visibleTickets.filter(t => t.status === 'IN_PROGRESS'),
    CLOSED: visibleTickets.filter(t => t.status === 'CLOSED'),
  };

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
      {/* LEFT: Org Tree */}
      <div style={{ width: 280, flex: "none", borderRight: "1px solid rgba(20,24,28,0.1)", overflowY: "auto", padding: 20, background: "#FCFBF9" }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 3 }}>Unified Org Tree</div>
        <div style={{ fontSize: 12.5, color: "#7a848e", marginBottom: 16 }}>Route and track tickets across departments.</div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 2, fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11.5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "3px 0" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#B47614", flex: "none" }} />
            <span style={{ color: "#14181C", fontWeight: 600 }}>{approver.name}</span>
            <span style={{ fontSize: 9, color: "#8a5a10" }}>C-SUITE</span>
          </div>

          <button 
            onClick={() => setSelectedDept(null)}
            style={{ 
              fontFamily: 'inherit', textAlign: 'left', padding: '6px 12px', marginTop: 12,
              background: selectedDept === null ? 'rgba(14,124,138,0.1)' : 'transparent',
              color: selectedDept === null ? '#0E7C8A' : '#5a646e', border: 'none', borderRadius: 4, cursor: 'pointer',
              fontWeight: 600
            }}
          >
            All Departments
          </button>

          {departments.map((dept) => (
            <button 
              key={dept}
              onClick={() => setSelectedDept(dept)}
              style={{ 
                fontFamily: 'inherit', textAlign: 'left', padding: '6px 12px', 
                background: selectedDept === dept ? 'rgba(14,124,138,0.1)' : 'transparent',
                color: selectedDept === dept ? '#0E7C8A' : '#5a646e', border: 'none', borderRadius: 4, cursor: 'pointer'
              }}
            >
              └─ {dept}
            </button>
          ))}
        </div>
      </div>

      {/* RIGHT: Ticket Kanban */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0, background: "#F6F4EF", padding: 20 }}>
        <div style={{ fontSize: 18, fontWeight: 700, marginBottom: 20, color: '#14181C' }}>
          {selectedDept ? `${selectedDept} Tickets` : "Global Ticket Board"}
        </div>
        
        <div style={{ display: 'flex', gap: 20, flex: 1, minHeight: 0 }}>
          {/* Columns */}
          {['OPEN', 'IN_PROGRESS', 'CLOSED'].map((status) => {
            const colTickets = ticketsByStatus[status as keyof typeof ticketsByStatus];
            return (
              <div key={status} style={{ flex: 1, display: 'flex', flexDirection: 'column', background: 'rgba(20,24,28,0.03)', borderRadius: 8, padding: 12 }}>
                <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, fontWeight: 700, color: "#7a848e", marginBottom: 12 }}>
                  {status.replace('_', ' ')} ({colTickets.length})
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
                  {colTickets.map(t => (
                    <div key={t.ticket_id} style={{ background: '#FFF', padding: 12, borderRadius: 6, border: '1px solid rgba(20,24,28,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                        <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, color: '#0E7C8A', background: 'rgba(14,124,138,0.1)', padding: '2px 6px', borderRadius: 4 }}>{t.ticket_id}</span>
                        <span style={{ fontSize: 10, fontWeight: 700, color: t.priority === 'CRITICAL' ? '#C7452F' : t.priority === 'HIGH' ? '#B47614' : '#5a646e' }}>
                          {t.priority}
                        </span>
                      </div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#14181C', marginBottom: 4 }}>{t.description}</div>
                      <div style={{ fontSize: 11, color: '#7a848e', display: 'flex', justifyContent: 'space-between' }}>
                        <span>Owner: {t.owner}</span>
                        <span>{t.location}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  );
}
