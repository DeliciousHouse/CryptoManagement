import { PrismaClient } from '@prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'
import { Pool } from 'pg'

const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined
}

const pool = process.env.DATABASE_URL
  ? new Pool({ connectionString: process.env.DATABASE_URL })
  : null

const adapter = pool ? new PrismaPg(pool) : undefined

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient(adapter ? { adapter } : undefined)

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

