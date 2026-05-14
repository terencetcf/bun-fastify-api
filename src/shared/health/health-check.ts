import { prisma } from '../db/prisma';

export const healthCheck = async (): Promise<void> => {
  try {
    await prisma.$queryRaw`SELECT 1`;
  } catch (e: any) {
    throw new Error(`Health check failed: ${e.message}`);
  }
};
