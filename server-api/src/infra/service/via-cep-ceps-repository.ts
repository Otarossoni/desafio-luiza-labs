import { AxiosRequestConfig, AxiosResponse } from 'axios'

import { env } from 'src/infra/env/variables'
import { makeRequest } from '../utils/make-request'

import { ExternalCepsRepository } from 'src/domain/repositories/service/external-ceps-repository'
import { CepInternal } from 'src/domain/models/cep-internal'

export interface ViaCepResponse {
  cep: string
  logradouro: string
  complemento: string
  unidade: string
  bairro: string
  localidade: string
  uf: string
  estado: string
  regiao: string
  ibge: string
  gia: string
  ddd: string
  siafi: string
}

export class ViaCepCepsRepository implements ExternalCepsRepository {
  async findByCep(cep: string): Promise<CepInternal> {
    const requestOptions: AxiosRequestConfig = {
      method: 'GET',
      url: `${env.VIA_CEP_API_URL}/${cep}/json`,
    }

    const viaCepResponse: AxiosResponse<ViaCepResponse> =
      await makeRequest(requestOptions)

    if (!viaCepResponse.data.cep) {
      return null
    }

    return {
      cep,
      rua: viaCepResponse.data.logradouro,
      bairro: viaCepResponse.data.bairro,
      cidade: viaCepResponse.data.localidade,
      estado: viaCepResponse.data.estado,
    }
  }
}
