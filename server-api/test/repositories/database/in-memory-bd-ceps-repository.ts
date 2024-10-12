import { Cep } from '@prisma/client'
import { DBCepsRepository } from 'src/domain/repositories/database/db-ceps-repository'

export class InMemoryDBCepsRepository implements DBCepsRepository {
  public items: Cep[] = []

  async findByCepList(cepsList: string[]) {
    const cepsFound = this.items.filter((item) => cepsList.includes(item.cep))

    return cepsFound.sort((a, b) => b.cep.localeCompare(a.cep))
  }
}
