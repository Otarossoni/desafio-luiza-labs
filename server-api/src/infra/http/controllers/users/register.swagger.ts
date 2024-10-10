export const registerSwagger = {
  description: 'Rota de criação de novos usuários',
  tags: ['Usuário'],
  summary: 'Rota de criação de novos usuários',
  body: {
    type: 'object',
    properties: {
      name: {
        type: 'string',
        description: 'Nome do usuário',
      },
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
    201: {
      description: 'Sucesso, usuário criado',
      type: 'null',
    },
    409: {
      description: 'Usuário já existe',
      type: 'object',
      properties: {
        message: { type: 'string' },
      },
    },
    500: {
      description: 'Erro interno do servidor',
      type: 'string',
    },
  },
}
