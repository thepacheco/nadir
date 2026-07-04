import { PrismaClient } from '@prisma/client';

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// DATABASE_URL, when set, overrides the schema's default (file:./dev.db resolved
// next to schema.prisma). The test harness uses this to run against a scratch
// copy so the committed dev.db never gets mutated by a test run.
// Query logging stays off in every mode: query logs contain customer data values.
export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    ...(process.env.DATABASE_URL ? { datasourceUrl: process.env.DATABASE_URL } : {}),
    log: ['warn', 'error'],
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma;
