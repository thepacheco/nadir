"use client";

import React, { useState } from 'react';
import { DndContext, useDraggable, useDroppable, DragEndEvent } from '@dnd-kit/core';
import { useNadir } from './context';

function DraggableItem({ id, label, left, top }: { id: string; label: string; left: number; top: number }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id,
  });

  const style: React.CSSProperties = {
    position: 'absolute',
    left: `${left}px`,
    top: `${top}px`,
    transform: transform ? `translate3d(${transform.x}px, ${transform.y}px, 0)` : undefined,
    padding: '8px 12px',
    background: '#FFFFFF',
    border: '2px solid #0E7C8A',
    borderRadius: '8px',
    cursor: 'grab',
    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
    fontWeight: 600,
    fontSize: 12,
    color: '#14181C',
    zIndex: transform ? 100 : 10,
  };

  return (
    <div ref={setNodeRef} style={style} {...listeners} {...attributes}>
      {label}
    </div>
  );
}

function DroppableGrid({ children }: { children: React.ReactNode }) {
  const { setNodeRef } = useDroppable({
    id: 'grid-canvas',
  });

  return (
    <div
      ref={setNodeRef}
      style={{
        width: '100%',
        height: '100%',
        position: 'relative',
        backgroundSize: '40px 40px',
        backgroundImage: 'linear-gradient(to right, rgba(20,24,28,0.05) 1px, transparent 1px), linear-gradient(to bottom, rgba(20,24,28,0.05) 1px, transparent 1px)',
        backgroundColor: '#F3F1EC',
      }}
    >
      {children}
    </div>
  );
}

export default function SiteMapper({ onBuildingClick }: { onBuildingClick: (idx: number | null) => void }) {
  const { co, alertsFull, clock } = useNadir();
  
  // Default zones to map onto the grid
  const [items, setItems] = useState([
    { id: 'zone-1', label: 'HQ Office', left: 100, top: 100 },
    { id: 'zone-2', label: 'Midtown Kitchen', left: 300, top: 200 },
    { id: 'zone-3', label: 'Midtown Storage', left: 300, top: 300 },
    { id: 'zone-4', label: 'Line 3', left: 500, top: 150 },
    { id: 'zone-5', label: 'Substation 4', left: 600, top: 350 },
    { id: 'zone-6', label: 'Receiving Dock', left: 150, top: 400 },
  ]);

  const activeAlerts = alertsFull.filter(a => a.at <= clock);

  function handleDragEnd(event: DragEndEvent) {
    const { active, delta } = event;
    if (active) {
      setItems(prev => prev.map(item => {
        if (item.id === active.id) {
          // Snap to 40px grid
          return {
            ...item,
            left: Math.round((item.left + delta.x) / 40) * 40,
            top: Math.round((item.top + delta.y) / 40) * 40,
          };
        }
        return item;
      }));
    }
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <DroppableGrid>
        {items.map(item => (
          <DraggableItem key={item.id} id={item.id} label={item.label} left={item.left} top={item.top} />
        ))}

        {/* Render active alerts near their associated zones */}
        {activeAlerts.map((alert, idx) => {
          // Attempt to find the zone matching the alert location
          const zone = items.find(i => i.label === alert.loc) || items[0];
          return (
            <div
              key={`alert-${idx}`}
              onClick={() => onBuildingClick(idx)}
              style={{
                position: 'absolute',
                left: zone.left + 80,
                top: zone.top - 20,
                width: 24,
                height: 24,
                borderRadius: '50%',
                background: alert.color,
                border: '2px solid #FFF',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: `0 0 12px ${alert.color}`,
                animation: 'nadirPulse 1.5s infinite',
                zIndex: 50
              }}
              title={alert.title}
            >
              <span style={{ color: '#FFF', fontSize: 10, fontWeight: 'bold' }}>!</span>
            </div>
          );
        })}
      </DroppableGrid>
    </DndContext>
  );
}
