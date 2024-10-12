import { FastifyInstance } from 'fastify'

import { ZodError } from 'zod'
import { fromError } from 'zod-validation-error'

import * as Sentry from '@sentry/node'
import { nodeProfilingIntegration } from '@sentry/profiling-node'

import { env } from '../env/variables'

Sentry.init({
  dsn: env.DNS_SENTRY,
  integrations: [nodeProfilingIntegration()],
  tracesSampleRate: 1.0,
  profilesSampleRate: 1.0,
  attachStacktrace: true,
})

export function errorHandlerConfig(app: FastifyInstance) {
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
}
