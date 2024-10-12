import { FastifyInstance } from 'fastify'

import jwt from 'jsonwebtoken'

import { Log } from 'src/domain/repositories/service/logs-repository'
import { NewRelicLogsRepository } from '../service/new-relic-logs-repository'

export function logHandlerConfig(app: FastifyInstance) {
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
      const jwtDecoded = jwt.decode(
        request.headers?.authorization?.split(' ')[1],
      )

      if (typeof jwtDecoded !== 'string') {
        newLog.userId = jwtDecoded?.payload?.sub ?? ''
      }
    }

    const logsRepository = new NewRelicLogsRepository()
    logsRepository.log(newLog)
  })
}
