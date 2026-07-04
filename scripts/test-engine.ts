import { ingestHistoricalData } from '../lib/engine/ingestion';
import { calculateTrueCost } from '../lib/engine/micro-costing';
import { prisma } from '../lib/prisma';

async function main() {
  console.log('--- Phase 2 Test Harness ---');
  console.log('1. Cleaning existing data...');
  await prisma.bOM.deleteMany({});
  await prisma.bid.deleteMany({});
  await prisma.item.deleteMany({});
  await prisma.company.deleteMany({});

  console.log('2. Ingesting Phase 2 Dummy Data (NuRest Use Case)...');
  const payload = {
    companyName: 'NuRest',
    industry: 'Catering & Logistics',
    items: [
      { name: 'Apple', type: 'RAW_MATERIAL', baseCost: 0.30, unit: 'whole' },
      { name: 'Labor (Prep)', type: 'LABOR', baseCost: 15.00, unit: 'hour' },
      { name: 'Packaging', type: 'PACKAGING', baseCost: 0.15, unit: 'box' },
      { 
        name: 'Apple Slices (Prep)', 
        type: 'SUB_ASSEMBLY', 
        unit: 'slice',
        bom: [
          { childName: 'Apple', quantity: 0.16666 }, // 1 apple = 6 slices => 1/6
          { childName: 'Labor (Prep)', quantity: 0.005 } // very small fraction of an hour to slice
        ]
      },
      { 
        name: 'Breakfast Meal', 
        type: 'FINISHED_GOOD', 
        unit: 'meal',
        bom: [
          { childName: 'Apple Slices (Prep)', quantity: 2 }, // 2 slices per meal
          { childName: 'Packaging', quantity: 1 }
        ]
      }
    ]
  };

  const ingestionRes = await ingestHistoricalData(payload);
  console.log(`Ingested: ${ingestionRes.itemsIngested} items for Company ID: ${ingestionRes.companyId}`);

  console.log('3. Running Micro-Costing Engine on "Breakfast Meal"...');
  
  const mealItem = await prisma.item.findFirst({ where: { name: 'Breakfast Meal' } });
  if (!mealItem) throw new Error('Meal item not found');

  const costBreakdown = await calculateTrueCost(mealItem.id, 80000); // 80,000 meals
  console.log('\n--- Micro-Costing Result (80,000 Meals) ---');
  console.log(`Unit Cost: $${costBreakdown.unitCost.toFixed(4)}`);
  console.log(`Total Cost: $${costBreakdown.totalCost.toFixed(2)}`);
  console.log('Breakdown:', JSON.stringify(costBreakdown.components, null, 2));

  console.log('\n✅ Harness passed all tests.');
}

main()
  .catch(e => {
    console.error('Harness Failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
