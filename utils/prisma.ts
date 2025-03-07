import { PrismaClient } from "@prisma/client";

// Global is a built-in JS object that persists across module reloads. (NextJS reloads files when changed)
// Allows us to store Prisma inside global, so it doesn’t get recreated unnecessarily.
// as unknown as { prisma?: PrismaClient } is TypeScript casting, ensuring that global can hold a prisma instance.
const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Checks is there is a prisma instance inside global. If not, create a new prisma client.
export const prisma = globalForPrisma.prisma || new PrismaClient();

// In development (NODE_ENV !== "production"), we store Prisma inside global
// Why? Because Next.js hot-reloads files in development, and this prevents Prisma from being re-created on every file change.
// In production, we don’t use global because the app doesn't hot-reload in production, so there's no risk of multiple instances.
if (process.env.NODE_ENV !== "production") globalForPrisma.prisma = prisma;
