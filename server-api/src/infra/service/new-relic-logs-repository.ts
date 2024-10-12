import { AxiosRequestConfig } from 'axios'

import { env } from 'src/infra/env/variables'
import { makeRequest } from '../utils/make-request'

import {
  Log,
  LogsRepository,
} from 'src/domain/repositories/service/logs-repository'

export class NewRelicLogsRepository implements LogsRepository {
  async log(data: Log) {
    const requestOptions: AxiosRequestConfig = {
      method: 'POST',
      url: `${env.NEW_RELIC_API_URL}?Api-Key=${env.NEW_RELIC_LICENSE_KEY}`,
      data,
    }

    return await makeRequest(requestOptions)
  }
}
