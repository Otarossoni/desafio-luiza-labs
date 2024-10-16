import { FastifyRequest, FastifyReply } from 'fastify'
import { env } from 'src/infra/env/variables'

import { checkDatabaseAvailability } from 'src/infra/env/database'
import { checkCacheAvailability } from 'src/infra/env/cache'

export async function healthCheck(
  _request: FastifyRequest,
  reply: FastifyReply,
) {
  const healthCheck = {
    apiStatus: 'OK',
    databaseStatus: await checkDatabaseAvailability({ logError: false }),
    cacheStatus: await checkCacheAvailability(),
    version: '1.0.0',
    uptime: process.uptime(),
    timestamp: new Date().toISOString(),
    environment: env.NODE_ENV,
  }

  return reply.status(200).send(healthCheck)
}
