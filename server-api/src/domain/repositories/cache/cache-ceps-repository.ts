import { CepInternal } from 'src/domain/models/cep-internal'

export interface CacheCepsRepository {
  createCep(cep: string, address: CepInternal): Promise<void>
  findByCep(cep: string): Promise<CepInternal | null>
}
