import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'
import { faker } from '@faker-js/faker'

import { app } from 'src/infra/app'
import { prisma } from 'src/infra/database/connection'

describe('Search CEP Use Case (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to search CEP', async () => {
    const cep = '12345678'

    await prisma.cep.create({
      data: {
        cep,
        rua: faker.location.street(),
        bairro: faker.location.streetAddress(),
        cidade: faker.location.city(),
        estado: faker.location.state(),
      },
    })

    await request(app.server).post('/api/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    const responseAuth = await request(app.server)
      .post('/api/authenticate')
      .send({
        email: 'johndoe@example.com',
        password: '12345678',
      })

    const { access_token } = responseAuth.body

    const response = await request(app.server)
      .get(`/api/cep/${cep}`)
      .set('Authorization', `Bearer ${access_token}`)
      .send()

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual(
      expect.objectContaining({
        endereco: {
          cep,
          rua: expect.any(String),
          bairro: expect.any(String),
          cidade: expect.any(String),
          estado: expect.any(String),
        },
      }),
    )
  })
})
