import { FastifyRequest, FastifyReply } from 'fastify'
import { z } from 'zod'

import { makeSearchCepUseCase } from 'src/domain/factories/make-search-cep-use-case'

import { ResourceInvalidError } from 'src/domain/use-cases/errors/resource-invalid-error'
import { ResourceNotFoundError } from 'src/domain/use-cases/errors/resource-not-found-error'

export async function searchCep(request: FastifyRequest, reply: FastifyReply) {
  const searchCepParamsSchema = z.object({
    cep: z.string().transform((value) => value.replaceAll('-', '')),
  })

  const { cep } = searchCepParamsSchema.parse(request.params)

  const searchCepUseCase = makeSearchCepUseCase()
  const result = await searchCepUseCase.execute({ cep })

  if (result.isLeft()) {
    const error = result.value

    if (error instanceof ResourceInvalidError) {
      return reply.status(400).send({ message: error.message })
    }

    if (error instanceof ResourceNotFoundError) {
      return reply.status(404).send({ message: error.message })
    }
  }

  return reply.status(200).send({ endereco: result.value })
}
