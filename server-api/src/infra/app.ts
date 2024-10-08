import fastify, { FastifyInstance } from 'fastify'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import { healthCheckRoutes } from './http/controllers/healthCheck/routes'

export const app: FastifyInstance = fastify()

app.register(fastifySwagger, {
  swagger: {
    info: {
      title: 'Desafio Técnico da Luiza Labs',
      description: 'Desafio Técnico da Luiza Labs',
      version: '1.0.0',
      contact: {
        email: 'otarossoni@gmail.com',
      },
    },
    securityDefinitions: {
      Bearer: {
        type: 'apiKey',
        name: 'Authorization',
        in: 'header',
      },
    },
  },
})
app.register(fastifySwaggerUi, {
  routePrefix: '/api-docs',
  theme: {
    title: 'API Desafio Técnico da Luiza Labs',
  },
})

app.register(healthCheckRoutes, { prefix: 'api' })
