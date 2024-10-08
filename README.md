<div id="header">
   <p align="center">
      <img src="/assets/logo/luizalabs-logo.png" width="120px" align="center" alt="luizalabs-logo" />
   <h3 align="center">
      <span style="color:#2dccfe">Desafio</span> 
      <span style="color:#20b7fe">Técnico</span> 
      <span style="color:#0e9cfe">Luiza</span>
      <span style="color:#0289ff">Labs</span>
      <br>
      <span style="font-size: 20px; color: #434343">Consulta CEP</span>
   </h3>
   </p>
</div>

> Desafio técnico do processo seletivo da [Luiza Labs](https://www.linkedin.com/company/luizalabs). Trata-se de um serviço de consulta de CEP, cujo objetivo é permitir que o usuário obtenha seu endereço a partir do CEP.

---

### :page_with_curl: Índice

1. `[Prática]` Serviço de Consulta de CEP
   * [*1* - O Projeto](#oprojeto)
      * [*1.1* - Linguagem](#linguagem)
      * [*1.2* - Arquitetura](#arquitetura)
      * [*1.3* - Padrões](#padroes)
        * [*1.3.1* - Use Case](#use-case)
        * [*1.3.2* - Repository](#repository)
        * [*1.3.3* - Factory](#factory)
      * [*1.4* - Estratégia](#estrategia)
        * [*1.4.1* - Performance](#performance)
        * [*1.4.2* - Organização](#organizacao)
   * [*2* - Tecnologias](#tecnologias)
      * [*2.1* - Aplicação](#aplicacao)
      * [*2.1* - Externos](#externos)

---

<span id="oprojeto"></span> 

### :star2: O Projeto

Este projeto é um serviço de consulta de CEP (Código de Endereçamento Postal) que permite aos usuários obter informações de seu endereço (rua, bairro, cidade e estado) a partir de um CEP fornecido. O sistema inclui autenticação de usuários, conferindo que apenas usuários registrados possam acessar as funcionalidades do serviço.

<span id="linguagem"></span> 

##### :bookmark: Linguagem

A linguagem escolhida para o desafio foi [Javascript](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript), interpretado por [Node.js](https://nodejs.org/pt) e integrado com [Typescript](https://www.typescriptlang.org/) para segurança de tipo em tempo de desenvolvimento.
Essa escolha foi feita devido a:

- É a linguagem que melhor domino atualmente;
- Seu código possui fácil entendimento, melhorando a manutenção da aplicação;
- A linguagem consegue estar presente tanto no lado do cliente, quanto no lado do servidor;
- O event loop do Node.js, que permite uma execução não bloqueante, se mostra eficiente em uma aplicação onde várias requisições precisam ser atendidas simultaneamente; 
- Em conjunto com o Typescript, se torna uma linguagem com tipagem de dados, melhorando a segurança no tempo de execução, diminuindo erros inesperados.

<span id="arquitetura"></span> 

##### :european_castle: Arquitetura

A arquitetura escolhida se baseia na utilização de conceitos de *Clean Code* e principalmente *SOLID* como por exemplo a *Injeção de Dependência* e o *Princípio da Responsabilidade Única*. De forma geral, permite implementação de testes, tanto das funções mais básicas (testes unitários), quanto de testes de funções completas(testes end-to-end).

<span id="padroes"></span> 

##### :no_entry: Padrões

Os padrões principais são:

- <span id="use-case"></span> *Use Case*: É a camada responsável pela abstração de toda a lógica principal e regras de negócio da aplicação;
- <span id="repository"></span> *Repository*: É uma camada responsável pela interação da aplicação com o mundo exterior, sejam serviços externos ou aplicações de armazenamento de dados, como os próprios bancos de dados e cache;
- <span id="factory"></span> *Factory*: Padrão responsável por "construir" as funcionalidades, integrando os use cases aos repositories.

<span id="estrategia"></span> 

##### :brain: Estratégia

Por mais que o projeto tenha um pequeno escopo, foquei em dois principais fatores, organização e performance. Pois, mesmo com poucas funcionalidades, qualquer descuido pode gerar efeitos indesejados.

- <span id="organizacao"></span> *Organização*: utilizando os padrões já citados, organizei a aplicação para cada parte ter sua função e que as mais internas não sofressem impacto ou interferência das mais externas; 
- <span id="performance"></span> *Performance*: alguns pequenas medidas foram tomadas para diminuir a quantidade de consultas no banco de dados, como:
  - Antes de buscar o endereço no banco de dados, uma consulta é feita no cache. Se as informações estiverem no cache, a busca no banco não é realizada. Caso o endereço não seja encontrado no cache, a busca é feita no banco de dados, e os dados obtidos são inseridos no cache para consultas futuras;
  - Para a obtenção de métricas, as informações são sempre buscadas no cache, e um cronjob atualiza esses dados a cada 30 segundos.

<span id="tecnologias"></span> 

##### :fire: Tecnologias

As tecnologias usadas, tanto na aplicação, como nos serviços com os quais ela interage.

- <span id="aplicacao"></span> *Aplicação*: 
  - [Node.js](https://nodejs.org/pt): O interpretador de Javascript para o lado do servidor; 
  - [Typescript](https://www.typescriptlang.org/): O superset que adiciona tipagem de dados ao Javascript;
  - [Fastify](https://fastify.dev/): O framework responsável por subir a API e gerenciar as rotas;
  - [Prisma](https://www.prisma.io/): O ORM com integração direta com Typescript responsável pela comunicação com o banco de dados PostgreSQL;
  - [Zod](https://zod.dev/): O pacote de validação de dados, usado para validar a entrada de dados na aplicação, seja pelas rotas, como variáveis de ambiente;
  - [JWT](https://jwt.io/): O método de validação de segurança entre cliente e servidor;
  - [Swagger](https://swagger.io/): A ferramenta de documentação de APIs;
  - [Vitest](https://vitest.dev/): O framework para execução de testes automatizados;
  - [CronJob](https://www.npmjs.com/package/cron): Um pacote para executar rotinas entre espaços de tempo configuráveis.
- <span id="externos"></span> *Externos*:
  - [Docker](https://www.docker.com/): Uma plataforma para gerenciamento de containers;
  - [PostgreSQL](https://www.postgresql.org/): Um banco de dados robusto e ope-source;
  - [Redis](https://redis.io/): Um banco de dados em memória, usado para cache;
  - [Sentry](https://sentry.io/welcome/): Uma plataforma para registro de erros não tratados da aplicação.