export interface Log {
  level: number // 0 - Normal / 1 - Error
  userId?: string
  path: string
  requestBody: string
  responseBody: string
}

export interface LogsRepository {
  log(data: Log): void
}
