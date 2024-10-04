import { PrismaClient } from "@prisma/client";

declare global {
  //@ts-ignore
  var prisma: PrismaClient | undefined;
}

const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export const db = prisma;
