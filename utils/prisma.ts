import { PrismaClient } from "@prisma/client";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Function to regenerate the Prisma connection
export function regeneratePrismaConnection() {
  // Clear the existing Prisma Client instance
  globalForPrisma.prisma = undefined;

  // Create a new Prisma Client instance
  const newPrismaClient = new PrismaClient();

  // Store the new instance in global if in development
  if (process.env.NODE_ENV !== "production") {
    globalForPrisma.prisma = newPrismaClient;
  }

  return newPrismaClient;
}

// Export the Prisma Client instance
export const prisma = globalForPrisma.prisma || regeneratePrismaConnection();
