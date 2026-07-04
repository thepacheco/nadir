import { prisma } from '@/lib/prisma';
import BiddingInterface from './BiddingInterface';

export const dynamic = 'force-dynamic';

export default async function BiddingPage() {
  // Fetch existing companies for the dropdown
  const companies = await prisma.company.findMany({
    include: {
      items: {
        where: { type: 'FINISHED_GOOD' }
      }
    }
  });

  // Fetch recent bids
  const recentBids = await prisma.bid.findMany({
    orderBy: { createdAt: 'desc' },
    include: { company: true },
    take: 10
  });

  return (
    <div style={{ padding: '40px', background: '#FAF9F7', minHeight: '100vh', color: '#14181C' }}>
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '32px' }}>
          <h1 style={{ fontSize: '28px', fontWeight: 700, margin: '0 0 8px 0', letterSpacing: '-0.02em' }}>Predictive Bidding Engine</h1>
          <p style={{ color: '#5a646e', margin: 0, fontSize: '15px' }}>
            Rolls up micro-costs deterministically from the live operational graph to generate data-backed contract bids.
          </p>
        </div>

        <BiddingInterface initialCompanies={companies} initialBids={recentBids} />
      </div>
    </div>
  );
}
