import { describe, it, expect, beforeAll, afterAll } from 'vitest';
import { fastify } from 'fastify';
import { DatabasePostgres } from '../database-postgres.js';

describe('API Test', () => {
  let server;

  beforeAll(async () => {
    server = fastify();
    const database = new DatabasePostgres();

    server.get('/artigos', async (request, reply) => {
      const search = request.query.search;
      const artigos = await database.read(search);
      return artigos;
    });

    server.post('/artigos', async (request, reply) => {
      const { nome, descricao, conteudo, imagem, github } = request.body;

      await database.create({ nome, descricao, conteudo, imagem, github });

      return reply.status(201).send();
    });

    await server.listen({ port: 3334 });
  });

  afterAll(async () => {
    await server.close();
  });

  it('should return a list of artigos', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/artigos'
    });

    expect(response.statusCode).toBe(200);
    expect(response.json()).toBeInstanceOf(Array);
  });

  it('should create a new artigo', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/artigos',
      payload: {
        nome: 'Test Artigo',
        descricao: 'Descrição do Teste',
        conteudo: 'Conteúdo do Teste',
        imagem: 'imagem.jpg',
        github: 'https://github.com/test'
      }
    });

    expect(response.statusCode).toBe(201);
  });
});
