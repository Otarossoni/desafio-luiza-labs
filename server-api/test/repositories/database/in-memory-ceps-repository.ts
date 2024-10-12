import { Cep } from '@prisma/client'
import { CepsRepository } from 'src/domain/repositories/database/ceps-repository'

export class InMemoryCepsRepository implements CepsRepository {
  public items: Cep[] = []

  async findByCepList(cepsList: string[]) {
    const cepsFound = this.items.filter((item) => cepsList.includes(item.cep))

    return cepsFound.sort((a, b) => b.cep.localeCompare(a.cep))
  }
}
