import { redis } from '../connection'
import {
  CacheCepsRepository,
  CepInternal,
} from 'src/domain/repositories/cache/cache-ceps-repository'

export class RedisCepsRepository implements CacheCepsRepository {
  async createCep(cep: string, address: CepInternal) {
    await redis.set(cep, JSON.stringify(address))
  }

  async findByCep(cep: string) {
    const address = await redis.get(cep)
    if (address) {
      return JSON.parse(address)
    } else {
      return null
    }
  }
}
