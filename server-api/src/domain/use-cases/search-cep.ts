import { Either, left, right } from 'src/core/errors/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ResourceInvalidError } from './errors/resource-invalid-error'

import { CepInternal } from '../models/cep-internal'

import { DBCepsRepository } from '../repositories/database/db-ceps-repository'
import { CacheCepsRepository } from '../repositories/cache/cache-ceps-repository'
import { ExternalCepsRepository } from '../repositories/service/external-ceps-repository'

interface SearchCepUseCaseRequest {
  cep: string
}

type SearchCepUseCaseResponse = Either<
  ResourceInvalidError | ResourceNotFoundError,
  CepInternal
>

export class SearchCepUseCase {
  constructor(
    private dbCepsRepository: DBCepsRepository,
    private cacheCepsRepository: CacheCepsRepository,
    private externalCepsRepository: ExternalCepsRepository,
  ) {}

  async execute({
    cep,
  }: SearchCepUseCaseRequest): Promise<SearchCepUseCaseResponse> {
    if (!this.validateCep(cep)) {
      return left(new ResourceInvalidError('CEP'))
    }

    const possibleCeps = this.generatePossibleCeps(cep)

    for (const possibleCep of possibleCeps) {
      const cacheAddress = await this.cacheCepsRepository.findByCep(possibleCep)

      if (cacheAddress) {
        return right(cacheAddress)
      }
    }

    const dbAddresses = await this.dbCepsRepository.findByCepList(possibleCeps)

    const dbAddress =
      dbAddresses.find((addr) => addr.cep === cep) || dbAddresses[0]

    if (!dbAddress) {
      const externalAddress = await this.externalCepsRepository.findByCep(cep)

      if (!externalAddress) {
        return left(new ResourceNotFoundError('CEP'))
      }

      this.dbCepsRepository.createCep(externalAddress.cep, externalAddress)
      this.cacheCepsRepository.createCep(externalAddress.cep, externalAddress)

      return right(externalAddress)
    }

    this.cacheCepsRepository.createCep(dbAddress.cep, dbAddress)

    return right(dbAddress)
  }

  private generatePossibleCeps(cep: string): string[] {
    const possibleCeps = [cep]

    for (let i = cep.length - 1; i >= 0; i--) {
      const modifiedCep = cep.substring(0, i) + '0'.repeat(cep.length - i)
      possibleCeps.push(modifiedCep)
    }

    return possibleCeps
  }

  private validateCep(cep: string): boolean {
    const regexCEP = /^[0-9]{8}$/

    return regexCEP.test(cep.replace(/\D/g, ''))
  }
}
