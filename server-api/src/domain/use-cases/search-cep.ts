import { Either, left, right } from 'src/core/errors/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ResourceInvalidError } from './errors/resource-invalid-error'

import { DBCepsRepository } from '../repositories/database/db-ceps-repository'
import {
  CacheCepsRepository,
  CepInternal,
} from '../repositories/cache/cache-ceps-repository'

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
  ) {}

  async execute({
    cep,
  }: SearchCepUseCaseRequest): Promise<SearchCepUseCaseResponse> {
    if (!this.validateCep(cep)) {
      return left(new ResourceInvalidError('CEP'))
    }

    const possibleCeps = this.generatePossibleCeps(cep)

    for (const possibleCep of possibleCeps) {
      const address = await this.cacheCepsRepository.findByCep(possibleCep)

      if (address) {
        return right(address)
      }
    }

    const addresses = await this.dbCepsRepository.findByCepList(possibleCeps)

    const address = addresses.find((addr) => addr.cep === cep) || addresses[0]

    if (!address) {
      return left(new ResourceNotFoundError('CEP'))
    }

    this.cacheCepsRepository.createCep(address.cep, address)

    return right({
      cep: address.cep,
      rua: address.rua,
      bairro: address.bairro,
      cidade: address.cidade,
      estado: address.estado,
    })
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
