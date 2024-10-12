import { FastifyReply, FastifyRequest } from 'fastify'
import jwt from 'jsonwebtoken'

import { env } from 'src/infra/env/variables'

export async function verifyJwt(request: FastifyRequest, reply: FastifyReply) {
  try {
    const access_token = request.headers?.authorization?.split(' ')[1] ?? ''

    jwt.verify(access_token, env.JWT_SECRET)
  } catch (err) {
    return reply.status(401).send({ message: 'Unauthorized' })
  }
}
