import { ExternalCepsRepository } from 'src/domain/repositories/service/external-ceps-repository'

export class InMemoryExternalCepsRepository implements ExternalCepsRepository {
  public items = []

  async findByCep(cep: string) {
    const cepFound = this.items.find((item) => item.cep === cep)

    if (!cepFound) {
      return null
    }

    return {
      cep,
      rua: cepFound.logradouro,
      bairro: cepFound.bairro,
      cidade: cepFound.localidade,
      estado: cepFound.estado,
    }
  }
}
