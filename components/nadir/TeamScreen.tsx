"use client";

import { useState } from "react";
import { useNadir } from "./context";
import styles from "./nadir.module.css";

export default function TeamScreen() {
  const { co, people, approver, ingestedData, selPersonView, thread, msgSent, onSendMsg, audit, notify } = useNadir();
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

  const [escalateTicket, setEscalateTicket] = useState<any | null>(null);
  const [showChecklistBuilder, setShowChecklistBuilder] = useState(false);
  const [showInbox, setShowInbox] = useState(false);

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
            onClick={() => { setSelectedDept(null); setShowInbox(false); }}
            style={{ 
              fontFamily: 'inherit', textAlign: 'left', padding: '6px 12px', marginTop: 12,
              background: (selectedDept === null && !showInbox) ? 'rgba(14,124,138,0.1)' : 'transparent',
              color: (selectedDept === null && !showInbox) ? '#0E7C8A' : '#5a646e', border: 'none', borderRadius: 4, cursor: 'pointer',
              fontWeight: 600
            }}
          >
            All Departments
          </button>

          {departments.map((dept) => (
            <button 
              key={dept}
              onClick={() => { setSelectedDept(dept); setShowInbox(false); }}
              style={{ 
                fontFamily: 'inherit', textAlign: 'left', padding: '6px 12px', 
                background: (selectedDept === dept && !showInbox) ? 'rgba(14,124,138,0.1)' : 'transparent',
                color: (selectedDept === dept && !showInbox) ? '#0E7C8A' : '#5a646e', border: 'none', borderRadius: 4, cursor: 'pointer'
              }}
            >
              └─ {dept}
            </button>
          ))}
          
          <div style={{ marginTop: 24, fontSize: 10, color: "#9aa2ab", fontWeight: 700, letterSpacing: "0.05em", paddingLeft: 12 }}>TEAM INBOX</div>
          {people.map((p, i) => (
            <button
              key={p.name}
              onClick={() => { p.onSelect(); setShowInbox(true); setSelectedDept(null); }}
              style={{
                display: "flex", alignItems: "center", gap: 8, fontFamily: 'inherit', textAlign: 'left', padding: '6px 12px',
                background: (p.active && showInbox) ? 'rgba(14,124,138,0.1)' : 'transparent',
                color: (p.active && showInbox) ? '#0E7C8A' : '#14181C', border: 'none', borderRadius: 4, cursor: 'pointer'
              }}
            >
              <div style={{ width: 18, height: 18, borderRadius: "50%", background: p.avBg, color: p.avFg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700 }}>
                {p.name.charAt(0)}
              </div>
              <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span>{p.name.split(" ")[0]}</span>
                {(p.unread ?? 0) > 0 && <span style={{ background: "#C7452F", color: "#FFF", fontSize: 9, padding: "2px 6px", borderRadius: 10, fontWeight: 700 }}>{p.unread}</span>}
              </div>
            </button>
          ))}

          <button
            onClick={() => setShowChecklistBuilder(true)}
            style={{
              marginTop: 30, fontFamily: "inherit", fontSize: 11.5, fontWeight: 700,
              padding: "8px 12px", background: "#FFFFFF", color: "#14181C", border: "1px solid rgba(20,24,28,0.1)",
              borderRadius: 6, cursor: "pointer", boxShadow: "0 2px 4px rgba(0,0,0,0.02)", textAlign: "center"
            }}
          >
            + Author Sign-off Form
          </button>
        </div>
      </div>

      {/* RIGHT: Ticket Kanban or Inbox */}
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", minHeight: 0, background: "#F6F4EF", padding: 20 }}>
        
        {showInbox ? (
          <div style={{ display: "flex", flexDirection: "column", flex: 1, background: "#FFFFFF", borderRadius: 12, border: "1px solid rgba(20,24,28,0.1)", overflow: "hidden", boxShadow: "0 10px 40px rgba(0,0,0,0.05)" }}>
            <div style={{ padding: "16px 24px", borderBottom: "1px solid rgba(20,24,28,0.08)", background: "#FCFBF9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 36, height: 36, borderRadius: "50%", background: selPersonView.avBg, color: selPersonView.avFg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 14, fontWeight: 700 }}>
                  {selPersonView.name.charAt(0)}
                </div>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 700, color: "#14181C" }}>{selPersonView.name}</div>
                  <div style={{ fontSize: 12, color: "#7a848e" }}>{selPersonView.role} · {selPersonView.manager ? `Manager: ${selPersonView.manager}` : "Leadership"}</div>
                </div>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 11, fontWeight: 600, color: selPersonView.statusColor, background: `${selPersonView.statusColor}15`, padding: "4px 8px", borderRadius: 4 }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: selPersonView.statusColor }} />
                {selPersonView.pto ? "ON PTO" : "ACTIVE"}
              </div>
            </div>

            <div style={{ flex: 1, overflowY: "auto", padding: 24, display: "flex", flexDirection: "column", gap: 16 }}>
              {thread.map((m, i) => (
                <div key={i} style={{ display: "flex", flexDirection: "column", alignItems: m.align, gap: 4 }}>
                  <div style={{ fontSize: 10, color: "#9aa2ab", fontWeight: 600 }}>{m.who}</div>
                  <div style={{ background: m.bg, color: m.fg, border: `1px solid ${m.bd}`, padding: "10px 14px", borderRadius: m.radius, fontSize: 13, lineHeight: 1.5, maxWidth: "70%" }}>
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            <div style={{ padding: 16, borderTop: "1px solid rgba(20,24,28,0.08)", background: "#FCFBF9", display: "flex", gap: 12 }}>
              <input 
                type="text" 
                placeholder={msgSent ? "Message sent..." : `Reply to ${selPersonView.name.split(" ")[0]}...`} 
                value={msgSent ? "" : selPersonView.draft} 
                readOnly
                style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(20,24,28,0.2)", fontSize: 13, fontFamily: "inherit" }} 
              />
              <button 
                onClick={onSendMsg} 
                disabled={msgSent}
                style={{ padding: "0 24px", borderRadius: 8, border: "none", background: msgSent ? "#9aa2ab" : "#14181C", color: "#FFF", fontSize: 13, fontWeight: 600, cursor: msgSent ? "default" : "pointer" }}
              >
                Send
              </button>
            </div>
          </div>
        ) : (
          <>
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
                      {colTickets.map(t => {
                        const ticketPerson = people.find(p => p.name.includes(t.owner.split(' ')[0]));
                        return (
                          <div key={t.ticket_id} style={{ background: '#FFF', padding: 12, borderRadius: 6, border: '1px solid rgba(20,24,28,0.1)', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 6 }}>
                              <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10, color: '#0E7C8A', background: 'rgba(14,124,138,0.1)', padding: '2px 6px', borderRadius: 4 }}>{t.ticket_id}</span>
                              <span style={{ fontSize: 10, fontWeight: 700, color: t.priority === 'CRITICAL' ? '#C7452F' : t.priority === 'HIGH' ? '#B47614' : '#5a646e' }}>
                                {t.priority}
                              </span>
                            </div>
                            <div style={{ fontSize: 13, fontWeight: 600, color: '#14181C', marginBottom: 4 }}>{t.description}</div>
                            <div style={{ fontSize: 11, color: '#7a848e', display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                              <span>Owner: {t.owner}</span>
                              <span>{t.location}</span>
                            </div>

                            {/* System-Generated Spot Check Mock */}
                            {t.priority === 'CRITICAL' && (
                              <div style={{ background: "rgba(180,118,20,0.06)", borderLeft: "2px solid #B47614", padding: "6px 8px", fontSize: 10, marginBottom: 8, borderRadius: "0 4px 4px 0", color: "#8a5a10" }}>
                                <strong>System Spot-Check:</strong> Verify actuator lock (based on prior anomaly).
                              </div>
                            )}

                            {status !== 'CLOSED' && (
                              <button
                                onClick={() => setEscalateTicket({ ...t, manager: ticketPerson?.manager || approver.name })}
                                style={{ width: "100%", padding: "4px 0", fontSize: 10, fontWeight: 700, color: "#C7452F", background: "rgba(199,69,47,0.05)", border: "1px solid rgba(199,69,47,0.1)", borderRadius: 4, cursor: "pointer" }}
                              >
                                Escalate ↑
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
          </>
        )}
      </div>

      {/* Escalate Modal */}
      {escalateTicket && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(20,24,28,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 440, background: "#FFFFFF", borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 32px rgba(0,0,0,0.15)" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(20,24,28,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FCFBF9" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#14181C" }}>Escalate Ticket {escalateTicket.ticket_id}</div>
              <button onClick={() => setEscalateTicket(null)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9aa2ab" }}>×</button>
            </div>
            <div style={{ padding: 24, fontSize: 13, lineHeight: 1.5, color: "#5a646e" }}>
              <div style={{ marginBottom: 20 }}>This ticket will be routed according to the established Org Tree. PTO and availability rules are enforced.</div>
              
              <div style={{ display: "flex", flexDirection: "column", gap: 12, fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 12 }}>
                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#15854F", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 10, flex: "none" }}>1</div>
                  <div>
                    <div style={{ color: "#14181C", fontWeight: 600 }}>{escalateTicket.owner}</div>
                    <div style={{ color: "#7a848e", fontSize: 11 }}>Current Owner</div>
                  </div>
                </div>
                
                <div style={{ borderLeft: "2px solid rgba(20,24,28,0.1)", margin: "-4px 0 -4px 11px", height: 16 }} />

                <div style={{ display: "flex", alignItems: "flex-start", gap: 12, opacity: 0.5 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#C7452F", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 10, flex: "none" }}>×</div>
                  <div>
                    <div style={{ color: "#14181C", fontWeight: 600 }}>{escalateTicket.manager}</div>
                    <div style={{ color: "#C7452F", fontSize: 11 }}>PTO / Unavailable — Auto-Rerouting</div>
                  </div>
                </div>

                <div style={{ borderLeft: "2px dashed #B47614", margin: "-4px 0 -4px 11px", height: 16 }} />

                <div style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{ width: 24, height: 24, borderRadius: "50%", background: "#B47614", color: "#FFF", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 10, flex: "none" }}>2</div>
                  <div>
                    <div style={{ color: "#14181C", fontWeight: 600 }}>{approver.name}</div>
                    <div style={{ color: "#B47614", fontSize: 11 }}>C-Suite Escalation Path</div>
                  </div>
                </div>
              </div>
            </div>
            <div style={{ padding: "16px 24px", background: "rgba(20,24,28,0.03)", borderTop: "1px solid rgba(20,24,28,0.06)", display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button onClick={() => setEscalateTicket(null)} style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid rgba(20,24,28,0.15)", background: "#FFF", fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#5a646e" }}>Cancel</button>
              <button onClick={() => {
                audit(`Escalated Ticket ${escalateTicket.ticket_id} to ${escalateTicket.manager}`);
                notify(`Ticket escalated successfully to ${escalateTicket.manager}`, "ok");
                setEscalateTicket(null);
              }} style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: "#C7452F", color: "#FFF", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Confirm Escalation</button>
            </div>
          </div>
        </div>
      )}

      {/* Checklist Builder Modal */}
      {showChecklistBuilder && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(20,24,28,0.6)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 500, background: "#FFFFFF", borderRadius: 12, overflow: "hidden", boxShadow: "0 12px 32px rgba(0,0,0,0.15)" }}>
            <div style={{ padding: "16px 20px", borderBottom: "1px solid rgba(20,24,28,0.1)", display: "flex", justifyContent: "space-between", alignItems: "center", background: "#FCFBF9" }}>
              <div style={{ fontSize: 15, fontWeight: 700, color: "#14181C" }}>Author Sign-off Form</div>
              <button onClick={() => setShowChecklistBuilder(false)} style={{ background: "none", border: "none", fontSize: 20, cursor: "pointer", color: "#9aa2ab" }}>×</button>
            </div>
            <div style={{ padding: 24, fontSize: 13, color: "#14181C" }}>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#7a848e", marginBottom: 6 }}>FORM NAME</label>
                <input type="text" placeholder="e.g. Pre-Flight Catering Checklist" style={{ width: "100%", padding: "8px 12px", border: "1px solid rgba(20,24,28,0.2)", borderRadius: 6, fontSize: 13, fontFamily: "inherit" }} />
              </div>
              <div style={{ marginBottom: 16 }}>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#7a848e", marginBottom: 6 }}>TARGET DEPARTMENT</label>
                <select style={{ width: "100%", padding: "8px 12px", border: "1px solid rgba(20,24,28,0.2)", borderRadius: 6, fontSize: 13, fontFamily: "inherit", background: "#FFF" }}>
                  <option>Field Ops</option>
                  <option>Kitchen</option>
                  <option>Maintenance</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, fontWeight: 700, color: "#7a848e", marginBottom: 6 }}>ITEMS</label>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8 }}>
                  <input type="checkbox" disabled />
                  <input type="text" value="Verify seal genealogy matches SN-04" readOnly style={{ flex: 1, padding: "6px 10px", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 4, fontSize: 13, color: "#5a646e", background: "#FCFBF9" }} />
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                  <input type="checkbox" disabled />
                  <input type="text" placeholder="Add another item..." style={{ flex: 1, padding: "6px 10px", border: "1px dashed rgba(20,24,28,0.3)", borderRadius: 4, fontSize: 13 }} />
                </div>
              </div>
            </div>
            <div style={{ padding: "16px 24px", background: "rgba(20,24,28,0.03)", borderTop: "1px solid rgba(20,24,28,0.06)", display: "flex", justifyContent: "flex-end", gap: 12 }}>
              <button onClick={() => setShowChecklistBuilder(false)} style={{ padding: "8px 16px", borderRadius: 6, border: "1px solid rgba(20,24,28,0.15)", background: "#FFF", fontSize: 12, fontWeight: 600, cursor: "pointer", color: "#5a646e" }}>Cancel</button>
              <button onClick={() => {
                audit(`Deployed new active checklist form for ${co.name} personnel.`);
                notify("Checklist deployed and active", "ok");
                setShowChecklistBuilder(false);
              }} style={{ padding: "8px 16px", borderRadius: 6, border: "none", background: "#0E7C8A", color: "#FFF", fontSize: 12, fontWeight: 600, cursor: "pointer" }}>Save & Deploy</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
