"use client";

import React from 'react';
import { useNadir } from './context';

export default function PipelineMapper({ onBuildingClick }: { onBuildingClick: (idx: number | null) => void }) {
  const { co, alertsFull } = useNadir();

  const stages = [
    { id: 'source', label: 'Sourcing & Top of Funnel', count: 214 },
    { id: 'screen', label: 'Screening & Interviews', count: 42 },
    { id: 'place', label: 'Active Placements', count: 7 },
    { id: 'invoice', label: 'Billing & AR', count: 2 },
  ];

  return (
    <div style={{ width: '100%', height: '100%', padding: 40, display: 'flex', flexDirection: 'column', gap: 20, background: '#F3F1EC', overflowY: 'auto' }}>
      <div style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: 12, letterSpacing: '0.1em', color: '#7a848e', marginBottom: 20 }}>
        OPERATIONAL PIPELINE VIEW
      </div>

      <div style={{ display: 'flex', flex: 1, gap: 16 }}>
        {stages.map((stage, idx) => (
          <div key={stage.id} style={{ flex: 1, background: '#FFFFFF', border: '1px solid rgba(20,24,28,0.1)', borderRadius: 8, padding: 16, display: 'flex', flexDirection: 'column' }}>
            <div style={{ fontSize: 14, fontWeight: 700, marginBottom: 4, color: '#14181C' }}>{stage.label}</div>
            <div style={{ fontFamily: 'var(--font-ibm-plex-mono), monospace', fontSize: 24, fontWeight: 600, color: '#0E7C8A', marginBottom: 20 }}>{stage.count}</div>
            
            {/* Render alerts mapped to this stage */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {alertsFull.map((alert, aIdx) => {
                // Mock mapping alerts to stages based on keywords
                const isMatch = 
                  (stage.id === 'invoice' && alert.title.toLowerCase().includes('invoice')) ||
                  (stage.id === 'source' && alert.title.toLowerCase().includes('pipeline')) ||
                  (stage.id === 'place' && alert.title.toLowerCase().includes('msa'));

                if (!isMatch) return null;

                return (
                  <div 
                    key={aIdx} 
                    onClick={() => onBuildingClick(aIdx)}
                    style={{ 
                      padding: 10, 
                      background: 'rgba(14,124,138,0.04)', 
                      border: `1px solid ${alert.color}`, 
                      borderRadius: 6,
                      cursor: 'pointer',
                      animation: 'nadirPulse 2s infinite'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: alert.color }} />
                      <div style={{ fontSize: 10, fontWeight: 700, color: alert.color }}>{alert.sev}</div>
                    </div>
                    <div style={{ fontSize: 11, fontWeight: 600, color: '#14181C' }}>{alert.title}</div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
