import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { calculateTrueCost } from '@/lib/engine/micro-costing';

export async function POST(req: Request) {
  try {
    const body = await req.json().catch(() => null);
    if (!body) {
      return NextResponse.json(
        { error: 'The request body must be JSON. Send companyId, itemId, clientName, quantity, and margin.' },
        { status: 400 },
      );
    }
    const { companyId, itemId, clientName, description, quantity, margin } = body;

    if (!companyId || !itemId || !clientName || quantity == null || margin == null) {
      return NextResponse.json(
        { error: 'Missing required fields: companyId, itemId, clientName, quantity, and margin are all needed.' },
        { status: 400 },
      );
    }

    const qty = Number(quantity);
    if (!Number.isFinite(qty) || qty <= 0) {
      return NextResponse.json(
        { error: `Quantity must be a positive number — got "${quantity}".` },
        { status: 400 },
      );
    }

    const appliedMargin = Number(margin);
    if (!Number.isFinite(appliedMargin) || appliedMargin < 0 || appliedMargin > 5) {
      return NextResponse.json(
        { error: `Margin must be a fraction between 0 and 5 (0.20 means 20%) — got "${margin}".` },
        { status: 400 },
      );
    }

    // The item must exist and belong to the company the bid is for.
    const item = await prisma.item.findUnique({ where: { id: itemId } });
    if (!item || item.companyId !== companyId) {
      return NextResponse.json(
        { error: 'That item does not exist for this company. Pick an item from the company catalog.' },
        { status: 404 },
      );
    }

    // 1. Calculate true micro-cost deterministically
    const costBreakdown = await calculateTrueCost(itemId, qty);

    // 2. Apply the margin
    const finalBidPrice = costBreakdown.totalCost * (1 + appliedMargin);

    // 3. Save the bid to the database
    const bid = await prisma.bid.create({
      data: {
        companyId,
        clientName,
        description: description ?? '',
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

  } catch (error) {
    // Engine errors (e.g. circular BOM, uncostable item) are written in plain
    // English and safe to surface; anything else gets a generic message.
    const message =
      error instanceof Error && error.message
        ? error.message
        : 'Bid generation failed for an unknown reason. Try again, and check the item catalog if it persists.';
    console.error('Bid generation error:', error);
    return NextResponse.json({ error: message }, { status: 422 });
  }
}
