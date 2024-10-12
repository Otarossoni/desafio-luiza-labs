export interface CepInternal {
  cep: string
  rua: string
  bairro: string
  cidade: string
  estado: string
}

export interface CacheCepsRepository {
  createCep(cep: string, address: CepInternal): void
  findByCep(cep: string): Promise<CepInternal>
}
