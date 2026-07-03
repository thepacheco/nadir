"use client";

import React, { useState } from "react";
import {
  DndContext,
  DragOverlay,
  closestCenter,
  useSensor,
  useSensors,
  PointerSensor,
  DragStartEvent,
  DragEndEvent,
} from "@dnd-kit/core";
import { useDroppable, useDraggable } from "@dnd-kit/core";
import { useNadir } from "./context";
import styles from "./nadir.module.css";

const MONO = "var(--font-ibm-plex-mono), monospace";

function DraggableColumn({ id, name }: { id: string; name: string }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id,
    data: { name },
  });

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        padding: "10px 14px",
        background: isDragging ? "#F3F7F8" : "#FFFFFF",
        border: "1px solid rgba(20,24,28,0.18)",
        borderRadius: 8,
        cursor: "grab",
        fontFamily: MONO,
        fontSize: 12,
        color: "#14181C",
        marginBottom: 8,
        opacity: isDragging ? 0.5 : 1,
        boxShadow: isDragging ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
        display: "flex",
        alignItems: "center",
        gap: 8,
      }}
    >
      <span style={{ color: "#9aa2ab" }}>⠿</span> {name}
    </div>
  );
}

function DroppableObject({ id, name, children }: { id: string; name: string; children: React.ReactNode }) {
  const { isOver, setNodeRef } = useDroppable({
    id,
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        background: isOver ? "rgba(14,124,138,0.06)" : "#FFFFFF",
        border: `1px solid ${isOver ? "rgba(14,124,138,0.4)" : "rgba(20,24,28,0.1)"}`,
        borderRadius: 12,
        padding: "12px",
        marginBottom: 12,
        transition: "all 0.2s ease",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 10 }}>
        <span style={{ width: 8, height: 8, borderRadius: "50%", background: "#0E7C8A" }} />
        <span style={{ fontSize: 13.5, fontWeight: 700 }}>{name}</span>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 6, minHeight: 40 }}>
        {children}
      </div>
    </div>
  );
}

export default function DragDropMapper() {
  const { co, objectName, wires, addWire, retargetWire, relabelWire } = useNadir();
  const [activeId, setActiveId] = useState<string | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 5,
      },
    })
  );

  const objectOptions = co.obMappings.map((_, i) => objectName(i));
  
  // Extract unique columns from current tables as draggable sources
  const existingFroms = Array.from(new Set(wires.map(w => w.from)));
  const mockFroms = ["id", "created_at", "status", "amount", "employee_id", "location_id"];
  const allColumns = Array.from(new Set([...existingFroms, ...mockFroms]));

  // Find columns not yet mapped
  const unmappedColumns = allColumns.filter(c => !wires.find(w => w.from === c));

  const branches = objectOptions.map((obj) => ({
    obj,
    wires: wires.map((w, i) => ({ ...w, i })).filter((w) => w.to === obj),
  }));

  const handleDragStart = (event: DragStartEvent) => {
    setActiveId(event.active.id as string);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    setActiveId(null);
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const sourceCol = active.id as string;
      const targetObj = over.id as string;
      
      const existing = wires.find(w => w.from === sourceCol && w.to === targetObj);
      if (!existing) {
        const existingWireIdx = wires.findIndex(w => w.from === sourceCol);
        if (existingWireIdx >= 0) {
          retargetWire(existingWireIdx, targetObj);
        } else {
          addWire(sourceCol, "relates to", targetObj);
        }
      }
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div style={{ display: "flex", gap: 24, marginTop: 16 }}>
        {/* Left Panel: Source Columns */}
        <div style={{ flex: "0 0 240px", display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9aa2ab", marginBottom: 12, letterSpacing: "0.05em" }}>SOURCE COLUMNS</div>
          <div style={{ background: "#FCFBF9", border: "1px solid rgba(20,24,28,0.1)", borderRadius: 12, padding: "12px", minHeight: 300 }}>
            {unmappedColumns.length === 0 && (
              <div style={{ fontSize: 12, color: "#9aa2ab", fontStyle: "italic", textAlign: "center", padding: "20px 0" }}>All columns mapped</div>
            )}
            {unmappedColumns.map(col => (
              <DraggableColumn key={col} id={col} name={col} />
            ))}
          </div>
        </div>

        {/* Right Panel: Target Objects */}
        <div style={{ flex: 1, display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 11, fontWeight: 700, color: "#9aa2ab", marginBottom: 12, letterSpacing: "0.05em" }}>ONTOLOGY OBJECTS</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {branches.map(b => (
              <DroppableObject key={b.obj} id={b.obj} name={b.obj}>
                {b.wires.map(w => (
                  <div key={w.i} style={{ display: "flex", alignItems: "center", gap: 8, background: "#FFFFFF", padding: "8px 12px", borderRadius: 6, border: "1px solid rgba(20,24,28,0.06)" }}>
                    <div style={{ fontFamily: MONO, fontSize: 12, color: "#14181C" }}>{w.from}</div>
                    <span style={{ color: "#9aa2ab" }}>→</span>
                    <input
                      value={w.label}
                      onChange={(e) => relabelWire(w.i, e.target.value)}
                      style={{ fontFamily: MONO, fontSize: 11, color: "#0E7C8A", background: "rgba(14,124,138,0.06)", border: "1px solid rgba(14,124,138,0.3)", borderRadius: 5, padding: "3px 8px", width: 110, outline: "none", textAlign: "center" }}
                    />
                    {/* Fake mismatch warning logic for demo */}
                    {w.from.includes("date") && !w.label.includes("time") && (
                      <span style={{ fontSize: 11, color: "#B47614", marginLeft: "auto", display: "flex", alignItems: "center", gap: 4 }} title="Possible type mismatch">
                        <span style={{ width: 12, height: 12, borderRadius: "50%", background: "#B47614", color: "#fff", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 9 }}>!</span>
                        Mismatch
                      </span>
                    )}
                  </div>
                ))}
                {b.wires.length === 0 && (
                  <div style={{ fontSize: 12, color: "#b7bec5", fontStyle: "italic", padding: "8px" }}>Drag columns here...</div>
                )}
              </DroppableObject>
            ))}
          </div>
        </div>
      </div>

      <DragOverlay>
        {activeId ? (
          <div style={{
            padding: "10px 14px",
            background: "#FFFFFF",
            border: "1px solid rgba(14,124,138,0.6)",
            borderRadius: 8,
            fontFamily: MONO,
            fontSize: 12,
            color: "#14181C",
            boxShadow: "0 8px 24px rgba(0,0,0,0.15)",
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}>
            <span style={{ color: "#9aa2ab" }}>⠿</span> {activeId}
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
