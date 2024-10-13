import { DBCepsRepository } from 'src/domain/repositories/database/db-ceps-repository'

import { prisma } from '../connection'

import { CepInternal } from 'src/domain/models/cep-internal'

export class PrismaCepsRepository implements DBCepsRepository {
  async createCep(cep: string, address: CepInternal) {
    await prisma.cep.create({
      data: {
        cep,
        rua: address.rua,
        bairro: address.bairro,
        cidade: address.cidade,
        estado: address.estado,
      },
    })
  }

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
