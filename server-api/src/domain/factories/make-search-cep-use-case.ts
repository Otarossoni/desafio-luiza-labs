import { PrismaCepsRepository } from 'src/infra/database/prisma/prisma-ceps-repository'

import { SearchCepUseCase } from '../use-cases/search-cep'

export function makeSearchCepUseCase() {
  const cepsRepository = new PrismaCepsRepository()

  const searchCepUseCase = new SearchCepUseCase(cepsRepository)

  return searchCepUseCase
}
