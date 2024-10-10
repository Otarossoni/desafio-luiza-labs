import { afterAll, beforeAll, describe, expect, it } from 'vitest'
import request from 'supertest'

import { app } from 'src/infra/app'

describe('Authenticate Use Case (e2e)', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  it('should be able to authenticate', async () => {
    await request(app.server).post('/api/register').send({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '12345678',
    })

    const response = await request(app.server).post('/api/authenticate').send({
      email: 'johndoe@example.com',
      password: '12345678',
    })

    expect(response.statusCode).toEqual(200)
    expect(response.body).toEqual({
      access_token: expect.any(String),
    })
  })
})
