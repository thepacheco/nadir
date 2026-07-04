"use client";

import { useState } from "react";
import { useNadir } from "./context";
import styles from "./nadir.module.css";

// Stage gates (ARCHITECTURE §9.4): a ticket cannot advance until the
// requirements for its current stage are checked off. Gates are per-stage,
// evidence-style requirements; every check and every advancement is audited.
const STAGE_GATES: Record<string, { next: string; nextLabel: string; reqs: string[] }> = {
  OPEN: { next: "IN_PROGRESS", nextLabel: "IN PROGRESS", reqs: ["Owner confirmed on shift", "Evidence attached to ticket"] },
  IN_PROGRESS: { next: "CLOSED", nextLabel: "CLOSED", reqs: ["Resolution notes written", "Supervisor sign-off"] },
};

export default function TeamScreen({ mode }: { mode: "inbox" | "tickets" }) {
  const { co, people, approver, ingestedData, selPersonView, thread, audit, notify, ticketChecks, toggleTicketCheck, ticketStatusOverride, advanceTicket, inboxSent, sendInbox, editInbox, deleteInbox } = useNadir();
  const [selectedDept, setSelectedDept] = useState<string | null>(null);
  const [selTicketId, setSelTicketId] = useState<string | null>(null);
  const [draft, setDraft] = useState("");
  const [editingMsg, setEditingMsg] = useState<string | null>(null);
  const [editText, setEditText] = useState("");
  const [showMention, setShowMention] = useState(false);
  const [attachment, setAttachment] = useState<string | null>(null);

  // Ingested CSV rows are string→string maps (see /api/ingest).
  const safeData = (Array.isArray(ingestedData) ? ingestedData : []) as Record<string, string>[];
  const effStatus = (t: Record<string, string>) => ticketStatusOverride[t.ticket_id] ?? t.status;

  // Derive unique departments from ingested data
  const departments = Array.from(new Set(safeData.map(d => d.department).filter(Boolean))) as string[];

  // Filter tickets by selected department
  const visibleTickets = selectedDept
    ? safeData.filter(d => d.department === selectedDept)
    : safeData;

  const ticketsByStatus = {
    OPEN: visibleTickets.filter(t => effStatus(t) === 'OPEN'),
    IN_PROGRESS: visibleTickets.filter(t => effStatus(t) === 'IN_PROGRESS'),
    CLOSED: visibleTickets.filter(t => effStatus(t) === 'CLOSED'),
  };

  const selTicket = selTicketId ? safeData.find(t => t.ticket_id === selTicketId) ?? null : null;
  const selStatus = selTicket ? effStatus(selTicket) : null;
  const selGate = selStatus ? STAGE_GATES[selStatus] : null;
  const selChecks = selTicket ? ticketChecks[selTicket.ticket_id] || {} : {};
  const selDone = selGate ? selGate.reqs.filter(r => selChecks[r]).length : 0;

  const [escalateTicket, setEscalateTicket] = useState<(Record<string, string> & { manager: string }) | null>(null);
  const [showChecklistBuilder, setShowChecklistBuilder] = useState(false);
  const [showInbox, setShowInbox] = useState(mode === "inbox");

  // Keep showInbox in sync if mode changes
  if (mode === "inbox" && !showInbox) setShowInbox(true);
  if (mode === "tickets" && showInbox) setShowInbox(false);

  return (
    <div style={{ display: "flex", flex: 1, minHeight: 0 }}>
      {/* LEFT: Org Tree */}
      <div style={{ width: 280, flex: "none", borderRight: "1px solid rgba(20,24,28,0.1)", overflowY: "auto", padding: 20, background: "#FCFBF9" }}>
        <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 3 }}>{mode === "tickets" ? "Work" : "Inbox"}</div>
        <div style={{ fontSize: 12.5, color: "#7a848e", marginBottom: 16 }}>{mode === "tickets" ? "Every ticket, task, and remediation — routed and tracked to done." : "Message your team, anchored to the work."}</div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: 2, fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11.5 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 7, padding: "3px 0" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: "#B47614", flex: "none" }} />
            <span style={{ color: "#14181C", fontWeight: 600 }}>{approver.name}</span>
            <span style={{ fontSize: 9, color: "#8a5a10" }}>C-SUITE</span>
          </div>

          {mode === "tickets" && (
            <>
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
            </>
          )}
          
          {mode === "inbox" && (
            <>
              <div style={{ marginTop: 24, fontSize: 10, color: "#9aa2ab", fontWeight: 700, letterSpacing: "0.05em", paddingLeft: 12 }}>DIRECT MESSAGES</div>
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
            </>
          )}

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
              {/* real sent messages — editable, deletable, with read receipts */}
              {inboxSent.map((m) => (
                <div key={m.id} className={styles.sentMsg} style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 4 }}>
                  <div style={{ fontSize: 10, color: "#9aa2ab", fontWeight: 600 }}>You</div>
                  {editingMsg === m.id ? (
                    <div style={{ display: "flex", gap: 6, alignItems: "center", maxWidth: "80%" }}>
                      <input
                        autoFocus
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        onKeyDown={(e) => { if (e.key === "Enter") { editInbox(m.id, editText); setEditingMsg(null); } if (e.key === "Escape") setEditingMsg(null); }}
                        style={{ padding: "8px 12px", borderRadius: 10, border: "1.5px solid #0E7C8A", fontSize: 13, fontFamily: "inherit", minWidth: 200 }}
                      />
                      <button onClick={() => { editInbox(m.id, editText); setEditingMsg(null); }} style={{ fontFamily: "inherit", fontSize: 11, fontWeight: 700, color: "#0E7C8A", background: "transparent", border: "none", cursor: "pointer" }}>Save</button>
                      <button onClick={() => setEditingMsg(null)} style={{ fontFamily: "inherit", fontSize: 11, color: "#9aa2ab", background: "transparent", border: "none", cursor: "pointer" }}>Cancel</button>
                    </div>
                  ) : (
                    <div style={{ display: "flex", alignItems: "center", gap: 8, maxWidth: "80%" }}>
                      <div className={styles.msgTools} style={{ display: "flex", gap: 4, opacity: 0, transition: "opacity 0.15s" }}>
                        <button title="Edit" onClick={() => { setEditingMsg(m.id); setEditText(m.text); }} style={{ fontFamily: "inherit", fontSize: 11, color: "#7a848e", background: "transparent", border: "none", cursor: "pointer", padding: 2 }}>✎</button>
                        <button title="Delete" onClick={() => deleteInbox(m.id)} style={{ fontFamily: "inherit", fontSize: 11, color: "#C7452F", background: "transparent", border: "none", cursor: "pointer", padding: 2 }}>🗑</button>
                      </div>
                      <div style={{ background: "#0E7C8A", color: "#FFFFFF", border: "1px solid #0E7C8A", padding: "10px 14px", borderRadius: "12px 12px 3px 12px", fontSize: 13, lineHeight: 1.5 }}>
                        {m.text}
                      </div>
                    </div>
                  )}
                  <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 9.5, color: "#9aa2ab" }}>
                    {m.at}{m.edited ? " · edited" : ""} · {m.read ? "✓✓ Seen" : "✓ Delivered"}
                  </div>
                </div>
              ))}
            </div>

            {attachment && (
              <div style={{ padding: "8px 16px 0", display: "flex" }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, fontSize: 12, color: "#0E7C8A", background: "rgba(14,124,138,0.08)", border: "1px solid rgba(14,124,138,0.3)", borderRadius: 6, padding: "5px 10px" }}>
                  📎 {attachment}
                  <button onClick={() => setAttachment(null)} style={{ background: "none", border: "none", color: "#0E7C8A", cursor: "pointer", fontSize: 13 }}>×</button>
                </span>
              </div>
            )}

            <div style={{ padding: 16, borderTop: "1px solid rgba(20,24,28,0.08)", background: "#FCFBF9", display: "flex", gap: 8, alignItems: "center", position: "relative" }}>
              <button title="Mention someone" onClick={() => setShowMention((s) => !s)} style={{ fontFamily: "inherit", fontSize: 15, fontWeight: 700, color: "#7a848e", background: "transparent", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 8, width: 38, height: 38, cursor: "pointer", flex: "none" }}>@</button>
              <button title="Attach a file" onClick={() => setAttachment("Q3_hire_packet.pdf")} style={{ fontFamily: "inherit", fontSize: 15, color: "#7a848e", background: "transparent", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 8, width: 38, height: 38, cursor: "pointer", flex: "none" }}>📎</button>
              {showMention && (
                <div style={{ position: "absolute", bottom: 60, left: 16, background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.14)", borderRadius: 8, boxShadow: "0 8px 24px -8px rgba(20,30,40,0.3)", padding: 6, zIndex: 20, minWidth: 180 }}>
                  <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 9.5, color: "#9aa2ab", padding: "4px 8px" }}>MENTION</div>
                  {people.map((pp) => (
                    <button key={pp.name} onClick={() => { setDraft((d) => `${d}@${pp.name.split(" ")[0]} `); setShowMention(false); }} style={{ display: "flex", width: "100%", alignItems: "center", gap: 8, fontFamily: "inherit", textAlign: "left", padding: "6px 8px", background: "transparent", border: "none", borderRadius: 5, cursor: "pointer", fontSize: 12.5 }}>
                      <span style={{ width: 18, height: 18, borderRadius: "50%", background: pp.avBg, color: pp.avFg, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9, fontWeight: 700 }}>{pp.name.charAt(0)}</span>
                      {pp.name}
                    </button>
                  ))}
                </div>
              )}
              <input
                type="text"
                placeholder={`Message ${selPersonView.name.split(" ")[0]}…`}
                value={draft}
                onChange={(e) => setDraft(e.target.value)}
                onKeyDown={(e) => { if (e.key === "Enter" && draft.trim()) { sendInbox(attachment ? `${draft} 📎 ${attachment}` : draft); setDraft(""); setAttachment(null); } }}
                style={{ flex: 1, padding: "10px 14px", borderRadius: 8, border: "1px solid rgba(20,24,28,0.2)", fontSize: 13, fontFamily: "inherit" }}
              />
              <button
                onClick={() => { if (draft.trim()) { sendInbox(attachment ? `${draft} 📎 ${attachment}` : draft); setDraft(""); setAttachment(null); } }}
                disabled={!draft.trim()}
                style={{ padding: "0 24px", height: 38, borderRadius: 8, border: "none", background: draft.trim() ? "#14181C" : "#c7ccd1", color: "#FFF", fontSize: 13, fontWeight: 600, cursor: draft.trim() ? "pointer" : "default", flex: "none" }}
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
            
            <div style={{ display: 'flex', gap: 16, flex: 1, minHeight: 0 }}>
              {/* Columns */}
              {['OPEN', 'IN_PROGRESS', 'CLOSED'].map((status) => {
                const colTickets = ticketsByStatus[status as keyof typeof ticketsByStatus];
                const gate = STAGE_GATES[status];
                return (
                  <div key={status} style={{ flex: 1, minWidth: 0, display: 'flex', flexDirection: 'column', background: 'rgba(20,24,28,0.03)', borderRadius: 8, padding: 12 }}>
                    <div style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, fontWeight: 700, color: "#7a848e", marginBottom: 4 }}>
                      {status.replace('_', ' ')} ({colTickets.length})
                    </div>
                    <div style={{ fontSize: 10, color: "#9aa2ab", marginBottom: 10, lineHeight: 1.4 }}>
                      {gate ? `${gate.reqs.length} requirements gate the move to ${gate.nextLabel}` : "Terminal — audit trail retained"}
                    </div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10, overflowY: 'auto' }}>
                      {colTickets.map(t => {
                        const ticketPerson = people.find(p => p.name.includes(t.owner.split(' ')[0]));
                        const checks = ticketChecks[t.ticket_id] || {};
                        const done = gate ? gate.reqs.filter(r => checks[r]).length : 0;
                        const sel = selTicketId === t.ticket_id;
                        return (
                          <div
                            key={t.ticket_id}
                            onClick={() => setSelTicketId(sel ? null : t.ticket_id)}
                            style={{ background: '#FFF', padding: 12, borderRadius: 6, border: `1.5px solid ${sel ? '#0E7C8A' : 'rgba(20,24,28,0.1)'}`, boxShadow: sel ? '0 6px 18px -6px rgba(14,124,138,0.4)' : '0 2px 8px rgba(0,0,0,0.04)', cursor: 'pointer' }}
                          >
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

                            {gate && (
                              <div style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 8 }}>
                                {gate.reqs.map(r => (
                                  <span key={r} title={r} style={{ width: 22, height: 5, borderRadius: 2, background: checks[r] ? "#15854F" : "rgba(20,24,28,0.12)" }} />
                                ))}
                                <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 9.5, color: done === gate.reqs.length ? "#15854F" : "#9aa2ab" }}>
                                  {done}/{gate.reqs.length}
                                </span>
                              </div>
                            )}

                            {status !== 'CLOSED' && (
                              <button
                                onClick={(e) => { e.stopPropagation(); setEscalateTicket({ ...t, manager: ticketPerson?.manager || approver.name }); }}
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

              {/* Stage-gate detail panel */}
              {selTicket && (
                <div style={{ width: 300, flex: "none", background: "#FFFFFF", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 8, padding: 18, overflowY: "auto", animation: "nadirFadeUp 0.25s ease", alignSelf: "stretch" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                    <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 11, color: "#0E7C8A" }}>{selTicket.ticket_id}</span>
                    <button onClick={() => setSelTicketId(null)} style={{ background: "none", border: "none", fontSize: 17, cursor: "pointer", color: "#9aa2ab" }}>×</button>
                  </div>
                  <div style={{ fontSize: 14.5, fontWeight: 700, marginBottom: 6, lineHeight: 1.35 }}>{selTicket.description}</div>
                  <div style={{ fontSize: 11.5, color: "#7a848e", marginBottom: 14 }}>
                    {selTicket.department} · {selTicket.location} · owner {selTicket.owner}
                  </div>

                  {selGate ? (
                    <>
                      <div style={{ background: "#FCFBF9", border: "1px solid rgba(20,24,28,0.08)", borderRadius: 8, padding: "10px 12px", marginBottom: 12 }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 4 }}>
                          <span style={{ fontSize: 12, fontWeight: 700 }}>Confirmation checklist</span>
                          <span style={{ fontFamily: "var(--font-ibm-plex-mono), monospace", fontSize: 10.5, color: selDone === selGate.reqs.length ? "#15854F" : "#B47614" }}>
                            {selDone}/{selGate.reqs.length} complete
                          </span>
                        </div>
                        <div style={{ fontSize: 11, color: "#7a848e", lineHeight: 1.45 }}>
                          Complete the requirements to move this ticket to <strong style={{ color: "#0E7C8A" }}>{selGate.nextLabel}</strong>. Every check is written to the audit trail.
                        </div>
                      </div>

                      <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
                        {selGate.reqs.map(r => {
                          const on = !!selChecks[r];
                          return (
                            <button
                              key={r}
                              onClick={() => toggleTicketCheck(selTicket.ticket_id, r)}
                              style={{ display: "flex", alignItems: "center", gap: 10, fontFamily: "inherit", textAlign: "left", padding: "10px 12px", background: on ? "rgba(21,133,79,0.06)" : "#FFFFFF", border: `1.5px solid ${on ? "rgba(21,133,79,0.45)" : "rgba(20,24,28,0.14)"}`, borderRadius: 8, cursor: "pointer" }}
                            >
                              <span style={{ width: 16, height: 16, borderRadius: 4, flex: "none", display: "flex", alignItems: "center", justifyContent: "center", background: on ? "#15854F" : "transparent", border: `1.5px solid ${on ? "#15854F" : "rgba(20,24,28,0.3)"}`, color: "#FFF", fontSize: 10, fontWeight: 700 }}>
                                {on ? "✓" : ""}
                              </span>
                              <span style={{ fontSize: 12.5, fontWeight: 600, color: on ? "#0f6b3f" : "#14181C" }}>{r}</span>
                            </button>
                          );
                        })}
                      </div>

                      <button
                        disabled={selDone < selGate.reqs.length}
                        onClick={() => { advanceTicket(selTicket.ticket_id, selGate.next, selGate.reqs.join("; ")); setSelTicketId(null); }}
                        style={{
                          width: "100%", fontFamily: "inherit", fontSize: 13, fontWeight: 700, padding: "11px 0", borderRadius: 8, border: "none",
                          background: selDone === selGate.reqs.length ? "#0E7C8A" : "rgba(20,24,28,0.08)",
                          color: selDone === selGate.reqs.length ? "#FFFFFF" : "#b7bec5",
                          cursor: selDone === selGate.reqs.length ? "pointer" : "default",
                        }}
                      >
                        {selDone === selGate.reqs.length ? `Advance to ${selGate.nextLabel} →` : `${selGate.reqs.length - selDone} requirement${selGate.reqs.length - selDone > 1 ? "s" : ""} remaining`}
                      </button>
                    </>
                  ) : (
                    <div style={{ fontSize: 12.5, color: "#15854F", background: "rgba(21,133,79,0.06)", border: "1px solid rgba(21,133,79,0.3)", borderRadius: 8, padding: "10px 12px" }}>
                      ✓ Closed. The full checklist history and every gate passage is preserved in the audit trail.
                    </div>
                  )}
                </div>
              )}
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
