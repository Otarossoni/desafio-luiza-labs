import { FastifyInstance } from 'fastify'

import { verifyJwt } from '../../middlewares/verify-jwt'

import { searchCep } from './search-cep'
import { searchCepSwagger } from './search-cep.swagger'

export async function cepRoutes(app: FastifyInstance) {
  app.get(
    '/cep/:cep',
    { schema: searchCepSwagger, onRequest: [verifyJwt] },
    searchCep,
  )
}
