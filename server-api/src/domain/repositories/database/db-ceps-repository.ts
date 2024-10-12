import { Cep } from '@prisma/client'

export interface DBCepsRepository {
  findByCepList(cepsList: string[]): Promise<Cep[]>
}
