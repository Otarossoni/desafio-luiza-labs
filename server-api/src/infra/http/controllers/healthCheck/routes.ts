import { FastifyInstance } from 'fastify'
import { healthCheck } from './health-check'

export async function healthCheckRoutes(app: FastifyInstance) {
  app.get('/', healthCheck)
}
