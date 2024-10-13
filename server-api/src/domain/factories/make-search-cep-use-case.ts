import { PrismaCepsRepository } from 'src/infra/database/prisma/prisma-ceps-repository'
import { RedisCepsRepository } from 'src/infra/cache/redis/redis-ceps-repository'
import { ViaCepCepsRepository } from 'src/infra/service/via-cep-ceps-repository'

import { SearchCepUseCase } from '../use-cases/search-cep'

export function makeSearchCepUseCase() {
  const dbCepsRepository = new PrismaCepsRepository()
  const cacheCepsRepository = new RedisCepsRepository()
  const viaCepCepsRepository = new ViaCepCepsRepository()

  const searchCepUseCase = new SearchCepUseCase(
    dbCepsRepository,
    cacheCepsRepository,
    viaCepCepsRepository,
  )

  return searchCepUseCase
}
