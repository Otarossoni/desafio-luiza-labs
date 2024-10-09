import { FastifyInstance } from 'fastify'

import { healthCheck } from './health-check'
import { healthCheckSwagger } from './health-check.swagger'

export async function healthCheckRoutes(app: FastifyInstance) {
  app.get('/', { schema: healthCheckSwagger }, healthCheck)
}
