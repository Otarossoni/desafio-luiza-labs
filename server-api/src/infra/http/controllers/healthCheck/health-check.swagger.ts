export const healthCheckSwagger = {
  description: 'Rota da saúde da aplicação e dos serviços que é dependente',
  tags: ['Health Check'],
  summary: 'Rota para checar a saúde da aplicação',
  response: {
    200: {
      description: 'Sucesso',
      type: 'object',
      properties: {
        apiStatus: { type: 'string', description: 'Status da API' },
        databaseStatus: {
          type: 'string',
          description: 'Status da conexão com o banco de dados',
        },
        cacheStatus: {
          type: 'string',
          description: 'Status da conexão com o serviço de cache',
        },
        version: { type: 'string', description: 'Versão da API' },
        uptime: {
          type: 'number',
          description: 'Tempo que a API está de online',
        },
        timestamp: { type: 'string', description: 'Data/Hora da requisição' },
        environment: { type: 'string', description: 'Ambiente da API' },
      },
    },
    500: {
      description: 'Internal server error response',
    },
  },
}
