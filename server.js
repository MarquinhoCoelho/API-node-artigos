/* import { createServer } from 'node:http'

const server = createServer((request, response) => {
  console.log('oiawdwd');

  return response.end();
});

server.listen(3333); */


import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js';

const server = fastify();
const database = new DatabasePostgres;

// endpoints
server.get('/artigos', async (request, reply) => {
  const search = request.query.search;
  const artigos = await database.read(search);
  return artigos;
});

server.post('/artigos', async (request, reply) => {
  const { nome, descricao, conteudo, imagem, github } = request.body;

  console.log(request.body);

  await database.create({
    nome: nome,
    descricao: descricao,
    conteudo: conteudo,
    imagem: imagem,
    github: github
  });

  // 201 significa que algo foi criado
  return reply.status(201).send();
});

server.put('/artigos/:id', async (request, reply) => {
  const artigoId = request.params.id;
  const { nome, descricao, conteudo, imagem, github } = request.body;
  
  const alteracoes = {
    nome: nome,
    descricao: descricao,
    conteudo: conteudo,
    imagem: imagem,
    github: github
  }
  await database.update(artigoId, alteracoes);

  // 204 significa que tem uma resposta mas que não tem um conteúdo nessa resposta
  return reply.status(204);
});

server.delete('/artigos/:id', async (request, reply) => {
  const artigoId = request.params.id;
  await database.delete(artigoId);

  // 204 significa que tem uma resposta mas que não tem um conteúdo nessa resposta
  return reply.status(204).send();
});

server.listen({
  host: '0.0.0.0',
  port: process.env.PORT ?? 3333,
})