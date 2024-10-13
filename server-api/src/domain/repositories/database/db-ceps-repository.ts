import { Cep } from '@prisma/client'
import { CepInternal } from 'src/domain/models/cep-internal'

export interface DBCepsRepository {
  createCep(cep: string, address: CepInternal): void
  findByCepList(cepsList: string[]): Promise<Cep[]>
}
