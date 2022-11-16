import { PrismaClient } from "@prisma/client"

// Create pool connection
export const prisma = new PrismaClient()