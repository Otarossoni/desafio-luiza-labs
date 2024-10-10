export const authenticateSwagger = {
  description: 'Rota para autenticação de usuário existente',
  tags: ['Usuário'],
  summary: 'Rota para autenticação de usuário existente',
  body: {
    type: 'object',
    properties: {
      email: {
        type: 'string',
        description: 'E-mail do usuário',
      },
      password: {
        type: 'string',
        description: 'Senha do usuário',
      },
    },
  },
  response: {
    200: {
      description: 'Sucesso, usuário autenticado',
      type: 'object',
      properties: {
        access_token: {
          type: 'string',
          description: 'Access token do usuário',
        },
      },
    },
    401: {
      description: 'Usuário não autorizado',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      description: 'Internal server error response',
      type: 'string',
    },
  },
}
