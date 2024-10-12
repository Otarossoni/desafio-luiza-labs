export const searchCepSwagger = {
  description: 'Rota para buscar um endereço a partir de um CEP',
  tags: ['CEP'],
  security: [{ Bearer: [] }],
  summary: 'Rota para buscar um endereço a partir de um CEP',
  response: {
    200: {
      description: 'Sucesso, CEP encontrado',
      type: 'object',
      properties: {
        endereco: {
          type: 'object',
          description: 'Endereço do CEP buscado',
          properties: {
            cep: { type: 'string' },
            rua: { type: 'string' },
            bairro: { type: 'string' },
            cidade: { type: 'string' },
            estado: { type: 'string' },
          },
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
    },
  },
}
