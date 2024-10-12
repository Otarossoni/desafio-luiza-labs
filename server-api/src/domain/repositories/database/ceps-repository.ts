import { Cep } from '@prisma/client'

export interface CepsRepository {
  findByCepList(cepsList: string[]): Promise<Cep[]>
}
