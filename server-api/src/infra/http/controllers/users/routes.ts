import { FastifyInstance } from 'fastify'

import { register } from './register'
import { registerSwagger } from './register.swagger'

import { authenticate } from './authenticate'
import { authenticateSwagger } from './authenticate.swagger'

export async function userRoutes(app: FastifyInstance) {
  app.post('/register', { schema: registerSwagger }, register)
  app.post('/authenticate', { schema: authenticateSwagger }, authenticate)
}
