import { randomUUID } from 'node:crypto'

import { expect, describe, it, beforeEach } from 'vitest'
import { faker } from '@faker-js/faker'

import { SearchCepUseCase } from './search-cep'

import { InMemoryCepsRepository } from 'test/repositories/database/in-memory-ceps-repository'

import { ResourceNotFoundError } from './errors/resource-not-found-error'
import { ResourceInvalidError } from './errors/resource-invalid-error'

let cepsRepository: InMemoryCepsRepository
let sut: SearchCepUseCase

describe('Search CEP Use Case', () => {
  beforeEach(() => {
    cepsRepository = new InMemoryCepsRepository()
    sut = new SearchCepUseCase(cepsRepository)
  })

  it('should be able to search a Address by CEP', async () => {
    const newAddress = {
      id: randomUUID(),
      created_at: new Date(),
      cep: '12345678',
      rua: faker.location.street(),
      bairro: faker.location.streetAddress(),
      cidade: faker.location.city(),
      estado: faker.location.state(),
    }

    cepsRepository.items.push(newAddress)

    const result = await sut.execute({ cep: '12345678' })

    expect(result.isRight()).toEqual(true)
    expect(cepsRepository.items).toHaveLength(1)
    expect(result.value).toEqual(
      expect.objectContaining({
        rua: newAddress.rua,
        bairro: newAddress.bairro,
        cidade: newAddress.cidade,
        estado: newAddress.estado,
      }),
    )
  })

  it('should be able to search a address with an imperfect CEP code', async () => {
    const newAddress = {
      id: randomUUID(),
      created_at: new Date(),
      cep: '00000000',
      rua: faker.location.street(),
      bairro: faker.location.streetAddress(),
      cidade: faker.location.city(),
      estado: faker.location.state(),
    }

    cepsRepository.items.push(newAddress)

    const result = await sut.execute({ cep: '12345678' })

    expect(result.isRight()).toEqual(true)
    expect(cepsRepository.items).toHaveLength(1)
    expect(result.value).toEqual(
      expect.objectContaining({
        rua: newAddress.rua,
        bairro: newAddress.bairro,
        cidade: newAddress.cidade,
        estado: newAddress.estado,
      }),
    )
  })

  it('should not be able to search a address with wrong CEP code', async () => {
    cepsRepository.items.push({
      created_at: new Date(),
      cep: '12345678',
      rua: faker.location.street(),
      bairro: faker.location.streetAddress(),
      cidade: faker.location.city(),
      estado: faker.location.state(),
    })

    const result = await sut.execute({ cep: '00000000' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceNotFoundError)
  })

  it('should not be able to search a address with invalid CEP code', async () => {
    cepsRepository.items.push({
      created_at: new Date(),
      cep: '12345678',
      rua: faker.location.street(),
      bairro: faker.location.streetAddress(),
      cidade: faker.location.city(),
      estado: faker.location.state(),
    })

    const result = await sut.execute({ cep: 'AAAAAAAA' })

    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(ResourceInvalidError)
  })
})
