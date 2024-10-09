import { prisma } from '../database/connection'

interface checkDatabaseAvailabilityParams {
  logError: boolean
}

export async function checkDatabaseAvailability({
  logError,
}: checkDatabaseAvailabilityParams): Promise<string> {
  try {
    await prisma.$queryRaw`SELECT 1`

    return 'OK'
  } catch (err) {
    if (logError) {
      console.error(err)
    }

    return 'NOT CONNECTED'
  }
}
