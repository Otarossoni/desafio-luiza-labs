import { DBCepsRepository } from 'src/domain/repositories/database/db-ceps-repository'

import { prisma } from '../connection'

export class PrismaCepsRepository implements DBCepsRepository {
  async findByCepList(cepsList: string[]) {
    const cepsFound = await prisma.cep.findMany({
      where: {
        cep: {
          in: cepsList,
        },
      },
      orderBy: {
        cep: 'desc', // Para sempre deixar os CEPs mais parecidos com o original por primeiro na lista
      },
    })

    return cepsFound
  }
}
