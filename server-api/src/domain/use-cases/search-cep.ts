import { Either, left, right } from 'src/core/errors/either'
import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ResourceInvalidError } from './errors/resource-invalid-error'

import { CepsRepository } from '../repositories/database/ceps-repository'

interface SearchCepUseCaseRequest {
  cep: string
}

type SearchCepUseCaseResponse = Either<
  ResourceInvalidError | ResourceNotFoundError,
  {
    cep: string
    rua: string
    bairro: string
    cidade: string
    estado: string
  }
>

export class SearchCepUseCase {
  constructor(private cepsRepository: CepsRepository) {}

  async execute({
    cep,
  }: SearchCepUseCaseRequest): Promise<SearchCepUseCaseResponse> {
    if (!this.validateCep(cep)) {
      return left(new ResourceInvalidError('CEP'))
    }

    const possibleCeps = this.generatePossibleCeps(cep)

    const addresses = await this.cepsRepository.findByCepList(possibleCeps)

    const address = addresses.find((addr) => addr.cep === cep) || addresses[0]

    if (!address) {
      return left(new ResourceNotFoundError('CEP'))
    }

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
