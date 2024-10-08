import fastify, { FastifyInstance } from 'fastify'

import { healthCheckRoutes } from './http/controllers/healthCheck/routes'

export const app: FastifyInstance = fastify()

app.register(healthCheckRoutes, { prefix: 'api' })
