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
 */
export async function calculateTrueCost(itemId: string, requestedQuantity: number = 1): Promise<BreakdownResult> {
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
  const componentBreakdowns: BreakdownResult[] = [];
  let totalComponentCost = 0;

  for (const bom of item.components) {
    const requiredQty = bom.quantity * requestedQuantity;
    const breakdown = await calculateTrueCost(bom.childId, requiredQty);
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
