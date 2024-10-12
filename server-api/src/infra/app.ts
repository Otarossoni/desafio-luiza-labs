import fastify, { FastifyInstance } from 'fastify'
import fastifyCors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'

import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

import { ZodError } from 'zod'
import { fromError } from 'zod-validation-error'

import jwt from 'jsonwebtoken'

import { env } from './env/variables'

import { healthCheckRoutes } from './http/controllers/healthCheck/routes'
import { userRoutes } from './http/controllers/users/routes'
import { cepRoutes } from './http/controllers/address/routes'

import { NewRelicLogsRepository } from './service/new-relic-logs-repository'
import { Log } from 'src/domain/repositories/service/logs-repository'

Sentry.init({
  dsn: env.DNS_SENTRY,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  attachStacktrace: true,
})

export const app: FastifyInstance = fastify()

app.register(fastifyCors, {
  origin: true,
})

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
app.register(userRoutes, { prefix: 'api' })
app.register(cepRoutes, { prefix: 'api' })

app.addHook('onSend', async (request, response, responseBody) => {
  const newLog: Log = {
    level: 0,
    userId: '',
    path: request.url,
    requestBody: JSON.stringify(request.body),
    responseBody: JSON.stringify(responseBody),
  }

  if (response.statusCode !== 200 && response.statusCode !== 201) {
    newLog.level = 1
  }

  if (request.headers?.authorization?.split(' ')[1] !== '') {
    const jwtDecoded = jwt.decode(request.headers?.authorization?.split(' ')[1])

    if (typeof jwtDecoded !== 'string') {
      newLog.userId = jwtDecoded?.payload?.sub ?? ''
    }
  }

  const logsRepository = new NewRelicLogsRepository()
  logsRepository.log(newLog)
})

app.setErrorHandler((error, _request, reply) => {
  console.log(error)
  if (error instanceof ZodError) {
    return reply.status(400).send({
      message: 'Validation error',
      issues: fromError(error).details,
    })
  }

  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    Sentry.captureException(error)
  }

  return reply
    .status(500)
    .send({ message: 'Internal server error', issues: [error.message] })
})
