import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeAuthenticateUseCase } from '../../../../domain/factories/make-authenticate-use-case'

import { WrongCredentialsError } from '../../../../domain/use-cases/errors/wrong-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(8),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  const authenticateUseCase = makeAuthenticateUseCase()
  const result = await authenticateUseCase.execute({ email, password })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof WrongCredentialsError) {
      return reply.status(401).send({ message: error.message })
    }
  }

  return reply.status(200).send(result.value)
}
