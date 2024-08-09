import { sql } from '../db.js'

sql`
  CREATE TABLE artigos (
      id bigint PRIMARY KEY,
      nome character varying(255),
      descricao character varying(255),
      conteudo text,
      imagem character varying(255),
      github character varying(255)
  );
`.then(() => {
  console.log('tabela criada');
})