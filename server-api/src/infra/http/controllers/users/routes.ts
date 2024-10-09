import { FastifyInstance } from 'fastify'

import { register } from './register'
import { registerSwagger } from './register.swagger'

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', { schema: registerSwagger }, register)
}
