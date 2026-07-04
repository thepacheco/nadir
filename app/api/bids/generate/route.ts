import { NextResponse } from 'next/server';
import { prisma } from '../../../../../lib/prisma';
import { calculateTrueCost } from '../../../../../lib/engine/micro-costing';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { companyId, itemId, clientName, description, quantity, margin } = body;

    if (!companyId || !itemId || !clientName || !quantity || !margin) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Calculate true micro-cost deterministically
    const costBreakdown = await calculateTrueCost(itemId, quantity);
    
    // 2. Apply rules and margins
    const appliedMargin = parseFloat(margin); // e.g. 0.20 for 20%
    const finalBidPrice = costBreakdown.totalCost * (1 + appliedMargin);

    // 3. Save the bid to the database
    const bid = await prisma.bid.create({
      data: {
        companyId,
        clientName,
        description,
        predictedCost: costBreakdown.totalCost,
        appliedMargin,
        finalBidPrice,
      }
    });

    return NextResponse.json({
      success: true,
      bid,
      breakdown: costBreakdown
    });

  } catch (error: any) {
    console.error('Bid generation error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
