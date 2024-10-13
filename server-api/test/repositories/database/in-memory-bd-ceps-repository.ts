import { Cep } from '@prisma/client'
import { CepInternal } from 'src/domain/models/cep-internal'
import { DBCepsRepository } from 'src/domain/repositories/database/db-ceps-repository'

export class InMemoryDBCepsRepository implements DBCepsRepository {
  public items: Cep[] = []

  createCep(cep: string, address: CepInternal) {
    this.items.push({
      cep,
      rua: address.rua,
      bairro: address.bairro,
      cidade: address.cidade,
      estado: address.estado,
      created_at: new Date(),
    })
  }

  async findByCepList(cepsList: string[]) {
    const cepsFound = this.items.filter((item) => cepsList.includes(item.cep))

    return cepsFound.sort((a, b) => b.cep.localeCompare(a.cep))
  }
}
