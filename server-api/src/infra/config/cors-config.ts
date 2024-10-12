import { FastifyInstance } from 'fastify'
import fastifyCors from '@fastify/cors'

export function corsConfig(app: FastifyInstance) {
  app.register(fastifyCors, {
    origin: true,
  })
}
