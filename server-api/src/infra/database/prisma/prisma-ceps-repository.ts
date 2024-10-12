import { prisma } from '../connection'

import { CepsRepository } from 'src/domain/repositories/database/ceps-repository'

export class PrismaCepsRepository implements CepsRepository {
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
