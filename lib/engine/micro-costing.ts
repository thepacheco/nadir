import { prisma } from '../prisma';

export interface BreakdownResult {
  itemId: string;
  name: string;
  unitCost: number;
  quantity: number;
  totalCost: number;
  components: BreakdownResult[];
}

/**
 * Calculates the true deterministic cost of an item by recursively
 * walking its Bill of Materials (BOM) in the database.
 * `ancestors` guards against BOM cycles (a data-entry error like
 * Meal → Tray → Meal), which would otherwise recurse forever.
 */
export async function calculateTrueCost(
  itemId: string,
  requestedQuantity: number = 1,
  ancestors: Set<string> = new Set(),
): Promise<BreakdownResult> {
  if (!Number.isFinite(requestedQuantity) || requestedQuantity <= 0) {
    throw new Error(`Quantity must be a positive number (got ${requestedQuantity}).`);
  }
  if (ancestors.has(itemId)) {
    throw new Error(
      `This item's bill of materials contains itself (directly or through a chain), so its cost can't be computed. Fix the circular component before bidding.`,
    );
  }

  const item = await prisma.item.findUnique({
    where: { id: itemId },
    include: {
      components: {
        include: {
          child: true,
        },
      },
    },
  });

  if (!item) {
    throw new Error(`Item not found: ${itemId}`);
  }

  // If this is a raw material, labor, or packaging with a base cost, it is the bottom of the tree.
  if (item.baseCost !== null) {
    return {
      itemId: item.id,
      name: item.name,
      unitCost: item.baseCost,
      quantity: requestedQuantity,
      totalCost: item.baseCost * requestedQuantity,
      components: [],
    };
  }

  // Otherwise, it's a finished good or sub-assembly. Recursively cost its components.
  if (item.components.length === 0) {
    throw new Error(
      `"${item.name}" has no base cost and no components — there is nothing to compute a cost from. Give it a base cost or a bill of materials.`,
    );
  }

  const componentBreakdowns: BreakdownResult[] = [];
  let totalComponentCost = 0;
  const path = new Set(ancestors).add(itemId);

  for (const bom of item.components) {
    const requiredQty = bom.quantity * requestedQuantity;
    const breakdown = await calculateTrueCost(bom.childId, requiredQty, path);
    componentBreakdowns.push(breakdown);
    totalComponentCost += breakdown.totalCost;
  }

  return {
    itemId: item.id,
    name: item.name,
    unitCost: totalComponentCost / requestedQuantity, // cost for 1 unit of this parent item
    quantity: requestedQuantity,
    totalCost: totalComponentCost,
    components: componentBreakdowns,
  };
}
