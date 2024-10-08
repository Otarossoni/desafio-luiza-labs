export const healthCheckSwagger = {
  description: 'Rota da saúde da aplicação e dos serviços que é dependente',
  tags: ['Health Check'],
  summary: 'Rota para checar a saúde da aplicação',
  response: {
    200: {
      description: 'Sucesso',
      type: 'object',
      properties: {
        status: { type: 'string', description: 'Status da API' },
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
      type: 'string',
    },
  },
}
