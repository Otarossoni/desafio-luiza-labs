import fastify, { FastifyInstance } from 'fastify'

import { healthCheckRoutes } from './http/controllers/healthCheck/routes'
import { userRoutes } from './http/controllers/users/routes'
import { cepRoutes } from './http/controllers/address/routes'

import { corsConfig } from './config/cors-config'
import { swaggerConfig } from './config/swagger-config'
import { logHandlerConfig } from './config/log-handler-config'
import { errorHandlerConfig } from './config/error-handler'

export const app: FastifyInstance = fastify()

corsConfig(app)
swaggerConfig(app)

app.register(healthCheckRoutes, { prefix: 'api' })
app.register(userRoutes, { prefix: 'api' })
app.register(cepRoutes, { prefix: 'api' })

logHandlerConfig(app)
errorHandlerConfig(app)
