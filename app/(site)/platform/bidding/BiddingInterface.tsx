'use client';

import { useState } from 'react';

const MONO = "var(--font-ibm-plex-mono), monospace";

export default function BiddingInterface({ initialCompanies, initialBids }: { initialCompanies: any[], initialBids: any[] }) {
  const [bids, setBids] = useState(initialBids);
  const [companyId, setCompanyId] = useState(initialCompanies[0]?.id || '');
  const [itemId, setItemId] = useState(initialCompanies[0]?.items[0]?.id || '');
  const [clientName, setClientName] = useState('');
  const [description, setDescription] = useState('');
  const [quantity, setQuantity] = useState(1000);
  const [margin, setMargin] = useState(0.2);
  const [loading, setLoading] = useState(false);
  const [activeBreakdown, setActiveBreakdown] = useState<any>(null);

  const selectedCompany = initialCompanies.find(c => c.id === companyId);

  async function generateBid(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/bids/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ companyId, itemId, clientName, description, quantity, margin })
      });
      const data = await res.json();
      if (data.success) {
        setBids([data.bid, ...bids]);
        setActiveBreakdown(data.breakdown);
      } else {
        alert(data.error);
      }
    } catch (err) {
      console.error(err);
    }
    setLoading(false);
  }

  return (
    <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '24px' }}>
      {/* Left Column: Form */}
      <div style={{ background: '#FFFFFF', border: '1px solid rgba(20,24,28,0.1)', borderRadius: '12px', padding: '24px', boxShadow: '0 4px 12px rgba(0,0,0,0.03)' }}>
        <h2 style={{ fontSize: '15px', fontWeight: 600, marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
          <span style={{ width: 8, height: 8, background: '#0E7C8A', borderRadius: '50%' }} />
          Configure New Bid
        </h2>
        
        <form onSubmit={generateBid} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#7a848e', marginBottom: '6px', fontFamily: MONO }}>COMPANY</label>
            <select 
              value={companyId} 
              onChange={(e) => {
                setCompanyId(e.target.value);
                const co = initialCompanies.find(c => c.id === e.target.value);
                if (co?.items.length) setItemId(co.items[0].id);
              }}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(20,24,28,0.2)', fontSize: '14px', background: '#FCFBF9' }}
            >
              {initialCompanies.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#7a848e', marginBottom: '6px', fontFamily: MONO }}>TARGET PRODUCT</label>
            <select 
              value={itemId} 
              onChange={(e) => setItemId(e.target.value)}
              style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(20,24,28,0.2)', fontSize: '14px', background: '#FCFBF9' }}
            >
              {selectedCompany?.items.map((i: any) => <option key={i.id} value={i.id}>{i.name}</option>)}
            </select>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#7a848e', marginBottom: '6px', fontFamily: MONO }}>CLIENT NAME</label>
              <input type="text" required value={clientName} onChange={e => setClientName(e.target.value)} placeholder="e.g. United Airlines" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(20,24,28,0.2)', fontSize: '14px' }} />
            </div>
            <div>
              <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#7a848e', marginBottom: '6px', fontFamily: MONO }}>QUANTITY</label>
              <input type="number" required value={quantity} onChange={e => setQuantity(Number(e.target.value))} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(20,24,28,0.2)', fontSize: '14px' }} />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#7a848e', marginBottom: '6px', fontFamily: MONO }}>CONTRACT DESCRIPTION</label>
            <input type="text" required value={description} onChange={e => setDescription(e.target.value)} placeholder="e.g. 6-month breakfast catering" style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(20,24,28,0.2)', fontSize: '14px' }} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, color: '#7a848e', marginBottom: '6px', fontFamily: MONO }}>TARGET MARGIN (e.g. 0.20 = 20%)</label>
            <input type="number" step="0.01" required value={margin} onChange={e => setMargin(Number(e.target.value))} style={{ width: '100%', padding: '10px 12px', borderRadius: '6px', border: '1px solid rgba(20,24,28,0.2)', fontSize: '14px' }} />
          </div>

          <button 
            type="submit" 
            disabled={loading || !companyId || !itemId}
            style={{ marginTop: '8px', padding: '12px', background: '#0E7C8A', color: '#fff', border: 'none', borderRadius: '6px', fontWeight: 600, fontSize: '14px', cursor: loading ? 'wait' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Synthesizing Costs...' : 'Generate Data-Backed Bid'}
          </button>
        </form>
      </div>

      {/* Right Column: Results & History */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
        
        {activeBreakdown && (
          <div style={{ background: '#FFFFFF', border: '1px solid rgba(14,124,138,0.3)', borderLeft: '4px solid #0E7C8A', borderRadius: '12px', padding: '24px', boxShadow: '0 8px 30px rgba(14,124,138,0.08)' }}>
            <h3 style={{ fontSize: '16px', fontWeight: 700, margin: '0 0 16px 0', color: '#0E7C8A' }}>Micro-Costing Inference Result</h3>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px', padding: '16px', background: 'rgba(14,124,138,0.04)', borderRadius: '8px' }}>
              <div>
                <div style={{ fontSize: '11px', color: '#5a646e', fontFamily: MONO, marginBottom: '4px' }}>DETERMINISTIC COST (FLOOR)</div>
                <div style={{ fontSize: '24px', fontWeight: 700 }}>${activeBreakdown.totalCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '11px', color: '#5a646e', fontFamily: MONO, marginBottom: '4px' }}>UNIT COST ({activeBreakdown.quantity} units)</div>
                <div style={{ fontSize: '24px', fontWeight: 700 }}>${activeBreakdown.unitCost.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</div>
              </div>
            </div>
            
            <div style={{ fontSize: '12px', fontWeight: 600, marginBottom: '12px', color: '#14181C' }}>SUPPLY CHAIN BREAKDOWN:</div>
            <div style={{ background: '#FCFBF9', border: '1px solid rgba(20,24,28,0.1)', borderRadius: '8px', padding: '16px', fontFamily: MONO, fontSize: '12px', overflowY: 'auto', maxHeight: '200px' }}>
              <pre style={{ margin: 0, whiteSpace: 'pre-wrap', color: '#5a646e' }}>
                {JSON.stringify(activeBreakdown.components, null, 2)}
              </pre>
            </div>
          </div>
        )}

        <div style={{ background: '#FFFFFF', border: '1px solid rgba(20,24,28,0.1)', borderRadius: '12px', overflow: 'hidden' }}>
          <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(20,24,28,0.08)', background: '#FCFBF9' }}>
            <h3 style={{ fontSize: '14px', fontWeight: 700, margin: 0 }}>Recent Bids Ledger</h3>
          </div>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid rgba(20,24,28,0.1)', fontFamily: MONO, fontSize: '10px', color: '#9aa2ab' }}>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>CLIENT</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>DESCRIPTION</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>PREDICTED COST</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>MARGIN</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>FINAL BID</th>
                <th style={{ padding: '12px 20px', fontWeight: 600 }}>DATE</th>
              </tr>
            </thead>
            <tbody>
              {bids.map((bid, i) => (
                <tr key={bid.id} style={{ borderBottom: i === bids.length - 1 ? 'none' : '1px solid rgba(20,24,28,0.06)', fontSize: '13px' }}>
                  <td style={{ padding: '14px 20px', fontWeight: 600 }}>{bid.clientName}</td>
                  <td style={{ padding: '14px 20px', color: '#5a646e' }}>{bid.description}</td>
                  <td style={{ padding: '14px 20px', fontFamily: MONO }}>${bid.predictedCost.toFixed(2)}</td>
                  <td style={{ padding: '14px 20px', fontFamily: MONO }}>{(bid.appliedMargin * 100).toFixed(1)}%</td>
                  <td style={{ padding: '14px 20px', fontFamily: MONO, fontWeight: 700, color: '#15854F' }}>${bid.finalBidPrice.toFixed(2)}</td>
                  <td style={{ padding: '14px 20px', fontFamily: MONO, color: '#9aa2ab', fontSize: '11px' }}>{new Date(bid.createdAt).toLocaleDateString()}</td>
                </tr>
              ))}
              {bids.length === 0 && (
                <tr>
                  <td colSpan={6} style={{ padding: '30px', textAlign: 'center', color: '#9aa2ab', fontSize: '13px' }}>No bids generated yet.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
