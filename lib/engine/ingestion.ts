import { prisma } from '../prisma';

export interface IngestionPayload {
  companyName: string;
  industry: string;
  items: {
    name: string;
    type: string;
    baseCost?: number;
    unit: string;
    bom?: {
      childName: string;
      quantity: number;
    }[];
  }[];
}

/**
 * Ingests a structured JSON payload of items and BOMs (the "Data Synthesis"
 * step of Phase 2). Idempotent: re-sending the same payload updates items in
 * place and rebuilds their BOM rows instead of duplicating them, so a retried
 * upload or a double-clicked import button can't corrupt the cost model.
 */
export async function ingestHistoricalData(payload: IngestionPayload) {
  // 1. Create or get company
  let company = await prisma.company.findFirst({
    where: { name: payload.companyName },
  });

  if (!company) {
    company = await prisma.company.create({
      data: {
        name: payload.companyName,
        industry: payload.industry,
      },
    });
  }

  // 2. Upsert all items first (without BOMs)
  const itemMap = new Map<string, string>(); // name -> id

  for (const itemData of payload.items) {
    const existing = await prisma.item.findFirst({
      where: { companyId: company.id, name: itemData.name },
    });

    const item = existing
      ? await prisma.item.update({
          where: { id: existing.id },
          data: {
            type: itemData.type,
            baseCost: itemData.baseCost ?? null,
            unit: itemData.unit,
          },
        })
      : await prisma.item.create({
          data: {
            companyId: company.id,
            name: itemData.name,
            type: itemData.type,
            baseCost: itemData.baseCost ?? null,
            unit: itemData.unit,
          },
        });
    itemMap.set(item.name, item.id);
  }

  // 3. Rebuild BOM relationships for every parent named in the payload
  const parentIds = payload.items
    .filter((i) => i.bom && i.bom.length > 0)
    .map((i) => itemMap.get(i.name))
    .filter((id): id is string => !!id);

  await prisma.bOM.deleteMany({ where: { parentId: { in: parentIds } } });

  for (const itemData of payload.items) {
    if (itemData.bom && itemData.bom.length > 0) {
      const parentId = itemMap.get(itemData.name);
      if (!parentId) continue;

      for (const bomItem of itemData.bom) {
        const childId = itemMap.get(bomItem.childName);
        if (!childId) {
          throw new Error(`BOM child item not found in payload: ${bomItem.childName}`);
        }

        await prisma.bOM.create({
          data: {
            parentId,
            childId,
            quantity: bomItem.quantity,
          },
        });
      }
    }
  }

  return { success: true, companyId: company.id, itemsIngested: itemMap.size };
}
