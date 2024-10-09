import { PrismaClient } from '@prisma/client'
import { env } from '../env/variables'

export const prisma = new PrismaClient({
  log: env.NODE_ENV === 'development' ? ['query', 'error'] : [],
})
