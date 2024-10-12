import {
  CacheCepsRepository,
  CepInternal,
} from 'src/domain/repositories/cache/cache-ceps-repository'

export class InMemoryCacheCepsRepository implements CacheCepsRepository {
  public items = new Map()

  async createCep(cep: string, address: CepInternal) {
    this.items[cep] = JSON.stringify(address)
  }

  async findByCep(cep: string) {
    const address = this.items[cep]
    return address ? JSON.parse(address) : null
  }
}
