import { CepInternal } from 'src/domain/models/cep-internal'

export interface ExternalCepsRepository {
  findByCep(cep: string): Promise<CepInternal | null>
}
